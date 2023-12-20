const formEl = document.querySelector('form');
const emailEl = document.querySelector('#email');
const passwordEl = document.querySelector('#password');
const backendServerURL = "https://todo-app-6jzm.onrender.com/"

formEl.addEventListener('submit', (evnt)=>{
    evnt.preventDefault();
    const obj = {email: emailEl.value, password: passwordEl.value}
    signin(obj);
})

const signin = async(obj)=>{
    try{
        let res = await fetch(`${backendServerURL}signin`, {
            headers: {
                'content-type': "application/json"
            },
            body: JSON.stringify(obj),
            method: "POST"
        })
        if(res.ok){
            res = await res.json();
            localStorage.setItem('token', res.token);
            alert('Sign in Successful');
            window.location.href = '/frontend/main.html'
        }
    }catch(err){
        console.log(err);
    }
}