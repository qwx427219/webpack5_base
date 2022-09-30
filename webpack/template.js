module.exports = ({ module, entry }) => {
  let tmp = "";
  for (let m in module) {
    tmp += `
    "${m}": (
        ${m === entry ? "__unused_webpack_module" : "module"},
        __unused_webpack_exports,
        __webpack_require__
      ) => {
        eval(${module[m]});
      },
    `;
  }

  return `(() => {
    // webpackBootstrap
    var __webpack_modules__ = {
      ${tmp}
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
    var __webpack_exports__ = __webpack_require__("${entry}");
  })();
  `;
};
