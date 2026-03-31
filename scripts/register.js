const inputElements = document.querySelectorAll(".form__input");
const btn = document.querySelector(".form__btn");
const choiceBtn = document.querySelectorAll(".choice__btn");
const form = document.querySelector(".form")

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

const inputValidator = () => {
  const isValid = {
    fname: false,
    lname: false,
    email: false,
    password: false,
  }; // object to to check if all inputs are valid or not

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

      const allvalid =
        isValid.fname && isValid.lname && isValid.email && isValid.password;
      if (allvalid) {
        btn.removeAttribute("disabled");
      } else {
        btn.setAttribute("disabled", "");
      }
    });
  });
};

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
      if (validates.lower) {
        item.classList.add("success");
      } else {
        item.classList.remove("success");
      }
    } else if (item.matches(".num")) {
      if (validates.num) {
        item.classList.add("success");
      } else {
        item.classList.remove("success");
      }
    } else if (item.matches(".special")) {
      if (validates.special) {
        item.classList.add("success");
      } else {
        item.classList.remove("success");
      }
    } else if (item.matches(".amount")) {
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

form.addEventListener("submit",(e)=>{
  e.preventDefault()
})

rollChoice();
inputValidator();
