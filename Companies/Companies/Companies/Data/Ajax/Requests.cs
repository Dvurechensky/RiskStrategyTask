using Companies.Data.Home;
using System.Text.Json.Serialization;

namespace Companies.Data.Ajax
{
    /// <summary>
    /// Запрос данных о компании
    /// </summary>
    public class CompanyInfoRequest
    {
        /// <summary>
        /// Идентификатор команды
        /// </summary>
        [JsonPropertyName("idCompany")]
        public int IdCompany { get; set; }
    }

    /// <summary>
    /// Запрос данных о сотруднике компании
    /// </summary>
    public class GetEmployeeRequest
    {
        /// <summary>
        /// Идентификатор команды
        /// </summary>
        [JsonPropertyName("id")]
        public int IdEmployee { get; set; }
    }

    /// <summary>
    /// Параметры для создания order в History компании
    /// </summary>
    public class CompanyHistoryRequest
    {
        /// <summary>
        /// Список параметров
        /// </summary>
        [JsonPropertyName("OrderHistoryList")]
        public List<OrderHistory> OrderHistoryList { get; set; }
    }

    /// <summary>
    /// Параметры для создания Notes компании
    /// </summary>
    public class CreateNotesRequest
    {
        /// <summary>
        /// Список Notes
        /// </summary>
        [JsonPropertyName("NotesList")]
        public List<CompanyNotes> CompanyNotes { get; set; }
    }

    /// <summary>
    /// Параметры для создания Employees компании
    /// </summary>
    public class CreateEmployeesRequest
    {
        /// <summary>
        /// Список Employees
        /// </summary>
        [JsonPropertyName("EmployeesList")]
        public List<CompanyEmployees> CompanyEmployees { get; set; }
    }

    /// <summary>
    /// Параметры для удаления Notes компании
    /// </summary>
    public class DeleteNotesRequest
    {
        /// <summary>
        /// Список Notes
        /// </summary>
        [JsonPropertyName("ids")]
        public List<int> CompanyNotesIds { get; set; }
    }

    /// <summary>
    /// Параметры для удаления Employees компании
    /// </summary>
    public class DeleteEmployeesRequest
    {
        /// <summary>
        /// Список Notes
        /// </summary>
        [JsonPropertyName("ids")]
        public List<int> CompanyEmployeesIds { get; set; }
    }
}
