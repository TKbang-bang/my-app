import React from "react";

function Publication() {
  return (
    <>
      <article className="pub">
        <div className="top">
          <div className="info">
            <img src="user_profile.png" alt="" />
            <h3>My name</h3>
          </div>
          <button>Follow</button>
        </div>
        <p className="title">Hola mundillo</p>
        <div className="img">
          <img src="hl2.jpg" alt="" />
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

      <article className="pub">
        <div className="top">
          <div className="info">
            <img src="user_profile.png" alt="" />
            <h3>My name</h3>
          </div>
          <button>Follow</button>
        </div>
        <p className="title">Hola mundillo</p>
        <div className="img">
          <img src="hl1.jpg" alt="" />
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
    </>
  );
}

export default Publication;
