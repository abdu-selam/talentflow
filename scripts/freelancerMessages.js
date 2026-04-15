window.addEventListener("load", () => {
  const loading = document.querySelector(".loading");

  loading.classList.add("close");
  init();
  setTimeout(() => {
    loading.style.display = "none";
  }, 500);
});

const init = () => {
  document.querySelector("#app").style.display = "flex";

  const navBar = document.querySelector(".aside__nav");
  const menu = document.querySelector(".menu");
  const menuIcons = document.querySelectorAll(".menu-icon");
  const navItems = navBar.querySelectorAll("ul, li,a");
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
  messageDown.addEventListener("click",(e)=>{
    autoScroll()
  })

  filterItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      filterItems.forEach((item) => item.classList.remove("active"));

      item.classList.add("active");
      // TODO add fetch to fetch data
    });
  });

  menu.addEventListener("click", (e) => {
    menu.classList.toggle("active");
    navBar.classList.toggle("active");
  });

  window.addEventListener("click", (e) => {
    const elem = e.target;
    if (![...navItems, ...menuIcons, menu, navBar].includes(elem)) {
      menu.classList.remove("active");
      navBar.classList.remove("active");
    }
  });

  window.addEventListener("scroll", () => {
    menu.classList.remove("active");
    navBar.classList.remove("active");
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
  }

  sendBtn.addEventListener("click", senderFunc);
  textArea.addEventListener("change", senderFunc);
};

const autoScroll = (position) => {
  const messageList = document.querySelector(".message__list");

  messageList.scrollTo({
    top: position ? position.offsetTop - 60 : messageList.scrollHeight,
    behavior: "smooth",
  });
};

const clickMessageItemHandler = () => {
  const items = document.querySelectorAll(".main__messages .message__item");
  const singleMessage = document.querySelector(".single__message");
  const messagesList = document.querySelector(".main__messages");
  const backIcon = document.querySelector(".back__icon");

  backIcon.addEventListener("click", (e) => {
    messagesList.classList.add("active");
    singleMessage.classList.remove("active");
  });

  items.forEach((item) => {
    item.addEventListener("click", (e) => {
      // TODO -> fetch single message history
      messagesList.classList.remove("active");
      singleMessage.classList.add("active");
    });
  });
};
