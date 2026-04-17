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

  updateProfileHandler();
  profileTextsUpdate();
  aboutmeTextHandler();
  skillDeleter()

  const navBar = document.querySelector(".aside__nav");
  const menu = document.querySelector(".menu");
  const menuIcons = document.querySelectorAll(".menu-icon");
  const navItems = navBar.querySelectorAll("ul, li,a");

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

const updateProfileHandler = () => {
  const profile = document.querySelector(".mainpp__img");
  const input = document.querySelector("#profile-update");
  const uploadBtn = document.querySelector(".update__profile--btn");
  const profilePreview = document.querySelector(".profile__preview");
  const profilePreviewImg = profilePreview.querySelector("img");
  const uploadTrigger = document.querySelector(".upload__trigger");
  const uploadCanceler = document.querySelector(".upload__canceler");
  const form = document.querySelector(".mainpp__fig form");

  profile.addEventListener("click", (e) => {
    input.click();
    profilePreview.classList.add("active");
  });

  uploadBtn.addEventListener("click", (e) => {
    input.click();
    profilePreview.classList.add("active");
  });

  uploadCanceler.addEventListener("click", (e) => {
    profilePreview.classList.remove("active");
  });

  uploadTrigger.addEventListener("click", (e) => {
    const file = input.files[0];

    if (file) {
      const allowed = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

      if (!allowed.includes(file.type)) {
        return;
      }

      const maxLimit = 5 * 1024 * 1024;
      if (file.size > maxLimit) {
        return;
      }

      profileSubmitHandler(file);
    }
  });

  profileUploader(input, profilePreviewImg);
};

const profileUploader = (input, imgPreview) => {
  input.addEventListener("change", (e) => {
    const file = input.files[0];

    if (file) {
      const readFile = new FileReader();

      readFile.onload = (e) => {
        imgPreview.src = e.target.result;
      };

      readFile.readAsDataURL(file);
    }
  });
};

const profileSubmitHandler = (file) => {
  const formData = new FormData();
  formData.append("profile", file);

  console.log(file);

  // TODO -> upload profile
};

const profileTextsUpdate = () => {
  const form = document.querySelector(".profile__form");
  const oldData = {
    firstName: form.fname.value,
    lastName: form.lname.value,
    address: form.address.value,
    headline: form.headline.value,
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = {
      firstName: form.fname.value,
      lastName: form.lname.value,
      address: form.address.value,
      headline: form.headline.value,
    };

    const isSame = [...Object.values(oldData)].every((item) =>
      [...Object.values(data)].includes(item),
    );

    if (isSame) return;
    // TODO -> fetch to submit the form
  });
};

const aboutmeTextHandler = () => {
  const form = document.querySelector(".about__form");
  const txt = form.about.value

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputTxt = form.about.value

    if(txt === inputTxt) return

    const paragraphs = inputTxt.split("\n")
    // TODO -> fetch to submit
  });
};

const skillDeleter = ()=>{
  const btns = document.querySelectorAll(".skill__btn.delete")
  btns.forEach(btn=>{
    btn.addEventListener("click",(e)=>{
      const id = btn.dataset.id
      const item = document.querySelector(`[data-id="${id}"]`)

      // TODO -> fetch
      item.remove()
    })
  })
}