/**
 * Beacon Valley School - EduBloom LMS
 * Dynamic Dashboard Page (Role-tailored for Owner, Admin, Teacher, Parent, Student)
 */

class DashboardPage {
  render() {
    const user = window.auth.getUser();
    const cfg = window.db.getConfig();
    const role = user ? user.role : 'owner';

    // Different dashboard views per role
    if (role === 'student') return this.renderStudentDashboard(user, cfg);
    if (role === 'parent') return this.renderParentDashboard(user, cfg);
    if (role === 'teacher') return this.renderTeacherDashboard(user, cfg);

    // Default: Admin & Owner Dashboard
    return this.renderAdminDashboard(user, cfg);
  }

  // Common Welcome Hero with Animated Typography & Mascot
  renderWelcomeHero(user, cfg) {
    const roleTagMap = {
      owner: 'Founder & Super Admin Console',
      admin: 'Academic Administration',
      teacher: 'Faculty Teaching Portal',
      parent: 'Parent & Guardian Portal',
      student: 'Student Learning Workspace'
    };

    const mascotQuotes = {
      owner: 'All campuses operating smoothly today!',
      admin: 'Attendance synchronized across all grades!',
      teacher: 'Ready to inspire bright minds today?',
      parent: 'Stay connected with your child\'s success!',
      student: 'Every day is a chance to learn something new!'
    };

    return `
      <div class="welcome-hero-card">
        <div class="welcome-content">
          <div class="welcome-pill">
            <span>✨</span>
            <span>${roleTagMap[user.role] || 'Beacon Valley Portal'}</span>
          </div>
          <h1 class="welcome-title-animated">
            Welcome to ${cfg.schoolName}
          </h1>
          <div class="welcome-subtitle">
            <span>📖</span>
            <span>${cfg.tagline}</span>
            <span style="opacity:0.4;">•</span>
            <span style="font-size:0.85rem; color:#fae8a4;">Logged in as ${user.name}</span>
          </div>

          <div class="welcome-actions">
            ${user.role === 'owner' || user.role === 'admin' ? `
              <button class="btn btn-gold btn-sm" onclick="window.router.navigate('/students')">
                <span>➕</span> Add New Student
              </button>
              <button class="btn btn-primary btn-sm" onclick="window.router.navigate('/attendance')">
                <span>📅</span> Daily Attendance
              </button>
            ` : ''}
            ${user.role === 'teacher' ? `
              <button class="btn btn-gold btn-sm" onclick="window.router.navigate('/attendance')">
                <span>📅</span> Mark Class 8-A Attendance
              </button>
              <button class="btn btn-primary btn-sm" onclick="window.router.navigate('/homework')">
                <span>📝</span> Create Assignment
              </button>
            ` : ''}
            ${user.role === 'parent' ? `
              <button class="btn btn-gold btn-sm" onclick="window.router.navigate('/fees')">
                <span>💳</span> View Fee Vouchers
              </button>
              <button class="btn btn-primary btn-sm" onclick="window.router.navigate('/exams')">
                <span>🏆</span> Student Report Cards
              </button>
            ` : ''}
            ${user.role === 'student' ? `
              <button class="btn btn-gold btn-sm" onclick="window.router.navigate('/homework')">
                <span>📝</span> My Homework Tasks
              </button>
              <button class="btn btn-primary btn-sm" onclick="window.router.navigate('/timetable')">
                <span>⏰</span> View Schedule
              </button>
            ` : ''}
            <button class="btn btn-outline btn-sm" style="background:rgba(255,255,255,0.15); border-color:rgba(255,255,255,0.3); color:#fff;" onclick="window.aiAssistant.toggleWindow()">
              <span>🤖</span> Ask Sparky AI
            </button>
          </div>
        </div>

        <!-- Mascot Illustration in Corner -->
        <div class="welcome-mascot-container">
          <div class="mascot-avatar-frame">
            <div class="mascot-svg-wrap">
              ${MASCOT_SCHOOL_SVG}
            </div>
          </div>
          <div class="mascot-speech-bubble">
            “${mascotQuotes[user.role] || 'Welcome to Beacon Valley!'}”
          </div>
        </div>
      </div>
    `;
  }

