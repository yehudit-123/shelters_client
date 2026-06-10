import React from "react";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "./ButtonComponent";

function Profile() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        minHeight: "100vh",
        backgroundColor: "#ffecec",
        color: "#e74c3c",
        direction: "rtl",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Header */}
      <header
        style={{
          width: "100%",
          backgroundColor: "#e74c3c",
          color: "white",
          padding: "20px",
          textAlign: "center",
          boxSizing: "border-box",
        }}
      >
        <h1>הפרופיל שלי</h1>
      </header>

      {/* כרטיס פרופיל */}
      <div
        style={{
          backgroundColor: "white",
          marginTop: "50px",
          padding: "30px",
          borderRadius: "15px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          minWidth: "400px",
        }}
      >
        <h2 style={{ textAlign: "center" }}>
          👤 {user?.userName}
        </h2>

        <hr />

        <p>
          <strong>מזהה משתמש:</strong> {user?.userId}
        </p>

        <p>
          <strong>שם משתמש:</strong> {user?.userName}
        </p>

        <p>
          <strong>אימייל:</strong> {user?.email}
        </p>

        <hr />

        {/* נתונים עתידיים */}
        <p>
          <strong>מספר בקשות:</strong> 0
        </p>

        <p>
          <strong>מספר מיגוניות שהוספתי:</strong> 0
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "15px",
            marginTop: "25px",
          }}
        >
          <ButtonComponent
            text="הבקשות שלי"
            onClick={() => navigate("/my-requests")}
          />

          <ButtonComponent
            text="חזרה לדשבורד"
            onClick={() => navigate("/dashboard")}
          />
        </div>
      </div>
    </div>
  );
}

export default Profile;