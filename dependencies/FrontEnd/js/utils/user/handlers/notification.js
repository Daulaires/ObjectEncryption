
module.exports = {
    PushNotification: function (notifContents, message, color){
        // Push a notification to the user with the given message and color
        const notification = document.createElement('div');
        notification.style.color = color;
        // make the message fade in and out
        notification.style.animation = "fadeInOut 5s linear";
        notification.innerHTML = message;
        notification.classList.add('notification');
        notifContents.appendChild(notification);
        setTimeout(() => {
            notification.remove();
        }, 5000); 
    }
}