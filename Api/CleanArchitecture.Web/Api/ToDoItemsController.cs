namespace CleanArchitecture.Web.Api
{
    using CleanArchitecture.Core.Entities;
    using CleanArchitecture.Core.Interfaces;
    using CleanArchitecture.Core.Queries;
    using CleanArchitecture.Web.ApiModels;
    using CleanArchitecture.Web.Filters;
    using MediatR;
    using Microsoft.AspNetCore.Mvc;
    using System;
    using System.Linq;
    using System.Threading.Tasks;

    [Route("api/[controller]")]
    [ValidateModel]
    public class ToDoItemsController : Controller
    {
        private readonly IRepository _repository;
        private readonly IMediator _mediator;

        public ToDoItemsController(IRepository repository, IMediator mediator)
        {
            _repository = repository;
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> List()
        {
            var request = new GetTodosRequest();

            var items = await _mediator.Send(request);

            return Ok(items);
        }

        [HttpGet("{id:int}")]
        public IActionResult GetById(int id)
        {
            var item = ToDoItemDTO.FromToDoItem(_repository.GetById<ToDoItem>(id));
            return Ok(item);
        }

        [HttpPost]
        public IActionResult Post([FromBody] ToDoItemDTO item)
        {
            var todoItem = new ToDoItem()
            {
                Title = item.Title,
                Description = item.Description
            };

            _repository.Add(todoItem);
            return Ok(ToDoItemDTO.FromToDoItem(todoItem));
        }

        [HttpPatch("{id:int}/complete")]
        public IActionResult Complete(int id)
        {
            var toDoItem = _repository.GetById<ToDoItem>(id);
            toDoItem.MarkComplete();
            _repository.Update(toDoItem);

            return Ok(ToDoItemDTO.FromToDoItem(toDoItem));
        }
    }
}
