/**
 * Beacon Valley School - EduBloom LMS
 * Initial Database & LocalStorage Persistence Store
 */

const DEFAULT_SCHOOL_CONFIG = {
  schoolId: 'bvs-001',
  schoolName: 'Beacon Valley School',
  tagline: 'Learn. Grow. Achieve.',
  subTagline: 'Learn • Grow • Succeed',
  logoUrl: 'assets/logo.png',
  faviconUrl: 'assets/logo.png',
  primaryColor: '#0f274a',      // Deep Royal Navy
  secondaryColor: '#d4af37',    // Classic Academic Gold
  accentColor: '#3b82f6',       // Vibrant Tech Blue
  themeMode: 'navy-gold',
  address: 'Beacon Valley Campus, Valley Road, Block 4, Education City',
  phone: '+92 300 1234567',
  email: 'info@beaconvalleyschool.edu',
  academicYear: '2025 - 2026',
  currency: '$',
  established: '2010',
  watermarkOpacity: 0.38,
  geminiApiKey: 'AQ.Ab8RN6J88p_sEON1Lq3Hs3g8n6ISQPUwEgnwyJJXPsSRBHO1Rg'
};

const INITIAL_STUDENTS = [
  {
    id: 'STU-101',
    name: 'Rimsha Tariq',
    rollNo: 'BVS-0801',
    gender: 'Female',
    dob: '2011-04-12',
    class: '8',
    section: 'A',
    admissionDate: '2020-08-15',
    parentName: 'Tariq Mehmood',
    parentContact: '+92 301 9876543',
    parentEmail: 'tariq.mehmood@gmail.com',
    parentId: 'PAR-301',
    address: 'House 42, St 7, Beacon Valley Enclave',
    emergencyContact: '+92 300 5551234',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    notes: 'Excels in Mathematics and Science. Student Council Member.',
    status: 'Active',
    attendancePercent: 96,
    feeStatus: 'Paid',
    deletedAt: null
  },
  {
    id: 'STU-102',
    name: 'Zaid Khan',
    rollNo: 'BVS-0802',
    gender: 'Male',
    dob: '2011-06-25',
    class: '8',
    section: 'A',
    admissionDate: '2020-08-15',
    parentName: 'Arshad Khan',
    parentContact: '+92 321 4567890',
    parentEmail: 'arshad.khan@gmail.com',
    parentId: 'PAR-302',
    address: 'Apt 5B, Palm Heights, Valley Road',
    emergencyContact: '+92 321 4567891',
    photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    notes: 'Strong in sports and debate. Needs slight support in English grammar.',
    status: 'Active',
    attendancePercent: 71,
    feeStatus: 'Overdue',
    deletedAt: null
  },
  {
    id: 'STU-103',
    name: 'Ayla Khan',
    rollNo: 'BVS-0601',
    gender: 'Female',
    dob: '2013-09-10',
    class: '6',
    section: 'B',
    admissionDate: '2022-08-10',
    parentName: 'Arshad Khan', // Sibling of Zaid Khan
    parentContact: '+92 321 4567890',
    parentEmail: 'arshad.khan@gmail.com',
    parentId: 'PAR-302',
    address: 'Apt 5B, Palm Heights, Valley Road',
    emergencyContact: '+92 321 4567891',
    photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    notes: 'Creative arts prize winner. Enthusiastic reader.',
    status: 'Active',
    attendancePercent: 92,
    feeStatus: 'Paid',
    deletedAt: null
  },
  {
    id: 'STU-104',
    name: 'Hamza Farooq',
    rollNo: 'BVS-0701',
    gender: 'Male',
    dob: '2012-02-18',
    class: '7',
    section: 'A',
    admissionDate: '2021-08-20',
    parentName: 'Farooq Ahmed',
    parentContact: '+92 333 1122334',
    parentEmail: 'farooq.ahmed@yahoo.com',
    parentId: 'PAR-303',
    address: 'Villa 12, Pine Avenue, Valley Meadows',
    emergencyContact: '+92 333 9988776',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    notes: 'Robotics club captain. Regular and attentive.',
    status: 'Active',
    attendancePercent: 88,
    feeStatus: 'Partial',
    deletedAt: null
  },
  {
    id: 'STU-105',
    name: 'Sarah Fatima',
    rollNo: 'BVS-0702',
    gender: 'Female',
    dob: '2012-11-05',
    class: '7',
    section: 'A',
    admissionDate: '2021-08-20',
    parentName: 'Imran Bashir',
    parentContact: '+92 345 7766554',
    parentEmail: 'imran.bashir@outlook.com',
    parentId: 'PAR-304',
    address: 'Street 3, Gulberg Heights, West Valley',
    emergencyContact: '+92 345 1122445',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    notes: 'Top scorer in Science olympiad. Diligent student.',
    status: 'Active',
    attendancePercent: 98,
    feeStatus: 'Paid',
    deletedAt: null
  },
  {
    id: 'STU-106',
    name: 'Bilal Hassan',
    rollNo: 'BVS-0803',
    gender: 'Male',
    dob: '2011-08-14',
    class: '8',
    section: 'A',
    admissionDate: '2020-08-15',
    parentName: 'Hassan Raza',
    parentContact: '+92 312 3344556',
    parentEmail: 'hassan.raza@gmail.com',
    parentId: 'PAR-305',
    address: 'House 88, Garden Town, South Valley',
    emergencyContact: '+92 312 9988112',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    notes: 'Absent frequently in October due to sports camp.',
    status: 'Active',
    attendancePercent: 68,
    feeStatus: 'Pending',
    deletedAt: null
  },
  {
    id: 'STU-107',
    name: 'Emaan Naveed',
    rollNo: 'BVS-0901',
    gender: 'Female',
    dob: '2010-03-29',
    class: '9',
    section: 'B',
    admissionDate: '2019-08-10',
    parentName: 'Naveed Akhtar',
    parentContact: '+92 300 4455667',
    parentEmail: 'naveed.akhtar@gmail.com',
    parentId: 'PAR-306',
    address: 'B-14, Phase 3, Green Valley',
    emergencyContact: '+92 300 7788990',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80',
    notes: 'Head Girl candidate. Outstanding academic record.',
    status: 'Active',
    attendancePercent: 99,
    feeStatus: 'Paid',
    deletedAt: null
  },
  {
    id: 'STU-108',
    name: 'Danyal Malik',
    rollNo: 'BVS-0902',
    gender: 'Male',
    dob: '2010-12-01',
    class: '9',
    section: 'A',
    admissionDate: '2019-08-10',
    parentName: 'Malik Zafar',
    parentContact: '+92 322 8899001',
    parentEmail: 'malik.zafar@gmail.com',
    parentId: 'PAR-307',
    address: 'Corner House, Sector C, Valley Greens',
    emergencyContact: '+92 322 1122338',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    notes: 'Cricket team opening batsman. Good team spirit.',
    status: 'Active',
    attendancePercent: 78,
    feeStatus: 'Overdue',
    deletedAt: null
  }
];

