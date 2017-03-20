    //отвязать события от рабочих мест, привязать события выбора комнаты только к комнате
    //масштабирование карты, разедлить области на карту и на список сотрудников

export default class Map {
    constructor(rooms){
        this.rooms = rooms;
        this.createRoom();
        console.log("map constructor is running...");
        this.getWorkPlaces().then((dataWorkPlaces)=>{
            console.log(dataWorkPlaces);
            this.dataWorkPlaces = dataWorkPlaces;
            this.renderWorkPlaces();
        });
        this.selectWorkPlace = this.selectWorkPlace.bind(this);
    }

    createRoom() {
        this.s = Snap('#svg');
        this.rooms = this.rooms.map(this.createFigure());
        this.g = this.s.group(...this.rooms);
        var [room1, room2, room3] = this.rooms;
        this.g.drag();
        var svg = document.getElementById('svg');
        svg.addEventListener('wheel', (e) => {
            this.scaleMin(e);
            });

            this.rooms = {room1, room2, room3};
            console.log("this.rooms");
            console.log(this.rooms);

            this.selectRoom = this.selectRoom.bind(this);

            document.querySelector('#svg').addEventListener('click', (e) => {
                this.selectRoom(e);
            });

            var buttonCreateWorkplace = document.getElementById('create-workplace');
            buttonCreateWorkplace.addEventListener('click', (e) => {
                    this.createWorkplace(this.rooms, this.s);
                }
            );

            var buttonScaleMin = document.getElementById('scale-min');
            buttonScaleMin.addEventListener('click', () => {
                this.scaleMin(g);
            });
    }

    renderWorkPlaces(){
        for (let workPlace of this.dataWorkPlaces){
            var newWorkPlace = this.s.rect(workPlace.coords.leftTop.x, workPlace.coords.leftTop.y, 50, 50).attr({
                stroke: '#123456',
                fill: '#123456'
            });
            newWorkPlace.drag();
            console.log(""+workPlace.id+" rendered");
        }
    }

    createFigure() {
        return ({id, workPlaces, coords}) => {
            var {leftTop, rightDown} = coords;
            return this.s.rect(leftTop.x, leftTop.y, rightDown.x, rightDown.y).attr({
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
        this.idRoom = idRoom;
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

    createWorkplace() {
        var xpos = this.rooms[this.idRoom].attr('x');
        var ypos = this.rooms[this.idRoom].attr('y');
        console.log('x:' + xpos + ', ' + 'y:' + ypos);

        //создание рабочего места и добавление в объект
        var countRoom = this.rooms[this.idRoom].attr('workPlaces').length;
        var newWorkPlace = this.s.rect(xpos, ypos, 50, 50).attr({
            stroke: '#123456',
            fill: '#123456',
            id: 'workplace'+countRoom
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
        });
        this.addObjToGroup(newWorkPlace);
        newWorkPlace.addEventListener('click', () => {this.selectWorkPlace(e)});

    }

    addObjToGroup(obj){
        this.g.group(obj);
    }

    selectWorkPlace(e){
        selectedWorkPlace = e.target.id;
    }

    //промис для получения рабочих мест
    getWorkPlaces(){
        return fetch('/workplaces')
            .then(data => data.json(), function(){console.log("Данные рабочих мест получить не уадлось");})
    }

    //масштабирование карты
    scaleMap() {
        var svg = document.getElementById('svg');
        svg.addEventListener('wheel', function () {
            svg.setAttribute('viewBox', "0 0 800 800");
        })
    }

    scaleMin(e) {
        //e.stopPropagation();
        //event.stopPropagation ? event.stopPropagation() : (event.cancelBubble=true);
        var myMatrix = new Snap.Matrix();
        if (e.deltaY < 0) {
            myMatrix.scale(1.5, 1.5);
            this.g.animate({transform: myMatrix}, 300);
        } else {
            myMatrix.scale(0.5, 0.5);
            this.g.animate({transform: myMatrix}, 300);
        }
        e.preventDefault();
    }

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
