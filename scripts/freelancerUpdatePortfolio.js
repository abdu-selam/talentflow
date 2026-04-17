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

  const navBar = document.querySelector(".aside__nav");
  const menu = document.querySelector(".menu");
  const menuIcons = document.querySelectorAll(".menu-icon");
  const navItems = navBar.querySelectorAll("ul, li,a");

  dateInputsHandler();
  deletePortfolioImg();
  addPortfolioImg();
  formHadler();

  menu.addEventListener("click", (e) => {
    menu.classList.toggle("active");
    navBar.classList.toggle("active");
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
    btn.addEventListener("click", (e) => {
      const img = document.querySelector(`li[data-id="${btn.dataset.id}"]`);

      //   TODO -> make api call
      img.remove();
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

const formHadler = () => {
  const form = document.querySelector(".main__portfolios");
  const btn = document.querySelector(".update__portfolio");
  const imgInputElem = document.querySelector("#img-to-add");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  btn.addEventListener("click", (e) => {
    const formData = new FormData();

    const title = form.title.value;
    const startDate = `${form.startday.value}-${form.startmonth.value + 1}-${form.startyear.value}`;
    const endDate = `${form.endday.value}-${form.endmonth.value + 1}-${form.endyear.value}`;
    const descriptions = form.description.value.split("\n");

    formData.append("title", title);
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);
    formData.append("description", JSON.stringify(descriptions));

    const files = imgInputElem.files;

    if (files.length) {
      const filteredFiles = [...files].filter((file) =>
        file.type.startsWith("image/"),
      );

      filteredFiles.forEach((file, i) => {
        formData.append("images[]", file);
      });
    }

    uploader(formData);
  });
};

const uploader = (formData) => {
  // fetch requiest
};