const INITIAL_DELETED_STUDENTS = [
  {
    id: 'STU-199',
    name: 'Usman Ali',
    rollNo: 'BVS-0799',
    gender: 'Male',
    dob: '2012-05-14',
    class: '7',
    section: 'B',
    admissionDate: '2021-08-20',
    parentName: 'Ali Asghar',
    parentContact: '+92 315 2233445',
    parentEmail: 'ali.asghar@gmail.com',
    parentId: 'PAR-399',
    address: 'Sector 5, Old Valley City',
    emergencyContact: '+92 315 9900112',
    photo: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    notes: 'Transferred to overseas school in September.',
    status: 'Deleted',
    attendancePercent: 84,
    feeStatus: 'Paid',
    deletedAt: '2026-09-28T10:30:00Z',
    deletedBy: 'Admin (Sarah Vance)'
  }
];

const INITIAL_TEACHERS = [
  {
    id: 'TCH-201',
    name: 'Ms. Ayesha Siddiqa',
    email: 'ayesha.s@beaconvalleyschool.edu',
    phone: '+92 300 2345678',
    gender: 'Female',
    qualification: 'M.Phil Mathematics, Quaid-i-Azam University',
    joiningDate: '2019-01-15',
    subjects: ['Mathematics', 'Advanced Algebra'],
    assignedClasses: ['Class 8-A', 'Class 9-A', 'Class 7-A'],
    status: 'Active',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'TCH-202',
    name: 'Sir Kamran Qureshi',
    email: 'kamran.q@beaconvalleyschool.edu',
    phone: '+92 321 3456789',
    gender: 'Male',
    qualification: 'M.Sc Physics, LUMS',
    joiningDate: '2020-03-01',
    subjects: ['Physics', 'General Science'],
    assignedClasses: ['Class 8-A', 'Class 9-B', 'Class 7-A'],
    status: 'Active',
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'TCH-203',
    name: 'Mrs. Hina Salman',
    email: 'hina.s@beaconvalleyschool.edu',
    phone: '+92 333 4567890',
    gender: 'Female',
    qualification: 'M.A English Literature, Punjab University',
    joiningDate: '2021-08-10',
    subjects: ['English Literature', 'Creative Writing'],
    assignedClasses: ['Class 6-B', 'Class 7-A', 'Class 8-A'],
    status: 'Active',
    photo: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'TCH-204',
    name: 'Mr. Tariq Jamil',
    email: 'tariq.j@beaconvalleyschool.edu',
    phone: '+92 345 5678901',
    gender: 'Male',
    qualification: 'BS Computer Science, FAST NUCES',
    joiningDate: '2022-09-01',
    subjects: ['Computer Science', 'Robotics & AI Basics'],
    assignedClasses: ['Class 7-A', 'Class 8-A', 'Class 9-A', 'Class 9-B'],
    status: 'Active',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  }
];

