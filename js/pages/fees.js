/**
 * Beacon Valley School - EduBloom LMS
 * Tuition & Fee Management Module
 */

class FeesPage {
  constructor() {
    this.statusFilter = 'all';
    this.searchQuery = '';
  }

  render() {
    const user = window.auth.getUser();
    const role = user ? user.role : 'owner';

    // Parent & Student view only their fees
    let fees = window.db.getFees();
    if (role === 'parent') {
      const childrenIds = user.childrenIds || [];
      fees = fees.filter(f => childrenIds.includes(f.studentId));
    } else if (role === 'student') {
      fees = fees.filter(f => f.studentId === user.studentId);
    }

    // Filter
    const filtered = fees.filter(f => {
      const matchStatus = this.statusFilter === 'all' || f.status === this.statusFilter;
      const matchSearch = !this.searchQuery || 
        f.studentName.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
        f.id.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchStatus && matchSearch;
    });

    const totalCollected = fees.reduce((acc, f) => acc + f.paidAmount, 0);
    const totalPending = fees.reduce((acc, f) => acc + f.dueAmount, 0);
    const canManage = window.auth.isAdminOrOwner();

    return `
      <div class="ui-card">
        <div class="ui-card-header">
          <div>
            <h2 class="ui-card-title">
              <span>💳</span>
              <span>Tuition & Fee Ledger</span>
            </h2>
            <p style="font-size:0.78rem; color:var(--text-muted); margin-top:2px;">
              Manage fee vouchers, installment payments, receipts, and fiscal balances
            </p>
          </div>

          <div class="ui-card-actions">
            ${canManage ? `
              <button class="btn btn-primary btn-sm" onclick="window.feesPage.showCollectModal()">
                <span>➕</span> Record Fee Receipt
              </button>
            ` : ''}
          </div>
        </div>

        <!-- Metric Bubbles -->
        <div class="stats-bubble-grid" style="margin-bottom:1.5rem;">
          <div class="stat-bubble-card">
            <div class="stat-bubble-icon bg-icon-green">💰</div>
            <div class="stat-bubble-info">
              <div class="stat-bubble-label">Total Realized</div>
              <div class="stat-bubble-value">$${totalCollected.toLocaleString()}</div>
              <div class="stat-bubble-desc">Paid in full or partial payments</div>
            </div>
          </div>

          <div class="stat-bubble-card">
            <div class="stat-bubble-icon bg-icon-rose">⏳</div>
            <div class="stat-bubble-info">
              <div class="stat-bubble-label">Outstanding Balance</div>
              <div class="stat-bubble-value" style="color:#ef4444;">$${totalPending.toLocaleString()}</div>
              <div class="stat-bubble-desc">Pending & Overdue invoices</div>
            </div>
          </div>
        </div>

        <!-- Search & Filter Bar -->
        <div style="display:flex; flex-wrap:wrap; gap:0.75rem; margin-bottom:1.25rem;">
          <input 
            type="text" 
            class="form-input" 
            style="flex:1; min-width:200px;" 
            placeholder="Search by student name or voucher ID..."
            value="${this.searchQuery}"
            oninput="window.feesPage.searchQuery = this.value; window.router.renderCurrentPage();"
          />

          <select class="form-select" style="width:auto;" onchange="window.feesPage.statusFilter = this.value; window.router.renderCurrentPage();">
            <option value="all">All Payment Statuses</option>
            <option value="Paid" ${this.statusFilter === 'Paid' ? 'selected' : ''}>Paid</option>
            <option value="Pending" ${this.statusFilter === 'Pending' ? 'selected' : ''}>Pending</option>
            <option value="Partial" ${this.statusFilter === 'Partial' ? 'selected' : ''}>Partial</option>
            <option value="Overdue" ${this.statusFilter === 'Overdue' ? 'selected' : ''}>Overdue</option>
          </select>
        </div>

        <!-- Fees Table -->
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Voucher #</th>
                <th>Student</th>
                <th>Class</th>
                <th>Billing Cycle</th>
                <th>Total Bill</th>
                <th>Paid</th>
                <th>Balance Due</th>
                <th>Due Date</th>
                <th>Status</th>
                <th style="text-align:right;">Actions</th>
              </tr>
            </thead>
            <tbody>
              ${filtered.length === 0 ? `
                <tr><td colspan="10" style="text-align:center; padding:2.5rem; color:#94a3b8;">No fee records found.</td></tr>
              ` : filtered.map(f => `
                <tr>
                  <td><code>${f.id}</code></td>
                  <td><strong>${f.studentName}</strong></td>
                  <td>Class ${f.class}</td>
                  <td>${f.month}</td>
                  <td>$${f.totalAmount}</td>
                  <td style="color:#10b981; font-weight:700;">$${f.paidAmount}</td>
                  <td style="color:${f.dueAmount > 0 ? '#ef4444' : '#64748b'}; font-weight:700;">$${f.dueAmount}</td>
                  <td>${f.dueDate}</td>
                  <td>
                    <span class="badge ${f.status === 'Paid' ? 'badge-success' : f.status === 'Overdue' ? 'badge-danger' : 'badge-warning'}">
                      ${f.status}
                    </span>
                  </td>
                  <td style="text-align:right;">
                    <button class="btn btn-outline btn-sm" onclick="window.feesPage.printVoucher('${f.id}')" title="Print Fee Voucher">
                      🖨️ Receipt
                    </button>
                    ${canManage && f.status !== 'Paid' ? `
                      <button class="btn btn-primary btn-sm" onclick="window.feesPage.showCollectModal('${f.id}')" title="Collect Payment">
                        💵 Pay
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

  showCollectModal(existingFeeId = null) {
    let existing = document.getElementById('collect-fee-modal');
    if (existing) existing.remove();

    const students = window.db.getStudents();
    const fee = existingFeeId ? window.db.getFees().find(f => f.id === existingFeeId) : null;

    const modal = document.createElement('div');
    modal.id = 'collect-fee-modal';
    modal.className = 'modal-overlay active';
    modal.innerHTML = `
      <div class="modal-dialog">
        <div class="modal-header">
          <h3 class="modal-title">Record Fee Payment</h3>
          <button class="modal-close-btn" onclick="document.getElementById('collect-fee-modal').remove()">✕</button>
        </div>
        <form onsubmit="window.feesPage.handleCollectSubmit(event, '${existingFeeId || ''}')">
          <div class="modal-body">
            <div class="form-grid">
              <div class="form-group col-full">
                <label class="form-label">Student</label>
                <select id="fee-student-id" class="form-select" ${fee ? 'disabled' : ''} required>
                  ${students.map(s => `
                    <option value="${s.id}" ${fee && fee.studentId === s.id ? 'selected' : ''}>
                      ${s.name} (${s.rollNo}) - Class ${s.class}-${s.section}
                    </option>
                  `).join('')}
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">Billing Month</label>
                <input type="text" id="fee-month" class="form-input" value="${fee ? fee.month : 'October 2026'}" required />
              </div>
              <div class="form-group">
                <label class="form-label">Due Date</label>
                <input type="date" id="fee-due-date" class="form-input" value="${fee ? fee.dueDate : '2026-10-15'}" required />
              </div>

              <div class="form-group">
                <label class="form-label">Total Amount ($)</label>
                <input type="number" id="fee-total" class="form-input" value="${fee ? fee.totalAmount : 250}" required />
              </div>
              <div class="form-group">
                <label class="form-label">Amount Paid ($)</label>
                <input type="number" id="fee-paid" class="form-input" value="${fee ? fee.totalAmount : 250}" required />
              </div>

              <div class="form-group col-full">
                <label class="form-label">Payment Mode</label>
                <select id="fee-mode" class="form-select">
                  <option value="Cash">Cash Receipt</option>
                  <option value="Online Bank Transfer">Online Bank Transfer</option>
                  <option value="Cheque">Bank Cheque</option>
                  <option value="Card">Debit / Credit Card</option>
                </select>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline btn-sm" onclick="document.getElementById('collect-fee-modal').remove()">Cancel</button>
            <button type="submit" class="btn btn-primary btn-sm">Confirm & Issue Receipt</button>
          </div>
        </form>
      </div>
    `;
    document.body.appendChild(modal);
  }

  handleCollectSubmit(e, existingFeeId) {
    e.preventDefault();
    const studentSelect = document.getElementById('fee-student-id');
    const studentId = studentSelect ? studentSelect.value : '';
    const student = window.db.getStudentById(studentId) || window.db.getStudents()[0];

    const total = parseFloat(document.getElementById('fee-total').value);
    const paid = parseFloat(document.getElementById('fee-paid').value);
    const due = Math.max(0, total - paid);
    const status = due === 0 ? 'Paid' : (paid > 0 ? 'Partial' : 'Pending');

    const feeData = {
      id: existingFeeId || 'FEE-' + Math.floor(1000 + Math.random() * 9000),
      studentId: student.id,
      studentName: student.name,
      class: student.class,
      month: document.getElementById('fee-month').value,
      dueDate: document.getElementById('fee-due-date').value,
      totalAmount: total,
      paidAmount: paid,
      dueAmount: due,
      status: status,
      paymentDate: new Date().toISOString().split('T')[0],
      paymentMethod: document.getElementById('fee-mode').value
    };

    window.db.saveFee(feeData);
    // Update student fee status badge as well
    student.feeStatus = status;
    window.db.saveStudent(student);

    document.getElementById('collect-fee-modal').remove();
    window.showToast(`Receipt issued for ${student.name}!`, 'success');
    window.router.renderCurrentPage();
  }

  printVoucher(feeId) {
    const fee = window.db.getFees().find(f => f.id === feeId);
    if (!fee) return;

    const cfg = window.db.getConfig();
    let existing = document.getElementById('voucher-print-modal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'voucher-print-modal';
    modal.className = 'modal-overlay active';
    modal.innerHTML = `
      <div class="modal-dialog" style="max-width:580px;">
        <div class="modal-body" style="background:#fff; padding:2rem; border-radius:var(--radius-xl); border:2px dashed #cbd5e1; position:relative;">
          <!-- Watermark inside voucher -->
          <div style="position:absolute; inset:0; display:flex; align-items:center; justify-content:center; opacity:0.04; pointer-events:none;">
            <img src="${cfg.logoUrl}" style="width:280px; height:280px; object-fit:contain;" />
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid var(--primary-color); padding-bottom:1rem; margin-bottom:1.25rem;">
            <div>
              <h2 style="color:var(--primary-color); font-size:1.4rem;">${cfg.schoolName}</h2>
              <div style="font-size:0.78rem; color:#64748b;">${cfg.address}</div>
              <div style="font-size:0.75rem; color:#64748b;">Phone: ${cfg.phone}</div>
            </div>
            <img src="${cfg.logoUrl}" style="width:65px; height:65px; object-fit:contain;" />
          </div>

          <div style="text-align:center; margin-bottom:1.25rem;">
            <h3 style="font-size:1.1rem; text-transform:uppercase; letter-spacing:0.05em; color:#0f172a;">Official Fee Payment Receipt</h3>
            <span class="badge ${fee.status === 'Paid' ? 'badge-success' : 'badge-danger'}">${fee.status}</span>
          </div>

          <table style="width:100%; font-size:0.86rem; margin-bottom:1.5rem; line-height:1.8;">
            <tr><td><strong>Voucher Number:</strong></td><td><code>${fee.id}</code></td></tr>
            <tr><td><strong>Student Name:</strong></td><td>${fee.studentName}</td></tr>
            <tr><td><strong>Class:</strong></td><td>Class ${fee.class}</td></tr>
            <tr><td><strong>Billing Month:</strong></td><td>${fee.month}</td></tr>
            <tr><td><strong>Total Amount:</strong></td><td>$${fee.totalAmount}</td></tr>
            <tr><td><strong>Amount Received:</strong></td><td style="color:#10b981; font-weight:700;">$${fee.paidAmount}</td></tr>
            <tr><td><strong>Outstanding Due:</strong></td><td style="color:${fee.dueAmount > 0 ? '#ef4444' : '#10b981'}; font-weight:700;">$${fee.dueAmount}</td></tr>
            <tr><td><strong>Payment Mode:</strong></td><td>${fee.paymentMethod || 'Cash'}</td></tr>
            <tr><td><strong>Date of Transaction:</strong></td><td>${fee.paymentDate || new Date().toISOString().split('T')[0]}</td></tr>
          </table>

          <div style="display:flex; justify-content:space-between; margin-top:2rem; font-size:0.75rem; color:#64748b; border-top:1px solid #e2e8f0; padding-top:1rem;">
            <div>Authorized Accounts Officer: ______________</div>
            <div>Institutional Stamp: [Verified]</div>
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn btn-outline btn-sm" onclick="document.getElementById('voucher-print-modal').remove()">Close</button>
          <button class="btn btn-primary btn-sm" onclick="window.print()">🖨️ Print Receipt</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }
}

window.feesPage = new FeesPage();
