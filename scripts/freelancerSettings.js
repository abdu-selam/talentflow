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

  document.querySelectorAll(".input__eye").forEach((item,i) => {
    item.addEventListener("click", (e) => {
      const password = document.querySelectorAll(".form__input.password")[i];
      const icons = e.currentTarget.querySelectorAll("span");
      icons.forEach((ico) => {
        ico.classList.toggle("active");
      });

      password.type = password.type == "text" ? "password" : "text";
    });
  });

  profileSettings();
  privacySettings();

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

const profileSettings = () => {
  const form = document.querySelector(".profile__form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = {
      fname: form.fname.value,
      lname: form.fname.value,
      location: form.address.value,
      headline: form.headline.value,
    };

    // TODO -> update fetche
  });
};

const privacySettings = () => {
  const form = document.querySelector(".privacy__form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = {
      old: form.old.value,
      new: form.new.value,
      confirm: form.confirm.value,
    };

    if (!data.old || !data.new || !data.confirm) return;

    if (data.new !== data.confirm) return;

    console.log(data);

    // TODO -> update fetche
  });
};
