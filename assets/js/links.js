window.onload = () => {
  const nav = document.querySelector('nav');
  const anchors = document.querySelectorAll('.nav-link');
  const topAnchor = document.querySelector('.scroll-top');
  const nav_toggle = document.querySelector('#nav-toggle');
  const nav_menu = document.getElementById('nav-menu');
  const navbarHeight = 54;
  
  function openMenu() {
    console.log('navmenu display: ', nav_menu.style.display);
    console.log(nav.className);
    console.log(nav.classList);
    if (nav_menu.style.display == '') {
      nav_toggle.style.rotate = '-180deg';
      nav.classList.remove('close');
      nav_menu.style.display = 'block';
      setTimeout(() => {
        nav.classList.add('open');
      }, 100)
    } else if (nav_menu.style.display == 'block') {
      nav_toggle.style.rotate = '-90deg';
      nav.classList.remove('open');
      nav.classList.add('close');
      setTimeout(() => {
        nav_menu.style.display = '';
      }, 500)
    }
  }

  topAnchor.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = topAnchor.getAttribute('href')
    const topSection = document.getElementById(targetId.substring(1));
    scrollToTarget(topSection);
    
    anchors.forEach(a => {
      if (a.getAttribute('href') === targetId) {
        a.style.backgroundColor = 'var(--grey)';
        a.style.color = 'var(--tosca-accent)';
      } else {
        a.style.removeProperty('background-color');
        a.style.removeProperty('color');
      }
    })
  })

  function activateAnchor(e) {
    e.target.style.backgroundColor = 'var(--grey)';
    e.target.style.color = 'var(--tosca-accent)';
    const href = e.target.getAttribute('href');
    for (i of anchors) {
      if (href != i.getAttribute('href')) {
        i.style.removeProperty('background-color');
        i.style.removeProperty('color');
      }
    }
  }

  function scrollToTarget(target) {
    var targetPosition = target.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: targetPosition - navbarHeight,
      behavior: 'smooth',
    });
  }

  anchors.forEach((a) => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      activateAnchor(e);
      const targetId = e.target.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        scrollToTarget(targetSection);
      }
    });
  });

  nav_toggle.addEventListener('click', () => openMenu());

  document.addEventListener('mousemove', (event) => {
    if (
      nav_menu.style.display != '' &&
      event.clientX < nav_menu.getBoundingClientRect().left
    ) {
      nav_toggle.style.rotate = '-90deg';
      setTimeout(() => {
        nav_menu.style.display = '';
      }, 200)
    }
  })
};