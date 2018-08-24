using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Microsoft.AspNet.OData.Extensions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using NCCRD.Services.DataV2.Database.Contexts;

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
                          builder.WithOrigins("http://localhost:8080", "http://app01.saeon.ac.za/nccrdsite")
                                 .AllowAnyHeader()
                                 .AllowAnyMethod();
                      });
            });

            var connectionString = Configuration.GetConnectionString("NCCRD");
            services.AddDbContext<SQLDBContext>(options =>
            {
                options.UseSqlServer(connectionString);
            });

            services.AddOData();
            services.AddTransient<ODataModelBuilder>();

            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ODataModelBuilder modelBuilder)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            //app.UseCors(builder => builder.WithOrigins("http://localhost:8080", "http://app01.saeon.ac.za/nccrdsite"));
            app.UseCors("CORSPolicy");

            app.UseMvc(routeBuilder =>
            {
                routeBuilder.MapODataServiceRoute(
                    "ODataRoutes", 
                    "odata", 
                    modelBuilder.GetEdmModel(app.ApplicationServices));
            });
        }
    }
}
