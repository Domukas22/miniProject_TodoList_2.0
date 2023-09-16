import { get_todoList, push_newTodo } from "./logic/todoList.js";
import './styles/reset.css'
import './styles/main.css'


console.log('--------------------');
push_newTodo('Shopping', '', 1, new Date(2023, 1, 14))
push_newTodo('Training', '', 1, new Date(2023, 1, 14))
push_newTodo('Candy', '', 1, new Date(2023, 1, 15))
push_newTodo('Sports', '', 1, new Date(2023, 1, 15))
push_newTodo('Swimming', '', 1, new Date(2023, 1, 16))

get_todoList()



