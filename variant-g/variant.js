// ============================================================================
// Test Configuration
// ============================================================================
let testInfo = {
  name: `CF Announcement Bar - Ramp Homepage: Add Top Announcement Bar`,
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
 * Main function that creates and inserts the announcement bar
 */
function onElementsFound() {
  console.log(`Running Code for: `, testInfo.name, testInfo);
  document.querySelector(`body`)?.setAttribute(`cf-test-active`, testInfo.name);

  // Remove existing black top bar/announcement bar
  removeExistingTopBar();

  // Check if announcement was already dismissed
  const dismissedUntil = localStorage.getItem('cf-announcement-dismissed-until');
  if (dismissedUntil && new Date().getTime() < parseInt(dismissedUntil)) {
    console.log('Announcement bar dismissed by user');
    return;
  }

  // Create and insert announcement bar at the very top
  const announcementBar = <AnnouncementBar />;
  document.body.insertBefore(announcementBar, document.body.firstChild);

  // Set up header offset management
  setupHeaderOffsetManagement();

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
    const bodyExists = !!document.body;

    return cfDefined && testActiveAbsent && bodyExists;
  } catch (e) {
    console.error("Check error:", e);
    return false;
  }
}

// ============================================================================
// Component Functions
// ============================================================================

// @coframe-ignore-query: [class*="announcement"]
// @coframe-ignore-query: [class*="top-bar"]
// @coframe-ignore-query: [class*="promo-bar"]
// @coframe-ignore-query: [class*="alert-bar"]
// @coframe-ignore-query: body > div:first-child[class*="fixed"]
// @coframe-ignore-query: body > aside:first-child
// @coframe-ignore-query: body > div[style*="position: fixed"][style*="top: 0"]
// @coframe-ignore-query: aside[class*="bg-black"]

/**
 * Removes existing top bar/announcement bar from the page
 */
function removeExistingTopBar() {
  // Common selectors for top announcement bars
  const selectors = [
    '[class*="announcement"]',
    '[class*="banner"]:not(.cf-announcement-bar)',
    '[class*="top-bar"]',
    '[class*="promo-bar"]',
    '[class*="alert-bar"]',
    'body > div:first-child[class*="fixed"]',
    'body > aside:first-child',
    'body > div[style*="position: fixed"][style*="top: 0"]',
    // Target black background bars specifically
    'div[class*="bg-black"]',
    'aside[class*="bg-black"]',
  ];

  selectors.forEach(selector => {
    try {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
        // Check if it's at the top of the page and looks like an announcement bar
        const rect = element.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(element);
        const isTopBar = 
          (rect.top === 0 || computedStyle.position === 'fixed' && computedStyle.top === '0px') &&
          rect.height < 100 && // Typical announcement bar height
          !element.classList.contains('cf-announcement-bar'); // Don't remove our own bar

        if (isTopBar) {
          console.log('Removing existing top bar:', element);
          element.style.display = 'none';
          // Optionally, completely remove it
          element.remove();
        }
      });
    } catch (e) {
      console.warn('Error checking selector:', selector, e);
    }
  });
}

/**
 * Sets up dynamic header offset management with ResizeObserver and scroll detection
 */
function setupHeaderOffsetManagement() {
  const bar = document.querySelector('.cf-announcement-bar') as HTMLElement;
  if (!bar) return;

  // Update CSS variable for header offset
  const updateHeaderOffset = () => {
    const barHeight = bar.getBoundingClientRect().height;
    document.documentElement.style.setProperty('--cf-announcement-height', `${barHeight}px`);
  };

  // Initial set
  updateHeaderOffset();

  // Watch for size changes
  const resizeObserver = new ResizeObserver(updateHeaderOffset);
  resizeObserver.observe(bar);

  // Handle sticky header detection - hide bar when scrolling
  let lastScrollY = 0;
  let ticking = false;

  const handleScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const header = document.querySelector('header, [class*="header"], [class*="Header"], nav');

        // Hide bar when scrolling down past threshold (indicating sticky header active)
        if (currentScrollY > 100 && currentScrollY > lastScrollY) {
          bar.classList.add('cf-announcement-hidden');
        } else if (currentScrollY < lastScrollY || currentScrollY < 50) {
          bar.classList.remove('cf-announcement-hidden');
        }

        lastScrollY = currentScrollY;
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
}

