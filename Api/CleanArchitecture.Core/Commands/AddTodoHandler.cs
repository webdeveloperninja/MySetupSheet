using CleanArchitecture.Core.Entities;
using CleanArchitecture.Core.Interfaces;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace CleanArchitecture.Core.Commands
{
    public class AddTodoRequest : IRequest<ToDoItem>
    {
        public ToDoItem NewItem { get; set; }
    }

    public class AddTodoHandler : IRequestHandler<AddTodoRequest, ToDoItem>
    {
        private readonly IRepository _repository;

        public AddTodoHandler(IRepository repository)
        {
            _repository = repository;
        }

        public async Task<ToDoItem> Handle(AddTodoRequest request, CancellationToken cancellationToken)
        {
            return _repository.Add<ToDoItem>(request.NewItem);
        }
    }
}
