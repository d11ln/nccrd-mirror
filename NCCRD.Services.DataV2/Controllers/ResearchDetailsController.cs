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
using NCCRD.Services.DataV2.Extensions;

namespace NCCRD.Services.DataV2.Controllers
{
    [Produces("application/json")]
    [ODataRoutePrefix("ResearchDetails")]
    [EnableCors("CORSPolicy")]
    public class ResearchDetailsController : ODataController
    {
        public SQLDBContext _context { get; }
        public ResearchDetailsController(SQLDBContext context)
        {
            _context = context;
        }

        [EnableQuery]
        public IQueryable<ResearchDetail> Get()
        {
            return _context.ResearchDetails.AsQueryable();
        }

        //Add/Update
        [EnableQuery]
        public async Task<IActionResult> Post([FromBody]ResearchDetail update)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var exiting = _context.ResearchDetails.FirstOrDefault(x => x.ResearchDetailId == update.ResearchDetailId);
            if (exiting == null)
            {
                //ADD
                HelperExtensions.ClearIdentityValue(ref update);
                HelperExtensions.ClearNullableInts(ref update);
                _context.ResearchDetails.Add(update);
                await _context.SaveChangesAsync();
                return Created(update);
            }
            else
            {
                //UPDATE
                _context.Entry(exiting).CurrentValues.SetValues(update);
                await _context.SaveChangesAsync();
                return Updated(exiting);
            }
        }
    }
}