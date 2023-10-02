const form = document.getElementById("form");
const input = document.getElementById("task");
const list = document.getElementById("task-list");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = input.value;

    if(!value) return;
    
    const addedTask = document.createElement("li");
    addedTask.classList.add("tasks");
    addedTask.innerText = value;

    const checkBtn = document.createElement('button');
    checkBtn.innerText = "✓";
    checkBtn.classList.add('mods');
    addedTask.append(checkBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "X";
    deleteBtn.classList.add("mods");
    addedTask.append(deleteBtn);

    list.appendChild(addedTask);

    input.value="";
   
    deleteBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.target.parentNode.remove();
    }); 

    let checked; //originally false
    checkBtn.addEventListener('click', (e) => {
        e.preventDefault;
        if(checked = !checked){
            e.target.parentNode.classList.add('done');
            console.log('checked');
            checked = true;
        } else{
            e.target.parentNode.classList.remove('done');
            console.log('undo check');
            checked = false;
        }
    })
    
});
