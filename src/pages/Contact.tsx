import React from "react";

const Contact: React.FC = () => {
  return (
    <div>
      <h1 className="page-title">Contact</h1>
      <div className="contact-container">
          <textarea
            className="contact-input"
            placeholder="Message me"
            aria-label="Message me"
          />
          <button type="submit" className="contact-button">
            Submit
          </button>
      </div>
    </div>
  );
};

export default Contact;
