const result = document.getElementById("butt-result");
result.addEventListener("click", () =>{
    window.location.href = `/request`
});

const register = document.getElementById("butt-register");
register.addEventListener("click", () =>{
    window.location.href = `/register`
});

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