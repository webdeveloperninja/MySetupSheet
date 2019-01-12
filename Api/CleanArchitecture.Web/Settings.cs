using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CleanArchitecture.Web
{
    public class Settings : ISettings
    {
        public string SwaggerTitle => config.GetValue<string>("Swagger:Title");

        public string DbConnectionString => config.GetConnectionString("DefaultConnection"); 

        private IConfiguration config;

        public Settings(IConfiguration configuration)
        {
            config = configuration;
        }
    }
}
