using NCCRD.Database.Models;
using NCCRD.Database.Models.Contexts;
using NCCRD.Services.Data.Models;
using System;
using System.Collections.Generic;
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
        public List<AdaptationDetailsViewModel> GetByProjectId(int projectId)
        {
            List<AdaptationDetailsViewModel> adaptationDetailVM = new List<AdaptationDetailsViewModel>();

            using (var context = new SQLDBContext())
            {
                var adaptationDetail = context.AdaptationDetails.Where(x => x.ProjectId == projectId).ToList();

                foreach (var model in adaptationDetail)
                {
                    var vm = new AdaptationDetailsViewModel(model);

                    vm.AdaptationPurposeName = context.AdaptationPurpose.FirstOrDefault(x => x.AdaptationPurposeId == model.AdaptationPurposeId).Value;

                    if (model.SectorId != null)
                    {
                        vm.SectorName = context.Sector.FirstOrDefault(x => x.SectorId == model.SectorId).Value;
                    }

                    adaptationDetailVM.Add(vm);
                }
            }

            return adaptationDetailVM;
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
        [Route("api/AdaptationDetails/Add")]
        public bool Add([FromBody]AdaptationDetail adaptationDetail)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                if(context.AdaptationDetails.Count(x => x.AdaptationDetailId == adaptationDetail.AdaptationDetailId) == 0)
                {
                    //Add AdaptationDetails entry
                    context.AdaptationDetails.Add(adaptationDetail);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Update AdaptationDetail
        /// </summary>
        /// <param name="adaptationDetail">AdaptationDetail to update</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/AdaptationDetails/Update")]
        public bool Update([FromBody]AdaptationDetail adaptationDetail)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var existAD = context.AdaptationDetails.FirstOrDefault(x => x.AdaptationDetailId == adaptationDetail.AdaptationDetailId);
                if (existAD != null)
                {
                    existAD.Description = adaptationDetail.Description;
                    existAD.AdaptationPurposeId = adaptationDetail.AdaptationPurposeId;
                    existAD.ProjectId = adaptationDetail.ProjectId;
                    existAD.SectorId = adaptationDetail.SectorId;
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Delete AdaptationDetail
        /// </summary>
        /// <param name="adaptationDetail">AdaptationDetail to delete</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/AdaptationDetails/Delete")]
        public bool Delete([FromBody]AdaptationDetail adaptationDetail)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var existAD = context.AdaptationDetails.FirstOrDefault(x => x.AdaptationDetailId == adaptationDetail.AdaptationDetailId);
                if (existAD != null)
                {
                    context.AdaptationDetails.Remove(existAD);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Delete AdaptationDetail by Id
        /// </summary>
        /// <param name="id">Id of AdaptationDetail to delete</param>
        /// <returns>True/False</returns>
        [HttpGet]
        [Route("api/AdaptationDetails/DeleteById/{id}")]
        public bool DeleteById(int id)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var existAD = context.AdaptationDetails.FirstOrDefault(x => x.AdaptationDetailId == id);
                if (existAD != null)
                {
                    context.AdaptationDetails.Remove(existAD);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }
    }
}