window.addEventListener("load", () => {
  const loading = document.querySelector(".loading");

  loading.classList.add("close");
  setTimeout(() => {
    loading.style.display = "none";
    init();
  }, 500);
});

const init = () => {
  document.querySelector("#app").classList.add("loaded");

  backAnimation();
};

const backAnimation = () => {
  const flows = document.querySelectorAll(".flows");

  flows.forEach((flow) => {
    // random position for the flow elements
    const randomX = Math.floor(Math.random() * window.innerWidth);
    const randomY = Math.floor(Math.random() * window.innerHeight);

    flow.style.left = `${randomX}px`;
    flow.style.top = `${randomY}px`;
  });
  setInterval(() => {
    // repeating the animation in every 3 seconds
    flows.forEach((flow) => {
      const randomX = Math.floor(Math.random() * window.innerWidth);
      const randomY = Math.floor(Math.random() * window.innerHeight);

      flow.style.left = `${randomX}px`;
      flow.style.top = `${randomY}px`;
    });
  }, 3000);
};
