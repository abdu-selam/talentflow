import { baseUrl } from "./api_base.js";
import { alert, confirm } from "./alert.js";

const input = document.querySelector(".form__input");
const btn = document.querySelector(".form__btn");
const form = document.querySelector(".form");
const timeSpan = document.querySelector(".form__choice .form__span");

input.focus()

let reqStatus = "none";
let count = 12;

const intervalFunc = () => {
  let minute = Math.floor(count / 60);
  let seconds = Math.round((count / 60 - minute) * 60);

  minute = minute > 9 ? minute : "0" + minute;
  seconds = seconds > 9 ? seconds : "0" + seconds;

  const txt = minute + ":" + seconds;
  timeSpan.textContent = "in " + txt;
  count--;
  if (count == 0) {
    timeSpan.textContent = "Request now";
    count = 121;
    clearTimeout(timeout);
  }
};

let timeout = setInterval(intervalFunc, 1000);

timeSpan.addEventListener("click", async (e) => {
  if (count < 121) {
    return;
  }
  const req = await fetch(`${baseUrl}/auth/verify_requist.php`);
  if (req.status == 401) {
    try {
      await confirm("You're not verified please try to login!");
      location.replace("../login/");
    } catch (error) {}
    console.clear()
    return
  }
  const data = await req.json();

  if (req.status == 409) {
    try {
      const minute = Math.floor(data.message)
      const seconds = Math.round((data.message - minute) * 60)
      await confirm("You can requist new code after " + minute + " minutes and " + seconds + " seconds.");
    } catch (error) {}
    console.clear()
    return
  }
  if (req.status == 200) {
    if (data.message.roll) {
      location.replace(`../../${data.message.roll}`);
    } else {
      alert("Verification code has been sent! check your email.", "success");
      count--;
      timeout = setInterval(intervalFunc, 1000);
    }
  }
});

const inputValidator = () => {
  input.addEventListener("input", (e) => {
    const value = input.value;
    const num = Number(value[value.length - 1]);
    if (!num || value.length > 6) {
      input.value = value.slice(0, value.length - 1);
    }
  });
};

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
      token: form.token.value,
    };

    const [res, status] = await fetchRequest(reqObj);

    reqStatus = "none";
    btn.querySelector(".txt").classList.add("active");
    btn.querySelector(".icon").classList.remove("active");

    if (status === 403) {
      alert("Please fill the token correctlly!");
    } else if (status == 401) {
      try {
        await confirm("Verification failed please try to register or login!");
      } catch (error) {}
      location.replace("../login/");
    } else {
      if (res.message.roll == "freelancer") {
        location.replace("../../freelancer");
      } else {
        location.replace("../../client");
      }
    }
  });
};

const fetchRequest = async (req) => {
  try {
    const res = await fetch(`${baseUrl}/auth/verify_email.php`, {
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
