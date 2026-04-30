import React from "react";

const rows = [
  ["د","ج","ح","خ","ه","ع","غ","ف","ق","ث","ص","ض"],               // 12
  ["ط","ك","م","ن","ت","ا","ل","ب","ي","س","ش"],                   // 11
  ["ظ","ز","و","ة","ى","ر","ذ","ؤ","ء","ئ","إ","أ"],               // 11
];

export default function Keyboard({ onLetter, onBackspace, onEnter, keyStatus }) {
  return (
    <div className="keyboard-container">
      {rows.map((row, idx) => (
        <div className={`keyboard-row row-${idx + 1}`} key={idx}>
          {row.map((l) => {
            const st = keyStatus?.get?.(l); // "green" | "yellow" | "gray"
            const cls = st ? `key ${st}` : "key";
            return (
              <button key={l} className={cls} onClick={() => onLetter?.(l)}>
                {l}
              </button>
            );
          })}
        </div>
      ))}

      <div className="keyboard-actions">
        <button className="action-key" onClick={onBackspace}>
          مسح
        </button>
        <button className="action-key primary" onClick={onEnter}>
          إدخال
        </button>
      </div>
    </div>
  );
}

// import React from "react";

// // const rows = [
// //   ["ض","ص","ث","ق","ف","غ","ع","ه","خ","ح","ج","د"],
// //   ["ش","س","ي","ب","ل","ا","ت","ن","م","ك","ط"],
// //   ["أ","إ","ئ","ء","ؤ","ر","ى","ة","و","ز","ظ"],
// // ];
// const rows = [
//   ["د","ج","ح","خ","ه","ع","غ","ف","ق","ث","ص","ض"],
//   ["ط","ك","م","ن","ت","ا","ل","ب","ي","س","ش"],
//   ["ظ","ز","و","ة","ى","ر","ذ","ؤ","ء","ئ","إ","أ"],
// ];

// export default function Keyboard({ onLetter, onBackspace, onEnter, keyStatus }) {
//   return (
//     <div className="keyboard-container">
//       {rows.map((row, idx) => (
//         <div className="keyboard-row" key={idx}>
//           {row.map((l) => {
//             const st = keyStatus?.get?.(l); // "green" | "yellow" | "gray"
//             const cls = st ? `key ${st}` : "key";
//             return (
//               <button key={l} className={cls} onClick={() => onLetter?.(l)}>
//                 {l}
//               </button>
//             );
//           })}
//         </div>
//       ))}

//       <div className="keyboard-actions">
//         <button className="action-key" onClick={onBackspace}>
//           مسح
//         </button>
//         <button className="action-key primary" onClick={onEnter}>
//           إدخال
//         </button>
//       </div>
//     </div>
//   );
// }
