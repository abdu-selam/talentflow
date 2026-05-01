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
  const res = await fetch(`${baseUrl}/client/client.php`);

  const res_msg = await res.json();
  const data = res_msg.message;

  proposalStatElemBldr(data.proposal_stat);
  activeProposalsBldr(data.active_proposals);
  jobStatElemBldr(data.jobs_stat);
  activeJobsBldr(data.active_jobs);
};

const proposalStatElemBldr = (data) => {
  const valeuElems = document.querySelectorAll(
    ".main__stat.proposal .stat__result",
  );
  valeuElems.forEach((item, i) => {
    const value =
      i == 0
        ? data.total
        : i == 1
          ? data.unread
          : i == 2
            ? data.accepted
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
        <p class="job__client">${item.category}</p>
        <p class="job__description">
          ${item.description.slice(0, 80)}....
        </p>
        <button class="job__btn">
          <a href="./active-jobs/" class="job__link"> See Detail </a>
        </button>
      </li>
    `;

    ul.insertAdjacentHTML("beforeend", li);
  }
};
