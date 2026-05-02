import { baseUrl } from "./api_base.js";

const eventSource = (fetcher) => {
  const evs = new EventSource(`${baseUrl}/services/event.php`);

  evs.addEventListener("message", (e) => {
    const data = JSON.parse(e.data);
    const user = sessionStorage.getItem("uname");

    if (data[0] != user) {
      return;
    }

    fetcher(data[1]);
  });

  evs.addEventListener("read", (e) => {
    const data = e.data;
    const elem = document.querySelector(`.message__part.sender[data-id=${data}] .read__stat`)

    if (!elem) {
      return;
    }

    elem.textContent = "Delivered";
  });
};

export default eventSource;
