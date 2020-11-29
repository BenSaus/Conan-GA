// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"ConanGA/RandUtil.js":[function(require,module,exports) {
function RangeInt(low, high) {
  return Math.floor(Math.random() * high) + low;
}

module.exports = {
  RangeInt: RangeInt
};
},{}],"ConanGA/GAFunctions.js":[function(require,module,exports) {
var Rand = require("./RandUtil"); // Crossover Functions ==================================


function SinglePointCrossover(ga, father, mother, child1, child2) {
  // If the mother and father are the same simply return both of them as children
  if (Math.random() > ga.settings.crossoverRate || father === mother) {
    child1 = father;
    child2 = mother;
    return;
  }

  var chromosomeCount = father.chromosomeCount;
  var crossoverPoint = Rand.RangeInt(0, chromosomeCount - 1);

  for (var i = 0; i < crossoverPoint; i++) {
    child1.chromosomes[i] = father.chromosomes[i];
    child2.chromosomes[i] = mother.chromosomes[i];
  }

  for (var _i = 0; _i < crossoverPoint; _i++) {
    child1.chromosomes[_i] = mother.chromosomes[_i];
    child2.chromosomes[_i] = father.chromosomes[_i];
  }
} // Selection Functions ==================================


function RouletteWheelSelection(ga, population) {
  var slice = Math.random() * ga.totalFitnessScore;
  var total = 0;

  for (var i = 0; i < population.length; i++) {
    total += population[i].fitness;

    if (total >= slice) {
      return population[i];
    }
  }

  throw new Error("There was an error in selection");
} // function TournamentSelection() {
// }
// Mutation Functions ===================================


module.exports = {
  Selection: {
    RouletteWheelSelection: RouletteWheelSelection
  },
  Crossover: {
    SinglePointCrossover: SinglePointCrossover
  },
  Mutation: {}
};
},{"./RandUtil":"ConanGA/RandUtil.js"}],"ConanGA/GAGenome.js":[function(require,module,exports) {
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// A chromosome is a singular piece of DNA. A genome is a full set of chromosomes.
// TODO: Is this needed??
// General chromo that can be used with ContainerGenome
// class GeneralChromo {
//     constructor(id, value, label) {
//         this.id = id
//         this.value = value
//         this.label = label
//     }
//     ToString() {
//         return value + " " + label
//     }
// }
// Genomes ==================================================
var Genome = function Genome() {
  _classCallCheck(this, Genome);

  this.fitness = 0;
  this.chromosomes = [];
  this.chromosomeCount = 0;
}; // Used to contain a set of chromosomes, which can be anything


var ContainerGenome = /*#__PURE__*/function (_Genome) {
  _inherits(ContainerGenome, _Genome);

  var _super = _createSuper(ContainerGenome);

  function ContainerGenome(chromosomes) {
    var _this;

    _classCallCheck(this, ContainerGenome);

    _this = _super.call(this);
    _this.chromosomeCount = chromosomes.length; // Store the given chromosomes

    var id = 0;

    for (var chromo in chromosomes) {
      _this.chromosomes[id] = chromo;
      id++;
    }

    return _this;
  }

  return ContainerGenome;
}(Genome); // Used to hold an array of floats


var FloatGenome = /*#__PURE__*/function (_Genome2) {
  _inherits(FloatGenome, _Genome2);

  var _super2 = _createSuper(FloatGenome);

  function FloatGenome(chromosomeNumber) {
    var _this2;

    _classCallCheck(this, FloatGenome);

    _this2 = _super2.call(this);
    _this2.chromosomeCount = chromosomeNumber; // Create chromosomeCount number of float chromosomes

    for (var x = 0; x < chromosomeNumber; x++) {
      var newChrom = Math.random();

      _this2.chromosomes.push(newChrom);
    }

    return _this2;
  }

  _createClass(FloatGenome, [{
    key: "ToString",
    value: function ToString() {
      var str = "";
      str.concat("Fitness: " + this.fitness + "\n");

      for (var i = 0; i < chromosomeCount; i++) {
        str.concat(chromosomes[i] + "\n");
      }

      return str;
    }
  }]);

  return FloatGenome;
}(Genome);

module.exports = {
  Genome: Genome,
  ContainerGenome: ContainerGenome,
  FloatGenome: FloatGenome // BinaryGenome
  // IntegerGenome

};
},{}],"ConanGA/GA.js":[function(require,module,exports) {
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Functions = require("./GAFunctions");

var Genomes = require("./GAGenome"); // Primary Algorithm =======================================


var GA = /*#__PURE__*/function () {
  function GA(settings, initPopulation) {
    _classCallCheck(this, GA);

    this._testSettings(settings);

    this.settings = settings;

    this._setDefaults(settings);

    if (!initPopulation) {
      if (!settings.populationSize) {
        throw new Error("Population size is not defined");
      }

      this.population = this._createInitalPopulation(this.settings.populationSize);
    } else {
      this.population = initPopulation;
      this.settings.populationSize = this.population.length;
    }

    this.generation = 0;
  }

  _createClass(GA, [{
    key: "_createInitalPopulation",
    value: function _createInitalPopulation(popSize) {
      var population = [];

      for (var x = 0; x < popSize; x++) {
        population.push(this.settings.createGenomeFunc());
      }

      return population;
    }
  }, {
    key: "_setDefaults",
    value: function _setDefaults(settings) {
      if (!settings.mutationRate) {
        this.settings.mutationRate = 0.001;
      }

      if (!settings.crossoverRate) {
        this.settings.crossoverRate = 0.7;
      }

      if (typeof settings.elitism === "undefined") {
        this.settings.elitism = true;
      }
    }
  }, {
    key: "_testSettings",
    value: function _testSettings(settings) {
      if (!settings.fitnessFunc) {
        throw new Error("Fitness function not defined");
      }

      if (!settings.mutationFunc) {
        throw new Error("Mutation function not defined");
      }

      if (!settings.selectionFunc) {
        throw new Error("Selection function not defined");
      }

      if (!settings.crossoverFunc) {
        throw new Error("Crossover function not defined");
      }

      if (!settings.createGenomeFunc) {
        throw new Error("Create Genome function not defined");
      }
    }
  }, {
    key: "Evolve",
    value: function Evolve() {
      // if this is the first generation evaluate fitness
      if (this.generation === 0) this._updateFitnessScores(); // not sure if this should be here

      var babyNum = 0; // allocate new array for children

      var babies = []; // keep two copies of the best genome if elitism is on

      if (this.settings.elitism) {
        babyNum = 2;
        babies.push(this.fittestGenome);
        babies.push(this.fittestGenome);
      }

      while (babyNum < this.settings.populationSize) {
        //Select mother and father
        var mother = this.settings.selectionFunc(this, this.population);
        var father = this.settings.selectionFunc(this, this.population); //Produce children

        var child1 = this.settings.createGenomeFunc();
        var child2 = this.settings.createGenomeFunc();
        this.settings.crossoverFunc(this, father, mother, child1, child2); //Mutate Children

        if (Math.random() > this.settings.mutationRate) {
          this.settings.mutationFunc(child1);
        }

        if (Math.random() > this.settings.mutationRate) {
          this.settings.mutationFunc(child2);
        } //Store the babies


        babies[babyNum] = child1;
        babies[babyNum + 1] = child2;
        babyNum += 2;
      }

      this.population = babies;
      this.generation++;

      this._updateFitnessScores();
    }
  }, {
    key: "_updateFitnessScores",
    value: function _updateFitnessScores() {
      this.bestFitnessScore = 0;
      this.fittestGenome = null;
      this.totalFitnessScore = 0; // Used for Roulette Wheel Selection

      var _iterator = _createForOfIteratorHelper(this.population),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var genome = _step.value;
          genome.fitness = this.settings.fitnessFunc(genome);
          this.totalFitnessScore += genome.fitness;

          if (genome.fitness > this.bestFitnessScore) {
            this.bestFitnessScore = genome.fitness;
            this.fittestGenome = genome;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "GetBestFitnessScore",
    value: function GetBestFitnessScore() {
      return this.bestFitnessScore;
    }
  }, {
    key: "GetFittestGenome",
    value: function GetFittestGenome() {
      return this.fittestGenome;
    }
  }]);

  return GA;
}();

module.export = {
  GA: GA,
  Functions: Functions,
  Genomes: Genomes
};
},{"./GAFunctions":"ConanGA/GAFunctions.js","./GAGenome":"ConanGA/GAGenome.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "57652" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","ConanGA/GA.js"], null)
//# sourceMappingURL=/GA.0f96ab02.js.map