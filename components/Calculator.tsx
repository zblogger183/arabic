"use client";

import { create, all } from "mathjs";
import { useState, useCallback, useEffect } from "react";

type CalcMode = "basic" | "scientific";
type AngleMode = "deg" | "rad";

const math = create(all, {});

function evaluateExpression(expression: string, angleMode: AngleMode): string {
  try {
    const normalized = expression
      .replace(/×/g, "*")
      .replace(/÷/g, "/")
      .replace(/−/g, "-")
      .replace(/π/g, "pi")
      .replace(/√/g, "sqrt");

    const toAngle = (value: number) =>
      angleMode === "deg" ? math.unit(value, "deg") : value;

    const scope = {
      sin: (value: number) => math.sin(toAngle(value)),
      cos: (value: number) => math.cos(toAngle(value)),
      tan: (value: number) => math.tan(toAngle(value)),
      log: (value: number) => math.log10(value),
      ln: (value: number) => math.log(value),
    };

    const result = math.evaluate(normalized, scope);
    const numeric = typeof result === "number" ? result : Number(result);

    if (!isFinite(numeric) || Number.isNaN(numeric)) return "خطأ";

    if (Math.abs(numeric) >= 1e15 || (Math.abs(numeric) < 1e-10 && numeric !== 0)) {
      return numeric.toExponential(6);
    }
    return parseFloat(numeric.toFixed(10)).toString();
  } catch {
    return "خطأ";
  }
}

// Convert digits to Arabic-Indic numerals
function toArabicNumerals(str: string): string {
  return str.replace(/[0-9]/g, (d) =>
    ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"][parseInt(d)]
  );
}

const basicButtons = [
  ["AC", "±", "%", "÷"],
  ["7", "8", "9", "×"],
  ["4", "5", "6", "−"],
  ["1", "2", "3", "+"],
  ["0", ".", "="],
];

const sciTopButtons = [
  ["sin", "cos", "tan", "log", "ln"],
  ["x²", "√x", "xʸ", "π", "e"],
  ["(", ")", "1/x", "EXP", "DEL"],
];

