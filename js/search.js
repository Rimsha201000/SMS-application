/**
 * Beacon Valley School - EduBloom LMS
 * Global Search Modal (Ctrl + K / ⌘K)
 */

class GlobalSearchModal {
  constructor() {
    this.isOpen = false;
    this.searchTerm = '';
    this.initListeners();
  }

  initListeners() {
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        this.toggle();
      }
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });
  }

  toggle() {
    if (this.isOpen) this.close();
    else this.open();
  }

  open() {
    this.isOpen = true;
    let modal = document.getElementById('global-search-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'global-search-modal';
      modal.className = 'modal-overlay';
      document.body.appendChild(modal);
    }
    modal.classList.add('active');
    this.render();
    setTimeout(() => {
      const inp = document.getElementById('global-search-input');
      if (inp) inp.focus();
    }, 50);
  }

  close() {
    this.isOpen = false;
    const modal = document.getElementById('global-search-modal');
    if (modal) modal.classList.remove('active');
  }

  handleSearch(term) {
    this.searchTerm = term.toLowerCase().trim();
    this.renderResults();
  }

  render() {
    const modal = document.getElementById('global-search-modal');
    if (!modal) return;

    modal.innerHTML = `
      <div class="modal-dialog" style="max-width:640px; margin-top:5vh;">
        <div style="padding:1rem 1.25rem; border-bottom:1px solid #e2e8f0; display:flex; align-items:center; gap:0.75rem;">
          <span style="font-size:1.25rem;">🔍</span>
          <input 
            type="text" 
            id="global-search-input" 
            class="form-input" 
            style="border:none; box-shadow:none; font-size:1.05rem; padding:0.25rem;" 
            placeholder="Search students, faculty, vouchers, homework..." 
            oninput="window.globalSearch.handleSearch(this.value)"
          />
          <button class="modal-close-btn" onclick="window.globalSearch.close()">✕</button>
        </div>

        <div id="global-search-results" style="max-height:420px; overflow-y:auto; padding:1rem;">
          <!-- Results populated -->
        </div>

        <div style="background:#f8fafc; padding:0.6rem 1.25rem; border-top:1px solid #e2e8f0; font-size:0.72rem; color:#64748b; display:flex; justify-content:space-between;">
          <span>Navigation: <kbd>↑</kbd> <kbd>↓</kbd> to cycle • <kbd>Esc</kbd> to close</span>
          <span>Beacon Valley Global Index</span>
        </div>
      </div>
    `;

    this.renderResults();
  }

  renderResults() {
    const container = document.getElementById('global-search-results');
    if (!container) return;

    if (!this.searchTerm) {
      container.innerHTML = `
        <div style="text-align:center; padding:2rem 1rem; color:#94a3b8; font-size:0.86rem;">
          Type to search across the Beacon Valley School database...
          <div style="display:flex; justify-content:center; gap:0.5rem; margin-top:1rem;">
            <button class="btn btn-outline btn-sm" onclick="window.globalSearch.handleSearch('Rimsha'); document.getElementById('global-search-input').value='Rimsha';">Rimsha</button>
            <button class="btn btn-outline btn-sm" onclick="window.globalSearch.handleSearch('Class 8'); document.getElementById('global-search-input').value='Class 8';">Class 8</button>
            <button class="btn btn-outline btn-sm" onclick="window.globalSearch.handleSearch('Mathematics'); document.getElementById('global-search-input').value='Mathematics';">Mathematics</button>
          </div>
        </div>
      `;
      return;
    }

    const students = window.db.getStudents().filter(s => s.name.toLowerCase().includes(this.searchTerm) || s.rollNo.toLowerCase().includes(this.searchTerm));
    const teachers = window.db.getTeachers().filter(t => t.name.toLowerCase().includes(this.searchTerm) || t.subjects.some(sub => sub.toLowerCase().includes(this.searchTerm)));
    const homework = window.db.getHomework().filter(h => h.title.toLowerCase().includes(this.searchTerm) || h.subject.toLowerCase().includes(this.searchTerm));

    let html = '';

    if (students.length > 0) {
      html += `<div style="font-size:0.72rem; font-weight:700; color:#64748b; text-transform:uppercase; margin-bottom:6px;">🎓 Students (${students.length})</div>`;
      students.forEach(s => {
        html += `
          <div style="padding:8px 12px; border-radius:8px; display:flex; justify-content:space-between; align-items:center; cursor:pointer; margin-bottom:4px; background:#f8fafc;" onclick="window.globalSearch.close(); window.studentsPage.viewProfile('${s.id}')">
            <div>
              <strong>${s.name}</strong> <span style="font-size:0.75rem; color:#64748b;">(${s.rollNo})</span>
              <div style="font-size:0.74rem; color:#64748b;">Class ${s.class}-${s.section} • Parent: ${s.parentName}</div>
            </div>
            <span class="badge ${s.attendancePercent >= 75 ? 'badge-success' : 'badge-danger'}">${s.attendancePercent}%</span>
          </div>
        `;
      });
    }

    if (teachers.length > 0) {
      html += `<div style="font-size:0.72rem; font-weight:700; color:#64748b; text-transform:uppercase; margin:12px 0 6px 0;">👩‍🏫 Faculty (${teachers.length})</div>`;
      teachers.forEach(t => {
        html += `
          <div style="padding:8px 12px; border-radius:8px; display:flex; justify-content:space-between; align-items:center; cursor:pointer; margin-bottom:4px; background:#f8fafc;" onclick="window.globalSearch.close(); window.router.navigate('/teachers')">
            <div>
              <strong>${t.name}</strong>
              <div style="font-size:0.74rem; color:#64748b;">${t.subjects.join(', ')}</div>
            </div>
            <span class="badge badge-info">${t.status}</span>
          </div>
        `;
      });
    }

    if (homework.length > 0) {
      html += `<div style="font-size:0.72rem; font-weight:700; color:#64748b; text-transform:uppercase; margin:12px 0 6px 0;">📝 Homework (${homework.length})</div>`;
      homework.forEach(h => {
        html += `
          <div style="padding:8px 12px; border-radius:8px; display:flex; justify-content:space-between; align-items:center; cursor:pointer; margin-bottom:4px; background:#f8fafc;" onclick="window.globalSearch.close(); window.router.navigate('/homework')">
            <div>
              <strong>${h.title}</strong>
              <div style="font-size:0.74rem; color:#64748b;">Class ${h.class}-${h.section} • Due: ${h.dueDate}</div>
            </div>
            <span class="badge badge-gold">${h.subject}</span>
          </div>
        `;
      });
    }

    if (!html) {
      html = `<div style="text-align:center; padding:2rem; color:#94a3b8;">No records found matching "${this.searchTerm}".</div>`;
    }

    container.innerHTML = html;
  }
}

window.globalSearch = new GlobalSearchModal();
window.openGlobalSearch = () => window.globalSearch.open();
