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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
throw new Error("Cannot find module \"template.pug\"");
    //отвязать события от рабочих мест, привязать события выбора комнаты только к комнате
    //масштабирование карты, разедлить области на карту и на список сотрудников


    function createMap() {
        var s = Snap('#svg');

        getRooms().then(function (rooms) {
            rooms = rooms.map(createFigure(s));
            var g = s.group(...rooms);
            var [room1, room2, room3] = rooms;

            g.drag();

            var svg = document.getElementById('svg');
            svg.addEventListener('wheel', function(e){scaleMin(g, e)});;

            rooms = {room1, room2, room3};

            document.getElementById('svg').addEventListener('click', function(e){
                var idRoom = e.target.id;
                if(idRoom.indexOf("room") != -1){
                    selectRoom(rooms, idRoom);
                }
            });

            var buttonCreateWorkplace = document.getElementById('create-workplace');
            buttonCreateWorkplace.addEventListener('click', function(e){
                  createWorkplace(rooms, s);
              }
            );

            var buttonScaleMin = document.getElementById('scale-min');
            buttonScaleMin.addEventListener('click', function(){scaleMin(g)});
        });
    }

    createMap();

    function getRooms() {
        return fetch('/rooms')
            .then(data => data.json(), function(){
            console.log("Данные комнат c сервера получить не удалось.");
        });
    }

    function createFigure(canvas){
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

    function getEmployees(){
        return fetch('/users').then(function(data){
            data.json();
        }.catch(function(){
            console.log("Данные пользователей получить не удалось.");
        }));
    }

    function renderEmployeesList({employees}){
        let tmp = document.createElement('div');
        tmp.innerHTML = __WEBPACK_IMPORTED_MODULE_0_template_pug___default()({
            items: employees
        });
        let employeesList = tmp.firstElementChild;
        return employeesList;
    }

    function createEmployeesList(){
        getEmployees().then(function (employees) {
            let ul = renderEmployeesList(employees);
            let div = document.querySelector("list");
            div.append(ul);
        })
    }

    //Выбрать комнату
    /**
     *
     * @param {object} roomsArray
     * @param {string} idRoom
     */
    function selectRoom(roomsArray, idRoom){
        var buttonCreateWorkplace = document.getElementById('create-workplace');
        buttonCreateWorkplace.disabled = false;
         if(roomsArray[idRoom].attr('check') == 'false'){
            for (var key in roomsArray){
                roomsArray[key].attr({'fill': '#b1c9ed', 'check': false});
            }
            roomsArray[idRoom].attr({'fill': '#b1edc9',
        'check': true});
        }

        console.log(idRoom);
        console.log(roomsArray[idRoom].attr('fill'));
        console.log(roomsArray[idRoom].attr('check'));
    }

    //Создать рабочее место в комнате
    /**
     *
     * @param {object} roomsArray
     * @param {object} svgObject
     */

    function createWorkplace(roomsArray, svgObject){
        for (var key in roomsArray){

            if (roomsArray[key].attr('check') == 'true'){
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
                    let pos = x+51;
                    console.log("I am "+pos);
                    if(pos > 400){
                        newWorkPlace.undrag();
                    }

                });
                var domWorkPlace = document.getElementById('workplace1');
                domWorkPlace.addEventListener('click', function(){
                    console.log('тут нужны координаты');
                })
            }
        }

    }

    //масштабирование карты
    function scaleMap() {
        var svg = document.getElementById('svg');
        svg.addEventListener('wheel', function(){
            svg.setAttribute('viewBox', "0 0 800 800");
        })
    }

    function scaleMin(g, e){
        //e.stopPropagation();
        //event.stopPropagation ? event.stopPropagation() : (event.cancelBubble=true);
        var myMatrix = new Snap.Matrix();
        if (e.deltaY < 0){
            myMatrix.scale(1.5,1.5);
            g.animate({transform: myMatrix},300);
        } else{
            myMatrix.scale(0.5,0.5);
            g.animate({transform: myMatrix},300);
        }
        e.preventDefault();
    }

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


/***/ })
/******/ ]);
//# sourceMappingURL=app.js.map