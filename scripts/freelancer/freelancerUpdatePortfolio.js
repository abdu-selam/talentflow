import { baseUrl } from "../api_base.js";
import { alert } from "../alert.js";

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

  dateInputsHandler();
  deletePortfolioImg();
  addPortfolioImg();
  formHadler();
};

const fetcher = async () => {
  const path = location.pathname.split("/");
  if (path[path.length - 1] != "update.html") return;

  const params = new URLSearchParams(location.search);
  const id = params.get("portfolio-id");

  const res = await fetch(
    `${baseUrl}/freelancer/portfolio.php?portfolio-id=${id}`,
  );

  const res_data = await res.json();
  const data = res_data.message;

  portfolioBldr(data);
  deletePortfolioImg();
};

const portfolioBldr = (data) => {
  const form = document.querySelector(".main__portfolios");
  form.title.value = data.title;

  const [syear, smonth, sday] = data.start_date.elem.split("-");
  form.startday.value = sday[0] == "0" ? sday[1] : sday;
  form.startmonth.value = smonth[0] == "0" ? smonth[1] : smonth;
  form.startyear.value = syear;

  const [eyear, emonth, eday] = data.end_date.elem.split("-");
  form.endday.value = eday[0] == "0" ? eday[1] : eday;
  form.endmonth.value = emonth[0] == "0" ? emonth[1] : emonth;
  form.endyear.value = eyear;

  form.description.value = data.descriptions.join("\n");

  let count = 0;
  for (const img of data.images) {
    const src = "../../uploads/portfolio/" + img;
    imgItemCreater(src, img);
    count++;
  }
};

const dateInputsHandler = () => {
  const dayInputs = document.querySelectorAll(".item__input.day");
  const yearInputs = document.querySelectorAll(".item__input.year");

  dayInputs.forEach((item) => {
    item.addEventListener("input", (e) => {
      const number = Number(item.value);

      if (!number) {
        item.value = item.value.slice(0, item.value.length - 1);
      } else {
        if (number < 1) {
          item.value = 0;
        } else if (number > 31) {
          item.value = 31;
        }
      }
    });
  });

  yearInputs.forEach((item) => {
    item.addEventListener("input", (e) => {
      const number = Number(item.value);
      const year = new Date().getFullYear();

      if (!number) {
        item.value = item.value.slice(0, item.value.length - 1);
      } else {
        if (number > year) {
          item.value = year;
        }
      }
    });
  });
};

const deletePortfolioImg = () => {
  const btns = document.querySelectorAll(".img__delete");

  btns.forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const img = document.querySelector(`li[data-id="${btn.dataset.id}"]`);
      const params = new URLSearchParams(location.search);
      const id = params.get("portfolio-id");

      if (btn.dataset.id.split("-")[0] == "pending") {
        img?.remove();
        return;
      }
      const res = await fetch(
        `${baseUrl}/freelancer/portfolio.php?name=${btn.dataset.id}&id=${id}&type=img`,
        {
          method: "DELETE",
        },
      );

      if (res.status == 204) {
        img?.remove();
        alert("Image has been deleted successfully", "success");
        return;
      }
      alert("Image is not deleted! something went wrong!");
    });
  });
};

const addPortfolioImg = () => {
  const btn = document.querySelector(".add__img");
  const imgInputElem = document.querySelector("#img-to-add");

  btn.addEventListener("click", (e) => {
    imgInputElem.click();
  });

  imgInputElem.addEventListener("change", (e) => {
    const files = imgInputElem.files;

    if (files.length) {
      const filteredFiles = [...files].filter((file) =>
        file.type.startsWith("image/"),
      );

      filteredFiles.forEach((file, i) => {
        const readFile = new FileReader();

        readFile.onload = (e) => {
          imgItemCreater(e.target.result, `pending-${i}`);
          deletePortfolioImg();
        };

        readFile.readAsDataURL(file);
      });
    }
  });
};

const imgItemCreater = (img, id) => {
  const ul = document.querySelector(".portfolio__imgs");
  const li = `
    <li data-id="${id}" class="portfolio__img">
        <img
        src="${img}"
        alt=""
        class="img"
        width="200"
        />
        <button data-id="${id}" class="img__delete">
        Delete
        </button>
    </li>
    `;

  ul.insertAdjacentHTML("beforeend", li);
};

const dateChecker = (startDate, endDate) => {
  const start_date = new Date(startDate);
  const end_date = new Date(endDate);

  const start = start_date.getTime();
  const end = end_date.getTime();

  return end > start;
};

const formHadler = () => {
  const form = document.querySelector(".main__portfolios");
  const btn = document.querySelector(".update__portfolio");
  const imgInputElem = document.querySelector("#img-to-add");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  btn.addEventListener("click", (e) => {
    const formData = new FormData();
    const eachImgElemUpdate = document.querySelectorAll(".portfolio__img");
    const dataSet = [...eachImgElemUpdate]
      .filter((item) => item.dataset.id.split("-")[0] == "pending")
      .map((item) => item.dataset.id.split("-")[1]);

    const title = form.title.value;
    const startDate = `${form.startyear.value}-${String(Number(form.startmonth.value) + 1).padStart(2, "0")}-${String(form.startday.value).padStart(2, "0")}`;
    const endDate = `${form.endyear.value}-${String(Number(form.endmonth.value) + 1).padStart(2, "0")}-${String(form.endday.value).padStart(2, "0")}`;

    if (!dateChecker(startDate, endDate)) {
      alert("Start date should be less than end date");
      return;
    }

    const descriptions = form.description.value
      .split("\n")
      .map((item) => item.trim())
      .filter((item) => item !== "");

    formData.append("title", title);
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);
    formData.append("description", JSON.stringify(descriptions));

    const files = imgInputElem.files;

    if (files.length) {
      const filteredFiles = [...files].filter(
        (file, i) => file.type.startsWith("image/") && dataSet.includes(`${i}`),
      );

      filteredFiles.forEach((file, i) => {
        formData.append("images[]", file);
      });
    }

    uploader(formData);
  });
};

const uploader = async (formData) => {
  const path = location.pathname.split("/");
  if (path[path.length - 1] != "update.html") {
    const res = await fetch(`${baseUrl}/freelancer/portfolio.php`, {
      method: "POST",
      body: formData,
    });
    if (res.status === 200) {
      alert("Portfolio created successfully", "success");
      location.assign("./");
    } else {
      alert("Error has been occured! portfolio is not created");
    }

    return;
  }

  const params = new URLSearchParams(location.search);
  const id = params.get("portfolio-id");

  const res = await fetch(`${baseUrl}/freelancer/portfolio.php?id=${id}`, {
    method: "POST",
    body: formData,
  });
  if (res.status === 200) {
    alert("Portfolio Updated successfully", "success");
    location.assign("./");
  } else {
    alert("Error has been occured! portfolio is not updated");
  }
};
