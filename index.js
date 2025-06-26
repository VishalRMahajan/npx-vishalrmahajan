#!/usr/bin/env node
import termkit from "terminal-kit";
import showHome from "./sections/home.js";
import showSkills from "./sections/skills.js";
import showExperience from "./sections/experience.js";
import showProjects from "./sections/projects.js";
import { COLORS } from "./data.js";
import { FULL_NAME } from "./data.js";

const term = termkit.terminal;

term.fullscreen("alternate");
term.clear();

const tabs = ["Home", "Skills", "Experience", "Projects"];
let selected = 0;

function hexToRgb(hex) {
  const parsed = hex.replace(/^#/, "");
  return [
    parseInt(parsed.slice(0, 2), 16),
    parseInt(parsed.slice(2, 4), 16),
    parseInt(parsed.slice(4, 6), 16),
  ];
}

function drawTaskbar() {
  term.moveTo(1, 1).eraseLine();

  tabs.forEach((tab, index) => {
    if (index === selected) {
      term.bgBrightWhite.black.bold(` ${tab.toUpperCase()} `);
      term.white("   ");
    } else {
      const [r, g, b] = hexToRgb(COLORS.primary);
      term.colorRgb(r, g, b)(` ${tab} `);
      term.white("   ");
    }
  });
}

function drawInstructions() {
  const instructionsY = term.height - 1;
  term.moveTo(1, instructionsY).eraseLine();
  term.gray("← / → : navigate     ⏎ : select     ESC : exit");
}

function showSection(name) {
  term.moveTo(1, 6).eraseDisplayBelow();

  const firstname = FULL_NAME.split(" ")[0];
  term.windowTitle(`${name} | ${firstname}'s Portfolio`);

  switch (name) {
    case "Home":
      term(showHome());
      break;
    case "Skills":
      term(showSkills());
      break;
    case "Experience":
      term(showExperience());
      break;
    case "Projects":
      term(showProjects());

      break;
    default:
      term.red("Unknown section");
  }

  drawInstructions();
}

term.clear();
drawTaskbar();
showSection(tabs[selected]);

term.grabInput(true);
term.on("key", (name) => {
  switch (name) {
    case "LEFT":
      if (selected > 0) selected--;
      break;
    case "RIGHT":
      if (selected < tabs.length - 1) selected++;
      break;
    case "ENTER":
      drawTaskbar();
      showSection(tabs[selected]);
      return;
    case "ESCAPE":
    case "CTRL_C":
      term("\u0007");
      term.clear();
      term.red.bold("\nGoodbye!\n\n");
      process.exit();
  }

  drawTaskbar();
  showSection(tabs[selected]);
});
