namespace CleanArchitecture.Web.Controllers
{
    using CleanArchitecture.Core;
    using CleanArchitecture.Core.Entities;
    using CleanArchitecture.Core.Interfaces;
    using Microsoft.AspNetCore.Mvc;

    public class ToDoController : Controller
    {
        private readonly IRepository _repository;

        public ToDoController(IRepository repository)
        {
            _repository = repository;
        }

        public IActionResult Index()
        {
            var items = _repository.List<ToDoItem>();
            return View(items);
        }
    }
}
