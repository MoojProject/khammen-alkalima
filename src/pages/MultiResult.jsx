import Header from "../components/Header.jsx";
import "../MultiChallengePage.css";

export default function MultiResult({ result, onRematch, waitingRematch }) {
  const { iWon, isDraw, myAttempts, opAttempts, myPoints, opPoints, myScore, opScore } = result;

  return (
    <div className="mc2-page">
      <Header centerCurrent="النتيجة" onHowToPlay={() => {}} onContact={() => {}} />

      <div className="mc2-shell">

        {/* يسار: النتيجة والنقاط */}
        <div className="result-form-side">
          <h3 className="result-section-title">هذه الجولة</h3>

          <div className="result-round-card">
            <div className="result-player-col">
              <p className="result-player-label">أنت</p>
              <p className="result-attempts">{myAttempts ? `${myAttempts} محاولات` : "ما خمّنت"}</p>
              <div className={`result-pts ${myPoints > opPoints ? 'result-pts--win' : myPoints < opPoints ? 'result-pts--lose' : 'result-pts--draw'}`}>
                +{myPoints} نقطة
              </div>
            </div>
            <div className="result-vs-badge">VS</div>
            <div className="result-player-col">
              <p className="result-player-label">صاحبك</p>
              <p className="result-attempts">{opAttempts ? `${opAttempts} محاولات` : "ما خمّن"}</p>
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
                <span className="mc2-dot" /><span className="mc2-dot" /><span className="mc2-dot" />
              </div>
              <p className="mc2-note">بانتظار موافقة صاحبك...</p>
            </div>
          )}

          <a href="/" className="result-end-btn">
            <span className="material-icons" style={{fontSize:16}}>home</span>
            إنهاء اللعبة والعودة للرئيسية
          </a>
        </div>

        {/* يمين: الكأس والنتيجة */}
        <div className="result-trophy-side">
          {/* كونفيتي */}
          <div className="result-confetti" aria-hidden="true">
            {[
              {left:'8%',  top:'12%', color:'#f9a8d4', w:12, h:16, rot:20},
              {left:'18%', top:'8%',  color:'#fde68a', w:10, h:10, rot:45},
              {left:'30%', top:'15%', color:'#a5b4fc', w:8,  h:14, rot:10},
              {left:'50%', top:'6%',  color:'#f9a8d4', w:14, h:10, rot:60},
              {left:'65%', top:'14%', color:'#fde68a', w:10, h:12, rot:30},
              {left:'78%', top:'9%',  color:'#6d28d9', w:8,  h:16, rot:15},
              {left:'88%', top:'18%', color:'#a5b4fc', w:12, h:10, rot:50},
              {left:'12%', top:'55%', color:'#fde68a', w:10, h:14, rot:25},
              {left:'82%', top:'50%', color:'#f9a8d4', w:8,  h:10, rot:70},
              {left:'92%', top:'35%', color:'#6d28d9', w:12, h:12, rot:40},
              {left:'5%',  top:'35%', color:'#a5b4fc', w:10, h:16, rot:55},
              {left:'72%', top:'70%', color:'#fde68a', w:14, h:10, rot:20},
              {left:'25%', top:'72%', color:'#f9a8d4', w:8,  h:12, rot:35},
              {left:'55%', top:'78%', color:'#a5b4fc', w:10, h:10, rot:65},
            ].map((c, i) => (
              <div key={i} style={{
                position:'absolute', left:c.left, top:c.top,
                width:c.w, height:c.h, borderRadius:3,
                background:c.color, transform:`rotate(${c.rot}deg)`,
                opacity:0.85,
              }} />
            ))}
          </div>

          {/* الكأس داخل دائرة */}
          <div className="result-trophy-circle">
            <svg viewBox="0 0 100 90" width="110" xmlns="http://www.w3.org/2000/svg">
              <rect x="38" y="78" width="24" height="7" rx="2" fill="#c4b8f0"/>
              <rect x="30" y="83" width="40" height="8" rx="3" fill="#b0a0e8"/>
              <path d="M20 10 Q10 10 10 28 Q10 46 28 54 L28 72 Q28 76 32 76 L68 76 Q72 76 72 72 L72 54 Q90 46 90 28 Q90 10 80 10 Z" fill="#c8b8f8"/>
              <path d="M30 10 L70 10 L70 65 Q70 73 62 73 L38 73 Q30 73 30 65 Z" fill="#ddd0fc"/>
              <path d="M10 18 Q10 40 28 50 L28 38 Q15 32 15 18 Z" fill="#b0a0e8"/>
              <path d="M90 18 Q90 40 72 50 L72 38 Q85 32 85 18 Z" fill="#b0a0e8"/>
              <path d="M38 35 L42 48 L50 40 L58 48 L62 35 L54 42 Z" fill="#7c5cbf" opacity="0.9"/>
              <ellipse cx="50" cy="10" rx="20" ry="4" fill="#e8dcff" opacity="0.5"/>
            </svg>
          </div>

          {/* النص الكبير */}
          <h1 className="result-big-verdict">
            {isDraw ? "!تعادل" : iWon ? "!فزت" : "!خسرت"}
          </h1>
          <p className="result-big-sub">
            {isDraw ? "مباراة متكافئة" : iWon ? "أداء ممتاز" : "حظ أوفر المرة القادمة"}
          </p>

          {/* البادجات */}
          <div className="result-badges-row">
            <div className="result-badge-item">
              <div className="result-badge-icon">
                <span className="material-icons">verified</span>
              </div>
              <span>دقة عالية</span>
            </div>
            <div className="result-badge-item">
              <div className="result-badge-icon">
                <span className="material-icons">bolt</span>
              </div>
              <span>سرعة ممتازة</span>
            </div>
            <div className="result-badge-item">
              <div className="result-badge-icon">
                <span className="material-icons">track_changes</span>
              </div>
              <span>أداء رائع</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}