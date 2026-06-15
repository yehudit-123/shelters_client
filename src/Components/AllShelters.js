import { useEffect, useState } from "react";
import { GetItems } from "../Service";
import ButtonComponent from "./ButtonComponent";
import "../Style/CssPages/AllShelters.css";
import { useNavigate } from "react-router-dom"; // ייבוא לניווט חזרה


function AllShelters() {
  const [shelters, setShelters] = useState([]);
  const navigate = useNavigate(); // הוק לניווט

  useEffect(() => {
    loadShelters();
  }, []);

  async function loadShelters() {
    try {
      const data = await GetItems("shelters");
      setShelters(data);
    } catch (err) {
      console.log(err);
    }
  }

  const handleLike = (shelterId) => {
    console.log("Like:", shelterId);
  };

  const handleComment = (shelterId) => {
    console.log("Comment:", shelterId);
  };

  const handleReport = (shelterId) => {
    console.log("Report:", shelterId);
  };

  return (
    <div className="all-shelters-page">
                <ButtonComponent text="← חזור לדף הבית" onClick={() => navigate(-1)} />

      <h1 className="page-title">רשימת מיגוניות</h1>

      <div className="shelters-grid">
        {shelters.map((shelter) => (
          <div
            key={shelter.shelterId}
            className="shelter-card"
          >
            <h2>{shelter.shelterName}</h2>

            <p>
              <strong>כתובת:</strong>
              <br />
              {shelter.address}
            </p>

            <p>
              <strong>סוג:</strong> {shelter.type}
            </p>

            <div className="card-actions">
              <ButtonComponent
                text="👍 לייק"
                onClick={() => handleLike(shelter.shelterId)}
              />

              <ButtonComponent
                text="💬 תגובה"
                onClick={() => handleComment(shelter.shelterId)}
              />

              <ButtonComponent
                text="🚩 דיווח"
                onClick={() => handleReport(shelter.shelterId)}
              />
              <ButtonComponent
                text="🗺️ מפה"
                onClick={() => console.log("Map:", shelter.shelterId)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllShelters;