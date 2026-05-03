import { baseUrl } from "../api_base.js";
import eventSource from "../sseHandler.js";

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(async (entry) => {
      if (entry.isIntersecting) {
        const elem = entry.target;
        const id = elem.dataset.id;

        const res = await markUsRead(id);
        if (res) {
          observer.unobserve(elem);
          const userMsgElem = document.querySelector(
            `.message__item[data-id="${res}"] .message__amount`,
          );
          if (userMsgElem) {
            const pre = Number(userMsgElem.textContent);
            if (pre == 1) {
              userMsgElem.remove();
              return;
            }
            userMsgElem.textContent = pre - 1;
          }
        }
      }
    });
  },
  {
    threshold: 0.75,
  },
);

window.addEventListener("load", async () => {
  const loading = document.querySelector(".loading");
  const messageUsersList = [];

  await fetcher(messageUsersList);
  eventSource((uname) => {
    fetcher(messageUsersList, uname);
  }, messageUsersList);
  loading.classList.add("close");
  init(messageUsersList);
  setTimeout(() => {
    loading.style.display = "none";
  }, 500);
});

const init = (messageUsersList) => {
  document.querySelector("#app").style.display = "flex";

  const textArea = document.querySelector("#message");
  const sendBtn = document.querySelector(".message__send");
  const messageDown = document.querySelector(".message__down");

  textArea.addEventListener("input", (e) => {
    if (textArea.value.length > 0) {
      sendBtn.classList.add("active");
    } else {
      sendBtn.classList.remove("active");
    }
  });

  filterLogic(messageUsersList);

  // Auto Scroll
  autoScroll();

  messageHandler();

  // scroll to down
  messageDown?.addEventListener("click", (e) => {
    autoScroll();
  });
};

const messageHandler = () => {
  const textArea = document.querySelector("#message");
  const sendBtn = document.querySelector(".message__send");
  const messageList = document.querySelector(".message__list");

  const senderFunc = async (e) => {
    if (!sendBtn.classList.contains("active")) return;
    const header = document.querySelector(".message__header");

    if (textArea.value.trim() == "") {
      return
    }
    const txt = textArea.value.trimEnd().replaceAll("  ", " &nbsp;");

    const result = await sendMsgForm({
      message: [txt],
      reciever: header.dataset.id,
    });

    if (!result) {
      return;
    }

    messageList.insertAdjacentHTML("beforeend", msgItemBldr(result));
    const userMsgElem = document.querySelector(`.message__item[data-id="${header.dataset.id}"] .message__last`)
    if (userMsgElem) {
      userMsgElem.innerHTML = ""
      userMsgElem.insertAdjacentHTML("beforeend", `<strong>You:</strong> ${txt}`)
    }

    textArea.value = "";
    autoScroll();
  };

  sendBtn.addEventListener("click", senderFunc);
  textArea.addEventListener("change", senderFunc);
};

const autoScroll = () => {
  const messageList = document.querySelector(".message__list");
  const messageDown = document.querySelector(".message__down");

  messageList.addEventListener("scroll", (e) => {
    const bottom = messageList.scrollHeight - messageList.offsetHeight;
    if (messageDown) {
      if (messageList.scrollTop + 40 > bottom) {
        messageDown.style.display = "none";
      } else {
        messageDown.style.display = "grid";
      }
    }
  });

  messageList.scrollTo({
    top: messageList.scrollHeight,
    behavior: "smooth",
  });
};

const clickMessageItemHandler = () => {
  const singleMessage = document.querySelector(".single__message");
  const messagesList = document.querySelector(".main__messages");
  const items = document.querySelectorAll(".main__messages .message__item");
  const backIcon = document.querySelector(".back__icon");
  const textArea = document.querySelector("#message");

  backIcon.addEventListener("click", (e) => {
    messagesList.classList.add("active");
    singleMessage.classList.remove("active");
  });

  items.forEach((item) => {
    item.addEventListener("click", async (e) => {
      const msgData = await fetchSingle(item.dataset.id);
      if (!msgData) {
        return;
      }

      singleUserMsgHandler(msgData);
      textArea.focus()
    });
  });
};

