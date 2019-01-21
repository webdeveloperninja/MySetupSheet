﻿namespace CleanArchitecture.Core.Entities
{
    using CleanArchitecture.Core.Entities;

    public class ToDoItem : BaseEntity
    {
        public string Title { get; set; }

        public string Description { get; set; }

        public bool IsDone { get; private set; }

        public ToDoItem()
        {
            IsDone = false;
        }
    }
}
