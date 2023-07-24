let groupname = document.getElementById("groupname");
let create = document.getElementById("create");
let parentNode = document.getElementById("listofgroups");

//show all groups
window.addEventListener("DOMContentLoaded", async(e)=>{
    try{
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:2000/get-groups",{headers:{"Authorization": token}});
        // console.log(response);
        // console.log(response.data);
       // console.log(response.data.allGroups);
        //console.log(response.data.allGroups.length);
        for(let i=0;i<response.data.allGroups.length;i++){
            showallgroups(response.data.allGroups[i]);
        }
    }catch(err){
        console.log(err);
    }
})

async function showallgroups(group){
    try{
        //console.log(group);
        //console.log(group.id);
        var childNode = `<li>
        ${group.groupName}
        <button onclick="viewgroup(${group.id})">view group</button>
        <button onclick="chatwithuser(${group.id})">Chat</button>
        </li>`
        parentNode.innerHTML = parentNode.innerHTML+childNode;

    }catch(err){
        console.log(err);
    }
}

async function viewgroup(groupid){
    try{
        
        localStorage.setItem('groupId', groupid);
        //localStorage.setItem("groupName", groupname);
        window.location.href=`./viewgroup.html`;

    }catch(err){
        console.log(err);
    }
}
async function chatwithuser(groupid){
    try{
        localStorage.setItem("groupId", groupid);
        window.location.href="./index.html";
    }catch(err){
        console.log(err);
    }
}



create.onclick = async(e)=>{
    try{
        e.preventDefault();
        const obj= {
            groupname: groupname.value
        }
        const token = localStorage.getItem('token');
        const response = await axios.post("http://localhost:2000/add-group",obj,{headers:{"Authorization": token}});
        //console.log(response);
        showallgroups(response.data.newGroup);

    }catch(err){
        console.log(err);
    }
}
