import React, { useEffect, useState } from "react";
import Publication from "../components/Publication";
import axios from "axios";

function Publications() {
  const [myData, setMyData] = useState([]);

  useEffect(() => {
    try {
      axios
        .get("http://localhost:3000/pubs")
        .then((res) => setMyData(res.data.data));
    } catch (error) {
      console.log({ error });
    }
  });

  return (
    <section className="pubs">
      <h1>My aplication</h1>
      {myData.map((pb) => (
        <Publication data={pb} key={pb.pub_id} />
      ))}
    </section>
  );
}

export default Publications;
