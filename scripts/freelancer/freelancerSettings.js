import { baseUrl } from "../api_base.js";
import { alert } from "../alert.js";

window.addEventListener("load", async () => {
  const loading = document.querySelector(".loading");

  await fetcher();
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
  userNameChanger();
};

const fetcher = async () => {
  const res = await fetch(`${baseUrl}/freelancer/setting_get.php`);
  const res_data = await res.json();
  const data = res_data.message;

  const form = document.querySelector(".profile__form");
  const uname = document.querySelector('.setting__input[name="uname"]');

  form.fname.value = data.first_name;
  form.lname.value = data.last_name;
  form.address.value = data.address;
  form.headline.value = data.headline;

  uname.value = data.user_name;
};

const profileSettings = () => {
  const form = document.querySelector(".profile__form");
  const btn = document.querySelector(".profile__form .setting__submit");

  const inputs = document.querySelectorAll(".profile__form .setting__input");
  const oldData = {
    firstName: form.fname.value,
    lastName: form.lname.value,
    address: form.address.value,
    headline: form.headline.value,
  };

  inputs.forEach((input, i) => {
    input.addEventListener("keydown", (e) => {
      if (e.key != "Enter" || i === 3) return;
      inputs[i + 1].focus();
    });
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
  });

  btn.addEventListener("click", async (e) => {
    const req = {
      firstName: form.fname.value,
      lastName: form.lname.value,
      address: form.address.value,
      headline: form.headline.value,
    };

    const isSame = [...Object.values(oldData)].every((item) =>
      [...Object.values(req)].includes(item),
    );

    if (isSame) {
      alert("Nothing to change!");
      return;
    }

    const res = await fetch(`${baseUrl}/freelancer/profile.php`, {
      method: "POST",
      body: JSON.stringify(req),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res_data = await res.json();
    const data = res_data.message;

    form.fname.value = data.fname;
    form.lname.value = data.lname;
    form.address.value = data.address;
    form.headline.value = data.headline;

    alert("Profile texts has been updated successfully!", "success");
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

const userNameChanger = () => {
  const uname = document.querySelector('.setting__input[name="uname"]');
  const btn = document.querySelector(".check__uname");
  const btnTxt = btn.querySelector(".txt");
  const btnIco = btn.querySelector(".sun");

  const reqEx = /^[A-Za-z0-9_]+$/;

  uname.addEventListener("input", (e) => {
    btn.setAttribute("data-stat", "nutral");
    btnTxt.classList.add("active");
    btnIco.classList.remove("active");
    btnTxt.textContent = "Check";
    btn.classList.remove("checked");
  });

  btn.addEventListener("click", async (e) => {
    const stat = btn.dataset.stat;
    if (stat == "checking") return;
    if (stat == "checked") {
      const res = await fetch(
        `${baseUrl}/freelancer/setting_get.php?sname=${uname.value}`,
      );

      const res_data = await res.json();
      const data = res_data.message;

      const asideuname = document.querySelector(".aside__uname");
      asideuname.textContent = data;

      btnTxt.classList.add("active");
      btnIco.classList.remove("active");

      btn.setAttribute("data-stat", "nutral");
      btnTxt.textContent = "Check";
      btn.classList.remove("checked");

      alert("Congratulations You Have new user name Know!", "success");
    } else {
      if (uname.value == "") {
        alert("Please feel some letters for the username!");
        return;
      }
      if (!reqEx.test(uname.value)) {
        alert("Only Letters, numbers and underscore( _ ) are allowed");
        return;
      }

      btn.setAttribute("data-stat", "checking");
      btnTxt.classList.remove("active");
      btnIco.classList.add("active");
      const res = await fetch(
        `${baseUrl}/freelancer/setting_get.php?uname=${uname.value}`,
      );

      const res_data = await res.json();
      const data = res_data.message;

      btnTxt.classList.add("active");
      btnIco.classList.remove("active");
      if (data) {
        alert("This user name is already in use!");
        btn.setAttribute("data-stat", "nutral");
        btnTxt.textContent = "Check";
        btn.classList.remove("checked");
        return;
      }
      alert("Congratulations this user name is not in use!", "success");
      btn.setAttribute("data-stat", "checked");
      btnTxt.textContent = "Change";
      btn.classList.add("checked");
    }
  });
};
