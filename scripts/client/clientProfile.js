import { baseUrl } from "../api_base.js";

window.addEventListener("load", async() => {
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
};

const fetcher = async () => {
  const params = new URLSearchParams(location.search);

  const path = location.pathname.split("/");
  const uname = params.get("client");

  const logic = "client.html" == path[path.length - 1];
  if (logic && !uname) {
    console.log("first")
    location.replace("./");
    return;
  }

  const res = await fetch(`${baseUrl}/freelancer/profile.php?uname=${uname}`);
  const res_data = await res.json();
  const data = res_data.message;

  if (res.status != 200) {
    location.replace("../../");
    return
  }

  if (logic && data.roll == "freelancer") {
    location.replace("./");
    return;
  }

  profileBldr(data);
  aboutBldr(data);
  jobPostBldr(data, logic);
};

const profileBldr = (data) => {
  const profilePic = document.querySelector(".mainpp__img");
  const profileName = document.querySelector(".mainpp__name");
  const address = document.querySelector(".mainpp__location .data");
  const headline = document.querySelector(".mainpp__headline");
  const email = document.querySelector(".mainpp__email .data");

  const path = data.profile
    ? `../../uploads/profiles/${data.profile}`
    : "../../images/profile.webp";

  profilePic.src = path;
  profileName.textContent = `${data.fname} ${data.lname ?? ""}`;
  address.textContent = data.address ?? "unknown location";
  headline.textContent = data.headline ?? "No Headline Provided";
  email.textContent = data.email ?? "";
};

const aboutBldr = (data) => {
  const aboutSection = document.querySelector(".main__about");

  if (!data.about?.length) {
    const p = `
    <p class="no__item">
      There Is No About Text!
    </p>
    `;

    aboutSection.insertAdjacentHTML("beforeend", p);
  } else {
    data.about?.forEach((item) => {
      const p = `<p class="about__txt">${item}</p>`;
      aboutSection.insertAdjacentHTML("beforeend", p);
    });
  }
};

const jobPostBldr = (data, isFreelancer) => {
  const ul = document.querySelector(".portfolio__list");

  if (!data.posted_jobs?.length) {
    const p = `
    <p class="no__item">
      There Is No Posted jobs!
    </p>
    `;

    ul.insertAdjacentHTML("beforeend", p);
    return;
  }

  
  data.posted_jobs?.forEach((item) => {
    const url = isFreelancer ? `../../jobs/job.html?job=${item.id}` : "../jobs-post/"

    const li = `
      <li class="portfolio__item">
        <h3 class="portfolio__title">
          ${item.title}
        </h3>
        <p class="portfolio__category">
          <span class="txt">Category</span>
          <span class="result">${item.category}</span>
        </p>
        <p class="portfolio__description">
          ${item.description.slice(0, 80)}....
        </p>
        <button class="portfolio__btn">
          <a href="${url}" class="portfolio__link">
            See Detail
          </a>
        </button>
      </li>
    `;

    ul.insertAdjacentHTML("beforeend", li);
  });
};
