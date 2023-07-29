using Companies.Data.Home;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.Extensions.Options;

namespace Companies.Services;

/// <summary>
/// Контекст работы с БД
/// </summary>
public class DatabaseContext : DbContext
{
    /// <summary>
    /// Инициализация таблицы компаний
    /// </summary>
    public DbSet<CompanyInfo> Companies => Set<CompanyInfo>();

    /// <summary>
    /// Инициализация таблицы истории событий компаний
    /// </summary>
    public DbSet<OrderHistory> HistoryOrder => Set<OrderHistory>();

    /// <summary>
    /// Инициализация таблицы Notes компаний
    /// </summary>
    public DbSet<CompanyNotes> CompanyNotes => Set<CompanyNotes>();

    /// <summary>
    /// Инициализация таблицы Employees компаний
    /// </summary>
    public DbSet<CompanyEmployees> CompanyEmployees => Set<CompanyEmployees>();

    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="options"></param>
    public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options) { }

    public async Task GenerateFileDb()
    {
        Console.WriteLine($"Create db");
        await Database.EnsureDeletedAsync();
        await Database.EnsureCreatedAsync();
    }

    /// <summary>
    /// Генерировать базовую таблицу
    /// </summary>
    public async Task<bool> GenerateCompanies()
    {
        try
        {
            var c1 = new List<CompanyInfo>()
            {
                new CompanyInfo {  Id = 1,
                            Name = "Super Mart of the West",
                            City = "Bentonville",
                            State = "Arkansas",
                            Address = "",
                            Phone = "(800) 555-2797" },
                new CompanyInfo {  Id = 2,
                            Name = "Electronics Depot",
                            City = "Atlanta",
                            State = "Georgia",
                            Address = "",
                            Phone = "(800) 595-3232" },
                new CompanyInfo {  Id = 3,
                            Name = "K&S Music",
                            City = "Minneapolis",
                            State = "Minnesota",
                            Address = "",
                            Phone = "(612) 304-6073" },
                new CompanyInfo {  Id = 4,
                            Name = "Tom's Club",
                            City = "Issaquah",
                            State = "Washington",
                            Address = "",
                            Phone = "(800) 955-2292" },
                new CompanyInfo {  Id = 5,
                            Name = "E-Mart",
                            City = "Hoffman Estates",
                            State = "illinois",
                            Address = "",
                            Phone = "(847) 286-2500" },
            };
            await Companies.AddRangeAsync(c1);
            await SaveChangesAsync();
            Console.WriteLine("Save db Complete!");
            return await Task.FromResult(true);
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return await Task.FromResult(false);
        }
    }

    /// <summary>
    /// Удалить все данные таблицы компаний
    /// </summary>
    /// <returns></returns>
    public async Task<bool> DeleteAllCompanies()
    {
        try
        {
            RemoveRange(Companies);
            await SaveChangesAsync();
            return await Task.FromResult(true);
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return await Task.FromResult(false);
        }
    }

    /// <summary>
    /// Удалить все данные таблицы компаний
    /// </summary>
    /// <returns></returns>
    public async Task<bool> DeleteAllNotes()
    {
        try
        {
            RemoveRange(CompanyNotes);
            await SaveChangesAsync();
            return await Task.FromResult(true);
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return await Task.FromResult(false);
        }
    }

    /// <summary>
    /// Удалить все данные таблицы компаний
    /// </summary>
    /// <returns></returns>
    public async Task<bool> DeleteAllOrdersHistory()
    {
        try
        {
            RemoveRange(HistoryOrder);
            await SaveChangesAsync();
            return await Task.FromResult(true);
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return await Task.FromResult(false);
        }
    }

    /// <summary>
    /// Создание элемента истории
    /// </summary>
    /// <param name="orders">Список событий</param>
    public async Task<bool> CreateOrderHistory(List<OrderHistory> orders)
    {
        try
        {
            var countOrders = await HistoryOrder.ToListAsync();
            var count = countOrders.Count;

            foreach (var order in orders)
            {
                count++;
                order.Id = count;
            }

            await HistoryOrder.AddRangeAsync(orders);
            await SaveChangesAsync();
            return await Task.FromResult(true);
        } 
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return await Task.FromResult(false);
        }
    }

    /// <summary>
    /// Удаление элемента(ов) Notes
    /// </summary>
    /// <param name="notes">Список событий</param>
    public async Task<bool> DeleteNotes(List<int> notes)
    {
        try
        {
            foreach(var note in notes)
            {
                var notesEl = CompanyNotes
                .Where(o => o.Id == note)
                .FirstOrDefault();

                CompanyNotes.Remove(notesEl);
                await SaveChangesAsync();
            }

            return await Task.FromResult(true);
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return await Task.FromResult(false);
        }
    }

    /// <summary>
    /// Удаление элемента(ов) Employees
    /// </summary>
    /// <param name="employees">Список участников</param>
    public async Task<bool> DeleteEmployees(List<int> employees)
    {
        try
        {
            foreach (var note in employees)
            {
                var empoEl = CompanyEmployees
                .Where(o => o.Id == note)
                .FirstOrDefault();

                CompanyEmployees.Remove(empoEl);
                await SaveChangesAsync();
            }

            return await Task.FromResult(true);
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return await Task.FromResult(false);
        }
    }

    /// <summary>
    /// Создание элемента(ов) Notes
    /// </summary>
    /// <param name="notes">Список событий</param>
    public async Task<bool> CreateNotes(List<CompanyNotes> notes)
    {
        try
        {
            var countOrders = await CompanyNotes.ToListAsync();
            var count = countOrders.Count;

            foreach (var order in notes)
            {
                count++;
                order.Id = count;
            }

            await CompanyNotes.AddRangeAsync(notes);
            await SaveChangesAsync();
            return await Task.FromResult(true);
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return await Task.FromResult(false);
        }
    }

    /// <summary>
    /// Создание элемента(ов) Employees
    /// </summary>
    /// <param name="employees">Список участников</param>
    public async Task<bool> CreateEmployees(List<CompanyEmployees> employees)
    {
        try
        {
            var countOrders = await CompanyEmployees.ToListAsync();
            var count = countOrders.Count;

            foreach (var order in employees)
            {
                count++;
                order.Id = count;
            }

            await CompanyEmployees.AddRangeAsync(employees);
            await SaveChangesAsync();
            return await Task.FromResult(true);
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return await Task.FromResult(false);
        }
    }

    /// <summary>
    /// Создание файла БД
    /// </summary>
    /// <param name="optionsBuilder">Опции</param>
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        var dir = Path.GetDirectoryName(Environment.ProcessPath);
        var path = Path.Combine(dir, "application.db");
        Console.WriteLine("DatabasePath: " + path);
        optionsBuilder.UseSqlite("Data Source=" + path);
        optionsBuilder.LogTo(Console.WriteLine, new[] { RelationalEventId.CommandExecuted });
    }
}
