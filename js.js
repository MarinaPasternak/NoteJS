(function() {
    
    let allNotes = [];
    

    let btnAdd = document.querySelector(".add");
    let saveBtn = document.querySelector('.save');
    let deleteBtn = document.querySelector('.delete');

    let divNotes = document.querySelectorAll("div .note");
    let form = document.querySelector(".make-note");


    class Notes{
        constructor(date,text){
            let len = allNotes.length;
            console.log(len);
            if(len != 0){
                let lastNumber = Number(allNotes[len-1].id.slice(4));
                console.log(lastNumber);
                this.id = 'note'+(lastNumber+1);
            }
            else{
                this.id = 'note'+(len+1);
            }
            
            this.date = date;
            this.text = text;   
        }
    }

    function getNotesFromStorage(allNotes){
        let regNote = new RegExp('note');
        let elem;
        console.log(localStorage);
        for(let index in localStorage){
            if (!localStorage.hasOwnProperty(index) || !index.match(regNote)) {
                continue; 
              }
              elem = JSON.parse(localStorage.getItem(index))
              allNotes.push(elem);
              makeNoteHTML(elem.id, elem.text, elem.date)
        }
        console.log(allNotes);
    }
    
    function makeNoteHTML(idNoteVal,text,date){
        const htmlText = `<p class="name-note">${text.slice(0, 10)+"..."}</p>
                    <p class="last-change-time">${date}</p>`;
        const listNode = document.querySelector(".list-of-notes");
        let newDiv = document.createElement('div');
        newDiv.className = "note";
        newDiv.innerHTML = htmlText;
        newDiv.setAttribute('idNot', idNoteVal);
        newDiv.addEventListener('click', openNotes);
        listNode.appendChild(newDiv);
    }

    function makeContent() {
        const text = document.querySelector('.content').value;
        let currentDate =  formatDate(new Date());
        let newNote = new Notes(currentDate,text);
        allNotes.push(newNote);
        makeNoteHTML(newNote.id,text,currentDate);
        localStorage.setItem(newNote.id,JSON.stringify(newNote));
    }

   function openNotes(){
        const getId = this.getAttribute('idNot');
        const textFiesld = document.querySelector('.content');
        
        window.location.hash = getId;
        textFiesld.setAttribute('idNot', getId);

        for(let i=0;i<allNotes.length;i++){
            if(getId == allNotes[i].id){
                textFiesld.value = allNotes[i].text;
            }
        }
        saveBtn.style.display = 'block';
        btnAdd.style.display = 'none';
    }

    function changeNotes(){
        const textFiesld = document.querySelector('.content');
        const getId = textFiesld.getAttribute('idNot');
        let currDate = formatDate(new Date());
        for(let i = 0; i < allNotes.length; i++){
            if(getId == allNotes[i].id){
                allNotes[i].text = textFiesld.value;
                allNotes[i].date = currDate;

                elem = JSON.parse(localStorage.getItem(allNotes[i].id));

                elem.text  = textFiesld.value;
                elem.date = currDate;

                localStorage.setItem(allNotes[i].id,JSON.stringify(elem));
            } 
        }
    }

    function deleteNotes(){
        const textFiesld = document.querySelector('.content');
        const getId = textFiesld.getAttribute('idNot');
        localStorage.removeItem(getId);
    }


    function formatDate(date) {

        let dd = date.getDate();
        if (dd < 10) dd = '0' + dd;
      
        let mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;
      
        let yy = date.getFullYear() % 100;
        if (yy < 10) yy = '0' + yy;
      
        return dd + '.' + mm + '.' + yy;
      }

    function routing(){
        let hashValue = window.location.hash.slice(1);
        console.log(hashValue);
        const textFiesld = document.querySelector('.content');

        if(hashValue != ''){
            textFiesld.setAttribute('idNot', hashValue);
            elem = JSON.parse(localStorage.getItem(hashValue));
            textFiesld.value = elem.text;

            saveBtn.style.display = 'block';
            btnAdd.style.display = 'none';
        }
       
    }

    function WorkOnLoad()
    {
        getNotesFromStorage(allNotes); 

         btnAdd.addEventListener('click', makeContent);
         saveBtn.addEventListener('click', changeNotes);
         deleteBtn.addEventListener('click', deleteNotes);

        divNotes.forEach(function(userItem) {
            userItem.addEventListener('click', openNotes);
          });

    }
//localStorage.clear();
    document.onchange = routing();
    document.addEventListener("DOMContentLoaded",WorkOnLoad);
  })()