export default function Calculator() {
  const [mode, setMode] = useState<CalcMode>("basic");
  const [display, setDisplay] = useState("0");
  const [expression, setExpression] = useState("");
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [operator, setOperator] = useState<string | null>(null);
  const [prevValue, setPrevValue] = useState<string | null>(null);
  const [angleMode, setAngleMode] = useState<AngleMode>("deg");
  const [arabicNumerals, setArabicNumerals] = useState(false);
  const [history, setHistory] = useState<{ expr: string; result: string }[]>([]);
  const [hasError, setHasError] = useState(false);

  const formatDisplay = (val: string) =>
    arabicNumerals ? toArabicNumerals(val) : val;

  const addToHistory = useCallback((expr: string, result: string) => {
    setHistory((prev) => [{ expr, result }, ...prev].slice(0, 5));
  }, []);

  const handleClear = useCallback(() => {
    setDisplay("0");
    setExpression("");
    setWaitingForOperand(false);
    setOperator(null);
    setPrevValue(null);
    setHasError(false);
  }, []);

  const handleDigit = useCallback(
    (digit: string) => {
      if (hasError) {
        handleClear();
        return;
      }
      if (waitingForOperand) {
        setDisplay(digit);
        setWaitingForOperand(false);
      } else {
        setDisplay((prev) =>
          prev === "0" && digit !== "." ? digit : prev.length < 12 ? prev + digit : prev
        );
      }
    },
    [hasError, waitingForOperand, handleClear]
  );

  const handleOperator = useCallback(
    (op: string) => {
      if (hasError) return;
      const current = display;
      if (operator && !waitingForOperand && prevValue) {
        const result = evaluateExpression(
          `${prevValue}${operator}${current}`,
          angleMode
        );
        setDisplay(result);
        if (result === "خطأ") {
          setHasError(true);
          return;
        }
        setPrevValue(result);
        setExpression(`${result} ${op}`);
      } else {
        setPrevValue(current);
        setExpression(`${current} ${op}`);
      }
      setOperator(op);
      setWaitingForOperand(true);
    },
    [display, hasError, operator, waitingForOperand, prevValue, angleMode]
  );

  const handleEquals = useCallback(() => {
    if (!operator || !prevValue || hasError) return;
    const current = display;
    const expr = `${prevValue}${operator}${current}`;
    const result = evaluateExpression(expr, angleMode);
    addToHistory(`${prevValue} ${operator} ${current}`, result);
    setDisplay(result);
    setExpression(`${prevValue} ${operator} ${current} =`);
    setOperator(null);
    setPrevValue(null);
    setWaitingForOperand(true);
    if (result === "خطأ") setHasError(true);
  }, [display, hasError, operator, prevValue, angleMode, addToHistory]);

  const handlePercent = useCallback(() => {
    const val = parseFloat(display);
    if (prevValue && operator) {
      const pct = (parseFloat(prevValue) * val) / 100;
      setDisplay(String(pct));
    } else {
      setDisplay(String(val / 100));
    }
  }, [display, prevValue, operator]);

  const handleToggleSign = useCallback(() => {
    setDisplay((prev) =>
      prev.startsWith("-") ? prev.slice(1) : prev === "0" ? prev : "-" + prev
    );
  }, []);

  const handleDecimal = useCallback(() => {
    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
      return;
    }
    if (!display.includes(".")) {
      setDisplay((prev) => prev + ".");
    }
  }, [display, waitingForOperand]);

  const handleSciFunction = useCallback(
    (fn: string) => {
      if (hasError) return;
      const valueExpr = `(${display})`;

      const applyUnary = (expr: string, label: string) => {
        const result = evaluateExpression(expr, angleMode);
        addToHistory(`${label}(${display})`, result);
        setExpression(`${label}(${display}) =`);
        setDisplay(result);
        setWaitingForOperand(true);
        if (result === "خطأ") setHasError(true);
      };

      switch (fn) {
        case "sin":
        case "cos":
        case "tan":
        case "log":
        case "ln":
          applyUnary(`${fn}${valueExpr}`, fn);
          return;
        case "x²":
          applyUnary(`${valueExpr}^2`, "x²");
          return;
        case "√x":
          applyUnary(`sqrt${valueExpr}`, "√x");
          return;
        case "1/x":
          applyUnary(`1/${valueExpr}`, "1/x");
          return;
        case "π":
          setDisplay(String(math.pi));
          setExpression("π");
          setWaitingForOperand(true);
          return;
        case "e":
          setDisplay(String(math.e));
          setExpression("e");
          setWaitingForOperand(true);
          return;
        case "xʸ":
          setOperator("^");
          setPrevValue(display);
          setExpression(`${display} ^`);
          setWaitingForOperand(true);
          return;
        case "(":
          setExpression((prev) => prev + "(");
          return;
        case ")":
          setExpression((prev) => prev + ")");
          return;
        case "EXP":
          setDisplay((prev) => prev + "e");
          return;
        case "DEL":
          setDisplay((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
          return;
        default:
          return;
      }
    },
    [display, angleMode, hasError, addToHistory]
  );

  // Keyboard support
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key >= "0" && e.key <= "9") handleDigit(e.key);
      else if (e.key === ".") handleDecimal();
      else if (e.key === "Enter" || e.key === "=") handleEquals();
      else if (e.key === "Escape") handleClear();
      else if (e.key === "+") handleOperator("+");
      else if (e.key === "-") handleOperator("−");
      else if (e.key === "*") handleOperator("×");
      else if (e.key === "/") { e.preventDefault(); handleOperator("÷"); }
      else if (e.key === "Backspace") {
        setDisplay((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleDigit, handleDecimal, handleEquals, handleClear, handleOperator]);

  const handleButton = (btn: string) => {
    switch (btn) {
      case "AC": handleClear(); break;
      case "±": handleToggleSign(); break;
      case "%": handlePercent(); break;
      case "÷": case "×": case "−": case "+": case "^":
        handleOperator(btn); break;
      case "=": handleEquals(); break;
      case ".": handleDecimal(); break;
      default:
        if (/^\d$/.test(btn)) handleDigit(btn);
        else handleSciFunction(btn);
    }
  };

  const getButtonStyle = (btn: string): string => {
    const base =
      "calc-btn flex items-center justify-center rounded-xl font-semibold transition-all duration-150 active:scale-95 select-none text-sm md:text-base";
    if (btn === "=")
      return `${base} bg-orange-500 hover:bg-orange-400 text-white shadow-md shadow-orange-200`;
    if (["÷", "×", "−", "+"].includes(btn))
      return `${base} bg-primary hover:bg-blue-500 text-white shadow-sm`;
    if (["AC", "±", "%"].includes(btn))
      return `${base} bg-slate-200 hover:bg-slate-300 text-slate-700`;
    if (btn === "DEL")
      return `${base} bg-red-100 hover:bg-red-200 text-red-600`;
    // Sci function buttons
    if (["sin", "cos", "tan", "log", "ln", "x²", "√x", "xʸ", "1/x", "EXP", "(", ")"].includes(btn))
      return `${base} bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs md:text-sm`;
    if (["π", "e"].includes(btn))
      return `${base} bg-purple-50 hover:bg-purple-100 text-purple-700`;
    return `${base} bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 shadow-sm`;
  };

  const displayValue =
    display.length > 12 ? display.slice(0, 12) + "…" : display;

  return (
    <div className="w-full max-w-[360px] mx-auto">
      {/* Mode tabs */}
      <div className="flex rounded-xl bg-slate-100 p-1 mb-4">
        {[
          { key: "basic", label: "عادية" },
          { key: "scientific", label: "علمية" },
        ].map(({ key, label }) => (
          <button
            key={key}
            id={`calc-tab-${key}`}
            onClick={() => setMode(key as CalcMode)}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
              mode === key
                ? "bg-white text-primary shadow-sm border-b-2 border-primary"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Calculator card */}
      <div className="bg-white rounded-2xl shadow-lg p-4 border border-slate-100">
        {/* Display */}
        <div className="bg-slate-900 rounded-xl p-4 mb-4 min-h-[5rem] flex flex-col justify-between relative">
          {/* Number format toggle */}
          <button
            onClick={() => setArabicNumerals(!arabicNumerals)}
            className="absolute top-3 end-3 text-xs px-2 py-0.5 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-md transition-colors"
            title="تبديل الأرقام"
          >
            {arabicNumerals ? "012" : "٠١٢"}
          </button>
          <span
            className="text-slate-500 text-xs truncate max-w-[70%] text-end pe-10"
            dir="ltr"
          >
            {expression || " "}
          </span>
          <div
            className={`calc-display font-bold text-end mt-1 transition-all ${
              hasError
                ? "text-red-400 text-xl"
                : displayValue.length > 9
                ? "text-2xl text-white"
                : "text-4xl text-white"
            }`}
            dir="ltr"
          >
            {hasError ? "خطأ" : formatDisplay(displayValue)}
          </div>
        </div>

        {/* Scientific mode — angle toggle */}
        {mode === "scientific" && (
          <div className="flex items-center gap-2 mb-3">
            <button
              id="angle-mode-toggle"
              onClick={() => setAngleMode(angleMode === "deg" ? "rad" : "deg")}
              className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-all ${
                angleMode === "deg"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-200 text-slate-600"
              }`}
            >
              {angleMode === "deg" ? "درجة" : "راديان"}
            </button>
            <span className="text-xs text-slate-400">وضع الزاوية</span>
          </div>
        )}

        {/* Scientific top rows */}
        {mode === "scientific" && (
          <div className="space-y-1.5 mb-2">
            {sciTopButtons.map((row, ri) => (
              <div key={ri} className="grid grid-cols-5 gap-1.5">
                {row.map((btn) => (
                  <button
                    key={btn}
                    onClick={() => handleButton(btn)}
                    className={`${getButtonStyle(btn)} h-9`}
                  >
                    {btn}
                  </button>
                ))}
              </div>
            ))}
            <div className="h-px bg-slate-100 mt-2 mb-1" />
          </div>
        )}

        {/* Basic button grid */}
        <div className="space-y-1.5">
          {basicButtons.map((row, ri) => (
            <div
              key={ri}
              className={`grid gap-1.5 ${
                ri === 4 ? "grid-cols-4" : "grid-cols-4"
              }`}
            >
              {row.map((btn) => (
                <button
                  key={btn}
                  onClick={() => handleButton(btn)}
                  className={`${getButtonStyle(btn)} h-14 ${
                    ri === 4 && btn === "0" ? "col-span-2" : ""
                  }`}
                >
                  {btn}
                </button>
              ))}
            </div>
          ))}
        </div>

        {/* History panel — scientific mode only */}
        {mode === "scientific" && history.length > 0 && (
          <div className="mt-4 pt-3 border-t border-slate-100">
            <p className="text-xs text-slate-400 font-medium mb-2">
              آخر العمليات
            </p>
            <div className="space-y-1.5 max-h-32 overflow-y-auto">
              {history.map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center text-xs py-1 px-2 rounded-lg bg-slate-50 hover:bg-slate-100 cursor-pointer transition-colors"
                  onClick={() => {
                    setDisplay(item.result);
                    setWaitingForOperand(true);
                  }}
                >
                  <span className="text-slate-500 truncate" dir="ltr">
                    {item.expr}
                  </span>
                  <span className="text-slate-800 font-semibold ms-2 flex-shrink-0" dir="ltr">
                    = {item.result}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
