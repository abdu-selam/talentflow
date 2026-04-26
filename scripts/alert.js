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
