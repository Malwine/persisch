module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "JkW7");
/******/ })
/************************************************************************/
/******/ ({

/***/ "/QC5":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subscribers", function() { return subscribers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCurrentUrl", function() { return getCurrentUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "route", function() { return route; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Router", function() { return Router; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Route", function() { return Route; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Link", function() { return Link; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);


var EMPTY$1 = {};

function assign(obj, props) {
	// eslint-disable-next-line guard-for-in
	for (var i in props) {
		obj[i] = props[i];
	}
	return obj;
}

function exec(url, route, opts) {
	var reg = /(?:\?([^#]*))?(#.*)?$/,
	    c = url.match(reg),
	    matches = {},
	    ret;
	if (c && c[1]) {
		var p = c[1].split('&');
		for (var i = 0; i < p.length; i++) {
			var r = p[i].split('=');
			matches[decodeURIComponent(r[0])] = decodeURIComponent(r.slice(1).join('='));
		}
	}
	url = segmentize(url.replace(reg, ''));
	route = segmentize(route || '');
	var max = Math.max(url.length, route.length);
	for (var i$1 = 0; i$1 < max; i$1++) {
		if (route[i$1] && route[i$1].charAt(0) === ':') {
			var param = route[i$1].replace(/(^\:|[+*?]+$)/g, ''),
			    flags = (route[i$1].match(/[+*?]+$/) || EMPTY$1)[0] || '',
			    plus = ~flags.indexOf('+'),
			    star = ~flags.indexOf('*'),
			    val = url[i$1] || '';
			if (!val && !star && (flags.indexOf('?') < 0 || plus)) {
				ret = false;
				break;
			}
			matches[param] = decodeURIComponent(val);
			if (plus || star) {
				matches[param] = url.slice(i$1).map(decodeURIComponent).join('/');
				break;
			}
		} else if (route[i$1] !== url[i$1]) {
			ret = false;
			break;
		}
	}
	if (opts.default !== true && ret === false) {
		return false;
	}
	return matches;
}

function pathRankSort(a, b) {
	return a.rank < b.rank ? 1 : a.rank > b.rank ? -1 : a.index - b.index;
}

// filter out VNodes without attributes (which are unrankeable), and add `index`/`rank` properties to be used in sorting.
function prepareVNodeForRanking(vnode, index) {
	vnode.index = index;
	vnode.rank = rankChild(vnode);
	return vnode.attributes;
}

function segmentize(url) {
	return url.replace(/(^\/+|\/+$)/g, '').split('/');
}

function rankSegment(segment) {
	return segment.charAt(0) == ':' ? 1 + '*+?'.indexOf(segment.charAt(segment.length - 1)) || 4 : 5;
}

function rank(path) {
	return segmentize(path).map(rankSegment).join('');
}

function rankChild(vnode) {
	return vnode.attributes.default ? 0 : rank(vnode.attributes.path);
}

var customHistory = null;

var ROUTERS = [];

var subscribers = [];

var EMPTY = {};

function isPreactElement(node) {
	return node.__preactattr_ != null || typeof Symbol !== 'undefined' && node[Symbol.for('preactattr')] != null;
}

function setUrl(url, type) {
	if (type === void 0) type = 'push';

	if (customHistory && customHistory[type]) {
		customHistory[type](url);
	} else if (typeof history !== 'undefined' && history[type + 'State']) {
		history[type + 'State'](null, null, url);
	}
}

function getCurrentUrl() {
	var url;
	if (customHistory && customHistory.location) {
		url = customHistory.location;
	} else if (customHistory && customHistory.getCurrentLocation) {
		url = customHistory.getCurrentLocation();
	} else {
		url = typeof location !== 'undefined' ? location : EMPTY;
	}
	return "" + (url.pathname || '') + (url.search || '');
}

function route(url, replace) {
	if (replace === void 0) replace = false;

	if (typeof url !== 'string' && url.url) {
		replace = url.replace;
		url = url.url;
	}

	// only push URL into history if we can handle it
	if (canRoute(url)) {
		setUrl(url, replace ? 'replace' : 'push');
	}

	return routeTo(url);
}

/** Check if the given URL can be handled by any router instances. */
function canRoute(url) {
	for (var i = ROUTERS.length; i--;) {
		if (ROUTERS[i].canRoute(url)) {
			return true;
		}
	}
	return false;
}

/** Tell all router instances to handle the given URL.  */
function routeTo(url) {
	var didRoute = false;
	for (var i = 0; i < ROUTERS.length; i++) {
		if (ROUTERS[i].routeTo(url) === true) {
			didRoute = true;
		}
	}
	for (var i$1 = subscribers.length; i$1--;) {
		subscribers[i$1](url);
	}
	return didRoute;
}

function routeFromLink(node) {
	// only valid elements
	if (!node || !node.getAttribute) {
		return;
	}

	var href = node.getAttribute('href'),
	    target = node.getAttribute('target');

	// ignore links with targets and non-path URLs
	if (!href || !href.match(/^\//g) || target && !target.match(/^_?self$/i)) {
		return;
	}

	// attempt to route, if no match simply cede control to browser
	return route(href);
}

function handleLinkClick(e) {
	if (e.button == 0) {
		routeFromLink(e.currentTarget || e.target || this);
		return prevent(e);
	}
}

function prevent(e) {
	if (e) {
		if (e.stopImmediatePropagation) {
			e.stopImmediatePropagation();
		}
		if (e.stopPropagation) {
			e.stopPropagation();
		}
		e.preventDefault();
	}
	return false;
}

function delegateLinkHandler(e) {
	// ignore events the browser takes care of already:
	if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey || e.button !== 0) {
		return;
	}

	var t = e.target;
	do {
		if (String(t.nodeName).toUpperCase() === 'A' && t.getAttribute('href') && isPreactElement(t)) {
			if (t.hasAttribute('native')) {
				return;
			}
			// if link is handled by the router, prevent browser defaults
			if (routeFromLink(t)) {
				return prevent(e);
			}
		}
	} while (t = t.parentNode);
}

var eventListenersInitialized = false;

function initEventListeners() {
	if (eventListenersInitialized) {
		return;
	}

	if (typeof addEventListener === 'function') {
		if (!customHistory) {
			addEventListener('popstate', function () {
				routeTo(getCurrentUrl());
			});
		}
		addEventListener('click', delegateLinkHandler);
	}
	eventListenersInitialized = true;
}

var Router = function (Component$$1) {
	function Router(props) {
		Component$$1.call(this, props);
		if (props.history) {
			customHistory = props.history;
		}

		this.state = {
			url: props.url || getCurrentUrl()
		};

		initEventListeners();
	}

	if (Component$$1) Router.__proto__ = Component$$1;
	Router.prototype = Object.create(Component$$1 && Component$$1.prototype);
	Router.prototype.constructor = Router;

	Router.prototype.shouldComponentUpdate = function shouldComponentUpdate(props) {
		if (props.static !== true) {
			return true;
		}
		return props.url !== this.props.url || props.onChange !== this.props.onChange;
	};

	/** Check if the given URL can be matched against any children */
	Router.prototype.canRoute = function canRoute(url) {
		return this.getMatchingChildren(this.props.children, url, false).length > 0;
	};

	/** Re-render children with a new URL to match against. */
	Router.prototype.routeTo = function routeTo(url) {
		this._didRoute = false;
		this.setState({ url: url });

		// if we're in the middle of an update, don't synchronously re-route.
		if (this.updating) {
			return this.canRoute(url);
		}

		this.forceUpdate();
		return this._didRoute;
	};

	Router.prototype.componentWillMount = function componentWillMount() {
		ROUTERS.push(this);
		this.updating = true;
	};

	Router.prototype.componentDidMount = function componentDidMount() {
		var this$1 = this;

		if (customHistory) {
			this.unlisten = customHistory.listen(function (location) {
				this$1.routeTo("" + (location.pathname || '') + (location.search || ''));
			});
		}
		this.updating = false;
	};

	Router.prototype.componentWillUnmount = function componentWillUnmount() {
		if (typeof this.unlisten === 'function') {
			this.unlisten();
		}
		ROUTERS.splice(ROUTERS.indexOf(this), 1);
	};

	Router.prototype.componentWillUpdate = function componentWillUpdate() {
		this.updating = true;
	};

	Router.prototype.componentDidUpdate = function componentDidUpdate() {
		this.updating = false;
	};

	Router.prototype.getMatchingChildren = function getMatchingChildren(children, url, invoke) {
		return children.filter(prepareVNodeForRanking).sort(pathRankSort).map(function (vnode) {
			var matches = exec(url, vnode.attributes.path, vnode.attributes);
			if (matches) {
				if (invoke !== false) {
					var newProps = { url: url, matches: matches };
					assign(newProps, matches);
					delete newProps.ref;
					delete newProps.key;
					return Object(__WEBPACK_IMPORTED_MODULE_0_preact__["cloneElement"])(vnode, newProps);
				}
				return vnode;
			}
		}).filter(Boolean);
	};

	Router.prototype.render = function render(ref, ref$1) {
		var children = ref.children;
		var onChange = ref.onChange;
		var url = ref$1.url;

		var active = this.getMatchingChildren(children, url, true);

		var current = active[0] || null;
		this._didRoute = !!current;

		var previous = this.previousUrl;
		if (url !== previous) {
			this.previousUrl = url;
			if (typeof onChange === 'function') {
				onChange({
					router: this,
					url: url,
					previous: previous,
					active: active,
					current: current
				});
			}
		}

		return current;
	};

	return Router;
}(__WEBPACK_IMPORTED_MODULE_0_preact__["Component"]);

var Link = function Link(props) {
	return Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('a', assign({ onClick: handleLinkClick }, props));
};

var Route = function Route(props) {
	return Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(props.component, props);
};

Router.subscribers = subscribers;
Router.getCurrentUrl = getCurrentUrl;
Router.route = route;
Router.Router = Router;
Router.Route = Route;
Router.Link = Link;

/* harmony default export */ __webpack_exports__["default"] = (Router);
//# sourceMappingURL=preact-router.es.js.map

/***/ }),

/***/ "JkW7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./style/index.css
var style = __webpack_require__("rq4c");
var style_default = /*#__PURE__*/__webpack_require__.n(style);

// EXTERNAL MODULE: ../node_modules/preact/dist/preact.min.js
var preact_min = __webpack_require__("KM04");
var preact_min_default = /*#__PURE__*/__webpack_require__.n(preact_min);

// EXTERNAL MODULE: ../node_modules/preact-router/dist/preact-router.es.js
var preact_router_es = __webpack_require__("/QC5");

// CONCATENATED MODULE: ./lib/flashcards.js
var flashcards_data = void 0;

var flashcards_currentSet = void 0;
var currentCard = void 0;
var previousCardIndex = void 0;
var randomCardIndex = void 0;
var maxMemoryRate = 3;

function restoreState(currentSetIndex, currentCardIndex, currentData) {
  flashcards_data = currentData;
  flashcards_currentSet = flashcards_data.sets[currentSetIndex];
  currentCard = flashcards_currentSet.cards[currentCardIndex];
}

function saveProgress() {
  if (typeof window !== "undefined" && window.localStorage) {
    localStorage.setItem('progress', JSON.stringify(flashcards_data));
  }
}

function resetAllData() {
  localStorage.removeItem('progress');
}

function restoreProgress(defaultData) {
  if (typeof window !== "undefined" && window.localStorage) {
    if (!localStorage.getItem('progress')) {
      localStorage.setItem('progress', JSON.stringify(defaultData));
    }
    return JSON.parse(localStorage.getItem('progress'));
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// TODO: This function will be replaced the actual answer input
function randomAnswer() {
  return Math.random() >= 0.2;
}

function start(responseData, setIndex) {
  flashcards_data = responseData;
  pickSet(setIndex);
  return pickCardRandom();
}

function pickSet(index) {
  flashcards_currentSet = flashcards_data.sets[index];
}

function hasValidMemoryRate(card) {
  return card.memoryRate < maxMemoryRate || card.memoryRate === undefined;
}

function checkPreviousAndMemoryRate(index, currentCard) {
  var cardValid = index !== previousCardIndex && hasValidMemoryRate(currentCard);
  console.log("Card: ", currentCard.front, "| Is valid:", cardValid, "| memoryRate: ", currentCard.memoryRate, "| maxMemoryRate: ", maxMemoryRate);
  return cardValid;
}

function processAnswer(answer, card, set) {
  card.memoryRate += answer;
  if (answer === 1) {
    set.progressRate += 1;
  }
  return checkRemainingCards(set);
}

function pickCardRandom() {
  var cards = flashcards_currentSet.cards;

  // Choose one random card from the set
  randomCardIndex = getRandomInt(cards.length);
  currentCard = cards[randomCardIndex];

  // Check if chosen cards is valid
  if (checkPreviousAndMemoryRate(randomCardIndex, currentCard)) {
    previousCardIndex = randomCardIndex;

    // Assign memoryRate 0 if there is no memoryRate yet
    currentCard.memoryRate = currentCard.memoryRate || 0;
    return randomCardIndex;

    //show back and answer buttons
    //processAnswer(currentCard, cards)
  } else {
    // Pick another card if not valid
    return pickCardRandom();
  }
}

function checkRemainingCards(set) {
  var cards = set.cards;
  console.log(currentCard.front, "MemoryRate is: ", currentCard.memoryRate);

  // Reset maxMemoryRate to enable last card to be chosen
  maxMemoryRate = 3;

  // Loop and find out how many cards are left
  var cardsLeft = cards.filter(hasValidMemoryRate);
  console.log("CARDS LEFT: ", cardsLeft.length);

  if (cardsLeft.length > 1) {
    // Case 0: more then one valid card is left
    return pickCardRandom();
  } else if (cardsLeft.length === 1) {
    // Case 1: exactly 1 card left
    if (cardsLeft[0] === currentCard) {
      var remainingCards = cards.filter(function (card) {
        return card !== currentCard;
      });
      var memoryRates = remainingCards.map(function (card) {
        return card.memoryRate;
      });
      var max = Math.min.apply(null, memoryRates);

      maxMemoryRate = max + 1;
      console.log("The new maxMemoryRate is: ", maxMemoryRate);
    }
    return pickCardRandom();
  } else {
    // Case 2: no cards left, user may reset
    alert("Congrats! You learned everything!");
  }
}

function getProgressForSet(set) {
  set.progressRate = set.progressRate || 0;
  var learningRateSum = set.cards.length * 3;
  return set.progressRate / learningRateSum * 100;
}

function flashcards_reset(set) {
  set.cards.forEach(function (card) {
    card.memoryRate = 0;
  });
  previousCardIndex = undefined;
  maxMemoryRate = 3;
  set.progressRate = 0;
}
// EXTERNAL MODULE: ../node_modules/preact-router/match.js
var match = __webpack_require__("sw5u");
var match_default = /*#__PURE__*/__webpack_require__.n(match);

// EXTERNAL MODULE: ./components/header/style.css
var header_style = __webpack_require__("u3et");
var header_style_default = /*#__PURE__*/__webpack_require__.n(header_style);

// CONCATENATED MODULE: ./components/header/index.js





var header__ref2 = Object(preact_min["h"])(
	'h1',
	null,
	'Flashcards'
);

var header_Header = function Header(_ref) {
	var backButtonLocation = _ref.backButtonLocation;
	return Object(preact_min["h"])(
		'header',
		{ 'class': header_style_default.a.header },
		backButtonLocation ? Object(preact_min["h"])(
			match["Link"],
			{ 'class': header_style_default.a.arrow, href: backButtonLocation },
			Object(preact_min["h"])('img', { 'class': header_style_default.a.arrow, src: '../../assets/icons/arrow.png' })
		) : Object(preact_min["h"])('div', { 'class': header_style_default.a.space }),
		Object(preact_min["h"])(
			match["Link"],
			{ 'class': header_style_default.a.name, href: '/' },
			header__ref2
		),
		Object(preact_min["h"])(
			match["Link"],
			{ activeClassName: header_style_default.a.active, href: '/sets' },
			'Sets'
		)
	);
};

/* harmony default export */ var header = (header_Header);
// EXTERNAL MODULE: ./routes/sets/style.css
var sets_style = __webpack_require__("jnUQ");
var sets_style_default = /*#__PURE__*/__webpack_require__.n(sets_style);

// EXTERNAL MODULE: ./components/box/style.css
var box_style = __webpack_require__("ohqm");
var box_style_default = /*#__PURE__*/__webpack_require__.n(box_style);

// CONCATENATED MODULE: ./components/box/index.js


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var box_Box = function (_Component) {
  _inherits(Box, _Component);

  function Box() {
    var _temp, _this, _ret;

    _classCallCheck(this, Box);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.handleStartClick = function () {
      Object(preact_router_es["route"])(_this.props.link);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Box.prototype.render = function render(_ref) {
    var link = _ref.link,
        headline = _ref.headline,
        description = _ref.description,
        back = _ref.back,
        smaller = _ref.smaller,
        progressStatus = _ref.progressStatus,
        handleClick = _ref.handleClick;


    var buttonText = progressStatus >= 100 ? "COMPLETED " : progressStatus > 0 ? 'RESUME (' + Number(progressStatus.toFixed(1)) + ' %)' : "LEARN";

    return Object(preact_min["h"])(
      'div',
      { 'class': smaller && back ? [box_style_default.a.box, box_style_default.a.smaller, box_style_default.a.gray].join(' ') : smaller ? [box_style_default.a.box, box_style_default.a.smaller].join(' ') : back ? [box_style_default.a.box, box_style_default.a.gray].join(' ') : box_style_default.a.box,
        onClick: handleClick },
      headline && Object(preact_min["h"])(
        'h2',
        { 'class': box_style_default.a.headline },
        headline
      ),
      description && Object(preact_min["h"])(
        'p',
        { 'class': box_style_default.a.subline },
        description
      ),
      progressStatus && Object(preact_min["h"])(
        'button',
        { 'class': box_style_default.a.button, onClick: this.handleStartClick },
        buttonText
      )
    );
  };

  return Box;
}(preact_min["Component"]);


// CONCATENATED MODULE: ./routes/sets/index.js


function sets__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function sets__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function sets__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var sets__ref2 = Object(preact_min["h"])(
	'h2',
	null,
	'Sets'
);

var sets_Sets = function (_Component) {
	sets__inherits(Sets, _Component);

	function Sets() {
		var _temp, _this, _ret;

		sets__classCallCheck(this, Sets);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = sets__possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.progressForSet = function (set) {
			var progress = getProgressForSet(set);
			if (progress === undefined || progress === 0) {
				return "0";
			} else {
				return progress;
			}
		}, _temp), sets__possibleConstructorReturn(_this, _ret);
	}

	Sets.prototype.render = function render(_ref) {
		var _this2 = this;

		var data = _ref.data;

		return Object(preact_min["h"])(
			'div',
			{ 'class': sets_style_default.a.sets },
			sets__ref2,
			Object(preact_min["h"])(
				'ul',
				{ 'class': sets_style_default.a.list },
				data.sets.map(function (set, index) {
					return Object(preact_min["h"])(
						'li',
						null,
						Object(preact_min["h"])(box_Box, { link: '/sets/' + index, headline: set.name, description: set.description, progressStatus: _this2.progressForSet(set) })
					);
				})
			)
		);
	};

	return Sets;
}(preact_min["Component"]);


// EXTERNAL MODULE: ./routes/set/style.css
var set_style = __webpack_require__("qtum");
var set_style_default = /*#__PURE__*/__webpack_require__.n(set_style);

// CONCATENATED MODULE: ./routes/set/index.js


function set__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function set__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function set__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







var set__ref2 = Object(preact_min["h"])(
	'p',
	null,
	'Included words:'
);

var set_Set = function (_Component) {
	set__inherits(Set, _Component);

	function Set() {
		var _temp, _this, _ret;

		set__classCallCheck(this, Set);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = set__possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.handleStartClick = function () {
			var cardIndex = start(_this.props.data, _this.props.set);
			Object(preact_router_es["route"])('/sets/' + _this.props.set + '/cards/' + cardIndex);
		}, _this.handleResetClick = function () {
			var currentSet = _this.props.data.sets[_this.props.set];
			if (confirm("Do you want to reset your progress?")) {
				flashcards_reset(currentSet);
			}
			_this.forceUpdate();
		}, _temp), set__possibleConstructorReturn(_this, _ret);
	}

	Set.prototype.render = function render(_ref) {
		var data = _ref.data,
		    setIndex = _ref.set;

		var set = data.sets[setIndex];
		var progress = getProgressForSet(set);

		return Object(preact_min["h"])(
			'div',
			{ 'class': set_style_default.a.spacing },
			Object(preact_min["h"])(
				'h2',
				null,
				set.name
			),
			Object(preact_min["h"])(
				'p',
				{ 'class': set_style_default.a.subline },
				set.description
			),
			progress >= 100 ? Object(preact_min["h"])(
				'div',
				{ 'class': set_style_default.a.finished },
				'\u2713 Completed'
			) : progress > 0 ? Object(preact_min["h"])(
				'button',
				{ 'class': [set_style_default.a.button, set_style_default.a.buttonPrimary].join(' '),
					onClick: this.handleStartClick },
				'Resume'
			) : Object(preact_min["h"])(
				'button',
				{ 'class': [set_style_default.a.button, set_style_default.a.buttonPrimary].join(' '),
					onClick: this.handleStartClick },
				'Start'
			),
			set__ref2,
			Object(preact_min["h"])(
				'ul',
				{ 'class': set_style_default.a.list },
				set.cards.map(function (card, index) {
					return Object(preact_min["h"])(
						'li',
						{ 'class': set_style_default.a.cardWrap },
						Object(preact_min["h"])(
							'div',
							null,
							card.front
						),
						Object(preact_min["h"])(
							'div',
							{ 'class': set_style_default.a.left },
							card.back
						)
					);
				})
			),
			Object(preact_min["h"])(
				'button',
				{
					'class': [set_style_default.a.button, set_style_default.a.resetButton].join(' '),
					onClick: this.handleResetClick },
				'Reset progress'
			)
		);
	};

	return Set;
}(preact_min["Component"]);


// EXTERNAL MODULE: ./routes/card/style.css
var card_style = __webpack_require__("k2Bm");
var card_style_default = /*#__PURE__*/__webpack_require__.n(card_style);

// CONCATENATED MODULE: ./routes/card/index.js


function card__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function card__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function card__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







var card__ref = Object(preact_min["h"])(
	'h3',
	null,
	'Did you know it?'
);

var card_Card = function (_Component) {
	card__inherits(Card, _Component);

	function Card() {
		var _temp, _this, _ret;

		card__classCallCheck(this, Card);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = card__possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
			flipped: false,
			solutionSeen: false
		}, _this.allCards = function () {
			return _this.props.data.sets[_this.props.set].cards;
		}, _this.currentCard = function () {
			return _this.allCards()[_this.props.card];
		}, _this.currentSet = function () {
			return _this.props.data.sets[_this.props.set];
		}, _this.handleClick = function (memoryRateChange) {
			var nextCardIndex = processAnswer(memoryRateChange, _this.currentCard(), _this.currentSet());
			saveProgress();
			if (nextCardIndex === undefined) {
				Object(preact_router_es["route"])('/sets');
			} else {
				Object(preact_router_es["route"])('/sets/' + _this.props.set + '/cards/' + nextCardIndex);
			}
			_this.setState({ flipped: false });
		}, _this.handleKnownClick = function () {
			_this.handleClick(1);
			_this.setState({ solutionSeen: false });
		}, _this.handleNotKnowClick = function () {
			//Originally I substracted 1 but now I want to go with 0
			_this.handleClick(0);
		}, _this.handleTurn = function () {
			var flipped = _this.state.flipped;

			_this.setState({
				flipped: !flipped,
				solutionSeen: true });
		}, _this.renderBack = function (back, backDescription) {
			return Object(preact_min["h"])(
				'div',
				null,
				Object(preact_min["h"])(box_Box, { headline: back,
					description: backDescription,
					back: true,
					handleClick: _this.handleTurn })
			);
		}, _this.renderFront = function (front, frontDescription) {
			var solutionSeen = _this.state.solutionSeen;

			return Object(preact_min["h"])(
				'div',
				null,
				Object(preact_min["h"])(box_Box, { headline: front, description: frontDescription, handleClick: _this.handleTurn }),
				!solutionSeen && Object(preact_min["h"])(
					'p',
					{ 'class': card_style_default.a.hint },
					'Think about it and tap on the card to flip it.'
				)
			);
		}, _this.renderButtons = function () {
			return Object(preact_min["h"])(
				'div',
				null,
				card__ref,
				Object(preact_min["h"])(
					'div',
					null,
					Object(preact_min["h"])(
						'button',
						{
							'class': card_style_default.a.button,
							onClick: _this.handleKnownClick },
						'YES'
					),
					Object(preact_min["h"])(
						'button',
						{
							'class': card_style_default.a.button,
							onClick: _this.handleNotKnowClick },
						'NO'
					)
				)
			);
		}, _temp), card__possibleConstructorReturn(_this, _ret);
	}

	Card.prototype.componentDidMount = function componentDidMount() {
		restoreState(this.props.set, this.props.card, this.props.data);
	};

	Card.prototype.render = function render(_ref2) {
		var data = _ref2.data,
		    setIndex = _ref2.set,
		    cardIndex = _ref2.card;

		var set = data.sets[setIndex];
		var setName = set.name;
		var flipped = this.state.flipped;
		var card = set.cards[cardIndex];
		var solutionSeen = this.state.solutionSeen;

		return Object(preact_min["h"])(
			'div',
			{ 'class': card_style_default.a.spacing },
			Object(preact_min["h"])(
				'h2',
				{ 'class': card_style_default.a.setName },
				setName
			),
			Object(preact_min["h"])('progress', { max: '100', value: getProgressForSet(this.currentSet()) }),
			flipped && this.renderBack(card.back, card.backDescription),
			!flipped && this.renderFront(card.front, card.frontDescription),
			solutionSeen && this.renderButtons()
		);
	};

	return Card;
}(preact_min["Component"]);


// EXTERNAL MODULE: ./routes/home/style.css
var home_style = __webpack_require__("ZAL5");
var home_style_default = /*#__PURE__*/__webpack_require__.n(home_style);

// CONCATENATED MODULE: ./routes/home/index.js






var home__ref2 = Object(preact_min["h"])(
	'h2',
	null,
	'Learn wherever you go!'
);

var _ref3 = Object(preact_min["h"])(
	'p',
	null,
	'Flashcards is a web app that helps you practice your vocabulary wherever you go. Learn on your way to school or work. The app will be available independent of your internet connection.'
);

var _ref4 = Object(preact_min["h"])(box_Box, { headline: "four", smaller: true });

var _ref5 = Object(preact_min["h"])(box_Box, { headline: "چهار", description: "(۴) shahar", back: true, smaller: true });

var home_Home = function Home(_ref) {
	var handleResetAllDataClick = _ref.handleResetAllDataClick;
	return Object(preact_min["h"])(
		'div',
		{ 'class': home_style_default.a.home },
		home__ref2,
		Object(preact_min["h"])(
			'div',
			{ 'class': home_style_default.a.aboveBox },
			_ref3
		),
		_ref4,
		_ref5,
		Object(preact_min["h"])(
			'div',
			{ 'class': home_style_default.a.belowBox },
			Object(preact_min["h"])(
				'p',
				null,
				'Check out the ',
				Object(preact_min["h"])(
					match["Link"],
					{ 'class': home_style_default.a.link, href: '/sets' },
					'sample sets'
				),
				'. Soon you will be able to create your own. Add the app to your home screen and start learning.'
			),
			Object(preact_min["h"])(
				'p',
				null,
				'This app was built by ',
				Object(preact_min["h"])(
					'a',
					{ 'class': home_style_default.a.link, href: 'https://twitter.com/malweene' },
					'Malwine'
				),
				'.'
			)
		),
		Object(preact_min["h"])(
			'button',
			{
				'class': home_style_default.a.button,
				onClick: handleResetAllDataClick },
			'Reset all data'
		)
	);
};

/* harmony default export */ var home = (home_Home);
// EXTERNAL MODULE: ./data.json
var data_0 = __webpack_require__("wAIJ");
var data_default = /*#__PURE__*/__webpack_require__.n(data_0);

// CONCATENATED MODULE: ./components/app.js


function app__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function app__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function app__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







// Code-splitting is automated for routes







var app_App = function (_Component) {
	app__inherits(App, _Component);

	function App() {
		var _temp, _this, _ret;

		app__classCallCheck(this, App);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = app__possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.handleRoute = function (e) {
			_this.currentUrl = e.url;
			switch (e.url) {
				case "/":
					_this.setState({ previousUrl: null });
					break;
				case "/sets":
					_this.setState({ previousUrl: "/" });
					break;
				default:
					{
						var setUrl = e.url.match(/\/sets\/\d/)[0];
						if (e.url.match(/\/sets\/\d+$/)) {
							_this.setState({ previousUrl: "/sets" });
						} else if (e.url.match(/\/sets\/\d+\/cards\/\d+/)) {
							_this.setState({ previousUrl: setUrl });
						} else {
							_this.setState({ previousUrl: null });
						}
					}
			}
		}, _this.restoreData = function () {
			_this.setState({ data: restoreProgress(data_default.a) });
		}, _this.handleResetAllDataClick = function () {
			if (confirm("Do you want to reset all data?")) {
				resetAllData();
				_this.setState({ data: null });
				_this.restoreData();
			}
		}, _temp), app__possibleConstructorReturn(_this, _ret);
	}

	/** Gets fired when the route changes.
  *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
  *	@param {string} event.url	The newly routed URL
  */


	App.prototype.componentWillMount = function componentWillMount() {
		this.restoreData();
	};

	App.prototype.render = function render(props, state) {
		return Object(preact_min["h"])(
			'div',
			{ id: 'app' },
			Object(preact_min["h"])(header, { backButtonLocation: this.state.previousUrl }),
			Object(preact_min["h"])(
				preact_router_es["Router"],
				{ onChange: this.handleRoute },
				Object(preact_min["h"])(home, { 'default': true, path: '/', handleResetAllDataClick: this.handleResetAllDataClick }),
				Object(preact_min["h"])(sets_Sets, { path: '/sets', data: state.data }),
				Object(preact_min["h"])(set_Set, { path: '/sets/:set', data: state.data }),
				Object(preact_min["h"])(card_Card, { path: '/sets/:set/cards/:card', data: state.data })
			)
		);
	};

	return App;
}(preact_min["Component"]);


// CONCATENATED MODULE: ./index.js



/* harmony default export */ var index_0 = __webpack_exports__["default"] = (app_App);

/***/ }),

/***/ "KM04":
/***/ (function(module, exports, __webpack_require__) {

!function () {
  "use strict";
  function e(e, t) {
    var n,
        o,
        r,
        i,
        l = W;for (i = arguments.length; i-- > 2;) {
      P.push(arguments[i]);
    }t && null != t.children && (P.length || P.push(t.children), delete t.children);while (P.length) {
      if ((o = P.pop()) && void 0 !== o.pop) for (i = o.length; i--;) {
        P.push(o[i]);
      } else "boolean" == typeof o && (o = null), (r = "function" != typeof e) && (null == o ? o = "" : "number" == typeof o ? o += "" : "string" != typeof o && (r = !1)), r && n ? l[l.length - 1] += o : l === W ? l = [o] : l.push(o), n = r;
    }var a = new T();return a.nodeName = e, a.children = l, a.attributes = null == t ? void 0 : t, a.key = null == t ? void 0 : t.key, void 0 !== M.vnode && M.vnode(a), a;
  }function t(e, t) {
    for (var n in t) {
      e[n] = t[n];
    }return e;
  }function n(e, t) {
    null != e && ("function" == typeof e ? e(t) : e.current = t);
  }function o(n, o) {
    return e(n.nodeName, t(t({}, n.attributes), o), arguments.length > 2 ? [].slice.call(arguments, 2) : n.children);
  }function r(e) {
    !e.__d && (e.__d = !0) && 1 == V.push(e) && (M.debounceRendering || D)(i);
  }function i() {
    var e;while (e = V.pop()) {
      e.__d && x(e);
    }
  }function l(e, t, n) {
    return "string" == typeof t || "number" == typeof t ? void 0 !== e.splitText : "string" == typeof t.nodeName ? !e._componentConstructor && a(e, t.nodeName) : n || e._componentConstructor === t.nodeName;
  }function a(e, t) {
    return e.__n === t || e.nodeName.toLowerCase() === t.toLowerCase();
  }function u(e) {
    var n = t({}, e.attributes);n.children = e.children;var o = e.nodeName.defaultProps;if (void 0 !== o) for (var r in o) {
      void 0 === n[r] && (n[r] = o[r]);
    }return n;
  }function c(e, t) {
    var n = t ? document.createElementNS("http://www.w3.org/2000/svg", e) : document.createElement(e);return n.__n = e, n;
  }function p(e) {
    var t = e.parentNode;t && t.removeChild(e);
  }function s(e, t, o, r, i) {
    if ("className" === t && (t = "class"), "key" === t) ;else if ("ref" === t) n(o, null), n(r, e);else if ("class" !== t || i) {
      if ("style" === t) {
        if (r && "string" != typeof r && "string" != typeof o || (e.style.cssText = r || ""), r && "object" == typeof r) {
          if ("string" != typeof o) for (var l in o) {
            l in r || (e.style[l] = "");
          }for (var l in r) {
            e.style[l] = "number" == typeof r[l] && !1 === E.test(l) ? r[l] + "px" : r[l];
          }
        }
      } else if ("dangerouslySetInnerHTML" === t) r && (e.innerHTML = r.__html || "");else if ("o" == t[0] && "n" == t[1]) {
        var a = t !== (t = t.replace(/Capture$/, ""));t = t.toLowerCase().substring(2), r ? o || e.addEventListener(t, _, a) : e.removeEventListener(t, _, a), (e.__l || (e.__l = {}))[t] = r;
      } else if ("list" !== t && "type" !== t && !i && t in e) {
        try {
          e[t] = null == r ? "" : r;
        } catch (e) {}null != r && !1 !== r || "spellcheck" == t || e.removeAttribute(t);
      } else {
        var u = i && t !== (t = t.replace(/^xlink:?/, ""));null == r || !1 === r ? u ? e.removeAttributeNS("http://www.w3.org/1999/xlink", t.toLowerCase()) : e.removeAttribute(t) : "function" != typeof r && (u ? e.setAttributeNS("http://www.w3.org/1999/xlink", t.toLowerCase(), r) : e.setAttribute(t, r));
      }
    } else e.className = r || "";
  }function _(e) {
    return this.__l[e.type](M.event && M.event(e) || e);
  }function f() {
    var e;while (e = A.shift()) {
      M.afterMount && M.afterMount(e), e.componentDidMount && e.componentDidMount();
    }
  }function d(e, t, n, o, r, i) {
    H++ || (R = null != r && void 0 !== r.ownerSVGElement, B = null != e && !("__preactattr_" in e));var l = h(e, t, n, o, i);return r && l.parentNode !== r && r.appendChild(l), --H || (B = !1, i || f()), l;
  }function h(e, t, n, o, r) {
    var i = e,
        l = R;if (null != t && "boolean" != typeof t || (t = ""), "string" == typeof t || "number" == typeof t) return e && void 0 !== e.splitText && e.parentNode && (!e._component || r) ? e.nodeValue != t && (e.nodeValue = t) : (i = document.createTextNode(t), e && (e.parentNode && e.parentNode.replaceChild(i, e), v(e, !0))), i.__preactattr_ = !0, i;var u = t.nodeName;if ("function" == typeof u) return N(e, t, n, o);if (R = "svg" === u || "foreignObject" !== u && R, u += "", (!e || !a(e, u)) && (i = c(u, R), e)) {
      while (e.firstChild) {
        i.appendChild(e.firstChild);
      }e.parentNode && e.parentNode.replaceChild(i, e), v(e, !0);
    }var p = i.firstChild,
        s = i.__preactattr_,
        _ = t.children;if (null == s) {
      s = i.__preactattr_ = {};for (var f = i.attributes, d = f.length; d--;) {
        s[f[d].name] = f[d].value;
      }
    }return !B && _ && 1 === _.length && "string" == typeof _[0] && null != p && void 0 !== p.splitText && null == p.nextSibling ? p.nodeValue != _[0] && (p.nodeValue = _[0]) : (_ && _.length || null != p) && m(i, _, n, o, B || null != s.dangerouslySetInnerHTML), y(i, t.attributes, s), R = l, i;
  }function m(e, t, n, o, r) {
    var i,
        a,
        u,
        c,
        s,
        _ = e.childNodes,
        f = [],
        d = {},
        m = 0,
        b = 0,
        y = _.length,
        g = 0,
        w = t ? t.length : 0;if (0 !== y) for (var C = 0; C < y; C++) {
      var x = _[C],
          N = x.__preactattr_,
          k = w && N ? x._component ? x._component.__k : N.key : null;null != k ? (m++, d[k] = x) : (N || (void 0 !== x.splitText ? !r || x.nodeValue.trim() : r)) && (f[g++] = x);
    }if (0 !== w) for (var C = 0; C < w; C++) {
      c = t[C], s = null;var k = c.key;if (null != k) m && void 0 !== d[k] && (s = d[k], d[k] = void 0, m--);else if (b < g) for (i = b; i < g; i++) {
        if (void 0 !== f[i] && l(a = f[i], c, r)) {
          s = a, f[i] = void 0, i === g - 1 && g--, i === b && b++;break;
        }
      }s = h(s, c, n, o), u = _[C], s && s !== e && s !== u && (null == u ? e.appendChild(s) : s === u.nextSibling ? p(u) : e.insertBefore(s, u));
    }if (m) for (var C in d) {
      void 0 !== d[C] && v(d[C], !1);
    }while (b <= g) {
      void 0 !== (s = f[g--]) && v(s, !1);
    }
  }function v(e, t) {
    var o = e._component;o ? k(o) : (null != e.__preactattr_ && n(e.__preactattr_.ref, null), !1 !== t && null != e.__preactattr_ || p(e), b(e));
  }function b(e) {
    e = e.lastChild;while (e) {
      var t = e.previousSibling;v(e, !0), e = t;
    }
  }function y(e, t, n) {
    var o;for (o in n) {
      t && null != t[o] || null == n[o] || s(e, o, n[o], n[o] = void 0, R);
    }for (o in t) {
      "children" === o || "innerHTML" === o || o in n && t[o] === ("value" === o || "checked" === o ? e[o] : n[o]) || s(e, o, n[o], n[o] = t[o], R);
    }
  }function g(e, t, n) {
    var o,
        r = F.length;e.prototype && e.prototype.render ? (o = new e(t, n), U.call(o, t, n)) : (o = new U(t, n), o.constructor = e, o.render = w);while (r--) {
      if (F[r].constructor === e) return o.__b = F[r].__b, F.splice(r, 1), o;
    }return o;
  }function w(e, t, n) {
    return this.constructor(e, n);
  }function C(e, t, o, i, l) {
    e.__x || (e.__x = !0, e.__r = t.ref, e.__k = t.key, delete t.ref, delete t.key, void 0 === e.constructor.getDerivedStateFromProps && (!e.base || l ? e.componentWillMount && e.componentWillMount() : e.componentWillReceiveProps && e.componentWillReceiveProps(t, i)), i && i !== e.context && (e.__c || (e.__c = e.context), e.context = i), e.__p || (e.__p = e.props), e.props = t, e.__x = !1, 0 !== o && (1 !== o && !1 === M.syncComponentUpdates && e.base ? r(e) : x(e, 1, l)), n(e.__r, e));
  }function x(e, n, o, r) {
    if (!e.__x) {
      var i,
          l,
          a,
          c = e.props,
          p = e.state,
          s = e.context,
          _ = e.__p || c,
          h = e.__s || p,
          m = e.__c || s,
          b = e.base,
          y = e.__b,
          w = b || y,
          N = e._component,
          U = !1,
          S = m;if (e.constructor.getDerivedStateFromProps && (p = t(t({}, p), e.constructor.getDerivedStateFromProps(c, p)), e.state = p), b && (e.props = _, e.state = h, e.context = m, 2 !== n && e.shouldComponentUpdate && !1 === e.shouldComponentUpdate(c, p, s) ? U = !0 : e.componentWillUpdate && e.componentWillUpdate(c, p, s), e.props = c, e.state = p, e.context = s), e.__p = e.__s = e.__c = e.__b = null, e.__d = !1, !U) {
        i = e.render(c, p, s), e.getChildContext && (s = t(t({}, s), e.getChildContext())), b && e.getSnapshotBeforeUpdate && (S = e.getSnapshotBeforeUpdate(_, h));var L,
            T,
            P = i && i.nodeName;if ("function" == typeof P) {
          var W = u(i);l = N, l && l.constructor === P && W.key == l.__k ? C(l, W, 1, s, !1) : (L = l, e._component = l = g(P, W, s), l.__b = l.__b || y, l.__u = e, C(l, W, 0, s, !1), x(l, 1, o, !0)), T = l.base;
        } else a = w, L = N, L && (a = e._component = null), (w || 1 === n) && (a && (a._component = null), T = d(a, i, s, o || !b, w && w.parentNode, !0));if (w && T !== w && l !== N) {
          var D = w.parentNode;D && T !== D && (D.replaceChild(T, w), L || (w._component = null, v(w, !1)));
        }if (L && k(L), e.base = T, T && !r) {
          var E = e,
              V = e;while (V = V.__u) {
            (E = V).base = T;
          }T._component = E, T._componentConstructor = E.constructor;
        }
      }!b || o ? A.push(e) : U || (e.componentDidUpdate && e.componentDidUpdate(_, h, S), M.afterUpdate && M.afterUpdate(e));while (e.__h.length) {
        e.__h.pop().call(e);
      }H || r || f();
    }
  }function N(e, t, n, o) {
    var r = e && e._component,
        i = r,
        l = e,
        a = r && e._componentConstructor === t.nodeName,
        c = a,
        p = u(t);while (r && !c && (r = r.__u)) {
      c = r.constructor === t.nodeName;
    }return r && c && (!o || r._component) ? (C(r, p, 3, n, o), e = r.base) : (i && !a && (k(i), e = l = null), r = g(t.nodeName, p, n), e && !r.__b && (r.__b = e, l = null), C(r, p, 1, n, o), e = r.base, l && e !== l && (l._component = null, v(l, !1))), e;
  }function k(e) {
    M.beforeUnmount && M.beforeUnmount(e);var t = e.base;e.__x = !0, e.componentWillUnmount && e.componentWillUnmount(), e.base = null;var o = e._component;o ? k(o) : t && (null != t.__preactattr_ && n(t.__preactattr_.ref, null), e.__b = t, p(t), F.push(e), b(t)), n(e.__r, null);
  }function U(e, t) {
    this.__d = !0, this.context = t, this.props = e, this.state = this.state || {}, this.__h = [];
  }function S(e, t, n) {
    return d(n, e, {}, !1, t, !1);
  }function L() {
    return {};
  }var T = function T() {},
      M = {},
      P = [],
      W = [],
      D = "function" == typeof Promise ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout,
      E = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,
      V = [],
      A = [],
      H = 0,
      R = !1,
      B = !1,
      F = [];t(U.prototype, { setState: function setState(e, n) {
      this.__s || (this.__s = this.state), this.state = t(t({}, this.state), "function" == typeof e ? e(this.state, this.props) : e), n && this.__h.push(n), r(this);
    }, forceUpdate: function forceUpdate(e) {
      e && this.__h.push(e), x(this, 2);
    }, render: function render() {} });var j = { h: e, createElement: e, cloneElement: o, createRef: L, Component: U, render: S, rerender: i, options: M }; true ? module.exports = j : self.preact = j;
}();
//# sourceMappingURL=preact.min.js.map

/***/ }),

/***/ "ZAL5":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"home":"home__MseGd","belowBox":"belowBox__1wO-9","link":"link___iLpK","smaller":"smaller__136FF","button":"button__2cB2u"};

/***/ }),

