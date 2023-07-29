using Companies.Services;
using Extensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Middleware;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

var connection = builder.Configuration.GetConnectionString("DefaultConnection");
// Configure Database
builder.Services.AddDbContext<DatabaseContext>(options =>
                options.UseSqlite(connection));
//конфигурация политики кук
builder.Services.Configure<CookiePolicyOptions>(options =>
{
    options.CheckConsentNeeded = _ => false; //политики согласия не оцениваются
    options.MinimumSameSitePolicy = SameSiteMode.None; //запрет переопределения значений cookie
    options.Secure = CookieSecurePolicy.Always; //файлы cookie должны быть безопасными
});
builder.Services.AddSession(options =>//конфигурируем параметры сессии
{
    options.Cookie.Name = AuthExt.NameSessionCookie; //ставим название куку сессии
    options.IdleTimeout = TimeSpan.FromMinutes(10); //время хранения сессии при бездействии
    options.Cookie.HttpOnly = true; //доступ только с сервера
    options.Cookie.IsEssential = true; //нужен ли файл cookie для работы (true-проверки политики согласия пропускаются)
});
builder.Services.AddAntiforgery(options =>//настройки службы против подделки запросов
{
    options.HeaderName = "X-CSRF-TOKEN";
});

builder.Services.AddControllersWithViews();// Add services to the container.

builder.Services.AddCors(); //добавляем политику CORS

//добавляем Swagger
builder.Services.AddSwaggerGen(options =>
{
    //пишем опции Swagger
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Version = "1.0.1",
        Title = "REST API Strategy Risk",
        Description = "Тестовове задание",
        Contact = new OpenApiContact
        {
            Name = "Nikolay",
            Email = "dvurechensky_pro@mail.ru",
        }
    });
    var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    options.IncludeXmlComments(xmlPath);
});

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Документация");
    c.RoutePrefix = "docs";
});

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
} 
else
{
    //app.UseHttpsRedirection();
}

app.UseStaticFiles();

app.UseCookiePolicy(); //использовать политику куки

app.UseSession(); //использовать сессии

app.UseRouting();

app.UseMiddleware<AntiforgeryMiddleware>(); //обработчик службы против подделки запросов

app.UseAuthorization();

app.UseCors(options =>//используем CORS с любых хостов
{
    options.SetIsOriginAllowed(_ => true)
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials();
});

#pragma warning disable ASP0014
app.UseEndpoints(endpoints =>//маршрутизация
{
    endpoints.MapDefaultControllerRoute();//дефолтный роутер
    endpoints.MapControllers();//для маршрутизации если используются атрибуты
});
#pragma warning restore ASP0014

app.Run();
