using NCCRD.Services.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using NCCRD.Services.Data.Classes;
using System.Threading.Tasks;
using System.Web.Security;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;

namespace NCCRD.Services.Data.Controllers.MVC
{
    public class LoginController : Controller
    {
        [HttpGet]
        public ActionResult Register(string message)
        {
            ViewBag.Message = message;

            if(Session.Keys.OfType<string>().Contains("tmpModel"))
            {
                var model = Session["tmpModel"];
                Session.Remove("tmpModel");
                return View(model);
            }

            return View();
        }

        [HttpPost]
        public async Task<ActionResult> Register(RegisterBindingModel model)
        {
            if (ModelState.IsValid)
            {
                APIClient client = new APIClient();
                var result = await client.Register(model);

                if(result.IsSuccessStatusCode)
                {
                    return RedirectToAction("Login", new { email = model.Email });
                }
                else
                {
                    var responseJson = await result.Content.ReadAsStringAsync();
                    var obj = new { message = "", ModelState = new Dictionary<string, string[]>() };
                    var x = JsonConvert.DeserializeAnonymousType(responseJson, obj);

                    var messages = new List<string>();
                    foreach (var mStateValues in x.ModelState.Values)
                    {
                        foreach (var msg in mStateValues.Where(m => !m.Contains("Name")))
                        {
                            messages.Add(msg);
                        }
                    }

                    Session["tmpModel"] = model;
                    return RedirectToAction("Register", new { message = string.Join("|", messages) });
                }
            }
            else
            {
                return View();
            }
        }

        [HttpGet]
        public ActionResult Login(string email = "")
        {
            var model = new LoginBindingModel()
            {
                Email = email
            };

            return View(model);
        }

        [HttpPost]
        public async Task<ActionResult> Login(LoginBindingModel model)
        {
            if (ModelState.IsValid)
            {
                APIClient client = new APIClient();
                var result = await client.Login(model);

                if (result.errors.Count == 0)
                {

                    //FormsAuthenticationTicket ticket = new FormsAuthenticationTicket(1,
                    //      result.userName,
                    //      result.issued,
                    //      result.expires,
                    //      false,
                    //      result.access_token,
                    //      FormsAuthentication.FormsCookiePath);

                    //// Encrypt the ticket.
                    //string encTicket = FormsAuthentication.Encrypt(ticket);

                    //// Create the cookie.
                    //Response.Cookies.Add(new HttpCookie(FormsAuthentication.FormsCookieName, encTicket));

                    if (!string.IsNullOrEmpty(result.access_token))
                    {

                        //Update session info
                        Session["UserId"] = result.userName;
                        Session["AccessTokenIssued"] = result.issued.ToString();
                        Session["AccessTokenExpires"] = result.expires.ToString();
                        Session["AccessToken"] = result.access_token;

                        return RedirectToAction("Index", "Home");
                    }
                }
                else
                {
                    ViewBag.Message = string.Join("|", result.errors);
                }
            }

            return View(model);
        }

        [HttpGet]
        public ActionResult Logout()
        {
            FormsAuthentication.SignOut();

            Session.Remove("UserId");
            Session.Remove("AccessTokenIssued");
            Session.Remove("AccessTokenExpires");
            Session.Remove("AccessToken");

            return View();
        }
    }
}