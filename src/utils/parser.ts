import { LISPExpressionNode, LISPNodeSet, LISPNumberNode, LISPStringNode, LISPAbstractTree, Token } from "../type";

export default function parser(tokens: Token[]): LISPAbstractTree {
  let current = 0;

  const walk = (): LISPNodeSet => {
    let token = tokens[current];

    switch (token.type) {
      case "number":
        current++;
        return {
          type: "NumberLiteral",
          value: token.value,
        } as LISPNumberNode;
      case "string":
        current++;
        return {
          type: "StringLiteral",
          value: token.value,
        } as LISPStringNode;
      case "paren":
        if (token.value === "(") {
          token = tokens[++current];

          const node: LISPExpressionNode = {
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
        } else {
          throw new TypeError(token.type);
        }
      default:
        throw new TypeError(token.type);
    }
  };

  const ast: LISPAbstractTree = {
    type: "Program",
    body: [],
  };

  while (current < tokens.length) {
    ast.body.push(walk());
  }

  return ast;
}
