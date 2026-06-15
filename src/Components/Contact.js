import { useState } from "react";
import "../Style/CssPages/Contact.css";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "./ButtonComponent";
import { PostItems } from "../Service";
import { toast } from "react-toastify";

function Contact() {
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const [name, setName] = useState(user?.userName || "");
  const [email, setEmail] = useState(user?.email || "");
  const navigate = useNavigate();
  const handleSend = async (e) => {
    e.preventDefault();

    try {
      const response = await PostItems("messages", {
        senderUserId: user?.userId || null,
        senderName: name,
        senderEmail: email,
        subject,
        messageText: message
      });

      if (response) {
        toast.success("ההודעה נשלחה בהצלחה");

        setSubject("");
        setMessage("");
      }
    } catch (error) {
      console.log(error);
      toast.error("שגיאה בשליחת ההודעה");
    }
  };
  return (
    <>
      <div className="contact-container">
        <form className="contact-form" onSubmit={handleSend}>
          <ButtonComponent text="חזור" onClick={() => navigate(-1)} />
          <h1 className="contact-title">צור קשר</h1>
          <input type="text" placeholder="שם מלא" value={name} onChange={(e) => setName(e.target.value)}
            className="contact-input" required />
          <input type="email" placeholder="אימייל" value={email} onChange={(e) => setEmail(e.target.value)}
            className="contact-input" required />
          <input type="text" placeholder="נושא הפנייה" value={subject} onChange={(e) => setSubject(e.target.value)}
            className="contact-input" required />
          <textarea placeholder="כתוב הודעה..." value={message} onChange={(e) => setMessage(e.target.value)}
            className="contact-textarea" required />
          <button type="submit" className="contact-button">שלח</button>
        </form>
      </div>
    </>
  );
}

export default Contact;