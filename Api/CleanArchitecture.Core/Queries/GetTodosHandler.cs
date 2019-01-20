namespace CleanArchitecture.Core.Queries
{
    using CleanArchitecture.Core.Entities;
    using CleanArchitecture.Core.Interfaces;
    using MediatR;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading;
    using System.Threading.Tasks;

    public class GetTodosRequest : IRequest<List<ToDoItem>>
    {
    }

    public class GetTodosHandler : IRequestHandler<GetTodosRequest, List<ToDoItem>>
    {
        private readonly IRepository _repository;

        public GetTodosHandler(IRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<ToDoItem>> Handle(GetTodosRequest request, CancellationToken cancellationToken)
        {
            return _repository.List<ToDoItem>();
        }
    }
}
