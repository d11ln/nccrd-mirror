using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.OData;
using Microsoft.AspNet.OData.Routing;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NCCRD.Services.DataV2.Database.Contexts;
using NCCRD.Services.DataV2.Database.Models;

namespace NCCRD.Services.DataV2.Controllers
{
    [Produces("application/json")]
    [ODataRoutePrefix("SectorType")]
    [EnableCors("CORSPolicy")]
    public class SectorTypeController : ODataController
    {
        public SQLDBContext _context { get; }
        public SectorTypeController(SQLDBContext context)
        {
            _context = context;
        }

        [EnableQuery]
        public IQueryable<SectorType> Get()
        {
            return _context.SectorType.AsQueryable();
        }
    }
}