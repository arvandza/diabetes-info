import type { IResponsiveHandler, NavbarConfig } from '../types/NavbarInterfaces';

// Single Responsibility Principle - Only handles responsive behavior
export class ResponsiveHandler implements IResponsiveHandler {
    private config: NavbarConfig;
    private resizeCallbacks: (() => void)[] = [];
    private resizeTimeout: number | null = null;

    constructor(config: NavbarConfig) {
        this.config = config;
        this.initializeResizeListener();
    }

    isMobile(): boolean {
        return window.innerWidth < this.config.breakpoint;
    }

    isDesktop(): boolean {
        return window.innerWidth >= this.config.breakpoint;
    }

    onResize(callback: () => void): void {
        this.resizeCallbacks.push(callback);
    }

    removeResizeListener(callback: () => void): void {
        this.resizeCallbacks = this.resizeCallbacks.filter(cb => cb !== callback);
    }

    private initializeResizeListener(): void {
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    private handleResize(): void {
        // Debounce resize events for better performance
        if (this.resizeTimeout) {
            clearTimeout(this.resizeTimeout);
        }

        this.resizeTimeout = window.setTimeout(() => {
            this.resizeCallbacks.forEach(callback => callback());
        }, 100);
    }

    // Get current breakpoint info
    getCurrentBreakpoint(): { name: string; width: number } {
        const width = window.innerWidth;
        
        if (width < 576) return { name: 'xs', width };
        if (width < 768) return { name: 'sm', width };
        if (width < 992) return { name: 'md', width };
        if (width < 1200) return { name: 'lg', width };
        return { name: 'xl', width };
    }

    // Check if device supports touch
    isTouchDevice(): boolean {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }

    // Cleanup method
    destroy(): void {
        if (this.resizeTimeout) {
            clearTimeout(this.resizeTimeout);
        }
        window.removeEventListener('resize', this.handleResize.bind(this));
        this.resizeCallbacks = [];
    }
}
