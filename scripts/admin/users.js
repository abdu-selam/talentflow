import { baseUrl } from "../api_base.js";
import { alert, confirm } from "../alert.js";

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
  const app = document.querySelector("#app");

  const res = await fetch(
    `${baseUrl}/admin/users.php?type=${app.dataset.name}`,
  );
  const res_data = await res.json();
  const data = res_data.message;
  const ul = document.querySelector(".main__list");

  if (data.length == 0) {
    const p = `
    <p class="no__item">
      There Is No ${app.dataset.name} in TalentFlow!
    </p>
    `;

    ul.insertAdjacentHTML("beforeend", p);
    return;
  }

  data.forEach((item) => {
    userElemBldr(item);
  });

  deleteUser();
};

const userElemBldr = (item) => {
  const ul = document.querySelector(".main__list");

  const li = `
    <li class="list__item">
        <a href="../profile/${item.roll}.html?${item.roll}=${item.uname}">
            <figure class="item__fig">
                <img
                src="${item.pp ? `../../uploads/profile/${item.pp}` : "../../images/profile.webp"}"
                alt="profile of ${item.uname}"
                class="item__logo"
                width="50"
                />
                <figcaption class="item__caption">
                    <h2 class="item__name">${item.fname} ${item.lname}</h2>
                    <p class="item__uname">${item.uname}</p>
                </figcaption>
            </figure>
        </a>
        <div class="item__type">
            <p class="text">roll</p>
            <p class="result">${item.roll}</p>
        </div>
        <div class="item__type">
            <p class="text">Created At</p>
            <p class="result">March 20, 2025</p>
        </div>
        <div class="item__btns">
            <a href="../messages/index.html?id=${item.uname}" class="item__btn">Message</a>
            <button data-uname="${item.uname}" class="item__btn delete">Delete</button>
        </div>
    </li>
`;

  ul.insertAdjacentHTML("beforeend", li);
};

const deleteUser = () => {
  const btns = document.querySelectorAll("button.item__btn.delete");
  btns.forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const uname = btn.dataset.uname;
      const li = btn.parentElement.parentElement;

      const res = await fetch(`${baseUrl}/admin/users.php?delete=${uname}`);

      if (res.status == 200) {
        li.remove();
        alert("User deleted successfully", "success");
      } else {
        alert("Something went wrong!");
      }
    });
  });
};
