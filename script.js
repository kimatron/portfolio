document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navList = document.querySelector('nav ul');

  menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navList.classList.toggle('show');
  });

  // Smooth scrolling for navigation
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();
          document.querySelector(this.getAttribute('href')).scrollIntoView({
              behavior: 'smooth'
          });
      });
  });

  // Navbar background change on scroll
  const navbar = document.querySelector('header');
  window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
          navbar.style.backgroundColor = 'rgba(10, 10, 10, 0.9)';
      } else {
          navbar.style.backgroundColor = 'rgba(10, 10, 10, 0.8)';
      }
  });

  // Parallax effect for sections
  window.addEventListener('scroll', () => {
      const sections = document.querySelectorAll('section');
      sections.forEach(section => {
          const speed = 0.3;
          const rect = section.getBoundingClientRect();
          const scrollPercent = (rect.top / window.innerHeight) * 100;
          section.style.backgroundPositionY = `${scrollPercent * speed}px`;
      });
  });

  // Typing effect for subtitle
  const subtitle = document.querySelector('.subtitle');
  const text = subtitle.textContent;
  subtitle.textContent = '';
  let i = 0;

  function typeWriter() {
      if (i < text.length) {
          subtitle.textContent += text.charAt(i);
          i++;
          setTimeout(typeWriter, 100);
      }
  }

  typeWriter();

  // Project card tilt effect
  VanillaTilt.init(document.querySelectorAll(".project-card"), {
      max: 25,
      speed: 400,
      glare: true,
      "max-glare": 0.5,
  });

  // Skill item hover effect
  const skillItems = document.querySelectorAll('.skill-item');
  skillItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
          item.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--accent-color');
          item.style.color = getComputedStyle(document.documentElement).getPropertyValue('--bg-color');
      });

      item.addEventListener('mouseleave', () => {
          item.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
          item.style.color = getComputedStyle(document.documentElement).getPropertyValue('--text-color');
      });
  });

  // Form submission (you'll need to set up server-side handling)
  const form = document.querySelector('form');
  if (form) {
      form.addEventListener('submit', (e) => {
          e.preventDefault();
          // Add your form submission logic here
          alert('Form submitted! (Note: This is a placeholder action)');
      });
  }
});

// Add this to your existing JavaScript file

document.addEventListener('DOMContentLoaded', () => {
  // ... (keep your existing code)

  // Blog card animation on scroll
  const blogCards = document.querySelectorAll('.blog-card');
  const blogObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.style.opacity = 1;
              entry.target.style.transform = 'translateY(0)';
          }
      });
  }, { threshold: 0.1 });

  blogCards.forEach(card => {
      card.style.opacity = 0;
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      blogObserver.observe(card);
  });
});