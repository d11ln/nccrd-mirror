using Microsoft.AspNet.OData;
using Microsoft.AspNet.OData.Routing;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NCCRD.Services.DataV2.Database.Contexts;
using NCCRD.Services.DataV2.Database.Models;
using NCCRD.Services.DataV2.Extensions;
using NCCRD.Services.DataV2.ViewModels;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
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

        [HttpGet]
        [EnableQuery]
        public IQueryable<Project> Get()
        {
            return _context.Project.AsQueryable();
        }

        [HttpGet]
        [EnableQuery]
        [ODataRoute("({id})")]
        public Project Get(int id)
        {
            return _context.Project.FirstOrDefault(x => x.ProjectId == id);
        }

        /*
        Filter query: http://localhost:62553/odata/Projects/Extensions.ByPolygon?$expand=ProjectLocations($expand=Location($select=LatCalculated,LonCalculated))&$select=ProjectId,ProjectTitle,ProjectDescription
        Get polygons here: http://196.21.191.55:8091/geoserver/SARVA/wms?service=WMS&version=1.1.0&request=GetMap&layers=SARVA:local_mn&styles=&bbox=16.3694229125977,-34.8977165222168,33.0274543762207,-22.0614833831787&width=768&height=591&srs=EPSG:4326&format=application/openlayers
        */
        [HttpPost]
        [EnableQuery]
        public IQueryable<Project> ByPolygon([FromBody] Polygon polyObj)
        {
            var projectIDs = GetByPolygon(polyObj.polygon);
            return _context.Project
                .Where(x => projectIDs.Contains(x.ProjectId))
                .AsQueryable();
        }

        //##################//
        // Helper Functions //
        //##################//

        private List<int> GetByPolygon(string polygon)
        {
            //Check if polygon param is URL for download
            Uri uriResult;
            bool isPolyUrl = Uri.TryCreate(polygon, UriKind.Absolute, out uriResult)
                && (uriResult.Scheme == Uri.UriSchemeHttp || uriResult.Scheme == Uri.UriSchemeHttps);

            if (isPolyUrl)
            {
                //Get actual polygon string from URL
                polygon = GetPolygonFromUrl(polygon);
            }

            var polygonWKT = new SqlParameter("@WKT", polygon);
            return _context.Project
                .FromSql("EXECUTE PolygonFilter @WKT", polygonWKT)
                .Select(x => x.ProjectId)
                .ToList();
        }

        private string GetPolygonFromUrl(string url)
        {
            string polygon = url;

            //Get polygon from URL
            if (!string.IsNullOrEmpty(url))
            {
                using (WebClient client = new WebClient())
                {
                    polygon = client.DownloadString(url);
                }
            }

            return polygon;
        }
    }
}
