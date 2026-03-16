window.addEventListener("load", () => {
  const loading = document.querySelector(".loading");

  loading.classList.add("close");
  setTimeout(() => {
    loading.style.display = "none";
    init();
  }, 500);
});

const init = () => {
  document.querySelector("#app").classList.add("loaded");

  backAnimation();
};

const backAnimation = () => {
  const flows = document.querySelectorAll(".flows");

  flows.forEach((flow) => {
    const randomX = Math.floor(Math.random() * window.innerWidth);
    const randomY = Math.floor(Math.random() * window.innerHeight);

    flow.style.left = `${randomX}px`;
    flow.style.top = `${randomY}px`;
  });
  setInterval(() => {
    flows.forEach((flow) => {
      const randomX = Math.floor(Math.random() * window.innerWidth);
      const randomY = Math.floor(Math.random() * window.innerHeight);

      flow.style.left = `${randomX}px`;
      flow.style.top = `${randomY}px`;
    });
  }, 3000);
};


const nameReg = (name) => {
  const inName = name.trim();
  const re = /^[A-Za-z]{3,}$/;
  return re.test(inName);
};

const emailReg = (email) => {
  const inEmail = email.trim();
  const re = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;
  return re.test(inEmail);
};

const passwordReg = (password) => {
  const reUpper = /^(?=.*[A-Z])/;
  const reLower = /^(?=.*[a-z])/;
  const reNumber = /^(?=.*\d)/;
  const reSpecial = /^(?=.*[\W_])/;
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
  const inputElements = document.querySelectorAll(".form__input");
  const btn = document.querySelector(".form__btn");
  const isValid = {
    fname: false,
    lname: false,
    email: false,
    password: false,
  };

  inputElements.forEach((input) => {
    input.addEventListener("input", (e) => {
      const elem = e.target;
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
  const validItems = document.querySelectorAll(".valid__item");
  validItems.forEach((item) => {
    if (item.matches(".upper")) {
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

