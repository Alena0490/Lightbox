    /****Burger menu */
    document.addEventListener('DOMContentLoaded', function () {
        // BURGER MENU
        const burgerToggle = document.getElementById('burger-toggle');
        const burgerNav = document.querySelector('.mobile-nav');
        const burgerIcon = burgerToggle.querySelector('i');
      
        // CONTACT DROPDOWN
        const contactToggle = document.getElementById('contact-toggle');
        const contactDropdown = document.getElementById('contact-dropdown');
        const contactIcon = contactToggle.querySelector('i');
      
        // Helper: zavře contact dropdown
        function closeContact() {
          contactDropdown.style.display = 'none';
          contactDropdown.classList.remove('open');
          contactIcon.classList.add('fa-phone');
          contactIcon.classList.remove('fa-xmark');
        }
      
        // Helper: zavře burger menu
        function closeBurger() {
          burgerNav.style.display = 'none';
          burgerIcon.classList.add('fa-bars');
          burgerIcon.classList.remove('fa-xmark');
        }
      
        burgerToggle.addEventListener('click', () => {
          const isOpen = burgerNav.style.display === 'flex';
      
          // nejdřív zavřeme contact dropdown
          closeContact();
      
          // přepneme stav burgeru
          burgerNav.style.display = isOpen ? 'none' : 'flex';
          burgerIcon.classList.toggle('fa-bars', isOpen);
          burgerIcon.classList.toggle('fa-xmark', !isOpen);
        });
      
        contactToggle.addEventListener('click', () => {
          const isOpen = contactDropdown.classList.toggle('open');
      
          // nejdřív zavřeme burger menu
          closeBurger();
      
          // přepneme zobrazení dropdownu
          contactDropdown.style.display = isOpen ? 'block' : 'none';
          contactIcon.classList.toggle('fa-phone', !isOpen);
          contactIcon.classList.toggle('fa-xmark', isOpen);
        });
      });
                 
document.addEventListener("DOMContentLoaded", function () {
    /***Lightbox */
    // Načteme všechny odkazy, které mají atribut aria-label="lightbox"
    const links = document.querySelectorAll('a[aria-label="lightbox"]');
  
    // Proměnné pro lightbox a ovládací prvky
    let overlay, overlayImg, closeBtn, leftBtn, rightBtn;
  
    // Index právě zobrazeného obrázku
    let currentIndex = -1;
  
    // Pole s URL obrázků
    let images = [];
  
    // Pro každý odkaz...
    links.forEach((link, index) => {
      // Uložíme si jeho URL do pole
      images.push(link.getAttribute('href'));
  
      // Nastavíme posluchač kliknutí
      link.addEventListener('click', e => {
        e.preventDefault(); // Zabráníme přechodu na obrázek
  
        currentIndex = index; // Uložíme si index obrázku
  
        // Získáme popisek z data-title
        const captionText = link.getAttribute("data-title");
  
        // Spustíme funkci pro zobrazení lightboxu
        showLightbox(images[currentIndex], captionText);
      });
    });
  
    // Funkce pro zobrazení lightboxu s obrázkem a volitelným popiskem
    function showLightbox(src, captionText) {
      // Pokud lightbox ještě nebyl vytvořen
      if (!overlay) {
        // Vytvoříme přebalovací vrstvu (overlay)
        overlay = document.createElement('div');
        overlay.id = 'lightbox-overlay';
  
        // Vytvoříme prvek <img> pro zobrazení velkého obrázku
        overlayImg = document.createElement('img');
        overlay.appendChild(overlayImg);
  
        // Ovládací prvky (zavření, šipky)
        const controls = document.createElement('div');
        controls.className = 'lightbox-controls';
  
        // Tlačítko pro zavření (křížek)
        closeBtn = document.createElement('button');
        closeBtn.className = 'lightbox-button';
        closeBtn.innerHTML = '&times;'; // HTML znak ×
        controls.appendChild(closeBtn);
  
        overlay.appendChild(controls);
  
        // Levá šipka
        leftBtn = document.createElement('button');
        leftBtn.className = 'arrow-left';
        leftBtn.textContent = '‹';
        overlay.appendChild(leftBtn);
  
        // Pravá šipka
        rightBtn = document.createElement('button');
        rightBtn.className = 'arrow-right';
        rightBtn.textContent = '›';
        overlay.appendChild(rightBtn);
  
        // Přidáme overlay do stránky (na konec <body>)
        document.body.appendChild(overlay);
  
        // Posluchače pro ovládací prvky
        closeBtn.addEventListener('click', hideLightbox);
        overlay.addEventListener('click', e => {
          if (e.target === overlay) hideLightbox(); // Klik mimo obrázek zavře overlay
        });
        document.addEventListener('keydown', e => {
          if (e.key === 'Escape') hideLightbox(); // Zavření klávesou Esc
          if (e.key === 'ArrowRight') showNext(); // Šipka doprava
          if (e.key === 'ArrowLeft') showPrev();  // Šipka doleva
        });
        leftBtn.addEventListener('click', showPrev);
        rightBtn.addEventListener('click', showNext);
      }
  
      // Změníme src obrázku ve lightboxu
      overlayImg.src = src;
  
      // ⭐ Popisek
      // Smažeme starý popisek (pokud existuje)
      const oldCaption = overlay.querySelector(".lightbox-caption");
      if (oldCaption) oldCaption.remove();
  
      // Vytvoříme nový popisek
      if (captionText) {
        const caption = document.createElement("p");
        caption.textContent = captionText;
        caption.classList.add("lightbox-caption");
        overlay.appendChild(caption);
      }
  
      // Zobrazíme overlay a zakážeme scrollování stránky
      overlay.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }
  
    // Skrytí lightboxu
    function hideLightbox() {
      overlay.style.display = 'none';
      overlayImg.src = '';
      document.body.style.overflow = '';
    }
  
    // Zobrazí předchozí obrázek
    function showPrev() {
      if (currentIndex > 0) {
        currentIndex--;
        const captionText = links[currentIndex].getAttribute("data-title");
        showLightbox(images[currentIndex], captionText);
      }
    }
  
    // Zobrazí následující obrázek
    function showNext() {
      if (currentIndex < images.length - 1) {
        currentIndex++;
        const captionText = links[currentIndex].getAttribute("data-title");
        showLightbox(images[currentIndex], captionText);
      }
    }
  });
  