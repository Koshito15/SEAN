(function(){

  const navButtons = document.querySelectorAll('.nav .nav-item');
  const pages = document.querySelectorAll('.page');
  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const heroDate = document.getElementById('hero-date');
  const exportBtn = document.getElementById('export-grades');

  
  if(heroDate){
    const now = new Date();
    const opts = { year: 'numeric', month: 'long', day: 'numeric' };
    heroDate.textContent = now.toLocaleDateString(undefined, opts);
  }

  
  function showPage(id){
    pages.forEach(p => {
      if(p.id === id){
        p.classList.add('page-active');
        
        const firstHeading = p.querySelector('h3, h1');
        if(firstHeading) { firstHeading.setAttribute('tabindex','-1'); firstHeading.focus(); }
      } else {
        p.classList.remove('page-active');
      }
    });

    navButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.page === id));
    
    if(window.innerWidth <= 760){
      sidebar.classList.remove('open');
    }
    
    const active = document.getElementById(id);
    if(active) active.scrollTop = 0;
  }

  
  navButtons.forEach(btn => {
    const page = btn.dataset.page;
    if(!page) return;
    btn.addEventListener('click', () => showPage(page));
    btn.setAttribute('tabindex', '0');
    btn.addEventListener('keydown', (e) => {
      if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); btn.click(); }
    });
  });

   
  document.querySelectorAll('[data-page]').forEach(el => {
    el.addEventListener('click', (e) => {
      const dp = el.getAttribute('data-page');
      if(dp) showPage(dp);
    });
  });

  
  if(sidebarToggle){
    sidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
  }

  
  document.addEventListener('click', (e) => {
    if(window.innerWidth <= 760){
      if(!sidebar.contains(e.target) && !e.target.closest('.logo-btn')){
        sidebar.classList.remove('open');
      }
    }
  });

  
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape' && sidebar.classList.contains('open')){
      sidebar.classList.remove('open');
    }
  });


  window.addEventListener('DOMContentLoaded', () => {
    const activeBtn = document.querySelector('.nav .nav-item.active');
    const initial = activeBtn ? activeBtn.dataset.page : 'dashboard';
    showPage(initial);
  });

  
  function exportGradesCSV(){
    const rows = [];
    rows.push(['Year/Semester','Subject','Prelim','Midterm','Final','Remarks']);
    document.querySelectorAll('.card').forEach(card => {
      const header = card.querySelector('.grades-year');
      if(!header) return;
      const yearSem = header.textContent.trim();
      card.querySelectorAll('.grades-table tbody tr').forEach(tr => {
        const cells = tr.querySelectorAll('td');
        if(cells.length >= 5){
          const subj = cells[0].textContent.trim();
          const prelim = cells[1].textContent.trim();
          const mid = cells[2].textContent.trim();
          const fin = cells[3].textContent.trim();
          const remarks = cells[4].textContent.trim();
          rows.push([yearSem, subj, prelim, mid, fin, remarks]);
        }
      });
    });

    if(rows.length <= 1){ alert('No grades found to export.'); return; }

    const csv = rows.map(r => r.map(c => `"${c.replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], {type: 'text/csv;charset=utf-8;'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'grades_export.csv';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  if(exportBtn) exportBtn.addEventListener('click', exportGradesCSV);

  
  const payNowBtn = document.getElementById('pay-now');
  if(payNowBtn){
    payNowBtn.addEventListener('click', () => {
      alert('This is a demo: integrate your payment gateway or API here.');
    });
  }


  const editProfile = document.getElementById('edit-profile');
  if(editProfile){
    editProfile.addEventListener('click', () => {
      alert('Edit profile clicked — implement a form or modal here.');
    });
  }

 
  document.getElementById('logout-btn')?.addEventListener('click', () => {
    alert('Logging out (demo). Implement real logout logic on your backend.');
  });

})();