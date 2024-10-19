let boxes= document.querySelectorAll(".box");
let resetBtn = document.getElementById("reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO =  true;//playerX,playerO
let winpatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]     
];

const resetGame = () => {
    turnO = true;
    enableboxes();
    msgContainer.classList.add("hide");
}

boxes.forEach(box => {
    box.addEventListener("click", ()=>{
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;

        checkWinner();
    })
});

const disableBoxes = () => {
    for(let box of boxes) {
        box.disabled = true;
    }
};

const enableboxes = () => {
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}
const showWinner = (winner) => { 
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const showDraw = (p) => {
    msg.innerText = `Oh! It's a ${p}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const checkWinner = () => { 
    let flag = false;
    for (let pattern of winpatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
           
        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                flag = true;
                showWinner(pos1Val);
                break;
            } 
        } 
    }

    if (!flag) {
        let flag = true;
        for (let i = 0; i < boxes.length; i++) {
            if (boxes[i].innerText === "") {
                flag = false;
                break;
            }
        }
        if (flag) {
            showDraw("draw");
        }       
    }                           
}



newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);