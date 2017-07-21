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
        id: 0,
        type: 'room',
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
        name: 'Pervaya komnata',
        svgObj: {}
      },
      {
        id: 1,
        type: 'room',
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
        workPlaces: [3, 4],
        name: 'Vtoraya komnata',
        svgObj: {}
      },
      {
        id: 2,
        type: 'room',
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
        workPlaces: [5, 6],
        name: 'Tretiya komnata',
        svgObj: {}
      }
    ])
  }).get('/workplaces', function(req, res){
    res.send([
        {
          id: 1,
          type: 'workplace',
          coords: {
            leftTop: {
            x: 0,
            y: 0
            }
          },
          roomId: 0,
          userId: 1
        },
        {
          id: 2,
          type: 'workplace',
          coords: {
            leftTop: {
              x: 100,
              y: 100
            }
          },
          roomId: 0,
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
