import { baseUrl } from "../api_base.js";

window.addEventListener("load", async () => {
  const loading = document.querySelector(".loading");

  await fetchData();
  loading.classList.add("close");
  init();
  setTimeout(() => {
    loading.style.display = "none";
  }, 500);
});

const init = () => {
  document.getElementById("app").style.display = "flex";
};

const fetchData = async () => {
  const res = await fetch(`${baseUrl}/admin/admin.php`);

  const res_msg = await res.json();
  const data = res_msg.message;

  userStatElemBldr(data.users_stat);
  latestUsersBldr(data.latest_users);
  jobStatElemBldr(data.jobs_stat);
  latestJobsBldr(data.latest_jobs);
  clientReviewBldr(data.latest_feedbacks);
};

const userStatElemBldr = (data) => {
  const valeuElems = document.querySelectorAll(
    ".main__stat.proposal .stat__result",
  );
  valeuElems.forEach((item, i) => {
    const value =
      i == 0
        ? data.total
        : i == 1
          ? data.clients
          : i == 2
            ? data.freelancers
            : "0";
    item.textContent = value;
  });
};

const latestUsersBldr = (data) => {
  const ul = document.querySelector(".pendings__list.users");

  if (data.length == 0) {
    const p = `
    <p class="no__item">
      There Is No User in TalentFlow!
    </p>
    `;

    ul.insertAdjacentHTML("beforeend", p);
    return;
  }

  for (const item of data) {
    const li = `
        <li class="user__item">
        <a href="./profile/${item.roll}.html?uname=${item.uname}">
            <figure class="item__fig">
                <img src="${item.pp ? `../uploads/profiles/${item.pp}` : "../images/profile.webp"}" width="60" alt="profile of ${item.uname}" class="item__pp" />
                <figcaption class="item__caption">
                    <h2 class="item__name">${item.fname} ${item.lname}</h2>
                    <p class="item__roll">${item.roll}</p>
                </figcaption>
            </figure>
        </a>
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
    const value =
      i == 0
        ? data.total
        : i == 1
          ? data.hired
          : i == 2
            ? data.ongoing
            : data.finished;
    item.textContent = value;
  });
};

const latestJobsBldr = (data) => {
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
        <p class="job__client">${item.category}</p>
        <p class="job__description">
          ${item.description.slice(0, 80)}....
        </p>
        <button class="job__btn">
          <a href="./jobs/job.html?job=${item.id}" class="job__link"> See Detail </a>
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
      There Is No Feedback given for TalentFlow!
    </p>
    `;

    ul.insertAdjacentHTML("beforeend", p);
    return;
  }

  for (const item of data) {
    let icons = "";
    for (let i = 0; i < Math.round(item.amount); i++) {
      icons += `<i class="icon__star fas fa-star"></i>`;
    }

    const li = `
      <li class="review__item">
        <figure class="review__fig">
          <img
            src="${item.profile ? `../uploads/profiles/${item.profile}` : "../images/profile.webp"}"
            alt="${item.name} profile picture"
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
