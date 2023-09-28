import { GETdateWithMonth, GETformatedDateInfo } from "../general";

export function PLAYclickEffect(el) {
  el.setAttribute("data-click_effect", "true");
  setTimeout(() => {
    el.setAttribute("data-click_effect", "false");
  }, 500);
}
export function EDITdateTitle(date) {
  const controlBoxDATE = document.querySelector(".date_controlBox");
  controlBoxDATE.textContent = GETdateWithMonth(date);
  PLAYclickEffect(controlBoxDATE);
}
export function EDITyearTitle(year) {
  document.querySelector(".title_Year").textContent = year;
}
export function EDITnavLinkTodoCount(month, year, count) {
  const todoCountSPAN = document.querySelector(
    `.todoCount_month[data-month="${month}"][data-year="${year}"]`,
  );
  todoCountSPAN.setAttribute("data-count", count);
  todoCountSPAN.textContent = count;
}
export function TOGGLEcalenderCell(date) {
  const calenderCELLS = document.querySelectorAll(".calender_Cell");
  calenderCELLS.forEach((cell) => {
    if (cell.classList.contains("active")) {
      cell.classList.remove("active");
    }
    if (cell.dataset.date === date) {
      cell.classList.add("active");
    }
  });
}
export function CLEARhtml(elementCLASS) {
  const element = document.querySelector(elementCLASS);
  element.innerHTML = "";
}
export function REMOVEelementClassId(elementCLASS, id) {
  const el = document.querySelector(`${elementCLASS}[data-id="${id}"]`);
  if (!el) {
    return;
  }
  el.remove();
}
export function TOGGLEactiveNavLink(selectedMONTH) {
  document.querySelectorAll(".navlink_Month").forEach((x) => {
    if (parseFloat(x.dataset.month) === selectedMONTH) {
      x.classList.add("active");
      PLAYclickEffect(x);
      return;
    }
    x.classList.remove("active");
  });
}
export function TOGGLEtodoForm(action) {
  const todoFORM = document.querySelector(".todo_Form");

  if (action === "open") {
    todoFORM.setAttribute("data-open", "true");
    todoFORM.style.height = "242px";
    todoFORM.style.minHeight = "242px";
    todoFORM.style.maxHeight = "242px";
    document.querySelector(".input_todoTitle").focus();
    return;
  }
  todoFORM.setAttribute("data-open", "false");
  todoFORM.setAttribute("data-editing", "false");
  todoFORM.setAttribute("data-toeditid", "");
  todoFORM.style.height = "50px";
  todoFORM.style.minHeight = "50px";
  todoFORM.style.maxHeight = "100vh";
  CLEARinputs();
}
export function TOGGLEeditPriority(id) {
  const editTodoRADIOS = document.querySelector(
    `.editTodoRADIOS[data-id="${id}"]`,
  );
  const todoBtnWRAP = document.querySelector(`.todoBtnWRAP[data-id="${id}"]`);

  const ISopen = editTodoRADIOS.dataset.open === "true";
  if (!ISopen) {
    editTodoRADIOS.style.display = "flex";
    todoBtnWRAP.style.opacity = "0%";

    setTimeout(() => {
      editTodoRADIOS.style.opacity = "100%";
    }, 50);
    editTodoRADIOS.setAttribute("data-open", "true");
    return;
  }
  editTodoRADIOS.style.opacity = "0%";
  todoBtnWRAP.style.opacity = "100%";
  setTimeout(() => {
    editTodoRADIOS.style.display = "none";
  }, 160);
  editTodoRADIOS.setAttribute("data-open", "false");
}
export function EDIThtmlTodosPrio(id, priority) {
  const cellTodoTITLE = document.querySelector(
    `.todoTitle_calCell[data-id="${id}"]`,
  );
  const todoTITLE = document.querySelector(`.title_Todo[data-id="${id}"]`);
  const todoEditCIRCLE = document.querySelector(
    `.changePriorityCIRCLE[data-id="${id}"]`,
  );
  [todoTITLE, cellTodoTITLE, todoEditCIRCLE].forEach((el) =>
    el.setAttribute("data-priority", priority),
  );
}
export function PREPAREformForEdit(title, desc, priority, id) {
  const todoFORM = document.querySelector(".todo_Form");
  const todoTitleINPUT = document.querySelector(".input_todoTitle");
  const todoDescINPUT = document.querySelector(".input_todoDesc");
  const todoPriorityRADIO = document.querySelector(
    `.radio_Priority[data-priority="${priority}"]`,
  );

  todoFORM.setAttribute("data-editing", "true");
  todoFORM.setAttribute("data-toEditID", id);
  todoTitleINPUT.value = title;
  todoDescINPUT.value = desc;
  todoPriorityRADIO.checked = true;
}
export function CLEARinputs() {
  document.querySelector(".input_todoTitle").value = "";
  document.querySelector(".input_todoDesc").value = "";
  document.querySelector(
    '.radio_Priority[data-priority="3"][data-action="create"]',
  ).checked = true;
}
export function ADJUSThtmlAfterTodoEdit(
  newTITLE,
  newDESC,
  newPRIORITY,
  id,
  todoFORM,
) {
  const inCellTodoTITLE = document.querySelector(
    `.todoTitle_calCell[data-id="${id}"]`,
  );
  const inDayViewTodoTITLE = document.querySelector(
    `.title_Todo[data-id="${id}"]`,
  );
  const todoDESC = document.querySelector(`.desc_Todo[data-id="${id}"]`);
  const priorityBtnCIRCLE = document.querySelector(
    `.changePriorityCIRCLE[data-id="${id}"]`,
  );
  const priorityBtnRADIO = document.querySelector(
    `.editPriorityRADIO[data-priority="${newPRIORITY}"][name="${id}"]`,
  );

  // eslint-disable-next-line no-param-reassign
  [inCellTodoTITLE, inDayViewTodoTITLE].forEach((x) => {
    // eslint-disable-next-line no-param-reassign
    x.textContent = newTITLE;
  });
  [inCellTodoTITLE, inDayViewTodoTITLE].forEach((x) =>
    x.setAttribute("data-priority", newPRIORITY),
  );
  todoDESC.textContent = newDESC;
  todoDESC.setAttribute("data-empty", newDESC === "");
  priorityBtnCIRCLE.setAttribute("data-priority", newPRIORITY);
  priorityBtnRADIO.checked = true;

  CLEARinputs();
  TOGGLEtodoForm("close");
  todoFORM.setAttribute("data-editing", "false");
  todoFORM.setAttribute("data-toeditid", "");
}
export function ISfutureDate(reqMONTH, reqYEAR, selMONTH, selYEAR) {
  const ISfutureYEAR = reqYEAR > selYEAR;
  const ISsameYEAR = reqYEAR === selYEAR;
  const ISfutureMonth = reqMONTH > selMONTH;
  if (ISfutureYEAR || (ISsameYEAR && ISfutureMonth)) return true;
  return false;
}
