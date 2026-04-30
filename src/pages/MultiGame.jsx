import React, { useEffect, useMemo, useRef, useState } from "react";
import ArabicDict from "../Dictionary.js";
import Header from "../components/Header.jsx";
import Board from "../components/Board.jsx";
import Keyboard from "../components/Keyboard.jsx";
import Panels from "../components/Panels.jsx";

const not_exist_color      = "#aaaaaeff";
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

function searchDict(word) {
  if (!word?.length) return false;
  return (ArabicDict[word[0]] || []).includes(word);
}

function buildEmptyEvaluations() {
  return Array.from({ length: 6 }, () => Array.from({ length: 5 }, () => null));
}

export default function MultiGame({ secretWord, socket, isMultiplayer = false, opponentFinished = false }) {
  const [alertText, setAlertText]             = useState("");
  const alertTimerRef                          = useRef(null);
  const [showResultPanel, setShowResultPanel]  = useState(false);
  const [showInfoPanel, setShowInfoPanel]      = useState(false);
  const [gameStatus, setGameStatus]            = useState("playing");
  const [row, setRow]                          = useState(0);
  const [pos, setPos]                          = useState(0);
  const [userWords, setUserWords]              = useState([]);
  const [evaluations, setEvaluations]          = useState(buildEmptyEvaluations());
  const [wrongLetters, setWrongLetters]        = useState([]);
  const [rowWord, setRowWord]                  = useState([]);
  const finishedRef                            = useRef(false); // نرسل مرة واحدة بس

  const fadeBackground = showResultPanel || showInfoPanel;

  function alerting(msg) {
    const text = Number.isInteger(msg) ? messages[msg] : msg;
    setAlertText(text);
    if (alertTimerRef.current) clearTimeout(alertTimerRef.current);
    alertTimerRef.current = setTimeout(() => setAlertText(""), 3000);
  }

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

        if (!isMultiplayer && !searchDict(guess)) { alerting("كلمة ليست فى القاموس"); return; }

        const answer   = [...secretWord];
        const guessArr = [...rowWord];
        const nextEval = evaluations.map((r) => r.slice());
        const wrongSet = new Set(wrongLetters);
        let correct    = 0;

        for (let i = 0; i < 5; i++) {
          if (guessArr[i] === answer[i]) {
            nextEval[row][i] = correct_position_color;
            guessArr[i] = "-"; answer[i] = "_"; correct++;
          }
        }
        if (correct !== 5) {
          outer: for (let i = 0; i < 5; i++) {
            if (guessArr[i] === "-") continue;
            for (let j = 0; j < 5; j++) {
              if (guessArr[i] === answer[j]) {
                nextEval[row][i] = wrong_position_color;
                answer[j] = "_"; continue outer;
              }
            }
            nextEval[row][i] = not_exist_color;
            wrongSet.add(guessArr[i]);
          }
        }

        const nextUserWords = [...userWords, guess];
        const nextRow       = row + 1;
        let nextStatus      = "playing";
        if (correct === 5)  nextStatus = "WINNER";
        else if (row === 5) nextStatus = "LOSER";

        setEvaluations(nextEval);
        setUserWords(nextUserWords);
        setWrongLetters(Array.from(wrongSet));
        setRow(nextRow);
        setPos(0);
        setRowWord([]);
        setGameStatus(nextStatus);

        if (nextStatus !== "playing") {
          if (nextStatus === "WINNER") alerting(row);
          // أرسل النتيجة للسيرفر مرة واحدة
          if (!finishedRef.current) {
            finishedRef.current = true;
            socket.emit("game:finished", {
              attempts: nextStatus === "WINNER" ? nextRow : 0,
            });
          }
          setTimeout(() => setShowResultPanel(true), 1200);
        }
        return;
      }

      if (pos <= 4 && row <= 5 && ArabicPattern.test(e.key)) {
        setRowWord((rw) => (rw.length >= 5 ? rw : [...rw, e.key]));
        setPos((p) => Math.min(5, p + 1));
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [gameStatus, pos, row, rowWord, secretWord, evaluations, userWords, wrongLetters, socket]);

  useEffect(() => {
    function onDocClick(e) {
      if (!(e.target instanceof HTMLElement)) return;
      if (!e.target.closest(".panel, .info_panel, #info")) setShowInfoPanel(false);
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  function handleLetterClick(letter) {
    if (gameStatus !== "playing" || pos > 4) return;
    setRowWord((rw) => (rw.length >= 5 ? rw : [...rw, letter]));
    setPos((p) => Math.min(5, p + 1));
  }
  function handleBackspace() {
    if (gameStatus !== "playing" || pos <= 0) return;
    setPos((p) => p - 1);
    setRowWord((rw) => rw.slice(0, -1));
  }
  function handleEnter() {
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
  }

  const currentGridLetters = useMemo(() => {
    const grid = Array.from({ length: 6 }, () => Array.from({ length: 5 }, () => ""));
    for (let r = 0; r < userWords.length; r++) {
      const letters = [...userWords[r]];
      for (let i = 0; i < 5; i++) grid[r][i] = letters[i] || "";
    }
    if (gameStatus === "playing" && row <= 5) {
      for (let i = 0; i < rowWord.length; i++) grid[row][i] = rowWord[i];
    }
    return grid;
  }, [userWords, rowWord, row, gameStatus]);

  const keyStatus = useMemo(() => {
    const status = new Map();
    for (let r = 0; r < userWords.length; r++) {
      const g = [...userWords[r]];
      for (let i = 0; i < 5; i++) {
        const l = g[i], c = evaluations[r]?.[i];
        if (!l || !c) continue;
        if (c === correct_position_color) status.set(l, "green");
        else if (c === wrong_position_color && status.get(l) !== "green") status.set(l, "yellow");
        else if (c === not_exist_color && !status.has(l)) status.set(l, "gray");
      }
    }
    for (const l of wrongLetters) { if (!status.has(l)) status.set(l, "gray"); }
    return status;
  }, [userWords, evaluations, wrongLetters]);

  return (
    <div dir="rtl" className="game-page">
      <Header
        centerCurrent="تحدي مع صاحبك"
        onHowToPlay={() => setShowInfoPanel(true)}
        onContact={() => {}}
      />

      <div className="title" style={{ opacity: fadeBackground ? '60%' : '100%' }}>
        <h1>
          خمّن كلمة صاحبك{' '}
          <i id="info" className="material-icons"
            onClick={() => { setShowInfoPanel(true); setShowResultPanel(false); }}>
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
          isMultiplayer
          opponentFinished={opponentFinished}
          showResultPanel={showResultPanel}
          showInfoPanel={showInfoPanel}
          setShowResultPanel={setShowResultPanel}
          setShowInfoPanel={setShowInfoPanel}
          fadeBackground={fadeBackground}
          gameStatus={gameStatus}
          answerWord={secretWord}
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