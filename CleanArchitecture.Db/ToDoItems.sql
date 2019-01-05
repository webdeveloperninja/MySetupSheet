CREATE TABLE [dbo].[ToDoItems]
(
	[Id] INT NOT NULL PRIMARY KEY, 
    [Title] VARCHAR(50) NOT NULL, 
    [Description] VARCHAR(MAX) NULL, 
    [IsDone] BIT NOT NULL DEFAULT 0
)
