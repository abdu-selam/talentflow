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
  document.querySelector("#app").style.display = "flex";

  deleteProfile();
};

const fetcher = async () => {
  const res = await fetch(`${baseUrl}/freelancer/portfolio.php`);
  const ul = document.querySelector(".portfolio__list");

  const res_data = await res.json();
  const data = res_data.message;

  if (res.status == 200) {
    if (data.length > 0) {
      data.forEach((item) => {
        ul.insertAdjacentHTML("beforeend", portfolioItemBldr(item));
      });
      deleteProfile();
    } else {
      const p = `
      <p class="no__item">
      There Is No Portfolio Added!
      </p>
      `;
      ul.insertAdjacentHTML("beforeend", p);
    }
  }
};

const deleteProfile = () => {
  const btns = document.querySelectorAll(".delete__portfolio");

  btns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const item = document.querySelector(
        `li.portfolio__item[data-id="${btn.dataset.id}"]`,
      );

      // fetch request
      item.remove();
    });
  });
};

const portfolioItemBldr = (data) => {
  let imgs = "";
  for (const item of data.images) {
    const img = `
      <li class="portfolio__img">
        <img
          src="${item}"
          alt="image of portfolio ${item}"
          class="img"
          width="200"
        />
      </li>
    `;
    imgs += img;
  }

  let descriptions = "";
  for (const item of data.descriptions) {
    const p = `<p class="txt">${item}</p>`;
    descriptions += p;
  }

  return `
  <li data-id="${data.id}" class="portfolio__item">
    <h2 class="portfolio__title">${data.title}</h2>
    <div class="portfolio__date">
      <div class="date">
        <p class="txt">From:</p>
        <time datetime="${data.start_date.elem}" class="time"> ${data.start_date.content} </time>
        </div>
        <div class="date">
        <p class="txt">To:</p>
        <time datetime="${data.end_date.elem}" class="time"> ${data.end_date.content} </time>
      </div>
    </div>
    <div class="img__wrapper">
      <ul class="portfolio__imgs">
        ${imgs}
      </ul>
    </div>
    <div class="portfolio__desc">
      ${descriptions}
    </div>
    <div class="item__btns">
      <button class="item__btn">
        <a href="./update.html?portfolio-id=${data.id}">
          Update Portfolio
        </a>
      </button>
      <button
        data-id="${data.id}"
        class="item__btn delete__portfolio"
      >
        Delete Portfolio
      </button>
    </div>
  </li>
  `;
};
