import React, { useEffect, useMemo, useRef, useState } from "react";
import ArabicDict from "../Dictionary.js";
import Header from "../components/Header.jsx";
import Board from "../components/Board.jsx";
import Keyboard from "../components/Keyboard.jsx";
import Panels from "../components/Panels.jsx";

const not_exist_color = "#aaaaaeff";
const wrong_position_color = "#e3d284ff";
const correct_position_color = "#aae384ff";

const messages = [
  "هل لديك قدرة خارقة؟",
  "مستحيل انت عبقرى",
  "عظيم",
  "عمل جيد",
  "لست سيئا",
  "أوه، كان هذا وشيكا",
];

const ArabicPattern = /^[\u0600-\u06FF]+$/;

// نفس تاريخك
function numberOfDays() {
  const startedDate = new Date(2025, 1, 4);
  const now = new Date();
  const diff = Math.abs(now - startedDate);
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}
// function numberOfDays() {
//   const startedDate = new Date(2025, 1, 4);
//   const now = new Date();
//   const diff = Math.abs(now - startedDate);
//   const INTERVAL = 5 * 60 * 1000; // 5 دقائق
//   return Math.floor(diff / INTERVAL);
// }
function getTodayWord() {
  const keys = Object.keys(ArabicDict);
  if (!keys.length) return "";
  const key = keys[numberOfDays() % Math.min(30, keys.length)];
  const list = ArabicDict[key] || [];
  if (!list.length) return "";
  const idx = numberOfDays() % list.length;
  return list[idx];
}

function searchDict(word) {
  if (!word?.length) return false;
  const key = word[0];
  const list = ArabicDict[key] || [];
  return list.includes(word);
}

function buildEmptyEvaluations() {
  return Array.from({ length: 6 }, () => Array.from({ length: 5 }, () => null));
}

function buildEmptyUserWords() {
  return [];
}

