/**
 * Beacon Valley School - EduBloom LMS
 * Authentication & Role-Based Access Control (RBAC)
 */

const ROLES = {
  OWNER: 'owner',
  ADMIN: 'admin',
  TEACHER: 'teacher',
  PARENT: 'parent',
  STUDENT: 'student'
};

const DEMO_USERS = {
  owner: {
    id: 'USR-001',
    role: ROLES.OWNER,
    roleTitle: 'Super Admin / Owner',
    name: 'School Owner',
    email: 'owner@beaconvalley.edu',
    password: 'password123',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    title: 'School Founder & Owner',
    permissions: ['all', 'school_config', 'multi_school', 'recycle_bin', 'manage_all']
  },
  admin: {
    id: 'USR-002',
    role: ROLES.ADMIN,
    roleTitle: 'School Admin',
    name: 'School Admin',
    email: 'admin@beaconvalley.edu',
    password: 'password123',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    title: 'Academic Administrator',
    permissions: ['manage_students', 'manage_teachers', 'manage_classes', 'manage_fees', 'recycle_bin', 'reports', 'announcements']
  },
  teacher: {
    id: 'USR-003',
    role: ROLES.TEACHER,
    roleTitle: 'Teacher',
    teacherId: 'TCH-201',
    name: 'School Teacher',
    email: 'teacher@beaconvalley.edu',
    password: 'password123',
    avatar: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=150&auto=format&fit=crop&q=80',
    title: 'Senior Faculty Member',
    assignedClasses: ['8-A', '9-A', '7-A'],
    permissions: ['view_assigned_students', 'mark_attendance', 'add_homework', 'grade_exams', 'view_timetable']
  },
  parent: {
    id: 'USR-004',
    role: ROLES.PARENT,
    roleTitle: 'Parent',
    name: 'Parent / Guardian',
    email: 'parent@beaconvalley.edu',
    password: 'password123',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    title: 'Student Guardian',
    childrenIds: ['STU-102', 'STU-103'], // Zaid Khan (Class 8) & Ayla Khan (Class 6)
    activeChildId: 'STU-102',
    permissions: ['view_child_profile', 'view_child_attendance', 'view_child_fees', 'view_child_homework', 'view_child_results']
  },
  student: {
    id: 'USR-005',
    role: ROLES.STUDENT,
    roleTitle: 'Student',
    studentId: 'STU-101',
    name: 'Student Scholar',
    email: 'student@beaconvalley.edu',
    password: 'password123',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    title: 'Grade 8-A Scholar',
    class: '8',
    section: 'A',
    rollNo: 'BVS-0801',
    permissions: ['view_own_profile', 'view_own_attendance', 'view_own_homework', 'view_own_timetable', 'view_own_results', 'view_learning_resources']
  }
};

class AuthManager {
  constructor() {
    this.currentUser = null;
    this.loadSession();
  }

  loadSession() {
    try {
      const stored = localStorage.getItem('bvs_session');
      if (stored) {
        const parsed = JSON.parse(stored);
        // Refresh with latest role template to ensure generic names are applied
        if (parsed && parsed.role && DEMO_USERS[parsed.role]) {
          this.currentUser = { ...DEMO_USERS[parsed.role] };
          localStorage.setItem('bvs_session', JSON.stringify(this.currentUser));
        } else {
          this.currentUser = parsed;
        }
      } else {
        // Default to Owner on initial open for immediate testing!
        this.currentUser = DEMO_USERS.owner;
        localStorage.setItem('bvs_session', JSON.stringify(this.currentUser));
      }
    } catch (e) {
      this.currentUser = DEMO_USERS.owner;
    }
  }

  login(emailOrRole, password, remember = true) {
    const term = (emailOrRole || '').trim().toLowerCase();
    let foundUser = null;

    // Match by role shortcut (e.g. 'owner', 'admin', 'teacher', 'parent', 'student')
    if (DEMO_USERS[term]) {
      foundUser = DEMO_USERS[term];
    } else {
      // Match by email
      foundUser = Object.values(DEMO_USERS).find(u => u.email.toLowerCase() === term);
    }

    if (!foundUser) {
      return { success: false, message: 'Invalid credentials. Please use demo credentials or valid school email.' };
    }

    if (password && password !== 'password123' && password !== 'admin' && password !== 'demo') {
      return { success: false, message: 'Incorrect password. Default demo password is "password123".' };
    }

    this.currentUser = { ...foundUser };
    if (remember) {
      localStorage.setItem('bvs_session', JSON.stringify(this.currentUser));
    }
    return { success: true, user: this.currentUser };
  }

  switchRole(roleKey) {
    if (DEMO_USERS[roleKey]) {
      this.currentUser = { ...DEMO_USERS[roleKey] };
      localStorage.setItem('bvs_session', JSON.stringify(this.currentUser));
      window.dispatchEvent(new CustomEvent('bvs:roleChanged', { detail: this.currentUser }));
      return this.currentUser;
    }
    return null;
  }

  switchParentChild(childId) {
    if (this.currentUser && this.currentUser.role === ROLES.PARENT) {
      this.currentUser.activeChildId = childId;
      localStorage.setItem('bvs_session', JSON.stringify(this.currentUser));
      window.dispatchEvent(new CustomEvent('bvs:childSwitched', { detail: childId }));
    }
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('bvs_session');
    window.location.hash = '#/login';
  }

  getUser() {
    return this.currentUser;
  }

  isLoggedIn() {
    return !!this.currentUser;
  }

  hasRole(role) {
    return this.currentUser && this.currentUser.role === role;
  }

  canAccess(permission) {
    if (!this.currentUser) return false;
    if (this.currentUser.role === ROLES.OWNER) return true;
    if (this.currentUser.permissions && this.currentUser.permissions.includes(permission)) return true;
    return false;
  }

  isOwner() {
    return this.currentUser && this.currentUser.role === ROLES.OWNER;
  }

  isAdminOrOwner() {
    return this.currentUser && (this.currentUser.role === ROLES.OWNER || this.currentUser.role === ROLES.ADMIN);
  }
}

window.auth = new AuthManager();
