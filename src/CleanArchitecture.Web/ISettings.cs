namespace CleanArchitecture.Web
{
    interface ISettings
    {
        string SwaggerTitle { get; }

        string DbConnectionString { get; }
    }
}
