using NCCRD.Database.Models;
using NCCRD.Database.Models.Contexts;
using NCCRD.Services.Data.Classes;
using NCCRD.Services.Data.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace NCCRD.Services.Data.Controllers.API
{
    /// <summary>
    /// Manage AdaptationDetails data
    /// </summary>
    public class AdaptationDetailsController : ApiController
    {
        /// <summary>
        /// Get all AdaptationDetails
        /// </summary>
        /// <returns>AdaptationDetails data as JSON</returns>
        [HttpGet]
        [Route("api/AdaptationDetails/GetAll")]
        public IEnumerable<AdaptationDetail> GetAll()
        {
            List<AdaptationDetail> adaptationDetailsList = new List<AdaptationDetail>();

            using (var context = new SQLDBContext())
            {
                adaptationDetailsList = context.AdaptationDetails.ToList();
            }

            return adaptationDetailsList;
        }

        /// <summary>
        /// Get AdaptationDetail by Id
        /// </summary>
        /// <param name="id">The Id of the AdaptationDetail to get</param>
        /// <returns>AdaptationDetail data as JSON</returns>
        [HttpGet]
        [Route("api/AdaptationDetails/GetByID/{id}")]
        public AdaptationDetail GetByID(int id)
        {
            AdaptationDetail adaptationDetail = null;

            using (var context = new SQLDBContext())
            {
                adaptationDetail = context.AdaptationDetails.FirstOrDefault(x => x.AdaptationDetailId == id);
            }

            return adaptationDetail;
        }

        /// <summary>
        /// Get AdaptationDetail by Description
        /// </summary>
        /// <param name="descr">The Id of the AdaptationDetail to get</param>
        /// <returns>AdaptationDetail data as JSON</returns>
        [HttpGet]
        [Route("api/AdaptationDetails/GetByID/{descr}")]
        public AdaptationDetail GetByDescription(string descr)
        {
            AdaptationDetail adaptationDetail = null;

            using (var context = new SQLDBContext())
            {
                adaptationDetail = context.AdaptationDetails.FirstOrDefault(x => x.Description == descr);
            }

            return adaptationDetail;
        }

        /// <summary>
        /// Get AdaptationDetail by ProjectId
        /// </summary>
        /// <param name="projectId">The ProjectId of the AdaptationDetail to get</param>
        /// <returns>AdaptationDetail data as JSON</returns>
        [HttpGet]
        [Route("api/AdaptationDetails/GetByProjectId/{projectId}")]
        public List<AdaptationDetail> GetByProjectId(int projectId)
        {
            List<AdaptationDetail> adaptationDetail = new List<AdaptationDetail>();

            using (var context = new SQLDBContext())
            {
                adaptationDetail = context.AdaptationDetails.Where(x => x.ProjectId == projectId).ToList();
            }

            return adaptationDetail;
        }

        /// <summary>
        /// Get AdaptationDetail by SectorId
        /// </summary>
        /// <param name="sectorId">The SectorId of the AdaptationDetail to get</param>
        /// <returns>AdaptationDetail data as JSON</returns>
        [HttpGet]
        [Route("api/AdaptationDetails/GetBySectorId/{sectorId}")]
        public AdaptationDetail GetBySectorId(int sectorId)
        {
            AdaptationDetail adaptationDetail = null;

            using (var context = new SQLDBContext())
            {
                adaptationDetail = context.AdaptationDetails.FirstOrDefault(x => x.SectorId == sectorId);
            }

            return adaptationDetail;
        }

        /// <summary>
        /// Add AdaptationDetail
        /// </summary>
        /// <param name="adaptationDetail">The AdaptationDetail to add</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/AdaptationDetails/AddOrUpdate")]
        public bool AddOrUpdate([FromBody]AdaptationDetail adaptationDetail)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                adaptationDetail.AdaptationPurpose = context.AdaptationPurpose.FirstOrDefault(x => x.AdaptationPurposeId == adaptationDetail.AdaptationPurposeId);
                adaptationDetail.Project = context.Project.FirstOrDefault(x => x.ProjectId == adaptationDetail.ProjectId);

                adaptationDetail.Sector = context.Sector.FirstOrDefault(x => x.SectorId == adaptationDetail.SectorId);
                if (adaptationDetail.SectorId == 0) adaptationDetail.SectorId = null;

                var existAD = context.AdaptationDetails.FirstOrDefault(x => x.AdaptationDetailId == adaptationDetail.AdaptationDetailId);
                if (existAD == null)
                {
                    //Add AdaptationDetails entry
                    context.AdaptationDetails.Add(adaptationDetail);
                }
                else
                {
                    //Update existing AdaptationDetails entry
                    existAD.Description = adaptationDetail.Description;
                    existAD.AdaptationPurposeId = adaptationDetail.AdaptationPurposeId;
                    existAD.AdaptationPurpose = adaptationDetail.AdaptationPurpose;
                    existAD.ProjectId = adaptationDetail.ProjectId;
                    existAD.Project = adaptationDetail.Project;
                    existAD.SectorId = adaptationDetail.SectorId;
                    existAD.Sector = adaptationDetail.Sector;
                }

                try
                {
                    context.SaveChanges();
                    result = true;
                }
                catch (DbEntityValidationException e)
                {
                    throw new Exception(Utils.ParseDbEntityValidationException(e));
                }
            }

            return result;
        }
    }
}