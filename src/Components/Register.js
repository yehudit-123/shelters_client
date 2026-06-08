import { useState } from "react";
import "../Style/CssPages/Register.css";
import ButtonComponent from "./ButtonComponent";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    alert(
      `מנסים להירשם עם: 
Name: ${name}
Email: ${email}
Password: ${password}`
    );
  };

  return (
    <div className="register-container">
      <div className="register-box">

        <div className="back-button">
          <ButtonComponent
            text="← חזור לדף הבית"
            onClick={() => (window.location.href = "#home")}
            className="back-home-button"
          />
        </div>

        <h2 className="register-title">הרשמה</h2>

        <form className="register-form" onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="שם מלא"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="register-input"
          />

          <input
            type="email"
            placeholder="אימייל"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="register-input"
          />

          <input
            type="password"
            placeholder="סיסמה"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="register-input"
          />

          <button type="submit" className="register-button">
            הירשם
          </button>
        </form>

      </div>
    </div>
  );
}

export default Register;