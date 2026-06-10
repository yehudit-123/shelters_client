import { useEffect, useState } from "react";
import { GetItems } from "../Service";

function AllShelters() {
  const [shelters, setShelters] = useState([]);

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

  return (
    <div>
      <h1>רשימת מיגוניות</h1>

      <table>
        <thead>
          <tr>
            <th>שם</th>
            <th>כתובת</th>
          </tr>
        </thead>

        <tbody>
          {shelters.map((shelter) => (
            <tr key={shelter.id}>
              <td>{shelter.shelterName}</td>
              <td>{shelter.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllShelters;