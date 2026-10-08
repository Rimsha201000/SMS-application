/**
 * Beacon Valley School - EduBloom LMS
 * Exams, Grading & Official Academic Report Cards
 */

class ExamsPage {
  constructor() {
    this.selectedExam = 'EXAM-600';
    this.filterClass = '8';
  }

  render() {
    const user = window.auth.getUser();
    const role = user ? user.role : 'owner';

    const exams = window.db.getExams();
    const results = window.db.getResults();

    // If student or parent: render personal report card
    if (role === 'student' || role === 'parent') {
      const activeStudentId = role === 'parent' ? (user.activeChildId || user.childrenIds[0]) : user.studentId;
      return this.renderStudentReportCard(activeStudentId);
    }

    // Faculty & Admin: Gradebook overview
    const studentsInClass = window.db.getStudents().filter(s => s.class === this.filterClass);

    return `
      <div class="ui-card">
        <div class="ui-card-header">
          <div>
            <h2 class="ui-card-title">
              <span>🏆</span>
              <span>Examination Assessment & Gradebook</span>
            </h2>
            <p style="font-size:0.78rem; color:var(--text-muted); margin-top:2px;">
              Manage term evaluations, enter subject scores, and print official dossiers
            </p>
          </div>

          <div class="ui-card-actions">
            <button class="btn btn-primary btn-sm" onclick="window.examsPage.showEnterMarksModal()">
              <span>➕</span> Enter Marks
            </button>
          </div>
        </div>

        <!-- Exam Filter Bar -->
        <div style="display:flex; flex-wrap:wrap; gap:0.75rem; background:#f8fafc; padding:1rem; border-radius:var(--radius-md); margin-bottom:1.5rem; align-items:center;">
          <div style="display:flex; align-items:center; gap:6px;">
            <label class="form-label" style="margin:0;">Assessment:</label>
            <select class="form-select" style="width:auto;" onchange="window.examsPage.selectedExam = this.value; window.router.renderCurrentPage();">
              ${exams.map(e => `<option value="${e.id}" ${this.selectedExam === e.id ? 'selected' : ''}>${e.title} (${e.status})</option>`).join('')}
            </select>
          </div>

          <div style="display:flex; align-items:center; gap:6px;">
            <label class="form-label" style="margin:0;">Class:</label>
            <select class="form-select" style="width:auto;" onchange="window.examsPage.filterClass = this.value; window.router.renderCurrentPage();">
              <option value="6" ${this.filterClass === '6' ? 'selected' : ''}>Class 6</option>
              <option value="7" ${this.filterClass === '7' ? 'selected' : ''}>Class 7</option>
              <option value="8" ${this.filterClass === '8' ? 'selected' : ''}>Class 8</option>
              <option value="9" ${this.filterClass === '9' ? 'selected' : ''}>Class 9</option>
              <option value="10" ${this.filterClass === '10' ? 'selected' : ''}>Class 10</option>
            </select>
          </div>
        </div>

        <!-- Class Grade Sheet -->
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Roll No</th>
                <th>Mathematics</th>
                <th>Physics / Science</th>
                <th>English</th>
                <th>GPA / Overall Grade</th>
                <th style="text-align:right;">Report Card</th>
              </tr>
            </thead>
            <tbody>
              ${studentsInClass.map(s => {
                const sResults = results.filter(r => r.studentId === s.id && r.examId === this.selectedExam);
                const math = sResults.find(r => r.subject === 'Mathematics')?.marksObtained || '--';
                const phy = sResults.find(r => r.subject === 'Physics' || r.subject === 'Science')?.marksObtained || '--';
                const eng = sResults.find(r => r.subject === 'English')?.marksObtained || '--';

                let overallGrade = 'Pending';
                if (sResults.length > 0) {
                  const avg = sResults.reduce((a, b) => a + b.marksObtained, 0) / sResults.length;
                  overallGrade = avg >= 90 ? 'A+' : avg >= 80 ? 'A' : avg >= 70 ? 'B' : avg >= 60 ? 'C' : 'F';
                }

                return `
                  <tr>
                    <td>
                      <div class="user-cell">
                        <img src="${s.photo}" alt="${s.name}" class="user-cell-img" onerror="this.src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'"/>
                        <div class="user-cell-name">${s.name}</div>
                      </div>
                    </td>
                    <td><code>${s.rollNo}</code></td>
                    <td><strong>${math}</strong></td>
                    <td><strong>${phy}</strong></td>
                    <td><strong>${eng}</strong></td>
                    <td>
                      <span class="badge ${overallGrade.includes('A') ? 'badge-success' : overallGrade === 'B' ? 'badge-info' : 'badge-warning'}">
                        ${overallGrade}
                      </span>
                    </td>
                    <td style="text-align:right;">
                      <button class="btn btn-outline btn-sm" onclick="window.examsPage.printReportCard('${s.id}')">
                        🖨️ View Card
                      </button>
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

  renderStudentReportCard(studentId) {
    const student = window.db.getStudentById(studentId) || window.db.getStudents()[0];
    const results = window.db.getResults().filter(r => r.studentId === student.id);

    return `
      <div class="ui-card">
        <div class="ui-card-header">
          <div>
            <h2 class="ui-card-title">
              <span>🏆</span>
              <span>Official Academic Report Card</span>
            </h2>
            <p style="font-size:0.78rem; color:var(--text-muted); margin-top:2px;">
              ${student.name} • Class ${student.class}-${student.section} • Roll No: ${student.rollNo}
            </p>
          </div>

          <div class="ui-card-actions">
            <button class="btn btn-primary btn-sm" onclick="window.examsPage.printReportCard('${student.id}')">
              🖨️ Print Report Card
            </button>
          </div>
        </div>

        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Total Marks</th>
                <th>Marks Obtained</th>
                <th>Percentage</th>
                <th>Letter Grade</th>
                <th>Faculty Remarks</th>
              </tr>
            </thead>
            <tbody>
              ${results.map(r => `
                <tr>
                  <td><strong>${r.subject}</strong></td>
                  <td>${r.maxMarks}</td>
                  <td style="font-weight:700; color:var(--primary-color);">${r.marksObtained}</td>
                  <td>${Math.round((r.marksObtained / r.maxMarks) * 100)}%</td>
                  <td><span class="badge ${r.grade.includes('A') ? 'badge-success' : 'badge-warning'}">${r.grade}</span></td>
                  <td style="font-size:0.78rem; color:#64748b;">${r.remarks}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  showEnterMarksModal() {
    let existing = document.getElementById('enter-marks-modal');
    if (existing) existing.remove();

    const students = window.db.getStudents();

    const modal = document.createElement('div');
    modal.id = 'enter-marks-modal';
    modal.className = 'modal-overlay active';
    modal.innerHTML = `
      <div class="modal-dialog">
        <div class="modal-header">
          <h3 class="modal-title">Record Student Examination Marks</h3>
          <button class="modal-close-btn" onclick="document.getElementById('enter-marks-modal').remove()">✕</button>
        </div>
        <form onsubmit="window.examsPage.handleMarksSubmit(event)">
          <div class="modal-body">
            <div class="form-grid">
              <div class="form-group col-full">
                <label class="form-label">Student</label>
                <select id="marks-stu-id" class="form-select" required>
                  ${students.map(s => `<option value="${s.id}">${s.name} (${s.rollNo}) - Class ${s.class}-${s.section}</option>`).join('')}
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">Subject</label>
                <select id="marks-subject" class="form-select" required>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Physics">Physics</option>
                  <option value="English">English</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Urdu">Urdu</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">Total Marks</label>
                <input type="number" id="marks-max" class="form-input" value="100" required />
              </div>

              <div class="form-group">
                <label class="form-label">Marks Obtained</label>
                <input type="number" id="marks-obtained" class="form-input" placeholder="e.g. 92" required />
              </div>

              <div class="form-group col-full">
                <label class="form-label">Teacher Assessment Remarks</label>
                <input type="text" id="marks-remarks" class="form-input" placeholder="e.g. Shows exceptional grasping of core concepts." required />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline btn-sm" onclick="document.getElementById('enter-marks-modal').remove()">Cancel</button>
            <button type="submit" class="btn btn-primary btn-sm">Save Marks</button>
          </div>
        </form>
      </div>
    `;
    document.body.appendChild(modal);
  }

  handleMarksSubmit(e) {
    e.preventDefault();
    const studentId = document.getElementById('marks-stu-id').value;
    const max = parseFloat(document.getElementById('marks-max').value);
    const obtained = parseFloat(document.getElementById('marks-obtained').value);
    const pct = (obtained / max) * 100;

    let grade = 'F';
    if (pct >= 90) grade = 'A+';
    else if (pct >= 80) grade = 'A';
    else if (pct >= 70) grade = 'B';
    else if (pct >= 60) grade = 'C';

    const data = {
      studentId: studentId,
      examId: this.selectedExam,
      subject: document.getElementById('marks-subject').value,
      maxMarks: max,
      marksObtained: obtained,
      grade: grade,
      remarks: document.getElementById('marks-remarks').value
    };

    window.db.saveResult(data);
    document.getElementById('enter-marks-modal').remove();
    window.showToast('Examination marks logged successfully!', 'success');
    window.router.renderCurrentPage();
  }

  printReportCard(studentId) {
    const student = window.db.getStudentById(studentId);
    if (!student) return;

    const results = window.db.getResults().filter(r => r.studentId === student.id);
    const cfg = window.db.getConfig();

    let existing = document.getElementById('report-card-modal');
    if (existing) existing.remove();

    const totalMarks = results.reduce((a, b) => a + b.maxMarks, 0);
    const obtainedMarks = results.reduce((a, b) => a + b.marksObtained, 0);
    const overallPct = totalMarks > 0 ? Math.round((obtainedMarks / totalMarks) * 100) : 0;
    const finalGrade = overallPct >= 90 ? 'A+' : overallPct >= 80 ? 'A' : overallPct >= 70 ? 'B' : 'C';

    const modal = document.createElement('div');
    modal.id = 'report-card-modal';
    modal.className = 'modal-overlay active';
    modal.innerHTML = `
      <div class="modal-dialog" style="max-width:720px;">
        <div class="modal-body" style="background:#fff; padding:2.2rem; border-radius:var(--radius-xl); position:relative;">
          <!-- Transparent Watermark -->
          <div style="position:absolute; inset:0; display:flex; align-items:center; justify-content:center; opacity:0.04; pointer-events:none;">
            <img src="${cfg.logoUrl}" style="width:340px; height:340px; object-fit:contain;" />
          </div>

          <!-- School Header -->
          <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:3px double var(--primary-color); padding-bottom:1.25rem; margin-bottom:1.5rem;">
            <div>
              <h2 style="color:var(--primary-color); font-size:1.6rem; font-weight:800;">${cfg.schoolName}</h2>
              <div style="font-size:0.85rem; color:#d4af37; font-weight:700;">${cfg.tagline}</div>
              <div style="font-size:0.75rem; color:#64748b;">Academic Session ${cfg.academicYear} • Official Assessment Dossier</div>
            </div>
            <img src="${cfg.logoUrl}" style="width:75px; height:75px; object-fit:contain;" />
          </div>

          <!-- Student Profile Strip -->
          <div style="display:grid; grid-template-columns:2fr 1fr; gap:1rem; background:#f8fafc; padding:1rem; border-radius:12px; margin-bottom:1.5rem; font-size:0.86rem; border:1px solid #e2e8f0;">
            <div>
              <div>Candidate: <strong>${student.name}</strong></div>
              <div>Roll Identifier: <code>${student.rollNo}</code></div>
              <div>Guardian: ${student.parentName}</div>
            </div>
            <div>
              <div>Class & Section: <strong>Class ${student.class}-${student.section}</strong></div>
              <div>Attendance: <strong>${student.attendancePercent}%</strong></div>
              <div>Conduct: <strong>Exemplary</strong></div>
            </div>
          </div>

          <!-- Grades Table -->
          <table class="data-table" style="margin-bottom:1.5rem;">
            <thead>
              <tr>
                <th>Subject Title</th>
                <th>Total</th>
                <th>Obtained</th>
                <th>Grade</th>
                <th>Evaluation</th>
              </tr>
            </thead>
            <tbody>
              ${results.map(r => `
                <tr>
                  <td><strong>${r.subject}</strong></td>
                  <td>${r.maxMarks}</td>
                  <td style="font-weight:700; color:var(--primary-color);">${r.marksObtained}</td>
                  <td><span class="badge ${r.grade.includes('A') ? 'badge-success' : 'badge-warning'}">${r.grade}</span></td>
                  <td style="font-size:0.78rem; color:#64748b;">${r.remarks}</td>
                </tr>
              `).join('')}
            </tbody>
            <tfoot>
              <tr style="background:#f1f5f9; font-weight:800;">
                <td>AGGREGATE TOTAL</td>
                <td>${totalMarks}</td>
                <td>${obtainedMarks} (${overallPct}%)</td>
                <td colspan="2"><span class="badge badge-success" style="font-size:0.85rem;">FINAL GRADE: ${finalGrade}</span></td>
              </tr>
            </tfoot>
          </table>

          <!-- Signatures -->
          <div style="display:flex; justify-content:space-between; margin-top:2.5rem; padding-top:1.5rem; border-top:1px solid #cbd5e1; font-size:0.8rem; color:#475569;">
            <div style="text-align:center;">
              <div>____________________</div>
              <div style="margin-top:4px; font-weight:600;">Class Teacher</div>
            </div>
            <div style="text-align:center;">
              <div>____________________</div>
              <div style="margin-top:4px; font-weight:600;">Controller of Examinations</div>
            </div>
            <div style="text-align:center;">
              <div>____________________</div>
              <div style="margin-top:4px; font-weight:600;">Principal / Dean</div>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn btn-outline btn-sm" onclick="document.getElementById('report-card-modal').remove()">Close</button>
          <button class="btn btn-primary btn-sm" onclick="window.print()">🖨️ Print Official Certificate</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }
}

window.examsPage = new ExamsPage();
