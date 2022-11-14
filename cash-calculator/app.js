const expenseAmount = document.querySelector("#expense-amount");
const cashPaid = document.querySelector("#cash-paid");
const button = document.querySelector("button");
const message = document.querySelector("#err");
const noteNumber = document.querySelectorAll(".notes");
const bottomContainer = document.querySelector(".bottom-container");

const notes = [2000, 500, 100, 50, 20, 10, 1]
function clickHandler() {
    if (expenseAmount.value < 0){
        errorMessage("Amount is less than 0.");
    } 
     else if (Number(cashPaid.value) < Number(expenseAmount.value)) {
             errorMessage("Do you want to wash the dishes?")
    } else {
           const remainder = cashPaid.value - expenseAmount.value;
           bottomContainer.style.display = "block";
            calculateRemainder(remainder);
            message.style.visibility = "hidden";
    }
}

function errorMessage(text) {
    message.style.visibility = "visible";
    message.textContent = text;
}
function calculateRemainder(rem) {
   notes.map((note, index) => {
        let numOfNotes = Math.trunc(rem / note);
        rem %= note;
        noteNumber[index].innerText = numOfNotes;
   })
}
button.addEventListener("click", clickHandler)







