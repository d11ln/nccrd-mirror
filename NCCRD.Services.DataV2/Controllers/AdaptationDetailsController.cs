using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.OData;
using Microsoft.AspNet.OData.Routing;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NCCRD.Services.DataV2.Database.Contexts;
using NCCRD.Services.DataV2.Database.Models;
using NCCRD.Services.DataV2.Extensions;

namespace NCCRD.Services.DataV2.Controllers
{
    [Produces("application/json")]
    [ODataRoutePrefix("AdaptationDetails")]
    [EnableCors("CORSPolicy")]
    public class AdaptationDetailsController : ODataController
    {
        public SQLDBContext _context { get; }
        public AdaptationDetailsController(SQLDBContext context)
        {
            _context = context;
        }

        [EnableQuery]
        public IQueryable<AdaptationDetail> Get()
        {
            return _context.AdaptationDetails.AsQueryable();
        }

        //Add/Update
        [EnableQuery]
        public async Task<IActionResult> Post([FromBody]AdaptationDetail update)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var exiting = _context.AdaptationDetails.FirstOrDefault(x => x.AdaptationDetailId == update.AdaptationDetailId);
            if (exiting == null)
            {
                //ADD
                HelperExtensions.ClearIdentityValue(ref update);
                HelperExtensions.ClearNullableInts(ref update);
                _context.AdaptationDetails.Add(update);
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