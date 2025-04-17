// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBh6AclkKX9by4HRpr7yS8snEpzMdCPzsI",
  authDomain: "tempcord-741a4.firebaseapp.com",
  databaseURL: "https://tempcord-741a4-default-rtdb.firebaseio.com",
  projectId: "tempcord-741a4",
  storageBucket: "tempcord-741a4.appspot.com",
  messagingSenderId: "707603521492",
  appId: "1:707603521492:web:3b61fb093ccb02872a4041"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const messagesRef = db.ref("messages");

const chatBox = document.getElementById("chat-box");
const messageForm = document.getElementById("message-form");
const messageInput = document.getElementById("message");

// This should be set dynamically later
let username = localStorage.getItem("username") || "Anonymous";
let avatar = localStorage.getItem("avatar") || "default.jpg";

// Send message
messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = messageInput.value.trim();
  if (text !== "") {
    messagesRef.push({
      username,
      avatar,
      text,
      timestamp: Date.now()
    });
    messageInput.value = "";
  }
});

// Listen for new messages
messagesRef.limitToLast(100).on("child_added", (snapshot) => {
  const msg = snapshot.val();
  const msgDiv = document.createElement("div");
  msgDiv.className = "message";
  msgDiv.innerHTML = `
    <img src="${msg.avatar}" class="avatar" alt="avatar" />
    <div class="message-content">
      <strong>${msg.username}</strong>: ${msg.text}
    </div>
  `;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
});
