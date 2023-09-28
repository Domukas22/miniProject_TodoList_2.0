import { PRINTcalender } from "./1_print_Calender";
import { PRINTtodos } from "./2_print_Todos";
import PRINTnavLinks from "./3_print_Nav";
import {
  TOGGLEactiveNavLink,
  EDITdateTitle,
  TOGGLEcalenderCell,
  EDITyearTitle,
  PLAYclickEffect,
  ISfutureDate,
} from "./6_other_Effects";
import { FORMATEdate, GETformatedDateInfo } from "../general";

let selDATE = FORMATEdate(new Date());
let selMONTH = new Date().getMonth();
let selYEAR = new Date().getFullYear();

export function SELECTdate(reqDATE) {
  const { year: reqYEAR, month: reqMONTH } = GETformatedDateInfo(reqDATE);
  const ISsameDate = reqDATE === selDATE;
  const ISsameYear = reqYEAR === selYEAR;
  const ISsameMonth = reqMONTH === selMONTH;

  if (ISsameDate && ISsameYear && ISsameMonth) {
    TOGGLEcalenderCell(reqDATE);
    return;
  }
  if (!ISsameYear || !ISsameMonth) {
    if (!ISsameYear) {
      SELECTyear(reqYEAR);
      EDITyearTitle(reqYEAR);
      PRINTnavLinks(reqDATE, TOGGLEmonth);
    }
    TOGGLEactiveNavLink();
    TOGGLEmonth(selMONTH > reqMONTH, reqMONTH);
  }

  TOGGLEcalenderCell(reqDATE);
  PRINTtodos(reqDATE);
  EDITdateTitle(reqDATE);
  selDATE = reqDATE;
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
export function SELECTyear(year) {
  selYEAR = year;
  PLAYclickEffect(document.querySelector(".wrap_navYear"));
  EDITyearTitle(year);
}

export function TOGGLEmonth(reqMONTH, reqYEAR) {
  // needs to check the date, not jsut the month, in case the year is differnet
  const ISfuture = ISfutureDate(
    reqMONTH,
    reqYEAR,
    GETselectedMonth(),
    GETselectedYear(),
  );

  selMONTH = reqMONTH;
  PRINTcalender(
    ISfuture,
    selMONTH,
    GETselectedYear(),
    GETselectedDate(),
    SELECTdate,
  );
  TOGGLEactiveNavLink(selMONTH);
}
export function SHOWprevMonth() {
  const month = GETselectedMonth();
  const year = GETselectedYear();
  if (month === 0) {
    const newYEAR = year - 1;
    PRINTnavLinks(`xx.11.${newYEAR}`, TOGGLEmonth);
    TOGGLEmonth(11, newYEAR);
    SELECTyear(newYEAR);
    return;
  }
  TOGGLEmonth(month - 1, year);
}
export function SHOWnextMonth() {
  const month = GETselectedMonth();
  const year = GETselectedYear();
  if (month === 11) {
    const newYEAR = year + 1;
    PRINTnavLinks(`xx.1.${newYEAR}`, TOGGLEmonth);
    TOGGLEmonth(0, newYEAR);
    SELECTyear(newYEAR);
    return;
  }
  TOGGLEmonth(month + 1, year);
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
