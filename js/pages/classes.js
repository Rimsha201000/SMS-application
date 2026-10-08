/**
 * Beacon Valley School - EduBloom LMS
 * Classes & Sections Management
 */

class ClassesPage {
  render() {
    const classes = window.db.getClasses();
    const students = window.db.getStudents();
    const canManage = window.auth.isAdminOrOwner();

    return `
      <div class="ui-card">
        <div class="ui-card-header">
          <div>
            <h2 class="ui-card-title">
              <span>🏫</span>
              <span>Classes, Cohorts & Class Mentors</span>
            </h2>
            <p style="font-size:0.78rem; color:var(--text-muted); margin-top:2px;">
              Overview of active academic standards, classrooms, and allocated class mentors
            </p>
          </div>

          <div class="ui-card-actions">
            ${canManage ? `
              <button class="btn btn-primary btn-sm" onclick="window.classesPage.showAddModal()">
                <span>➕</span> Add Class Tier
              </button>
            ` : ''}
          </div>
        </div>

        <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(290px, 1fr)); gap:1.25rem;">
          ${classes.map(c => {
            const classNum = c.name.replace('Class ', '');
            const enrolled = students.filter(s => s.class === classNum).length;

            return `
              <div style="background:#fff; border:1px solid var(--border-subtle); border-radius:var(--radius-lg); padding:1.25rem; box-shadow:var(--shadow-sm); display:flex; flex-direction:column; gap:0.75rem;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <h3 style="font-size:1.2rem; font-weight:800; color:var(--primary-color);">${c.name}</h3>
                  <span class="badge badge-info">${c.room}</span>
                </div>

                <div style="font-size:0.83rem; color:#475569; display:flex; flex-direction:column; gap:4px; background:#f8fafc; padding:0.75rem; border-radius:10px;">
                  <div>👨‍🏫 <strong>Class In-charge:</strong> ${c.classTeacher}</div>
                  <div>🔤 <strong>Sections:</strong> ${c.sections.join(', ')}</div>
                  <div>🎓 <strong>Enrolled Scholars:</strong> <span style="font-weight:700; color:var(--primary-color);">${enrolled} students</span></div>
                </div>

                <div style="display:flex; justify-content:space-between; align-items:center; margin-top:auto; padding-top:0.5rem;">
                  <button class="btn btn-outline btn-sm" onclick="window.studentsPage.filterClass='${classNum}'; window.router.navigate('/students');">
                    View Students ➔
                  </button>
                  <button class="btn btn-outline btn-sm" onclick="window.attendancePage.selectedClass='${classNum}'; window.router.navigate('/attendance');">
                    Attendance ➔
                  </button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  showAddModal() {
    let existing = document.getElementById('class-modal');
    if (existing) existing.remove();

    const teachers = window.db.getTeachers();

    const modal = document.createElement('div');
    modal.id = 'class-modal';
    modal.className = 'modal-overlay active';
    modal.innerHTML = `
      <div class="modal-dialog">
        <div class="modal-header">
          <h3 class="modal-title">Create Class Tier</h3>
          <button class="modal-close-btn" onclick="document.getElementById('class-modal').remove()">✕</button>
        </div>
        <form onsubmit="window.classesPage.handleSubmit(event)">
          <div class="modal-body">
            <div class="form-grid">
              <div class="form-group col-full">
                <label class="form-label">Class Name</label>
                <input type="text" id="cls-name" class="form-input" placeholder="e.g. Class 11" required />
              </div>
              <div class="form-group">
                <label class="form-label">Assigned Room</label>
                <input type="text" id="cls-room" class="form-input" placeholder="e.g. Room 305" required />
              </div>
              <div class="form-group">
                <label class="form-label">Class Teacher</label>
                <select id="cls-teacher" class="form-select">
                  ${teachers.map(t => `<option value="${t.name}">${t.name}</option>`).join('')}
                </select>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline btn-sm" onclick="document.getElementById('class-modal').remove()">Cancel</button>
            <button type="submit" class="btn btn-primary btn-sm">Save Class</button>
          </div>
        </form>
      </div>
    `;
    document.body.appendChild(modal);
  }

  handleSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('cls-name').value;
    const room = document.getElementById('cls-room').value;
    const teacher = document.getElementById('cls-teacher').value;

    window.db.saveClass({
      id: 'CLS-' + Date.now().toString().slice(-4),
      name: name,
      sections: ['A', 'B'],
      classTeacher: teacher,
      totalStudents: 0,
      room: room
    });

    document.getElementById('class-modal').remove();
    window.showToast(`New tier ${name} created!`, 'success');
    window.router.renderCurrentPage();
  }
}

window.classesPage = new ClassesPage();
