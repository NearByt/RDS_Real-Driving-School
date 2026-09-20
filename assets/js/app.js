/* RDS Hub — shared interaction layer */
(function(){
  const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
  const money=n=>{if(n>=1e12)return (n/1e12).toFixed(2)+'T';if(n>=1e9)return (n/1e9).toFixed(2)+'B';if(n>=1e6)return (n/1e6).toFixed(2)+'M';if(n>=1e3)return (n/1e3).toFixed(2)+'K';return String(Math.round(n));};
  const inr=n=>new Intl.NumberFormat('en-IN',{maximumFractionDigits:0}).format(Math.round(n));
  window.RDS={money,inr};

  // Mobile navigation
  const toggle=$('[data-menu]');
  const side=$('.sidebar');
  if(toggle&&side) toggle.addEventListener('click',()=>side.classList.toggle('open'));

  // Global page search filter
  const search=$('[data-search]');
  if(search){
    search.addEventListener('input',()=>{
      const q=search.value.trim().toLowerCase();
      $$('[data-search-item]').forEach(el=>{
        el.hidden=q && !el.textContent.toLowerCase().includes(q);
      });
    });
  }

  // Subtle reveal animation
  const reveal=$$('[data-reveal]');
  if('IntersectionObserver' in window){
    const io=new IntersectionObserver(es=>es.forEach(e=>{
      if(e.isIntersecting){e.target.classList.add('revealed');io.unobserve(e.target);}
    }),{threshold:.08});
    reveal.forEach(e=>io.observe(e));
  }else reveal.forEach(e=>e.classList.add('revealed'));

  // Active page
  const page=location.pathname.split('/').pop()||'index.html';
  $$('[data-nav]').forEach(a=>a.classList.toggle('active',a.getAttribute('href')===page));

  // Clock/status
  const clock=$('[data-clock]');
  if(clock){
    const tick=()=>{clock.textContent=new Intl.DateTimeFormat('en-IN',{hour:'2-digit',minute:'2-digit'}).format(new Date())};
    tick();setInterval(tick,30000);
  }
})();