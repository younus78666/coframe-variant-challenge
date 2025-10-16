// Test Configuration
let testInfo = {
  name: `CF - MemoryAir: Hero Product Image Replacement`,
};

// @coframe-ignore-query: #lp-pom-image-137
// @coframe-ignore-query: #lp-pom-image-138
// @coframe-ignore-query: #lp-pom-image-139
// @coframe-ignore-query: #lp-pom-image-140
// @coframe-ignore-query: #lp-pom-image-166
// @coframe-ignore-query: #lp-pom-image-167
// @coframe-ignore-query: #lp-pom-box-418
// @coframe-ignore-query: #lp-pom-box-416
// @coframe-ignore-query: #lp-pom-box-417-color-overlay img
// @coframe-ignore-query: .cf-image-wrapper

// Initialize test and exit if already running
let testInitiated = initTest(testInfo);
if (!testInitiated) return false;

// Main Code
monitorChangesByConditionAndRun(checkForElements, onElementsFound, true); // Keep checking for mobile lazy-loaded images

// === MAIN FUNCTIONS ===

function onElementsFound() {
  console.log(`Running Code for: `, testInfo.name, testInfo);
  document
    .querySelector(`body`)
    ?.setAttribute(`cf-test-active`, testInfo.name);

  let imagesReplaced = 0;
  const newImageUrl = 'https://cdn.coframe.com/assets/memoryair/freepik__can-you-change-the-color-of-the-product-or-somethi__33820-b5938401-30f6-4e80-861f-ef16fa3ebe5c.webp';

  // Replace mobile hero image
  const mobileImageContainer = document.querySelector('#lp-pom-image-120');
  if (mobileImageContainer) {
    const imgElement = mobileImageContainer.querySelector('img');
    if (imgElement) {
      replaceHeroImage(imgElement, newImageUrl);
      imagesReplaced++;
      console.log('Replaced mobile hero image in #lp-pom-image-120');
    }
  }

  // Replace desktop hero image (box with color overlay)
  const desktopBox = document.querySelector('#lp-pom-box-417-color-overlay');
  if (desktopBox) {
    // Set as background image directly (this box doesn't contain an img element)
    (desktopBox as HTMLElement).style.backgroundImage = `url('${newImageUrl}')`;
    (desktopBox as HTMLElement).style.backgroundSize = 'contain';
    (desktopBox as HTMLElement).style.backgroundPosition = 'center';
    (desktopBox as HTMLElement).style.backgroundRepeat = 'no-repeat';
    imagesReplaced++;
    console.log('Replaced desktop hero background in #lp-pom-box-417-color-overlay');
  }

  if (imagesReplaced > 0) {
    console.log(`Successfully replaced ${imagesReplaced} hero image(s) (desktop + mobile)`);
    
    // Emit success event only after all changes are applied
    window.CFQ = window.CFQ || [];
    window.CFQ.push({ emit: 'variantRendered' });
  } else {
    console.error('No hero images found to replace');
  }
}

