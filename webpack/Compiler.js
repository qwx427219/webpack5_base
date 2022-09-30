const { posix, resolve, dirname } = require("path");
const { readFileSync, writeFileSync, mkdirSync, existsSync } = require("fs");
const { parse } = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const generate = require("@babel/generator").default;

class Compiler {
  constructor(config) {
    this.config = config;
    this.module = {};
  }

  run(callback) {
    // 从入口模块开始进行模块依赖分析，生成{模块相对路径：模块源码字符串}键值对存入this.module中
    this.dependenciesAnalyze(this.config.entry);

    // 将this.module中存储的键值对填充到bundle.js模板中，得到填充后的bundle.js源码字符串res
    const res = require("./template")({
      module: this.module,
      entry: this.config.entry,
    });

    // 先判断打包目录是否存在，若不存在则创建打包目录
    if (!existsSync(this.config.output.path)) {
      mkdirSync(resolve(this.config.output.path));
    }
    // 再写入res到打包文件
    writeFileSync(
      resolve(this.config.output.path, this.config.output.filename),
      res
    );

    // 调用回调函数，通知打包成功
    callback(null);
  }

  dependenciesAnalyze(relativePath) {
    // 将相对路径转为绝对路径
    const absolutePath = resolve(relativePath); // path.resolve方法会将命令执行时所在目录添加为入参相对路径的前缀

    // 读取源文件内容
    const sourceCode = readFileSync(absolutePath, "utf-8");

    // 将源文件内容中的require替换为__webpack_require__,这里需要借助@babel/parser将JS源码转为抽象语法树AST
    const ast = parse(sourceCode);

    // 该变量用于存储当前模块依赖的其他模块的相对路径
    const dependencies = [];

    // 得到ast后，我们需要修改ast中的require为__webpack_require__，这里需要借助@babel/traverse来修改AST中的节点值
    traverse(ast, {
      CallExpression: (path) => {
        if (path.node.callee.name === "require") {
          path.node.callee.name = "__webpack_require__";
          let requirePath = path.node.arguments[0].value;
          // 如果此处 requirePath 是相对路径，且是相对于当前文件relativePath
          // 如果不是相对路径，则可能是绝对路径，也可能是内置或第三方模块，则不需要做路径修改，暂不考虑处理这几种情况的
          if (/^\.{1,2}\//.test(requirePath)) {
            path.node.arguments[0].value =
              "./" + posix.join(dirname(relativePath), requirePath);
          }
          // 将当前模块依赖的其他模块的相对路径缓存进dependencies
          dependencies.push(path.node.arguments[0].value);
        }
      },
    });

    // ast被修改后，需要借助@babel/generator将ast抽象语法树转回JS源码字符串
    const transformCode = generate(ast).code;

    // 为了美观，将转换后的代码中的换行之类的格式化符号转义
    this.module[relativePath] = JSON.stringify(transformCode);

    // 继续dependenciesAnalyze递归处理当前模块依赖的其他模块
    dependencies.forEach((dp) => this.dependenciesAnalyze(dp));
  }
}

module.exports = Compiler;
