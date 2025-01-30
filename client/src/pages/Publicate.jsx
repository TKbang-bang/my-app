import React, { useState } from "react";
import axios from "axios";

function Publicate() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", title);
      try {
        axios.post("http://localhost:3000/file", formData).then((res) => {
          res.data.ok
            ? (window.location.reload(), alert("Publication made"))
            : alert(res.data.message);
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        document.getElementById("ref").src = ev.target.result;
      };
      reader.readAsDataURL(e.target.files[0]);
      setFile(e.target.files[0]);
    }
  };

  return (
    <section className="publicate">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />

        <input type="file" id="myFile" onChange={handleChange} />
        <label htmlFor="myFile">Choose file</label>
        <img src="" id="ref" alt="" />
        <button type="submit">Publicate</button>
      </form>
    </section>
  );
}

export default Publicate;
