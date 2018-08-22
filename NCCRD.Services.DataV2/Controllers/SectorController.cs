using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.OData;
using Microsoft.AspNet.OData.Routing;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using NCCRD.Services.DataV2.DBContexts;
using NCCRD.Services.DataV2.DBModels;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace NCCRD.Services.DataV2.Controllers
{
    [Produces("application/json")]
    [ODataRoutePrefix("Sector")]
    [EnableCors("CORSPolicy")]
    public class SectorController : ODataController
    {
        public SQLDBContext _context { get; }
        public SectorController(SQLDBContext context)
        {
            _context = context;
        }

        [EnableQuery]
        public IQueryable<Sector> Get()
        {
            return _context.Sector.AsQueryable();
        }
    }
}
