import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo1.png";

export default function Header({ centerCurrent, onHowToPlay, onContact }) {
  return (
    <header className="main-header">
      <div className="header-left">
        <div className="logo-box">
          <Link to="/">
            <img src={logo} alt="Logo" className="logo-img" />
          </Link>        
          </div>
      </div>

      {/* ✅ الوسط يظهر فقط إذا فيه عنوان */}
      {centerCurrent && (
        <div className="header-center">
            <Link to="/" className="header-home">
             الرئيسية
             </Link>          
             <span className="separator">›</span>
          <span className="current">{centerCurrent}</span>
        </div>
      )}

      <div className="header-right">
        <a
          href="#how"
          onClick={(e) => {
            e.preventDefault();
            onHowToPlay?.();
          }}
        >
         كيف العب؟
        </a>
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            onContact?.();
          }}
        >
          تواصل معنا
        </a>
      </div>
    </header>
  );
}

// import React from "react";
// import logo from "../assets/logo1.png";
 
 
// export default function Header({ centerCurrent, onHowToPlay, onContact }) {
//     return (
//         <header className="main-header">
//             <div className="header-left">
//                 <div className="logo-box">
//                     <img src={logo} alt="Logo" className="logo-img" />
//                 </div>
//             </div>

//             <div className="header-center">
//                 <span>الرئيسية</span>
//                 <span className="separator">›</span>
//                 <span className="current">{centerCurrent}</span>
//             </div>

//             <div className="header-right">
//                 <a
//                     href="#how"
//                     onClick={(e) => {
//                         e.preventDefault();
//                         onHowToPlay?.();
//                     }}
//                 >
//                     طريقة اللعب
//                 </a>
//                 <a 
//                 href="#contact" 
//                 onClick={(e) => {
//                     e.preventDefault();
//                     onContact?.();
//                 }}
                    
//                     >
//                     تواصل معنا
//                 </a>
//             </div>
//         </header>
//     );
// }
