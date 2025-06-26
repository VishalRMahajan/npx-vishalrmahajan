import chalk from "chalk";
import { COLORS } from "../data.js";

export default function showExperience() {
  return chalk
    .hex(COLORS.secondary)
    .italic(">>> Welcome to the Experience section!");
}
