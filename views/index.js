let sendbtn = document.getElementById("send");
let textMessage = document.getElementById("messages");
let parentNode = document.getElementById("allMessages");
let goBackbtn = document.getElementById("goback");


//showing message from DB
window.addEventListener("DOMContentLoaded", async(e)=>{
    const token = localStorage.getItem("token");
    const grpid = localStorage.getItem("groupId");
    const response = await axios.get(`http://localhost:2000/show-message/${grpid}`,{headers:{"Authorization": token}});
        console.log(response.data);
        //console.log(response.data.allMessage.length);
        for(let i=0;i<response.data.allMessage.length;i++){
            showChatOnBrowser(response.data.allMessage[i]);
        }
    
})

async function showChatOnBrowser(show){
    try{
        
        console.log(show.id)
        if(show){
            let recent = show.id - 10;
            localStorage.removeItem(recent);
            localStorage.setItem(show.id, show.message);
           // window.location.reload();
        }
        const msg = localStorage.getItem(show.id);
        var childNode=`<li>${show.userName}:${msg}</li>`
            parentNode.innerHTML= parentNode.innerHTML+childNode;
            //console.log(parentNode);
        
    }catch(err){
        console.log(err);
    }
}

//adding message ot DB
sendbtn.onclick = async(e)=>{
    try{
        //e.preventDefault();
        groupid = localStorage.getItem("groupId");
        const obj = {
            message: textMessage.value,
            groupId: groupid
        }
        const token = localStorage.getItem('token');
        const addMessage = await axios.post("http://localhost:2000/add-message", obj, {headers:{"Authorization": token}});
        //console.log(addMessage.data.newmessage.message);
        //console.log(addMessage.data.newmessage)
        showChatOnBrowser(addMessage.data.newmessage);
    }catch(err){
        console.log(err)
    }
}

goBackbtn.onclick = async()=>{
    try{
        window.location.href = "./group.html"

    }catch(err){
        console.log(err);
    }
}