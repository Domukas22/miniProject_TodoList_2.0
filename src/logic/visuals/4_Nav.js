
import { select_Month, get_selectedMonth } from "./5_select_Dates.js";
import { play_clickEffect } from "./6_other_Effects.js";
import { get_formatedDate_info } from "../general"



export function print_navLinks(date) {
    empty_navLink_wrap()

    const {year, month: printed_Month} = get_formatedDate_info(date)
    const navLink_wrap = document.querySelector('.wrap_navMonths')
    const date_Today = new Date()

    for (let month = 0; month < 12; month++) {
        navLink_wrap.appendChild(create_navLink(year, month, printed_Month, date_Today))
    }
}
function create_navLink(year, month, printed_Month, date_Today) {
    const has_Passed = (new Date(year, month, 1) < date_Today)
    // console.log(new Date(year, month, 1).setHours(0, 0, 0, 0));

    // Fri Sep 22 2023 12:50:37
    // Fri Sep 01 2023 00:00:00
    const link = document.createElement('li')
    link.classList.add('navlink_Month')
    link.setAttribute('data-month', month)
    link.setAttribute('data-year', year)
    link.setAttribute('data-click_effect', 'false')
    link.addEventListener('click', () => {
        select_Month(month)
        
    })
    link.innerHTML = `${get_monthName(month)}`
    if (month == printed_Month) {link.classList.add('active')}

    link.setAttribute('data-has_passed', has_Passed)

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

export function toggle_activeNavLink() {
    const month = get_selectedMonth()
    document.querySelectorAll('.navlink_Month').forEach(x => {
        if (x.dataset.month == month) {
            x.classList.add('active')
            play_clickEffect(x)
            return
        }  x.classList.remove('active') 
    })
}