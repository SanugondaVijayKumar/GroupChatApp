const loginForm=document.getElementById('login-form');

loginForm.addEventListener('submit',async (e)=>{
    e.preventDefault();
    try{
        const emailValue=document.getElementById('email').value;
        const passwordValue=document.getElementById('password').value;
    
        const obj={
            email:emailValue,
            password:passwordValue
        };
        const response=await axios.post('http://localhost:3000/login',obj);
        console.log(response);
        if(response.data.success===true){
            localStorage.setItem('token', response.data.token); 
            alert('successfully logged in');
            window.location.href='../index.html';
        }
        if(response.data.success===false){
            const msg=document.getElementById('msg');
            msg.innerHTML=`Password is incorrect`;
        }
        
    }
    catch(err){
        console.log("err=",err);
        showError(err);
        
    }
});

function showError(err){
    const msg=document.getElementById('msg');
    msg.innerHTML=`<p>${err}</p>`;
}
