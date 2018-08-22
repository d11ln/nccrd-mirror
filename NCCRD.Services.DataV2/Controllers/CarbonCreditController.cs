using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.OData;
using Microsoft.AspNet.OData.Routing;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NCCRD.Services.DataV2.DBContexts;
using NCCRD.Services.DataV2.DBModels;

namespace NCCRD.Services.DataV2.Controllers
{
    [Produces("application/json")]
    [ODataRoutePrefix("CarbonCredit")]
    [EnableCors("CORSPolicy")]
    public class CarbonCreditController : ODataController
    {
        public SQLDBContext _context { get; }
        public CarbonCreditController(SQLDBContext context)
        {
            _context = context;
        }

        [EnableQuery]
        public IQueryable<CarbonCredit> Get()
        {
            return _context.CarbonCredit.AsQueryable();
        }
    }
}