using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using CleanArchitecture.Core.Entities;

namespace CleanArchitecture.Web.ApiModels
{
  public class ToDoItemDTO
  {
    [Required]
    public string Title { get; set; }
    public string Description { get; set; }
    public bool IsDone { get; private set; }

    public static ToDoItemDTO FromToDoItem(ToDoItem item)
    {
      return new ToDoItemDTO()
      {
        Title = item.Title,
        Description = item.Description,
        IsDone = Convert.ToBoolean(item.IsDone)
      };
    }
  }
}
