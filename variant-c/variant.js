// Test Configuration
let testInfo = {
  name: `CF Hero - Control-focused messaging`,
};

// Initialize test and exit if already running
let testInitiated = initTest(testInfo);
if (!testInitiated) return false;

// Main Code
addStyling();
monitorChangesByConditionAndRun(checkForElements, onElementsFound);

// === MAIN FUNCTIONS ===

function onElementsFound() {
  console.log(`Running Code for: `, testInfo.name, testInfo);
  document.querySelector(`body`)?.setAttribute(`cf-test-active`, testInfo.name);

  // Find and replace hero section content
  const heroSection = document.querySelector('#hero-section');
  if (!heroSection) {
    console.error('Hero section not found');
    return;
  }

  // Replace hero section innerHTML with new minimal two-column layout
  heroSection.innerHTML = `
    <div class="cf-hero-gradient-bg cf:mb-[20px]">
      <div class="mx-auto w-full max-w-screen-2xl px-4 cf:md:px-8 cf:lg:px-12 cf:xl:px-16 cf-hero-container">
        <div class="cf:flex cf:flex-col cf:items-center cf:justify-center cf:text-center cf:h-[850px] cf:max-h-[850px] cf:pt-20 cf:pb-16">
          
          <!-- Visual Icon at top -->
          <div class="cf:mb-6 cf-visual-modern" aria-hidden="true">
            <div class="cf:relative">
              <div class="cf:text-[60px] cf:lg:text-[80px] cf:leading-none">💳</div>
              <div class="cf:absolute cf:bottom-0 cf:right-0 cf:text-[30px] cf:lg:text-[40px]">🛡️</div>
            </div>
          </div>
          
          <!-- Eyebrow -->
          <div class="body-s cf:text-black/70 cf:mb-3 cf:uppercase cf:tracking-[0.15em] cf:text-sm cf:font-medium">
            Corporate card & spend AI
          </div>
          
          <!-- Headline -->
          <h1 class="headline-xl cf:text-black cf:mb-4 cf:max-w-[800px] cf:mx-auto cf:font-bold">
            Set controls that<br class="cf:hidden cf:md:block"/>
            enforce themselves
          </h1>
          
          <!-- Subline -->
          <p class="body-l cf:text-black/80 cf:mb-6 cf:max-w-[600px] cf:mx-auto">
            Issue cards in seconds with built-in spending policies. 
            Our AI automatically blocks out-of-policy transactions before they happen.
          </p>
          
          <!-- CTAs -->
          <div class="cf:flex cf:flex-col cf:sm:flex-row cf:items-center cf:justify-center cf:gap-4 cf:mb-10">
            <button class="body-m leading-[.675rem] cf:inline-flex cf:items-center cf:justify-center cf:text-center cf:rounded-full cf:transition cf:duration-300 cf:px-8 cf:py-4 cf:bg-black cf:hover:bg-gray-800 cf:text-white cf:shadow-xl cf:hover:shadow-2xl cf:transform cf:hover:scale-105">
              Get started for free
            </button>
            <a href="#demo" class="body-m cf:text-black cf:hover:text-black/70 cf:inline-flex cf:items-center cf:gap-2 cf:transition-all cf:font-medium">
              <span>See a demo</span>
              <span class="cf:transition-transform cf:group-hover:translate-x-1">→</span>
            </a>
          </div>
          
          <!-- Modern Dashboard Visual -->
          <div class="cf:w-full cf:max-w-[500px] cf:mb-8 cf:relative cf:z-30 cf-dashboard-visual" aria-hidden="true">
            <div class="cf:bg-white/95 cf:backdrop-blur-md cf:rounded-2xl cf:shadow-2xl cf:p-4 cf:border cf:border-white/50">
              <div class="cf:flex cf:items-center cf:justify-between cf:mb-3">
                <div class="cf:flex cf:gap-1">
                  <div class="cf:w-2 cf:h-2 cf:rounded-full cf:bg-red-400"></div>
                  <div class="cf:w-2 cf:h-2 cf:rounded-full cf:bg-yellow-400"></div>
                  <div class="cf:w-2 cf:h-2 cf:rounded-full cf:bg-green-400"></div>
                </div>
                <span class="cf:text-[10px] cf:text-gray-500">Ramp Dashboard</span>
              </div>
              <div class="cf:grid cf:grid-cols-3 cf:gap-2">
                <div class="cf:bg-gradient-to-br cf:from-yellow-400 cf:to-yellow-500 cf:p-2 cf:rounded-md cf:text-white">
                  <div class="cf:text-sm cf:font-bold">$2.4M</div>
                  <div class="cf:text-[8px] cf:opacity-90">Saved</div>
                </div>
                <div class="cf:bg-gradient-to-br cf:from-blue-400 cf:to-blue-500 cf:p-2 cf:rounded-md cf:text-white">
                  <div class="cf:text-sm cf:font-bold">847</div>
                  <div class="cf:text-[8px] cf:opacity-90">Cards</div>
                </div>
                <div class="cf:bg-gradient-to-br cf:from-green-400 cf:to-green-500 cf:p-2 cf:rounded-md cf:text-white">
                  <div class="cf:text-sm cf:font-bold">99.8%</div>
                  <div class="cf:text-[8px] cf:opacity-90">Compliance</div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Benefit Chips -->
          <div class="cf:flex cf:flex-wrap cf:justify-center cf:gap-2 cf:mt-8">
            <div class="cf-benefit-chip-modern">
              <span class="cf:text-green-600">✓</span> Cards issued same day
            </div>
            <div class="cf-benefit-chip-modern">
              <span class="cf:text-green-600">✓</span> Policy auto-enforcement
            </div>
            <div class="cf-benefit-chip-modern">
              <span class="cf:text-green-600">✓</span> Faster month-end close
            </div>
          </div>
          
        </div>
      </div>
    </div>
  `;

  // Emit variantRendered event after successful changes
  window.CFQ = window.CFQ || [];
  window.CFQ.push({ emit: 'variantRendered' });
}

