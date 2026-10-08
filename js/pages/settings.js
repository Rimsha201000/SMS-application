/**
 * Beacon Valley School - EduBloom LMS
 * School Configuration & Multi-School SaaS Tenant Branding Studio
 * RESTRICTED: Accessible ONLY by Super Admin / School Owner!
 */

const SCHOOL_CLIENT_PRESETS = [
  {
    name: 'Beacon Valley School',
    tagline: 'Learn. Grow. Achieve.',
    primaryColor: '#0d1f3c',
    secondaryColor: '#c99a2c',
    accentColor: '#3b82f6',
    logoUrl: 'assets/logo.png',
    address: 'Beacon Valley Campus, Valley Road, Block 4, Education City',
    phone: '+92 300 1234567',
    email: 'info@beaconvalleyschool.edu',
    academicYear: '2025 - 2026',
    themeName: 'Royal Navy & Classic Gold'
  },
  {
    name: 'Horizon Grammar School',
    tagline: 'Inspiring Excellence, Igniting Potential.',
    primaryColor: '#064e3b',
    secondaryColor: '#d97706',
    accentColor: '#10b981',
    logoUrl: 'assets/logo.png',
    address: 'Horizon Boulevard, Sector G-11, Capital City',
    phone: '+92 321 9876543',
    email: 'admissions@horizongrammar.edu',
    academicYear: '2025 - 2026',
    themeName: 'Emerald Green & Imperial Amber'
  },
  {
    name: 'Apex International Academy',
    tagline: 'Leadership through Knowledge & Innovation.',
    primaryColor: '#4c1d95',
    secondaryColor: '#e11d48',
    accentColor: '#8b5cf6',
    logoUrl: 'assets/logo.png',
    address: 'Plot 88, University Town, Knowledge Park',
    phone: '+92 333 4455667',
    email: 'contact@apexacademy.edu',
    academicYear: '2025 - 2026',
    themeName: 'Imperial Purple & Rose Vibrant'
  },
  {
    name: 'Oxford Elite College',
    tagline: 'Tradition of Wisdom, Integrity & Merit.',
    primaryColor: '#831843',
    secondaryColor: '#eab308',
    accentColor: '#f43f5e',
    logoUrl: 'assets/logo.png',
    address: 'Queens Road, Heritage Enclave, Civil Lines',
    phone: '+92 312 8899001',
    email: 'registrar@oxfordelite.edu',
    academicYear: '2025 - 2026',
    themeName: 'Heritage Burgundy & Champagne'
  },
  {
    name: 'CyberTech STEM High',
    tagline: 'Pioneering Future Technologies & Robotics.',
    primaryColor: '#0f172a',
    secondaryColor: '#06b6d4',
    accentColor: '#3b82f6',
    logoUrl: 'assets/logo.png',
    address: 'Innovation Hub 4, Cyber Valley, Tech District',
    phone: '+92 345 1122334',
    email: 'support@cybertechstem.edu',
    academicYear: '2025 - 2026',
    themeName: 'Cyber Slate & Neon Cyan'
  }
];