export default function SingleChallenge() {
  // UI state
  const [alertText, setAlertText] = useState("");
  const alertTimerRef = useRef(null);

  const [showResultPanel, setShowResultPanel] = useState(false);
  const [showInfoPanel, setShowInfoPanel] = useState(false);

  // game state (mirrors localStorage)
  const [wordForToday, setWordForToday] = useState("");
  const [gameStatus, setGameStatus] = useState("playing"); // playing | WINNER | LOSER
  const [row, setRow] = useState(0);
  const [pos, setPos] = useState(0);

  const [userWords, setUserWords] = useState(buildEmptyUserWords()); // ["xxxxx", ...]
  const [evaluations, setEvaluations] = useState(buildEmptyEvaluations()); // [ [color|null]*5 ]*6
  const [wrongLetters, setWrongLetters] = useState([]); // ["ح","ص",...]
  const [rowWord, setRowWord] = useState([]); // current typed letters

  const fadeBackground = showResultPanel || showInfoPanel;

//   const keyboardLetters = useMemo(
//     () => (wrongLetters ? new Set(wrongLetters) : new Set()),
//     [wrongLetters]
//   );

  function alerting(msg) {
    const text = Number.isInteger(msg) ? messages[msg] : msg;
    setAlertText(text);
    if (alertTimerRef.current) clearTimeout(alertTimerRef.current);
    alertTimerRef.current = setTimeout(() => setAlertText(""), 3000);
  }

  function persist(next) {
    localStorage.setItem("word", next.word);
    localStorage.setItem("gamestatus", next.gameStatus);
    localStorage.setItem("row", String(next.row));
    localStorage.setItem("userwords", JSON.stringify(next.userWords));
    localStorage.setItem("evaluations", JSON.stringify(next.evaluations));
    localStorage.setItem("wrong_letters", JSON.stringify(next.wrongLetters));
  }

const restartGame = React.useCallback(() => {
    const w = getTodayWord();
    const next = {
      word: w,
      gameStatus: "playing",
      row: 0,
      userWords: buildEmptyUserWords(),
      evaluations: buildEmptyEvaluations(),
      wrongLetters: [],
    };
    persist(next);

    setWordForToday(w);
    setGameStatus("playing");
    setRow(0);
    setPos(0);
    setRowWord([]);
    setUserWords(next.userWords);
    setEvaluations(next.evaluations);
    setWrongLetters([]);
    setShowResultPanel(false);
    setShowInfoPanel(false);
}, []);


  // initial load (and day change)
  useEffect(() => {
    const today = getTodayWord();
    const storedUserWords = localStorage.getItem("userwords");

    // first visit
    if (storedUserWords === null || storedUserWords === undefined) {
      localStorage.setItem("playscount", "0");
      restartGame();
      return;
    }

    // existing visit
    const storedWord = localStorage.getItem("word") || "";
    if (storedWord !== today) {
      restartGame();
      return;
    }

    // restore game
    const restored = {
      word: storedWord,
      gameStatus: localStorage.getItem("gamestatus") || "playing",
      row: Number(localStorage.getItem("row") || "0"),
      userWords: JSON.parse(localStorage.getItem("userwords") || "[]"),
      evaluations: JSON.parse(localStorage.getItem("evaluations") || JSON.stringify(buildEmptyEvaluations())),
      wrongLetters: JSON.parse(localStorage.getItem("wrong_letters") || "[]"),
    };

    setWordForToday(restored.word);
    setGameStatus(restored.gameStatus);
    setRow(restored.row);
    setUserWords(restored.userWords);
    setEvaluations(restored.evaluations);
    setWrongLetters(restored.wrongLetters);

    // show panel if finished
    if (restored.gameStatus !== "playing") setShowResultPanel(true);
  }, []);

  // global key handling (Arabic typing + backspace + enter)
  useEffect(() => {
    function onKeyDown(e) {
      if (gameStatus !== "playing") return;

      if (e.key === "Backspace") {
        if (pos <= 0) return;
        setPos((p) => p - 1);
        setRowWord((rw) => rw.slice(0, -1));
        return;
      }

      if (e.key === "Enter") {
        if (pos !== 5 || row > 5) return;

        const guess = rowWord.join("");
        if (!searchDict(guess)) {
          alerting("كلمة ليست فى القاموس ");
          return;
        }

        const answer = [...wordForToday];
        const guessArr = [...rowWord];

        const nextEvaluations = evaluations.map((r) => r.slice());
        const wrongSet = new Set(wrongLetters);

        // pass 1: greens
        let correct = 0;
        for (let i = 0; i < 5; i++) {
          if (guessArr[i] === answer[i]) {
            nextEvaluations[row][i] = correct_position_color;
            guessArr[i] = "-";
            answer[i] = "_";
            correct++;
          }
        }

        // pass 2: yellows/grays
        if (correct !== 5) {
          outer: for (let i = 0; i < 5; i++) {
            if (guessArr[i] === "-") continue;
            for (let j = 0; j < 5; j++) {
              if (guessArr[i] === answer[j]) {
                nextEvaluations[row][i] = wrong_position_color;
                answer[j] = "_";
                continue outer;
              }
            }
            // gray
            nextEvaluations[row][i] = not_exist_color;
            wrongSet.add(guessArr[i]);
          }
        }

        const nextUserWords = [...userWords, guess];
        const nextRow = row + 1;

        let nextStatus = "playing";
        if (correct === 5) nextStatus = "WINNER";
        else if (row === 5) nextStatus = "LOSER";

         
        const next = {
          word: wordForToday,
          gameStatus: nextStatus,
          row: nextRow,
          userWords: nextUserWords,
          evaluations: nextEvaluations,
          wrongLetters: Array.from(wrongSet),
        };
        persist(next);
        setGameStatus(nextStatus);  
        setEvaluations(nextEvaluations);
        setUserWords(nextUserWords);
        setWrongLetters(Array.from(wrongSet));
        setRow(nextRow);
        setPos(0);
        setRowWord([]);

        if (nextStatus !== "playing") {
          localStorage.setItem("playscount", String(Number(localStorage.getItem("playscount") || "0") + 1));
          if (nextStatus === "WINNER") alerting(row);
          setTimeout(() => setShowResultPanel(true), 1000);
        }

        return;
      }

      // arabic letter input
      if (pos <= 4 && row <= 5 && ArabicPattern.test(e.key)) {
        setRowWord((rw) => {
          if (rw.length >= 5) return rw;
          return [...rw, e.key];
        });
        setPos((p) => Math.min(5, p + 1));
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [gameStatus, pos, row, rowWord, wordForToday, evaluations, userWords, wrongLetters]);

  // click outside to close panels
  useEffect(() => {
    function onDocClick(e) {
      const target = e.target;
      if (!(target instanceof HTMLElement)) return;
      const insidePanel = target.closest(".panel, .info_panel, #info");
      if (!insidePanel) {
        setShowInfoPanel(false);
        // setShowResultPanel(false);
      }
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [restartGame]);

  // keyboard click handlers
  function handleLetterClick(letter) {
    if (gameStatus !== "playing") return;
    if (pos > 4) return;
    setRowWord((rw) => (rw.length >= 5 ? rw : [...rw, letter]));
    setPos((p) => Math.min(5, p + 1));
  }

  function handleBackspace() {
    if (gameStatus !== "playing") return;
    if (pos <= 0) return;
    setPos((p) => p - 1);
    setRowWord((rw) => rw.slice(0, -1));
  }

  function handleEnter() {
    // simulate Enter key
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
  }

  const currentGridLetters = useMemo(() => {
    // 6x5 letters to render in inputs (right-to-left visually like your HTML)
    const grid = Array.from({ length: 6 }, () => Array.from({ length: 5 }, () => ""));
    for (let r = 0; r < userWords.length; r++) {
      const letters = [...userWords[r]];
      for (let i = 0; i < 5; i++) grid[r][i] = letters[i] || "";
    }
    // current row in-progress
    if (gameStatus === "playing" && row <= 5) {
      for (let i = 0; i < rowWord.length; i++) grid[row][i] = rowWord[i];
    }
    return grid;
  }, [userWords, rowWord, row, gameStatus]);

  // keyboard coloring priority (green > yellow > gray)
  const keyStatus = useMemo(() => {
    const status = new Map(); // letter -> "green" | "yellow" | "gray"
    // derive from evaluations + guesses
    for (let r = 0; r < userWords.length; r++) {
      const g = [...userWords[r]];
      for (let i = 0; i < 5; i++) {
        const l = g[i];
        const c = evaluations[r]?.[i];
        if (!l || !c) continue;

        if (c === correct_position_color) status.set(l, "green");
        else if (c === wrong_position_color && status.get(l) !== "green") status.set(l, "yellow");
        else if (c === not_exist_color && !status.has(l)) status.set(l, "gray");
      }
    }
    // wrong letters from storage force gray only if not already green/yellow
    for (const l of wrongLetters) {
      if (!status.has(l)) status.set(l, "gray");
    }
    return status;
  }, [userWords, evaluations, wrongLetters]);

  return (
  <div dir="rtl" className="game-page">
      <Header
        centerCurrent="قدّها لحالك"
        onHowToPlay={() => setShowInfoPanel(true)}
        onContact={() => alerting("قريبًا: صفحة تواصل معنا")}
      />

      <div className="title" style={{ opacity: fadeBackground ? "60%" : "100%" }}>
        <h1>
          تحدي فردي – قدّها لحالك{" "}
          <i
            id="info"
            className="material-icons"
            onClick={() => {
              setShowInfoPanel(true);
              setShowResultPanel(false);
            }}
          >
            info_outline
          </i>
        </h1>
        <hr />
      </div>

      <div className="container">
        <div id="alerting" style={{ visibility: alertText ? "visible" : "hidden" }}>
          {alertText}
        </div>

        <Panels
          showResultPanel={showResultPanel}
          showInfoPanel={showInfoPanel}
          setShowResultPanel={setShowResultPanel}
          setShowInfoPanel={setShowInfoPanel}
          fadeBackground={fadeBackground}
          gameStatus={gameStatus}
          answerWord={wordForToday}
        />

        <div className="GameBoard" style={{ opacity: fadeBackground ? "60%" : "100%" }}>
          <Board letters={currentGridLetters} colors={evaluations} />
        </div>

        <Keyboard
          onLetter={handleLetterClick}
          onBackspace={handleBackspace}
          onEnter={handleEnter}
          keyStatus={keyStatus}
        />
      </div>
    </div>
  );
}
