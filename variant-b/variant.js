// ============================================================================
// Test Configuration
// ============================================================================
let testInfo = {
  name: `CF How It Works - Ramp Homepage: Add How It Works Section Below Hero`,
};

// Initialize test and exit if already running
let testInitiated = initTest(testInfo);
if (!testInitiated) return false;

// ============================================================================
// Main Execution
// ============================================================================
addStyling();
monitorChangesByConditionAndRun(checkForElements, onElementsFound);

// ============================================================================
// Main Functions
// ============================================================================

/**
 * Main function that inserts the How It Works section after hero
 */
function onElementsFound() {
  console.log(`Running Code for: `, testInfo.name, testInfo);
  document.querySelector(`body`)?.setAttribute(`cf-test-active`, testInfo.name);

  // Find hero section and walk up to find the outermost hero wrapper
  const heroSection = document.querySelector('#hero-section');
  if (!heroSection) {
    console.error('Hero section not found');
    return;
  }

  // Walk up the DOM tree to find the outermost hero container
  let heroRoot = heroSection;
  let parent = heroSection.parentElement;
  
  // Keep walking up until we find a sibling that isn't part of the hero
  // Look for the parent that contains the hero section and is followed by other main content
  while (parent && parent !== document.body && parent !== document.documentElement) {
    // Check if parent has the overflow-x-clip class which typically wraps the hero
    if (parent.classList.contains('overflow-x-clip') && parent.parentElement?.tagName === 'MAIN') {
      heroRoot = parent;
      break;
    }
    // Also check for other potential hero wrappers
    if (parent.parentElement?.tagName === 'MAIN' && parent.nextElementSibling) {
      heroRoot = parent;
      break;
    }
    parent = parent.parentElement;
  }

  console.log('Inserting How It Works section after hero root:', heroRoot);

  // Create and insert the How It Works section after the entire hero block
  const howItWorksSection = <HowItWorksSection />;
  heroRoot.parentElement?.insertBefore(howItWorksSection, heroRoot.nextSibling);

  // Emit variant rendered event - only after successful render
  window.CFQ = window.CFQ || [];
  window.CFQ.push({ emit: 'variantRendered' });
}

/**
 * Checks if required elements are present before running variant
 */
function checkForElements() {
  try {
    const cfDefined = typeof window.CF !== "undefined";
    const testActiveAbsent = !document.querySelector(`body[cf-test-active="${testInfo.name}"]`);
    const heroExists = !!document.querySelector('#hero-section');

    return cfDefined && testActiveAbsent && heroExists;
  } catch (e) {
    console.error("Check error:", e);
    return false;
  }
}

// ============================================================================
// React Components
// ============================================================================

/**
 * Main How It Works section component
 */
function HowItWorksSection() {
  return (
    <section
      className="cf:bg-white cf:py-16 cf:md:py-24 cf:lg:py-32 cf-how-it-works-section"
      data-testid="how-it-works-section"
    >
      <div className="cf:mx-auto cf:w-full cf:max-w-[1200px] cf:px-4 cf:md:px-8 cf:lg:px-16">
        {/* Section Header */}
        <SectionHeader />

        {/* Step Cards Grid - 3 columns on desktop */}
        <div className="cf:grid cf:grid-cols-1 cf:md:grid-cols-3 cf:gap-6 cf:mb-12 cf:list-none">
          <StepCard
            number="01"
            title="Connect your stack"
            description="Link your ERP and HRIS in minutes to get started with seamless data sync."
            icon={<ConnectIcon />}
          />
          <StepCard
            number="02"
            title="Set controls that enforce themselves"
            description="Pre-approve budgets, define spend limits, and create rules that work automatically."
            icon={<ConfigureIcon />}
          />
          <StepCard
            number="03"
            title="Automate the busywork"
            description="Receipts, expense reports, and coding happen automatically—no manual entry required."
            icon={<AutomateIcon />}
          />
        </div>

        {/* CTA Row */}
        <CTAButtons />
      </div>
    </section>
  );
}

