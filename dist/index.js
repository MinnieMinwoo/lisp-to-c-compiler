"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = compiler;
var codeGenerator_1 = require("./src/utils/codeGenerator");
var parser_1 = require("./src/utils/parser");
var tokenizer_1 = require("./src/utils/tokenizer");
var transformer_1 = require("./src/utils/transformer");
function compiler(input) {
    var tokens = (0, tokenizer_1.default)(input);
    var ast = (0, parser_1.default)(tokens);
    var newAst = (0, transformer_1.default)(ast);
    var output = (0, codeGenerator_1.default)(newAst);
    return output;
}
