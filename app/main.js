import Employees from './users.js';
import Map from './map.js';

class App{
    constructor() {
        this.getRooms().then((dataRooms)=>{
            this.dataRooms = dataRooms;
            let map = new Map(this.dataRooms);
            let divMap = document.querySelector('.container');
            divMap.append(map);
        });

        this.getEmployees().then((dataEmployees)=>{
        this.dataEmployees = dataEmployees;
        let employees = new Employees(this.dataEmployees);
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
