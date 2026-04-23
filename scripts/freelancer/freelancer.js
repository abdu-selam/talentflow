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
};

checkUser();
