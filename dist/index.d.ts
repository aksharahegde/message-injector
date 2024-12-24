type MessageType = 'success' | 'error' | 'warning';
declare class MessageComponent {
    private type;
    private message;
    private targetSelector;
    private position;
    private timeout;
    private icon;
    private title;
    private autoDismissTimeout;
    constructor(type: MessageType, message: string, targetSelector: string, position?: 'append' | 'prepend', timeout?: number, icon?: string | null, title?: string | null);
    createElement(): HTMLElement;
    appendOrPrepend(element: HTMLElement): void;
    display(): void;
    dismissMessage(element: HTMLElement): void;
}
export default MessageComponent;
