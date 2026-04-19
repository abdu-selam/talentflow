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

  handleFilterClicks()
};

const handleFilterClicks = () => {
  const filterItems = document.querySelectorAll(".client__item");

  filterItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      // filter logic
      filterItems.forEach((item) => item.classList.remove("active"));

      item.classList.add("active");
    });
  });
};