function checkForElements() {
  try {
    const cfDefined = typeof window.CF !== "undefined";
    console.log("Check: typeof window.CF !== 'undefined' =>", cfDefined);

    const testActiveSelector = `body[cf-test-active="${testInfo.name}"]`;
    const testActiveElem = document.querySelector(testActiveSelector);
    const testActiveAbsent = !testActiveElem;
    console.log(`Check: !document.querySelector('${testActiveSelector}') =>`, testActiveAbsent);

    const heroSection = document.querySelector('#hero-section');
    const heroExists = !!heroSection;
    console.log("Check: hero section exists =>", heroExists);

    return cfDefined && testActiveAbsent && heroExists;
  } catch (e) {
    console.error("Check error:", e);
    return false;
  }
}

// === HELPER FUNCTIONS ===

function addStyling() {
  let cssArray = [
    {
      desc: `Hero section minimal styles`,
      css: `
        /* Fix navigation visibility on gradient background */
        nav .text-primaryReverse,
        nav .text-primaryReverse a,
        nav .body-s,
        nav [data-testid*="navbar"] {
          color: #1C1B17 !important;
        }
        
        /* Navigation buttons styling */
        nav a[href*="sign-in"],
        nav button[data-testid="navbar-signin"] a {
          background: #1C1B17 !important;
          color: white !important;
          border-radius: 6px !important;
          transition: all 0.2s ease !important;
        }
        
        nav a[href*="sign-in"]:hover,
        nav button[data-testid="navbar-signin"] a:hover {
          background: #000 !important;
          transform: translateY(-1px) !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
        }
        
        nav a[href="/see-a-demo"] {
          background: rgba(228, 242, 34, 0.9) !important;
          color: #1C1B17 !important;
          font-weight: 600 !important;
          border-radius: 6px !important;
          transition: all 0.2s ease !important;
        }
        
        nav a[href="/see-a-demo"]:hover {
          background: #E4F222 !important;
          transform: translateY(-1px) !important;
          box-shadow: 0 4px 12px rgba(228, 242, 34, 0.3) !important;
        }
        
        /* Navigation backdrop for better contrast */
        header.fixed {
          background: rgba(255, 255, 255, 0.95) !important;
          backdrop-filter: blur(10px) !important;
          border-bottom: 1px solid rgba(228, 242, 34, 0.2) !important;
        }
        
        /* Gradient background - More vibrant and modern */
        .cf-hero-gradient-bg {
          background: linear-gradient(135deg, 
            #E4F222 0%, 
            #F2FF26 20%, 
            #FAFFC7 40%, 
            #FFF9E6 60%, 
            #FFFFFF 100%);
          position: relative;
          overflow: hidden;
          height: 850px;
          max-height: 850px;
        }
        
        .cf-hero-gradient-bg::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle at 30% 50%, 
            rgba(228, 242, 34, 0.4) 0%, 
            rgba(242, 255, 38, 0.2) 25%, 
            transparent 50%);
          animation: cf-pulse 15s ease-in-out infinite;
        }
        
        .cf-hero-gradient-bg::after {
          content: '';
          position: absolute;
          bottom: -50%;
          right: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle at 70% 50%, 
            rgba(228, 242, 34, 0.3) 0%, 
            rgba(242, 255, 38, 0.15) 25%, 
            transparent 50%);
          animation: cf-pulse-reverse 20s ease-in-out infinite;
        }
        
        @keyframes cf-pulse {
          0%, 100% { 
            opacity: 0.3; 
            transform: scale(1) rotate(0deg); 
          }
          50% { 
            opacity: 0.5; 
            transform: scale(1.1) rotate(180deg); 
          }
        }
        
        @keyframes cf-pulse-reverse {
          0%, 100% { 
            opacity: 0.3; 
            transform: scale(1) rotate(0deg); 
          }
          50% { 
            opacity: 0.4; 
            transform: scale(1.15) rotate(-180deg); 
          }
        }
        
        /* Logo carousel styles */
        .cf-logo-section {
          margin: 20px 0;
        }
        
        .cf-logo-carousel-wrapper {
          position: relative;
          mask-image: linear-gradient(90deg, 
            transparent 0%, 
            black 5%, 
            black 95%, 
            transparent 100%);
          -webkit-mask-image: linear-gradient(90deg, 
            transparent 0%, 
            black 5%, 
            black 95%, 
            transparent 100%);
        }
        
        .cf-logo-carousel {
          display: flex;
          overflow: hidden;
          position: relative;
          padding: 10px 0;
        }
        
        .cf-logo-track {
          display: flex;
          gap: 20px;
          animation: cf-scroll 25s linear infinite;
        }
        
        .cf-logo-item {
          flex: 0 0 auto;
          transition: transform 0.3s ease, opacity 0.3s ease;
        }
        
        .cf-logo-item:hover {
          transform: translateY(-2px);
        }
        
        .cf-logo-item > div {
          transition: all 0.3s ease;
        }
        
        .cf-logo-item:hover > div {
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
          transform: scale(1.05);
        }
        
        @keyframes cf-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        /* Dashboard visual animation */
        .cf-dashboard-visual {
          animation: cf-slide-up 1s ease-out forwards;
          animation-delay: 0.5s;
          opacity: 0;
        }
        
        @keyframes cf-slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Modern benefit chips */
        .cf-benefit-chip-modern {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(228, 242, 34, 0.3);
          border-radius: 9999px;
          color: #1C1B17;
          font-size: 14px;
          font-weight: 500;
          box-shadow: 0 2px 10px rgba(228, 242, 34, 0.15);
          transition: all 0.2s ease;
        }
        
        .cf-benefit-chip-modern:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(228, 242, 34, 0.25);
          border-color: rgba(228, 242, 34, 0.5);
        }
        
        /* Visual placeholder styling */
        .cf-visual-modern {
          animation: cf-float 4s ease-in-out infinite;
          filter: drop-shadow(0 10px 25px rgba(0, 0, 0, 0.15));
        }
        
        @keyframes cf-float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-10px) scale(1.02); }
        }
        
        /* Container adjustments */
        .cf-hero-container {
          position: relative;
          z-index: 1;
        }
      `,
    },
  ];

  cssArray.forEach(({ desc, css }) => {
    let newStyleElem = document.createElement(`style`);
    newStyleElem.dataset.desc = desc;
    newStyleElem.innerHTML = css;
    document.head.insertAdjacentElement(`beforeend`, newStyleElem);
  });
}

function monitorChangesByConditionAndRun(check, code, keepChecking = false) {
  let checkAndRun = () =>
    check() && (!keepChecking && observer.disconnect(), code());
  var observer = new MutationObserver(checkAndRun);
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
  checkAndRun();

  if (!keepChecking) setTimeout(() => observer.disconnect(), 10000);
}

function initTest() {
  let cfObj = window.CF || { qaTesting: false, testsRunning: [] };

  if (cfObj.testsRunning.find((test) => test.name == testInfo.name)) {
    console.warn(`The following test is already running: `, testInfo);
    return false;
  }

  cfObj.testsRunning = [...cfObj.testsRunning, testInfo];
  window.CF = { ...window.CF, ...cfObj };

  return { ...window.CF };
}
