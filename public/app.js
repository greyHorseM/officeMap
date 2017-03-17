/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
    //отвязать события от рабочих мест, привязать события выбора комнаты только к комнате
    //масштабирование карты, разедлить области на карту и на список сотрудников

class Map {
    constructor(rooms){
        this.rooms = rooms;
        this.createMap();
        console.log("map constructor is running...");
    }

    createMap() {
        var s = Snap('#svg');
        this.rooms = this.rooms.map(this.createFigure(s));
        var g = s.group(...this.rooms);
        var [room1, room2, room3] = this.rooms;
        g.drag();
        var svg = document.getElementById('svg');
        svg.addEventListener('wheel', function (e) {
            this.scaleMin(g, e);
            });

            this.rooms = {room1, room2, room3};
            console.log("this.rooms");
            console.log(this.rooms);

            this.selectRoom = this.selectRoom.bind(this);

            document.querySelector('#svg').addEventListener('click', (e) => {
                this.selectRoom(e);
            });

            var buttonCreateWorkplace = document.getElementById('create-workplace');
            buttonCreateWorkplace.addEventListener('click', function (e) {
                    createWorkplace(rooms, s);
                }
            );

            var buttonScaleMin = document.getElementById('scale-min');
            buttonScaleMin.addEventListener('click', function () {
                scaleMin(g)
            });
    }


    createFigure(canvas) {
        return ({id, workPlaces, coords}) => {
            var {leftTop, rightDown} = coords;
            return canvas.rect(leftTop.x, leftTop.y, rightDown.x, rightDown.y).attr({
                stroke: '#123456',
                strokeWidth: 5,
                fill: '#b1c9ed',
                id,
                check: false,
                workPlaces
            });
        };
    }

    //Выбрать комнату
    /**
     *
     * @param {object} roomsArray
     * @param {string} idRoom
     */
    selectRoom(e) {
        var idRoom = e.target.id;
        var buttonCreateWorkplace = document.getElementById('create-workplace');
        buttonCreateWorkplace.disabled = false;
        console.log('this.rooms[idRoom]')
        console.log(this.rooms[idRoom]);
        if (this.rooms[idRoom].attr('check') == 'false') {
            for (var key in this.rooms) {
                this.rooms[key].attr({'fill': '#b1c9ed', 'check': false});
            }
            this.rooms[idRoom].attr({
                'fill': '#b1edc9',
                'check': true
            });
        }

        console.log(idRoom);
        console.log(this.rooms[idRoom].attr('fill'));
        console.log(this.rooms[idRoom].attr('check'));
    }

    //Создать рабочее место в комнате
    /**
     *
     * @param {object} roomsArray
     * @param {object} svgObject
     */

    createWorkplace(roomsArray, svgObject) {
        for (var key in roomsArray) {

            if (roomsArray[key].attr('check') == 'true') {
                var xpos = roomsArray[key].attr('x');
                var ypos = roomsArray[key].attr('y');
                console.log('x:' + xpos + ', ' + 'y:' + ypos);


                //создание рабочего места и добавление в объект
                var countRoom = roomsArray[key].attr('workPlaces').length;
                var newWorkPlace = svgObject.rect(xpos, ypos, 50, 50).attr({
                    stroke: '#123456',
                    fill: '#123456',
                    id: 'workplace1'
                });

                //roomsArray[key].attr('workPlaces').append(newWorkPlace);
                console.log(countRoom);
                newWorkPlace.drag();
                newWorkPlace.drag(function (x, y) {
                    let pos = x + 51;
                    console.log("I am " + pos);
                    if (pos > 400) {
                        newWorkPlace.undrag();
                    }

                });
                var domWorkPlace = document.getElementById('workplace1');
                domWorkPlace.addEventListener('click', function () {
                    console.log('тут нужны координаты');
                })
            }
        }

    }

    //масштабирование карты
    scaleMap() {
        var svg = document.getElementById('svg');
        svg.addEventListener('wheel', function () {
            svg.setAttribute('viewBox', "0 0 800 800");
        })
    }

