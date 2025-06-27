import chalk from "chalk";
import termkit from "terminal-kit";
import terminalLink from "terminal-link";
import { EXPERIENCE, COLORS } from "../data.js";

const term = termkit.terminal;

export default function showExperience() {
  const terminalWidth = term.width || 80;
  const boxWidth = Math.min(terminalWidth - 20, 60);
  const lines = [];

  EXPERIENCE.forEach((exp, index) => {
    if (index > 0) {
      lines.push("");
    }

    const expBox = createExperienceCard(exp, boxWidth, terminalWidth);
    lines.push(...expBox);
  });

  return lines.join("\n");
}

function createExperienceCard(exp, width, terminalWidth) {
  const leftMargin = Math.floor((terminalWidth - width) / 2);
  const margin = " ".repeat(leftMargin);
  const innerWidth = width - 4;
  const lines = [];

  lines.push(
    margin + chalk.hex(COLORS.secondary)("╭" + "─".repeat(width - 2) + "╮")
  );

  const companyLink = exp.website
    ? terminalLink(exp.company, exp.website)
    : exp.company;

  const plainHeader = `${exp.role} @ ${exp.company}`;
  const headerPadding = Math.floor((innerWidth - plainHeader.length) / 2);
  const headerLine =
    "│ " +
    " ".repeat(headerPadding) +
    chalk.bgHex(COLORS.primary).hex(COLORS.baseText).bold(`${exp.role} @ `) +
    chalk.bgHex(COLORS.primary).hex(COLORS.baseText).bold(companyLink) +
    " ".repeat(innerWidth - headerPadding - plainHeader.length) +
    " │";
  lines.push(margin + chalk.hex(COLORS.secondary)(headerLine));

  lines.push(
    margin + chalk.hex(COLORS.secondary)("├" + "─".repeat(width - 2) + "┤")
  );

  const locationDuration = `${exp.location} • ${exp.duration}`;
  const detailPadding = Math.floor((innerWidth - locationDuration.length) / 2);
  const detailLine =
    "│ " +
    " ".repeat(detailPadding) +
    chalk.hex(COLORS.baseText)(locationDuration) +
    " ".repeat(innerWidth - detailPadding - locationDuration.length) +
    " │";
  lines.push(margin + chalk.hex(COLORS.secondary)(detailLine));

  lines.push(
    margin + chalk.hex(COLORS.secondary)("╰" + "─".repeat(width - 2) + "╯")
  );

  return lines;
}
