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