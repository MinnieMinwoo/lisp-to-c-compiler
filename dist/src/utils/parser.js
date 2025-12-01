"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = parser;
function parser(tokens) {
    var current = 0;
    var walk = function () {
        var token = tokens[current];
        switch (token.type) {
            case "number":
                current++;
                return {
                    type: "NumberLiteral",
                    value: token.value,
                };
            case "string":
                current++;
                return {
                    type: "StringLiteral",
                    value: token.value,
                };
            case "paren":
                if (token.value === "(") {
                    token = tokens[++current];
                    var node = {
                        type: "CallExpression",
                        name: token.value,
                        params: [],
                    };
                    token = tokens[++current];
                    while (token.type !== "paren" || (token.type === "paren" && token.value !== ")")) {
                        node.params.push(walk());
                        token = tokens[current];
                    }
                    current++;
                    return node;
                }
                else {
                    throw new TypeError(token.type);
                }
            default:
                throw new TypeError(token.type);
        }
    };
    var ast = {
        type: "Program",
        body: [],
    };
    while (current < tokens.length) {
        ast.body.push(walk());
    }
    return ast;
}