const INITIAL_CLASSES = [
  { id: 'CLS-6', name: 'Class 6', sections: ['A', 'B'], classTeacher: 'Mrs. Hina Salman', totalStudents: 42, room: 'Room 101' },
  { id: 'CLS-7', name: 'Class 7', sections: ['A', 'B'], classTeacher: 'Mr. Kamran Qureshi', totalStudents: 38, room: 'Room 102' },
  { id: 'CLS-8', name: 'Class 8', sections: ['A', 'B'], classTeacher: 'Ms. Ayesha Siddiqa', totalStudents: 45, room: 'Room 201' },
  { id: 'CLS-9', name: 'Class 9', sections: ['A', 'B'], classTeacher: 'Mr. Tariq Jamil', totalStudents: 39, room: 'Room 202' },
  { id: 'CLS-10', name: 'Class 10', sections: ['A'], classTeacher: 'Dr. Zeeshan Haider', totalStudents: 30, room: 'Room 301' }
];

const INITIAL_FEES = [
  { id: 'FEE-1001', studentId: 'STU-101', studentName: 'Rimsha Tariq', class: '8', month: 'October 2026', totalAmount: 250, paidAmount: 250, dueAmount: 0, dueDate: '2026-10-10', status: 'Paid', paymentDate: '2026-10-04', paymentMethod: 'Online Bank Transfer' },
  { id: 'FEE-1002', studentId: 'STU-102', studentName: 'Zaid Khan', class: '8', month: 'October 2026', totalAmount: 250, paidAmount: 0, dueAmount: 250, dueDate: '2026-10-10', status: 'Overdue', paymentDate: null, paymentMethod: null },
  { id: 'FEE-1003', studentId: 'STU-103', studentName: 'Ayla Khan', class: '6', month: 'October 2026', totalAmount: 220, paidAmount: 220, dueAmount: 0, dueDate: '2026-10-10', status: 'Paid', paymentDate: '2026-10-02', paymentMethod: 'Card' },
  { id: 'FEE-1004', studentId: 'STU-104', studentName: 'Hamza Farooq', class: '7', month: 'October 2026', totalAmount: 240, paidAmount: 120, dueAmount: 120, dueDate: '2026-10-10', status: 'Partial', paymentDate: '2026-10-06', paymentMethod: 'Cash' },
  { id: 'FEE-1005', studentId: 'STU-105', studentName: 'Sarah Fatima', class: '7', month: 'October 2026', totalAmount: 240, paidAmount: 240, dueAmount: 0, dueDate: '2026-10-10', status: 'Paid', paymentDate: '2026-10-05', paymentMethod: 'Online Bank Transfer' },
  { id: 'FEE-1006', studentId: 'STU-106', studentName: 'Bilal Hassan', class: '8', month: 'October 2026', totalAmount: 250, paidAmount: 0, dueAmount: 250, dueDate: '2026-10-10', status: 'Pending', paymentDate: null, paymentMethod: null },
  { id: 'FEE-1007', studentId: 'STU-107', studentName: 'Emaan Naveed', class: '9', month: 'October 2026', totalAmount: 270, paidAmount: 270, dueAmount: 0, dueDate: '2026-10-10', status: 'Paid', paymentDate: '2026-10-01', paymentMethod: 'Direct Debit' },
  { id: 'FEE-1008', studentId: 'STU-108', studentName: 'Danyal Malik', class: '9', month: 'October 2026', totalAmount: 270, paidAmount: 0, dueAmount: 270, dueDate: '2026-10-05', status: 'Overdue', paymentDate: null, paymentMethod: null }
];

