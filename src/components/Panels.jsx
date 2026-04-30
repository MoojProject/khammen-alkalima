import React, { useEffect, useMemo, useState } from "react";

function timeLeftString() {
  const now = new Date();
  const INTERVAL = 5 * 60 * 1000;
  const end = new Date(Math.ceil(now.getTime() / INTERVAL) * INTERVAL);
  const diffMs = Math.max(0, end - now);
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
  const [timer, setTimer] = useState("00:00:00");

  const statusText = useMemo(() => {
    if (gameStatus === "WINNER") return "أحسنت 🎉";
    if (gameStatus === "LOSER")  return "حاول المرة القادمة";
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
        <i
          className="close material-icons"
          onClick={() => setShowInfoPanel(false)}
        >
          &#xe5cd;
        </i>
        <p className="title_info">Wordle النسخة العربية من اللعبة المشهورة</p>
        <br />
        <p>لتبسيط اللعب جرب فقط أسماء وصفات حيث أن الأفعال والضمائر مستبعدة</p>
        <p>جميع علامات التشكيل مستبعدة</p>
      </div>
    </>
  );
}