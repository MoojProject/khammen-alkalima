import { Link } from "react-router-dom";
import Header from "../components/Header.jsx";
import FooterContact from "../components/FooterContact";

import logo1 from "../assets/logo0.png";
import bg from "../assets/background0.png";

export default function Home() {
  return (
    <div dir="rtl" className="home">
      <Header onHowToPlay={() => {}} onContact={() => {}} />

      {/* HERO */}
      <section
        className="hero"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="hero__content">
          <img src={logo1} alt="Logo1" className="logo1-img" />

          <div className="hero__actions">
            <Link className="btn btn--solid" to="/single">
              قدّها لحالك
            </Link>
            <Link className="btn btn--ghost" to="/multi">
              لاعبين
            </Link>
          </div>
        </div>
      </section>
      <FooterContact />

      {/* CONTACT
      <section className="contact">
        <div className="contact__card">
          <img src={logo1} alt="Logo1" className="contact__logo" />
          <h3>Send us an Email</h3>

          <input type="email" placeholder="Your email address" />
          <textarea placeholder="Describe your project" />
          <button>Submit</button>
        </div>

        <footer className="footer">
          © 2025 • Privacy • Terms
        </footer>
      </section> */}
    </div>
  );
}
// import { Link } from "react-router-dom";
// import Header from "../components/Header.jsx";
// import logo from "../assets/logo0.png";

// export default function Home() {
//   return (
//     <div dir="rtl">
//       <Header />

//       <div className="home-hero">
//         <div className="logo">
//           <img src={logo} alt="Logo" className="logo-img" />

//         </div>

//         <div className="buttons">
//           <Link to="/single" className="btn secondary">
//             قدّها لحالك
//           </Link>
          
//           <Link to="/multi" className="btn primary">
//             لاعبين
//           </Link>

 
//         </div>
//       </div>

//       <footer className="home-footer">
//         <p>© 2025 • Privacy • Terms</p>
//       </footer>
//     </div>
//   );
// }
