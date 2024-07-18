let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;//by default turnO is true (player X, player O)
let count=0; //to track draw


const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
  ];




const resetGame = () => {
    turnO = true;
    count=0;
    enableBoxes();
    msgContainer.classList.add("hide");//reset game
  };




boxes.forEach((box) => {
    box.addEventListener("click", () => {
      // console.log("button was clicked");-- (not necessary)
      if (turnO) {           //(turnO) is same as (turnO===true)
        //playerO
        box.innerText = "O";
        turnO = false;    //if turn is true then it will print O, and also turn value of turnO to false
      } else {
        //playerX
        box.innerText = "X";
        turnO = true;  // similarly if turnO is false, it will print X, and turn value of turnO to true again
      }
      box.disabled = true;
      count++;

      let isWinner= checkWinner(); // calling the function checkWinner
  
    if (count ===9 && !isWinner){
        gameDraw();
    }
      
    });
  });


  const gameDraw=()=>{
    msg.innerText=`Game was a draw.`;
    msgContainer.classList.remove("hide");
    disableBoxes();
  };



const disableBoxes = () => {
    for (let box of boxes) {
      box.disabled = true;
    }
  };


  const enableBoxes = () => {
    for (let box of boxes) {
      box.disabled = false;
      box.innerText = "";
    }
  };// reset game



  const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
  };





const checkWinner = () => {
    for (let pattern of winPatterns) {
      let pos1Val = boxes[pattern[0]].innerText; // accessing the inner text (X & O) at 3 positions(from winning patterns) and storing it in variables
      let pos2Val = boxes[pattern[1]].innerText;
      let pos3Val = boxes[pattern[2]].innerText;
  
      if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
        if (pos1Val === pos2Val && pos2Val === pos3Val) {
          showWinner(pos1Val);//identifying the winning condition and the winner
          return true;
        }
      }
    }
  };
  
  newGameBtn.addEventListener("click", resetGame);
  resetBtn.addEventListener("click", resetGame);//joining buttons from html