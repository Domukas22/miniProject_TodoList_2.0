import { PRINTcalender } from './1_print_Calender';
import { PRINTtodos } from './2_print_Todos';
import { PRINTnavLinks, TOGGLEactiveNavLink } from './4_print_Nav';
import {
  EDITdateTitle, COLORcalenderCell, CLEARhtml, EDITyearTitle, PLAYclickEffect,
} from './6_other_Effects';
import { FORMATEdate, GETformatedDateInfo } from '../general';

let selectedDATE = FORMATEdate(new Date());
let selectedMONTH = new Date().getMonth();
let selectedYEAR = new Date().getFullYear();

export function SELECTdate(date) {
  selectedDATE = date;
  const { month, year } = GETformatedDateInfo(date);

  SELECTmonth(month);
  SELECTyear(year);

  PRINTcalender(selectedDATE, selectedDATE, SELECTdate);
  COLORcalenderCell(selectedDATE);

  CLEARhtml('.wrap_Todos');
  PRINTtodos(selectedDATE);
  EDITdateTitle(selectedDATE);
}

export function SELECTprevDate() {
  const {
    day, month, year,
  } = GETformatedDateInfo(GETselectedDate());

  if (day === 1) {
    const newDAY = new Date(year, month, 0).getDate();
    if (month === 0) {
      SELECTdate(`${newDAY}.${11}.${year - 1}`);
      return;
    }
    SELECTdate(`${day}.${month - 1}.${year}`);
    return;
  }
  SELECTdate(`${day - 1}.${month}.${year}`);
}
export function SELECTnewDate() {
  const {
    day, month, year, dayCOUNT,
  } = GETformatedDateInfo(GETselectedDate());

  if (day === dayCOUNT) {
    if (month === 11) {
      SELECTdate(`${1}.${0}.${year + 1}`);
      return;
    }
    SELECTdate(`${day}.${month + 1}.${year}`);
    return;
  }
  SELECTdate(`${day + 1}.${month}.${year}`);
}
export function SELECTtoday() {
  const { day, month, year } = GETformatedDateInfo(FORMATEdate(new Date()));
  SELECTdate(`${day}.${month}.${year}`);
}

export function SELECTmonth(month) {
  selectedMONTH = month;
  PRINTcalender(`xx.${selectedMONTH}.${GETselectedYear()}`, GETselectedDate(), SELECTdate);
  TOGGLEactiveNavLink(selectedMONTH);
}
export function SELECTprevMonth() {
  const month = GETselectedMonth();
  if (month === 0) {
    const newYEAR = GETselectedYear() - 1;
    PRINTnavLinks(`1.${month}.${newYEAR}`, SELECTmonth);
    SELECTyear(newYEAR);
    SELECTmonth(11);
    return;
  }
  SELECTmonth(month - 1);
}
export function SELECTnextMonth() {
  const month = GETselectedMonth();
  if (month === 11) {
    const newYEAR = GETselectedYear() + 1;
    PRINTnavLinks(`1.${month}.${newYEAR}`, SELECTmonth);
    SELECTyear(newYEAR);
    SELECTmonth(0);
    return;
  }
  SELECTmonth(month + 1);
}

export function SELECTyear(year) {
  selectedYEAR = year;
  PLAYclickEffect(document.querySelector('.wrap_navYear'));
  EDITyearTitle(year);
}

export function GETselectedDate() {
  return selectedDATE;
}
export function GETselectedMonth() {
  return selectedMONTH;
}
export function GETselectedYear() {
  return selectedYEAR;
}
