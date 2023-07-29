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
 * Класс Ajax запросов
 */
class Ajax {
    /**
     * Конструктор
     * @param path - Путь запроса
     * @param cookies - экземпляр класса работы с куками
     */
    constructor(path, cookies) {
        this.requestUrl = `/ajax/${path}`; //присваиваем URL запроса
        this.cookies = cookies; //присваиваем экземпляр класса работы с куками
        this.xhttp = new XMLHttpRequest(); //инициализируем xhttp
    }
    /**
     * Метод отправляет ajax запрос
     * @param dataObject - Объект данных запроса
     */
    sendRequest(dataObject = null) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(resolve => {
                try { //получаем защитный токен
                    const csrfToken = this.cookies.getCookie("CSRF-TOKEN");
                    //добавляем параметры асинхронного запроса
                    this.xhttp.open("POST", this.requestUrl, true);
                    this.xhttp.onreadystatechange = () => {
                        //проверяем готовность ответа
                        if (this.xhttp.readyState !== 4)
                            return;
                        //проверяем успешен или нет ответ
                        if (this.xhttp.status !== 200) {
                            resolve(""); //вызываем промис с пустой строкой
                            return; //не продолжаем
                        } //вызываем промис с текстом ответа
                        resolve(this.xhttp.responseText);
                    };
                    this.xhttp.onerror = () => {
                        //выводим ошибку на консоль
                        console.error("ERROR: ", "Bad response");
                        resolve(""); //вызываем промис с пустой строкой
                    }; //подставляем в заголовки защитный токен
                    this.xhttp.setRequestHeader("X-CSRF-TOKEN", csrfToken);
                    if (dataObject == null) { //отправляем запрос в зависимости задан объект данных или нет
                        this.xhttp.send(); //запрос без данных
                    }
                    else { //ставим заголовок что это json данные
                        this.xhttp.setRequestHeader("Content-type", "application/json");
                        this.xhttp.send(JSON.stringify(dataObject)); //запрос с данными
                    }
                }
                catch (e) {
                    console.error("ERROR: ", e); //выводим ошибку на консоль
                    resolve(""); //вызываем промис с пустой строкой
                }
            });
        });
    }
}
//# sourceMappingURL=ajax.js.map
/**
 * Класс работы с куками
 */
