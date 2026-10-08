/**
 * Beacon Valley School - EduBloom LMS
 * Student Management (Add, Edit, View Profile, Soft Delete to Recycle Bin)
 */

class StudentsPage {
  constructor() {
    this.searchQuery = '';
    this.filterClass = 'all';
    this.filterFee = 'all';
  }

  render() {
    const students = window.db.getStudents();
    const classes = window.db.getClasses();
    const canManage = window.auth.isAdminOrOwner();

    // Filtering
    let filtered = students.filter(s => {
      const matchSearch = !this.searchQuery || 
        s.name.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
        s.rollNo.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        s.parentName.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchClass = this.filterClass === 'all' || s.class === this.filterClass;
      const matchFee = this.filterFee === 'all' || s.feeStatus === this.filterFee;
      return matchSearch && matchClass && matchFee;
    });

    return `
      <div class="ui-card">
        <div class="ui-card-header">
          <div>
            <h2 class="ui-card-title">
              <span>🎓</span>
              <span>Student Directory</span>
              <span class="badge badge-info" style="margin-left:6px;">${filtered.length} Enrolled</span>
            </h2>
            <p style="font-size:0.78rem; color:var(--text-muted); margin-top:2px;">
              Manage active student profiles, academic enrollment, and guardianship records
            </p>
          </div>

          <div class="ui-card-actions">
            ${canManage ? `
              <button class="btn btn-primary btn-sm" onclick="window.studentsPage.showAddModal()">
                <span>➕</span> Add New Student
              </button>
              <button class="btn btn-outline btn-sm" onclick="window.router.navigate('/recycle')">
                <span>♻️</span> Recycle Bin
              </button>
            ` : ''}
          </div>
        </div>

        <!-- Filter & Search Controls -->
        <div style="display:flex; flex-wrap:wrap; gap:0.75rem; margin-bottom:1.25rem;">
          <div style="flex:1; min-width:220px; position:relative;">
            <input 
              type="text" 
              class="form-input" 
              placeholder="Search by student name, roll number, or parent..."
              value="${this.searchQuery}"
              oninput="window.studentsPage.searchQuery = this.value; window.router.renderCurrentPage();"
            />
          </div>

          <select class="form-select" style="width:auto; min-width:140px;" onchange="window.studentsPage.filterClass = this.value; window.router.renderCurrentPage();">
            <option value="all">All Classes</option>
            ${classes.map(c => `<option value="${c.name.replace('Class ', '')}" ${this.filterClass === c.name.replace('Class ', '') ? 'selected' : ''}>${c.name}</option>`).join('')}
          </select>

          <select class="form-select" style="width:auto; min-width:140px;" onchange="window.studentsPage.filterFee = this.value; window.router.renderCurrentPage();">
            <option value="all">All Fee Status</option>
            <option value="Paid" ${this.filterFee === 'Paid' ? 'selected' : ''}>Paid</option>
            <option value="Pending" ${this.filterFee === 'Pending' ? 'selected' : ''}>Pending</option>
            <option value="Partial" ${this.filterFee === 'Partial' ? 'selected' : ''}>Partial</option>
            <option value="Overdue" ${this.filterFee === 'Overdue' ? 'selected' : ''}>Overdue</option>
          </select>
        </div>

        <!-- Students Table -->
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Roll No</th>
                <th>Class & Sec</th>
                <th>Parent / Contact</th>
                <th>Attendance</th>
                <th>Fee Status</th>
                <th style="text-align:right;">Actions</th>
              </tr>
            </thead>
            <tbody>
              ${filtered.length === 0 ? `
                <tr>
                  <td colspan="7" style="text-align:center; padding:2.5rem; color:#94a3b8;">
                    No active students found matching your search criteria.
                  </td>
                </tr>
              ` : filtered.map(s => `
                <tr>
                  <td>
                    <div class="user-cell">
                      <img src="${s.photo}" alt="${s.name}" class="user-cell-img" onerror="this.src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'"/>
                      <div>
                        <div class="user-cell-name">${s.name}</div>
                        <div class="user-cell-sub">${s.gender} • DOB: ${s.dob}</div>
                      </div>
                    </div>
                  </td>
                  <td><code>${s.rollNo}</code></td>
                  <td><span class="badge" style="background:#f1f5f9; color:#334155; font-weight:700;">Class ${s.class}-${s.section}</span></td>
                  <td>
                    <div style="font-size:0.84rem; font-weight:600;">${s.parentName}</div>
                    <div style="font-size:0.74rem; color:#64748b;">${s.parentContact}</div>
                  </td>
                  <td>
                    <div style="display:flex; align-items:center; gap:6px;">
                      <div style="width:40px; height:6px; background:#e2e8f0; border-radius:4px; overflow:hidden;">
                        <div style="width:${s.attendancePercent}%; height:100%; background:${s.attendancePercent >= 75 ? '#10b981' : '#ef4444'};"></div>
                      </div>
                      <span style="font-weight:700; font-size:0.78rem; color:${s.attendancePercent >= 75 ? '#10b981' : '#ef4444'};">${s.attendancePercent}%</span>
                    </div>
                  </td>
                  <td>
                    <span class="badge ${s.feeStatus === 'Paid' ? 'badge-success' : s.feeStatus === 'Overdue' ? 'badge-danger' : 'badge-warning'}">
                      ${s.feeStatus}
                    </span>
                  </td>
                  <td style="text-align:right;">
                    <button class="btn btn-outline btn-sm" onclick="window.studentsPage.viewProfile('${s.id}')" title="View Profile">
                      👁️ View
                    </button>
                    ${canManage ? `
                      <button class="btn btn-outline btn-sm" onclick="window.studentsPage.showEditModal('${s.id}')" title="Edit Student">
                        ✏️
                      </button>
                      <button class="btn btn-danger btn-sm" onclick="window.studentsPage.confirmSoftDelete('${s.id}', '${s.name}')" title="Move to Recycle Bin">
                        🗑️
                      </button>
                    ` : ''}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  showAddModal() {
    this.openFormModal('Add New Student');
  }

  showEditModal(id) {
    const student = window.db.getStudentById(id);
    if (!student) return;
    this.openFormModal('Edit Student Profile', student);
  }

  openFormModal(title, student = null) {
    let existing = document.getElementById('student-form-modal');
    if (existing) existing.remove();

    const isEdit = !!student;
    const modal = document.createElement('div');
    modal.id = 'student-form-modal';
    modal.className = 'modal-overlay active';
    modal.innerHTML = `
      <div class="modal-dialog">
        <div class="modal-header">
          <h3 class="modal-title">${title}</h3>
          <button class="modal-close-btn" onclick="document.getElementById('student-form-modal').remove()">✕</button>
        </div>
        <form onsubmit="window.studentsPage.handleFormSubmit(event, '${isEdit ? student.id : ''}')">
          <div class="modal-body">
            <div class="form-grid">
              <div class="form-group">
                <label class="form-label">Full Name <span class="req">*</span></label>
                <input type="text" id="stu-name" class="form-input" value="${student ? student.name : ''}" required />
              </div>
              <div class="form-group">
                <label class="form-label">Roll Number <span class="req">*</span></label>
                <input type="text" id="stu-roll" class="form-input" value="${student ? student.rollNo : 'BVS-08' + Math.floor(10 + Math.random() * 89)}" required />
              </div>

              <div class="form-group">
                <label class="form-label">Class <span class="req">*</span></label>
                <select id="stu-class" class="form-select" required>
                  <option value="6" ${student && student.class === '6' ? 'selected' : ''}>Class 6</option>
                  <option value="7" ${student && student.class === '7' ? 'selected' : ''}>Class 7</option>
                  <option value="8" ${student && student.class === '8' ? 'selected' : ''}>Class 8</option>
                  <option value="9" ${student && student.class === '9' ? 'selected' : ''}>Class 9</option>
                  <option value="10" ${student && student.class === '10' ? 'selected' : ''}>Class 10</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Section <span class="req">*</span></label>
                <select id="stu-section" class="form-select" required>
                  <option value="A" ${student && student.section === 'A' ? 'selected' : ''}>Section A</option>
                  <option value="B" ${student && student.section === 'B' ? 'selected' : ''}>Section B</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">Gender</label>
                <select id="stu-gender" class="form-select">
                  <option value="Male" ${student && student.gender === 'Male' ? 'selected' : ''}>Male</option>
                  <option value="Female" ${student && student.gender === 'Female' ? 'selected' : ''}>Female</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Date of Birth</label>
                <input type="date" id="stu-dob" class="form-input" value="${student ? student.dob : '2011-05-15'}" />
              </div>

              <div class="form-group">
                <label class="form-label">Parent / Guardian Name <span class="req">*</span></label>
                <input type="text" id="stu-parent" class="form-input" value="${student ? student.parentName : ''}" required />
              </div>
              <div class="form-group">
                <label class="form-label">Parent Contact Number <span class="req">*</span></label>
                <input type="text" id="stu-contact" class="form-input" value="${student ? student.parentContact : '+92 300 1234567'}" required />
              </div>

              <div class="form-group">
                <label class="form-label">Parent Email</label>
                <input type="email" id="stu-email" class="form-input" value="${student ? student.parentEmail : 'guardian@beaconvalley.edu'}" />
              </div>
              <div class="form-group">
                <label class="form-label">Emergency Phone</label>
                <input type="text" id="stu-emergency" class="form-input" value="${student ? student.emergencyContact : '+92 300 9988776'}" />
              </div>

              <div class="form-group col-full">
                <label class="form-label">Residential Address</label>
                <input type="text" id="stu-address" class="form-input" value="${student ? student.address : 'Sector 4, Beacon Valley Colony'}" />
              </div>

              <div class="form-group col-full">
                <label class="form-label">Photo URL (Optional)</label>
                <input type="text" id="stu-photo" class="form-input" placeholder="https://..." value="${student ? student.photo : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}" />
              </div>

              <div class="form-group col-full">
                <label class="form-label">Academic & Character Remarks</label>
                <textarea id="stu-notes" class="form-textarea" rows="2">${student ? student.notes : 'Active scholar in good academic standing.'}</textarea>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline btn-sm" onclick="document.getElementById('student-form-modal').remove()">Cancel</button>
            <button type="submit" class="btn btn-primary btn-sm">${isEdit ? 'Update Profile' : 'Enroll Student'}</button>
          </div>
        </form>
      </div>
    `;
    document.body.appendChild(modal);
  }

  handleFormSubmit(e, editId) {
    e.preventDefault();
    const data = {
      name: document.getElementById('stu-name').value,
      rollNo: document.getElementById('stu-roll').value,
      class: document.getElementById('stu-class').value,
      section: document.getElementById('stu-section').value,
      gender: document.getElementById('stu-gender').value,
      dob: document.getElementById('stu-dob').value,
      parentName: document.getElementById('stu-parent').value,
      parentContact: document.getElementById('stu-contact').value,
      parentEmail: document.getElementById('stu-email').value,
      emergencyContact: document.getElementById('stu-emergency').value,
      address: document.getElementById('stu-address').value,
      photo: document.getElementById('stu-photo').value || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      notes: document.getElementById('stu-notes').value
    };

    if (editId) data.id = editId;

    window.db.saveStudent(data);
    document.getElementById('student-form-modal').remove();
    window.showToast(editId ? 'Student profile updated!' : 'Student enrolled successfully!', 'success');
    window.router.renderCurrentPage();
  }

  // Soft Delete to Recycle Bin
  confirmSoftDelete(id, name) {
    window.showConfirmDialog({
      title: 'Move Student to Recycle Bin?',
      message: `Are you sure you want to delete <strong>${name}</strong>? Their profile, attendance, and fee history will be safely preserved in the <strong>Recycle Bin</strong> and can be restored at any time.`,
      confirmText: 'Move to Recycle Bin',
      isDanger: true,
      onConfirm: () => {
        const user = window.auth.getUser();
        window.db.softDeleteStudent(id, `${user.name} (${user.roleTitle})`);
        window.showToast(`${name} moved to Recycle Bin`, 'warning');
        window.router.renderCurrentPage();
      }
    });
  }

  // Detailed Student Profile Modal with Tabs
  viewProfile(id) {
    const s = window.db.getStudentById(id);
    if (!s) return;

    const fees = window.db.getFees().filter(f => f.studentId === s.id);
    const results = window.db.getResults().filter(r => r.studentId === s.id);

    let existing = document.getElementById('student-profile-modal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'student-profile-modal';
    modal.className = 'modal-overlay active';
    modal.innerHTML = `
      <div class="modal-dialog" style="max-width:760px;">
        <div class="modal-header" style="background:linear-gradient(135deg, #0d1f3c 0%, #16325c 100%); color:#fff;">
          <div style="display:flex; align-items:center; gap:1rem;">
            <img src="${s.photo}" alt="${s.name}" style="width:54px; height:54px; border-radius:50%; object-fit:cover; border:2px solid #d4af37;"/>
            <div>
              <h3 style="color:#fff; font-size:1.25rem;">${s.name}</h3>
              <div style="font-size:0.8rem; color:#dfb54b;">Roll No: ${s.rollNo} • Class ${s.class}-${s.section}</div>
            </div>
          </div>
          <button class="modal-close-btn" style="color:#fff;" onclick="document.getElementById('student-profile-modal').remove()">✕</button>
        </div>

        <div class="modal-body" style="padding:1.5rem;">
          <!-- Profile Grid -->
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.25rem; margin-bottom:1.5rem; font-size:0.86rem;">
            <div style="background:#f8fafc; padding:1rem; border-radius:12px; border:1px solid #e2e8f0;">
              <h4 style="font-size:0.85rem; font-weight:700; color:var(--primary-color); margin-bottom:6px;">Personal Information</h4>
              <div>• Date of Birth: <strong>${s.dob}</strong></div>
              <div>• Gender: <strong>${s.gender}</strong></div>
              <div>• Attendance: <strong style="color:${s.attendancePercent >= 75 ? '#10b981' : '#ef4444'}">${s.attendancePercent}%</strong></div>
              <div>• Fee Status: <span class="badge ${s.feeStatus === 'Paid' ? 'badge-success' : 'badge-danger'}">${s.feeStatus}</span></div>
            </div>

            <div style="background:#f8fafc; padding:1rem; border-radius:12px; border:1px solid #e2e8f0;">
              <h4 style="font-size:0.85rem; font-weight:700; color:var(--primary-color); margin-bottom:6px;">Guardian & Contact</h4>
              <div>• Parent: <strong>${s.parentName}</strong></div>
              <div>• Contact: <strong>${s.parentContact}</strong></div>
              <div>• Email: <strong>${s.parentEmail || 'N/A'}</strong></div>
              <div>• Address: <strong>${s.address}</strong></div>
            </div>
          </div>

          <!-- Academic Exam Results -->
          <h4 style="font-size:0.92rem; font-weight:700; color:var(--primary-color); margin-bottom:0.5rem;">Academic Report</h4>
          <div class="table-responsive" style="margin-bottom:1.5rem;">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Marks</th>
                  <th>Grade</th>
                  <th>Remarks</th>
                </tr>
              </thead>
              <tbody>
                ${results.length === 0 ? `
                  <tr><td colspan="4" style="text-align:center; color:#94a3b8;">No examination records logged yet.</td></tr>
                ` : results.map(r => `
                  <tr>
                    <td><strong>${r.subject}</strong></td>
                    <td>${r.marksObtained} / ${r.maxMarks}</td>
                    <td><span class="badge ${r.grade.includes('A') ? 'badge-success' : 'badge-warning'}">${r.grade}</span></td>
                    <td style="font-size:0.78rem; color:#64748b;">${r.remarks}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <!-- Fee History -->
          <h4 style="font-size:0.92rem; font-weight:700; color:var(--primary-color); margin-bottom:0.5rem;">Fee Invoices</h4>
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Total</th>
                  <th>Paid</th>
                  <th>Due</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                ${fees.length === 0 ? `
                  <tr><td colspan="5" style="text-align:center; color:#94a3b8;">No fee records recorded.</td></tr>
                ` : fees.map(f => `
                  <tr>
                    <td>${f.month}</td>
                    <td>$${f.totalAmount}</td>
                    <td style="color:#10b981; font-weight:700;">$${f.paidAmount}</td>
                    <td style="color:${f.dueAmount > 0 ? '#ef4444' : '#64748b'}; font-weight:700;">$${f.dueAmount}</td>
                    <td><span class="badge ${f.status === 'Paid' ? 'badge-success' : 'badge-danger'}">${f.status}</span></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn btn-outline btn-sm" onclick="window.print()">🖨️ Print Dossier</button>
          <button class="btn btn-primary btn-sm" onclick="document.getElementById('student-profile-modal').remove()">Close</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }
}

window.studentsPage = new StudentsPage();
