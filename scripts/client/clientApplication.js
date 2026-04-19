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
  filterItems();
};

const filterItems = () => {
  const items = document.querySelectorAll(".filter__item");

  items.forEach((item) => {
    item.addEventListener("click", (e) => {
      items.forEach((item) => item.classList.remove("active"));
      item.classList.add("active");
    });
  });
};
