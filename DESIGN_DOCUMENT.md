
# TradeRails Platform - Design Document

## Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture Overview](#architecture-overview)
3. [Component Structure](#component-structure)
4. [Design System](#design-system)
5. [User Flow & Navigation](#user-flow--navigation)
6. [State Management](#state-management)
7. [Authentication & Authorization](#authentication--authorization)
8. [Responsive Design](#responsive-design)
9. [Performance Considerations](#performance-considerations)
10. [Future Enhancements](#future-enhancements)

---

## Project Overview

### Mission Statement
TradeRails is a premium B2B stone trading platform that serves as "The Invisible Rails of Global Commerce" for the stone industry. The platform connects exporters, buyers, agents, and traders in a secure, transparent marketplace.

### Core Value Propositions
- **Secure Escrow System**: Protected transactions with insurance coverage
- **AR Visualization**: 3D stone slab preview technology
- **Global Network**: Verified suppliers and buyers worldwide
- **Role-Based Access**: Specialized dashboards for different user types
- **Comprehensive Workflow**: End-to-end trading process management

### Target Users
1. **Exporters**: Stone suppliers managing inventory and creating quotes
2. **Buyers**: Companies sourcing stone materials globally
3. **Agents**: Representatives facilitating buyer transactions
4. **Traders**: Multi-role participants in stone commerce
5. **Administrators**: Platform managers overseeing operations

---

## Architecture Overview

### Technology Stack
- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Shadcn/UI library for consistent components
- **Icons**: Lucide React for scalable vector icons
- **State Management**: React hooks and context (no external state library)
- **Routing**: React Router DOM for navigation

### Project Structure
```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Base UI components (buttons, cards, etc.)
│   ├── admin/           # Admin-specific components
│   ├── buyer/           # Buyer dashboard components
│   ├── exporter/        # Exporter dashboard components
│   ├── trader/          # Trader dashboard components
│   ├── agent/           # Agent dashboard components
│   ├── quotes/          # Quote creation workflow
│   ├── onboarding/      # User onboarding flow
│   └── invite/          # User invitation system
├── pages/               # Top-level page components
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
└── types/               # TypeScript type definitions
```

---

## Component Structure

### Core Components Hierarchy

#### 1. Application Shell
```
Index.tsx (Main App Container)
├── Header.tsx (Navigation & User Controls)
├── Main Content (Conditional Rendering)
│   ├── HeroSection.tsx
│   ├── TrustSection.tsx
│   ├── FeaturesSection.tsx
│   ├── MarketplacePreview.tsx
│   └── Role-specific Dashboards
└── Footer (Integrated in Index.tsx)
```

#### 2. Dashboard Components
```
ExporterDashboard/
├── DashboardHeader.tsx
├── QuickActionsPanel.tsx
├── SlabInventory.tsx
├── MyQuotes.tsx
├── BuyerInquiries.tsx
├── ShipmentTracker.tsx
├── PayoutSummary.tsx
└── CompliancePanel.tsx

BuyerDashboard/
├── BuyerSummaryCards.tsx
├── RecentOrders.tsx
├── QuotesList.tsx
├── SlabBookmarks.tsx
├── AssignedAgents.tsx
├── LocationMap.tsx
└── TrustBadges.tsx
```

#### 3. Quote Creation Flow
```
QuoteCreationFlow.tsx
├── QuoteProvider.tsx (Context)
├── steps/
│   ├── BuyerSelectionStep.tsx
│   ├── SlabSelectionStep.tsx
│   ├── PricingTermsStep.tsx
│   ├── FinanceOptionsStep.tsx
│   └── ReviewSendStep.tsx
└── QuoteSentConfirmation.tsx
```

### Component Design Principles

1. **Single Responsibility**: Each component has one clear purpose
2. **Composition over Inheritance**: Components built through composition
3. **Props Interface**: TypeScript interfaces for all component props
4. **Reusability**: Common patterns extracted into reusable components
5. **Accessibility**: ARIA labels and keyboard navigation support
6. **Performance**: Lazy loading and memo optimization where appropriate

---

## Design System

### Color Palette
```css
/* Primary Colors */
--emerald-50: #ecfdf5;
--emerald-500: #10b981;
--emerald-600: #059669;

/* Neutral Colors */
--stone-50: #fafaf9;
--stone-100: #f5f5f4;
--stone-600: #57534e;
--stone-900: #1c1917;

/* Supporting Colors */
--slate-900: #0f172a;
--sage-500: #22c55e;
```

### Typography Scale
- **Headings**: Sora font family (300-800 weights)
- **Body Text**: Inter font family (primary text)
- **Scale**: Responsive typography using Tailwind's text-* classes

### Spacing System
- **Base Unit**: 4px (0.25rem)
- **Component Spacing**: 16px, 24px, 32px
- **Layout Spacing**: 48px, 64px, 96px

### Component Variants
```typescript
// Button Variants
primary: "emerald-gradient text-white"
outline: "border-2 border-stone-300 hover:border-emerald-500"
ghost: "hover:bg-stone-100"

// Card Variants
glass-panel: "bg-white/80 backdrop-blur-sm"
elevated: "shadow-xl border-0"
```

---

## User Flow & Navigation

### Primary Navigation Paths

#### 1. Anonymous User Journey
```
Landing Page → Browse Marketplace → Login/Register → Onboarding → Dashboard
```

#### 2. Authenticated User Flows
```
Dashboard → Create Quote → Select Buyer → Choose Slabs → Set Pricing → Send Quote
Dashboard → Browse Marketplace → View Slab Details → Contact Supplier
Dashboard → Manage Inventory → Add New Slabs → Update Pricing
```

### Navigation State Management
- **Current View**: Single state variable managing primary navigation
- **Authentication State**: User login status and role information
- **Modal State**: Login, onboarding, and other overlay states
          
          
### Breadcrumb Strategy
- **Contextual Navigation**: Clear indication of current location
- **Back Button Functionality**: Consistent navigation patterns
- **Progress Indicators**: Multi-step processes show progress

---

## State Management

### Application State Structure
```typescript
// Main Application State
interface AppState {
  currentView: ViewType;
  isLoginModalOpen: boolean;
  userType: UserType | null;
  isLoggedIn: boolean;
}

// Quote Creation State (Context)
interface QuoteState {
  selectedBuyer: Buyer | null;
  selectedSlabs: Slab[];
  pricingTerms: PricingTerms;
  financeOptions: FinanceOptions;
}
```

### State Management Patterns

#### 1. Component-Level State
- **Local UI State**: Form inputs, modal visibility, loading states
- **React Hooks**: useState, useEffect for component lifecycle

#### 2. Shared State (Context)
- **Quote Creation**: Multi-step form data persistence
- **User Authentication**: Login status across components

#### 3. Prop Drilling Mitigation
- **Callback Props**: Event handlers passed down component tree
- **Context API**: Shared state for related component groups

---

## Authentication & Authorization

### User Roles & Permissions
```typescript
type UserRole = 'buyer' | 'exporter' | 'agent' | 'trader' | 'admin';

// Role-based feature access
const permissions = {
  buyer: ['browse', 'request_quotes', 'manage_orders'],
  exporter: ['manage_inventory', 'create_quotes', 'view_analytics'],
  agent: ['represent_buyers', 'negotiate_deals', 'track_orders'],
  trader: ['multi_role_access', 'advanced_analytics'],
  admin: ['platform_management', 'user_oversight', 'dispute_resolution']
};
```

### Authentication Flow
1. **Login Modal**: Centralized authentication interface
2. **Role Selection**: User chooses their primary role
3. **Dashboard Redirect**: Automatic navigation to role-specific dashboard
4. **Session Management**: Persistent login state

### Authorization Patterns
- **Route Protection**: Dashboard access requires authentication
- **Feature Gating**: Role-based component rendering
- **UI Adaptation**: Interface changes based on user permissions

---

## Responsive Design

### Breakpoint Strategy
```css
/* Mobile First Approach */
sm: 640px   /* Small devices */
md: 768px   /* Medium devices */
lg: 1024px  /* Large devices */
xl: 1280px  /* Extra large devices */
```

### Mobile-First Implementation
- **Base Styles**: Optimized for mobile devices
- **Progressive Enhancement**: Desktop features layered on top
- **Touch Optimization**: Larger tap targets, gesture support

### Responsive Patterns
```typescript
// Navigation: Hamburger menu on mobile, horizontal on desktop
<nav className="hidden md:flex items-center space-x-8">

// Layout: Stacked on mobile, grid on desktop
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">

// Typography: Small text on mobile, larger on desktop
<h1 className="text-3xl md:text-4xl lg:text-5xl">
```

---

## Performance Considerations

### Code Splitting Strategy
- **Route-based Splitting**: Separate bundles for different views
- **Component Lazy Loading**: Heavy components loaded on demand
- **Dynamic Imports**: Feature-based code splitting

### Optimization Techniques
1. **Image Optimization**: WebP format, responsive images
2. **Bundle Analysis**: Regular monitoring of bundle size
3. **Tree Shaking**: Unused code elimination
4. **Memoization**: React.memo for expensive components

### Loading States
- **Skeleton Screens**: Placeholder content during loading
- **Progressive Loading**: Critical content first
- **Error Boundaries**: Graceful error handling

---

## Future Enhancements

### Planned Features
1. **Real-time Notifications**: WebSocket integration for live updates
2. **Advanced Search**: Elasticsearch integration for complex queries
3. **Mobile App**: React Native implementation
4. **Offline Support**: Service worker and local storage
5. **Internationalization**: Multi-language support

### Technical Improvements
1. **State Management**: Consider Redux Toolkit for complex state
2. **Testing**: Comprehensive test suite (Jest, Testing Library)
3. **Documentation**: Storybook for component documentation
4. **Monitoring**: Error tracking and analytics integration

### Scalability Considerations
- **Component Library**: Extract reusable components to separate package
- **Micro-frontends**: Module federation for large-scale applications
- **API Integration**: GraphQL adoption for efficient data fetching
- **Performance Monitoring**: Real user monitoring implementation

---

## Conclusion

The TradeRails platform represents a modern, scalable approach to B2B stone trading. The component-based architecture, combined with thoughtful state management and responsive design, creates a robust foundation for future growth and feature expansion.

The design system ensures consistency across all user interfaces while the role-based architecture provides appropriate experiences for different user types. The platform's focus on security, visualization, and global connectivity positions it as a leader in the digital transformation of the stone trading industry.

---

*This document serves as a living guide for the TradeRails platform development and should be updated as the application evolves.*
