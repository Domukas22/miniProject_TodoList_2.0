import { GETformatedDateInfo } from "../general";
import { GETtodosOfMonth } from "../todo_Logic";

export default function PRINTnavLinks(date, selectMonthFUNC) {
  EMPTYnavLinkWrap();

  const { year, month: printedMONTH } = GETformatedDateInfo(date);
  const navLinkWRAP = document.querySelector(".wrap_navMonths");
  const todayDATE = new Date();

  for (let month = 0; month < 12; month += 1) {
    navLinkWRAP.appendChild(
      CREATEnavLink(year, month, printedMONTH, todayDATE, selectMonthFUNC),
    );
  }
}
function CREATEnavLink(year, month, printedMONTH, todayDATE, selectMonthFUNC) {
  const link = document.createElement("li");
  const todoCOUNT = GETtodosOfMonth(month, year).length;

  link.classList.add("navlink_Month");
  if (month === printedMONTH) {
    link.classList.add("active");
  }
  link.setAttribute("data-month", month);
  link.setAttribute("data-year", year);
  link.setAttribute("data-click_effect", "false");
  link.addEventListener("click", () => {
    selectMonthFUNC(month);
  });

  link.setAttribute("data-has_passed", new Date(year, month, 1) < todayDATE);
  link.setAttribute("data-this_Month", false);
  if (todayDATE.getMonth() === month && todayDATE.getFullYear() === year) {
    link.setAttribute("data-has_passed", false);
    link.setAttribute("data-this_Month", true);
  }

  link.innerHTML = `${GETmonthName(
    month,
  )}<span class="todoCount_month" data-count="${todoCOUNT}" data-month="${month}" data-year="${year}">${todoCOUNT}</span>`;

  return link;
}

function GETmonthName(month) {
  const names = {
    0: "Jan",
    1: "Feb",
    2: "Mar",
    3: "Apr",
    4: "May",
    5: "Jun",
    6: "Jul",
    7: "Aug",
    8: "Sep",
    9: "Okb",
    10: "Nov",
    11: "Dec",
  };
  return names[month];
}
function EMPTYnavLinkWrap() {
  document.querySelector(".wrap_navMonths").innerHTML = "";
}
