import { GETformatedDateInfo } from "../general";
import { PRINTcalender } from "./1_print_Calender";
import { PRINTtodos } from "./2_print_Todos";
import PRINTnavLinks from "./3_print_Nav";
import SUBMITnewTodo from "./4_submit_newTodo";
import {
  GETselectedDate,
  GETselectedYear,
  SELECTdate,
  SELECTprevDate,
  SELECTnextDate,
  SELECTmonth,
  SELECTnextMonth,
  SELECTprevMonth,
  SELECTtoday,
} from "./5_select_Dates";
import {
  EDITyearTitle,
  PLAYclickEffect,
  TOGGLEtodoForm,
  EDITdateTitle,
} from "./6_other_Effects";

export default function SETlisteners() {
  console.log("-------");

  const today = GETselectedDate();
  PRINTnavLinks(today, SELECTmonth);
  PRINTcalender(today, today, SELECTdate);
  PRINTtodos(today);
  EDITdateTitle(today);
  EDITyearTitle(GETselectedYear());

  const createTodoBTN = document.querySelector(".btn_createTodo.submit");
  const cancelTodoBTN = document.querySelector(".btn_createTodo.cancel");
  const openFormOVERLAY = document.querySelector(".overlay_openForm");
  createTodoBTN.addEventListener("click", SUBMITnewTodo);
  cancelTodoBTN.addEventListener("click", (e) => {
    TOGGLEtodoForm(e.currentTarget.dataset.action);
  });
  openFormOVERLAY.addEventListener("click", (e) => {
    TOGGLEtodoForm(e.currentTarget.dataset.action);
  });

  const prevDayBTN = document.querySelector('.controlBtn[data-action="prev"]');
  const currentDayBTN = document.querySelector(
    '.controlBtn[data-action="current"]',
  );
  const selectedDayBTN = document.querySelector(".date_controlBox");
  const nextDayBTN = document.querySelector('.controlBtn[data-action="next"]');
  prevDayBTN.addEventListener("click", SELECTprevMonth);
  currentDayBTN.addEventListener("click", SELECTtoday);
  nextDayBTN.addEventListener("click", SELECTnextMonth);
  selectedDayBTN.addEventListener("click", () => SELECTdate(GETselectedDate()));

  const colorOnClickBTNS = document.querySelectorAll(
    '[data-click_effect="false"]',
  );
  colorOnClickBTNS.forEach((btn) =>
    btn.addEventListener("click", (e) => PLAYclickEffect(e.currentTarget)),
  );

  let ISshiftPressed = false;
  window.addEventListener("keyup", (e) => {
    if (e.key === "Shift") {
      ISshiftPressed = false;
    }
  });
  window.addEventListener("keydown", (e) => {
    const ISformOpen =
      document.querySelector(".todo_Form").dataset.open === "true";
    console.log(e.key);
    if (e.key === "Shift") {
      ISshiftPressed = true;
    }
    if (e.key === "a" || e.key === "A") {
      if (ISformOpen) return;
      if (ISshiftPressed) {
        SELECTprevMonth();
        return;
      }
      SELECTprevDate();
    }
    if (e.key === "d" || e.key === "D") {
      if (ISformOpen) return;
      if (ISshiftPressed) {
        SELECTnextMonth();
        return;
      }
      SELECTnextDate();
    }
    if (e.key === "w" || e.key === "W") {
      if (ISshiftPressed) return;
      if (ISformOpen) return;
      const { day, month, year } = GETformatedDateInfo(GETselectedDate());
      const upDAY = day - 7;
      if (upDAY > 0) SELECTdate(`${upDAY}.${month}.${year}`);
    }
    if (e.key === "s" || e.key === "S") {
      if (ISshiftPressed) return;
      if (ISformOpen) return;
      const { day, month, year, dayCOUNT } = GETformatedDateInfo(
        GETselectedDate(),
      );
      const downDAY = day + 7;
      if (downDAY <= dayCOUNT) SELECTdate(`${downDAY}.${month}.${year}`);
    }

    if (e.key === "Escape") TOGGLEtodoForm("close");
    if (e.key === " ") {
      if (ISformOpen) return;
      TOGGLEtodoForm("open");
    }
    if (e.key === "Enter") {
      if (!ISformOpen) return;
      SUBMITnewTodo();
    }
  });
}
