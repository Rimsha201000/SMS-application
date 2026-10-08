/**
 * Beacon Valley School - EduBloom LMS
 * Deleted Students Data & Recycle Bin System
 * Preserves full history with 1-click Restore and secure Permanent Deletion
 */

class RecycleBinPage {
  constructor() {
    this.searchQuery = '';
  }

  render() {
    if (!window.auth.isAdminOrOwner()) {
      return `
        <div class="ui-card" style="text-align:center; padding:3rem;">
          <div style="font-size:3rem; margin-bottom:1rem;">🔒</div>
          <h3>Access Restricted</h3>
          <p style="color:var(--text-muted); margin-top:0.5rem;">
            Only the School Owner and Authorized Administrators have permission to access the Recycle Bin.
          </p>
        </div>
      `;
    }

    const deletedStudents = window.db.getDeletedStudents();
    const filtered = deletedStudents.filter(s => {
      return !this.searchQuery ||
        s.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        s.rollNo.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        s.parentName.toLowerCase().includes(this.searchQuery.toLowerCase());
    });

    return `
      <div class="ui-card">
        <div class="ui-card-header">
          <div>
            <h2 class="ui-card-title">
              <span>♻️</span>
              <span>Deleted Students & Archive Bin</span>
              <span class="badge badge-warning" style="margin-left:6px;">${deletedStudents.length} Archived</span>
            </h2>
            <p style="font-size:0.78rem; color:var(--text-muted); margin-top:2px;">
              Records placed in the Recycle Bin preserve all academic records, attendance logs, and fee history until permanent clearance.
            </p>
          </div>

          <div class="ui-card-actions">
            <button class="btn btn-outline btn-sm" onclick="window.router.navigate('/students')">
              <span>➔</span> Return to Active Directory
            </button>
          </div>
        </div>

        <!-- Recycle Warning Notice -->
        <div style="background:rgba(245, 158, 11, 0.1); border:1px solid rgba(245, 158, 11, 0.3); border-radius:var(--radius-md); padding:0.85rem 1.15rem; margin-bottom:1.25rem; display:flex; align-items:center; gap:0.75rem;">
          <span style="font-size:1.4rem;">🛡️</span>
          <div style="font-size:0.82rem; color:#92400e;">
            <strong>Data Preservation Policy:</strong> Deleted students are isolated from active enrollments to prevent accidental loss. You can safely restore any student or permanently erase their records.
          </div>
        </div>

        <!-- Search Bar -->
        <div style="margin-bottom:1.25rem;">
          <input 
            type="text" 
            class="form-input" 
            placeholder="Search deleted archives by name, roll no, or parent..."
            value="${this.searchQuery}"
            oninput="window.recyclePage.searchQuery = this.value; window.router.renderCurrentPage();"
          />
        </div>

        <!-- Deleted Table -->
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Roll No</th>
                <th>Class</th>
                <th>Parent</th>
                <th>Deleted On</th>
                <th>Archived By</th>
                <th style="text-align:right;">Actions</th>
              </tr>
            </thead>
            <tbody>
              ${filtered.length === 0 ? `
                <tr>
                  <td colspan="7" style="text-align:center; padding:3rem; color:#94a3b8;">
                    <span>✨ The Recycle Bin is clean. No deleted students found.</span>
                  </td>
                </tr>
              ` : filtered.map(s => `
                <tr style="opacity:0.9;">
                  <td>
                    <div class="user-cell">
                      <img src="${s.photo}" alt="${s.name}" class="user-cell-img" style="filter:grayscale(60%);" onerror="this.src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'"/>
                      <div>
                        <div class="user-cell-name">${s.name}</div>
                        <div class="user-cell-sub">Former Status: ${s.status}</div>
                      </div>
                    </div>
                  </td>
                  <td><code>${s.rollNo}</code></td>
                  <td>Class ${s.class}-${s.section}</td>
                  <td>${s.parentName}</td>
                  <td style="font-size:0.78rem; color:#64748b;">${s.deletedAt ? new Date(s.deletedAt).toLocaleDateString() : 'Recent'}</td>
                  <td style="font-size:0.78rem; color:#475569;">${s.deletedBy || 'System Admin'}</td>
                  <td style="text-align:right; white-space:nowrap;">
                    <button class="btn btn-outline btn-sm" onclick="window.studentsPage.viewProfile('${s.id}')" title="Inspect Archived Profile">
                      👁️ Profile
                    </button>
                    <button class="btn btn-primary btn-sm" onclick="window.recyclePage.restore('${s.id}', '${s.name}')" title="Restore Student Record">
                      ↩️ Restore
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="window.recyclePage.confirmPermanentDelete('${s.id}', '${s.name}')" title="Permanently Erase">
                      ❌ Erase
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  restore(id, name) {
    const success = window.db.restoreStudent(id);
    if (success) {
      window.showToast(`Restored "${name}" to active student directory!`, 'success');
      window.router.renderCurrentPage();
    }
  }

  confirmPermanentDelete(id, name) {
    window.showConfirmDialog({
      title: 'Permanent Student Deletion',
      message: `<strong>WARNING:</strong> This action permanently deletes the student record for <strong>${name}</strong> and cannot be undone. All associated results and fee invoices will be permanently wiped from the database.`,
      confirmText: 'Permanently Delete Record',
      isDanger: true,
      onConfirm: () => {
        window.db.permanentDeleteStudent(id);
        window.showToast(`Permanently deleted student "${name}"`, 'error');
        window.router.renderCurrentPage();
      }
    });
  }
}

window.recyclePage = new RecycleBinPage();