/***/ "jnUQ":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"sets":"sets__m4vK8","list":"list__3QDQW"};

/***/ }),

/***/ "k2Bm":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"spacing":"spacing__2AWhY","setName":"setName__8crQ0","button":"button__2TMpX","turnButton":"turnButton__2q7I4","hint":"hint__35nc9"};

/***/ }),

/***/ "ohqm":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"box":"box__1bpQv","gray":"gray__UwoHf","headline":"headline__1DObL","subline":"subline__2eJG4","button":"button__3nJCq","progress":"progress__2syVq","progressWrap":"progressWrap__2-rBV","bar":"bar__3U8Or","smaller":"smaller__6R01b"};

/***/ }),

/***/ "qtum":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"spacing":"spacing__2V6vn","subline":"subline__Xf72D","button":"button__fhbo7","buttonPrimary":"buttonPrimary__1RrKf","resetButton":"resetButton__16iSy","finished":"finished__2mIKc","list":"list__2700y","cardWrap":"cardWrap__3k-xM","left":"left__dgfdH"};

/***/ }),

/***/ "rq4c":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "sw5u":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Link = exports.Match = undefined;

var _extends = Object.assign || function (target) {
	for (var i = 1; i < arguments.length; i++) {
		var source = arguments[i];for (var key in source) {
			if (Object.prototype.hasOwnProperty.call(source, key)) {
				target[key] = source[key];
			}
		}
	}return target;
};

