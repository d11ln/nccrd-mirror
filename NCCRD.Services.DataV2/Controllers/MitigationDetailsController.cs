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
    [ODataRoutePrefix("MitigationDetails")]
    [EnableCors("CORSPolicy")]
    public class MitigationDetailsController : ODataController
    {
        public SQLDBContext _context { get; }
        public MitigationDetailsController(SQLDBContext context)
        {
            _context = context;
        }

        [EnableQuery]
        public IQueryable<MitigationDetail> Get()
        {
            return _context.MitigationDetails.AsQueryable();
        }

        //Add/Update
        [EnableQuery]
        public async Task<IActionResult> Post([FromBody]MitigationDetail update)
        {
            //Check model state
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            //Check for existing entity
            var exiting = _context.MitigationDetails.FirstOrDefault(x => x.MitigationDetailId == update.MitigationDetailId);
            if (exiting == null)
            {
                //Add
                HelperExtensions.ClearIdentityValue(ref update);
                HelperExtensions.ClearNullableInts(ref update);
                _context.MitigationDetails.Add(update);
                await _context.SaveChangesAsync();
                return Created(update);
            }
            else
            {
                //Update
                _context.Entry(exiting).CurrentValues.SetValues(update);
                await _context.SaveChangesAsync();

                return Updated(exiting);
            }
        }
    }
}