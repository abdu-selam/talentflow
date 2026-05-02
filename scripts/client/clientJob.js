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
  const updateBtn = document.querySelector(".main__btn--head a");
  updateBtn.href = `./job-update.html?job=${data.id}`;

  const jobTitle = document.querySelector(".job__title");
  jobTitle.textContent = data.title;

  const category = document.querySelector(".job__category .result");
  const status = document.querySelector(".job__status .result");
  const type = document.querySelector(".job__type .result");
  const salary = document.querySelector(".job__salary .result");
  const apply = document.querySelector(".job__apply .result");
  const desc = document.querySelector(".job__desc .result");
  const address = document.querySelector(".job__location .address");

  const jobTypes = {
    full: "Full Time",
    part: "Part Time",
    intern: "Internship",
  };

  type.textContent = jobTypes[data.job_type];

  category.textContent = data.category;
  status.textContent = data.status;
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

  const seeApplysBtn = document.querySelector(".job__btns .job__btn a");
  seeApplysBtn.href = `../applications/job.html?id=${data.id}`;
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

const createLi = (text, elem) => {
  const li = document.createElement("li");
  li.textContent = text;
  li.classList.add("item");
  elem.append(li);
};
