import termkit from "terminal-kit";
import { processCommand } from "./commands.js";
import { FULL_NAME } from "../data.js";

const term = termkit.terminal;
const outputHistory = [];
let inputText = "";
let commandHistory = [];
let historyPosition = -1;
let tabs = [];
let selected = 0;

export function initTerminal(availableTabs, initialTab) {
  tabs = availableTabs;
  selected = initialTab;
  term.fullscreen(true);
  term.clear();
  outputHistory.push({
    type: "output",
    text: `Welcome to ${FULL_NAME}'s portfolio terminal! Type 'help' for available commands.`,
  });
  drawTaskbar();
}

export function setSelectedTab(index) {
  selected = index;
}

export function getSelectedTab() {
  return selected;
}

export function drawTaskbar() {
  term.moveTo(1, 1).eraseLine();
  const tabText = tabs
    .map((tab, i) => (i === selected ? `[ ${tab.toUpperCase()} ]` : tab))
    .join("   ");
  const xCenter = Math.floor((term.width - tabText.length) / 2);
  term.moveTo(xCenter, 1);
  term.magenta(tabText);
}

export function drawTerminal() {
  const terminalStartY = term.height - 15;
  const terminalWidth = term.width;
  term.moveTo(1, terminalStartY).eraseLine();
  term.magenta("┌─ Terminal ");
  term.gray("─".repeat(terminalWidth - 13) + "┐");

  for (let i = terminalStartY + 1; i < term.height - 3; i++) {
    term.moveTo(1, i).eraseLine();
    term.gray("│");
    term.column(terminalWidth).gray("│");
  }

  let currentLine = terminalStartY + 1;
  let maxLine = term.height - 4;

  for (let i = 0; i < outputHistory.length; i++) {
    if (currentLine >= maxLine) break;
    const output = outputHistory[i];
    if (output.type === "command") {
      term.moveTo(3, currentLine);
      term.magenta("> " + output.text);
      currentLine++;
    } else {
      const lines = wordWrap(output.text, terminalWidth - 6);
      for (let j = 0; j < lines.length; j++) {
        if (currentLine >= maxLine) break;
        term.moveTo(3, currentLine);
        term.white(lines[j]);
        currentLine++;
      }
      if (i < outputHistory.length - 1) currentLine++;
    }
  }

  term.moveTo(1, term.height - 3).eraseLine();
  term.gray("├");
  term.gray("─".repeat(terminalWidth - 2));
  term.gray("┤");

  term.moveTo(1, term.height - 2).eraseLine();
  term.gray("│ ");
  term.magenta("vishalrmahajan@portfolio:~$ ");
  if (inputText.length === 0) {
    term.dim.gray("type your command here...");
    term.brightMagenta("_");
  } else {
    term.white(inputText);
    term.brightMagenta("_");
  }
  term.column(terminalWidth).gray("│");

  term.moveTo(1, term.height - 1).eraseLine();
  term.moveTo(1, term.height - 1);
  term.gray("└" + "─".repeat(terminalWidth - 2) + "┘");
}

export function handleTerminalInput(key) {
  switch (key) {
    case "ENTER":
      processTerminalCommand();
      drawTerminal();
      break;
    case "BACKSPACE":
    case "DELETE":
      if (inputText.length > 0) {
        inputText = inputText.slice(0, -1);
        drawTerminal();
      }
      break;
    case "UP":
      if (commandHistory.length > 0) {
        historyPosition =
          historyPosition < 0
            ? commandHistory.length - 1
            : Math.max(0, historyPosition - 1);
        inputText = commandHistory[historyPosition];
        drawTerminal();
      }
      break;
    case "DOWN":
      if (commandHistory.length > 0 && historyPosition >= 0) {
        historyPosition++;
        if (historyPosition >= commandHistory.length) {
          historyPosition = -1;
          inputText = "";
        } else {
          inputText = commandHistory[historyPosition];
        }
        drawTerminal();
      }
      break;
    default:
      if (key.length === 1) {
        inputText += key;
        drawTerminal();
      }
  }
}

function processTerminalCommand() {
  if (!inputText.trim()) return;
  outputHistory.length = 0;
  outputHistory.push({
    type: "output",
    text: `Welcome to ${FULL_NAME}'s portfolio terminal! Type 'help' for available commands.`,
  });
  outputHistory.push({ type: "command", text: inputText });
  commandHistory.push(inputText);
  const result = processCommand(inputText);
  if (typeof result === "object" && result.action) {
    switch (result.action) {
      case "clear":
        clearTerminalOutput();
        break;
      case "changeTab":
        const idx = tabs.indexOf(result.tab);
        if (idx >= 0) {
          selected = idx;
          drawTaskbar();
        }
        break;
      case "exit":
        exitApp();
        break;
    }
  } else if (result) {
    outputHistory.push({ type: "output", text: result });
  }
  inputText = "";
  historyPosition = -1;
}

function clearTerminalOutput() {
  outputHistory.length = 0;
  outputHistory.push({
    type: "output",
    text: `Welcome to ${FULL_NAME}'s terminal portfolio! Type 'help' for available commands.`,
  });
}

function exitApp() {
  term.fullscreen(false);
  term.clear();
  term.magenta.bold("\nGoodbye!\n\n");
  process.exit();
}

export function wordWrap(text, maxWidth) {
  if (!text) return [""];
  const lines = text.split("\n").map((line) => wrapLine(line, maxWidth));
  return lines.flat();
}

export function wrapLine(line, maxWidth) {
  const words = line.split(" ");
  const wrapped = [];
  let current = "";
  for (const word of words) {
    if ((current + word).length + 1 > maxWidth) {
      wrapped.push(current.trim());
      current = word + " ";
    } else {
      current += word + " ";
    }
  }
  if (current.trim()) wrapped.push(current.trim());
  return wrapped;
}
