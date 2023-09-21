
import { print_Calender_html } from "./1_create_Calender.js";
import { format_Date, get_formatedDate_info, get_Date_withMonth } from "../general.js"
import { get_Todos_ofDay } from "../todo_Logic.js"

let displayed_Date = format_Date(new Date())

export function get_displayedDate() {
    return displayed_Date
}
export function set_displayedDate(date) {
    displayed_Date = date
}
export function print_Date(date = displayed_Date) {
    // formated date => "dd.mm.yyyy"
    const same_Month = is_sameMonth(displayed_Date, date)
    const same_Day = is_sameDay(displayed_Date, date)

    if (!same_Month && !same_Day) {
        //change everything
        set_displayedDate(date)
        print_Calender_html(date);
        toggle_calCell(date);
        empty_todoWrap();
        print_Todos_html(date);
        toggle_Title_controlBox(date);
        return;
    }
    if (same_Month && !same_Day) {
        //calender does not regenerate
        set_displayedDate(date)
        toggle_calCell(date);
        empty_todoWrap();
        print_Todos_html(date);
        toggle_Title_controlBox(date);
        return;
    }
    if (!same_Month && same_Day) {
        //reprint the calender
        print_Calender_html(date);
        return;
    }
    // clicked on the same day
    return
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
        listen_forEvent_remove(div_Todo, obj_Todo)
        todo_Wrap.appendChild(div_Todo)
}
function print_Todos_html(date) {
    const todos = get_Todos_ofDay(date)
    todos.forEach(todo_Obj => {
        create_singleTodo_html(todo_Obj)
    })
}

function listen_forEvent_remove(div_Todo, todo) {
    const bnt_Remove = div_Todo.querySelector('.todo .remove')
    bnt_Remove.addEventListener('click', () => {
        todo.remove()
        remove_Elment_html(".todoTitle_calCell", todo.id)
        remove_Elment_html('.todo', todo.id)
    }) 
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
function toggle_Title_controlBox(date) {
    const title_Day = document.querySelector('.toggle_dayOrMonth')
    title_Day.textContent = get_Date_withMonth(date)
}

function is_sameMonth(date1, date2) {
    // formated date => "dd.mm.yyyy"
    // compares BOTH the months and the years
    return date1.slice(3) == date2.slice(3);
}
function is_sameDay(date1, date2) {
    return date1.slice(0, 2) == date2.slice(0, 2);
}