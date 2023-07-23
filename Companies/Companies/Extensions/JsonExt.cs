using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc;

namespace Extensions;

/// <summary>
/// Класс вспомогательных методов для работы с JSON
/// </summary>
public static class JsonExt
{
    /// <summary>
    /// Объект в JSON строку
    /// </summary>
    /// <param name="data">Входящий объект</param>
    /// <param name="jsonConverter">Кастомный конвертер</param>
    /// <returns>Строка JSON</returns>
    public static string SerializeToJson(this object data, JsonConverter jsonConverter = null)
    {
        try
        {
            if (data == null) return string.Empty;//проверяем входящие данные
            //создаем объект настроек сериализации
            var jsonSerializerOptions = new JsonSerializerOptions
            {
                AllowTrailingCommas = true,
                DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull,
                Converters =
                {
                    new JsonStringEnumConverter(JsonNamingPolicy.CamelCase, false)
                }
            };
            if (jsonConverter != null)//если задан кастомный конвертер
            {   //добавляем кастомный конвертер
                jsonSerializerOptions.Converters.Add(jsonConverter);
            } //сериализуем объект в строку JSON и отдаем ее
            return JsonSerializer.Serialize(data, jsonSerializerOptions);
        }
        catch (Exception ex)
        {
#if DEBUG
            Console.WriteLine(ex.Message);
#endif
            return string.Empty;//отдаем пустую строку
        }
    }

    /// <summary>
    /// Форматирует объект в ответ с JSON строкой в теле
    /// </summary>
    /// <param name="data">Входящий объект</param>
    /// <param name="jsonConverter">Кастомный конвертер</param>
    /// <returns>Результат ответа</returns>
    public static ContentResult SuccessResponse(this object data, JsonConverter jsonConverter = null)
    {
        try
        {   
            return new ContentResult //создаем контент ответа
            {
                Content = data.SerializeToJson(jsonConverter),
                ContentType = "application/json",
                StatusCode = 200
            };
        }
        catch (Exception ex)
        {
#if DEBUG
            Console.WriteLine(ex.Message);
#endif
            return null; //отдаем null
        }
    }
}