const webpack = require("./webpack"); // 此处引入的是我们自定义的wbepack函数

const config = require("./webpack.config");

const compiler = webpack(config);

compiler.run((err, stat) => {
  if (err) {
    console.log("--------->", "打包失败");
  } else {
    console.log("--------->", "打包成功");
  }
});
