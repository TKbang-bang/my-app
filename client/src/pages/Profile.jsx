import React from "react";
import Publication from "../components/Publication";

function Profile() {
  const handleOff = () => {
    document
      .querySelector("main .profile .user .options .btns")
      .classList.toggle("off");
  };

  return (
    <section className="profile">
      <div className="user">
        <div className="info">
          <img src="hl2.jpg" alt="" />
          <div className="infos">
            <p>My name</p>
            <p>My age</p>
            <p>My bio</p>
            <p>My sex</p>
          </div>
        </div>
        <div className="options">
          <div className="ops">
            <p>Options</p>
            <button onClick={handleOff}>Down</button>
          </div>
          <div className="btns off">
            <button>Edit profile</button>
            <button>Change password</button>
            <button>change email</button>
          </div>
        </div>
      </div>
      <div className="myPubs">
        <h1>My publications</h1>
        <section className="pubs">
          <Publication />
        </section>
      </div>
      <div className="session">
        <button className="close">Logout</button>
        <button className="delete">Delete account</button>
      </div>
    </section>
  );
}

export default Profile;
