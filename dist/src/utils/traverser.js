"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = traverser;
function traverser(ast, visitor) {
    function traverseArray(nodes, parent) {
        nodes.forEach(function (node) {
            traverseNode(node, parent);
        });
    }
    function traverseNode(node, parent) {
        var methods = visitor[node.type];
        if (methods && methods.enter) {
            methods.enter(node, parent);
        }
        switch (node.type) {
            case "Program":
                traverseArray(node.body, node);
                break;
            case "CallExpression":
                traverseArray(node.params, node);
                break;
            case "NumberLiteral":
                break;
            case "StringLiteral":
                break;
            default:
                if ("type" in node)
                    throw new TypeError(node.type);
                else
                    throw new TypeError("Unknown node type");
        }
        if (methods && methods.exit) {
            methods.exit(node, parent);
        }
    }
    traverseNode(ast, null);
}
