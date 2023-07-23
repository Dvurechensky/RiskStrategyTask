using Companies.Data.Home;
using Companies.Models;
using Companies.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;
using System.Diagnostics;

namespace Companies.Controllers;

[Route("[action]")]
public class HomeController : Controller
{
    private DatabaseContext AppDb;

    public HomeController(DatabaseContext dbContext)
    {
        AppDb = dbContext;
    }


    /// <summary>
    /// Главная страница
    /// </summary>
    [ApiExplorerSettings(IgnoreApi = true)]
    [HttpGet]
    [Route("/")]
    public async Task<IActionResult> Index()
    {
        try
        {
            var companies = await AppDb.Companies.ToListAsync();
            return View(new HomeViewModel() {
                Companies = companies
            });
        }
        catch (Exception ex)
        {
#if DEBUG
            Console.WriteLine(ex.Message);
#endif
            return StatusCode(404);
        }
    }

    /// <summary>
    /// Метод вывода информации о компании
    /// </summary>
    /// <param name="id">ID компании</param>
    /// <returns>Детализация</returns>
    [ApiExplorerSettings(IgnoreApi = true)]
    [HttpGet]
    [Route("/Details/{id}")]
    public async Task<IActionResult> Details(int id)
    {
        try
        {
            var info = await AppDb.Companies.FirstOrDefaultAsync((res) => res.Id == id);

            return View(new HomeViewModel
            {
                DetailsCompany = new DetailsCompany() { CompanyInfo = info }
            });
        }
        catch (Exception ex)
        {
#if DEBUG
            Console.WriteLine(ex.Message);
#endif
            return StatusCode(404);
        }
    }

    /// <summary>
    /// Страница ошибки
    /// </summary>
    [ApiExplorerSettings(IgnoreApi = true)]
    [HttpGet]
    [Route("/error")]
    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}