// import React from "react";
// import { useNavigate } from "react-router-dom";
// import ButtonComponent from "./ButtonComponent";

// function UserDashboard() {

//   const navigate = useNavigate();

//   // בעתיד אפשר להביא את השם מה-DB או מההתחברות
//   const userName = "הודיה";

//   return (
//     <div
//       style={{
//         fontFamily: "Arial, sans-serif",
//         minHeight: "100vh",
//         backgroundColor: "#ffecec",
//         color: "#e74c3c",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         direction: "rtl",
//       }}
//     >
//       {/* Header */}
//       <header
//         style={{
//           width: "100%",
//           backgroundColor: "#e74c3c",
//           color: "white",
//           padding: "20px 40px",
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
//           boxSizing: "border-box",
//         }}
//       >
//         {/* שלום לקוח */}
//         <h2 style={{ margin: 0 }}>
//           שלום {userName}
//         </h2>

//         {/* כפתור התנתקות */}
//         <ButtonComponent
//           text="התנתק"
//           onClick={() => navigate("/")}
//           style={{
//             backgroundColor: "white",
//             color: "#e74c3c",
//             border: "2px solid white",
//           }}
//         />
//       </header>

//       {/* כותרת */}
//       <div
//         style={{
//           marginTop: "50px",
//           marginBottom: "40px",
//           textAlign: "center",
//         }}
//       >
//         <h1 style={{ fontSize: "42px", marginBottom: "10px" }}>
//           מערכת ניהול מיגוניות
//         </h1>

//         <p style={{ fontSize: "20px" }}>
//           ברוך הבא לאזור האישי שלך
//         </p>
//       </div>

//       {/* כפתורים */}
//       <div
//         style={{
//           display: "flex",
//           flexWrap: "wrap",
//           justifyContent: "center",
//           gap: "25px",
//           width: "80%",
//           maxWidth: "1000px",
//         }}
//       >

//         <ButtonComponent
//           text="רשימת מיגוניות"
//           onClick={() => navigate("/all-shelters")}
//           style={{
//             width: "220px",
//             height: "90px",
//             fontSize: "18px",
//           }}
//         />

//         <ButtonComponent
//           text="הוספת מיגונית"
//           onClick={() => navigate("/add-shelter")}
//           style={{
//             width: "220px",
//             height: "90px",
//             fontSize: "18px",
//           }}
//         />

//         <ButtonComponent
//           text="רשימת מקומות בטוחים"
//           onClick={() => navigate("/safe-places")}
//           style={{
//             width: "220px",
//             height: "90px",
//             fontSize: "18px",
//           }}
//         />

//         <ButtonComponent
//           text="פרופיל"
//           onClick={() => navigate("/profile")}
//           style={{
//             width: "220px",
//             height: "90px",
//             fontSize: "18px",
//           }}
//         />

//         <ButtonComponent
//           text="הבקשות שלי"
//           onClick={() => navigate("/my-requests")}
//           style={{
//             width: "220px",
//             height: "90px",
//             fontSize: "18px",
//           }}
//         />

//       </div>

//       {/* Footer */}
//       <footer
//         style={{
//           marginTop: "auto",
//           width: "100%",
//           backgroundColor: "#e74c3c",
//           color: "white",
//           textAlign: "center",
//           padding: "20px",
//         }}
//       >
//         © 2026 מערכת מיגוניות
//       </footer>
//     </div>
//   );
// }

// export default UserDashboard;