const singleUserMsgHandler = (msgData, isLoad = true) => {
  const singleMessage = document.querySelector(".single__message");
  const messagesList = document.querySelector(".main__messages");
  const txtList = document.querySelector(".message__list");
  const textArea = document.querySelector("#message");

  const keys = sorter(msgData.messages);
  msgHeadBldr(msgData.other);
  textArea.removeAttribute("disabled");
  textArea.focus();

  txtList.innerHTML = "";

  keys.forEach((key) => {
    const date = dateFormatter(`${key} 00:00:00`);
    txtList.insertAdjacentHTML(
      "beforeend",
      `<li class="message__day">${date}</li>`,
    );
    msgData.messages[key].forEach((item) => {
      txtList.insertAdjacentHTML("beforeend", msgItemBldr(item));
      const allElems = [
        ...document.querySelectorAll(".message__part.reciever"),
      ];
      const curr = allElems[allElems.length - 1];
      if (curr && item.status == "unread") {
        observer.observe(curr);
      }
    });
  });

  txtList.insertAdjacentHTML(
    "beforeend",
    `<li class="message__down active">
            <i class="fas fa-angle-down"></i>
        </li>`,
  );

  const messageDown = document.querySelector(".message__down");
  messageDown.addEventListener("click", (e) => {
    autoScroll();
  });

  if (isLoad) {
    messagesList.classList.remove("active");
    singleMessage.classList.add("active");
  }
  autoScroll();
};

const dateFormatter = (dateStr) => {
  const date = new Date(dateStr.replace(" ", "T"));

  const formatted = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return formatted;
};

const msgHeadBldr = (item) => {
  const img = document.querySelector(".message__figure .message__pp");
  img.src = item.profile
    ? `../../uploads/profiles/${item.profile}`
    : "../../images/profile.webp";
  img.alt = `profile picture of ${item.fname} ${item.lname}`;

  const name = document.querySelector(".message__caption .message__name");
  const roll = document.querySelector(".message__caption .message__type");

  const a = document.createElement("a");
  a.href = `../profile/${item.roll}.html?${item.roll}=${item.uname}`;
  a.textContent = `${item.fname} ${item.lname}`;

  name.innerHTML = "";
  name.append(a);
  roll.textContent = item.roll;

  const header = document.querySelector(".message__header");
  header.setAttribute("data-id", item.id);
};

const fetcher = async (messageUsersList, unamefunc) => {
  const ul = document.querySelector(".messages__list");
  const params = new URLSearchParams(location.search);
  const uname = params.get("id");
  const url = !unamefunc
    ? !uname
      ? ""
      : `?uname=${uname}`
    : `?uname=${unamefunc}`;

  const res = await fetch(`${baseUrl}/freelancer/message.php${url}`);
  const res_data = await res.json();
  if (res.status != 200) {
    history.back;
  }
  const data = res_data.message;

  if (uname) {
    singleUserMsgHandler(res_data.single);
  } 
  if (unamefunc) {
    singleUserMsgHandler(res_data.single, false);
  }

  const ids = [...Object.keys(data)];
  const values = [...Object.values(data)].map((item, i) => {
    item.user_id = ids[i];
    return item;
  });

  ul.innerHTML = "";
  if (values.length == 0) {
    ul.insertAdjacentHTML(
      "beforeend",
      `<p class="no__item">There Is No Message!</p>`,
    );
    return;
  }

  messageUsersList.forEach((_) => {
    messageUsersList.pop();
  });

  values.forEach((item) => {
    msgUserElemBldr(item, ul);
    messageUsersList.push(item);
  });

  clickMessageItemHandler();
};

