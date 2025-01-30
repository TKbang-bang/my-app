import React from "react";
import { useNavigate } from "react-router-dom";

function Publication({ data }) {
  const navigate = useNavigate();

  const handleToPub = () => {
    navigate("/publication/" + data.pub_id);
  };

  return (
    <article className="pub" onClick={handleToPub}>
      <div className="top">
        <div className="info">
          {data.user_profile ? (
            <img
              src={`http://localhost:3000/profiles/${data.user_profile}`}
              alt=""
            />
          ) : (
            <img src="user_profile.png" alt="" />
          )}
          <h3>{data.user_name}</h3>
        </div>
        <button>Follow</button>
      </div>
      <p className="title">{data.pub_title}</p>
      <div className="img">
        <img src={`http://localhost:3000/images/${data.pub_img}`} alt="" />
      </div>
      <div className="likes">
        <div className="like">
          <button>Like</button>
          <p>23423</p>
        </div>
        <div className="likent">
          <button>Like'nt</button>
          <p>34</p>
        </div>
      </div>
    </article>
  );
}

export default Publication;
