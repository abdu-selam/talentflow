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

  deleteProfile();
};

const deleteProfile = () => {
  const btns = document.querySelectorAll(".delete__portfolio");
  btns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const item = document.querySelector(
        `li.portfolio__item[data-id="${btn.dataset.id}"]`,
      );

      // fetch request
      item.remove();
    });
  });
};
