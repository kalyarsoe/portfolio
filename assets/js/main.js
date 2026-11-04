/**
 * Kalyar Soe Myat Htwe — Personal Portfolio Application Script
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initScrollProgress();
  initNavHighlight();
  initMobileMenu();
  initTypewriter();
  initProjectFilter();
  initProjectModal();
  initContactForm();
  initCopyEmail();
});

/* --------------------------------------------------------------------------
 * 1. Theme Management (Dark / Light Mode)
 * -------------------------------------------------------------------------- */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIconDark = document.getElementById('theme-icon-dark');
  const themeIconLight = document.getElementById('theme-icon-light');

  // Check saved theme or system preference
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'light' || (!savedTheme && !prefersDark)) {
    document.documentElement.classList.add('light');
    themeIconDark?.classList.remove('hidden');
    themeIconLight?.classList.add('hidden');
  } else {
    document.documentElement.classList.remove('light');
    themeIconDark?.classList.add('hidden');
    themeIconLight?.classList.remove('hidden');
  }

  themeToggleBtn?.addEventListener('click', () => {
    const isLight = document.documentElement.classList.toggle('light');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');

    if (isLight) {
      themeIconDark?.classList.remove('hidden');
      themeIconLight?.classList.add('hidden');
    } else {
      themeIconDark?.classList.add('hidden');
      themeIconLight?.classList.remove('hidden');
    }
  });
}

/* --------------------------------------------------------------------------
 * 2. Scroll Progress & Sticky Header
 * -------------------------------------------------------------------------- */
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  const header = document.getElementById('main-header');

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
    if (progressBar) progressBar.style.width = `${progress}%`;

    // Subtle header background elevation on scroll
    if (header) {
      if (window.scrollY > 40) {
        header.classList.add('shadow-lg', 'bg-opacity-90');
      } else {
        header.classList.remove('shadow-lg', 'bg-opacity-90');
      }
    }
  }, { passive: true });
}

/* --------------------------------------------------------------------------
 * 3. Active Nav Highlighting
 * -------------------------------------------------------------------------- */
function initNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('text-indigo-400', 'font-semibold');
            link.classList.remove('text-slate-400');
          } else {
            link.classList.remove('text-indigo-400', 'font-semibold');
            link.classList.add('text-slate-400');
          }
        });
      }
    });
  }, { rootMargin: '-20% 0px -70% 0px' });

  sections.forEach(section => observer.observe(section));
}

/* --------------------------------------------------------------------------
 * 4. Mobile Menu Navigation
 * -------------------------------------------------------------------------- */
