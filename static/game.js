var socket = io();

//On new message system adds it unordered list
socket.on('message', (text) =>{
  writeEvent(text);
});

//Function to add list elements
const writeEvent = (text) => {
  const uList = document.querySelector('#events');

  const el = document.createElement('li');
  el.innerHTML = text;

  uList.appendChild(el);
};

const addChoiceListeners = () => {
  ['rock', 'paper', 'scissors'].forEach((id) => {
    const button = document.getElementById(id);
    button.addEventListener('click', () => {
      socket.emit('turn', id);
    });
  });


};

addChoiceListeners();
