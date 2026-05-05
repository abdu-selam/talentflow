import { baseUrl } from "./api_base.js";
import { alert, confirm } from "./alert.js";

const inputElements = document.querySelectorAll(".form__input");
const btn = document.querySelector(".form__btn");
const form = document.querySelector(".form");
const forgotElem = document.querySelector(".forgot__click");
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

const emailReg = (email) => {
  // validating email in world standared
  const inEmail = email.trim();
  const re = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;
  return re.test(inEmail);
};

forgotElem.addEventListener("click", async (e) => {
  const email = form.email.value;
  if (!emailReg(email)) {
    try {
      await confirm("Please fill valid email first");
    } catch (error) {}
    return;
  }
  const req = await fetch(`${baseUrl}/auth/forgot_requist.php?email=${email}`);
  if (req.status == 403) {
    try {
      await confirm("You're not verified please try to login!");
      location.replace("../login/");
    } catch (error) {}
  }

  if (req.status == 401) {
    try {
      await confirm("Your account does not existed please try to register!");
      location.replace("../register/");
    } catch (error) {}
  }

  if (req.status == 409) {
    const data = await req.json()
    console.clear();
    try {
      const hour = Math.floor(data.message / 60);
      const minute = Math.round((data.message / 60 - hour) * 60);
      await confirm(`You can requist new code after ${hour}  hours and ${minute} minute.`);
    } catch (error) {}
  }
  if (req.status == 200) {
    location.replace("../forgot-password");
  }
});

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
      remember: form.remember.checked,
    };

    const [res, status] = await fetchRequest(reqObj);

    reqStatus = "none";
    btn.querySelector(".txt").classList.add("active");
    btn.querySelector(".icon").classList.remove("active");

    if (status === 401) {
      alert("Please Fill Valid email address or valid password!");
    } else if (status === 409) {
      try {
        await confirm("Verification code has been sent! check your email.");
      } catch (error) {}
      codeRequiester();
    } else {
      const roll = res?.message?.roll;
      if (roll === "freelancer") {
        location.replace("../../freelancer");
      } else if (roll === "client") {
        location.replace("../../client");
      } else if (roll === "admin") {
        location.replace("../../admin");
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
    console.clear();
  }
};

const codeRequiester = async () => {
  const req = await fetch(`${baseUrl}/auth/verify_requist.php`);
  if (req.status == 401) {
    try {
      await confirm("You're not verified please try to login!");
      location.replace("../login/");
    } catch (error) {}
  }

  if (req.status == 409) {
    try {
      await confirm("Your account does not existed please try to register!");
      location.replace("../register/");
    } catch (error) {}
  }
  if (req.status == 200) {
    const data = await res.json();
    if (data.message.roll) {
      location.replace(`../../${data.message.roll}`);
    } else {
      location.replace("../verify-email");
    }
  }
};

inputValidator();
submitHandle();
