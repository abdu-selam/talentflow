window.addEventListener("load", () => {
  const loading = document.querySelector(".loading");

  loading.classList.add("close");
  init();
  setTimeout(() => {
    loading.style.display = "none";
  }, 500);
});

const init = () => {
  document.querySelector("#app").style.display = "block";

  const navBar = document.querySelector(".header__nav");
  const menu = document.querySelector(".menu");
  const menuIcons = document.querySelectorAll(".menu-icon");

  isLoged();

  menu.addEventListener("click", (e) => {
    menu.classList.toggle("active");
    navBar.classList.toggle("active");
  });

  window.addEventListener("click", (e) => {
    const elem = e.target;
    if (![...menuIcons, menu, navBar].includes(elem)) {
      menu.classList.remove("active");
      navBar.classList.remove("active");
    }
  });

  window.addEventListener("scroll", () => {
    menu.classList.remove("active");
    navBar.classList.remove("active");
  });

  document.querySelector(".footer__year").textContent =
    new Date().getFullYear();

  fetcher();
};

const fetcher = async () => {
  const params = new URLSearchParams(location.search);
  const jobId = params.get("job");

  if (!jobId) {
    location.replace("./");
  }

  // fetch requiest for single
};

const isLoged = () => {
  // fetch request
  const form = document.querySelector(".job__form");
  const textarea = document.querySelector("#apply-txt");
  const btn = document.querySelector(".job__btn");
  const mainHead = document.querySelector(".main__head");

  const userType = "freelancer";
  form.style.display = "none";
  if (userType == "client" || userType == "freelancer") {
    mainHead.style.display = "none";
  }

  if (["freelancer", "applyer"].includes(userType)) {
    form.style.display = "flex";

    if (userType == "freelancer") {
      textarea.removeAttribute("disabled");
      btn.removeAttribute("disabled");
      form.classList.remove("unsigned");
    }
  }
};
