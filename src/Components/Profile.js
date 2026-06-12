import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { GetItems } from "../Service";
import ButtonComponent from "./ButtonComponent";
import { toast } from "react-toastify";
import { useCallback } from "react";
import "../Style/CssPages/Profile.css";

function Profile() {
  const [myShelters, setMyShelters] = useState([]);
  const [amountRequest, setAmountRequest] = useState(0);
  const [amountShelters, setAmountShelters] = useState(0);
  const navigate = useNavigate();
  const { id } = useParams();

  const user = JSON.parse(localStorage.getItem("user"));
  const getSheltersById = useCallback(async () => {
    try {
      const data = await GetItems(`shelters/${id}`);
      setMyShelters(data);
    } catch (error) {
      console.log(error);
      toast.error("שגיאה בטעינת הבקשות");
    }
  }, [id]);

  useEffect(() => {
    getSheltersById();
  }, [id, user, getSheltersById]);

  useEffect(() => {
    setAmountRequest(myShelters.length);
    setAmountShelters(myShelters.filter(shelter => shelter.status === "approved").length);
  }, [myShelters]);

  return (
    <div className="profile-container">
      {/* Header */}
      <header className="profile-header">
        <h1>הפרופיל שלי</h1>
      </header>
      {/* Profile Card */}
      <div className="profile-card">
        <h2 className="profile-name">
          👤 {user?.userName}
        </h2>
        <hr />
        <p><strong>מזהה משתמש:</strong> {user?.userId}</p>
        <p><strong>שם משתמש:</strong> {user?.userName}</p>
        <p><strong>אימייל:</strong> {user?.email}</p>
        <hr />
        <p><strong>מספר בקשות:</strong> {amountRequest}</p>
        <p><strong>מספר מיגוניות שהוספתי:</strong> {amountShelters}</p>

        <div className="profile-buttons">
          <ButtonComponent text="חזרה לדשבורד" onClick={() => navigate(-1)} />
        </div>
      </div>
    </div>
  );
}

export default Profile;