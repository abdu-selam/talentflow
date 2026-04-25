import { baseUrl } from "./api_base.js";
import { alert } from "./alert.js";

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

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

const submitHandle = () => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  btn.addEventListener("click", async () => {
    if (reqStatus === "pending") {
      return;
    }

    reqStatus = "pending";
    btn.querySelector(".txt").classList.remove("active");
    btn.querySelector(".icon").classList.add("active");

    const reqObj = {
      email: form.email.value,
      password: form.password.value,
      remember: form.remember.checked
    };

    const [res, status] = await fetchRequest(reqObj);

    reqStatus = "none";
    btn.querySelector(".txt").classList.add("active");
    btn.querySelector(".icon").classList.remove("active");

    if (status === 401) {
      alert("Please Fill Valid email address or valid password!");
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
    const res = await fetch(`${baseUrl}/auth/login.php`, {
      method: "POST",
      body: JSON.stringify(req),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    return [data, res.status];
  } catch (error) {
    console.log(error);
  }
};

inputValidator();
submitHandle();
