
import { useState } from "react";
import { PostItems } from "../Service";

function AddShelter() {
  const [shelterName, setShelterName] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await PostItems("shelters", {
        shelterName,
        address,
        type: "community",
        createdByUserId: user?.userId,
        status: "pending"
      });
      if (response) {
        alert("הבקשה נשלחה למנהל לאישור");
      }
    } catch (err) {
      console.log(err);
      alert("שגיאה בשליחת הבקשה");
    }
  };
  return (
    <div style={{ padding: "30px", direction: "rtl" }}>
      <h2>בקשת הוספת מיגונית</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="שם מיגונית" value={shelterName} onChange={(e) => setShelterName(e.target.value)} />
        <br />
        <input placeholder="כתובת" value={address} onChange={(e) => setAddress(e.target.value)} />
        <br />
        <button type="submit">
          שלח בקשה
        </button>
      </form>
    </div>
  );
}

export default AddShelter;
