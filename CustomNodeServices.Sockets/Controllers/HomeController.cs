using CustomNodeServices.Sockets.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.NodeServices;
using System.Diagnostics;
using System.Threading.Tasks;

namespace CustomNodeServices.Sockets.Controllers
{
    public class HomeController : Controller
    {
        private readonly INodeServices nodeServices;

        public HomeController(INodeServices nodeServices)
        {
            this.nodeServices = nodeServices;
        }

        public async Task<IActionResult> SSR()
        {
            string result = null;
            var watch = new Stopwatch();
            watch.Start();
            try
            {
                result = await nodeServices.InvokeExportAsync<string>("./wwwroot/js/ssr-test.js", "render", "boda").ConfigureAwait(false);
                watch.Stop();
                Trace.WriteLine($"SSR: {watch.ElapsedTicks}");
            }
            catch (System.Exception ex)
            {
                watch.Stop();
                Trace.WriteLine($"SSR: {watch.ElapsedTicks}");

                throw;
            }

            return Content(result);
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult About()
        {
            ViewData["Message"] = "Your application description page.";

            return View();
        }

        public IActionResult Contact()
        {
            ViewData["Message"] = "Your contact page.";

            return View();
        }

        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
