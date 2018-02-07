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
    /// Manage MitigationDetails data
    /// </summary>
    public class MitigationDetailsController : ApiController
    {
        /// <summary>
        /// Get all MitigationDetails data
        /// </summary>
        /// <returns>MitigationDetails data as JSON</returns>
        [HttpGet]
        [Route("api/MitigationDetails/GetAll")]
        public IEnumerable<MitigationDetail> GetAll()
        {
            List<MitigationDetail> data = new List<MitigationDetail>();

            using (var context = new SQLDBContext())
            {
                data = context.MitigationDetails.ToList();
            }

            return data;
        }

        /// <summary>
        /// Get MitigationDetails by Id
        /// </summary>
        /// <param name="id">The Id of the MitigationDetails to get</param>
        /// <returns>MitigationDetails data as JSON</returns>
        [HttpGet]
        [Route("api/MitigationDetails/GetByID/{id}")]
        public MitigationDetail GetByID(int id)
        {
            MitigationDetail data = null;

            using (var context = new SQLDBContext())
            {
                data = context.MitigationDetails.FirstOrDefault(x => x.MitigationDetailId == id);
            }

            return data;
        }

        /// <summary>
        /// Get MitigationDetails by ProjectId
        /// </summary>
        /// <param name="projectId">The ProjectId of the MitigationDetails to get</param>
        /// <returns>MitigationDetails data as JSON</returns>
        [HttpGet]
        [Route("api/MitigationDetails/GetByProjectID/{projectId}")]
        public List<MitigationDetailsViewModel> GetByProjectID(int projectId)
        {
            List<MitigationDetailsViewModel> data = new List<MitigationDetailsViewModel>();

            using (var context = new SQLDBContext())
            {
                var mitigationDetails = context.MitigationDetails.Where(x => x.ProjectId == projectId).ToList();

                foreach (var model in mitigationDetails)
                {
                    var viewModel = new MitigationDetailsViewModel(model);

                    viewModel.CarbonCreditMarketName = context.CarbonCredit.FirstOrDefault(x => x.CarbonCreditId == viewModel.CarbonCreditId).Value;

                    if (viewModel.CarbonCreditMarketId != null)
                    {
                        viewModel.CarbonCreditMarketName = context.CarbonCreditMarket.FirstOrDefault(x => x.CarbonCreditMarketId == viewModel.CarbonCreditMarketId).Value;
                    }

                    if (viewModel.CDMStatusId != null)
                    {
                        viewModel.CDMStatusName = context.CDMStatus.FirstOrDefault(x => x.CDMStatusId == viewModel.CDMStatusId).Value;
                    }

                    if (viewModel.CDMMethodologyId != null)
                    {
                        viewModel.CDMMethodologyName = context.CDMMethodology.FirstOrDefault(x => x.CDMMethodologyId == viewModel.CDMMethodologyId).Value;
                    }

                    if (viewModel.VoluntaryMethodologyId != null)
                    {
                        viewModel.VoluntaryMethodologyName = context.VoluntaryMethodology.FirstOrDefault(x => x.VoluntaryMethodologyId == viewModel.VoluntaryMethodologyId).Value;
                    }

                    if (viewModel.VoluntaryGoldStandardId != null)
                    {
                        viewModel.VoluntaryGoldStandardName = context.VoluntaryGoldStandard.FirstOrDefault(x => x.VoluntaryGoldStandardId == viewModel.VoluntaryGoldStandardId).Value;
                    }

                    if (viewModel.SectorId != null)
                    {
                        viewModel.SectorName = context.Sector.FirstOrDefault(x => x.SectorId == viewModel.SectorId).Value;
                    }

                    data.Add(viewModel);
                }
            }

            return data;
        }

        /// <summary>
        /// Add MitigationDetails
        /// </summary>
        /// <param name="mitigationDetails">The MitigationDetails to add</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/MitigationDetails/Add")]
        public bool Add([FromBody]MitigationDetail mitigationDetails)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                if (context.MitigationDetails.Count(x => x.MitigationDetailId == mitigationDetails.MitigationDetailId) == 0)
                {
                    //Add MitigationDetails entry
                    context.MitigationDetails.Add(mitigationDetails);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Update MitigationDetails
        /// </summary>
        /// <param name="mitigationDetails">MitigationDetails to update</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/MitigationDetails/Update")]
        public bool Update([FromBody]MitigationDetail mitigationDetails)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.MitigationDetails.FirstOrDefault(x => x.MitigationDetailId == mitigationDetails.MitigationDetailId);
                if (data != null)
                {
                    data.VCS = mitigationDetails.VCS;
                    data.Other = mitigationDetails.Other;
                    data.OtherDescription = mitigationDetails.OtherDescription;
                    data.CDMProjectNumber = mitigationDetails.CDMProjectNumber;
                    data.CarbonCreditId = mitigationDetails.CarbonCreditId;
                    data.CarbonCreditMarketId = mitigationDetails.CarbonCreditMarketId;
                    data.CDMStatusId = mitigationDetails.CDMStatusId;
                    data.CDMMethodologyId = mitigationDetails.CDMMethodologyId;
                    data.VoluntaryMethodologyId = mitigationDetails.VoluntaryMethodologyId;
                    data.VoluntaryGoldStandardId = mitigationDetails.VoluntaryGoldStandardId;
                    data.ProjectId = mitigationDetails.ProjectId;
                    data.SectorId = mitigationDetails.SectorId;
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Delete MitigationDetails
        /// </summary>
        /// <param name="mitigationDetails">MitigationDetails to delete</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/MitigationDetails/Delete")]
        public bool Delete([FromBody]MitigationDetail mitigationDetails)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.MitigationDetails.FirstOrDefault(x => x.MitigationDetailId == mitigationDetails.MitigationDetailId);
                if (data != null)
                {
                    context.MitigationDetails.Remove(data);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Delete MitigationDetails by Id
        /// </summary>
        /// <param name="id">Id of MitigationDetails to delete</param>
        /// <returns>True/False</returns>
        [HttpGet]
        [Route("api/MitigationDetails/DeleteById/{id}")]
        public bool DeleteById(int id)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.MitigationDetails.FirstOrDefault(x => x.MitigationDetailId == id);
                if (data != null)
                {
                    context.MitigationDetails.Remove(data);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }
    }
}