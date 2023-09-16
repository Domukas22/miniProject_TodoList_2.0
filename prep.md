


Initialize
1. Generate starting html
2. Load local storage
3. Select current day
4. Display selected day
5. Load todos of selected day

Calender interactions
6. Select day on calender
7. Next/previous month

Todo item interactions
8. Create
9. Open / close
10. Edit content
11. Edit color
12. Delete
--------------------
All functions
1. Calender
- (Re)populate calender cells according to date and todo array
- Change month
- Print cell content
- Select a cell --> repopulate todoSide

2. TodoSide
- (Re)populate todo-items according to todo array
- Undo previous step (if completed in the last 10 min) --> repopulate calender / todoSide

3. Todo-item
- create(date, title, desc, color, id)
- open(id)
- close(id)
- edit_Content(newTitle, newDesc, id)
- edit_Color(newColor, id)
- delete(id)

4. Todo-list
- Get list 
- push_newTodo(date, title, desc, color, id)
- Delete todo-item
- Edit content of todo-item
- Edit color of todo-item
- Save to localStorage
- Get from localStorage