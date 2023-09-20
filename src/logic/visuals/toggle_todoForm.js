

export function toggle_todoFrom(action) {

    const todo_Form = document.querySelector('.todo_Form')
    if (action == 'open') {
        todo_Form.setAttribute('data-open', 'true')
        todo_Form.style.height = '242px'
        todo_Form.style.minHeight = '242px'
        todo_Form.style.maxHeight = '242px'
        return
    }
    todo_Form.setAttribute('data-open', 'false')
    todo_Form.style.height = '50px'
    todo_Form.style.minHeight = '50px'
    todo_Form.style.maxHeight = '100vh'
}
