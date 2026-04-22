import { baseUrl } from "./api_base.js";

window.addEventListener("load", async () => {
  const loading = document.querySelector(".loading");

  loading.classList.add("close");
  await checkAuth();
  setTimeout(() => {
    loading.style.display = "none";
    init();
  }, 500);
});

const init = () => {
  document.querySelector("#app").classList.add("loaded");

  backAnimation();
  document.querySelector(".input__eye").addEventListener("click", (e) => {
    const password = document.querySelector(".form__input.password");
    const icons = e.currentTarget.querySelectorAll("span");
    icons.forEach((ico) => {
      ico.classList.toggle("active");
    });

    password.type = password.type == "text" ? "password" : "text";
  });
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

const checkAuth = async () => {
  const res = await fetch(`${baseUrl}/auth/me.php`);
  const data = await res.json();

  if (res.status === 200) {
    if (data?.message?.roll === "freelancer") {
      location.replace("../../freelancer");
    } else {
      location.replace("../../client");
    }
  }
};
