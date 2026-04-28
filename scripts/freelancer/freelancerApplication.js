import { baseUrl } from "../api_base.js";

window.addEventListener("load", async () => {
  const loading = document.querySelector(".loading");
  const applications = [];

  await fetcher(applications);
  loading.classList.add("close");
  init(applications);
  setTimeout(() => {
    loading.style.display = "none";
  }, 500);
});

const init = (applications) => {
  document.querySelector("#app").style.display = "flex";
  const filterItems = document.querySelectorAll(".filter__item");
  const ul = document.querySelector(".pendings__list");

  filterItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      filterItems.forEach((item) => item.classList.remove("active"));
      const stat = item.dataset.value;
      item.classList.add("active");

      ul.innerHTML = "";

      if (stat == "all") {
        if (applications.length === 0) {
          const p = `<p class="no__item">There Is No proposal!</p>`;
          ul.insertAdjacentHTML("beforeend", p);
        } else {
          applications.forEach((item) => {
            listItemBldr(item, ul);
          });
        }
      } else {
        const newArr = applications.filter((item) => item.status == stat);
        if (newArr.length === 0) {
          const p = `<p class="no__item">There Is No ${item.textContent} proposal!</p>`;
          ul.insertAdjacentHTML("beforeend", p);
        } else {
          newArr.forEach((item) => {
            listItemBldr(item, ul);
          });
        }
      }
    });
  });
};

const fetcher = async (applications) => {
  const ul = document.querySelector(".pendings__list");
  const res = await fetch(`${baseUrl}/freelancer/application.php`);

  const res_data = await res.json();
  const data = res_data.message;

  if (res.status === 200) {
    statBldr(data.statistic);

    data.applications.forEach((item) => {
      applications.push(item);
    });

    if (data.length === 0) {
      const p = `<p class="no__item">There Is No pending proposal!</p>`;
      ul.insertAdjacentHTML("beforeend", p);
    } else {
      data.applications.forEach((item) => {
        listItemBldr(item, ul);
      });
    }
  }
};

const listItemBldr = (item, ul) => {
  const li = `
  <li class="pendings__item">
    <h2 class="pending__title">
      ${item.title}
    </h2>
    <p class="pending__client">${item.fname} ${item.lname}</p>
    <p class="pending__status">
      <span class="txt"> Status: </span>
      <span class="result"> ${item.status} </span>
    </p>
    <textarea class="pending__description" readonly>${item.message}</textarea
    >
    <div class="pending__btns">
      <button class="pending__btn">
        <a
          href="../messages/index.html?id=${item.uname}"
          class="pending__link"
        >
          Message</a
        >
      </button>
      <button class="pending__btn">
        <a
          href="../../jobs/job.html?job=${item.job_id}"
          class="pending__link"
        >
          See Detail
        </a>
      </button>
    </div>
  </li>
  `;

  ul.insertAdjacentHTML("beforeend", li);
};

const statBldr = (data) => {
  const statElems = document.querySelectorAll(".stat__result");
  const values = [data.total, data.accepted, data.pending, data.reject];

  statElems.forEach((elem, i) => {
    elem.textContent = values[i];
  });
};
