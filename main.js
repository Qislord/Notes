const header = document.querySelector('.header'); // получение хедера

const createNotesButton = document.createElement('button'); // создал кнопку оздать заметку
createNotesButton.classList.add('createNotesButton');
const createIcon = document.createElement('img');
createIcon.classList.add('createIcon');
createIcon.src = 'img/CreatePencil.png';
createNotesButton.appendChild(createIcon);
header.appendChild(createNotesButton);


function generateKey(){
    return 'TitleNotes_' + Date.now();
}


const main = document.querySelector('.main-block');

createNotesButton.addEventListener('click', function(){
    createModalWindow();

});

function createNotesBlock(note, id){
    const noteBlock = document.createElement('div');
    noteBlock.dataset.id = id;
    const nameBlock = document.createElement('p');
    const bodyBlock = document.createElement('p');
    bodyBlock.classList.add('notesPreviewBody');
    noteBlock.classList.add('notesPreview');
    nameBlock.classList.add('notesPreviewName');
    nameBlock.innerHTML = note.titleObject;
    bodyBlock.innerHTML = note.bodyObject;
    noteBlock.addEventListener('click', function(){
        createModalWindow(note,id,function(noteData){
            note = noteData;
            nameBlock.innerHTML = noteData.titleObject;
        });
    });
    noteBlock.appendChild(nameBlock);
    noteBlock.appendChild(bodyBlock);
    return noteBlock;
}


function createModalWindow(note, id, onUpdate){
    const modalWindow = document.createElement('div');
    modalWindow.classList.add('modalWindow');
    document.body.appendChild(modalWindow);

    const modalForm = document.createElement('form');
    modalForm.classList.add('modalForm');
    modalWindow.appendChild(modalForm);

    const titleNotes = document.createElement('input');
    titleNotes.classList.add('titleNotes');
    titleNotes.placeholder = 'Input name notes';
    titleNotes.maxLength = 85;
    

    const bodyNotes = document.createElement('textarea');
    bodyNotes.classList.add('bodyNotes');
    bodyNotes.placeholder = 'Input your text';
    bodyNotes.rows = 13;
    if(note){
        titleNotes.value = note.titleObject;
        bodyNotes.value = note.bodyObject;
    }
    modalForm.appendChild(titleNotes);
    modalForm.appendChild(bodyNotes);

    const saveNotesButton = document.createElement('div');
    saveNotesButton.classList.add('saveNotesButton');
    saveNotesButton.innerHTML = note ?'Update Note':'Save notes';
    modalForm.appendChild(saveNotesButton);

    
    modalWindow.addEventListener('click',function (e) {
        const click = e.composedPath().includes(modalForm);
        if(!click){
            modalWindow.remove();
        }
    });

    saveNotesButton.addEventListener('click',function(){
        let ObjectForm = {
            //PrevObject: notesPreview.outerHTML,
            titleObject: titleNotes.value,
            bodyObject: bodyNotes.value,
        };
        if(note){
            onUpdate(ObjectForm);

        }else{
            
            id = generateKey();
            main.appendChild(createNotesBlock(ObjectForm, id));
    
            
            
        }

        localStorage.setItem(id, JSON.stringify(ObjectForm));
        modalWindow.remove();
    });

}


for(let i = 0; i < localStorage.length; i++){
    const key = localStorage.key(i);

    if(key.startsWith('TitleNotes_')){
        const preview = JSON.parse(localStorage.getItem(key));
        
        main.appendChild(createNotesBlock(preview, key));
        //main.innerHTML += preview.PrevObject;
    }
    
}

