# Lisp to C Compiler

## 概要

Lisp 風の関数呼び出しを C 風の関数呼び出しに変換します。例えば：

- Lisp 風: `(add 2 (subtract 4 2))`
- C 風: `add(2, subtract(4, 2));`

このコンパイラは、コンパイラの主要な段階である**字句解析 (Lexical Analysis)**、**構文解析 (Syntactic Analysis)**、**変換 (Transformation)**、**コード生成 (Code Generation)** を実装しています。

## 特徴

- **字句解析 (Tokenizer)**: 入力文字列をトークンに分割
- **構文解析 (Parser)**: トークンを抽象構文木 (AST) に変換
- **変換 (Transformer)**: Lisp 風 AST を C 風 AST に変換
- **コード生成 (Code Generator)**: AST を文字列コードに変換

## プロジェクト構造

```
index.ts               # メインコンパイラ関数
src/
  type.d.ts            # TypeScript型定義
  utils/
    codeGenerator.ts   # コード生成器
    parser.ts          # パーサー
    tokenizer.ts       # トークナイザー
    transformer.ts     # トランスフォーマー
    traverser.ts       # ASTトラバーサー
```

## インストールと実行

このプロジェクトは `package.json` を使用していません。TypeScript コンパイラと Node.js が必要です。

### 前提条件

- Node.js
- TypeScript コンパイラ (`tsc`)

### コンパイル

TypeScript ファイルを JavaScript にコンパイルします：

```bash
tsc index.ts --outDir dist --module commonjs
```

### 実行

コンパイルされた JavaScript を実行します：

```bash
node -e "const m = require('./dist/index.js'); console.log(m.default('(add 2 (subtract 4 2))'))"
```

出力例：

```
add(2, subtract(4, 2));
```

## 使用例

### 基本的な使用法

```typescript
import compiler from "./index";

const input = "(add 2 (subtract 4 2))";
const output = compiler(input);
console.log(output); // add(2, subtract(4, 2));
```

### 各段階の実行

```typescript
import { tokenizer, parser, transformer, codeGenerator } from "./index";

const input = "(add 2 (subtract 4 2))";

// 字句解析
const tokens = tokenizer(input);
console.log(tokens);

// 構文解析
const ast = parser(tokens);
console.log(JSON.stringify(ast, null, 2));

// 変換
const newAst = transformer(ast);
console.log(JSON.stringify(newAst, null, 2));

// コード生成
const output = codeGenerator(newAst);
console.log(output);
```

## テスト

テストを実行するには、Jest が必要です。グローバルにインストールしてください：

```bash
npm install -g jest ts-jest @types/jest
```

テスト実行：

```bash
jest
```

## コンパイラの段階詳細

### 1. 字句解析 (Lexical Analysis)

入力文字列をトークンに分割します。トークンは `{ type, value }` の形式です。

例：

- 入力: `(add 2 (subtract 4 2))`
- トークン: `[{ type: 'paren', value: '(' }, { type: 'name', value: 'add' }, ...]`

### 2. 構文解析 (Syntactic Analysis)

トークンを抽象構文木 (AST) に変換します。AST はコードの構造を表します。

### 3. 変換 (Transformation)

Lisp 風 AST を C 風 AST に変換します。ノードの種類を変更し、新しい構造を作成します。

### 4. コード生成 (Code Generation)

AST を文字列コードに変換します。各ノードタイプに応じて適切なコードを生成します。

## 参考

このコンパイラは、James Kyle さんの "The Super Tiny Compiler" を参考にして制作したものです。詳細は以下のリンクを参照してください：

- [The Super Tiny Compiler](https://github.com/jamiebuilds/the-super-tiny-compiler)
