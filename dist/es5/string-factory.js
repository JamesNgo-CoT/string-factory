"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) { return typeof obj; } : function(obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var StringFactory = function() {
	function tag(tag, attrs, children) {
		var openTagContents = [tag];

		if (attrs) {
			if (Array.isArray(attrs)) {
				attrs = attrs.join(' ');
			}

			if (typeof attrs === 'string') {
				openTagContents.push(attrs);
			} else {
				for (var key in attrs) {
					if (attrs[key] === undefined) { // DO NOTHING
					} else if (attrs[key] === null) {
						openTagContents.push(key);
					} else {
						openTagContents.push("".concat(key, "=").concat(quote(attrs[key], '"')));
					}
				}
			}
		}

		var openTag = "<".concat(openTagContents.join(' '), ">");

		if (children === undefined || children === null) {
			return openTag;
		}

		if (Array.isArray(children)) {
			children = children.filter(function(child) {
				return child !== null;
			}).join('');
		}

		return "".concat(openTag).concat(children, "</").concat(tag, ">");
	}

	function table(attrs, caption, thead, tbody, tfoot) {
		return tag('table', attrs, [tag('caption', {}, caption), thead ? tag('thead', {}, thead) : null, tag('tbody', {}, tbody), tfoot ? tag('tfoot', {}, tfoot) : null]);
	}

	function style(properties) {
		function processProperties(properties) {
			var value = [];

			for (var key in properties) {
				var property = properties[key];

				if (!property) {
					continue;
				}

				if (Array.isArray(property)) {
					if (key === 'font-family') {
						property = property.join(', ');
					} else {
						property = property.join(' ');
					}
				}

				if (_typeof(property) === 'object') {
					value.push("".concat(key, " {"));
					value.push.apply(value, _toConsumableArray(processProperties(property)));
					value.push('}');
				} else {
					value.push("".concat(key, ": ").concat(property, ";"));
				}
			}

			return value;
		}

		return processProperties(properties).join(' ');
	}

	function quote(value) {
		var quote = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '`';

		if (Array.isArray(value)) {
			value = value.join('');
		}

		if (typeof value !== 'string') {
			value = String(value);
		}

		var exps = [];
		value = value.replace(new RegExp('{{ (.+?) }}', 'g'), function(match, p1) {
			exps.push(p1);
			return '{{ }}';
		}).replace(new RegExp("\\\\".concat(quote), 'g'), "\\\\".concat(quote)).replace(new RegExp("".concat(quote), 'g'), "\\".concat(quote)).replace(new RegExp('{{ }}', 'g'), function() {
			if (quote === '`') {
				return "${".concat(exps.shift(), "}");
			} else {
				return "".concat(quote, " + (").concat(exps.shift(), ") + ").concat(quote);
			}
		});
		return "".concat(quote).concat(value).concat(quote);
	}

	function func(args, body) {
		if (Array.isArray(args)) {
			args = args.filter(function(child) {
				return child !== null;
			}).join(', ');
		}

		return "(".concat(args || '', ") => ").concat(body);
	}

	function exp(value) {
		return "{{ ".concat(value, " }}");
	}

	function expIf(condition, trueValue, falseValue) {
		return exp("".concat(condition, " ? ").concat(trueValue, " : ").concat(falseValue));
	}

	function expLoop(loopExp, body) {
		var joiner = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
		return exp("(() => { const expLoopValue = []; for(".concat(loopExp, ") { expLoopValue.push(").concat(body, "); } return expLoopValue.join(").concat(quote(joiner), "); })()"));
	}

	return {
		tag: tag,
		table: table,
		style: style,
		quote: quote,
		func: func,
		exp: exp,
		expIf: expIf,
		expLoop: expLoop
	};
}();
/* exported StringFactory */