/**
 * Section header with subtitle and title
 */
function SectionHeader() {
  return (
    <div className="cf:text-center cf:mb-12 cf:md:mb-16">
      <div className="cf:text-[11px] cf:tracking-[0.12em] cf:uppercase cf:text-[#1C1B17] cf:opacity-60 cf:mb-4">
        How it works
      </div>
      <h2 className="cf:text-[32px] cf:md:text-[48px] cf:leading-[1.05] cf:font-normal cf:-tracking-[0.01em] cf:text-[#1C1B17]">
        From setup to savings in days
      </h2>
    </div>
  );
}

/**
 * Individual step card component
 */
function StepCard(props: any) {
  const { number, title, description, icon } = props;

  return (
    <div className="cf:relative cf:border cf:border-[rgba(28,27,23,0.08)] cf:rounded-[16px] cf:p-6 cf:bg-white cf-step-card">
      {/* Step Number */}
      <div className="cf:text-[#000000] cf:text-[14px] cf:font-medium cf:mb-4 cf-step-number">
        Step {number}
      </div>

      {/* Icon Container */}
      <div className="cf:mb-4 cf-step-icon">
        {icon}
      </div>

      {/* Content */}
      <h3 className="cf:text-[20px] cf:leading-[1.3] cf:font-normal cf:text-[#1C1B17] cf:mb-3">
        {title}
      </h3>
      <p className="cf:text-[15px] cf:leading-[1.5] cf:text-[#1C1B17] cf:opacity-70">
        {description}
      </p>
    </div>
  );
}

/**
 * Call to action buttons
 */
function CTAButtons() {
  return (
    <div className="cf:flex cf:flex-col cf:sm:flex-row cf:items-center cf:justify-center cf:gap-4 cf:sm:gap-6">
      <a
        href="/see-a-demo"
        className="cf:inline-flex cf:items-center cf:justify-center cf:px-6 cf:py-3 cf:rounded-md cf:bg-[#E4F222] cf:hover:bg-[#d4e515] cf:text-[#1C1B17] cf:text-[15px] cf:font-normal cf:leading-[1.2] cf:transition-colors cf:duration-200 cf:no-underline"
      >
        Get started for free
      </a>
      <a
        href="/see-a-demo"
        className="cf:inline-flex cf:items-center cf:gap-2 cf:text-[#1C1B17] cf:text-[15px] cf:font-normal cf:no-underline cf:hover:underline cf:transition-all cf:duration-200"
      >
        See a demo
        <span className="cf:inline-block">→</span>
      </a>
    </div>
  );
}

// ============================================================================
// Icon Components
// Simplified SVG icons with Flaticon search suggestions in comments
// ============================================================================

/**
 * Connect/Network Icon
 * Flaticon alternatives: "api", "network", "integration", "cloud sync"
 */
