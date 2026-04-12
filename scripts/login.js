const inputElements = document.querySelectorAll(".form__input");
const form = document.querySelector(".form");

const inputValidator = () => {
  const btn = document.querySelector(".form__btn");

  inputElements.forEach((input) => {
    input.addEventListener("input", (e) => {
      const filledINputs = [...inputElements].filter(
        (input) => input.value != "",
      );

      if (filledINputs.length === 2) {
        btn.removeAttribute("disabled");
      } else {
        btn.setAttribute("disabled", "");
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

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const reqObj = {
    email: form.email.value,
    password: form.password.value,
  };

  //   TODO -> making api call to the backend
  // now for frontend checking
  const userData = JSON.parse(sessionStorage.getItem("user"))
  if (!userData) {
    return
  }

});

inputValidator();
