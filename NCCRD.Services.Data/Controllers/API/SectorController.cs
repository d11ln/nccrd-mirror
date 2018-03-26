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
    /// Manage Sector data
    /// </summary>
    public class SectorController : ApiController
    {
        /// <summary>
        /// Get all Sector data
        /// </summary>
        /// <returns>Sector data as JSON</returns>
        [HttpGet]
        [Route("api/Sector/GetAll")]
        public IEnumerable<Sector> GetAll()
        {
            List<Sector> data = new List<Sector>();

            using (var context = new SQLDBContext())
            {
                data = context.Sector.OrderBy(x => x.Value).ToList();
            }

            return data;
        }

        /// <summary>
        /// Get all Sector data as Tree-data
        /// </summary>
        /// <returns>Sector-tree-data as JSON</returns>
        [HttpGet]
        [Route("api/Sector/GetAllTree")]
        public TreeViewModel GetAllTree()
        {
            var data = new TreeViewModel();

            using (var context = new SQLDBContext())
            {
                var hostSectors = context.Sector.Where(x => x.SectorType.Name == "HostSector").OrderBy(p => p.Value).ToList();

                foreach (var hostSec in hostSectors)
                {
                    var hostSecNode = new TreeNodeViewModel();
                    hostSecNode.id = hostSec.SectorId;
                    hostSecNode.text = hostSec.Value;

                    var mainSectors = context.Sector.Where(x => x.ParentSectorID == hostSec.SectorId).OrderBy(m => m.Value).ToList();
                    foreach (var mainSec in mainSectors)
                    {
                        var mainSecNode = new TreeNodeViewModel();
                        mainSecNode.id = mainSec.SectorId;
                        mainSecNode.text = mainSec.Value;

                        var subSectors = context.Sector.Where(x => x.ParentSectorID == mainSec.SectorId).OrderBy(l => l.Value).ToList();
                        foreach (var subSec in subSectors)
                        {
                            var sunSecNode = new TreeNodeViewModel();
                            sunSecNode.id = subSec.SectorId;
                            sunSecNode.text = subSec.Value;

                            if (mainSecNode.children == null)
                            {
                                mainSecNode.children = new List<TreeNodeViewModel>();
                            }
                            mainSecNode.children.Add(sunSecNode);
                        }

                        if (hostSecNode.children == null)
                        {
                            hostSecNode.children = new List<TreeNodeViewModel>();
                        }
                        hostSecNode.children.Add(mainSecNode);
                    }

                    data.dataSource.Add(hostSecNode);
                }
            }

            return data;
        }

        /// <summary>
        /// Add/Update Sector
        /// </summary>
        /// <param name="sector">Sector to update</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/Sector/AddOrUpdate")]
        public bool AddOrUpdate([FromBody]Sector sector)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.Sector.FirstOrDefault(x => x.SectorId == sector.SectorId);
                if (data != null)
                {
                    //Update Sector entry
                    data.Value = sector.Value;
                    data.SectorTypeId = sector.SectorTypeId;
                    data.ParentSectorID = sector.ParentSectorID;
                    data.TypologyId = sector.TypologyId;
                    context.SaveChanges();

                    result = true;
                }
                else
                {
                    //Add Sector entry
                    context.Sector.Add(sector);
                }
            }

            return result;
        }

        /// <summary>
        /// Delete Sector by Id
        /// </summary>
        /// <param name="id">Id of Sector to delete</param>
        /// <returns>True/False</returns>
        [HttpGet]
        [Route("api/Sector/DeleteById/{id}")]
        public bool DeleteById(int id)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.Sector.FirstOrDefault(x => x.SectorId == id);
                if (data != null)
                {
                    context.Sector.Remove(data);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }
    }
}