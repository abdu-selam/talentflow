import { baseUrl } from "../api_base.js";

window.addEventListener("load", async () => {
  const loading = document.querySelector(".loading");
  const applicationList = [];

  await fetcher(applicationList);
  loading.classList.add("close");
  init(applicationList);
  setTimeout(() => {
    loading.style.display = "none";
  }, 500);
});

const init = () => {
  document.querySelector("#app").style.display = "flex";
};

const fetcher = async (applicationList) => {
  const res = await fetch(`${baseUrl}/client/application.php`);
  const res_data = await res.json();

  const data = res_data.message;
  data.forEach((item) => {
    applicationList.push({ ...item });
  });
  itemBldr(data);
  filterItems(applicationList);
};

const filterItems = (applicationList) => {
  const ul = document.querySelector(".applications__list");
  const items = document.querySelectorAll(".filter__item");

  items.forEach((item) => {
    item.addEventListener("click", (e) => {
      items.forEach((item) => item.classList.remove("active"));
      item.classList.add("active");
      const stat = item.dataset.stat;
      ul.innerHTML = "";

      if (stat == "all") {
        itemBldr(applicationList);
      } else {
        const status = {
          pending: "New",
          approve: "Approved",
          reject: "Rejected",
        };
        const filltered = applicationList.filter((item) => item.status == stat);
        itemBldr(filltered, status[stat]);
      }
    });
  });
};

const itemBldr = (data, message = "Active") => {
  const ul = document.querySelector(".applications__list");
  if (data.length == 0) {
    const p = `<p class="no__item">There Is No ${message} Application!</p>`;
    ul.insertAdjacentHTML("beforeend", p);
    return;
  }

  const status = {
    pending: "New",
    approve: "Approved",
    reject: "Rejected",
  };

  data.forEach((item) => {
    const src = item.fprofile
      ? `../../uploads/profiles/${item.fprofile}`
      : "../../images/profile.webp";

    const li = `
      <li class="application__item">
          <h2 class="item__title">
              ${item.title}
          </h2>
          <p class="item__status">
              ${status[item.status]}
          </p>
          <a href="../profile/freelancer.html?freelancer=${item.funame}">
            <figure class="item__profile">
                <img class="img" src="${src}
                " alt="profile picture of ${item.ffname} ${item.flname}" width="100">
                <figcaption class="caption">
                    <h3 class="name">${item.ffname} ${item.flname}</h3>
                    <p class="headline">
                        ${item.headline ?? "No Headline Provided"}
                    </p>
                </figcaption>
            </figure>
          <a>
          <p class="item__applicant">
              ${item.message}
          </p>
          <div class="item__btns">
              <button class="btn">
                  <a class="item__btn" href="../messages/index.html?id=${item.funame}">Message</a>
              </button>
              ${applyBtnConstructor(item.status)}
          </div>
      </li>
  `;
    ul.insertAdjacentHTML("beforeend", li);
  });
};

const applyBtnConstructor = (stat) => {
  const btn = (stat, word) =>
    `<button data-stat="${stat}" class="item__btn">${word}</button>`;

  if (stat == "pending") {
    return `${btn("approve", "Approve")} ${btn("reject", "Reject")}`;
  } else if (stat == "approve") {
    return btn("finish", "Finish");
  }
  return "";
};
