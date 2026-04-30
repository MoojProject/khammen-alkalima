import { useState } from "react";
import Header from "../components/Header.jsx";
import playersImg from "../assets/players.png";
import "../MultiChallengePage.css";

export default function MultiLobby({ onCreateRoom, onJoinRoom, error }) {
  const [inputCode, setInputCode] = useState("");

  const handleJoin = () => {
    if (!inputCode.trim()) return;
    onJoinRoom(inputCode);
  };

  return (
    <div className="mc2-page">
      <Header centerCurrent="لاعبين" onHowToPlay={() => {}} onContact={() => {}} />

      <div className="mc2-shell">

        {/* ===== يسار: الفورم ===== */}
        <div className="mc2-left">
          <p className="lobby-welcome">مرحبا بك في</p>
          <h1 className="lobby-title">اللاعبين</h1>
          <p className="lobby-sub">أنشئ غرفة جديدة أو انضم إلى غرفة حالية</p>

          <button className="lobby-create-btn" onClick={onCreateRoom}>
            <div className="lobby-create-icon">
              <span className="material-icons">add</span>
            </div>
            <div className="lobby-create-text">
              <span className="lobby-create-title">إنشاء غرفة جديدة</span>
              <span className="lobby-create-sub">ابدأ لعبة جديدة مع أصدقائك</span>
            </div>
            <span className="material-icons lobby-create-arrow">chevron_left</span>
          </button>

          <div className="lobby-join-card">
            <div className="lobby-join-header">
              <div className="lobby-join-icon">
                <span className="material-icons">login</span>
              </div>
              <div>
                <p className="lobby-join-title">الانضمام إلى غرفة</p>
                <p className="lobby-join-sub">أدخل كود الغرفة للانضمام</p>
              </div>
            </div>
            <div className="lobby-input-wrap">
              <span className="lobby-input-hash material-icons">tag</span>
              <input
                className="lobby-input"
                placeholder="مثال: A1B2C3"
                maxLength={6}
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value.toUpperCase())}
                onKeyDown={(e) => e.key === "Enter" && handleJoin()}
              />
              <span className="lobby-input-key">🔑</span>
            </div>
            <button className="lobby-join-btn" onClick={handleJoin}>
              <span>الانضمام إلى الغرفة</span>
              <span className="material-icons">arrow_back</span>
            </button>
          </div>

          {error && <div className="mc2-error">⚠️ {error}</div>}

          <div className="lobby-safe">
            <span className="material-icons">shield</span>
            <div>
              <p className="lobby-safe-title">العب بأمان</p>
              <p className="lobby-safe-sub">تجربة آمنة وممتعة للجميع</p>
            </div>
          </div>
        </div>

        {/* ===== يمين: الصورة + نص ===== */}
        <div className="lobby-img-side">
          <img src={playersImg} alt="players" className="lobby-img" />
          <div className="lobby-img-text">
            <h2>خمن الكلمة</h2>
            <p>تحدّ أصدقاءك واكتشف الكلمة من خلال تلميحات ممتعة!</p>
          </div>
          <div className="lobby-features">
            <div className="lobby-feature">
              <span className="material-icons">group</span>
              <span>العب مع أصدقائك</span>
            </div>
            <div className="lobby-feature">
              <span className="material-icons">bolt</span>
              <span>سريع وممتع</span>
            </div>
            <div className="lobby-feature">
              <span className="material-icons">track_changes</span>
              <span>حاول وبتقدر!</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}