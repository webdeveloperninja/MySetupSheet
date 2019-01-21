namespace CleanArchitecture.Infrastructure.Data
{
    using CleanArchitecture.Core.Entities;
    using Microsoft.EntityFrameworkCore;

    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<ToDoItem> ToDoItems { get; set; }

        public override int SaveChanges()
        {
            int result = base.SaveChanges();

            return result;
        }
    }
}
