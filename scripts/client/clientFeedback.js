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

const fetcher = async () => {
  const res = await fetch(`${baseUrl}/client/ratings.php`);
  const res_data = await res.json();

  clientReviewBldr(res_data);
};

const init = () => {
  document.querySelector("#app").style.display = "flex";
  filter();
};

const rangeController = () => {
  const ranges = document.querySelectorAll(".feedback__item .range");
  ranges.forEach((item) => {
    item.addEventListener("input", (e) => {
      const value = item.value;
      const elem = item.nextElementSibling;

      elem.textContent = value;
    });
  });
};

const submitRating = () => {
  const btns = document.querySelectorAll(".input__wrapper .btn");

  btns.forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const li = btn.parentElement.parentElement.parentElement;
      const txtInput = li.querySelector(".input__wrapper .message");
      const range = li.querySelector(".input__wrapper .range");

      const uname = btn.dataset.uname;

      if (txtInput.value == "") {
        alert("please write some text to give rating!");
        return;
      }

      const data = {
        txt: txtInput.value,
        amount: range.value,
        uname: uname,
      };

      const res = await fetch(`${baseUrl}/client/ratings.php`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status == 200) {
        alert("Your feedback has been added", "success");
        txtInput.value = "";
        range.value = 1;
      } else {
        alert("something went wrong try again!");
      }
    });
  });
};

const filter = () => {
  const btns = document.querySelectorAll(".filter__item");
  const sections = document.querySelectorAll(".wrapper");

  btns.forEach((btn, i) => {
    btn.addEventListener("click", (e) => {
      btns.forEach((btn) => btn.classList.remove("active"));
      sections.forEach((section) => section.classList.remove("active"));
      btn.classList.add("active");
      sections[i].classList.add("active");
      if (i == 0) {
        fetcher();
      } else {
        giveRatingsFetch();
      }
    });
  });
};

const clientReviewBldr = (data) => {
  const ul = document.querySelector(".review__list");
  ul.innerHTML = "";

  const ratings = [...data.message];
  data.system ? ratings.unshift(data.system) : "";

  if (ratings.length == 0) {
    const p = `
    <p class="no__item">
      There Is No Feedback you have given!
    </p>
    `;

    ul.insertAdjacentHTML("beforeend", p);
    return;
  }

  if (data.system) {
    ratings[0].fname = "TalentFlow";
    ratings[0].lname = "";
  }

  for (const item of ratings) {
    let icons = "";
    for (let i = 0; i < Math.round(item.amount); i++) {
      icons += `<i class="icon__star fas fa-star"></i>`;
    }

    const li = `
      <li class="review__item">
        <figure class="review__fig">
          <img
            src="${item.pp ? `../../uploads/profiles/${item.pp}` : data.system ? "../../images/logo.webp" : "../../images/profile.webp"}"
            alt="${item.fname} profile picture"
            class="review__pp"
            width="50"
          />
          <figcaption class="review__client">
            ${item.fname} ${item.lname}
          </figcaption>
        </figure>
        <p class="review__txt">
          ${item.message}
        </p>
        <div class="review__icons">
          ${icons}
        </div>
      </li>
    `;

    ul.insertAdjacentHTML("beforeend", li);
  }
};

const giveRatingsFetch = async () => {
  const res = await fetch(`${baseUrl}/client/ratings.php?type=fetch`);
  const res_data = await res.json();

  reviewInputBldr(res_data.message);
  rangeController();
  submitRating();
};

const reviewInputBldr = (data) => {
  const ul = document.querySelector(".feedback__list");
  const children = ul.children;

  [...children].forEach((item, i) => {
    if (i != 0) {
      item.remove();
    }
  });

  for (const item of data) {
    const src = item.profile
      ? `uploads/profiles/${item.profile}`
      : "images/profile.webp";
    const li = `
    <li class="feedback__item">
        <a href="../profile/freelancer.html?freelancer=${item.uname}">
            <figure class="feedback__profile">
            <img width="25" src="../../${src}" alt="${item.fname}" />
            <figcaption class="caption">
                <h2 class="name">${item.fname} ${item.lname}</h2>
                <p class="uname">${item.uname}</p>
            </figcaption>
            </figure>
        </a>
        <div class="main__form">
            <div class="input__wrapper">
            <textarea type="text" class="message"></textarea>
            </div>
            <div class="input__wrapper">
            <input
                type="range"
                class="range"
                value="1"
                min="0"
                max="5"
                step="0.5"
            />
            <span class="value"> 1 </span>
            </div>
            <div class="input__wrapper">
            <button data-uname="${item.uname}" class="btn">Send</button>
            </div>
        </div>
        </li>
    `;

    ul.insertAdjacentHTML("beforeend", li);
  }
};
