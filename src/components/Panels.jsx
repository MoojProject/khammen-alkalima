import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

// function timeLeftString() {
//   const now = new Date();
//   const INTERVAL = 5 * 60 * 1000;
//   const end = new Date(Math.ceil(now.getTime() / INTERVAL) * INTERVAL);
//   const diffMs = Math.max(0, end - now);
//   const totalSec = Math.floor(diffMs / 1000);
//   const h = String(Math.floor(totalSec / 3600)).padStart(2, "0");
//   const m = String(Math.floor((totalSec % 3600) / 60)).padStart(2, "0");
//   const s = String(totalSec % 60).padStart(2, "0");
//   return `${h}:${m}:${s}`;
// }
function timeLeftString() {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  const diffMs = Math.max(0, tomorrow - now);
  const totalSec = Math.floor(diffMs / 1000);
  const h = String(Math.floor(totalSec / 3600)).padStart(2, "0");
  const m = String(Math.floor((totalSec % 3600) / 60)).padStart(2, "0");
  const s = String(totalSec % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
}
export default function Panels({
  showResultPanel,
  showInfoPanel,
  setShowResultPanel,
  setShowInfoPanel,
  gameStatus,
  answerWord,
  isMultiplayer = false,
  opponentFinished = false,
}) {
  const navigate = useNavigate();
  const [timer, setTimer] = useState("00:00:00");

  const statusText = useMemo(() => {
    if (gameStatus === "WINNER") return "أحسنت 🎉";
    if (gameStatus === "LOSER") return "حاول المرة القادمة";
    return "";
  }, [gameStatus]);

  useEffect(() => {
    if (!showResultPanel || gameStatus === "playing") return;
    if (isMultiplayer) return; // ما نشغل العداد في multiplayer
    setTimer(timeLeftString());
    const id = setInterval(() => setTimer(timeLeftString()), 1000);
    return () => clearInterval(id);
  }, [showResultPanel, gameStatus, isMultiplayer]);

  return (
    <>
      <div className="panel" style={{ display: showResultPanel ? "block" : "none" }}>
        <i
          className="close material-icons"
          onClick={() => setShowResultPanel(false)}
        >
          &#xe5cd;
        </i>

        <p id="status">{statusText}</p>

        <p id="answer" style={{ display: gameStatus === "LOSER" ? "block" : "none" }}>
          الإجابة : <strong>{answerWord}</strong>
        </p>

        <br />

        {/* العداد يظهر فقط في اللعبة الفردية */}
        {!isMultiplayer && (
          <>
            <p>الكلمة التالية بعد</p>
            <div id="timer">{timer}</div>
          </>
        )}

        {/* في multiplayer نعرض زر العودة للرئيسية */}
        {isMultiplayer && !opponentFinished && (
          <div style={{
            background: '#f5f3ff',
            borderRadius: 10,
            padding: '12px 16px',
            marginBottom: 12,
            fontFamily: 'Cairo, sans-serif',
            fontSize: 13,
            fontWeight: 700,
            color: '#7c6caa',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }}>
            <span style={{ fontSize: 16 }}>⏳</span>
            بانتظار صاحبك...
          </div>
        )}

        {isMultiplayer && (
          <a href="/" style={{
            display: "inline-block",
            marginTop: 12,
            padding: "10px 24px",
            background: "#4b2cb0",
            color: "#fff",
            borderRadius: 10,
            fontFamily: "Cairo, sans-serif",
            fontWeight: 700,
            textDecoration: "none"
          }}>
            العودة للرئيسية
          </a>
        )}
      </div>

      <div className="info_panel" style={{ display: showInfoPanel ? "block" : "none" }}>
        <i className="close material-icons" onClick={() => setShowInfoPanel(false)}>&#xe5cd;</i>

        <div style={{ textAlign: "center", padding: "8px 0 16px" }}>
          <div style={{
            width: 52, height: 52, borderRadius: 12,
            background: "#4b2cb0", color: "#fff",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 22, fontWeight: 800, margin: "0 auto 16px",
            fontFamily: "Cairo, sans-serif"
          }}>ك</div>

          <p style={{ fontSize: 18, fontWeight: 800, color: "#2d1a6e", margin: "0 0 12px", fontFamily: "Cairo, sans-serif" }}>
            مرحبًا بك في خمن الكلمة
          </p>

          <p style={{ fontSize: 13, color: "#7c6caa", margin: "0 0 6px", fontFamily: "Cairo, sans-serif" }}>
            لديك ٦ محاولات لتخمين كلمة من ٥ أحرف.
          </p>
          <p style={{ fontSize: 13, color: "#7c6caa", margin: "0 0 20px", fontFamily: "Cairo, sans-serif" }}>
            اكتب تخمينك، ثم اضغط إدخال لمعرفة النتيجة.
          </p>

          <button onClick={() => setShowInfoPanel(false)} style={{
            width: "100%", padding: "12px", background: "#4b2cb0",
            color: "#fff", border: "none", borderRadius: 10,
            fontFamily: "Cairo, sans-serif", fontSize: 15, fontWeight: 700,
            cursor: "pointer", marginBottom: 10
          }}>
            ابدأ اللعب
          </button>

          <p style={{ fontSize: 12, color: "#4b2cb0", fontWeight: 700, fontFamily: "Cairo, sans-serif", cursor: "pointer" }}
            onClick={() => navigate("/how-to-play")}>
            عرض طريقة اللعب كاملة
          </p>
        </div>
      </div>
    </>
  );
}