class SettingsPage {
  render() {
    const user = window.auth.getUser();
    if (!window.auth.isOwner()) {
      return `
        <div class="ui-card" style="text-align:center; padding:3.5rem;">
          <div style="font-size:3.5rem; margin-bottom:1rem;">🛡️</div>
          <h2>Restricted Administrative Portal</h2>
          <p style="color:var(--text-muted); margin-top:0.5rem; max-width:480px; margin-left:auto; margin-right:auto;">
            The <strong>School Configuration</strong> module is exclusively reserved for the Super Admin / School Owner to govern institutional branding and SaaS multi-client parameters.
          </p>
          <div style="margin-top:1.5rem;">
            <button class="btn btn-primary btn-sm" onclick="window.switchRoleAndNavigate('owner')">
              👑 Switch to Owner Role to Access
            </button>
          </div>
        </div>
      `;
    }

    const cfg = window.db.getConfig();

    return `
      <div class="ui-card animate-stagger-1">
        <div class="ui-card-header">
          <div>
            <h2 class="ui-card-title">
              <span>⚙️</span>
              <span>School Configuration & Multi-Tenant Branding Studio</span>
            </h2>
            <p style="font-size:0.78rem; color:var(--text-muted); margin-top:2px;">
              Instantly customize and rebrand EduBloom LMS for any school client with dynamic color schemes, logos, and identities.
            </p>
          </div>

          <div class="ui-card-actions">
            <button class="btn btn-outline btn-sm" onclick="window.settingsPage.resetDefaults()">
              ↺ Reset to Beacon Valley Defaults
            </button>
          </div>
        </div>

        <!-- 1-Click Multi-School Client Presets for Easy Pitching & Selling -->
        <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:var(--radius-lg); padding:1.25rem; margin-bottom:1.5rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
            <strong style="font-size:0.88rem; color:var(--primary-color);">🏢 1-Click School Client Presets (Instant Rebranding for Selling):</strong>
            <span style="font-size:0.75rem; color:var(--text-muted);">Switch client themes instantly</span>
          </div>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(210px, 1fr)); gap:0.65rem;">
            ${SCHOOL_CLIENT_PRESETS.map((p, idx) => `
              <button 
                type="button"
                class="btn btn-outline btn-sm" 
                style="justify-content:flex-start; padding:0.6rem 0.8rem; border-radius:var(--radius-md); font-size:0.76rem; border-left:4px solid ${p.primaryColor}; text-align:left; display:flex; flex-direction:column; gap:2px; height:auto;"
                onclick="window.settingsPage.applyPreset(${idx})"
              >
                <div style="font-weight:800; color:#0f172a; width:100%; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${p.name}</div>
                <div style="font-size:0.68rem; color:#64748b;">${p.themeName}</div>
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Live Branding Preview Card -->
        <div id="cfg-preview-card" style="background:linear-gradient(135deg, var(--primary-color) 0%, var(--primary-light) 100%); color:#fff; border-radius:var(--radius-lg); padding:1.6rem; margin-bottom:1.75rem; display:flex; align-items:center; justify-content:space-between; box-shadow:var(--shadow-3d); border:1px solid rgba(255,255,255,0.15);">
          <div style="display:flex; align-items:center; gap:1.35rem;">
            <img id="cfg-preview-logo" src="${cfg.logoUrl}" alt="Preview Crest" style="width:72px; height:72px; border-radius:var(--radius-md); object-fit:cover; border:2px solid var(--secondary-color); background:#fff; padding:2px; box-shadow:0 6px 16px rgba(0,0,0,0.3);" onerror="this.src='assets/logo.png'"/>
            <div>
              <div style="font-size:0.74rem; text-transform:uppercase; letter-spacing:0.05em; color:var(--secondary-light); font-weight:800;">Live SaaS Branding Preview</div>
              <h2 id="cfg-preview-title" style="font-size:1.65rem; font-weight:800; color:#fff; margin:2px 0;">${cfg.schoolName}</h2>
              <div id="cfg-preview-sub" style="font-size:0.86rem; color:#cbd5e1;">${cfg.tagline} • Academic Year: ${cfg.academicYear}</div>
            </div>
          </div>

          <div style="display:flex; gap:0.6rem; align-items:center; background:rgba(0,0,0,0.2); padding:6px 12px; border-radius:var(--radius-full);">
            <div id="cfg-dot-prim" style="width:24px; height:24px; border-radius:50%; background:var(--primary-color); border:2px solid #fff;" title="Primary Color"></div>
            <div id="cfg-dot-sec" style="width:24px; height:24px; border-radius:50%; background:var(--secondary-color); border:2px solid #fff;" title="Secondary Color"></div>
            <div id="cfg-dot-acc" style="width:24px; height:24px; border-radius:50%; background:var(--accent-color); border:2px solid #fff;" title="Accent Color"></div>
          </div>
        </div>

        <!-- Configuration Form -->
        <form onsubmit="window.settingsPage.handleSave(event)">
          <div class="form-grid">
            <!-- School Identity -->
            <div class="form-group">
              <label class="form-label">School Name <span class="req">*</span></label>
              <input type="text" id="cfg-name" class="form-input" value="${cfg.schoolName}" oninput="document.getElementById('cfg-preview-title').innerText = this.value;" required />
            </div>

            <div class="form-group">
              <label class="form-label">School Tagline / Slogan <span class="req">*</span></label>
              <input type="text" id="cfg-tagline" class="form-input" value="${cfg.tagline}" oninput="document.getElementById('cfg-preview-sub').innerText = this.value + ' • Academic Year: ' + document.getElementById('cfg-year').value;" required />
            </div>

            <div class="form-group">
              <label class="form-label">Academic Year / Session <span class="req">*</span></label>
              <input type="text" id="cfg-year" class="form-input" value="${cfg.academicYear}" required />
            </div>

            <div class="form-group">
              <label class="form-label">School Official Logo URL / Path</label>
              <input type="text" id="cfg-logo" class="form-input" value="${cfg.logoUrl}" oninput="document.getElementById('cfg-preview-logo').src = this.value;" required />
            </div>

            <!-- Colors & Theme Tokens -->
            <div class="form-group">
              <label class="form-label">Primary Brand Color (Dominant Navy/Green/Slate)</label>
              <div style="display:flex; gap:8px; align-items:center;">
                <input type="color" id="cfg-color-prim" value="${cfg.primaryColor || '#0d1f3c'}" style="width:48px; height:40px; padding:2px; border:1px solid #cbd5e1; border-radius:8px; cursor:pointer;" onchange="document.getElementById('cfg-hex-prim').value = this.value; window.settingsPage.updateLivePreview();" />
                <input type="text" id="cfg-hex-prim" class="form-input" value="${cfg.primaryColor || '#0d1f3c'}" oninput="document.getElementById('cfg-color-prim').value = this.value; window.settingsPage.updateLivePreview();" />
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Secondary Color (Gold/Amber/Accent)</label>
              <div style="display:flex; gap:8px; align-items:center;">
                <input type="color" id="cfg-color-sec" value="${cfg.secondaryColor || '#c99a2c'}" style="width:48px; height:40px; padding:2px; border:1px solid #cbd5e1; border-radius:8px; cursor:pointer;" onchange="document.getElementById('cfg-hex-sec').value = this.value; window.settingsPage.updateLivePreview();" />
                <input type="text" id="cfg-hex-sec" class="form-input" value="${cfg.secondaryColor || '#c99a2c'}" oninput="document.getElementById('cfg-color-sec').value = this.value; window.settingsPage.updateLivePreview();" />
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Accent / Action Button Color</label>
              <div style="display:flex; gap:8px; align-items:center;">
                <input type="color" id="cfg-color-acc" value="${cfg.accentColor || '#3b82f6'}" style="width:48px; height:40px; padding:2px; border:1px solid #cbd5e1; border-radius:8px; cursor:pointer;" onchange="document.getElementById('cfg-hex-acc').value = this.value; window.settingsPage.updateLivePreview();" />
                <input type="text" id="cfg-hex-acc" class="form-input" value="${cfg.accentColor || '#3b82f6'}" oninput="document.getElementById('cfg-color-acc').value = this.value; window.settingsPage.updateLivePreview();" />
              </div>
            </div>

            <!-- Watermark Visibility Control -->
            <div class="form-group">
              <label class="form-label">Background Watermark Prominence (Opacity)</label>
              <div style="display:flex; gap:12px; align-items:center;">
                <input 
                  type="range" 
                  id="cfg-watermark-op" 
                  min="0.15" 
                  max="0.80" 
                  step="0.05" 
                  value="${cfg.watermarkOpacity !== undefined ? cfg.watermarkOpacity : '0.38'}" 
                  style="flex:1; cursor:pointer;" 
                  oninput="document.getElementById('cfg-op-val').innerText = Math.round(this.value * 100) + '%'; document.documentElement.style.setProperty('--watermark-opacity', this.value); const w=document.querySelector('.school-watermark-img'); if(w) w.style.opacity = this.value;" 
                />
                <span id="cfg-op-val" style="font-weight:800; font-size:0.9rem; min-width:48px; text-align:right; color:var(--primary-color);">${Math.round((cfg.watermarkOpacity !== undefined ? cfg.watermarkOpacity : 0.38) * 100)}%</span>
              </div>
              <div style="font-size:0.73rem; color:var(--text-muted); margin-top:2px;">
                Adjusts how prominently the school crest shows through transparent cards (Default: 38%).
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Official Contact Phone</label>
              <input type="text" id="cfg-phone" class="form-input" value="${cfg.phone}" required />
            </div>

            <div class="form-group">
              <label class="form-label">Official Institutional Email</label>
              <input type="email" id="cfg-email" class="form-input" value="${cfg.email}" required />
            </div>

            <div class="form-group col-full">
              <label class="form-label">Campus Physical Address</label>
              <input type="text" id="cfg-address" class="form-input" value="${cfg.address}" required />
            </div>

            <!-- Gemini AI Key Configuration -->
            <div class="form-group col-full" style="background:#f1f5f9; padding:1.25rem; border-radius:var(--radius-md); border:1px solid #cbd5e1;">
              <div style="display:flex; align-items:center; gap:8px; margin-bottom:6px;">
                <span style="font-size:1.2rem;">🤖</span>
                <label class="form-label" style="margin:0; font-weight:700;">Google Gemini AI Integration Key</label>
              </div>
              <input type="password" id="cfg-ai-key" class="form-input" value="${cfg.geminiApiKey || 'AQ.Ab8RN6J88p_sEON1Lq3Hs3g8n6ISQPUwEgnwyJJXPsSRBHO1Rg'}" />
              <div style="font-size:0.75rem; color:#64748b; margin-top:4px;">
                Controls the floating Sparky AI assistant with role-restricted real-time queries.
              </div>
            </div>
          </div>

          <div style="display:flex; justify-content:flex-end; gap:0.75rem; margin-top:1.5rem; border-top:1px solid var(--border-subtle); padding-top:1.25rem;">
            <button type="submit" class="btn btn-primary btn-lg">
              <span>💾 Save & Apply Branding Changes</span>
            </button>
          </div>
        </form>
      </div>
    `;
  }

  applyPreset(index) {
    const preset = SCHOOL_CLIENT_PRESETS[index];
    if (!preset) return;

    document.getElementById('cfg-name').value = preset.name;
    document.getElementById('cfg-tagline').value = preset.tagline;
    document.getElementById('cfg-year').value = preset.academicYear;
    document.getElementById('cfg-logo').value = preset.logoUrl;
    document.getElementById('cfg-color-prim').value = preset.primaryColor;
    document.getElementById('cfg-hex-prim').value = preset.primaryColor;
    document.getElementById('cfg-color-sec').value = preset.secondaryColor;
    document.getElementById('cfg-hex-sec').value = preset.secondaryColor;
    document.getElementById('cfg-color-acc').value = preset.accentColor;
    document.getElementById('cfg-hex-acc').value = preset.accentColor;
    document.getElementById('cfg-phone').value = preset.phone;
    document.getElementById('cfg-email').value = preset.email;
    document.getElementById('cfg-address').value = preset.address;
    const watermarkOp = preset.watermarkOpacity !== undefined ? preset.watermarkOpacity : 0.38;
    const opInput = document.getElementById('cfg-watermark-op');
    if (opInput) {
      opInput.value = watermarkOp;
      document.getElementById('cfg-op-val').innerText = Math.round(watermarkOp * 100) + '%';
    }

    this.updateLivePreview();

    // Auto-save preset so changes take effect immediately
    const updated = {
      schoolName: preset.name,
      tagline: preset.tagline,
      academicYear: preset.academicYear,
      logoUrl: preset.logoUrl,
      primaryColor: preset.primaryColor,
      secondaryColor: preset.secondaryColor,
      accentColor: preset.accentColor,
      watermarkOpacity: watermarkOp,
      phone: preset.phone,
      email: preset.email,
      address: preset.address
    };

    window.db.updateConfig(updated);
    window.showToast(`Applied preset for "${preset.name}"! Colors and identity updated across the entire app.`, 'success');
    window.router.renderCurrentPage();
  }

  updateLivePreview() {
    const prim = document.getElementById('cfg-color-prim').value;
    const sec = document.getElementById('cfg-color-sec').value;
    const acc = document.getElementById('cfg-color-acc').value;

    const card = document.getElementById('cfg-preview-card');
    if (card) {
      card.style.background = `linear-gradient(135deg, ${prim} 0%, #16325c 100%)`;
    }
    const dotPrim = document.getElementById('cfg-dot-prim');
    if (dotPrim) dotPrim.style.background = prim;
    const dotSec = document.getElementById('cfg-dot-sec');
    if (dotSec) dotSec.style.background = sec;
    const dotAcc = document.getElementById('cfg-dot-acc');
    if (dotAcc) dotAcc.style.background = acc;

    // Apply directly to root
    const root = document.documentElement;
    root.style.setProperty('--primary-color', prim);
    root.style.setProperty('--secondary-color', sec);
    root.style.setProperty('--accent-color', acc);
  }

