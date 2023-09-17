
import { generate_ID, format_Date } from "./general";

let todoList = []

export function log_todoList() {
    console.log(todoList);
}
export function create_Todo(title, desc, priority, date_Unformated) {
    const {date, need_newDate, new_Todo} = get_creationVariables(date_Unformated, title, desc, priority)
    todoList = create_newTodoList(need_newDate, todoList, new_Todo, date);
}
export function delete_Todo(id_toDelete) {
    const new_List = todoList.reduce((acc, day) => {
        const new_Day = {...day}
        new_Day.todos = new_Day.todos.filter(todo => todo.id !== id_toDelete)

        if (new_Day.todos.length > 0) {
            acc.push(new_Day)
        }
        return acc
    }, [])
    todoList = new_List

}
export function edit_todoText(id, new_Title, new_Desc) {
    const new_List = 
}

export function getId() {
    return todoList[0].todos[0].id
}

// Create
function get_creationVariables(date_Unformated, title, desc, priority) {
    const date = format_Date(date_Unformated)
    const need_newDate = is_dateNew(todoList, date)
    const new_Todo = generate_Todo(title, desc, priority)
    return {date, need_newDate, new_Todo}
}
function create_newTodoList(need_newDate, old_List, new_Todo, date) {
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





