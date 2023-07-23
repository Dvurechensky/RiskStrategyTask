using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Companies.Data.Home;

/// <summary>
/// Компания
/// </summary>
public class CompanyInfo
{
    /// <summary>
    /// Идентификатор
    /// </summary>
    [JsonPropertyName("Id")]
    public int Id { get; set; }
    /// <summary>
    /// Название
    /// </summary>
    [JsonPropertyName("Name")]
    public string Name { get; set; }
    /// <summary>
    /// Адрес
    /// </summary>
    [JsonPropertyName("Address")]
    public string Address { get; set; }
    /// <summary>
    /// Город
    /// </summary>
    [JsonPropertyName("City")]
    public string City { get; set; }
    /// <summary>
    /// Штат
    /// </summary>
    [JsonPropertyName("State")]
    public string State { get; set; }
    /// <summary>
    /// Телефон
    /// </summary>
    [JsonPropertyName("Phone")]
    public string Phone { get; set; }

    /// <summary>
    /// Корректность данных
    /// </summary>
    [JsonPropertyName("IsValid")]
    public bool IsValid => Id != 0 && !string.IsNullOrEmpty(Name);
}

/// <summary>
/// Краткая история магазинов
/// </summary>
public class OrderHistory
{
    /// <summary>
    /// Идентификатор
    /// </summary>
    [JsonPropertyName("Id")]
    public int Id { get; set; }

    /// <summary>
    /// Дата события
    /// </summary>
    [JsonPropertyName("OrderDate")]
    public string OrderDate { get; set; }

    /// <summary>
    /// Город события
    /// </summary>
    [JsonPropertyName("StoreCity")]
    public string StoreCity { get; set; }
}

/// <summary>
/// Notes компании
/// </summary>
public class CompanyNotes
{
    /// <summary>
    /// Идентификатор
    /// </summary>
    [JsonPropertyName("Id")]
    public int Id { get; set; }

    /// <summary>
    /// Дата события
    /// </summary>
    [JsonPropertyName("Employee")]
    public string Employee { get; set; }
}

/// <summary>
/// Employees компании
/// </summary>
public class CompanyEmployees
{
    /// <summary>
    /// Идентификатор
    /// </summary>
    [JsonPropertyName("Id")]
    public int Id { get; set; }

    /// <summary>
    /// Имя
    /// </summary>
    [JsonPropertyName("FirstName")]
    public string FirstName { get; set; }

    /// <summary>
    /// Фамилия
    /// </summary>
    [JsonPropertyName("LastName")]
    public string LastName { get; set; }

    /// <summary>
    /// Пол
    /// </summary>
    [JsonPropertyName("Title")]
    public string Title { get; set; }

    /// <summary>
    /// День рождения
    /// </summary>
    [JsonPropertyName("BirthDate")]
    public string BirthDate { get; set; }

    /// <summary>
    /// Должность
    /// </summary>
    [JsonPropertyName("Position")]
    public string Position { get; set; }
}

/// <summary>
/// Полная информация о компании
/// </summary>
public class DetailsCompany
{
    /// <summary>
    /// Основная информация
    /// </summary>
    public CompanyInfo CompanyInfo { get; set; }
}
