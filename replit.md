# Virtual Bazar - Bangladeshi Taka Currency Exchange

## Overview

Virtual Bazar is a currency exchange platform focused on Bangladeshi Taka (BDT) conversions. The application provides real-time currency calculations for BDT exchanges with USD, INR, and PKR, featuring a clean web interface with fixed exchange rates for consistent pricing. The platform is designed as a single-page application with sections for currency calculation, rate displays, and contact information.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Single-page Application (SPA)**: Built with vanilla HTML, CSS, and JavaScript
- **Responsive Design**: Mobile-first approach using CSS Grid and Flexbox
- **Component Structure**: Modular sections including header navigation, hero section, calculator widget, rates display, and contact form
- **Animation Framework**: Custom CSS animations with scroll-triggered effects for enhanced user experience
- **Typography**: Inter font family from Google Fonts for modern, clean text rendering

### User Interface Design
- **Design Pattern**: Modern gradient-based UI with purple/blue color scheme
- **Navigation**: Fixed header with smooth scrolling navigation between sections
- **Interactive Elements**: Currency calculator with real-time conversion, swap functionality for currency pairs
- **Visual Feedback**: Animated counters, hover effects, and transition animations

### Data Management
- **Exchange Rate System**: Fixed rate configuration stored in JavaScript constants
- **Supported Currencies**: BDT (Bangladeshi Taka), USD, INR (Indian Rupee), PKR (Pakistani Rupee)
- **Rate Structure**: Hardcoded exchange rates with specific conversion rules for each currency pair
- **Calculation Logic**: Bidirectional conversion support with inverse rate calculations

### Performance Optimizations
- **Asset Loading**: CDN delivery for Font Awesome icons and Google Fonts
- **Lightweight Architecture**: No framework dependencies, pure vanilla JavaScript implementation
- **Efficient DOM Manipulation**: Event-driven updates with minimal DOM queries

## External Dependencies

### Content Delivery Networks (CDNs)
- **Font Awesome 6.0.0**: Icon library for UI elements and visual indicators
- **Google Fonts**: Inter font family for consistent typography across the platform

### Browser APIs
- **DOM Manipulation**: Standard Web APIs for interactive functionality
- **Event Handling**: Native browser event system for user interactions
- **CSS Animations**: CSS3 transitions and transforms for smooth animations

### Development Tools
- **Static Hosting**: Designed for deployment on static web hosting platforms
- **No Build Process**: Direct browser compatibility without compilation requirements