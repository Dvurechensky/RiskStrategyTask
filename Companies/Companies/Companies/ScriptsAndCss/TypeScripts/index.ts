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