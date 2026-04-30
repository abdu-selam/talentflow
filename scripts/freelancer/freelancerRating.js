import { baseUrl } from "../api_base.js";

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
  document.getElementById("app").style.display = "flex";
};

const fetcher = async () => {
  const res = await fetch(`${baseUrl}/freelancer/rating.php`);
  const res_data = await res.json();

  const data = res_data.message;

  clientReviewBldr(data);
};

const clientReviewBldr = (data) => {
  const ul = document.querySelector(".review__list");

  if (data.length == 0) {
    const p = `
    <p class="no__item">
      There Is No Client Feedback!
    </p>
    `;

    ul.insertAdjacentHTML("beforeend", p);
    return;
  }

  for (const item of data) {
    let icons = "";
    for (let i = 0; i < Math.round(item.amount); i++) {
      item += `<i class="icon__star fas fa-star"></i>`;
    }

    const li = `
      <li class="review__item">
        <figure class="review__fig">
          <img
            src="${item.pp ? `../uploads/profiles/${item.pp}` : "../images/logo.webp"}"
            alt="${item.name} profile picture"
            class="review__pp"
            width="50"
          />
          <figcaption class="review__client">
            ${item.name}
          </figcaption>
        </figure>
        <p class="review__txt">
          ${item.message}
        </p>
        <div class="review__icons">
          ${icons}
        </div>
        <button class="item__btn">
            <a href="../messages/index.html?id=${item.user_name}">
                Talk to client
            </a>
        </button>
      </li>
    `;

    ul.insertAdjacentHTML("beforeend", li);
  }
};
