/**
 * Beacon Valley School - EduBloom LMS
 * Reusable Components, Mascots, UI Modals & Shell
 */

// Cute School Mascot: "Professor Bloomie" (Smart friendly academic owl with graduation cap & book)
const MASCOT_SCHOOL_SVG = `
<svg viewBox="0 0 160 160" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Soft Glow Aura -->
  <circle cx="80" cy="80" r="70" fill="url(#owlAura)" opacity="0.6"/>
  <!-- Body -->
  <ellipse cx="80" cy="98" rx="46" ry="48" fill="#1e3a6a"/>
  <!-- Belly -->
  <ellipse cx="80" cy="106" rx="34" ry="36" fill="#f8fafc"/>
  <path d="M70 94 Q80 102 90 94" stroke="#d4af37" stroke-width="2.5" stroke-linecap="round" fill="none"/>
  <path d="M66 108 Q80 118 94 108" stroke="#d4af37" stroke-width="2.5" stroke-linecap="round" fill="none"/>
  <path d="M72 122 Q80 128 88 122" stroke="#d4af37" stroke-width="2.5" stroke-linecap="round" fill="none"/>
  <!-- Wings -->
  <path d="M34 85 C28 98 32 122 46 128 C48 116 46 98 42 88 Z" fill="#0f274a"/>
  <path d="M126 85 C132 98 128 122 114 128 C112 116 114 98 118 88 Z" fill="#0f274a"/>
  <!-- Left Eye -->
  <circle cx="62" cy="72" r="18" fill="#ffffff" stroke="#d4af37" stroke-width="3"/>
  <circle cx="65" cy="72" r="10" fill="#0d1f3c"/>
  <circle cx="68" cy="69" r="4" fill="#ffffff"/>
  <!-- Right Eye -->
  <circle cx="98" cy="72" r="18" fill="#ffffff" stroke="#d4af37" stroke-width="3"/>
  <circle cx="95" cy="72" r="10" fill="#0d1f3c"/>
  <circle cx="98" cy="69" r="4" fill="#ffffff"/>
  <!-- Glasses Frame Bridge -->
  <path d="M80 72 L80 72" stroke="#d4af37" stroke-width="3.5"/>
  <path d="M78 72 Q80 69 82 72" stroke="#d4af37" stroke-width="3" stroke-linecap="round"/>
  <!-- Beak -->
  <polygon points="76,82 84,82 80,94" fill="#f59e0b"/>
  <!-- Graduation Cap -->
  <polygon points="80,24 132,40 80,54 28,40" fill="#071326"/>
  <polygon points="80,22 130,38 80,52 30,38" fill="#0d1f3c"/>
  <rect x="56" y="44" width="48" height="15" rx="3" fill="#071326"/>
  <!-- Tassel -->
  <circle cx="80" cy="38" r="4" fill="#d4af37"/>
  <path d="M80 38 Q106 44 116 60" stroke="#d4af37" stroke-width="2.5" fill="none"/>
  <rect x="113" y="58" width="6" height="12" rx="2" fill="#d4af37"/>
  <!-- Open Book In Front -->
  <path d="M80 134 L54 126 C50 125 46 128 46 132 L46 148 C46 150 49 152 52 153 L80 158 L108 153 C111 152 114 150 114 148 L114 132 C114 128 110 125 106 126 Z" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
  <path d="M80 134 L80 158" stroke="#d4af37" stroke-width="2.5"/>
  <defs>
    <radialGradient id="owlAura" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#fae8a4" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
  </defs>
</svg>
`;

