class ChatUI {
  constructor(list) {
    this.list = list;
  }
  renderMessages(chat) {
    const when = dateFns.distanceInWordsToNow(chat.created_at.toDate(), {
      addSuffix: true,
    });
    const chatHtml = `
      <li class="list-group-item">
        <span class="username">${chat.username}</span>
        <span class="message">${chat.message}</span>
        <div class="time">${when}</div>
      </li>`;

    this.list.innerHTML += chatHtml;
  }
  clearMessages() {
    this.list.innerHTML = "";
  }
}