function ConnectIcon() {
  return (
    <svg
      className="cf:w-[32px] cf:h-[32px] cf:text-[#1C1B17]"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Connect"
    >
      {/* Network nodes */}
      <circle cx="12" cy="5" r="2" fill="currentColor" />
      <circle cx="6" cy="12" r="2" fill="currentColor" />
      <circle cx="18" cy="12" r="2" fill="currentColor" />
      <circle cx="12" cy="19" r="2" fill="currentColor" />
      {/* Connection lines */}
      <path d="M12 7v10M8 12h8" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

/**
 * Configure/Settings Icon  
 * Flaticon alternatives: "settings", "toggle switch", "controls", "configuration"
 */
function ConfigureIcon() {
  return (
    <svg
      className="cf:w-[32px] cf:h-[32px] cf:text-[#1C1B17]"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Configure"
    >
      {/* Toggle switches */}
      <rect x="4" y="7" width="10" height="3" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="7" cy="8.5" r="1.5" fill="currentColor" />
      <rect x="10" y="14" width="10" height="3" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17" cy="15.5" r="1.5" fill="currentColor" />
    </svg>
  );
}

/**
 * Automate/Gears Icon
 * Flaticon alternatives: "automation", "gears", "robot", "workflow"
 */
function AutomateIcon() {
  return (
    <svg
      className="cf:w-[32px] cf:h-[32px] cf:text-[#1C1B17]"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Automate"
    >
      {/* Simplified gear shapes */}
      <circle cx="9" cy="11" r="3" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="15" cy="13" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      {/* Gear teeth indicators */}
      <path d="M9 5v2M9 15v2M3 11h2M13 11h2M5.5 7.5l1.5 1.5M11.5 13.5l1.5 1.5M5.5 14.5l1.5-1.5M11.5 7.5l1.5-1.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

// ============================================================================
// Styles
// ============================================================================

/**
 * Adds custom CSS for animations and hover effects
 * Most styling handled via Tailwind utilities with cf: prefix
 */
function addStyling() {
  const styles = `
    /* Anti-clipping safeguards for hero section */
    .overflow-x-clip {
      overflow: visible !important;
    }
    
    /* Ensure hero media displays properly */
    #hero-section img,
    #hero-section video {
      max-width: 100%;
      height: auto;
    }
    
    /* Fade-in animation for section (no translateY to avoid overflow issues) */
    .cf-how-it-works-section {
      opacity: 0;
      animation: cf-fade-in 0.8s ease-out 0.2s forwards;
    }
    
    /* Step cards fade-in effects (no translateY) */
    .cf-step-card {
      opacity: 0;
      animation: cf-fade-in 0.6s ease-out forwards;
      transition: all 0.3s ease;
    }
    
    /* Hover effect without translateY */
    .cf-step-card:hover {
      border-color: #e4f222;
      box-shadow: 0 8px 24px rgba(228, 242, 34, 0.2);
    }
    
    /* Staggered animation delays */
    .cf-step-card:nth-child(1) { animation-delay: 0.4s; }
    .cf-step-card:nth-child(2) { animation-delay: 0.5s; }
    .cf-step-card:nth-child(3) { animation-delay: 0.6s; }
    
    /* Icon hover effect */
    .cf-step-card:hover .cf-step-icon { transform: scale(1.1); }
    .cf-step-icon { transition: transform 0.3s ease; }
    
    /* Keyframes - fade only, no translate */
    @keyframes cf-fade-in {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
      .cf-how-it-works-section,
      .cf-step-card {
        animation: none;
        opacity: 1;
      }
      .cf-step-card:hover { 
        box-shadow: 0 8px 24px rgba(228, 242, 34, 0.2); 
      }
      .cf-step-card:hover .cf-step-icon { transform: none; }
    }
  `;

  const styleElement = document.createElement('style');
  styleElement.dataset.desc = 'How It Works Section Styles';
  styleElement.innerHTML = styles;
  document.head.appendChild(styleElement);
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Monitors DOM changes and runs code when conditions are met
 */
function monitorChangesByConditionAndRun(check: () => boolean, code: () => void, keepChecking = false) {
  const checkAndRun = () => check() && (!keepChecking && observer.disconnect(), code());
  const observer = new MutationObserver(checkAndRun);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  checkAndRun();
  if (!keepChecking) setTimeout(() => observer.disconnect(), 10000);
}

/**
 * Initializes test and prevents duplicate runs
 */
function initTest() {
  const cfObj = window.CF || { qaTesting: false, testsRunning: [] };
  if (cfObj.testsRunning.find((test: any) => test.name === testInfo.name)) {
    console.warn(`Test already running: `, testInfo);
    return false;
  }
  cfObj.testsRunning = [...cfObj.testsRunning, testInfo];
  window.CF = { ...window.CF, ...cfObj };
  return { ...window.CF };
}
