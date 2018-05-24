using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http.Description;
using System.Web.Mvc;

namespace NCCRD.Services.Data.Controllers.MVC
{
    [ApiExplorerSettings(IgnoreApi = true)]
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "NCCRD Data Service";
            ViewBag.SiteRoot = Properties.Settings.Default.IdentityServerURL_DEV;

            return View();
        }
    }
}
