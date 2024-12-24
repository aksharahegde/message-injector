// CSS classes for better maintenance and separation of concerns
const styles = `
.hello-world {
    color: red;
}

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
}`;

// Append styles to the document
const styleSheet = document.createElement("style");
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

type MessageType = 'success' | 'error' | 'warning';

class MessageComponent {
  private type: MessageType;
  private message: string;
  private targetSelector: string;
  private position: 'append' | 'prepend';
  private timeout: number;
  private icon: string | null;
  private title: string;
  private autoDismissTimeout: ReturnType<typeof setTimeout> | null = null;

  constructor(
    type: MessageType,
    message: string,
    targetSelector: string,
    position: 'append' | 'prepend' = 'append',
    timeout: number = 0,
    icon: string | null = null,
    title: string | null = null
  ) {
    this.type = type;
    this.message = message;
    this.targetSelector = targetSelector;
    this.position = position;
    this.timeout = timeout; // Time in milliseconds for auto-dismissal
    this.icon = icon; // Use provided icon or default to type icon
    this.title =
      title || this.type.charAt(0).toUpperCase() + this.type.slice(1); // Use provided title or default to type
  }

  createElement(): HTMLElement {
    const div = document.createElement("div");
    div.className = `message-component ${this.type}`;

    // Message content
    div.innerHTML = `<strong>${this.icon || ""} ${this.title}</strong><br/> ${this.message}`;

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

  appendOrPrepend(element: HTMLElement): void {
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

  display(): void {
    const messageElement = this.createElement();
    this.appendOrPrepend(messageElement);

    // Set timeout for auto-dismissal only if timeout is greater than 0
    if (this.timeout > 0) {
      console.log("Setting timeout for auto-dismissal");
      this.autoDismissTimeout = setTimeout(() => {
        this.dismissMessage(messageElement);
      }, this.timeout);
    } else {
      console.log("No timeout set for auto-dismissal");
    }
  }

  dismissMessage(element: HTMLElement): void {
    element.classList.remove("visible");
    if (this.autoDismissTimeout) {
      clearTimeout(this.autoDismissTimeout); // Clear the timeout if the message is manually dismissed
    }
    setTimeout(() => {
      if (element.parentNode) {
        element.parentNode.removeChild(element);
      }
    }, 300); // Wait for animation to complete before removing
  }
}

export default MessageComponent; 