let name = document.getElementById('name');
let phone = document.getElementById('phone');
let email = document.getElementById('email');
let password = document.getElementById('password');
let button = document.getElementById('press');

//storing data in database
button.addEventListener("click", async(e)=>{
    try{
        e.preventDefault();
    obj={
        name:name.value,
        phone: phone.value,
        email:email.value,
        password:password.value
    }
    console.log(obj);
    const adduser = await axios.post("http://localhost:2000/add-user",obj)

        console.log(adduser);
        if(adduser.data.newUser){
            console.log("User data saved in database");
            alert(adduser.data.msg);
            window.location.href="./login.html";
        }else{
            console.log("User already exists");
        }

    }catch(err){
        console.log(err);
    }
})