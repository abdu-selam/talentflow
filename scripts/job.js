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
};
