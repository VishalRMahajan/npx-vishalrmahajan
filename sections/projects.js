import chalk from "chalk";
import termkit from "terminal-kit";
import terminalLink from "terminal-link";
import { PROJECTS, COLORS, CONTACTS } from "../data.js";

const term = termkit.terminal;

export default function showProjects() {
  const terminalWidth = term.width || 80;
  const boxWidth = Math.min(Math.floor((terminalWidth - 30) / 2), 35);
  const lines = [];

  const displayProjects = PROJECTS.slice(0, 2);

  for (let i = 0; i < displayProjects.length; i += 2) {
    const leftProject = displayProjects[i];
    const rightProject = displayProjects[i + 1];

    const leftBox = createProjectCard(
      leftProject,
      boxWidth,
      terminalWidth,
      true
    );
    const rightBox = rightProject
      ? createProjectCard(rightProject, boxWidth, terminalWidth, false)
      : [];

    const maxLines = Math.max(leftBox.length, rightBox.length);

    for (let j = 0; j < maxLines; j++) {
      const leftLine = leftBox[j] || " ".repeat(boxWidth);
      const rightLine = rightBox[j] || "";
      const spacing = " ".repeat(6);
      lines.push(leftLine + spacing + rightLine);
    }
  }

  lines.push("");
  lines.push("");

  const moreText = "More projects on ";
  const githubLink = terminalLink(
    "GitHub",
    "https://github.com/" + CONTACTS.github
  );
  const fullTextLength = moreText.length + 6;
  const textPadding = Math.floor((terminalWidth - fullTextLength) / 2);
  const moreLine =
    " ".repeat(textPadding) +
    chalk.hex(COLORS.baseText)(moreText) +
    chalk.hex(COLORS.primary).underline(githubLink);
  lines.push(moreLine);

  return lines.join("\n");
}

function createProjectCard(project, width, terminalWidth, isLeft) {
  const leftMargin = isLeft
    ? Math.floor((terminalWidth - (width * 2 + 6)) / 2)
    : 0;
  const margin = " ".repeat(leftMargin);
  const innerWidth = width - 4;
  const lines = [];

  lines.push(
    margin + chalk.hex(COLORS.secondary)("╭" + "─".repeat(width - 2) + "╮")
  );

  const projectName = project.github
    ? terminalLink(project.name, project.github)
    : project.name;
  const namePadding = Math.floor((innerWidth - project.name.length) / 2);
  const nameLine =
    "│ " +
    " ".repeat(namePadding) +
    chalk.bgHex(COLORS.primary).hex(COLORS.baseText).bold(projectName) +
    " ".repeat(innerWidth - namePadding - project.name.length) +
    " │";
  lines.push(margin + chalk.hex(COLORS.secondary)(nameLine));

  lines.push(
    margin + chalk.hex(COLORS.secondary)("├" + "─".repeat(width - 2) + "┤")
  );

  const wrappedDesc = wrapText(project.description, innerWidth - 4);
  wrappedDesc.forEach((line) => {
    const descPadding = Math.floor((innerWidth - line.length) / 2);
    const descLine =
      "│ " +
      " ".repeat(descPadding) +
      chalk.hex(COLORS.baseText).italic(line) +
      " ".repeat(innerWidth - descPadding - line.length) +
      " │";
    lines.push(margin + chalk.hex(COLORS.secondary)(descLine));
  });

  lines.push(
    margin + chalk.hex(COLORS.secondary)("╰" + "─".repeat(width - 2) + "╯")
  );

  return lines;
}

function wrapText(text, maxWidth) {
  const words = text.split(" ");
  const lines = [];
  let currentLine = "";

  words.forEach((word) => {
    if ((currentLine + word).length <= maxWidth) {
      currentLine += (currentLine ? " " : "") + word;
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  });

  if (currentLine) lines.push(currentLine);
  return lines;
}