// Cute AI Assistant Mascot: "Sparky Bot" (Cute friendly robotic teacher with screen & graduation cap)
const MASCOT_AI_SVG = `
<svg viewBox="0 0 140 140" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Glowing Antenna -->
  <line x1="70" y1="28" x2="70" y2="12" stroke="#3b82f6" stroke-width="3" stroke-linecap="round"/>
  <circle cx="70" cy="10" r="7" fill="#60a5fa"/>
  <circle cx="70" cy="10" r="4" fill="#ffffff"/>
  <!-- Head Frame -->
  <rect x="30" y="28" width="80" height="66" rx="22" fill="#0d1f3c" stroke="#3b82f6" stroke-width="3"/>
  <!-- Screen Face -->
  <rect x="38" y="36" width="64" height="50" rx="15" fill="#071326"/>
  <!-- Digital Eyes -->
  <circle cx="56" cy="58" r="8" fill="#38bdf8"/>
  <circle cx="58" cy="56" r="3" fill="#ffffff"/>
  <circle cx="84" cy="58" r="8" fill="#38bdf8"/>
  <circle cx="86" cy="56" r="3" fill="#ffffff"/>
  <!-- Cheerful Smile -->
  <path d="M62 70 Q70 77 78 70" stroke="#38bdf8" stroke-width="3" stroke-linecap="round" fill="none"/>
  <!-- Mini Graduation Cap on Corner -->
  <polygon points="44,20 74,12 88,26 56,34" fill="#d4af37"/>
  <rect x="52" y="26" width="22" height="7" rx="2" fill="#b8861d"/>
  <!-- Sparkles -->
  <path d="M116 35 L120 40 L125 40 L121 44 L123 49 L118 46 L113 49 L115 44 L111 40 L116 40 Z" fill="#f59e0b"/>
</svg>
`;

class UIComponents {
  // Full-Screen Background Watermark & Floating Ambient Elements
  renderWatermarkAndAmbient() {
    const cfg = window.db.getConfig();
    return `
      <!-- Full-Screen Dynamic Background Watermark -->
      <div class="school-watermark-overlay" id="school-watermark-overlay">
        <img src="${cfg.logoUrl}" alt="${cfg.schoolName} Watermark" class="school-watermark-img" onerror="this.src='assets/logo.png'"/>
      </div>

      <!-- Subtle Floating Background Educational Elements -->
      <div class="ambient-floating-elements">
        <span class="ambient-symbol symbol-1">🎓</span>
        <span class="ambient-symbol symbol-2">📚</span>
        <span class="ambient-symbol symbol-3">✏️</span>
        <span class="ambient-symbol symbol-4">💡</span>
        <span class="ambient-symbol symbol-5">⭐</span>
      </div>
    `;
  }

  // Render Top Quick-Role Switch Banner with generic titles
  renderRoleBar() {
    const user = window.auth.getUser();
    const activeRole = user ? user.role : 'owner';
    const cfg = window.db.getConfig();

    return `
      <div class="role-switch-bar">
        <div class="role-switch-title">
          <span>🏫 <strong>${cfg.schoolName}</strong></span>
          <span class="role-badge-tag">${user ? user.roleTitle : 'Logged Out'}</span>
        </div>
        <div class="role-pills">
          <span style="font-size:0.7rem; color:#94a3b8; margin-right:4px;">1-Click Role Preview:</span>
          <button class="role-pill-btn ${activeRole === 'owner' ? 'active' : ''}" onclick="window.switchRoleAndNavigate('owner')">👑 School Owner</button>
          <button class="role-pill-btn ${activeRole === 'admin' ? 'active' : ''}" onclick="window.switchRoleAndNavigate('admin')">🎓 School Admin</button>
          <button class="role-pill-btn ${activeRole === 'teacher' ? 'active' : ''}" onclick="window.switchRoleAndNavigate('teacher')">👩‍🏫 Faculty Teacher</button>
          <button class="role-pill-btn ${activeRole === 'parent' ? 'active' : ''}" onclick="window.switchRoleAndNavigate('parent')">👨‍👩‍👧 Parent / Guardian</button>
          <button class="role-pill-btn ${activeRole === 'student' ? 'active' : ''}" onclick="window.switchRoleAndNavigate('student')">🎒 Student Scholar</button>
        </div>
      </div>
    `;
  }