function initMobileMenu() {
  const menuToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (!menuToggle || !mobileMenu) return;

  menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    mobileMenu.classList.toggle('hidden');
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* --------------------------------------------------------------------------
 * 5. Typewriter Effect
 * -------------------------------------------------------------------------- */
function initTypewriter() {
  const target = document.getElementById('typewriter-text');
  if (!target) return;

  const roles = [
    'Full-Stack Web Developer',
    'Laravel & PHP Specialist',
    'Backend & Cloud Architect',
    'Python & REST API Engineer'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function type() {
    const currentRole = roles[roleIndex];
    if (isDeleting) {
      target.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 40;
    } else {
      target.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 90;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typingSpeed = 1800; // Pause at full word
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400; // Pause before new word
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* --------------------------------------------------------------------------
 * 6. Projects Data & Interactive Modal
 * -------------------------------------------------------------------------- */
const projectData = {
  careviewer: {
    title: 'CareViewer Cloud SaaS Platform',
    category: 'Enterprise SaaS & Cloud',
    period: 'Production Deployment',
    role: 'Backend & Full Stack Engineer',
    overview: 'An enterprise nursing and caregiving operations management platform for elderly care facilities in Japan (www.careviewer.jp). Handles complex care planning, daily digital care logs, and automated compliance with Japanese Ministry of Health regulations.',
    challenges: [
      'Engineered ministerial LIFE standard CSV export and import pipelines for compliance and data exchange with government systems.',
      'Architected zero-downtime database migration moving production data from AWS to Sakura Cloud infrastructure.',
      'Designed multi-tenant data isolation and dynamic pricing plan permission tiers for enterprise facility clients.'
    ],
    features: [
      'Care Plan 2 digital scheduling with interactive drag-and-drop date validation',
      'Accident reporting, handover (Moshiokuri) records, and shift communications',
      'Automated Oral and Nutritional screening CSV pipelines',
      'Role-based access controls across care workers, managers, and medical directors'
    ],
    techStack: ['PHP 8', 'Laravel', 'MySQL', 'Docker', 'AWS', 'Sakura Cloud', 'RESTful APIs', 'Redis', 'Linux'],
    githubUrl: 'https://github.com/kalyarsoe',
    liveUrl: 'https://www.careviewer.jp'
  },
  'clothing-shop': {
    title: 'Modern Thread - E-Commerce & Retail Management System',
    category: 'Python & Automation',
    period: 'Full Stack Open Source',
    role: 'Lead Architect & Developer',
    overview: 'A zero-dependency, modular Python retail and e-commerce inventory management platform with interactive CLI and web storefront. Solves inventory variant management, promotional discounts, and financial sales reporting.',
    challenges: [
      'Implemented atomic inventory deductions to prevent race conditions during concurrent checkouts.',
      'Constructed a zero-external-dependency SPA architecture using Python built-in standard library http.server and SQLite.',
      'Achieved 100% test coverage with automated unit tests for cart operations, tax logic, and restocking workflows.'
    ],
    features: [
      'Multi-variant SKU tracking by size (XS to XXL) and custom colorways',
      'Promotional coupon engine supporting percentage & fixed discounts with minimum spend constraints',
      'Dual interface: Terminal POS CLI with ANSI tables + Responsive modern web storefront',
      'Automated sales valuation reporting, gross margin tracking, and CSV export'
    ],
    techStack: ['Python 3', 'SQLite', 'REST API', 'Vanilla JavaScript', 'HTML5/CSS3', 'Unit Testing'],
    githubUrl: 'https://github.com/kalyarsoe',
    liveUrl: null
  },
  'employee-api': {
    title: 'Enterprise Employee & Department REST API',
    category: 'APIs & Backend',
    period: 'Production Microservice',
    role: 'Backend API Architect',
    overview: 'A robust, high-performance RESTful API built to manage corporate organization structures, employee profiles, department hierarchies, and secure data access with strict validation.',
    challenges: [
      'Designed normalized relational database schemas with optimized foreign keys and index strategies for sub-millisecond query responses.',
      'Implemented token-based authentication and granular permission middleware.',
      'Provided consistent JSON API specifications with standardized error codes and pagination.'
    ],
    features: [
      'Comprehensive CRUD endpoints for employees, roles, departments, and payroll profiles',
      'Dynamic filtering, searching, and multi-field sorting capabilities',
      'Automated request payload validation and custom sanitization filters',
      'Postman collection and API documentation schema'
    ],
    techStack: ['PHP', 'MySQL', 'REST API', 'OOP Architecture', 'Git', 'Postman'],
    githubUrl: 'https://github.com/kalyarsoe/employee-api',
    liveUrl: null
  },
  'cloud-migration': {
    title: 'AWS to Sakura Cloud Migration & ETL Pipeline',
    category: 'Cloud & Architecture',
    period: 'Enterprise Infrastructure',
    role: 'Cloud & Database Specialist',
    overview: 'A mission-critical data migration and ETL orchestration pipeline transitioning sensitive Japanese healthcare databases from AWS EC2/RDS to cost-optimized Sakura Cloud infrastructure.',
    challenges: [
      'Executed large-scale multi-gigabyte SQL migrations with zero loss of medical or shift record fidelity.',
      'Configured custom Shell/Bash verification scripts that performed pre- and post-migration checksum validation.',
      'Tuned MySQL InnoDB buffer pools and index caching to drastically improve query performance on new instances.'
    ],
    features: [
      'Automated database dump, compression, and secure transfer pipelines',
      'Failover recovery protocols and rollback staging environments',
      'Automated daily backup verification cron jobs',
      'Detailed migration auditing and memory optimization documentation'
    ],
    techStack: ['AWS', 'Sakura Cloud', 'MySQL', 'Bash Scripting', 'Linux', 'Docker', 'SSH/Rsync'],
    githubUrl: 'https://github.com/kalyarsoe',
    liveUrl: null
  }
};

function initProjectFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('bg-indigo-600', 'text-white');
        b.classList.add('bg-slate-800', 'text-slate-300');
      });
      btn.classList.remove('bg-slate-800', 'text-slate-300');
      btn.classList.add('bg-indigo-600', 'text-white');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.classList.add('fade-in');
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

function initProjectModal() {
  const modal = document.getElementById('project-modal');
  const modalContent = document.getElementById('modal-card-content');
  const closeModalBtn = document.getElementById('modal-close-btn');
  const detailBtns = document.querySelectorAll('.open-project-modal');

  if (!modal) return;

  function openModal(projectId) {
    const data = projectData[projectId];
    if (!data) return;

    document.getElementById('modal-title').textContent = data.title;
    document.getElementById('modal-badge').textContent = data.category;
    document.getElementById('modal-role').textContent = `Role: ${data.role} • ${data.period}`;
    document.getElementById('modal-overview').textContent = data.overview;

    // Challenges list
    const challengesList = document.getElementById('modal-challenges');
    challengesList.innerHTML = data.challenges.map(c => `
      <li class="flex items-start gap-2 text-slate-300">
        <span class="text-indigo-400 mt-1">▹</span>
        <span>${c}</span>
      </li>
    `).join('');

    // Features list
    const featuresList = document.getElementById('modal-features');
    featuresList.innerHTML = data.features.map(f => `
      <li class="flex items-start gap-2 text-slate-300">
        <span class="text-cyan-400 mt-1">▹</span>
        <span>${f}</span>
      </li>
    `).join('');

    // Tech badges
    const techContainer = document.getElementById('modal-tech');
    techContainer.innerHTML = data.techStack.map(t => `
      <span class="px-2.5 py-1 text-xs font-mono font-medium rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
        ${t}
      </span>
    `).join('');

    // Action links
    const modalGithub = document.getElementById('modal-github');
    const modalLive = document.getElementById('modal-live');

    if (data.githubUrl) {
      modalGithub.href = data.githubUrl;
      modalGithub.classList.remove('hidden');
    } else {
      modalGithub.classList.add('hidden');
    }

    if (data.liveUrl) {
      modalLive.href = data.liveUrl;
      modalLive.classList.remove('hidden');
    } else {
      modalLive.classList.add('hidden');
    }

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
  }

  detailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project');
      openModal(projectId);
    });
  });

  closeModalBtn?.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });
}

