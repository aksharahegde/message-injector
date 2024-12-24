// CSS classes for better maintenance and separation of concerns
const styles = `
.message-component {
    padding: 10px;
    margin: 10px 0;
    border-radius: 5px;
    position: relative;
    opacity: 0;
    transform: translateY(-20px);
    transition: all 0.3s ease-in-out;
}

.message-component.success {
    background-color: #4CAF50;
    color: #fff;
}

.message-component.error {
    background-color: #F44336;
    color: #fff;
}

.message-component.warning {
    background-color: #FFEB3B;
    color: #000;
}

.message-component.visible {
    opacity: 1;
    transform: translateY(0);
}

.message-component .close-button {
    position: absolute;
    top: 5px;
    right: 10px;
    cursor: pointer;
    font-size: 20px;
}
`;

// Append styles to the document (you might want to put this in a separate CSS file for better practice)
const styleSheet = document.createElement("style");
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

class MessageComponent {
  constructor(
    type,
    message,
    targetSelector,
    position = "append",
    timeout = 3000
  ) {
    this.type = type;
    this.message = message;
    this.targetSelector = targetSelector;
    this.position = position;
    this.timeout = timeout; // Time in milliseconds for auto-dismissal
    this.icons = {
      success: "✓",
      error: "✗",
      warning: "!",
    };
  }

  createElement() {
    const div = document.createElement("div");
    div.className = `message-component ${this.type}`;

    // Message content
    div.innerHTML = `<strong>${this.icons[this.type]} ${
      this.type.charAt(0).toUpperCase() + this.type.slice(1)
    }:</strong> ${this.message}`;

    // Close button
    const closeButton = document.createElement("span");
    closeButton.innerHTML = "×";
    closeButton.className = "close-button";
    closeButton.setAttribute("aria-label", "Close");
    closeButton.setAttribute("role", "button");
    closeButton.onclick = () => {
      this.dismissMessage(div);
    };

    div.appendChild(closeButton);

    // Trigger fade-in and slide-down animation
    setTimeout(() => {
      div.classList.add("visible");
    }, 50);

    return div;
  }

  appendOrPrepend(element) {
    const target = document.querySelector(this.targetSelector);
    if (!target) {
      console.error("Target element not found");
      return;
    }

    if (this.position === "append") {
      target.appendChild(element);
    } else {
      target.insertBefore(element, target.firstChild);
    }
  }

  display() {
    const messageElement = this.createElement();
    this.appendOrPrepend(messageElement);

    // Set timeout for auto-dismissal
    this.autoDismissTimeout = setTimeout(() => {
      this.dismissMessage(messageElement);
    }, this.timeout);
  }

  dismissMessage(element) {
    element.classList.remove("visible");
    clearTimeout(this.autoDismissTimeout); // Clear the timeout if the message is manually dismissed
    setTimeout(() => {
      if (element.parentNode) {
        element.parentNode.removeChild(element);
      }
    }, 300); // Wait for animation to complete before removing
  }
}

export default MessageComponent;
