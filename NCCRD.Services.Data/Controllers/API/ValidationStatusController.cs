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
    /// Manage ValidationStatus data
    /// </summary>
    public class ValidationStatusController : ApiController
    {
        /// <summary>
        /// Get all ValidationStatus data
        /// </summary>
        /// <returns>ValidationStatus data as JSON</returns>
        [HttpGet]
        [Route("api/ValidationStatus/GetAll")]
        public IEnumerable<ValidationStatus> GetAll()
        {
            List<ValidationStatus> data = new List<ValidationStatus>();

            using (var context = new SQLDBContext())
            {
                data = context.ValidationStatus.ToList();
            }

            return data;
        }

        /// <summary>
        /// Get ValidationStatus by Id
        /// </summary>
        /// <param name="id">The Id of the ValidationStatus to get</param>
        /// <returns>ValidationStatus data as JSON</returns>
        [HttpGet]
        [Route("api/ValidationStatus/GetByID/{id}")]
        public ValidationStatus GetByID(int id)
        {
            ValidationStatus data = null;

            using (var context = new SQLDBContext())
            {
                data = context.ValidationStatus.FirstOrDefault(x => x.ValidationStatusId == id);
            }

            return data;
        }

        /// <summary>
        /// Get ValidationStatus by Value
        /// </summary>
        /// <param name="value">The Value of the ValidationStatus to get</param>
        /// <returns>ValidationStatus data as JSON</returns>
        [HttpGet]
        [Route("api/ValidationStatus/GetByValue/{value}")]
        public ValidationStatus GetByValue(string value)
        {
            ValidationStatus data = null;

            using (var context = new SQLDBContext())
            {
                data = context.ValidationStatus.FirstOrDefault(x => x.Value == value);
            }

            return data;
        }

        /// <summary>
        /// Add ValidationStatus
        /// </summary>
        /// <param name="validationStatus">The ValidationStatus to add</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/ValidationStatus/Add")]
        public bool Add([FromBody]ValidationStatus validationStatus)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                if (context.ValidationStatus.Count(x => x.ValidationStatusId == validationStatus.ValidationStatusId) == 0)
                {
                    //Add ValidationStatus entry
                    context.ValidationStatus.Add(validationStatus);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Update ValidationStatus
        /// </summary>
        /// <param name="validationStatus">ValidationStatus to update</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/ValidationStatus/Update")]
        public bool Update([FromBody]ValidationStatus validationStatus)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.ValidationStatus.FirstOrDefault(x => x.ValidationStatusId == validationStatus.ValidationStatusId);
                if (data != null)
                {
                    //add properties to update here
                    data.Value = validationStatus.Value;
                    data.Description = validationStatus.Description;
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Delete ValidationStatus
        /// </summary>
        /// <param name="validationStatus">ValidationStatus to delete</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/ValidationStatus/Delete")]
        public bool Delete([FromBody]ValidationStatus validationStatus)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.ValidationStatus.FirstOrDefault(x => x.ValidationStatusId == validationStatus.ValidationStatusId);
                if (data != null)
                {
                    context.ValidationStatus.Remove(data);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Delete ValidationStatus by Id
        /// </summary>
        /// <param name="id">Id of ValidationStatus to delete</param>
        /// <returns>True/False</returns>
        [HttpGet]
        [Route("api/ValidationStatus/DeleteById/{id}")]
        public bool DeleteById(int id)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.ValidationStatus.FirstOrDefault(x => x.ValidationStatusId == id);
                if (data != null)
                {
                    context.ValidationStatus.Remove(data);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }
    }
}