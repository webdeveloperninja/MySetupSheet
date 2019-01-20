namespace CleanArchitecture.Web.Api
{
    using CleanArchitecture.Core.Commands;
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
        public async Task<IActionResult> GetById(int id)
        {
            var request = new GetTodoByIdRequest
            {
                Id = id
            };

            var item = await _mediator.Send(request);

            return Ok(item);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ToDoItemDTO item)
        {
            var todoItem = new ToDoItem()
            {
                Title = item.Title,
                Description = item.Description
            };

            var request = new AddTodoRequest
            {
                NewItem = todoItem
            };

            var addedItem = await _mediator.Send(request);

            return Ok(addedItem);
        }
    }
}
