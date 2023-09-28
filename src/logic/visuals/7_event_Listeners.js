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
  TOGGLEmonth,
  SHOWnextMonth,
  SHOWprevMonth,
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
  const { day, month, year } = GETformatedDateInfo(GETselectedDate());
  PRINTnavLinks(today, TOGGLEmonth);
  PRINTcalender(true, day, month, today, SELECTdate);
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
  prevDayBTN.addEventListener("click", SHOWprevMonth);
  currentDayBTN.addEventListener("click", SELECTtoday);
  nextDayBTN.addEventListener("click", SHOWnextMonth);
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
    if (e.key === "Shift") {
      ISshiftPressed = true;
    }
    if (e.key === "a" || e.key === "A" || e.key === "ArrowLeft") {
      if (ISformOpen) return;
      if (ISshiftPressed) {
        SHOWprevMonth();
        return;
      }
      SELECTprevDate();
    }
    if (e.key === "d" || e.key === "D" || e.key === "ArrowRight") {
      if (ISformOpen) return;
      if (ISshiftPressed) {
        SHOWnextMonth();
        return;
      }
      SELECTnextDate();
    }
    if (e.key === "w" || e.key === "W" || e.key === "ArrowUp") {
      if (ISshiftPressed) return;
      if (ISformOpen) return;
      const { day, month, year } = GETformatedDateInfo(GETselectedDate());
      const upDAY = day - 7;
      if (upDAY > 0) SELECTdate(`${upDAY}.${month}.${year}`);
    }
    if (e.key === "s" || e.key === "S" || e.key === "ArrowDown") {
      if (ISshiftPressed) return;
      if (ISformOpen) return;
      const { day, month, year, dayCOUNT } = GETformatedDateInfo(
        GETselectedDate(),
      );
      const downDAY = day + 7;
      if (downDAY <= dayCOUNT) SELECTdate(`${downDAY}.${month}.${year}`);
    }

    if (e.key === "ArrowUp") {
      if (!ISformOpen) return;
      const checkedRADIO = document.querySelector(".radio_Priority:checked");
      if (checkedRADIO.dataset.priority === "1") {
        checkedRADIO.parentElement.lastElementChild.checked = true;
        return;
      }
      checkedRADIO.previousElementSibling.checked = true;
    }
    if (e.key === "ArrowDown") {
      if (!ISformOpen) return;
      const checkedRADIO = document.querySelector(".radio_Priority:checked");
      if (checkedRADIO.dataset.priority === "3") {
        checkedRADIO.parentElement.firstElementChild.checked = true;
        return;
      }
      checkedRADIO.nextElementSibling.checked = true;
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
