import { baseUrl } from "../api_base.js";

window.addEventListener("load", async () => {
  const loading = document.querySelector(".loading");
  const messageUsersList = [];

  await fetcher(messageUsersList);
  loading.classList.add("close");
  init(messageUsersList);
  setTimeout(() => {
    loading.style.display = "none";
  }, 500);
});

const init = (messageUsersList) => {
  document.querySelector("#app").style.display = "flex";

  const filterItems = document.querySelectorAll(".type__items");
  const textArea = document.querySelector("#message");
  const sendBtn = document.querySelector(".message__send");
  const messageDown = document.querySelector(".message__down");

  // Auto Focus
  textArea.focus();

  textArea.addEventListener("input", (e) => {
    if (textArea.value.length > 0) {
      sendBtn.classList.add("active");
    } else {
      sendBtn.classList.remove("active");
    }
  });

  // Auto Scroll
  autoScroll();

  messageHandler();

  clickMessageItemHandler();

  // scroll to down
  messageDown.addEventListener("click", (e) => {
    autoScroll();
  });

  filterItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      filterItems.forEach((item) => item.classList.remove("active"));

      item.classList.add("active");
      // TODO add fetch to fetch data
    });
  });
};

const messageTemplate = (msg, time) => {
  return `
  <li class="message__part sender">
    <div class="message__box">
      ${msg}
    </div>
    <time datetime="" class="message__date">${time}</time>
  </li>
  `;
};

const messageHandler = () => {
  const textArea = document.querySelector("#message");
  const sendBtn = document.querySelector(".message__send");
  const messageList = document.querySelector(".message__list");

  const senderFunc = (e) => {
    if (!sendBtn.classList.contains("active")) return;

    const txt = textArea.value.trimEnd().replaceAll("  ", " &nbsp;");

    const tmplt = messageTemplate(txt, "22:45");
    // TODO -> send to backend
    messageList.insertAdjacentHTML("beforeend", tmplt);
    textArea.value = "";
    messageList.scrollTo({
      top: messageList.scrollHeight,
      behavior: "smooth",
    });
  };

  sendBtn.addEventListener("click", senderFunc);
  textArea.addEventListener("change", senderFunc);
};

const autoScroll = () => {
  const messageList = document.querySelector(".message__list");

  messageList.scrollTo({
    top: messageList.scrollHeight,
    behavior: "smooth",
  });
};

const clickMessageItemHandler = () => {
  const items = document.querySelectorAll(".main__messages .message__item");
  const singleMessage = document.querySelector(".single__message");
  const messagesList = document.querySelector(".main__messages");
  const txtList = document.querySelector(".message__list");
  const backIcon = document.querySelector(".back__icon");

  backIcon.addEventListener("click", (e) => {
    messagesList.classList.add("active");
    singleMessage.classList.remove("active");
  });

  items.forEach((item) => {
    item.addEventListener("click", async (e) => {
      const msgData = await fetchSingle(item.dataset.id);
      const keys = sorter(msgData.messages);
      msgHeadBldr(msgData.other);

      txtList.innerHTML = "";

      keys.forEach((key) => {
        const date = dateFormatter(`${key} 00:00:00`);
        txtList.insertAdjacentHTML(
          "beforeend",
          `<li class="message__day">${date}</li>`,
        );
        msgData.messages[key].forEach((item) => {
          txtList.insertAdjacentHTML("beforeend", msgItemBldr(item));
        });
      });

      messagesList.classList.remove("active");
      singleMessage.classList.add("active");
      autoScroll();
    });
  });
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

  name.textContent = `${item.fname} ${item.lname}`;
  roll.textContent = item.roll;
};

const fetcher = async (messageUsersList) => {
  const ul = document.querySelector(".messages__list");

  const res = await fetch(`${baseUrl}/freelancer/message.php`);
  const res_data = await res.json();

  const data = res_data.message;
  const ids = [...Object.keys(data)];
  const values = [...Object.values(data)].map((item, i) => {
    item.user_id = ids[i];
    return item;
  });

  console.log(values);

  values.forEach((item) => {
    msgUserElemBldr(item, ul);
    messageUsersList.push(item);
  });
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
        ${message}
      </p>
    </div>
    <div class="message__amount">${item.unread}</div>
  </li>
  `;

  ul.insertAdjacentHTML("beforeend", li);
};

const fetchSingle = async (userId) => {
  const res = await fetch(`${baseUrl}/freelancer/message.php?id=${userId}`);
  const res_data = await res.json();

  const data = res_data.message;

  console.log(data);
  return data;
};

const sorter = (messages) => {
  const dates = [...Object.keys(messages)];

  return [...dates].sort((a, b) => {
    let valA = new Date(a).getTime();
    let valB = new Date(b).getTime();

    return valB > valA ? 1 : valB < valA ? -1 : 0;
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
    <time datetime="${item.date.replace(" ", "T")}" class="message__date">
      ${date.getHours()}:${date.getMinutes()}
    </time>
  </li>`;
};
