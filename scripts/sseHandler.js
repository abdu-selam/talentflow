import { baseUrl } from "./api_base.js";

const eventSource = (fetcher, messageList) => {
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
    const data = JSON.parse(e.data);
    const elem = document.querySelector(
      `.message__part.sender[data-id=${data[0]}] .read__stat`,
    );

    if (elem)  {
      elem.textContent = "Delivered";
    }
    let i = 0;
    for (const item of messageList) {
      if (item.user_id == data[1]) {
        const count = messageList[i].unread;
        messageList[i].unread = count == 0 ? 0 : count - 1;
        break
      }
      i++;
    }
  });
};

export default eventSource;
