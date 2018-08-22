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
    [ODataRoutePrefix("MitigationEmissions")]
    [EnableCors("CORSPolicy")]
    public class MitigationEmissionsDataController : ODataController
    {
        public SQLDBContext _context { get; }
        public MitigationEmissionsDataController(SQLDBContext context)
        {
            _context = context;
        }

        [EnableQuery]
        public IQueryable<MitigationEmissionsData> Get()
        {
            return _context.MitigationEmissionsData.AsQueryable();
        }

        //Add/Update
        [EnableQuery]
        public async Task<IActionResult> Post([FromBody]MitigationEmissionsData update)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var exiting = _context.MitigationEmissionsData.
                FirstOrDefault(x => x.MitigationEmissionsDataId == update.MitigationEmissionsDataId);
            if (exiting == null)
            {
                //ADD
                HelperExtensions.ClearIdentityValue(ref update);
                HelperExtensions.ClearNullableInts(ref update);
                _context.MitigationEmissionsData.Add(update);
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