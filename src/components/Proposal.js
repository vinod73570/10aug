import React from "react";
import { FaHeart } from "react-icons/fa";

function Proposal() {
  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h2 style={{ fontSize: "30px", color: "#c2185b" }}>
        Will you marry me? 💍
      </h2>
      <button style={{
        marginTop: "20px",
        padding: "10px 30px",
        backgroundColor: "#e91e63",
        color: "#fff",
        border: "none",
        borderRadius: "30px",
        fontSize: "18px",
        cursor: "pointer"
      }}>
        YES 💗
      </button>
      <div style={{ marginTop: "30px" }}>
        <FaHeart size={40} color="#e91e63" />
      </div>
    </div>
  );
}

export default Proposal;
