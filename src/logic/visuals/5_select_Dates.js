import { PRINTcalender } from "./1_print_Calender";
import { PRINTtodos } from "./2_print_Todos";
import PRINTnavLinks from "./3_print_Nav";
import {
  TOGGLEactiveNavLink,
  EDITdateTitle,
  TOGGLEcalenderCell,
  EDITyearTitle,
  PLAYclickEffect,
} from "./6_other_Effects";
import { FORMATEdate, GETformatedDateInfo } from "../general";

let selDATE = FORMATEdate(new Date());
let selMONTH = new Date().getMonth();
let selYEAR = new Date().getFullYear();

export function SELECTdate(requestedDATE) {
  const { year: reqYEAR, month: reqMONTH } = GETformatedDateInfo(requestedDATE);
  const ISsameDate = requestedDATE === selDATE;
  const ISsameYear = reqYEAR === selYEAR;
  const ISsameMonth = reqMONTH === selMONTH;

  if (ISsameDate && ISsameYear && ISsameMonth) {
    TOGGLEcalenderCell(requestedDATE);
    return;
  }
  if (!ISsameYear || !ISsameMonth) {
    if (!ISsameYear) {
      SELECTyear(reqYEAR);
      EDITyearTitle(reqYEAR);
      PRINTnavLinks(requestedDATE, SELECTmonth);
    }
    TOGGLEactiveNavLink();
    PRINTcalender(requestedDATE, selDATE, SELECTdate);
    SELECTmonth(reqMONTH);
  }

  TOGGLEcalenderCell(requestedDATE);
  PRINTtodos(requestedDATE);
  EDITdateTitle(requestedDATE);
  selDATE = requestedDATE;
}

export function SELECTprevDate() {
  const { day, month, year } = GETformatedDateInfo(GETselectedDate());

  if (day === 1) {
    const newDAY = new Date(year, month, 0).getDate();
    if (month === 0) {
      SELECTdate(`${newDAY}.${11}.${year - 1}`);
      return;
    }
    SELECTdate(`${newDAY}.${month - 1}.${year}`);
    return;
  }
  SELECTdate(`${day - 1}.${month}.${year}`);
}
export function SELECTnextDate() {
  const { day, month, year, dayCOUNT } = GETformatedDateInfo(GETselectedDate());

  if (day === dayCOUNT) {
    if (month === 11) {
      SELECTdate(`${1}.${0}.${year + 1}`);
      return;
    }
    SELECTdate(`${1}.${month + 1}.${year}`);
    return;
  }
  SELECTdate(`${day + 1}.${month}.${year}`);
}
export function SELECTtoday() {
  const { day, month, year } = GETformatedDateInfo(FORMATEdate(new Date()));
  SELECTdate(`${day}.${month}.${year}`);
}

export function SELECTmonth(month) {
  selMONTH = month;
  PRINTcalender(
    `xx.${selMONTH}.${GETselectedYear()}`,
    GETselectedDate(),
    SELECTdate,
  );
  TOGGLEactiveNavLink(selMONTH);
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
  selYEAR = year;
  PLAYclickEffect(document.querySelector(".wrap_navYear"));
  EDITyearTitle(year);
}

export function GETselectedDate() {
  return selDATE;
}
export function GETselectedMonth() {
  return selMONTH;
}
export function GETselectedYear() {
  return selYEAR;
}
