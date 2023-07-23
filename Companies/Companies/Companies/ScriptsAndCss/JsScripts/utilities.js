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