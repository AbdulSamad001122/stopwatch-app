import { useEffect, useState } from "react";
import { Play, Pause, RotateCcw, CheckCircle2 } from "lucide-react";
import Contact from "./pages/Contact";

export default function App() {
  const [activeTab, setActiveTab] = useState("stopwatch");

  const [stopwatchTime, setStopwatchTime] = useState(0);
  const [isStopwatchRunning, setIsStopwatchRunning] = useState(false);

  const [timerInput, setTimerInput] = useState({ minutes: "", seconds: "" });
  const [timerTime, setTimerTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isStopwatchRunning) {
      interval = setInterval(() => {
        setStopwatchTime((p) => p + 10);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [isStopwatchRunning]);

  useEffect(() => {
    let interval;
    if (isTimerRunning && timerTime > 0) {
      interval = setInterval(() => {
        setTimerTime((p) => p - 1);
      }, 1000);
    }
    if (timerTime === 0) setIsTimerRunning(false);
    return () => clearInterval(interval);
  }, [isTimerRunning, timerTime]);

  const formatStopwatch = (t) => {
    const m = Math.floor(t / 60000)
      .toString()
      .padStart(2, "0");
    const s = Math.floor((t % 60000) / 1000)
      .toString()
      .padStart(2, "0");
    const ms = Math.floor((t % 1000) / 10)
      .toString()
      .padStart(2, "0");
    return `${m}:${s}.${ms}`;
  };

  const formatTimer = (t) => {
    const m = Math.floor(t / 60)
      .toString()
      .padStart(2, "0");
    const s = (t % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const baseBtn =
    "flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-semibold transition-all duration-300 active:scale-95 shadow-sm";

  const primary =
    "bg-red-600 text-white hover:bg-red-500 shadow-red-900/50 hover:shadow-red-500/25";
  const soft =
    "bg-red-900/40 text-red-300 hover:bg-red-800/50 border border-red-800/50";
  const danger =
    "bg-neutral-900/60 text-neutral-400 hover:bg-neutral-800/80 border border-neutral-800/80";

  const tabBtn = (active) =>
    `flex-1 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
      active
        ? "bg-red-600 text-white shadow-lg shadow-red-900/50 scale-[1.02]"
        : "text-red-400 hover:text-red-200 hover:bg-red-900/30"
    }`;

  const statusBg = (running) =>
    running
      ? "bg-red-950/40 border-red-800/50 shadow-[inset_0_0_20px_rgba(239,68,68,0.05)]"
      : "bg-neutral-900/40 border-neutral-800/50";

  const statusText = (running) =>
    running ? "text-red-400" : "text-neutral-500";

  return (
    <div className="min-h-screen bg-[#0a0505] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1c0a0a] via-[#0a0505] to-black flex items-center justify-center px-4 py-10 selection:bg-red-500/30">
      <nav>
        {/* other links */}
        <Link to="/contact">Contact</Link>
      </nav>

      <div className="w-full max-w-md bg-[#120a0a]/80 backdrop-blur-xl border border-red-900/30 rounded-[2rem] shadow-2xl shadow-red-950/50 p-8 relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-red-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-red-900/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10">
          <div className="flex gap-2 bg-[#0a0505] p-2 rounded-2xl mb-8 border border-red-950">
            <button
              onClick={() => setActiveTab("stopwatch")}
              className={tabBtn(activeTab === "stopwatch")}
            >
              Stopwatch
            </button>
            <button
              onClick={() => setActiveTab("timer")}
              className={tabBtn(activeTab === "timer")}
            >
              Timer
            </button>
          </div>

          {activeTab === "stopwatch" && (
            <div className="flex flex-col items-center">
              <div
                className={`w-full rounded-3xl border py-12 mb-8 text-center transition-all duration-500 ${statusBg(isStopwatchRunning)}`}
              >
                <h1
                  className={`text-6xl tracking-tight font-light font-mono transition-colors duration-300 ${isStopwatchRunning ? "text-red-400 drop-shadow-[0_0_12px_rgba(239,68,68,0.4)]" : "text-neutral-300"}`}
                >
                  {formatStopwatch(stopwatchTime)}
                </h1>
                <div
                  className={`mt-4 flex items-center justify-center gap-2 text-sm font-medium tracking-wide uppercase transition-colors duration-300 ${statusText(isStopwatchRunning)}`}
                >
                  {isStopwatchRunning ? (
                    <>
                      <Play size={14} className="animate-pulse" /> Running
                    </>
                  ) : (
                    <>
                      <Pause size={14} /> Paused
                    </>
                  )}
                </div>
              </div>

              <div className="flex gap-3 w-full">
                <button
                  onClick={() => setIsStopwatchRunning(true)}
                  className={`${baseBtn} ${primary} flex-1 ${
                    isStopwatchRunning
                      ? "ring-2 ring-red-500/50 ring-offset-2 ring-offset-[#120a0a] opacity-80"
                      : ""
                  }`}
                >
                  <Play size={18} fill="currentColor" /> Start
                </button>
                <button
                  onClick={() => setIsStopwatchRunning(false)}
                  className={`${baseBtn} ${soft} flex-1`}
                >
                  <Pause size={18} fill="currentColor" /> Pause
                </button>
                <button
                  onClick={() => {
                    setIsStopwatchRunning(false);
                    setStopwatchTime(0);
                  }}
                  className={`${baseBtn} ${danger} px-5`}
                  title="Reset"
                >
                  <RotateCcw size={18} />
                </button>
              </div>
            </div>
          )}

          {activeTab === "timer" && (
            <div className="flex flex-col items-center">
              <div className="flex w-full gap-4 mb-6">
                <div className="flex-1 relative group">
                  <input
                    type="number"
                    min="0"
                    max="99"
                    className="w-full bg-[#0a0505] border border-red-900/50 rounded-2xl px-5 py-4 text-red-100 text-xl text-center focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-all placeholder:text-neutral-600"
                    placeholder="00"
                    value={timerInput.minutes}
                    onChange={(e) =>
                      setTimerInput((p) => ({ ...p, minutes: e.target.value }))
                    }
                  />
                  <span className="absolute bottom-[-24px] left-1/2 -translate-x-1/2 text-xs text-neutral-500 font-medium tracking-wider uppercase">
                    Minutes
                  </span>
                </div>
                <div className="flex items-center justify-center text-red-900 text-3xl font-light mb-5">
                  :
                </div>
                <div className="flex-1 relative group">
                  <input
                    type="number"
                    min="0"
                    max="59"
                    className="w-full bg-[#0a0505] border border-red-900/50 rounded-2xl px-5 py-4 text-red-100 text-xl text-center focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-all placeholder:text-neutral-600"
                    placeholder="00"
                    value={timerInput.seconds}
                    onChange={(e) =>
                      setTimerInput((p) => ({ ...p, seconds: e.target.value }))
                    }
                  />
                  <span className="absolute bottom-[-24px] left-1/2 -translate-x-1/2 text-xs text-neutral-500 font-medium tracking-wider uppercase">
                    Seconds
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  const total =
                    parseInt(timerInput.minutes || 0) * 60 +
                    parseInt(timerInput.seconds || 0);
                  if (total > 0) {
                    setTimerTime(total);
                    setIsTimerRunning(false);
                  }
                }}
                className={`flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-semibold transition-all duration-300 active:scale-95 shadow-sm w-full mb-8 bg-red-900/20 text-red-400 hover:bg-red-800/40 border border-red-800/30 hover:border-red-700/50 mt-5`}
              >
                <CheckCircle2 size={18} />
                Set Timer
              </button>

              <div
                className={`w-full rounded-3xl border py-12 mb-8 text-center transition-all duration-500 ${statusBg(isTimerRunning)}`}
              >
                <h1
                  className={`text-6xl tracking-tight font-light font-mono transition-colors duration-300 ${isTimerRunning ? "text-red-400 drop-shadow-[0_0_12px_rgba(239,68,68,0.4)]" : "text-neutral-300"}`}
                >
                  {formatTimer(timerTime)}
                </h1>
                <div
                  className={`mt-4 flex items-center justify-center gap-2 text-sm font-medium tracking-wide uppercase transition-colors duration-300 ${statusText(isTimerRunning)}`}
                >
                  {isTimerRunning ? (
                    <>
                      <Play size={14} className="animate-pulse" /> Running
                    </>
                  ) : (
                    <>
                      <Pause size={14} /> Paused
                    </>
                  )}
                </div>
              </div>

              <div className="flex gap-3 w-full">
                <button
                  onClick={() => timerTime > 0 && setIsTimerRunning(true)}
                  className={`${baseBtn} ${primary} flex-1 ${
                    isTimerRunning
                      ? "ring-2 ring-red-500/50 ring-offset-2 ring-offset-[#120a0a] opacity-80"
                      : ""
                  }`}
                >
                  <Play size={18} fill="currentColor" /> Start
                </button>
                <button
                  onClick={() => setIsTimerRunning(false)}
                  className={`${baseBtn} ${soft} flex-1`}
                >
                  <Pause size={18} fill="currentColor" /> Pause
                </button>
                <button
                  onClick={() => {
                    setIsTimerRunning(false);
                    setTimerTime(0);
                    setTimerInput({ minutes: "", seconds: "" });
                  }}
                  className={`${baseBtn} ${danger} px-5`}
                  title="Reset"
                >
                  <RotateCcw size={18} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
