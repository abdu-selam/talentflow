export const alert = (txt, type) => {
  document.querySelector(".alert")?.remove();
  const el = `
    <div class="alert ${type}">
        <p class="txt">
            ${txt}
        </p>
        <button class="btn">
            Ok
        </button>
    </div>
    `;

  document.querySelector("#app").insertAdjacentHTML("beforebegin", el);

  const elem = document.querySelector(".alert");
  const btn = document.querySelector(".alert .btn");

  setTimeout(() => {
    elem.classList.add("active");
  }, 100);

  btn.addEventListener("click", (e) => {
    elem.classList.remove("active");
  });

  setTimeout(() => {
    elem.classList.remove("active");
  }, 5000);
};
