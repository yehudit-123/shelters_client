import { useState } from "react";
import "../Style/CssPages/Login.css";
import ButtonComponent from "./ButtonComponent";
import { PostItems } from "../Service";
import { useNavigate } from "react-router-dom";



function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await PostItems(
        "users/login",
        {
          userName: username,
          passwordHash: password
        }
      );

      // const data = await response.json();

      if (response.success) {
        alert("התחברת בהצלחה!");

        localStorage.setItem("user", JSON.stringify(response.user));
        navigate("/");
      } else {
        alert(response.message);
      }

    } catch (error) {
      console.log(error);
      alert("שגיאה בשרת");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>

        <div className="back-button">
          <ButtonComponent
            text="← חזור לדף הבית"
            onClick={() => window.location.href = "#home"}
            style={{
              backgroundColor: "#e74c3c",
              color: "white",
              border: "none",
              padding: "10px 15px",
              borderRadius: "8px"
            }}
          />
        </div>

        <h2 className="login-title">
          התחברות
        </h2>

        <input
          type="text"
          placeholder="שם משתמש"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="login-input"
        />

        <input
          type="password"
          placeholder="סיסמה"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="login-input"
        />

        <button
          type="submit"
          className="login-button"
        >
          התחבר
        </button>

      </form>
    </div>
  );
}

export default Login;