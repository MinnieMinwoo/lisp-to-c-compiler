import { JSIdentifierNode, JSNodeSet } from "../type";

export default function codeGenerator(node: JSNodeSet): string {
  switch (node.type) {
    case "Program":
      return node.body.map(codeGenerator).join("\n");
    case "ExpressionStatement":
      return codeGenerator(node.expression) + ";";
    case "CallExpression":
      return codeGenerator(node.callee) + "(" + node.arguments.map(codeGenerator).join(", ") + ")";
    case "Identifier":
      return (node as JSIdentifierNode).name;
    case "NumberLiteral":
      return node.value;
    case "StringLiteral":
      return `"${node.value}"`;
    default:
      if ("type" in node) throw new TypeError((node as { type: string }).type);
      else throw new TypeError("Unknown node type");
  }
}
