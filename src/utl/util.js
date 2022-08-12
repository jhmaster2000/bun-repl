// https://github.com/hildjj/node-inspect-extracted adapted for Bun and a REPL context
// This may be split up into a separate module in the future.

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/* eslint-disable no-undef */
/* eslint-disable no-func-assign */
/* eslint-disable no-unsafe-finally */
/* eslint-disable unicorn/prefer-module */
/* eslint-disable unicorn/error-message */
/* eslint-disable unicorn/no-useless-undefined */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-implied-eval */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

var Function = (()=>{}).constructor;
function Primordial(fn) { return Function.prototype.call.bind(fn); }

var originalproxy = Proxy;
var GlobalParseInt = parseInt;
var WeakMapPrototypeGet = Primordial(WeakMap.prototype.get);
var WeakMapPrototypeSet = Primordial(WeakMap.prototype.set);
var RegExp = /./.constructor;
var RegExpPrototypeTest = Primordial(RegExp.prototype.test);
var RegExpPrototypeExec = Primordial(RegExp.prototype.exec);
var ReflectOwnKeys = Reflect.ownKeys;
var ReflectConstruct = Reflect.construct;
var ReflectGetPrototypeOf = Reflect.getPrototypeOf;
var ReflectDefineProperty = Reflect.defineProperty;
var ReflectGetOwnPropertyDescriptor = Reflect.getOwnPropertyDescriptor;
var BooleanPrototypeValueOf = Primordial(Boolean.prototype.valueOf);
var DatePrototypeGetTime = Primordial(Date.prototype.getTime);
var SetPrototypeHas = Primordial(Set.prototype.has);
var SetPrototypeAdd = Primordial(Set.prototype.add);
var MapPrototypeHas = Primordial(Map.prototype.has);
var MapPrototypeGet = Primordial(Map.prototype.get);
var MapPrototypeSet = Primordial(Map.prototype.set);
var FunctionCall = Function.prototype.call;
var FunctionPrototypeCall = Primordial(Function.prototype.call);
var FunctionPrototypeBind = Primordial(Function.prototype.bind);
var FunctionPrototypeApply = Primordial(Function.prototype.apply);
var FunctionPrototypeToString = Primordial(Function.prototype.toString);
var String = ''.constructor;
var StringPrototypeIterator = String.prototype[Symbol.iterator];
var StringPrototypeMatch = Primordial(String.prototype.match);
var StringPrototypeSlice = Primordial(String.prototype.slice);
var StringPrototypeConcat = Primordial(String.prototype.concat);
var StringPrototypeReplace = Primordial(String.prototype.replace);
var StringPrototypeIndexOf = Primordial(String.prototype.indexOf);
var StringPrototypeEndsWith = Primordial(String.prototype.endsWith);
var StringPrototypeStartsWith = Primordial(String.prototype.startsWith);
var StringPrototypeLastIndexOf = Primordial(String.prototype.lastIndexOf);
var Array = [].constructor;
var ArrayFrom = Array.from;
var ArrayIsArray = Array.isArray;
var ArrayPrototypeMap2 = function map(thisArg, mapfn) {
    let $arr = [];
    for (let i = 0; i < thisArg.length; i++) {
        $arr[i] = mapfn(thisArg[i], i, thisArg);
    }
    return $arr;
};
var ArrayPrototypeFilter2 = function filter(thisArg, filterfn) {
    let $arr = [];
    let nextFree = 0;
    for (let i = 0; i < thisArg.length; i++) {
        if (filterfn(thisArg[i], i, thisArg)) {
            $arr[nextFree] = thisArg[i];
            nextFree++;
        }
    }
    return $arr;
};
var ArrayPrototypeIndexOf = Primordial(Array.prototype.indexOf);
var ArrayPrototypeJoin = Primordial(Array.prototype.join);
var ArrayPrototypeConcat = Primordial(Array.prototype.concat);
var ArrayPrototypeForEach = Primordial(Array.prototype.forEach);
var ArrayPrototypeSlice = Primordial(Array.prototype.slice);
var ArrayPrototypeSplice = Primordial(Array.prototype.splice);
var ArrayPrototypeIncludes = Primordial(Array.prototype.includes);
var Object = {}.constructor;
var LookupGetter = Primordial(Object.prototype.__lookupGetter__);
var Object_Keys = Object.keys;
var ObjectCreate = Object.create;
var ObjectFreeze = Object.freeze;
var ObjectIsFrozen = Object.isFrozen;
var ObjectEntries = Object.entries;
var ObjectDefineProperty = Object.defineProperty;
var ObjectDefineProperties = Object.defineProperties;
var ObjectSetPrototypeOf = Object.setPrototypeOf;
var ObjectGetPrototypeOf = Object.getPrototypeOf;
var ObjectGetOwnPropertySymbols = Object.getOwnPropertySymbols;
var ObjectGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ObjectGetOwnPropertyDescriptors = Object.getOwnPropertyDescriptors;
var ObjectPrototypeToString = Primordial(Object.prototype.toString);
var Number = (0).constructor;
var NumberPrototypeToString = Primordial(Number.prototype.toString);
var BigInt = (0n).constructor;
//var Error = Error;
var SymbolIterator = Symbol.iterator;
var SymbolPrototype = Symbol.prototype;
var SymbolToStringTag = Symbol.toStringTag;
var TypeError2 = TypeError;

