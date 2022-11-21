let btns1 = document.querySelectorAll(".change1 .Btns label");
let btns2 = document.querySelectorAll(".change2 .Btns label");
let input = document.querySelector(".inputs");
let output = document.querySelector(".outputs");
let changeTo = document.querySelector(".changeTo");
let changeFrom = document.querySelector(".changeFrom");
let Based;
let Ratess;

btns1.forEach((select) => {
    select.addEventListener("click",() =>{
        Based = select.innerText;
        inputChange();
    });
});
btns2.forEach((select) => {
    select.addEventListener("click",() =>{
        Ratess = select.innerText;
        outputChange();
    });
});
async function inputChange(){
    let res = await fetch(`https://api.exchangerate.host/latest?base=${Based}&symbols=${Ratess}`);
    let data = await res.json();
    output.value = (input.value * Object.values(data.rates)[0]).toFixed(3);

    if(Based && Ratess){
        changeTo.innerHTML= `1${Based} = ${Object.values(data.rates)[0].toFixed(3)} ${Ratess}`;
        changeFrom.innerHTML= `1${Ratess} = ${(1 / Object.values(data.rates)[0]).toFixed(3)} ${Based}`;
    }
}

async function outputChange(){
    let res = await fetch(`https://api.exchangerate.host/latest?base=${Based}&symbols=${Ratess}`);
    let data = await res.json();
    input.value = (output.value / Object.values(data.rates)[0]).toFixed(2);
}
input.addEventListener("keyup" , inputChange);
output.addEventListener("keyup" , outputChange);