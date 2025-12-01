// ===== トークン関連の型 =====

type TokenType = "paren" | "name" | "number" | "string";

export interface Token {
  type: TokenType;
  value: string;
}

// ===== LISP AST ノードの型 =====

export interface LISPStringNode {
  type: "StringLiteral";
  value: string;
  _context?: JSNodeSet[];
}

export interface LISPNumberNode {
  type: "NumberLiteral";
  value: string;
  _context?: JSNodeSet[];
}

export interface LISPExpressionNode {
  type: "CallExpression";
  name: string;
  params: LISPNodeSet[];
  _context?: JSNodeSet[];
}

export interface LISPProgramNode {
  type: "Program";
  body: LISPNodeSet[];
  _context?: JSNodeSet[];
}

export type LISPNodeSet = LISPStringNode | LISPNumberNode | LISPExpressionNode | LISPProgramNode;

// LISP 抽象構文木の型
export type LISPAbstractTree = LISPProgramNode;

// ===== ビジター関連の型 =====

// ASTを巡回する際に使用するビジターパターンの型
export type Visitor = {
  [key in LISPNodeSet["type"]]: {
    enter?(node: LISPNodeSet, parent: LISPNodeSet | null): void;
    exit?(node: LISPNodeSet, parent: LISPNodeSet | null): void;
  };
};

// ===== JS言語風 AST ノードの型 =====

export interface JSStringNode {
  type: "StringLiteral";
  value: string; // 文字列の値
}

export interface JSNumberNode {
  type: "NumberLiteral";
  value: string;
}

export interface JSExpressionNode {
  type: "CallExpression";
  callee: JSIdentifierNode;
  arguments: JSNodeSet[];
}

// JS言語 識別子ノード
export interface JSIdentifierNode {
  type: "Identifier";
  name: string;
}

// JS言語 式文ノード
export interface JSStatementNode {
  type: "ExpressionStatement";
  expression: JSExpressionNode;
}

export interface JSProgramNode {
  type: "Program";
  body: JSNodeSet[];
}

export type JSNodeSet =
  | JSStringNode
  | JSNumberNode
  | JSExpressionNode
  | JSIdentifierNode
  | JSStatementNode
  | JSProgramNode;

export type JSAbstractTree = JSProgramNode;