const INITIAL_HOMEWORK = [
  {
    id: 'HW-501',
    title: 'Quadratic Equations & Polynomials Exercise 4.2',
    subject: 'Mathematics',
    class: '8',
    section: 'A',
    teacher: 'Ms. Ayesha Siddiqa',
    dueDate: '2026-10-11',
    description: 'Solve questions 1 through 15 on Chapter 4 notebook. Show all intermediate steps and derivation of discriminant.',
    assignedDate: '2026-10-07',
    status: 'Active',
    totalSubmissions: 28,
    totalAssigned: 35
  },
  {
    id: 'HW-502',
    title: 'Newton\'s Third Law Experiment Writeup',
    subject: 'Physics',
    class: '8',
    section: 'A',
    teacher: 'Sir Kamran Qureshi',
    dueDate: '2026-10-12',
    description: 'Write a 2-page laboratory summary illustrating action-reaction pairs with diagrammatic representations of free body forces.',
    assignedDate: '2026-10-06',
    status: 'Active',
    totalSubmissions: 31,
    totalAssigned: 35
  },
  {
    id: 'HW-503',
    title: 'Essay: The Role of Technology in Environmental Conservation',
    subject: 'English Literature',
    class: '7',
    section: 'A',
    teacher: 'Mrs. Hina Salman',
    dueDate: '2026-10-09',
    description: '500-word argumentative essay with at least 3 credible citations. Check vocabulary and grammar carefully.',
    assignedDate: '2026-10-05',
    status: 'Due Soon',
    totalSubmissions: 34,
    totalAssigned: 38
  },
  {
    id: 'HW-504',
    title: 'Python Loops & Lists Coding Challenge',
    subject: 'Computer Science',
    class: '9',
    section: 'A',
    teacher: 'Mr. Tariq Jamil',
    dueDate: '2026-10-14',
    description: 'Implement a number guessing game utilizing while loop, input validation, and list comprehension for score tracking.',
    assignedDate: '2026-10-08',
    status: 'Active',
    totalSubmissions: 15,
    totalAssigned: 39
  }
];

const INITIAL_EXAMS = [
  {
    id: 'EXAM-601',
    title: 'Mid-Term Assessment 2026',
    startDate: '2026-11-05',
    endDate: '2026-11-20',
    academicYear: '2025 - 2026',
    classes: ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'],
    status: 'Upcoming'
  },
  {
    id: 'EXAM-600',
    title: 'First Term Examination 2026',
    startDate: '2026-09-01',
    endDate: '2026-09-15',
    academicYear: '2025 - 2026',
    classes: ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'],
    status: 'Completed'
  }
];

const INITIAL_RESULTS = [
  { studentId: 'STU-101', examId: 'EXAM-600', subject: 'Mathematics', maxMarks: 100, marksObtained: 97, grade: 'A+', remarks: 'Outstanding analytical prowess' },
  { studentId: 'STU-101', examId: 'EXAM-600', subject: 'Physics', maxMarks: 100, marksObtained: 94, grade: 'A+', remarks: 'Excellent lab comprehension' },
  { studentId: 'STU-101', examId: 'EXAM-600', subject: 'English', maxMarks: 100, marksObtained: 91, grade: 'A', remarks: 'Superb creative writing' },
  { studentId: 'STU-101', examId: 'EXAM-600', subject: 'Computer Science', maxMarks: 100, marksObtained: 99, grade: 'A+', remarks: 'Top class programmer' },

  { studentId: 'STU-102', examId: 'EXAM-600', subject: 'Mathematics', maxMarks: 100, marksObtained: 72, grade: 'B', remarks: 'Good potential, practice geometry' },
  { studentId: 'STU-102', examId: 'EXAM-600', subject: 'Physics', maxMarks: 100, marksObtained: 68, grade: 'C+', remarks: 'Review numerical formula sheets' },
  { studentId: 'STU-102', examId: 'EXAM-600', subject: 'English', maxMarks: 100, marksObtained: 70, grade: 'B', remarks: 'Satisfactory' },
  { studentId: 'STU-102', examId: 'EXAM-600', subject: 'Computer Science', maxMarks: 100, marksObtained: 85, grade: 'A', remarks: 'Very keen in coding' },

  { studentId: 'STU-103', examId: 'EXAM-600', subject: 'Mathematics', maxMarks: 100, marksObtained: 89, grade: 'A', remarks: 'Consistent worker' },
  { studentId: 'STU-103', examId: 'EXAM-600', subject: 'Science', maxMarks: 100, marksObtained: 92, grade: 'A+', remarks: 'Very inquisitive' },
  { studentId: 'STU-103', examId: 'EXAM-600', subject: 'English', maxMarks: 100, marksObtained: 95, grade: 'A+', remarks: 'Exquisite vocabulary' },

  { studentId: 'STU-104', examId: 'EXAM-600', subject: 'Mathematics', maxMarks: 100, marksObtained: 88, grade: 'A', remarks: 'Methodical approaches' },
  { studentId: 'STU-104', examId: 'EXAM-600', subject: 'Physics', maxMarks: 100, marksObtained: 84, grade: 'A', remarks: 'Strong practical skills' },

  { studentId: 'STU-105', examId: 'EXAM-600', subject: 'Mathematics', maxMarks: 100, marksObtained: 98, grade: 'A+', remarks: 'Perfectionist' },
  { studentId: 'STU-105', examId: 'EXAM-600', subject: 'Physics', maxMarks: 100, marksObtained: 96, grade: 'A+', remarks: 'Top in class' }
];

