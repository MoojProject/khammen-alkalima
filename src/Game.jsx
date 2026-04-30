// import React, { useEffect, useState } from "react";
// import ArabicDict from "./Dictionary";
// import "./styles.css";

// const not_exist_color = "#aaaaaeff";
// const wrong_position_color = "#e3d284ff";
// const correct_position_color = "#aae384ff";

// const messages = [
//   "هل لديك قدرة خارقة؟",
//   "مستحيل انت عبقرى",
//   "عظيم",
//   "عمل جيد",
//   "لست سيئا",
//   "أوه، كان هذا وشيكا",
// ];

// const ArabicPattern = /^[\u0600-\u06FF]+$/;

// function NumberOfDays() {
//   // نفس التاريخ اللي في كودك: 4 / 2 / 2025
//   const StartedDate = new Date(2025, 1, 4);
//   const CurrentTime = new Date();
//   const diff = Math.abs(CurrentTime - StartedDate);
//   const dayscount = Math.floor(diff / (1000 * 60 * 60 * 24));
//   return dayscount;
// }

// function GetTodayWord() {
//   const keys = Object.keys(ArabicDict);
//   if (!keys.length) return "";
//   const key = keys[NumberOfDays() % keys.length];
//   const list = ArabicDict[key] || [];
//   if (!list.length) return "";
//   const wordIndex = NumberOfDays() % list.length;
//   return list[wordIndex];
// }

// function SearchDict(word) {
//   if (!word || word.length !== 5) return false;
//   const key = word[0];
//   const arr = ArabicDict[key];
//   if (!arr || !Array.isArray(arr)) return false;
//   return arr.includes(word);
// }

// function createEmptyBoard() {
//   return Array.from({ length: 6 }, () => ({
//     letters: Array(5).fill(""),
//     colors: Array(5).fill(null),
//   }));
// }

// const keyboardRows = [
//   ["ض", "ص", "ث", "ق", "ف", "غ", "ع", "ه", "خ", "ح", "ج", "د"],
//   ["ش", "س", "ي", "ب", "ل", "ا", "ت", "ن", "م", "ك", "ط"],
//   ["أ", "إ", "ئ", "ء", "ؤ", "ر", "ى", "ة", "و", "ز", "ظ"],
// ];

// export default function Game() {
//   const [board, setBoard] = useState(createEmptyBoard);
//   const [currentRow, setCurrentRow] = useState(0);
//   const [currentPos, setCurrentPos] = useState(0);
//   const [gameStatus, setGameStatus] = useState("playing"); // WINNER | LOSER | playing
//   const [wordForToday, setWordForToday] = useState("");
//   const [alertMessage, setAlertMessage] = useState("");
//   const [showPanel, setShowPanel] = useState(false);
//   const [showInfo, setShowInfo] = useState(false);
//   const [timerText, setTimerText] = useState("");
//   const [keyStatuses, setKeyStatuses] = useState({}); // letter -> "green"/"yellow"/"gray"

//   // === helpers inside component ===
//   const showAlert = (msg) => {
//     const text = Number.isInteger(msg) ? messages[msg] : msg;
//     setAlertMessage(text);
//     setTimeout(() => setAlertMessage(""), 3000);
//   };

//   const updateKeyStatus = (letter, status) => {
//     if (!letter) return;
//     setKeyStatuses((prev) => {
//       const current = prev[letter];
//       // أولوية: أخضر > أصفر > رمادي
//       if (current === "green") return prev;

//       if (status === "green") {
//         return { ...prev, [letter]: "green" };
//       }

//       if (status === "yellow") {
//         if (current === "green" || current === "yellow") return prev;
//         return { ...prev, [letter]: "yellow" };
//       }

//       if (status === "gray") {
//         if (current) return prev; // لا ننزّل اللون
//         return { ...prev, [letter]: "gray" };
//       }

//       return prev;
//     });
//   };

//   const restartGame = (todayWord) => {
//     const newBoard = createEmptyBoard();
//     setBoard(newBoard);
//     setCurrentRow(0);
//     setCurrentPos(0);
//     setGameStatus("playing");
//     setShowPanel(false);
//     setKeyStatuses({});
//     setWordForToday(todayWord);

//     const initialEvaluations = newBoard.map((r) => r.colors);