    scaleMin(g, e) {
        //e.stopPropagation();
        //event.stopPropagation ? event.stopPropagation() : (event.cancelBubble=true);
        var myMatrix = new Snap.Matrix();
        if (e.deltaY < 0) {
            myMatrix.scale(1.5, 1.5);
            g.animate({transform: myMatrix}, 300);
        } else {
            myMatrix.scale(0.5, 0.5);
            g.animate({transform: myMatrix}, 300);
        }
        e.preventDefault();
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Map;

    /*function toCenterRoom(svg, rooms, e){
        console.log("I am func toCenterRoom");
        var svgBounding = svg.getBBox();
        var mapBounding = rooms.getBBox();
        var targetBounding = e.target.getBBox();
        var transformOriginX = targetBounding.x + targetBounding.width / 2;
        var transformOriginY = targetBounding.y + targetBounding.height / 2;
        svg.style.transformOrigin = (transformOriginX) + "px " + (transformOriginY) + "px";
    }
    */


    /*function createMap(){
        var s = Snap('#svg');
        var room1 = s.rect(0,0,100,100).
                    attr({
                        stroke: '#123456',
                        strokeWidth: 5,
                        fill: 'blue',
                        opacity: 0.2});

        var room2 = s.rect(105,0,100,100).
                    attr({
                        stroke: '#123456',
                        strokeWidth: 5,
                        fill: 'blue',
                        opacity: 0.2});



        var titleR1 = Snap.parse('<title>Комната 1</title>');
        room1.append(titleR1);

        var titleR2 = Snap.parse('<title>Комната 2</title>');
        room2.append(titleR2);


        //
        var move = function(dx,dy) {
            this.attr({
                transform: this.data('origTransform') + (this.data('origTransform') ? "T" : "t") + [dx, dy]
            });
            var coord = '' + dx + dy;
            console.log(coord);

        }

        var start = function() {
            this.data('origTransform', this.transform().local );
        }
        var stop = function() {
            console.log('finished dragging');
        }

        room1.drag(move, start, stop );
        room2.drag(move, start, stop );
        //



       /* var component = document.querySelector('#svg');
        component.append(s);*/

       //nextStep ассоциировать квадраты с элементом списка
    /*    var arrayRoom = {
         'employee1': room1,
         'employee2': room2
        };*/



    /*    document.getElementById("employees").addEventListener("click", function(e){
            if (e.target && e.target.nodeName == "LI"){
                console.log("List item ", e.target.id.replace("post-", ""), " was clicked!");
                //var room = arrayRoom[e.target.id];

                arrayRoom[e.target.id].attr('fill', 'green');
                //room.attr('fill', 'green');


            }
        });



        alert(1);
    }*/

    /*function seeRoom(room1){
        room1.click(function() {
            this.attr('fill', 'green')
        });
    }*/

    /*createMap();*/


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__template_pug__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__template_pug___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__template_pug__);


class Employees{
    constructor(employees){
        this.employees = employees;
        console.log("employees constructor is running");
        console.log(this.employees);
        this.elem = this.renderEmployeesList();
        return this.elem;
    }

