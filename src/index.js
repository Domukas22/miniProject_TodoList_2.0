import { log_todoList, create_Todo, delete_Todo, getId } from "./logic/todoList.js";
import './styles/reset.css'
import './styles/main.css'


console.log('--------------------');
create_Todo('Shopping', '', 1, new Date(2023, 1, 14))
create_Todo('Training', '', 1, new Date(2023, 1, 14))
create_Todo('Candy', '', 1, new Date(2023, 1, 15))
create_Todo('Sports', '', 1, new Date(2023, 1, 15))
create_Todo('Swimming', '', 1, new Date(2023, 1, 16))

// log_todoList()


let list = [
    {
        date: "1.1.2023",
        todos: [
            {
                title: 'Item_1',
                desc: '',
                priority: 1,
                id: 111111
            },
            {
                title: 'Item_2',
                desc: '',
                priority: 1,
                id: 222222
            }
        ]
    },
    {
        date: "2.1.2023",
        todos: [
            {
                title: 'Item_3',
                desc: '',
                priority: 1,
                id: 333333
            },
            {
                title: 'Item_4',
                desc: '',
                priority: 1,
                id: 444444
            }
        ]
    }
]