/* --------------------------------------------------------------------------
 * 7. Contact Form Handling
 * -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const toast = document.getElementById('toast-notification');
  const toastMessage = document.getElementById('toast-message');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('[name="name"]')?.value || '';
    const email = form.querySelector('[name="email"]')?.value || '';
    const message = form.querySelector('[name="message"]')?.value || '';

    // Direct mailto trigger as fallback for direct communication
    const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
    const body = encodeURIComponent(`Hello Kalyar,\n\n${message}\n\nFrom: ${name} (${email})`);
    const mailtoUrl = `mailto:59438606+kalyarsoe@users.noreply.github.com?subject=${subject}&body=${body}`;

    showToast('✨ Thank you! Launching your email client now...');
    window.location.href = mailtoUrl;

    form.reset();
  });
}

/* --------------------------------------------------------------------------
 * 8. Copy Email to Clipboard
 * -------------------------------------------------------------------------- */
function initCopyEmail() {
  const copyBtns = document.querySelectorAll('.copy-email-btn');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', async () => {
      const email = btn.getAttribute('data-email') || '59438606+kalyarsoe@users.noreply.github.com';
      try {
        await navigator.clipboard.writeText(email);
        showToast('📋 Email copied to clipboard!');
      } catch (err) {
        // Fallback
        const textarea = document.createElement('textarea');
        textarea.value = email;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast('📋 Email copied to clipboard!');
      }
    });
  });
}

function showToast(message) {
  const toast = document.getElementById('toast-notification');
  const toastMessage = document.getElementById('toast-message');
  if (!toast || !toastMessage) return;

  toastMessage.textContent = message;
  toast.classList.remove('translate-y-20', 'opacity-0', 'pointer-events-none');
  toast.classList.add('translate-y-0', 'opacity-100');

  setTimeout(() => {
    toast.classList.add('translate-y-20', 'opacity-0', 'pointer-events-none');
    toast.classList.remove('translate-y-0', 'opacity-100');
  }, 3500);
}
