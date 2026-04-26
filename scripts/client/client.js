import { baseUrl } from "../api_base.js";

const checkUser = async () => {
  const res = await fetch(`${baseUrl}/auth/me.php`);
  const data = await res.json();

  if (res.status === 200) {
    if (data.message.roll == "freelancer") {
      location.replace("/talentflow/freelancer");
    }
  } else {
    location.replace("/talentflow");
  }

  const profileImg = document.querySelector(".aside__pp");
  const username = document.querySelector(".aside__uname");
  const email = document.querySelector(".aside__email");

  username.textContent = data.message.user_name;
  email.textContent = data.message.email;
  
  const base = location.pathname == "/talentflow/client/" ? ".." : "../..";
  if (data.message.profile) {
    profileImg.src = `${base}/uploads/profiles/${data.message.profile}`;
  } else {
    profileImg.src = `${base}/images/profile.webp`;
  }
};

checkUser();
