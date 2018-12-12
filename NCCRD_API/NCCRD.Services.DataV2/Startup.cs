using Microsoft.AspNet.OData.Extensions;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using NCCRD.Services.DataV2.Database.Contexts;
using Swashbuckle.AspNetCore.Swagger;

namespace NCCRD.Services.DataV2
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //services.AddCors();
            services.AddCors(options =>
            {
                options.AddPolicy("CORSPolicy",
                      builder =>
                      {
                          builder.WithOrigins(
                                    "http://localhost:8085", //NCCRD LOCAL
                                    "http://localhost:8091", //CCIS LOCAL
                                    "http://app01.saeon.ac.za/nccrdsite", //NCCRD LIVE
                                    "http://app01.saeon.ac.za/ccis" //CCIS LIVE
                                 )
                                .AllowAnyHeader()
                                .AllowAnyMethod();
                      });
            });

            var connectionString = Configuration.GetConnectionString("NCCRD");
            services.AddDbContext<SQLDBContext>(options =>
            {
                options.UseSqlServer(connectionString, o =>
                {
                    o.UseRowNumberForPaging(); //Backwards compatibility for for SQL 2008 R2
                });
            });

            services.AddTransient<ODataModelBuilder>();

            // SetCompatibilityVersion is only needed for the UseSwagger() methods on ASP.NET Core >= 2.1
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            services.AddOData();

            // Add OpenAPI/Swagger document
            services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("v1", new Info { Title = "NCCRD API", Version = "v1.0-beta" });
                options.DocumentFilter<CustomDocumentFilter>();
            });

            services
                .AddAuthentication(GetAuthenticationOptions)
                .AddJwtBearer(GetJwtBearerOptions);
        }

        private static void GetAuthenticationOptions(AuthenticationOptions options)
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        }

        private static void GetJwtBearerOptions(JwtBearerOptions options)
        {
            options.Authority = "http://identity.saeon.ac.za";
            options.Audience = "http://identity.saeon.ac.za/resources";
            options.RequireHttpsMetadata = false;
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ODataModelBuilder modelBuilder)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors("CORSPolicy");

            // Add OpenAPI/Swagger middlewares
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "v1.0-beta");
            });

            app
                .UseAuthentication()
                .UseMvc(routeBuilder =>
                {
                    routeBuilder.MapODataServiceRoute(
                        "ODataRoutes",
                        "odata",
                        modelBuilder.GetEdmModel(app.ApplicationServices));
                });
        }
    }
}
