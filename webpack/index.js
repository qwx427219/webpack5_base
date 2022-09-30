const Compiler = require("./Compiler");

function webpack(config) {
  const compiler = new Compiler(config);

  return compiler;
}

module.exports = webpack;
