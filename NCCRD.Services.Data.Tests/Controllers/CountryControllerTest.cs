using System;
using System.Text;
using System.Collections.Generic;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Net.Http;
using System.Net.Http.Headers;
using NCCRD.Database.Models;
using System.Linq;

namespace NCCRD.Services.Data.Tests.Controllers
{
    /// <summary>
    /// Summary description for CountryController
    /// </summary>
    [TestClass]
    public class CountryControllerTest
    {
        private HttpClient client = new HttpClient();

        public CountryControllerTest()
        {
            //Setup connection to data service
            client.BaseAddress = new Uri("http://localhost:58683/");
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        }

        [TestMethod]
        public void Test_GetAll()
        {
            //arrange
            var result = new List<Country>();

            //act
            result = GetAll();

            //assert
            Assert.IsTrue(result.Count > 0);
        }

        private List<Country> GetAll()
        {
            HttpResponseMessage response = client.GetAsync("api/Country/GetAll").Result;
            if (response.IsSuccessStatusCode)
            {
                return response.Content.ReadAsAsync<List<Country>>().Result;
            }

            return new List<Country>();
        }

        [TestMethod]
        public void Test_GetByValue()
        {
            //arrange
            Country result = null;
            string value = "TestCountry";

            //act
            result = GetByValue(value);

            //assert
            Assert.IsNotNull(result);
        }

        private Country GetByValue(string value)
        {
            HttpResponseMessage response = client.GetAsync($"api/Country/GetByValue/{value}").Result;
            if (response.IsSuccessStatusCode)
            {
                return response.Content.ReadAsAsync<Country>().Result;
            }

            return null;
        }

        [TestMethod]
        public void Test_Add()
        {
            //arrage
            var result = false;
            var data = new Country()
            {
                Value = "TestCountry",
                Description = "TestCountryDescription"
            };

            //act
            HttpResponseMessage response = client.PostAsJsonAsync("api/Country/Add", data).Result;
            if (response.IsSuccessStatusCode)
            {
                result = response.Content.ReadAsAsync<bool>().Result;
            }

            //assert
            Assert.IsTrue(result);
        }

        [TestMethod]
        public void Test_Update()
        {
            //arrange
            var result = false;
            Country data = GetByValue("TestCountry");
            data.Description = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");

            //act
            HttpResponseMessage response = client.PostAsJsonAsync("api/Country/Update", data).Result;
            if (response.IsSuccessStatusCode)
            {
                result = response.Content.ReadAsAsync<bool>().Result;
            }

            //assert
            Assert.IsTrue(result);
        }

        [TestMethod]
        public void Test_DeleteById()
        {
            //arrange
            var result = false;
            int countryId = GetByValue("TestCountry").CountryId;

            //act
            HttpResponseMessage response = client.GetAsync($"api/Country/DeleteById/{countryId}").Result;
            if (response.IsSuccessStatusCode)
            {
                result = response.Content.ReadAsAsync<bool>().Result;
            }

            //assert
            Assert.IsTrue(result);
        }
    }
}