var _preact = __webpack_require__("KM04");

var _preactRouter = __webpack_require__("/QC5");

function _objectWithoutProperties(obj, keys) {
	var target = {};for (var i in obj) {
		if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];
	}return target;
}

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

function _possibleConstructorReturn(self, call) {
	if (!self) {
		throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	}return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) {
		throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Match = exports.Match = function (_Component) {
	_inherits(Match, _Component);

	function Match() {
		var _temp, _this, _ret;

		_classCallCheck(this, Match);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.update = function (url) {
			_this.nextUrl = url;
			_this.setState({});
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	Match.prototype.componentDidMount = function componentDidMount() {
		_preactRouter.subscribers.push(this.update);
	};

	Match.prototype.componentWillUnmount = function componentWillUnmount() {
		_preactRouter.subscribers.splice(_preactRouter.subscribers.indexOf(this.update) >>> 0, 1);
	};

	Match.prototype.render = function render(props) {
		var url = this.nextUrl || (0, _preactRouter.getCurrentUrl)(),
		    path = url.replace(/\?.+$/, '');
		this.nextUrl = null;
		return props.children[0] && props.children[0]({
			url: url,
			path: path,
			matches: path === props.path
		});
	};

	return Match;
}(_preact.Component);

var Link = function Link(_ref) {
	var activeClassName = _ref.activeClassName,
	    path = _ref.path,
	    props = _objectWithoutProperties(_ref, ['activeClassName', 'path']);

	return (0, _preact.h)(Match, { path: path || props.href }, function (_ref2) {
		var matches = _ref2.matches;
		return (0, _preact.h)(_preactRouter.Link, _extends({}, props, { 'class': [props.class || props.className, matches && activeClassName].filter(Boolean).join(' ') }));
	});
};

exports.Link = Link;
exports.default = Match;

Match.Link = Link;

/***/ }),

/***/ "u3et":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"header":"header__3QGkI","arrow":"arrow__2IAF8","space":"space__1arHi"};

