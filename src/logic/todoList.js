


let todoList = []

export function get_todoList() {
    console.log(todoList);
}

export function push_newTodo(title, desc, priority, date) {
    const date_Formated = format_Date(date)
    const new_Todo = generate_Todo(title, desc, priority)
    
    const day_exists = does_dayExist(todoList, date_Formated)
    if (!day_exists) {
        const new_todoList = [...todoList, {
            date: date_Formated,
            todos: [new_Todo]
        }];
        todoList = new_todoList.sort((a, b) => a.date.localeCompare(b.date));
        return;
    }

    const day_index = get_dayIndex(todoList, date_Formated)
    const new_todoList = todoList.map((day, index) => {
        if (index == day_index) {day.todos.push(new_Todo)}
        return day
    })
    todoList = new_todoList.sort((a, b) => a.date.localeCompare(b.date));
}

function generate_Todo(title, desc, priority) {
    return {title, desc, priority, id: generate_ID()}
}
function does_dayExist(array, date_Formated) {
    
    return array.some(day => day.date === date_Formated);
}
function get_dayIndex(array, date) {
    return array.findIndex((item) => item.date === date)
}
function generate_ID() {
    return Math.floor(10000 + Math.random() * 90000);
}
function format_Date(date) {
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
}


