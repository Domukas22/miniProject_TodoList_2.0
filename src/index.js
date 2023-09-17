import { log_todoList, add_newTodo, delete_Todo, edit_todoText, edit_todoPriority, getId, getFirst } from "./logic/todos.js";
import './styles/reset.css'
import './styles/main.css'


console.log('--------------------');
add_newTodo('Shopping', '', 1, new Date(2023, 1, 14))
add_newTodo('Training', '', 1, new Date(2023, 1, 14))
add_newTodo('Candy', '', 1, new Date(2023, 1, 15))
add_newTodo('Sports', '', 1, new Date(2023, 1, 15))
add_newTodo('Swimming', '', 1, new Date(2023, 1, 16))

log_todoList()



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











