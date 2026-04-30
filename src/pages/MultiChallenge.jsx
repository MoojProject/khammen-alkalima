import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import MultiLobby      from "./MultiLobby.jsx";
import MultiWaiting    from "./MultiWaiting.jsx";
import MultiSecretWord from "./MultiSecretWord.jsx";
import MultiGame       from "./MultiGame.jsx";
import MultiResult     from "./MultiResult.jsx";

const SERVER_URL = "http://localhost:3001";

export default function MultiChallenge() {
  const socketRef = useRef(null);

  const [status, setStatus]               = useState("idle");
  // idle | waiting | joined | playing | result | error
  const [roomCode, setRoomCode]           = useState("");
  const [error, setError]                 = useState("");
  const [secretWord, setSecretWord]       = useState("");
  const [roundResult, setRoundResult]     = useState(null);
  const [waitingRematch, setWaitingRematch] = useState(false);

  useEffect(() => {
    socketRef.current = io(SERVER_URL, { transports: ["websocket"] });
    const socket = socketRef.current;

    socket.on("room:created",      ({ code }) => { setRoomCode(code); setStatus("waiting"); });
    socket.on("room:playerJoined", () => setStatus("joined"));
    socket.on("room:joined",       () => setStatus("joined"));

    socket.on("game:start", ({ secretWord: word }) => {
      setSecretWord(word);
      setStatus("playing");
    });

    // نتيجة الجولة من السيرفر
    socket.on("round:result", (result) => {
      setRoundResult(result);
      setWaitingRematch(false);
      setStatus("result");
    });

    // صاحبك طلب جولة جديدة
    socket.on("game:rematchRequested", () => {
      // نعلم اللاعب إن صاحبه جاهز
      setWaitingRematch(false); // الثاني طلب → نحن كنا ننتظره
    });

    // الاثنين وافقوا — ابدأ جولة جديدة
    socket.on("game:rematchReady", () => {
      setRoundResult(null);
      setWaitingRematch(false);
      setStatus("joined"); // يرجع لشاشة الكلمة السرية
    });

    socket.on("room:error", ({ message }) => {
      setError(message);
      setStatus("error");
    });

    return () => socket.disconnect();
  }, []);

  const createRoom  = ()     => { setError(""); socketRef.current.emit("room:create"); };
  const joinRoom    = (code) => { setError(""); socketRef.current.emit("room:join", { code: code.toUpperCase().trim() }); };
  const submitWord  = (word) => { socketRef.current.emit("game:setWord", { word }); };
  const requestRematch = ()  => {
    setWaitingRematch(true);
    socketRef.current.emit("game:rematch");
  };

  if (status === "idle"    || status === "error") return <MultiLobby onCreateRoom={createRoom} onJoinRoom={joinRoom} error={error} />;
  if (status === "waiting")                        return <MultiWaiting roomCode={roomCode} />;
  if (status === "joined")                         return <MultiSecretWord onWordSubmit={submitWord} />;
  if (status === "playing")                        return <MultiGame secretWord={secretWord} socket={socketRef.current} />;
  if (status === "result")                         return <MultiResult result={roundResult} onRematch={requestRematch} waitingRematch={waitingRematch} />;
}