//     localStorage.setItem("wrong_letters", JSON.stringify([]));
//     localStorage.setItem("evaluations", JSON.stringify(initialEvaluations));
//     localStorage.setItem("userwords", JSON.stringify([]));
//     localStorage.setItem("gamestatus", "playing");
//     localStorage.setItem("row", "0");
//     localStorage.setItem("word", todayWord);
//   };

//   // === initial load (simulate نفس منطق vanilla JS) ===
//   useEffect(() => {
//     const todayWord = GetTodayWord();

//     const storedUserWords = localStorage.getItem("userwords");

//     // أول زيارة
//     if (storedUserWords === null || storedUserWords === undefined) {
//       localStorage.setItem("playscount", "0");
//       restartGame(todayWord);
//       return;
//     }

//     const storedWord = localStorage.getItem("word");
//     // لو الكلمة تغيرت = يوم جديد
//     if (!storedWord || storedWord !== todayWord) {
//       restartGame(todayWord);
//       return;
//     }

//     // نفس اليوم – رجوع للعبة
//     const userwords = JSON.parse(storedUserWords || "[]");
//     const evaluations = JSON.parse(
//       localStorage.getItem("evaluations") || "[]"
//     );
//     const rowIndex = Number(localStorage.getItem("row") || "0");
//     const status = localStorage.getItem("gamestatus") || "playing";
//     const wrongLetters = JSON.parse(
//       localStorage.getItem("wrong_letters") || "[]"
//     );

//     const newBoard = createEmptyBoard();

//     userwords.forEach((word, row) => {
//       for (let i = 0; i < 5; i++) {
//         newBoard[row].letters[i] = word[i] || "";
//         newBoard[row].colors[i] = evaluations[row]?.[i] || null;
//       }
//     });

//     // build keyboard status من الألوان المخزنة
//     const keyStatusMap = {};
//     userwords.forEach((word, row) => {
//       for (let i = 0; i < 5; i++) {
//         const letter = word[i];
//         const color = evaluations[row]?.[i];
//         if (!letter || !color) continue;

//         const status =
//           color === correct_position_color
//             ? "green"
//             : color === wrong_position_color
//             ? "yellow"
//             : color === not_exist_color
//             ? "gray"
//             : null;

//         if (!status) continue;

//         const current = keyStatusMap[letter];
//         if (current === "green") continue;
//         if (status === "green") {
//           keyStatusMap[letter] = "green";
//         } else if (status === "yellow") {
//           if (!current || current === "gray") keyStatusMap[letter] = "yellow";
//         } else if (status === "gray") {
//           if (!current) keyStatusMap[letter] = "gray";
//         }
//       }
//     });

//     setBoard(newBoard);
//     setCurrentRow(rowIndex);
//     setCurrentPos(0);
//     setGameStatus(status);
//     setKeyStatuses(keyStatusMap);
//     setWordForToday(storedWord);

//     if (status !== "playing") {
//       setShowPanel(true);
//     }

//     // نحتفظ wrong_letters فقط في localStorage,
//     // نستخدمها عند الحاجة (اختياري لو بتطلعين حروف متبقية)
//     localStorage.setItem("wrong_letters", JSON.stringify(wrongLetters));
//   }, []);

//   // === تايمر العد التنازلي للكلمة الجاية ===
//   useEffect(() => {
//     if (!showPanel) return;

//     const updateTimer = () => {
//       const now = new Date();
//       const end = new Date(
//         now.getFullYear(),
//         now.getMonth(),
//         now.getDate() + 1,
//         0,
//         0,
//         0
//       ); // منتصف الليل القادم
//       const diffMs = end - now;
//       if (diffMs <= 0) {
//         setTimerText("00:00:00");
//         return;
//       }
//       const totalSec = Math.floor(diffMs / 1000);
//       const h = String(Math.floor(totalSec / 3600)).padStart(2, "0");
//       const m = String(Math.floor((totalSec % 3600) / 60)).padStart(2, "0");
//       const s = String(totalSec % 60).padStart(2, "0");
//       setTimerText(`${h}:${m}:${s}`);
//     };

//     updateTimer();
//     const interval = setInterval(updateTimer, 1000);
//     return () => clearInterval(interval);
//   }, [showPanel]);

