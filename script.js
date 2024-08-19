document.addEventListener('DOMContentLoaded', function () {
  const rotatingText = document.getElementById('rotating-text');
  const words = ['developer', 'writer', 'freelancer', 'diver'];
  let currentIndex = 0;

  function rotateText() {
    rotatingText.classList.add('change');
    setTimeout(() => {
      rotatingText.textContent = words[currentIndex];
      rotatingText.classList.remove('change');
      currentIndex = (currentIndex + 1) % words.length;
    }, 500);
  }

  setInterval(rotateText, 3000);

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Navbar background change on scroll
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.backgroundColor = 'var(--navbar-bg)';
      navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
      navbar.style.backgroundColor = 'transparent';
      navbar.style.boxShadow = 'none';
    }
  });

  // Add animation to section titles
  const sectionTitles = document.querySelectorAll('h2');
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  sectionTitles.forEach(title => {
    title.style.opacity = '0';
    title.style.transform = 'translateY(20px)';
    title.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(title);
  });
});

document.addEventListener('DOMContentLoaded', function () {
  // Existing code for rotating text and smooth scrolling

  // Parallax effect for project cards
  const projectCards = document.querySelectorAll('.project-card');

  window.addEventListener('scroll', () => {
    projectCards.forEach(card => {
      const cardTop = card.getBoundingClientRect().top;
      const cardBottom = card.getBoundingClientRect().bottom;
      const windowHeight = window.innerHeight;

      if (cardTop < windowHeight && cardBottom > 0) {
        const scrollPercent = (windowHeight - cardTop) / windowHeight;
        card.style.transform = `translateY(${scrollPercent * 20}px)`;
      }
    });
  });

  // Tilt effect for blog cards
  const blogCards = document.querySelectorAll('.blog-card');

  blogCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const cardRect = card.getBoundingClientRect();
      const cardCenterX = cardRect.left + cardRect.width / 2;
      const cardCenterY = cardRect.top + cardRect.height / 2;
      const mouseX = e.clientX - cardCenterX;
      const mouseY = e.clientY - cardCenterY;

      const rotateX = (mouseY / cardRect.height) * 10;
      const rotateY = -(mouseX / cardRect.width) * 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
  });

  // Animated counter for a statistics section (you can add this section to your HTML)
  function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      obj.innerHTML = Math.floor(progress * (end - start) + start);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  const statsSection = document.querySelector('#stats');
  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
          const target = parseInt(counter.getAttribute('data-target'));
          animateValue(counter, 0, target, 2000);
        });
        observer.unobserve(statsSection);
      }
    }, {
      threshold: 0.5
    });

    observer.observe(statsSection);
  }
});