  // Render Sidebar Navigation based on current user permissions
  renderSidebar(currentPath) {
    const user = window.auth.getUser();
    if (!user) return '';

    const cfg = window.db.getConfig();
    const role = user.role;
    const isOwner = role === 'owner';
    const isAdmin = role === 'admin' || isOwner;
    const isTeacher = role === 'teacher';
    const isParent = role === 'parent';
    const isStudent = role === 'student';

    const deletedCount = window.db.getDeletedStudents().length;

    let navItems = `
      <div class="nav-section-title">Core Management</div>
      <li>
        <button class="nav-item-btn ${currentPath === '/dashboard' ? 'active' : ''}" onclick="window.router.navigate('/dashboard')">
          <span class="nav-icon">📊</span>
          <span>Dashboard</span>
        </button>
      </li>
    `;

    // Admin / Owner Views
    if (isAdmin) {
      navItems += `
        <li>
          <button class="nav-item-btn ${currentPath === '/students' ? 'active' : ''}" onclick="window.router.navigate('/students')">
            <span class="nav-icon">🎓</span>
            <span>Students</span>
          </button>
        </li>
        <li>
          <button class="nav-item-btn ${currentPath === '/recycle' ? 'active' : ''}" onclick="window.router.navigate('/recycle')">
            <span class="nav-icon">♻️</span>
            <span>Recycle Bin</span>
            ${deletedCount > 0 ? `<span class="nav-badge">${deletedCount}</span>` : ''}
          </button>
        </li>
        <li>
          <button class="nav-item-btn ${currentPath === '/teachers' ? 'active' : ''}" onclick="window.router.navigate('/teachers')">
            <span class="nav-icon">👩‍🏫</span>
            <span>Teachers</span>
          </button>
        </li>
        <li>
          <button class="nav-item-btn ${currentPath === '/classes' ? 'active' : ''}" onclick="window.router.navigate('/classes')">
            <span class="nav-icon">🏫</span>
            <span>Classes & Sections</span>
          </button>
        </li>
        <li>
          <button class="nav-item-btn ${currentPath === '/attendance' ? 'active' : ''}" onclick="window.router.navigate('/attendance')">
            <span class="nav-icon">📅</span>
            <span>Attendance</span>
          </button>
        </li>
        <li>
          <button class="nav-item-btn ${currentPath === '/fees' ? 'active' : ''}" onclick="window.router.navigate('/fees')">
            <span class="nav-icon">💳</span>
            <span>Fee Management</span>
          </button>
        </li>
        <li>
          <button class="nav-item-btn ${currentPath === '/homework' ? 'active' : ''}" onclick="window.router.navigate('/homework')">
            <span class="nav-icon">📝</span>
            <span>Homework</span>
          </button>
        </li>
        <li>
          <button class="nav-item-btn ${currentPath === '/exams' ? 'active' : ''}" onclick="window.router.navigate('/exams')">
            <span class="nav-icon">🏆</span>
            <span>Exams & Results</span>
          </button>
        </li>
        <li>
          <button class="nav-item-btn ${currentPath === '/timetable' ? 'active' : ''}" onclick="window.router.navigate('/timetable')">
            <span class="nav-icon">⏰</span>
            <span>Timetable</span>
          </button>
        </li>
        <li>
          <button class="nav-item-btn ${currentPath === '/announcements' ? 'active' : ''}" onclick="window.router.navigate('/announcements')">
            <span class="nav-icon">📢</span>
            <span>Announcements</span>
          </button>
        </li>
        <li>
          <button class="nav-item-btn ${currentPath === '/reports' ? 'active' : ''}" onclick="window.router.navigate('/reports')">
            <span class="nav-icon">📈</span>
            <span>Analytics & Reports</span>
          </button>
        </li>
      `;
    }

    // Teacher Views
    if (isTeacher) {
      navItems += `
        <div class="nav-section-title">Academic Controls</div>
        <li>
          <button class="nav-item-btn ${currentPath === '/attendance' ? 'active' : ''}" onclick="window.router.navigate('/attendance')">
            <span class="nav-icon">📅</span>
            <span>Mark Attendance</span>
          </button>
        </li>
        <li>
          <button class="nav-item-btn ${currentPath === '/homework' ? 'active' : ''}" onclick="window.router.navigate('/homework')">
            <span class="nav-icon">📝</span>
            <span>Assign Homework</span>
          </button>
        </li>
        <li>
          <button class="nav-item-btn ${currentPath === '/exams' ? 'active' : ''}" onclick="window.router.navigate('/exams')">
            <span class="nav-icon">🏆</span>
            <span>Grade & Results</span>
          </button>
        </li>
        <li>
          <button class="nav-item-btn ${currentPath === '/timetable' ? 'active' : ''}" onclick="window.router.navigate('/timetable')">
            <span class="nav-icon">⏰</span>
            <span>My Schedule</span>
          </button>
        </li>
        <li>
          <button class="nav-item-btn ${currentPath === '/announcements' ? 'active' : ''}" onclick="window.router.navigate('/announcements')">
            <span class="nav-icon">📢</span>
            <span>Notices</span>
          </button>
        </li>
      `;
    }

    // Parent Views
    if (isParent) {
      navItems += `
        <div class="nav-section-title">Ward Monitoring</div>
        <li>
          <button class="nav-item-btn ${currentPath === '/attendance' ? 'active' : ''}" onclick="window.router.navigate('/attendance')">
            <span class="nav-icon">📅</span>
            <span>Child Attendance</span>
          </button>
        </li>
        <li>
          <button class="nav-item-btn ${currentPath === '/homework' ? 'active' : ''}" onclick="window.router.navigate('/homework')">
            <span class="nav-icon">📝</span>
            <span>Homework Due</span>
          </button>
        </li>
        <li>
          <button class="nav-item-btn ${currentPath === '/exams' ? 'active' : ''}" onclick="window.router.navigate('/exams')">
            <span class="nav-icon">🏆</span>
            <span>Report Cards</span>
          </button>
        </li>
        <li>
          <button class="nav-item-btn ${currentPath === '/fees' ? 'active' : ''}" onclick="window.router.navigate('/fees')">
            <span class="nav-icon">💳</span>
            <span>Fee Vouchers</span>
          </button>
        </li>
        <li>
          <button class="nav-item-btn ${currentPath === '/announcements' ? 'active' : ''}" onclick="window.router.navigate('/announcements')">
            <span class="nav-icon">📢</span>
            <span>School Circulars</span>
          </button>
        </li>
      `;
    }

    // Student Views
    if (isStudent) {
      navItems += `
        <div class="nav-section-title">Student Portal</div>
        <li>
          <button class="nav-item-btn ${currentPath === '/timetable' ? 'active' : ''}" onclick="window.router.navigate('/timetable')">
            <span class="nav-icon">⏰</span>
            <span>My Timetable</span>
          </button>
        </li>
        <li>
          <button class="nav-item-btn ${currentPath === '/homework' ? 'active' : ''}" onclick="window.router.navigate('/homework')">
            <span class="nav-icon">📝</span>
            <span>Assignments</span>
          </button>
        </li>
        <li>
          <button class="nav-item-btn ${currentPath === '/attendance' ? 'active' : ''}" onclick="window.router.navigate('/attendance')">
            <span class="nav-icon">📅</span>
            <span>My Attendance</span>
          </button>
        </li>
        <li>
          <button class="nav-item-btn ${currentPath === '/exams' ? 'active' : ''}" onclick="window.router.navigate('/exams')">
            <span class="nav-icon">🏆</span>
            <span>Exam Results</span>
          </button>
        </li>
        <li>
          <button class="nav-item-btn ${currentPath === '/announcements' ? 'active' : ''}" onclick="window.router.navigate('/announcements')">
            <span class="nav-icon">📢</span>
            <span>Campus News</span>
          </button>
        </li>
      `;
    }

    // Owner Exclusive Section: "School Configuration"
    if (isOwner) {
      navItems += `
        <div class="nav-section-title">Owner Administration</div>
        <li>
          <button class="nav-item-btn ${currentPath === '/settings' ? 'active' : ''}" onclick="window.router.navigate('/settings')">
            <span class="nav-icon">⚙️</span>
            <span>School Configuration</span>
          </button>
        </li>
      `;
    }

    return `
      <aside class="app-sidebar" id="app-sidebar">
        <div class="sidebar-brand">
          <img src="${cfg.logoUrl}" alt="${cfg.schoolName}" class="brand-crest" onerror="this.src='assets/logo.png'"/>
          <div class="brand-titles">
            <span class="brand-school-name">${cfg.schoolName}</span>
            <span class="brand-software-tag">EduBloom LMS</span>
          </div>
        </div>

        <ul class="sidebar-nav-list">
          ${navItems}
        </ul>

        <div class="sidebar-footer">
          <img src="${user.avatar}" alt="${user.name}" class="user-avatar-mini"/>
          <div class="user-info-mini">
            <div class="user-name-mini">${user.name}</div>
            <div class="user-role-mini">${user.roleTitle}</div>
          </div>
          <button class="logout-icon-btn" title="Sign Out" onclick="window.auth.logout()">
            🚪
          </button>
        </div>
      </aside>
    `;
  }

