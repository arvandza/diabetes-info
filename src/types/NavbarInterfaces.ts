import type { NavItem } from './Nav';

// Interface Segregation Principle - Small, focused interfaces
export interface INavbarProps {
    brandName: string;
    items: NavItem[];
    className?: string;
}

export interface IMenuState {
    isOpen: boolean;
    toggle(): void;
    close(): void;
    open(): void;
}

export interface IResponsiveHandler {
    isMobile(): boolean;
    isDesktop(): boolean;
    onResize(callback: () => void): void;
    removeResizeListener(callback: () => void): void;
}

export interface INavigationService {
    navigateTo(href: string): void;
    isCurrentPage(href: string): boolean;
    getActiveItem(items: NavItem[]): NavItem | null;
}

export interface IMenuRenderer {
    render(items: NavItem[]): string;
}

// Event interfaces for better type safety
export interface MenuToggleEvent {
    isOpen: boolean;
    timestamp: number;
}

export interface NavigationEvent {
    href: string;
    text: string;
    timestamp: number;
}

// Configuration interfaces
export interface NavbarConfig {
    breakpoint: number;
    animationDuration: number;
    closeOnNavigate: boolean;
    enableKeyboardNavigation: boolean;
}

export interface NavbarTheme {
    primaryColor: string;
    textColor: string;
    hoverColor: string;
    backgroundColor: string;
    transitionSpeed: string;
}
