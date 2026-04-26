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
};

const fetcher = async () => {
  const params = new URLSearchParams(location.search);
  const uname = params.get("freelancer");

  const res = await fetch(`${baseUrl}/freelancer/profile.php?uname=${uname}`);
  const res_data = await res.json();
  const data = res_data.message;

  profileBldr(data);
  aboutBldr(data);
  skillBldr(data);
  portfolioBrdr(data.sample_portfolio);

  const linkBtn = document.querySelector(".itempp__btn.resume");
  if (data.resume) {
    const a = linkBtn.querySelector("a");
    a.href = `../../uploads/resumes/${data.resume}`;
    a.download = "resume-" + Date.now() + ".pdf";
  } else {
    linkBtn.remove();
  }
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

const skillBldr = (data) => {
  const hardSkillsList = document.querySelector(".hard__skills .skills__list");
  const softSkillsList = document.querySelector(".soft__skills .skills__list");

  const li = (item) => `
  <li class="skill__item">
    <p class="skill__name">${item.name}</p>
    <div class="progress__wrapper">
      <p class="skill__prog">
        <span> Level </span>
        <span> ${item.level}% </span>
      </p>
      <div style="--i: ${item.level}%" class="prog__div"></div>
    </div>
  </li>
  `;

  if (data.hard_skills.length == 0) {
    const p = `
    <p class="no__item">
      There Is No Hard Skill Added!
    </p>
    `;

    hardSkillsList.insertAdjacentHTML("beforeend", p);
  } else {
    data.hard_skills.forEach((item) => {
      hardSkillsList.insertAdjacentHTML("beforeend", li(item));
    });
  }

  if (data.soft_skills.length == 0) {
    const p = `
    <p class="no__item">
      There Is No Soft Skill Added!
    </p>
    `;

    softSkillsList.insertAdjacentHTML("beforeend", p);
  } else {
    data.soft_skills.forEach((item) => {
      softSkillsList.insertAdjacentHTML("beforeend", li(item));
    });
  }
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
            src="${"../../uploads/portfolio/" + item.image ?? "../../images/bg-smooth-1.webp"}"
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
