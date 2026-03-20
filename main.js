// Removed ES Module imports for standard local rendering

console.log("Handcrafted by Kajal clone interactive logic initializing...");

// Execute immediately without DOMContentLoaded wrapper so that Vite HMR updates take effect instantly!
const init = () => {
  // --- Scroll Reveal Animations (Transitions) --- 
  const elementsToReveal = document.querySelectorAll(
    '.hero-title, .hero-buttons, .section-title, .section-subtitle, .about-content p, .contact-header, .contact-form-wrapper, .contact-image-wrapper, .testimonials-header, .testimonials-carousel-wrapper'
  );

  const cardsToReveal = document.querySelectorAll('.work-card, .blog-card, .service-item');
  const heroThumbs = document.querySelectorAll('.rounded-thumb');
  const galleryImages = document.querySelectorAll('.gallery-large, .gallery-split img');

  const allRevealElements = [...elementsToReveal, ...cardsToReveal, ...heroThumbs, ...galleryImages];

  allRevealElements.forEach((el) => {
    el.classList.add('reveal');
    if (el.classList.contains('work-card') || el.classList.contains('blog-card') || el.classList.contains('service-item') || el.classList.contains('rounded-thumb')) {
         const parentChildren = Array.from(el.parentElement.children);
         const i = parentChildren.indexOf(el);
         el.style.transitionDelay = `${(i % 4) * 0.15}s`;
    }
  });

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  allRevealElements.forEach(el => observer.observe(el));


  // --- Smooth Parallax Animations ---
  const heroBadge = document.querySelector('.hero-badge-container');
  const aboutImg = document.querySelector('.about-img');
  const galleryImage = document.querySelector('.gallery-large img');
  const splitGalleryImages = document.querySelectorAll('.gallery-split img');
  const thumbsParallax = document.querySelectorAll('.rounded-thumb');

  let ticking = false;
  let lastScrollY = window.pageYOffset;

  const updateParallax = () => {
    const scrollY = lastScrollY;
    const windowHeight = window.innerHeight;

    if (heroBadge && scrollY < windowHeight) {
      heroBadge.style.transform = `translateY(${scrollY * 0.35}px) rotate(${scrollY * 0.05}deg)`;
    }

    if (thumbsParallax.length && scrollY < windowHeight) {
       thumbsParallax.forEach((thumb, i) => {
           const speed = 0.1 + (i * 0.05); 
           if(thumb.classList.contains('active')){
               thumb.style.transform = `translateY(${scrollY * speed}px)`;
           }
       });
    }

    if (aboutImg) {
      const aboutRect = document.querySelector('.about-section').getBoundingClientRect();
      if (aboutRect.top < windowHeight && aboutRect.bottom > 0) {
        aboutImg.style.transform = `translateY(${aboutRect.top * -0.2}px)`;
      }
    }

    ticking = false;
  };

  window.addEventListener('scroll', () => {
    lastScrollY = window.pageYOffset;
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  });
  
  updateParallax();


  // --- Mouse-move 3D Magnetic Tilt Effect for Hero Badge ---
  const badgeArea = document.querySelector('.hero-badge-container');
  if (badgeArea) {
      badgeArea.addEventListener('mousemove', (e) => {
          const rect = badgeArea.getBoundingClientRect();
          const x = e.clientX - rect.left; 
          const y = e.clientY - rect.top; 
          
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          
          const rotateX = ((y - centerY) / centerY) * -20; 
          const rotateY = ((x - centerX) / centerX) * 20;
          
          const badgeTarget = badgeArea.querySelector('.rotating-badge');
          if (badgeTarget) {
              badgeTarget.style.transition = 'transform 0.1s ease-out';
              badgeTarget.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
          }
      });

      badgeArea.addEventListener('mouseleave', () => {
          const badgeTarget = badgeArea.querySelector('.rotating-badge');
          if (badgeTarget) {
              badgeTarget.style.transition = 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
              badgeTarget.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
          }
      });
  }

  // --- Dropdown Menu & Inline Search ---
  const menuBtn = document.querySelector('.menu-btn');
  const menuDropdown = document.querySelector('.menu-dropdown');

  const searchBtn = document.querySelector('.search-btn');
  const searchWrapper = document.querySelector('.search-wrapper');
  const searchInputInline = document.querySelector('.search-inline-input');

  if (menuBtn && menuDropdown) {
    menuBtn.onclick = (e) => {
      e.stopPropagation();
      menuDropdown.classList.toggle('active');
    };
    
    // Auto-close menu if clicking outside
    document.addEventListener('click', (e) => {
      if (!menuBtn.contains(e.target) && !menuDropdown.contains(e.target)) {
        menuDropdown.classList.remove('active');
      }
    });
  }

  if (searchBtn && searchWrapper && searchInputInline) {
    searchBtn.onclick = (e) => {
      e.preventDefault();
      searchWrapper.classList.toggle('active');
      if (searchWrapper.classList.contains('active')) {
         searchInputInline.focus();
      }
    };
  }

// --- Liquid Distortion Hover Effect ---
  const applyLiquidEffect = () => {
    const cards = document.querySelectorAll('.contact-image-wrapper, .blog-card');
    
    const oldContainer = document.getElementById('liquid-svg-container');
    if (oldContainer) oldContainer.remove();

    const svgContainer = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgContainer.id = 'liquid-svg-container';
    svgContainer.setAttribute("style", "position: absolute; width: 0; height: 0; pointer-events: none;");
    
    let svgHTML = '';
    cards.forEach((card, index) => {
      const filterId = `liquid-filter-${index}`;
      svgHTML += `
        <filter id="${filterId}" x="-20%" y="-20%" width="140%" height="140%" color-interpolation-filters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.015 0.02" numOctaves="2" result="noise">
            <animate attributeName="baseFrequency" values="0.015 0.02; 0.02 0.025; 0.015 0.02" dur="4s" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="G" id="disp-${index}" />
        </filter>
      `;
    });
    svgContainer.innerHTML = svgHTML;
    document.body.appendChild(svgContainer);

    cards.forEach((card, index) => {
      const img = card.querySelector('img');
      if (!img) return;

      img.style.filter = `url(#liquid-filter-${index})`;

      let currentScale = 0;
      let targetScale = 0;
      let animFrame;

      const animate = () => {
        currentScale += (targetScale - currentScale) * 0.1;
        const disp = document.getElementById(`disp-${index}`);
        if (disp) disp.setAttribute('scale', currentScale);

        if (Math.abs(targetScale - currentScale) > 0.1) {
          animFrame = requestAnimationFrame(animate);
        } else {
          currentScale = targetScale;
          if (disp) disp.setAttribute('scale', currentScale);
        }
      };

      card.addEventListener('mouseenter', () => {
        targetScale = 35; // Melted look Amount
        cancelAnimationFrame(animFrame);
        animate();
      });

      card.addEventListener('mouseleave', () => {
        targetScale = 0;
        cancelAnimationFrame(animFrame);
        animate();
      });
    });
  };
  applyLiquidEffect();

  // --- Portfolio Filtering Logic ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const workCardsFilter = document.querySelectorAll('.work-card');

  if (filterBtns.length > 0 && workCardsFilter.length > 0) {
    // Initialize initial state: hide anything not tagged with 'all'
    workCardsFilter.forEach(card => {
      const categories = card.getAttribute('data-category').split(' ');
      if (!categories.includes('all')) {
        card.style.display = 'none';
        card.classList.add('hide');
      }
    });

    filterBtns.forEach(btn => {
      btn.onclick = () => {
        // Toggle active button state
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        workCardsFilter.forEach(card => {
          // Remove active reveal transform so it doesn't conflict with filter animation
          card.style.transition = 'none'; 
          card.classList.remove('reveal');
          card.classList.add('active'); // force reveal active if it was hidden
          
          card.style.display = ''; // Reset display so it can animate in
          
          const categories = card.getAttribute('data-category').split(' ');
          
          if (categories.includes(filterValue)) {
             card.classList.remove('hide');
             setTimeout(() => {
                card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
             }, 10);
          } else {
             card.classList.add('hide');
             setTimeout(() => {
                if (card.classList.contains('hide')) {
                   card.style.display = 'none';
                }
             }, 400); // Wait for CSS transition to vanish it, then totally remove from doc flow
          }
        });
      };
    });
  }

  // --- Dynamic Lightbox Navigation ---
  const createLightbox = () => {
    if (document.getElementById('lightbox')) return; 
    
    const lightboxHTML = `
      <div class="lightbox" id="lightbox">
        <button class="lightbox-close" aria-label="Close Lightbox">&times;</button>
        <button class="lightbox-prev" aria-label="Previous Image">&#10094;</button>
        <img class="lightbox-img" id="lightbox-img" src="" alt="Enlarged Art" />
        <button class="lightbox-next" aria-label="Next Image">&#10095;</button>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', lightboxHTML);

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');

    // The gallery images and the complete collection masonry images should open in the lightbox
    const galleryGroup = Array.from(document.querySelectorAll('.gallery-large img, .gallery-split img, .masonry-item img'));

    let currentGalleryIndex = -1;

    const closeLightbox = () => {
      lightbox.classList.remove('active');
      setTimeout(() => {
        lightbox.style.display = 'none';
        lightboxImg.src = '';
        document.body.style.overflow = '';
      }, 400); 
    };

    const showGalleryImage = (index) => {
      if (index >= galleryGroup.length || index < 0) {
        closeLightbox();
        return;
      }
      
      currentGalleryIndex = index;
      
      lightboxImg.style.opacity = '0.3';
      setTimeout(() => {
        lightboxImg.src = galleryGroup[currentGalleryIndex].src;
        lightboxImg.style.opacity = '1';
      }, 150);
    };

    galleryGroup.forEach((img, index) => {
      img.classList.add('lightbox-cursor');
      img.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        currentGalleryIndex = index;
        if (lightboxPrev) lightboxPrev.style.display = 'flex';
        if (lightboxNext) lightboxNext.style.display = 'flex';

        lightboxImg.src = img.src;
        lightboxImg.style.opacity = '1';
        
        lightbox.style.display = 'flex';
        setTimeout(() => { lightbox.classList.add('active'); }, 10);
        document.body.style.overflow = 'hidden'; 
      });
    });

    if (lightboxPrev) lightboxPrev.addEventListener('click', (e) => { e.stopPropagation(); showGalleryImage(currentGalleryIndex - 1); });
    if (lightboxNext) lightboxNext.addEventListener('click', (e) => { e.stopPropagation(); showGalleryImage(currentGalleryIndex + 1); });
    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    
    if (lightbox) {
      lightbox.addEventListener('click', (e) => {
        if (e.target !== lightboxImg && e.target !== lightboxPrev && e.target !== lightboxNext) {
          closeLightbox();
        }
      });
    }

    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      
      if (currentGalleryIndex !== -1) {
          if (e.key === 'ArrowLeft') showGalleryImage(currentGalleryIndex - 1);
          if (e.key === 'ArrowRight') showGalleryImage(currentGalleryIndex + 1);
      }
    });
  };
  
  // Use a slight timeout to ensure images are loaded and in DOM
  setTimeout(createLightbox, 100);

  // --- Testimonials Carousel ---
  const testimonialSlides = document.querySelectorAll('.testimonial-slide');
  const testiPrevBtn = document.querySelector('.testi-btn.prev');
  const testiNextBtn = document.querySelector('.testi-btn.next');
  const testiDots = document.querySelectorAll('.testimonial-dots .dot');

  if (testimonialSlides.length > 0) {
    let currentTestimonial = 0;
    let autoPlayInterval;

    const showTestimonial = (index) => {
      testimonialSlides.forEach(slide => slide.classList.remove('active'));
      testiDots.forEach(dot => dot.classList.remove('active'));
      
      if (index >= testimonialSlides.length) currentTestimonial = 0;
      else if (index < 0) currentTestimonial = testimonialSlides.length - 1;
      else currentTestimonial = index;

      testimonialSlides[currentTestimonial].classList.add('active');
      testiDots[currentTestimonial].classList.add('active');
    };

    const nextTestimonial = () => showTestimonial(currentTestimonial + 1);
    const prevTestimonial = () => showTestimonial(currentTestimonial - 1);

    const startAutoPlay = () => { autoPlayInterval = setInterval(nextTestimonial, 6000); };
    const stopAutoPlay = () => { clearInterval(autoPlayInterval); };

    if(testiNextBtn) testiNextBtn.addEventListener('click', () => {
      nextTestimonial(); stopAutoPlay(); startAutoPlay();
    });

    if(testiPrevBtn) testiPrevBtn.addEventListener('click', () => {
      prevTestimonial(); stopAutoPlay(); startAutoPlay();
    });

    testiDots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        showTestimonial(index); stopAutoPlay(); startAutoPlay();
      });
    });

    const carouselWrapper = document.querySelector('.testimonials-carousel');
    if (carouselWrapper) {
      carouselWrapper.addEventListener('mouseenter', stopAutoPlay);
      carouselWrapper.addEventListener('mouseleave', startAutoPlay);
    }

    startAutoPlay();
  }
};

// Handle Vite HMR edge cases where script is reloaded but page is not re-parsed
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init(); // Fire instantly if DOM is already fully loaded
}
