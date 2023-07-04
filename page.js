let MainResult = [];
function clearDetail(){
    let div = document.getElementById("details");
    div.innerHTML=``;
}
function addDetails(data){
    let postOffice = data;
    console.log(data);
    let container = document.getElementById("details");
    for(let i=0;i<postOffice.length;i++){
        let div = document.createElement("div");
        div.className="card";
        div.innerHTML=`
        <li>Name :<span>${postOffice[i].Name}</span></li>
        <li>Branch Type : <span>${postOffice[i].BranchType}</span></li>
        <li>Delivery Status :<span>${postOffice[i].DeliveryStatus}</span></li>
        <li>District :<span>${postOffice[i].District}</span></li>
        <li>Devision :<span>${postOffice[i].Division}</span></li>`;
        container.append(div);
    }
}
document.addEventListener('keyup',SerachDetail);
function SerachDetail(){
    let search = document.getElementById("search");
    let text = search.value;
    console.log(text);
    let result = [];
    if(text.length>=2){
        clearDetail();
        for(let i=0;i<MainResult.length;i++){
            let name = MainResult[i].Name;
            let Branch = MainResult[i].BranchType;
            name = name.toUpperCase();
            Branch = name.toUpperCase();
            text = text.toUpperCase();
            if(name.indexOf(text)>=0||Branch.indexOf(text)>=0){
                result.push(MainResult[i]);
            }
        }
        
            addDetails(result);
    }
    if(text.length<2){
        addDetails(MainResult);

    }
}
 
function addMap(data){
    let div  = document.getElementById("map");
    console.log(data);
    div.innerHTML=
    `<iframe src="https://maps.google.com/maps?q=${data.lat},${data.lon}&z=15&output=embed" width="100%" height="400" frameborder="0" style="border:0"></iframe>`;

}
function addMessage(data){
    let list = document.getElementById("list");
    let li = document.createElement("li");
    li.innerHTML=`${data[0].Message}`;
    list.append(li);
    MainResult = data[0].PostOffice;
    addDetails(data[0].PostOffice);
}
async function numberOfPincode(zip){
try {
    console.log(zip)
    // let response = await fetch(`https://ipinfo.io/${zip}/geo`);
    let response = await fetch(`https://api.postalpincode.in/pincode/${zip}`);
    let data = await response.json();
    addMessage(data);
} catch (error) {
    console.log(error,"during fetch api.potal");
}
}

function addList(jsonData){
    let zone = jsonData.timezone;
    const date = new Date();
//     console.log(zone)
//    zone = await fetch(`https://usefulangle.com/post/382/${zone}`);
zone=  date.toLocaleString('en-US', {
      timeZone: [zone],
    });
    
   
    let msg = numberOfPincode(jsonData.zip);
    let list = document.getElementById("list");
    list.innerHTML=` <li>Time Zone : <span>${jsonData.timezone}</span></li>
    <li>Date And Time : <span>${zone}</span></li>
    <li>Pincode : <span>${jsonData.zip}</span></li>`;
}
 
function loadData(jsonData){
    let table = document.getElementById("table");
    console.log(jsonData)
    table.innerHTML=` <tr>
    <td>
        Lat : <span>${jsonData.lat}</span>
    </td>
    <td>
        City : <span>${jsonData.city}</span>
    </td>
    <td>
        Organisation : <span>${jsonData.org}</span>
    </td>
</tr>
<tr>
    <td>
    Lag : <span>${jsonData.lon}</span>
    </td>
    <td>
        Region : <span>${jsonData.region}</span>
    </td>
    <td>
        Hostname : <span>${jsonData.as}</span>
    </td>
</tr>`;
addMap(jsonData);
addList(jsonData);

}
const accessdata = async ()=>{
    let ip = document.cookie;
    let az = document.getElementById("ip");
    az.innerText=ip;
    console.log(ip);
    try {
    let response = await fetch(`https://ip-api.com/json/${ip}`);
    let jsonData = await response.json();
    loadData(jsonData);
    } catch (error) {
        console.log(error,"Access the data");
    }
}
accessdata();
