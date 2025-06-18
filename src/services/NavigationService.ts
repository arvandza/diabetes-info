import type { INavigationService, NavigationEvent } from '../types/NavbarInterfaces';
import type { NavItem } from '../types/Nav';

// Single Responsibility Principle - Only handles navigation logic
export class NavigationService implements INavigationService {
    private listeners: ((event: NavigationEvent) => void)[] = [];

    navigateTo(href: string): void {
        // Handle different types of navigation
        if (href.startsWith('#')) {
            this.scrollToSection(href);
        } else if (href.startsWith('http') || href.startsWith('//')) {
            this.navigateExternal(href);
        } else {
            this.navigateInternal(href);
        }

        this.notifyNavigationListeners(href, '');
    }

    isCurrentPage(href: string): boolean {
        if (href.startsWith('#')) {
            return window.location.hash === href;
        }
        return window.location.pathname === href;
    }

    getActiveItem(items: NavItem[]): NavItem | null {
        return items.find(item => this.isCurrentPage(item.href)) || null;
    }

    // Add navigation event listener
    addNavigationListener(callback: (event: NavigationEvent) => void): void {
        this.listeners.push(callback);
    }

    removeNavigationListener(callback: (event: NavigationEvent) => void): void {
        this.listeners = this.listeners.filter(listener => listener !== callback);
    }

    private scrollToSection(href: string): void {
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Update URL hash without triggering page reload
            history.pushState(null, '', href);
        }
    }

    private navigateInternal(href: string): void {
        window.location.href = href;
    }

    private navigateExternal(href: string): void {
        window.open(href, '_blank', 'noopener,noreferrer');
    }

    private notifyNavigationListeners(href: string, text: string): void {
        const event: NavigationEvent = {
            href,
            text,
            timestamp: Date.now()
        };
        
        this.listeners.forEach(listener => listener(event));
    }

    // Get all sections for navigation highlighting
    getAllSections(): Element[] {
        return Array.from(document.querySelectorAll('[id]'));
    }

    // Get current visible section
    getCurrentSection(): string | null {
        const sections = this.getAllSections();
        const scrollPosition = window.scrollY + 100; // Offset for navbar height

        for (const section of sections) {
            const rect = section.getBoundingClientRect();
            const sectionTop = rect.top + window.scrollY;
            const sectionBottom = sectionTop + rect.height;

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                return `#${section.id}`;
            }
        }

        return null;
    }

    // Cleanup method
    destroy(): void {
        this.listeners = [];
    }
}
