using NCCRD.Database.Models;
using NCCRD.Database.Models.Contexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace NCCRD.Services.Data.Controllers.API
{
    /// <summary>
    /// Manage Country data
    /// </summary>
    public class CountryController : ApiController
    {
        /// <summary>
        /// Get all Country data
        /// </summary>
        /// <returns>Country data as JSON</returns>
        [HttpGet]
        [Route("api/Country/GetAll")]
        public IEnumerable<Country> GetAll()
        {
            List<Country> data = new List<Country>();

            using (var context = new SQLDBContext())
            {
                data = context.Country.ToList();
            }

            return data;
        }

        /// <summary>
        /// Get Country by Id
        /// </summary>
        /// <param name="id">The Id of the Country to get</param>
        /// <returns>Country data as JSON</returns>
        [HttpGet]
        [Route("api/Country/GetByID/{id}")]
        public Country GetByID(int id)
        {
            Country data = null;

            using (var context = new SQLDBContext())
            {
                data = context.Country.FirstOrDefault(x => x.CountryId == id);
            }

            return data;
        }

        /// <summary>
        /// Get Country by Value
        /// </summary>
        /// <param name="value">The Value of the Country to get</param>
        /// <returns>Country data as JSON</returns>
        [HttpGet]
        [Route("api/Country/GetByValue/{value}")]
        public Country GetByValue(string value)
        {
            Country data = null;

            using (var context = new SQLDBContext())
            {
                data = context.Country.FirstOrDefault(x => x.Value == value);
            }

            return data;
        }

        /*/// <summary>
        /// Add Country
        /// </summary>
        /// <param name="country">The Country to add</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/Country/Add")]
        public bool Add([FromBody]Country country)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                if (context.Country.Count(x => x.CountryId == country.CountryId) == 0)
                {
                    //Add CDMStatus entry
                    context.Country.Add(country);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }*/

        /*/// <summary>
        /// Update Country
        /// </summary>
        /// <param name="country">Country to update</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/Country/Update")]
        public bool Update([FromBody]Country country)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.Country.FirstOrDefault(x => x.CountryId == country.CountryId);
                if (data != null)
                {
                    data.Value = country.Value;
                    data.Description = country.Description;
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }*/

        /*/// <summary>
        /// Delete Country
        /// </summary>
        /// <param name="country">Country to delete</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/Country/Delete")]
        public bool Delete([FromBody]Country country)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.Country.FirstOrDefault(x => x.CountryId == country.CountryId);
                if (data != null)
                {
                    context.Country.Remove(data);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }*/

        /*/// <summary>
        /// Delete Country by Id
        /// </summary>
        /// <param name="id">Id of Country to delete</param>
        /// <returns>True/False</returns>
        [HttpGet]
        [Route("api/Country/DeleteById/{id}")]
        public bool DeleteById(int id)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.Country.FirstOrDefault(x => x.CountryId == id);
                if (data != null)
                {
                    context.Country.Remove(data);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }*/
    }
}