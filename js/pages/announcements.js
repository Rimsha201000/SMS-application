/**
 * Beacon Valley School - EduBloom LMS
 * Announcements & Circulars Bulletin
 */

class AnnouncementsPage {
  constructor() {
    this.audienceFilter = 'all';
  }

  render() {
    const user = window.auth.getUser();
    const canCreate = window.auth.isAdminOrOwner() || user.role === 'teacher';

    const announcements = window.db.getAnnouncements();
    const filtered = announcements.filter(a => {
      if (this.audienceFilter === 'all') return true;
      return a.audience === this.audienceFilter || a.audience === 'All';
    });

    return `
      <div class="ui-card">
        <div class="ui-card-header">
          <div>
            <h2 class="ui-card-title">
              <span>📢</span>
              <span>School Circulars & Announcements</span>
            </h2>
            <p style="font-size:0.78rem; color:var(--text-muted); margin-top:2px;">
              Campus bulletins, parent-teacher briefings, and institutional notices
            </p>
          </div>

          <div class="ui-card-actions">
            ${canCreate ? `
              <button class="btn btn-primary btn-sm" onclick="window.announcementsPage.showAddModal()">
                <span>➕</span> Post Notice
              </button>
            ` : ''}
          </div>
        </div>

        <!-- Filter -->
        <div style="display:flex; gap:0.75rem; margin-bottom:1.5rem;">
          <button class="btn btn-sm ${this.audienceFilter === 'all' ? 'btn-primary' : 'btn-outline'}" onclick="window.announcementsPage.audienceFilter = 'all'; window.router.renderCurrentPage();">All Circulars</button>
          <button class="btn btn-sm ${this.audienceFilter === 'Parents' ? 'btn-primary' : 'btn-outline'}" onclick="window.announcementsPage.audienceFilter = 'Parents'; window.router.renderCurrentPage();">👨‍👩‍👧 For Parents</button>
          <button class="btn btn-sm ${this.audienceFilter === 'Students' ? 'btn-primary' : 'btn-outline'}" onclick="window.announcementsPage.audienceFilter = 'Students'; window.router.renderCurrentPage();">🎒 For Students</button>
          <button class="btn btn-sm ${this.audienceFilter === 'Teachers' ? 'btn-primary' : 'btn-outline'}" onclick="window.announcementsPage.audienceFilter = 'Teachers'; window.router.renderCurrentPage();">👩‍🏫 For Teachers</button>
        </div>

        <!-- List -->
        <div style="display:flex; flex-direction:column; gap:1rem;">
          ${filtered.map(a => `
            <div style="background:#ffffff; border:1px solid var(--border-subtle); border-radius:var(--radius-lg); padding:1.25rem; box-shadow:var(--shadow-sm); display:flex; flex-direction:column; gap:0.6rem;">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <div style="display:flex; align-items:center; gap:0.5rem;">
                  <span class="badge badge-gold">${a.category}</span>
                  <span class="badge" style="background:#f1f5f9; color:#475569;">Target: ${a.audience}</span>
                  ${a.pinned ? '<span style="font-size:0.75rem; color:#ef4444; font-weight:700;">📌 Pinned</span>' : ''}
                </div>
                <span style="font-size:0.75rem; color:#94a3b8;">📅 ${a.date}</span>
              </div>

              <h3 style="font-size:1.15rem; font-weight:800; color:var(--text-main);">${a.title}</h3>

              <p style="font-size:0.86rem; color:#475569; line-height:1.6;">${a.content}</p>

              <div style="font-size:0.75rem; color:#64748b; margin-top:0.5rem; display:flex; justify-content:space-between; align-items:center; border-top:1px solid #f8fafc; padding-top:0.5rem;">
                <span>Dispatched by: <strong>${a.author}</strong></span>
                ${canCreate ? `
                  <button class="btn btn-danger btn-sm" onclick="window.announcementsPage.confirmDelete('${a.id}')" title="Delete Circular">🗑️</button>
                ` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  showAddModal() {
    let existing = document.getElementById('announcement-modal');
    if (existing) existing.remove();

    const user = window.auth.getUser();

    const modal = document.createElement('div');
    modal.id = 'announcement-modal';
    modal.className = 'modal-overlay active';
    modal.innerHTML = `
      <div class="modal-dialog">
        <div class="modal-header">
          <h3 class="modal-title">Publish Campus Announcement</h3>
          <button class="modal-close-btn" onclick="document.getElementById('announcement-modal').remove()">✕</button>
        </div>
        <form onsubmit="window.announcementsPage.handleSubmit(event)">
          <div class="modal-body">
            <div class="form-grid">
              <div class="form-group col-full">
                <label class="form-label">Subject / Title <span class="req">*</span></label>
                <input type="text" id="anc-title" class="form-input" placeholder="e.g. Schedule for Autumn Mid-Term Revisions" required />
              </div>

              <div class="form-group">
                <label class="form-label">Target Audience</label>
                <select id="anc-aud" class="form-select">
                  <option value="All">All School Community</option>
                  <option value="Parents">Parents Only</option>
                  <option value="Students">Students Only</option>
                  <option value="Teachers">Faculty Staff</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">Category</label>
                <select id="anc-cat" class="form-select">
                  <option value="Academic">Academic Notice</option>
                  <option value="Event">Campus Event</option>
                  <option value="Holiday">School Holiday</option>
                  <option value="Administrative">Administrative</option>
                </select>
              </div>

              <div class="form-group col-full">
                <label class="form-label">Announcement Content <span class="req">*</span></label>
                <textarea id="anc-content" class="form-textarea" rows="4" placeholder="Draft notice details..." required></textarea>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline btn-sm" onclick="document.getElementById('announcement-modal').remove()">Cancel</button>
            <button type="submit" class="btn btn-primary btn-sm">Dispatch Circular</button>
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
      title: document.getElementById('anc-title').value,
      audience: document.getElementById('anc-aud').value,
      category: document.getElementById('anc-cat').value,
      content: document.getElementById('anc-content').value,
      author: user.name + ` (${user.roleTitle})`,
      date: new Date().toISOString().split('T')[0],
      pinned: false
    };

    window.db.saveAnnouncement(data);
    document.getElementById('announcement-modal').remove();
    window.showToast('Announcement published across target feeds!', 'success');
    window.router.renderCurrentPage();
  }

  confirmDelete(id) {
    window.showConfirmDialog({
      title: 'Delete Notice',
      message: 'Are you sure you want to remove this bulletin circular?',
      confirmText: 'Delete',
      isDanger: true,
      onConfirm: () => {
        window.db.deleteAnnouncement(id);
        window.showToast('Announcement removed', 'warning');
        window.router.renderCurrentPage();
      }
    });
  }
}

window.announcementsPage = new AnnouncementsPage();
