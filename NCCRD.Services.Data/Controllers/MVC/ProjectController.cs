using NCCRD.Database.Models;
using NCCRD.Services.Data.Classes;
using NCCRD.Services.Data.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace NCCRD.Services.Data.Controllers.MVC
{
    public class ProjectController : Controller
    {
        // GET: Project
        public async Task<ActionResult> Index()
        {
            APIClient client = new APIClient();
      
            HttpResponseMessage response = await client.Get("api/Projects/GetAll",  Session.GetAccessToken());
            string content = await response.Content.ReadAsStringAsync();

            var projectsData = new ProjectsViewModel();
            if (response.IsSuccessStatusCode)
            {
                var data = JsonConvert.DeserializeObject<List<Project>>(content);
                projectsData.Projects = data;
            }
            else
            {
                if(response.StatusCode == System.Net.HttpStatusCode.Unauthorized)
                {
                    var template = new
                    {
                        Message = ""
                    };
                   
                    var message = JsonConvert.DeserializeAnonymousType(content, template);
                    ViewBag.Message = message.Message;
                }
            }

            return View(projectsData);
        }
    }
}