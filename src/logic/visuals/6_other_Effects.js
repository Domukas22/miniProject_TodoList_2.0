import { get_Date_withMonth } from "../general"


export function toggle_Title_controlBox(date) {
    const title_Day = document.querySelector('.toggle_dayOrMonth')
    title_Day.textContent = get_Date_withMonth(date)
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
