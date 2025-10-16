// Test Configuration
let testInfo = {
  name: `CF Memory Air - Hero: Complete production-ready redesign`,
};

// Initialize test and exit if already running
let testInitiated = initTest(testInfo);
if (!testInitiated) return false;

// === DESIGN TOKENS (FLATTENED) ===
const tokens = {
  colorPrimary: '#000000',
  colorPrimaryHover: '#1a1a1a',
  colorSecondary: '#ffffff',
  colorText: '#000000',
  colorTextLight: '#ffffff',
  colorBorder: '#000000',
  colorAccent: '#000000',
  colorAccentHover: '#1a1a1a',
  colorPrimary50: '#f9fafb',
  colorTextBase: '#1f2937',

  fontFamily: '"Bellota Text", Arial, sans-serif',
  fontSize16: '16px',
  fontSize18: '18px',
  fontSize20: '20px',
  fontSize25: '25px',
  fontSize28: '28px',
  fontSize36: '36px',
  fontSize48: '48px',
  fontSize56: '56px',

  fontWeightNormal: '400',
  fontWeightSemibold: '600',
  fontWeightBold: '700',

  lineHeightTight: '1.2',
  lineHeightSnug: '1.3',
  lineHeightNormal: '1.5',
  lineHeightRelaxed: '1.75',

  spacing0: '0px',
  spacing1: '8px',
  spacing2: '16px',
  spacing3: '24px',
  spacing4: '32px',
  spacing5: '40px',
  spacing6: '48px',
  spacing7: '56px',
  spacing8: '64px',

  radiusSm: '4px',
  radiusMd: '5px',
  radiusLg: '8px',

  shadowSm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  shadowMd: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  shadowLg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',

  breakpointMobile: '640px',
  breakpointTablet: '768px',
  breakpointDesktop: '1024px',

  maxWidthContainer: '1280px',
  maxWidthContent: '70ch',
};

// Main Code
addStyling();
monitorChangesByConditionAndRun(checkForElements, onElementsFound);

// === MAIN FUNCTIONS ===

function onElementsFound() {
  console.log(`Running Code for: `, testInfo.name, testInfo);
  document.querySelector(`body`)?.setAttribute(`cf-test-active`, testInfo.name);

  const heroBox = document.querySelector('#lp-pom-box-415');

  if (!heroBox) {
    console.error('Hero box #lp-pom-box-415 not found');
    return;
  }

  // Check if already redesigned
  // @coframe-ignore-query: .cf-hero-redesign
  if (heroBox.querySelector('.cf-hero-redesign')) {
    console.log('Hero already redesigned');
    window.CFQ = window.CFQ || [];
    window.CFQ.push({ emit: 'variantRendered' });
    return;
  }

  // Hide specific existing children
  const existingImage = heroBox.querySelector('#lp-pom-image-416');
  const existingBox = heroBox.querySelector('#lp-pom-box-417');
  const existingText1 = heroBox.querySelector('#lp-pom-text-421');
  const existingText2 = heroBox.querySelector('#lp-pom-text-422');
  const existingButton = heroBox.querySelector('#lp-pom-button-423');

  if (existingImage) existingImage.style.display = 'none';
  if (existingBox) existingBox.style.display = 'none';
  if (existingText1) existingText1.style.display = 'none';
  if (existingText2) existingText2.style.display = 'none';
  if (existingButton) existingButton.style.display = 'none';

  // Create new hero section using plain DOM
  const heroSection = createHeroSection();
  heroBox.appendChild(heroSection);

  console.log('Hero section successfully redesigned');

  // Emit success event
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

    const heroBox = document.querySelector('#lp-pom-box-415');
    const heroBoxExists = !!heroBox;
    console.log("Check: Hero box (415) exists =>", heroBoxExists);

    return cfDefined && testActiveAbsent && heroBoxExists;
  } catch (e) {
    console.error("Check error:", e);
    return false;
  }
}

// === DOM CREATION FUNCTIONS ===

