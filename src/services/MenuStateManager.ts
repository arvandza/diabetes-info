import type { IMenuState, MenuToggleEvent } from '../types/NavbarInterfaces';

// Single Responsibility Principle - Only manages menu state
export class MenuStateManager implements IMenuState {
    private _isOpen: boolean = false;
    private listeners: ((event: MenuToggleEvent) => void)[] = [];

    get isOpen(): boolean {
        return this._isOpen;
    }

    toggle(): void {
        this._isOpen = !this._isOpen;
        this.notifyListeners();
    }

    close(): void {
        if (this._isOpen) {
            this._isOpen = false;
            this.notifyListeners();
        }
    }

    open(): void {
        if (!this._isOpen) {
            this._isOpen = true;
            this.notifyListeners();
        }
    }

    // Observer pattern for state changes
    addListener(callback: (event: MenuToggleEvent) => void): void {
        this.listeners.push(callback);
    }

    removeListener(callback: (event: MenuToggleEvent) => void): void {
        this.listeners = this.listeners.filter(listener => listener !== callback);
    }

    private notifyListeners(): void {
        const event: MenuToggleEvent = {
            isOpen: this._isOpen,
            timestamp: Date.now()
        };
        
        this.listeners.forEach(listener => listener(event));
    }

    // Cleanup method
    destroy(): void {
        this.listeners = [];
        this._isOpen = false;
    }
}
