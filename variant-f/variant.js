// Test Configuration
let testInfo = {
  name: `CF XX - Homepage: Complete Revamp`,
};

// Initialize test and exit if already running
let testInitiated = initTest(testInfo);
if (!testInitiated) return false;

// Main Code
monitorChangesByConditionAndRun(checkForElements, onElementsFound);

// === MAIN FUNCTIONS ===

function onElementsFound() {
  console.log(`Running Code for: `, testInfo.name, testInfo);
  
  try {
    document.body.setAttribute('data-mark1', 'fa-home-revamp');
    document.body.setAttribute('cf-test-active', testInfo.name);

    hideExistingContent();
    buildNewHomepage();

    window.CFQ = window.CFQ || [];
    window.CFQ.push({ emit: 'variantRendered' });
  } catch (e) {
    console.error('Error applying variant:', e);
  }
}

function checkForElements() {
  try {
    const cfDefined = typeof window.CF !== "undefined";
    const testActiveSelector = `body[cf-test-active="${testInfo.name}"]`;
    const testActiveElem = document.querySelector(testActiveSelector);
    const testActiveAbsent = !testActiveElem;
    const mainContent = document.querySelector('#main');
    
    return cfDefined && testActiveAbsent && mainContent;
  } catch (e) {
    console.error("Check error:", e);
    return false;
  }
}

// === HELPER FUNCTIONS ===

function hideExistingContent() {
  const mainContent = document.querySelector('#main');
  if (mainContent) {
    mainContent.setAttribute('aria-hidden', 'true');
    mainContent.setAttribute('data-mark1-hidden', 'true');
    mainContent.style.display = 'none';
  }
  
  // Hide ALL possible headers - comprehensive approach
  // @coframe-ignore-query: .fusion-secondary-header
  const headerSelectors = [
    'header.fusion-header-wrapper',
    '.fusion-header',
    '.fusion-header-v1',
    '.fusion-secondary-header',
    'header[class*="fusion"]',
    '.fusion-mobile-nav-holder'
  ];
  
  headerSelectors.forEach(selector => {
    const headers = document.querySelectorAll(selector);
    headers.forEach(header => {
      header.setAttribute('aria-hidden', 'true');
      header.setAttribute('data-mark1-hidden', 'true');
      header.style.display = 'none';
      header.style.visibility = 'hidden';
      header.style.opacity = '0';
      header.style.pointerEvents = 'none';
    });
  });
  
  // Hide original site footer
  const originalFooter = document.querySelector('.fusion-footer, footer.fusion-footer-copyright-area');
  if (originalFooter) {
    originalFooter.setAttribute('aria-hidden', 'true');
    originalFooter.setAttribute('data-mark1-hidden', 'true');
    originalFooter.style.display = 'none';
  }
  
  // Hide all footer areas
  const footerAreas = document.querySelectorAll('.fusion-footer, .fusion-footer-copyright-area');
  footerAreas.forEach(footer => {
    footer.setAttribute('aria-hidden', 'true');
    footer.setAttribute('data-mark1-hidden', 'true');
    footer.style.display = 'none';
  });
}

function buildNewHomepage() {
  const mainContent = document.querySelector('#main');
  if (!mainContent) return;

  const newContent = (
    <div className="cf:w-full" data-mark1="new-homepage">
      <Header />
      <HeroSection />
      <TrustStrip />
      <FeaturedServices />
      <TreatmentFinderQuiz />
      <ConsultationPanel />
      <BeforeAfter />
      <Reviews />
      <WhyChooseUs />
      <MembershipsOffers />
      <TeamSpotlight />
      <LocationContact />
      <FAQAccordion />
      <Footer />
    </div>
  );

  mainContent.parentElement?.insertBefore(newContent, mainContent);
}

// === COMPONENTS ===

function Header() {
  const headerRef = { current: null as HTMLElement | null };
  
  function setupStickyHeader() {
    if (!headerRef.current) return;
    
    const observer = new IntersectionObserver(
      ([e]) => {
        if (headerRef.current) {
          headerRef.current.classList.toggle('cf:shadow-2xl', e.intersectionRatio < 1);
        }
      },
      { threshold: [1] }
    );
    
    observer.observe(headerRef.current);
  }
  
  setTimeout(setupStickyHeader, 100);
  
  return (
    <header ref={headerRef} className="cf:sticky cf:top-0 cf:z-50 cf:bg-[#7B2A7C] cf:transition-shadow cf:duration-300">
      <MainNav />
    </header>
  );
}

