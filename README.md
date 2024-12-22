# Message Injector

**Message Injector** is a lightweight JavaScript library designed for effortlessly injecting success, error, and warning message components into your web applications. With built-in animations for message appearance and dismissal, it provides an engaging user experience.

## Installation

To install Message Injector, use npm:

```bash
npm install message-injector
```
or if you prefer other package managers:

```bash
<package-manager> add message-injector
```
where <package-manager> is one of the following: pnpm, bun, etc.

## Usage

### Basic Usage
Here's how to use Message Injector in your project:

```javascript
import { MessageComponent } from 'msginjector';

// Display a success message
new MessageComponent('success', 'Operation completed successfully!', '#message-container').display();

// Display an error message
new MessageComponent('error', 'An error occurred!', '.error-messages', 'prepend').display();

// Display a warning message
new MessageComponent('warning', 'Please be careful!', '#warning-area').display();

// Display a message with a timeout
new MessageComponent('success', 'Operation completed successfully!', '#message-container', 'append', 5000).display();
```

### HTML Setup

To use Message Injector, you need to set up the HTML structure for the messages. Here's an example:

```html
<div id="message-container"></div>
<div class="error-messages"></div>
<div id="warning-area"></div>
```

## API

### Constructor:

```javascript
new MessageComponent(type, message, targetSelector, [position = 'append'], [timeout = 3000])
```

- **type**: 'success', 'error', or 'warning'.
- **message**: The text content of the message.
- **targetSelector**: CSS selector for where to inject the message (ID or class).
- **position**: Optional. Can be 'append' (default) or 'prepend'.
- **timeout**: Optional. Time in milliseconds for auto-dismissal.

### Methods

- **display()**: Displays the message component.

### Features

- **Animations**: Messages fade in and slide down on display, and fade out and slide up on dismissal.
- **Customizable**: Easily adjust the type of message and its placement.
- **Dismissal**: Each message comes with a close button for user removal.

## Contribute

Feel free to contribute to this project by forking the repository and submitting pull requests. Here are some ways you can contribute:

- Add new features or improve existing ones.
- Fix bugs or improve documentation.
- Share ideas for enhancements.

## License

This project is open-sourced under the MIT License - see the LICENSE file for details.
