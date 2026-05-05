import { baseUrl } from "../api_base.js";

window.addEventListener("load", async () => {
  const loading = document.querySelector(".loading");
  const jobsListGlobal = [];

  await fetcher(jobsListGlobal);
  loading.classList.add("close");
  init(jobsListGlobal);
  setTimeout(() => {
    loading.style.display = "none";
  }, 500);
});

const init = (jobsListGlobal) => {
  document.querySelector("#app").style.display = "flex";

  handleFilterClicks(jobsListGlobal);
};

const fetcher = async (jobsListGlobal) => {
  const res = await fetch(`${baseUrl}/freelancer/job.php?admin=user`);
  const res_data = await res.json();

  const data = res_data.message;

  if (res.status == 200) {
    if (data.length == 0) {
      const ul = document.querySelector(".jobs__list");
      const p = '<p class="no__item">There Is No Job has been posted!</p>';

      ul.insertAdjacentHTML("beforeend", p);
      return;
    }

    data.forEach((item) => {
      job_constructor(item);
      jobsListGlobal.push(item);
    });
  }
};

const job_constructor = (data) => {
  const jobTypes = {
    full: "Full Time",
    part: "Part Time",
    intern: "Internship",
  };
  const ul = document.querySelector(".jobs__list");

  const li = `
  <li data-stat="${data.status}" class="jobs__item">
    <h2 class="job__title">${data.title}</h2>
    <ul class="job__dates">
      <li class="job__date">
        <p class="date__name">Posted</p>
        <p class="date__date">${data.post_date}</p>
      </li>
      <li class="job__date">
        <p class="date__name">Deadline</p>
        <p class="date__date">${data.deadline}</p>
      </li>
    </ul>
    <div class="job__item job__adress">
      <p class="adress__name item__name">
        <i class="fas fa-location"></i> Adress
      </p>
      <p class="item__value adress__location">${data.address}</p>
    </div>
    <div class="job__item job__salary">
      <p class="salary__name item__name">
        <i class="fas fa-coins"></i> Salary
      </p>
      <p class="item__value salary__amount">${data.salary}birr</p>
    </div>
    <div class="job__item job__type">
      <p class="type__name item__name">
        <i class="fas fa-briefcase"></i> Job type
      </p>
      <p class="item__value type__amount">${jobTypes[data.job_type]}</p>
    </div>
    <div class="job__item job__description">
      <p class="desc__name item__name">Description</p>
      <p class="item__value desc__amount">
        ${data.description}
      </p>
    </div>
    <button class="jobs__detail">
      <a href="./job.html?job=${data.id}" class="jobs__detail--link"> View Detail </a>
    </button>
  </li>`;

  ul.insertAdjacentHTML("beforeend", li);
};

const handleFilterClicks = (jobsListGlobal) => {
  const filterItems = document.querySelectorAll(".client__item");
  const ul = document.querySelector(".jobs__list");
  const p = '<p class="no__item">There Is No Job has been posted!</p>';

  filterItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      const stat = item.dataset.stat;
      filterItems.forEach((item) => item.classList.remove("active"));

      item.classList.add("active");
      ul.innerHTML = "";

      if (stat == "all") {
        if (jobsListGlobal.length == 0) {
          ul.insertAdjacentHTML("beforeend", p);
          return;
        }

        jobsListGlobal.forEach((item) => {
          job_constructor(item);
        });
      } else {
        const filtered = jobsListGlobal.filter((item) => item.status == stat);
        if (filtered.length == 0) {
          ul.insertAdjacentHTML("beforeend", p);
          return;
        }

        filtered.forEach((item) => {
          job_constructor(item);
        });
      }
    });
  });
};
