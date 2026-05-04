import { baseUrl, root } from "../api_base.js";

const checkUser = async () => {
  const res = await fetch(`${baseUrl}/auth/me.php`);
  const data = await res.json();

  if (res.status === 200) {
    if (data.message.roll == "client") {
      location.replace(`${root}/client`);
    }
  } else {
    location.replace(`${root}/`);
  }

  sessionStorage.setItem("uname", data.message.user_name);

  const profileImg = document.querySelector(".aside__pp");
  const username = document.querySelector(".aside__uname");
  const email = document.querySelector(".aside__email");

  username.textContent = data.message.user_name;
  email.textContent = data.message.email;

  const base = location.pathname == `${root}/freelancer/` ? ".." : "../..";
  if (data.message.profile) {
    profileImg.src = `${base}/uploads/profiles/${data.message.profile}`;
  } else {
    profileImg.src = `${base}/images/profile.webp`;
  }
};

checkUser();
