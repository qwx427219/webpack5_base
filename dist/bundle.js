(() => {
    // webpackBootstrap
    var __webpack_modules__ = {
      
    "./src/index.js": (
        __unused_webpack_module,
        __unused_webpack_exports,
        __webpack_require__
      ) => {
        eval("const {\n  sum,\n  sub\n} = __webpack_require__(\"./src/js/utils.js\");\n\nconsole.log(sum(1, 2));\nconsole.log(sub(1, 2));");
      },
    
    "./src/js/utils.js": (
        module,
        __unused_webpack_exports,
        __webpack_require__
      ) => {
        eval("const {\n  a\n} = __webpack_require__(\"./src/js/common.js\");\n\nconsole.log(a);\n\nconst sum = (a, b) => a + b;\n\nconst sub = (a, b) => a - b;\n\nmodule.exports = {\n  sum,\n  sub\n};");
      },
    
    "./src/js/common.js": (
        module,
        __unused_webpack_exports,
        __webpack_require__
      ) => {
        eval("module.exports = {\n  a: 1\n};");
      },
    
    };
    // The module cache
    var __webpack_module_cache__ = {};
    // The require function
    function __webpack_require__(moduleId) {
      // Check if module is in cache
      var cachedModule = __webpack_module_cache__[moduleId];
      if (cachedModule !== undefined) {
        return cachedModule.exports;
      }
      // Create a new module (and put it into the cache)
      var module = (__webpack_module_cache__[moduleId] = {
        // no module.id needed
        // no module.loaded needed
        exports: {},
      });

      // Execute the module function
      __webpack_modules__[moduleId](module, module.exports, __webpack_require__);

      // Return the exports of the module
      return module.exports;
    }
    // startup
    // Load entry module and return exports
    // This entry module can't be inlined because the eval devtool is used.
    var __webpack_exports__ = __webpack_require__("./src/index.js");
  })();
  