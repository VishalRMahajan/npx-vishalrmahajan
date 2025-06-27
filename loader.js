import termkit from "terminal-kit";
import { COLORS } from "./data.js";

const term = termkit.terminal;

export async function startupProgress() {
  term.clear();

  const steps = [
    "Initializing portfolio...",
    "Loading terminal interface...",
    "Setting up navigation...",
    "Loading sections...",
    "Ready to launch!",
  ];

  const barWidth = Math.min(60, term.width - 8);
  const baseY = Math.floor(term.height / 2) - 2;

  for (let i = 0; i < steps.length; i++) {
    const step = steps[i];
    const xStep = Math.floor((term.width - step.length) / 2);
    term.moveTo(1, baseY).eraseLine();
    term.moveTo(xStep, baseY);
    term.colorRgbHex(COLORS.secondary, step);

    const filled = Math.floor(((i + 1) / steps.length) * barWidth);
    const bar = "█".repeat(filled) + "░".repeat(barWidth - filled);
    const xBar = Math.floor((term.width - barWidth) / 2);
    term.moveTo(1, baseY + 2).eraseLine();
    term.moveTo(xBar, baseY + 2);
    term.colorRgbHex(COLORS.primary, bar);

    const percent = `${Math.floor(((i + 1) / steps.length) * 100)}%`;
    term.moveTo(xBar + barWidth + 2, baseY + 2);
    term.colorRgbHex(COLORS.baseText, percent);

    await new Promise((r) => setTimeout(r, 600));
  }

  const doneMsg = "✓ Portfolio loaded successfully!";
  const xDone = Math.floor((term.width - doneMsg.length) / 2);
  term.moveTo(xDone, baseY + 4);
  term.colorRgbHex("#00FF00", doneMsg);
  await new Promise((r) => setTimeout(r, 700));
  term.clear();
}

export async function exitProgress() {
  term.fullscreen(false);
  term.clear();

  const steps = [
    "Closing connections",
    "Saving state",
    "Clearing cache",
    "Finalizing shutdown",
  ];

  const barWidth = Math.min(50, term.width - 8);
  const baseY = Math.floor(term.height / 2) - 2;

  for (let i = 0; i < steps.length; i++) {
    const step = steps[i];
    const xStep = Math.floor((term.width - step.length) / 2);
    term.moveTo(1, baseY).eraseLine();
    term.moveTo(xStep, baseY);
    term.colorRgbHex(COLORS.secondary, step);

    const filled = Math.floor(((i + 1) / steps.length) * barWidth);
    const bar = "█".repeat(filled) + "░".repeat(barWidth - filled);
    const xBar = Math.floor((term.width - barWidth) / 2);
    term.moveTo(1, baseY + 2).eraseLine();
    term.moveTo(xBar, baseY + 2);
    term.colorRgbHex(COLORS.primary, bar);

    const percent = `${Math.floor(((i + 1) / steps.length) * 100)}%`;
    term.moveTo(xBar + barWidth + 2, baseY + 2);
    term.colorRgbHex(COLORS.baseText, percent);

    await new Promise((r) => setTimeout(r, 700));
  }

  const doneMsg = "✓ Portfolio closed successfully!";
  const xDone = Math.floor((term.width - doneMsg.length) / 2);
  term.moveTo(xDone, baseY + 4);
  term.colorRgbHex("#00FF00", doneMsg);
  await new Promise((r) => setTimeout(r, 800));

  term.clear();
  process.exit();
}
