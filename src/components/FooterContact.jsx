import { useState } from "react";
import logo from "../assets/logo0.png";
import "../styles.css";

export default function FooterContact() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const data = new FormData(form);

    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data).toString(),
      });

      setSubmitted(true);
      form.reset();
    } catch {
      setError(true);
    }
  };

  return (
    <footer className="footer-contact">
      <form
        className="footer-contact__content"
        name="contact"
        method="POST"
        data-netlify="true"
        onSubmit={handleSubmit}
      >
        <input type="hidden" name="form-name" value="contact" />

        {/* LEFT */}
        <div className="footer-brand">
          <img src={logo} alt="logo" />
        </div>

        {/* RIGHT */}
        <div className="footer-form">
          <h4>تواصل معنا</h4>

          {submitted && (
            <p style={{ color: "green", fontWeight: "bold" }}>
              ✅ تم إرسال رسالتك بنجاح، شكرًا لتواصلك معنا
            </p>
          )}

          {error && (
            <p style={{ color: "red" }}>
              ❌ حدث خطأ، حاول مرة أخرى
            </p>
          )}

          {!submitted && (
            <>
              <label>البريد الإلكتروني</label>
              <input
                type="email"
                name="email"
                required
                placeholder="example@email.com"
              />

              <label>رسالتك</label>
              <textarea
                name="message"
                required
                placeholder="اكتب رسالتك هنا"
              />

              <button type="submit">إرسال</button>
            </>
          )}
        </div>
      </form>

      <div className="footer-copy">
        ©  2025 خمن الكلمة جميع الحقوق محفوظة.
      </div>
    </footer>
  );
}
// import logo from "../assets/logo0.png";
// import "../styles.css";

// export default function FooterContact() {
//   return (
//     <footer className="footer-contact">
//       <form
//         className="footer-contact__content"
//         name="contact"
//         method="POST"
//         data-netlify="true"
//       >
//         {/* مهم جدًا */}
//         <input type="hidden" name="form-name" value="contact" />

//         {/* LEFT */}
//         <div className="footer-brand">
//           <img src={logo} alt="logo" />
//         </div>

//         {/* RIGHT */}
//         <div className="footer-form">
//           <h4>تواصل معنا</h4>

//           <label>البريد الإلكتروني</label>
//           <input
//             type="email"
//             name="email"
//             placeholder="example@email.com"
//             required
//           />

//           <label>رسالتك</label>
//           <textarea
//             name="message"
//             placeholder="اكتب رسالتك هنا"
//             required
//           />

//           <button type="submit">إرسال</button>
//         </div>
//       </form>

//       <div className="footer-copy">
//         © 2025 • Privacy • Terms
//       </div>
//     </footer>
//   );
// }

// import logo from "../assets/logo0.png";
// import "../styles.css";

// export default function FooterContact() {
//   return (
//     <footer className="footer-contact">
//       <div className="footer-contact__content">
//         {/* LEFT */}
//         <div className="footer-brand">
//           <img src={logo} alt="logo" />
//         </div>

//         {/* RIGHT */}
        
//         <div className="footer-form">
//           <h4>تواصل معنا</h4>

//           <label>البريد الإلكتروني</label>
//           <input type="email" placeholder="example@email.com" />

//           <label>رسالتك</label>
//           <textarea placeholder="اكتب رسالتك هنا" />

//           <button>إرسال</button>
//         </div>
//       </div>

//       <div className="footer-copy">
//         © 2025 • Privacy • Terms
//       </div>
//     </footer>
//   );
// }
