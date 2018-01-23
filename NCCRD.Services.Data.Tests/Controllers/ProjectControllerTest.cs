using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using NCCRD.Database.Models;

namespace NCCRD.Services.Data.Tests.Controllers
{
    [TestClass]
    public class ProjectControllerTest
    {
        private HttpClient client = new HttpClient();

        public ProjectControllerTest()
        {
            //Setup connection to data service
            client.BaseAddress = new Uri("http://localhost:58683/");
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        }

        [TestMethod]
        public void GetAllProjectsAsync()
        {
            //arrange
            var result = new List<Project>();

            //act
            HttpResponseMessage response = client.GetAsync("api/Projects/GetAllProjects").Result;
            if(response.IsSuccessStatusCode)
            {
                result = response.Content.ReadAsAsync<List<Project>>().Result;
            }

            //assert
            Assert.IsTrue(result.Count > 0);
        }
    }
}
