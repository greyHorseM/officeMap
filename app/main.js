import Users from './users.js';
import Map from './map.js';

class App{
    constructor() {
        let users = new Users();

        this.getRooms = this.getRooms.bind(this);
        let promiseRooms = this.getRooms;
        let map = new Map(promiseRooms);

        let div = document.querySelector('.container');
        div.append(map);

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