  handleSave(e) {
    e.preventDefault();
    const prim = document.getElementById('cfg-color-prim').value;
    const sec = document.getElementById('cfg-color-sec').value;
    const acc = document.getElementById('cfg-color-acc').value;

    const updated = {
      schoolName: document.getElementById('cfg-name').value,
      tagline: document.getElementById('cfg-tagline').value,
      academicYear: document.getElementById('cfg-year').value,
      logoUrl: document.getElementById('cfg-logo').value,
      primaryColor: prim,
      secondaryColor: sec,
      accentColor: acc,
      watermarkOpacity: parseFloat(document.getElementById('cfg-watermark-op').value || '0.38'),
      phone: document.getElementById('cfg-phone').value,
      email: document.getElementById('cfg-email').value,
      address: document.getElementById('cfg-address').value,
      geminiApiKey: document.getElementById('cfg-ai-key').value
    };

    window.db.updateConfig(updated);
    window.showToast('School configuration updated dynamically across all modules!', 'success');
    window.router.renderCurrentPage();
  }

  resetDefaults() {
    window.showConfirmDialog({
      title: 'Reset Brand Configuration',
      message: 'Restore default Beacon Valley School brand tokens and configuration?',
      confirmText: 'Reset',
      isDanger: false,
      onConfirm: () => {
        window.db.resetToDefaults();
        window.showToast('Restored default school configuration', 'info');
        window.router.renderCurrentPage();
      }
    });
  }
}

window.settingsPage = new SettingsPage();
