import { useState, useEffect } from "react";
import { GetItems, PutItems } from "../../Service";
import { toast } from "react-toastify";
import MessageCard from "./MessageCard";

function AdminMessagesPanel() {
  const [allMessages, setAllMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const data = await GetItems("messages/admin");
    if (data) setAllMessages(data);
  };

  const handleReplySubmit = async (messageId, replyText) => {
    const response = await PutItems(`messages/${messageId}/reply`, { replyText });

    if (response) {
      toast.success("התגובה נשלחה בהצלחה");
      fetchMessages();
    }
  };

  return (
    <div className="admin-messages-container">
      <h1 className="contact-title">ניהול פניות והודעות</h1>

      {allMessages.length === 0 ? (
        <p className="no-messages">אין הודעות חדשות במערכת.</p>
      ) : (
        <div className="messages-list">
          {allMessages.map((msg) => (
            <MessageCard key={msg.messageId} message={msg} onReply={handleReplySubmit} />
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminMessagesPanel;