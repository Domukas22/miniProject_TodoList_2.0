
import { generate_ID, format_Date } from "./general";

let todoList = []

export function get_Todo() {
    return todoList[0].todos[0]
}

export function log_todoList() {
    console.log(todoList);
}
export function add_newTodo(title, desc, priority, date_Unformated) {
    const date = format_Date(date_Unformated)
    const need_newDate = is_dateNew(todoList, date)
    const new_Todo = factory_Todo(title, desc, priority)
    todoList = rebuild_todoList(need_newDate, todoList, new_Todo, date);
}
function factory_Todo(title, desc, priority) {
    const id = generate_ID()
    const edit_Text = (new_Title, new_Desc) => edit_todoText(id, new_Title, new_Desc, todoList)
    const edit_Priority = (new_Priority) => edit_todoPriority(id, new_Priority, todoList)
    const remove = () => delete_Todo(id, todoList)
    return {title, desc, priority, id, remove, edit_Text, edit_Priority}
}
function delete_Todo(id_toDelete, old_List) {
    const new_List = old_List.reduce((acc, day) => {
        const new_Day = {...day}
        new_Day.todos = new_Day.todos.filter(todo => todo.id !== id_toDelete)

        if (new_Day.todos.length > 0) {
            acc.push(new_Day)
        }
        return acc
    }, [])
    todoList = new_List

}
function edit_todoText(id_toEdit, new_Title, new_Desc, old_List) {
    // loop through each day and each todo
    // using shallow copies, return new todos and days
    let new_List = old_List.map(day => { 
        let new_dayTodos = day.todos.map(todo => { 
            let new_Todo = {...todo}
            if (new_Todo.id == id_toEdit) {
                new_Todo.title = new_Title
                new_Todo.desc = new_Desc
            }
            return new_Todo
        })
        return {...day, todos: new_dayTodos}
    })
    todoList = new_List 
}
function edit_todoPriority(id_toEdit, new_Priority, old_List) {
     // loop through each day and each todo
    // using shallow copies, return new todos and new days
    let new_List = old_List.map(day => { 
        let new_dayTodos = day.todos.map(todo => { 
            let new_Todo = {...todo}
            if (new_Todo.id == id_toEdit) {
                new_Todo.priority = new_Priority
            }
            return new_Todo
        })
        return {...day, todos: new_dayTodos}
    })
    todoList = new_List 
}

// no more refferences outside functions
function rebuild_todoList(need_newDate, old_List, new_Todo, date) {
    if (!need_newDate) {
        // add a new todo to an EXISTING day
        const new_todoList = rebuild_List_sameDays(old_List, new_Todo, get_dayIndex(old_List, date))
        return new_todoList.sort((a, b) => a.date.localeCompare(b.date));
    }
    // add a new todo to a NEW day
    const new_todoList = rebuild_List_newDay(old_List, date, new_Todo) 
    return new_todoList.sort((a, b) => a.date.localeCompare(b.date));
}
function rebuild_List_sameDays(old_List, new_Todo, index_toChange) {
    // return a list with the same days, but a new todo
    return old_List.map((day, index) => {
        if (index == index_toChange) {day.todos.push(new_Todo)}
        return day
    });
}
function rebuild_List_newDay(old_List, new_Day, new_Todo) {
    // return a list with a NEW day (and new todo)
    return [...old_List, {date: new_Day, todos: [new_Todo]}]
}
function is_dateNew(array, date_Formated) {
    // check if day already exists in the todoList
    return !array.some(day => day.date === date_Formated);
}
function get_dayIndex(array, date) {
    // get the index of a chosen day in the todoList
    return array.findIndex((item) => item.date === date)
}




