namespace CleanArchitecture.Core.Interfaces
{
    using CleanArchitecture.Core.Entities;
    using System.Collections.Generic;

    public interface IRepository
    {
        T GetById<T>(int id) where T : BaseEntity;

        List<T> List<T>() where T : BaseEntity;

        T Add<T>(T entity) where T : BaseEntity;

        void Update<T>(T entity) where T : BaseEntity;

        void Delete<T>(T entity) where T : BaseEntity;
    }
}
