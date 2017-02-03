const express = require('express');
const serveStatic = require('serve-static');
const app = express();

// respond with "hello world" when a GET request is made to the homepage
app
  .get('/users', function(req, res) {
    res.send([
      {
        id: 1,
        name: 'Vasya'
      },
      {
        id: 2,
        name: 'Petya'
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
  })
  .use(serveStatic('./app'))
;

app.listen(9000);
