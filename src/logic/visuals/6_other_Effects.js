import { GETdateWithMonth } from '../general';

export function PLAYclickEffect(el) {
  el.setAttribute('data-click_effect', 'true');
  setTimeout(() => {
    el.setAttribute('data-click_effect', 'false');
  }, 500);
}
export function EDITdateTitle(date) {
  const controlBoxDATE = document.querySelector('.date_controlBox');
  controlBoxDATE.textContent = GETdateWithMonth(date);
  PLAYclickEffect(controlBoxDATE);
}
export function EDITyearTitle(year) {
  document.querySelector('.title_Year').textContent = year;
}
export function EDITnavLinkTodoCount(month, year, count) {
  const todoCountSPAN = document.querySelector(`.todoCount_month[data-month="${month}"][data-year="${year}"]`);
  todoCountSPAN.setAttribute('data-count', count);
  todoCountSPAN.textContent = count;
}
export function TOGGLEcalenderCell(date) {
  const calenderCELLS = document.querySelectorAll('.calender_Cell');
  calenderCELLS.forEach((cell) => {
    if (cell.classList.contains('active')) {
      cell.classList.remove('active');
    }
    if (cell.dataset.date === date) {
      cell.classList.add('active');
    }
  });
}
export function CLEARhtml(elementCLASS) {
  const element = document.querySelector(elementCLASS);
  element.innerHTML = '';
}
export function REMOVEelementClassId(elementCLASS, id) {
  const el = document.querySelector(`${elementCLASS}[data-id="${id}"]`);
  if (!el) { return; }
  el.remove();
}
export function TOGGLEactiveNavLink(selectedMONTH) {
  document.querySelectorAll('.navlink_Month').forEach((x) => {
    if (parseFloat(x.dataset.month) === selectedMONTH) {
      x.classList.add('active');
      PLAYclickEffect(x);
      return;
    } x.classList.remove('active');
  });
}
export function TOGGLEtodoForm(action) {
  const todoFORM = document.querySelector('.todo_Form');

  if (action === 'open') {
    todoFORM.setAttribute('data-open', 'true');
    todoFORM.style.height = '242px';
    todoFORM.style.minHeight = '242px';
    todoFORM.style.maxHeight = '242px';
    document.querySelector('.input_todoTitle').focus();
    return;
  }
  todoFORM.setAttribute('data-open', 'false');
  todoFORM.style.height = '50px';
  todoFORM.style.minHeight = '50px';
  todoFORM.style.maxHeight = '100vh';
}
