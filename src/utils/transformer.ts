import traverser from "./traverser";
import {
  JSAbstractTree,
  JSExpressionNode,
  JSNodeSet,
  JSNumberNode,
  JSStatementNode,
  JSStringNode,
  LISPAbstractTree,
  LISPExpressionNode,
  LISPNodeSet,
  LISPNumberNode,
  LISPStringNode,
  Visitor,
} from "../type";

/**
 * LISP ASTをJavaScript ASTに変換する関数
 *
 * 元のノードに_contextプロパティを通じてJSNodeの情報を追加します。ツリーをトラバースしながら各ノードを参照して_contextを完成させ、新しいASTを生成します。
 */
export default function transformer(ast: LISPAbstractTree): JSAbstractTree {
  const newAst: JSAbstractTree = {
    type: "Program",
    body: [],
  };

  ast._context = newAst.body;

  const pushContext = (node: LISPNodeSet, newNode: JSNodeSet) => {
    if (!node._context) node._context = [newNode];
    else node._context.push(newNode);
  };

  const visitor: Visitor = {
    Program: {},
    NumberLiteral: {
      enter(node: LISPNumberNode, parent: LISPNodeSet) {
        const newNode: JSNumberNode = { type: "NumberLiteral", value: node.value };
        pushContext(parent, newNode);
      },
    },
    StringLiteral: {
      enter(node: LISPStringNode, parent: LISPNodeSet) {
        const newNode: JSStringNode = { type: "StringLiteral", value: node.value };
        pushContext(parent, newNode);
      },
    },
    CallExpression: {
      enter(node: LISPExpressionNode, parent: LISPNodeSet) {
        let expression: JSExpressionNode | JSStatementNode = {
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

  traverser(ast, visitor);

  return newAst;
}
