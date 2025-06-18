/// <reference types="astro/client" />

// Declare module types for Astro components
declare module "*.astro" {
  const Component: any;
  export default Component;
}

// Declare module types for TypeScript files
declare module "*.ts" {
  const content: any;
  export default content;
}

// Specific module declarations for our components
declare module "./definition/DefinitionContent.astro" {
  const Component: any;
  export default Component;
}

declare module "./definition/DefinitionImage.astro" {
  const Component: any;
  export default Component;
}

declare module "./hero/HeroContent.astro" {
  const Component: any;
  export default Component;
}

declare module "./navbar/NavBrand.astro" {
  const Component: any;
  export default Component;
}

declare module "./navbar/DesktopMenu.astro" {
  const Component: any;
  export default Component;
}

declare module "./navbar/MobileMenu.astro" {
  const Component: any;
  export default Component;
}

declare module "./navbar/HamburgerButton.astro" {
  const Component: any;
  export default Component;
}

declare module "../layouts/Layout.astro" {
  const Component: any;
  export default Component;
}

declare module "../components/DiabetesDefinition.astro" {
  const Component: any;
  export default Component;
}

declare module "../components/DiabetesTypes.astro" {
  const Component: any;
  export default Component;
}

declare module "../components/Navbar.astro" {
  const Component: any;
  export default Component;
}

declare module "../components/Hero.astro" {
  const Component: any;
  export default Component;
}

declare module "../types/NavbarInterfaces" {
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
}

declare module "../types/Nav" {
  export interface NavItem {
    href: string;
    text: string;
    icon?: string;
  }
}

// Global type declarations
interface Window {
  // Add any global window properties here if needed
}
