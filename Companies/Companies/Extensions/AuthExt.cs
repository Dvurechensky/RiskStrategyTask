namespace Extensions;

/// <summary>
/// Класс вспомогательных методов для авторизации
/// </summary>
public static class AuthExt
{
    /// <summary>
    /// Название куки сессии пользователя
    /// </summary>
    public const string NameSessionCookie = ".Usr.Session";


    /// <summary>
    /// Разрушает сессию пользователя
    /// </summary>
    /// <param name="httpContext">HttpContext запроса</param>
    public static void DestroyUserSession(this HttpContext httpContext)
    {
        try
        {
            httpContext.Session.Clear();//очищаем сессию пользователя
            //удаляем куку сессии
            httpContext.Response.Cookies.Delete(NameSessionCookie);
        }
        catch (Exception ex)
        {
#if DEBUG
            Console.WriteLine(ex.Message);
#endif
        }
    }
}