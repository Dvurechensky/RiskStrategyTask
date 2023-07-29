using Companies.Data.Ajax;
using Companies.Data.Home;
using Companies.Services;
using Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

/// <summary>
/// Контроллер API и оболочки JS
/// </summary>
[Route("[controller]/[action]")]
public class AjaxController : ControllerBase
{
    /// <summary>
    /// Экземпляр контекста БД
    /// </summary>
    private DatabaseContext AppDb;

    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="dbContext">Контекст работы с БД</param>
    public AjaxController(DatabaseContext dbContext)
    {
        AppDb = dbContext;
    }

    /// <summary>
    /// Получить информацию о компании
    /// </summary>
    /// <param name="сompanyInfoRequest">Тело</param>
    /// <returns>CompanyInfo</returns>
    [ApiExplorerSettings(IgnoreApi = true)]
    [HttpPost]
    [Consumes("application/json")]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> GetCompanyInfo([FromBody] CompanyInfoRequest сompanyInfoRequest)
    {
        try
        {   //проверяем входящие данные
            if (!ModelState.IsValid) return BadRequest("bad request data");
            //получаем данные из бд
            var info = await AppDb.Companies.FirstOrDefaultAsync((res) => res.Id == сompanyInfoRequest.IdCompany);
            //возвращаем в JSON
            return info.SuccessResponse();
        }
        catch (Exception ex)
        {
#if DEBUG
            Console.WriteLine(ex.Message);
#endif
            return BadRequest("failed"); //отдаем BadRequest
        }
    }

    /// <summary>
    /// Получить информацию о сотруднике компании
    /// </summary>
    /// <param name="getEmployeeRequest">Тело</param>
    /// <returns>CompanyEmployees</returns>
    [ApiExplorerSettings(IgnoreApi = true)]
    [HttpPost]
    [Consumes("application/json")]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> GetEmployee([FromBody] GetEmployeeRequest getEmployeeRequest)
    {
        try
        {   //проверяем входящие данные
            if (!ModelState.IsValid) return BadRequest("bad request data");
            //получаем данные из бд
            var info = await AppDb.CompanyEmployees.FirstOrDefaultAsync((res) => res.Id == getEmployeeRequest.IdEmployee);
            //возвращаем в JSON
            return info.SuccessResponse();
        }
        catch (Exception ex)
        {
#if DEBUG
            Console.WriteLine(ex.Message);
#endif
            return BadRequest("failed"); //отдаем BadRequest
        }
    }

    /// <summary>
    /// Получить информацию о списке событий
    /// </summary>
    /// <returns>List-OrderHistory</returns>
    [ApiExplorerSettings(IgnoreApi = true)]
    [HttpPost]
    [Consumes("application/json")]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> GetOrdersHistory()
    {
        try
        {   //проверяем входящие данные
            if (!ModelState.IsValid) return BadRequest("bad request data");
            //получаем данные из бд
            var info = await AppDb.HistoryOrder.OrderByDescending((it) => it.Id).Take(20).ToListAsync();
            //возвращаем в JSON
            return info.SuccessResponse();
        }
        catch (Exception ex)
        {
#if DEBUG
            Console.WriteLine(ex.Message);
#endif
            return BadRequest("failed"); //отдаем BadRequest
        }
    }

    /// <summary>
    /// Получить информацию о Notes
    /// </summary>
    /// <returns>List-CompanyNotes</returns>
    [ApiExplorerSettings(IgnoreApi = true)]
    [HttpPost]
    [Consumes("application/json")]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> GetNotes()
    {
        try
        {   //проверяем входящие данные
            if (!ModelState.IsValid) return BadRequest("bad request data");
            //получаем данные из бд
            var info = await AppDb.CompanyNotes.OrderByDescending((it) => it.Id).Take(20).ToListAsync();
            //возвращаем в JSON
            return info.SuccessResponse();
        }
        catch (Exception ex)
        {
#if DEBUG
            Console.WriteLine(ex.Message);
#endif
            return BadRequest("failed"); //отдаем BadRequest
        }
    }

    /// <summary>
    /// Получить информацию о участниках
    /// </summary>
    /// <returns>List-OrderHistory</returns>
    [ApiExplorerSettings(IgnoreApi = true)]
    [HttpPost]
    [Consumes("application/json")]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> GetEmployees()
    {
        try
        {   //проверяем входящие данные
            if (!ModelState.IsValid) return BadRequest("bad request data");
            //получаем данные из бд
            var info = await AppDb.CompanyEmployees.OrderByDescending((it) => it.Id).Take(20).ToListAsync();
            //возвращаем в JSON
            return info.SuccessResponse();
        }
        catch (Exception ex)
        {
#if DEBUG
            Console.WriteLine(ex.Message);
#endif
            return BadRequest("failed"); //отдаем BadRequest
        }
    }

