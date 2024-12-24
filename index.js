"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// CSS classes for better maintenance and separation of concerns
var styles = "\n.hello-world {\n    color: red;\n}\n\n.message-component {\n    padding: 10px;\n    margin: 10px 0;\n    border-radius: 5px;\n    position: relative;\n    opacity: 0;\n    transform: translateY(-20px);\n    transition: all 0.3s ease-in-out;\n}\n\n.message-component.success {\n    background-color: #4CAF50;\n    color: #fff;\n}\n\n.message-component.error {\n    background-color: #F44336;\n    color: #fff;\n}\n\n.message-component.warning {\n    background-color: #FFEB3B;\n    color: #000;\n}\n\n.message-component.visible {\n    opacity: 1;\n    transform: translateY(0);\n}\n\n.message-component .close-button {\n    position: absolute;\n    top: 5px;\n    right: 10px;\n    cursor: pointer;\n    font-size: 20px;\n}";
// Append styles to the document
var styleSheet = document.createElement("style");
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);
var MessageComponent = /** @class */ (function () {
    function MessageComponent(type, message, targetSelector, position, timeout, icon, title) {
        if (position === void 0) { position = 'append'; }
        if (timeout === void 0) { timeout = 0; }
        if (icon === void 0) { icon = null; }
        if (title === void 0) { title = null; }
        this.autoDismissTimeout = null;
        this.type = type;
        this.message = message;
        this.targetSelector = targetSelector;
        this.position = position;
        this.timeout = timeout; // Time in milliseconds for auto-dismissal
        this.icon = icon; // Use provided icon or default to type icon
        this.title =
            title || this.type.charAt(0).toUpperCase() + this.type.slice(1); // Use provided title or default to type
    }
    MessageComponent.prototype.createElement = function () {
        var _this = this;
        var div = document.createElement("div");
        div.className = "message-component ".concat(this.type);
        // Message content
        div.innerHTML = "<strong>".concat(this.icon || "", " ").concat(this.title, "</strong><br/> ").concat(this.message);
        // Close button
        var closeButton = document.createElement("span");
        closeButton.innerHTML = "×";
        closeButton.className = "close-button";
        closeButton.setAttribute("aria-label", "Close");
        closeButton.setAttribute("role", "button");
        closeButton.onclick = function () {
            _this.dismissMessage(div);
        };
        div.appendChild(closeButton);
        // Trigger fade-in and slide-down animation
        setTimeout(function () {
            div.classList.add("visible");
        }, 50);
        return div;
    };
    MessageComponent.prototype.appendOrPrepend = function (element) {
        var target = document.querySelector(this.targetSelector);
        if (!target) {
            console.error("Target element not found");
            return;
        }
        if (this.position === "append") {
            target.appendChild(element);
        }
        else {
            target.insertBefore(element, target.firstChild);
        }
    };
    MessageComponent.prototype.display = function () {
        var _this = this;
        var messageElement = this.createElement();
        this.appendOrPrepend(messageElement);
        // Set timeout for auto-dismissal only if timeout is greater than 0
        if (this.timeout > 0) {
            console.log("Setting timeout for auto-dismissal");
            this.autoDismissTimeout = setTimeout(function () {
                _this.dismissMessage(messageElement);
            }, this.timeout);
        }
        else {
            console.log("No timeout set for auto-dismissal");
        }
    };
    MessageComponent.prototype.dismissMessage = function (element) {
        element.classList.remove("visible");
        if (this.autoDismissTimeout) {
            clearTimeout(this.autoDismissTimeout); // Clear the timeout if the message is manually dismissed
        }
        setTimeout(function () {
            if (element.parentNode) {
                element.parentNode.removeChild(element);
            }
        }, 300); // Wait for animation to complete before removing
    };
    return MessageComponent;
}());
exports.default = MessageComponent;
