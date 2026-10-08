/**
 * Beacon Valley School - EduBloom LMS
 * Faculty & Teacher Management
 */

class TeachersPage {
  constructor() {
    this.searchQuery = '';
  }

  render() {
    const teachers = window.db.getTeachers();
    const canManage = window.auth.isAdminOrOwner();

    const filtered = teachers.filter(t => {
      return !this.searchQuery ||
        t.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        t.email.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        t.subjects.some(s => s.toLowerCase().includes(this.searchQuery.toLowerCase()));
    });

    return `
      <div class="ui-card">
        <div class="ui-card-header">
          <div>
            <h2 class="ui-card-title">
              <span>👩‍🏫</span>
              <span>Faculty Directory</span>
              <span class="badge badge-info" style="margin-left:6px;">${teachers.length} Faculty Members</span>
            </h2>
            <p style="font-size:0.78rem; color:var(--text-muted); margin-top:2px;">
              Manage faculty credentials, subject assignments, and pedagogical departments
            </p>
          </div>

          <div class="ui-card-actions">
            ${canManage ? `
              <button class="btn btn-primary btn-sm" onclick="window.teachersPage.showAddModal()">
                <span>➕</span> Add New Faculty
              </button>
            ` : ''}
          </div>
        </div>

        <!-- Search Bar -->
        <div style="margin-bottom:1.25rem;">
          <input 
            type="text" 
            class="form-input" 
            placeholder="Search faculty by name, subject, or email..."
            value="${this.searchQuery}"
            oninput="window.teachersPage.searchQuery = this.value; window.router.renderCurrentPage();"
          />
        </div>

        <!-- Faculty Cards Grid -->
        <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(320px, 1fr)); gap:1.25rem;">
          ${filtered.map(t => `
            <div style="background:#ffffff; border:1px solid var(--border-subtle); border-radius:var(--radius-lg); padding:1.25rem; box-shadow:var(--shadow-sm); display:flex; flex-direction:column; gap:0.85rem; position:relative;">
              <div style="display:flex; gap:1rem; align-items:center;">
                <img src="${t.photo}" alt="${t.name}" style="width:58px; height:58px; border-radius:var(--radius-md); object-fit:cover; border:2px solid var(--secondary-color);" onerror="this.src='https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150'"/>
                <div>
                  <h4 style="font-size:1.05rem; font-weight:700;">${t.name}</h4>
                  <div style="font-size:0.75rem; color:var(--text-muted);">${t.qualification}</div>
                  <span class="badge ${t.status === 'Active' ? 'badge-success' : 'badge-warning'}" style="margin-top:3px;">${t.status}</span>
                </div>
              </div>

              <div style="font-size:0.82rem; color:#475569; display:flex; flex-direction:column; gap:4px; background:#f8fafc; padding:0.75rem; border-radius:var(--radius-md);">
                <div>📧 <a href="mailto:${t.email}">${t.email}</a></div>
                <div>📞 <span>${t.phone}</span></div>
                <div>📚 <strong>Subjects:</strong> ${t.subjects.join(', ')}</div>
                <div>🏫 <strong>Classes:</strong> ${t.assignedClasses.join(', ')}</div>
              </div>

              ${canManage ? `
                <div style="display:flex; justify-content:flex-end; gap:0.5rem; margin-top:auto;">
                  <button class="btn btn-outline btn-sm" onclick="window.teachersPage.showEditModal('${t.id}')">✏️ Edit</button>
                  <button class="btn btn-danger btn-sm" onclick="window.teachersPage.confirmDelete('${t.id}', '${t.name}')">🗑️</button>
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  showAddModal() {
    this.openModal('Add New Faculty Member');
  }

  showEditModal(id) {
    const t = window.db.getTeachers().find(x => x.id === id);
    if (!t) return;
    this.openModal('Edit Faculty Member', t);
  }

  openModal(title, teacher = null) {
    let existing = document.getElementById('teacher-form-modal');
    if (existing) existing.remove();

    const isEdit = !!teacher;
    const modal = document.createElement('div');
    modal.id = 'teacher-form-modal';
    modal.className = 'modal-overlay active';
    modal.innerHTML = `
      <div class="modal-dialog">
        <div class="modal-header">
          <h3 class="modal-title">${title}</h3>
          <button class="modal-close-btn" onclick="document.getElementById('teacher-form-modal').remove()">✕</button>
        </div>
        <form onsubmit="window.teachersPage.handleFormSubmit(event, '${isEdit ? teacher.id : ''}')">
          <div class="modal-body">
            <div class="form-grid">
              <div class="form-group">
                <label class="form-label">Full Name <span class="req">*</span></label>
                <input type="text" id="tch-name" class="form-input" value="${teacher ? teacher.name : ''}" required />
              </div>
              <div class="form-group">
                <label class="form-label">Email Address <span class="req">*</span></label>
                <input type="email" id="tch-email" class="form-input" value="${teacher ? teacher.email : ''}" required />
              </div>

              <div class="form-group">
                <label class="form-label">Phone Number <span class="req">*</span></label>
                <input type="text" id="tch-phone" class="form-input" value="${teacher ? teacher.phone : '+92 300 1234567'}" required />
              </div>
              <div class="form-group">
                <label class="form-label">Academic Qualification</label>
                <input type="text" id="tch-qual" class="form-input" value="${teacher ? teacher.qualification : 'M.Sc Education'}" />
              </div>

              <div class="form-group col-full">
                <label class="form-label">Assigned Subjects (comma-separated)</label>
                <input type="text" id="tch-subjects" class="form-input" value="${teacher ? teacher.subjects.join(', ') : 'Mathematics, Science'}" />
              </div>

              <div class="form-group col-full">
                <label class="form-label">Assigned Classes (e.g. Class 8-A, Class 9-B)</label>
                <input type="text" id="tch-classes" class="form-input" value="${teacher ? teacher.assignedClasses.join(', ') : 'Class 8-A, Class 7-A'}" />
              </div>

              <div class="form-group">
                <label class="form-label">Status</label>
                <select id="tch-status" class="form-select">
                  <option value="Active" ${teacher && teacher.status === 'Active' ? 'selected' : ''}>Active</option>
                  <option value="On Leave" ${teacher && teacher.status === 'On Leave' ? 'selected' : ''}>On Leave</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">Photo URL</label>
                <input type="text" id="tch-photo" class="form-input" value="${teacher ? teacher.photo : 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150'}" />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline btn-sm" onclick="document.getElementById('teacher-form-modal').remove()">Cancel</button>
            <button type="submit" class="btn btn-primary btn-sm">${isEdit ? 'Update Faculty' : 'Save Faculty'}</button>
          </div>
        </form>
      </div>
    `;
    document.body.appendChild(modal);
  }

  handleFormSubmit(e, editId) {
    e.preventDefault();
    const data = {
      name: document.getElementById('tch-name').value,
      email: document.getElementById('tch-email').value,
      phone: document.getElementById('tch-phone').value,
      qualification: document.getElementById('tch-qual').value,
      subjects: document.getElementById('tch-subjects').value.split(',').map(s => s.trim()).filter(Boolean),
      assignedClasses: document.getElementById('tch-classes').value.split(',').map(c => c.trim()).filter(Boolean),
      status: document.getElementById('tch-status').value,
      photo: document.getElementById('tch-photo').value
    };

    if (editId) data.id = editId;

    window.db.saveTeacher(data);
    document.getElementById('teacher-form-modal').remove();
    window.showToast(editId ? 'Faculty record updated!' : 'New faculty member added!', 'success');
    window.router.renderCurrentPage();
  }

  confirmDelete(id, name) {
    window.showConfirmDialog({
      title: 'Remove Faculty Member',
      message: `Are you sure you want to remove <strong>${name}</strong> from the faculty directory?`,
      confirmText: 'Remove',
      isDanger: true,
      onConfirm: () => {
        window.db.deleteTeacher(id);
        window.showToast(`Removed faculty member ${name}`, 'warning');
        window.router.renderCurrentPage();
      }
    });
  }
}

window.teachersPage = new TeachersPage();
