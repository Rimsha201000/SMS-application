/**
 * Beacon Valley School - EduBloom LMS
 * Interactive Master Timetable & Class Schedules
 */

class TimetablePage {
  constructor() {
    this.selectedClass = '8-A';
  }

  render() {
    const timetable = window.db.getTimetable(this.selectedClass);
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

    return `
      <div class="ui-card">
        <div class="ui-card-header">
          <div>
            <h2 class="ui-card-title">
              <span>⏰</span>
              <span>Campus Master Timetable</span>
            </h2>
            <p style="font-size:0.78rem; color:var(--text-muted); margin-top:2px;">
              Weekly pedagogical period allocations, faculty rooms, and bell schedules
            </p>
          </div>

          <div class="ui-card-actions">
            <select class="form-select" style="width:auto;" onchange="window.timetablePage.selectedClass = this.value; window.router.renderCurrentPage();">
              <option value="8-A" ${this.selectedClass === '8-A' ? 'selected' : ''}>Class 8 - Section A</option>
              <option value="9-A" ${this.selectedClass === '9-A' ? 'selected' : ''}>Class 9 - Section A</option>
              <option value="7-A" ${this.selectedClass === '7-A' ? 'selected' : ''}>Class 7 - Section A</option>
            </select>
          </div>
        </div>

        <!-- Weekly Timetable Cards by Day -->
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:1rem;">
          ${days.map(day => {
            const periodsForDay = timetable.filter(t => t.day === day);

            return `
              <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:var(--radius-lg); padding:1rem; display:flex; flex-direction:column; gap:0.6rem;">
                <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid var(--secondary-color); padding-bottom:6px;">
                  <h3 style="font-size:1.05rem; font-weight:800; color:var(--primary-color);">${day}</h3>
                  <span class="badge badge-gold" style="font-size:0.65rem;">${periodsForDay.length} Periods</span>
                </div>

                <div style="display:flex; flex-direction:column; gap:0.5rem; margin-top:4px;">
                  ${periodsForDay.length === 0 ? `
                    <div style="font-size:0.78rem; color:#94a3b8; padding:0.5rem; text-align:center;">No sessions scheduled.</div>
                  ` : periodsForDay.map(p => `
                    <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:var(--radius-md); padding:0.75rem; box-shadow:0 1px 3px rgba(0,0,0,0.03);">
                      <div style="font-size:0.72rem; color:var(--text-muted); font-weight:700;">${p.period}</div>
                      <h4 style="font-size:0.92rem; font-weight:800; color:var(--text-main); margin:2px 0;">${p.subject}</h4>
                      <div style="font-size:0.75rem; color:#64748b;">👨‍🏫 ${p.teacher}</div>
                      <div style="font-size:0.7rem; color:#d97706; font-weight:600; margin-top:2px;">📍 ${p.room}</div>
                    </div>
                  `).join('')}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }
}

window.timetablePage = new TimetablePage();
