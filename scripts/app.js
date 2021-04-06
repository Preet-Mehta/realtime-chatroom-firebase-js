//DOM handling
const chatList = document.querySelector(".chat-list");
const chatForm = document.querySelector(".new-chat");
const unameForm = document.querySelector(".new-name");
const updateMsg = document.querySelector(".update-message");
const chatRooms = document.querySelector(".chat-rooms");

// Event Listeners
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const new_message = e.target.message.value.trim();
  chatroom
    .addChat(new_message)
    .then(() => e.target.reset())
    .catch((err) => console.log(err));
});

unameForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const new_uname = e.target.name.value.trim();
  chatroom.updateName(new_uname);
  e.target.reset();
  updateMsg.innerHTML += `Your name was updated to <h3>${new_uname}</h3>`;
  setTimeout(() => {
    updateMsg.textContent = "";
  }, 3000);
});

chatRooms.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    chatUI.clearMessages();
    chatroom.updateRoom(e.target.id);
    chatroom.getChats((chat) => chatUI.renderMessages(chat));
  }
});

// Instances
const chatroom = new ChatRoom("general");
const chatUI = new ChatUI(chatList);

// Method calls
chatroom.getChats((data) => chatUI.Messages(data));
