var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * Класс детализации компании
 */
class Details {
    /**
    * Конструктор
    */
    constructor(utilities, cookies, id) {
        this.cookies = cookies;
        this.utilities = utilities;
        this.IdCompany = id;
        this.EmployeeInputFirst = document.getElementById("employee_fisrt");
        this.EmployeeInputLast = document.getElementById("employee_last");
        this.EmployeeInputTitle = document.getElementById("employee_title");
        this.EmployeeInputBirthDate = document.getElementById("employee_date");
        this.EmployeeInputPos = document.getElementById("employee_pos");
        var updateHistoryBtn = document.getElementById("update_history_action");
        if (updateHistoryBtn !== null) {
            updateHistoryBtn.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () { return yield this.generateHistory(); }));
        }
        var updateNotesBtn = document.getElementById("update_notes_action");
        if (updateNotesBtn !== null) {
            updateNotesBtn.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () { return yield this.generateNotes(); }));
        }
        var updateEmployeesBtn = document.getElementById("update_employees_action");
        if (updateEmployeesBtn !== null) {
            updateEmployeesBtn.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () { return yield this.generateEmployees(); }));
        }
        var removeNotesBtn = document.getElementById("remove_notes_action");
        if (removeNotesBtn !== null) {
            removeNotesBtn.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
                yield this.removeNotes();
                yield this.generateNotes();
            }));
        }
        var removeEmployeesBtn = document.getElementById("remove_employees_action");
        if (removeEmployeesBtn !== null) {
            removeEmployeesBtn.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
                yield this.removeEmployees();
                yield this.generateEmployees();
            }));
        }
        var addNotesBtn = document.getElementById("add_notes_action");
        if (addNotesBtn !== null) {
            addNotesBtn.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () { return window.open("/docs"); }));
        }
        var addEmployeesBtn = document.getElementById("add_employees_action");
        if (addEmployeesBtn !== null) {
            addEmployeesBtn.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () { return window.open("/docs"); }));
        }
    }
    /**
    * Метод запускает страницу детализации
    */
    startDetailsLogic() {
        console.log("Start Loading Company: " + this.IdCompany.toString());
        this.generateInfo()
            .then(() => {
            console.log("-> action Generate Info ok");
        })
            .catch((error) => {
            console.error("-> error: " + error);
        });
        this.generateHistory()
            .then(() => {
            console.log("-> action Generate History ok");
        })
            .catch((error) => {
            console.error("-> error: " + error);
        });
        this.generateNotes()
            .then(() => {
            console.log("-> action Generate Notes ok");
        })
            .catch((error) => {
            console.error("-> error: " + error);
        });
        this.generateEmployees()
            .then(() => {
            console.log("-> action Generate Employees ok");
        })
            .catch((error) => {
            console.error("-> error: " + error);
        });
    }
    /*
     <tr>
    <td>John < /td>
    < td > Heart < /td>
    < /tr>
    < tr >
    <td>Olivia < /td>
    < td > Peyton < /td>
    < /tr>
    < tr >
    <td>Robert < /td>
    < td > Reagan < /td>
    < /tr>
    < tr >
    <td>Cynthia < /td>
    < td > Stanwick < /td>
    < /tr>
    */
    /**
    * Загрузка блока Employees
    */
    generateEmployees() {
        return __awaiter(this, void 0, void 0, function* () {
            this.EmployeeInputFirst.value = "";
            this.EmployeeInputLast.value = "";
            this.EmployeeInputTitle.value = "";
            this.EmployeeInputBirthDate.value = "";
            this.EmployeeInputPos.value = "";
            var notesBlock = document.getElementById("employees_block");
            notesBlock.innerHTML = '';
            //создаем экземпляр Ajax
            const ajax = new Ajax("GetEmployees", this.cookies);
            //отправляем запрос
            const response = yield ajax.sendRequest();
            console.log(response);
            //проверяем ответ
            if (this.utilities.isEmpty(response)) {
                document.location.href = "/error"; //редиректим на страницу ошибки
                return; //не продолжаем
            }
            //десериализуем ответ из JSON
            const dataResponse = JSON.parse(response);
            var first = 0;
            dataResponse.forEach((trData) => {
                var tr = document.createElement("tr");
                tr.id = trData.Id;
                var td_first = document.createElement("td");
                var td_last = document.createElement("td");
                tr.appendChild(td_first);
                tr.appendChild(td_last);
                td_first.innerText = trData.FirstName;
                td_last.innerText = trData.LastName;
                tr.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
                    if (tr.classList.contains("remove")) {
                        tr.classList.remove("remove");
                        tr.setAttribute("style", "background: #ffffff;");
                    }
                    else {
                        tr.classList.add("remove");
                        tr.setAttribute("style", "background: #e3e3e3;");
                    }
                    yield this.getInfoEmployee(Number(trData.Id));
                }));
                notesBlock.appendChild(tr);
                if (first == 0) {
                    this.getInfoEmployee(Number(trData.Id));
                }
                first++;
            });
        });
    }
    removeEmployees() {
        return __awaiter(this, void 0, void 0, function* () {
            var notesBlock = document.getElementById("employees_block");
            var remEls = Array.from(notesBlock.getElementsByClassName('remove'));
            var ids = [];
            remEls.forEach((el) => {
                ids.push(Number(el.id));
            });
            const dataRequest = {
                "ids": ids
            };
            if (ids.length > 0) {
                //создаем экземпляр Ajax
                const ajax = new Ajax("DeleteEmployees", this.cookies);
                //отправляем запрос
                yield ajax.sendRequest(dataRequest);
            }
        });
    }
    getInfoEmployee(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataRequest = {
                "id": id
            };
            //создаем экземпляр Ajax
            const ajax = new Ajax("GetEmployee", this.cookies);
            //отправляем запрос
            var response = yield ajax.sendRequest(dataRequest);
            //проверяем ответ
            if (this.utilities.isEmpty(response)) {
                document.location.href = "/error"; //редиректим на страницу ошибки
                return; //не продолжаем
            }
            //десериализуем ответ из JSON
            const dataResponse = JSON.parse(response);
            console.log(dataResponse);
            this.EmployeeInputFirst.value = dataResponse.FirstName;
            this.EmployeeInputLast.value = dataResponse.LastName;
            this.EmployeeInputTitle.value = dataResponse.Title;
            this.EmployeeInputBirthDate.value = dataResponse.BirthDate;
            this.EmployeeInputPos.value = dataResponse.Position;
        });
    }
    /*
    <tr>
    <td>35703 < /td>
    < td > Todd Hoffman < /td>
    < /tr>
    < tr >
    <td>35703 < /td>
    < td > Todd Hoffman < /td>
    < /tr>
    < tr >
    <td>35703 < /td>
    < td > Todd Hoffman < /td>
    < /tr>
    < tr >
    <td>35703 < /td>
    < td > Todd Hoffman < /td>
    < /tr>
    < tr >
    <td>35703 < /td>
    < td > Todd Hoffman < /td>
    < /tr>
    < tr >
    <td>35703 < /td>
    < td > Todd Hoffman < /td>
    < /tr>*/
    /**
    * Загрузка блока Notes
    */
    generateNotes() {
        return __awaiter(this, void 0, void 0, function* () {
            var notesBlock = document.getElementById("notes_block");
            notesBlock.innerHTML = '';
            //создаем экземпляр Ajax
            const ajax = new Ajax("GetNotes", this.cookies);
            //отправляем запрос
            const response = yield ajax.sendRequest();
            //проверяем ответ
            if (this.utilities.isEmpty(response)) {
                document.location.href = "/error"; //редиректим на страницу ошибки
                return; //не продолжаем
            }
            //десериализуем ответ из JSON
            const dataResponse = JSON.parse(response);
            dataResponse.forEach((trData) => {
                var tr = document.createElement("tr");
                var td_id = document.createElement("td");
                var td_emplo = document.createElement("td");
                tr.appendChild(td_id);
                tr.appendChild(td_emplo);
                td_id.innerText = trData.Id;
                td_emplo.innerText = trData.Employee;
                tr.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
                    if (tr.classList.contains("remove")) {
                        tr.classList.remove("remove");
                        tr.setAttribute("style", "background: #ffffff;");
                    }
                    else {
                        tr.classList.add("remove");
                        tr.setAttribute("style", "background: #e3e3e3;");
                    }
                }));
                notesBlock.appendChild(tr);
            });
        });
    }
    removeNotes() {
        return __awaiter(this, void 0, void 0, function* () {
            var notesBlock = document.getElementById("notes_block");
            var remEls = Array.from(notesBlock.getElementsByClassName('remove'));
            var ids = [];
            remEls.forEach((el) => {
                var id = el.children[0].innerHTML;
                ids.push(Number(id));
            });
            const dataRequest = {
                "ids": ids
            };
            if (ids.length > 0) {
                //создаем экземпляр Ajax
                const ajax = new Ajax("DeleteNotes", this.cookies);
                //отправляем запрос
                yield ajax.sendRequest(dataRequest);
            }
        });
    }
    /*@*
    <tr>
        <td>11/12/2013</td>
        <td>Las Vegas</td>
    </tr>
    <tr>
        <td>11/12/2013</td>
        <td>Las Vegas</td>
    </tr>
    <tr>
        <td>11/12/2013</td>
        <td>Las Vegas</td>
    </tr>
    <tr>
        <td>11/12/2013</td>
        <td>Las Vegas</td>
    </tr>
    <tr>
        <td>11/12/2013</td>
        <td>Las Vegas</td>
    </tr>
    <tr>
        <td>11/12/2013</td>
        <td>Las Vegas</td>
    </tr>*@*/
    /**
    * Загрузка блока History
    */
    generateHistory() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Start Loading Orders History Company: " + this.IdCompany.toString());
            var historyBlock = document.getElementById("history_block");
            historyBlock.innerHTML = '';
            //создаем экземпляр Ajax
            const ajax = new Ajax("GetOrdersHistory", this.cookies);
            //отправляем запрос
            const response = yield ajax.sendRequest();
            //проверяем ответ
            if (this.utilities.isEmpty(response)) {
                document.location.href = "/error"; //редиректим на страницу ошибки
                return; //не продолжаем
            }
            //десериализуем ответ из JSON
            const dataResponse = JSON.parse(response);
            dataResponse.forEach((trData) => {
                var tr = document.createElement("tr");
                var td_date = document.createElement("td");
                var td_store = document.createElement("td");
                tr.appendChild(td_date);
                tr.appendChild(td_store);
                td_date.innerText = trData.OrderDate;
                td_store.innerText = trData.StoreCity;
                historyBlock.appendChild(tr);
            });
        });
    }
    /*
    <label>ID: </label>
    < input type = "number" value = "1" readonly />
    <label>Name: </label>
    < input type = "text" value = "Super Mart of the West" readonly />
    <label>Address: </label>
    < input type = "text" value = "702 SW 8th Street" readonly />
    <label>City: </label>
    < input type = "text" value = "Bentonville" readonly />
    <label>State: </label>
    < input type = "text" value = "Arkansas" readonly />
    */
    /**
    * Загрузка блока Info
    */
    generateInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Start Loading Info Company: " + this.IdCompany.toString());
            var infoBlock = document.getElementById("info_block");
            var labelId = document.createElement("label");
            labelId.innerText = "ID:";
            var inputId = document.createElement("input");
            inputId.type = "number";
            inputId.setAttribute('readonly', '');
            var labelName = document.createElement("label");
            labelName.innerText = "Name:";
            var inputName = document.createElement("input");
            inputName.type = "text";
            inputName.setAttribute('readonly', '');
            var labelAddress = document.createElement("label");
            labelAddress.innerText = "Address:";
            var inputAddress = document.createElement("input");
            inputAddress.type = "text";
            inputAddress.setAttribute('readonly', '');
            var labelCity = document.createElement("label");
            labelCity.innerText = "City:";
            var inputCity = document.createElement("input");
            inputCity.type = "text";
            inputCity.setAttribute('readonly', '');
            var labelState = document.createElement("label");
            labelState.innerText = "State:";
            var inputState = document.createElement("input");
            inputState.type = "text";
            inputState.setAttribute('readonly', '');
            /*append elements*/
            infoBlock.appendChild(labelId);
            infoBlock.appendChild(inputId);
            infoBlock.appendChild(labelName);
            infoBlock.appendChild(inputName);
            infoBlock.appendChild(labelAddress);
            infoBlock.appendChild(inputAddress);
            infoBlock.appendChild(labelCity);
            infoBlock.appendChild(inputCity);
            infoBlock.appendChild(labelState);
            infoBlock.appendChild(inputState);
            const dataRequest = {
                "idCompany": Number(this.IdCompany)
            };
            //создаем экземпляр Ajax
            const ajax = new Ajax("getCompanyInfo", this.cookies);
            //отправляем запрос
            const response = yield ajax.sendRequest(dataRequest);
            //проверяем ответ
            if (this.utilities.isEmpty(response)) {
                document.location.href = "/error"; //редиректим на страницу ошибки
                return; //не продолжаем
            }
            //десериализуем ответ из JSON
            const dataResponse = JSON.parse(response);
            if (dataResponse.IsValid) {
                /*Start load data*/
                inputId.value = dataResponse.Id;
                inputName.value = dataResponse.Name;
                inputAddress.value = dataResponse.Address;
                inputCity.value = dataResponse.City;
                inputState.value = dataResponse.State;
            }
        });
    }
}
//# sourceMappingURL=details.js.map