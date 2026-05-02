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

const fetcher = async () => {
  const res = await fetch(`${baseUrl}/freelancer/job.php?type=active`);

  const res_msg = await res.json();
  const data = res_msg.message;

  if (res.status == 200) {
    activeJobsBldr(data);
    return;
  }
  location.assign("../");
};

const init = () => {
  document.querySelector("#app").style.display = "flex";
};

const activeJobsBldr = (data) => {
  const ul = document.querySelector(".jobs__list");

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
          ${item.message.slice(0, 80)}....
        </p>
        <button class="job__btn">
          <a href="../../jobs/job.html?job=${item.job_id}" class="job__link"> 
            See Detail
          </a>
        </button>
      </li>
    `;

    ul.insertAdjacentHTML("beforeend", li);
  }
};
