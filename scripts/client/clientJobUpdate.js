window.addEventListener("load", () => {
  const loading = document.querySelector(".loading");

  loading.classList.add("close");
  init();
  setTimeout(() => {
    loading.style.display = "none";
  }, 500);
});

const init = () => {
  document.querySelector("#app").style.display = "flex";

  const form = document.querySelector(".main__wrapper");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  fetcher();
  jobType();
  dateInputsHandler();
  salaryInput();
  deleteResReq();
  addReqRes();
  updateJob();
};

const fetcher = async () => {
  const params = new URLSearchParams(location.search);
  const jobId = params.get("job");

  if (!jobId) {
    location.replace("./");
  }

  // fetch requiest for single
};

const jobType = () => {
  const items = document.querySelectorAll(".input__wrapper.job-type .item");
  items.forEach((item) => {
    item.addEventListener("click", (e) => {
      items.forEach((item) => item.classList.remove("active"));

      item.classList.add("active");
    });
  });
};

const dateInputsHandler = () => {
  const dayInputs = document.querySelector(".mainpp__input.day");
  const yearInputs = document.querySelector(".mainpp__input.year");

  dayInputs.addEventListener("input", (e) => {
    const number = Number(dayInputs.value);

    if (!number) {
      dayInputs.value = dayInputs.value.slice(0, dayInputs.value.length - 1);
    } else {
      if (number < 1) {
        dayInputs.value = 0;
      } else if (number > 31) {
        dayInputs.value = 31;
      }
    }
  });

  yearInputs.addEventListener("input", (e) => {
    const number = Number(yearInputs.value);
    const year = new Date().getFullYear();

    if (!number) {
      yearInputs.value = yearInputs.value.slice(0, yearInputs.value.length - 1);
    } else {
      if (number > year) {
        yearInputs.value = year;
      }
    }
  });
};

const salaryInput = () => {
  const input = document.querySelector("#salary");
  input.addEventListener("input", (e) => {
    const word = input.value;
    if (!Number(word)) {
      input.value = word.slice(0, word.length - 1);
    }
  });
};

const deleteResReq = () => {
  const minusIcon = document.querySelectorAll(
    ".job__resp .icon, .job__req .icon",
  );
  minusIcon.forEach((icon) => {
    icon.addEventListener("click", (e) => {
      const parentItem = icon.parentElement;
      parentItem.remove();
    });
  });
};

const resReqItemCreator = (txt) => {
  return `
    <li class="item">
        <p class="txt">${txt}</p>
        <span class="icon">
          <i class="fas fa-minus"></i>
        </span>
    </li>
    `;
};

const addReqRes = () => {
  const inputs = document.querySelectorAll(".resp__input input");
  const btns = document.querySelectorAll(".resp__input button");
  const lists = document.querySelectorAll(".job__resp .list, .job__req .list");

  const addItem = (i) => {
    const word = inputs[i].value;
    if (word.length > 0) {
      lists[i].insertAdjacentHTML("beforeend", resReqItemCreator(word));
      inputs[i].value = "";
      deleteResReq();
    }
  };

  inputs.forEach((input, i) => {
    input.addEventListener("change", () => addItem(i));
  });

  btns.forEach((btn, i) => {
    btn.addEventListener("click", () => addItem(i));
  });
};

const updateJob = () => {
  const form = document.querySelector(".main__wrapper");
  const btn = document.querySelector(".job__btns .job__btn");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  btn.addEventListener("click", (e) => {
    const jobTypeElem = document.querySelector(
      ".input__wrapper.job-type .item.active",
    );
    const deadline = `${form.deadday.value}-${form.deadmonth.value}-${form.deadyear.value}`;
    const responsibilities = [
      ...document.querySelectorAll(".job__resp .txt"),
    ].map((item) => item.textContent);
    const requirements = [...document.querySelectorAll(".job__req .txt")].map(
      (item) => item.textContent,
    );

    const data = {
      title: form.title.value,
      category: form.category.value,
      address: form.address.value,
      jobtype: jobTypeElem.textContent.toLowerCase(),
      salary: form.salary.value,
      deadline,
      description: form.description.value,
      responsibilities,
      requirements,
    };

    uploader(data)
  });
};

const uploader = (formData) => {
  // fetch requiest
};
