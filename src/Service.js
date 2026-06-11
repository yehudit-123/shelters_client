// require("dotenv").config();
 async function GetItems(url) {
    const res = await fetch(`http://localhost:3001/${url}`);
    if (!res.ok) {
        let errorData;
        try {
            errorData = await res.json();
        } catch {
            throw new Error(`Server error: ${res.status}`);
        }
        throw new Error(errorData.message || "Request failed");
    }

    return await res.json();
}

async function PutItems(url, body) {

    const res = await fetch(`http://localhost:3001/${url}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Request failed");
    }

    return data;
}
// async function PutItems(url, body, func) {
//     const res = await fetch(`http://localhost:3001/${url}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(body)
//     })

//     console.log(res);
//     if (!res.ok) {
//         throw new Error('something went wrong, please try again');
//     }
//     const data = await res.json();

//     if (func) {
//         func(data);
//     }
// }
async function PostItems(url, body) {
    const res = await fetch(`http://localhost:3001/${url}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });

    const data = await res.json();
    console.log(data);
    if (!res.ok) {
        throw new Error(data.message || "Request failed");
    }

    return data;
}

async function DeleteItems(url) {
    const res = await fetch(`http://localhost:3001/${url}`, {
        method: "DELETE",
    });

    if (!res.ok) {
        throw new Error("something went wrong, please try again");
    }

    // ניסיון לקרוא JSON רק אם יש
    let data;
    try {
        data = await res.json();
    } catch {
        data = null;
    }

    return data;
}

export { DeleteItems, PutItems, PostItems ,GetItems}

// | פעולה               | Method | Route        |
// | ------------------- | ------ | ------------ |
// | התחברות             | POST   | /users/login |
// | קבלת כל המשתמשים    | GET    | /users       |
// | קבלת משתמש לפי מזהה | GET    | /users/:id   |
// | הוספת משתמש         | POST   | /users       |
// | מחיקת משתמש         | DELETE | /users/:id   |
// | עדכון משתמש         | PUT    | /users/:id   |

//התחברות
// const result = await PostItems(
//     "users/login",
//     {
//         userName: username,
//         passwordHash: password
//     }
// );

//הוספת משתמש
// await PostItems(
//     "users",
//     {
//         userName: "David",
//         email: "david@gmail.com",
//         phone: "0501234567"
//     }
// );

//מחיקת משתמש
// await DeleteItems("users/5");