function MainNav() {
  const mobileMenuRef = { current: null as HTMLDivElement | null };
  
  function toggleMobileMenu() {
    if (mobileMenuRef.current) {
      const isOpen = mobileMenuRef.current.classList.contains('cf:translate-x-0');
      if (isOpen) {
        mobileMenuRef.current.classList.remove('cf:translate-x-0');
        mobileMenuRef.current.classList.add('cf:translate-x-full');
      } else {
        mobileMenuRef.current.classList.add('cf:translate-x-0');
        mobileMenuRef.current.classList.remove('cf:translate-x-full');
      }
    }
  }
  
  function closeMobileMenu() {
    if (mobileMenuRef.current) {
      mobileMenuRef.current.classList.remove('cf:translate-x-0');
      mobileMenuRef.current.classList.add('cf:translate-x-full');
    }
  }
  
  return (
    <nav className="cf:max-w-7xl cf:mx-auto cf:px-4 cf:py-4" aria-label="Main Navigation">
      <div className="cf:flex cf:justify-between cf:items-center">
        {/* Logo */}
        <a href="https://floridaaesthetics.com/" className="cf:flex cf:items-center">
          <img src="https://floridaaesthetics.com/wp-content/uploads/2020/04/Logo-200.png" alt="Florida Aesthetics Logo" className="cf:h-10 cf:md:h-14" />
        </a>
        
        {/* Desktop Navigation */}
        <ul className="cf:hidden cf:lg:flex cf:gap-6 cf:items-center cf:list-none cf:m-0">
          <li className="cf:relative cf:group">
            <button className="cf:text-white cf:hover:text-purple-200 cf:font-medium cf:py-2 cf:bg-transparent cf:border-none cf:cursor-pointer cf:text-base">
              Treatments ▾
            </button>
            <TreatmentsMegaMenu />
          </li>
          <li className="cf:relative cf:group">
            <button className="cf:text-white cf:hover:text-purple-200 cf:font-medium cf:py-2 cf:bg-transparent cf:border-none cf:cursor-pointer cf:text-base">
              Concerns ▾
            </button>
            <ConcernsMegaMenu />
          </li>
          <li><a href="https://shop.floridaaesthetics.com/collections/treatments" className="cf:text-white cf:hover:text-purple-200 cf:font-medium cf:text-base">Specials</a></li>
          <li><a href="https://shop.floridaaesthetics.com/" className="cf:text-white cf:hover:text-purple-200 cf:font-medium cf:text-base">Shop</a></li>
          <li className="cf:relative cf:group">
            <button className="cf:text-white cf:hover:text-purple-200 cf:font-medium cf:py-2 cf:bg-transparent cf:border-none cf:cursor-pointer cf:text-base">
              About ▾
            </button>
            <AboutDropdown />
          </li>
          <li><a href="https://floridaaesthetics.com/en-espanol/" className="cf:text-white cf:hover:text-purple-200 cf:font-medium cf:text-base">Español</a></li>
        </ul>
        
        {/* Desktop CTAs */}
        <div className="cf:hidden cf:lg:flex cf:gap-3 cf:items-center">
          <a href="tel:8133454044" className="cf:text-white cf:hover:text-purple-200 cf:font-semibold cf:whitespace-nowrap cf:text-base">
            📞 (813) 345-4044
          </a>
          <a href="https://floridaaesthetics.com/schedule-appointment/" className="cf:bg-white cf:text-[#7B2A7C] cf:px-6 cf:py-2 cf:rounded-lg cf:hover:bg-[#7B2A7C] cf:hover:text-white cf:font-bold cf:whitespace-nowrap cf:transition-all cf:shadow-lg cf:text-base">
            Schedule
          </a>
          <a href="https://floridaaesthetics.com/florida/complimentary-consultation/" className="cf:border-2 cf:border-white cf:text-white cf:px-6 cf:py-2 cf:rounded-lg cf:hover:bg-white cf:hover:text-[#7B2A7C] cf:font-bold cf:whitespace-nowrap cf:transition-all cf:text-base">
            Free Consult
          </a>
        </div>
        
        {/* Mobile Header - Phone + Hamburger */}
        <div className="cf:flex cf:lg:hidden cf:items-center cf:gap-4">
          <a href="tel:8133454044" className="cf:text-white cf:text-lg">
            📞
          </a>
          <button onClick={toggleMobileMenu} className="cf:text-white cf:text-3xl cf:p-2 cf:bg-transparent cf:border-none cf:cursor-pointer">
            ☰
          </button>
        </div>
      </div>
      
      {/* Mobile Sidebar Menu */}
      <div 
        ref={mobileMenuRef} 
        className="cf:fixed cf:top-0 cf:right-0 cf:h-full cf:w-[300px] cf:bg-white cf:shadow-2xl cf:z-[100] cf:transform cf:translate-x-full cf:transition-transform cf:duration-300 cf:overflow-y-auto cf:lg:hidden"
      >
        <div className="cf:p-6">
          {/* Close Button */}
          <div className="cf:flex cf:justify-end cf:mb-6">
            <button onClick={closeMobileMenu} className="cf:text-gray-700 cf:text-3xl cf:p-2 cf:bg-transparent cf:border-none cf:cursor-pointer">
              ×
            </button>
          </div>
          
          {/* Logo */}
          <div className="cf:mb-8 cf:text-center">
            <img src="https://floridaaesthetics.com/wp-content/uploads/2020/04/Logo-200.png" alt="Florida Aesthetics" className="cf:h-16 cf:mx-auto" />
          </div>
          
          {/* Menu Links */}
          <ul className="cf:flex cf:flex-col cf:gap-4 cf:list-none cf:m-0 cf:p-0">
            <li><a href="https://floridaaesthetics.com/injectable-treatments/" className="cf:block cf:py-3 cf:px-4 cf:text-gray-700 cf:hover:bg-purple-50 cf:hover:text-[#7B2A7C] cf:rounded-lg cf:transition-all cf:font-medium">Treatments</a></li>
            <li><a href="https://floridaaesthetics.com/concerns/aging-skin/" className="cf:block cf:py-3 cf:px-4 cf:text-gray-700 cf:hover:bg-purple-50 cf:hover:text-[#7B2A7C] cf:rounded-lg cf:transition-all cf:font-medium">Concerns</a></li>
            <li><a href="https://shop.floridaaesthetics.com/collections/treatments" className="cf:block cf:py-3 cf:px-4 cf:text-gray-700 cf:hover:bg-purple-50 cf:hover:text-[#7B2A7C] cf:rounded-lg cf:transition-all cf:font-medium">Specials</a></li>
            <li><a href="https://shop.floridaaesthetics.com/" className="cf:block cf:py-3 cf:px-4 cf:text-gray-700 cf:hover:bg-purple-50 cf:hover:text-[#7B2A7C] cf:rounded-lg cf:transition-all cf:font-medium">Shop</a></li>
            <li><a href="https://floridaaesthetics.com/about/" className="cf:block cf:py-3 cf:px-4 cf:text-gray-700 cf:hover:bg-purple-50 cf:hover:text-[#7B2A7C] cf:rounded-lg cf:transition-all cf:font-medium">About</a></li>
            <li><a href="https://floridaaesthetics.com/online-reviews/" className="cf:block cf:py-3 cf:px-4 cf:text-gray-700 cf:hover:bg-purple-50 cf:hover:text-[#7B2A7C] cf:rounded-lg cf:transition-all cf:font-medium">Reviews</a></li>
            <li><a href="https://floridaaesthetics.com/contact/" className="cf:block cf:py-3 cf:px-4 cf:text-gray-700 cf:hover:bg-purple-50 cf:hover:text-[#7B2A7C] cf:rounded-lg cf:transition-all cf:font-medium">Contact</a></li>
            <li><a href="https://floridaaesthetics.com/en-espanol/" className="cf:block cf:py-3 cf:px-4 cf:text-gray-700 cf:hover:bg-purple-50 cf:hover:text-[#7B2A7C] cf:rounded-lg cf:transition-all cf:font-medium">En español</a></li>
          </ul>
          
          {/* Mobile CTAs */}
          <div className="cf:flex cf:flex-col cf:gap-4 cf:mt-8">
            <a href="tel:8133454044" className="cf:block cf:py-3 cf:px-6 cf:bg-[#7B2A7C] cf:text-white cf:text-center cf:rounded-full cf:font-semibold cf:shadow-lg">
              📞 (813) 345-4044
            </a>
            <a href="https://floridaaesthetics.com/schedule-appointment/" className="cf:block cf:py-3 cf:px-6 cf:bg-[#7B2A7C] cf:text-white cf:text-center cf:rounded-full cf:font-bold cf:shadow-lg">
              Schedule Appointment
            </a>
            <a href="https://floridaaesthetics.com/florida/complimentary-consultation/" className="cf:block cf:py-3 cf:px-6 cf:border-2 cf:border-[#7B2A7C] cf:text-[#7B2A7C] cf:text-center cf:rounded-full cf:font-bold">
              Free Consultation
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

function TreatmentsMegaMenu() {
  return (
    <div className="cf:absolute cf:left-0 cf:top-full cf:bg-white cf:shadow-2xl cf:rounded-lg cf:p-6 cf:w-[800px] cf:hidden cf:group-hover:block cf:z-50 cf:mt-2">
      <div className="cf:grid cf:grid-cols-3 cf:gap-6">
        <div>
          <h3 className="cf:font-bold cf:text-[#7B2A7C] cf:mb-3 cf:text-base">Injectables</h3>
          <ul className="cf:list-none cf:m-0 cf:p-0 cf:flex cf:flex-col cf:gap-2">
            <li><a href="https://floridaaesthetics.com/injectable-treatments/botox/" className="cf:text-gray-700 cf:hover:text-[#7B2A7C] cf:text-sm">BOTOX</a></li>
            <li><a href="https://floridaaesthetics.com/injectable-treatments/juvederm/" className="cf:text-gray-700 cf:hover:text-[#7B2A7C] cf:text-sm">Juvederm</a></li>
            <li><a href="https://floridaaesthetics.com/injectable-treatments/kybella/" className="cf:text-gray-700 cf:hover:text-[#7B2A7C] cf:text-sm">Kybella</a></li>
            <li><a href="https://floridaaesthetics.com/injectable-treatments/sculptra-aesthetic/" className="cf:text-gray-700 cf:hover:text-[#7B2A7C] cf:text-sm">Sculptra</a></li>
          </ul>
        </div>
        <div>
          <h3 className="cf:font-bold cf:text-[#7B2A7C] cf:mb-3 cf:text-base">Lasers</h3>
          <ul className="cf:list-none cf:m-0 cf:p-0 cf:flex cf:flex-col cf:gap-2">
            <li><a href="https://floridaaesthetics.com/laser-treatments/laser-hair-removal/" className="cf:text-gray-700 cf:hover:text-[#7B2A7C] cf:text-sm">Hair Removal</a></li>
            <li><a href="https://floridaaesthetics.com/laser-treatments/laser-skin-rejuvenation/" className="cf:text-gray-700 cf:hover:text-[#7B2A7C] cf:text-sm">Skin Rejuvenation</a></li>
            <li><a href="https://floridaaesthetics.com/rejuvenation/bbl/" className="cf:text-gray-700 cf:hover:text-[#7B2A7C] cf:text-sm">BBL</a></li>
            <li><a href="https://floridaaesthetics.com/rejuvenation/moxi/" className="cf:text-gray-700 cf:hover:text-[#7B2A7C] cf:text-sm">Moxi</a></li>
          </ul>
        </div>
        <div>
          <h3 className="cf:font-bold cf:text-[#7B2A7C] cf:mb-3 cf:text-base">Body & Wellness</h3>
          <ul className="cf:list-none cf:m-0 cf:p-0 cf:flex cf:flex-col cf:gap-2">
            <li><a href="https://floridaaesthetics.com/coolsculpting-at-florida-aesthetics/" className="cf:text-gray-700 cf:hover:text-[#7B2A7C] cf:text-sm">CoolSculpting</a></li>
            <li><a href="https://floridaaesthetics.com/wellness/weight-loss/" className="cf:text-gray-700 cf:hover:text-[#7B2A7C] cf:text-sm">Weight Loss</a></li>
            <li><a href="https://floridaaesthetics.com/hormone-replacement-therapy/" className="cf:text-gray-700 cf:hover:text-[#7B2A7C] cf:text-sm">BHRT</a></li>
            <li><a href="https://floridaaesthetics.com/wellness/semaglutide/" className="cf:text-gray-700 cf:hover:text-[#7B2A7C] cf:text-sm">Semaglutide</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function ConcernsMegaMenu() {
  const concerns = [
    'Acne', 'Aging Skin', 'Double Chin', 'Enlarged Pores', 
    'Fine Lines', 'Freckles & Dark Spots', 'Loss of Volume', 'Melasma',
    'Nasolabial Folds', 'Overweight', 'Rosacea', 'Sagging Skin',
    'Stubborn Fat', 'Sun Damage', 'Thin Lips', 'Unwanted Hair', 'Wrinkles'
  ];
  
  const concernSlug = (name) => name.toLowerCase().replace(/\s+&\s+/g, '-').replace(/\s+/g, '-');
  
  return (
    <div className="cf:absolute cf:left-0 cf:top-full cf:bg-white cf:shadow-2xl cf:rounded-lg cf:p-6 cf:w-[600px] cf:hidden cf:group-hover:block cf:z-50 cf:mt-2">
      <div className="cf:grid cf:grid-cols-3 cf:gap-3">
        {concerns.map((concern, index) => (
          <a 
            key={index} 
            href={`https://floridaaesthetics.com/concerns/${concernSlug(concern)}/`}
            className="cf:px-3 cf:py-2 cf:bg-purple-50 cf:text-gray-700 cf:rounded-lg cf:hover:bg-[#7B2A7C] cf:hover:text-white cf:text-sm cf:text-center cf:transition-all"
          >
            {concern}
          </a>
        ))}
      </div>
    </div>
  );
}

function AboutDropdown() {
  return (
    <div className="cf:absolute cf:left-0 cf:top-full cf:bg-white cf:shadow-xl cf:rounded-lg cf:overflow-hidden cf:w-48 cf:hidden cf:group-hover:block cf:z-50 cf:mt-2">
      <a href="https://floridaaesthetics.com/medical-practitioners/" className="cf:block cf:px-4 cf:py-3 cf:text-gray-700 cf:hover:bg-purple-50 cf:hover:text-[#7B2A7C]">Our Practitioners</a>
      <a href="https://floridaaesthetics.com/online-reviews/" className="cf:block cf:px-4 cf:py-3 cf:text-gray-700 cf:hover:bg-purple-50 cf:hover:text-[#7B2A7C]">Reviews</a>
      <a href="https://floridaaesthetics.com/contact/" className="cf:block cf:px-4 cf:py-3 cf:text-gray-700 cf:hover:bg-purple-50 cf:hover:text-[#7B2A7C]">Contact</a>
      <a href="https://floridaaesthetics.com/service-faqs/" className="cf:block cf:px-4 cf:py-3 cf:text-gray-700 cf:hover:bg-purple-50 cf:hover:text-[#7B2A7C]">FAQs</a>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="cf:bg-gradient-to-br cf:from-purple-50 cf:via-white cf:to-pink-50 cf:py-12 cf:md:py-24">
      <div className="cf:max-w-7xl cf:mx-auto cf:px-4">
        {/* Image First - Rectangle Format */}
        <div className="cf:mb-8 cf:md:mb-12">
          <img 
            src="https://floridaaesthetics.com/wp-content/uploads/2023/08/fa-hero.webp" 
            alt="Florida Aesthetics Med Spa" 
            className="cf:rounded-2xl cf:shadow-2xl cf:w-full cf:h-[400px] cf:md:h-[500px] cf:object-cover" 
          />
        </div>
        
        {/* Content Section */}
        <div className="cf:max-w-4xl cf:mx-auto cf:text-center">
          {/* Headline */}
          <h1 className="cf:text-4xl cf:md:text-5xl cf:lg:text-6xl cf:font-light cf:mb-6 cf:text-gray-900 cf:leading-tight">
            Reclaim Your Natural Beauty & Confidence
          </h1>
          
          {/* Description */}
          <p className="cf:text-lg cf:md:text-xl cf:mb-8 cf:text-gray-600 cf:leading-relaxed cf:font-light">
            Expert aesthetic treatments to help you look and feel your best at every age
          </p>
          
          {/* CTA Buttons */}
          <div className="cf:flex cf:flex-col cf:sm:flex-row cf:gap-4 cf:mb-12 cf:justify-center">
            <a href="https://floridaaesthetics.com/schedule-appointment/" className="cf:bg-[#7B2A7C] cf:text-white cf:px-10 cf:py-4 cf:rounded-full cf:hover:bg-[#5a1f5b] cf:hover:text-white cf:font-semibold cf:text-lg cf:shadow-lg cf:transform cf:hover:scale-105 cf:transition-all">
              Book Appointment
            </a>
            <a href="https://floridaaesthetics.com/florida/complimentary-consultation/" className="cf:bg-white cf:text-[#7B2A7C] cf:px-10 cf:py-4 cf:border-2 cf:border-[#7B2A7C] cf:rounded-full cf:hover:bg-[#7B2A7C] cf:hover:text-white cf:font-semibold cf:text-lg cf:transition-all cf:shadow-lg">
              Free Consultation
            </a>
          </div>
          
          {/* Interactive Trust Boxes */}
          <div className="cf:grid cf:grid-cols-1 cf:md:grid-cols-3 cf:gap-4 cf:max-w-3xl cf:mx-auto">
            <div className="cf:bg-white cf:p-6 cf:rounded-xl cf:shadow-md cf:border cf:border-purple-100 cf:transform cf:hover:scale-105 cf:hover:shadow-xl cf:transition-all cf:duration-300 cf:cursor-pointer">
              <div className="cf:flex cf:flex-col cf:items-center cf:text-center">
                <span className="cf:text-[#7B2A7C] cf:text-4xl cf:mb-3">✓</span>
                <span className="cf:text-gray-900 cf:font-semibold">Board-Certified Providers</span>
              </div>
            </div>
            <div className="cf:bg-white cf:p-6 cf:rounded-xl cf:shadow-md cf:border cf:border-purple-100 cf:transform cf:hover:scale-105 cf:hover:shadow-xl cf:transition-all cf:duration-300 cf:cursor-pointer">
              <div className="cf:flex cf:flex-col cf:items-center cf:text-center">
                <span className="cf:text-[#7B2A7C] cf:text-4xl cf:mb-3">★</span>
                <span className="cf:text-gray-900 cf:font-semibold">4.9★ Review Rating</span>
              </div>
            </div>
            <div className="cf:bg-white cf:p-6 cf:rounded-xl cf:shadow-md cf:border cf:border-purple-100 cf:transform cf:hover:scale-105 cf:hover:shadow-xl cf:transition-all cf:duration-300 cf:cursor-pointer">
              <div className="cf:flex cf:flex-col cf:items-center cf:text-center">
                <span className="cf:text-[#7B2A7C] cf:text-4xl cf:mb-3">💳</span>
                <span className="cf:text-gray-900 cf:font-semibold">Flexible Financing</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustStrip() {
  return (
    <div className="cf:bg-white cf:py-8 cf:border-y cf:border-purple-100">
      <div className="cf:max-w-7xl cf:mx-auto cf:px-4 cf:text-center">
        <p className="cf:text-gray-700 cf:text-lg cf:font-light cf:tracking-wide">
          ⭐ Trusted by thousands across Brandon & Tampa Bay since 2007
        </p>
      </div>
    </div>
  );
}

function FeaturedServices() {
  const services = [
    {
      title: 'Botox',
      benefit: 'Smooth fine lines and wrinkles for a youthful appearance',
      link: 'https://floridaaesthetics.com/injectable-treatments/botox/'
    },
    {
      title: 'Dermal Fillers',
      benefit: 'Restore volume and enhance facial contours naturally',
      link: 'https://floridaaesthetics.com/injectable-treatments/juvederm/'
    },
    {
      title: 'CoolSculpting',
      benefit: 'Eliminate stubborn fat without surgery or downtime',
      link: 'https://floridaaesthetics.com/coolsculpting-at-florida-aesthetics/'
    },
    {
      title: 'Laser Hair Removal',
      benefit: 'Permanent hair reduction for smooth, confident skin',
      link: 'https://floridaaesthetics.com/laser-treatments/laser-hair-removal/'
    },
    {
      title: 'Skin Rejuvenation',
      benefit: 'Reveal brighter, more youthful-looking skin',
      link: 'https://floridaaesthetics.com/laser-treatments/laser-skin-rejuvenation/'
    },
    {
      title: 'Medical Facials & Peels',
      benefit: 'Deep cleansing and renewal for radiant complexion',
      link: 'https://floridaaesthetics.com/medical-grade-facial-treatment/'
    },
    {
      title: 'BBL & Skin Tightening',
      benefit: 'Restore elasticity and clear sun damage',
      link: 'https://floridaaesthetics.com/rejuvenation/bbl/'
    },
    {
      title: 'Weight Loss & Wellness',
      benefit: 'Physician-supervised programs for lasting results',
      link: 'https://floridaaesthetics.com/wellness/weight-loss/'
    },
    {
      title: 'Hormone Therapy (BHRT)',
      benefit: 'Balance hormones naturally for better health',
      link: 'https://floridaaesthetics.com/hormone-replacement-therapy/'
    },
    {
      title: 'Semaglutide',
      benefit: 'FDA-approved weight management injections',
      link: 'https://floridaaesthetics.com/wellness/semaglutide/'
    }
  ];

  return (
    <section className="cf:bg-gradient-to-b cf:from-white cf:to-purple-50 cf:py-24">
      <div className="cf:max-w-7xl cf:mx-auto cf:px-4">
        <h2 className="cf:text-4xl cf:font-light cf:text-center cf:mb-4 cf:text-gray-900 cf:tracking-wide">
          Our Featured Services
        </h2>
        <p className="cf:text-center cf:text-gray-600 cf:mb-16 cf:max-w-2xl cf:mx-auto cf:font-light cf:text-lg">
          From CoolSculpting to injectables, lasers to rejuvenation—we have the right treatment for you
        </p>
        <div className="cf:grid cf:grid-cols-1 cf:md:grid-cols-5 cf:gap-6">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ title, benefit, link }) {
  return (
    <a href={link} className="cf:group cf:block cf:bg-white cf:p-6 cf:rounded-2xl cf:shadow-md cf:hover:shadow-2xl cf:transition-all cf:duration-500 cf:border cf:border-purple-100 cf:hover:border-[#7B2A7C] cf:transform cf:hover:-translate-y-1">
      <h3 className="cf:text-lg cf:font-semibold cf:mb-3 cf:text-gray-900 cf:group-hover:text-[#7B2A7C] cf:transition-colors">{title}</h3>
      <p className="cf:text-gray-600 cf:mb-4 cf:text-sm cf:leading-relaxed cf:font-light">{benefit}</p>
      <span className="cf:text-[#7B2A7C] cf:font-semibold cf:text-sm cf:group-hover:underline">Learn More →</span>
    </a>
  );
}

function TreatmentFinderQuiz() {
  const quizRef = { current: null as HTMLDivElement | null };
  const currentStep = { value: 1 };
  const selections = { 
    concern: '',
    area: '',
    skinType: '',
    age: '',
    gender: '',
    previousTreatments: '',
    goals: '',
    lifestyle: '',
    budget: '',
    timeline: '',
    downtime: '',
    consultation: '',
    name: '',
    email: '',
    phone: ''
  };

  function selectOption(step, value) {
    const mapping = {
      1: 'concern', 2: 'area', 3: 'skinType', 4: 'age', 5: 'gender',
      6: 'previousTreatments', 7: 'goals', 8: 'lifestyle', 9: 'budget',
      10: 'timeline', 11: 'downtime', 12: 'consultation'
    };
    
    if (mapping[step]) selections[mapping[step]] = value;
    
    if (step < 15) {
      currentStep.value = step + 1;
      updateQuizDisplay();
    }
  }

  function handleTextInput(step, value) {
    if (step === 13) selections.name = value;
    if (step === 14) selections.email = value;
    if (step === 15) selections.phone = value;
  }

  function nextTextStep() {
    if (currentStep.value === 15) {
      showResults();
    } else if (currentStep.value < 15) {
      currentStep.value++;
      updateQuizDisplay();
    }
  }

  function updateQuizDisplay() {
    if (!quizRef.current) return;
    const allSteps = quizRef.current.querySelectorAll('[data-step], [data-results]');
    allSteps.forEach((el) => {
      if (el.hasAttribute('data-step')) {
        const stepNum = parseInt(el.getAttribute('data-step'));
        el.style.display = stepNum === currentStep.value ? 'block' : 'none';
      } else {
        el.style.display = 'none';
      }
    });
  }

  function showResults() {
    if (!quizRef.current) return;
    const resultsEl = quizRef.current.querySelector('[data-results]');
    const allSteps = quizRef.current.querySelectorAll('[data-step]');
    
    allSteps.forEach(el => el.style.display = 'none');
    if (resultsEl) resultsEl.style.display = 'block';
    
    const recommendation = getBestMatch(selections);
    const recTitle = quizRef.current.querySelector('[data-rec-title]');
    const recCost = quizRef.current.querySelector('[data-rec-cost]');
    const recTimeline = quizRef.current.querySelector('[data-rec-timeline]');
    const recSessions = quizRef.current.querySelector('[data-rec-sessions]');
    const recDowntime = quizRef.current.querySelector('[data-rec-downtime]');
    const recButton = quizRef.current.querySelector('[data-rec-button]');
    
    if (recTitle) recTitle.textContent = recommendation.name;
    if (recCost) recCost.textContent = recommendation.cost;
    if (recTimeline) recTimeline.textContent = recommendation.timeline;
    if (recSessions) recSessions.textContent = recommendation.sessions;
    if (recDowntime) recDowntime.textContent = recommendation.downtime;
    if (recButton) {
      recButton.textContent = `View ${recommendation.name} Details`;
      recButton.onclick = () => window.location.href = recommendation.url;
    }
  }

  function getBestMatch(sel) {
    if ((sel.concern === 'wrinkles' || sel.concern === 'aging') && sel.area === 'face') {
      return {
        name: 'Botox Injections',
        cost: '$300-$600 per treatment',
        timeline: '3-7 days to see results',
        sessions: '1 session every 3-4 months',
        downtime: 'None - immediate return to activities',
        url: 'https://floridaaesthetics.com/injectable-treatments/botox/'
      };
    }
    
    if (sel.concern === 'volume' && (sel.area === 'face' || sel.area === 'lips')) {
      return {
        name: 'Dermal Fillers (Juvederm)',
        cost: '$600-$1,200 per syringe',
        timeline: 'Immediate visible results',
        sessions: '1-2 sessions initially',
        downtime: 'Minimal - minor swelling 1-2 days',
        url: 'https://floridaaesthetics.com/injectable-treatments/juvederm/'
      };
    }
    
    if (sel.concern === 'fat' && (sel.area === 'abdomen' || sel.area === 'thighs' || sel.area === 'body')) {
      return {
        name: 'CoolSculpting',
        cost: '$2,000-$4,000 (varies by area)',
        timeline: '8-12 weeks for full results',
        sessions: '2-4 sessions recommended',
        downtime: 'None - same-day normal activities',
        url: 'https://floridaaesthetics.com/coolsculpting-at-florida-aesthetics/'
      };
    }
    
    if (sel.concern === 'hair') {
      return {
        name: 'Laser Hair Removal',
        cost: '$150-$500 per session',
        timeline: '6-8 weeks between sessions',
        sessions: '6-8 total sessions needed',
        downtime: 'None - mild redness a few hours',
        url: 'https://floridaaesthetics.com/laser-treatments/laser-hair-removal/'
      };
    }
    
    if (sel.concern === 'skin' || sel.goals === 'weight-loss') {
      return {
        name: 'Laser Skin Rejuvenation',
        cost: '$300-$800 per session',
        timeline: '2-4 weeks to see improvement',
        sessions: '3-5 sessions for best results',
        downtime: 'Minimal - slight redness 1-2 days',
        url: 'https://floridaaesthetics.com/laser-treatments/laser-skin-rejuvenation/'
      };
    }
    
    return {
      name: 'Complimentary Consultation',
      cost: 'Free',
      timeline: 'Book today',
      sessions: '1 personalized consultation',
      downtime: 'None',
      url: 'https://floridaaesthetics.com/florida/complimentary-consultation/'
    };
  }

  setTimeout(() => updateQuizDisplay(), 100);

  return (
    <section className="cf:bg-white cf:py-24">
      <div className="cf:max-w-4xl cf:mx-auto cf:px-4">
        <h2 className="cf:text-4xl cf:font-light cf:text-center cf:mb-6 cf:text-gray-900 cf:tracking-wide">
          Find Your Perfect Treatment
        </h2>
        <p className="cf:text-center cf:text-gray-600 cf:mb-12 cf:text-lg cf:font-light">
          Answer 15 questions to get your personalized recommendation with cost & timeline
        </p>
        
        <div ref={quizRef} className="cf:bg-gradient-to-br cf:from-purple-50 cf:to-pink-50 cf:p-8 cf:md:p-12 cf:rounded-2xl cf:shadow-xl cf:border cf:border-purple-100">
          
          {/* Step 1 - Primary Concern */}
          <div data-step="1">
            <div className="cf:mb-6">
              <div className="cf:flex cf:justify-between cf:mb-4">
                <span className="cf:text-[#7B2A7C] cf:font-semibold">Step 1 of 15</span>
                <span className="cf:text-gray-600 cf:font-light">7%</span>
              </div>
              <div className="cf:w-full cf:bg-purple-200 cf:h-2 cf:rounded-full">
                <div className="cf:bg-[#7B2A7C] cf:h-2 cf:rounded-full cf:w-[7%] cf:transition-all"></div>
              </div>
            </div>
            
            <h3 className="cf:text-2xl cf:font-semibold cf:mb-6 cf:text-gray-900">What is your primary aesthetic concern?</h3>
            <div className="cf:grid cf:grid-cols-1 cf:md:grid-cols-2 cf:gap-4">
              <button onClick={() => selectOption(1, 'wrinkles')} className="cf:bg-white cf:p-6 cf:rounded-xl cf:shadow-md cf:border-2 cf:border-purple-100 cf:hover:border-[#7B2A7C] cf:hover:shadow-xl cf:transform cf:hover:scale-105 cf:transition-all cf:text-left">
                <div className="cf:text-3xl cf:mb-2">📝</div>
                <div className="cf:font-semibold cf:text-gray-900 cf:mb-1">Fine Lines & Wrinkles</div>
                <div className="cf:text-sm cf:text-gray-600 cf:font-light">Smooth and rejuvenate</div>
              </button>
              <button onClick={() => selectOption(1, 'fat')} className="cf:bg-white cf:p-6 cf:rounded-xl cf:shadow-md cf:border-2 cf:border-purple-100 cf:hover:border-[#7B2A7C] cf:hover:shadow-xl cf:transform cf:hover:scale-105 cf:transition-all cf:text-left">
                <div className="cf:text-3xl cf:mb-2">💪</div>
                <div className="cf:font-semibold cf:text-gray-900 cf:mb-1">Stubborn Fat</div>
                <div className="cf:text-sm cf:text-gray-600 cf:font-light">Body contouring</div>
              </button>
              <button onClick={() => selectOption(1, 'hair')} className="cf:bg-white cf:p-6 cf:rounded-xl cf:shadow-md cf:border-2 cf:border-purple-100 cf:hover:border-[#7B2A7C] cf:hover:shadow-xl cf:transform cf:hover:scale-105 cf:transition-all cf:text-left">
                <div className="cf:text-3xl cf:mb-2">✨</div>
                <div className="cf:font-semibold cf:text-gray-900 cf:mb-1">Unwanted Hair</div>
                <div className="cf:text-sm cf:text-gray-600 cf:font-light">Permanent reduction</div>
              </button>
              <button onClick={() => selectOption(1, 'skin')} className="cf:bg-white cf:p-6 cf:rounded-xl cf:shadow-md cf:border-2 cf:border-purple-100 cf:hover:border-[#7B2A7C] cf:hover:shadow-xl cf:transform cf:hover:scale-105 cf:transition-all cf:text-left">
                <div className="cf:text-3xl cf:mb-2">🌟</div>
                <div className="cf:font-semibold cf:text-gray-900 cf:mb-1">Skin Texture & Tone</div>
                <div className="cf:text-sm cf:text-gray-600 cf:font-light">Brighten and smooth</div>
              </button>
              <button onClick={() => selectOption(1, 'volume')} className="cf:bg-white cf:p-6 cf:rounded-xl cf:shadow-md cf:border-2 cf:border-purple-100 cf:hover:border-[#7B2A7C] cf:hover:shadow-xl cf:transform cf:hover:scale-105 cf:transition-all cf:text-left">
                <div className="cf:text-3xl cf:mb-2">💎</div>
                <div className="cf:font-semibold cf:text-gray-900 cf:mb-1">Volume Loss</div>
                <div className="cf:text-sm cf:text-gray-600 cf:font-light">Restore fullness</div>
              </button>
              <button onClick={() => selectOption(1, 'weight')} className="cf:bg-white cf:p-6 cf:rounded-xl cf:shadow-md cf:border-2 cf:border-purple-100 cf:hover:border-[#7B2A7C] cf:hover:shadow-xl cf:transform cf:hover:scale-105 cf:transition-all cf:text-left">
                <div className="cf:text-3xl cf:mb-2">⚖️</div>
                <div className="cf:font-semibold cf:text-gray-900 cf:mb-1">Weight Management</div>
                <div className="cf:text-sm cf:text-gray-600 cf:font-light">Wellness programs</div>
              </button>
            </div>
          </div>

          {/* Step 2 - Treatment Area */}
          <div data-step="2" style={{ display: 'none' }}>
            <div className="cf:mb-6">
              <div className="cf:flex cf:justify-between cf:mb-4">
                <span className="cf:text-[#7B2A7C] cf:font-semibold">Step 2 of 15</span>
                <span className="cf:text-gray-600 cf:font-light">13%</span>
              </div>
              <div className="cf:w-full cf:bg-purple-200 cf:h-2 cf:rounded-full">
                <div className="cf:bg-[#7B2A7C] cf:h-2 cf:rounded-full cf:w-[13%] cf:transition-all"></div>
              </div>
            </div>
            
            <h3 className="cf:text-2xl cf:font-semibold cf:mb-6 cf:text-gray-900">Which specific area concerns you most?</h3>
            <div className="cf:grid cf:grid-cols-2 cf:md:grid-cols-3 cf:gap-4">
              <button onClick={() => selectOption(2, 'face')} className="cf:bg-white cf:p-5 cf:rounded-xl cf:shadow-md cf:border-2 cf:border-purple-100 cf:hover:border-[#7B2A7C] cf:hover:shadow-xl cf:transform cf:hover:scale-105 cf:transition-all cf:text-center">
                <div className="cf:text-2xl cf:mb-1">👤</div>
                <div className="cf:font-semibold cf:text-gray-900 cf:text-sm">Face</div>
              </button>
              <button onClick={() => selectOption(2, 'eyes')} className="cf:bg-white cf:p-5 cf:rounded-xl cf:shadow-md cf:border-2 cf:border-purple-100 cf:hover:border-[#7B2A7C] cf:hover:shadow-xl cf:transform cf:hover:scale-105 cf:transition-all cf:text-center">
                <div className="cf:text-2xl cf:mb-1">👁️</div>
                <div className="cf:font-semibold cf:text-gray-900 cf:text-sm">Eyes</div>
              </button>
              <button onClick={() => selectOption(2, 'lips')} className="cf:bg-white cf:p-5 cf:rounded-xl cf:shadow-md cf:border-2 cf:border-purple-100 cf:hover:border-[#7B2A7C] cf:hover:shadow-xl cf:transform cf:hover:scale-105 cf:transition-all cf:text-center">
                <div className="cf:text-2xl cf:mb-1">💋</div>
                <div className="cf:font-semibold cf:text-gray-900 cf:text-sm">Lips</div>
              </button>
              <button onClick={() => selectOption(2, 'abdomen')} className="cf:bg-white cf:p-5 cf:rounded-xl cf:shadow-md cf:border-2 cf:border-purple-100 cf:hover:border-[#7B2A7C] cf:hover:shadow-xl cf:transform cf:hover:scale-105 cf:transition-all cf:text-center">
                <div className="cf:text-2xl cf:mb-1">🎯</div>
                <div className="cf:font-semibold cf:text-gray-900 cf:text-sm">Abdomen</div>
              </button>
              <button onClick={() => selectOption(2, 'thighs')} className="cf:bg-white cf:p-5 cf:rounded-xl cf:shadow-md cf:border-2 cf:border-purple-100 cf:hover:border-[#7B2A7C] cf:hover:shadow-xl cf:transform cf:hover:scale-105 cf:transition-all cf:text-center">
                <div className="cf:text-2xl cf:mb-1">🦵</div>
                <div className="cf:font-semibold cf:text-gray-900 cf:text-sm">Thighs</div>
              </button>
              <button onClick={() => selectOption(2, 'multiple')} className="cf:bg-white cf:p-5 cf:rounded-xl cf:shadow-md cf:border-2 cf:border-purple-100 cf:hover:border-[#7B2A7C] cf:hover:shadow-xl cf:transform cf:hover:scale-105 cf:transition-all cf:text-center">
                <div className="cf:text-2xl cf:mb-1">✨</div>
                <div className="cf:font-semibold cf:text-gray-900 cf:text-sm">Multiple</div>
              </button>
            </div>
          </div>

          {/* Step 3 - Skin Type */}
          <div data-step="3" style={{ display: 'none' }}>
            <div className="cf:mb-6">
              <div className="cf:flex cf:justify-between cf:mb-4">
                <span className="cf:text-[#7B2A7C] cf:font-semibold">Step 3 of 15</span>
                <span className="cf:text-gray-600 cf:font-light">20%</span>
              </div>
              <div className="cf:w-full cf:bg-purple-200 cf:h-2 cf:rounded-full">
                <div className="cf:bg-[#7B2A7C] cf:h-2 cf:rounded-full cf:w-[20%] cf:transition-all"></div>
              </div>
            </div>
            
            <h3 className="cf:text-2xl cf:font-semibold cf:mb-6 cf:text-gray-900">What is your skin type?</h3>
            <div className="cf:grid cf:grid-cols-1 cf:md:grid-cols-2 cf:gap-4">
              <button onClick={() => selectOption(3, 'dry')} className="cf:bg-white cf:p-6 cf:rounded-xl cf:shadow-md cf:border-2 cf:border-purple-100 cf:hover:border-[#7B2A7C] cf:hover:shadow-xl cf:transform cf:hover:scale-105 cf:transition-all cf:text-center">
                <div className="cf:font-semibold cf:text-gray-900">Dry</div>
              </button>
              <button onClick={() => selectOption(3, 'oily')} className="cf:bg-white cf:p-6 cf:rounded-xl cf:shadow-md cf:border-2 cf:border-purple-100 cf:hover:border-[#7B2A7C] cf:hover:shadow-xl cf:transform cf:hover:scale-105 cf:transition-all cf:text-center">
                <div className="cf:font-semibold cf:text-gray-900">Oily</div>
              </button>
              <button onClick={() => selectOption(3, 'combination')} className="cf:bg-white cf:p-6 cf:rounded-xl cf:shadow-md cf:border-2 cf:border-purple-100 cf:hover:border-[#7B2A7C] cf:hover:shadow-xl cf:transform cf:hover:scale-105 cf:transition-all cf:text-center">
                <div className="cf:font-semibold cf:text-gray-900">Combination</div>
              </button>
              <button onClick={() => selectOption(3, 'sensitive')} className="cf:bg-white cf:p-6 cf:rounded-xl cf:shadow-md cf:border-2 cf:border-purple-100 cf:hover:border-[#7B2A7C] cf:hover:shadow-xl cf:transform cf:hover:scale-105 cf:transition-all cf:text-center">
                <div className="cf:font-semibold cf:text-gray-900">Sensitive</div>
              </button>
            </div>
          </div>

          {/* Step 4 - Age Range */}
          <div data-step="4" style={{ display: 'none' }}>
            <div className="cf:mb-6">
              <div className="cf:flex cf:justify-between cf:mb-4">
                <span className="cf:text-[#7B2A7C] cf:font-semibold">Step 4 of 15</span>
                <span className="cf:text-gray-600 cf:font-light">27%</span>
              </div>
              <div className="cf:w-full cf:bg-purple-200 cf:h-2 cf:rounded-full">
                <div className="cf:bg-[#7B2A7C] cf:h-2 cf:rounded-full cf:w-[27%] cf:transition-all"></div>
              </div>
            </div>
            
            <h3 className="cf:text-2xl cf:font-semibold cf:mb-6 cf:text-gray-900">What is your age range?</h3>
            <div className="cf:grid cf:grid-cols-2 cf:md:grid-cols-4 cf:gap-4">
              <button onClick={() => selectOption(4, '20-30')} className="cf:bg-white cf:p-6 cf:rounded-xl cf:shadow-md cf:border-2 cf:border-purple-100 cf:hover:border-[#7B2A7C] cf:hover:shadow-xl cf:transform cf:hover:scale-105 cf:transition-all cf:text-center">
                <div className="cf:font-semibold cf:text-gray-900">20-30</div>
              </button>
              <button onClick={() => selectOption(4, '31-40')} className="cf:bg-white cf:p-6 cf:rounded-xl cf:shadow-md cf:border-2 cf:border-purple-100 cf:hover:border-[#7B2A7C] cf:hover:shadow-xl cf:transform cf:hover:scale-105 cf:transition-all cf:text-center">
                <div className="cf:font-semibold cf:text-gray-900">31-40</div>
              </button>
              <button onClick={() => selectOption(4, '41-55')} className="cf:bg-white cf:p-6 cf:rounded-xl cf:shadow-md cf:border-2 cf:border-purple-100 cf:hover:border-[#7B2A7C] cf:hover:shadow-xl cf:transform cf:hover:scale-105 cf:transition-all cf:text-center">
                <div className="cf:font-semibold cf:text-gray-900">41-55</div>
              </button>
              <button onClick={() => selectOption(4, '55+')} className="cf:bg-white cf:p-6 cf:rounded-xl cf:shadow-md cf:border-2 cf:border-purple-100 cf:hover:border-[#7B2A7C] cf:hover:shadow-xl cf:transform cf:hover:scale-105 cf:transition-all cf:text-center">
                <div className="cf:font-semibold cf:text-gray-900">55+</div>
              </button>
            </div>
          </div>

          {/* Step 5 - Gender */}
          <div data-step="5" style={{ display: 'none' }}>
            <div className="cf:mb-6">
              <div className="cf:flex cf:justify-between cf:mb-4">
                <span className="cf:text-[#7B2A7C] cf:font-semibold">Step 5 of 15</span>
                <span className="cf:text-gray-600 cf:font-light">33%</span>
              </div>
              <div className="cf:w-full cf:bg-purple-200 cf:h-2 cf:rounded-full">
                <div className="cf:bg-[#7B2A7C] cf:h-2 cf:rounded-full cf:w-[33%] cf:transition-all"></div>
              </div>
            </div>
            
            <h3 className="cf:text-2xl cf:font-semibold cf:mb-6 cf:text-gray-900">How do you identify?</h3>
            <div className="cf:grid cf:grid-cols-1 cf:md:grid-cols-3 cf:gap-4">
              <button onClick={() => selectOption(5, 'female')} className="cf:bg-white cf:p-6 cf:rounded-xl cf:shadow-md cf:border-2 cf:border-purple-100 cf:hover:border-[#7B2A7C] cf:hover:shadow-xl cf:transform cf:hover:scale-105 cf:transition-all cf:text-center">
                <div className="cf:text-3xl cf:mb-2">👩</div>
                <div className="cf:font-semibold cf:text-gray-900">Female</div>
              </button>
              <button onClick={() => selectOption(5, 'male')} className="cf:bg-white cf:p-6 cf:rounded-xl cf:shadow-md cf:border-2 cf:border-purple-100 cf:hover:border-[#7B2A7C] cf:hover:shadow-xl cf:transform cf:hover:scale-105 cf:transition-all cf:text-center">
                <div className="cf:text-3xl cf:mb-2">👨</div>
                <div className="cf:font-semibold cf:text-gray-900">Male</div>
              </button>
              <button onClick={() => selectOption(5, 'other')} className="cf:bg-white cf:p-6 cf:rounded-xl cf:shadow-md cf:border-2 cf:border-purple-100 cf:hover:border-[#7B2A7C] cf:hover:shadow-xl cf:transform cf:hover:scale-105 cf:transition-all cf:text-center">
                <div className="cf:text-3xl cf:mb-2">✨</div>
                <div className="cf:font-semibold cf:text-gray-900">Prefer not to say</div>
              </button>
            </div>
          </div>

          {/* Step 6 - Previous Treatments */}
          <div data-step="6" style={{ display: 'none' }}>
            <div className="cf:mb-6">
              <div className="cf:flex cf:justify-between cf:mb-4">
                <span className="cf:text-[#7B2A7C] cf:font-semibold">Step 6 of 15</span>
                <span className="cf:text-gray-600 cf:font-light">40%</span>
              </div>
              <div className="cf:w-full cf:bg-purple-200 cf:h-2 cf:rounded-full">
                <div className="cf:bg-[#7B2A7C] cf:h-2 cf:rounded-full cf:w-[40%] cf:transition-all"></div>
              </div>
            </div>
            
            <h3 className="cf:text-2xl cf:font-semibold cf:mb-6 cf:text-gray-900">Have you had aesthetic treatments before?</h3>
            <div className="cf:grid cf:grid-cols-1 cf:md:grid-cols-3 cf:gap-4">
              <button onClick={() => selectOption(6, 'never')} className="cf:bg-white cf:p-6 cf:rounded-xl cf:shadow-md cf:border-2 cf:border-purple-100 cf:hover:border-[#7B2A7C] cf:hover:shadow-xl cf:transform cf:hover:scale-105 cf:transition-all cf:text-center">
                <div className="cf:font-semibold cf:text-gray-900 cf:mb-1">Never</div>
                <div className="cf:text-sm cf:text-gray-600 cf:font-light">First time</div>
              </button>
              <button onClick={() => selectOption(6, 'some')} className="cf:bg-white cf:p-6 cf:rounded-xl cf:shadow-md cf:border-2 cf:border-purple-100 cf:hover:border-[#7B2A7C] cf:hover:shadow-xl cf:transform cf:hover:scale-105 cf:transition-all cf:text-center">
                <div className="cf:font-semibold cf:text-gray-900 cf:mb-1">Yes, Some</div>
                <div className="cf:text-sm cf:text-gray-600 cf:font-light">A few treatments</div>
              </button>
              <button onClick={() => selectOption(6, 'regular')} className="cf:bg-white cf:p-6 cf:rounded-xl cf:shadow-md cf:border-2 cf:border-purple-100 cf:hover:border-[#7B2A7C] cf:hover:shadow-xl cf:transform cf:hover:scale-105 cf:transition-all cf:text-center">
                <div className="cf:font-semibold cf:text-gray-900 cf:mb-1">Yes, Regularly</div>
                <div className="cf:text-sm cf:text-gray-600 cf:font-light">Experienced</div>
              </button>
            </div>
          </div>

          {/* Step 7 - Goals */}
          <div data-step="7" style={{ display: 'none' }}>
            <div className="cf:mb-6">
              <div className="cf:flex cf:justify-between cf:mb-4">
                <span className="cf:text-[#7B2A7C] cf:font-semibold">Step 7 of 15</span>
                <span className="cf:text-gray-600 cf:font-light">47%</span>
              </div>
              <div className="cf:w-full cf:bg-purple-200 cf:h-2 cf:rounded-full">
                <div className="cf:bg-[#7B2A7C] cf:h-2 cf:rounded-full cf:w-[47%] cf:transition-all"></div>
              </div>
            </div>
            
            <h3 className="cf:text-2xl cf:font-semibold cf:mb-6 cf:text-gray-900">What's your main goal?</h3>
            <div className="cf:grid cf:grid-cols-1 cf:md:grid-cols-2 cf:gap-4">
              <button onClick={() => selectOption(7, 'prevent-aging')} className="cf:bg-white cf:p-6 cf:rounded-xl cf:shadow-md cf:border-2 cf:border-purple-100 cf:hover:border-[#7B2A7C] cf:hover:shadow-xl cf:transform cf:hover:scale-105 cf:transition-all cf:text-left">
                <div className="cf:font-semibold cf:text-gray-900 cf:mb-1">Prevent Aging</div>
                <div className="cf:text-sm cf:text-gray-600 cf:font-light">Maintain youthful look</div>
              </button>
              <button onClick={() => selectOption(7, 'reverse-aging')} className="cf:bg-white cf:p-6 cf:rounded-xl cf:shadow-md cf:border-2 cf:border-purple-100 cf:hover:border-[#7B2A7C] cf:hover:shadow-xl cf:transform cf:hover:scale-105 cf:transition-all cf:text-left">
                <div className="cf:font-semibold cf:text-gray-900 cf:mb-1">Reverse Aging</div>
                <div className="cf:text-sm cf:text-gray-600 cf:font-light">Turn back the clock</div>
              </button>
              <button onClick={() => selectOption(7, 'body-shaping')} className="cf:bg-white cf:p-6 cf:rounded-xl cf:shadow-md cf:border-2 cf:border-purple-100 cf:hover:border-[#7B2A7C] cf:hover:shadow-xl cf:transform cf:hover:scale-105 cf:transition-all cf:text-left">
                <div className="cf:font-semibold cf:text-gray-900 cf:mb-1">Body Shaping</div>
                <div className="cf:text-sm cf:text-gray-600 cf:font-light">Contour and tone</div>
              </button>
              <button onClick={() => selectOption(7, 'weight-loss')} className="cf:bg-white cf:p-6 cf:rounded-xl cf:shadow-md cf:border-2 cf:border-purple-100 cf:hover:border-[#7B2A7C] cf:hover:shadow-xl cf:transform cf:hover:scale-105 cf:transition-all cf:text-left">
                <div className="cf:font-semibold cf:text-gray-900 cf:mb-1">Weight Loss</div>
                <div className="cf:text-sm cf:text-gray-600 cf:font-light">Health & wellness</div>
              </button>
            </div>
          </div>

          {/* Step 8 - Lifestyle */}
          <div data-step="8" style={{ display: 'none' }}>
            <div className="cf:mb-6">
              <div className="cf:flex cf:justify-between cf:mb-4">
                <span className="cf:text-[#7B2A7C] cf:font-semibold">Step 8 of 15</span>
                <span className="cf:text-gray-600 cf:font-light">53%</span>
              </div>
              <div className="cf:w-full cf:bg-purple-200 cf:h-2 cf:rounded-full">
                <div className="cf:bg-[#7B2A7C] cf:h-2 cf:rounded-full cf:w-[53%] cf:transition-all"></div>
              </div>
            </div>
            
            <h3 className="cf:text-2xl cf:font-semibold cf:mb-6 cf:text-gray-900">How active is your lifestyle?</h3>
            <div className="cf:grid cf:grid-cols-1 cf:md:grid-cols-3 cf:gap-4">
              <button onClick={() => selectOption(8, 'very-active')} className="cf:bg-white cf:p-6 cf:rounded-xl cf:shadow-md cf:border-2 cf:border-purple-100 cf:hover:border-[#7B2A7C] cf:hover:shadow-xl cf:transform cf:hover:scale-105 cf:transition-all cf:text-center">
                <div className="cf:text-3xl cf:mb-2">🏃</div>
                <div className="cf:font-semibold cf:text-gray-900">Very Active</div>
              </button>
              <button onClick={() => selectOption(8, 'moderate')} className="cf:bg-white cf:p-6 cf:rounded-xl cf:shadow-md cf:border-2 cf:border-purple-100 cf:hover:border-[#7B2A7C] cf:hover:shadow-xl cf:transform cf:hover:scale-105 cf:transition-all cf:text-center">
                <div className="cf:text-3xl cf:mb-2">🚶</div>
                <div className="cf:font-semibold cf:text-gray-900">Moderate</div>
              </button>
              <button onClick={() => selectOption(8, 'less-active')} className="cf:bg-white cf:p-6 cf:rounded-xl cf:shadow-md cf:border-2 cf:border-purple-100 cf:hover:border-[#7B2A7C] cf:hover:shadow-xl cf:transform cf:hover:scale-105 cf:transition-all cf:text-center">
                <div className="cf:text-3xl cf:mb-2">🛋️</div>
                <div className="cf:font-semibold cf:text-gray-900">Less Active</div>
              </button>
            </div>
          </div>

          {/* Step 9 - Budget */}
          <div data-step="9" style={{ display: 'none' }}>
            <div className="cf:mb-6">
              <div className="cf:flex cf:justify-between cf:mb-4">
                <span className="cf:text-[#7B2A7C] cf:font-semibold">Step 9 of 15</span>
                <span className="cf:text-gray-600 cf:font-light">60%</span>
              </div>
              <div className="cf:w-full cf:bg-purple-200 cf:h-2 cf:rounded-full">
                <div className="cf:bg-[#7B2A7C] cf:h-2 cf:rounded-full cf:w-[60%] cf:transition-all"></div>
              </div>
            </div>
            
            <h3 className="cf:text-2xl cf:font-semibold cf:mb-6 cf:text-gray-900">What's your investment range?</h3>
            <div className="cf:grid cf:grid-cols-1 cf:md:grid-cols-3 cf:gap-4">
              <button onClick={() => selectOption(9, 'flexible')} className="cf:bg-white cf:p-6 cf:rounded-xl cf:shadow-md cf:border-2 cf:border-purple-100 cf:hover:border-[#7B2A7C] cf:hover:shadow-xl cf:transform cf:hover:scale-105 cf:transition-all cf:text-center">
                <div className="cf:text-3xl cf:mb-2">💳</div>
                <div className="cf:font-semibold cf:text-gray-900 cf:mb-1">Flexible</div>
                <div className="cf:text-sm cf:text-gray-600 cf:font-light">Financing options</div>
              </button>
              <button onClick={() => selectOption(9, 'moderate')} className="cf:bg-white cf:p-6 cf:rounded-xl cf:shadow-md cf:border-2 cf:border-purple-100 cf:hover:border-[#7B2A7C] cf:hover:shadow-xl cf:transform cf:hover:scale-105 cf:transition-all cf:text-center">
                <div className="cf:text-3xl cf:mb-2">💰</div>
                <div className="cf:font-semibold cf:text-gray-900 cf:mb-1">Moderate</div>
                <div className="cf:text-sm cf:text-gray-600 cf:font-light">$500-$2,000</div>
              </button>
              <button onClick={() => selectOption(9, 'premium')} className="cf:bg-white cf:p-6 cf:rounded-xl cf:shadow-md cf:border-2 cf:border-purple-100 cf:hover:border-[#7B2A7C] cf:hover:shadow-xl cf:transform cf:hover:scale-105 cf:transition-all cf:text-center">
                <div className="cf:text-3xl cf:mb-2">⭐</div>
                <div className="cf:font-semibold cf:text-gray-900 cf:mb-1">Premium</div>
                <div className="cf:text-sm cf:text-gray-600 cf:font-light">$2,000+</div>
              </button>
            </div>
          </div>

          {/* Step 10 - Timeline */}
          <div data-step="10" style={{ display: 'none' }}>
            <div className="cf:mb-6">
              <div className="cf:flex cf:justify-between cf:mb-4">
                <span className="cf:text-[#7B2A7C] cf:font-semibold">Step 10 of 15</span>
                <span className="cf:text-gray-600 cf:font-light">67%</span>
              </div>
              <div className="cf:w-full cf:bg-purple-200 cf:h-2 cf:rounded-full">
                <div className="cf:bg-[#7B2A7C] cf:h-2 cf:rounded-full cf:w-[67%] cf:transition-all"></div>
              </div>
            </div>
            
            <h3 className="cf:text-2xl cf:font-semibold cf:mb-6 cf:text-gray-900">When would you like to start?</h3>
            <div className="cf:grid cf:grid-cols-1 cf:md:grid-cols-3 cf:gap-4">
              <button onClick={() => selectOption(10, 'asap')} className="cf:bg-white cf:p-6 cf:rounded-xl cf:shadow-md cf:border-2 cf:border-purple-100 cf:hover:border-[#7B2A7C] cf:hover:shadow-xl cf:transform cf:hover:scale-105 cf:transition-all cf:text-center">
                <div className="cf:text-3xl cf:mb-2">🚀</div>
                <div className="cf:font-semibold cf:text-gray-900 cf:mb-1">ASAP</div>
                <div className="cf:text-sm cf:text-gray-600 cf:font-light">This week</div>
              </button>
              <button onClick={() => selectOption(10, 'month')} className="cf:bg-white cf:p-6 cf:rounded-xl cf:shadow-md cf:border-2 cf:border-purple-100 cf:hover:border-[#7B2A7C] cf:hover:shadow-xl cf:transform cf:hover:scale-105 cf:transition-all cf:text-center">
                <div className="cf:text-3xl cf:mb-2">📅</div>
                <div className="cf:font-semibold cf:text-gray-900 cf:mb-1">Within a Month</div>
                <div className="cf:text-sm cf:text-gray-600 cf:font-light">Planning ahead</div>
              </button>
              <button onClick={() => selectOption(10, 'researching')} className="cf:bg-white cf:p-6 cf:rounded-xl cf:shadow-md cf:border-2 cf:border-purple-100 cf:hover:border-[#7B2A7C] cf:hover:shadow-xl cf:transform cf:hover:scale-105 cf:transition-all cf:text-center">
                <div className="cf:text-3xl cf:mb-2">📖</div>
                <div className="cf:font-semibold cf:text-gray-900 cf:mb-1">Just Researching</div>
                <div className="cf:text-sm cf:text-gray-600 cf:font-light">Exploring</div>
              </button>
            </div>
          </div>

          {/* Step 11 - Downtime */}
          <div data-step="11" style={{ display: 'none' }}>
            <div className="cf:mb-6">
              <div className="cf:flex cf:justify-between cf:mb-4">
                <span className="cf:text-[#7B2A7C] cf:font-semibold">Step 11 of 15</span>
                <span className="cf:text-gray-600 cf:font-light">73%</span>
              </div>
              <div className="cf:w-full cf:bg-purple-200 cf:h-2 cf:rounded-full">
                <div className="cf:bg-[#7B2A7C] cf:h-2 cf:rounded-full cf:w-[73%] cf:transition-all"></div>
              </div>
            </div>
            
            <h3 className="cf:text-2xl cf:font-semibold cf:mb-6 cf:text-gray-900">How much downtime can you accommodate?</h3>
            <div className="cf:grid cf:grid-cols-1 cf:md:grid-cols-3 cf:gap-4">
              <button onClick={() => selectOption(11, 'none')} className="cf:bg-white cf:p-6 cf:rounded-xl cf:shadow-md cf:border-2 cf:border-purple-100 cf:hover:border-[#7B2A7C] cf:hover:shadow-xl cf:transform cf:hover:scale-105 cf:transition-all cf:text-center">
                <div className="cf:font-semibold cf:text-gray-900 cf:mb-1">No Downtime</div>
                <div className="cf:text-sm cf:text-gray-600 cf:font-light">Back to work same day</div>
              </button>
              <button onClick={() => selectOption(11, 'minimal')} className="cf:bg-white cf:p-6 cf:rounded-xl cf:shadow-md cf:border-2 cf:border-purple-100 cf:hover:border-[#7B2A7C] cf:hover:shadow-xl cf:transform cf:hover:scale-105 cf:transition-all cf:text-center">
                <div className="cf:font-semibold cf:text-gray-900 cf:mb-1">1-3 Days</div>
                <div className="cf:text-sm cf:text-gray-600 cf:font-light">Weekend recovery</div>
              </button>
              <button onClick={() => selectOption(11, 'flexible')} className="cf:bg-white cf:p-6 cf:rounded-xl cf:shadow-md cf:border-2 cf:border-purple-100 cf:hover:border-[#7B2A7C] cf:hover:shadow-xl cf:transform cf:hover:scale-105 cf:transition-all cf:text-center">
                <div className="cf:font-semibold cf:text-gray-900 cf:mb-1">Flexible</div>
                <div className="cf:text-sm cf:text-gray-600 cf:font-light">Whatever it takes</div>
              </button>
            </div>
          </div>

          {/* Step 12 - Learning Preference */}
          <div data-step="12" style={{ display: 'none' }}>
            <div className="cf:mb-6">
              <div className="cf:flex cf:justify-between cf:mb-4">
                <span className="cf:text-[#7B2A7C] cf:font-semibold">Step 12 of 15</span>
                <span className="cf:text-gray-600 cf:font-light">80%</span>
              </div>
              <div className="cf:w-full cf:bg-purple-200 cf:h-2 cf:rounded-full">
                <div className="cf:bg-[#7B2A7C] cf:h-2 cf:rounded-full cf:w-[80%] cf:transition-all"></div>
              </div>
            </div>
            
            <h3 className="cf:text-2xl cf:font-semibold cf:mb-6 cf:text-gray-900">How would you prefer to learn more?</h3>
            <div className="cf:grid cf:grid-cols-1 cf:md:grid-cols-2 cf:gap-4">
              <button onClick={() => selectOption(12, 'online')} className="cf:bg-white cf:p-6 cf:rounded-xl cf:shadow-md cf:border-2 cf:border-purple-100 cf:hover:border-[#7B2A7C] cf:hover:shadow-xl cf:transform cf:hover:scale-105 cf:transition-all cf:text-center">
                <div className="cf:text-3xl cf:mb-2">💻</div>
                <div className="cf:font-semibold cf:text-gray-900 cf:mb-1">Browse Online</div>
                <div className="cf:text-sm cf:text-gray-600 cf:font-light">See details first</div>
              </button>
              <button onClick={() => selectOption(12, 'consultation')} className="cf:bg-white cf:p-6 cf:rounded-xl cf:shadow-md cf:border-2 cf:border-purple-100 cf:hover:border-[#7B2A7C] cf:hover:shadow-xl cf:transform cf:hover:scale-105 cf:transition-all cf:text-center">
                <div className="cf:text-3xl cf:mb-2">👥</div>
                <div className="cf:font-semibold cf:text-gray-900 cf:mb-1">Book Consultation</div>
                <div className="cf:text-sm cf:text-gray-600 cf:font-light">Speak with expert</div>
              </button>
            </div>
          </div>
          
          {/* Step 13 - Name (Personal Info Starts) */}
          <div data-step="13" style={{ display: 'none' }}>
            <div className="cf:mb-6">
              <div className="cf:flex cf:justify-between cf:mb-4">
                <span className="cf:text-[#7B2A7C] cf:font-semibold">Step 13 of 15</span>
                <span className="cf:text-gray-600 cf:font-light">87%</span>
              </div>
              <div className="cf:w-full cf:bg-purple-200 cf:h-2 cf:rounded-full">
                <div className="cf:bg-[#7B2A7C] cf:h-2 cf:rounded-full cf:w-[87%] cf:transition-all"></div>
              </div>
            </div>
            
            <h3 className="cf:text-2xl cf:font-semibold cf:mb-6 cf:text-gray-900">What's your name?</h3>
            <input 
              type="text" 
              placeholder="Your full name" 
              onChange={(e) => handleTextInput(13, e.target.value)}
              className="cf:w-full cf:px-6 cf:py-4 cf:rounded-xl cf:border-2 cf:border-purple-200 cf:focus:border-[#7B2A7C] cf:outline-none cf:text-gray-900 cf:text-lg cf:mb-6"
            />
            <button onClick={nextTextStep} className="cf:w-full cf:bg-[#7B2A7C] cf:text-white cf:px-8 cf:py-4 cf:rounded-full cf:hover:bg-[#5a1f5b] cf:hover:text-white cf:font-semibold cf:text-lg cf:shadow-lg cf:transform cf:hover:scale-105 cf:transition-all">
              Continue →
            </button>
          </div>

          {/* Step 14 - Email */}
          <div data-step="14" style={{ display: 'none' }}>
            <div className="cf:mb-6">
              <div className="cf:flex cf:justify-between cf:mb-4">
                <span className="cf:text-[#7B2A7C] cf:font-semibold">Step 14 of 15</span>
                <span className="cf:text-gray-600 cf:font-light">93%</span>
              </div>
              <div className="cf:w-full cf:bg-purple-200 cf:h-2 cf:rounded-full">
                <div className="cf:bg-[#7B2A7C] cf:h-2 cf:rounded-full cf:w-[93%] cf:transition-all"></div>
              </div>
            </div>
            
            <h3 className="cf:text-2xl cf:font-semibold cf:mb-6 cf:text-gray-900">What's your email?</h3>
            <input 
              type="email" 
              placeholder="your.email@example.com" 
              onChange={(e) => handleTextInput(14, e.target.value)}
              className="cf:w-full cf:px-6 cf:py-4 cf:rounded-xl cf:border-2 cf:border-purple-200 cf:focus:border-[#7B2A7C] cf:outline-none cf:text-gray-900 cf:text-lg cf:mb-6"
            />
            <button onClick={nextTextStep} className="cf:w-full cf:bg-[#7B2A7C] cf:text-white cf:px-8 cf:py-4 cf:rounded-full cf:hover:bg-[#5a1f5b] cf:hover:text-white cf:font-semibold cf:text-lg cf:shadow-lg cf:transform cf:hover:scale-105 cf:transition-all">
              Continue →
            </button>
          </div>

          {/* Step 15 - Phone */}
          <div data-step="15" style={{ display: 'none' }}>
            <div className="cf:mb-6">
              <div className="cf:flex cf:justify-between cf:mb-4">
                <span className="cf:text-[#7B2A7C] cf:font-semibold">Step 15 of 15</span>
                <span className="cf:text-gray-600 cf:font-light">100%</span>
              </div>
              <div className="cf:w-full cf:bg-purple-200 cf:h-2 cf:rounded-full">
                <div className="cf:bg-[#7B2A7C] cf:h-2 cf:rounded-full cf:w-full cf:transition-all"></div>
              </div>
            </div>
            
            <h3 className="cf:text-2xl cf:font-semibold cf:mb-6 cf:text-gray-900">Your phone number?</h3>
            <input 
              type="tel" 
              placeholder="(813) 555-1234" 
              onChange={(e) => handleTextInput(15, e.target.value)}
              className="cf:w-full cf:px-6 cf:py-4 cf:rounded-xl cf:border-2 cf:border-purple-200 cf:focus:border-[#7B2A7C] cf:outline-none cf:text-gray-900 cf:text-lg cf:mb-6"
            />
            <button onClick={nextTextStep} className="cf:w-full cf:bg-[#7B2A7C] cf:text-white cf:px-8 cf:py-4 cf:rounded-full cf:hover:bg-[#5a1f5b] cf:hover:text-white cf:font-semibold cf:text-lg cf:shadow-lg cf:transform cf:hover:scale-105 cf:transition-all">
              Get My Recommendation →
            </button>
          </div>

          {/* Results Screen */}
          <div data-results style={{ display: 'none' }}>
            <div className="cf:text-center cf:mb-8">
              <div className="cf:text-5xl cf:mb-4">🎉</div>
              <h3 className="cf:text-3xl cf:font-semibold cf:text-gray-900 cf:mb-2">Your Personalized Recommendation</h3>
              <p className="cf:text-[#7B2A7C] cf:text-2xl cf:font-bold cf:mb-6" data-rec-title>Treatment Name</p>
            </div>
            
            <div className="cf:bg-white cf:p-8 cf:rounded-2xl cf:shadow-lg cf:border cf:border-purple-100 cf:mb-6">
              <div className="cf:grid cf:grid-cols-1 cf:md:grid-cols-2 cf:gap-6 cf:mb-6">
                <div>
                  <div className="cf:text-sm cf:text-gray-500 cf:mb-1 cf:font-semibold">Investment Range</div>
                  <div className="cf:text-xl cf:text-gray-900 cf:font-semibold" data-rec-cost>Cost</div>
                </div>
                <div>
                  <div className="cf:text-sm cf:text-gray-500 cf:mb-1 cf:font-semibold">Timeline to Results</div>
                  <div className="cf:text-xl cf:text-gray-900 cf:font-semibold" data-rec-timeline>Timeline</div>
                </div>
                <div>
                  <div className="cf:text-sm cf:text-gray-500 cf:mb-1 cf:font-semibold">Sessions Needed</div>
                  <div className="cf:text-xl cf:text-gray-900 cf:font-semibold" data-rec-sessions>Sessions</div>
                </div>
                <div>
                  <div className="cf:text-sm cf:text-gray-500 cf:mb-1 cf:font-semibold">Recovery Time</div>
                  <div className="cf:text-xl cf:text-gray-900 cf:font-semibold" data-rec-downtime>Downtime</div>
                </div>
              </div>
              
              <div className="cf:bg-purple-50 cf:p-6 cf:rounded-xl cf:mb-6">
                <h4 className="cf:font-semibold cf:text-gray-900 cf:mb-3">Next Steps:</h4>
                <ol className="cf:list-decimal cf:list-inside cf:text-gray-700 cf:font-light cf:leading-relaxed">
                  <li>Review detailed information about your recommended treatment</li>
                  <li>Schedule your complimentary consultation</li>
                  <li>Begin your aesthetic journey with our expert team</li>
                </ol>
              </div>
            </div>
            
            <div className="cf:text-center">
              <button data-rec-button className="cf:w-full cf:md:w-auto cf:bg-[#7B2A7C] cf:text-white cf:px-16 cf:py-5 cf:rounded-full cf:hover:bg-[#5a1f5b] cf:hover:text-white cf:font-bold cf:text-xl cf:shadow-2xl cf:transform cf:hover:scale-105 cf:transition-all">
                View Treatment Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ConsultationPanel() {
  return (
    <section className="cf:bg-[#7B2A7C] cf:py-24">
      <div className="cf:max-w-7xl cf:mx-auto cf:px-4">
        <div className="cf:grid cf:grid-cols-1 cf:md:grid-cols-2 cf:gap-12 cf:items-center">
          <div>
            <h2 className="cf:text-4xl cf:md:text-5xl cf:font-light cf:mb-6 cf:text-white cf:leading-tight cf:tracking-wide">
              NOT SURE WHICH SERVICE IS RIGHT FOR YOU?
            </h2>
            <p className="cf:text-white cf:mb-8 cf:text-lg cf:leading-relaxed cf:font-light">
              Learn more about the full assortment of treatments we offer when you schedule a <span className="cf:font-semibold">Complimentary Consultation</span> with Florida Aesthetics Medspa today!
            </p>
            <a href="https://floridaaesthetics.com/florida/complimentary-consultation/" className="cf:inline-block cf:bg-white cf:text-[#7B2A7C] cf:px-10 cf:py-4 cf:rounded-lg cf:hover:bg-purple-100 cf:hover:text-[#5a1f5b] cf:font-bold cf:text-lg cf:shadow-2xl cf:transform cf:hover:scale-105 cf:transition-all cf:uppercase">
              Complimentary Consultation
            </a>
          </div>
          <div className="cf:flex cf:justify-center">
            <div className="cf:bg-white cf:rounded-2xl cf:shadow-2xl cf:overflow-hidden cf:w-full cf:max-w-lg">
              <div className="cf:aspect-video cf:bg-gray-200 cf:flex cf:items-center cf:justify-center">
                <span className="cf:text-gray-500 cf:font-light">Consultation Video</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BeforeAfter() {
  return (
    <section className="cf:bg-white cf:py-24">
      <div className="cf:max-w-7xl cf:mx-auto cf:px-4">
        <h2 className="cf:text-4xl cf:font-light cf:text-center cf:mb-6 cf:text-gray-900 cf:tracking-wide">
          Real Results From Real Clients
        </h2>
        <p className="cf:text-center cf:text-gray-600 cf:mb-16 cf:text-lg cf:font-light">
          See the transformations our clients have achieved
        </p>
        <div className="cf:grid cf:grid-cols-1 cf:md:grid-cols-2 cf:gap-10 cf:mb-12">
          <div className="cf:bg-gradient-to-br cf:from-purple-50 cf:to-pink-50 cf:rounded-2xl cf:shadow-lg cf:overflow-hidden cf:border cf:border-purple-100">
            <div className="cf:aspect-video cf:bg-gray-100 cf:flex cf:items-center cf:justify-center">
              <span className="cf:text-gray-400 cf:font-light">Before & After Image</span>
            </div>
            <div className="cf:p-6 cf:bg-white">
              <p className="cf:text-gray-700 cf:font-semibold cf:text-center">CoolSculpting Abdomen</p>
            </div>
          </div>
          <div className="cf:bg-gradient-to-br cf:from-purple-50 cf:to-pink-50 cf:rounded-2xl cf:shadow-lg cf:overflow-hidden cf:border cf:border-purple-100">
            <div className="cf:aspect-video cf:bg-gray-100 cf:flex cf:items-center cf:justify-center">
              <span className="cf:text-gray-400 cf:font-light">Before & After Image</span>
            </div>
            <div className="cf:p-6 cf:bg-white">
              <p className="cf:text-gray-700 cf:font-semibold cf:text-center">Filler Enhancement</p>
            </div>
          </div>
        </div>
        <div className="cf:text-center">
          <a href="https://floridaaesthetics.com/coolsculpting/before-and-after-pictures/" className="cf:text-[#7B2A7C] cf:font-semibold cf:hover:underline cf:text-lg">
            See More Results →
          </a>
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  const testimonials = [
    {
      text: "Rachel was fantastic and I could not be happier with work! She takes her time and really does an amazing job. As an added bonus, because of her meticulous work, I had no bruising which is unusual for me!",
      author: "Fran Sline"
    },
    {
      text: "Karen is great! She's professional and attentive. She anticipates her client's needs and tries to make sure that they are comfortable at all time. Lovely personality and great service!",
      author: "Laneisha F."
    },
    {
      text: "I've been a long time customer of Florida Aesthetics. The staff are very professional, knowledgeable and always answer all my questions. Not to mention I love all their monthly specials too!",
      author: "Bel H."
    }
  ];

  return (
    <section className="cf:bg-gradient-to-b cf:from-purple-50 cf:to-white cf:py-24">
      <div className="cf:max-w-7xl cf:mx-auto cf:px-4">
        <h2 className="cf:text-4xl cf:font-light cf:text-center cf:mb-6 cf:text-gray-900 cf:tracking-wide">
          What Our Clients Are Saying
        </h2>
        <p className="cf:text-center cf:text-gray-600 cf:mb-16 cf:text-lg cf:font-light">
          Trusted by thousands across Brandon & Tampa Bay
        </p>
        <div className="cf:grid cf:grid-cols-1 cf:md:grid-cols-3 cf:gap-8 cf:mb-12">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
        <div className="cf:text-center">
          <a href="https://floridaaesthetics.com/online-reviews/" className="cf:text-[#7B2A7C] cf:font-semibold cf:hover:underline cf:text-lg">
            Read More Reviews →
          </a>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ text, author }) {
  return (
    <div className="cf:bg-white cf:p-8 cf:rounded-2xl cf:shadow-lg cf:border cf:border-purple-100 cf:transform cf:hover:scale-105 cf:transition-all cf:duration-300">
      <div className="cf:mb-4 cf:text-yellow-400 cf:text-xl">★★★★★</div>
      <p className="cf:text-gray-700 cf:mb-6 cf:italic cf:leading-relaxed cf:font-light">"{text}"</p>
      <p className="cf:text-gray-900 cf:font-semibold">— {author}</p>
    </div>
  );
}

function WhyChooseUs() {
  const pillars = [
    {
      title: 'Experienced Professionals',
      description: 'Board-certified providers with years of specialized training',
      icon: '👨‍⚕️'
    },
    {
      title: 'Personalized Plans',
      description: 'Custom treatment plans tailored to your unique goals',
      icon: '🎯'
    },
    {
      title: 'Modern Technology',
      description: 'State-of-the-art equipment and safety-first care',
      icon: '⚕️'
    }
  ];

  return (
    <section className="cf:bg-white cf:py-24">
      <div className="cf:max-w-7xl cf:mx-auto cf:px-4">
        <h2 className="cf:text-4xl cf:font-light cf:text-center cf:mb-6 cf:text-gray-900 cf:tracking-wide">
          Why Choose Florida Aesthetics
        </h2>
        <p className="cf:text-center cf:text-gray-600 cf:mb-16 cf:text-lg cf:font-light">
          Excellence in aesthetic care since 2007
        </p>
        <div className="cf:grid cf:grid-cols-1 cf:md:grid-cols-3 cf:gap-10">
          {pillars.map((pillar, index) => (
            <div key={index} className="cf:bg-gradient-to-br cf:from-purple-50 cf:to-pink-50 cf:p-10 cf:rounded-2xl cf:shadow-lg cf:text-center cf:border cf:border-purple-100 cf:transform cf:hover:scale-105 cf:transition-all cf:duration-300">
              <div className="cf:text-6xl cf:mb-6">{pillar.icon}</div>
              <h3 className="cf:text-2xl cf:font-semibold cf:mb-4 cf:text-[#7B2A7C]">{pillar.title}</h3>
              <p className="cf:text-gray-600 cf:leading-relaxed cf:font-light">{pillar.description}</p>
            </div>
          ))}
        </div>
        <div className="cf:text-center cf:mt-12">
          <a href="https://floridaaesthetics.com/medical-practitioners/" className="cf:text-[#7B2A7C] cf:font-semibold cf:hover:underline cf:text-lg">
            Meet Our Team →
          </a>
        </div>
      </div>
    </section>
  );
}

function MembershipsOffers() {
  return (
    <section className="cf:bg-gradient-to-r cf:from-purple-50 cf:via-pink-50 cf:to-purple-50 cf:py-24">
      <div className="cf:max-w-7xl cf:mx-auto cf:px-4">
        <h2 className="cf:text-4xl cf:font-light cf:text-center cf:mb-16 cf:text-gray-900 cf:tracking-wide">
          Flexible Payment Options
        </h2>
        <div className="cf:grid cf:grid-cols-1 cf:md:grid-cols-2 cf:gap-10">
          <div className="cf:bg-white cf:p-12 cf:rounded-2xl cf:shadow-xl cf:border cf:border-purple-100 cf:transform cf:hover:scale-105 cf:transition-all cf:duration-300">
            <h3 className="cf:text-3xl cf:font-semibold cf:mb-4 cf:text-[#7B2A7C]">Monthly Specials</h3>
            <p className="cf:text-gray-600 cf:mb-6 cf:text-lg cf:leading-relaxed cf:font-light">
              Check out our rotating monthly offers on popular treatments
            </p>
            <a href="https://shop.floridaaesthetics.com/collections/treatments" className="cf:text-[#7B2A7C] cf:font-semibold cf:hover:underline cf:text-lg">
              View Current Specials →
            </a>
          </div>
          <div className="cf:bg-white cf:p-12 cf:rounded-2xl cf:shadow-xl cf:border cf:border-purple-100 cf:transform cf:hover:scale-105 cf:transition-all cf:duration-300">
            <h3 className="cf:text-3xl cf:font-semibold cf:mb-4 cf:text-[#7B2A7C]">Financing Options</h3>
            <p className="cf:text-gray-600 cf:mb-6 cf:text-lg cf:leading-relaxed cf:font-light">
              We accept Allē Rewards, Cherry Financing, and CareCredit
            </p>
            <div className="cf:flex cf:flex-col cf:gap-3">
              <a href="https://floridaaesthetics.com/payment-plans/" className="cf:text-[#7B2A7C] cf:hover:underline cf:font-semibold">Allē | Cherry Payment Plans</a>
              <a href="https://floridaaesthetics.com/treatments-financing-options/" className="cf:text-[#7B2A7C] cf:hover:underline cf:font-semibold">CareCredit Options</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TeamSpotlight() {
  return (
    <section className="cf:bg-white cf:py-24">
      <div className="cf:max-w-7xl cf:mx-auto cf:px-4 cf:text-center">
        <h2 className="cf:text-4xl cf:font-light cf:mb-16 cf:text-gray-900 cf:tracking-wide">
          Meet Our Expert Practitioners
        </h2>
        <p className="cf:text-center cf:text-gray-600 cf:mb-12 cf:text-lg cf:font-light">
          Board-certified professionals dedicated to your care
        </p>
        <a href="https://floridaaesthetics.com/medical-practitioners/" className="cf:inline-block cf:bg-[#7B2A7C] cf:text-white cf:px-12 cf:py-5 cf:rounded-full cf:hover:bg-purple-800 cf:font-semibold cf:text-lg cf:shadow-2xl cf:transform cf:hover:scale-105 cf:transition-all">
          Meet the Full Team
        </a>
      </div>
    </section>
  );
}

function LocationContact() {
  return (
    <section className="cf:bg-gradient-to-b cf:from-purple-50 cf:to-white cf:py-24">
      <div className="cf:max-w-7xl cf:mx-auto cf:px-4">
        <h2 className="cf:text-4xl cf:font-light cf:text-center cf:mb-16 cf:text-gray-900 cf:tracking-wide">
          Visit Us in Brandon
        </h2>
        <div className="cf:grid cf:grid-cols-1 cf:md:grid-cols-2 cf:gap-12">
          <div className="cf:bg-white cf:p-10 cf:rounded-2xl cf:shadow-xl cf:border cf:border-purple-100 cf:transform cf:hover:scale-105 cf:transition-all cf:duration-300">
            <div className="cf:mb-8">
              <h3 className="cf:text-2xl cf:font-semibold cf:mb-4 cf:text-[#7B2A7C]">Address</h3>
              <p className="cf:text-gray-700 cf:text-lg cf:font-light">1767 S. Kings Ave., Brandon, FL 33511</p>
            </div>
            <div className="cf:mb-8">
              <h3 className="cf:text-2xl cf:font-semibold cf:mb-4 cf:text-[#7B2A7C]">Phone</h3>
              <a href="tel:8133454044" className="cf:text-[#7B2A7C] cf:hover:underline cf:text-2xl cf:font-semibold">
                (813) 345-4044
              </a>
            </div>
            <div className="cf:mb-8">
              <h3 className="cf:text-2xl cf:font-semibold cf:mb-4 cf:text-[#7B2A7C]">Email</h3>
              <a href="mailto:info@floridaaesthetics.com" className="cf:text-[#7B2A7C] cf:hover:underline cf:text-lg">
                info@floridaaesthetics.com
              </a>
            </div>
            <div className="cf:flex cf:flex-col cf:sm:flex-row cf:gap-4">
              <a href="https://floridaaesthetics.com/schedule-appointment/" className="cf:bg-[#7B2A7C] cf:text-white cf:px-8 cf:py-4 cf:rounded-full cf:hover:bg-[#5a1f5b] cf:hover:text-white cf:font-semibold cf:shadow-lg cf:transform cf:hover:scale-105 cf:transition-all">
                Schedule Appointment
              </a>
              <a href="tel:8133454044" className="cf:bg-white cf:text-[#7B2A7C] cf:px-8 cf:py-4 cf:border-2 cf:border-[#7B2A7C] cf:rounded-full cf:hover:bg-[#7B2A7C] cf:hover:text-white cf:font-semibold cf:transition-all cf:shadow-lg">
                Call Now
              </a>
            </div>
          </div>
          <div className="cf:rounded-2xl cf:overflow-hidden cf:shadow-lg cf:border cf:border-gray-200 cf:h-96">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3524.845679!2d-82.2959!3d27.9375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88c2c1e0f7f7f7f7%3A0x1234567890!2s1767%20S%20Kings%20Ave%2C%20Brandon%2C%20FL%2033511!5e0!3m2!1sen!2sus!4v1234567890"
              width="100%"
              height="100%"
              style="border:0;"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQAccordion() {
  const faqs = [
    {
      question: 'Is the consultation really free?',
      answer: 'Yes! We offer complimentary consultations to discuss your goals and create a personalized treatment plan.'
    },
    {
      question: 'Do you offer financing?',
      answer: 'Yes, we accept Allē Rewards, Cherry Financing, and CareCredit to make treatments more affordable.'
    },
    {
      question: 'Are your providers certified?',
      answer: 'All our practitioners are board-certified and have extensive training in aesthetic medicine.'
    },
    {
      question: 'How long does a typical treatment take?',
      answer: 'Most treatments take 15-60 minutes depending on the service. We\'ll discuss timing during your consultation.'
    },
    {
      question: 'What areas do you serve?',
      answer: 'We serve Brandon, Tampa Bay, and surrounding areas in Florida.'
    }
  ];

  return (
    <section className="cf:bg-white cf:py-24">
      <div className="cf:max-w-4xl cf:mx-auto cf:px-4">
        <h2 className="cf:text-4xl cf:font-light cf:text-center cf:mb-16 cf:text-gray-900 cf:tracking-wide">
          Frequently Asked Questions
        </h2>
        <div className="cf:flex cf:flex-col cf:gap-5">
          {faqs.map((faq, index) => (
            <FAQItem key={index} {...faq} />
          ))}
        </div>
        <div className="cf:text-center cf:mt-12">
          <a href="https://floridaaesthetics.com/service-faqs/" className="cf:text-[#7B2A7C] cf:font-semibold cf:hover:underline cf:text-lg">
            See All FAQs →
          </a>
        </div>
      </div>
    </section>
  );
}

function FAQItem({ question, answer }) {
  return (
    <details className="cf:bg-gradient-to-br cf:from-white cf:to-purple-50 cf:p-8 cf:rounded-2xl cf:shadow-md cf:border cf:border-purple-100 cf:hover:shadow-xl cf:transition-all">
      <summary className="cf:font-semibold cf:text-gray-900 cf:cursor-pointer cf:hover:text-[#7B2A7C] cf:text-lg">
        {question}
      </summary>
      <p className="cf:mt-4 cf:text-gray-600 cf:leading-relaxed cf:font-light">{answer}</p>
    </details>
  );
}

function Footer() {
  return (
    <footer className="cf:bg-[#7B2A7C] cf:text-white cf:py-16">
      <div className="cf:max-w-7xl cf:mx-auto cf:px-4">
        {/* Newsletter Section */}
        <div className="cf:mb-12 cf:pb-12 cf:border-b cf:border-purple-500">
          <div className="cf:grid cf:grid-cols-1 cf:md:grid-cols-2 cf:gap-8 cf:items-center">
            <div>
              <h3 className="cf:text-2xl cf:font-bold cf:mb-3 cf:text-white">Stay Updated</h3>
              <p className="cf:text-white cf:text-base">Subscribe to our newsletter for exclusive offers and beauty tips</p>
            </div>
            <div className="cf:flex cf:gap-3">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="cf:flex-1 cf:px-4 cf:py-3 cf:rounded-lg cf:border-2 cf:border-white cf:bg-transparent cf:text-white cf:placeholder-purple-200"
              />
              <button className="cf:bg-white cf:text-[#7B2A7C] cf:px-8 cf:py-3 cf:rounded-lg cf:hover:bg-purple-100 cf:hover:text-[#5a1f5b] cf:font-bold cf:transition-all cf:whitespace-nowrap">
                Sign Up
              </button>
            </div>
          </div>
        </div>
        
        {/* Logo and Links */}
        <div className="cf:flex cf:flex-col cf:items-center cf:mb-10">
          <img src="https://floridaaesthetics.com/wp-content/uploads/2020/04/Logo-200.png" alt="Florida Aesthetics Logo" className="cf:h-16 cf:mb-8" />
        </div>
        
        <div className="cf:grid cf:grid-cols-1 cf:md:grid-cols-4 cf:gap-10 cf:mb-10 cf:text-left">
          <div>
            <h3 className="cf:font-bold cf:mb-4 cf:text-xl cf:text-white">Top Services</h3>
            <ul className="cf:flex cf:flex-col cf:gap-3 cf:list-none cf:m-0 cf:p-0">
              <li><a href="https://floridaaesthetics.com/injectable-treatments/botox/" className="cf:text-white cf:hover:text-white cf:transition-colors">Botox</a></li>
              <li><a href="https://floridaaesthetics.com/injectable-treatments/juvederm/" className="cf:text-white cf:hover:text-white cf:transition-colors">Fillers</a></li>
              <li><a href="https://floridaaesthetics.com/coolsculpting-at-florida-aesthetics/" className="cf:text-white cf:hover:text-white cf:transition-colors">CoolSculpting</a></li>
              <li><a href="https://floridaaesthetics.com/laser-treatments/laser-hair-removal/" className="cf:text-white cf:hover:text-white cf:transition-colors">Laser Hair Removal</a></li>
              <li><a href="https://floridaaesthetics.com/wellness/weight-loss/" className="cf:text-white cf:hover:text-white cf:transition-colors">Weight Loss</a></li>
            </ul>
          </div>
          <div>
            <h3 className="cf:font-bold cf:mb-4 cf:text-xl cf:text-white">Top Concerns</h3>
            <ul className="cf:flex cf:flex-col cf:gap-3 cf:list-none cf:m-0 cf:p-0">
              <li><a href="https://floridaaesthetics.com/concerns/aging-skin/" className="cf:text-white cf:hover:text-white cf:transition-colors">Aging Skin</a></li>
              <li><a href="https://floridaaesthetics.com/concerns/stubborn-fat/" className="cf:text-white cf:hover:text-white cf:transition-colors">Stubborn Fat</a></li>
              <li><a href="https://floridaaesthetics.com/concerns/unwanted-hair/" className="cf:text-white cf:hover:text-white cf:transition-colors">Unwanted Hair</a></li>
              <li><a href="https://floridaaesthetics.com/concerns/wrinkles/" className="cf:text-white cf:hover:text-white cf:transition-colors">Wrinkles</a></li>
            </ul>
          </div>
          <div>
            <h3 className="cf:font-bold cf:mb-4 cf:text-xl cf:text-white">Patient Resources</h3>
            <ul className="cf:flex cf:flex-col cf:gap-3 cf:list-none cf:m-0 cf:p-0">
              <li><a href="https://floridaaesthetics.com/online-reviews/" className="cf:text-white cf:hover:text-white cf:transition-colors">Reviews</a></li>
              <li><a href="https://floridaaesthetics.com/service-faqs/" className="cf:text-white cf:hover:text-white cf:transition-colors">FAQs</a></li>
              <li><a href="https://floridaaesthetics.com/payment-plans/" className="cf:text-white cf:hover:text-white cf:transition-colors">Payment Plans</a></li>
              <li><a href="https://floridaaesthetics.com/florida-aesthetics-blog/" className="cf:text-white cf:hover:text-white cf:transition-colors">Blog</a></li>
              <li><a href="https://floridaaesthetics.com/en-espanol/" className="cf:text-white cf:hover:text-white cf:transition-colors">En español</a></li>
              <li><a href="https://floridaaesthetics.com/contact/" className="cf:text-white cf:hover:text-white cf:transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="cf:font-bold cf:mb-4 cf:text-xl cf:text-white">Location</h3>
            <p className="cf:text-white cf:mb-4 cf:leading-relaxed">
              1767 S. Kings Ave.
              <br />
              Brandon, FL 33511
            </p>
            <a href="tel:8133454044" className="cf:text-white cf:hover:text-white cf:font-bold cf:text-lg">
              (813) 345-4044
            </a>
          </div>
        </div>
        <div className="cf:border-t cf:border-purple-500 cf:pt-8 cf:text-center cf:text-white">
          <p className="cf:mb-4">
            <a href="https://floridaaesthetics.com/terms-of-service/" className="cf:text-white cf:hover:text-white cf:transition-colors">Terms of Service</a>
            {' | '}
            <a href="https://floridaaesthetics.com/privacy-policy/" className="cf:text-white cf:hover:text-white cf:transition-colors">Privacy Policy</a>
          </p>
          <p className="cf:font-semibold">2007-2025 © Florida Aesthetics and Wellness</p>
        </div>
      </div>
    </footer>
  );
}

// === UTILITY FUNCTIONS ===

function monitorChangesByConditionAndRun(conditionFn, callbackFn) {
  if (conditionFn()) {
    callbackFn();
    return;
  }

  const observer = new MutationObserver(() => {
    if (conditionFn()) {
      observer.disconnect();
      callbackFn();
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

function initTest(testInfo) {
  if (!window.CF || !window.CF.tests) {
    window.CF = window.CF || {};
    window.CF.tests = window.CF.tests || {};
  }

  if (window.CF.tests[testInfo.name]) {
    console.log(`Test already running: ${testInfo.name}`);
    return false;
  }

  window.CF.tests[testInfo.name] = testInfo;
  return true;
}
