/**
 * Beacon Valley School - EduBloom LMS
 * Homework & Assignment Management Module
 */

class HomeworkPage {
  constructor() {
    this.filterClass = 'all';
  }

  render() {
    const user = window.auth.getUser();
    const role = user ? user.role : 'owner';
    const isTeacher = role === 'teacher';
    const isAdmin = role === 'admin' || role === 'owner';
    const canCreate = isTeacher || isAdmin;

    let homework = window.db.getHomework();
    if (role === 'student') {
      homework = homework.filter(h => h.class === user.class);
    } else if (role === 'parent') {
      const activeChildId = user.activeChildId || user.childrenIds[0];
      const child = window.db.getStudentById(activeChildId);
      if (child) homework = homework.filter(h => h.class === child.class);
    }

    if (this.filterClass !== 'all') {
      homework = homework.filter(h => h.class === this.filterClass);
    }

    return `
      <div class="ui-card">
        <div class="ui-card-header">
          <div>
            <h2 class="ui-card-title">
              <span>📝</span>
              <span>Homework & Curriculum Tasks</span>
            </h2>
            <p style="font-size:0.78rem; color:var(--text-muted); margin-top:2px;">
              Publish academic assignments, manage project deadlines, and review student deliverables
            </p>
          </div>

          <div class="ui-card-actions">
            ${canCreate ? `
              <button class="btn btn-primary btn-sm" onclick="window.homeworkPage.showAddModal()">
                <span>➕</span> Create Assignment
              </button>
            ` : ''}
          </div>
        </div>

        <!-- Filter Bar -->
        <div style="display:flex; gap:0.75rem; margin-bottom:1.5rem;">
          <select class="form-select" style="width:auto;" onchange="window.homeworkPage.filterClass = this.value; window.router.renderCurrentPage();">
            <option value="all">All Cohorts</option>
            <option value="6" ${this.filterClass === '6' ? 'selected' : ''}>Class 6</option>
            <option value="7" ${this.filterClass === '7' ? 'selected' : ''}>Class 7</option>
            <option value="8" ${this.filterClass === '8' ? 'selected' : ''}>Class 8</option>
            <option value="9" ${this.filterClass === '9' ? 'selected' : ''}>Class 9</option>
            <option value="10" ${this.filterClass === '10' ? 'selected' : ''}>Class 10</option>
          </select>
        </div>

        <!-- Homework Grid -->
        <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(340px, 1fr)); gap:1.25rem;">
          ${homework.length === 0 ? `
            <div style="grid-column:1/-1; text-align:center; padding:3rem; color:#94a3b8;">
              No homework tasks assigned for this cohort.
            </div>
          ` : homework.map(h => `
            <div style="background:#fff; border:1px solid var(--border-subtle); border-radius:var(--radius-lg); padding:1.35rem; box-shadow:var(--shadow-sm); display:flex; flex-direction:column; gap:0.75rem; position:relative;">
              <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                <div>
                  <span class="badge badge-gold" style="font-size:0.7rem;">${h.subject}</span>
                  <span class="badge" style="background:#f1f5f9; color:#475569; font-size:0.7rem; margin-left:4px;">Class ${h.class}-${h.section}</span>
                </div>
                <span class="badge ${h.status === 'Due Soon' ? 'badge-danger' : 'badge-info'}">${h.status}</span>
              </div>

              <h4 style="font-size:1.05rem; font-weight:700; color:var(--text-main);">${h.title}</h4>

              <p style="font-size:0.83rem; color:#475569; line-height:1.5;">${h.description}</p>

              <div style="font-size:0.78rem; color:#64748b; margin-top:auto; padding-top:0.6rem; border-top:1px solid #f1f5f9; display:flex; justify-content:space-between; align-items:center;">
                <span>📅 Due: <strong>${h.dueDate}</strong></span>
                <span>👨‍🏫 ${h.teacher}</span>
              </div>

              <div style="display:flex; justify-content:space-between; align-items:center; background:#f8fafc; padding:0.65rem 0.85rem; border-radius:var(--radius-md); font-size:0.78rem;">
                <span>Submissions: <strong>${h.totalSubmissions} / ${h.totalAssigned}</strong> students</span>
                ${canCreate ? `
                  <button class="btn btn-danger btn-sm" onclick="window.homeworkPage.confirmDelete('${h.id}')" title="Delete Assignment">🗑️</button>
                ` : `
                  <button class="btn btn-primary btn-sm" onclick="window.showToast('Assignment submitted successfully for verification!', 'success')">📤 Submit</button>
                `}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  showAddModal() {
    let existing = document.getElementById('homework-form-modal');
    if (existing) existing.remove();

    const user = window.auth.getUser();

    const modal = document.createElement('div');
    modal.id = 'homework-form-modal';
    modal.className = 'modal-overlay active';
    modal.innerHTML = `
      <div class="modal-dialog">
        <div class="modal-header">
          <h3 class="modal-title">Create Homework Assignment</h3>
          <button class="modal-close-btn" onclick="document.getElementById('homework-form-modal').remove()">✕</button>
        </div>
        <form onsubmit="window.homeworkPage.handleSubmit(event)">
          <div class="modal-body">
            <div class="form-grid">
              <div class="form-group col-full">
                <label class="form-label">Assignment Title <span class="req">*</span></label>
                <input type="text" id="hw-title" class="form-input" placeholder="e.g. Chapter 5 Algebraic Expressions Exercise 5.1" required />
              </div>

              <div class="form-group">
                <label class="form-label">Subject <span class="req">*</span></label>
                <input type="text" id="hw-subject" class="form-input" placeholder="e.g. Mathematics" value="Mathematics" required />
              </div>
              <div class="form-group">
                <label class="form-label">Due Date <span class="req">*</span></label>
                <input type="date" id="hw-due" class="form-input" value="2026-10-15" required />
              </div>

              <div class="form-group">
                <label class="form-label">Class</label>
                <select id="hw-class" class="form-select">
                  <option value="6">Class 6</option>
                  <option value="7">Class 7</option>
                  <option value="8" selected>Class 8</option>
                  <option value="9">Class 9</option>
                  <option value="10">Class 10</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Section</label>
                <select id="hw-section" class="form-select">
                  <option value="A">Section A</option>
                  <option value="B">Section B</option>
                </select>
              </div>

              <div class="form-group col-full">
                <label class="form-label">Detailed Instructions</label>
                <textarea id="hw-desc" class="form-textarea" rows="3" placeholder="Provide problem numbers, guidelines, or resource references..." required></textarea>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline btn-sm" onclick="document.getElementById('homework-form-modal').remove()">Cancel</button>
            <button type="submit" class="btn btn-primary btn-sm">Publish Assignment</button>
          </div>
        </form>
      </div>
    `;
    document.body.appendChild(modal);
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = window.auth.getUser();
    const data = {
      title: document.getElementById('hw-title').value,
      subject: document.getElementById('hw-subject').value,
      dueDate: document.getElementById('hw-due').value,
      class: document.getElementById('hw-class').value,
      section: document.getElementById('hw-section').value,
      description: document.getElementById('hw-desc').value,
      teacher: user.name,
      assignedDate: new Date().toISOString().split('T')[0],
      status: 'Active',
      totalSubmissions: 0,
      totalAssigned: 35
    };

    window.db.saveHomework(data);
    document.getElementById('homework-form-modal').remove();
    window.showToast('Homework assignment published!', 'success');
    window.router.renderCurrentPage();
  }

  confirmDelete(id) {
    window.showConfirmDialog({
      title: 'Remove Assignment',
      message: 'Are you sure you want to remove this homework assignment?',
      confirmText: 'Remove',
      isDanger: true,
      onConfirm: () => {
        window.db.deleteHomework(id);
        window.showToast('Assignment deleted', 'warning');
        window.router.renderCurrentPage();
      }
    });
  }
}

window.homeworkPage = new HomeworkPage();
