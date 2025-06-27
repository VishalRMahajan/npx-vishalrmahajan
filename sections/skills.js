import chalk from "chalk";
import termkit from "terminal-kit";
import { SKILL_GROUPS, COLORS } from "../data.js";

const term = termkit.terminal;

export default function showSkills() {
  const cellWidth = 24;
  const gap = 2;
  const terminalWidth = term.width || 100;
  const columnsPerRow = 3;
  const rowCount = Math.ceil(SKILL_GROUPS.length / columnsPerRow);
  const fullGridWidth = cellWidth * columnsPerRow + gap * (columnsPerRow - 1);
  const padding = Math.floor((terminalWidth - fullGridWidth) / 2);

  const lines = [];
  for (let row = 0; row < rowCount; row++) {
    const titleLine = [];
    const itemLines = [];

    const rowCells = SKILL_GROUPS.slice(
      row * columnsPerRow,
      row * columnsPerRow + columnsPerRow
    );
    const maxItems = Math.max(...rowCells.map((cell) => cell.items.length));

    for (let col = 0; col < columnsPerRow; col++) {
      const cell = rowCells[col];
      const title = cell
        ? chalk
            .bgHex(COLORS.primary)
            .hex(COLORS.baseText)
            .bold(
              cell.title
                .padStart((cellWidth + cell.title.length) / 2)
                .padEnd(cellWidth)
            )
        : " ".repeat(cellWidth);
      titleLine.push(title);

      for (let i = 0; i < maxItems; i++) {
        const item = cell?.items[i] || "";
        if (!itemLines[i]) itemLines[i] = [];
        itemLines[i].push(
          chalk.hex(COLORS.secondary)(
            item.padStart((cellWidth + item.length) / 2).padEnd(cellWidth)
          )
        );
      }
    }

    lines.push(" ".repeat(padding) + titleLine.join(" ".repeat(gap)));
    itemLines.forEach((line) => {
      lines.push(" ".repeat(padding) + line.join(" ".repeat(gap)));
    });
    lines.push("");
  }

  return lines.join("\n");
}
