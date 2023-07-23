/**
 * Класс детализации компании
 */
class Details {
    /**
     * Экземпляр класса кук
     */
    private readonly cookies: Cookies;

    /**
     * Экземпляр класса утилит
     */
    private readonly utilities: Utilities;

    /**
     * Идентификатор загружаемой компании
     */
    private EmployeeInputFirst: HTMLInputElement;

    /**
     * Идентификатор загружаемой компании
     */
    private EmployeeInputLast: HTMLInputElement;
    /**
     * Идентификатор загружаемой компании
     */
    private EmployeeInputTitle: HTMLInputElement;
    /**
     * Идентификатор загружаемой компании
     */
    private EmployeeInputBirthDate: HTMLInputElement;
    /**
    * Идентификатор загружаемой компании
    */
    private EmployeeInputPos: HTMLInputElement;

    /**
     * Идентификатор загружаемой компании
     */
    private IdCompany: String;

    /**
    * Конструктор
    */
    constructor(utilities: Utilities, cookies: Cookies, id: String) {
        this.cookies = cookies;
        this.utilities = utilities;
        this.IdCompany = id;

        this.EmployeeInputFirst = document.getElementById("employee_fisrt") as HTMLInputElement;
        this.EmployeeInputLast = document.getElementById("employee_last") as HTMLInputElement;
        this.EmployeeInputTitle = document.getElementById("employee_title") as HTMLInputElement;
        this.EmployeeInputBirthDate = document.getElementById("employee_date") as HTMLInputElement;
        this.EmployeeInputPos = document.getElementById("employee_pos") as HTMLInputElement;

        var updateHistoryBtn = document.getElementById("update_history_action");
        if (updateHistoryBtn !== null) {
            updateHistoryBtn.addEventListener("click", async () => await this.generateHistory());
        }
        
        var updateNotesBtn = document.getElementById("update_notes_action");
        if (updateNotesBtn !== null) {
            updateNotesBtn.addEventListener("click", async () => await this.generateNotes());
        }

        var updateEmployeesBtn = document.getElementById("update_employees_action");
        if (updateEmployeesBtn !== null) {
            updateEmployeesBtn.addEventListener("click", async () => await this.generateEmployees());
        }

        var removeNotesBtn = document.getElementById("remove_notes_action");
        if (removeNotesBtn !== null) {
            removeNotesBtn.addEventListener("click", async () => {
                await this.removeNotes();
                await this.generateNotes();
            });
        }

        var removeEmployeesBtn = document.getElementById("remove_employees_action");
        if (removeEmployeesBtn !== null) {
            removeEmployeesBtn.addEventListener("click", async () => {
                await this.removeEmployees();
                await this.generateEmployees();
            });
        }

        var addNotesBtn = document.getElementById("add_notes_action");
        if (addNotesBtn !== null) {
            addNotesBtn.addEventListener("click", async () => window.open("/docs"));
        }

        var addEmployeesBtn = document.getElementById("add_employees_action");
        if (addEmployeesBtn !== null) {
            addEmployeesBtn.addEventListener("click", async () => window.open("/docs"));
        }
    }

    /**
    * Метод запускает страницу детализации
    */
    startDetailsLogic(): void {
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
    private async generateEmployees(): Promise<void> {
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
        const response = await ajax.sendRequest();
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
            tr.addEventListener("click", async () => {
                if (tr.classList.contains("remove")) {
                    tr.classList.remove("remove");
                    tr.setAttribute("style", "background: #ffffff;");
                } else {
                    tr.classList.add("remove");
                    tr.setAttribute("style", "background: #e3e3e3;");
                }
                await this.getInfoEmployee(Number(trData.Id));
            });
            notesBlock.appendChild(tr);

            if (first == 0) {
                this.getInfoEmployee(Number(trData.Id));
            }
            first++;
        });
    }

    private async removeEmployees(): Promise<void> {
        var notesBlock = document.getElementById("employees_block");

        var remEls = Array.from(notesBlock.getElementsByClassName('remove'))

        var ids = [];

        remEls.forEach((el) => {
            ids.push(Number(el.id));
        })

        const dataRequest = { //создаем объект запроса
            "ids": ids
        };

        if (ids.length > 0) {
            //создаем экземпляр Ajax
            const ajax = new Ajax("DeleteEmployees", this.cookies);
            //отправляем запрос
            await ajax.sendRequest(dataRequest);
        }
    }

    private async getInfoEmployee(id: Number): Promise<void> {
        const dataRequest = { //создаем объект запроса
            "id": id
        };

        //создаем экземпляр Ajax
        const ajax = new Ajax("GetEmployee", this.cookies);
        //отправляем запрос
        var response = await ajax.sendRequest(dataRequest);

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
    private async generateNotes(): Promise<void> {
        var notesBlock = document.getElementById("notes_block");
        notesBlock.innerHTML = '';

        //создаем экземпляр Ajax
        const ajax = new Ajax("GetNotes", this.cookies);
        //отправляем запрос
        const response = await ajax.sendRequest();

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
            tr.addEventListener("click", async () => {
                if (tr.classList.contains("remove")) {
                    tr.classList.remove("remove");
                    tr.setAttribute("style", "background: #ffffff;");
                } else {
                    tr.classList.add("remove");
                    tr.setAttribute("style", "background: #e3e3e3;");
                }
            });
            notesBlock.appendChild(tr);
        });
    }

    private async removeNotes(): Promise<void> {
        var notesBlock = document.getElementById("notes_block");

        var remEls = Array.from(notesBlock.getElementsByClassName('remove'))

        var ids = [];

        remEls.forEach((el) => {
            var id = el.children[0].innerHTML;
            ids.push(Number(id));
        })

        const dataRequest = { //создаем объект запроса
            "ids": ids
        };

        if (ids.length > 0) {
            //создаем экземпляр Ajax
            const ajax = new Ajax("DeleteNotes", this.cookies);
            //отправляем запрос
            await ajax.sendRequest(dataRequest);
        }
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
    private async generateHistory(): Promise<void> {
        console.log("Start Loading Orders History Company: " + this.IdCompany.toString());

        var historyBlock = document.getElementById("history_block");
        historyBlock.innerHTML = '';

        //создаем экземпляр Ajax
        const ajax = new Ajax("GetOrdersHistory", this.cookies);
        //отправляем запрос
        const response = await ajax.sendRequest();

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
    private async generateInfo(): Promise<void> {
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

        const dataRequest = { //создаем объект запроса
            "idCompany": Number(this.IdCompany)
        };
        //создаем экземпляр Ajax
        const ajax = new Ajax("getCompanyInfo", this.cookies);
        //отправляем запрос
        const response = await ajax.sendRequest(dataRequest);

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
    }
}