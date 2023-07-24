let parentNode = document.getElementById("groupname");
let groupid = localStorage.getItem('groupId');
let users = document.getElementById("users");
console.log(groupid);

parentNode.innerHTML = parentNode.innerHTML+groupid;

window.addEventListener("DOMContentLoaded", async(e)=>{
    try{
        const token = localStorage.getItem("token");
        const alluserData = await axios.get("http://localhost:2000/view-users-of-group",{headers:{"Authorization": token}});
        console.log(alluserData.data.userData);
        for(let i=0; i<alluserData.data.userData.length;i++){
            showonScreen(alluserData.data.userData[i]);
        }
    }catch(err){
        console.log(err);
    }
})

async function showonScreen(userData){
    try{
        //console.log(userData);
        var child = `<li>
        ${userData.name}
        <button onclick="senduserData(${userData.id})">Add</button>
        </li>`
        users.innerHTML = users.innerHTML+child;
    }catch(err){
        console.log(err);
    }

}

async function senduserData(sendData){
    try{
        const token = localStorage.getItem("token");
        const grpid = localStorage.getItem("groupId");
        var id = sendData;
        var myobj = {
            userid: id,
            groupid:grpid
        }
        const response = await axios.post(`http://localhost:2000/add-user-to-group`, myobj,{headers:{"Authorization": token}});
        console.log(response)
        //showonScreen(response.data.addData);
        alert("user added to group");
        window.location.href="./index.html";
    }catch(err){
        console.log(err);
    }
}

