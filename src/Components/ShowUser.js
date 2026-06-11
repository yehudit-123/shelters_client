import { useEffect, useState } from "react";
import { GetItems, DeleteItems } from "../Service";

function ShowUser() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUsers = async () => {
    try {
      const data = await GetItems("users");
      setUsers(data);
    } catch (error) {
      console.log(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await DeleteItems(`users/${id}`);

      // אם השרת מחזיר תשובה
      if (response) {
          {
        alert("המשתמש נמחק בהצלחה");
        getUsers();}

        // עדכון UI בלי רענון
        setUsers((prev) => prev.filter((u) => u.id !== id));
      }
    } catch (error) {
      console.log(error);
      alert("שגיאה במחיקת משתמש");
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div style={{ padding: "30px", direction: "rtl" }}>
      <h2>ניהול משתמשים</h2>

      {loading ? (
        <p>טוען...</p>
      ) : (
        <table border="1" cellPadding="10" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>שם משתמש</th>
              <th>מנהל</th>
              <th>פעולות</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.userId}>
                <td>{user.userName}</td>
                <td>{user.userRole==="admin" ? "כן" : "לא"}</td>

                <td>
                  <button
                    onClick={() => deleteUser(user.userId)}
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      border: "none",
                      padding: "6px 12px",
                      cursor: "pointer",
                    }}
                  >
                    מחק
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ShowUser;