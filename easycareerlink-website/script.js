/**
 * Easy Career Link – Standalone Vanilla JavaScript
 * Handles navigation, modals, live profile scoring, and form validation.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Modal Elements & Functions
  const modalOverlay = document.getElementById('bookingModal');
  const openModalBtns = document.querySelectorAll('.js-open-modal');
  const closeModalBtns = document.querySelectorAll('.js-close-modal');

  function openModal() {
    if (modalOverlay) {
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal() {
    if (modalOverlay) {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
      // Reset form view
      const modalForm = document.getElementById('modalForm');
      const modalSuccess = document.getElementById('modalSuccess');
      if (modalForm) modalForm.style.display = 'block';
      if (modalSuccess) modalSuccess.style.display = 'none';
    }
  }

  openModalBtns.forEach(btn => btn.addEventListener('click', openModal));
  closeModalBtns.forEach(btn => btn.addEventListener('click', closeModal));

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });

  // 2. Modal Form Submission
  const modalForm = document.getElementById('modalForm');
  const modalSuccess = document.getElementById('modalSuccess');
  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('modalName')?.value.trim();
      const email = document.getElementById('modalEmail')?.value.trim();
      const phone = document.getElementById('modalPhone')?.value.trim();
      const visa = document.getElementById('modalVisa')?.value;

      if (!name || !email || !phone || !visa) {
        alert('Please fill out all required fields (Name, Email, Phone, and Visa Status).');
        return;
      }

      modalForm.style.display = 'none';
      if (modalSuccess) {
        modalSuccess.style.display = 'block';
        const msg = document.getElementById('modalSuccessMsg');
        if (msg) {
          msg.textContent = `Thank you, ${name}. Our senior placement mentor will reach out to ${email} to confirm your free consultation.`;
        }
      }
    });
  }

  // 3. Strategy Tabs (OPT, H1B, Green Card, US Citizen)
  const strategyData = {
    'OPT / STEM OPT': {
      title: 'OPT & STEM OPT Strategy',
      timeline: '~4 Weeks Avg',
      focus: 'E-Verify Employers & 24-Month Extension Compliance',
      tip: 'Highlight cap-gap eligibility, practical technical projects, and E-Verify alignment.'
    },
    'H1B Professionals': {
      title: 'H-1B Professional Strategy',
      timeline: '~6 Weeks Avg',
      focus: 'H-1B Transfer, Cap-Exempt & Mid-Senior Role Targeting',
      tip: 'Quantify impact, system architecture experience, and specialized domain expertise.'
    },
    'Green Card Holders': {
      title: 'Permanent Resident Strategy',
      timeline: '~3 Weeks Avg',
      focus: 'High-Growth Tech & Enterprise Placement',
      tip: 'Lead with immediate start availability and leadership credentials to bypass filters.'
    },
    'US Citizens': {
      title: 'US Citizen Strategy',
      timeline: '~3 Weeks Avg',
      focus: 'Defense, Government, & High-Growth Tech Placement',
      tip: 'Leverage clearance or unrestricted work authorization as a top qualification.'
    }
  };

  const stratPills = document.querySelectorAll('.strat-pill');
  const stratTitle = document.getElementById('stratTitle');
  const stratTimeline = document.getElementById('stratTimeline');
  const stratFocus = document.getElementById('stratFocus');
  const stratTip = document.getElementById('stratTip');

  stratPills.forEach(pill => {
    pill.addEventListener('click', () => {
      stratPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const val = pill.getAttribute('data-visa');
      const info = strategyData[val];
      if (info) {
        if (stratTitle) stratTitle.textContent = info.title;
        if (stratTimeline) stratTimeline.textContent = info.timeline;
        if (stratFocus) stratFocus.textContent = info.focus;
        if (stratTip) stratTip.textContent = info.tip;
      }
    });
  });

  // 4. Motivational Quotes Carousel
  const quotes = [
    'Success begins where preparation meets opportunity.',
    'Nothing is difficult until you face it and solve it.',
    'Every interview is one step closer to your dream career.',
    'Consistency beats talent when talent doesn\'t stay consistent.',
    'Your next opportunity may be just one application away.'
  ];
  let quoteIdx = 0;
  const quoteDisplay = document.getElementById('carouselQuote');
  if (quoteDisplay) {
    setInterval(() => {
      quoteIdx = (quoteIdx + 1) % quotes.length;
      quoteDisplay.style.opacity = '0';
      setTimeout(() => {
        quoteDisplay.textContent = `"${quotes[quoteIdx]}"`;
        quoteDisplay.style.opacity = '1';
      }, 300);
    }, 4500);
  }

  // 5. Contact Form Live Profile Readiness Meter
  const contactForm = document.getElementById('mainContactForm');
  const readinessScoreEl = document.getElementById('readinessScore');
  const readinessStatusEl = document.getElementById('readinessStatus');
  const readinessMeterFill = document.getElementById('readinessMeterFill');

  function updateReadiness() {
    let score = 20;
    const name = document.getElementById('cName')?.value.trim();
    const email = document.getElementById('cEmail')?.value.trim();
    const phone = document.getElementById('cPhone')?.value.trim();
    const loc = document.getElementById('cLocation')?.value.trim();
    const visa = document.getElementById('cVisa')?.value;
    const resume = document.getElementById('cResume')?.value.trim();

    if (name && name.length >= 2) score += 10;
    if (email && email.includes('@')) score += 15;
    if (phone && phone.length >= 7) score += 10;
    if (loc && loc.length >= 2) score += 10;
    if (visa && visa !== '') score += 15;
    if (resume && resume.length >= 3) score += 20;

    score = Math.min(100, score);

    let level = 'Needs Polish';
    if (score >= 80) level = 'Interview Ready';
    else if (score >= 50) level = 'Promising';

    if (readinessScoreEl) readinessScoreEl.textContent = `${score}%`;
    if (readinessStatusEl) readinessStatusEl.textContent = `Status: ${level}`;
    if (readinessMeterFill) readinessMeterFill.style.width = `${score}%`;
  }

  ['cName', 'cEmail', 'cPhone', 'cLocation', 'cVisa', 'cResume'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', updateReadiness);
  });

  // Contact Form Submission
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('cName')?.value.trim();
      const email = document.getElementById('cEmail')?.value.trim();
      const phone = document.getElementById('cPhone')?.value.trim();
      const visa = document.getElementById('cVisa')?.value;

      if (!name || !email || !phone || !visa) {
        alert('Please complete required fields (Full Name, Email Address, Phone Number, and Visa Status).');
        return;
      }

      contactForm.style.display = 'none';
      const successEl = document.getElementById('contactSuccess');
      if (successEl) {
        successEl.style.display = 'block';
        const nameDisplay = document.getElementById('contactSuccessName');
        if (nameDisplay) nameDisplay.textContent = name;
      }
    });
  }

  // Mobile navigation drawer toggle
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mobileNavMenu = document.getElementById('mobileNavMenu');
  if (mobileMenuToggle && mobileNavMenu) {
    mobileMenuToggle.addEventListener('click', () => {
      const isOpen = mobileNavMenu.style.display === 'block';
      mobileNavMenu.style.display = isOpen ? 'none' : 'block';
    });
    // Close mobile menu on clicking any link
    mobileNavMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileNavMenu.style.display = 'none';
      });
    });
  }
});
