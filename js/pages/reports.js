/**
 * Beacon Valley School - EduBloom LMS
 * Analytics & Reports Module
 */

class ReportsPage {
  render() {
    const students = window.db.getStudents();
    const fees = window.db.getFees();
    const classes = window.db.getClasses();

    const totalCollected = fees.reduce((acc, f) => acc + f.paidAmount, 0);
    const totalPending = fees.reduce((acc, f) => acc + f.dueAmount, 0);
    const paidPct = Math.round((totalCollected / (totalCollected + totalPending)) * 100);

    return `
      <div class="ui-card">
        <div class="ui-card-header">
          <div>
            <h2 class="ui-card-title">
              <span>📈</span>
              <span>Institutional Analytics & Audits</span>
            </h2>
            <p style="font-size:0.78rem; color:var(--text-muted); margin-top:2px;">
              Visual analytics across student demographics, attendance trends, and financial collections
            </p>
          </div>

          <div class="ui-card-actions">
            <button class="btn btn-outline btn-sm" onclick="window.print()">
              🖨️ Export PDF Audit
            </button>
          </div>
        </div>

        <!-- Visual Analytics Grid -->
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(320px, 1fr)); gap:1.5rem; margin-bottom:1.5rem;">
          <!-- Financial Recovery Chart -->
          <div style="background:#ffffff; border:1px solid var(--border-subtle); border-radius:var(--radius-lg); padding:1.25rem; box-shadow:var(--shadow-sm);">
            <h3 style="font-size:1.05rem; font-weight:700; margin-bottom:0.75rem; color:var(--primary-color);">
              💳 Fee Realization Audit
            </h3>
            <div style="display:flex; align-items:center; gap:1.25rem;">
              <!-- Donut Chart representation -->
              <div style="width:110px; height:110px; border-radius:50%; background:conic-gradient(#10b981 0% ${paidPct}%, #ef4444 ${paidPct}% 100%); display:flex; align-items:center; justify-content:center; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
                <div style="width:75px; height:75px; background:#fff; border-radius:50%; display:flex; align-items:center; justify-content:center; flex-direction:column;">
                  <strong style="font-size:1.15rem; color:#10b981;">${paidPct}%</strong>
                  <span style="font-size:0.6rem; color:#64748b; text-transform:uppercase;">Recovered</span>
                </div>
              </div>

              <div style="font-size:0.83rem; display:flex; flex-direction:column; gap:6px;">
                <div><span style="color:#10b981;">■</span> Realized: <strong>$${totalCollected.toLocaleString()}</strong></div>
                <div><span style="color:#ef4444;">■</span> Outstanding: <strong>$${totalPending.toLocaleString()}</strong></div>
                <div style="font-size:0.75rem; color:#64748b; margin-top:4px;">Total Billing Volume: $${(totalCollected + totalPending).toLocaleString()}</div>
              </div>
            </div>
          </div>

          <!-- Class-wise Attendance Distribution -->
          <div style="background:#ffffff; border:1px solid var(--border-subtle); border-radius:var(--radius-lg); padding:1.25rem; box-shadow:var(--shadow-sm);">
            <h3 style="font-size:1.05rem; font-weight:700; margin-bottom:0.75rem; color:var(--primary-color);">
              📅 Class-wise Attendance Compliance
            </h3>
            <div style="display:flex; flex-direction:column; gap:0.65rem;">
              ${classes.map(c => {
                const classNum = c.name.replace('Class ', '');
                const cStudents = students.filter(s => s.class === classNum);
                const avgAtt = cStudents.length > 0 ? Math.round(cStudents.reduce((a, b) => a + b.attendancePercent, 0) / cStudents.length) : 88;

                return `
                  <div>
                    <div style="display:flex; justify-content:space-between; font-size:0.8rem; margin-bottom:2px;">
                      <strong>${c.name}</strong>
                      <span style="font-weight:700; color:${avgAtt >= 75 ? '#10b981' : '#ef4444'};">${avgAtt}%</span>
                    </div>
                    <div style="height:7px; background:#e2e8f0; border-radius:4px; overflow:hidden;">
                      <div style="width:${avgAtt}%; height:100%; background:${avgAtt >= 75 ? '#10b981' : '#ef4444'};"></div>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </div>

        <!-- Students Master Summary Table -->
        <h3 style="font-size:1.1rem; font-weight:800; color:var(--primary-color); margin-bottom:0.75rem;">
          Enrollment & Compliance Audit
        </h3>
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Roll No</th>
                <th>Student</th>
                <th>Class</th>
                <th>Guardian</th>
                <th>Attendance %</th>
                <th>Fee Status</th>
              </tr>
            </thead>
            <tbody>
              ${students.map(s => `
                <tr>
                  <td><code>${s.rollNo}</code></td>
                  <td><strong>${s.name}</strong></td>
                  <td>Class ${s.class}-${s.section}</td>
                  <td>${s.parentName} (${s.parentContact})</td>
                  <td style="font-weight:700; color:${s.attendancePercent >= 75 ? '#10b981' : '#ef4444'};">${s.attendancePercent}%</td>
                  <td><span class="badge ${s.feeStatus === 'Paid' ? 'badge-success' : 'badge-danger'}">${s.feeStatus}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }
}

window.reportsPage = new ReportsPage();
