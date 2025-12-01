import { LISPAbstractTree, LISPExpressionNode, LISPNodeSet, LISPProgramNode, Visitor } from "../type";

export default function traverser(ast: LISPAbstractTree, visitor: Visitor) {
  function traverseArray(nodes: LISPNodeSet[], parent: LISPNodeSet) {
    nodes.forEach((node) => {
      traverseNode(node, parent);
    });
  }

  function traverseNode(node: LISPNodeSet, parent: LISPNodeSet | null) {
    const methods = visitor[node.type];
    if (methods && methods.enter) {
      methods.enter(node, parent);
    }

    switch (node.type) {
      case "Program":
        traverseArray((node as LISPProgramNode).body, node);
        break;
      case "CallExpression":
        traverseArray((node as LISPExpressionNode).params, node);
        break;
      case "NumberLiteral":
        break;
      case "StringLiteral":
        break;
      default:
        if ("type" in node) throw new TypeError((node as { type: string }).type);
        else throw new TypeError("Unknown node type");
    }

    if (methods && methods.exit) {
      methods.exit(node, parent);
    }
  }

  traverseNode(ast, null);
}
