import { GETtodosOfMonth } from "../todo_Logic";

export default function PRINTnavLinks(
  reqMONTH,
  reqYEAR,
  PRINTmonth,
  SETprintedMonth,
) {
  EMPTYnavLinkWrap();

  const navLinkWRAP = document.querySelector(".wrap_navMonths");

  for (let loopMONTH = 0; loopMONTH < 12; loopMONTH += 1) {
    navLinkWRAP.appendChild(
      CREATEnavLink(reqYEAR, reqMONTH, loopMONTH, PRINTmonth, SETprintedMonth),
    );
  }
}

function CREATEnavLink(
  reqYEAR,
  reqMONTH,
  loopMONTH,
  PRINTmonth,
  SETprintedMonth,
) {
  const link = document.createElement("li");
  const todoCOUNT = GETtodosOfMonth(loopMONTH, reqYEAR).length;

  link.classList.add("navlink_Month");
  if (loopMONTH === reqMONTH) {
    link.classList.add("active");
  }
  link.setAttribute("data-month", loopMONTH);
  link.setAttribute("data-year", reqYEAR);
  link.setAttribute("data-click_effect", "false");
  link.addEventListener("click", () => {
    PRINTmonth(loopMONTH, reqYEAR);
    PRINTnavLinks(loopMONTH, reqYEAR, PRINTmonth, SETprintedMonth);
    SETprintedMonth(loopMONTH);
  });
  link.setAttribute(
    "data-has_passed",
    new Date(reqYEAR, loopMONTH, 1) < new Date(),
  );
  link.setAttribute("data-this_Month", false);
  link.innerHTML = `${GETmonthName(
    loopMONTH,
  )}<span class="todoCount_month" data-count="${todoCOUNT}" data-month="${loopMONTH}" data-year="${reqYEAR}">${todoCOUNT}</span>`;
  if (
    new Date().getMonth() === loopMONTH &&
    new Date().getFullYear() === reqYEAR
  ) {
    link.setAttribute("data-has_passed", false);
    link.setAttribute("data-this_Month", true);
  }

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
