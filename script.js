const inputField = document.getElementById("note");
const container = document.querySelector(".container");


function handleSubmit(event) {
    event.preventDefault();
    if (inputField.checkValidity()) {
        addition();
    } else {
        window.alert("Enter the note");
    }
}

function addition() {
    const inputText = inputField.value.trim();
    if (inputText === "") return;

    const noteDiv = document.createElement("div");
    noteDiv.classList.add("note1")

    const butdiv = document.createElement("div")
    butdiv.classList.add("butClass")

    const pardiv = document.createElement("div")
    pardiv.classList.add("parClass")

    const closeButton = document.createElement("button");
    closeButton.textContent = "❌";
    closeButton.onclick = function () {
        container.removeChild(noteDiv)
    }
    butdiv.appendChild(closeButton)


    // will use later for time display
    // const date=new Date();
    // const time=date.getHours();
    // const min=date.getMinutes();
    // const ampm=time>=12?'Pm':'Am';
    // const hour=time%12 || 12;
    // const month=date.getMonth()+1;
    // const year=date.getDate();

    // const pad=(n)=>n.toString().padStart(2,'0');
    // const timeString=`${pad(hour)}:${pad(min)}${ampm} ${pad(month)}/${pad(year)}`;

    // var t=document.createElement("div");
    // t.classList.add("timeClass");

    // const p=document.createElement("p");
    // p.textContent=timeString;
    // t.appendChild(p);
    


    const notePara = document.createElement("p");
    notePara.textContent = inputText;
    pardiv.appendChild(notePara)

    noteDiv.appendChild(butdiv);
    noteDiv.appendChild(pardiv);
    // noteDiv.appendChild(t);
    container.insertAdjacentElement("afterbegin", noteDiv);

    inputField.value = "";
}
