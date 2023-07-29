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
                {   //создаем класс авторизации кабинета
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