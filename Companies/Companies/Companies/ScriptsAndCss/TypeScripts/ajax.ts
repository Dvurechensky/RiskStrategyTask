/**
 * Класс Ajax запросов
 */
class Ajax {

    /**
     * URL запроса
     */
    private readonly requestUrl: string;

    /**
     * Экземпляр класса работы с куками
     */
    private readonly cookies: Cookies;

    /**
     * Переменная xhttp запросов
     */
    private readonly xhttp: XMLHttpRequest;

    /**
     * Конструктор
     * @param path - Путь запроса
     * @param cookies - экземпляр класса работы с куками
     */
    constructor(path: string, cookies: Cookies) {
        this.requestUrl = `/ajax/${path}`; //присваиваем URL запроса
        this.cookies = cookies; //присваиваем экземпляр класса работы с куками
        this.xhttp = new XMLHttpRequest(); //инициализируем xhttp
    }

    /**
     * Метод отправляет ajax запрос
     * @param dataObject - Объект данных запроса
     */
    async sendRequest(dataObject: object = null): Promise<string> {
        return new Promise<string>(resolve => {
            try { //получаем защитный токен
                const csrfToken = this.cookies.getCookie("CSRF-TOKEN");
                //добавляем параметры асинхронного запроса
                this.xhttp.open("POST", this.requestUrl, true);
                this.xhttp.onreadystatechange = () => { //получение ответа на запрос
                    //проверяем готовность ответа
                    if (this.xhttp.readyState !== 4) return;
                    //проверяем успешен или нет ответ
                    if (this.xhttp.status !== 200) {
                        resolve(""); //вызываем промис с пустой строкой
                        return; //не продолжаем
                    } //вызываем промис с текстом ответа
                    resolve(this.xhttp.responseText);
                };
                this.xhttp.onerror = () => { //ошибки запроса
                    //выводим ошибку на консоль
                    console.error("ERROR: ", "Bad response");
                    resolve(""); //вызываем промис с пустой строкой
                }; //подставляем в заголовки защитный токен
                this.xhttp.setRequestHeader("X-CSRF-TOKEN", csrfToken);
                if (dataObject == null) { //отправляем запрос в зависимости задан объект данных или нет
                    this.xhttp.send(); //запрос без данных
                } else { //ставим заголовок что это json данные
                    this.xhttp.setRequestHeader("Content-type", "application/json");
                    this.xhttp.send(JSON.stringify(dataObject)); //запрос с данными
                }
            } catch (e) {
                console.error("ERROR: ", e); //выводим ошибку на консоль
                resolve(""); //вызываем промис с пустой строкой
            }
        });
    }
}