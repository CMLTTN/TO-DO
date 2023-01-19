 const todoInput = document.getElementById("todo-input");
 const addBtn = document.querySelector("#todo-button");
 const todoUl = document.querySelector("#todo-ul");

 let todoList = JSON.parse(localStorage.getItem("todoList")) || [];

//  let todoList = localStorage.getItem("todoList") || [];
 window.addEventListener("load", ()=>{

    getTodoListFromLocalStorage();
});

const getTodoListFromLocalStorage = () => {
console.log(todoList);
todoList.forEach((todo) => {
createTodo(todo);
});
}



 addBtn.addEventListener("click", (e)=>{
     e.preventDefault();
     if(todoInput.value.trim() === ""){
       alert("Please, enter new todo text!");
      return;
     }
    //  else{

    //      alert("continue");
    //  }
    const newTodo = {
        id: new Date().getTime(),
        completed:false,
        text:todoInput.value,
    }
    createTodo(newTodo);
    todoList.push(newTodo);
    localStorage.setItem("todoList",JSON.stringify(todoList) );
    e.target.closest("form").reset();
 })
     const createTodo = (newTodo)=>{
        // alert("item was added")
        const {id, completed, text} = newTodo;
        const li = document.createElement("li");
        li.setAttribute("id",id);
        completed ?li.classList.add("checked"): "";

        const icon = document.createElement("i");
        icon.setAttribute("class","fas fa-check");
        li.append(icon)
const p = document.createElement("p");
p.innerText = text;
li.appendChild(p);

const removeIcon = document.createElement("i");
removeIcon.setAttribute("class", "fas fa-trash");
li.append(removeIcon);

// console.log(li);

todoUl.append(li);
     }

     todoUl.addEventListener("click", (e)=>{
        const idAttr = e.target.closest("li").getAttribute("id")
         if(e.target.classList.contains("fa-check")){
// alert("check clicked")
e.target.parentElement.classList.toggle("checked");
todoList.forEach((todo)=>{
if(todo.id==idAttr){
        todo.completed = !todo.completed;

    }
});
localStorage.setItem("todoList", JSON.stringify(todoList));

         }
         else if(e.target.classList.contains("fa-trash")){
// alert("remove clicked");
e.target.parentElement.remove();
todoList = todoList.filter((todo)=>todo.id !=idAttr);
localStorage.setItem("todoList", JSON.stringify(todoList));

         }
         else{
            alert("other element clicked")
         }
       console.log(todoList);
     })
 