  // 1. ADMIN & OWNER DASHBOARD
  renderAdminDashboard(user, cfg) {
    const students = window.db.getStudents();
    const deletedStudents = window.db.getDeletedStudents();
    const teachers = window.db.getTeachers();
    const classes = window.db.getClasses();
    const fees = window.db.getFees();
    const homework = window.db.getHomework();
    const announcements = window.db.getAnnouncements();

    // Financial Metrics
    const totalCollected = fees.reduce((sum, f) => sum + f.paidAmount, 0);
    const totalPending = fees.reduce((sum, f) => sum + f.dueAmount, 0);

    // Today's attendance quick stats
    const todayAbsentCount = 2; // Zaid Khan & Bilal Hassan
    const attendanceRate = 92;

    return `
      ${this.renderWelcomeHero(user, cfg)}

      <!-- Bubble Cards Grid -->
      <div class="stats-bubble-grid">
        <div class="stat-bubble-card animate-stagger-1">
          <div class="stat-bubble-icon bg-icon-navy">🎓</div>
          <div class="stat-bubble-info">
            <div class="stat-bubble-label">Enrolled Students</div>
            <div class="stat-bubble-value">${students.length}</div>
            <div class="stat-bubble-desc">
              <span style="color:#10b981;">● Active</span> • <a href="javascript:void(0)" onclick="window.router.navigate('/recycle')" style="color:var(--text-muted);">${deletedStudents.length} in Recycle Bin</a>
            </div>
          </div>
        </div>

        <div class="stat-bubble-card animate-stagger-2">
          <div class="stat-bubble-icon bg-icon-gold">👩‍🏫</div>
          <div class="stat-bubble-info">
            <div class="stat-bubble-label">Faculty Staff</div>
            <div class="stat-bubble-value">${teachers.length}</div>
            <div class="stat-bubble-desc">Across all academic tiers</div>
          </div>
        </div>

        <div class="stat-bubble-card animate-stagger-3">
          <div class="stat-bubble-icon bg-icon-blue">📅</div>
          <div class="stat-bubble-info">
            <div class="stat-bubble-label">Today's Attendance</div>
            <div class="stat-bubble-value">${attendanceRate}%</div>
            <div class="stat-bubble-desc">
              <span style="color:#ef4444; font-weight:700;">${todayAbsentCount} Absent</span> today (Oct 08)
            </div>
          </div>
        </div>

        <div class="stat-bubble-card animate-stagger-4">
          <div class="stat-bubble-icon bg-icon-green">💳</div>
          <div class="stat-bubble-info">
            <div class="stat-bubble-label">Fee Collection</div>
            <div class="stat-bubble-value">$${totalCollected.toLocaleString()}</div>
            <div class="stat-bubble-desc">
              Pending: <strong style="color:#f59e0b;">$${totalPending.toLocaleString()}</strong>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Dashboard Content Grid -->
      <div class="dashboard-grid">
        <!-- Left Column: Core Activities -->
        <div>
          <!-- Quick Absentee Alert Card -->
          <div class="ui-card" style="border-left: 4px solid #ef4444;">
            <div class="ui-card-header">
              <h3 class="ui-card-title">
                <span>⚠️</span>
                <span>Today's Absentee List (Oct 08, 2026)</span>
              </h3>
              <button class="btn btn-outline btn-sm" onclick="window.router.navigate('/attendance')">Full Attendance ➔</button>
            </div>
            <div style="display:flex; flex-direction:column; gap:0.6rem;">
              <div style="display:flex; align-items:center; justify-content:space-between; background:#fff1f2; padding:0.75rem 1rem; border-radius:var(--radius-md);">
                <div style="display:flex; align-items:center; gap:0.75rem;">
                  <span style="font-size:1.25rem;">👦</span>
                  <div>
                    <strong>Zaid Khan</strong> (Roll BVS-0802) • Class 8-A
                    <div style="font-size:0.75rem; color:#64748b;">Guardian: Arshad Khan (+92 321 4567890)</div>
                  </div>
                </div>
                <span class="badge badge-danger">Unexcused</span>
              </div>

              <div style="display:flex; align-items:center; justify-content:space-between; background:#fff1f2; padding:0.75rem 1rem; border-radius:var(--radius-md);">
                <div style="display:flex; align-items:center; gap:0.75rem;">
                  <span style="font-size:1.25rem;">👦</span>
                  <div>
                    <strong>Bilal Hassan</strong> (Roll BVS-0803) • Class 8-A
                    <div style="font-size:0.75rem; color:#64748b;">Guardian: Hassan Raza (+92 312 3344556)</div>
                  </div>
                </div>
                <span class="badge badge-danger">Unexcused</span>
              </div>
            </div>
          </div>

          <!-- Recent Students Table -->
          <div class="ui-card">
            <div class="ui-card-header">
              <h3 class="ui-card-title">
                <span>🎓</span>
                <span>Active Student Roster</span>
              </h3>
              <button class="btn btn-outline btn-sm" onclick="window.router.navigate('/students')">View All (${students.length})</button>
            </div>
            <div class="table-responsive">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>Class</th>
                    <th>Roll No</th>
                    <th>Attendance</th>
                    <th>Fee Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  ${students.slice(0, 5).map(s => `
                    <tr>
                      <td>
                        <div class="user-cell">
                          <img src="${s.photo}" alt="${s.name}" class="user-cell-img" onerror="this.src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'"/>
                          <div>
                            <div class="user-cell-name">${s.name}</div>
                            <div class="user-cell-sub">Parent: ${s.parentName}</div>
                          </div>
                        </div>
                      </td>
                      <td><strong>Class ${s.class}-${s.section}</strong></td>
                      <td><code>${s.rollNo}</code></td>
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
                      <td>
                        <button class="btn btn-outline btn-sm" onclick="window.studentsPage.viewProfile('${s.id}')">Profile</button>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Right Column: Campus Notices & Quick Actions -->
        <div>
          <!-- Quick Action Shortcuts -->
          <div class="ui-card">
            <div class="ui-card-header">
              <h3 class="ui-card-title">⚡ Quick Management</h3>
            </div>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.6rem;">
              <button class="btn btn-outline btn-sm" style="justify-content:flex-start;" onclick="window.studentsPage.showAddModal()">
                <span>➕ Add Student</span>
              </button>
              <button class="btn btn-outline btn-sm" style="justify-content:flex-start;" onclick="window.router.navigate('/fees')">
                <span>💳 Record Fee</span>
              </button>
              <button class="btn btn-outline btn-sm" style="justify-content:flex-start;" onclick="window.router.navigate('/homework')">
                <span>📝 New Homework</span>
              </button>
              <button class="btn btn-outline btn-sm" style="justify-content:flex-start;" onclick="window.router.navigate('/recycle')">
                <span>♻️ Recycle Bin</span>
              </button>
            </div>
          </div>

          <!-- School Announcements Feed -->
          <div class="ui-card">
            <div class="ui-card-header">
              <h3 class="ui-card-title">
                <span>📢</span>
                <span>Campus Circulars</span>
              </h3>
              <button class="btn btn-outline btn-sm" onclick="window.router.navigate('/announcements')">All Notices</button>
            </div>
            <div style="display:flex; flex-direction:column; gap:0.75rem;">
              ${announcements.slice(0, 3).map(a => `
                <div style="background:#f8fafc; border-radius:var(--radius-md); padding:0.85rem; border:1px solid #e2e8f0;">
                  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                    <span class="badge badge-gold" style="font-size:0.68rem;">${a.category}</span>
                    <span style="font-size:0.7rem; color:#94a3b8;">${a.date}</span>
                  </div>
                  <h4 style="font-size:0.88rem; font-weight:700; margin-bottom:4px;">${a.title}</h4>
                  <p style="font-size:0.76rem; color:#64748b; line-height:1.4;">${a.content.substring(0, 95)}...</p>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // 2. TEACHER DASHBOARD
  renderTeacherDashboard(user, cfg) {
    const assigned = user.assignedClasses || ['8-A', '9-A', '7-A'];
    const students = window.db.getStudents().filter(s => assigned.includes(`${s.class}-${s.section}`));
    const homework = window.db.getHomework().filter(h => assigned.includes(`${h.class}-${h.section}`) || h.teacher === user.name);

    return `
      ${this.renderWelcomeHero(user, cfg)}

      <div class="stats-bubble-grid">
        <div class="stat-bubble-card">
          <div class="stat-bubble-icon bg-icon-navy">🏫</div>
          <div class="stat-bubble-info">
            <div class="stat-bubble-label">Assigned Classes</div>
            <div class="stat-bubble-value">${assigned.length}</div>
            <div class="stat-bubble-desc">${assigned.join(', ')}</div>
          </div>
        </div>

        <div class="stat-bubble-card">
          <div class="stat-bubble-icon bg-icon-blue">🎓</div>
          <div class="stat-bubble-info">
            <div class="stat-bubble-label">Enrolled Students</div>
            <div class="stat-bubble-value">${students.length}</div>
            <div class="stat-bubble-desc">Under your supervision</div>
          </div>
        </div>

        <div class="stat-bubble-card">
          <div class="stat-bubble-icon bg-icon-gold">📝</div>
          <div class="stat-bubble-info">
            <div class="stat-bubble-label">Active Homework</div>
            <div class="stat-bubble-value">${homework.length}</div>
            <div class="stat-bubble-desc">In review pipeline</div>
          </div>
        </div>
      </div>

      <div class="dashboard-grid">
        <div class="ui-card">
          <div class="ui-card-header">
            <h3 class="ui-card-title">📝 My Assignments</h3>
            <button class="btn btn-gold btn-sm" onclick="window.router.navigate('/homework')">➕ Add Homework</button>
          </div>
          <div style="display:flex; flex-direction:column; gap:0.75rem;">
            ${homework.map(h => `
              <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:var(--radius-md); padding:1rem;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <strong>${h.title}</strong>
                  <span class="badge badge-info">Due ${h.dueDate}</span>
                </div>
                <div style="font-size:0.78rem; color:#64748b; margin-top:4px;">
                  Class ${h.class}-${h.section} • Submissions: <strong>${h.totalSubmissions} / ${h.totalAssigned}</strong>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="ui-card">
          <div class="ui-card-header">
            <h3 class="ui-card-title">⏰ Today's Teaching Periods</h3>
          </div>
          <div style="display:flex; flex-direction:column; gap:0.5rem; font-size:0.85rem;">
            <div style="padding:8px; background:#f1f5f9; border-radius:8px;">
              <strong>08:30 - 09:15</strong> • Mathematics (Class 8-A) • Room 201
            </div>
            <div style="padding:8px; background:#f1f5f9; border-radius:8px;">
              <strong>11:15 - 12:00</strong> • Advanced Algebra (Class 9-A) • Room 202
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // 3. PARENT DASHBOARD
  renderParentDashboard(user, cfg) {
    const activeChildId = user.activeChildId || user.childrenIds[0];
    const child = window.db.getStudentById(activeChildId) || window.db.getStudents()[0];
    const childFees = window.db.getFees().filter(f => f.studentId === child.id);
    const childResults = window.db.getResults().filter(r => r.studentId === child.id);

    return `
      ${this.renderWelcomeHero(user, cfg)}

      <!-- Child Selector Tabs -->
      <div style="display:flex; align-items:center; gap:0.75rem; margin-bottom:1.5rem; background:#fff; padding:0.75rem 1rem; border-radius:var(--radius-lg); border:1px solid var(--border-subtle);">
        <span style="font-weight:700; font-size:0.86rem; color:var(--text-muted);">Switch Child Profile:</span>
        ${user.childrenIds.map(id => {
          const c = window.db.getStudentById(id);
          if (!c) return '';
          const isSelected = c.id === child.id;
          return `
            <button class="btn btn-sm ${isSelected ? 'btn-primary' : 'btn-outline'}" onclick="window.auth.switchParentChild('${c.id}'); window.router.navigate('/dashboard');">
              ${c.gender === 'Female' ? '👧' : '👦'} ${c.name} (Class ${c.class}-${c.section})
            </button>
          `;
        }).join('')}
      </div>

      <!-- Child Performance Summary -->
      <div class="stats-bubble-grid">
        <div class="stat-bubble-card">
          <div class="stat-bubble-icon bg-icon-navy">🎓</div>
          <div class="stat-bubble-info">
            <div class="stat-bubble-label">Roll Number</div>
            <div class="stat-bubble-value" style="font-size:1.3rem;">${child.rollNo}</div>
            <div class="stat-bubble-desc">Class ${child.class}-${child.section} Scholar</div>
          </div>
        </div>

        <div class="stat-bubble-card">
          <div class="stat-bubble-icon ${child.attendancePercent >= 75 ? 'bg-icon-green' : 'bg-icon-rose'}">📅</div>
          <div class="stat-bubble-info">
            <div class="stat-bubble-label">Attendance Rate</div>
            <div class="stat-bubble-value" style="color:${child.attendancePercent >= 75 ? '#10b981' : '#ef4444'};">${child.attendancePercent}%</div>
            <div class="stat-bubble-desc">${child.attendancePercent >= 75 ? 'Satisfactory attendance' : '⚠️ Action required'}</div>
          </div>
        </div>

        <div class="stat-bubble-card">
          <div class="stat-bubble-icon ${child.feeStatus === 'Paid' ? 'bg-icon-green' : 'bg-icon-rose'}">💳</div>
          <div class="stat-bubble-info">
            <div class="stat-bubble-label">Fee Clearance</div>
            <div class="stat-bubble-value" style="font-size:1.3rem;">${child.feeStatus}</div>
            <div class="stat-bubble-desc">${childFees.length} voucher(s) logged</div>
          </div>
        </div>
      </div>

      <div class="dashboard-grid">
        <div class="ui-card">
          <div class="ui-card-header">
            <h3 class="ui-card-title">🏆 Term Examination Performance</h3>
            <button class="btn btn-outline btn-sm" onclick="window.router.navigate('/exams')">Full Report Card</button>
          </div>
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Marks</th>
                  <th>Grade</th>
                  <th>Faculty Remarks</th>
                </tr>
              </thead>
              <tbody>
                ${childResults.map(r => `
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
        </div>

        <div class="ui-card">
          <div class="ui-card-header">
            <h3 class="ui-card-title">👨‍🏫 Class Teacher Contact</h3>
          </div>
          <p style="font-size:0.85rem; line-height:1.6; color:#475569;">
            Class Mentor: <strong>Ms. Ayesha Siddiqa</strong><br/>
            Email: <a href="mailto:ayesha.s@beaconvalleyschool.edu">ayesha.s@beaconvalleyschool.edu</a><br/>
            Consultation Hours: Mon - Thu (02:00 PM - 03:00 PM)
          </p>
        </div>
      </div>
    `;
  }

  // 4. STUDENT DASHBOARD
  renderStudentDashboard(user, cfg) {
    const student = window.db.getStudentById(user.studentId) || window.db.getStudents()[0];
    const timetable = window.db.getTimetable('8-A');
    const homework = window.db.getHomework().filter(h => h.class === '8');

    return `
      ${this.renderWelcomeHero(user, cfg)}

      <div class="stats-bubble-grid">
        <div class="stat-bubble-card">
          <div class="stat-bubble-icon bg-icon-navy">🎓</div>
          <div class="stat-bubble-info">
            <div class="stat-bubble-label">Cohort</div>
            <div class="stat-bubble-value" style="font-size:1.3rem;">Class 8-A</div>
            <div class="stat-bubble-desc">Roll No: <code>${student.rollNo}</code></div>
          </div>
        </div>

        <div class="stat-bubble-card">
          <div class="stat-bubble-icon bg-icon-green">📅</div>
          <div class="stat-bubble-info">
            <div class="stat-bubble-label">My Attendance</div>
            <div class="stat-bubble-value" style="color:#10b981;">${student.attendancePercent}%</div>
            <div class="stat-bubble-desc">Excellent record</div>
          </div>
        </div>

        <div class="stat-bubble-card">
          <div class="stat-bubble-icon bg-icon-gold">📝</div>
          <div class="stat-bubble-info">
            <div class="stat-bubble-label">Assignments Due</div>
            <div class="stat-bubble-value">${homework.length}</div>
            <div class="stat-bubble-desc">Check deadlines below</div>
          </div>
        </div>
      </div>

      <div class="dashboard-grid">
        <div class="ui-card">
          <div class="ui-card-header">
            <h3 class="ui-card-title">📝 Homework & Deadlines</h3>
            <button class="btn btn-outline btn-sm" onclick="window.router.navigate('/homework')">View All</button>
          </div>
          <div style="display:flex; flex-direction:column; gap:0.75rem;">
            ${homework.map(h => `
              <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:var(--radius-md); padding:0.9rem;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <strong>${h.title}</strong>
                  <span class="badge badge-info">Due ${h.dueDate}</span>
                </div>
                <p style="font-size:0.78rem; color:#64748b; margin-top:4px;">${h.description}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="ui-card">
          <div class="ui-card-header">
            <h3 class="ui-card-title">⏰ Weekly Schedule Preview</h3>
            <button class="btn btn-outline btn-sm" onclick="window.router.navigate('/timetable')">Full Timetable</button>
          </div>
          <div style="display:flex; flex-direction:column; gap:0.5rem; font-size:0.84rem;">
            ${timetable.slice(0, 4).map(t => `
              <div style="padding:6px 10px; background:#f1f5f9; border-radius:6px; display:flex; justify-content:space-between;">
                <span><strong>${t.period}</strong> • ${t.subject}</span>
                <span style="color:#64748b;">${t.room}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }
}

window.dashboardPage = new DashboardPage();
