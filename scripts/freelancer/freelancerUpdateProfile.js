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
  skillDeleter();
  addSkill();
  uploadResume();
};

const fetcher = async () => {
  const params = new URLSearchParams(location.search);
  const uname = params.get("freelancer");

  const res = await fetch(`${baseUrl}/freelancer/profile.php?uname=${uname}`);
  const res_data = await res.json();
  const data = res_data.message;

  profileBldr(data);
  aboutBldr(data);
  skillBldr(data);
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

const skillBldr = (data) => {
  const hardSkillsList = document.querySelector(".hard__skills .skills__list");
  const softSkillsList = document.querySelector(".soft__skills .skills__list");

  const li = (item) => `
  <li data-id="${item.id}" class="skill__item">
    <p class="skill__name">${item.name}</p>
    <div class="progress__wrapper">
      <p class="skill__prog">
        <span> Level </span>
        <span> ${item.level}% </span>
      </p>
      <div style="--i: ${item.level}%" class="prog__div"></div>
    </div>
    <div class="skill__btns">
      <button data-id="${item.id}" class="skill__btn delete">
        Delete
      </button>
    </div>
  </li>
  `;

  if (data?.hard_skills?.length === 0) {
    const p = `
    <p class="no__item">
      There Is No Hard Skill Added!
    </p>
    `;

    hardSkillsList.insertAdjacentHTML("beforeend", p);
  } else {
    data?.hard_skills?.forEach((item) => {
      hardSkillsList.insertAdjacentHTML("beforeend", li(item));
    });
  }

  if (data?.soft_skills?.length === 0) {
    const p = `
    <p class="no__item">
      There Is No Soft Skill Added!
    </p>
    `;

    softSkillsList.insertAdjacentHTML("beforeend", p);
  } else {
    data?.soft_skills?.forEach((item) => {
      softSkillsList.insertAdjacentHTML("beforeend", li(item));
    });
  }
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

    const isSame = [...Object.values(oldData)].every((item) =>
      [...Object.values(req)].includes(item),
    );

    if (isSame) {
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

const skillDeleter = () => {
  const btns = document.querySelectorAll(".skill__btn.delete");
  btns.forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const id = btn.dataset.id;
      const item = document.querySelector(`[data-id="${id}"]`);
      const parent = item.parentElement;

      const res = await fetch(
        `${baseUrl}/freelancer/profile.php?type=skill&id=${id}`,
        {
          method: "DELETE",
        },
      );
      if (res.status == 204) {
        item.remove();
        const p = `<p class="no__item">There Is No Soft Skill Added!</p>`;
        if ([...parent.children].length === 0) {
          parent.insertAdjacentHTML("beforeend", p);
        }

        alert("Skill removed successfully!", "success");
        return;
      }
      alert("Skill didn't removed!");
    });
  });
};

const addSkill = () => {
  const btns = document.querySelectorAll(".add__btn");
  progressInputHandler();

  btns.forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const addType = btn.classList.contains("hard") ? "hard" : "soft";

      const nameInput = document.querySelector(`input[name="${addType}name"]`);
      const progressInput = document.querySelector(
        `input[name="${addType}progress"]`,
      );

      const name = nameInput.value;
      const progress = progressInput.value;

      if (name == "") {
        alert("Please add name for your skill!");
        return;
      }

      const progressReq = Number(progress) ? Number(progress) : 0;
      const req = {
        name,
        level: progressReq,
        type: addType,
      };

      const res = await fetch(`${baseUrl}/freelancer/profile.php?type=skill`, {
        method: "POST",
        body: JSON.stringify(req),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res_data = await res.json();
      const data = res_data.message;

      if (res.status == 200) {
        const no__item_hard = document.querySelector(
          ".hard__skills .skills__list .no__item",
        );
        const no__item_soft = document.querySelector(
          ".soft__skills .skills__list .no__item",
        );
        const bldr = {};
        bldr[`${addType}_skills`] = [data];
        skillBldr(bldr);

        nameInput.value = "";
        progressInput.value = "";

        if (addType == "hard") {
          no__item_hard?.remove();
        } else {
          no__item_soft?.remove();
        }

        alert("Skill has been added successfully!", "success");
        skillDeleter();
        return;
      }
      alert("Skill has not added successfully!");
    });
  });
};

const progressInputHandler = () => {
  const inputs = document.querySelectorAll(".skill__input.progress");

  inputs.forEach((input) => {
    input.addEventListener("input", (e) => {
      const number = Number(input.value);

      if (!number) {
        input.value = input.value.slice(0, number.length - 1);
      } else {
        if (number > 100) {
          input.value = 100;
        }
      }
    });
  });
};

const uploadResume = () => {
  const btn = document.querySelector(".upload__resume--btn");
  const input = document.querySelector("#resume-upload");
  const preview = document.querySelector(".uploaded__file");

  btn.addEventListener("click", async (e) => {
    const file = input.files[0];

    if (file) {
      const form = new FormData();
      form.append("resume", file);
      const res = await fetch(`${baseUrl}/freelancer/profile.php?type=resume`, {
        method: "POST",
        body: form,
      });

      if (res.status == 200) {
        alert("resume uploaded successfully!", "success");
      } else {
        alert("Error occured when uploading resume try again!");
      }

      input.file = [];
      preview.classList.remove("active");
    } else {
      input.click();
    }
  });

  input.addEventListener("change", (e) => {
    const file = input.files[0];

    if (file) {
      if (file.type !== "application/pdf") {
        alert("Only pdf format is allowed!");
        return;
      }
      preview.classList.add("active");
      preview.querySelector(".name").textContent = file.name;
    }
  });
};
