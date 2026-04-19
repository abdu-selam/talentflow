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
  const filterItems = document.querySelectorAll(".filter__item")

  filterItems.forEach((item)=>{
    item.addEventListener("click",(e)=>{
        filterItems.forEach(item=>item.classList.remove("active"))

        item.classList.add("active")
        // TODO add fetch to fetch data
    })
  })
};
