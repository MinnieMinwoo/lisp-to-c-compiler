"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = codeGenerator;
function codeGenerator(node) {
    switch (node.type) {
        case "Program":
            return node.body.map(codeGenerator).join("\n");
        case "ExpressionStatement":
            return codeGenerator(node.expression) + ";";
        case "CallExpression":
            return codeGenerator(node.callee) + "(" + node.arguments.map(codeGenerator).join(", ") + ")";
        case "Identifier":
            return node.name;
        case "NumberLiteral":
            return node.value;
        case "StringLiteral":
            return "\"".concat(node.value, "\"");
        default:
            if ("type" in node)
                throw new TypeError(node.type);
            else
                throw new TypeError("Unknown node type");
    }
}
