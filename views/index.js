let sendbtn = document.getElementById("send");
let textMessage = document.getElementById("messages");
let parentNode = document.getElementById("allMessages");
let goBackbtn = document.getElementById("goback");

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}


//showing message from DB
window.addEventListener("DOMContentLoaded", async(e)=>{
    const token = localStorage.getItem("token");
    const userId=parseJwt(token);
    console.log("userId=",userId);
    const grpid = localStorage.getItem("groupId");
    async function gettingChat(){
        const response = await axios.get(`http://localhost:3000/show-message/${grpid}`,{headers:{"Authorization": token}});
        console.log(response.data);
        //console.log(response.data.allMessage.length);
        for(let i=0;i<response.data.allMessage.length;i++){
            showChatOnBrowser(response.data.allMessage[i]);
        }
    }

    setInterval(gettingChat,1000);
    
});

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
        const addMessage = await axios.post("http://localhost:3000/add-message", obj, {headers:{"Authorization": token}});
        //console.log(addMessage.data.newmessage.message);
        //console.log(addMessage.data.newmessage)
        showChatOnBrowser(addMessage.data.newmessage);
    }catch(err){
        console.log(err)
    }
}

goBackbtn.onclick = async()=>{
    try{
        window.location.href = "./login.html"

    }catch(err){
        console.log(err);
    }
}