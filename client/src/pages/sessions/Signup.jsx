import React, { useState } from "react";
import Code from "../../components/Code";
import SignupForm from "../../components/SignupForm";

function Signup() {
  const [ok, setOk] = useState(false);

  const handleOk = (ms) => {
    if (ms == "ok") {
      setOk(!ok);
    }
  };

  return (
    <section className="log">
      {ok ? (
        <Code message={(ms) => handleOk(ms)} />
      ) : (
        <SignupForm message={(ms) => handleOk(ms)} />
      )}
    </section>
  );
}

export default Signup;
