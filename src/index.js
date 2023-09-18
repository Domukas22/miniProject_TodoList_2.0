import { log_todoList, add_newTodo, get_Todo } from "./logic/todo_Logic.js";
import { create_Calender_html } from "./logic/visuals/view_Calender.js";
import './styles/reset.css'
import './styles/main.css'
import './styles/view_Calender/calender.css'
import './styles/view_Calender/heading.css'
import './styles/view_Calender/sub_Heading.css'
import './styles/view_Day/heading.css'
import './styles/view_Day/todo_Template.css'
import './styles/view_Day/todo.css'



console.log('--------------------');
add_newTodo('Shopping', '', 1, new Date(2023, 1, 14))
add_newTodo('Training', '', 1, new Date(2023, 8, 18))
log_todoList()
console.log('-----');
const year = new Date().getFullYear()
const month = new Date().getMonth()
create_Calender_html(year, month)

// let list = [
//     {
//         date: "1.1.2023",
//         todos: [
//             {
//                 title: 'Item_1',
//                 desc: '',
//                 priority: 1,
//                 id: 111111
//             },
//             {
//                 title: 'Item_2',
//                 desc: '',
//                 priority: 1,
//                 id: 222222
//             }
//         ]
//     },
//     {
//         date: "2.1.2023",
//         todos: [
//             {
//                 title: 'Item_3',
//                 desc: '',
//                 priority: 1,
//                 id: 333333
//             },
//             {
//                 title: 'Item_4',
//                 desc: '',
//                 priority: 1,
//                 id: 444444
//             }
//         ]
//     }
// ]











