import { log_todoList, add_newTodo, get_Todo } from "./logic/todos.js";
import './styles/reset.css'
import './styles/main.css'


console.log('--------------------');
add_newTodo('Shopping', '', 1, new Date(2023, 1, 14))
add_newTodo('Training', '', 1, new Date(2023, 1, 15))


log_todoList()
get_Todo().edit_Priority(2)
get_Todo().edit_Text('New title', 'New Desc')
get_Todo().edit_Priority(3)
get_Todo().remove()
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