function createHeroSection() {
  const header = document.createElement('header');
  header.className = 'cf-hero-redesign';

  const container = document.createElement('div');
  container.className = 'cf-hero-container';

  const grid = document.createElement('div');
  grid.className = 'cf-hero-grid';

  // Left column: content
  const contentCol = document.createElement('div');
  contentCol.className = 'cf-hero-content';

  // Headline
  const headline = document.createElement('h1');
  headline.className = 'cf-hero-headline';
  headline.textContent = 'BIGGEST IMPROVEMENT OF HUMAN MEMORY EVER DISCOVERED';
  contentCol.appendChild(headline);

  // Subhead
  const subhead = document.createElement('p');
  subhead.className = 'cf-hero-subhead';
  subhead.textContent = 'Prevent and reverse memory loss...WHILE YOU SLEEP';
  contentCol.appendChild(subhead);

  // Benefits list
  const benefitsList = document.createElement('ul');
  benefitsList.className = 'cf-hero-benefits';
  benefitsList.setAttribute('role', 'list');

  const benefits = [
    { icon: createBrainIcon(), text: 'Up to 300% memory improvement reported' },
    { icon: createMoonStarsIcon(), text: 'Drug-free, works while you sleep' },
    { icon: createShieldCheckIcon(), text: '60-day money-back guarantee' }
  ];

  benefits.forEach(benefit => {
    const li = document.createElement('li');
    li.className = 'cf-benefit-item';

    const iconWrapper = document.createElement('div');
    iconWrapper.className = 'cf-benefit-icon';
    iconWrapper.setAttribute('aria-hidden', 'true');
    iconWrapper.appendChild(benefit.icon);

    const textSpan = document.createElement('span');
    textSpan.className = 'cf-benefit-text';
    textSpan.textContent = benefit.text;

    li.appendChild(iconWrapper);
    li.appendChild(textSpan);
    benefitsList.appendChild(li);
  });

  contentCol.appendChild(benefitsList);

  // CTA nav
  const ctaNav = document.createElement('nav');
  ctaNav.className = 'cf-hero-cta';
  ctaNav.setAttribute('aria-label', 'Primary call to action');

  const buyButton = document.createElement('a');
  buyButton.href = 'clkn/https/memoryair.com/products/memory-air-device';
  buyButton.className = 'cf-btn-primary';
  buyButton.textContent = 'Buy Now';
  buyButton.setAttribute('role', 'button');

  ctaNav.appendChild(buyButton);
  contentCol.appendChild(ctaNav);

  // Right column: image
  const imageCol = document.createElement('div');
  imageCol.className = 'cf-hero-image-wrapper';

  const img = document.createElement('img');
  img.src = '//d9hhrg4mnvzow.cloudfront.net/learn.memoryair.com/salespage/12dh2wb-memoryair2-hero-004-01_108w06v00000000000001o.jpg';
  img.alt = 'Memory Air device';
  img.className = 'cf-hero-image';
  img.loading = 'eager';

  imageCol.appendChild(img);

  // Assemble grid
  grid.appendChild(contentCol);
  grid.appendChild(imageCol);
  container.appendChild(grid);
  header.appendChild(container);

  return header;
}

function createBrainIcon() {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('class', 'cf-icon');
  svg.setAttribute('aria-hidden', 'true');

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'M12 2C9.23858 2 7 4.23858 7 7C4.23858 7 2 9.23858 2 12C2 14.419 3.71776 16.4367 6 16.9V19C6 20.6569 7.34315 22 9 22H10C11.1046 22 12 21.1046 12 20V19M12 2C14.7614 2 17 4.23858 17 7C19.7614 7 22 9.23858 22 12C22 14.419 20.2822 16.4367 18 16.9V19C18 20.6569 16.6569 22 15 22H14C12.8954 22 12 21.1046 12 20V19M12 2V19M8 7H8.01M16 7H16.01M8 12H8.01M16 12H16.01');
  path.setAttribute('stroke', 'currentColor');
  path.setAttribute('stroke-width', '2');
  path.setAttribute('stroke-linecap', 'round');
  path.setAttribute('stroke-linejoin', 'round');

  svg.appendChild(path);
  return svg;
}

function createMoonStarsIcon() {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('class', 'cf-icon');
  svg.setAttribute('aria-hidden', 'true');

  const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path1.setAttribute('d', 'M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z');
  path1.setAttribute('stroke', 'currentColor');
  path1.setAttribute('stroke-width', '2');
  path1.setAttribute('stroke-linecap', 'round');
  path1.setAttribute('stroke-linejoin', 'round');

  const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path2.setAttribute('d', 'M18 3L20 5L18 7M14 1L15 3L14 5');
  path2.setAttribute('stroke', 'currentColor');
  path2.setAttribute('stroke-width', '2');
  path2.setAttribute('stroke-linecap', 'round');
  path2.setAttribute('stroke-linejoin', 'round');

  svg.appendChild(path1);
  svg.appendChild(path2);
  return svg;
}

