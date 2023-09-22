import { get_Date_withMonth } from "../general"



export function toggle_Date_controlBox(date) {
    const date_controlBox = document.querySelector('.date_controlBox')
    date_controlBox.textContent = get_Date_withMonth(date)
    play_clickEffect(date_controlBox)
}
export function toggle_calCell(date) {
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
export function clear_Element_hmtl(el_Class) {
    const element = document.querySelector(el_Class)
    element.innerHTML = ''
}
export function remove_Element_hmtl_withId(el_Class, id) {
    const el = document.querySelector(`${el_Class}[data-id="${id}"]`)
    if (!el) {return}
    el.remove()
}
export function edit_yearTitle(year) {
    document.querySelector('.title_Year').textContent = year
}
export function play_clickEffect(el) {
    
    el.setAttribute('data-click_effect', 'true')

    setTimeout(() => {
        el.setAttribute('data-click_effect', 'false')
    }, 500);
}
