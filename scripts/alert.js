export const alert = (txt, type) => {
  document.querySelector(".alert")?.remove();
  const el = `
    <div class="alert ${type}">
        <p class="txt">
            ${txt}
        </p>
    </div>
    `;

  document.querySelector("#app").insertAdjacentHTML("beforebegin", el);

  const elem = document.querySelector(".alert");

  setTimeout(() => {
    elem.classList.add("active");
  }, 50);

  setTimeout(() => {
    elem.classList.remove("active");
  }, 5000);
};

export const confirm = async (txt) => {
  document.querySelector(".confirm__wrapper")?.remove();
  const el = `
    <div class="confirm__wrapper">
      <div class="confirm">
          <p class="txt">
              ${txt}
          </p>
          <div class="confirm__btns">
            <button class="confirm__btn cancel">Cancel</button>
            <button class="confirm__btn okay">Okay</button>
          </div>
      </div>
    </div>
    `;

  document.querySelector("#app").insertAdjacentHTML("beforebegin", el);

  const elem = document.querySelector(".confirm__wrapper");

  const prom = new Promise((res, rej) => {
    const btns = document.querySelectorAll(".confirm__btn");
    btns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        if (btn.matches(".cancel")) {
          rej("cancelled");
        } else {
          res("okay");
        }
        elem?.remove();
      });
    });
  });

  return prom;
};
