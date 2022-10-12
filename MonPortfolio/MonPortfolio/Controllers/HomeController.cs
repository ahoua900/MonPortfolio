using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MonPortfolio.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return PartialView();
        }
        public ActionResult Services()
        {
            return PartialView();
        }
        public ActionResult Resume()
        {
            return PartialView();
        }
        public ActionResult Skills()
        {
            return PartialView();
        }
        public ActionResult Portfolio()
        {
            return PartialView();
        }
        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return PartialView();
        }
    }
}