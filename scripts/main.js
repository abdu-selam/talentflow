window.addEventListener("load", async () => {
  const loading = document.querySelector(".loading");

  await checkUser();
  loading.classList.add("close");
  init();
  setTimeout(() => {
    loading.style.display = "none";
  }, 500);
});

const init = () => {
  document.getElementById("app").style.display = "block";

  const navBar = document.querySelector(".header__nav");
  const menu = document.querySelector(".menu");
  const menuIcons = document.querySelectorAll(".menu-icon");
  const navItems = navBar.querySelectorAll("ul, li,a");

  const heroImages = document.querySelectorAll(".hero__back img");

  const faqs_item = document.querySelectorAll(".faqs__item");
  const faqs_close = document.querySelectorAll(".faqs__icon");
  const containers = document.querySelectorAll(".faqs__container");
  const faqsBtns = document.querySelectorAll(".faqs__btn");
  const faqsBtnsWrapper = document.querySelector(".faqs__btns");

  document.querySelector(".footer__year").textContent =
    new Date().getFullYear();

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

  let curr = 0;
  setInterval(() => {
    heroImages.forEach((img, i) => {
      if (i == curr) {
        img.classList.add("active");
      } else {
        img.classList.remove("active");
      }
    });
    if (curr == 4) {
      curr = 0;
    } else {
      curr++;
    }
  }, 3000);

  faqs_close.forEach((faq, i) => {
    faq.addEventListener("click", (e) => {
      faqs_item[i].classList.toggle("open");
    });
  });

  faqsBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      if (btn.classList.contains("active")) return;
      faqsBtns.forEach((b) => b.classList.toggle("active"));
      faqsBtnsWrapper.classList.toggle("active");
      containers.forEach((contain) => contain.classList.toggle("active"));
    });
  });
};

const checkUser = async () => {
  // TO-Do fetch user data using the cookie
  // now for frontend check
  const userData = JSON.parse(sessionStorage.getItem("user"));
  if (!userData) {
    return;
  }

  if (userData.roll == "freelancer") {
    location.replace("/freelancer");
  } else {
    location.replace("/client");
  }
};
