export type Choice = "rock" | "paper" | "scissors";
export type Outcome = "win" | "lose" | "draw";

export const CHOICES: Choice[] = ["scissors", "rock", "paper"];

export const CHOICE_LABELS: Record<Choice, string> = {
  rock: "바위",
  paper: "보",
  scissors: "가위",
};

export const CHOICE_EMOJI: Record<Choice, string> = {
  rock: "✊",
  paper: "✋",
  scissors: "✌️",
};

const BEATS: Record<Choice, Choice> = {
  rock: "scissors",
  paper: "rock",
  scissors: "paper",
};

export function judge(player: Choice, computer: Choice): Outcome {
  if (player === computer) return "draw";
  return BEATS[player] === computer ? "win" : "lose";
}

export function randomChoice(): Choice {
  return CHOICES[Math.floor(Math.random() * CHOICES.length)];
}
