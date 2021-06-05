import React, { useState } from "react";
import FormSignUp from "./FormSignUp";
import FormSuccess from "./FormSuccess";

const Form = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <>
      <div className="form-container">
        <span className="close-btn">×</span>
        <div className="form-content-left">
          <img
            className="form-img"
            src="https://vuigo.vn/images/icon-service-hotel.svg"
            alt="spaceship"
          />
        </div>
        {!isSubmitted ? (
          <FormSignUp setIsSubmitted={setIsSubmitted} />
        ) : (
          <FormSuccess />
        )}
      </div>
    </>
  );
};

export default Form;
