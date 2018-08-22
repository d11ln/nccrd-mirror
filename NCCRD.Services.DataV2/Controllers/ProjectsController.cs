using Microsoft.AspNet.OData;
using Microsoft.AspNet.OData.Routing;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NCCRD.Services.DataV2.Database.Contexts;
using NCCRD.Services.DataV2.Database.Models;
using NCCRD.Services.DataV2.Extensions;
using System;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace NCCRD.Services.DataV2.Controllers
{
    [Produces("application/json")]
    [ODataRoutePrefix("Projects")]
    [EnableCors("CORSPolicy")]
    public class ProjectsController : ODataController
    {
        public SQLDBContext _context { get; }
        public ProjectsController(SQLDBContext context)
        {
            _context = context;
        }

        [EnableQuery]
        public IQueryable<Project> Get()
        {
            return _context.Project.AsQueryable();
        }

        [EnableQuery]
        [ODataRoute("({id})")]
        public Project Get(int id)
        {
            return _context.Project.FirstOrDefault(x => x.ProjectId == id);
        }

        //Add/Update
        [EnableQuery]
        public async Task<IActionResult> Post([FromBody]Project update)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            //Check that ProjectTitle is unique
            if (_context.Project.AsNoTracking().FirstOrDefault(x => x.ProjectTitle == update.ProjectTitle) != null)
            {
                return BadRequest("ProjectTitle already exists");
            }

            var exiting = _context.Project.FirstOrDefault(x => x.ProjectId == update.ProjectId);
            if (exiting == null)
            {
                //ADD
                HelperExtensions.ClearIdentityValue(ref update);
                HelperExtensions.ClearNullableInts(ref update);
                _context.Project.Add(update);
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