//   const handleAddLetter = (rawLetter) => {
//     if (gameStatus !== "playing") return;
//     if (currentRow > 5 || currentPos > 4) return;

//     const letter = rawLetter; // نتركه كما هو (مع الحركات مثل أ إ ؤ إلخ)
//     if (!ArabicPattern.test(letter)) return;

//     setBoard((prev) => {
//       const newBoard = prev.map((row) => ({
//         letters: [...row.letters],
//         colors: [...row.colors],
//       }));

//       if (newBoard[currentRow].letters[currentPos] === "") {
//         newBoard[currentRow].letters[currentPos] = letter;
//         setCurrentPos((p) => p + 1);
//         return newBoard;
//       }
//       return prev;
//     });
//   };

//   const handleBackspace = () => {
//     if (gameStatus !== "playing") return;
//     if (currentRow > 5 || currentPos === 0) return;

//     setBoard((prev) => {
//       const newBoard = prev.map((row) => ({
//         letters: [...row.letters],
//         colors: [...row.colors],
//       }));
//       newBoard[currentRow].letters[currentPos - 1] = "";
//       newBoard[currentRow].colors[currentPos - 1] = null;
//       return newBoard;
//     });
//     setCurrentPos((p) => p - 1);
//   };

//   const handleEnter = () => {
//     if (gameStatus !== "playing") return;
//     if (currentRow > 5 || currentPos !== 5) return;

//     const rowLetters = board[currentRow].letters;
//     const RowWordString = rowLetters.join("");

//     if (!SearchDict(RowWordString)) {
//       showAlert("كلمة ليست فى القاموس");
//       return;
//     }

//     let ValidWord = wordForToday.split("");
//     let correctLetters = 0;

//     const newBoard = board.map((row) => ({
//       letters: [...row.letters],
//       colors: [...row.colors],
//     }));

//     // Pass 1: أخضر
//     for (let i = 0; i < 5; i++) {
//       if (rowLetters[i] === ValidWord[i]) {
//         newBoard[currentRow].colors[i] = correct_position_color;
//         ValidWord[i] = "_";
//         correctLetters++;
//         updateKeyStatus(rowLetters[i], "green");
//       }
//     }

//     // Pass 2: أصفر / رمادي
//     const wrongLettersLocal = new Set(
//       JSON.parse(localStorage.getItem("wrong_letters") || "[]")
//     );

//     for (let i = 0; i < 5; i++) {
//       if (newBoard[currentRow].colors[i] === correct_position_color) continue;

//       const letter = rowLetters[i];
//       const indexInValid = ValidWord.indexOf(letter);

//       if (indexInValid !== -1) {
//         newBoard[currentRow].colors[i] = wrong_position_color;
//         ValidWord[indexInValid] = "_";
//         updateKeyStatus(letter, "yellow");
//       } else {
//         newBoard[currentRow].colors[i] = not_exist_color;
//         wrongLettersLocal.add(letter);
//         updateKeyStatus(letter, "gray");
//       }
//     }

//     // حفظ wrong_letters
//     localStorage.setItem(
//       "wrong_letters",
//       JSON.stringify(Array.from(wrongLettersLocal))
//     );

//     // تحديث اللوح
//     setBoard(newBoard);

//     // حفظ userwords + evaluations + row
//     const storedWords = JSON.parse(
//       localStorage.getItem("userwords") || "[]"
//     );
//     storedWords.push(RowWordString);
//     localStorage.setItem("userwords", JSON.stringify(storedWords));

//     const evaluationsToStore = newBoard.map((r) => r.colors);
//     localStorage.setItem("evaluations", JSON.stringify(evaluationsToStore));

//     // زيادة عدد المحاولات (playscount) لما تنتهي اللعبة (فوز او خسارة)
//     if (correctLetters === 5 || currentRow === 5) {
//       const plays =
//         Number(localStorage.getItem("playscount") || "0") + 1;
//       localStorage.setItem("playscount", String(plays));
//     }

//     if (correctLetters === 5) {
//       setGameStatus("WINNER");
//       localStorage.setItem("gamestatus", "WINNER");
//       showAlert(currentRow);
//       setShowPanel(true);
//     } else if (currentRow === 5) {
//       setGameStatus("LOSER");
//       localStorage.setItem("gamestatus", "LOSER");
//       setShowPanel(true);
//     } else {
//       // نطلع على السطر اللي بعده
//       const nextRow = currentRow + 1;
//       setCurrentRow(nextRow);
//       localStorage.setItem("row", String(nextRow));
//       setCurrentPos(0);
//     }
//   };