  // Top Bar with Global Search, Child Switcher (if Parent), and Status
  renderTopbar() {
    const user = window.auth.getUser();
    if (!user) return '';

    const cfg = window.db.getConfig();
    let childSwitcherHtml = '';

    if (user.role === 'parent' && user.childrenIds) {
      const children = user.childrenIds.map(id => window.db.getStudentById(id)).filter(Boolean);
      childSwitcherHtml = `
        <div style="display:flex; align-items:center; gap:6px; background:#f1f5f9; padding:4px 10px; border-radius:var(--radius-full);">
          <span style="font-size:0.75rem; font-weight:700; color:var(--text-muted);">Child:</span>
          <select style="border:none; background:transparent; font-size:0.8rem; font-weight:700; outline:none; cursor:pointer;" onchange="window.auth.switchParentChild(this.value)">
            ${children.map(c => `<option value="${c.id}" ${c.id === user.activeChildId ? 'selected' : ''}>${c.name} (Class ${c.class}-${c.section})</option>`).join('')}
          </select>
        </div>
      `;
    }

    return `
      <header class="app-topbar">
        <div class="topbar-left">
          <button class="mobile-menu-btn" onclick="document.getElementById('app-sidebar').classList.toggle('open')">☰</button>
          <button class="search-trigger-btn" onclick="window.openGlobalSearch()">
            <span>🔍</span>
            <span class="label">Quick Search (Ctrl + K)...</span>
            <span class="search-shortcut-badge">⌘K</span>
          </button>
        </div>

        <div class="topbar-right">
          ${childSwitcherHtml}
          <div class="academic-badge">
            <span>📅</span>
            <span>Session ${cfg.academicYear}</span>
          </div>
        </div>
      </header>
    `;
  }