    /// <summary>
    /// Создать employees в компании
    /// </summary>
    /// <param name="employeesRequest">Список employees (id не имеет значения, главное по возрастанию)(2013-01-08 - формат даты)</param>
    /// <returns>bool</returns>
    [HttpPost]
    [ProducesResponseType(typeof(bool), 200)]
    [ProducesResponseType(404)]
    [ProducesResponseType(401)]
    [ProducesResponseType(500)]
    public async Task<IActionResult> CreateEmployees([FromBody] CreateEmployeesRequest employeesRequest)
    {
        try
        {   //проверяем входящие данные
            if (!ModelState.IsValid) return BadRequest("bad request data");
            //получаем данные из бд
            var res = await AppDb.CreateEmployees(employeesRequest.CompanyEmployees);
            //возвращаем в JSON
            return res.SuccessResponse();
        }
        catch (Exception ex)
        {
#if DEBUG
            Console.WriteLine(ex.Message);
#endif
            return BadRequest("failed"); //отдаем BadRequest
        }
    }

    /// <summary>
    /// Создать notes в компании
    /// </summary>
    /// <param name="notesRequest">Список notes (id не имеет значения, главное по возрастанию)</param>
    /// <returns>bool</returns>
    [HttpPost]
    [ProducesResponseType(typeof(bool), 200)]
    [ProducesResponseType(404)]
    [ProducesResponseType(401)]
    [ProducesResponseType(500)]
    public async Task<IActionResult> CreateNotes([FromBody] CreateNotesRequest notesRequest)
    {
        try
        {   //проверяем входящие данные
            if (!ModelState.IsValid) return BadRequest("bad request data");
            //получаем данные из бд
            var res = await AppDb.CreateNotes(notesRequest.CompanyNotes);
            //возвращаем в JSON
            return res.SuccessResponse();
        }
        catch (Exception ex)
        {
#if DEBUG
            Console.WriteLine(ex.Message);
#endif
            return BadRequest("failed"); //отдаем BadRequest
        }
    }

    /// <summary>
    /// Удалить notes в компании
    /// </summary>
    /// <param name="notesRequest">Список notes (id не имеет значения, главное по возрастанию)</param>
    /// <returns>bool</returns>
    [HttpPost]
    [ProducesResponseType(typeof(bool), 200)]
    [ProducesResponseType(404)]
    [ProducesResponseType(401)]
    [ProducesResponseType(500)]
    public async Task<IActionResult> DeleteNotes([FromBody] DeleteNotesRequest notesRequest)
    {
        try
        {   //проверяем входящие данные
            if (!ModelState.IsValid) return BadRequest("bad request data");
            //получаем данные из бд
            var res = await AppDb.DeleteNotes(notesRequest.CompanyNotesIds);
            //возвращаем в JSON
            return res.SuccessResponse();
        }
        catch (Exception ex)
        {
#if DEBUG
            Console.WriteLine(ex.Message);
#endif
            return BadRequest("failed"); //отдаем BadRequest
        }
    }

    /// <summary>
    /// Удалить employees в компании
    /// </summary>
    /// <param name="employeesRequest">Список employees (id не имеет значения, главное по возрастанию)</param>
    /// <returns>bool</returns>
    [HttpPost]
    [ProducesResponseType(typeof(bool), 200)]
    [ProducesResponseType(404)]
    [ProducesResponseType(401)]
    [ProducesResponseType(500)]
    public async Task<IActionResult> DeleteEmployees([FromBody] DeleteEmployeesRequest employeesRequest)
    {
        try
        {   //проверяем входящие данные
            if (!ModelState.IsValid) return BadRequest("bad request data");
            //получаем данные из бд
            var res = await AppDb.DeleteEmployees(employeesRequest.CompanyEmployeesIds);
            //возвращаем в JSON
            return res.SuccessResponse();
        }
        catch (Exception ex)
        {
#if DEBUG
            Console.WriteLine(ex.Message);
#endif
            return BadRequest("failed"); //отдаем BadRequest
        }
    }

