const token = localStorage.getItem('token');
const taskEl = document.querySelector('#task');
const formEl = document.querySelector('#addTodo');
const containerEl = document.querySelector('.todoContainer');
const backendServerURL = 'https://todo-app-6jzm.onrender.com/';

const logoutfn = async()=>{
    localStorage.removeItem('token');
    window.location.href = '/frontend/index.html';
}

formEl.addEventListener('submit', (evnt)=>{
    evnt.preventDefault();
    addingTask(taskEl.value);
})

async function addingTask(task){
    try{
        let res = await fetch(`${backendServerURL}`, {
            headers:{
                'content-type': 'application/json',
                Authorization: token
            },
            method: "POST",
            body: JSON.stringify({task})
        })
        if(res.ok){
            fetchRender();
        }
    }catch(err){
        console.log(err);
    }
}

const fetchRender=async()=>{
    try{
        let res = await fetch(backendServerURL, {
            headers:{
                'content-type': 'application/json',
                Authorization: token
            }
        })
        if(res.ok){
            res = await res.json();
            displaying(res);
        }
    }catch(err){
        console.log(err);
    }
}

fetchRender();

function displaying(res){
    res = res.map((el, i)=> todoCard(el, i+1));
    containerEl.innerHTML = res.join('\n');
    const alltoggle = document.querySelectorAll('.todoContainer .task .toggle')
    const alldelete = document.querySelectorAll('.todoContainer .task .delete')
    alltoggle.forEach((el)=>{
        el.addEventListener('click', (evnt)=>{
            const id = evnt.target.getAttribute('data-id');
            toggleStatus(id);
        })
    })
    alldelete.forEach((el)=>{
        el.addEventListener('click', (evnt)=>{
            const id = evnt.target.getAttribute('data-id');
            deleteTask(id);
        })
    })
}

function todoCard(el, i){
    let str = `<div class='task'>
    <h3>${i}.  ${el.task}</h3>
    <div>
    <button class="toggle" data-id=${el._id} ${el.status ? 'disabled': ''}>${el.status ? 'Completed' : 'Complete'}</button>
    <button class="delete" data-id=${el._id}>Delete</button>
    </div>
    </div>`;
    return str;
}

async function toggleStatus(id){
    try{
        let res = await fetch(`${backendServerURL}${id}`, {
            headers: {
                'content-type': 'application/type',
                Authorization: token
            },
            method: 'PATCH'
        })
        if(res.ok){
            res = await res.json();
            console.log(res);
            fetchRender();
        }
    }catch(err){
        console.log(err);
    }
}

async function deleteTask(id){
    try{
        let res = await fetch(`${backendServerURL}${id}`,{
            headers: {
                'content-type': 'application/type',
                Authorization: token
            },
            method: 'DELETE'
        })
        if(res.ok){
            res = await res.json();
            console.log(res);
            fetchRender();
        }
    }catch(err){
        console.log(err);
    }
}
