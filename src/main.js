let STOP = false;

const codeElem = document.getElementsByName("code")[0];
const inputElem = document.getElementsByName("input")[0];
const outputElem = document.getElementsByName("output")[0];
const dumpsElem = document.getElementsByName("dumps")[0];

const runElem = document.getElementsByName("run")[0];
const stopElem = document.getElementsByName("stop")[0];
// const stepElem  = document.getElementsByName('step')[0];
const clearElem = document.getElementsByName("clear")[0];
const resetElem = document.getElementsByName("reset")[0];

const speedElem = document.getElementsByName("speed")[0];
const splabelElem = document.getElementsByName("splabel")[0];

splabelElem.innerText = "실행 속도 : " + speedElem.value + "ms당 1스텝";

runElem.onclick = () => run(codeElem.value, inputElem.value);
stopElem.onclick = () => (STOP = true);
clearElem.onclick = () => {
  outputElem.value = "";
  dumpsElem.value = "";
};

resetElem.onclick = () => (codeElem.value = "");
speedElem.oninput = () =>
  (splabelElem.innerText = "실행 속도 : " + speedElem.value + "ms당 1스텝");

function run(code, input) {
  STOP = false;
  outputElem.value = "";
  runElem.disabled = true;
  speedElem.disabled = true;
  outputElem.style.borderColor = "";

  const statements = code
    .trim()
    .split(code.includes("~") ? "~" : "\n")
    .map((line) => line.trim());
  const inputs = input
    .replace(/\n{1,}/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim()
    .split(" ")
    .map((n) => Number(n));
  if (
    statements[0] !== "선린인터넷고등학교 모바일 컨텐츠 개발 동아리" ||
    !statements.slice(-1)[0].startsWith("EDCAN")
  ) {
    runElem.disabled = false;
    speedElem.disabled = false;
    outputElem.style.borderColor = "red";
    return (outputElem.value =
      "코드의 시작과 끝은 '선린인터넷고등학교 모바일 컨텐츠 개발 동아리'와 'EDCAN'이어야만 합니다.");
  }

  const variables = [];
  let pointer = 0;
  let inputpointer = 0;

  function execute(statement) {
    if (statement.includes("캔") && statement.includes("?")) {
      // IF GOTO
      const condition = evaluate(
        statement.substring(2, statement.lastIndexOf("?"))
      );
      if (condition === 0)
        return execute(statement.substr(statement.lastIndexOf("?") + 1));
      return;
    }

    if (statement.includes("에")) {
      const variablePointer = statement.split("에")[0].split("아").length;
      const setteeValue = evaluate(statement.split("에")[1]);
      variables[variablePointer] = setteeValue;
    }

    if (statement.includes("드") && statement[statement.length - 1] === "!") {
      printOut(String(evaluate(statement.slice(1, -1))));
    }

    if (statement.includes("드") && statement[statement.length - 1] === "ㅋ") {
      if (statement === "드ㅋ") printOut("\n");
      printOut(stringify(evaluate(statement.slice(1, -1))));
    }

    if (statement.includes("픽")) {
      pointer = evaluate(statement.split("픽")[1]) - 1;
    }

    if (statement.indexOf("셀!") === 0) {
      return evaluate(statement.split("셀!")[1]);
    }
  }

  function parse() {
    if (statements[pointer].startsWith("EDCAN")) stop();
    if (STOP) {
      STOP = false;
      stop();
    }

    const statement = statements[pointer++];
    const evaluated = execute(statement);
    dumpsElem.value =
      "Variables:\n" +
      variables.reduce((prev, curr, i) => prev + (i + ". " + curr) + "\n", "") +
      "\n\nStatement: (" +
      pointer +
      "/" +
      statements.length +
      ")\n" +
      (statements[pointer] || "") +
      (typeof evaluated !== "undefined" ? "\n\nReturned: " + evaluated : "");
    if (typeof evaluated !== "undefined") stop();
  }

  const interval = setInterval(parse, speedElem.value);

  // --- utilities

  function printOut(str) {
    outputElem.value += str;
    outputElem.scrollTo(0, 9999);
  }

  function stop() {
    runElem.disabled = false;
    speedElem.disabled = false;
    clearInterval(interval);
  }

  function evaluate(x) {
    let n = 0;
    if (x.includes("어"))
      return x
        .split("어")
        .map(evaluate)
        .reduce((a, b) => Math.imul(a, b));
    while (x.includes("드?")) {
      const answer = inputs[inputpointer++];
      x = x.replace("드?", "");
      n += answer;
    }
    if (x.includes("아")) n += variables[x.split("아").length - 1] | 0;
    if (x.includes("틀")) n += x.split("틀").length - 1;
    if (x.includes("리")) n -= x.split("리").length - 1;
    return ((n + 2158221066240) % 4294967296) - 2147483648;
  }
}

function stringify(unicode) {
  const char = String.fromCharCode(unicode);
  return char.match(/[\x00-\x1F]/) ? "" : char;
}