// ============================================================================
// JSX Components
// ============================================================================

/**
 * Main announcement bar component
 */
function AnnouncementBar() {
  const handleDismiss = (e: Event) => {
    e.preventDefault();
    const bar = document.querySelector('.cf-announcement-bar') as HTMLElement;
    if (bar) {
      // Store dismissal for 7 days
      const sevenDaysFromNow = new Date().getTime() + (7 * 24 * 60 * 60 * 1000);
      localStorage.setItem('cf-announcement-dismissed-until', sevenDaysFromNow.toString());

      // Animate out
      bar.classList.add('cf-announcement-dismissed');

      // Remove from DOM after animation
      setTimeout(() => {
        bar.remove();
        document.documentElement.style.setProperty('--cf-announcement-height', '0px');
      }, 300);
    }
  };

  return (
    <aside
      className="cf-announcement-bar"
      role="banner"
      aria-label="Announcement"
    >
      <div className="cf-announcement-container">
        <div className="cf-announcement-content">
          {/* Icon */}
          <span className="cf-announcement-icon" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L13.09 8.26L19 7L15.45 11.82L21 16L14.82 16.73L15 23L10 18L5 23L5.18 16.73L0 16L5.55 11.82L2 7L7.91 8.26L12 2Z" fill="currentColor" />
            </svg>
          </span>

          {/* Message */}
          <span className="cf-announcement-message">
            New: Ramp Intelligence now automates expense categorization with 99% accuracy
          </span>

          {/* CTA - Hidden on mobile */}
          <a
            href="/intelligence"
            className="cf-announcement-cta"
            aria-label="Learn more about Ramp Intelligence"
          >
            Learn more
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        {/* Dismiss button */}
        <button
          onClick={handleDismiss}
          className="cf-announcement-dismiss"
          aria-label="Dismiss announcement"
          type="button"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </aside>
  );
}

// ============================================================================
// Styles
// ============================================================================

/**
 * Adds custom CSS for the announcement bar
 */
