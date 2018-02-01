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
    /// Manage MitigationEmissions data
    /// </summary>
    public class MitigationEmissionsDataController : ApiController
    {
        /// <summary>
        /// Get all MitigationEmissionsData data
        /// </summary>
        /// <returns>MitigationEmissionsData data as JSON</returns>
        [HttpGet]
        [Route("api/MitigationEmissionsData/GetAll")]
        public IEnumerable<MitigationEmissionsData> GetAll()
        {
            List<MitigationEmissionsData> data = new List<MitigationEmissionsData>();

            using (var context = new SQLDBContext())
            {
                data = context.MitigationEmissionsData.ToList();
            }

            return data;
        }

        /// <summary>
        /// Get MitigationEmissionsData by Id
        /// </summary>
        /// <param name="id">The Id of the MitigationEmissionsData to get</param>
        /// <returns>MitigationEmissionsData data as JSON</returns>
        [HttpGet]
        [Route("api/MitigationEmissionsData/GetByID/{id}")]
        public MitigationEmissionsData GetByID(int id)
        {
            MitigationEmissionsData data = null;

            using (var context = new SQLDBContext())
            {
                data = context.MitigationEmissionsData.FirstOrDefault(x => x.MitigationEmissionsDataId == id);
            }

            return data;
        }

        /// <summary>
        /// Get MitigationEmissionsData by ProjectId
        /// </summary>
        /// <param name="projectId">The ProjectId of the MitigationEmissionsData to get</param>
        /// <returns>MitigationEmissionsData data as JSON</returns>
        [HttpGet]
        [Route("api/MitigationEmissionsData/GetByProjectID/{projectId}")]
        public MitigationEmissionsData GetByProjectID(int projectId)
        {
            MitigationEmissionsData data = null;

            using (var context = new SQLDBContext())
            {
                data = context.MitigationEmissionsData.FirstOrDefault(x => x.ProjectId == projectId);
            }

            return data;
        }

        /// <summary>
        /// Add MitigationEmissionsData
        /// </summary>
        /// <param name="mitigationEmissionsData">The MitigationEmissionsData to add</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/MitigationEmissionsData/Add")]
        public bool Add([FromBody]MitigationEmissionsData mitigationEmissionsData)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                if (context.MitigationEmissionsData.Count(x => x.MitigationEmissionsDataId == mitigationEmissionsData.MitigationEmissionsDataId) == 0)
                {
                    //Add MitigationEmissionsData entry
                    context.MitigationEmissionsData.Add(mitigationEmissionsData);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Update MitigationEmissionsData
        /// </summary>
        /// <param name="mitigationEmissionsData">MitigationEmissionsData to update</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/MitigationEmissionsData/Update")]
        public bool Update([FromBody]MitigationEmissionsData mitigationEmissionsData)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.MitigationEmissionsData.FirstOrDefault(x => x.MitigationEmissionsDataId == mitigationEmissionsData.MitigationEmissionsDataId);
                if (data != null)
                {
                    data.Year = mitigationEmissionsData.Year;
                    data.CO2 = mitigationEmissionsData.CO2;
                    data.CH4 = mitigationEmissionsData.CH4;
                    data.CH4_CO2e = mitigationEmissionsData.CH4_CO2e;
                    data.N2O = mitigationEmissionsData.N2O;
                    data.N2O_CO2e = mitigationEmissionsData.N2O_CO2e;
                    data.HFC = mitigationEmissionsData.HFC;
                    data.HFC_CO2e = mitigationEmissionsData.HFC_CO2e;
                    data.PFC = mitigationEmissionsData.PFC;
                    data.PFC_CO2e = mitigationEmissionsData.PFC_CO2e;
                    data.SF6 = mitigationEmissionsData.SF6;
                    data.SF6_CO2e = mitigationEmissionsData.SF6_CO2e;
                    data.Hydro = mitigationEmissionsData.Hydro;
                    data.Hydro_CO2e = mitigationEmissionsData.Hydro_CO2e;
                    data.Tidal = mitigationEmissionsData.Tidal;
                    data.Tidal_CO2e = mitigationEmissionsData.Tidal_CO2e;
                    data.Wind = mitigationEmissionsData.Wind;
                    data.Wind_CO2e = mitigationEmissionsData.Wind_CO2e;
                    data.Solar = mitigationEmissionsData.Solar;
                    data.Solar_CO2e = mitigationEmissionsData.Solar_CO2e;
                    data.FossilFuelElecRed = mitigationEmissionsData.FossilFuelElecRed;
                    data.FossilFuelElecRed_CO2e = mitigationEmissionsData.FossilFuelElecRed_CO2e;
                    data.BioWaste = mitigationEmissionsData.BioWaste;
                    data.BioWaste_CO2e = mitigationEmissionsData.BioWaste_CO2e;
                    data.Geothermal = mitigationEmissionsData.Geothermal;
                    data.Geothermal_CO2e = mitigationEmissionsData.Geothermal_CO2e;
                    data.ProjectId = mitigationEmissionsData.ProjectId;
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Delete MitigationEmissionsData
        /// </summary>
        /// <param name="mitigationEmissionsData">MitigationEmissionsData to delete</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/MitigationEmissionsData/Delete")]
        public bool Delete([FromBody]MitigationEmissionsData mitigationEmissionsData)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.MitigationEmissionsData.FirstOrDefault(x => x.MitigationEmissionsDataId == mitigationEmissionsData.MitigationEmissionsDataId);
                if (data != null)
                {
                    context.MitigationEmissionsData.Remove(data);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Delete MitigationEmissionsData by Id
        /// </summary>
        /// <param name="id">Id of MitigationEmissionsData to delete</param>
        /// <returns>True/False</returns>
        [HttpGet]
        [Route("api/MitigationEmissionsData/DeleteById/{id}")]
        public bool DeleteById(int id)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.MitigationEmissionsData.FirstOrDefault(x => x.MitigationEmissionsDataId == id);
                if (data != null)
                {
                    context.MitigationEmissionsData.Remove(data);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }
    }
}