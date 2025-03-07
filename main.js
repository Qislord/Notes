const main_block = document.getElementById('main_block') // Получаем главный блок куда буем все добавлять



const createButton = document.createElement('div'); // создаем кнопку создания заметок
const imgCreateButton = document.createElement('img');
imgCreateButton.src = "/img/create.png"
createButton.classList.add('create_button');
createButton.appendChild(imgCreateButton);
main_block.appendChild(createButton);


createButton.addEventListener('click',() =>{
    createModalWindow();
});



function createModalWindow(){ // Функция создания модального окна
    const overlay = document.createElement('div')
    const modalForm = document.createElement('div');
    const notesTitle = document.createElement('div');
    const notesText = document.createElement('div');
    const input = document.createElement('input');
    const textarea = document.createElement('textarea');
    const modalSaveButton = document.createElement('div');

    overlay.classList.add('overlay');
    modalForm.classList.add('modal_form');
    notesTitle.classList.add('notes_title');
    notesText.classList.add('notes_text');
    modalSaveButton.classList.add('modal_save_button');
    

    notesTitle.innerText = "Заголовок"
    notesText.innerText = "Описание"


    textarea.rows = 7;
    textarea.style.resize = 'none';
    textarea.placeholder = "Пример: Молоко, сыр, хлеб";
    input.placeholder = "Пример: Купить продукты";


    modalSaveButton.innerText = "Сохранить";

    overlay.addEventListener('click', (e) =>{
        if(e.target == overlay){
            overlay.remove();
        }
    });
    


    notesTitle.appendChild(input)
    notesText.appendChild(textarea)


    modalForm.appendChild(notesTitle);
    modalForm.appendChild(notesText);
    modalForm.appendChild(modalSaveButton);
    overlay.appendChild(modalForm);





    main_block.appendChild(overlay);

}