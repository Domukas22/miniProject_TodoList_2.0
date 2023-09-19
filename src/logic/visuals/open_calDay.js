
import { select_Day, get_Todos_ofDay, get_selectedDay } from "../todo_Logic.js"


export function open_Day(date) {
    empty_todoWrap()
    toggle_dayView_title(date)
    toggle_calCell(date)
    select_Day(date)
    generate_Todos_html(date)
}
export function create_singleTodo_html(obj_Todo) {
    const todo_Wrap = document.querySelector('.wrap_Todos')
    const div_Todo = document.createElement('div')
        div_Todo.classList.add('todo')
        div_Todo.setAttribute('data-id', `${obj_Todo.id}`)
        div_Todo.innerHTML = `
            <p class="title_Todo" data-priority="${obj_Todo.priority}">${obj_Todo.title}</p>
            <p class="desc_Todo" data-empty="${obj_Todo.desc !== ''}">${obj_Todo.desc}</p>
            <div class="actionBox_Todo">
                <div class="todoBtn remove">X</div>
            </div>
        `
        listen_forRemove(div_Todo, obj_Todo)
        todo_Wrap.appendChild(div_Todo)
}

function generate_Todos_html(date) {
    const todos = get_Todos_ofDay(date)
    todos.forEach(todo_Obj => {
        create_singleTodo_html(todo_Obj)
    })
}

function listen_forRemove(div_Todo, todo) {
    const bnt_Remove = div_Todo.querySelector('.todo .remove')
    bnt_Remove.addEventListener('click', () => {
        todo.remove()
        remove_Elment_html(".dayBox_todoTitle", todo.id)
        remove_Elment_html('.todo', todo.id)
    })
    
}
function get_dateWithMonth(date) {
    // formated date => "dd.mm.yyy"
    // returs => "dd. Month yy"
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
                     'August', 'September', 'October', 'November', 'December'];
    const [day, month, year] = date.split('.')
    return `${day}. ${months[month]} ${year}`
}
function toggle_dayView_title(date) {
    const title_dayView = document.querySelector('.title_dayView')
    title_dayView.textContent = get_dateWithMonth(date)
}
function toggle_calCell(date) {
    const cells_All = document.querySelectorAll(`.calender_Cell`)
    cells_All.forEach(cell => {
        if (cell.classList.contains('active')) {
            cell.classList.remove('active')
        }
        if (cell.dataset.date == date) {
            cell.classList.add('active')
        }
    })
}
function empty_todoWrap() {
    document.querySelector('.wrap_Todos').innerHTML = ''
}
function remove_Elment_html(el_Class, id,) {
    const el = document.querySelector(`${el_Class}[data-id="${id}"]`)
    if (!el) {return}
    el.remove()
}