  // Footer with Developer Credit
  renderFooter() {
    const cfg = window.db.getConfig();
    return `
      <footer class="app-footer">
        <div>
          © ${new Date().getFullYear()} <strong>${cfg.schoolName}</strong> • EduBloom LMS • <em>${cfg.tagline}</em>
        </div>
        <div class="footer-dev-credit">
          <span>Developed by <strong>Rimsha</strong></span>
          <span>•</span>
          <a href="mailto:rimsha201000@gmail.com" style="color:var(--accent-color);">rimsha201000@gmail.com</a>
        </div>
      </footer>
    `;
  }
}

// Global UI Components Helper
window.ui = new UIComponents();

// Toast helper
window.showToast = function(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span>${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
    <span>${message}</span>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
};

// Confirmation Dialog Modal Helper
window.showConfirmDialog = function({ title, message, confirmText = 'Confirm', isDanger = false, onConfirm }) {
  let existing = document.getElementById('bvs-confirm-modal');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.id = 'bvs-confirm-modal';
  modal.className = 'modal-overlay active';
  modal.innerHTML = `
    <div class="modal-dialog" style="max-width:440px;">
      <div class="modal-header">
        <h3 class="modal-title" style="color:${isDanger ? '#ef4444' : 'var(--primary-color)'}; font-size:1.15rem;">
          ${isDanger ? '⚠️ ' : '❓ '}${title}
        </h3>
        <button class="modal-close-btn" onclick="document.getElementById('bvs-confirm-modal').remove()">✕</button>
      </div>
      <div class="modal-body" style="font-size:0.92rem; color:#475569; line-height:1.5;">
        ${message}
      </div>
      <div class="modal-footer">
        <button class="btn btn-outline btn-sm" onclick="document.getElementById('bvs-confirm-modal').remove()">Cancel</button>
        <button id="bvs-confirm-action-btn" class="btn ${isDanger ? 'btn-danger' : 'btn-primary'} btn-sm">${confirmText}</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  document.getElementById('bvs-confirm-action-btn').addEventListener('click', () => {
    modal.remove();
    if (typeof onConfirm === 'function') onConfirm();
  });
};

// Helper for 1-Click Role Switch in Header
window.switchRoleAndNavigate = function(role) {
  window.auth.switchRole(role);
  window.router.navigate('/dashboard');
  window.showToast(`Switched profile to ${window.auth.getUser().roleTitle}`, 'success');
};
