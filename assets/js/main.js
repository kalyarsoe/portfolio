/**
 * Kalyar Soe Myat Htwe — Personal Portfolio Application Script
 * Referencing official CV & career milestones
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
  initCopyActions();
});

/* --------------------------------------------------------------------------
 * 1. Theme Management (Dark / Light Mode)
 * -------------------------------------------------------------------------- */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIconDark = document.getElementById('theme-icon-dark');
  const themeIconLight = document.getElementById('theme-icon-light');

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
    'Senior Software Engineer',
    'Senior Full Stack Developer',
    'PHP & Laravel Specialist',
    'Node.js & React Developer',
    'Enterprise ERP Architect'
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
      typingSpeed = 35;
    } else {
      target.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 80;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typingSpeed = 1800;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* --------------------------------------------------------------------------
 * 6. Projects Data & Interactive Modal (From Official CV)
 * -------------------------------------------------------------------------- */
const projectData = {
  careviewer: {
    title: 'Care Viewer Management System',
    company: 'Polestar Service Co., Ltd | Yangon',
    category: 'Healthcare & SaaS',
    period: 'Mar 2025 - Present',
    role: 'Senior Full Stack Developer',
    overview: 'An enterprise healthcare and nursing management ecosystem operating for hospital networks and eldercare facilities. Powers critical hospital operations, patient records, health evaluations, and ministerial compliance.',
    challenges: [
      'Architected comprehensive Patient Management and Hospital Management operational modules with strict privacy standards.',
      'Developed specialized Oral & Nutrition Screening workflows and Daily Life Records pipelines for clinical caregivers.',
      'Integrated resilient cloud architectures on AWS EC2/RDS with optimized MySQL queries for real-time facility logging.'
    ],
    features: [
      'Hospital Management and Department Configuration',
      'Patient Management, Profiles, and Medication Tracking',
      'Oral Screening and Nutritional Diagnostic Records',
      'Daily Life Record timeline and clinical handover notes'
    ],
    techStack: ['Laravel', 'JavaScript', 'AWS', 'CSS', 'MySQL', 'RESTful APIs'],
    githubUrl: 'https://github.com/kalyarsoe',
    liveUrl: 'https://www.careviewer.jp'
  },
  'gaming-platform': {
    title: 'Online Gaming & Entertainment Platform',
    company: 'Future Innovation Co., Ltd | Yangon',
    category: 'Fintech & Gaming',
    period: 'Sep 2024 - Mar 2025',
    role: 'Senior PHP Developer',
    overview: 'A high-throughput, real-time online gaming and entertainment platform engineered for Group Online Entertainment. Supports live sports betting, electronic games, and virtual casinos with strict regulatory standards.',
    challenges: [
      'Engineered high-concurrency transactional architectures using PostgreSQL and Redis caching for ultra-low latency bet processing.',
      'Implemented reactive frontend user interfaces using Vue.js for dynamic live scoreboards and interactive games.',
      'Enforced rigorous compliance with regulatory security and financial audit trails to protect player transactions.'
    ],
    features: [
      'Live sports betting engine with dynamic real-time odds calculation',
      'Virtual casino and electronic games lobby with wallet balances',
      'Sub-millisecond balance deductions and atomic transaction rollbacks',
      'Comprehensive administrative fraud detection and audit analytics'
    ],
    techStack: ['Laravel', 'Vue.js', 'PostgreSQL', 'Redis', 'JavaScript', 'CSS'],
    githubUrl: 'https://github.com/kalyarsoe',
    liveUrl: null
  },
  'construction-system': {
    title: 'Smart Construction Management System',
    company: 'Brycen Myanmar Co., Ltd | Yangon',
    category: 'Node.js & Mobile Web',
    period: 'May 2023 - Dec 2023',
    role: 'Senior Software Engineer',
    overview: 'A real-time, responsive IoT-connected site management system facilitating worker safety, site operations, daily health check protocols, and role-based operational permissions on construction locations.',
    challenges: [
      'Developed real-time cloud data sync utilizing Firebase Firestore and Node.js for off-site connectivity.',
      'Built a robust, type-safe full-stack application using TypeScript and React JS.',
      'Designed responsive biometric/health assessment checklists ensuring site workers meet occupational safety requirements.'
    ],
    features: [
      'Worker onboarding, certification, and attendance tracking',
      'Daily health checking and safety compliance audit logs',
      'Multi-site construction project overview and dispatch management',
      'Role-based permission controls for site engineers, supervisors, and admins'
    ],
    techStack: ['Node.js', 'TypeScript', 'React JS', 'Firebase', 'REST APIs'],
    githubUrl: 'https://github.com/kalyarsoe',
    liveUrl: null
  },
  'contract-system': {
    title: 'Enterprise Contract Management System',
    company: 'Brycen Myanmar Co., Ltd | Yangon',
    category: 'Enterprise SaaS',
    period: 'Jan 2024 - Apr 2024',
    role: 'Senior Software Engineer',
    overview: 'A centralized corporate contract lifecycle solution automating contract authoring, template generation, multi-party counterparty management, and status approval workflows.',
    challenges: [
      'Built dynamic dashboard visualization analytics for contract statuses, expiration warnings, and renewal rates using React JS.',
      'Created reusable template engines enabling rapid contract generation with automated counterparty field population.',
      'Implemented secure audit logs tracking every change and signature milestone across contract lifecycles.'
    ],
    features: [
      'Interactive contract executive dashboard and status indicators',
      'Counterparty management with vendor credentials and histories',
      'Contract template creation, version control, and auto-population',
      'User permission matrix and digital approval routing'
    ],
    techStack: ['Laravel', 'React JS', 'MySQL', 'JavaScript', 'REST APIs'],
    githubUrl: 'https://github.com/kalyarsoe',
    liveUrl: null
  },
  'scroll360-erp': {
    title: 'Scroll360 Retail & E-Commerce ERP System',
    company: 'Brycen Myanmar Co., Ltd | Yangon',
    category: 'Enterprise ERP',
    period: 'May 2024 - Sep 2024',
    role: 'Senior Software Engineer',
    overview: 'An extensive ERP software platform powering multi-channel retail operations: warehouse order processing, live stock synchronization, shop networks, and structured automated SFTP data exchanges.',
    challenges: [
      'Maintained and extended high-reliability enterprise backend architectures built on the Zend PHP framework.',
      'Implemented automated SFTP file transfer pipelines for scheduled merchant inventory synchronization and financial reconciliation.',
      'Engineered multi-category hierarchy and stock reservation logic preventing overselling during peak sales events.'
    ],
    features: [
      'Order fulfillment, invoicing, and tracking lifecycle management',
      'Multi-warehouse stock management with automated threshold alerts',
      'Shop and branch management with sales attribution analytics',
      'Product catalog management with category trees and variants'
    ],
    techStack: ['Zend Framework', 'SFTP', 'MySQL', 'JavaScript', 'HTML5/CSS3'],
    githubUrl: 'https://github.com/kalyarsoe',
    liveUrl: null
  },
  'erp-admin-panel': {
    title: 'Integrated Enterprise ERP & Admin Panel Ecosystem',
    company: 'Brycen Myanmar Co., Ltd | Yangon',
    category: 'Enterprise ERP',
    period: 'Jun 2020 - May 2023',
    role: 'Junior Software Engineer → Senior Software Engineer',
    overview: 'A flagship corporate ERP suite and centralized administration portal serving human resources, corporate expenses, asset & vehicle reservations, department hierarchies, and fine-grained permissions.',
    challenges: [
      'Progressed from Junior to Senior Software Engineer over 3 years, leading core backend architectural modules.',
      'Designed a versatile Plan Management module managing shared corporate meeting rooms and fleet vehicle reservation schedules.',
      'Integrated Redis caching and secure SFTP file exchanges for centralized ERP multi-system synchronization.'
    ],
    features: [
      'Human Resources (HR) & integrated attendance/leave tracking',
      'Corporate Expense management and approval routing',
      'Plan Management (meeting room scheduling & company vehicle booking)',
      'Fine-grained Role-Based Access Control (RBAC) across departments'
    ],
    techStack: ['Laravel', 'React JS', 'Redis', 'SFTP', 'MySQL', 'REST APIs'],
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
  const closeModalBtn = document.getElementById('modal-close-btn');
  const detailBtns = document.querySelectorAll('.open-project-modal');

  if (!modal) return;

  function openModal(projectId) {
    const data = projectData[projectId];
    if (!data) return;

    document.getElementById('modal-title').textContent = data.title;
    document.getElementById('modal-badge').textContent = data.category;
    document.getElementById('modal-role').textContent = `${data.role} • ${data.company} (${data.period})`;
    document.getElementById('modal-overview').textContent = data.overview;

    const challengesList = document.getElementById('modal-challenges');
    challengesList.innerHTML = data.challenges.map(c => `
      <li class="flex items-start gap-2 text-slate-300">
        <span class="text-indigo-400 mt-1">▹</span>
        <span>${c}</span>
      </li>
    `).join('');

    const featuresList = document.getElementById('modal-features');
    featuresList.innerHTML = data.features.map(f => `
      <li class="flex items-start gap-2 text-slate-300">
        <span class="text-cyan-400 mt-1">▹</span>
        <span>${f}</span>
      </li>
    `).join('');

    const techContainer = document.getElementById('modal-tech');
    techContainer.innerHTML = data.techStack.map(t => `
      <span class="px-2.5 py-1 text-xs font-mono font-medium rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
        ${t}
      </span>
    `).join('');

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

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('[name="name"]')?.value || '';
    const email = form.querySelector('[name="email"]')?.value || '';
    const message = form.querySelector('[name="message"]')?.value || '';

    const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
    const body = encodeURIComponent(`Hello Kalyar,\n\n${message}\n\nFrom: ${name} (${email})`);
    const mailtoUrl = `mailto:kalyarsoemyathtwe123@gmail.com?subject=${subject}&body=${body}`;

    showToast('✨ Thank you! Launching your email client...');
    window.location.href = mailtoUrl;

    form.reset();
  });
}

/* --------------------------------------------------------------------------
 * 8. Copy to Clipboard (Email & Phone)
 * -------------------------------------------------------------------------- */
function initCopyActions() {
  const copyBtns = document.querySelectorAll('.copy-btn');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', async () => {
      const textToCopy = btn.getAttribute('data-copy') || 'kalyarsoemyathtwe123@gmail.com';
      const label = btn.getAttribute('data-label') || 'Text';
      try {
        await navigator.clipboard.writeText(textToCopy);
        showToast(`📋 ${label} copied to clipboard!`);
      } catch (err) {
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast(`📋 ${label} copied to clipboard!`);
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
