
import { generate_ID, format_Date } from "./general";

let todoList = []

export function log_todoList() {
    todoList.forEach(day => {
        day.todos.forEach(x => console.log(x))
    })
}
export function create_Todo(title, desc, priority, date_Unformated) {
    const {date, need_newDate, new_Todo} = get_creationVariables(date_Unformated, title, desc, priority)
    todoList = rebuild_todoList(need_newDate, todoList, new_Todo, date);
}

function factory_Todo(title, desc, priority) {
    const id = generate_ID()
    const remove = () => delete_Todo(id)
    const edit_Text = () => edit_todoText(id, new_Title, new_Desc)
    const edit_Priority = () => edit_todoPriority(id, new_Priority)
    
    return {title, desc, priority, id, remove, edit_Text, edit_Priority}
}

// Create
function get_creationVariables(date_Unformated, title, desc, priority) {
    const date = format_Date(date_Unformated)
    const need_newDate = is_dateNew(todoList, date)
    const new_Todo = generate_Todo(title, desc, priority)
    return {date, need_newDate, new_Todo}
}
function rebuild_todoList(need_newDate, old_List, new_Todo, date) {
    if (!need_newDate) {
        const day_index = get_dayIndex(todoList, date)
        const new_todoList = old_List.map((day, index) => {
            if (index == day_index) {day.todos.push(new_Todo)}
            return day
        });
        return new_todoList.sort((a, b) => a.date.localeCompare(b.date));
    }

    const new_todoList = [...old_List, {date, todos: [new_Todo]}]    
    return new_todoList.sort((a, b) => a.date.localeCompare(b.date));

}
function generate_Todo(title, desc, priority) {
    return {title, desc, priority, id: generate_ID()}
}
function is_dateNew(array, date_Formated) {
    return !array.some(day => day.date === date_Formated);
}
function get_dayIndex(array, date) {
    return array.findIndex((item) => item.date === date)
}
//----------------------------------------------------------------


// export function delete_Todo(id_toDelete) {
//     const new_List = todoList.reduce((acc, day) => {
//         const new_Day = {...day}
//         new_Day.todos = new_Day.todos.filter(todo => todo.id !== id_toDelete)

//         if (new_Day.todos.length > 0) {
//             acc.push(new_Day)
//         }
//         return acc
//     }, [])
//     todoList = new_List

// }
// export function edit_todoText(id_toEdit, new_Title, new_Desc) {

//     // loop through each day and each todo
//     // using shallow copies, return new todos and days
//     let new_List = todoList.map(day => { 
//         let new_dayTodos = day.todos.map(todo => { 
//             let new_Todo = {...todo}
//             if (new_Todo.id == id_toEdit) {
//                 new_Todo.title = new_Title
//                 new_Todo.desc = new_Desc
//             }
//             return new_Todo
//         })
//         return {...day, todos: new_dayTodos}
//     })
//     todoList = new_List 
// }
// export function edit_todoPriority(id_toEdit, new_Priority) {

//      // loop through each day and each todo
//     // using shallow copies, return new todos and new days
//     let new_List = todoList.map(day => { 
//         let new_dayTodos = day.todos.map(todo => { 
//             let new_Todo = {...todo}
//             if (new_Todo.id == id_toEdit) {
//                 new_Todo.priority = new_Priority
//             }
//             return new_Todo
//         })
//         return {...day, todos: new_dayTodos}
//     })
//     todoList = new_List 
// }
// export function getId() {
//     return todoList[0].todos[0].id
// }
// export function getFirst() {
//     return todoList[0].todos[0]
// }


