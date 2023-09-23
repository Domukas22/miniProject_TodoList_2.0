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
export function COLORcalenderCell(date) {
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
export function EDITyearTitle(year) {
  document.querySelector('.title_Year').textContent = year;
}
