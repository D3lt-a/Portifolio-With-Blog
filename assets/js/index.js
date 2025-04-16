$(window).ready(function(){
    $('.menu-toggle').click(function(){
      //console.log(2);
      $('.main-nav').toggleClass('main-nav-open',500);
      $(this).toggleClass('open');
    });
  });

  function toggleTheme() {
    const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
  }

  document.addEventListener('scroll', () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(element => {
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        element.classList.add('visible');
      }
    });
  });

  window.addEventListener('scroll', () => {
    const btn=document.getElementById(scrolltotop)
    btn.style.display=window.scrollY>300?"block":"none"})
    