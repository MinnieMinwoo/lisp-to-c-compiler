import { Token } from "../type";

export default function tokenizer(input: string) {
  let current = 0;
  let tokens: Token[] = [];

  const WHITESPACE = /\s/;
  const NUMBERS = /[0-9]/;
  const LETTERS = /[a-z]/i;

  // 文字処理
  while (current < input.length) {
    let char = input[current];

    //括弧
    if (char === "(" || char === ")") {
      tokens.push({ type: "paren", value: char });
      current++;
      continue;
    }

    // 空白
    if (WHITESPACE.test(char)) {
      current++;
      continue;
    }

    // 数字
    if (NUMBERS.test(char)) {
      let value = "";
      while (NUMBERS.test(char)) {
        value += char;
        char = input[++current];
      }

      tokens.push({ type: "number", value });
      continue;
    }

    //コロン
    if (char === '"') {
      let value = "";
      char = input[++current];

      while (char !== '"') {
        value += char;
        char = input[++current];
      }

      //閉じるコロンもスキップ
      current++;
      tokens.push({ type: "string", value });
    }

    // 関数名など
    if (LETTERS.test(char)) {
      let value = "";

      while (LETTERS.test(char)) {
        value += char;
        char = input[++current];
      }

      tokens.push({ type: "name", value });
      continue;
    }

    throw new TypeError("Invalid character: " + char);
  }

  return tokens;
}
