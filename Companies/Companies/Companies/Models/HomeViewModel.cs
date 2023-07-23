using Companies.Data.Home;

namespace Models;

/// <summary>
/// Модель для передачи в View
/// </summary>
public class HomeViewModel
{
    /// <summary>
    /// Список компаний
    /// </summary>
    public List<CompanyInfo> Companies { get; init; }

    /// <summary>
    /// Компания детализации
    /// </summary>
    public DetailsCompany DetailsCompany { get; set; }
}