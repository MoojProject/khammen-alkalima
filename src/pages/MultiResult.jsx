import Header from "../components/Header.jsx";
import "../MultiChallengePage.css";

export default function MultiResult({ result, onRematch, waitingRematch }) {
  const { iWon, isDraw, myAttempts, opAttempts, myPoints, opPoints, myScore, opScore } = result;

  return (
    <div className="mc2-page">
      <Header centerCurrent="النتيجة" onHowToPlay={() => {}} onContact={() => {}} />

      <div className="mc2-shell">

        <div className="result-left">
          {iWon && (
            <div className="result-confetti">
              {[...Array(12)].map((_, i) => (
                <div key={i} className={`confetti-piece confetti-${i}`} />
              ))}
            </div>
          )}

          <div className="result-trophy">
            {iWon ? (
              <svg viewBox="0 0 120 140" width="160" xmlns="http://www.w3.org/2000/svg">
                <rect x="45" y="115" width="30" height="8" rx="3" fill="#c4b8f0"/>
                <rect x="35" y="123" width="50" height="10" rx="4" fill="#b0a0e8"/>
                <path d="M25 20 Q15 20 15 40 Q15 60 35 68 L35 95 Q35 100 40 100 L80 100 Q85 100 85 95 L85 68 Q105 60 105 40 Q105 20 95 20 Z" fill="#b8a8ef"/>
                <path d="M35 20 L85 20 L85 85 Q85 95 75 95 L45 95 Q35 95 35 85 Z" fill="#c8b8f8"/>
                <path d="M15 30 Q15 55 35 65 L35 50 Q20 44 20 30 Z" fill="#a898df"/>
                <path d="M105 30 Q105 55 85 65 L85 50 Q100 44 100 30 Z" fill="#a898df"/>
                <text x="60" y="68" textAnchor="middle" fontSize="28" fill="#7c5cbf">★</text>
              </svg>
            ) : (
              <span className="material-icons" style={{fontSize:100,color:'#c4b8e8'}}>emoji_events</span>
            )}
          </div>

          <h2 className="result-verdict">
            {isDraw ? "تعادل!" : iWon ? "!فزت" : "!خسرت"}
          </h2>
          <p className="result-sub">
            {isDraw ? "مباراة متكافئة" : iWon ? "أداء ممتاز" : "حظ أوفر المرة القادمة"}
          </p>

          <div className="result-badges">
            <div className="result-badge">
              <span className="material-icons">track_changes</span>
              <span>أداء رائع</span>
            </div>
            <div className="result-badge">
              <span className="material-icons">bolt</span>
              <span>سرعة ممتازة</span>
            </div>
            <div className="result-badge">
              <span className="material-icons">verified</span>
              <span>دقة عالية</span>
            </div>
          </div>
        </div>

        <div className="result-right">
          <h3 className="result-section-title">هذه الجولة</h3>

          <div className="result-round-card">
            <div className="result-player-col">
              <p className="result-player-label">أنت</p>
              <p className="result-attempts">
                {myAttempts ? `${myAttempts} محاولات` : "ما خمّنت"}
              </p>
              <div className={`result-pts ${myPoints > opPoints ? 'result-pts--win' : myPoints < opPoints ? 'result-pts--lose' : 'result-pts--draw'}`}>
                +{myPoints} نقطة
              </div>
            </div>

            <div className="result-vs">VS</div>

            <div className="result-player-col">
              <p className="result-player-label">صاحبك</p>
              <p className="result-attempts">
                {opAttempts ? `${opAttempts} محاولات` : "ما خمّن"}
              </p>
              <div className={`result-pts ${opPoints > myPoints ? 'result-pts--win' : opPoints < myPoints ? 'result-pts--lose' : 'result-pts--draw'}`}>
                +{opPoints} نقطة
              </div>
            </div>
          </div>

          <div className="result-score-section">
            <div className="result-score-header">
              <span className="material-icons" style={{fontSize:18,color:'#4b2cb0'}}>bar_chart</span>
              <h3 className="result-section-title" style={{margin:0}}>مجموع النقاط</h3>
            </div>
            <div className="result-score-row">
              <div className="result-score-box">
                <p className="result-score-label">أنت</p>
                <p className="result-score-num">{myScore}</p>
              </div>
              <div className="result-score-colon">:</div>
              <div className="result-score-box">
                <p className="result-score-label">صاحبك</p>
                <p className="result-score-num">{opScore}</p>
              </div>
            </div>
          </div>

          {!waitingRematch ? (
            <button className="result-rematch-btn" onClick={onRematch}>
              <span className="material-icons">refresh</span>
              جولة جديدة
            </button>
          ) : (
            <div className="result-waiting-box">
              <div className="mc2-dotsWrap">
                <span className="mc2-dot" />
                <span className="mc2-dot" />
                <span className="mc2-dot" />
              </div>
              <p className="mc2-note">بانتظار موافقة صاحبك...</p>
            </div>
          )}

          <a href="/" className="result-end-btn">إنهاء اللعبة والعودة للرئيسية</a>
        </div>

      </div>
    </div>
  );
}