#!/usr/bin/env node
import termkit from "terminal-kit";
import showHome from "./sections/home.js";
import showSkills from "./sections/skills.js";
import showExperience from "./sections/experience.js";
import showProjects from "./sections/projects.js";
import { COLORS, FULL_NAME } from "./data.js";

const term = termkit.terminal;

term.fullscreen(true);

if (term.width < 100 || term.height < 30) {
  term.yellow(
    "\nTip: Maximize your terminal window for the best experience!\n\n"
  );
}

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
      term.bgBrightWhite.magenta.bold(` ${tab.toUpperCase()} `);
      term.white("   ");
    } else {
      const [r, g, b] = hexToRgb(COLORS.primary);
      if (term.trueColor) {
        term.colorRgb(r, g, b)(` ${tab} `);
      } else {
        term.magenta(` ${tab} `);
      }
      term.white("   ");
    }
  });
}

function drawInstructions() {
  const y = term.height - 1;
  term.moveTo(1, y).eraseLine();
  term.gray("Tab / Shift+Tab : navigate     ⏎ : select     ESC : exit");
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

function exitApp() {
  term.fullscreen(false);
  term.clear();
  term.red.bold("\nGoodbye!\n\n");
  process.exit();
}

term.clear();
drawTaskbar();
showSection(tabs[selected]);

term.grabInput(true);

term.on("key", (name, matches, data) => {
  switch (name) {
    case "TAB":
      selected = (selected + 1) % tabs.length;
      break;
    case "SHIFT_TAB":
      selected = (selected - 1 + tabs.length) % tabs.length;
      break;
    case "ENTER":
      break;
    case "ESCAPE":
    case "CTRL_C":
      term("\u0007");
      exitApp();
      return;
  }

  drawTaskbar();
  showSection(tabs[selected]);
});

term.on("resize", () => {
  term.clear();
  drawTaskbar();
  showSection(tabs[selected]);
});
