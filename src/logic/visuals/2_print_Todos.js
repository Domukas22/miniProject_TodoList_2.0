
import { clear_Element_hmtl, remove_Element_hmtl_withId } from "./6_other_Effects.js"
import { get_Todos_ofDay } from "../todo_Logic.js"


export function _print_Todos_html(date) {
    const todos = get_Todos_ofDay(date)
    clear_Element_hmtl('.wrap_Todos')

    todos.forEach(todo_Obj => {
        _append_singleTodo(todo_Obj)
    })
}
export function _append_singleTodo({id, priority, title, desc, remove}) {
    const div_todoWrap = document.querySelector('.wrap_Todos')
    const div_Todo = document.createElement('div')
    div_Todo.classList.add('todo')
    div_Todo.setAttribute('data-id', `${id}`)
    div_Todo.innerHTML = `
        <p class="title_Todo" data-priority="${priority}">${title}</p>
        <p class="desc_Todo" data-empty="${desc !== ''}">${desc}</p>
        <div class="actionBox_Todo">
            <div class="todoBtn remove">X</div>
        </div>
    `
    listen_forEvent_remove(div_Todo, remove, id)
    div_todoWrap.appendChild(div_Todo)
}

function listen_forEvent_remove(div_Todo, remove_Method, id) {
    const bnt_Remove = div_Todo.querySelector('.todo .remove')
    bnt_Remove.addEventListener('click', () => {
        remove_Method()
        remove_Element_hmtl_withId(".todoTitle_calCell", id)
        remove_Element_hmtl_withId(".todo", id)
    }) 
}