//   // دعم الكيبورد الحقيقي مثل كودك الأصلي
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (e.key === "Backspace") {
//         e.preventDefault();
//         handleBackspace();
//       } else if (e.key === "Enter") {
//         e.preventDefault();
//         handleEnter();
//       } else if (e.key.length === 1) {
//         handleAddLetter(e.key);
//       }
//     };

//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   });

//   const faded = showPanel || showInfo;

//   return (
//     <div>
//       <header className="main-header">
//         <div className="header-left">
//           <div className="logo-box">
//             <img src="assets/logo1.png" alt="Logo" className="logo-img" />
//           </div>
//         </div>

//         <div className="header-center">
//           <span>الرئيسية</span>
//           <span className="separator">›</span>
//           <span className="current">قدّها لحالك</span>
//         </div>

//         <div className="header-right">
//           <a href="#">طريقة اللعب</a>
//           <a href="#">تواصل معنا</a>
//         </div>
//       </header>

//       <div className={`title ${faded ? "faded" : ""}`}>
//         <h1>
//           تحدي فردي – قدّها لحالك{" "}
//           <i
//             id="info"
//             className="material-icons"
//             onClick={() => {
//               setShowInfo(true);
//               setShowPanel(false);
//             }}
//           >
//             info_outline
//           </i>
//         </h1>
//         <hr />
//       </div>

//       <div className="container">
//         {alertMessage && <div id="alerting">{alertMessage}</div>}

//         {showPanel && (
//           <div className="panel">
//             <i
//               id="close_panel"
//               className="close material-icons"
//               onClick={() => setShowPanel(false)}
//             >
//               &#xe5cd;
//             </i>
//             <p id="status">
//               {gameStatus === "WINNER" ? "أحسنت" : "حاول المرة القادمة"}
//             </p>

//             {gameStatus === "LOSER" && (
//               <p id="answer">
//                 الإجابة : <strong>{wordForToday}</strong>
//               </p>
//             )}
//             <br />
//             <p>الكلمة التالية بعد</p>
//             <div id="timer">{timerText}</div>
//           </div>
//         )}

//         {showInfo && (
//           <div className="info_panel">
//             <i
//               id="close_info"
//               className="close material-icons"
//               onClick={() => setShowInfo(false)}
//             >
//               &#xe5cd;
//             </i>

//             <p className="title_info">Wordle النسخة العربية من اللعبة المشهورة</p>
//             <br />
//             <p>لتبسيط اللعب جرب فقط أسماء وصفات حيث أن الأفعال والضمائر مستبعدة</p>
//             <p>جميع علامات التشكيل مستبعدة</p>
//           </div>
//         )}

//         <div className={`GameBoard ${faded ? "faded" : ""}`}>
//           {board.map((row, rowIndex) => (
//             <div className={`game_row row${rowIndex}`} key={rowIndex}>
//               {row.letters.map((letter, colIndex) => (
//                 <input
//                   key={colIndex}
//                   type="text"
//                   maxLength="1"
//                   autoComplete="off"
//                   disabled
//                   value={letter}
//                   style={{
//                     backgroundColor: row.colors[colIndex] || undefined,
//                   }}
//                 />
//               ))}
//             </div>
//           ))}
//         </div>

//         <div className={`keyboard-container ${faded ? "faded" : ""}`}>
//           {keyboardRows.map((row, idx) => (
//             <div className="keyboard-row" key={idx}>
//               {row.map((letter) => (
//                 <button
//                   key={letter}
//                   className={`key ${keyStatuses[letter] || ""}`}
//                   onClick={() => handleAddLetter(letter)}
//                 >
//                   {letter}
//                 </button>
//               ))}
//             </div>
//           ))}

//           <div className="keyboard-actions">
//             <button className="action-key" onClick={handleBackspace}>
//               مسح
//             </button>
//             <button className="action-key primary" onClick={handleEnter}>
//               إدخال
//             </button>
//           </div>
//         </div>

//         <div className="footer">
//           <p>تم التطوير بواسطة موج</p>
//         </div>
//       </div>
//     </div>
//   );
// }
