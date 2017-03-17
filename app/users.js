import template from './template.pug';

export default class Employees{
    constructor(employees){
        this.employees = employees;
        console.log("employees constructor is running");
        console.log(this.employees);
        this.elem = this.renderEmployeesList();
        return this.elem;
    }

    renderEmployeesList(){
        let tmp = document.createElement('div');
        tmp.innerHTML = template({
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
