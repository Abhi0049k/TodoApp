const formEl = document.querySelector('form');
const emailEl = document.querySelector('#email');
const passwordEl = document.querySelector('#password');
const backendServerURL = 'https://todo-app-6jzm.onrender.com/'

formEl.addEventListener('submit', (evnt)=>{
    evnt.preventDefault();
    const obj = {email: emailEl.value, password: passwordEl.value}
    signup(obj);
})

const signup = async(obj)=>{
    try{
        let res = await fetch(`${backendServerURL}signup`, {
            headers: {
                'content-type': "application/json"
            },
            body: JSON.stringify(obj),
            method: "POST"
        })
        if(res.ok){
            res = await res.json();
            alert('Sign up Successful');
            window.location.href = 'https://heartfelt-gumption-cce232.netlify.app/index.html';
        }
    }catch(err){
        console.log(err);
    }
}