const INITIAL_ANNOUNCEMENTS = [
  {
    id: 'ANC-701',
    title: 'Annual Science & Innovation Exhibition 2026',
    audience: 'All', // All, Teachers, Parents, Students
    date: '2026-10-07',
    category: 'Event',
    pinned: true,
    author: 'Principal Office',
    content: 'Beacon Valley School proudly announces the Annual Science & Innovation Fair scheduled for November 15th. Students from Classes 6 through 10 are invited to submit their project proposals to their respective science department leads by October 25th.'
  },
  {
    id: 'ANC-702',
    title: 'Parent-Teacher Conference (Mid-Term Review)',
    audience: 'Parents',
    date: '2026-10-05',
    category: 'Academic',
    pinned: true,
    author: 'Academic Coordinator',
    content: 'Dear Parents, the first term evaluation meeting will take place this Saturday from 9:00 AM to 1:00 PM. Please review your child\'s attendance and marks online prior to the session.'
  },
  {
    id: 'ANC-703',
    title: 'Staff Curriculum & Assessment Standardization Workshop',
    audience: 'Teachers',
    date: '2026-10-03',
    category: 'Staff',
    pinned: false,
    author: 'Academic Dean',
    content: 'All faculty members are requested to attend a 90-minute digital assessment calibration seminar on Friday at 3:30 PM in the Beacon Valley Multimedia Auditorium.'
  },
  {
    id: 'ANC-704',
    title: 'Inter-School Sports Gala Registrations Open',
    audience: 'Students',
    date: '2026-09-30',
    category: 'Sports',
    pinned: false,
    author: 'Sports Director',
    content: 'Trials for football, basketball, and table tennis will begin next Monday. Wear official Beacon Valley physical training uniforms.'
  }
];

const INITIAL_ATTENDANCE_RECORDS = {
  // Key format: 'YYYY-MM-DD_CLASS_SECTION'
  '2026-10-08_8_A': {
    'STU-101': 'Present',
    'STU-102': 'Absent', // Zaid Khan absent today!
    'STU-106': 'Absent'  // Bilal Hassan absent today!
  },
  '2026-10-08_7_A': {
    'STU-104': 'Present',
    'STU-105': 'Present'
  },
  '2026-10-08_6_B': {
    'STU-103': 'Present'
  },
  '2026-10-08_9_A': {
    'STU-108': 'Late'
  },
  '2026-10-08_9_B': {
    'STU-107': 'Present'
  }
};

const INITIAL_TIMETABLE = [
  { day: 'Monday', class: '8-A', period: '08:30 - 09:15', subject: 'Mathematics', teacher: 'Ms. Ayesha Siddiqa', room: 'Room 201' },
  { day: 'Monday', class: '8-A', period: '09:15 - 10:00', subject: 'Physics', teacher: 'Sir Kamran Qureshi', room: 'Physics Lab' },
  { day: 'Monday', class: '8-A', period: '10:00 - 10:45', subject: 'English', teacher: 'Mrs. Hina Salman', room: 'Room 201' },
  { day: 'Monday', class: '8-A', period: '11:15 - 12:00', subject: 'Computer Science', teacher: 'Mr. Tariq Jamil', room: 'CS Lab 2' },

  { day: 'Tuesday', class: '8-A', period: '08:30 - 09:15', subject: 'English', teacher: 'Mrs. Hina Salman', room: 'Room 201' },
  { day: 'Tuesday', class: '8-A', period: '09:15 - 10:00', subject: 'Mathematics', teacher: 'Ms. Ayesha Siddiqa', room: 'Room 201' },
  { day: 'Tuesday', class: '8-A', period: '10:00 - 10:45', subject: 'Chemistry', teacher: 'Dr. Zeeshan Haider', room: 'Chem Lab' },
  { day: 'Tuesday', class: '8-A', period: '11:15 - 12:00', subject: 'Physical Education', teacher: 'Coach Daniyal', room: 'Sports Ground' },

  { day: 'Wednesday', class: '8-A', period: '08:30 - 09:15', subject: 'Physics', teacher: 'Sir Kamran Qureshi', room: 'Physics Lab' },
  { day: 'Wednesday', class: '8-A', period: '09:15 - 10:00', subject: 'Mathematics', teacher: 'Ms. Ayesha Siddiqa', room: 'Room 201' },
  { day: 'Wednesday', class: '8-A', period: '10:00 - 10:45', subject: 'Robotics & AI', teacher: 'Mr. Tariq Jamil', room: 'CS Lab 2' },
  { day: 'Wednesday', class: '8-A', period: '11:15 - 12:00', subject: 'Islamic Studies', teacher: 'Qari Abdul Rehman', room: 'Room 201' },

  { day: 'Thursday', class: '8-A', period: '08:30 - 09:15', subject: 'Computer Science', teacher: 'Mr. Tariq Jamil', room: 'CS Lab 2' },
  { day: 'Thursday', class: '8-A', period: '09:15 - 10:00', subject: 'English', teacher: 'Mrs. Hina Salman', room: 'Room 201' },
  { day: 'Thursday', class: '8-A', period: '10:00 - 10:45', subject: 'Social Studies', teacher: 'Sir Farhan', room: 'Room 201' },
  { day: 'Thursday', class: '8-A', period: '11:15 - 12:00', subject: 'Mathematics', teacher: 'Ms. Ayesha Siddiqa', room: 'Room 201' },

  { day: 'Friday', class: '8-A', period: '08:30 - 09:15', subject: 'Urdu Literature', teacher: 'Mrs. Nabila', room: 'Room 201' },
  { day: 'Friday', class: '8-A', period: '09:15 - 10:00', subject: 'Physics', teacher: 'Sir Kamran Qureshi', room: 'Physics Lab' },
  { day: 'Friday', class: '8-A', period: '10:00 - 10:45', subject: 'Art & Design', teacher: 'Ms. Zainab', room: 'Art Studio' }
];