/***/ }),

/***/ "wAIJ":
/***/ (function(module, exports) {

module.exports = {"version":1,"sets":[{"name":"Persisch A1: Begrüßung","description":"Die ersten Vokablen zur Begrüßung mit Umschrift.","cards":[{"front":"Hallo","frontDescription":"","back":"سلام","backDescription":"Salam."},{"front":"Ich bin ...","frontDescription":"","back":"من ... هستم","backDescription":"Man ... hastam."},{"front":"Wer bist du?","frontDescription":"","back":"تو کی هستی؟","backDescription":"To kī hasti?"},{"front":"Wer sind Sie?","frontDescription":"","back":"شما کی هستید؟","backDescription":"Šoma ki hastīd?"},{"front":"Freut mich!","frontDescription":"","back":"خوشوَقتَم","backDescription":"Xošwaġtam."},{"front":"Wie geht's dir?","frontDescription":"","back":"چطوری؟","backDescription":"Četorī?"},{"front":"Es geht mir gut.","frontDescription":"","back":"من خوب هستم","backDescription":"Man xub hastam."}]},{"name":"Persisch A1: sein & haben","description":"Die Verben \"sein\", \"haben\" und ihre Verneinung.","cards":[{"front":"ich bin","frontDescription":"","back":"من هستم","backDescription":"man hastam"},{"front":"du bist","frontDescription":"","back":"تو هستی","backDescription":"to hasti"},{"front":"er/sie ist","frontDescription":"","back":"او هست","backDescription":"u ast"},{"front":"wir sind","frontDescription":"","back":"ما هستیم","backDescription":"mā hastīm"},{"front":"ihr seid","frontDescription":"(auch höflich: \"Sie sind\")","back":"شما هستید","backDescription":"šomā hastīd"},{"front":"sie sind","frontDescription":"plural","back":"آنها هستند","backDescription":"ānhā(unā) hastand"},{"front":"ich habe","frontDescription":"","back":"من دارم","backDescription":"man dāram"},{"front":"du hast","frontDescription":"","back":"تو داری","backDescription":"to dārī"},{"front":"er/sie hat","frontDescription":"","back":"او دارد","backDescription":"u dārad (/ u dāre)"},{"front":"wir haben","frontDescription":"","back":"ما داریم","backDescription":"mā dārīm"},{"front":"ihr habt","frontDescription":"(auch höflich: \"Sie haben\")","back":"شما دارید","backDescription":"šomā dārīd"},{"front":"sie haben","frontDescription":"plural","back":"دارند آنها","backDescription":"ānhā/unā dārand"},{"front":"ich bin nicht","frontDescription":"","back":"من نیستم","backDescription":"man nistam"},{"front":"du bist nicht","frontDescription":"","back":"تو نیستی","backDescription":"to nistī"},{"front":"er/sie ist nicht","frontDescription":"","back":"او نیست","backDescription":"u nist"},{"front":"wir sind nicht","frontDescription":"","back":"ما نیستیم","backDescription":"mā nistīm"},{"front":"ihr seid nicht","frontDescription":"(auch höflich: \"Sie sind nicht\")","back":"شما نیستید","backDescription":"šomā nistīd"},{"front":"sie sind nicht","frontDescription":"plural","back":"آنها نیستند","backDescription":"ānhā/unā nistand"},{"front":"ich habe nicht","frontDescription":"","back":"من ندارم","backDescription":"man nadāram"},{"front":"du hast nicht","frontDescription":"","back":"تو نداری","backDescription":"to nadārī"},{"front":"er/sie hat nicht","frontDescription":"","back":"او ندارد","backDescription":"u nadārad (/ u nadāre)"},{"front":"wir haben nicht","frontDescription":"","back":"ما نداریم","backDescription":"mā nadārīm"},{"front":"ihr habt nicht","frontDescription":"(auch höflich: \"Sie haben nicht\")","back":"شما ندارید","backDescription":"šomā nadārīd"},{"front":"sie haben nicht","frontDescription":"plural","back":"آنها ندارند","backDescription":"ānhā/unā nadārand"}]},{"name":"Persisch A1: Familie","description":"Vokabeln mit Umschrift zur Beschreibung der Familie.","cards":[{"front":"Familie","frontDescription":"","back":"خانواده","backDescription":"xānevādeh"},{"front":"Mutter","frontDescription":"","back":"مادر","backDescription":"mādar"},{"front":"Vater","frontDescription":"","back":"پدر","backDescription":"pedar"},{"front":"Tochter","frontDescription":"","back":"دختر","backDescription":"doxtar"},{"front":"Sohn","frontDescription":"","back":"پسر","backDescription":"pesar"},{"front":"Schwester","frontDescription":"","back":"خواهر","backDescription":"xāhar"},{"front":"Bruder","frontDescription":"","back":"برادر","backDescription":"barādar"},{"front":"Großmutter","frontDescription":"","back":"مادربزرگ","backDescription":"mādarbozorg"},{"front":"Großvater","frontDescription":"","back":"پدربزرگ","backDescription":"pedarbozorg"},{"front":"Enkel","frontDescription":"","back":"نوه","backDescription":"nawe"},{"front":"Tante","frontDescription":"(mütterlicherseits)","back":"خاله","backDescription":"xâle"},{"front":"Tante","frontDescription":"(väterlicherseits)","back":"عمه","backDescription":"amme"},{"front":"Onkel","frontDescription":"(mütterlicherseits)","back":"دایی","backDescription":"dāyi"},{"front":"Onkel","frontDescription":"(väterlicherseits)","back":"عمو","backDescription":"amu"},{"front":"Ehepartner","frontDescription":"","back":"همسر","backDescription":"hamsar"},{"front":"Frau","frontDescription":"","back":"زن","backDescription":"zan"},{"front":"Mann","frontDescription":"","back":"مرد","backDescription":"mard"},{"front":"Kind","frontDescription":"","back":"بچه","backDescription":"bačče"}]},{"name":"Persisch A1: Zeit","description":"Vokabeln mit Umschrift für Zeit, Wochentage und Jahreszeiten.","cards":[{"front":"Samstag","frontDescription":"An diesem Tag beginnt die Woche.","back":"شنبه","backDescription":"Šanbe"},{"front":"Sonntag","frontDescription":"","back":"یکشنبه","backDescription":"Yekšanbe"},{"front":"Montag","frontDescription":"","back":"دوشنبه","backDescription":"Došanbe"},{"front":"Dienstag","frontDescription":"","back":"سه‌شنبه","backDescription":"Sešanbe"},{"front":"Mittwoch","frontDescription":"","back":"چهارشنبه","backDescription":"Čāhāršanbe"},{"front":"Donnerstag","frontDescription":"","back":"پنجشنبه","backDescription":"Panğšanbe"},{"front":"Freitag","frontDescription":"","back":"جمعه","backDescription":"Ğom'e"},{"front":"Woche","frontDescription":"","back":"هفته","backDescription":"Haft'e"},{"front":"Tag","frontDescription":"","back":"روز","backDescription":"ruz"},{"front":"Guten Tag!","frontDescription":"","back":"روز بخیر","backDescription":"Ruz bexeyr!"},{"front":"Guten Abend!","frontDescription":"","back":"عصر بخیر","backDescription":"Asr bexeyr!"},{"front":"Guten Morgen!","frontDescription":"","back":"صبح بخیر","backDescription":"Sobh bexeyr!"},{"front":"Monat","frontDescription":"(auch: Mond)","back":"ماه","backDescription":"mah"},{"front":"Jahr","frontDescription":"","back":"سال","backDescription":"sal"},{"front":"Jahreszeit","frontDescription":"(auch: Trennung)","back":"فصل","backDescription":"fasl"},{"front":"Frühling","frontDescription":"","back":"بهار","backDescription":"bahār"},{"front":"Sommer","frontDescription":"","back":"تابستان","backDescription":"tabestan"},{"front":"Herbst","frontDescription":"","back":"پاییز","backDescription":"pāyiz"},{"front":"Winter","frontDescription":"","back":"زمستان","backDescription":"zemestan"}]},{"name":"Persian numbers 1 - 10","description":"Learn counting to 10 in Persian.","cards":[{"front":"one","frontDescription":"","back":"یک","backDescription":"(۱) yek"},{"front":"two","frontDescription":"","back":"دو","backDescription":"(۲) do"},{"front":"three","frontDescription":"","back":"سه","backDescription":"(۳) se"},{"front":"four","frontDescription":"","back":"چهار","backDescription":"(۴) shahar"},{"front":"five","frontDescription":"","back":"پنج","backDescription":"(۵) panj"},{"front":"six","frontDescription":"","back":"شش","backDescription":"(۶) shesh"},{"front":"seven","frontDescription":"","back":"هفت","backDescription":"(۷) haft"},{"front":"eight","frontDescription":"","back":"هشت","backDescription":"(۸) hasht"},{"front":"nine","frontDescription":"","back":"نه","backDescription":"(۹) noh"},{"front":"ten","frontDescription":"","back":"ده","backDescription":"(۱۰) dah"}]},{"name":"Articles for German nouns","description":"\"der, die, das?\" Learn the correct article for German nouns.","cards":[{"front":"Schreibtisch","frontDescription":"desk","back":"der","backDescription":"der Schreibtisch {m}"},{"front":"Lampe","frontDescription":"lamp","back":"die","backDescription":"die Lampe {f}"},{"front":"Tastatur","frontDescription":"keyboard","back":"die","backDescription":"die Tastatur {f}"},{"front":"Telefon","frontDescription":"telephone","back":"das","backDescription":"das Telefon {n}"},{"front":"Papier","frontDescription":"paper","back":"das","backDescription":"das Papier {n}"},{"front":"Vertrag","frontDescription":"contract","back":"der","backDescription":"der Vertrag {m}"},{"front":"Kopfhörer","frontDescription":"headphones","back":"die","backDescription":"die Kopfhörer {f}"},{"front":"E-Mail","frontDescription":"email","back":"die","backDescription":"die E-Mail {f}"}]},{"name":"Short set","description":"For testing.","cards":[{"front":"one","frontDescription":"","back":"یک","backDescription":"(۱) yek"},{"front":"two","frontDescription":"","back":"دو","backDescription":"(۲) do"}]}]}

/***/ })

/******/ });
//# sourceMappingURL=ssr-bundle.js.map