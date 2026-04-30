import { useState } from "react";
import Header from "../components/Header.jsx";
import playersImg from "../assets/players.png";
import "../MultiChallengePage.css";

export default function MultiWaiting({ roomCode }) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(roomCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareCode = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: "خمن الكلمة", text: `انضم للعبة! كود الغرفة: ${roomCode}` });
      } else {
        copyCode();
      }
    } catch (_) {}
  };

  return (
    <div className="mc2-page">
      <Header centerCurrent="لاعبين" onHowToPlay={() => {}} onContact={() => {}} />

      <div className="mc2-shell">

        {/* يسار: الفورم */}
        <div className="waiting-form-side">
          <div className="waiting-icon-wrap">
            <span className="material-icons">group</span>
          </div>
          <h1 className="waiting-title">بانتظار اللاعبين...</h1>
          <p className="waiting-sub">شارك كود الغرفة مع أصدقائك للانضمام</p>

          <div className="waiting-code-box">
            <p className="waiting-code-label">كود الغرفة</p>
            <p className="waiting-code-value">{roomCode}</p>
            <button className="waiting-copy-btn" onClick={copyCode}>
              <span className="material-icons">content_copy</span>
              <span>{copied ? "تم النسخ!" : "نسخ الكود"}</span>
            </button>
          </div>

          <div className="mc2-dotsWrap">
            <span className="mc2-dot" />
            <span className="mc2-dot" />
            <span className="mc2-dot" />
          </div>

          <button className="waiting-share-btn" onClick={shareCode}>
            <span className="material-icons">link</span>
            <span>مشاركة الكود</span>
          </button>

          <div className="waiting-safe">
            <span className="material-icons">shield</span>
            <div>
              <p className="waiting-safe-title">اللعبة آمنة وممتعة للجميع</p>
              <p className="waiting-safe-sub">استمتعوا وكونوا مبدعين!</p>
            </div>
          </div>
        </div>

        {/* يمين: الصورة */}
        <div className="waiting-img-side">
          <img src={playersImg} alt="players" className="waiting-img" />
          <div className="waiting-features">
            <div className="waiting-feature">
              <span className="material-icons">group</span>
              <span className="wf-title">اللعب مع الأصدقاء</span>
              <span className="wf-sub">تجربة جماعية ممتعة</span>
            </div>
            <div className="waiting-feature">
              <span className="material-icons">bolt</span>
              <span className="wf-title">سريع وممتع</span>
              <span className="wf-sub">جولات سريعة ومليئة بالحماس</span>
            </div>
            <div className="waiting-feature">
              <span className="material-icons">track_changes</span>
              <span className="wf-title">حاول وتقدم!</span>
              <span className="wf-sub">كل جولة فرصة جديدة</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}