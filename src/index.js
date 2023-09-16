import returnText from "./logic/function";
import './styles/reset.css'
import './styles/main.css'


function print() {
    const text = document.createElement('h2')
    text.innerHTML = returnText()
    document.body.appendChild(text)
}

print();