const navBar = document.querySelector(".header__nav");
const menu = document.querySelector(".menu");
const menuIcons = document.querySelectorAll(".menu-icon");
const navItems = navBar.querySelectorAll("ul, li,a");

const heroImages = document.querySelectorAll(".hero__back img");

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

let curr = 0;

setInterval(() => {
  heroImages.forEach((img, i) => {
    if (i == curr) {
      img.classList.add("active");
    } else {
      img.classList.remove("active");
    }
  });

  if (curr == 4) {
    curr = 0;
  } else {
    curr++;
  }
}, 3000);