const INITIAL_LEARNING_RESOURCES = [
  { id: 'RES-1', title: 'Chapter 4: Quadratic Equations - Formula Guide & Solved Examples', subject: 'Mathematics', class: '8', type: 'PDF Document', size: '2.4 MB' },
  { id: 'RES-2', title: 'Interactive Laws of Motion Simulation Notes & Diagram Pack', subject: 'Physics', class: '8', type: 'Handout', size: '1.8 MB' },
  { id: 'RES-3', title: 'Cambridge O-Level English Composition & High-Scoring Idioms', subject: 'English', class: '8', type: 'Study Guide', size: '3.1 MB' },
  { id: 'RES-4', title: 'Python Syntax Cheatsheet: Conditional Branching & Loops', subject: 'Computer Science', class: '8', type: 'Code Guide', size: '1.2 MB' }
];

/**
 * Data Management API with localStorage sync
 */
class DataStore {
  constructor() {
    this.init();
  }

  init() {
    if (!localStorage.getItem('bvs_initialized_v2')) {
      this.resetToDefaults();
    }
  }

  resetToDefaults() {
    localStorage.setItem('bvs_school_config', JSON.stringify(DEFAULT_SCHOOL_CONFIG));
    localStorage.setItem('bvs_students', JSON.stringify(INITIAL_STUDENTS));
    localStorage.setItem('bvs_deleted_students', JSON.stringify(INITIAL_DELETED_STUDENTS));
    localStorage.setItem('bvs_teachers', JSON.stringify(INITIAL_TEACHERS));
    localStorage.setItem('bvs_classes', JSON.stringify(INITIAL_CLASSES));
    localStorage.setItem('bvs_fees', JSON.stringify(INITIAL_FEES));
    localStorage.setItem('bvs_homework', JSON.stringify(INITIAL_HOMEWORK));
    localStorage.setItem('bvs_exams', JSON.stringify(INITIAL_EXAMS));
    localStorage.setItem('bvs_results', JSON.stringify(INITIAL_RESULTS));
    localStorage.setItem('bvs_announcements', JSON.stringify(INITIAL_ANNOUNCEMENTS));
    localStorage.setItem('bvs_attendance', JSON.stringify(INITIAL_ATTENDANCE_RECORDS));
    localStorage.setItem('bvs_timetable', JSON.stringify(INITIAL_TIMETABLE));
    localStorage.setItem('bvs_resources', JSON.stringify(INITIAL_LEARNING_RESOURCES));
    localStorage.setItem('bvs_initialized_v2', 'true');
  }

  // School Config
  getConfig() {
    try {
      const cfg = JSON.parse(localStorage.getItem('bvs_school_config'));
      return cfg || DEFAULT_SCHOOL_CONFIG;
    } catch (e) {
      return DEFAULT_SCHOOL_CONFIG;
    }
  }

  updateConfig(newConfig) {
    const current = this.getConfig();
    const updated = { ...current, ...newConfig };
    localStorage.setItem('bvs_school_config', JSON.stringify(updated));
    this.applyBrandTheme(updated);
    return updated;
  }

  applyBrandTheme(cfg = this.getConfig()) {
    const root = document.documentElement;
    if (cfg.primaryColor) root.style.setProperty('--primary-color', cfg.primaryColor);
    if (cfg.secondaryColor) root.style.setProperty('--secondary-color', cfg.secondaryColor);
    if (cfg.accentColor) root.style.setProperty('--accent-color', cfg.accentColor);
    root.style.setProperty('--watermark-opacity', cfg.watermarkOpacity !== undefined ? cfg.watermarkOpacity : '0.38');
    
    // Update browser title
    document.title = `${cfg.schoolName} – EduBloom LMS`;

    // Dynamically update full-screen watermark
    const watermarkImg = document.querySelector('.school-watermark-img');
    if (watermarkImg) {
      if (cfg.logoUrl) watermarkImg.src = cfg.logoUrl;
      watermarkImg.style.opacity = cfg.watermarkOpacity !== undefined ? cfg.watermarkOpacity : '0.38';
    }

    // Dynamically update crest logos
    document.querySelectorAll('.brand-crest, .login-logo').forEach(img => {
      if (cfg.logoUrl) img.src = cfg.logoUrl;
    });

    // Dynamically update school names
    document.querySelectorAll('.brand-school-name, .login-school-name').forEach(el => {
      if (cfg.schoolName) el.innerText = cfg.schoolName;
    });
  }

