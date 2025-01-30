import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ThisPub() {
  const { pubid } = useParams();

  useEffect(() => {
    try {
      axios.get(`http://localhost:3000/thispub/${pubid}`).then((res) => {
        console.log(res.data);
      });
    } catch (error) {
      console.log({ error });
    }
  }, []);

  return (
    <section>
      <h1>ThisPub</h1>
    </section>
  );
}

export default ThisPub;
