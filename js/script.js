document.addEventListener("DOMContentLoaded", () => {
    
  
    let list = document.querySelector("#list")
    let todoList = localStorage.getItem("todolist")
 
    const toasts = document.querySelectorAll("#liveToast")
    const btnadd = document.querySelector("#liveToastBtn")
    
    
    if(todoList) {
        list.innerHTML = JSON.parse(todoList);
    }
        function newElement() {   
        const li = document.createElement("li");
        let task = document.querySelector("#task").value.trim()
        
        
        if(!task) {
            $(toasts[1]).toast('show')
            return;
        }
        
       
        document.querySelector("#task").value='';
        
        
        li.textContent = task;
        
       
        li.addEventListener("click" , () => {    
            if (li.classList.contains("checked"))
                li.classList.remove("checked");
            else
                li.classList.add("checked");
            localStorage.setItem("todolist",JSON.stringify(list.innerHTML));
        });
        
        
        const delspan = document.createElement("span");
        delspan.innerHTML = "&times;";
        delspan.classList.add("close");
        delspan.addEventListener("click",() => {
            removeElement(li);
        });
        
        
        li.appendChild(delspan);
        list.appendChild(li);
        
      
        $(toasts[0]).toast('show')
        
      
        localStorage.setItem("todolist", JSON.stringify(list.innerHTML));
    };
    
    
    document.querySelector('#task').addEventListener("keypress", (event) => {
        if(event.key === "Enter") newElement();
    });

    
    document.querySelectorAll("#list li").forEach((item) => { 
        item.addEventListener("click" , () => {
            if(item.classList.contains("checked"))
                item.classList.remove("checked");
            else
                item.classList.add("checked");
            localStorage.setItem("todolist",JSON.stringify(list.innerHTML));
        })
    })

   
    document.querySelectorAll("#list span").forEach((item) => { 
        let li = item.parentNode;
        item.addEventListener("click",() => {
            removeElement(li);
        })
    })
        
    
    btnadd.addEventListener("click", newElement);

   
    function removeElement(li) {
        li.remove();
        localStorage.setItem("todolist", JSON.stringify(list.innerHTML));
    }
});