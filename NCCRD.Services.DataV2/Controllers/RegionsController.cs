using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.OData;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using NCCRD.Services.DataV2.DBContexts;
using NCCRD.Services.DataV2.DBModels;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace NCCRD.Services.DataV2.Controllers
{
    [EnableCors("CORSPolicy")]
    public class RegionsController : ODataController
    {
        public SQLDBContext _context { get; }
        public RegionsController(SQLDBContext context)
        {
            _context = context;
        }

        [EnableQuery]
        public IQueryable<Region> Get()
        {
            return _context.Region.AsQueryable();
        }
    }
}