function addStyling() {
  const styles = `
    /* Hide existing briansoffice black bar */
    a[href*="briansoffice"][class*="bg-black"],
    a[href*="briansoffice"].bg-black {
      display: none !important;
      visibility: hidden !important;
      opacity: 0 !important;
      height: 0 !important;
      overflow: hidden !important;
    }
    
    /* CSS Custom Property for dynamic height */
    :root {
      --cf-announcement-height: 44px;
    }
    
    /* Add padding to body to create space for the fixed announcement bar */
    body {
      padding-top: var(--cf-announcement-height) !important;
    }
    
    /* Target ALL Ramp's fixed header elements including nested ones */
    header.fixed.inset-x-0,
    nav header.fixed,
    header.fixed[class*="top-0"] {
      top: var(--cf-announcement-height) !important;
      transition: top 0.3s ease;
    }
    
    /* IMPORTANT: Also adjust the nested fixed div inside the header */
    header.fixed .fixed[class*="top-0"],
    header.fixed > .fixed {
      top: var(--cf-announcement-height) !important;
    }
    
    /* Main announcement bar */
    .cf-announcement-bar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 9999; /* Increased to ensure it's above everything */
      height: 44px;
      background: #FEFEF9;
      border-bottom: 1px solid rgba(28, 27, 23, 0.08);
      transition: transform 0.3s ease, opacity 0.3s ease;
      font-family: system-ui, -apple-system, sans-serif;
    }
    
    /* When announcement is hidden, smoothly reset header position */
    body:has(.cf-announcement-bar.cf-announcement-hidden) {
      padding-top: 0 !important;
    }
    
    body:has(.cf-announcement-bar.cf-announcement-hidden) header.fixed.inset-x-0,
    body:has(.cf-announcement-bar.cf-announcement-hidden) nav header.fixed,
    body:has(.cf-announcement-bar.cf-announcement-hidden) header.fixed[class*="top-0"],
    body:has(.cf-announcement-bar.cf-announcement-hidden) header.fixed .fixed[class*="top-0"],
    body:has(.cf-announcement-bar.cf-announcement-hidden) header.fixed > .fixed {
      top: 0 !important;
    }
    
    /* When announcement is dismissed, also reset */
    body:not(:has(.cf-announcement-bar)) {
      padding-top: 0 !important;
    }
    
    body:not(:has(.cf-announcement-bar)) header.fixed.inset-x-0,
    body:not(:has(.cf-announcement-bar)) nav header.fixed,
    body:not(:has(.cf-announcement-bar)) header.fixed[class*="top-0"],
    body:not(:has(.cf-announcement-bar)) header.fixed .fixed[class*="top-0"],
    body:not(:has(.cf-announcement-bar)) header.fixed > .fixed {
      top: 0 !important;
    }
    
    /* Container */
    .cf-announcement-container {
      max-width: 1440px;
      margin: 0 auto;
      height: 100%;
      padding: 0 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }
    
    /* Content wrapper */
    .cf-announcement-content {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    
    /* Icon styling */
    .cf-announcement-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      color: #F2FF26;
      flex-shrink: 0;
    }
    
    /* Message text */
    .cf-announcement-message {
      font-size: 14px;
      line-height: 20px;
      color: #1C1B17;
      font-weight: 400;
      letter-spacing: -0.01em;
    }
    
    /* CTA link */
    .cf-announcement-cta {
      display: none;
      align-items: center;
      gap: 4px;
      font-size: 14px;
      line-height: 20px;
      color: #1C1B17;
      font-weight: 500;
      text-decoration: none;
      white-space: nowrap;
      transition: opacity 0.2s ease;
    }
    
    .cf-announcement-cta:hover {
      opacity: 0.7;
    }
    
    .cf-announcement-cta:focus-visible {
      outline: 2px solid #F2FF26;
      outline-offset: 2px;
      border-radius: 2px;
    }
    
    /* Dismiss button */
    .cf-announcement-dismiss {
      position: absolute;
      right: 16px;
      top: 50%;
      transform: translateY(-50%);
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: transparent;
      border: none;
      cursor: pointer;
      color: #1C1B17;
      opacity: 0.5;
      transition: opacity 0.2s ease;
      padding: 0;
    }
    
    .cf-announcement-dismiss:hover {
      opacity: 0.8;
    }
    
    .cf-announcement-dismiss:focus-visible {
      outline: 2px solid #F2FF26;
      outline-offset: 2px;
      border-radius: 2px;
    }
    
    /* Hidden state (for sticky header) */
    .cf-announcement-bar.cf-announcement-hidden {
      transform: translateY(-100%);
      opacity: 0;
    }
    
    /* Dismissed state animation */
    .cf-announcement-bar.cf-announcement-dismissed {
      transform: translateY(-100%);
      opacity: 0;
    }
    
    /* Tablet and desktop styles */
    @media (min-width: 768px) {
      :root {
        --cf-announcement-height: 40px;
      }
      
      .cf-announcement-bar {
        height: 40px;
      }
      
      .cf-announcement-container {
        padding: 0 24px;
      }
      
      .cf-announcement-cta {
        display: inline-flex;
      }
      
      .cf-announcement-content {
        gap: 16px;
      }
      
      .cf-announcement-dismiss {
        right: 24px;
      }
    }
    
    /* Large desktop */
    @media (min-width: 1440px) {
      .cf-announcement-container {
        padding: 0 32px;
      }
      
      .cf-announcement-dismiss {
        right: 32px;
      }
    }
    
    /* Print styles */
    @media print {
      .cf-announcement-bar {
        display: none;
      }
    }
    
    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
      .cf-announcement-bar {
        transition: none;
      }
    }
    
    /* High contrast mode support */
    @media (prefers-contrast: high) {
      .cf-announcement-bar {
        border-bottom-width: 2px;
      }
      
      .cf-announcement-message {
        font-weight: 500;
      }
    }
  `;

  const styleElement = document.createElement('style');
  styleElement.dataset.desc = 'Announcement Bar Styles';
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
