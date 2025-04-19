import { useEffect, useState } from "react";

function ServerToast() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "10px",
        right: "25%",
        backgroundColor: "#fff3cd",
        color: "#856404",
        padding: "1rem 1.5rem",
        border: "1px solid #ffeeba",
        borderRadius: "8px",
        fontSize: "1rem",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        zIndex: 9999,
      }}
    >
      ⚠️ This service is deployed on a free server. Due to inactivity, it might
      take a few seconds to respond.
    </div>
  );
}

export default ServerToast;
