import { baseUrl } from "./api_base.js";
import { alert } from "./alert.js";

const inputElements = document.querySelectorAll(".form__input");
const btn = document.querySelector(".form__btn");
const choiceBtn = document.querySelectorAll(".choice__btn");
const form = document.querySelector(".form");

let reqStatus = "none";

const nameReg = (name) => {
  // name should be only alphabet character and minimum 3 length
  const inName = name.trim();
  const re = /^[A-Za-z]{3,}$/;
  return re.test(inName);
};

const emailReg = (email) => {
  // validating email in world standared
  const inEmail = email.trim();
  const re = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;
  return re.test(inEmail);
};

const passwordReg = (password) => {
  // validating password
  // atleast one upper case
  const reUpper = /^(?=.*[A-Z])/;
  // atleast one lower case
  const reLower = /^(?=.*[a-z])/;
  // atleast one number
  const reNumber = /^(?=.*\d)/;
  // atleast one special character
  const reSpecial = /^(?=.*[\W_])/;
  // atleast 8 length
  const reAmount = password.length >= 8;
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}/;
  return {
    upper: reUpper.test(password),
    lower: reLower.test(password),
    num: reNumber.test(password),
    special: reSpecial.test(password),
    amount: reAmount,
    re: re.test(password),
  };
};

const isValid = {
  fname: false,
  lname: false,
  email: false,
  password: false,
}; // object to to check if all inputs are valid or not

const inputValidator = () => {
  inputElements.forEach((input) => {
    input.addEventListener("input", (e) => {
      const elem = e.target;
      // handling each input if it is valid or not
      if (elem.matches(".name")) {
        if (nameReg(elem.value)) {
          elem.classList.add("success");
          if (elem.matches('[name="fname"]')) isValid.fname = true;
          else isValid.lname = true;
        } else {
          elem.classList.remove("success");
          if (elem.matches('[name="fname"]')) isValid.fname = false;
          else isValid.lname = false;
        }
      } else if (elem.matches(".email")) {
        if (emailReg(elem.value)) {
          elem.classList.add("success");
          isValid.email = true;
        } else {
          elem.classList.remove("success");
          isValid.email = false;
        }
      } else if (elem.matches(".remember")) {
      } else {
        const validates = passwordReg(elem.value);
        passwordValidator(validates);
        if (validates.re) {
          elem.classList.add("success");
          isValid.password = true;
        } else {
          elem.classList.remove("success");
          isValid.password = false;
        }
      }
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

const passwordValidator = (validates) => {
  // checking all type of password conditions for the indicators below it
  const validItems = document.querySelectorAll(".valid__item");
  validItems.forEach((item) => {
    if (item.matches(".upper")) {
      // give green color for the text that tells to add one upper case
      if (validates.upper) {
        item.classList.add("success");
      } else {
        item.classList.remove("success");
      }
    } else if (item.matches(".lower")) {
      // give green color for the text that tells to add one lower case
      if (validates.lower) {
        item.classList.add("success");
      } else {
        item.classList.remove("success");
      }
    } else if (item.matches(".num")) {
      // give green color for the text that tells to add one number
      if (validates.num) {
        item.classList.add("success");
      } else {
        item.classList.remove("success");
      }
    } else if (item.matches(".special")) {
      // give green color for the text that tells to add one special character
      if (validates.special) {
        item.classList.add("success");
      } else {
        item.classList.remove("success");
      }
    } else if (item.matches(".amount")) {
      // give green color for the text that tells to make the length at least 8 character
      if (validates.amount) {
        item.classList.add("success");
      } else {
        item.classList.remove("success");
      }
    }
  });
};

const rollChoice = () => {
  choiceBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      choiceBtn.forEach((btn) => btn.classList.remove("active"));
      btn.classList.add("active");
    });
  });
};

const submitHandle = () => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  btn.addEventListener("click", async () => {
    if (reqStatus === "pending") {
      alert("Wait a moment your request is being processed");
      return;
    }

    reqStatus = "pending";
    btn.querySelector(".txt").classList.remove("active");
    btn.querySelector(".icon").classList.add("active");

    const allvalid =
      isValid.fname && isValid.lname && isValid.email && isValid.password;
    if (!allvalid) {
      alert("Please fill all fields correctly");
      return;
    }

    const rollBtn = [...choiceBtn].filter((btn) =>
      btn.classList.contains("active"),
    )[0];

    const reqObj = {
      fname: form.fname.value,
      lname: form.lname.value,
      email: form.email.value,
      password: form.password.value,
      roll: rollBtn.textContent.trim().toLowerCase(),
      remember: form.remember.checked,
    };

    const [res, status] = await fetchRequest(reqObj);

    reqStatus = "none";
    btn.querySelector(".txt").classList.add("active");
    btn.querySelector(".icon").classList.remove("active");

    if (status === 400) {
      alert("Please fill all fields correctly");
    } else if (status === 409) {
      alert(
        "User exists in this account please use another email or try to log in",
      );
    } else if (status === 500) {
      alert("The server is in trouble try after a while");
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
    const res = await fetch(`${baseUrl}/auth/register.php`, {
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

rollChoice();
inputValidator();
submitHandle();
