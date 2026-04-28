import { baseUrl } from "./api_base.js";

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
  document.querySelector("#app").style.display = "block";
  isLoged();
  navBar();
};

const navBar = () => {
  const navBar = document.querySelector(".header__nav");
  const menu = document.querySelector(".menu");
  const menuIcons = document.querySelectorAll(".menu-icon");

  menu.addEventListener("click", (e) => {
    menu.classList.toggle("active");
    navBar.classList.toggle("active");
  });

  window.addEventListener("click", (e) => {
    const elem = e.target;
    if (![...menuIcons, menu, navBar].includes(elem)) {
      menu.classList.remove("active");
      navBar.classList.remove("active");
    }
  });

  window.addEventListener("scroll", () => {
    menu.classList.remove("active");
    navBar.classList.remove("active");
  });

  document.querySelector(".footer__year").textContent =
    new Date().getFullYear();
};

const fetcher = async () => {
  const params = new URLSearchParams(location.search);
  const jobId = params.get("job");

  if (!jobId) {
    location.replace("./");
  }

  const res = await fetch(`${baseUrl}/freelancer/job.php?job=${jobId}`);

  if (res.status === 200) {
    const res_data = await res.json();

    const data = res_data.message;
    itemBldr(data);
    return;
  }

  location.replace("./");
};

const itemBldr = (data) => {
  const clientName = document.querySelector(".job__poster .txt__wrapper");
  const jobCount = document.querySelector(".job__poster .post__amount");

  clientName.textContent = data.client;
  jobCount.textContent = `${data.count} Jobs Posted`;

  const jobTitle = document.querySelector(".job__title");
  jobTitle.textContent = data.title;

  const category = document.querySelector(".job__category .result");
  const status = document.querySelector(".job__status .result");
  const type = document.querySelector(".job__type .result");
  const salary = document.querySelector(".job__salary .result");
  const apply = document.querySelector(".job__apply .result");
  const desc = document.querySelector(".job__desc .result");
  const address = document.querySelector(".job__location .address");

  category.textContent = data.category;
  status.textContent = data.status;
  type.textContent = data.job_type;
  salary.textContent = `${data.salary} birr`;
  apply.textContent = data.apply_count;
  desc.textContent = data.description;
  address.textContent =
    data.address == "" ? "No Location Provided" : data.address;

  const postTime = document.querySelector(".job__times .post__time time");
  const deadline = document.querySelector(".job__times .dead__time time");

  postTime.textContent = dateFormatter(data.post_date);
  deadline.textContent = dateFormatter(data.deadline);

  postTime.setAttribute("datetime", data.post_date);
  deadline.setAttribute("datetime", data.deadline);

  const requirements = JSON.parse(data.requirements);
  const responsibilities = JSON.parse(data.responsibilities);

  const requirementsElem = document.querySelector(".job__req .list");
  requirements.forEach((item) => {
    createLi(item, requirementsElem);
  });

  const responsibilitiesElem = document.querySelector(".job__resp .list");
  responsibilities.forEach((item) => {
    createLi(item, responsibilitiesElem);
  });
};

const createLi = (text, elem) => {
  const li = document.createElement("li");
  li.textContent = text;
  li.classList.add("item");
  elem.append(li);
};

const dateFormatter = (dateStr) => {
  const date = new Date(dateStr.replace(" ", "T"));

  const formatted = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return formatted;
};

const isLoged = async () => {
  const form = document.querySelector(".job__form");
  const textarea = document.querySelector("#apply-txt");
  const btn = document.querySelector(".job__btn");
  const mainHead = document.querySelector(".main__head");

  const data = await authChecker();
  const userType = data.roll;
  form.style.display = "none";
  if (userType == "client" || userType == "freelancer") {
    mainHead.style.display = "none";
  }

  if (["freelancer", "applyer"].includes(userType)) {
    form.style.display = "flex";

    if (userType == "freelancer") {
      textarea.removeAttribute("disabled");
      btn.removeAttribute("disabled");
      form.classList.remove("unsigned");
    }
  }
};

const authChecker = async () => {
  const btn = document.querySelector(".header__btn a");

  try {
    const res = await fetch(`${baseUrl}/auth/me.php`);
    const data = await res.json();

    if (res.status === 200) {
      btn.href = "../";
      btn.textContent = "Dashboard";
      return data.message;
    }
  } catch (error) {
    console.log(error);
  }
};
