import React from "react";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "./ButtonComponent";

function AdminDashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const userName = user?.userName || "מנהל";

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        minHeight: "100vh",
        backgroundColor: "#ffecec",
        color: "#e74c3c",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        direction: "rtl",
      }}
    >
      {/* Header */}
      <header
        style={{
          width: "100%",
          backgroundColor: "#e74c3c",
          color: "white",
          padding: "20px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxSizing: "border-box",
        }}
      >
        <h2 style={{ margin: 0 }}>
          שלום {userName}
        </h2>

        <ButtonComponent
          text="התנתק"
          onClick={() => {
            localStorage.removeItem("user");
            navigate("/");
          }}
          style={{
            backgroundColor: "white",
            color: "#e74c3c",
            border: "2px solid white",
          }}
        />
      </header>

      {/* כותרת */}
      <div
        style={{
          marginTop: "50px",
          marginBottom: "40px",
          textAlign: "center",
        }}
      >
        <h1>אזור מנהל</h1>
        <p>ניהול מערכת המיגוניות</p>
      </div>

      {/* כפתורים */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "25px",
          width: "80%",
          maxWidth: "1000px",
        }}
      >
        <ButtonComponent
          text="ניהול מיגוניות"
          onClick={() => navigate("/admin/shelters")}
          style={{ width: "220px", height: "90px" }}
        />

        <ButtonComponent
          text="הוספת מיגונית"
          onClick={() => navigate("/add-shelter")}
          style={{ width: "220px", height: "90px" }}
        />

        <ButtonComponent
          text="כל הבקשות"
          onClick={() => navigate("/admin/requests")}
          style={{ width: "220px", height: "90px" }}
        />

        <ButtonComponent
          text="ניהול משתמשים"
          onClick={() => navigate("/admin/users")}
          style={{ width: "220px", height: "90px" }}
        />

        <ButtonComponent
          text="פרופיל"
          onClick={() => navigate("/profile")}
          style={{ width: "220px", height: "90px" }}
        />
      </div>

      {/* Footer */}
      <footer
        style={{
          marginTop: "auto",
          width: "100%",
          backgroundColor: "#e74c3c",
          color: "white",
          textAlign: "center",
          padding: "20px",
        }}
      >
        © 2026 מערכת מיגוניות
      </footer>
    </div>
  );
}

export default AdminDashboard;