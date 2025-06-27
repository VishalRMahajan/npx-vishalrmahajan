#!/usr/bin/env node
import termkit from "terminal-kit";
import {
  initTerminal,
  drawTerminal,
  drawTaskbar,
  handleTerminalInput,
  setSelectedTab,
  getSelectedTab,
} from "./terminal/terminal.js";
import showHome from "./sections/home.js";
import showSkills from "./sections/skills.js";
import showExperience from "./sections/experience.js";
import showProjects from "./sections/projects.js";
import { FULL_NAME, COLORS } from "./data.js";
import { startupProgress, exitProgress } from "./loader.js";

const term = termkit.terminal;
const tabs = ["Home", "Skills", "Experience", "Projects"];
let selected = 0;

function drawInstructions() {
  const instruction = "Tab: Navigate    Ctrl+Click: Open Link    ESC: Exit";
  term.moveTo(1, term.height);
  term.eraseLine();
  term.colorRgbHex(term.gray(), instruction);
}

term.clear();
await startupProgress();

initTerminal(tabs, selected);
showSection(tabs[selected]);
drawInstructions();
term.grabInput(true);

term.on("key", (name, matches, data) => {
  switch (name) {
    case "TAB":
      selected = (selected + 1) % tabs.length;
      setSelectedTab(selected);
      drawTaskbar();
      showSection(tabs[selected]);
      break;
    case "SHIFT_TAB":
      selected = (selected - 1 + tabs.length) % tabs.length;
      setSelectedTab(selected);
      drawTaskbar();
      showSection(tabs[selected]);
      break;
    case "ESCAPE":
    case "CTRL_C":
      exitProgress();
      break;
    default:
      handleTerminalInput(name);
      break;
  }
});

term.on("resize", () => {
  term.clear();
  drawTaskbar();
  showSection(tabs[getSelectedTab()]);
  drawInstructions();
});

function showSection(name) {
  term.moveTo(1, 3).eraseDisplayBelow();
  const firstname = FULL_NAME.split(" ")[0];
  term.windowTitle(`${name} | ${firstname}'s Portfolio`);
  let content;
  switch (name) {
    case "Home":
      content = showHome();
      break;
    case "Skills":
      content = showSkills();
      break;
    case "Experience":
      content = showExperience();
      break;
    case "Projects":
      content = showProjects();
      break;
    default:
      term.red("Unknown section");
      return;
  }
  const lines = content.toString().split("\n");
  const maxContentHeight = term.height - 16;
  const displayLines = lines.slice(0, maxContentHeight);
  displayLines.forEach((line, i) => {
    term.moveTo(2, 3 + i);
    term(line);
  });

  drawTerminal();
}

global.showSection = showSection;
