"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = transformer;
var traverser_1 = require("./traverser");
/**
 * LISP ASTをJavaScript ASTに変換する関数
 *
 * 元のノードに_contextプロパティを通じてJSNodeの情報を追加します。ツリーをトラバースしながら各ノードを参照して_contextを完成させ、新しいASTを生成します。
 */
function transformer(ast) {
    var newAst = {
        type: "Program",
        body: [],
    };
    ast._context = newAst.body;
    var pushContext = function (node, newNode) {
        if (!node._context)
            node._context = [newNode];
        else
            node._context.push(newNode);
    };
    var visitor = {
        Program: {},
        NumberLiteral: {
            enter: function (node, parent) {
                var newNode = { type: "NumberLiteral", value: node.value };
                pushContext(parent, newNode);
            },
        },
        StringLiteral: {
            enter: function (node, parent) {
                var newNode = { type: "StringLiteral", value: node.value };
                pushContext(parent, newNode);
            },
        },
        CallExpression: {
            enter: function (node, parent) {
                var expression = {
                    type: "CallExpression",
                    callee: {
                        type: "Identifier",
                        name: node.name,
                    },
                    arguments: [],
                };
                node._context = expression.arguments;
                // JSのトップレベル式として扱う場合はExpressionStatementで包む必要がある
                // ここでは関数の中など呼び出しがないのを想定
                if (parent.type !== "CallExpression") {
                    expression = {
                        type: "ExpressionStatement",
                        expression: expression,
                    };
                }
                pushContext(parent, expression);
            },
        },
    };
    (0, traverser_1.default)(ast, visitor);
    return newAst;
}
