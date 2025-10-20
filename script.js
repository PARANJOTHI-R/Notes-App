document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.getElementById("note");
    const container = document.querySelector(".container");
    const STORAGE_KEY = 'Sticky_Notes';

    const saveData = () => {
        const allNotes = Array.from(container.querySelectorAll(".note1"));

        const jsonArray = allNotes.map(temp => {
            return {
                text: temp.querySelector(".parClass p").textContent,
                time: temp.querySelector(".timeClass p").textContent
            };
        });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(jsonArray));
    };

    const loadNotesFromStorage = () => {
        const storedNotes = localStorage.getItem(STORAGE_KEY);
        if (storedNotes) {
            const notes = JSON.parse(storedNotes);
            for (let i = notes.length - 1; i >= 0; i--) {
                addElement(notes[i].text, notes[i].time);
            }
        }
    };

    const addElement = (inputText, existingTime = null) => {
        if(inputText==="")return;

        let timeString;
        if (existingTime) {
            timeString = existingTime;
        } else {
            const date = new Date();
            const time = date.getHours();
            const minute = date.getMinutes()
            const ampm = time >= 12 ? 'Pm' : 'Am';
            const hour = time % 12||12;
            const day = date.getDate();
            const month = date.getMonth() + 1;

            const pad = (n) => {
                return n.toString().padStart(2, '0');
            }
            timeString = `${pad(hour)}:${pad(minute)}${ampm} ${pad(month)}/${pad(day)}`;
        }
            // edit and close button division
            const noteDiv = document.createElement("div");
            noteDiv.setAttribute("class", "note1");

            const buttonDiv = document.createElement("div");
            buttonDiv.setAttribute("class", "butClass");

            const editButton = document.createElement("button");
            editButton.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
            editButton.setAttribute("class", "edit-button");
            buttonDiv.appendChild(editButton);

            const closeButton = document.createElement("button");
            closeButton.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
            closeButton.setAttribute("class", "close-button");
            closeButton.onclick = function () {
                container.removeChild(noteDiv);
                saveData();
            }
            buttonDiv.appendChild(closeButton)
            //inner paragraph division
            const paragraphDiv = document.createElement("div");
            paragraphDiv.setAttribute("class", "parClass");
            paragraphDiv.innerHTML=`<p>${inputText}</p>`;

            const timeDiv = document.createElement("div");
            timeDiv.setAttribute("class", "timeClass");
            timeDiv.innerHTML=`<p>${timeString}</p>`;

            noteDiv.appendChild(buttonDiv);
            noteDiv.appendChild(paragraphDiv);
            noteDiv.appendChild(timeDiv);
            container.insertAdjacentElement("afterbegin",noteDiv);

            if(!existingTime){
                inputField.value="";
                saveData();
            }
    }

    function handleSubmit(event) {
        event.preventDefault();
        var input = inputField.value.trim();
        if (input != "") {
            addElement(input);
        } else {
            window.alert("Enter a Note buddy!");
        }
    }
    document.getElementById("add").addEventListener("submit", handleSubmit);
    loadNotesFromStorage();
});