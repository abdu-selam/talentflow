import { baseUrl } from "./api_base.js";
import { alert } from "./alert.js";

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
  navBar();
  applyForm();
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
    isLoged(data);
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
  salary.textContent = `${data.salary} birr`;
  apply.textContent = data.apply_count;
  desc.textContent = data.description;
  address.textContent =
  data.address == "" ? "No Location Provided" : data.address;

  const jobTypes = {
    full: "Full Time",
    part: "Part Time",
    intern: "Internship",
  };

  type.textContent = jobTypes[data.job_type];

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

const isLoged = async (data) => {
  const form = document.querySelector(".job__form");
  const textarea = document.querySelector("#apply-txt");
  const mainHead = document.querySelector(".main__head");

  const auth = await authChecker();
  const userType = auth?.roll;
  form.style.display = "none";
  if (userType == "client" || userType == "freelancer") {
    mainHead.style.display = "none";
  }

  if (userType == "freelancer") {
    form.style.display = "flex";
    if (!data.apllication) {
      textarea.removeAttribute("disabled");
      form.classList.remove("unsigned");
    } else {
      textarea.value = data.apllication;
      console.log(data.apllication);
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
    } else {
      console.clear()
    }
  } catch (error) {
    console.log(error);
  }
};

const applyForm = () => {
  const form = document.querySelector(".job__form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const params = new URLSearchParams(location.search);
    const jobId = params.get("job");

    const message = form.message.value;
    if (message == "") {
      alert("Please type some message for the application!");
      return;
    }

    const res = await fetch(
      `${baseUrl}/freelancer/application.php?job=${jobId}`,
      {
        method: "POST",
        body: JSON.stringify({ message }),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (res.status == 200) {
      const res_data = await res.json();
      const apply = document.querySelector(".job__apply .result");
      apply.textContent = res_data.message;

      alert("Your apply has been accepted successfully!", "success");
      form.message.setAttribute("disabled", "true");
      form.classList.add("unsigned");
      return;
    } else if (res.status == 401) {
      alert("Please type some message for the application!");
      return;
    }

    alert("Error occured in the apply please try again!");
  });
};
