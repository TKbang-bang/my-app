import React, { useEffect, useState } from "react";
import Publication from "../components/Publication";
import axios from "axios";

function Profile() {
  const [myData, setMyData] = useState([]);
  const [user, setUser] = useState({});

  const handleOff = () => {
    document
      .querySelector("main .profile .user .options .btns")
      .classList.toggle("off");
  };
  const handleOff2 = () => {
    document
      .querySelector("main .profile > .options .btns")
      .classList.toggle("off");
  };

  const handleLogout = () => {
    try {
      axios.delete("http://localhost:3000/logout").then((res) => {
        res.data.ok ? window.location.reload() : alert(res.data.message);
      });
    } catch (error) {
      console.log({ error });
    }
  };

  const handleDelete = () => {
    try {
      axios.delete("http://localhost:3000/del").then((res) => {
        res.data.ok
          ? (window.location.reload(), alert("Account deleted"))
          : alert("Bad server-client relation");
      });
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    try {
      axios.get("http://localhost:3000/myprofile").then((res) => {
        setMyData(res.data.data);
        setUser({
          name: res.data.data[0].user_name,
          email: res.data.data[0].user_email,
          profile: res.data.data[0].user_profile,
        });
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <section className="profile">
      {console.log({ myData, user })}
      <div className="user">
        <div className="info">
          {user.profile ? (
            <img
              src={`http://localhost:3000/profiles/${user.profile}`}
              alt=""
            />
          ) : (
            <img src="user_profile.png" alt="" />
          )}
          <div className="infos">
            <p>{user.name}</p>
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
          {myData.length > 0 ? (
            <>
              {myData.map((dt) => {
                return <Publication key={dt.pub_id} data={dt} />;
              })}
            </>
          ) : (
            <h1>No pubs</h1>
          )}
        </section>
      </div>
      <div className="options">
        <div className="ops">
          <p>Session</p>
          <button onClick={handleOff2}>Down</button>
        </div>
        <div className="btns off">
          <button onClick={handleLogout}>Log out</button>
          <button onClick={handleDelete}>Delete account</button>
        </div>
      </div>
    </section>
  );
}

export default Profile;
