using NCCRD.Database.Models;
using NCCRD.Database.Models.Contexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace NCCRD.Services.Data.Controllers
{
    /// <summary>
    /// Manage ResearchDetails data
    /// </summary>
    public class ResearchDetailsController : ApiController
    {
        /// <summary>
        /// Get all ResearchDetails data
        /// </summary>
        /// <returns>ResearchDetails data as JSON</returns>
        [HttpGet]
        [Route("api/ResearchDetails/GetAll")]
        public IEnumerable<ResearchDetail> GetAll()
        {
            List<ResearchDetail> data = new List<ResearchDetail>();

            using (var context = new SQLDBContext())
            {
                data = context.ResearchDetails.ToList();
            }

            return data;
        }

        /// <summary>
        /// Get ResearchDetails by Id
        /// </summary>
        /// <param name="id">The Id of the ResearchDetails to get</param>
        /// <returns>ResearchDetails data as JSON</returns>
        [HttpGet]
        [Route("api/ResearchDetails/GetByID/{id}")]
        public ResearchDetail GetByID(int id)
        {
            ResearchDetail data = null;

            using (var context = new SQLDBContext())
            {
                data = context.ResearchDetails.FirstOrDefault(x => x.ResearchDetailId == id);
            }

            return data;
        }

        /// <summary>
        /// Get ResearchDetails by ProjectId
        /// </summary>
        /// <param name="projectId">The ProjectId of the ResearchDetails to get</param>
        /// <returns>ResearchDetails data as JSON</returns>
        [HttpGet]
        [Route("api/ResearchDetails/GetByProjectID/{projectId}")]
        public ResearchDetail GetByProjectID(int projectId)
        {
            ResearchDetail data = null;

            using (var context = new SQLDBContext())
            {
                data = context.ResearchDetails.FirstOrDefault(x => x.ProjectId == projectId);
            }

            return data;
        }

        /// <summary>
        /// Add ResearchDetails
        /// </summary>
        /// <param name="researchDetails">The ResearchDetails to add</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/ResearchDetails/Add")]
        public bool Add([FromBody]ResearchDetail researchDetails)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                if (context.ResearchDetails.Count(x => x.ResearchDetailId == researchDetails.ResearchDetailId) == 0)
                {
                    //Add Region entry
                    context.ResearchDetails.Add(researchDetails);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Update ResearchDetails
        /// </summary>
        /// <param name="researchDetails">ResearchDetails to update</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/ResearchDetails/Update")]
        public bool Update([FromBody]ResearchDetail researchDetails)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.ResearchDetails.FirstOrDefault(x => x.ResearchDetailId == researchDetails.ResearchDetailId);
                if (data != null)
                {
                    data.Author = researchDetails.Author;
                    data.PaperLink = researchDetails.PaperLink;
                    data.ResearchTypeId = researchDetails.ResearchTypeId;
                    data.TargetAudienceId = researchDetails.TargetAudienceId;
                    data.ProjectId = researchDetails.ProjectId;
                    data.SectorId = researchDetails.SectorId;
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Delete ResearchDetails
        /// </summary>
        /// <param name="researchDetails">ResearchDetails to delete</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/ResearchDetails/Delete")]
        public bool Delete([FromBody]ResearchDetail researchDetails)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.ResearchDetails.FirstOrDefault(x => x.ResearchDetailId == researchDetails.ResearchDetailId);
                if (data != null)
                {
                    context.ResearchDetails.Remove(data);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Delete ResearchDetails by Id
        /// </summary>
        /// <param name="id">Id of ResearchDetails to delete</param>
        /// <returns>True/False</returns>
        [HttpGet]
        [Route("api/ResearchDetails/DeleteById/{id}")]
        public bool DeleteById(int id)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.ResearchDetails.FirstOrDefault(x => x.ResearchDetailId == id);
                if (data != null)
                {
                    context.ResearchDetails.Remove(data);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }
    }
}