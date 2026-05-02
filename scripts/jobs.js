import { baseUrl } from "./api_base.js";

window.addEventListener("load", async () => {
  const loading = document.querySelector(".loading");

  await authChecker();
  await fetcher();
  await fetchCategory();
  loading.classList.add("close");
  init();
  setTimeout(() => {
    loading.style.display = "none";
  }, 500);
});

const init = () => {
  document.querySelector("#app").style.display = "block";
  navOpener();
  formHandler();
  search();
};

const authChecker = async () => {
  const btn = document.querySelector(".header__btn a");
  const jobPostBtn = document.querySelector(".header__link.post");

  try {
    const res = await fetch(`${baseUrl}/auth/me.php`);
    const data = await res.json();

    if (res.status === 200) {
      btn.href = "../";
      btn.textContent = "Dashboard";

      if (data.message.roll == "freelancer") {
        jobPostBtn?.parentElement?.remove();
      } else if (data.message.roll == "client") {
        jobPostBtn.href = "../client/jobs-post/add-job.html";
      }
    } else {
      console.clear();
    }
  } catch (error) {
    console.clear();
  }
};

const navOpener = () => {
  const filterXIcon = document.querySelector(".filter-x-icon");
  const filterOpenIcon = document.querySelector(".filter-toggle");
  const filters = document.querySelector(".filters");

  const navBar = document.querySelector(".header__nav");
  const menu = document.querySelector(".menu");
  const menuIcons = document.querySelectorAll(".menu-icon");
  const navItems = navBar.querySelectorAll("ul, li,a");

  menu.addEventListener("click", (e) => {
    menu.classList.toggle("active");
    navBar.classList.toggle("active");
  });

  filterOpenIcon.addEventListener("click", (e) => {
    filters.classList.add("open");
  });

  filterXIcon.addEventListener("click", (e) => {
    filters.classList.remove("open");
  });

  window.addEventListener("click", (e) => {
    const elem = e.target;
    if (![...navItems, ...menuIcons, menu, navBar].includes(elem)) {
      menu.classList.remove("active");
      navBar.classList.remove("active");
    }
  });

  window.addEventListener("scroll", () => {
    menu.classList.remove("active");
    navBar.classList.remove("active");
  });
};

const fetcher = async () => {
  const res = await fetch(`${baseUrl}/freelancer/job.php`);
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
    });
  }
};

const fetchCategory = async () => {
  const res = await fetch(`${baseUrl}/client/categories.php`);
  const res_data = await res.json();

  const data = res_data.message;

  const selectElem = document.querySelector("#category");
  data.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.name;
    option.textContent = item.name;

    selectElem.append(option);
  });
};

const job_constructor = (data) => {
  const jobTypes = {
    full: "Full Time",
    part: "Part Time",
    intern: "Internship",
  };
  const ul = document.querySelector(".jobs__list");

  const li = `
  <li class="jobs__item">
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

const formHandler = () => {
  const form = document.querySelector(".filter__form");
  const btn = document.querySelector(".filter__btn");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  btn.addEventListener("click", (e) => {
    const jobTypes = ["full", "part", "intern"];
    const types = [...form["type[]"]]
      .map((item, i) => ({ check: item.checked, type: jobTypes[i] }))
      .filter((item) => item.check)
      .map((item) => item.type);

    const category = form.category.value;

    const sortType = ["date", "name", "salary"];
    const sortBy = [...form["sort"]]
      .map((item, i) => ({ check: item.checked, type: sortType[i] }))
      .filter((item) => item.check)
      .map((item) => item.type)[0];

    const sortOrder = ["acc", "dcc"];
    const order = [...form["order"]]
      .map((item, i) => ({ check: item.checked, type: sortOrder[i] }))
      .filter((item) => item.check)
      .map((item) => item.type)[0];

    const data = {
      types,
      category,
      sortBy,
      order,
    };

    filterFetch(data);
  });
};

const filterFetch = async (req) => {
  const res = await fetch(`${baseUrl}/freelancer/filtered_jobs.php`, {
    method: "POST",
    body: JSON.stringify(req),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const res_data = await res.json();

  const data = res_data.message;

  if (res.status == 200) {
    const ul = document.querySelector(".jobs__list");
    ul.innerHTML = "";
    if (data.length == 0) {
      const p = '<p class="no__item">There Is No Job has been posted!</p>';

      ul.insertAdjacentHTML("beforeend", p);
      return;
    }

    const jobs = sortFilter(data, req.sortBy, req.order);

    jobs.forEach((item) => {
      job_constructor(item);
    });
  }
};

const sortFilter = (jobs, sortType, order) => {
  const types = {
    date: "post_date",
    name: "title",
    salary: "salary",
  };

  const type = types[sortType];

  if (type == "title") {
    return [...jobs].sort((a, b) => {
      let valA = a[type];
      let valB = b[type];

      return order === "acc"
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    });
  }

  return [...jobs].sort((a, b) => {
    let valA = sortType == "date" ? new Date(a[type]).getTime() : a[type];
    let valB = sortType == "date" ? new Date(b[type]).getTime() : b[type];

    return order === "acc" ? valA - valB : valB - valA;
  });
};

const search = () => {
  const icon = document.querySelector(".search__ico");
  const result = document.querySelector(".search__result");
  const resultList = document.querySelector(".search__list");
  const close = document.querySelector(".search__close");
  const input = document.querySelector("#search");

  input.addEventListener("click", (e) => {});

  close.addEventListener("click", (e) => {
    result.classList.remove("active");
    resultList.innerHTML = "";
    input.value = "";
  });

  input.addEventListener("input", async (e) => {
    result.classList.add("active");
    const value = input.value;
    resultList.innerHTML = "";
    if (value == "") {
      return;
    }
    const res = await fetch(`${baseUrl}/freelancer/fuzzy_jobs.php?t=${value}`);
    const data = await res.json();
    data.message.forEach((item) => {
      const li = `
        <li class="search__item">
          <a href="./job.html?job=${item.id}">
            <h2 class="search__title">${item.title}</h2>
            <p class="search__category">${item.category}</p>
          </a>
        </li>`;

      resultList.insertAdjacentHTML("beforeend", li);
    });
  });

  input.addEventListener("keypress", async (e) => {
    if (e.key != "Enter") {
      return;
    }
    const value = input.value;
    resultList.innerHTML = "";
    if (value == "") {
      return;
    }
    searchAll(value);
    result.classList.remove("active");
    input.value = "";
  });

  icon.addEventListener("click", async (e) => {
    const value = input.value;
    resultList.innerHTML = "";
    if (value == "") {
      return;
    }
    searchAll(value);
    result.classList.remove("active");
    input.value = "";
  });
};

const searchAll = async (value) => {
  const res = await fetch(`${baseUrl}/freelancer/fuzzy_jobs.php?q=${value}`);
  const res_data = await res.json();

  const data = res_data.message;

  if (res.status == 200) {
    const ul = document.querySelector(".jobs__list");

    ul.innerHTML = "";

    if (data.length == 0) {
      const p = '<p class="no__item">There Is No Job has been posted!</p>';

      ul.insertAdjacentHTML("beforeend", p);
      return;
    }

    data.forEach((item) => {
      job_constructor(item);
    });
  }
};
