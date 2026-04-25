import { baseUrl } from "../api_base.js";

const checkUser = async () => {
  const res = await fetch(`${baseUrl}/auth/me.php`);
  const data = await res.json();

  if (res.status === 200) {
    if (data.message.roll == "client") {
      location.replace("/talentflow/client");
    }
  } else {
    location.replace("/talentflow");
  }

  const profileImg = document.querySelector(".aside__pp");
  const base = location.pathname == "/talentflow/freelancer/" ? ".." : "../..";
  if (data.message.profile) {
    profileImg.src = `${base}/uploads/profiles/${data.message.profile}`;
  } else {
    profileImg.src = `${base}/images/profile.webp`;
  }
};

checkUser();
