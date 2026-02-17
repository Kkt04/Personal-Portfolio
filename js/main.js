/* =============================================
   KALASH KUMARI THAKUR — PORTFOLIO JS
   Handles: Cursor, Nav, Scroll Animations,
            Mobile Menu, Form, Counter Anim
   ============================================= */

   'use strict';

   // ─── Custom Cursor ───────────────────────────
   const cursor = document.getElementById('cursor');
   const cursorFollower = document.getElementById('cursorFollower');
   
   let mouseX = 0, mouseY = 0;
   let followerX = 0, followerY = 0;
   
   document.addEventListener('mousemove', (e) => {
     mouseX = e.clientX;
     mouseY = e.clientY;
     cursor.style.left = mouseX + 'px';
     cursor.style.top  = mouseY + 'px';
   });
   
   function animateFollower() {
     const speed = 0.12;
     followerX += (mouseX - followerX) * speed;
     followerY += (mouseY - followerY) * speed;
     cursorFollower.style.left = followerX + 'px';
     cursorFollower.style.top  = followerY + 'px';
     requestAnimationFrame(animateFollower);
   }
   animateFollower();
   
   // Cursor states on interactive elements
   document.querySelectorAll('a, button, input, textarea, .skill-tag, .project-card').forEach(el => {
     el.addEventListener('mouseenter', () => {
       cursor.style.transform = 'translate(-50%,-50%) scale(2.5)';
       cursorFollower.style.width  = '52px';
       cursorFollower.style.height = '52px';
       cursorFollower.style.borderColor = 'var(--accent)';
     });
     el.addEventListener('mouseleave', () => {
       cursor.style.transform = 'translate(-50%,-50%) scale(1)';
       cursorFollower.style.width  = '32px';
       cursorFollower.style.height = '32px';
       cursorFollower.style.borderColor = 'rgba(232,197,71,0.5)';
     });
   });
   
   // ─── Navbar Scroll Effect ─────────────────────
   const nav = document.getElementById('nav');
   
   function updateNav() {
     if (window.scrollY > 60) {
       nav.classList.add('scrolled');
     } else {
       nav.classList.remove('scrolled');
     }
   }
   
   window.addEventListener('scroll', updateNav, { passive: true });
   updateNav();
   
   // ─── Active Nav Link Highlighting ─────────────
   const sections = document.querySelectorAll('section[id]');
   const navLinks  = document.querySelectorAll('.nav-link');
   
   function highlightNav() {
     let current = '';
     sections.forEach(section => {
       const sectionTop = section.offsetTop - 100;
       if (window.scrollY >= sectionTop) current = section.getAttribute('id');
     });
     navLinks.forEach(link => {
       link.classList.remove('active');
       if (link.getAttribute('href') === '#' + current) link.classList.add('active');
     });
   }
   window.addEventListener('scroll', highlightNav, { passive: true });
   
   // ─── Mobile Menu ──────────────────────────────
   const hamburger   = document.getElementById('hamburger');
   const mobileMenu  = document.getElementById('mobileMenu');
   const mobLinks    = document.querySelectorAll('.mob-link');
   
   hamburger.addEventListener('click', () => {
     hamburger.classList.toggle('open');
     mobileMenu.classList.toggle('open');
     document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
   });
   
   mobLinks.forEach(link => {
     link.addEventListener('click', () => {
       hamburger.classList.remove('open');
       mobileMenu.classList.remove('open');
       document.body.style.overflow = '';
     });
   });
   
   // ─── Scroll-Triggered Reveal Animation ────────
   const observerOptions = {
     threshold: 0.12,
     rootMargin: '0px 0px -60px 0px'
   };
   
   const revealObserver = new IntersectionObserver((entries) => {
     entries.forEach(entry => {
       if (entry.isIntersecting) {
         const el = entry.target;
         const delay = el.dataset.index ? parseInt(el.dataset.index) * 100 : 0;
         setTimeout(() => el.classList.add('visible'), delay);
         revealObserver.unobserve(el);
       }
     });
   }, observerOptions);
   
   document.querySelectorAll(
     '.skill-category, .project-card, .exp-card, .extra-card'
   ).forEach(el => {
     revealObserver.observe(el);
   });
   
   // ─── Animated Number Counter ──────────────────
   function animateCount(el, target, duration = 1800, suffix = '') {
     const isFloat = target % 1 !== 0;
     let start = 0;
     const increment = target / (duration / 16);
     let current = 0;
   
     const step = () => {
       current += increment;
       if (current >= target) {
         el.textContent = isFloat
           ? target.toFixed(1) + suffix
           : Math.floor(target) + suffix;
         return;
       }
       el.textContent = isFloat
         ? current.toFixed(1) + suffix
         : Math.floor(current) + suffix;
       requestAnimationFrame(step);
     };
     requestAnimationFrame(step);
   }
   
   const statsObserver = new IntersectionObserver((entries) => {
     entries.forEach(entry => {
       if (entry.isIntersecting) {
         const stats = [
           { el: document.querySelector('.stat:nth-child(1) .stat-number'), val: 20, suffix: '+' },
           { el: document.querySelector('.stat:nth-child(3) .stat-number'), val: 98.9, suffix: '%' }
         ];
         stats.forEach(({ el, val, suffix }) => {
           if (el) animateCount(el, val, 1600, suffix);
         });
         statsObserver.unobserve(entry.target);
       }
     });
   }, { threshold: 0.5 });
   
   const heroStats = document.querySelector('.hero-stats');
   if (heroStats) statsObserver.observe(heroStats);
   
   // ─── Smooth Scroll ────────────────────────────
   document.querySelectorAll('a[href^="#"]').forEach(anchor => {
     anchor.addEventListener('click', function (e) {
       const href = this.getAttribute('href');
       if (href === '#') return;
       const target = document.querySelector(href);
       if (!target) return;
       e.preventDefault();
       target.scrollIntoView({ behavior: 'smooth', block: 'start' });
     });
   });
   
   // ─── Contact Form ─────────────────────────────
   const contactForm = document.getElementById('contactForm');
   
   contactForm.addEventListener('submit', function (e) {
     e.preventDefault();
   
     const btn    = this.querySelector('button[type="submit"]');
     const name   = document.getElementById('name').value.trim();
     const email  = document.getElementById('email').value.trim();
     const message = document.getElementById('message').value.trim();
   
     if (!name || !email || !message) return;
   
     // Loading state
     btn.textContent = 'Sending...';
     btn.disabled = true;
     btn.style.opacity = '0.7';
   
     // Simulate send
     setTimeout(() => {
       btn.innerHTML = `
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="width:18px;height:18px">
           <polyline points="20 6 9 17 4 12"/>
         </svg>
         Message Sent!
       `;
       btn.style.background = 'var(--green)';
       btn.style.borderColor = 'var(--green)';
       btn.style.color = 'var(--bg)';
       btn.style.opacity = '1';
       contactForm.reset();
   
       setTimeout(() => {
         btn.innerHTML = `Send Message
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:18px;height:18px">
             <line x1="22" y1="2" x2="11" y2="13"/>
             <polygon points="22 2 15 22 11 13 2 9 22 2"/>
           </svg>`;
         btn.style.background = 'var(--accent)';
         btn.style.borderColor = 'var(--accent)';
         btn.style.color = 'var(--bg)';
         btn.disabled = false;
       }, 3500);
     }, 1200);
   });
   
   // ─── Skill Tag Hover Ripple ───────────────────
   document.querySelectorAll('.skill-tag').forEach(tag => {
     tag.addEventListener('mouseenter', function () {
       this.style.transform = 'translateY(-2px) scale(1.04)';
     });
     tag.addEventListener('mouseleave', function () {
       this.style.transform = 'translateY(0) scale(1)';
     });
   });
   
   // ─── Parallax Hero Orbs ───────────────────────
   const orb1 = document.querySelector('.hero-orb-1');
   const orb2 = document.querySelector('.hero-orb-2');
   
   window.addEventListener('mousemove', (e) => {
     if (!orb1 || !orb2) return;
     const xRatio = e.clientX / window.innerWidth;
     const yRatio = e.clientY / window.innerHeight;
     orb1.style.transform = `translate(${xRatio * -20}px, ${yRatio * -15}px)`;
     orb2.style.transform = `translate(${xRatio * 15}px,  ${yRatio * 20}px)`;
   }, { passive: true });
   
   // ─── Project Card Tilt Effect ─────────────────
   document.querySelectorAll('.project-card').forEach(card => {
     card.addEventListener('mousemove', (e) => {
       const rect  = card.getBoundingClientRect();
       const x     = e.clientX - rect.left - rect.width / 2;
       const y     = e.clientY - rect.top  - rect.height / 2;
       const tiltX = (y / (rect.height / 2)) * 2;
       const tiltY = (x / (rect.width / 2)) * -2;
       card.style.transform = `perspective(900px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(4px)`;
     });
     card.addEventListener('mouseleave', () => {
       card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)';
     });
   });
   
   // ─── Typewriter effect for section tags ────────
   document.querySelectorAll('.section-tag').forEach(tag => {
     const observer = new IntersectionObserver((entries) => {
       entries.forEach(entry => {
         if (entry.isIntersecting) {
           const text = tag.textContent;
           tag.textContent = '';
           let i = 0;
           const type = () => {
             if (i < text.length) {
               tag.textContent += text[i++];
               setTimeout(type, 30);
             }
           };
           type();
           observer.unobserve(tag);
         }
       });
     }, { threshold: 0.5 });
     observer.observe(tag);
   });
   
   // ─── Reduce motion for accessibility ──────────
   const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
   if (prefersReducedMotion.matches) {
     document.querySelectorAll('.skill-category, .project-card').forEach(el => {
       el.style.opacity   = '1';
       el.style.transform = 'none';
     });
   }
   
   // ─── Add active style for nav ─────────────────
   const style = document.createElement('style');
   style.textContent = `.nav-link.active { color: var(--text); } .nav-link.active::after { width: 100%; }`;
   document.head.appendChild(style);
   
   console.log('%c KKT Portfolio Loaded ✓', 'color: #e8c547; font-size: 14px; font-weight: 700;');