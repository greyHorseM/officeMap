function createMap() {
    var s = Snap('#svg');
    var room1 = s.rect(0, 0, 400, 400).attr({
        stroke: '#123456',
        strokeWidth: 5,
        fill: '#b1c9ed',
        id: 'room1',
        check: false,
        workPlaces: ['I am array1!', 'iias']
    });

    var room2 = s.rect(405, 0, 400, 400).attr({
        stroke: '#123456',
        strokeWidth: 5,
        fill: '#b1c9ed',
        id: 'room2',
        check: false,
        workPlaces: ['I am array1!']
    });

    var rooms = { room1, room2};

    document.getElementById('svg').addEventListener('click', function(e){

        var idRoom = e.target.id;
        selectRoom(rooms, idRoom);
    })

    var buttonCreateWorkplace = document.getElementById('create-workplace');
    buttonCreateWorkplace.addEventListener('click', function(){createWorkplace(rooms, s)});

}

createMap();


//Выделить комнату
function selectRoom(roomsArray, idRoom){

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
                fill: 'black',
                id: 'workplace1'
            });

            //roomsArray[key].attr('workPlaces').append(newWorkPlace);
            console.log(countRoom);

          /*  newWorkPlace.drag();
            var domWorkPlace = document.getElementById('workplace1');
            domWorkPlace.addEventListener('click', function(){
                console.log('координаты');
            })*/
        }
    }

}


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
