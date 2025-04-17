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

const user = localStorage.getItem("currentUser") || "Unknown";
const chatBox = document.getElementById("chatBox");
const chatForm = document.getElementById("chatForm");
const messageInput = document.getElementById("messageInput");

function addMessage(user, text) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message");

  const img = document.createElement("img");
  img.src = user === "BrolyWeed" ? "BrolyWeed.jpg" : "Cookychara.jpg";

  const span = document.createElement("span");
  span.textContent = `${user}: ${text}`;

  messageDiv.appendChild(img);
  messageDiv.appendChild(span);
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = messageInput.value.trim();
  if (text) {
    const newMessageRef = db.ref("messages").push();
    newMessageRef.set({
      user,
      text,
      timestamp: Date.now()
    });
    messageInput.value = "";
  }
});

db.ref("messages").on("child_added", (snapshot) => {
  const msg = snapshot.val();
  addMessage(msg.user, msg.text);
});
