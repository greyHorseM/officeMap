var express = require('express');
//const serveStatic = require('serve-static');
var app = express();
var http = require("http");
var path = require("path");
var server = http.createServer(app);

// respond with "hello world" when a GET request is made to the homepage
app
  .get('/users', function(req, res) {
    res.send([
      {
        id: 1,
        name: 'Vasya',
        projectName: 'project1'
      },
      {
        id: 2,
        name: 'Petya',
        projectName: 'project2'
      }
    ]);
  })
  .get('/rooms', function (req, res) {
    res.send([
      {
        id: 'room1',
        coords: {
          leftTop: {
            x: 0,
            y: 0
          },
          rightDown: {
            x: 400,
            y: 400
          }
        },
        workPlaces: [1, 2],
        name: 'Pervaya komnata'
      },
      {
        id: 'room2',
        coords: {
          leftTop: {
            x: 405,
            y: 0
          },
          rightDown: {
            x: 400,
            y: 400
          }
        },
        workPlaces: [1, 2],
        name: 'Vtoraya komnata'
      },
      {
        id: 'room3',
        coords: {
          leftTop: {
            x: 810,
            y: 0
          },
          rightDown: {
            x: 400,
            y: 400
          }
        },
        workPlaces: [1, 2],
        name: 'Tretiya komnata'
      }
    ])
  }).get('/workplaces', function(req, res){
    res.send([
        {
          id: 1,
          roomId: 1,
          userId: 1
        },
        {
          id: 2,
          roomId: 1,
          userId: 2
      }])
})
    .get('/',function(req, res){
      res.sendFile(path.join(__dirname + '/../public/index.html'));
    })
    .use(express.static('public'));

server.listen(9000, function(){
  console.log("Simple magic happens on port 9000");
});
