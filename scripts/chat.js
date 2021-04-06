class ChatRoom {
  constructor(room) {
    this.username = localStorage.username ? localStorage.username : "anonymous";
    this.room = room;
    this.chats = db.collection("chats");
    this.unsub;
  }

  async addChat(message) {
    //Create a message object
    const new_message = {
      room: this.room,
      message,
      created_at: firebase.firestore.Timestamp.fromDate(new Date()),
      username: this.username,
    };
    //Save new chat
    const response = await this.chats.add(new_message);
    return response;
  }

  getChats(cb) {
    this.unsub = this.chats
      .where("room", "==", this.room)
      .orderBy("created_at")
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((changed_doc) => {
          if (changed_doc.type === "added") {
            //update the UI
            cb(changed_doc.doc.data());
          }
        });
      });
  }

  updateName(new_name) {
    this.username = new_name;
    localStorage.setItem("username", new_name);
    console.log("name updated.");
  }

  updateRoom(new_room) {
    this.room = new_room;
    console.log("room updated.");
    if (this.unsub) this.unsub();
  }
}

// For testing if the room jas been updated or not.
// setTimeout(() => {
//   chatroom.updateRoom("gaming");
//   chatroom.updateName("Yoshi");
//   chatroom.getChats((data) => console.log(data));
//   chatroom.addChat("Hellooo World.");
// }, 3000);
