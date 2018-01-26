using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http.Description;
using System.Web.Mvc;

namespace NCCRD.Services.Data.Controllers
{
    [ApiExplorerSettings(IgnoreApi = true)]
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "NCCRD Data Service";

            return View();
        }
    }
}
