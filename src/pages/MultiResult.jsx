import Header from "../components/Header.jsx";
import "../MultiChallengePage.css";

export default function MultiResult({ result, onRematch, waitingRematch }) {
  const { iWon, isDraw, myAttempts, opAttempts, myPoints, opPoints, myScore, opScore } = result;

  const title     = isDraw ? "تعادل! 🤝" : iWon ? "فزت! 🏆" : "خسرت 😔";
  const titleColor = isDraw ? "#7c6caa" : iWon ? "#2d6a10" : "#991b1b";

  return (
    <div className="mc2-page">
      <Header centerCurrent="النتيجة" onHowToPlay={() => {}} onContact={() => {}} />

      <div className="mc2-shell">
        <div className="mc2-left">
          <h1 className="mc2-title" style={{ color: titleColor }}>{title}</h1>

          {/* نتيجة الجولة */}
          <div className="mc2-card">
            <p className="mc2-cardTitle">هذي الجولة</p>

            <div className="mc2-resultRow">
              <div className="mc2-resultPlayer">
                <span className="mc2-resultLabel">أنت</span>
                <span className="mc2-resultAttempts">
                  {myAttempts ? `${myAttempts} محاولات` : "ما خمّنت ❌"}
                </span>
                <span className="mc2-resultPoints mc2-resultPoints--mine">
                  +{myPoints} نقطة
                </span>
              </div>

              <div className="mc2-resultVS">VS</div>

              <div className="mc2-resultPlayer">
                <span className="mc2-resultLabel">صاحبك</span>
                <span className="mc2-resultAttempts">
                  {opAttempts ? `${opAttempts} محاولات` : "ما خمّن ❌"}
                </span>
                <span className="mc2-resultPoints mc2-resultPoints--op">
                  +{opPoints} نقطة
                </span>
              </div>
            </div>
          </div>

          {/* النقاط التراكمية */}
          <div className="mc2-card">
            <p className="mc2-cardTitle">مجموع النقاط 📊</p>

            <div className="mc2-scoreRow">
              <div className="mc2-scoreBox mc2-scoreBox--mine">
                <span className="mc2-scoreLabel">أنت</span>
                <span className="mc2-scoreNum">{myScore}</span>
              </div>
              <div className="mc2-scoreDivider">:</div>
              <div className="mc2-scoreBox mc2-scoreBox--op">
                <span className="mc2-scoreLabel">صاحبك</span>
                <span className="mc2-scoreNum">{opScore}</span>
              </div>
            </div>
          </div>

          {/* أزرار */}
          {!waitingRematch ? (
            <button className="mc2-btn mc2-btnPrimary" onClick={onRematch}
              style={{ width: "min(420px,100%)" }}>
              جولة جديدة 🔄
            </button>
          ) : (
            <div className="mc2-card" style={{ textAlign: "center" }}>
              <div className="mc2-dotsWrap" style={{ justifyContent: "center", marginBottom: 8 }}>
                <span className="mc2-dot" />
                <span className="mc2-dot" />
                <span className="mc2-dot" />
              </div>
              <p className="mc2-note">بانتظار موافقة صاحبك على جولة جديدة...</p>
            </div>
          )}

          <a href="/" style={{
            marginTop: 10,
            display: "block",
            textAlign: "center",
            color: "#9b8cc2",
            fontSize: 13,
            fontWeight: 700,
          }}>
            إنهاء اللعبة والعودة للرئيسية
          </a>
        </div>

        <div className="mc2-right" style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 12,
          background: "#e8e1f9",
        }}>
          {/* بطاقة الفائز */}
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 64 }}>
              {isDraw ? "🤝" : iWon ? "🏆" : "💪"}
            </div>
            <p style={{ fontFamily: "Cairo,sans-serif", fontWeight: 800,
              fontSize: 18, color: "#4b2cb0", marginTop: 8 }}>
              {isDraw ? "تعادلتوا!" : iWon ? "أنت الفائز!" : "صاحبك فاز هالمرة"}
            </p>
            {!isDraw && (
              <p style={{ fontFamily: "Cairo,sans-serif", fontSize: 13,
                color: "#9b8cc2", marginTop: 4 }}>
                {iWon ? "عمل رائع 🌟" : "حظ أوفر المرة القادمة!"}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}