/**
 * Beacon Valley School - EduBloom LMS
 * Authentication Login Page
 */

class LoginPage {
  render() {
    const cfg = window.db.getConfig();

    return `
      <div class="login-view-wrapper">
        <!-- Background School Watermark -->
        <div class="school-watermark-overlay" style="opacity:0.8;">
          <img src="${cfg.logoUrl}" alt="${cfg.schoolName} Watermark" class="school-watermark-img" onerror="this.src='assets/logo.png'"/>
        </div>

        <div class="login-glass-card">
          <div class="login-header">
            <img src="${cfg.logoUrl}" alt="${cfg.schoolName} Logo" class="login-logo" onerror="this.src='assets/logo.png'"/>
            <h1 class="login-school-name">${cfg.schoolName}</h1>
            <div class="login-tagline">${cfg.tagline}</div>
          </div>

          <!-- Quick 1-Click Demo Login Selector -->
          <div class="login-quick-roles">
            <div class="login-quick-roles-title">⚡ Instant Demo Sign-In (Click any role to login)</div>
            <div class="login-quick-btns">
              <button class="quick-role-badge-btn" onclick="window.loginPage.fillAndLogin('owner')">👑 School Owner</button>
              <button class="quick-role-badge-btn" onclick="window.loginPage.fillAndLogin('admin')">🎓 School Admin</button>
              <button class="quick-role-badge-btn" onclick="window.loginPage.fillAndLogin('teacher')">👩‍🏫 Faculty Teacher</button>
              <button class="quick-role-badge-btn" onclick="window.loginPage.fillAndLogin('parent')">👨‍👩‍👧 Parent / Guardian</button>
              <button class="quick-role-badge-btn" onclick="window.loginPage.fillAndLogin('student')">🎒 Student Scholar</button>
            </div>
          </div>

          <!-- Login Form -->
          <form id="bvs-login-form" onsubmit="window.loginPage.handleSubmit(event)">
            <div class="form-group">
              <label class="form-label" for="login-username">Username or Institutional Email</label>
              <input type="text" id="login-username" class="form-input" placeholder="e.g. owner@beaconvalley.edu" value="owner@beaconvalley.edu" required />
            </div>

            <div class="form-group">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <label class="form-label" for="login-password">Security Password</label>
                <button type="button" style="background:none; border:none; font-size:0.75rem; color:var(--accent-color); cursor:pointer;" onclick="window.loginPage.togglePasswordVisibility()">
                  👁️ Toggle Show
                </button>
              </div>
              <input type="password" id="login-password" class="form-input" placeholder="••••••••••••" value="password123" required />
            </div>

            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem; font-size:0.82rem;">
              <label style="display:flex; align-items:center; gap:6px; cursor:pointer;">
                <input type="checkbox" id="login-remember" checked />
                <span>Remember this terminal</span>
              </label>
              <a href="javascript:void(0)" onclick="window.loginPage.showForgotPassword()" style="color:var(--accent-color); font-weight:600;">Forgot Password?</a>
            </div>

            <button type="submit" id="login-submit-btn" class="btn btn-primary btn-lg" style="width:100%; font-size:1.05rem;">
              <span>Sign In to EduBloom</span>
              <span>➔</span>
            </button>
          </form>

          <div style="text-align:center; margin-top:1.5rem; font-size:0.75rem; color:var(--text-muted);">
            Beacon Valley School Secure Cloud Infrastructure<br/>
            Need technical enrollment assistance? Contact <a href="mailto:info@beaconvalleyschool.edu">IT Support</a>
          </div>
        </div>
      </div>
    `;
  }

  togglePasswordVisibility() {
    const input = document.getElementById('login-password');
    if (input) {
      input.type = input.type === 'password' ? 'text' : 'password';
    }
  }

  fillAndLogin(roleKey) {
    const roleMap = {
      owner: 'owner@beaconvalley.edu',
      admin: 'admin@beaconvalley.edu',
      teacher: 'teacher@beaconvalley.edu',
      parent: 'parent@beaconvalley.edu',
      student: 'student@beaconvalley.edu'
    };
    const emailField = document.getElementById('login-username');
    const pwdField = document.getElementById('login-password');
    if (emailField && pwdField) {
      emailField.value = roleMap[roleKey] || 'owner@beaconvalley.edu';
      pwdField.value = 'password123';
      const submitBtn = document.getElementById('login-submit-btn');
      if (submitBtn) {
        submitBtn.innerHTML = '<span>Authenticating...</span>';
      }
      setTimeout(() => {
        window.auth.switchRole(roleKey);
        window.showToast(`Welcome back, ${window.auth.getUser().name}!`, 'success');
        window.router.navigate('/dashboard');
      }, 350);
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const email = document.getElementById('login-username').value;
    const pwd = document.getElementById('login-password').value;
    const remember = document.getElementById('login-remember').checked;
    const submitBtn = document.getElementById('login-submit-btn');

    if (submitBtn) {
      submitBtn.innerHTML = '<span>Verifying credentials...</span>';
      submitBtn.disabled = true;
    }

    setTimeout(() => {
      const res = window.auth.login(email, pwd, remember);
      if (res.success) {
        window.showToast(`Welcome to Beacon Valley School, ${res.user.name}!`, 'success');
        window.router.navigate('/dashboard');
      } else {
        if (submitBtn) {
          submitBtn.innerHTML = '<span>Sign In to EduBloom</span><span>➔</span>';
          submitBtn.disabled = false;
        }
        window.showToast(res.message, 'error');
      }
    }, 450);
  }

  showForgotPassword() {
    window.showConfirmDialog({
      title: 'Institutional Password Recovery',
      message: 'Password reset links are routed through the Beacon Valley School Administrative Registrar. For immediate demo verification, use default password <strong>password123</strong> or click any of the instant demo buttons above.',
      confirmText: 'Understood',
      onConfirm: () => {}
    });
  }
}

window.loginPage = new LoginPage();
