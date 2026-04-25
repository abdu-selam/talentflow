import { baseUrl } from "../api_base.js";

window.addEventListener("load", async () => {
  const loading = document.querySelector(".loading");

  loading.classList.add("close");
  await fetchData();
  init();
  setTimeout(() => {
    loading.style.display = "none";
  }, 500);
});

const init = () => {
  document.getElementById("app").style.display = "flex";
};

const fetchData = async () => {
  const res = await fetch(`${baseUrl}/freelancer/freelancer.php`);

  const res_msg = await res.json();
  const data = res_msg.message;

  proposalStatElemBldr(data.proposal_stat);
  activeProposalsBldr(data.active_proposals);
  jobStatElemBldr(data.job_stat);
  activeJobsBldr(data.active_jobs);
  clientReviewBldr(data.latest_ratings);
  statusBldr(data.profile_stat);
  portfolioBrdr(data.portfolio_sample);
};

const proposalStatElemBldr = (data) => {
  const valeuElems = document.querySelectorAll(
    ".stat__list.proposal .stat__result",
  );
  valeuElems.forEach((item, i) => {
    const value =
      i == 0
        ? data.total
        : i == 1
          ? data.accepted
          : i == 2
            ? data.pending
            : data.reject;
    item.textContent = value;
  });
};

const activeProposalsBldr = (data) => {
  const ul = document.querySelector(".pendings__list.proposal");

  if (data.length == 0) {
    const p = `
    <p class="no__item">
      There Is No Active Proposal!
    </p>
    `;

    ul.insertAdjacentHTML("beforeend", p);
    return;
  }

  for (const item of data) {
    const li = `
      <li class="pendings__item">
        <h2 class="pending__title">
          ${item.title}
        </h2>
        <p class="pending__client">${item.fname} ${item.lname}</p>
        <textarea class="pending__description" readonly>${item.message.slice(0, 80)}....</textarea>
        <button class="pending__btn">
          <a href="./applications/" class="pending__link">
            See Detail
          </a>
        </button>
      </li>
    `;

    ul.insertAdjacentHTML("beforeend", li);
  }
};

const jobStatElemBldr = (data) => {
  const valeuElems = document.querySelectorAll(
    ".stat__list.jobs .stat__result",
  );
  valeuElems.forEach((item, i) => {
    const value = i == 0 ? data.total : i == 1 ? data.finished : data.on_going;
    item.textContent = value;
  });
};

const activeJobsBldr = (data) => {
  const ul = document.querySelector(".jobs__list.jobs");

  if (data.length == 0) {
    const p = `
    <p class="no__item">
      There Is No Active Job!
    </p>
    `;

    ul.insertAdjacentHTML("beforeend", p);
    return;
  }

  for (const item of data) {
    const li = `
      <li class="jobs__item">
        <h2 class="job__title">
          ${item.title}
        </h2>
        <p class="job__client">${item.fname} ${item.lname}</p>
        <p class="job__description">
          ${item.message}....
        </p>
        <button class="job__btn">
          <a href="./active-jobs/" class="job__link"> See Detail </a>
        </button>
      </li>
    `;

    ul.insertAdjacentHTML("beforeend", li);
  }
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
            src="${item.pp ?? "../images/logo.webp"}"
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
      </li>
    `;

    ul.insertAdjacentHTML("beforeend", li);
  }
};

const statusBldr = (data) => {
  const allItems = document.querySelectorAll(".static__list .item__prog");

  allItems.forEach((item, i) => {
    if (i == 0) {
      // acceptance rate
      item.setAttribute("style", `--per: ${data.acceptance}%`);
      item.textContent = `${data.acceptance}%`;
    } else if (i == 1) {
      // total rating
      item.setAttribute(
        "style",
        `--per: calc((${data.total_rating} / 5) * 100%)`,
      );
      item.textContent = `${data.total_rating}`;
    } else {
      // profile progress
      item.setAttribute("style", `--per: ${data.profile_progress}%`);
      item.textContent = `${data.profile_progress}%`;
    }
  });
};

const portfolioBrdr = (data) => {
  const ul = document.querySelector(".portfolio__list");

  if (data.length == 0) {
    const p = `
    <p class="no__item">
      There Is No Portfolio Added!
    </p>
    `;

    ul.insertAdjacentHTML("beforeend", p);
    return;
  }

  for (const item of data) {
    const li = `
      <li class="portfolio__item">
        <figure class="portfolio__fig">
          <img
            class="portfolio__img"
            src="${item.image ?? "../images/bg-smooth-1.webp"}"
            alt="${item.title}portfolio image"
            width="100r"
          />
          <figcaption class="portfolio__caption">
            ${item.title}
          </figcaption>
        </figure>
        <p class="portfolio__description">
          ${item.descriptions.slice(0, 80)}
        </p>
        <button class="portfolio__btn">
          <a href="./portfolio" class="portfolio__link"> See Detail </a>
        </button>
      </li>
    `;

    ul.insertAdjacentHTML("beforeend", li);
  }
};
