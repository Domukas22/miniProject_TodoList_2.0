import { get_formatedDate_info } from "../general"
import { print_Calender_html } from "./1_print_Calender"


export function print_navLinks(date) {
    empty_navLink_wrap()

    const {year, month: printed_Month} = get_formatedDate_info(date)
    const navLink_wrap = document.querySelector('.wrap_navMonths')

    for (let month = 0; month < 12; month++) {
        navLink_wrap.appendChild(create_navLink(year, month, printed_Month))
    }
}
function create_navLink(year, month, printed_Month) {
    const link = document.createElement('li')
    link.classList.add('navlink_Month')
    link.setAttribute('data-month', month)
    link.setAttribute('data-year', year)
    link.innerHTML = `${get_monthName(month)}`
    if (month == printed_Month) {link.classList.add('active')}
    link.addEventListener('click', () => print_selectedMonth(month, year))

    return link
}

function get_monthName(month) {
    const names = {
        0: 'Jan',
        1: 'Feb',
        2: 'Mar',
        3: 'Apr',
        4: 'May',
        5: 'Jun',
        6: 'Jul',
        7: 'Aug',
        8: 'Sep',
        9: 'Okb',
        10: 'Nov',
        11: 'Dec',
    }
    return names[month]
}
function empty_navLink_wrap() {
    document.querySelector('.wrap_navMonths').innerHTML = ''
}
function print_selectedMonth(month, year) {
    print_Calender_html(`xx.${month}.${year}`)
    toggle_activeNavLink(month)
}
export function toggle_activeNavLink(month) {
    document.querySelectorAll('.navlink_Month').forEach(x => {
        if (x.dataset.month == month) {
            x.classList.add('active')
            return
        }  x.classList.remove('active') 
    })
}