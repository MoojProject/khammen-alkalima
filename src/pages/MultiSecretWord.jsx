import { useState } from "react";
import Header from "../components/Header.jsx";
import playersImg from "../assets/players.png";
import ArabicDict from "../Dictionary.js";
import "../MultiChallengePage.css";

function isValidWord(word) {
  if (!word || word.length !== 5) return false;
  return (ArabicDict[word[0]] || []).includes(word);
}

export default function MultiSecretWord({ onWordSubmit }) {
  const [word, setWord]           = useState("");
  const [error, setError]         = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (word.length !== 5) { setError("الكلمة لازم تكون ٥ حروف"); return; }
    if (!isValidWord(word)) { setError("الكلمة مو موجودة في القاموس"); return; }
    setError("");
    setSubmitted(true);
    onWordSubmit(word);
  };

  const handleChange = (e) => {
    const val = e.target.value;
    if (/^[\u0600-\u06FF]*$/.test(val) && val.length <= 5) {
      setWord(val); setError("");
    }
  };

  return (
    <div className="mc2-page">
      <Header centerCurrent="لاعبين" onHowToPlay={() => {}} onContact={() => {}} />
      <div className="mc2-shell">

        <div className="mc2-imgSide">
          <div className="mc2-imgOverlay">
            <img src={playersImg} alt="players" className="mc2-heroImg" />
            <div className="mc2-imgCaption">
              <p className="mc2-imgTitle">اختر كلمة سرية</p>
              <p className="mc2-imgSub">كلمة من ٥ حروف — صاحبك راح يخمنها!</p>
            </div>
          </div>
        </div>

        <div className="mc2-secretSide">
          {!submitted ? (
            <>
              <h1 className="mc2-secretTitle">اختر كلمة لصاحبك</h1>
              <div className="mc2-secretCard">
                <p className="mc2-secretHint">اكتب كلمة سرية من ٥ حروف — صاحبك راح يخمنها</p>
                <div className="mc2-wordInputWrap">
                  <input
                    className="mc2-wordInput"
                    placeholder="_ _ _ _ _"
                    maxLength={5}
                    value={word}
                    onChange={handleChange}
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                    autoFocus
                  />
                </div>
                <div className="mc2-letterDots">
                  {[0,1,2,3,4].map(i => (
                    <span key={i} className={`mc2-letterDot${i < word.length ? " mc2-letterDot--filled" : ""}`} />
                  ))}
                </div>
                {error && <p className="mc2-fieldError">{error}</p>}
                <button className="mc2-confirmBtn" onClick={handleSubmit} disabled={word.length !== 5}>
                  تأكيد الكلمة
                </button>
              </div>
            </>
          ) : (
            <>
              <h1 className="mc2-secretTitle">جاهز!</h1>
              <div className="mc2-secretCard">
                <div className="mc2-submittedBox">
                  <p className="mc2-submittedText">حفظنا كلمتك، بانتظار صاحبك...</p>
                </div>
                <div className="mc2-dotsWrap" style={{ justifyContent: "center", marginTop: 8 }}>
                  <span className="mc2-dot" /><span className="mc2-dot" /><span className="mc2-dot" />
                </div>
                <p className="mc2-waitNote" style={{ textAlign: "center" }}>لما صاحبك يحط كلمته تبدأ اللعبة تلقائياً</p>
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
}