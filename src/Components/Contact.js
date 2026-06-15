import { useState } from "react";
import "../Style/CssPages/Contact.css";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "./ButtonComponent";
function Contact() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
const navigate = useNavigate();
  const handleSend = (e) => {
    e.preventDefault();
    alert(`הודעה נשלחה:\nשם: ${name}\nהודעה: ${message}`);
  };

  return (
    <>

    <div className="contact-container">

      <form className="contact-form" onSubmit={handleSend}>
                          <ButtonComponent text="חזור" onClick={() => navigate(-1)}/>

        <h1 className="contact-title">צור קשר</h1>

        <input
          type="text"
          placeholder="שם מלא"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="contact-input"
          required
        />

        <textarea
          placeholder="כתוב הודעה..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="contact-textarea"
          required
        />

        <button type="submit" className="contact-button">
          שלח
        </button>
      </form>
    </div>
    </>
  );
}

export default Contact;