/******/ var __webpack_modules__ = ([
/* 0 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

        function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

        function _nonIterableSpread() { throw new TypeError2("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

        function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[SymbolIterator] != null || iter["@@iterator"] != null) return ArrayFrom(iter); }

        function _arrayWithoutHoles(arr) { if (ArrayIsArray(arr)) return _arrayLikeToArray(arr); }

        function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof SymbolIterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== SymbolPrototype ? "symbol" : typeof obj; }, _typeof(obj); }

        function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[SymbolIterator] || o["@@iterator"]; if (!it) { if (ArrayIsArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError2("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = FunctionPrototypeCall(it, o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

        function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = StringPrototypeSlice(ObjectPrototypeToString(o), 8, -1); if (n === "Object" && o.constructor) n = o.constructor?.name; if (n === "Map" || n === "Set") return ArrayFrom(o); if (n === "Arguments" || RegExpPrototypeTest(/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/, n)) return _arrayLikeToArray(o, minLen); }

        function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

        function ownKeys(object, enumerableOnly) { var keys = Object_Keys(object); if (ObjectGetOwnPropertySymbols) { var symbols = ObjectGetOwnPropertySymbols(object); enumerableOnly && (symbols = ArrayPrototypeFilter2(symbols, function (sym) { return ObjectGetOwnPropertyDescriptor(object, sym).enumerable; })), ArrayPrototypePush(keys, symbols); } return keys; }

        function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ArrayPrototypeForEach(ownKeys(Object(source), !0), function (key) { try { key = key + ''; } catch { key = ''; } _defineProperty(target, key, source[key]); }) : ObjectGetOwnPropertyDescriptors ? ObjectDefineProperties(target, ObjectGetOwnPropertyDescriptors(source)) : ArrayPrototypeForEach(ownKeys(Object(source)), function (key) { ObjectDefineProperty(target, key, ObjectGetOwnPropertyDescriptor(source, key)); }); } return target; }

        function _defineProperty(obj, key, value) { if (key in obj) { ObjectDefineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

        var primordials = __webpack_require__(1);

        var internalBinding = primordials.internalBinding,
            _Array = primordials.Array,
            ArrayIsArray = primordials.ArrayIsArray,
            //ArrayPrototypeFilter = primordials.ArrayPrototypeFilter,
            ArrayPrototypeForEach = primordials.ArrayPrototypeForEach,
            ArrayPrototypePop = primordials.ArrayPrototypePop,
            ArrayPrototypePush = primordials.ArrayPrototypePush,
            ArrayPrototypePushApply = primordials.ArrayPrototypePushApply,
            ArrayPrototypeSort = primordials.ArrayPrototypeSort,
            ArrayPrototypeUnshift = primordials.ArrayPrototypeUnshift,
            BigIntPrototypeValueOf = primordials.BigIntPrototypeValueOf,
            BooleanPrototypeValueOf = primordials.BooleanPrototypeValueOf,
            DatePrototypeGetTime = primordials.DatePrototypeGetTime,
            DatePrototypeToISOString = primordials.DatePrototypeToISOString,
            DatePrototypeToString = primordials.DatePrototypeToString,
            ErrorPrototypeToString = primordials.ErrorPrototypeToString,
            FunctionPrototypeCall = primordials.FunctionPrototypeCall,
            FunctionPrototypeToString = primordials.FunctionPrototypeToString,
            JSONStringify = primordials.JSONStringify,
            MapPrototypeGetSize = primordials.MapPrototypeGetSize,
            MapPrototypeEntries = primordials.MapPrototypeEntries,
            MathFloor = primordials.MathFloor,
            MathMax = primordials.MathMax,
            MathMin = primordials.MathMin,
            MathRound = primordials.MathRound,
            MathSqrt = primordials.MathSqrt,
            MathTrunc = primordials.MathTrunc,
            Number = primordials.Number,
            NumberIsFinite = primordials.NumberIsFinite,
            NumberIsNaN = primordials.NumberIsNaN,
            NumberParseFloat = primordials.NumberParseFloat,
            NumberParseInt = primordials.NumberParseInt,
            NumberPrototypeValueOf = primordials.NumberPrototypeValueOf,
            _Object = primordials.Object,
            ObjectAssign = primordials.ObjectAssign,
            ObjectCreate = primordials.ObjectCreate,
            ObjectDefineProperty = primordials.ObjectDefineProperty,
            ObjectGetOwnPropertyDescriptor = primordials.ObjectGetOwnPropertyDescriptor,
            ObjectGetOwnPropertyNames = primordials.ObjectGetOwnPropertyNames,
            ObjectGetOwnPropertySymbols = primordials.ObjectGetOwnPropertySymbols,
            ObjectGetPrototypeOf = primordials.ObjectGetPrototypeOf,
            ObjectIs = primordials.ObjectIs,
            ObjectKeys = primordials.ObjectKeys,
            ObjectPrototypeHasOwnProperty = primordials.ObjectPrototypeHasOwnProperty,
            ObjectPrototypePropertyIsEnumerable = primordials.ObjectPrototypePropertyIsEnumerable,
            ObjectSeal = primordials.ObjectSeal,
            ObjectSetPrototypeOf = primordials.ObjectSetPrototypeOf,
            ReflectOwnKeys = primordials.ReflectOwnKeys,
            RegExp = primordials.RegExp,
            RegExpPrototypeTest = primordials.RegExpPrototypeTest,
            RegExpPrototypeToString = primordials.RegExpPrototypeToString,
            SafeStringIterator = primordials.SafeStringIterator,
            SafeMap = primordials.SafeMap,
            SafeSet = primordials.SafeSet,
            SetPrototypeGetSize = primordials.SetPrototypeGetSize,
            SetPrototypeValues = primordials.SetPrototypeValues,
            String = primordials.String,
            StringPrototypeCharCodeAt = primordials.StringPrototypeCharCodeAt,
            StringPrototypeCodePointAt = primordials.StringPrototypeCodePointAt,
            StringPrototypeIncludes = primordials.StringPrototypeIncludes,
            StringPrototypeNormalize = primordials.StringPrototypeNormalize,
            StringPrototypePadEnd = primordials.StringPrototypePadEnd,
            StringPrototypePadStart = primordials.StringPrototypePadStart,
            StringPrototypeRepeat = primordials.StringPrototypeRepeat,
            StringPrototypeReplace = primordials.StringPrototypeReplace,
            StringPrototypeSlice = primordials.StringPrototypeSlice,
            StringPrototypeSplit = primordials.StringPrototypeSplit,
            StringPrototypeToLowerCase = primordials.StringPrototypeToLowerCase,
            StringPrototypeTrim = primordials.StringPrototypeTrim,
            StringPrototypeValueOf = primordials.StringPrototypeValueOf,
            SymbolPrototypeToString = primordials.SymbolPrototypeToString,
            SymbolPrototypeValueOf = primordials.SymbolPrototypeValueOf,
            SymbolIterator = primordials.SymbolIterator,
            SymbolToStringTag = primordials.SymbolToStringTag,
            TypedArrayPrototypeGetLength = primordials.TypedArrayPrototypeGetLength,
            TypedArrayPrototypeGetSymbolToStringTag = primordials.TypedArrayPrototypeGetSymbolToStringTag,
            Uint8Array = primordials.Uint8Array,
            globalThis = primordials.globalThis,
            uncurryThis = primordials.uncurryThis;

        var _require = __webpack_require__(2),
            getOwnNonIndexProperties = _require.getOwnNonIndexProperties,
            getPromiseDetails = _require.getPromiseDetails,
            getProxyDetails = _require.getProxyDetails,
            kPending = _require.kPending,
            kRejected = _require.kRejected,
            previewEntries = _require.previewEntries,
            internalGetConstructorName = _require.getConstructorName,
            getExternalValue = _require.getExternalValue,
            _require$propertyFilt = _require.propertyFilter,
            ALL_PROPERTIES = _require$propertyFilt.ALL_PROPERTIES,
            ONLY_ENUMERABLE = _require$propertyFilt.ONLY_ENUMERABLE,
            Proxy = _require.Proxy;

        var _require2 = __webpack_require__(4),
            customInspectSymbol = _require2.customInspectSymbol,
            isError = _require2.isError,
            join = _require2.join,
            removeColors = _require2.removeColors;

        var _require3 = __webpack_require__(5),
            ERR_INVALID_ARG_TYPE = _require3.codes.ERR_INVALID_ARG_TYPE,
            isStackOverflowError = _require3.isStackOverflowError;

        var _require4 = __webpack_require__(7),
            isAsyncFunction = _require4.isAsyncFunction,
            isGeneratorFunction = _require4.isGeneratorFunction,
            isAnyArrayBuffer = _require4.isAnyArrayBuffer,
            isArrayBuffer = _require4.isArrayBuffer,
            isArgumentsObject = _require4.isArgumentsObject,
            isBoxedPrimitive = _require4.isBoxedPrimitive,
            isDataView = _require4.isDataView,
            isExternal = _require4.isExternal,
            isMap = _require4.isMap,
            isMapIterator = _require4.isMapIterator,
            isModuleNamespaceObject = _require4.isModuleNamespaceObject,
            isNativeError = _require4.isNativeError,
            isPromise = _require4.isPromise,
            isSet = _require4.isSet,
            isSetIterator = _require4.isSetIterator,
            isWeakMap = _require4.isWeakMap,
            isWeakSet = _require4.isWeakSet,
            isRegExp = _require4.isRegExp,
            isDate = _require4.isDate,
            isTypedArray = _require4.isTypedArray,
            isStringObject = _require4.isStringObject,
            isNumberObject = _require4.isNumberObject,
            isBooleanObject = _require4.isBooleanObject,
            isBigIntObject = _require4.isBigIntObject;

        var assert = __webpack_require__(6);

        var _require5 = __webpack_require__(8),
            NativeModule = _require5.NativeModule;

        var _require6 = __webpack_require__(9),
            validateObject = _require6.validateObject,
            validateString = _require6.validateString;

        var hexSlice;
        var builtInObjects = new SafeSet(ArrayPrototypeFilter2(ObjectGetOwnPropertyNames(globalThis), function (e) {
            return RegExpPrototypeTest(/^[A-Z][a-zA-Z0-9]+$/, e);
        })); // https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot

        var isUndetectableObject = function isUndetectableObject(v) {
            return typeof v === 'undefined' && v !== undefined;
        }; // These options must stay in sync with `getUserOptions`. So if any option will
        // be added or removed, `getUserOptions` must also be updated accordingly.


        var inspectDefaultOptions = ObjectSeal({
            showHidden: false,
            depth: 2,
            colors: false,
            customInspect: true,
            showProxy: false,
            maxArrayLength: 100,
            maxStringLength: 10000,
            breakLength: 80,
            compact: 3,
            sorted: false,
            getters: false,
            numericSeparator: false
        });
        var kObjectType = 0;
        var kArrayType = 1;
        var kArrayExtrasType = 2;
        /* eslint-disable no-control-regex */

        var strEscapeSequencesRegExp = /[\x00-\x1F\x27\x5C\x7F-\x9F]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?!.*[\uD800-\uDBFF][\uDC00-\uDFFF]).*[\uDC00-\uDFFF]/;
        var strEscapeSequencesReplacer = /[\x00-\x1F\x27\x5C\x7F-\x9F]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?!.*[\uD800-\uDBFF][\uDC00-\uDFFF]).*[\uDC00-\uDFFF]/g;
        var strEscapeSequencesRegExpSingle = /[\x00-\x1F\x5C\x7F-\x9F]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?!.*[\uD800-\uDBFF][\uDC00-\uDFFF]).*[\uDC00-\uDFFF]/;
        var strEscapeSequencesReplacerSingle = /[\x00-\x1F\x5C\x7F-\x9F]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?!.*[\uD800-\uDBFF][\uDC00-\uDFFF]).*[\uDC00-\uDFFF]/g;
        /* eslint-enable no-control-regex */

        var keyStrRegExp = /^[a-zA-Z_][a-zA-Z_0-9]*$/;
        var numberRegExp = /^(0|[1-9][0-9]*)$/;
        var coreModuleRegExp = /^ {4}at (?:[^/\\(]+ \(|)node:(.+):\d+:\d+\)?$/;
        var nodeModulesRegExp = /[/\\]node_modules[/\\](.+?)(?=[/\\])/g;
        var classRegExp = /^(\s+[^(]*?)\s*{/; // --eslint-disable-next-line node-core/no-unescaped-regexp-dot

        var stripCommentsRegExp = /(\/\/.*?\n)|(\/\*(.|\n)*?\*\/)/g;
        var kMinLineLength = 16; // Constants to map the iterator state.

        var kWeak = 0;
        var kIterator = 1;
        var kMapEntries = 2; // Escaped control characters (plus the single quote and the backslash). Use
        // empty strings to fill up unused entries.

        var meta = ['\\x00', '\\x01', '\\x02', '\\x03', '\\x04', '\\x05', '\\x06', '\\x07', // x07
            '\\b', '\\t', '\\n', '\\x0B', '\\f', '\\r', '\\x0E', '\\x0F', // x0F
            '\\x10', '\\x11', '\\x12', '\\x13', '\\x14', '\\x15', '\\x16', '\\x17', // x17
            '\\x18', '\\x19', '\\x1A', '\\x1B', '\\x1C', '\\x1D', '\\x1E', '\\x1F', // x1F
            '', '', '', '', '', '', '', "\\'", '', '', '', '', '', '', '', '', // x2F
            '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', // x3F
            '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', // x4F
            '', '', '', '', '', '', '', '', '', '', '', '', '\\\\', '', '', '', // x5F
            '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', // x6F
            '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '\\x7F', // x7F
            '\\x80', '\\x81', '\\x82', '\\x83', '\\x84', '\\x85', '\\x86', '\\x87', // x87
            '\\x88', '\\x89', '\\x8A', '\\x8B', '\\x8C', '\\x8D', '\\x8E', '\\x8F', // x8F
            '\\x90', '\\x91', '\\x92', '\\x93', '\\x94', '\\x95', '\\x96', '\\x97', // x97
            '\\x98', '\\x99', '\\x9A', '\\x9B', '\\x9C', '\\x9D', '\\x9E', '\\x9F' // x9F
        ]; // Regex used for ansi escape code splitting
        // Adopted from https://github.com/chalk/ansi-regex/blob/HEAD/index.js
        // License: MIT, authors: @sindresorhus, Qix-, arjunmehta and LitoMore
        // Matches all ansi escape code sequences in a string

        var ansiPattern = "[\\u001B\\u009B][[\\]()#;?]*" + '(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*' + "|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)" + '|(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))';
        var ansi = new RegExp(ansiPattern, 'g');
        var getStringWidth;

        function getUserOptions(ctx, isCrossContext) {
            var ret = _objectSpread({
                stylize: ctx.stylize,
                showHidden: ctx.showHidden,
                depth: ctx.depth,
                colors: ctx.colors,
                customInspect: ctx.customInspect,
                showProxy: ctx.showProxy,
                maxArrayLength: ctx.maxArrayLength,
                maxStringLength: ctx.maxStringLength,
                breakLength: ctx.breakLength,
                compact: ctx.compact,
                sorted: ctx.sorted,
                getters: ctx.getters,
                numericSeparator: ctx.numericSeparator
            }, ctx.userOptions); // Typically, the target value will be an instance of `Object`. If that is
            // *not* the case, the object may come from another vm.Context, and we want
            // to avoid passing it objects from this Context in that case, so we remove
            // the prototype from the returned object itself + the `stylize()` function,
            // and remove all other non-primitives, including non-primitive user options.


            if (isCrossContext) {
                ObjectSetPrototypeOf(ret, null);

                var _iterator = _createForOfIteratorHelper(ObjectKeys(ret)),
                    _step;

                try {
                    for (_iterator.s(); !(_step = _iterator.n()).done;) {
                        var key = _step.value;

                        if ((_typeof(ret[key]) === 'object' || typeof ret[key] === 'function') && ret[key] !== null) {
                            delete ret[key];
                        }
                    }
                } catch (err) {
                    _iterator.e(err);
                } finally {
                    _iterator.f();
                }

                ret.stylize = ObjectSetPrototypeOf(function (value, flavour) {
                    var stylized;

                    try {
                        stylized = ""+ctx.stylize(value, flavour);
                    } catch {// Continue regardless of error.
                    }

                    if (typeof stylized !== 'string') return value; // `stylized` is a string as it should be, which is safe to pass along.

                    return stylized;
                }, null);
            }

            return ret;
        }
        /**
 * Echos the value of any input. Tries to print the value out
 * in the best way possible given the different types.
 *
 * @param {any} value The value to print out.
 * @param {object} opts Optional options object that alters the output.
 */

        /* Legacy: value, showHidden, depth, colors */


        function inspect(value, opts) {
            // Default options
            var ctx = {
                budget: {},
                indentationLvl: 0,
                seen: [],
                currentDepth: 0,
                stylize: stylizeNoColor,
                showHidden: inspectDefaultOptions.showHidden,
                depth: inspectDefaultOptions.depth,
                colors: inspectDefaultOptions.colors,
                customInspect: inspectDefaultOptions.customInspect,
                showProxy: inspectDefaultOptions.showProxy,
                maxArrayLength: inspectDefaultOptions.maxArrayLength,
                maxStringLength: inspectDefaultOptions.maxStringLength,
                breakLength: inspectDefaultOptions.breakLength,
                compact: inspectDefaultOptions.compact,
                sorted: inspectDefaultOptions.sorted,
                getters: inspectDefaultOptions.getters,
                numericSeparator: inspectDefaultOptions.numericSeparator
            };

            if (arguments.length > 1) {
                // Legacy...
                if (arguments.length > 2) {
                    if (arguments[2] !== undefined) {
                        ctx.depth = arguments[2];
                    }

                    if (arguments.length > 3 && arguments[3] !== undefined) {
                        ctx.colors = arguments[3];
                    }
                } // Set user-specified options


                if (typeof opts === 'boolean') {
                    ctx.showHidden = opts;
                } else if (opts) {
                    var optKeys = ObjectKeys(opts);

                    for (var i = 0; i < optKeys.length; ++i) {
                        var key = optKeys[i]; // TODO(BridgeAR): Find a solution what to do about stylize. Either make
                        // this function public or add a new API with a similar or better
                        // functionality.

                        if (ObjectPrototypeHasOwnProperty(inspectDefaultOptions, key) || key === 'stylize') {
                            ctx[key] = opts[key];
                        } else if (ctx.userOptions === undefined) {
                            // This is required to pass through the actual user input.
                            ctx.userOptions = opts;
                        }
                    }
                }
            }

            if (ctx.colors) ctx.stylize = stylizeWithColor;
            if (ctx.maxArrayLength === null) ctx.maxArrayLength = Infinity;
            if (ctx.maxStringLength === null) ctx.maxStringLength = Infinity;
            return formatValue(ctx, value, 0);
        }

        inspect.custom = customInspectSymbol;
        ObjectDefineProperty(inspect, 'defaultOptions', {
            get: function get() {
                return inspectDefaultOptions;
            },
            set: function set(options) {
                validateObject(options, 'options');
                return ObjectAssign(inspectDefaultOptions, options);
            }
        }); // Set Graphics Rendition https://en.wikipedia.org/wiki/ANSI_escape_code#graphics
        // Each color consists of an array with the color code as first entry and the
        // reset code as second entry.

        var defaultFG = 39;
        var defaultBG = 49;
        inspect.colors = ObjectAssign(ObjectCreate(null), {
            reset: [0, 0],
            bold: [1, 22],
            dim: [2, 22],
            // Alias: faint
            italic: [3, 23],
            underline: [4, 24],
            blink: [5, 25],
            // Swap foreground and background colors
            inverse: [7, 27],
            // Alias: swapcolors, swapColors
            hidden: [8, 28],
            // Alias: conceal
            strikethrough: [9, 29],
            // Alias: strikeThrough, crossedout, crossedOut
            doubleunderline: [21, 24],
            // Alias: doubleUnderline
            black: [30, defaultFG],
            red: [31, defaultFG],
            green: [32, defaultFG],
            yellow: [33, defaultFG],
            blue: [34, defaultFG],
            magenta: [35, defaultFG],
            cyan: [36, defaultFG],
            white: [37, defaultFG],
            bgBlack: [40, defaultBG],
            bgRed: [41, defaultBG],
            bgGreen: [42, defaultBG],
            bgYellow: [43, defaultBG],
            bgBlue: [44, defaultBG],
            bgMagenta: [45, defaultBG],
            bgCyan: [46, defaultBG],
            bgWhite: [47, defaultBG],
            framed: [51, 54],
            overlined: [53, 55],
            gray: [90, defaultFG],
            // Alias: grey, blackBright
            redBright: [91, defaultFG],
            greenBright: [92, defaultFG],
            yellowBright: [93, defaultFG],
            blueBright: [94, defaultFG],
            magentaBright: [95, defaultFG],
            cyanBright: [96, defaultFG],
            whiteBright: [97, defaultFG],
            bgGray: [100, defaultBG],
            // Alias: bgGrey, bgBlackBright
            bgRedBright: [101, defaultBG],
            bgGreenBright: [102, defaultBG],
            bgYellowBright: [103, defaultBG],
            bgBlueBright: [104, defaultBG],
            bgMagentaBright: [105, defaultBG],
            bgCyanBright: [106, defaultBG],
            bgWhiteBright: [107, defaultBG]
        });

        function defineColorAlias(target, alias) {
            ObjectDefineProperty(inspect.colors, alias, {
                get: function get() {
                    return this[target];
                },
                set: function set(value) {
                    this[target] = value;
                },
                configurable: true,
                enumerable: false
            });
        }

        defineColorAlias('gray', 'grey');
        defineColorAlias('gray', 'blackBright');
        defineColorAlias('bgGray', 'bgGrey');
        defineColorAlias('bgGray', 'bgBlackBright');
        defineColorAlias('dim', 'faint');
        defineColorAlias('strikethrough', 'crossedout');
        defineColorAlias('strikethrough', 'strikeThrough');
        defineColorAlias('strikethrough', 'crossedOut');
        defineColorAlias('hidden', 'conceal');
        defineColorAlias('inverse', 'swapColors');
        defineColorAlias('inverse', 'swapcolors');
        defineColorAlias('doubleunderline', 'doubleUnderline'); // TODO(BridgeAR): Add function style support for more complex styles.
        // Don't use 'blue' not visible on cmd.exe

        inspect.styles = ObjectAssign(ObjectCreate(null), {
            special: 'cyan',
            number: 'yellow',
            bigint: 'yellow',
            "boolean": 'yellow',
            undefined: 'grey',
            "null": 'bold',
            string: 'green',
            symbol: 'green',
            date: 'magenta',
            // "name": intentionally not styling
            // TODO(BridgeAR): Highlight regular expressions properly.
            regexp: 'red',
            module: 'underline'
        });

        function addQuotes(str, quotes) {
            if (quotes === -1) {
                return "\""+(str + "\"");
            }

            if (quotes === -2) {
                return "`"+(str + "`");
            }

            return "'"+(str + "'");
        }

        function escapeFn(str) {
            var charCode = StringPrototypeCharCodeAt(str);
            return meta.length > charCode ? meta[charCode] : "\\u"+(NumberPrototypeToString(charCode, 16));
        } // Escape control characters, single quotes and the backslash.
        // This is similar to JSON stringify escaping.


        function strEscape(str) {
            var escapeTest = strEscapeSequencesRegExp;
            var escapeReplace = strEscapeSequencesReplacer;
            var singleQuote = 39; // Check for double quotes. If not present, do not escape single quotes and
            // instead wrap the text in double quotes. If double quotes exist, check for
            // backticks. If they do not exist, use those as fallback instead of the
            // double quotes.

            if (StringPrototypeIncludes(str, "'")) {
                // This invalidates the charCode and therefore can not be matched for
                // anymore.
                if (!StringPrototypeIncludes(str, '"')) {
                    singleQuote = -1;
                } else if (!StringPrototypeIncludes(str, '`') && !StringPrototypeIncludes(str, '${')) {
                    singleQuote = -2;
                }

                if (singleQuote !== 39) {
                    escapeTest = strEscapeSequencesRegExpSingle;
                    escapeReplace = strEscapeSequencesReplacerSingle;
                }
            } // Some magic numbers that worked out fine while benchmarking with v8 6.0


            if (str.length < 5000 && !RegExpPrototypeTest(escapeTest, str)) return addQuotes(str, singleQuote);

            if (str.length > 100) {
                str = StringPrototypeReplace(str, escapeReplace, escapeFn);
                return addQuotes(str, singleQuote);
            }

            var result = '';
            var last = 0;

            for (var i = 0; i < str.length; i++) {
                var point = StringPrototypeCharCodeAt(str, i);

                if (point === singleQuote || point === 92 || point < 32 || point > 126 && point < 160) {
                    if (last === i) {
                        result += meta[point];
                    } else {
                        result += ""+StringPrototypeSlice(str, last, i)+(meta[point]);
                    }

                    last = i + 1;
                } else if (point >= 0xD800 && point <= 0xDFFF) {
                    if (point <= 0xDBFF && i + 1 < str.length) {
                        var _point = StringPrototypeCharCodeAt(str, i + 1);

                        if (_point >= 0xDC00 && _point <= 0xDFFF) {
                            i++;
                            continue;
                        }
                    }

                    result += ""+StringPrototypeSlice(str, last, i) + "\\u"+NumberPrototypeToString(point, 16);
                    last = i + 1;
                }
            }

            if (last !== str.length) {
                result += StringPrototypeSlice(str, last);
            }

            return addQuotes(result, singleQuote);
        }

        function stylizeWithColor(str, styleType) {
            var style = inspect.styles[styleType];

            if (style !== undefined) {
                var color = inspect.colors[style];
                if (color !== undefined) return "\x1B["+(color[0] + "m")+(str + "\x1B[")+(color[1] + "m");
            }

            return str;
        }

        function stylizeNoColor(str) {
            return str;
        } // Return a new empty array to push in the results of the default formatter.


        function getEmptyFormatArray() {
            return [];
        }

        function isInstanceof(object, proto) {
            try {
                return object instanceof proto;
            } catch {
                return false;
            }
        }

        function getConstructorName(obj, ctx, recurseTimes, protoProps) {
            var firstProto;
            var tmp = obj;

            while (obj || isUndetectableObject(obj)) {
                var descriptor = ObjectGetOwnPropertyDescriptor(obj, 'constructor');

                if (descriptor !== undefined && typeof descriptor.value === 'function' && descriptor.value.name !== '' && isInstanceof(tmp, descriptor.value)) {
                    if (protoProps !== undefined && (firstProto !== obj || !SetPrototypeHas(builtInObjects, descriptor.value.name))) {
                        addPrototypeProperties(ctx, tmp, firstProto || tmp, recurseTimes, protoProps);
                    }

                    return descriptor.value.name;
                }

                obj = ObjectGetPrototypeOf(obj);

                if (firstProto === undefined) {
                    firstProto = obj;
                }
            }

            if (firstProto === null) {
                return null;
            }

            var res = internalGetConstructorName(tmp);

            if (recurseTimes > ctx.depth && ctx.depth !== null) {
                return "" + (res + " <Complex prototype>");
            }

            var protoConstr = getConstructorName(firstProto, ctx, recurseTimes + 1, protoProps);

            if (protoConstr === null) {
                return "" + res + " <" + inspect(firstProto, _objectSpread(_objectSpread({}, ctx), {}, {
                    customInspect: false,
                    depth: -1
                })) + ">";
            }

            return "" + (res + " <")+(protoConstr + ">");
        } // This function has the side effect of adding prototype properties to the
        // `output` argument (which is an array). This is intended to highlight user
        // defined prototype properties.


        function addPrototypeProperties(ctx, main, obj, recurseTimes, output) {
            var depth = 0;
            var keys;
            var keySet;

            do {
                if (depth !== 0 || main === obj) {
                    obj = ObjectGetPrototypeOf(obj); // Stop as soon as a null prototype is encountered.

                    if (obj === null) {
                        return;
                    } // Stop as soon as a built-in object type is detected.


                    var descriptor = ObjectGetOwnPropertyDescriptor(obj, 'constructor');

                    if (descriptor !== undefined && typeof descriptor.value === 'function' && SetPrototypeHas(builtInObjects, descriptor.value.name)) {
                        return;
                    }
                }

                if (depth === 0) {
                    keySet = new SafeSet();
                } else {
                    ArrayPrototypeForEach(keys, function (key) {
                        return SetPrototypeAdd(keySet, key);
                    });
                } // Get all own property names and symbols.


                keys = ReflectOwnKeys(obj);
                ArrayPrototypePush(ctx.seen, main);

                var _iterator2 = _createForOfIteratorHelper(keys),
                    _step2;

                try {
                    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                        var key = _step2.value;

                        // Ignore the `constructor` property and keys that exist on layers above.
                        if (key === 'constructor' || ObjectPrototypeHasOwnProperty(main, key) || depth !== 0 && SetPrototypeHas(keySet, key)) {
                            continue;
                        }

                        var desc = ObjectGetOwnPropertyDescriptor(obj, key);

                        if (typeof desc.value === 'function') {
                            continue;
                        }

                        var value = formatProperty(ctx, obj, recurseTimes, key, kObjectType, desc, main);
                        if (value === null) continue;
                        if (ctx.colors) {
                            // Faint!
                            ArrayPrototypePush(output, "\x1B[2m" + (value + "\x1B[22m"));
                        } else {
                            ArrayPrototypePush(output, value);
                        }
                    }
                } catch (err) {
                    _iterator2.e(err);
                } finally {
                    _iterator2.f();
                }

                ArrayPrototypePop(ctx.seen); // Limit the inspection to up to three prototype layers. Using `recurseTimes`
                // is not a good choice here, because it's as if the properties are declared
                // on the current object from the users perspective.
            } while (++depth !== 3);
        }

        function getPrefix(constructor, tag, fallback) {
            var size = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

            if (constructor === null) {
                if (tag !== '' && fallback !== tag) {
                    return "["+(fallback)+(size + ": null prototype] [") + (tag + "] ");
                }

                return "["+(fallback)+(size + ": null prototype] ");
            }

            if (tag !== '' && constructor !== tag) {
                return "" + (constructor)+(size + " [")+(tag + "] ");
            }

            return ""+(constructor)+(size+" ");
        } // Look up the keys of the object.


        function getKeys(value, showHidden) {
            var keys;
            var symbols = ObjectGetOwnPropertySymbols(value);

            if (showHidden) {
                keys = ObjectGetOwnPropertyNames(value);
                if (symbols.length !== 0) ArrayPrototypePushApply(keys, symbols);
            } else {
                // This might throw if `value` is a Module Namespace Object from an
                // unevaluated module, but we don't want to perform the actual type
                // check because it's expensive.
                // TODO(devsnek): track https://github.com/tc39/ecma262/issues/1209
                // and modify this logic as needed.
                try {
                    keys = ObjectKeys(value);
                } catch (err) {
                    assert(isNativeError(err) && err.name === 'ReferenceError' && isModuleNamespaceObject(value));
                    keys = ObjectGetOwnPropertyNames(value);
                }

                if (symbols.length !== 0) {
                    var filter = function filter(key) {
                        return ObjectPrototypePropertyIsEnumerable(value, key);
                    };
                    let $tmp_symbols = [];
                    for (let i = 0; i < symbols.length; i++) {
                        if (filter(symbols[i])) ArrayPrototypePush($tmp_symbols, symbols[i]);
                    }

                    ArrayPrototypePush(keys, $tmp_symbols);
                }
            }

            return keys;
        }

        function getCtxStyle(value, constructor, tag) {
            var fallback = '';

            if (constructor === null) {
                fallback = internalGetConstructorName(value);

                if (fallback === tag) {
                    fallback = 'Object';
                }
            }

            return getPrefix(constructor, tag, fallback);
        }

        function formatProxy(ctx, proxy, recurseTimes) {
            if (recurseTimes > ctx.depth && ctx.depth !== null) {
                return ctx.stylize('Proxy [Array]', 'special');
            }

            recurseTimes += 1;
            ctx.indentationLvl += 2;
            var res = [formatValue(ctx, proxy[0], recurseTimes), formatValue(ctx, proxy[1], recurseTimes)];
            ctx.indentationLvl -= 2;
            return reduceToSingleString(ctx, res, '', ['Proxy [', ']'], kArrayExtrasType, recurseTimes);
        } // Note: using `formatValue` directly requires the indentation level to be
        // corrected by setting `ctx.indentationLvL += diff` and then to decrease the
        // value afterwards again.


        function formatValue(ctx, value, recurseTimes, typedArray) {
            // Primitive types cannot have properties.
            if (_typeof(value) !== 'object' && typeof value !== 'function' && !isUndetectableObject(value)) {
                return formatPrimitive(ctx.stylize, value, ctx);
            }

            if (value === null) {
                return ctx.stylize('null', 'null');
            } // Memorize the context for custom inspection on proxies.


            var context = value; // Always check for proxies to prevent side effects and to prevent triggering
            // any proxy handlers.

            var proxy = getProxyDetails(value, !!ctx.showProxy);

            if (proxy !== undefined) {
                if (ctx.showProxy) {
                    return formatProxy(ctx, proxy, recurseTimes);
                }

                value = proxy;
            } // Provide a hook for user-specified inspect functions.
            // Check that value is an object with an inspect function on it.


            if (ctx.customInspect) {
                var maybeCustom = value[customInspectSymbol];

                if (typeof maybeCustom === 'function' && // Filter out the util module, its inspect function is special.
    maybeCustom !== inspect && // Also filter out any prototype objects using the circular check.
    !(value?.constructor && value?.constructor?.prototype === value)) {
                    // This makes sure the recurseTimes are reported as before while using
                    // a counter internally.
                    var depth = ctx.depth === null ? null : ctx.depth - recurseTimes;
                    var isCrossContext = proxy !== undefined || !(context instanceof _Object);
                    var ret = FunctionPrototypeCall(maybeCustom, context, depth, getUserOptions(ctx, isCrossContext), inspect); // If the custom inspection method returned `this`, don't go into
                    // infinite recursion.

                    if (ret !== context) {
                        if (typeof ret !== 'string') {
                            return formatValue(ctx, ret, recurseTimes);
                        }

                        return StringPrototypeReplace(ret, /\n/g, "\n"+(StringPrototypeRepeat(' ', ctx.indentationLvl)));
                    }
                }
            } // Using an array here is actually better for the average case than using
            // a Set. `seen` will only check for the depth and will never grow too large.

            if (ArrayPrototypeIncludes(ctx.seen, value)) {
                var index = 1;

                if (ctx.circular === undefined) {
                    ctx.circular = new SafeMap();
                    MapPrototypeSet(ctx.circular, value, index);
                } else {
                    index = MapPrototypeGet(ctx.circular, value);

                    if (index === undefined) {
                        index = ctx.circular.size + 1;
                        MapPrototypeSet(ctx.circular, value, index);
                    }
                }

                return ctx.stylize("[Circular *"+(index+ "]"), 'special');
            }

            return formatRaw(ctx, value, recurseTimes, typedArray);
        }

        function formatRaw(ctx, value, recurseTimes, typedArray) {
            var keys;
            var protoProps;

            if (ctx.showHidden && (recurseTimes <= ctx.depth || ctx.depth === null)) {
                protoProps = [];
            }

            var constructor = getConstructorName(value, ctx, recurseTimes, protoProps); // Reset the variable to check for this later on.

            if (protoProps !== undefined && protoProps.length === 0) {
                protoProps = undefined;
            }

            var tag = value[SymbolToStringTag]; // Only list the tag in case it's non-enumerable / not an own property.
            // Otherwise we'd print this twice.

            if (typeof tag !== 'string' || tag !== '' && (ctx.showHidden ? ObjectPrototypeHasOwnProperty : ObjectPrototypePropertyIsEnumerable)(value, SymbolToStringTag)) {
                tag = '';
            }

            var base = '';
            var formatter = getEmptyFormatArray;
            var braces;
            var noIterator = true;
            var i = 0;
            var filter = ctx.showHidden ? ALL_PROPERTIES : ONLY_ENUMERABLE;
            var extrasType = kObjectType; // Iterators and the rest are split to reduce checks.
            // We have to check all values in case the constructor is set to null.
            // Otherwise it would not possible to identify all types properly.

            if (value[SymbolIterator] || constructor === null) {
                noIterator = false;

                if (ArrayIsArray(value)) {
                    // Only set the constructor for non ordinary ("Array [...]") arrays.
                    var prefix = constructor !== 'Array' || tag !== '' ? getPrefix(constructor, tag, 'Array', "(" + (value.length + ")")) : '';
                    keys = getOwnNonIndexProperties(value, filter);
                    braces = [""+(prefix + "["), ']'];
                    if (value.length === 0 && keys.length === 0 && protoProps === undefined) return ""+(braces[0] + "]");
                    extrasType = kArrayExtrasType;
                    formatter = formatArray;
                } else if (isSet(value)) {
                    var size = SetPrototypeGetSize(value);

                    var _prefix = getPrefix(constructor, tag, 'Set', "("+(size + ")"));

                    keys = getKeys(value, ctx.showHidden);
                    formatter = constructor !== null ? FunctionPrototypeBind(formatSet, null, value) : FunctionPrototypeBind(formatSet, null, SetPrototypeValues(value));
                    if (size === 0 && keys.length === 0 && protoProps === undefined) return ""+(_prefix + "{}");
                    braces = [""+(_prefix + "{"), '}'];
                } else if (isMap(value)) {
                    var _size = MapPrototypeGetSize(value);

                    var _prefix2 = getPrefix(constructor, tag, 'Map', "("+(_size + ")"));

                    keys = getKeys(value, ctx.showHidden);
                    formatter = constructor !== null ? FunctionPrototypeBind(formatMap, null, value) : FunctionPrototypeBind(formatMap, null, MapPrototypeEntries(value));
                    if (_size === 0 && keys.length === 0 && protoProps === undefined) return ""+(_prefix2 + "{}");
                    braces = ["" +(_prefix2 + "{"), '}'];
                } else if (isTypedArray(value)) {
                    keys = getOwnNonIndexProperties(value, filter);
                    var bound = value;
                    var fallback = '';

                    if (constructor === null) {
                        fallback = TypedArrayPrototypeGetSymbolToStringTag(value); // Reconstruct the array information.

                        bound = new primordials[fallback](value);
                    }

                    var _size2 = TypedArrayPrototypeGetLength(value);

                    var _prefix3 = getPrefix(constructor, tag, fallback, "(" + (_size2 + ")"));

                    braces = ["" + (_prefix3 + "["), ']'];
                    if (value.length === 0 && keys.length === 0 && !ctx.showHidden) return "" + (braces[0] + "]"); // Special handle the value. The original value is required below. The
                    // bound function is required to reconstruct missing information.

                    formatter = FunctionPrototypeBind(formatTypedArray, null, bound, _size2);
                    extrasType = kArrayExtrasType;
                } else if (isMapIterator(value)) {
                    keys = getKeys(value, ctx.showHidden);
                    braces = getIteratorBraces('Map', tag); // Add braces to the formatter parameters.

                    formatter = FunctionPrototypeBind(formatIterator, null, braces);
                } else if (isSetIterator(value)) {
                    keys = getKeys(value, ctx.showHidden);
                    braces = getIteratorBraces('Set', tag); // Add braces to the formatter parameters.

                    formatter = FunctionPrototypeBind(formatIterator, null, braces);
                } else {
                    noIterator = true;
                }
            }

            if (noIterator) {
                keys = getKeys(value, ctx.showHidden);
                braces = ['{', '}'];

                if (constructor === 'Object') {
                    if (isArgumentsObject(value)) {
                        braces[0] = '[Arguments] {';
                    } else if (tag !== '') {
                        braces[0] = ""+(getPrefix(constructor, tag, 'Object') + "{");
                    }

                    if (keys.length === 0 && protoProps === undefined) {
                        return ""+(braces[0] + "}");
                    }
                } else if (typeof value === 'function') {
                    base = getFunctionBase(value, constructor, tag);
                    if (keys.length === 0 && protoProps === undefined) return ctx.stylize(base, 'special');
                } else if (isRegExp(value)) {
                    // Make RegExps say that they are RegExps
                    base = RegExpPrototypeToString(constructor !== null ? value : new RegExp(value));

                    var _prefix4 = getPrefix(constructor, tag, 'RegExp');

                    if (_prefix4 !== 'RegExp ') base = ""+(_prefix4)+(base);

                    if (keys.length === 0 && protoProps === undefined || recurseTimes > ctx.depth && ctx.depth !== null) {
                        return ctx.stylize(base, 'regexp');
                    }
                } else if (isDate(value)) {
                    // Make dates with properties first say the date
                    base = NumberIsNaN(DatePrototypeGetTime(value)) ? DatePrototypeToString(value) : DatePrototypeToISOString(value);

                    var _prefix5 = getPrefix(constructor, tag, 'Date');

                    if (_prefix5 !== 'Date ') base = ""+(_prefix5)+(base);

                    if (keys.length === 0 && protoProps === undefined) {
                        return ctx.stylize(base, 'date');
                    }
                } else if (isError(value)) {
                    base = formatError(value, constructor, tag, ctx, keys);
                    if (keys.length === 0 && protoProps === undefined) return base;
                } else if (isAnyArrayBuffer(value)) {
                    // Fast path for ArrayBuffer and SharedArrayBuffer.
                    // Can't do the same for DataView because it has a non-primitive
                    // .buffer property that we need to recurse for.
                    var arrayType = isArrayBuffer(value) ? 'ArrayBuffer' : 'SharedArrayBuffer';

                    var _prefix6 = getPrefix(constructor, tag, arrayType);

                    if (typedArray === undefined) {
                        formatter = formatArrayBuffer;
                    } else if (keys.length === 0 && protoProps === undefined) {
                        return _prefix6 + "{ byteLength: "+(formatNumber(ctx.stylize, value.byteLength, false) + " }");
                    }

                    braces[0] = ""+(_prefix6 + "{");
                    ArrayPrototypeUnshift(keys, 'byteLength');
                } else if (isDataView(value)) {
                    braces[0] = ""+(getPrefix(constructor, tag, 'DataView') + "{"); // .buffer goes last, it's not a primitive like the others.

                    ArrayPrototypeUnshift(keys, 'byteLength', 'byteOffset', 'buffer');
                } else if (isPromise(value)) {
                    braces[0] = ""+(getPrefix(constructor, tag, 'Promise') + "{");
                    formatter = formatPromise;
                } else if (isWeakSet(value)) {
                    braces[0] = ""+(getPrefix(constructor, tag, 'WeakSet') + "{");
                    formatter = ctx.showHidden ? formatWeakSet : formatWeakCollection;
                } else if (isWeakMap(value)) {
                    braces[0] = ""+(getPrefix(constructor, tag, 'WeakMap') + "{");
                    formatter = ctx.showHidden ? formatWeakMap : formatWeakCollection;
                } else if (isModuleNamespaceObject(value)) {
                    braces[0] = ""+(getPrefix(constructor, tag, 'Module') + "{"); // Special handle keys for namespace objects.

                    formatter = FunctionPrototypeBind(formatNamespaceObject, null, keys);
                } else if (isBoxedPrimitive(value)) {
                    base = getBoxedBase(value, ctx, keys, constructor, tag);

                    if (keys.length === 0 && protoProps === undefined) {
                        return base;
                    }
                } else {
                    if (keys.length === 0 && protoProps === undefined) {
                        if (isExternal(value)) {
                            var address = NumberPrototypeToString(getExternalValue(value), 16);
                            return ctx.stylize("[External: "+(address + "]"), 'special');
                        }

                        return ""+(getCtxStyle(value, constructor, tag) + "{}");
                    }

                    braces[0] = ""+(getCtxStyle(value, constructor, tag) + "{");
                }
            }

            if (recurseTimes > ctx.depth && ctx.depth !== null) {
                var constructorName = StringPrototypeSlice(getCtxStyle(value, constructor, tag), 0, -1);
                if (constructor !== null) constructorName = StringPrototypeConcat("[", constructorName, "]");
                return ctx.stylize(constructorName, 'special');
            }

            recurseTimes += 1;
            ArrayPrototypePush(ctx.seen, value);
            ctx.currentDepth = recurseTimes;
            var output;
            var indentationLvl = ctx.indentationLvl;

            try {
                output = formatter(ctx, value, recurseTimes);

                for (i = 0; i < keys.length; i++) {
                    const $out = formatProperty(ctx, value, recurseTimes, keys[i], extrasType);
                    if ($out !== null) ArrayPrototypePush(output, $out);
                }

                if (protoProps !== undefined) {
                    var _output;
                    _output = output;
                    ArrayPrototypePush(_output, _toConsumableArray(protoProps));
                }
            } catch (err) {
                var _constructorName = StringPrototypeSlice(getCtxStyle(value, constructor, tag), 0, -1);

                return handleMaxCallStackSize(ctx, err, _constructorName, indentationLvl);
            }

            if (ctx.circular !== undefined) {
                var index = MapPrototypeGet(ctx.circular, value);

                if (index !== undefined) {
                    var reference = ctx.stylize("<ref *"+index+">", 'special'); // Add reference always to the very beginning of the output.

                    if (ctx.compact !== true) {
                        base = base === '' ? reference : ""+reference+" "+base;
                    } else {
                        braces[0] = ""+reference+" "+braces[0];
                    }
                }
            }

            ArrayPrototypePop(ctx.seen);

            if (ctx.sorted) {
                var comparator = ctx.sorted === true ? undefined : ctx.sorted;

                if (extrasType === kObjectType) {
                    output = ArrayPrototypeSort(output, comparator);
                } else if (keys.length > 1) {
                    var _output2;

                    var sorted = ArrayPrototypeSort(ArrayPrototypeSlice(output, output.length - keys.length), comparator);
                    _output2 = output;
                    ArrayPrototypeSplice(_output2, ArrayPrototypeConcat([output.length - keys.length, keys.length], _toConsumableArray(sorted)));
                }
            }

            var res = reduceToSingleString(ctx, output, base, braces, extrasType, recurseTimes, value);
            var budget = ctx.budget[ctx.indentationLvl] || 0;
            var newLength = budget + res.length;
            ctx.budget[ctx.indentationLvl] = newLength; // If any indentationLvl exceeds this limit, limit further inspecting to the
            // minimum. Otherwise the recursive algorithm might continue inspecting the
            // object even though the maximum string size (~2 ** 28 on 32 bit systems and
            // ~2 ** 30 on 64 bit systems) exceeded. The actual output is not limited at
            // exactly 2 ** 27 but a bit higher. This depends on the object shape.
            // This limit also makes sure that huge objects don't block the event loop
            // significantly.

            if (newLength > (2 ** 27)) {
                ctx.depth = -1;
            }

            return res;
        }

        function getIteratorBraces(type, tag) {
            if (tag !== ""+(type + " Iterator")) {
                if (tag !== '') tag += '] [';
                tag += ""+(type + " Iterator");
            }

            return ["[" + tag + "] {", '}'];
        }

        function getBoxedBase(value, ctx, keys, constructor, tag) {
            var fn;
            var type;

            if (isNumberObject(value)) {
                fn = NumberPrototypeValueOf;
                type = 'Number';
            } else if (isStringObject(value)) {
                fn = StringPrototypeValueOf;
                type = 'String'; // For boxed Strings, we have to remove the 0-n indexed entries,
                // since they just noisy up the output and are redundant
                // Make boxed primitive Strings look like such

                ArrayPrototypeSplice(keys, 0, value.length);
            } else if (isBooleanObject(value)) {
                fn = BooleanPrototypeValueOf;
                type = 'Boolean';
            } else if (isBigIntObject(value)) {
                fn = BigIntPrototypeValueOf;
                type = 'BigInt';
            } else {
                fn = SymbolPrototypeValueOf;
                type = 'Symbol';
            }

            var base = "["+(type);

            if (type !== constructor) {
                if (constructor === null) {
                    base += ' (null prototype)';
                } else {
                    base += " ("+(constructor + ")");
                }
            }

            base += ": "+ (formatPrimitive(stylizeNoColor, fn(value), ctx) + "]");

            if (tag !== '' && tag !== constructor) {
                base += " ["+(tag + "]");
            }

            if (keys.length !== 0 || ctx.stylize === stylizeNoColor) return base;
            return ctx.stylize(base, StringPrototypeToLowerCase(type));
        }

        function getClassBase(value, constructor, tag) {
            var hasName = ObjectPrototypeHasOwnProperty(value, 'name');
            var name = hasName && value.name || '(anonymous)';
            var base = "class "+(name);

            if (constructor !== 'Function' && constructor !== null) {
                base += " ["+(constructor + "]");
            }

            if (tag !== '' && constructor !== tag) {
                base += " ["+(tag + "]");
            }

            if (constructor !== null) {
                var superName = ObjectGetPrototypeOf(value).name;

                if (superName) {
                    base += " extends "+(superName);
                }
            } else {
                base += ' extends [null prototype]';
            }

            return "["+(base + "]");
        }

        function getFunctionBase(value, constructor, tag) {
            var stringified = FunctionPrototypeToString(value);

            if (StringPrototypeStartsWith(stringified, 'class') && StringPrototypeEndsWith(stringified, '}')) {
                var slice = StringPrototypeSlice(stringified, 5, -1);
                var bracketIndex = StringPrototypeIndexOf(slice, '{');

                if (bracketIndex !== -1 && (!StringPrototypeIncludes(StringPrototypeSlice(slice, 0, bracketIndex), '(') || // Slow path to guarantee that it's indeed a class.
                RegExpPrototypeTest(classRegExp, StringPrototypeReplace(slice, stripCommentsRegExp)))) {
                    return getClassBase(value, constructor, tag);
                }
            }

            var type = 'Function';

            if (isGeneratorFunction(value)) {
                type = "Generator"+(type);
            }

            if (isAsyncFunction(value)) {
                type = "Async"+(type);
            }

            var base = "["+(type);

            if (constructor === null) {
                base += ' (null prototype)';
            }

            if (value.name === '') {
                base += ' (anonymous)';
            } else {
                base += ": "+(value.name);
            }

            base += ']';

            if (constructor !== type && constructor !== null) {
                base += " "+(constructor);
            }

            if (tag !== '' && constructor !== tag) {
                base += " ["+(tag, "]");
            }

            return base;
        }

        function identicalSequenceRange(a, b) {
            for (var i = 0; i < a.length - 3; i++) {
                // Find the first entry of b that matches the current entry of a.
                var pos = ArrayPrototypeIndexOf(b, a[i]);

                if (pos !== -1) {
                    var rest = b.length - pos;

                    if (rest > 3) {
                        var len = 1;
                        var maxLen = MathMin(a.length - i, rest); // Count the number of consecutive entries.

                        while (maxLen > len && a[i + len] === b[pos + len]) {
                            len++;
                        }

                        if (len > 3) {
                            return {
                                len: len,
                                offset: i
                            };
                        }
                    }
                }
            }

            return {
                len: 0,
                offset: 0
            };
        }

        function getStackString(error) {
            return error.stack ? String(error.stack) : ErrorPrototypeToString(error);
        }

        function getStackFrames(ctx, err, stack) {
            var frames = StringPrototypeSplit(stack, '\n'); // Remove stack frames identical to frames in cause.

            if (err.cause && isError(err.cause)) {
                var causeStack = getStackString(err.cause);
                var causeStackStart = StringPrototypeIndexOf(causeStack, '\n    at');

                if (causeStackStart !== -1) {
                    var causeFrames = StringPrototypeSplit(StringPrototypeSlice(causeStack, causeStackStart + 1), '\n');

                    var _identicalSequenceRan = identicalSequenceRange(frames, causeFrames),
                        len = _identicalSequenceRan.len,
                        offset = _identicalSequenceRan.offset;

                    if (len > 0) {
                        var skipped = len - 2;
                        var msg = "    ... "+(skipped + " lines matching cause stack trace ...");
                        ArrayPrototypeSplice(frames, offset + 1, skipped, ctx.stylize(msg, 'undefined'));
                    }
                }
            }

            return frames;
        }

        function improveStack(stack, constructor, name, tag) {
            // A stack trace may contain arbitrary data. Only manipulate the output
            // for "regular errors" (errors that "look normal") for now.
            var len = name.length;

            if (constructor === null || StringPrototypeEndsWith(name, 'Error') && StringPrototypeStartsWith(stack, name) && (stack.length === len || stack[len] === ':' || stack[len] === '\n')) {
                var fallback = 'Error';

                if (constructor === null) {
                    var start = StringPrototypeMatch(stack, /^([A-Z][a-z_ A-Z0-9[\]()-]+)(?::|\n {4}at)/) || StringPrototypeMatch(stack, /^([a-z_A-Z0-9-]*Error)$/);
                    fallback = start && start[1] || '';
                    len = fallback.length;
                    fallback = fallback || 'Error';
                }

                var prefix = StringPrototypeSlice(getPrefix(constructor, tag, fallback), 0, -1);

                if (name !== prefix) {
                    if (StringPrototypeIndexOf(prefix, name)) {
                        if (len === 0) {
                            stack = ""+(prefix + ": ")+(stack);
                        } else {
                            stack = ""+(prefix)+(StringPrototypeSlice(stack, len));
                        }
                    } else {
                        stack = ""+(prefix + " [")+(name + "]")+(StringPrototypeSlice(stack, len));
                    }
                }
            }

            return stack;
        }

        function removeDuplicateErrorKeys(ctx, keys, err, stack) {
            if (!ctx.showHidden && keys.length !== 0) {
                for (var _i = 0, _arr = ['name', 'message', 'stack']; _i < _arr.length; _i++) {
                    var name = _arr[_i];
                    var index = ArrayPrototypeIndexOf(keys, name); // Only hide the property in case it's part of the original stack

                    if (index !== -1 && StringPrototypeIncludes(stack, err[name])) {
                        ArrayPrototypeSplice(keys, index, 1);
                    }
                }
            }
        }

        function formatError(err, constructor, tag, ctx, keys) {
            var name = err.name != null ? String(err.name) : 'Error';
            var stack = getStackString(err);
            removeDuplicateErrorKeys(ctx, keys, err, stack);

            if ('cause' in err && (keys.length === 0 || !ArrayPrototypeIncludes(keys, 'cause'))) {
                ArrayPrototypePush(keys, 'cause');
            }

            stack = improveStack(stack, constructor, name, tag); // Ignore the error message if it's contained in the stack.

            var pos = err.message && StringPrototypeIndexOf(stack, err.message) || -1;
            if (pos !== -1) pos += err.message.length; // Wrap the error in brackets in case it has no stack trace.

            var stackStart = StringPrototypeIndexOf(stack, '\n    at', pos);

            if (stackStart === -1) {
                stack = "["+(stack + "]");
            } else {
                var newStack = StringPrototypeSlice(stack, 0, stackStart);
                var lines = getStackFrames(ctx, err, StringPrototypeSlice(stack, stackStart + 1));

                if (ctx.colors) {
                    // Highlight userland code and node modules.
                    var _iterator3 = _createForOfIteratorHelper(lines),
                        _step3;

                    try {
                        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                            var line = _step3.value;
                            var core = StringPrototypeMatch(line, coreModuleRegExp);

                            if (core !== null && NativeModule?.exists?.(core[1])) {
                                newStack += "\n"+(ctx.stylize(line, 'undefined'));
                            } else {
                                // This adds underscores to all node_modules to quickly identify them.
                                var nodeModule = void 0;
                                newStack += '\n';
                                var _pos = 0;

                                while ((nodeModule = RegExpPrototypeExec(nodeModulesRegExp, line)) !== null) {
                                    // '/node_modules/'.length === 14
                                    newStack += StringPrototypeSlice(line, _pos, nodeModule.index + 14);
                                    newStack += ctx.stylize(nodeModule[1], 'module');
                                    _pos = nodeModule.index + nodeModule[0].length;
                                }

                                newStack += _pos === 0 ? line : StringPrototypeSlice(line, _pos);
                            }
                        }
                    } catch (err) {
                        _iterator3.e(err);
                    } finally {
                        _iterator3.f();
                    }
                } else {
                    newStack += "\n"+(ArrayPrototypeJoin(lines, '\n'));
                }

                stack = newStack;
            } // The message and the stack have to be indented as well!


            if (ctx.indentationLvl !== 0) {
                var indentation = StringPrototypeRepeat(' ', ctx.indentationLvl);
                stack = StringPrototypeReplace(stack, /\n/g, "\n"+(indentation));
            }

            return stack;
        }

        function groupArrayElements(ctx, output, value) {
            var totalLength = 0;
            var maxLength = 0;
            var i = 0;
            var outputLength = output.length;

            if (ctx.maxArrayLength < output.length) {
                // This makes sure the "... n more items" part is not taken into account.
                outputLength--;
            }

            var separatorSpace = 2; // Add 1 for the space and 1 for the separator.

            var dataLen = new _Array(outputLength); // Calculate the total length of all output entries and the individual max
            // entries length of all output entries. We have to remove colors first,
            // otherwise the length would not be calculated properly.

            for (; i < outputLength; i++) {
                var len = getStringWidth(output[i], ctx.colors);
                dataLen[i] = len;
                totalLength += len + separatorSpace;
                if (maxLength < len) maxLength = len;
            } // Add two to `maxLength` as we add a single whitespace character plus a comma
            // in-between two entries.


            var actualMax = maxLength + separatorSpace; // Check if at least three entries fit next to each other and prevent grouping
            // of arrays that contains entries of very different length (i.e., if a single
            // entry is longer than 1/5 of all other entries combined). Otherwise the
            // space in-between small entries would be enormous.

            if (actualMax * 3 + ctx.indentationLvl < ctx.breakLength && (totalLength / actualMax > 5 || maxLength <= 6)) {
                var approxCharHeights = 2.5;
                var averageBias = MathSqrt(actualMax - totalLength / output.length);
                var biasedMax = MathMax(actualMax - 3 - averageBias, 1); // Dynamically check how many columns seem possible.

                var columns = MathMin( // Ideally a square should be drawn. We expect a character to be about 2.5
                    // times as high as wide. This is the area formula to calculate a square
                    // which contains n rectangles of size `actualMax * approxCharHeights`.
                    // Divide that by `actualMax` to receive the correct number of columns.
                    // The added bias increases the columns for short entries.
                    MathRound(MathSqrt(approxCharHeights * biasedMax * outputLength) / biasedMax), // Do not exceed the breakLength.
                    MathFloor((ctx.breakLength - ctx.indentationLvl) / actualMax), // Limit array grouping for small `compact` modes as the user requested
                    // minimal grouping.
                    ctx.compact * 4, // Limit the columns to a maximum of fifteen.
                    15); // Return with the original output if no grouping should happen.

                if (columns <= 1) {
                    return output;
                }

                var tmp = [];
                var maxLineLength = [];

                for (var _i2 = 0; _i2 < columns; _i2++) {
                    var lineMaxLength = 0;

                    for (var j = _i2; j < output.length; j += columns) {
                        if (dataLen[j] > lineMaxLength) lineMaxLength = dataLen[j];
                    }

                    lineMaxLength += separatorSpace;
                    maxLineLength[_i2] = lineMaxLength;
                }

                var order = StringPrototypePadStart;

                if (value !== undefined) {
                    for (var _i3 = 0; _i3 < output.length; _i3++) {
                        if (typeof value[_i3] !== 'number' && typeof value[_i3] !== 'bigint') {
                            order = StringPrototypePadEnd;
                            break;
                        }
                    }
                } // Each iteration creates a single line of grouped entries.


                for (var _i4 = 0; _i4 < outputLength; _i4 += columns) {
                    // The last lines may contain less entries than columns.
                    var max = MathMin(_i4 + columns, outputLength);
                    var str = '';
                    var _j = _i4;

                    for (; _j < max - 1; _j++) {
                        // Calculate extra color padding in case it's active. This has to be
                        // done line by line as some lines might contain more colors than
                        // others.
                        var padding = maxLineLength[_j - _i4] + output[_j].length - dataLen[_j];
                        str += order(""+(output[_j] + ", "), padding, ' ');
                    }

                    if (order === StringPrototypePadStart) {
                        var _padding = maxLineLength[_j - _i4] + output[_j].length - dataLen[_j] - separatorSpace;

                        str += StringPrototypePadStart(output[_j], _padding, ' ');
                    } else {
                        str += output[_j];
                    }

                    ArrayPrototypePush(tmp, str);
                }

                if (ctx.maxArrayLength < output.length) {
                    ArrayPrototypePush(tmp, output[outputLength]);
                }

                output = tmp;
            }

            return output;
        }

        function handleMaxCallStackSize(ctx, err, constructorName, indentationLvl) {
            if (isStackOverflowError(err)) {
                ArrayPrototypePop(ctx.seen);
                ctx.indentationLvl = indentationLvl;
                return ctx.stylize("["+(constructorName + ": Inspection interrupted ") + 'prematurely. Maximum call stack size exceeded.]', 'special');
            }
            /* c8 ignore next */

            throw err;
        }

        function addNumericSeparator(integerString) {
            var result = '';
            var i = integerString.length;
            var start = StringPrototypeStartsWith(integerString, '-') ? 1 : 0;

            for (; i >= start + 4; i -= 3) {
                result = "_"+(StringPrototypeSlice(integerString, i - 3, i))+(result);
            }

            return i === integerString.length ? integerString : ""+ StringPrototypeSlice(integerString, 0, i) + (result);
        }

        function addNumericSeparatorEnd(integerString) {
            var result = '';
            var i = 0;

            for (; i < integerString.length - 3; i += 3) {
                result += ""+ StringPrototypeSlice(integerString, i, i + 3) + "_";
            }

            return i === 0 ? integerString : ""+(result)+ StringPrototypeSlice(integerString, i);
        }

        function formatNumber(fn, number, numericSeparator) {
            if (!numericSeparator) {
                // Format -0 as '-0'. Checking `number === -0` won't distinguish 0 from -0.
                if (ObjectIs(number, -0)) {
                    return fn('-0', 'number');
                }

                return fn(""+number, 'number');
            }

            var integer = MathTrunc(number);
            var string = String(integer);

            if (integer === number) {
                if (!NumberIsFinite(number) || StringPrototypeIncludes(string, 'e')) {
                    return fn(string, 'number');
                }

                return fn(""+(addNumericSeparator(string)), 'number');
            }

            if (NumberIsNaN(number)) {
                return fn(string, 'number');
            }

            return fn(""+(addNumericSeparator(string) + ".")+addNumericSeparatorEnd(StringPrototypeSlice(String(number), string.length + 1)), 'number');
        }

        function formatBigInt(fn, bigint, numericSeparator) {
            var string = String(bigint);

            if (!numericSeparator) {
                return fn(""+(string + "n"), 'bigint');
            }

            return fn(""+(addNumericSeparator(string) + "n"), 'bigint');
        }

        function formatPrimitive(fn, value, ctx) {
            if (typeof value === 'string') {
                var trailer = '';

                if (value.length > ctx.maxStringLength) {
                    var remaining = value.length - ctx.maxStringLength;
                    value = StringPrototypeSlice(value, 0, ctx.maxStringLength);
                    trailer = "... "+(remaining + " more character")+(remaining > 1 ? 's' : '');
                }

                if (ctx.compact !== true && // TODO(BridgeAR): Add unicode support. Use the readline getStringWidth function.
    value.length > kMinLineLength && value.length > ctx.breakLength - ctx.indentationLvl - 4) {
                    // Safari hack to avoid negative lookbehind
                    return ArrayPrototypeJoin(ArrayPrototypeMap2(StringPrototypeSplit(value, /\n/), function (line, i, a) {
                        return fn(strEscape(line + (i === a.length - 1 ? '' : '\n')), 'string');
                    }), " +\n" + StringPrototypeRepeat(' ', ctx.indentationLvl + 2)) + trailer;
                }

                return fn(strEscape(value), 'string') + trailer;
            }

            if (typeof value === 'number') return formatNumber(fn, value, ctx.numericSeparator);
            if (typeof value === 'bigint') return formatBigInt(fn, value, ctx.numericSeparator);
            if (typeof value === 'boolean') return fn(""+value, 'boolean');
            if (typeof value === 'undefined') return fn('undefined', 'undefined'); // es6 symbol primitive

            return fn(SymbolPrototypeToString(value), 'symbol');
        }

        function formatNamespaceObject(keys, ctx, value, recurseTimes) {
            var output = new _Array(keys.length);

            for (var i = 0, iout = 0; i < keys.length; i++) {
                try {
                    const $out = formatProperty(ctx, value, recurseTimes, keys[i], kObjectType);
                    if ($out === null) {
                        // Invalid property, remove and skip
                        iout++;
                        output.length--;
                        continue;
                    } else output[i - iout] = $out;
                } catch (err) {
                    assert(isNativeError(err) && err.name === 'ReferenceError'); // Use the existing functionality. This makes sure the indentation and
                    // line breaks are always correct. Otherwise it is very difficult to keep
                    // this aligned, even though this is a hacky way of dealing with this.

                    var tmp = _defineProperty({}, keys[i], '');

                    output[i] = formatProperty(ctx, tmp, recurseTimes, keys[i], kObjectType);
                    var pos = StringPrototypeLastIndexOf(output[i], ' '); // We have to find the last whitespace and have to replace that value as
                    // it will be visualized as a regular string.

                    output[i] = StringPrototypeSlice(output[i], 0, pos + 1) + ctx.stylize('<uninitialized>', 'special');
                }
            } // Reset the keys to an empty array. This prevents duplicated inspection.


            keys.length = 0;
            return output;
        } // The array is sparse and/or has extra keys


        function formatSpecialArray(ctx, value, recurseTimes, maxLength, output, i) {
            var keys = ObjectKeys(value);
            var index = i;

            for (; i < keys.length && output.length < maxLength; i++) {
                var key = keys[i];
                var tmp = +key; // Arrays can only have up to 2^32 - 1 entries

                if (tmp > (2 ** 32) - 2) {
                    break;
                }

                if (""+(index) !== key) {
                    if (!RegExpPrototypeTest(numberRegExp, key)) {
                        break;
                    }

                    var emptyItems = tmp - index;
                    var ending = emptyItems > 1 ? 's' : '';
                    var message = "<"+(emptyItems+" empty item")+(ending+">");
                    ArrayPrototypePush(output, ctx.stylize(message, 'undefined'));
                    index = tmp;

                    if (output.length === maxLength) {
                        break;
                    }
                }
                const $out = formatProperty(ctx, value, recurseTimes, key, kArrayType);
                if ($out !== null) ArrayPrototypePush(output, $out);
                index++;
            }

            var remaining = value.length - index;

            if (output.length !== maxLength) {
                if (remaining > 0) {
                    var _ending = remaining > 1 ? 's' : '';

                    var _message = "<"+(remaining+" empty item")+(_ending+">");

                    ArrayPrototypePush(output, ctx.stylize(_message, 'undefined'));
                }
            } else if (remaining > 0) {
                ArrayPrototypePush(output, "... "+remaining+" more item"+(remaining > 1 ? 's' : ''));
            }

            return output;
        }

        function formatArrayBuffer(ctx, value) {
            var buffer;

            try {
                buffer = new Uint8Array(value);
            } catch {
                return [ctx.stylize('(detached)', 'special')];
            }

            if (hexSlice === undefined) hexSlice = uncurryThis((__webpack_require__(10).Buffer.prototype.hexSlice));
            var str = StringPrototypeTrim(StringPrototypeReplace(hexSlice(buffer, 0, MathMin(ctx.maxArrayLength, buffer.length)), /(.{2})/g, '$1 '));
            var remaining = buffer.length - ctx.maxArrayLength;
            if (remaining > 0) str += " ... "+(remaining+" more byte")+(remaining > 1 ? 's' : '');
            return [""+(ctx.stylize('[Uint8Contents]', 'special')+": <")+(str+">")];
        }

        function formatArray(ctx, value, recurseTimes) {
            var valLen = value.length;
            var len = MathMin(MathMax(0, ctx.maxArrayLength), valLen);
            var remaining = valLen - len;
            var output = [];

            for (var i = 0; i < len; i++) {
                // Special handle sparse arrays.
                if (!ObjectPrototypeHasOwnProperty(value, i)) {
                    return formatSpecialArray(ctx, value, recurseTimes, len, output, i);
                }

                const $out = formatProperty(ctx, value, recurseTimes, i, kArrayType);
                if ($out !== null) ArrayPrototypePush(output, $out);
            }

            if (remaining > 0) ArrayPrototypePush(output, "... "+remaining+" more item"+(remaining > 1 ? 's' : ''));
            return output;
        }

        function formatTypedArray(value, length, ctx, ignored, recurseTimes) {
            var maxLength = MathMin(MathMax(0, ctx.maxArrayLength), length);
            var remaining = value.length - maxLength;
            var output = new _Array(maxLength);
            var elementFormatter = value.length > 0 && typeof value[0] === 'number' ? formatNumber : formatBigInt;

            for (var i = 0; i < maxLength; ++i) {
                output[i] = elementFormatter(ctx.stylize, value[i], ctx.numericSeparator);
            }

            if (remaining > 0) {
                output[maxLength] = "... "+(remaining+" more item")+(remaining > 1 ? 's' : '');
            }

            if (ctx.showHidden) {
                // .buffer goes last, it's not a primitive like the others.
                // All besides `BYTES_PER_ELEMENT` are actually getters.
                ctx.indentationLvl += 2;

                for (var _i5 = 0, _arr2 = ['BYTES_PER_ELEMENT', 'length', 'byteLength', 'byteOffset', 'buffer']; _i5 < _arr2.length; _i5++) {
                    var key = _arr2[_i5];
                    var str = formatValue(ctx, value[key], recurseTimes, true);
                    ArrayPrototypePush(output, "["+key+"]: "+str);
                }

                ctx.indentationLvl -= 2;
            }

            return output;
        }

        function formatSet(value, ctx, ignored, recurseTimes) {
            var output = [];
            ctx.indentationLvl += 2;

            var _iterator4 = _createForOfIteratorHelper(value),
                _step4;

            try {
                for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                    var v = _step4.value;
                    ArrayPrototypePush(output, formatValue(ctx, v, recurseTimes));
                }
            } catch (err) {
                _iterator4.e(err);
            } finally {
                _iterator4.f();
            }

            ctx.indentationLvl -= 2;
            return output;
        }

        function formatMap(value, ctx, ignored, recurseTimes) {
            var output = [];
            ctx.indentationLvl += 2;

            var _iterator5 = _createForOfIteratorHelper(value),
                _step5;

            try {
                for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
                    var _step5$value = _step5.value,
                        k = _step5$value[0],
                        v = _step5$value[1];
                    ArrayPrototypePush(output, ""+(formatValue(ctx, k, recurseTimes) + " => ")+(formatValue(ctx, v, recurseTimes)));
                }
            } catch (err) {
                _iterator5.e(err);
            } finally {
                _iterator5.f();
            }

            ctx.indentationLvl -= 2;
            return output;
        }

        function formatSetIterInner(ctx, recurseTimes, entries, state) {
            var maxArrayLength = MathMax(ctx.maxArrayLength, 0);
            var maxLength = MathMin(maxArrayLength, entries.length);
            var output = new _Array(maxLength);
            ctx.indentationLvl += 2;

            for (var i = 0; i < maxLength; i++) {
                output[i] = formatValue(ctx, entries[i], recurseTimes);
            }

            ctx.indentationLvl -= 2;

            if (state === kWeak && !ctx.sorted) {
                // Sort all entries to have a halfway reliable output (if more entries than
                // retrieved ones exist, we can not reliably return the same output) if the
                // output is not sorted anyway.
                ArrayPrototypeSort(output);
            }

            var remaining = entries.length - maxLength;

            if (remaining > 0) {
                ArrayPrototypePush(output, "... "+(remaining + " more item")+(remaining > 1 ? 's' : ''));
            }

            return output;
        }

        function formatMapIterInner(ctx, recurseTimes, entries, state) {
            var maxArrayLength = MathMax(ctx.maxArrayLength, 0); // Entries exist as [key1, val1, key2, val2, ...]

            var len = entries.length / 2;
            var remaining = len - maxArrayLength;
            var maxLength = MathMin(maxArrayLength, len);
            var output = new _Array(maxLength);
            var i = 0;
            ctx.indentationLvl += 2;

            if (state === kWeak) {
                for (; i < maxLength; i++) {
                    var pos = i * 2;
                    output[i] = ""+(formatValue(ctx, entries[pos], recurseTimes) + " => ") + formatValue(ctx, entries[pos + 1], recurseTimes);
                } // Sort all entries to have a halfway reliable output (if more entries than
                // retrieved ones exist, we can not reliably return the same output) if the
                // output is not sorted anyway.


                if (!ctx.sorted) output = ArrayPrototypeSort(output);
            } else {
                for (; i < maxLength; i++) {
                    var _pos2 = i * 2;

                    var res = [formatValue(ctx, entries[_pos2], recurseTimes), formatValue(ctx, entries[_pos2 + 1], recurseTimes)];
                    output[i] = reduceToSingleString(ctx, res, '', ['[', ']'], kArrayExtrasType, recurseTimes);
                }
            }

            ctx.indentationLvl -= 2;

            if (remaining > 0) {
                ArrayPrototypePush(output, "... "+(remaining + " more item")+(remaining > 1 ? 's' : ''));
            }

            return output;
        }

        function formatWeakCollection(ctx) {
            return [ctx.stylize('<items unknown>', 'special')];
        }

        function formatWeakSet(ctx, value, recurseTimes) {
            var entries = previewEntries(value);
            return formatSetIterInner(ctx, recurseTimes, entries, kWeak);
        }

        function formatWeakMap(ctx, value, recurseTimes) {
            var entries = previewEntries(value);
            return formatMapIterInner(ctx, recurseTimes, entries, kWeak);
        }

        function formatIterator(braces, ctx, value, recurseTimes) {
            var _previewEntries = previewEntries(value, true),
                entries = _previewEntries[0],
                isKeyValue = _previewEntries[1];

            if (isKeyValue) {
                // Mark entry iterators as such.
                braces[0] = StringPrototypeReplace(braces[0], / Iterator] {$/, ' Entries] {');
                return formatMapIterInner(ctx, recurseTimes, entries, kMapEntries);
            }

            return formatSetIterInner(ctx, recurseTimes, entries, kIterator);
        }

        function formatPromise(ctx, value, recurseTimes) {
            var output;

            var _getPromiseDetails = getPromiseDetails(value),
                state = _getPromiseDetails[0],
                result = _getPromiseDetails[1];

            if (state === kPending) {
                output = [ctx.stylize('<pending>', 'special')];
            } else {
                ctx.indentationLvl += 2;
                var str = formatValue(ctx, result, recurseTimes);
                ctx.indentationLvl -= 2;
                output = [state === kRejected ? ""+(ctx.stylize('<rejected>', 'special') + " ") + (str) : str];
            }

            return output;
        }

        function formatProperty(ctx, value, recurseTimes, key, type, desc) {
            var original = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : value;
            var name, str;
            var extra = ' ';
            if (typeof key !== 'string' && typeof key !== 'symbol' && typeof key !== 'number') {
                return null;
                //try { key = key + ''; } catch { key = ObjectPrototypeToString(key); }
            }
            desc = desc || ObjectGetOwnPropertyDescriptor(value, key) || {
                value: value[key],
                enumerable: true
            };

            if (desc.value !== undefined) {
                var diff = ctx.compact !== true || type !== kObjectType ? 2 : 3;
                ctx.indentationLvl += diff;
                str = formatValue(ctx, desc.value, recurseTimes);

                if (diff === 3 && ctx.breakLength < getStringWidth(str, ctx.colors)) {
                    extra = "\n"+(StringPrototypeRepeat(' ', ctx.indentationLvl));
                }

                ctx.indentationLvl -= diff;
            } else if (desc.get !== undefined) {
                var label = desc.set !== undefined ? 'Getter/Setter' : 'Getter';
                var s = ctx.stylize;
                var sp = 'special';

                if (ctx.getters && (ctx.getters === true || ctx.getters === 'get' && desc.set === undefined || ctx.getters === 'set' && desc.set !== undefined)) {
                    try {
                        var tmp = FunctionPrototypeCall(desc.get, original);
                        ctx.indentationLvl += 2;

                        if (tmp === null) {
                            str = ""+(s("["+(label + ":"), sp) + " ") +s('null', 'null') + s(']', sp);
                        } else if (_typeof(tmp) === 'object') {
                            str = ""+(s("["+(label + "]"), sp) + " ") +formatValue(ctx, tmp, recurseTimes);
                        } else {
                            var primitive = formatPrimitive(s, tmp, ctx);
                            str = ""+(s("["+(label + ":"), sp) + " ") +(primitive) +s(']', sp);
                        }

                        ctx.indentationLvl -= 2;
                    } catch (err) {
                        var message = "<Inspection threw ("+(err.message + ")>");
                        str = ""+(s("["+label+":", sp) + " ")+(message)+s(']', sp);
                    }
                } else {
                    str = ctx.stylize("["+(label + "]"), sp);
                }
            } else if (desc.set !== undefined) {
                str = ctx.stylize('[Setter]', 'special');
            } else {
                str = ctx.stylize('undefined', 'undefined');
            }

            if (type === kArrayType) {
                return str;
            }

            if (_typeof(key) === 'symbol') {
                var _tmp2 = StringPrototypeReplace(SymbolPrototypeToString(key), strEscapeSequencesReplacer, escapeFn);

                name = "[" + (ctx.stylize(_tmp2, 'symbol') + "]");
            } else if (key === '__proto__') {
                name = "['__proto__']";
            } else if (desc.enumerable === false) {
                var _tmp3 = StringPrototypeReplace(key, strEscapeSequencesReplacer, escapeFn);

                name = "[" + (_tmp3 + "]");
            } else if (RegExpPrototypeTest(keyStrRegExp, key)) {
                name = ctx.stylize(key, 'name');
            } else {
                name = ctx.stylize(strEscape(key), 'string');
            }

            return "" + (name + ":") + (extra) + (str);
        }

        function isBelowBreakLength(ctx, output, start, base) {
            // Each entry is separated by at least a comma. Thus, we start with a total
            // length of at least `output.length`. In addition, some cases have a
            // whitespace in-between each other that is added to the total as well.
            // TODO(BridgeAR): Add unicode support. Use the readline getStringWidth
            // function. Check the performance overhead and make it an opt-in in case it's
            // significant.
            var totalLength = output.length + start;
            if (totalLength + output.length > ctx.breakLength) return false;

            for (var i = 0; i < output.length; i++) {
                if (ctx.colors) {
                    totalLength += removeColors(output[i]).length;
                } else {
                    totalLength += output[i].length;
                }

                if (totalLength > ctx.breakLength) {
                    return false;
                }
            } // Do not line up properties on the same line if `base` contains line breaks.


            return base === '' || !StringPrototypeIncludes(base, '\n');
        }

        function reduceToSingleString(ctx, output, base, braces, extrasType, recurseTimes, value) {
            if (ctx.compact !== true) {
                if (typeof ctx.compact === 'number' && ctx.compact >= 1) {
                    // Memorize the original output length. In case the output is grouped,
                    // prevent lining up the entries on a single line.
                    var entries = output.length; // Group array elements together if the array contains at least six
                    // separate entries.

                    if (extrasType === kArrayExtrasType && entries > 6) {
                        output = groupArrayElements(ctx, output, value);
                    } // `ctx.currentDepth` is set to the most inner depth of the currently
                    // inspected object part while `recurseTimes` is the actual current depth
                    // that is inspected.
                    //
                    // Example:
                    //
                    // const a = { first: [ 1, 2, 3 ], second: { inner: [ 1, 2, 3 ] } }
                    //
                    // The deepest depth of `a` is 2 (a.second.inner) and `a.first` has a max
                    // depth of 1.
                    //
                    // Consolidate all entries of the local most inner depth up to
                    // `ctx.compact`, as long as the properties are smaller than
                    // `ctx.breakLength`.


                    if (ctx.currentDepth - recurseTimes < ctx.compact && entries === output.length) {
                        // Line up all entries on a single line in case the entries do not
                        // exceed `breakLength`. Add 10 as constant to start next to all other
                        // factors that may reduce `breakLength`.
                        var start = output.length + ctx.indentationLvl + braces[0].length + base.length + 10;

                        if (isBelowBreakLength(ctx, output, start, base)) {
                            var joinedOutput = join(output, ', ');

                            if (!StringPrototypeIncludes(joinedOutput, '\n')) {
                                return "" + (base ? ""+base+" " : '') + braces[0]+" "+joinedOutput+" "+braces[1];
                            }
                        }
                    }
                } // Line up each entry on an individual line.


                var _indentation = "\n" + StringPrototypeRepeat(' ', ctx.indentationLvl);

                return ""+(base ? ""+base+" " : '')+braces[0]+_indentation +"  "+""+join(output, ","+_indentation+"  ")+_indentation+braces[1];
            } // Line up all entries on a single line in case the entries do not exceed
            // `breakLength`.


            if (isBelowBreakLength(ctx, output, 0, base)) {
                return "" + (braces[0]) + ((base ? " "+(base) : '') + " ")+(join(output, ', ') + " ") + braces[1];
            }

            var indentation = StringPrototypeRepeat(' ', ctx.indentationLvl); // If the opening "brace" is too large, like in the case of "Set {",
            // we need to force the first item to be on the next line or the
            // items will not line up correctly.

            var ln = base === '' && braces[0].length === 1 ? ' ' : "" + ((base ? " " + base : '') + "\n") + indentation + "  "; // Line up each entry on an individual line.

            return "" + braces[0] + ln + join(output, ",\n" + indentation + "  ") + " " + braces[1];
        }

        function hasBuiltInToString(value) {
            // Prevent triggering proxy traps.
            var getFullProxy = false;
            var proxyTarget = getProxyDetails(value, getFullProxy);

            if (proxyTarget !== undefined) {
                value = proxyTarget;
            } // Count objects that have no `toString` function as built-in.


            if (typeof value.toString !== 'function') {
                return true;
            } // The object has a own `toString` property. Thus it's not not a built-in one.


            if (ObjectPrototypeHasOwnProperty(value, 'toString')) {
                return false;
            } // Find the object that has the `toString` property as own property in the
            // prototype chain.


            var pointer = value;

            do {
                pointer = ObjectGetPrototypeOf(pointer);
            } while (!ObjectPrototypeHasOwnProperty(pointer, 'toString')); // Check closer if the object is a built-in.


            var descriptor = ObjectGetOwnPropertyDescriptor(pointer, 'constructor');
            return descriptor !== undefined && typeof descriptor.value === 'function' && SetPrototypeHas(builtInObjects, descriptor.value.name);
        }

        var firstErrorLine = function firstErrorLine(error) {
            return StringPrototypeSplit(error.message, '\n', 1)[0];
        };

        var CIRCULAR_ERROR_MESSAGE;

        function tryStringify(arg) {
            try {
                return JSONStringify(arg);
            } catch (err) {
                // Populate the circular error message lazily
                if (!CIRCULAR_ERROR_MESSAGE) {
                    try {
                        var a = {};
                        a.a = a;
                        JSONStringify(a);
                    } catch (circularError) {
                        CIRCULAR_ERROR_MESSAGE = firstErrorLine(circularError);
                    }
                }

                if (err.name === 'TypeError' && firstErrorLine(err) === CIRCULAR_ERROR_MESSAGE) {
                    return '[Circular]';
                }

                throw err;
            }
        }

        function format() {
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            return formatWithOptionsInternal(undefined, args);
        }

        function formatWithOptions(inspectOptions) {
            if (_typeof(inspectOptions) !== 'object' || inspectOptions === null) {
                throw new ERR_INVALID_ARG_TYPE('inspectOptions', 'object', inspectOptions);
            }

            for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                args[_key2 - 1] = arguments[_key2];
            }

            return formatWithOptionsInternal(inspectOptions, args);
        }

        function formatNumberNoColor(number, options) {
            return formatNumber(stylizeNoColor, number, // Maintain node 12 compat
                // options?.numericSeparator ?? inspectDefaultOptions.numericSeparator
                options != null && options.numericSeparator != null ? options.numericSeparator : inspectDefaultOptions.numericSeparator);
        }

        function formatBigIntNoColor(bigint, options) {
            return formatBigInt(stylizeNoColor, bigint, // Maintain node 12 compat
                // options?.numericSeparator ?? inspectDefaultOptions.numericSeparator
                options != null && options.numericSeparator != null ? options.numericSeparator : inspectDefaultOptions.numericSeparator);
        }

        function formatWithOptionsInternal(inspectOptions, args) {
            var first = args[0];
            var a = 0;
            var str = '';
            var join = '';

            if (typeof first === 'string') {
                if (args.length === 1) {
                    return first;
                }

                var tempStr;
                var lastPos = 0;

                for (var i = 0; i < first.length - 1; i++) {
                    if (StringPrototypeCharCodeAt(first, i) === 37) {
                        // '%'
                        var nextChar = StringPrototypeCharCodeAt(first, ++i);

                        if (a + 1 !== args.length) {
                            switch (nextChar) {
                                case 115:
                                {
                                    // 's'
                                    var tempArg = args[++a];

                                    if (typeof tempArg === 'number') {
                                        tempStr = formatNumberNoColor(tempArg, inspectOptions);
                                    } else if (typeof tempArg === 'bigint') {
                                        tempStr = formatBigIntNoColor(tempArg, inspectOptions);
                                    } else if (_typeof(tempArg) !== 'object' || tempArg === null || !hasBuiltInToString(tempArg)) {
                                        tempStr = String(tempArg);
                                    } else {
                                        tempStr = inspect(tempArg, _objectSpread(_objectSpread({}, inspectOptions), {}, {
                                            compact: 3,
                                            colors: false,
                                            depth: 0
                                        }));
                                    }

                                    break;
                                }

                                case 106:
                                    // 'j'
                                    tempStr = tryStringify(args[++a]);
                                    break;

                                case 100:
                                {
                                    // 'd'
                                    var tempNum = args[++a];

                                    if (typeof tempNum === 'bigint') {
                                        tempStr = formatBigIntNoColor(tempNum, inspectOptions);
                                    } else if (_typeof(tempNum) === 'symbol') {
                                        tempStr = 'NaN';
                                    } else {
                                        tempStr = formatNumberNoColor(Number(tempNum), inspectOptions);
                                    }

                                    break;
                                }

                                case 79:
                                    // 'O'
                                    tempStr = inspect(args[++a], inspectOptions);
                                    break;

                                case 111:
                                    // 'o'
                                    tempStr = inspect(args[++a], _objectSpread(_objectSpread({}, inspectOptions), {}, {
                                        showHidden: true,
                                        showProxy: true,
                                        depth: 4
                                    }));
                                    break;

                                case 105:
                                {
                                    // 'i'
                                    var tempInteger = args[++a];

                                    if (typeof tempInteger === 'bigint') {
                                        tempStr = formatBigIntNoColor(tempInteger, inspectOptions);
                                    } else if (_typeof(tempInteger) === 'symbol') {
                                        tempStr = 'NaN';
                                    } else {
                                        tempStr = formatNumberNoColor(NumberParseInt(tempInteger), inspectOptions);
                                    }

                                    break;
                                }

                                case 102:
                                {
                                    // 'f'
                                    var tempFloat = args[++a];

                                    if (_typeof(tempFloat) === 'symbol') {
                                        tempStr = 'NaN';
                                    } else {
                                        tempStr = formatNumberNoColor(NumberParseFloat(tempFloat), inspectOptions);
                                    }

                                    break;
                                }

                                case 99:
                                    // 'c'
                                    a += 1;
                                    tempStr = '';
                                    break;

                                case 37:
                                    // '%'
                                    str += StringPrototypeSlice(first, lastPos, i);
                                    lastPos = i + 1;
                                    continue;

                                default:
                                    // Any other character is not a correct placeholder
                                    continue;
                            }

                            if (lastPos !== i - 1) {
                                str += StringPrototypeSlice(first, lastPos, i - 1);
                            }

                            str += tempStr;
                            lastPos = i + 1;
                        } else if (nextChar === 37) {
                            str += StringPrototypeSlice(first, lastPos, i);
                            lastPos = i + 1;
                        }
                    }
                }

                if (lastPos !== 0) {
                    a++;
                    join = ' ';

                    if (lastPos < first.length) {
                        str += StringPrototypeSlice(first, lastPos);
                    }
                }
            }

            while (a < args.length) {
                var value = args[a];
                str += join;
                str += typeof value !== 'string' ? inspect(value, inspectOptions) : value;
                join = ' ';
                a++;
            }

            return str;
        }

        if (internalBinding('config').hasIntl) {
            var icu = internalBinding('icu'); // icu.getStringWidth(string, ambiguousAsFullWidth, expandEmojiSequence)
            // Defaults: ambiguousAsFullWidth = false; expandEmojiSequence = true;
            // TODO(BridgeAR): Expose the options to the user. That is probably the
            // best thing possible at the moment, since it's difficult to know what
            // the receiving end supports.

            getStringWidth = function getStringWidth(str) {
                var removeControlChars = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
                var width = 0;
                if (removeControlChars) str = stripVTControlCharacters(str);

                for (var i = 0; i < str.length; i++) {
                    // Try to avoid calling into C++ by first handling the ASCII portion of
                    // the string. If it is fully ASCII, we skip the C++ part.
                    var code = StringPrototypeCharCodeAt(str, i);

                    if (code >= 127) {
                        width += icu.getStringWidth(StringPrototypeNormalize(StringPrototypeSlice(str, i), 'NFC'));
                        break;
                    }

                    width += code >= 32 ? 1 : 0;
                }

                return width;
            };
        } else {
            /**
   * Returns the number of columns required to display the given string.
   */
            getStringWidth = function getStringWidth(str) {
                var removeControlChars = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
                var width = 0;
                if (removeControlChars) str = stripVTControlCharacters(str);
                str = StringPrototypeNormalize(str, 'NFC');

                var _iterator6 = _createForOfIteratorHelper(new SafeStringIterator(str)),
                    _step6;

                try {
                    for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
                        var _char = _step6.value;
                        var code = StringPrototypeCodePointAt(_char, 0);

                        if (isFullWidthCodePoint(code)) {
                            width += 2;
                        } else if (!isZeroWidthCodePoint(code)) {
                            width++;
                        }
                    }
                } catch (err) {
                    _iterator6.e(err);
                } finally {
                    _iterator6.f();
                }

                return width;
            };
            /**
   * Returns true if the character represented by a given
   * Unicode code point is full-width. Otherwise returns false.
   */


            var isFullWidthCodePoint = function isFullWidthCodePoint(code) {
                // Code points are partially derived from:
                // https://www.unicode.org/Public/UNIDATA/EastAsianWidth.txt
                return code >= 0x1100 && (code <= 0x115F || // Hangul Jamo
    code === 0x2329 || // LEFT-POINTING ANGLE BRACKET
    code === 0x232A || // RIGHT-POINTING ANGLE BRACKET
    // CJK Radicals Supplement .. Enclosed CJK Letters and Months
    code >= 0x2E80 && code <= 0x3247 && code !== 0x303F || // Enclosed CJK Letters and Months .. CJK Unified Ideographs Extension A
    code >= 0x3250 && code <= 0x4DBF || // CJK Unified Ideographs .. Yi Radicals
    code >= 0x4E00 && code <= 0xA4C6 || // Hangul Jamo Extended-A
    code >= 0xA960 && code <= 0xA97C || // Hangul Syllables
    code >= 0xAC00 && code <= 0xD7A3 || // CJK Compatibility Ideographs
    code >= 0xF900 && code <= 0xFAFF || // Vertical Forms
    code >= 0xFE10 && code <= 0xFE19 || // CJK Compatibility Forms .. Small Form Variants
    code >= 0xFE30 && code <= 0xFE6B || // Halfwidth and Fullwidth Forms
    code >= 0xFF01 && code <= 0xFF60 || code >= 0xFFE0 && code <= 0xFFE6 || // Kana Supplement
    code >= 0x1B000 && code <= 0x1B001 || // Enclosed Ideographic Supplement
    code >= 0x1F200 && code <= 0x1F251 || // Miscellaneous Symbols and Pictographs 0x1f300 - 0x1f5ff
    // Emoticons 0x1f600 - 0x1f64f
    code >= 0x1F300 && code <= 0x1F64F || // CJK Unified Ideographs Extension B .. Tertiary Ideographic Plane
    code >= 0x20000 && code <= 0x3FFFD);
            };

            var isZeroWidthCodePoint = function isZeroWidthCodePoint(code) {
                return code <= 0x1F || // C0 control codes
    code >= 0x7F && code <= 0x9F || // C1 control codes
    code >= 0x300 && code <= 0x36F || // Combining Diacritical Marks
    code >= 0x200B && code <= 0x200F || // Modifying Invisible Characters
    // Combining Diacritical Marks for Symbols
    code >= 0x20D0 && code <= 0x20FF || code >= 0xFE00 && code <= 0xFE0F || // Variation Selectors
    code >= 0xFE20 && code <= 0xFE2F || // Combining Half Marks
    code >= 0xE0100 && code <= 0xE01EF; // Variation Selectors
            };
        }
        /**
 * Remove all VT control characters. Use to estimate displayed string width.
 */


        function stripVTControlCharacters(str) {
            validateString(str, 'str');
            return StringPrototypeReplace(str, ansi, '');
        }

        module.exports = {
            inspect: inspect,
            format: format,
            formatWithOptions: formatWithOptions,
            getStringWidth: getStringWidth,
            inspectDefaultOptions: inspectDefaultOptions,
            stripVTControlCharacters: stripVTControlCharacters,
            stylizeWithColor: stylizeWithColor,
            stylizeWithHTML: function stylizeWithHTML(str, styleType) {
                var style = inspect.styles[styleType];

                if (style !== undefined) {
                    return "<span style=\"color:" + (style + ";\">") + (str + "</span>");
                }

                return str;
            },
            Proxy: Proxy
        };

        /***/ }),
    /* 1 */
    /***/ ((module, __unused_webpack_exports, __webpack_require__) => {

        // back-patch in primordials in user-land

        function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof SymbolIterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== SymbolPrototype ? "symbol" : typeof obj; }, _typeof(obj); }

        function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError2("Super expression must either be null or a function"); } subClass.prototype = ObjectCreate(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); ObjectDefineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

        function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = ReflectConstruct(Super, arguments, NewTarget); } else { result = FunctionPrototypeApply(Super, this, arguments); } return _possibleConstructorReturn(this, result); }; }

        function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError2("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

        function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

        function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError2("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (MapPrototypeHas(_cache, Class)) return MapPrototypeGet(_cache, Class); MapPrototypeSet(_cache, Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = ObjectCreate(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

        function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = FunctionPrototypeBind(ReflectConstruct); } else { _construct = function _construct(Parent, args, Class) { var a = [null]; FunctionPrototypeApply(a.push, a, args); var Constructor = FunctionPrototypeApply(Function.bind, Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return FunctionPrototypeApply(_construct, null, arguments); }

        function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !ReflectConstruct) return false; if (ReflectConstruct.sham) return false; if (typeof Proxy === "function") return true; try { BooleanPrototypeValueOf(ReflectConstruct(Boolean, [], function () {})); return true; } catch { return false; } }

        function _isNativeFunction(fn) { return StringPrototypeIndexOf(FunctionPrototypeToString(fn), "[native code]") !== -1; }

        function _setPrototypeOf(o, p) { _setPrototypeOf = ObjectSetPrototypeOf ? FunctionPrototypeBind(ObjectSetPrototypeOf) : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

        function _getPrototypeOf(o) { _getPrototypeOf = ObjectSetPrototypeOf ? FunctionPrototypeBind(ObjectGetPrototypeOf) : function _getPrototypeOf(o) { return o.__proto__ || ObjectGetPrototypeOf(o); }; return _getPrototypeOf(o); }

        function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError2("Cannot call a class as a function"); } }

        function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; ObjectDefineProperty(target, descriptor.key, descriptor); } }

        function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); ObjectDefineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

        var createSafeIterator = function createSafeIterator(factory, _next) {
            var SafeIterator = /*#__PURE__*/function (_Symbol$iterator) {
                function SafeIterator(iterable) {
                    _classCallCheck(this, SafeIterator);

                    this._iterator = factory(iterable);
                }

                _createClass(SafeIterator, [{
                    key: "next",
                    value: function next() {
                        return _next(this._iterator);
                    }
                }, {
                    key: _Symbol$iterator,
                    value: function value() {
                        return this;
                    }
                }]);

                return SafeIterator;
            }(SymbolIterator);

            ObjectSetPrototypeOf(SafeIterator.prototype, null);
            ObjectFreeze(SafeIterator.prototype);
            ObjectFreeze(SafeIterator);
            return SafeIterator;
        };

        function getGetter(cls, getter) {
            // TODO: __lookupGetter__ is deprecated, but Object.getOwnPropertyDescriptor
            // doesn't work on built-ins like Typed Arrays.
            return FunctionPrototypeBind(FunctionCall, LookupGetter(cls?.prototype, getter));
        }

        function getterCaller(getter) {
            return function (val) {
                return FunctionPrototypeCall(LookupGetter(val?.constructor?.prototype, getter), val);
            };
        }

        function uncurryThis(func) {
            return FunctionPrototypeBind(FunctionCall, func);
        }

        var copyProps = function copyProps(src, dest) {
            ArrayPrototypeForEach(ReflectOwnKeys(src), function (key) {
                if (!ReflectGetOwnPropertyDescriptor(dest, key)) {
                    ReflectDefineProperty(dest, key, ReflectGetOwnPropertyDescriptor(src, key));
                }
            });
        };

        var makeSafe = function makeSafe(unsafe, safe) {
            if (SymbolIterator in unsafe.prototype) {
                var dummy = new unsafe();
                var next; // We can reuse the same `next` method.

                ArrayPrototypeForEach(ReflectOwnKeys(unsafe.prototype), function (key) {
                    if (!ReflectGetOwnPropertyDescriptor(safe.prototype, key)) {
                        var desc = ReflectGetOwnPropertyDescriptor(unsafe.prototype, key);

                        if (typeof desc.value === 'function' && desc.value.length === 0 && SymbolIterator in (FunctionPrototypeCall(FunctionCall, desc.value, dummy) || {})) {
                            var createIterator = uncurryThis(desc.value);

                            if (next == null) {
                                next = uncurryThis(createIterator(dummy).next);
                            }

                            var SafeIterator = createSafeIterator(createIterator, next);

                            desc.value = function () {
                                return new SafeIterator(this);
                            };
                        }

                        ReflectDefineProperty(safe.prototype, key, desc);
                    }
                });
            } else {
                copyProps(unsafe.prototype, safe.prototype);
            }

            copyProps(unsafe, safe);
            ObjectSetPrototypeOf(safe.prototype, null);
            ObjectFreeze(safe.prototype);
            ObjectFreeze(safe);
            return safe;
        };

        var StringIterator = FunctionPrototypeBind(FunctionCall, StringPrototypeIterator);
        var StringIteratorPrototype = ReflectGetPrototypeOf(StringIterator(''));

        function ErrorCaptureStackTrace(targetObject) {
            var stack = new Error().stack; // Remove the second line, which is this function

            targetObject.stack = StringPrototypeReplace(stack, /.*\n.*/, '$1');
        }

        module.exports = {
            makeSafe: makeSafe,
            // exported for testing
            internalBinding: function internalBinding(mod) {
                if (mod === 'config') {
                    return {
                        hasIntl: false
                    };
                }

                throw new Error("unknown module: \"" + (mod + "\""));
            },
            Array: Array,
            ArrayIsArray: Array.isArray,
            ArrayPrototypeFilter: Function.prototype.call.bind(Array.prototype.filter),
            ArrayPrototypeForEach: Function.prototype.call.bind(Array.prototype.forEach),
            ArrayPrototypeIncludes: Function.prototype.call.bind(Array.prototype.includes),
            ArrayPrototypeIndexOf: Function.prototype.call.bind(Array.prototype.indexOf),
            ArrayPrototypeJoin: Function.prototype.call.bind(Array.prototype.join),
            ArrayPrototypePop: Function.prototype.call.bind(Array.prototype.pop),
            ArrayPrototypePush: Function.prototype.call.bind(Array.prototype.push),
            ArrayPrototypePushApply: Function.apply.bind(Array.prototype.push),
            ArrayPrototypeSort: Function.prototype.call.bind(Array.prototype.sort),
            ArrayPrototypeSplice: Function.prototype.call.bind(Array.prototype.slice),
            ArrayPrototypeUnshift: Function.prototype.call.bind(Array.prototype.unshift),
            BigIntPrototypeValueOf: Function.prototype.call.bind(BigInt.prototype.valueOf),
            BooleanPrototypeValueOf: Function.prototype.call.bind(Boolean.prototype.valueOf),
            DatePrototypeGetTime: Function.prototype.call.bind(Date.prototype.getTime),
            DatePrototypeToISOString: Function.prototype.call.bind(Date.prototype.toISOString),
            DatePrototypeToString: Function.prototype.call.bind(Date.prototype.toString),
            ErrorCaptureStackTrace: ErrorCaptureStackTrace,
            ErrorPrototypeToString: Function.prototype.call.bind(Error.prototype.toString),
            FunctionPrototypeCall: Function.prototype.call.bind(Function.prototype.call),
            FunctionPrototypeToString: Function.prototype.call.bind(Function.prototype.toString),
            globalThis: typeof globalThis === 'undefined' ? __webpack_require__.g : globalThis,
            JSONStringify: JSON.stringify,
            MapPrototypeGetSize: getGetter(Map, 'size'),
            MapPrototypeEntries: Function.prototype.call.bind(Map.prototype.entries),
            MathFloor: Math.floor,
            MathMax: Math.max,
            MathMin: Math.min,
            MathRound: Math.round,
            MathSqrt: Math.sqrt,
            MathTrunc: Math.trunc,
            Number: Number,
            NumberIsFinite: Number.isFinite,
            NumberIsNaN: Number.isNaN,
            NumberParseFloat: Number.parseFloat,
            NumberParseInt: Number.parseInt,
            NumberPrototypeValueOf: Function.prototype.call.bind(Number.prototype.valueOf),
            Object: Object,
            ObjectAssign: Object.assign,
            ObjectCreate: Object.create,
            ObjectDefineProperty: Object.defineProperty,
            ObjectGetOwnPropertyDescriptor: Object.getOwnPropertyDescriptor,
            ObjectGetOwnPropertyNames: Object.getOwnPropertyNames,
            ObjectGetOwnPropertySymbols: Object.getOwnPropertySymbols,
            ObjectGetPrototypeOf: Object.getPrototypeOf,
            ObjectIs: Object.is,
            ObjectKeys: Object.keys,
            ObjectPrototypeHasOwnProperty: Function.prototype.call.bind(Object.prototype.hasOwnProperty),
            ObjectPrototypePropertyIsEnumerable: Function.prototype.call.bind(Object.prototype.propertyIsEnumerable),
            ObjectSeal: Object.seal,
            ObjectSetPrototypeOf: Object.setPrototypeOf,
            ReflectApply: Reflect.apply,
            ReflectOwnKeys: Reflect.ownKeys,
            RegExp: RegExp,
            RegExpPrototypeTest: Function.prototype.call.bind(RegExp.prototype.test),
            RegExpPrototypeToString: Function.prototype.call.bind(RegExp.prototype.toString),
            SafeStringIterator: createSafeIterator(StringIterator, Function.prototype.call.bind(StringIteratorPrototype.next)),
            SafeMap: makeSafe(Map, /*#__PURE__*/function (_Map) {
                _inherits(SafeMap, _Map);

                var _super = _createSuper(SafeMap);

                function SafeMap(i) {
                    _classCallCheck(this, SafeMap);

                    return FunctionPrototypeCall(_super, this, i);
                } // --eslint-disable-line no-useless-constructor


                return _createClass(SafeMap);
            }( /*#__PURE__*/_wrapNativeSuper(Map))),
            SafeSet: makeSafe(Set, /*#__PURE__*/function (_Set) {
                _inherits(SafeSet, _Set);

                var _super2 = _createSuper(SafeSet);

                function SafeSet(i) {
                    _classCallCheck(this, SafeSet);

                    return FunctionPrototypeCall(_super2, this, i);
                } // --eslint-disable-line no-useless-constructor


                return _createClass(SafeSet);
            }( /*#__PURE__*/_wrapNativeSuper(Set))),
            SetPrototypeGetSize: getGetter(Set, 'size'),
            SetPrototypeValues: Function.prototype.call.bind(Set.prototype.values),
            String: String,
            StringPrototypeCharCodeAt: Function.prototype.call.bind(String.prototype.charCodeAt),
            StringPrototypeCodePointAt: Function.prototype.call.bind(String.prototype.codePointAt),
            StringPrototypeEndsWith: Function.prototype.call.bind(String.prototype.endsWith),
            StringPrototypeIncludes: Function.prototype.call.bind(String.prototype.includes),
            StringPrototypeNormalize: Function.prototype.call.bind(String.prototype.normalize),
            StringPrototypePadEnd: Function.prototype.call.bind(String.prototype.padEnd),
            StringPrototypePadStart: Function.prototype.call.bind(String.prototype.padStart),
            StringPrototypeRepeat: Function.prototype.call.bind(String.prototype.repeat),
            StringPrototypeReplace: Function.prototype.call.bind(String.prototype.replace),
            StringPrototypeSlice: Function.prototype.call.bind(String.prototype.slice),
            StringPrototypeSplit: Function.prototype.call.bind(String.prototype.split),
            StringPrototypeToLowerCase: Function.prototype.call.bind(String.prototype.toLowerCase),
            StringPrototypeTrim: Function.prototype.call.bind(String.prototype.trim),
            StringPrototypeValueOf: Function.prototype.call.bind(String.prototype.valueOf),
            SymbolPrototypeToString: Function.prototype.call.bind(Symbol.prototype.toString),
            SymbolPrototypeValueOf: Function.prototype.call.bind(Symbol.prototype.valueOf),
            SymbolIterator: Symbol.iterator,
            SymbolFor: Symbol["for"],
            SymbolToStringTag: Symbol.toStringTag,
            TypedArrayPrototypeGetLength: getterCaller('length'),
            Uint8Array: Uint8Array,
            uncurryThis: uncurryThis
        };

        /***/ }),
    /* 2 */
    /***/ ((module, __unused_webpack_exports, __webpack_require__) => {



        function _typeof(obj) { if (!obj.constructor) return 'object'; "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof SymbolIterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== SymbolPrototype ? "symbol" : typeof obj; }, _typeof(obj); }

        function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[SymbolIterator] || o["@@iterator"]; if (!it) { if (ArrayIsArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError2("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = FunctionPrototypeCall(it, o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

        function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

        function _nonIterableRest() { throw new TypeError2("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

        function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = StringPrototypeSlice(ObjectPrototypeToString(o), 8, -1); if (n === "Object" && o.constructor) n = o.constructor?.name; if (n === "Map" || n === "Set") return ArrayFrom(o); if (n === "Arguments" || RegExpPrototypeTest(/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/, n)) return _arrayLikeToArray(o, minLen); }

        function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

        function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[SymbolIterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = FunctionPrototypeCall(_i, arr); !(_n = (_s = _i.next()).done); _n = true) { ArrayPrototypePush(_arr, _s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

        function _arrayWithHoles(arr) { if (ArrayIsArray(arr)) return arr; }

        var prxy = __webpack_require__(3);

        var ALL_PROPERTIES = 0;
        var ONLY_ENUMERABLE = 2;
        var kPending = Symbol('kPending');
        var kRejected = Symbol('kRejected');

        function getOwnNonIndexProperties(a) {
            var filter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ONLY_ENUMERABLE;
            var desc = ObjectGetOwnPropertyDescriptors(a);
            var ret = [];

            for (var _i = 0, _Object$entries = ObjectEntries(desc); _i < _Object$entries.length; _i++) {
                var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
                    k = _Object$entries$_i[0],
                    v = _Object$entries$_i[1];

                if (!RegExpPrototypeTest(/^(0|[1-9][0-9]*)$/, k) || GlobalParseInt(k, 10) >= (2 ** 32) - 1) {
                    // Arrays are limited in size
                    if (filter === ONLY_ENUMERABLE && !v.enumerable) {
                        continue;
                    }

                    ArrayPrototypePush(ret, k);
                }
            }

            var _iterator = _createForOfIteratorHelper(ObjectGetOwnPropertySymbols(a)),
                _step;

            try {
                for (_iterator.s(); !(_step = _iterator.n()).done;) {
                    var s = _step.value;

                    var _v = ObjectGetOwnPropertyDescriptor(a, s);

                    if (filter === ONLY_ENUMERABLE && !_v.enumerable) {
                        continue;
                    }

                    ArrayPrototypePush(ret, s);
                }
            } catch (err) {
                _iterator.e(err);
            } finally {
                _iterator.f();
            }

            return ret;
        }

        module.exports = {
            getOwnNonIndexProperties: getOwnNonIndexProperties,
            getPromiseDetails: function getPromiseDetails() {
                return [kPending, undefined];
            },
            getProxyDetails: prxy.getProxyDetails,
            Proxy: prxy.Proxy,
            kPending: kPending,
            kRejected: kRejected,
            previewEntries: function previewEntries(val) {
                return [[], false];
            },
            getConstructorName: function getConstructorName(val) {
                if (!val || _typeof(val) !== 'object') {
                    throw new Error('Invalid object');
                }

                if (val.constructor && val.constructor?.name) {
                    return val.constructor?.name;
                }

                var str = ObjectPrototypeToString(val); // e.g. [object Boolean]
                var m = StringPrototypeMatch(str, /^\[object ([^\]]+)\]/);

                if (m) {
                    if (m[1] === 'CallbackObject') return 'Object';
                    return m[1];
                }

                return 'Object';
            },
            getExternalValue: function getExternalValue() {
                return BigInt(0);
            },
            propertyFilter: {
                ALL_PROPERTIES: ALL_PROPERTIES,
                ONLY_ENUMERABLE: ONLY_ENUMERABLE
            }
        };

        /***/ }),
    /* 3 */
    /***/ ((module) => {



        //function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError2("Cannot call a class as a function"); } }

        function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; ObjectDefineProperty(target, descriptor.key, descriptor); } }

        function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); ObjectDefineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

        var ALL_PROXIES = new WeakMap();

        var Prxy = /*#__PURE__*/function () {
            function Prxy(target, handler) {
                //_classCallCheck(this, Prxy);
                if (!new.target) return originalproxy(); // throws

                var p = new originalproxy(target, handler);
                WeakMapPrototypeSet(ALL_PROXIES, p, [target, handler]); // --eslint-disable-next-line no-constructor-return

                return p;
            }

            _createClass(Prxy, null, [{
                key: "getProxyDetails",
                value: function getProxyDetails(obj) {
                    var getFullProxy = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
                    var deets = WeakMapPrototypeGet(ALL_PROXIES, obj);

                    if (!deets) {
                        return undefined;
                    }

                    if (getFullProxy) {
                        return deets;
                    }

                    return deets[0];
                }
            }]);

            return Prxy;
        }();

        module.exports = {
            getProxyDetails: FunctionPrototypeBind(Prxy.getProxyDetails, Prxy),
            Proxy: Prxy
        };

        /***/ }),
    /* 4 */
    /***/ ((module) => {

        // eslint-disable-next-line no-control-regex
        var colorRegExp = /\u001B\[\d\d?m/g;
        module.exports = {
            customInspectSymbol: Symbol["for"]('nodejs.util.inspect.custom'),
            isError: function isError(e) {
                return e instanceof Error;
            },
            join: ArrayPrototypeJoin,
            removeColors: function removeColors(str) {
                return StringPrototypeReplace(str, colorRegExp, '');
            }
        };

        /***/ }),
    /* 5 */
    /***/ ((module, __unused_webpack_exports, __webpack_require__) => {

        /* --eslint node-core/documented-errors: "error" */

        /* --eslint node-core/alphabetize-errors: "error" */

        /* --eslint node-core/prefer-util-format-errors: "error" */
        // The whole point behind this internal module is to allow Node.js to no
        // longer be forced to treat every error message change as a semver-major
        // change. The NodeError classes here all expose a `code` property whose
        // value statically and permanently identifies the error. While the error
        // message may change, the code should not.

        function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof SymbolIterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== SymbolPrototype ? "symbol" : typeof obj; }, _typeof(obj); }

        function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[SymbolIterator] || o["@@iterator"]; if (!it) { if (ArrayIsArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError2("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = FunctionPrototypeCall(it, o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

        function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = StringPrototypeSlice(ObjectPrototypeToString(o), 8, -1); if (n === "Object" && o.constructor) n = o.constructor?.name; if (n === "Map" || n === "Set") return ArrayFrom(o); if (n === "Arguments" || RegExpPrototypeTest(/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/, n)) return _arrayLikeToArray(o, minLen); }

        function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

        var _require = __webpack_require__(1),
            ArrayIsArray = _require.ArrayIsArray,
            ArrayPrototypeIncludes = _require.ArrayPrototypeIncludes,
            ArrayPrototypeIndexOf = _require.ArrayPrototypeIndexOf,
            ArrayPrototypeJoin = _require.ArrayPrototypeJoin,
            ArrayPrototypePop = _require.ArrayPrototypePop,
            ArrayPrototypePush = _require.ArrayPrototypePush,
            ArrayPrototypeSplice = _require.ArrayPrototypeSplice,
            ErrorCaptureStackTrace = _require.ErrorCaptureStackTrace,
            ObjectDefineProperty = _require.ObjectDefineProperty,
            ReflectApply = _require.ReflectApply,
            RegExpPrototypeTest = _require.RegExpPrototypeTest,
            SafeMap = _require.SafeMap,
            StringPrototypeEndsWith = _require.StringPrototypeEndsWith,
            StringPrototypeIncludes = _require.StringPrototypeIncludes,
            StringPrototypeSlice = _require.StringPrototypeSlice,
            StringPrototypeToLowerCase = _require.StringPrototypeToLowerCase;

        var messages = new SafeMap();
        var codes = {};
        var classRegExp = /^([A-Z][a-z0-9]*)+$/; // Sorted by a rough estimate on most frequently used entries.

        var kTypes = ['string', 'function', 'number', 'object', // Accept 'Function' and 'Object' as alternative to the lower cased version.
            'Function', 'Object', 'boolean', 'bigint', 'symbol'];
        var userStackTraceLimit;
        var nodeInternalPrefix = '__node_internal_'; // Lazily loaded

        var assert;
        var internalUtilInspect = null;

        function lazyInternalUtilInspect() {
            if (!internalUtilInspect) {
                internalUtilInspect = __webpack_require__(0);
            }

            return internalUtilInspect;
        }

        var addCodeToName = hideStackFrames(function addCodeToName(err, name, code) {
            // Set the stack
            err = captureLargerStackTrace(err); // Add the error code to the name to include it in the stack trace.

            err.name = "" + (name + " [") + (code + "]"); // Access the stack to generate the error message including the error code
            // from the name.

            err.stack; // --eslint-disable-line no-unused-expressions
            // Reset the name to the actual name.

            delete err.name;
        });

        function makeNodeErrorWithCode(Base, key) {
            return function NodeError() {
                var limit = Error.stackTraceLimit;
                Error.stackTraceLimit = 0;
                var error = new Base(); // Reset the limit and setting the name property.

                Error.stackTraceLimit = limit;

                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                }

                var message = getMessage(key, args, error);
                ObjectDefineProperty(error, 'message', {
                    value: message,
                    enumerable: false,
                    writable: true,
                    configurable: true
                });
                ObjectDefineProperty(error, 'toString', {
                    value: function value() {
                        return ""+(this.name + " [")+(key + "]: ") + (this.message);
                    },
                    enumerable: false,
                    writable: true,
                    configurable: true
                });
                addCodeToName(error, Base.name, key);
                error.code = key;
                return error;
            };
        } // This function removes unnecessary frames from Node.js core errors.


        function hideStackFrames(fn) {
            // We rename the functions that will be hidden to cut off the stacktrace
            // at the outermost one
            var hidden = nodeInternalPrefix + fn.name;
            ObjectDefineProperty(fn, 'name', {
                value: hidden
            });
            return fn;
        } // Utility function for registering the error codes. Only used here. Exported
        // *only* to allow for testing.


        function E(sym, val, def) {
            // Special case for SystemError that formats the error message differently
            // The SystemErrors only have SystemError as their base classes.
            MapPrototypeSet(messages, sym, val);
            codes[sym] = makeNodeErrorWithCode(def, sym);
        }

        function getMessage(key, args, self) {
            var msg = MapPrototypeGet(messages, key);
            if (assert === undefined) assert = __webpack_require__(6);
            assert(typeof msg === 'function');
            assert(msg.length <= args.length, // Default options do not count.
                "Code: " + key + "; The provided arguments length (" + args.length + ") does not " + "match the required ones (" + msg.length + ").");
            return ReflectApply(msg, self, args);
        }

        var captureLargerStackTrace = hideStackFrames(function captureLargerStackTrace(err) {
            userStackTraceLimit = Error.stackTraceLimit;
            Error.stackTraceLimit = Infinity;
            ErrorCaptureStackTrace(err); // Reset the limit

            Error.stackTraceLimit = userStackTraceLimit;
            return err;
        });
        var maxStack_ErrorName;
        var maxStack_ErrorMessage;
        /**
 * Returns true if `err.name` and `err.message` are equal to engine-specific
 * values indicating max call stack size has been exceeded.
 * "Maximum call stack size exceeded" in V8.
 *
 * @param {Error} err
 * @returns {boolean}
 */

        function isStackOverflowError(err) {
            if (maxStack_ErrorMessage === undefined) {
                try {
                    var overflowStack = function overflowStack() {
                        overflowStack();
                    };

                    overflowStack();
                } catch (err) {
                    maxStack_ErrorMessage = err.message;
                    maxStack_ErrorName = err.name;
                }
            }

            return err && err.name === maxStack_ErrorName && err.message === maxStack_ErrorMessage;
        }

        module.exports = {
            codes: codes,
            hideStackFrames: hideStackFrames,
            isStackOverflowError: isStackOverflowError
        };
        E('ERR_INVALID_ARG_TYPE', function (name, expected, actual) {
            assert(typeof name === 'string', "'name' must be a string");

            if (!ArrayIsArray(expected)) {
                expected = [expected];
            }

            var msg = 'The ';

            if (StringPrototypeEndsWith(name, ' argument')) {
                // For cases like 'first argument'
                msg += "" + (name + " ");
            } else {
                var type = StringPrototypeIncludes(name, '.') ? 'property' : 'argument';
                msg += "\"" + (name + "\" ") + (type + " ");
            }

            msg += 'must be ';
            var types = [];
            var instances = [];
            var other = [];

            var _iterator = _createForOfIteratorHelper(expected),
                _step;

            try {
                for (_iterator.s(); !(_step = _iterator.n()).done;) {
                    var value = _step.value;
                    assert(typeof value === 'string', 'All expected entries have to be of type string');

                    if (ArrayPrototypeIncludes(kTypes, value)) {
                        ArrayPrototypePush(types, StringPrototypeToLowerCase(value));
                    } else if (RegExpPrototypeTest(classRegExp, value)) {
                        ArrayPrototypePush(instances, value);
                    } else {
                        assert(value !== 'object', 'The value "object" should be written as "Object"');
                        ArrayPrototypePush(other, value);
                    }
                } // Special handle `object` in case other instances are allowed to outline
                // the differences between each other.

            } catch (err) {
                _iterator.e(err);
            } finally {
                _iterator.f();
            }

            if (instances.length > 0) {
                var pos = ArrayPrototypeIndexOf(types, 'object');

                if (pos !== -1) {
                    ArrayPrototypeSplice(types, pos, 1);
                    ArrayPrototypePush(instances, 'Object');
                }
            }

            if (types.length > 0) {
                if (types.length > 2) {
                    var last = ArrayPrototypePop(types);
                    msg += "one of type " + (ArrayPrototypeJoin(types, ', ') + ", or ") + (last);
                } else if (types.length === 2) {
                    msg += "one of type " + (types[0] + " or ") + (types[1]);
                } else {
                    msg += "of type " + (types[0]);
                }

                if (instances.length > 0 || other.length > 0) msg += ' or ';
            }

            if (instances.length > 0) {
                if (instances.length > 2) {
                    var _last = ArrayPrototypePop(instances);

                    msg += "an instance of " + (ArrayPrototypeJoin(instances, ', ') +  ", or ") + (_last);
                } else {
                    msg += "an instance of " + (instances[0]);

                    if (instances.length === 2) {
                        msg += " or " + (instances[1]);
                    }
                }

                if (other.length > 0) msg += ' or ';
            }

            if (other.length > 0) {
                if (other.length > 2) {
                    var _last2 = ArrayPrototypePop(other);

                    msg += "one of " + (ArrayPrototypeJoin(other, ', ') + ", or ") + (_last2);
                } else if (other.length === 2) {
                    msg += "one of "+(other[0] + " or ") + (other[1]);
                } else {
                    if (StringPrototypeToLowerCase(other[0]) !== other[0]) msg += 'an ';
                    msg += ""+(other[0]);
                }
            }

            if (actual == null) {
                msg += ". Received " + actual;
            } else if (typeof actual === 'function' && actual.name) {
                msg += ". Received function " + actual.name;
            } else if (_typeof(actual) === 'object') {
                if (actual.constructor && actual.constructor?.name) {
                    msg += ". Received an instance of "+actual.constructor?.name;
                } else {
                    var inspected = lazyInternalUtilInspect().inspect(actual, {
                        depth: -1
                    });
                    msg += ". Received " + inspected;
                }
            } else {
                var _inspected = lazyInternalUtilInspect().inspect(actual, {
                    colors: false
                });

                if (_inspected.length > 25) _inspected = ""+(StringPrototypeSlice(_inspected, 0, 25) + "...");
                msg += ". Received type "+(_typeof(actual) + " (")+(_inspected + ")");
            }

            return msg;
        }, TypeError2);

        /***/ }),
    /* 6 */
    /***/ ((module) => {



        module.exports = function assert(p) {
            if (!p) {
                throw new Error('Assertion failed');
            }
        };

        /***/ }),
    /* 7 */
    /***/ ((module, __unused_webpack_exports, __webpack_require__) => {



        function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof SymbolIterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== SymbolPrototype ? "symbol" : typeof obj; }, _typeof(obj); }

        var _require = __webpack_require__(2),
            getConstructorName = _require.getConstructorName; // From https://mathiasbynens.be/notes/globalthis

        /* c8 ignore start */
        // only needed for node 10


        (function () {
            if ((typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) === 'object') return;
            ObjectDefineProperty(Object.prototype, '__magic__', {
                get: function get() {
                    return this;
                },
                configurable: true
            }); // --eslint-disable-next-line no-undef

            __magic__.globalThis = __magic__;
            delete Object.prototype.__magic__;
        })();
        /* c8 ignore stop */


        function constructorNamed(val) {
            for (var _len = arguments.length, name = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                name[_key - 1] = arguments[_key];
            }

            // Pass in names rather than types, in case SharedArrayBuffer (e.g.) isn't
            // in your browser
            for (var _i = 0, _name = name; _i < _name.length; _i++) {
                var n = _name[_i];
                var typ = globalThis[n];

                if (typ) {
                    if (val instanceof typ) {
                        return true;
                    }
                }
            } // instanceOf doesn't work across vm boundaries, so check the whole
            // inheritance chain


            while (val) {
                if (_typeof(val) !== 'object') {
                    return false;
                }

                if (ArrayPrototypeIndexOf(name, getConstructorName(val)) >= 0) {
                    return true;
                }

                val = ObjectGetPrototypeOf(val);
            }

            return false;
        }

        function checkBox(cls) {
            return function (val) {
                if (!constructorNamed(val, cls.name)) {
                    return false;
                }

                try {
                    FunctionPrototypeCall(cls.prototype.valueOf, val);
                } catch {
                    return false;
                }

                return true;
            };
        }

        var isStringObject = checkBox(String);
        var isNumberObject = checkBox(Number);
        var isBooleanObject = checkBox(Boolean);
        var isBigIntObject = checkBox(BigInt);
        var isSymbolObject = checkBox(Symbol);
        module.exports = {
            isAsyncFunction: function isAsyncFunction(val) {
                return typeof val === 'function' && StringPrototypeStartsWith(FunctionPrototypeToString(val), 'async');
            },
            isGeneratorFunction: function isGeneratorFunction(val) {
                return typeof val === 'function' && StringPrototypeMatch(FunctionPrototypeToString(val), /^(async\s+)?function *\*/);
            },
            isAnyArrayBuffer: function isAnyArrayBuffer(val) {
                return constructorNamed(val, 'ArrayBuffer', 'SharedArrayBuffer');
            },
            isArrayBuffer: function isArrayBuffer(val) {
                return constructorNamed(val, 'ArrayBuffer');
            },
            isArgumentsObject: function isArgumentsObject(val) {
                var cond = val !== null && _typeof(val) === 'object' && !ArrayIsArray(val) && typeof val.length === 'number' && val.length === (val.length | 0) && val.length >= 0;

                if (cond) {
                    var prop = ObjectGetOwnPropertyDescriptor(val, 'callee');
                    return prop && !prop.enumerable;
                }

                return false;
            },
            isBoxedPrimitive: function isBoxedPrimitive(val) {
                return isNumberObject(val) || isStringObject(val) || isBooleanObject(val) || isBigIntObject(val) || isSymbolObject(val);
            },
            isDataView: function isDataView(val) {
                return constructorNamed(val, 'DataView');
            },
            isExternal: function isExternal(val) {
                return _typeof(val) === 'object' && ObjectIsFrozen(val) && ObjectGetPrototypeOf(val) == null;
            },
            isMap: function isMap(val) {
                if (!constructorNamed(val, 'Map')) {
                    return false;
                }

                try {
                    MapPrototypeHas(val);
                } catch {
                    return false;
                }

                return true;
            },
            isMapIterator: function isMapIterator(val) {
                return ObjectPrototypeToString(ObjectGetPrototypeOf(val)) === '[object Map Iterator]';
            },
            isModuleNamespaceObject: function isModuleNamespaceObject(val) {
                // TODO: this is weak and easily faked
                return val && _typeof(val) === 'object' && val[SymbolToStringTag] === 'Module';
            },
            isNativeError: function isNativeError(val) {
                return val instanceof Error && constructorNamed(val, 'Error', 'EvalError', 'RangeError', 'ReferenceError', 'SyntaxError', 'TypeError', 'URIError', 'AggregateError');
            },
            isPromise: function isPromise(val) {
                return constructorNamed(val, 'Promise');
            },
            isSet: function isSet(val) {
                if (!constructorNamed(val, 'Set')) {
                    return false;
                }

                try {
                    SetPrototypeHas(val);
                } catch {
                    return false;
                }

                return true;
            },
            isSetIterator: function isSetIterator(val) {
                return ObjectPrototypeToString(ObjectGetPrototypeOf(val)) === '[object Set Iterator]';
            },
            isWeakMap: function isWeakMap(val) {
                return constructorNamed(val, 'WeakMap');
            },
            isWeakSet: function isWeakSet(val) {
                return constructorNamed(val, 'WeakSet');
            },
            isRegExp: function isRegExp(val) {
                return constructorNamed(val, 'RegExp');
            },
            isDate: function isDate(val) {
                if (constructorNamed(val, 'Date')) {
                    try {
                        DatePrototypeGetTime(val); // Throws for pseudo-dates

                        return true;
                    } catch {// Ignored
                    }
                }

                return false;
            },
            isTypedArray: function isTypedArray(val) {
                return constructorNamed(val, 'Int8Array', 'Uint8Array', 'Uint8ClampedArray', 'Int16Array', 'Uint16Array', 'Int32Array', 'Uint32Array', 'Float32Array', 'Float64Array', 'BigInt64Array', 'BigUint64Array');
            },
            isStringObject: isStringObject,
            isNumberObject: isNumberObject,
            isBooleanObject: isBooleanObject,
            isBigIntObject: isBigIntObject,
            isSymbolObject: isSymbolObject
        };

        /***/ }),
    /* 8 */
    /***/ ((__unused_webpack_module, exports) => {



        exports.NativeModule = {
            exists: function exists(name) {
                // TODO: hack
                return !StringPrototypeStartsWith(name, '/');
            }
        };

        /***/ }),
    /* 9 */
    /***/ ((module, __unused_webpack_exports, __webpack_require__) => {



        function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof SymbolIterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== SymbolPrototype ? "symbol" : typeof obj; }, _typeof(obj); }

        var _require = __webpack_require__(1),
            ArrayIsArray = _require.ArrayIsArray;

        var _require2 = __webpack_require__(5),
            hideStackFrames = _require2.hideStackFrames,
            ERR_INVALID_ARG_TYPE = _require2.codes.ERR_INVALID_ARG_TYPE;
        /**
 * @param {unknown} value
 * @param {string} name
 * @param {{
 *   allowArray?: boolean,
 *   allowFunction?: boolean,
 *   nullable?: boolean
 * }} [options]
 */


        var validateObject = hideStackFrames(function (value, name, options) {
            var useDefaultOptions = options == null;
            var allowArray = useDefaultOptions ? false : options.allowArray;
            var allowFunction = useDefaultOptions ? false : options.allowFunction;
            var nullable = useDefaultOptions ? false : options.nullable;

            if (!nullable && value === null || !allowArray && ArrayIsArray(value) || _typeof(value) !== 'object' && (!allowFunction || typeof value !== 'function')) {
                throw new ERR_INVALID_ARG_TYPE(name, 'Object', value);
            }
        });

        function validateString(value, name) {
            if (typeof value !== 'string') throw new ERR_INVALID_ARG_TYPE(name, 'string', value);
        }

        module.exports = {
            validateObject: validateObject,
            validateString: validateString
        };

        /***/ }),
    /* 10 */
    /***/ ((__unused_webpack_module, exports) => {



        function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError2("Cannot call a class as a function"); } }

        function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; ObjectDefineProperty(target, descriptor.key, descriptor); } }

        function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); ObjectDefineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

        var Buffer = /*#__PURE__*/function () {
            function Buffer() {
                _classCallCheck(this, Buffer);
            }

            _createClass(Buffer, [{
                key: "hexSlice",
                value: function hexSlice() {
                    var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
                    var end = arguments.length > 1 ? arguments[1] : undefined;
                    return ArrayPrototypeJoin(ArrayPrototypeMap2(ArrayPrototypeSlice(this, start, end), function (x) {
                        return StringPrototypeSlice('00' + NumberPrototypeToString(x, 16), -2);
                    }), '');
                }
            }]);

            return Buffer;
        }();

        exports.Buffer = Buffer;

        /***/ })