    /// <summary>
    /// Создать событие в компании
    /// </summary>
    /// <param name="companyHistoryRequest">Список событий (id не имеет значения, главное по возрастанию)</param>
    /// <returns>bool</returns>
    [HttpPost]
    [ProducesResponseType(typeof(bool), 200)]
    [ProducesResponseType(404)]
    [ProducesResponseType(401)]
    [ProducesResponseType(500)]
    public async Task<IActionResult> CreateOrderHistory([FromBody]CompanyHistoryRequest companyHistoryRequest)
    {
        try
        {   //проверяем входящие данные
            if (!ModelState.IsValid) return BadRequest("bad request data");
            //получаем данные из бд
            var res = await AppDb.CreateOrderHistory(companyHistoryRequest.OrderHistoryList);
            //возвращаем в JSON
            return res.SuccessResponse();
        }
        catch (Exception ex)
        {
#if DEBUG
            Console.WriteLine(ex.Message);
#endif
            return BadRequest("failed"); //отдаем BadRequest
        }
    }


    /// <summary>
    /// Генерировать базу данных в папке
    /// </summary>
    /// <returns>bool</returns>
    [HttpPost]
    [ProducesResponseType(typeof(bool), 200)]
    [ProducesResponseType(404)]
    [ProducesResponseType(401)]
    [ProducesResponseType(500)]
    public async Task<IActionResult> GenerateTables()
    {
        try
        {   //проверяем входящие данные
            if (!ModelState.IsValid) return BadRequest("bad request data");
            //получаем данные из бд
            await AppDb.GenerateFileDb();
            //возвращаем в JSON
            return "Complete!".SuccessResponse();
        }
        catch (Exception ex)
        {
#if DEBUG
            Console.WriteLine(ex.Message);
#endif
            return BadRequest("failed"); //отдаем BadRequest
        }
    }


    /// <summary>
    /// Генерировать таблицу компаний
    /// </summary>
    /// <returns>bool</returns>
    [HttpPost]
    [ProducesResponseType(typeof(bool), 200)]
    [ProducesResponseType(404)]
    [ProducesResponseType(401)]
    [ProducesResponseType(500)]
    public async Task<IActionResult> GenerateCompanies()
    {
        try
        {   //проверяем входящие данные
            if (!ModelState.IsValid) return BadRequest("bad request data");
            //получаем данные из бд
            var res = await AppDb.GenerateCompanies();
            //возвращаем в JSON
            return res.SuccessResponse();
        }
        catch (Exception ex)
        {
#if DEBUG
            Console.WriteLine(ex.Message);
#endif
            return BadRequest("failed"); //отдаем BadRequest
        }
    }

    /// <summary>
    /// Удалить все компании
    /// </summary>
    /// <returns>bool</returns>
    [HttpPost]
    [ProducesResponseType(typeof(bool), 200)]
    [ProducesResponseType(404)]
    [ProducesResponseType(401)]
    [ProducesResponseType(500)]
    public async Task<IActionResult> DeleteAllCompanies()
    {
        try
        {   //проверяем входящие данные
            if (!ModelState.IsValid) return BadRequest("bad request data");
            //получаем данные из бд
            var res = await AppDb.DeleteAllCompanies();
            //возвращаем в JSON
            return res.SuccessResponse();
        }
        catch (Exception ex)
        {
#if DEBUG
            Console.WriteLine(ex.Message);
#endif
            return BadRequest("failed"); //отдаем BadRequest
        }
    }

    /// <summary>
    /// Удалить все события Orders History компании
    /// </summary>
    /// <returns>bool</returns>
    [HttpPost]
    [ProducesResponseType(typeof(bool), 200)]
    [ProducesResponseType(404)]
    [ProducesResponseType(401)]
    [ProducesResponseType(500)]
    public async Task<IActionResult> DeleteAllOrdersHistory()
    {
        try
        {   //проверяем входящие данные
            if (!ModelState.IsValid) return BadRequest("bad request data");
            //получаем данные из бд
            var res = await AppDb.DeleteAllOrdersHistory();
            //возвращаем в JSON
            return res.SuccessResponse();
        }
        catch (Exception ex)
        {
#if DEBUG
            Console.WriteLine(ex.Message);
#endif
            return BadRequest("failed"); //отдаем BadRequest
        }
    }


    /// <summary>
    /// Удалить все события Notes
    /// </summary>
    /// <returns>bool</returns>
    [HttpPost]
    [ProducesResponseType(typeof(bool), 200)]
    [ProducesResponseType(404)]
    [ProducesResponseType(401)]
    [ProducesResponseType(500)]
    public async Task<IActionResult> DeleteAllNotes()
    {
        try
        {   //проверяем входящие данные
            if (!ModelState.IsValid) return BadRequest("bad request data");
            //получаем данные из бд
            var res = await AppDb.DeleteAllNotes();
            //возвращаем в JSON
            return res.SuccessResponse();
        }
        catch (Exception ex)
        {
#if DEBUG
            Console.WriteLine(ex.Message);
#endif
            return BadRequest("failed"); //отдаем BadRequest
        }
    }
}