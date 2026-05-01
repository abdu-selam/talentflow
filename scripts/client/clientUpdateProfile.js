import { baseUrl } from "../api_base.js";
import { alert } from "../alert.js";

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

  updateProfileHandler();
  profileTextsUpdate();
  aboutmeTextHandler();
};

const fetcher = async () => {
  const res = await fetch(`${baseUrl}/freelancer/profile.php`);
  const res_data = await res.json();
  const data = res_data.message;

  profileBldr(data);
  aboutBldr(data);
};

const profileBldr = (data) => {
  const profilePic = document.querySelector(".mainpp__img");
  const profileForm = document.querySelector(".profile__form");

  const path = data.profile
    ? `../../uploads/profiles/${data.profile}`
    : "../../images/profile.webp";

  profilePic.src = path;
  profileForm.fname.value = data.fname;
  profileForm.lname.value = data.lname ?? "";
  profileForm.address.value = data.address ?? "";
  profileForm.headline.value = data.headline ?? "";
};

const aboutBldr = (data) => {
  const aboutSection = document.querySelector(".about__input");
  const text = data.about ? data.about?.join("\n") : "";

  aboutSection.value = text ?? "";
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

  uploadTrigger.addEventListener("click", async (e) => {
    const file = input.files[0];

    if (file) {
      const allowed = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

      if (!allowed.includes(file.type)) {
        input.file = [];
        profilePreview.classList.remove("active");
        profilePreviewImg.src = "";
        alert("You have tryed to upload unsupported file format!");
        return;
      }

      const maxLimit = 5 * 1024 * 1024;
      if (file.size > maxLimit) {
        input.file = [];
        profilePreview.classList.remove("active");
        profilePreviewImg.src = "";
        alert("You have tryed to upload more than 5MB file!");
        return;
      }

      const result = await profileSubmitHandler(file);
      if (result.status) {
        input.file = [];
        profilePreview.classList.remove("active");
        profilePreviewImg.src = "";
        const profilePic = document.querySelector(".mainpp__img");
        const profileImg = document.querySelector(".aside__pp");

        const path = `../../uploads/profiles/${result.pp}`;

        profilePic.src = path;
        profileImg.src = path;
        alert(
          "Congratulation You Have been updated profile picture!",
          "success",
        );
      }
    } else {
      input.click();
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

const profileSubmitHandler = async (file) => {
  const formData = new FormData();
  formData.append("profile", file);

  const res = await fetch(`${baseUrl}/freelancer/profile.php?type=pp`, {
    method: "POST",
    body: formData,
  });

  const res_data = await res.json();
  const data = res_data.message;

  return { status: res.status == 200, pp: data };
};

const profileTextsUpdate = () => {
  const form = document.querySelector(".profile__form");
  const btn = document.querySelector(".submit__btn");
  const oldData = {
    firstName: form.fname.value,
    lastName: form.lname.value,
    address: form.address.value,
    headline: form.headline.value,
  };
  const inputs = document.querySelectorAll(".mainpp__input");

  inputs.forEach((input, i) => {
    input.addEventListener("keydown", (e) => {
      if (e.key != "Enter" || i === 3) return;
      inputs[i + 1].focus();
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  btn.addEventListener("click", async (e) => {
    const req = {
      firstName: form.fname.value,
      lastName: form.lname.value,
      address: form.address.value,
      headline: form.headline.value,
    };

    const isSame = [...Object.values(oldData)].filter(
      (item, i) => [...Object.values(req)][i] == item,
    );

    if (isSame.length == 4) {
      alert("Nothing to change!");
      return;
    }

    const res = await fetch(`${baseUrl}/freelancer/profile.php`, {
      method: "POST",
      body: JSON.stringify(req),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res_data = await res.json();
    const data = res_data.message;

    form.fname.value = data.fname;
    form.lname.value = data.lname;
    form.address.value = data.address;
    form.headline.value = data.headline;

    alert("Profile texts has been updated successfully!", "success");
  });
};

const aboutmeTextHandler = () => {
  const form = document.querySelector(".about__form");
  let txt = form.about.value;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const inputTxt = form.about.value;

    if (txt === inputTxt) return;

    const paragraphs = inputTxt.split("\n");
    const res = await fetch(`${baseUrl}/freelancer/profile.php?type=about`, {
      method: "POST",
      body: JSON.stringify({
        texts: paragraphs,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res_data = await res.json();
    const data = res_data.message;

    if (res.status == 200) {
      form.about.value = data.join("\n");
      txt = data.join("\n");
      alert("About me text has been updated successfully!", "success");
    }
  });
};
