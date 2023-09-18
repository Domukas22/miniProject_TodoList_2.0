

export function open_Day(day_htmlCell) {
    deactive_activeCell()
}

function deactive_activeCell() {
    const cell_Active = document.querySelector('.calender_Cell[data-active="true"]')
    console.log(cell_Active);
    // cell_Active.setAttribute("active", "false")
}