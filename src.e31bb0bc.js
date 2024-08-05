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
})({"utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.block = block;
exports.fromObjectToAttribute = fromObjectToAttribute;
exports.generateFilter = generateFilter;
exports.generateForm = generateForm;
exports.generateModal = generateModal;
function block(options) {
  return "\n      <div class=\"movie\">\n          <h2 class=\"movie__title h2\"><a href=\"".concat(options.url, "\" target=\"_blank\">").concat(options.title, "</a></h2>\n          <h3 class=\"movie__year h3\">").concat(options.year, "</h3>\n          <div class=\"rectangle\"></div>\n          <p class=\"movie__description h3\">").concat(options.description, "</p>\n          <div class=\"movie__filters\">\n            <button id=\"").concat(options.id, "\" class=\"movie__status h3 ").concat(!options.status ? 'unwatched' : 'watched', "\">\n              ").concat(options.status ? 'Просмотрено' : 'Не просмотрено', "\n            </button>\n            <p class=\"movie__genre h3\">").concat(options.genre, "</p>\n          </div>\n          \n      </div>\n  ");
}
function generateFilter() {
  var filter = document.createElement('div');
  filter.classList.add('filter-block');
  filter.innerHTML = "\n      <div class=\"filter-header\" id=\"filter-header\">\n        <h3 class=\"filter-title h3\">\u0424\u0438\u043B\u044C\u0442\u0440\u044B</h3>\n      </div>\n      <form class=\"filter-form\" id=\"filter-form\">\n        <div class=\"mb-3\">\n          <select class=\"form-select\" name=\"genre\">\n            <option selected disabled>\u0416\u0430\u043D\u0440</option>\n            ".concat(generateSelectGenre(), "\n          </select>   \n        </div>\n        <div class=\"mb-3\">\n          <label class=\"h3\">\u0413\u043E\u0434: </label>\n          <input type=\"text\" class=\"form-control\" name=\"year\">\n        </div>\n        <div class=\"mb-3\">\n          <label class=\"form-label h3\">\u041F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\u0435\u043D\u043D\u043E:</label>\n          <input class=\"filter-checkbox\" type=\"checkbox\" name=\"status\">  \n        </div>\n        <div>\n          <input type=\"button\" class=\"btn btn-secondary\" id=\"clear\" value=\"\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C\">\n          <input type=\"submit\" class=\"btn btn-primary\" value=\"\u041F\u043E\u0438\u0441\u043A\">\n        </div>\n      </form>\n  ");
  return filter;
}
function generateSelectGenre() {
  var genre = ['Комедия', 'Мультфильм', 'Ужасы', 'Фантастика', 'Триллер', 'Боевик', 'Мелодрама', 'Детектив', 'Приключения', 'Аниме', 'Военное'];
  var toString = function toString(key) {
    return "<option value=\"".concat(key, "\">").concat(key, "</option>");
  };
  return genre.map(toString).join('');
}
function generateForm() {
  return "\n      <form class=\"movie-form\" id=\"add-movie\">\n          <div class=\"mb-3\">\n            <label for=\"exampleFormControlInput1\" class=\"form-label\">\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0444\u0438\u043B\u044C\u043C\u0430</label>\n            <input type=\"text\" name=\"title\" class=\"form-control\" id=\"exampleFormControlInput1\">\n          </div>\n          <div class=\"mb-3\">\n            <label for=\"exampleFormControlInput2\" class=\"form-label\">\u0413\u043E\u0434</label>\n            <input type=\"number\" name=\"year\" min=\"1900\" max=\"".concat(new Date().getFullYear(), "\" value=\"2000\" class=\"form-control\" id=\"exampleFormControlInput2\">\n          </div>\n          <div class=\"mb-3\">\n            <label for=\"exampleFormControlInput3\" class=\"form-label\">\u0421\u0441\u044B\u043B\u043A\u0430 \u043D\u0430 \u0444\u0438\u043B\u044C\u043C</label>\n            <input type=\"text\" name=\"url\" class=\"form-control\" id=\"exampleFormControlInput3\">\n          </div>\n          <div class=\"mb-3\">\n            <label for=\"exampleFormControlTextarea1\" class=\"form-label\">\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u0444\u0438\u043B\u044C\u043C\u0430</label>\n            <textarea class=\"form-control\" name=\"description\" id=\"exampleFormControlTextarea1\" rows=\"3\" maxlength=\"700\"></textarea>\n          </div>\n          <div class=\"mb-3\">\n            <select class=\"form-select\" name=\"genre\">\n              <option selected disabled>\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0436\u0430\u043D\u0440</option>\n              ").concat(generateSelectGenre(), "\n            </select>\n          </div>\n          <div class=\"modal-footer\">\n            <input type=\"submit\" class=\"btn btn-primary\" value=\"\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C\" data-bs-dismiss=\"modal\">\n          </div>\n      </form>\n  ");
}
function generateModal(content) {
  var modal = document.createElement('div');
  modal.classList.add('modal');
  modal.setAttribute('tabindex', -1);
  modal.setAttribute('id', 'open-modal');
  modal.innerHTML = "\n      <div class=\"modal-dialog modal-dialog-centered modal-xl\">\n        <div class=\"modal-content\">\n          <div class=\"modal-header\">\n            <h5 class=\"modal-title\">\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0444\u0438\u043B\u044C\u043C</h5>\n            <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"modal\" aria-label=\"Close\"></button>\n          </div>\n          <div class=\"modal-body\">\n            ".concat(content, "\n          </div>\n        </div>\n      </div>\n  ");
  return modal;
}
function fromObjectToAttribute(target) {
  var obj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  for (var key in obj) {
    target.setAttribute(key, obj[key]);
  }
  return target;
}
},{}],"classes/movieElement.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MovieElement = void 0;
var _utils = require("../utils");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var MovieElement = exports.MovieElement = /*#__PURE__*/function () {
  function MovieElement(options) {
    _classCallCheck(this, MovieElement);
    this.options = options;
  }
  return _createClass(MovieElement, [{
    key: "toHTML",
    value: function toHTML() {
      return (0, _utils.block)(this.options);
    }
  }]);
}();
},{"../utils":"utils.js"}],"classes/moviesList.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoviesList = void 0;
var _movieElement = require("./movieElement");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var MoviesList = exports.MoviesList = /*#__PURE__*/function () {
  function MoviesList() {
    _classCallCheck(this, MoviesList);
  }
  return _createClass(MoviesList, null, [{
    key: "create",
    value: function create(movie) {
      return fetch(this.url, {
        method: 'POST',
        body: JSON.stringify(movie),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function (response) {
        return response.json();
      }).then(function (response) {
        movie.id = response.name;
        return movie;
      }).then(addToLocalStorage).then(MoviesList.renderList);
    }
  }, {
    key: "fetch",
    value: function (_fetch) {
      function fetch() {
        return _fetch.apply(this, arguments);
      }
      fetch.toString = function () {
        return _fetch.toString();
      };
      return fetch;
    }(function () {
      return fetch("".concat(this.url, "?auth=").concat(this.apiKey)).then(function (response) {
        return response.json();
      }).then(function (movies) {
        return movies ? Object.keys(movies).map(function (key) {
          return _objectSpread(_objectSpread({}, movies[key]), {}, {
            id: key
          });
        }) : [];
      });
    })
  }, {
    key: "updateStatus",
    value: function updateStatus(e) {
      e.preventDefault();
      var target = e.target;
      if (target.classList[0] !== 'movie__status') {
        return '';
      }
      return fetch("https://movie-app-b6690-default-rtdb.firebaseio.com/movieList/".concat(target.id, ".json?auth=").concat(MoviesList.apiKey)).then(function (response) {
        return response.json();
      }).then(function (movie) {
        movie.status = !movie.status;
        return movie;
      }).then(function (content) {
        return fetch("https://movie-app-b6690-default-rtdb.firebaseio.com/movieList/".concat(target.id, ".json?auth=").concat(MoviesList.apiKey), {
          method: 'PUT',
          body: JSON.stringify(content),
          headers: {
            'Content-Type': 'application/json'
          }
        });
      }).then(function (content) {
        localStorage.clear();
        MoviesList.renderList();
      });
    }
  }, {
    key: "refresh",
    value: function refresh(e) {
      e.preventDefault();
      localStorage.clear();
      MoviesList.renderList();
    }
  }, {
    key: "searchInList",
    value: function searchInList() {
      var input = document.querySelector('#search-input').value.trim().toLowerCase();
      MoviesList.getMoviesWithFilters(input);
    }
  }, {
    key: "getMoviesWithFilters",
    value: function getMoviesWithFilters() {
      var search = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var filters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var all = getMoviesFromLocalStorage();
      if (search.length > 0) {
        all = all.filter(function (key) {
          return key.title.toLowerCase().includes(search) || key.description.toLowerCase().includes(search);
        });
      }
      if (filters.length > 0) {
        console.log(filters);
        all = all.filter(function (movie) {
          return filters.every(function (f) {
            return movie[f[0]] === f[1];
          });
        });
      }
      MoviesList.renderList(all);
    }
  }, {
    key: "renderList",
    value: function renderList() {
      var movies = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var all = movies ? movies : getMoviesFromLocalStorage();
      if (all.length === 0 && !movies) {
        MoviesList.fetch().then(function (movieList) {
          return movieList.forEach(addToLocalStorage);
        }).then(MoviesList.renderList);
      }
      var html = all.length ? all.map(toBlock).join('') : '<div>Нет фильмов</div>';
      document.querySelector('#list').innerHTML = html;
    }
  }]);
}();
_defineProperty(MoviesList, "url", 'https://movie-app-b6690-default-rtdb.firebaseio.com/movieList.json');
_defineProperty(MoviesList, "apiKey", '2vOCQ1FAw6pAvfhXbj0lHyTsIdC9aP8DkAHJceEb');
function addToLocalStorage(movie) {
  var all = getMoviesFromLocalStorage();
  all.push(movie);
  localStorage.setItem('movies', JSON.stringify(all));
}
function getMoviesFromLocalStorage() {
  return JSON.parse(localStorage.getItem('movies') || '[]');
}
function toBlock(movie) {
  return new _movieElement.MovieElement(movie).toHTML();
}
},{"./movieElement":"classes/movieElement.js"}],"classes/filterMovie.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FilterMovie = void 0;
var _utils = require("../utils");
var _moviesList = require("./moviesList");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var FilterMovie = exports.FilterMovie = /*#__PURE__*/function () {
  function FilterMovie(selector) {
    _classCallCheck(this, FilterMovie);
    this.$el = document.querySelector(selector);
    this.createFilter();
  }
  return _createClass(FilterMovie, [{
    key: "createFilter",
    value: function createFilter() {
      var filterBlock = (0, _utils.generateFilter)();
      this.$el.addEventListener('submit', this.getFilters.bind(this));
      this.$el.append(filterBlock);
      document.querySelector('#clear').addEventListener('click', this.clear);
      document.querySelector('#filter-header').addEventListener('click', this.open);
    }
  }, {
    key: "open",
    value: function open() {
      var show = document.querySelector('.filter-form');
      show.classList.contains('show') ? show.classList.remove('show') : show.classList.add('show');
    }
  }, {
    key: "getFilters",
    value: function getFilters(e) {
      e.preventDefault();
      var formData = new FormData(e.target);
      var filters = [];
      var _iterator = _createForOfIteratorHelper(formData.entries()),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var pair = _step.value;
          if (pair[1] === '') {
            continue;
          }
          if (pair[0] === 'status') {
            pair[1] = true;
          }
          if (pair[0] === 'year') {
            pair[1] = +pair[1];
          }
          filters.push(pair);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      _moviesList.MoviesList.getMoviesWithFilters('', filters);
    }
  }, {
    key: "clear",
    value: function clear() {
      var dropdown = document.querySelector('.form-select');
      var search = document.querySelector('#search-input');
      search.value = '';
      dropdown.selectedIndex = 0;
      _moviesList.MoviesList.renderList();
    }
  }]);
}();
},{"../utils":"utils.js","./moviesList":"classes/moviesList.js"}],"classes/addMovie.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddMovie = void 0;
var _utils = require("../utils");
var _moviesList = require("./moviesList");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var AddMovie = exports.AddMovie = /*#__PURE__*/function () {
  function AddMovie(selector) {
    _classCallCheck(this, AddMovie);
    this.$el = document.querySelector(selector);
    this.createModal();
  }
  return _createClass(AddMovie, [{
    key: "createModal",
    value: function createModal() {
      var modal = (0, _utils.generateModal)((0, _utils.generateForm)());
      var attrs = {
        'data-bs-toggle': 'modal',
        'data-bs-target': '#open-modal'
      };
      var event = (0, _utils.fromObjectToAttribute)(document.querySelector('#add-movie'), attrs);
      this.$el.addEventListener('submit', this.add.bind(this));
      this.$el.append(modal);
    }
  }, {
    key: "add",
    value: function add(event) {
      event.preventDefault();
      var target = event.target;
      var newMovie = this.check(target);
      if (!newMovie) {
        this.clear(target);
        return '';
      }
      _moviesList.MoviesList.create(newMovie);
      this.clear(target);
    }
  }, {
    key: "check",
    value: function check(target) {
      var title = target.title.value.trim();
      var year = target.year.value;
      var url = target.url.value.trim();
      var description = target.description.value.trim();
      var genre = target.genre.value;
      var status = false;
      if (title === '' || description === '' || genre === 'Выберите жанр' || url === '') {
        return false;
      }
      return {
        title: title,
        year: year,
        url: url,
        description: description,
        genre: genre,
        status: status
      };
    }
  }, {
    key: "clear",
    value: function clear(target) {
      target.title.value = '';
      target.url.value = '';
      target.year.value = 2000;
      target.description.value = '';
      target.genre.selectedIndex = 0;
    }
  }]);
}();
},{"../utils":"utils.js","./moviesList":"classes/moviesList.js"}],"classes/app.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.App = void 0;
var _moviesList = require("./moviesList");
var _filterMovie = require("./filterMovie");
var _addMovie = require("./addMovie");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var App = exports.App = /*#__PURE__*/function () {
  function App() {
    _classCallCheck(this, App);
  }
  return _createClass(App, [{
    key: "init",
    value: function init() {
      window.addEventListener('load', _moviesList.MoviesList.renderList());
      document.querySelector('#search-btn').addEventListener('click', _moviesList.MoviesList.searchInList);
      document.querySelector('#refresh').addEventListener('click', _moviesList.MoviesList.refresh);
      document.querySelector('.list').addEventListener('click', _moviesList.MoviesList.updateStatus);
      new _filterMovie.FilterMovie('#filter');
      new _addMovie.AddMovie('#modal-window');
    }
  }]);
}();
},{"./moviesList":"classes/moviesList.js","./filterMovie":"classes/filterMovie.js","./addMovie":"classes/addMovie.js"}],"../../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;
function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }
  return bundleURL;
}
function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);
    if (matches) {
      return getBaseURL(matches[0]);
    }
  }
  return '/';
}
function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)?\/[^/]+(?:\?.*)?$/, '$1') + '/';
}
exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');
function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    link.remove();
  };
  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }
  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }
    cssTimeout = null;
  }, 50);
}
module.exports = reloadCSS;
},{"./bundle-url":"../../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"styles/style.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _app = require("./classes/app");
require("./styles/style.css");
new _app.App().init();
},{"./classes/app":"classes/app.js","./styles/style.css":"styles/style.css"}],"../../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "61222" + '/');
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
      });

      // Enable HMR for CSS by default.
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
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
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
},{}]},{},["../../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/src.e31bb0bc.js.map