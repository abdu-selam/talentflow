import { baseUrl } from "../api_base.js";

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

  document.querySelectorAll(".input__eye").forEach((item, i) => {
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
  logout();
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
      uname: form.uname.value,
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

const logout = () => {
  const btn = document.querySelector(".logout__btn");
  btn.addEventListener("click", async (e) => {
    const res = await fetch(`${baseUrl}/auth/logout.php`);
    if (res.status === 200) {
      location.replace("../../");
    }
  });
};
