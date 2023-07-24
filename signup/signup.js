const signupForm=document.getElementById('signup-form');

signupForm.addEventListener('submit',async (e)=>{
    e.preventDefault();
    try{
        const nameValue=document.getElementById('name').value;
        const emailValue=document.getElementById('email').value;
        const phonenumberValue=document.getElementById('phone_number').value;
        const passwordValue=document.getElementById('password').value;
    
        const obj={
            name:nameValue,
            email:emailValue,
            phonenumber:phonenumberValue,
            password:passwordValue
        };
        const response=await axios.post('http://localhost:3000/signup',obj);
        console.log(response);
        alert(response.data.message);
    }
    catch(err){
        console.log(err);
        showError(err);
        
    }


});

function showError(err){
    const msg=document.getElementById('msg');
    msg.innerHTML=`<p>${err}</p>`;
}