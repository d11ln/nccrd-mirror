using NCCRD.Database.Models;
using NCCRD.Database.Models.Contexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace NCCRD.Services.Data.Controllers
{
    /// <summary>
    /// Manage SitePages data
    /// </summary>
    public class SitePagesController : ApiController
    {
        /// <summary>
        /// Get all SitePage data
        /// </summary>
        /// <returns>SitePage data as JSON</returns>
        [HttpGet]
        [Route("api/SitePages/GetAll")]
        public IEnumerable<SitePage> GetAll()
        {
            List<SitePage> data = new List<SitePage>();

            using (var context = new SQLDBContext())
            {
                data = context.SitePages.ToList();
            }

            return data;
        }

        /// <summary>
        /// Get SitePage by Id
        /// </summary>
        /// <param name="id">The Id of the SitePage to get</param>
        /// <returns>SitePage data as JSON</returns>
        [HttpGet]
        [Route("api/SitePages/GetByID/{id}")]
        public SitePage GetByID(int id)
        {
            SitePage data = null;

            using (var context = new SQLDBContext())
            {
                data = context.SitePages.FirstOrDefault(x => x.SitePageId == id);
            }

            return data;
        }

        /// <summary>
        /// Add SitePage
        /// </summary>
        /// <param name="sitePages">The SitePage to add</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/SitePages/Add")]
        public bool Add([FromBody]SitePage sitePages)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                if (context.SitePages.Count(x => x.SitePageId == sitePages.SitePageId) == 0)
                {
                    //Add Region entry
                    context.SitePages.Add(sitePages);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Update SitePage
        /// </summary>
        /// <param name="sitePage">SitePage to update</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/SitePages/Update")]
        public bool Update([FromBody]SitePage sitePage)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.SitePages.FirstOrDefault(x => x.SitePageId == sitePage.SitePageId);
                if (data != null)
                {
                    data.PageTitle = sitePage.PageTitle;
                    data.URL = sitePage.URL;
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Delete SitePage
        /// </summary>
        /// <param name="sitePage">SitePage to delete</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/SitePages/Delete")]
        public bool Delete([FromBody]SitePage sitePage)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.SitePages.FirstOrDefault(x => x.SitePageId == sitePage.SitePageId);
                if (data != null)
                {
                    context.SitePages.Remove(data);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }

        /// <summary>
        /// Delete SitePage by Id
        /// </summary>
        /// <param name="id">Id of SitePage to delete</param>
        /// <returns>True/False</returns>
        [HttpGet]
        [Route("api/SitePages/DeleteById/{id}")]
        public bool DeleteById(int id)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.SitePages.FirstOrDefault(x => x.SitePageId == id);
                if (data != null)
                {
                    context.SitePages.Remove(data);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }
    }
}