function replaceHeroImage(imgElement: HTMLImageElement, newSrc: string) {
  // Store original image properties for fallback
  const originalSrc = imgElement.src;

  // Set new image source and alt text
  imgElement.src = newSrc;
  imgElement.alt = 'Memory Air device hero image';

  // Clear and update all responsive image attributes
  // This ensures mobile devices use the new image
  imgElement.removeAttribute('srcset');
  imgElement.removeAttribute('data-src-mobile-1x');
  imgElement.removeAttribute('data-src-mobile-2x');
  imgElement.removeAttribute('data-src-mobile-3x');
  imgElement.removeAttribute('data-srcset');
  imgElement.removeAttribute('data-src');
  imgElement.removeAttribute('data-lazy-src');
  
  // Set srcset to use the new image for all resolutions
  imgElement.srcset = `${newSrc} 1x, ${newSrc} 2x, ${newSrc} 3x`;

  // Force reload the image to ensure mobile devices pick up the change
  const tempSrc = imgElement.src;
  imgElement.src = '';
  imgElement.src = tempSrc;

  // Apply responsive image handling - display full image with contain
  imgElement.style.width = '100%';
  imgElement.style.height = 'auto';
  imgElement.style.maxWidth = '250px'; // Further reduced for more zoom out
  imgElement.style.maxHeight = '250px'; // Further reduced for more zoom out
  imgElement.style.objectFit = 'contain'; // Ensure full image is visible without cutoff
  imgElement.style.display = 'block';
  imgElement.style.margin = '0 auto'; // Center the image

  // Add loading optimization
  imgElement.loading = 'eager'; // Hero images should load immediately
  
  // Mark as replaced to track which images we've already processed
  imgElement.setAttribute('data-cf-replaced', 'true');

  // Handle image load error with fallback
  imgElement.onerror = function () {
    console.error('Failed to load new hero image, reverting to original');
    imgElement.src = originalSrc;
    imgElement.onerror = null; // Prevent infinite loop
  };

  // Create a wrapper div to contain the image and prevent overflow
  const container = imgElement.closest('.lp-pom-image-container');
  if (container) {
    const containerEl = container as HTMLElement;
    
    // Create wrapper div if it doesn't already exist
    let wrapper = containerEl.querySelector('.cf-image-wrapper') as HTMLElement;
    if (!wrapper) {
      wrapper = document.createElement('div');
      wrapper.className = 'cf-image-wrapper';
      
      // Style the wrapper to contain the image properly
      wrapper.style.width = '100%';
      wrapper.style.maxHeight = '450px'; // Reduced from 600px for better containment
      wrapper.style.display = 'flex';
      wrapper.style.alignItems = 'center';
      wrapper.style.justifyContent = 'center';
      wrapper.style.overflow = 'hidden'; // Prevent image from overflowing
      wrapper.style.position = 'relative';
      wrapper.style.padding = '10px 0'; // Reduced padding
      
      // Move the image into the wrapper
      const parent = imgElement.parentNode;
      if (parent) {
        parent.insertBefore(wrapper, imgElement);
        wrapper.appendChild(imgElement);
      }
    }
    
    // Ensure container doesn't overflow
    containerEl.style.position = 'relative';
    containerEl.style.overflow = 'hidden';
  }
  
  // Also check if this image is inside a picture element and update sources
  const pictureParent = imgElement.closest('picture');
  if (pictureParent) {
    const sources = pictureParent.querySelectorAll('source');
    sources.forEach(source => {
      source.srcset = newSrc;
      source.removeAttribute('media'); // Remove media queries to force use new image
    });
  }
}

function checkForElements() {
  try {
    const cfDefined = typeof window.CF !== "undefined";
    console.log("Check: typeof window.CF !== 'undefined' =>", cfDefined);

    const testActiveSelector = `body[cf-test-active="${testInfo.name}"]`;
    const testActiveElem = document.querySelector(testActiveSelector);
    const testActiveAbsent = !testActiveElem;
    console.log(`Check: !document.querySelector('${testActiveSelector}') =>`, testActiveAbsent);

    // Check for either mobile or desktop hero image to ensure page is loaded
    const heroImageExists = document.querySelector('#lp-pom-image-120') ||
      document.querySelector('#lp-pom-box-417-color-overlay');
    console.log("Check: Hero image container exists =>", !!heroImageExists);

    return cfDefined && testActiveAbsent && !!heroImageExists;
  } catch (e) {
    console.error("Check error:", e);
    return false;
  }
}

// === HELPER FUNCTIONS ===

function monitorChangesByConditionAndRun(check, code, keepChecking = false) {
  let checkAndRun = () =>
    check() && (!keepChecking && observer.disconnect(), code());
  var observer = new MutationObserver(checkAndRun);
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
  checkAndRun(); // Run once immediately

  // 10s observer killswitch
  if (!keepChecking) setTimeout(() => observer.disconnect(), 10000);
}

function initTest() {
  // Obtain or Create Object For Tests
  let cfObj = window.CF || { qaTesting: false, testsRunning: [] };

  // Check Whether Test Is Already Running
  if (cfObj.testsRunning.find((test) => test.name == testInfo.name)) {
    console.warn(`The following test is already running: `, testInfo);
    return false;
  }

  // Add Test to List of Running Tests
  cfObj.testsRunning = [...cfObj.testsRunning, testInfo];

  // Update Global Object
  window.CF = { ...window.CF, ...cfObj };

  return { ...window.CF };
}
