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
            <span className="material-icons" style={{fontSize:90,color:'#7c5cbf'}}>emoji_events</span>
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