  // Students
  getStudents(includeDeleted = false) {
    const active = JSON.parse(localStorage.getItem('bvs_students') || '[]');
    if (!includeDeleted) return active;
    const deleted = this.getDeletedStudents();
    return [...active, ...deleted];
  }

  getStudentById(id) {
    const all = this.getStudents(true);
    return all.find(s => s.id === id);
  }

  saveStudent(studentData) {
    const students = this.getStudents();
    const index = students.findIndex(s => s.id === studentData.id);
    if (index >= 0) {
      students[index] = { ...students[index], ...studentData };
    } else {
      const newId = 'STU-' + (Math.floor(100 + Math.random() * 900));
      students.unshift({
        ...studentData,
        id: studentData.id || newId,
        status: studentData.status || 'Active',
        attendancePercent: studentData.attendancePercent || 95,
        feeStatus: studentData.feeStatus || 'Pending',
        deletedAt: null
      });
    }
    localStorage.setItem('bvs_students', JSON.stringify(students));
    return studentData;
  }

  softDeleteStudent(studentId, deletedBy = 'Admin') {
    const students = this.getStudents();
    const studentIndex = students.findIndex(s => s.id === studentId);
    if (studentIndex === -1) return false;

    const [deletedStudent] = students.splice(studentIndex, 1);
    deletedStudent.status = 'Deleted';
    deletedStudent.deletedAt = new Date().toISOString();
    deletedStudent.deletedBy = deletedBy;

    const deletedList = this.getDeletedStudents();
    deletedList.unshift(deletedStudent);

    localStorage.setItem('bvs_students', JSON.stringify(students));
    localStorage.setItem('bvs_deleted_students', JSON.stringify(deletedList));
    return true;
  }

  getDeletedStudents() {
    return JSON.parse(localStorage.getItem('bvs_deleted_students') || '[]');
  }

  restoreStudent(studentId) {
    const deletedList = this.getDeletedStudents();
    const index = deletedList.findIndex(s => s.id === studentId);
    if (index === -1) return false;

    const [restoredStudent] = deletedList.splice(index, 1);
    restoredStudent.status = 'Active';
    restoredStudent.deletedAt = null;
    restoredStudent.restoredAt = new Date().toISOString();

    const activeStudents = this.getStudents();
    activeStudents.unshift(restoredStudent);

    localStorage.setItem('bvs_deleted_students', JSON.stringify(deletedList));
    localStorage.setItem('bvs_students', JSON.stringify(activeStudents));
    return true;
  }

  permanentDeleteStudent(studentId) {
    const deletedList = this.getDeletedStudents();
    const filtered = deletedList.filter(s => s.id !== studentId);
    localStorage.setItem('bvs_deleted_students', JSON.stringify(filtered));

    // Also clean up linked fees and results
    const fees = this.getFees().filter(f => f.studentId !== studentId);
    localStorage.setItem('bvs_fees', JSON.stringify(fees));

    const results = this.getResults().filter(r => r.studentId !== studentId);
    localStorage.setItem('bvs_results', JSON.stringify(results));
    return true;
  }

  // Teachers
  getTeachers() {
    return JSON.parse(localStorage.getItem('bvs_teachers') || '[]');
  }

  saveTeacher(teacherData) {
    const teachers = this.getTeachers();
    const index = teachers.findIndex(t => t.id === teacherData.id);
    if (index >= 0) {
      teachers[index] = { ...teachers[index], ...teacherData };
    } else {
      const newId = 'TCH-' + (Math.floor(200 + Math.random() * 800));
      teachers.unshift({ ...teacherData, id: teacherData.id || newId });
    }
    localStorage.setItem('bvs_teachers', JSON.stringify(teachers));
    return teacherData;
  }

  deleteTeacher(id) {
    const teachers = this.getTeachers().filter(t => t.id !== id);
    localStorage.setItem('bvs_teachers', JSON.stringify(teachers));
  }

  // Classes
  getClasses() {
    return JSON.parse(localStorage.getItem('bvs_classes') || '[]');
  }

