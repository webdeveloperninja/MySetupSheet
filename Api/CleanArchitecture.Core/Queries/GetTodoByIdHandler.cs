using CleanArchitecture.Core.Entities;
using CleanArchitecture.Core.Interfaces;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace CleanArchitecture.Core.Queries
{
    public class GetTodoByIdRequest : IRequest<ToDoItem>
    {
        public int Id { get; set; }
    }

    public class GetTodoByIdHandler : IRequestHandler<GetTodoByIdRequest, ToDoItem>
    {
        private readonly IRepository _repository;

        public GetTodoByIdHandler(IRepository repository)
        {
            _repository = repository;
        }

        public async Task<ToDoItem> Handle(GetTodoByIdRequest request, CancellationToken cancellationToken)
        {
            return  _repository.GetById<ToDoItem>(request.Id);
        }
    }
}
