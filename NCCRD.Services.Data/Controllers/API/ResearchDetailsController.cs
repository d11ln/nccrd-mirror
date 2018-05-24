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
        public List<ResearchDetailsViewModel> GetByProjectID(int projectId)
        {
            List<ResearchDetailsViewModel> dataVM = new List<ResearchDetailsViewModel>();

            using (var context = new SQLDBContext())
            {
                var data = context.ResearchDetails.Where(x => x.ProjectId == projectId).ToList();

                foreach(var model in data)
                {
                    var vm = new ResearchDetailsViewModel(model);

                    vm.ResearchTypeName = context.ResearchType.FirstOrDefault(x => x.ResearchTypeId == model.ResearchTypeId).Value;
                    vm.TargetAudienceName = context.TargetAudience.FirstOrDefault(x => x.TargetAudienceId == model.TargetAudienceId).Value;

                    if (model.SectorId != null)
                    {
                        vm.SectorName = context.Sector.FirstOrDefault(x => x.SectorId == model.SectorId).Value;
                    }

                    vm.PaperLink = vm.PaperLink.Trim();
                    if(vm.PaperLink.StartsWith("www"))
                    {
                        vm.PaperLink = "http://" + vm.PaperLink;
                    }

                    dataVM.Add(vm);
                }
            }

            return dataVM;
        }

        /// <summary>
        /// Add ResearchDetails
        /// </summary>
        /// <param name="researchDetails">The ResearchDetails to add</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/ResearchDetails/AddOrUpdate")]
        [Authorize]
        public bool AddOrUpdate([FromBody]ResearchDetail researchDetails)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                researchDetails.Project = context.Project.FirstOrDefault(x => x.ProjectId == researchDetails.ProjectId);
                researchDetails.ResearchType = context.ResearchType.FirstOrDefault(x => x.ResearchTypeId == researchDetails.ResearchTypeId);
                researchDetails.TargetAudience = context.TargetAudience.FirstOrDefault(x => x.TargetAudienceId == researchDetails.TargetAudienceId);

                researchDetails.Sector = context.Sector.FirstOrDefault(x => x.SectorId == researchDetails.SectorId);
                if (researchDetails.SectorId == 0) researchDetails.SectorId = null;

                var data = context.ResearchDetails.FirstOrDefault(x => x.ResearchDetailId == researchDetails.ResearchDetailId);
                if (data == null)
                {
                    //Add Research details entry
                    context.ResearchDetails.Add(researchDetails);
                }
                else
                {
                    //Update existing Research details entry
                    data.Author = researchDetails.Author;
                    data.PaperLink = researchDetails.PaperLink;
                    data.ResearchTypeId = researchDetails.ResearchTypeId;
                    data.ResearchType = researchDetails.ResearchType;
                    data.TargetAudienceId = researchDetails.TargetAudienceId;
                    data.TargetAudience = researchDetails.TargetAudience;
                    data.ProjectId = researchDetails.ProjectId;
                    data.Project = researchDetails.Project;
                    data.SectorId = researchDetails.SectorId;
                    data.Sector = researchDetails.Sector;
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