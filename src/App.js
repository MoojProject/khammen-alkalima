import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import SingleChallenge from "./pages/SingleChallenge";
import MultiChallenge from "./pages/MultiChallenge";
  
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/single" element={<SingleChallenge />} />
      
      <Route path="/multi" element={<MultiChallenge />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}



// import { Routes, Route, Navigate } from "react-router-dom";
// import SingleChallenge from "./pages/SingleChallenge";

// export default function App() {
//   return (

//     <Routes>

//       <Route path="/single" element={<SingleChallenge />} 
//       />
//       <Route path="*" element={<Navigate to="/single" replace />} />
//     </Routes>
//   );
// }


