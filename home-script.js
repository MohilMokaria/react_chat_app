document.addEventListener("DOMContentLoaded", function () {
    var userName = document.querySelectorAll(".user-name");
    var maxLength = 24;

    userName.forEach(function (snapshot) {
        var text = snapshot.textContent;
        if (text.length > maxLength) {
            snapshot.textContent = text.slice(0, maxLength) + "...";
        }
    });
});

const deleteBtn = document.getElementsByClassName("my-delete-button");

deleteBtn[0].addEventListener("click", () => {
    confirm("Are you Sure?")
});

document.getElementsByClassName("my-close-button")[0].addEventListener("click", () => {
    const leftSectionDisplay = document.getElementsByClassName("section-left")[0];
    const rightSectionDisplay = document.getElementsByClassName("section-right")[0];
    if (window.innerWidth <= 768) {
        leftSectionDisplay.style.display = "block";
        rightSectionDisplay.style.display = "none";
    }
    document.getElementsByClassName("my-chat-section")[0].style.display = "none";
    document.getElementsByClassName("chat-empty-message")[0].style.display = "block";
});

// Add event listener to the element with class "chat"
document.getElementsByClassName("chat")[1].addEventListener("click", () => {
    // Toggle the visibility of sections based on the current state
    const leftSectionDisplay = document.getElementsByClassName("section-left")[0];
    const rightSectionDisplay = document.getElementsByClassName("section-right")[0];

    if (window.innerWidth <= 768) {
        leftSectionDisplay.style.display = "none";
        rightSectionDisplay.style.display = "block";
        rightSectionDisplay.style.width = "100%";
        rightSectionDisplay.style.marginTop = "10px";
    }
    document.getElementsByClassName("chat-empty-message")[0].style.display = "none";
    document.getElementsByClassName("my-chat-section")[0].style.display = "block";

    openChat();
});


const messages = [
    { who: "me", message: "Hey there!" },
    { who: "other", message: "Hi! How are you?" },
    { who: "me", message: "I'm doing well, thanks. Just relaxing at home." },
    { who: "other", message: "Nice. Anything exciting happening today?" },
    { who: "me", message: "Not really. Just catching up on some reading." },
    { who: "other", message: "What book are you reading?" },
    { who: "me", message: "I'm reading 'The Great Gatsby'. It's a classic." },
    { who: "other", message: "Oh, I love that book. Have you read it before?" },
    { who: "me", message: "No, it's my first time. I'm really enjoying it so far." },
    { who: "other", message: "That's great. It's a timeless story with memorable characters." },
    { who: "me", message: "Definitely. The writing style is beautiful too." },
    { who: "other", message: "Absolutely. So, what else do you enjoy besides reading?" },
    { who: "me", message: "I like going for long walks and exploring new places." },
    { who: "other", message: "That sounds like a wonderful way to spend your time." },
    { who: "me", message: "It is. Nature has a way of rejuvenating the soul." },
    { who: "other", message: "I completely agree. I love spending time outdoors too." },
    { who: "me", message: "It's refreshing to disconnect from technology for a while." },
    { who: "other", message: "Absolutely. Sometimes we all need a break from screens." },
    { who: "me", message: "So true. Anyway, what are your plans for the weekend?" },
    { who: "other", message: "I'm thinking of going camping with some friends. How about you?" },
    { who: "me", message: "That sounds like fun. I might visit a museum or two." },
    { who: "other", message: "Nice! I hope you have a great time." },
    { who: "me", message: "Thanks! You too." },
    { who: "other", message: "Thanks, talk to you later!" },
    { who: "me", message: "Sure, take care!" }
];

function openChat() {
    const chatBox = document.querySelector('.chat-box');
    chatBox.scrollTop = chatBox.scrollHeight;
}

function displayMessages() {
    const chatBox = document.querySelector(".chat-box");

    chatBox.innerHTML = "";

    messages.forEach(msg => {
        const chatMessage = document.createElement("div");
        chatMessage.classList.add("message", msg.who);
        chatMessage.textContent = msg.message;
        chatBox.appendChild(chatMessage);
    });
}

displayMessages();