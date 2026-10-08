/**
 * Beacon Valley School - EduBloom LMS
 * Main Bootstrap Script
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Database
  window.db.init();
  window.db.applyBrandTheme();

  // Initialize Router & Views
  window.router.init();

  // Listen to Role changes
  window.addEventListener('bvs:roleChanged', () => {
    window.router.renderCurrentPage();
  });

  // Listen to Parent child switch
  window.addEventListener('bvs:childSwitched', () => {
    window.router.renderCurrentPage();
  });

  console.log('🏫 Beacon Valley School - EduBloom LMS initialized successfully.');
  console.log('Tagline: Learn. Grow. Achieve.');
});