  saveClass(classData) {
    const classes = this.getClasses();
    const index = classes.findIndex(c => c.id === classData.id);
    if (index >= 0) {
      classes[index] = { ...classes[index], ...classData };
    } else {
      classes.push(classData);
    }
    localStorage.setItem('bvs_classes', JSON.stringify(classes));
  }

  // Fees
  getFees() {
    return JSON.parse(localStorage.getItem('bvs_fees') || '[]');
  }

  saveFee(feeData) {
    const fees = this.getFees();
    const index = fees.findIndex(f => f.id === feeData.id);
    if (index >= 0) {
      fees[index] = { ...fees[index], ...feeData };
    } else {
      fees.unshift({ ...feeData, id: feeData.id || 'FEE-' + Date.now().toString().slice(-4) });
    }
    localStorage.setItem('bvs_fees', JSON.stringify(fees));
    return feeData;
  }

  // Homework
  getHomework() {
    return JSON.parse(localStorage.getItem('bvs_homework') || '[]');
  }

  saveHomework(hwData) {
    const homework = this.getHomework();
    const index = homework.findIndex(h => h.id === hwData.id);
    if (index >= 0) {
      homework[index] = { ...homework[index], ...hwData };
    } else {
      homework.unshift({ ...hwData, id: hwData.id || 'HW-' + (Math.floor(500 + Math.random() * 500)) });
    }
    localStorage.setItem('bvs_homework', JSON.stringify(homework));
    return hwData;
  }

  deleteHomework(id) {
    const homework = this.getHomework().filter(h => h.id !== id);
    localStorage.setItem('bvs_homework', JSON.stringify(homework));
  }

  // Exams & Results
  getExams() {
    return JSON.parse(localStorage.getItem('bvs_exams') || '[]');
  }

  getResults() {
    return JSON.parse(localStorage.getItem('bvs_results') || '[]');
  }

  saveResult(resultData) {
    const results = this.getResults();
    const index = results.findIndex(r => r.studentId === resultData.studentId && r.examId === resultData.examId && r.subject === resultData.subject);
    if (index >= 0) {
      results[index] = { ...results[index], ...resultData };
    } else {
      results.push(resultData);
    }
    localStorage.setItem('bvs_results', JSON.stringify(results));
  }

  // Announcements
  getAnnouncements() {
    return JSON.parse(localStorage.getItem('bvs_announcements') || '[]');
  }

  saveAnnouncement(ancData) {
    const announcements = this.getAnnouncements();
    const index = announcements.findIndex(a => a.id === ancData.id);
    if (index >= 0) {
      announcements[index] = { ...announcements[index], ...ancData };
    } else {
      announcements.unshift({
        ...ancData,
        id: ancData.id || 'ANC-' + Date.now().toString().slice(-4),
        date: ancData.date || new Date().toISOString().split('T')[0]
      });
    }
    localStorage.setItem('bvs_announcements', JSON.stringify(announcements));
    return ancData;
  }

  deleteAnnouncement(id) {
    const announcements = this.getAnnouncements().filter(a => a.id !== id);
    localStorage.setItem('bvs_announcements', JSON.stringify(announcements));
  }

  // Attendance
  getAttendanceRecord(date, className, section) {
    const all = JSON.parse(localStorage.getItem('bvs_attendance') || '{}');
    const key = `${date}_${className}_${section}`;
    return all[key] || {};
  }

  saveAttendanceRecord(date, className, section, records) {
    const all = JSON.parse(localStorage.getItem('bvs_attendance') || '{}');
    const key = `${date}_${className}_${section}`;
    all[key] = records;
    localStorage.setItem('bvs_attendance', JSON.stringify(all));

    // Also update student's computed attendance rate
    this.recomputeStudentAttendance(className, section);
  }

  recomputeStudentAttendance(className, section) {
    const all = JSON.parse(localStorage.getItem('bvs_attendance') || '{}');
    const students = this.getStudents().filter(s => s.class === className && s.section === section);
    
    students.forEach(student => {
      let totalDays = 0;
      let presentDays = 0;
      Object.keys(all).forEach(key => {
        if (key.includes(`_${className}_${section}`)) {
          const dayStatus = all[key][student.id];
          if (dayStatus) {
            totalDays++;
            if (dayStatus === 'Present' || dayStatus === 'Late') presentDays++;
          }
        }
      });
      if (totalDays > 0) {
        student.attendancePercent = Math.round((presentDays / totalDays) * 100);
      }
    });
    localStorage.setItem('bvs_students', JSON.stringify(this.getStudents()));
  }

  // Timetable
  getTimetable(filterClass = null) {
    const table = JSON.parse(localStorage.getItem('bvs_timetable') || '[]');
    if (!filterClass) return table;
    return table.filter(t => t.class === filterClass);
  }

  // Resources
  getResources() {
    return JSON.parse(localStorage.getItem('bvs_resources') || '[]');
  }
}

// Global Singleton Instance
window.db = new DataStore();
