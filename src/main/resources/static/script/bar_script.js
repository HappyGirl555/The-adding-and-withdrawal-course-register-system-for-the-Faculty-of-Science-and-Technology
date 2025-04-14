const result = document.getElementById("butt-result");
result.addEventListener("click", () =>{
    window.location.href = `/request`
});

const register = document.getElementById("butt-register");
register.addEventListener("click", () =>{
    window.location.href = `/register`
});

const home = document.getElementById("butt-home");
home.addEventListener("click", () =>{
    window.location.href = `/home`
});

const profile = document.getElementById("profile-bar");
profile.addEventListener("click", () =>{
    window.location.href = '/profile'
});

const currentPath = window.location.pathname;
if (currentPath.startsWith("/")) {
    document.querySelector(".box").classList.add("show");
} 

fetch('http://localhost:4004/api/info',
   {
        method: "GET",
        headers:{
            "Content-Type": "application/json"
        }
   }).then(response => {
            console.log("กำลังทำ")
          if(response.ok){
              return response.json()
          }else{
              console.log(response)
              throw new Error("Failed Up data")
          }
    }).then(student => {
        console.log(student)
        document.getElementById("user-name").textContent = student.prefix+student.firstname+" "+student.lastname
    })

    
    fetch('http://localhost:4004/api/info/picture',
        {
             method: "GET",
        }).then(async response => {
            const contentType = response.headers.get("Content-Type");
            
            if (contentType && contentType.startsWith("image/")) {
                console.log("goo")
                const imagefile = await response.blob();
                console.log(imagefile)
                const imageUrl = URL.createObjectURL(imagefile);
                document.getElementById("profile-bar").src = imageUrl;
            }else{
                document.getElementById("profile-bar").src = '/picture/user.png';
            }
    })