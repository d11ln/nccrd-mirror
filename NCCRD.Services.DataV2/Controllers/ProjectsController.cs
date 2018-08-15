using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.OData;
using Microsoft.AspNet.OData.Routing;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NCCRD.Services.DataV2.DBContexts;
using NCCRD.Services.DataV2.DBModels;
using NCCRD.Services.DataV2.ViewModels;

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
        public async Task<IActionResult> Post(Project project)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (_context.Project.FirstOrDefault(x => x.ProjectId == project.ProjectId) == null)
            {
                _context.Project.Add(project);
                await _context.SaveChangesAsync();
                return Created(project);
            }
            else
            {
                _context.Entry(project).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                return Updated(project);
            }
        }
    }
}
