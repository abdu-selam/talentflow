import { baseUrl } from "./api_base.js";
import { alert, confirm } from "./alert.js";

const inputElements = document.querySelectorAll(".form__input");
const btn = document.querySelector(".form__btn");
const form = document.querySelector(".form");
let reqStatus = "none";

const inputValidator = () => {
  const btn = document.querySelector(".form__btn");

  inputElements.forEach((input) => {
    input.addEventListener("input", (e) => {
      const filledINputs = [...inputElements].filter(
        (input) => input.value != "",
      );
    });
  });
};

// to make focus on the next input when the user click enters
inputElements.forEach((input, i) => {
  input.addEventListener("change", (e) => {
    const nextElem = [...inputElements][i + 1];
    if (nextElem) {
      nextElem.focus();
    }
  });
});

const submitHandle = () => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  btn.addEventListener("click", async () => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}/;
    if (reqStatus === "pending") {
      return;
    }

    if (!re.test(form.password.value)) {
      alert(
        "Your password is not valid format please fill valid password format",
      );
      reqStatus = "none";
      btn.querySelector(".txt").classList.add("active");
      btn.querySelector(".icon").classList.remove("active");
      return;
    }

    reqStatus = "pending";
    btn.querySelector(".txt").classList.remove("active");
    btn.querySelector(".icon").classList.add("active");

    const reqObj = {
      email: form.email.value,
      password: form.password.value,
      remember: form.remember.checked,
      otp: form.otp.value,
    };

    const [res, status] = await fetchRequest(reqObj);

    reqStatus = "none";
    btn.querySelector(".txt").classList.add("active");
    btn.querySelector(".icon").classList.remove("active");

    if (status === 401) {
      alert("Please Fill Valid email address, valid password or valid OTP!");
    } else if (status === 409) {
      try {
        await confirm("User does not exist!");
      } catch (error) {}
      location.replace("../register");
    } else if (status === 403) {
      try {
        await confirm("Sorry you have been finished today's attempt!");
      } catch (error) {}
      location.replace("../../");
    } else {
      const roll = res?.message?.roll;
      if (roll === "freelancer") {
        location.replace("../../freelancer");
      } else if (roll === "client") {
        location.replace("../../client");
      }
    }
  });
};

const fetchRequest = async (req) => {
  try {
    const res = await fetch(`${baseUrl}/auth/forgot_reset.php`, {
      method: "POST",
      body: JSON.stringify(req),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    return [data, res.status];
  } catch (error) {
    console.clear();
  }
};

inputValidator();
submitHandle();
