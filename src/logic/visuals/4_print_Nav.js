// import { SELECTmonth } from './5_select_Dates';
import { PLAYclickEffect } from './6_other_Effects';
import { GETformatedDateInfo } from '../general';

export function PRINTnavLinks(date, selectMonthFUNC) {
  EMPTYnavLinkWrap();

  const { year, month: printedMONTH } = GETformatedDateInfo(date);
  const navLinkWRAP = document.querySelector('.wrap_navMonths');
  const todayDATE = new Date();

  for (let month = 0; month < 12; month + 1) {
    navLinkWRAP.appendChild(CREATEnavLink(year, month, printedMONTH, todayDATE, selectMonthFUNC));
  }
}
function CREATEnavLink(year, month, printedMONTH, todayDATE, selectMonthFUNC) {
  const link = document.createElement('li');
  link.classList.add('navlink_Month');
  link.setAttribute('data-month', month);
  link.setAttribute('data-year', year);
  link.setAttribute('data-click_effect', 'false');
  link.addEventListener('click', () => {
    selectMonthFUNC(month);
  });
  link.innerHTML = `${GETmonthName(month)}`;
  if (month === printedMONTH) { link.classList.add('active'); }

  let HASpassed = (new Date(year, month, 1) < todayDATE);
  let ISmonthSameAsToday = false;
  if (todayDATE.getMonth() === month && todayDATE.getFullYear() === year) {
    HASpassed = false;
    ISmonthSameAsToday = true;
  }
  link.setAttribute('data-has_passed', HASpassed);
  link.setAttribute('data-this_Month', ISmonthSameAsToday);

  return link;
}

function GETmonthName(month) {
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
  };
  return names[month];
}
function EMPTYnavLinkWrap() {
  document.querySelector('.wrap_navMonths').innerHTML = '';
}

export function TOGGLEactiveNavLink(selectedMONTH) {
  document.querySelectorAll('.navlink_Month').forEach((x) => {
    if (x.dataset.month == selectedMONTH) {
      x.classList.add('active');
      PLAYclickEffect(x);
      return;
    } x.classList.remove('active');
  });
}
