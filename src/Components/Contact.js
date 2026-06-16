import { useNavigate } from "react-router-dom";
import ButtonComponent from "./ButtonComponent";
import ContactForm from "./contact/ContactForm";
import AdminMessagesPanel from "./contact/AdminMessagesPanel.js";
import "../Style/CssPages/Contact.css";

function Contact() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  return (
    <>
      <div className="back">
        <ButtonComponent text="חזור" onClick={() => navigate(-1)} />
      </div>

      {user?.userRole === "admin" ? (
        <AdminMessagesPanel />
      ) : (
        <ContactForm user={user} />
      )}
    </>
  );
}

export default Contact;