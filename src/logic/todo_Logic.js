
import { generate_ID, format_Date } from "./general";

let todoList = []
let selected_Day = {}

export function select_Day(date_Target) {
    const need_newDate = is_dateNew(todoList, date_Target)

    if (!need_newDate) {
        selected_Day = todoList.find(day => day.date == date_Target)
        console.log("Selected =>", selected_Day);
        return
    }
    selected_Day = {
        date: date_Target,
        todos: []
    }
    console.log("Selected =>", selected_Day)
}
export function get_Todos_ofDay(title_ofDate) { 
    // formated date => "dd.mm.yyy"
    const day_Obj = todoList.find(day => day.date == title_ofDate)
    if (!day_Obj) {return []}
    return day_Obj.todos
}
export function add_newTodo(title, desc, priority, date_Unformated) {
    const date = format_Date(date_Unformated)
    const new_Todo = factory_Todo(title, desc, priority)
    todoList = create_newTodoList(todoList, new_Todo, date);
}

function factory_Todo(title, desc, priority) {
    const id = generate_ID()
    const edit_Text = (new_Title, new_Desc) => edit_todoText(id, new_Title, new_Desc, todoList)
    const edit_Priority = (new_Priority) => edit_todoPriority(id, new_Priority, todoList)
    const remove = () => delete_Todo(id, todoList)
    return {title, desc, priority, id, remove, edit_Text, edit_Priority}
}
function delete_Todo(id_toDelete, old_List) {
    // loop through list and skip the obj with mathcing id
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
function create_newTodoList(old_List, new_Todo, date_Target) {
    const need_newDate = is_dateNew(old_List, date_Target)

    // if day exists --> push new_Todo, else push new_Day with the new_Todo
    if (!need_newDate) { 
        return insert_newTodo(old_List, date_Target, new_Todo)
    }
    return [...old_List, create_newDay(date_Target, new_Todo)] 
            .sort((a, b) => a.date.localeCompare(b.date));
}
function create_newDay(date, new_Todo) {
    // formated date => "dd.mm.yyy"
    return {date, todos: [new_Todo], id: generate_ID()}
}
function insert_newTodo(old_List, date_Target, new_Todo) {
    return old_List.map((day) => {
        if (day.date == date_Target) {day.todos.push(new_Todo)}
        return day
    }).sort((a, b) => a.date.localeCompare(b.date));
}
function is_dateNew(array, date_Target) {
    // formated date => "dd.mm.yyy"
    // see if the todoList already has the target Date
    return !array.some(day => day.date === date_Target);
}





