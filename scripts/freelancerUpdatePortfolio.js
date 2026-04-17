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

  dateInputsHandler();

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

const dateInputsHandler = () => {
  const dayInputs = document.querySelectorAll(".item__input.day");
  const yearInputs = document.querySelectorAll(".item__input.year");

  dayInputs.forEach((item) => {
    item.addEventListener("input", (e) => {
      const number = Number(item.value);

      if (!number) {
        item.value = item.value.slice(0, item.value.length - 1);
      } else {
        if (number < 1) {
            item.value = 0
        } else if (number > 31) {
            item.value = 31
        }
      }
    });
  });

  yearInputs.forEach((item) => {
    item.addEventListener("input", (e) => {
      const number = Number(item.value);
      const year = new Date().getFullYear()

      if (!number) {
        item.value = item.value.slice(0, item.value.length - 1);
      } else {
        if (number > year) {
            item.value = year
        }
      }
    });
  });
};