class Cookies {
    /**
     * Метод получает значение куки по имени
     * @param cookieName - название куки
     * @return - значение куки
     */
    getCookie(cookieName) {
        const name = cookieName + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const ca = decodedCookie.split(";");
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === " ") {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
    /**
     * Метод устанавливает куку
     * @param name - имя куки
     * @param value - значение куки
     */
    setCookie(name, value) {
        const date = new Date(); //создаем переменную даты
        //устанавливаем дату плюс месяц
        date.setTime(date.getTime() + 30 * 24 * 60 * 60 * 1000);
        //устанавливаем куку
        document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + date.toUTCString() + ";path=/;secure";
    }
    /**
     * Метод удаляет куку по имени
     * @param name - имя куки
     */
    removeCookie(name) {
        document.cookie = name + "=;Max-Age=-99999999;";
    }
}
//# sourceMappingURL=cookies.js.map
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
class Index {
    /**
    * Конструктор
    */
    constructor() {
        console.log("Load Main Page");
        var addCompanyBtn = document.getElementById("add_company_action");
        console.log(addCompanyBtn);
        addCompanyBtn.addEventListener("click", () => window.open("/docs"));
    }
}
//# sourceMappingURL=index.js.map
(() => {
    //по загрузке страницы
    window.addEventListener("load", () => {
        //создаем экземпляр класса утилит
        const utilities = new Utilities();
        //создаем экземпляр класса кук
        const cookies = new Cookies();
        //получаем текущий URL
        const currentUrl = new URL(document.location.href);
        //получаем путь из URL
        const pathname = currentUrl.pathname.toLowerCase();
        //разбиваем пути URL на части
        const partsPath = pathname.split("/");
        switch (partsPath[1]) { //смотрим путь URL
            case "":
                {
                    console.log("Index Load");
                    new Index();
                }
                break;
            case "details": //страница детализации
                { //создаем класс авторизации кабинета
                    console.log("Details Load");
                    const id = partsPath[2];
                    const detailsScene = new Details(utilities, cookies, id);
                    //запускаем главную сцену
                    detailsScene.startDetailsLogic();
                }
                break;
        }
    });
})();
//# sourceMappingURL=main.js.map
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
 * Класс вспомогательных методов
 */
class Utilities {
    /**
     * Метод проверяет строку на пустоту
     * @param value - проверяемая строка
     * @return - true:строка пуста, false:строка не пуста
     */
    isEmpty(value) {
        if (value == null)
            return true; //проверяем строку на null
        if (value === "")
            return true; //проверяем строку на пустоту
        return false; //отдаем строка не пуста
    }
    /**
     * Метод проверяет валидность Email
     * @param email - email
     * @return - true:yes, false:no
     */
    isValidEmail(email) {
        if (this.isEmpty(email))
            return false; //проверяем Email на пустоту
        //паттерн проверки валидности Email
        const pattern = /^([a-z0-9_.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
        return pattern.test(email); //проверяем валидность Email и отдаем результат
    }
    /**
    * Метод делает асинхронную задержку
    * @param mlsec - размер задержки в миллисекундах
    */
    doDelay(mlsec) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(null); //оповещаем промис
                }, mlsec);
            });
        });
    }
    /**
     * Метод отдаем ширину окна браузера
     * @returns - ширина окна браузера
     */
    get getWidh() {
        //отдаем максимальную ширину
        return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    }
    /**
     * Метод отдает высоту окна браузера
     * @returns - высота окна браузера
     */
    get getHeight() {
        //отдаем максимальную высоту
        return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    }
    /**
     * Метод генерирует случайное число в заданном диапазоне
     * @param min - минимальное число
     * @param max - максимальное число
     */
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    /**
     * Метод копирует текст в буфер обмена
     * @param value - текст для копирования в буфер
     * @param element - элемент вызывающий действие копирования
     */
    copyValueToBuffer(value, element) {
        try {
            const coord = element.getBoundingClientRect(); //получаем координаты кнопки
            //получаем расстояние сколько проскроллено сверху
            const scrolled = window.pageYOffset || document.documentElement.scrollTop;
            //получаем iOs ли устройство
            const iOsDevice = navigator.userAgent.match(/ipad|iphone/i);
            //создаем textarea
            const textArea = document.createElement("textarea");
            //ставим что textarea только для чтения
            textArea.readOnly = true;
            //ставим textarea отступ сверху на величину скролла + координаты кнопки что бы экран не прыгал
            textArea.style.top = `${Math.round(scrolled + coord.top)}px`;
            //подставляем невидимый класс
            textArea.classList.add("text_copy");
            //подставляем текст в textarea
            textArea.value = value;
            //добавляем textarea в DOM
            document.body.appendChild(textArea);
            //делаем textarea в фокус 
            textArea.focus();
            //проверяем iOs устройство
            if (iOsDevice) {
                const editable = textArea.contentEditable;
                const readOnly = textArea.readOnly;
                textArea.contentEditable = "true";
                textArea.readOnly = false;
                const range = document.createRange();
                range.selectNodeContents(textArea);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
                textArea.setSelectionRange(0, 999999);
                textArea.contentEditable = editable;
                textArea.readOnly = readOnly;
            }
            else {
                textArea.select(); //делаем textarea выбранной
            } //выполняем команду по копированию в буфер обмена
            const resultCopy = document.execCommand("copy");
            document.body.removeChild(textArea); //удаляем textarea
            return resultCopy; //отдаем результат копирования
        }
        catch (e) {
            console.error("Error: ", e); //выводим ошибку на консоль
            return false; //возвращаем что данные не скопированы
        }
    }
    /**
     * Метод получает текущую дату в строковом значении
     */
    getCurrentDate() {
        const date = new Date(); //получаем текущую дату
        const nowDay = date.getDate(); //получаем текущий день
        const nowMonth = date.getMonth() + 1; //получаем текущий месяц
        let forFullDay = ""; //добавка для полного дня с нулем
        if (nowDay < 10) { //проверяем если день менее 10
            forFullDay = "0"; //пишем ноль в добавку
        }
        let forFullMonth = ""; //добавка для полного месяца
        if (nowMonth < 10) { //проверяем если месяц менее 10
            forFullMonth = "0"; //пишем ноль в добавку
        }
        return `${forFullDay}${nowDay}.${forFullMonth}${nowMonth}.${date.getFullYear()}`;
    }
    /**
     * Метод генерирует UIID
     */
    generateUuid() {
        var d = new Date().getTime();
        var d2 = ((typeof performance !== "undefined") && performance.now && (performance.now() * 1000)) || 0;
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
            var r = Math.random() * 16;
            if (d > 0) {
                r = (d + r) % 16 | 0;
                d = Math.floor(d / 16);
            }
            else {
                r = (d2 + r) % 16 | 0;
                d2 = Math.floor(d2 / 16);
            }
            return (c === "x" ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }
}
//# sourceMappingURL=utilities.js.map