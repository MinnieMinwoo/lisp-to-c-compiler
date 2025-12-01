import codeGenerator from "./src/utils/codeGenerator";
import parser from "./src/utils/parser";
import tokenizer from "./src/utils/tokenizer";
import transformer from "./src/utils/transformer";

export default function compiler(input: string): string {
  const tokens = tokenizer(input);
  const ast = parser(tokens);
  const newAst = transformer(ast);
  const output = codeGenerator(newAst);

  return output;
}
