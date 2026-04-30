import { useState } from "react";
import Header from "../components/Header.jsx";
import playersImg from "../assets/players.png";
import "../MultiChallengePage.css";

// الأبجدية العربية بالترتيب
const ARABIC_ALPHA = 'ابتثجحخدذرزسشصضطظعغفقكلمنهوي';

function validateWord(word) {
  // ٥ حروف عربية بالضبط
  if (!word || word.length !== 5)
    return "الكلمة لازم تكون ٥ حروف";

  // عربي فقط — لا أرقام ولا إنجليزي ولا رموز
  if (!/^[؀-ۿ]+$/.test(word))
    return "الكلمة لازم تكون حروف عربية فقط";

  // ما يتكرر نفس الحرف أكثر من مرتين
  for (const ch of word) {
    if ([...word].filter(c => c === ch).length > 2)
      return "ما يصح تكرار نفس الحرف أكثر من ٣ مرات";
  }

  // ما تكون ٣ حروف متتالية في الأبجدية
  for (let i = 0; i <= word.length - 3; i++) {
    const i1 = ARABIC_ALPHA.indexOf(word[i]);
    const i2 = ARABIC_ALPHA.indexOf(word[i+1]);
    const i3 = ARABIC_ALPHA.indexOf(word[i+2]);
    if (i1 !== -1 && i2 === i1+1 && i3 === i2+1)
      return "ما يصح ٣ حروف متتالية من الأبجدية";
  }

  return null; // صحيحة
}

export default function MultiSecretWord({ onWordSubmit }) {
  const [word, setWord]           = useState("");
  const [error, setError]         = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    const err = validateWord(word);
    if (err) { setError(err); return; }
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

        {/* يسار: الفورم */}
        <div className="sw-form-side">
          <div className="sw-dots-deco sw-dots-deco--tl" />
          <div className="sw-dots-deco sw-dots-deco--br" />

          {!submitted ? (
            <>
              <h1 className="sw-title">
                اختر كلمة لصاحبك
                <span className="material-icons sw-title-icon">edit</span>
              </h1>
              <p className="sw-hint">اكتب كلمة سرية من ٥ حروف — صاحبك راح يخمنها</p>

              <div className="sw-input-wrap">
                <span className="material-icons sw-lock">lock</span>
                <input
                  className="sw-input"
                  placeholder="— — — — —"
                  maxLength={5}
                  value={word}
                  onChange={handleChange}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  autoFocus
                />
              </div>

              <div className="sw-letter-dots">
                {[0,1,2,3,4].map(i => (
                  <span key={i} className={`sw-ldot${i < word.length ? " sw-ldot--on" : ""}`} />
                ))}
              </div>

              {error && <p className="sw-error">{error}</p>}

              <button className="sw-confirm-btn" onClick={handleSubmit} disabled={word.length !== 5}>
                <span className="material-icons">lock</span>
                تأكيد الكلمة
              </button>
            </>
          ) : (
            <>
              <div className="sw-check-icon">
                <span className="material-icons">check</span>
              </div>
              <h1 className="sw-title">جاهز!</h1>
              <div className="sw-done-box">حفظنا كلمتك، بانتظار صاحبك...</div>
              <div className="sw-letter-dots">
                <span className="sw-ldot sw-ldot--on" />
                <span className="sw-ldot sw-ldot--pulse" />
                <span className="sw-ldot sw-ldot--pulse sw-ldot--pulse2" />
              </div>
              <p className="sw-hint">لما صاحبك يحط كلمته تبدأ اللعبة تلقائياً</p>
            </>
          )}
        </div>

        {/* يمين: الصورة */}
        <div className="sw-img-side">
          <img src={playersImg} alt="players" className="sw-img" />
          <p className="sw-img-title">اختر كلمة سرية</p>
          <p className="sw-img-sub">كلمة من ٥ حروف — صاحبك راح يخمنها!</p>
        </div>

      </div>
    </div>
  );
}