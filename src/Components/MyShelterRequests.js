import { useEffect, useState } from "react";
import { GetItems } from "../Service";

function MyShelterRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadRequests = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const data = await GetItems("shelters");

      // סינון רק בקשות של המשתמש
      const myRequests = data.filter(
        (s) => s.createdByUserId === user?.userId
      );

      setRequests(myRequests);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  return (
    <div style={{ padding: "30px", direction: "rtl" }}>
      <h2>הבקשות שלי</h2>

      {loading ? (
        <p>טוען...</p>
      ) : requests.length === 0 ? (
        <p>אין לך בקשות עדיין</p>
      ) : (
        <table border="1" cellPadding="10" width="100%">
          <thead>
            <tr>
              <th>שם מיגונית</th>
              <th>כתובת</th>
              <th>סטטוס</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((r) => (
              <tr key={r.shelterId}>
                <td>{r.shelterName}</td>
                <td>{r.address}</td>
                <td>
                  {r.status === "pending"
                    ? "ממתין לאישור 🟡"
                    : "מאושר 🟢"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MyShelterRequests;