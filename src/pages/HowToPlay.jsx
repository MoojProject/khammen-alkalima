import { useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";

const GREEN  = "#aae384";
const YELLOW = "#e3d284";
const GRAY   = "#aaaaae";

function ColorBox({ color, label, desc }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: "#fff", borderRadius: 12, padding: "14px 16px",
      marginBottom: 10, fontFamily: "Cairo, sans-serif", direction: "rtl",
    }}>
      <div>
        <p style={{ margin: "0 0 4px", fontWeight: 800, fontSize: 15, color: label === "رمادي" ? "#555" : label === "أخضر" ? "#2d6a10" : "#b07a00" }}>
          {label}
        </p>
        <p style={{ margin: 0, fontSize: 13, color: "#7c6caa" }}>{desc}</p>
      </div>
      <div style={{ width: 40, height: 40, borderRadius: 8, background: color, flexShrink: 0 }} />
    </div>
  );
}

function ExampleRow({ letters, colors, note }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10, direction: "rtl", fontFamily: "Cairo, sans-serif" }}>
      <div style={{ display: "flex", gap: 6 }}>
        {letters.map((l, i) => (
          <div key={i} style={{
            width: 38, height: 38, borderRadius: 8,
            background: colors[i] || "#ede8fb",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18, fontWeight: 800, color: "#fff",
          }}>{l}</div>
        ))}
      </div>
      <p style={{ margin: 0, fontSize: 13, color: "#7c6caa" }}>{note}</p>
    </div>
  );
}

export default function HowToPlay() {
  const navigate = useNavigate();

  return (
    <div dir="rtl" style={{ fontFamily: "Cairo, sans-serif", minHeight: "100vh", background: "#f5f3ff" }}>
      <Header centerCurrent="طريقة اللعب" onHowToPlay={() => {}} onContact={() => {}} />

      <div style={{ maxWidth: 520, margin: "0 auto", padding: "24px 16px 40px" }}>

        {/* زر العودة */}
        <button onClick={() => navigate(-1)} style={{
          display: "flex", alignItems: "center", gap: 6,
          background: "none", border: "none", color: "#4b2cb0",
          fontFamily: "Cairo, sans-serif", fontWeight: 700, fontSize: 14,
          cursor: "pointer", marginBottom: 20, padding: 0,
        }}>
          <span className="material-icons" style={{ fontSize: 18 }}>arrow_forward</span>
          العودة
        </button>

        <h1 style={{ fontSize: 24, fontWeight: 800, color: "#2d1a6e", margin: "0 0 24px", textAlign: "center" }}>
          طريقة اللعب
        </h1>

        {/* الهدف */}
        <div style={{
          background: "#fff", borderRadius: 14, padding: "16px 18px",
          marginBottom: 16, display: "flex", alignItems: "center",
          justifyContent: "space-between", gap: 12,
        }}>
          <div>
            <p style={{ margin: "0 0 6px", fontWeight: 800, fontSize: 15, color: "#2d1a6e" }}>الهدف من اللعبة</p>
            <p style={{ margin: 0, fontSize: 13, color: "#7c6caa", lineHeight: 1.7 }}>
              خمن الكلمة المخفية المكونة من <strong style={{ color: "#4b2cb0" }}>5 أحرف</strong> في <strong style={{ color: "#4b2cb0" }}>6 محاولات</strong> أو أقل.
            </p>
          </div>
          <div style={{
            width: 48, height: 48, borderRadius: 12, background: "#ede8fb",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <span className="material-icons" style={{ fontSize: 26, color: "#4b2cb0" }}>track_changes</span>
          </div>
        </div>

        {/* معاني الألوان */}
        <div style={{ background: "#fff", borderRadius: 14, padding: "16px 18px", marginBottom: 16 }}>
          <p style={{ margin: "0 0 14px", fontWeight: 800, fontSize: 15, color: "#4b2cb0", textAlign: "center" }}>
            معاني الألوان
          </p>
          <ColorBox color={GREEN}  label="أخضر"  desc="الحرف صحيح وفي المكان الصحيح." />
          <ColorBox color={YELLOW} label="أصفر"  desc="الحرف موجود في الكلمة لكن في مكان آخر." />
          <ColorBox color={GRAY}   label="رمادي" desc="الحرف غير موجود في الكلمة." />
        </div>

        {/* مثال توضيحي */}
        <div style={{ background: "#fff", borderRadius: 14, padding: "16px 18px", marginBottom: 16 }}>
          <p style={{ margin: "0 0 14px", fontWeight: 800, fontSize: 15, color: "#4b2cb0", textAlign: "center" }}>
            مثال توضيحي
          </p>
          <ExampleRow
            letters={["م", "د", "ر", "س", "ة"]}
            colors={[GREEN, GRAY, GRAY, GRAY, GRAY]}
            note="م: صحيح وفي مكانه"
          />
          <ExampleRow
            letters={["م", "ك", "ت", "ب", "ة"]}
            colors={[GREEN, GRAY, YELLOW, GRAY, GREEN]}
            note="ت: موجود لكن في مكان آخر"
          />
          <ExampleRow
            letters={["م", "ن", "ج", "ل", "ة"]}
            colors={[GREEN, GRAY, GRAY, GRAY, GREEN]}
            note="ن، ج، ل: غير موجودة"
          />
        </div>

        {/* نصائح */}
        <div style={{ background: "#fff", borderRadius: 14, padding: "16px 18px", marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <p style={{ margin: 0, fontWeight: 800, fontSize: 15, color: "#2d1a6e" }}>نصائح</p>
            <div style={{
              width: 40, height: 40, borderRadius: 10, background: "#fef9c3",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span className="material-icons" style={{ fontSize: 22, color: "#b07a00" }}>lightbulb</span>
            </div>
          </div>
          {[
            "الكلمات لا تتكرر.",
            "جميع الإجابات الصحيحة هي أسماء أو صفات.",
            "تأكد من كتابة الكلمة بدون مسافات.",
            "استخدم الألوان لتضيّق خياراتك.",
          ].map((tip, i) => (
            <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "flex-start" }}>
              <span className="material-icons" style={{ fontSize: 16, color: "#4b2cb0", marginTop: 2 }}>check_circle</span>
              <p style={{ margin: 0, fontSize: 13, color: "#7c6caa" }}>{tip}</p>
            </div>
          ))}
        </div>

        {/* زر ابدأ */}
        <button onClick={() => navigate("/")} style={{
          width: "100%", padding: 14, background: "#4b2cb0",
          color: "#fff", border: "none", borderRadius: 12,
          fontFamily: "Cairo, sans-serif", fontSize: 15, fontWeight: 700,
          cursor: "pointer",
        }}>
          ابدأ اللعب
        </button>

      </div>
    </div>
  );
}