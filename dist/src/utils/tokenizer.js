"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = tokenizer;
function tokenizer(input) {
    var current = 0;
    var tokens = [];
    var WHITESPACE = /\s/;
    var NUMBERS = /[0-9]/;
    var LETTERS = /[a-z]/i;
    // 文字処理
    while (current < input.length) {
        var char = input[current];
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
            var value = "";
            while (NUMBERS.test(char)) {
                value += char;
                char = input[++current];
            }
            tokens.push({ type: "number", value: value });
            continue;
        }
        //コロン
        if (char === '"') {
            var value = "";
            char = input[++current];
            while (char !== '"') {
                value += char;
                char = input[++current];
            }
            //閉じるコロンもスキップ
            current++;
            tokens.push({ type: "string", value: value });
        }
        // 関数名など
        if (LETTERS.test(char)) {
            var value = "";
            while (LETTERS.test(char)) {
                value += char;
                char = input[++current];
            }
            tokens.push({ type: "name", value: value });
            continue;
        }
        throw new TypeError("Invalid character: " + char);
    }
    return tokens;
}