/******/ ]);
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
    /******/ 	if (cachedModule !== undefined) {
        /******/ 		return cachedModule.exports;
        /******/ 	}
    /******/ 	// Create a new module (and put it into the cache)
    /******/ 	var module = __webpack_module_cache__[moduleId] = {
        /******/ 		// no module.id needed
        /******/ 		// no module.loaded needed
        /******/ 		exports: {}
        /******/ 	};
    /******/
    /******/ 	// Execute the module function
    /******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
    /******/
    /******/ 	// Return the exports of the module
    /******/ 	return module.exports;
/******/ }
/******/
/************************************************************************/
/******/ /* webpack/runtime/global */
/******/ (() => {
/******/ 	__webpack_require__.g = (function() {
        /******/ 		if (typeof globalThis === 'object') return globalThis;
        /******/ 		try {
            /******/ 			return this || new Function('return this')();
            /******/ 		} catch {
            /******/ 			if (typeof window === 'object') return window;
            /******/ 		}
        /******/ 	})();
/******/ })();
/******/
/************************************************************************/
/******/
/******/ // startup
/******/ // Load entry module and return exports
/******/ // This entry module is referenced by other modules so it can't be inlined
/******/ var __webpack_exports__ = __webpack_require__(0);
/******/ var __webpack_export_target__ = exports;
/******/ for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ if(__webpack_exports__.__esModule) ObjectDefineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/
