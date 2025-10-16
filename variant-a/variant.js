// ============================================================================
// Test Configuration
// ============================================================================
let testInfo = {
  name: `CF Headline Change - Ramp Homepage: Update Hero Headline`,
};

// Initialize test and exit if already running
let testInitiated = initTest(testInfo);
if (!testInitiated) return false;

// ============================================================================
// Main Execution
// ============================================================================
monitorChangesByConditionAndRun(checkForElements, onElementsFound);

// ============================================================================
// Main Functions
// ============================================================================

/**
 * Main function that changes the headline
 */
function onElementsFound() {
  console.log(`Running Code for: `, testInfo.name, testInfo);
  document.querySelector(`body`)?.setAttribute(`cf-test-active`, testInfo.name);

  // Find and update the hero headline
  const headline = document.querySelector('h1.headline-xl');
  if (headline) {
    console.log('Found headline, changing text');
    headline.textContent = 'Amazing Extension that Save Time and Money';
    console.log('Headline updated successfully');
  } else {
    console.error('Headline element not found');
    return;
  }

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
    const headlineExists = !!document.querySelector('h1.headline-xl');
    
    return cfDefined && testActiveAbsent && headlineExists;
  } catch (e) {
    console.error("Check error:", e);
    return false;
  }
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
