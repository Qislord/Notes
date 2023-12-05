function showCreateModal() {
  const modalContainer = document.createElement("div");
  modalContainer.className = "modalContainer";
  const modal = document.createElement("form");

  const name = document.createElement("input");
  name.placeholder = "Имя заметки";
  name.required = true;
  modal.appendChild(name);

  const content = document.createElement("textarea");
  content.rows = 6;
  content.required = true;
  modal.appendChild(content);

  const submit = document.createElement("button");
  submit.textContent = "сохранить";
  submit.type = "submit";
  modal.appendChild(submit);

  modal.className = "modal";
  modalContainer.appendChild(modal);
  document.body.appendChild(modalContainer);

  modal.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log(name.value);
    console.log(content.value);
    var note = { name: name.value, discription: content.value };
    var notes = readNotes();
    notes.push(note);
    notes_block.appendChild(createNoteBlock(note));
    localStorage.setItem("notes", JSON.stringify(notes));
    modalContainer.remove();
  });
  modalContainer.addEventListener("click", (event) => {
    if (event.target !== modalContainer) return;
    modalContainer.remove();
  });
}

function readNotes() {
  const rawNotes = localStorage.getItem("notes");
  if (!rawNotes) {
    localStorage.setItem("notes", "[]");
    return [];
  }
  return JSON.parse(rawNotes);
}
function loadNotes() {
  const notes = readNotes();
  for (const note_index in notes) {
    const note = notes[note_index];

    notes_block.appendChild(createNoteBlock(note));
  }
}
function createNoteBlock(note) {
  const noteBlock = document.createElement("div");
  const name = document.createElement("div");
  const discription = document.createElement("div");
  name.className = "noteName";
  discription.className = "noteDiscription";
  noteBlock.className = "note";
  name.innerText = note.name;
  discription.innerText = note.discription;
  noteBlock.appendChild(name);
  noteBlock.appendChild(discription);
  return noteBlock;
}