const msgUserElemBldr = (item, ul) => {
  const src = item.profile
    ? `uploads/profiles/${item.profile}`
    : "images/profile.webp";
  const message = JSON.parse(item.messages).join(" ");

  const li = `
  <li data-id="${item.user_id}" class="message__item">
    <img
      src="../../${src}"
      alt="proile picture of ${item.fname}"
      class="message__img"
      width="50"
    />
    <div class="message__txts">
      <h2 class="message__title">${item.fname} ${item.lname}</h2>
      <p class="message__last">
        <strong>${item.sender ? "You" : "recieved"}:</strong> ${message}
      </p>
    </div>
    ${item.unread == 0 ? "" : `<div class="message__amount">${item.unread}</div>`}
  </li>
  `;

  ul.insertAdjacentHTML("beforeend", li);
};

const fetchSingle = async (userId) => {
  const res = await fetch(`${baseUrl}/freelancer/message.php?id=${userId}`);
  const res_data = await res.json();

  const data = res_data.message;

  if (res.status == 200) {
    return data;
  }

  return null;
};

const sorter = (messages) => {
  const dates = [...Object.keys(messages)];

  return [...dates].sort((a, b) => {
    let valA = new Date(a).getTime();
    let valB = new Date(b).getTime();

    return valA > valB ? 1 : valA < valB ? -1 : 0;
  });
};

const msgItemBldr = (item) => {
  const date = new Date(item.date.replace(" ", "T"));
  return `
  <li data-id="${item.id}" class="message__part ${item.sender ? "sender" : "reciever"}">
    <div class="message__box">
      ${item.type == "proposal" ? '<p class="message__proposal">proposal</p>' : ""}
      ${item.message.join("<br/>")}
    </div>
    <div class="time__read">
      ${item.sender ? `<span class="read__stat">${item.status == "read" ? "Delivered" : "sent"}</span>` : ""}
      <time datetime="${item.date.replace(" ", "T")}" class="message__date">
        ${date.getHours()}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}
      </time>
    </div>
  </li>`;
};

const sendMsgForm = async (data) => {
  const res = await fetch(`${baseUrl}/freelancer/message.php`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.status == 200) {
    const data = await res.json();
    return data.message;
  }

  return null;
};

const filterLogic = (messageUsersList) => {
  const filterItems = document.querySelectorAll(".type__items");
  const ul = document.querySelector(".messages__list");

  filterItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      filterItems.forEach((item) => item.classList.remove("active"));
      const stat = item.dataset.stat;
      item.classList.add("active");
      ul.innerHTML = "";

      if (stat == "all") {
        if (messageUsersList.length == 0) {
          ul.insertAdjacentHTML(
            "beforeend",
            `<p class="no__item">There Is No Message!</p>`,
          );
        } else {
          messageUsersList.forEach((item) => {
            msgUserElemBldr(item, ul);
          });
        }
      } else if (stat == "read") {
        const filtered = messageUsersList.filter((item) => item.unread == 0);
        if (filtered.length == 0) {
          ul.insertAdjacentHTML(
            "beforeend",
            `<p class="no__item">There Is No Readed Message!</p>`,
          );
        } else {
          filtered.forEach((item) => {
            msgUserElemBldr(item, ul);
          });
        }
      } else {
        const filtered = messageUsersList.filter((item) => item.unread > 0);
        if (filtered.length == 0) {
          ul.insertAdjacentHTML(
            "beforeend",
            `<p class="no__item">There Is No Unread Message!</p>`,
          );
        } else {
          filtered.forEach((item) => {
            msgUserElemBldr(item, ul);
          });
        }
      }

      clickMessageItemHandler();
    });
  });
};

const markUsRead = async (id) => {
  const res = await fetch(`${baseUrl}/freelancer/message.php?mark=${id}`);
  if (res.status == 200) {
    const data = await res.json();
    return data.message;
  }
  return false;
};
