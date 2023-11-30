let squares = document.querySelectorAll("#squares .square");
let btn = document.querySelector("button");
let headear = document.querySelector("#header h2")
let currentTurn = "x";
let boardArray = [
  "0","1","2",
  "3","4","5",
  "6","7","8"
]

let xIsWon= JSON.parse(window.localStorage.getItem("xIsWon"))? JSON.parse(window.localStorage.getItem("xIsWon")):0;
let oIsWon= JSON.parse(window.localStorage.getItem("oIsWon"))? JSON.parse(window.localStorage.getItem("oIsWon")):0;


squares.forEach((e)=>{
  e.addEventListener("click",()=>{
    let value=e.getAttribute("value")
    let index = value-1
    //filling the value visually
    if(boardArray[index] == 'x' || boardArray[index] == 'o'){
      return
    }
    let squareContent = document.querySelector(`.square[value="${value}"]`);
    squareContent.innerHTML=currentTurn
    //filling the value logically
    boardArray[index]=currentTurn
    if(currentTurn == "x"){
      currentTurn = "o"
    }else {
      currentTurn = "x"
    }
    headear.textContent=`${currentTurn} turn`
    evaluateBoard()
  })

})
function evaluateBoard()
{
  if(
    // Row
    (boardArray[0] == boardArray[1] && boardArray[1] == boardArray[2])||
    (boardArray[3] == boardArray[4] && boardArray[4] == boardArray[5])||
    (boardArray[6] == boardArray[7] && boardArray[7] == boardArray[8])||
    // culom
    (boardArray[0] == boardArray[3] && boardArray[3] == boardArray[6])||
    (boardArray[1] == boardArray[4] && boardArray[4] == boardArray[7])||
    (boardArray[2] == boardArray[5] && boardArray[5] == boardArray[8])||
    //Diagonal
    (boardArray[0] == boardArray[4] && boardArray[4] == boardArray[8])||
    (boardArray[2] == boardArray[4] && boardArray[4] == boardArray[6])
  ){
    let winner = currentTurn == "o" ? "x" :"o"
    if(winner == 'x'){
      xIsWon =xIsWon + 1;
      window.localStorage.setItem("xIsWon",JSON.stringify(xIsWon));
    }else {
      oIsWon = oIsWon +1;
      window.localStorage.setItem("oIsWon",JSON.stringify(oIsWon));
    }
    if(xIsWon == '2' || oIsWon == '2'){
      result()
      alertify.alert(`${winner} is won !`)
    }
    getResultFromLocal()
    clickbtn()
  }
  let isDraw =true
  for(i of boardArray){
    if(i != "x" && i != "o"){
      isDraw=false
    }
  }
  if(isDraw){
    alertify.alert("Drow")
    clickbtn()
  }
}
btn.addEventListener("click" , ()=>{
  clickbtn()
})
function clickbtn(){
  squares.forEach((e)=>{
    let value=e.getAttribute("value")
    let squareContent = document.querySelector(`.square[value="${value}"]`);
    squareContent.innerHTML=""
  })
  boardArray = [
    "0","1","2",
    "3","4","5",
    "6","7","8"
  ]
  currentTurn= "x"
  headear.textContent=`${currentTurn} turn`
}
//Result
getResultFromLocal()
function getResultFromLocal(){
  if(window.localStorage.getItem("xIsWon") && window.localStorage.getItem("oIsWon")){
    document.getElementById("x").innerHTML=JSON.parse(window.localStorage.getItem("xIsWon"));
    document.getElementById("o").innerHTML=JSON.parse(window.localStorage.getItem("oIsWon"));
  }else {
    window.localStorage.setItem("xIsWon",JSON.stringify(xIsWon));
    window.localStorage.setItem("oIsWon",JSON.stringify(oIsWon));
    document.getElementById("x").innerHTML=JSON.parse(window.localStorage.getItem("xIsWon"));
    document.getElementById("o").innerHTML=JSON.parse(window.localStorage.getItem("oIsWon"));
  }
}
function result(){
  window.localStorage.setItem("oIsWon","0");
  window.localStorage.setItem("xIsWon","0");
  getResultFromLocal()
  xIsWon=0;
  oIsWon=0;
}