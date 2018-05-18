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
                data = context.Sector
                    .OrderBy(x => x.Value.Trim())
                    .ToList();
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

                    var mainSectors = context.Sector.Where(x => x.ParentSectorId == hostSec.SectorId).OrderBy(m => m.Value).ToList();
                    foreach (var mainSec in mainSectors)
                    {
                        var mainSecNode = new TreeNodeViewModel();
                        mainSecNode.id = mainSec.SectorId;
                        mainSecNode.text = mainSec.Value;

                        var subSectors = context.Sector.Where(x => x.ParentSectorId == mainSec.SectorId).OrderBy(l => l.Value).ToList();
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
        /// <param name="items">List to add/update</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/Sector/AddOrUpdate")]
        [Authorize]
        public bool AddOrUpdate([FromBody]List<Sector> items)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                foreach (var item in items)
                {
                    //Check if exists
                    var data = context.Sector
                        .Include("SectorType")
                        .Include("Typology")
                        .FirstOrDefault(x => x.SectorId == item.SectorId);

                    if (data != null)
                    {
                        //Update Sector entry
                        data.Value = item.Value;
                        data.SectorTypeId = item.SectorTypeId;
                        data.SectorType = context.SectorType.FirstOrDefault(x => x.SectorTypeId == item.SectorTypeId);
                        data.ParentSectorId = item.ParentSectorId;
                        data.ParentSector = context.Sector.FirstOrDefault(x => x.SectorId == item.ParentSectorId);
                        data.TypologyId = item.TypologyId;
                        data.Typology = context.Typology.FirstOrDefault(x => x.TypologyId == item.TypologyId);
                    }
                    else
                    {
                        item.SectorType = context.SectorType.FirstOrDefault(x => x.SectorTypeId == item.SectorTypeId);
                        item.ParentSector = context.Sector.FirstOrDefault(x => x.SectorId == item.ParentSectorId);
                        item.Typology = context.Typology.FirstOrDefault(x => x.TypologyId == item.TypologyId);

                        //Add Sector entry
                        context.Sector.Add(item);
                    }

                    context.SaveChanges();
                    result = true;
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
        [Authorize]
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