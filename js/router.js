/**
 * Beacon Valley School - EduBloom LMS
 * Client-Side Router & Shell Orchestrator
 */

class AppRouter {
  constructor() {
    this.currentRoute = '/dashboard';
    this.routes = {
      '/login': () => window.loginPage.render(),
      '/dashboard': () => window.dashboardPage.render(),
      '/students': () => window.studentsPage.render(),
      '/recycle': () => window.recyclePage.render(),
      '/teachers': () => window.teachersPage.render(),
      '/classes': () => window.classesPage.render(),
      '/attendance': () => window.attendancePage.render(),
      '/fees': () => window.feesPage.render(),
      '/homework': () => window.homeworkPage.render(),
      '/exams': () => window.examsPage.render(),
      '/announcements': () => window.announcementsPage.render(),
      '/timetable': () => window.timetablePage.render(),
      '/reports': () => window.reportsPage.render(),
      '/settings': () => window.settingsPage.render()
    };

    window.addEventListener('hashchange', () => this.handleHashChange());
  }

  init() {
    // Apply school theme styling
    window.db.applyBrandTheme();

    if (!window.location.hash) {
      window.location.hash = '#/dashboard';
    } else {
      this.handleHashChange();
    }
  }

  navigate(path) {
    window.location.hash = '#' + path;
  }

  handleHashChange() {
    const raw = window.location.hash.replace('#', '') || '/dashboard';
    const path = raw.split('?')[0];

    // Auth Guard
    if (!window.auth.isLoggedIn() && path !== '/login') {
      window.location.hash = '#/login';
      return;
    }

    this.currentRoute = path;
    this.renderCurrentPage();
  }

  renderCurrentPage() {
    const root = document.getElementById('app-root');
    if (!root) return;

    // Login Route: standalone fullscreen
    if (this.currentRoute === '/login') {
      root.innerHTML = window.loginPage.render();
      return;
    }

    const handler = this.routes[this.currentRoute] || this.routes['/dashboard'];
    const pageHtml = handler();

    // Full App Shell with Watermark & Responsive Frame
    root.innerHTML = `
      <div class="school-watermark-bg">
        <!-- Prominent Full-Screen School Logo Watermark & Floating Elements -->
        ${window.ui.renderWatermarkAndAmbient()}

        <!-- Top 1-Click Role Switcher -->
        ${window.ui.renderRoleBar()}

        <div class="app-container">
          <!-- Sidebar Navigation -->
          ${window.ui.renderSidebar(this.currentRoute)}

          <!-- Main Layout -->
          <main class="app-main">
            <!-- Topbar with Search & Session -->
            ${window.ui.renderTopbar()}

            <!-- Main Page Content -->
            <div class="page-body">
              ${pageHtml}
            </div>

            <!-- Footer & Developer Credit -->
            ${window.ui.renderFooter()}
          </main>
        </div>

        <!-- Floating Sparky AI Assistant -->
        ${window.aiAssistant.renderMarkup()}
      </div>
    `;

    // Re-bind listeners & scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.db.applyBrandTheme();
    if (window.aiAssistant.isOpen) {
      const win = document.getElementById('ai-chat-window');
      if (win) win.classList.add('open');
      window.aiAssistant.renderMessages();
    }
  }
}

window.router = new AppRouter();
