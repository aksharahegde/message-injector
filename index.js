class MessageComponent {
  constructor(type, message, targetSelector, position = "append") {
    this.type = type;
    this.message = message;
    this.targetSelector = targetSelector;
    this.position = position;
    this.icons = {
      success: "✓",
      error: "✗",
      warning: "!",
    };
    this.colors = {
      success: "#4CAF50",
      error: "#F44336",
      warning: "#FFEB3B",
    };
  }

  createElement() {
    const div = document.createElement("div");
    div.className = `message-component ${this.type}`;
    div.style.backgroundColor = this.colors[this.type];
    div.style.color = this.type === "warning" ? "#000" : "#fff";
    div.style.padding = "10px";
    div.style.margin = "10px 0";
    div.style.borderRadius = "5px";
    div.style.position = "relative";
    div.style.opacity = "0"; // Start with 0 opacity for fade-in effect
    div.style.transform = "translateY(-20px)"; // Slide from above
    div.style.transition = "all 0.3s ease-in-out"; // Transition for smooth animations

    // Message content
    div.innerHTML = `<strong>${this.icons[this.type]} ${
      this.type.charAt(0).toUpperCase() + this.type.slice(1)
    }:</strong> ${this.message}`;

    // Close button
    const closeButton = document.createElement("span");
    closeButton.innerHTML = "×";
    closeButton.style.position = "absolute";
    closeButton.style.top = "5px";
    closeButton.style.right = "10px";
    closeButton.style.cursor = "pointer";
    closeButton.style.fontSize = "20px";
    closeButton.style.color = this.type === "warning" ? "#000" : "#fff";
    closeButton.onclick = () => {
      div.style.opacity = "0";
      div.style.transform = "translateY(-20px)"; // Slide up for dismissal
      setTimeout(() => div.remove(), 300); // Wait for animation to complete before removing
    };

    div.appendChild(closeButton);

    // Trigger fade-in and slide-down animation
    setTimeout(() => {
      div.style.opacity = "1";
      div.style.transform = "translateY(0)";
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
  }
}

export default MessageComponent;
