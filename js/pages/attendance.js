/**
 * Beacon Valley School - EduBloom LMS
 * Daily Attendance System
 * Supports Class-wise, Date-wise, Quick Mark All Present, and Real-time computation
 */

class AttendancePage {
  constructor() {
    this.selectedDate = new Date().toISOString().split('T')[0];
    this.selectedClass = '8';
    this.selectedSection = 'A';
  }

  render() {
    const user = window.auth.getUser();
    const role = user ? user.role : 'owner';

    // Parent & Student personalized attendance views
    if (role === 'student' || role === 'parent') {
      return this.renderPersonalAttendance(user);
    }

    // Teacher & Admin interactive daily marker
    return this.renderAttendanceMarker();
  }

  renderPersonalAttendance(user) {
    const isParent = user.role === 'parent';
    const activeStudentId = isParent ? (user.activeChildId || user.childrenIds[0]) : user.studentId;
    const student = window.db.getStudentById(activeStudentId) || window.db.getStudents()[0];

    return `
      <div class="ui-card">
        <div class="ui-card-header">
          <div>
            <h2 class="ui-card-title">
              <span>📅</span>
              <span>${isParent ? `${student.name}'s Attendance Record` : 'My Attendance Record'}</span>
            </h2>
            <p style="font-size:0.78rem; color:var(--text-muted);">
              Enrolled in Class ${student.class}-${student.section} • Roll No: ${student.rollNo}
            </p>
          </div>
          <span class="badge ${student.attendancePercent >= 75 ? 'badge-success' : 'badge-danger'}" style="font-size:0.9rem; padding:6px 14px;">
            ${student.attendancePercent}% Cumulative Rate
          </span>
        </div>

        <div class="stats-bubble-grid" style="margin-bottom:1.5rem;">
          <div class="stat-bubble-card">
            <div class="stat-bubble-icon bg-icon-green">✅</div>
            <div class="stat-bubble-info">
              <div class="stat-bubble-label">Present Sessions</div>
              <div class="stat-bubble-value">44</div>
              <div class="stat-bubble-desc">On-time campus presence</div>
            </div>
          </div>

          <div class="stat-bubble-card">
            <div class="stat-bubble-icon bg-icon-rose">❌</div>
            <div class="stat-bubble-info">
              <div class="stat-bubble-label">Absences</div>
              <div class="stat-bubble-value">2</div>
              <div class="stat-bubble-desc">Leaves registered</div>
            </div>
          </div>

          <div class="stat-bubble-card">
            <div class="stat-bubble-icon bg-icon-gold">⏰</div>
            <div class="stat-bubble-info">
              <div class="stat-bubble-label">Late Arrivals</div>
              <div class="stat-bubble-value">1</div>
              <div class="stat-bubble-desc">Morning assembly delay</div>
            </div>
          </div>
        </div>

        <h4 style="font-size:0.95rem; font-weight:700; color:var(--primary-color); margin-bottom:0.75rem;">Recent Biometric Attendance Logs</h4>
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Day</th>
                <th>Status</th>
                <th>Check-in Time</th>
                <th>Verification Method</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>2026-10-08</strong> (Today)</td>
                <td>Thursday</td>
                <td><span class="badge ${student.name === 'Zaid Khan' ? 'badge-danger' : 'badge-success'}">${student.name === 'Zaid Khan' ? 'Absent' : 'Present'}</span></td>
                <td>${student.name === 'Zaid Khan' ? '--' : '07:54 AM'}</td>
                <td>RFID Card Scanner Gate 1</td>
              </tr>
              <tr>
                <td>2026-10-07</td>
                <td>Wednesday</td>
                <td><span class="badge badge-success">Present</span></td>
                <td>07:50 AM</td>
                <td>RFID Card Scanner Gate 1</td>
              </tr>
              <tr>
                <td>2026-10-06</td>
                <td>Tuesday</td>
                <td><span class="badge badge-success">Present</span></td>
                <td>07:52 AM</td>
                <td>RFID Card Scanner Gate 1</td>
              </tr>
              <tr>
                <td>2026-10-05</td>
                <td>Monday</td>
                <td><span class="badge badge-success">Present</span></td>
                <td>07:48 AM</td>
                <td>RFID Card Scanner Gate 1</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  renderAttendanceMarker() {
    const students = window.db.getStudents().filter(s => s.class === this.selectedClass && s.section === this.selectedSection);
    const existingRecords = window.db.getAttendanceRecord(this.selectedDate, this.selectedClass, this.selectedSection);

    return `
      <div class="ui-card">
        <div class="ui-card-header">
          <div>
            <h2 class="ui-card-title">
              <span>📅</span>
              <span>Daily Attendance Ledger</span>
            </h2>
            <p style="font-size:0.78rem; color:var(--text-muted);">
              Select cohort and date to record or audit student attendance status
            </p>
          </div>

          <div class="ui-card-actions">
            <button class="btn btn-outline btn-sm" onclick="window.attendancePage.markAll('Present')">
              ✅ All Present
            </button>
            <button class="btn btn-outline btn-sm" onclick="window.attendancePage.markAll('Absent')">
              ❌ All Absent
            </button>
          </div>
        </div>

        <!-- Filter Bar -->
        <div style="display:flex; flex-wrap:wrap; gap:0.75rem; background:#f8fafc; padding:1rem; border-radius:var(--radius-md); margin-bottom:1.25rem; align-items:center;">
          <div style="display:flex; align-items:center; gap:6px;">
            <label class="form-label" style="margin:0;">Date:</label>
            <input 
              type="date" 
              class="form-input" 
              style="width:auto;"
              value="${this.selectedDate}" 
              onchange="window.attendancePage.selectedDate = this.value; window.router.renderCurrentPage();"
            />
          </div>

          <div style="display:flex; align-items:center; gap:6px;">
            <label class="form-label" style="margin:0;">Class:</label>
            <select class="form-select" style="width:auto;" onchange="window.attendancePage.selectedClass = this.value; window.router.renderCurrentPage();">
              <option value="6" ${this.selectedClass === '6' ? 'selected' : ''}>Class 6</option>
              <option value="7" ${this.selectedClass === '7' ? 'selected' : ''}>Class 7</option>
              <option value="8" ${this.selectedClass === '8' ? 'selected' : ''}>Class 8</option>
              <option value="9" ${this.selectedClass === '9' ? 'selected' : ''}>Class 9</option>
              <option value="10" ${this.selectedClass === '10' ? 'selected' : ''}>Class 10</option>
            </select>
          </div>

          <div style="display:flex; align-items:center; gap:6px;">
            <label class="form-label" style="margin:0;">Section:</label>
            <select class="form-select" style="width:auto;" onchange="window.attendancePage.selectedSection = this.value; window.router.renderCurrentPage();">
              <option value="A" ${this.selectedSection === 'A' ? 'selected' : ''}>Section A</option>
              <option value="B" ${this.selectedSection === 'B' ? 'selected' : ''}>Section B</option>
            </select>
          </div>

          <button class="btn btn-primary btn-sm" style="margin-left:auto;" onclick="window.attendancePage.saveAttendance()">
            💾 Save Attendance
          </button>
        </div>

        <!-- Student Attendance List -->
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Roll No</th>
                <th>Overall Attendance</th>
                <th style="text-align:center;">Today's Attendance Status</th>
              </tr>
            </thead>
            <tbody>
              ${students.length === 0 ? `
                <tr>
                  <td colspan="4" style="text-align:center; padding:2.5rem; color:#94a3b8;">
                    No enrolled students in Class ${this.selectedClass}-${this.selectedSection}.
                  </td>
                </tr>
              ` : students.map(s => {
                const currentStatus = existingRecords[s.id] || 'Present';
                return `
                  <tr>
                    <td>
                      <div class="user-cell">
                        <img src="${s.photo}" alt="${s.name}" class="user-cell-img" onerror="this.src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'"/>
                        <div>
                          <div class="user-cell-name">${s.name}</div>
                          <div class="user-cell-sub">Parent: ${s.parentName} (${s.parentContact})</div>
                        </div>
                      </div>
                    </td>
                    <td><code>${s.rollNo}</code></td>
                    <td>
                      <span style="font-weight:700; color:${s.attendancePercent >= 75 ? '#10b981' : '#ef4444'};">${s.attendancePercent}%</span>
                    </td>
                    <td style="text-align:center;">
                      <div style="display:inline-flex; gap:0.4rem;" id="att-group-${s.id}">
                        <button type="button" class="btn btn-sm ${currentStatus === 'Present' ? 'btn-primary' : 'btn-outline'}" style="${currentStatus === 'Present' ? 'background:#10b981; border-color:#10b981;' : ''}" onclick="window.attendancePage.setStatus('${s.id}', 'Present')">
                          Present
                        </button>
                        <button type="button" class="btn btn-sm ${currentStatus === 'Absent' ? 'btn-danger' : 'btn-outline'}" onclick="window.attendancePage.setStatus('${s.id}', 'Absent')">
                          Absent
                        </button>
                        <button type="button" class="btn btn-sm ${currentStatus === 'Late' ? 'btn-primary' : 'btn-outline'}" style="${currentStatus === 'Late' ? 'background:#f59e0b; border-color:#f59e0b;' : ''}" onclick="window.attendancePage.setStatus('${s.id}', 'Late')">
                          Late
                        </button>
                        <button type="button" class="btn btn-sm ${currentStatus === 'Excused' ? 'btn-primary' : 'btn-outline'}" style="${currentStatus === 'Excused' ? 'background:#64748b; border-color:#64748b;' : ''}" onclick="window.attendancePage.setStatus('${s.id}', 'Excused')">
                          Excused
                        </button>
                      </div>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  setStatus(studentId, status) {
    const existing = window.db.getAttendanceRecord(this.selectedDate, this.selectedClass, this.selectedSection);
    existing[studentId] = status;
    window.db.saveAttendanceRecord(this.selectedDate, this.selectedClass, this.selectedSection, existing);
    window.router.renderCurrentPage();
  }

  markAll(status) {
    const students = window.db.getStudents().filter(s => s.class === this.selectedClass && s.section === this.selectedSection);
    const existing = window.db.getAttendanceRecord(this.selectedDate, this.selectedClass, this.selectedSection);
    students.forEach(s => {
      existing[s.id] = status;
    });
    window.db.saveAttendanceRecord(this.selectedDate, this.selectedClass, this.selectedSection, existing);
    window.showToast(`Marked all students in Class ${this.selectedClass}-${this.selectedSection} as ${status}!`, 'info');
    window.router.renderCurrentPage();
  }

  saveAttendance() {
    window.showToast(`Attendance synchronized for Class ${this.selectedClass}-${this.selectedSection} on ${this.selectedDate}!`, 'success');
  }
}

window.attendancePage = new AttendancePage();