function createShieldCheckIcon() {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('class', 'cf-icon');
  svg.setAttribute('aria-hidden', 'true');

  const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path1.setAttribute('d', 'M12 2L4 7V11C4 16.52 7.84 21.74 12 23C16.16 21.74 20 16.52 20 11V7L12 2Z');
  path1.setAttribute('stroke', 'currentColor');
  path1.setAttribute('stroke-width', '2');
  path1.setAttribute('stroke-linecap', 'round');
  path1.setAttribute('stroke-linejoin', 'round');

  const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path2.setAttribute('d', 'M9 12L11 14L15 10');
  path2.setAttribute('stroke', 'currentColor');
  path2.setAttribute('stroke-width', '2');
  path2.setAttribute('stroke-linecap', 'round');
  path2.setAttribute('stroke-linejoin', 'round');

  svg.appendChild(path1);
  svg.appendChild(path2);
  return svg;
}

// === HELPER FUNCTIONS ===

function addStyling() {
  let cssArray = [
    {
      desc: `Hero redesign styles with production-ready design system`,
      css: `
        /* Hero Container */
        .cf-hero-redesign {
          width: 100%;
          padding: ${tokens.spacing6} ${tokens.spacing2};
          font-family: ${tokens.fontFamily};
          color: ${tokens.colorText};
          background-color: #ffffff;
        }
        
        @media (min-width: ${tokens.breakpointTablet}) {
          .cf-hero-redesign {
            padding: ${tokens.spacing7} ${tokens.spacing3};
          }
        }
        
        @media (min-width: ${tokens.breakpointDesktop}) {
          .cf-hero-redesign {
            padding: ${tokens.spacing8} ${tokens.spacing4};
          }
        }
        
        .cf-hero-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 ${tokens.spacing2};
          background-color: #ffffff;
        }
        
        @media (min-width: ${tokens.breakpointTablet}) {
          .cf-hero-container {
            padding: 0 ${tokens.spacing3};
          }
        }
        
        /* Grid Layout - Mobile First */
        .cf-hero-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: ${tokens.spacing6};
          align-items: center;
        }
        
        /* Desktop Layout */
        @media (min-width: ${tokens.breakpointDesktop}) {
          .cf-hero-grid {
            grid-template-columns: 1.1fr 0.9fr;
            gap: ${tokens.spacing6};
            align-items: center;
          }
        }
        
        /* Content Column */
        .cf-hero-content {
          display: flex;
          flex-direction: column;
          gap: ${tokens.spacing2};
          max-width: 100%;
          padding: 0;
        }
        
        @media (min-width: ${tokens.breakpointDesktop}) {
          .cf-hero-content {
            max-width: 650px;
            padding-right: ${tokens.spacing4};
          }
        }
        
        /* Typography */
        .cf-hero-headline {
          font-family: ${tokens.fontFamily};
          font-size: ${tokens.fontSize36};
          font-weight: ${tokens.fontWeightBold};
          line-height: ${tokens.lineHeightTight};
          color: ${tokens.colorText};
          margin: 0 0 ${tokens.spacing2} 0;
        }
        
        @media (min-width: ${tokens.breakpointTablet}) {
          .cf-hero-headline {
            font-size: ${tokens.fontSize48};
          }
        }
        
        @media (min-width: ${tokens.breakpointDesktop}) {
          .cf-hero-headline {
            font-size: ${tokens.fontSize56};
          }
        }
        
        .cf-hero-subhead {
          font-family: ${tokens.fontFamily};
          font-size: ${tokens.fontSize18};
          font-weight: ${tokens.fontWeightSemibold};
          line-height: ${tokens.lineHeightSnug};
          color: ${tokens.colorTextBase};
          margin: 0 0 ${tokens.spacing2} 0;
        }
        
        @media (min-width: ${tokens.breakpointTablet}) {
          .cf-hero-subhead {
            font-size: ${tokens.fontSize20};
          }
        }
        
        @media (min-width: ${tokens.breakpointDesktop}) {
          .cf-hero-subhead {
            font-size: ${tokens.fontSize28};
          }
        }
        
        /* Benefits List */
        .cf-hero-benefits {
          display: flex;
          flex-direction: column;
          gap: ${tokens.spacing2};
          list-style: none;
          padding: 0;
          margin: ${tokens.spacing3} 0;
        }
        
        .cf-benefit-item {
          display: flex;
          align-items: flex-start;
          gap: ${tokens.spacing2};
        }
        
        .cf-benefit-icon {
          flex-shrink: 0;
          width: 24px;
          height: 24px;
          margin-top: 2px;
          color: ${tokens.colorText};
        }
        
        .cf-icon {
          width: 100%;
          height: 100%;
        }
        
        .cf-benefit-text {
          font-family: ${tokens.fontFamily};
          font-size: ${tokens.fontSize16};
          font-weight: ${tokens.fontWeightNormal};
          line-height: ${tokens.lineHeightRelaxed};
          color: ${tokens.colorTextBase};
        }
        
        @media (min-width: ${tokens.breakpointDesktop}) {
          .cf-benefit-text {
            font-size: ${tokens.fontSize18};
          }
        }
        
        /* CTA */
        .cf-hero-cta {
          display: flex;
          flex-wrap: wrap;
          gap: ${tokens.spacing2};
          padding-top: ${tokens.spacing3};
        }
        
        /* Primary Button */
        .cf-btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-family: ${tokens.fontFamily};
          font-size: ${tokens.fontSize18};
          font-weight: ${tokens.fontWeightBold};
          line-height: 1.2;
          color: ${tokens.colorTextLight};
          background-color: ${tokens.colorPrimary};
          border: 2px solid ${tokens.colorBorder};
          border-radius: ${tokens.radiusLg};
          padding: ${tokens.spacing3} ${tokens.spacing5};
          text-decoration: none;
          text-align: center;
          cursor: pointer;
          transition: all 0.2s ease-in-out;
          min-width: 180px;
        }
        
        @media (min-width: ${tokens.breakpointTablet}) {
          .cf-btn-primary {
            font-size: ${tokens.fontSize20};
            padding: ${tokens.spacing3} ${tokens.spacing6};
          }
        }
        
        @media (min-width: ${tokens.breakpointDesktop}) {
          .cf-btn-primary {
            font-size: ${tokens.fontSize25};
          }
        }
        
        .cf-btn-primary:hover {
          background-color: ${tokens.colorPrimaryHover};
          transform: translateY(-2px);
          box-shadow: ${tokens.shadowMd};
        }
        
        .cf-btn-primary:focus-visible {
          outline: 3px solid ${tokens.colorPrimary};
          outline-offset: 3px;
          box-shadow: ${tokens.shadowLg};
        }
        
        .cf-btn-primary:active {
          transform: translateY(0);
        }
        
        /* Reduced Motion */
        @media (prefers-reduced-motion: reduce) {
          .cf-btn-primary {
            transition: none;
            transform: none !important;
          }
          
          .cf-btn-primary:hover {
            transform: none;
          }
        }
        
        /* Image */
        .cf-hero-image-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
        }
        
        @media (min-width: ${tokens.breakpointDesktop}) {
          .cf-hero-image-wrapper {
            justify-content: flex-start;
          }
        }
        
        .cf-hero-image {
          width: 100%;
          max-width: 100%;
          height: auto;
          object-fit: cover;
          border-radius: ${tokens.radiusLg};
        }
        
        @media (min-width: ${tokens.breakpointDesktop}) {
          .cf-hero-image {
            max-width: 550px;
          }
        }
        
        /* Order for mobile (content first, image second) */
        @media (max-width: calc(${tokens.breakpointDesktop} - 1px)) {
          .cf-hero-content {
            order: 1;
          }
          .cf-hero-image-wrapper {
            order: 2;
          }
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
  let hasRun = false;
  let checkAndRun = () => {
    if (hasRun) return;
    if (check()) {
      hasRun = true;
      observer.disconnect();
      code();
    }
  };

  var observer = new MutationObserver(checkAndRun);
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
  checkAndRun();

  // Kill observer after 5 seconds regardless
  setTimeout(() => {
    observer.disconnect();
  }, 5000);
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
