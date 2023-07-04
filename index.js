


const getData = (data)=>{
    document.cookie=data;
}

const request = async function(){
  try{
    let response = await fetch("https://api.ipify.org?format=json");
    let data = await response.json();
    return data;
  }
  catch{
    console.log("Error occures dusring fecting");
  }
}
const ip = async ()=>{
    let a = await request();
    document.getElementById("para").innerText=a.ip;
    getData(a.ip);
}
ip();


 