    renderEmployeesList(){
        let tmp = document.createElement('div');
        tmp.innerHTML = __WEBPACK_IMPORTED_MODULE_0__template_pug___default()({
            items: this.employees
        });
        let employeesList = tmp.firstElementChild;
        return employeesList;
    }
/*
    getElem(){
        this.getEmployees().then(function (employees) {
            let ul = this.renderEmployeesList(employees);
            this.div = document.querySelector(".list");
            console.log(this.div);
            this.div.append(ul);
            return this.div;
        })
    }
    */
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Employees;



/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(3);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (items) {pug_html = pug_html + "\u003Cul id=\"users-list\"\u003E";
// iterate items
;(function(){
  var $$obj = items;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var item = $$obj[pug_index0];
pug_html = pug_html + "\u003Cli" + (pug.attr("id", `${item.id}`, true, true)) + "\u003E" + (pug.escape(null == (pug_interp = `${item.name}`) ? "" : pug_interp)) + "\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var item = $$obj[pug_index0];
pug_html = pug_html + "\u003Cli" + (pug.attr("id", `${item.id}`, true, true)) + "\u003E" + (pug.escape(null == (pug_interp = `${item.name}`) ? "" : pug_interp)) + "\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ful\u003E";}.call(this,"items" in locals_for_with?locals_for_with.items:typeof items!=="undefined"?items:undefined));;return pug_html;};
module.exports = template;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var pug_has_own_property = Object.prototype.hasOwnProperty;

/**
 * Merge two attribute objects giving precedence
 * to values in object `b`. Classes are special-cased
 * allowing for arrays and merging/joining appropriately
 * resulting in a string.
 *
 * @param {Object} a
 * @param {Object} b
 * @return {Object} a
 * @api private
 */

exports.merge = pug_merge;
function pug_merge(a, b) {
  if (arguments.length === 1) {
    var attrs = a[0];
    for (var i = 1; i < a.length; i++) {
      attrs = pug_merge(attrs, a[i]);
    }
    return attrs;
  }

  for (var key in b) {
    if (key === 'class') {
      var valA = a[key] || [];
      a[key] = (Array.isArray(valA) ? valA : [valA]).concat(b[key] || []);
    } else if (key === 'style') {
      var valA = pug_style(a[key]);
      var valB = pug_style(b[key]);
      a[key] = valA + valB;
    } else {
      a[key] = b[key];
    }
  }

  return a;
};

/**
 * Process array, object, or string as a string of classes delimited by a space.
 *
 * If `val` is an array, all members of it and its subarrays are counted as
 * classes. If `escaping` is an array, then whether or not the item in `val` is
 * escaped depends on the corresponding item in `escaping`. If `escaping` is
 * not an array, no escaping is done.
 *
 * If `val` is an object, all the keys whose value is truthy are counted as
 * classes. No escaping is done.
 *
 * If `val` is a string, it is counted as a class. No escaping is done.
 *
 * @param {(Array.<string>|Object.<string, boolean>|string)} val
 * @param {?Array.<string>} escaping
 * @return {String}
 */
exports.classes = pug_classes;
function pug_classes_array(val, escaping) {
  var classString = '', className, padding = '', escapeEnabled = Array.isArray(escaping);
  for (var i = 0; i < val.length; i++) {
    className = pug_classes(val[i]);
    if (!className) continue;
    escapeEnabled && escaping[i] && (className = pug_escape(className));
    classString = classString + padding + className;
    padding = ' ';
  }
  return classString;
}
function pug_classes_object(val) {
  var classString = '', padding = '';
  for (var key in val) {
    if (key && val[key] && pug_has_own_property.call(val, key)) {
      classString = classString + padding + key;
      padding = ' ';
    }
  }
  return classString;
}
function pug_classes(val, escaping) {
  if (Array.isArray(val)) {
    return pug_classes_array(val, escaping);
  } else if (val && typeof val === 'object') {
    return pug_classes_object(val);
  } else {
    return val || '';
  }
}

/**
 * Convert object or string to a string of CSS styles delimited by a semicolon.
 *
 * @param {(Object.<string, string>|string)} val
 * @return {String}
 */

exports.style = pug_style;
function pug_style(val) {
  if (!val) return '';
  if (typeof val === 'object') {
    var out = '';
    for (var style in val) {
      /* istanbul ignore else */
      if (pug_has_own_property.call(val, style)) {
        out = out + style + ':' + val[style] + ';';
      }
    }
    return out;
  } else {
    val += '';
    if (val[val.length - 1] !== ';') 
      return val + ';';
    return val;
  }
};

/**
 * Render the given attribute.
 *
 * @param {String} key
 * @param {String} val
 * @param {Boolean} escaped
 * @param {Boolean} terse
 * @return {String}
 */
exports.attr = pug_attr;
function pug_attr(key, val, escaped, terse) {
  if (val === false || val == null || !val && (key === 'class' || key === 'style')) {
    return '';
  }
  if (val === true) {
    return ' ' + (terse ? key : key + '="' + key + '"');
  }
  if (typeof val.toJSON === 'function') {
    val = val.toJSON();
  }
  if (typeof val !== 'string') {
    val = JSON.stringify(val);
    if (!escaped && val.indexOf('"') !== -1) {
      return ' ' + key + '=\'' + val.replace(/'/g, '&#39;') + '\'';
    }
  }
  if (escaped) val = pug_escape(val);
  return ' ' + key + '="' + val + '"';
};

/**
 * Render the given attributes object.
 *
 * @param {Object} obj
 * @param {Object} terse whether to use HTML5 terse boolean attributes
 * @return {String}
 */
exports.attrs = pug_attrs;
function pug_attrs(obj, terse){
  var attrs = '';

  for (var key in obj) {
    if (pug_has_own_property.call(obj, key)) {
      var val = obj[key];

      if ('class' === key) {
        val = pug_classes(val);
        attrs = pug_attr(key, val, false, terse) + attrs;
        continue;
      }
      if ('style' === key) {
        val = pug_style(val);
      }
      attrs += pug_attr(key, val, false, terse);
    }
  }

  return attrs;
};

/**
 * Escape the given string of `html`.
 *
 * @param {String} html
 * @return {String}
 * @api private
 */

var pug_match_html = /["&<>]/;
exports.escape = pug_escape;
function pug_escape(_html){
  var html = '' + _html;
  var regexResult = pug_match_html.exec(html);
  if (!regexResult) return _html;

  var result = '';
  var i, lastIndex, escape;
  for (i = regexResult.index, lastIndex = 0; i < html.length; i++) {
    switch (html.charCodeAt(i)) {
      case 34: escape = '&quot;'; break;
      case 38: escape = '&amp;'; break;
      case 60: escape = '&lt;'; break;
      case 62: escape = '&gt;'; break;
      default: continue;
    }
    if (lastIndex !== i) result += html.substring(lastIndex, i);
    lastIndex = i + 1;
    result += escape;
  }
  if (lastIndex !== i) return result + html.substring(lastIndex, i);
  else return result;
};

/**
 * Re-throw the given `err` in context to the
 * the pug in `filename` at the given `lineno`.
 *
 * @param {Error} err
 * @param {String} filename
 * @param {String} lineno
 * @param {String} str original source
 * @api private
 */

exports.rethrow = pug_rethrow;
function pug_rethrow(err, filename, lineno, str){
  if (!(err instanceof Error)) throw err;
  if ((typeof window != 'undefined' || !filename) && !str) {
    err.message += ' on line ' + lineno;
    throw err;
  }
  try {
    str = str || __webpack_require__(4).readFileSync(filename, 'utf8')
  } catch (ex) {
    pug_rethrow(err, null, lineno)
  }
  var context = 3
    , lines = str.split('\n')
    , start = Math.max(lineno - context, 0)
    , end = Math.min(lines.length, lineno + context);

  // Error context
  var context = lines.slice(start, end).map(function(line, i){
    var curr = i + start + 1;
    return (curr == lineno ? '  > ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'Pug') + ':' + lineno
    + '\n' + context + '\n\n' + err.message;
  throw err;
};


/***/ }),
/* 4 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__users_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__map_js__ = __webpack_require__(0);



class App{
    constructor() {
        this.getRooms().then((dataRooms)=>{
            this.dataRooms = dataRooms;
            let map = new __WEBPACK_IMPORTED_MODULE_1__map_js__["a" /* default */](this.dataRooms);
            let divMap = document.querySelector('.container');
            divMap.append(map);
        });


        this.getEmployees().then((dataEmployees)=>{
        this.dataEmployees = dataEmployees;
        let employees = new __WEBPACK_IMPORTED_MODULE_0__users_js__["a" /* default */](this.dataEmployees);
        let divEmployees = document.querySelector('.list');
        divEmployees.append(employees);
        });
    }

    getEmployees(){
        return fetch('/users')
            .then(data =>data.json(), function(){
            console.log("Данные пользователей с сервера получить не удалось.");
        });
    }

     getRooms(){
        return fetch('/rooms')
            .then(data => data.json(), function(){
                console.log("Данные комнат c сервера получить не удалось.");
            });
    }
}

let app = new App();


/***/ })
/******/ ]);
//# sourceMappingURL=app.js.map