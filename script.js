// Configuración de partículas
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: ['#ff0080', '#00ffff', '#ffff00']
        },
        shape: {
            type: 'circle',
            stroke: {
                width: 0,
                color: '#000000'
            }
        },
        opacity: {
            value: 0.5,
            random: false,
            anim: {
                enable: false,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 3,
            random: true,
            anim: {
                enable: false,
                speed: 40,
                size_min: 0.1,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#ff0080',
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 6,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'repulse'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 400,
                line_linked: {
                    opacity: 1
                }
            },
            bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 8,
                speed: 3
            },
            repulse: {
                distance: 200,
                duration: 0.4
            },
            push: {
                particles_nb: 4
            },
            remove: {
                particles_nb: 2
            }
        }
    },
    retina_detect: true
});

// Navegación móvil
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle del menú hamburguesa
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Cerrar menú al hacer click en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Scroll suave para los enlaces de navegación
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Efectos de scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    const scrollTop = window.pageYOffset;

    // Efecto de transparencia en el header
    if (scrollTop > 100) {
        header.style.background = 'rgba(26, 26, 46, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(255, 0, 128, 0.3)';
    } else {
        header.style.background = 'rgba(26, 26, 46, 0.95)';
        header.style.boxShadow = 'none';
    }

    // Animación de aparición de las tarjetas de productos
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        const cardTop = card.offsetTop;
        const cardHeight = card.offsetHeight;
        const windowHeight = window.innerHeight;

        if (scrollTop > (cardTop - windowHeight + cardHeight / 2)) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
});

// Funcionalidad de WhatsApp
class WhatsAppHandler {
    constructor() {
        this.bindEvents();
    }

    sendWhatsAppMessage(product, price) {
        const phoneNumber = '5358906498'; // Número de WhatsApp (Cuba)
        const message = `¡Hola! Me interesa el siguiente producto de OtakuStore:\n\n📦 *${product}*\n💰 Precio: ${price}\n\n¿Podrías darme más información?`;
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        
        // Abrir WhatsApp en una nueva ventana
        window.open(whatsappUrl, '_blank');
        
        // Mostrar notificación
        this.showNotification('Redirigiendo a WhatsApp...');
    }

    showNotification(message) {
        // Crear notificación
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: linear-gradient(135deg, #25d366, #128c7e);
            color: white;
            padding: 1rem 2rem;
            border-radius: 25px;
            box-shadow: 0 10px 30px rgba(37, 211, 102, 0.5);
            z-index: 10000;
            animation: slideIn 0.3s ease;
            font-family: 'Orbitron', monospace;
            font-weight: 600;
        `;

        document.body.appendChild(notification);

        // Remover después de 3 segundos
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    bindEvents() {
        // Agregar event listeners a los botones de WhatsApp
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-whatsapp') || e.target.closest('.btn-whatsapp')) {
                e.preventDefault();
                
                const button = e.target.classList.contains('btn-whatsapp') ? e.target : e.target.closest('.btn-whatsapp');
                const product = button.getAttribute('data-product');
                const price = button.getAttribute('data-price');
                
                if (product && price) {
                    this.sendWhatsAppMessage(product, price);
                }
            }
        });
    }
}

// Inicializar WhatsApp handler
const whatsappHandler = new WhatsAppHandler();

// Efectos de hover para las tarjetas de productos
document.addEventListener('DOMContentLoaded', function() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Funcionalidad de búsqueda (para implementar más tarde)
function searchProducts(query) {
    const products = document.querySelectorAll('.product-card');
    const searchTerm = query.toLowerCase();
    
    products.forEach(product => {
        const title = product.querySelector('h3').textContent.toLowerCase();
        const description = product.querySelector('.product-description').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

// Filtros de productos
function filterProducts(category) {
    const sections = document.querySelectorAll('.products-section');
    
    if (category === 'all') {
        sections.forEach(section => {
            section.style.display = 'block';
        });
    } else {
        sections.forEach(section => {
            if (section.id === category) {
                section.style.display = 'block';
            } else {
                section.style.display = 'none';
            }
        });
    }
}

// Animaciones CSS adicionales
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification {
        font-family: 'Orbitron', monospace;
        font-weight: 600;
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
`;
document.head.appendChild(style);

// Efecto de typing para el título
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Lazy loading para imágenes
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Inicializar lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Asegurar carga de portadas de mangas con fallback y sin referrer
document.addEventListener('DOMContentLoaded', function() {
    const fallbackCover = 'https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=300&h=400&fit=crop&auto=format&q=80';
    const mangaImages = document.querySelectorAll('#mangas .product-image img');
    mangaImages.forEach(img => {
        try { img.referrerPolicy = 'no-referrer'; } catch(e) {}
        img.loading = 'lazy';
        img.addEventListener('error', function onErr() {
            if (img.src !== fallbackCover) {
                img.src = fallbackCover;
            }
            img.removeEventListener('error', onErr);
        });
    });
});

// Asegurar carga de imágenes de series con fallback temático anime
document.addEventListener('DOMContentLoaded', function() {
    const seriesFallback = 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=300&h=400&fit=crop&auto=format&q=80';
    const seriesImages = document.querySelectorAll('#series .product-image img');
    seriesImages.forEach(img => {
        try { img.referrerPolicy = 'no-referrer'; } catch(e) {}
        img.loading = 'lazy';
        img.addEventListener('error', function onErr() {
            if (img.src !== seriesFallback) {
                img.src = seriesFallback;
            }
            img.removeEventListener('error', onErr);
        });
    });
});

// Funcionalidad del newsletter
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.querySelector('.newsletter');
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    const submitBtn = newsletterForm.querySelector('.btn');
    
    submitBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const email = emailInput.value.trim();
        
        if (email && isValidEmail(email)) {
            // Simular suscripción exitosa
            cart.showNotification('¡Suscripción exitosa! Recibirás nuestras ofertas.');
            emailInput.value = '';
        } else {
            cart.showNotification('Por favor, ingresa un email válido.');
        }
    });
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Efectos de sonido (opcional - requiere archivos de audio)
function playSound(soundName) {
    // Implementar sonidos si se desea
    console.log(`Playing sound: ${soundName}`);
}

// Modo oscuro/claro (para futuras implementaciones)
function toggleTheme() {
    document.body.classList.toggle('light-theme');
    localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
}

// Cargar tema guardado
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
    }
});

console.log('🎌 OtakuStore cargado correctamente! 🎌');

// --- Renderizado dinámico y filtros (data-driven) ---
(function() {
  const FALLBACKS = {
    series: 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=300&h=400&fit=crop&auto=format&q=80',
    mangas: 'https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=300&h=400&fit=crop&auto=format&q=80',
    peliculas: 'https://images.unsplash.com/photo-1522120692484-d744763db0c6?w=300&h=400&fit=crop&auto=format&q=80'
  };

  function normalizeItem(card) {
    const img = card.querySelector('.product-image img');
    const title = card.querySelector('.product-info h3')?.textContent.trim() || '';
    const desc = card.querySelector('.product-description')?.textContent.trim() || '';
    const price = card.querySelector('.price-current')?.textContent.trim() || '';
    const product = card.querySelector('.btn-whatsapp')?.getAttribute('data-product') || title;
    const dataPrice = card.querySelector('.btn-whatsapp')?.getAttribute('data-price') || price || '';
    return { title, desc, price, img: img?.getAttribute('src') || '', alt: img?.getAttribute('alt') || title, product, dataPrice };
  }

  function readGrid(sectionId) {
    const items = [];
    const cards = document.querySelectorAll(`#${sectionId} .products-grid .product-card`);
    cards.forEach(card => items.push(normalizeItem(card)));
    return items;
  }

  function enhanceImage(imgEl, fallbackUrl) {
    try { imgEl.referrerPolicy = 'no-referrer'; } catch(e) {}
    imgEl.loading = 'lazy';
    imgEl.addEventListener('error', function onErr() {
      // Si hay candidatos alternativos, probarlos antes del fallback
      const altsRaw = imgEl.dataset && imgEl.dataset.alts ? imgEl.dataset.alts : '';
      let alts = [];
      try { alts = altsRaw ? JSON.parse(altsRaw) : []; } catch(_) { alts = (altsRaw || '').split('|').filter(Boolean); }
      if (alts && alts.length) {
        const next = alts.shift();
        imgEl.dataset.alts = JSON.stringify(alts);
        if (next && imgEl.src !== next) { imgEl.src = next; return; }
      }
      const perItemFallback = imgEl.dataset && imgEl.dataset.fallback ? imgEl.dataset.fallback : null;
      const fb = perItemFallback || fallbackUrl;
      if (imgEl.src !== fb) { imgEl.src = fb; }
      imgEl.removeEventListener('error', onErr);
    });
  }

  // Intenta resolver una imagen local en /img que coincida con el título
  function resolveLocalSeriesImage(title, originalImgUrl) {
    if (!title) return { src: originalImgUrl, fallback: originalImgUrl, alternates: [] };
    // Lista de archivos reales en /img para mejorar coincidencias "similares"
    const LOCAL_IMG_FILES = [
      'Ajin.webp',
      'Bastard!! - Heavy Metal, Dark Fantasy.webp',
      'Blue Lock.webp',
      'Code geasw.webp',
      'Fma Brotherhood.webp',
      'Fma.webp',
      'Free.webp',
      'Haikyu.webp',
      'Hellsing.webp',
      'High Card.webp',
      'High_School_DxD_Vol.1_DVD.webp',
      'Ijiranaide,_Nagatoro-san_-_Anime.webp',
      'KonoSuba.webp',
      'Maou Gakuin no Futekigousha Shijou Saikyou.webp',
      'Monster.webp',
      'Ninja kamui.webp',
      'One-Punch Man.webp',
      'Prince of tenis.webp',
      'Ragna Crimson.webp',
      'Serial experimentos lain.webp',
      'Steins;Gate.webp',
      'Summer_Time_Rendering_volume_1_cover.webp',
      'Súper crooks.webp',
      'Tales of Wedding Rings.webp',
      'Tensei shitara slime data ken.webp',
      'The Irregular at Magic High School.webp',
      'They god of highschool.webp',
      'Toradora.webp',
      'Trigun stanpede.webp',
      'Trigun.webp',
      'Your lie i. Abril.webp',
      'berserk.webp',
      'erased.webp',
      'frieren.webp',
      'hells-paradise-jigokuraku-1-6496e9159c24f.avif',
      'mashle.webp',
      'plunderer05.webp',
      'revenger.webp',
      'the kingdom of ruins.webp',
      'violet evergarden.avif'
    ];

    // Normalizador robusto para comparar título y base de archivo
    const norm = (s) => (s || '')
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[._-]+/g, ' ')
      .replace(/[^a-z0-9\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    const fileBase = (f) => f.replace(/\\/g, '/').split('/').pop().replace(/\.(jpg|jpeg|png|webp|avif)$/i, '');
    const titleN = norm(title);

    const base = title
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // quitar acentos
      .replace(/[:!¡¿?.,'"()]/g, '')
      .replace(/\s+/g, ' ') // normaliza espacios
      .trim();

    // Casos especiales según archivos existentes en /img
    const specialMap = new Map([
      ['Code Geass', 'Code geasw.webp'],
      ['The God of High School', 'They god of highschool.webp'],
      ['Fullmetal Alchemist: Brotherhood', 'Fma Brotherhood.webp'],
      ['Fullmetal Alchemist', 'Fma.webp'],
      ['Prince of Tennis', 'Prince of tenis.webp'],
      ['Serial Experiments Lain', 'Serial experimentos lain.webp'],
      ['Your Lie in April', 'Your lie i. Abril.webp'],
      ['Trigun Stampede', 'Trigun stanpede.webp'],
      ['Hell\'s Paradise: Jigokuraku', 'hells-paradise-jigokuraku-1-6496e9159c24f.avif'],
      ['Violet Evergarden', 'violet evergarden.avif'],
      ['High School DxD', 'High_School_DxD_Vol.1_DVD.webp'],
      ['Summer Time Rendering', 'Summer_Time_Rendering_volume_1_cover.webp'],
      ['Tensei Shitara Slime Datta Ken', 'Tensei shitara slime data ken.webp'],
      // Multilenguaje / otras variantes
      ['The Misfit of Demon King Academy', 'Maou Gakuin no Futekigousha Shijou Saikyou.webp'],
      ["Don't Toy With Me, Miss Nagatoro", 'Ijiranaide,_Nagatoro-san_-_Anime.webp'],
      ['Super Crooks', 'Súper crooks.webp'],
      ['The Kingdoms of Ruin', 'the kingdom of ruins.webp'],
      ['Konosuba: God\'s Blessing on This Wonderful World!', 'KonoSuba.webp'],
      ['Ajin: Demi-Human', 'Ajin.webp'],
      ['Frieren: Beyond Journey\'s End', 'frieren.webp'],
      ['Mashle: Magic and Muscles', 'mashle.webp'],
      ['Berserk', 'berserk.webp'],
      ['Erased', 'erased.webp'],
      ['Plunderer', 'plunderer05.webp'],
      ['Revenger', 'revenger.webp'],
      ['Welcome to Demon School! Iruma-kun', 'Iruma-kun.webp'],
    ]);

    const directCandidates = [];
    if (specialMap.has(title)) directCandidates.push(specialMap.get(title));

    // Generar candidatos comunes
    const exts = ['jpg','jpeg','png','webp','avif'];
    const variants = [
      base,
      base.replace(/\s+/g, '_'),
      base.replace(/\s+/g, '-')
    ];
    const candidatesFromTitle = [];
    variants.forEach(v => exts.forEach(ext => candidatesFromTitle.push(`${v}.${ext}`)));
    directCandidates.push(...candidatesFromTitle);

    // Además, probar alias abreviados comunes
    const alias = base
      .replace(/fullmetal alchemist brotherhood/i, 'Fma Brotherhood')
      .replace(/fullmetal alchemist/i, 'Fma')
      .replace(/konosuba.*/i, 'KonoSuba')
      .replace(/haikyu+!!?/i, 'Haikyu')
      .replace(/one ?punch ?man/i, 'One-Punch Man')
      .replace(/trigun stampede/i, 'Trigun stanpede')
      .replace(/the god of high school/i, 'They god of highschool')
      .replace(/prince of tennis/i, 'Prince of tenis')
      .replace(/serial experiments lain/i, 'Serial experimentos lain')
      .replace(/your lie in april/i, 'Your lie i. Abril')
      .replace(/tensei shitara slime datta ken/i, 'Tensei shitara slime data ken')
      .replace(/the misfit of demon king academy/i, 'Maou Gakuin no Futekigousha Shijou Saikyou')
      .replace(/don.?t toy with me,? miss nagatoro/i, 'Ijiranaide, Nagatoro san')
      .replace(/super crooks/i, 'Súper crooks')
      .replace(/the kingdoms? of ruin/i, 'the kingdom of ruins')
      .replace(/frieren.*journey.*end/i, 'frieren')
      .replace(/mashle.*muscles/i, 'mashle')
      .replace(/ajin.*demi.?human/i, 'Ajin')
      .replace(/plunderer/i, 'plunderer05')
      .replace(/revenger/i, 'revenger')
    ;
    const aliasBase = alias;
    const aliasCandidates = [];
    [aliasBase, aliasBase.replace(/\s+/g,'_'), aliasBase.replace(/\s+/g,'-')].forEach(v => exts.forEach(ext => aliasCandidates.push(`${v}.${ext}`)));
    directCandidates.push(...aliasCandidates);

    // Caso explícito pedido: "Baki Hanma: Son of Ogre" sin dos puntos
    if (/^baki hanma:? son of ogre$/i.test(title)) {
      ['jpg','jpeg','png','webp','avif'].forEach(ext => directCandidates.unshift(`Baki Hanma Son of Ogre.${ext}`));
    }
    // Caso explícito: Welcome to Demon School! Iruma-kun (variantes de nombre)
    if (/welcome to demon school!? iruma[- ]?kun/i.test(title)) {
      const irumaFiles = [
        'Iruma-kun', 'Iruma kun', 'Mairimashita! Iruma-kun', 'Mairimashita Iruma kun'
      ];
      irumaFiles.forEach(baseName => exts.forEach(ext => directCandidates.unshift(`${baseName}.${ext}`)));
    }

    // Dado que desde el navegador no podemos listar /img, intentamos en orden.
    // El "existence check" se resuelve vía onerror -> fallback en enhanceImage.
    // Por eso devolvemos el primer candidato como src preferido y usamos original como fallback.
    const ordered = directCandidates.filter(Boolean).map(f => `img/${f}`);
    if (ordered.length) {
      const [first, ...rest] = ordered;
      return { src: first, fallback: originalImgUrl || '', alternates: rest };
    }

    // Búsqueda difusa sobre los archivos reales: coincidencia por inclusión recíproca del normalizado
    let best = null;
    let bestScore = -1;
    LOCAL_IMG_FILES.forEach(fname => {
      const b = fileBase(fname);
      const n = norm(b);
      // puntuación simple: exacto (3), empieza/termina (2), incluye (1), intersección de tokens (0-1)
      let score = 0;
      if (n === titleN) score = 3;
      else if (n.startsWith(titleN) || titleN.startsWith(n)) score = 2;
      else if (n.includes(titleN) || titleN.includes(n)) score = 1.5;
      else {
        const tksT = new Set(titleN.split(' '));
        const tksN = new Set(n.split(' '));
        let inter = 0;
        tksT.forEach(t => { if (t.length > 2 && tksN.has(t)) inter++; });
        const denom = Math.max(1, Math.min(tksT.size, tksN.size));
        score = inter / denom; // 0..1
      }
      if (score > bestScore) { bestScore = score; best = fname; }
    });

    if (best && bestScore >= 1) { // requiere una coincidencia razonable
      const tries = exts.map(ext => `img/${fileBase(best)}.${ext}`);
      return { src: tries[0], fallback: originalImgUrl || '', alternates: tries.slice(1) };
    }

    return { src: originalImgUrl, fallback: originalImgUrl, alternates: [] };
  }

  function renderGrid(sectionId, items) {
    const grid = document.querySelector(`#${sectionId} .products-grid`);
    if (!grid) return;
    const fb = FALLBACKS[sectionId] || FALLBACKS.series;
    grid.innerHTML = items.map(raw => {
      const item = { ...raw };
      let imgSrc = item.img;
      let perItemFallback = '';
      let alternates = [];
      // Resolver imagen local y alternativos para cualquier sección
      const resolved = resolveLocalSeriesImage(item.title, item.img);
      imgSrc = resolved.src;
      perItemFallback = resolved.fallback || '';
      alternates = resolved.alternates || [];
      const dataFallback = perItemFallback || item.img || fb;
      const alt = item.alt || item.title;
      return `
      <div class="product-card" title="${item.title}">
        <div class="product-image">
          <img src="${imgSrc}" alt="${alt}" title="${item.title}" data-fallback="${dataFallback}" data-alts='${JSON.stringify(alternates)}'>
        </div>
        <div class="product-info">
          <h3 title="${item.title}">${item.title}</h3>
          <p class="product-description">${item.desc}</p>
          <div class="product-price">
            <span class="price-current">${item.price}</span>
            <button class="btn btn-whatsapp icon-only" title="Pedir por WhatsApp" aria-label="Pedir por WhatsApp" data-product="${item.product}" data-price="${item.dataPrice}">
              <i class="fab fa-whatsapp"></i>
            </button>
          </div>
        </div>
      </div>`;
    }).join('');
    grid.querySelectorAll('img').forEach(img => enhanceImage(img, fb));
  }

  function setupFilter(inputId, sectionId, dataset) {
    const input = document.getElementById(inputId);
    if (!input) return;
    input.addEventListener('input', () => {
      const q = input.value.trim().toLowerCase();
      const filtered = q ? dataset.filter(x => x.title.toLowerCase().includes(q)) : dataset;
      renderGrid(sectionId, filtered);
    });
  }

  // Catálogo embebido (fuente de verdad para todos los usuarios)
  window.catalog = {
    "series": [
      {
        "title": "Code Geass",
        "desc": "Sunrise · Mecha, estrategia",
        "price": "$29.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/2/2f/Code_Geass_DVD.webp",
        "alt": "Code Geass",
        "product": "Code Geass - Serie",
        "dataPrice": "$29.99"
      },
      {
        "title": "The God of High School",
        "desc": "MAPPA · Artes marciales",
        "price": "$24.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/0/0f/The_God_of_High_School_anime_key_visual.webp",
        "alt": "The God of High School",
        "product": "The God of High School - Serie",
        "dataPrice": "$24.99"
      },
      {
        "title": "Ninja Kamui",
        "desc": "E&H Production · Acción ninja",
        "price": "$19.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/4/44/Ninja_Kamui_key_visual.webp",
        "alt": "Ninja Kamui",
        "product": "Ninja Kamui - Serie",
        "dataPrice": "$19.99"
      },
      {
        "title": "Hellsing",
        "desc": "Gonzo · Vampiros, acción",
        "price": "$19.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/7/70/HellsingDVD.webp",
        "alt": "Hellsing",
        "product": "Hellsing - Serie",
        "dataPrice": "$19.99"
      },
      {
        "title": "The Misfit of Demon King Academy",
        "desc": "Silver Link · Fantasía escolar",
        "price": "$21.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/8/82/Maou_Gakuin_no_Futekigousha_key_visual.webp",
        "alt": "The Misfit of Demon King Academy",
        "product": "The Misfit of Demon King Academy - Serie",
        "dataPrice": "$21.99"
      },
      {
        "title": "Haikyu!!",
        "desc": "Production I.G · Voleibol",
        "price": "$24.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/3/3f/Haikyu%21%21_first_season_BD_vol._1.webp",
        "alt": "Haikyu!!",
        "product": "Haikyu!! - Serie",
        "dataPrice": "$24.99"
      },
      {
        "title": "Toradora!",
        "desc": "J.C.Staff · Romance escolar",
        "price": "$19.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/7/72/Toradora%21_light_novel_volume_1_cover.webp",
        "alt": "Toradora!",
        "product": "Toradora! - Serie",
        "dataPrice": "$19.99"
      },
      {
        "title": "The Prince of Tennis",
        "desc": "Trans Arts · Tenis shōnen",
        "price": "$19.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/3/3b/Prince_of_Tennis_volume_1_cover.webp",
        "alt": "The Prince of Tennis",
        "product": "The Prince of Tennis - Serie",
        "dataPrice": "$19.99"
      },
      {
        "title": "Super Crooks",
        "desc": "Bones · Crimen y superpoderes",
        "price": "$17.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/4/4e/Super_Crooks_Key_Art.webp",
        "alt": "Super Crooks",
        "product": "Super Crooks - Serie",
        "dataPrice": "$17.99"
      },
      {
        "title": "Frieren: Beyond Journey's End",
        "desc": "Madhouse · Fantasía emotiva",
        "price": "$24.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/8/8b/Frieren_Anime_Teaser_Visual.webp",
        "alt": "Frieren: Beyond Journey's End",
        "product": "Frieren - Serie",
        "dataPrice": "$24.99"
      },
      {
        "title": "Your Lie in April",
        "desc": "A-1 Pictures · Música y drama",
        "price": "$19.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/7/7c/Your_Lie_in_April_Manga_cover_1.webp",
        "alt": "Your Lie in April",
        "product": "Your Lie in April - Serie",
        "dataPrice": "$19.99"
      },
      {
        "title": "Serial Experiments Lain",
        "desc": "Triangle Staff · Cyber-psicológico",
        "price": "$16.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/0/05/Serial_Experiments_Lain_DVD.webp",
        "alt": "Serial Experiments Lain",
        "product": "Serial Experiments Lain - Serie",
        "dataPrice": "$16.99"
      },
      {
        "title": "Violet Evergarden",
        "desc": "Kyoto Animation · Drama",
        "price": "$24.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/a/af/Violet_Evergarden_key_visual.webp",
        "alt": "Violet Evergarden",
        "product": "Violet Evergarden - Serie",
        "dataPrice": "$24.99"
      },
      {
        "title": "Trigun Stampede",
        "desc": "Orange · Sci‑fi western",
        "price": "$22.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/8/8a/Trigun_Stampede_key_visual.webp",
        "alt": "Trigun Stampede",
        "product": "Trigun Stampede - Serie",
        "dataPrice": "$22.99"
      },
      {
        "title": "Trigun",
        "desc": "Madhouse · Sci‑fi western clásico",
        "price": "$19.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/2/2b/Trigun_Anime.webp",
        "alt": "Trigun",
        "product": "Trigun - Serie",
        "dataPrice": "$19.99"
      },
      {
        "title": "That Time I Got Reincarnated as a Slime",
        "desc": "8bit · Fantasía isekai",
        "price": "$22.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/f/fd/That_Time_I_Got_Reincarnated_as_a_Slime_volume_1_cover.webp",
        "alt": "That Time I Got Reincarnated as a Slime",
        "product": "Tensei Shitara Slime Datta Ken - Serie",
        "dataPrice": "$22.99"
      },
      {
        "title": "Heavenly Delusion",
        "desc": "Production I.G · Misterio postapocalíptico",
        "price": "$21.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/9/9a/Heavenly_Delusion_key_visual.webp",
        "alt": "Heavenly Delusion",
        "product": "Tengoku Daimakyo - Serie",
        "dataPrice": "$21.99"
      },
      {
        "title": "Fullmetal Alchemist: Brotherhood",
        "desc": "Bones · Acción y alquimia",
        "price": "$29.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/7/7c/Fullmetal_Alchemist_Brotherhood_key_visual.webp",
        "alt": "Fullmetal Alchemist: Brotherhood",
        "product": "FMA: Brotherhood - Serie",
        "dataPrice": "$29.99"
      },
      {
        "title": "Fullmetal Alchemist",
        "desc": "Bones · Serie original 2003",
        "price": "$19.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/8/8e/Fullmetal_Alchemist_anime.webp",
        "alt": "Fullmetal Alchemist",
        "product": "Fullmetal Alchemist (2003) - Serie",
        "dataPrice": "$19.99"
      },
      {
        "title": "Free!",
        "desc": "Kyoto Animation · Natación",
        "price": "$17.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/5/58/Free%21_anime_key_visual.webp",
        "alt": "Free!",
        "product": "Free! - Serie",
        "dataPrice": "$17.99"
      },
      {
        "title": "Don't Toy with Me, Miss Nagatoro",
        "desc": "Telecom Animation · Comedia escolar",
        "price": "$16.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/8/85/Don%27t_Toy_With_Me%2C_Miss_Nagatoro_volume_1_cover.webp",
        "alt": "Don't Toy with Me, Miss Nagatoro",
        "product": "Ijiranaide, Nagatoro-san - Serie",
        "dataPrice": "$16.99"
      },
      {
        "title": "Hell's Paradise: Jigokuraku",
        "desc": "MAPPA · Acción oscura",
        "price": "$22.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/8/8a/Hell%27s_Paradise_Jigokuraku_anime_key_visual.webp",
        "alt": "Hell's Paradise: Jigokuraku",
        "product": "Jigokuraku - Serie",
        "dataPrice": "$22.99"
      },
      {
        "title": "Erased",
        "desc": "A-1 Pictures · Thriller temporal",
        "price": "$18.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/f/ff/Erased_2016_key_visual.webp",
        "alt": "Erased",
        "product": "Erased - Serie",
        "dataPrice": "$18.99"
      },
      {
        "title": "Berserk",
        "desc": "GEMBA · Dark fantasy",
        "price": "$21.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/9/9a/Berserk_2016_key_visual.webp",
        "alt": "Berserk",
        "product": "Berserk - Serie",
        "dataPrice": "$21.99"
      },
      {
        "title": "Plunderer",
        "desc": "Geek Toys · Acción y fantasía",
        "price": "$17.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/b/b7/Plunderer_anime_key_visual.webp",
        "alt": "Plunderer",
        "product": "Plunderer - Serie",
        "dataPrice": "$17.99"
      },
      {
        "title": "Mashle: Magic and Muscles",
        "desc": "A-1 Pictures · Comedia mágica",
        "price": "$19.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/9/9f/Mashle_anime_key_visual.webp",
        "alt": "Mashle: Magic and Muscles",
        "product": "Mashle - Serie",
        "dataPrice": "$19.99"
      },
      {
        "title": "The Kingdoms of Ruin",
        "desc": "Yokohama Animation Lab · Venganza oscura",
        "price": "$18.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/6/6a/The_Kingdoms_of_Ruin_key_visual.webp",
        "alt": "The Kingdoms of Ruin",
        "product": "Hametsu no Oukoku - Serie",
        "dataPrice": "$18.99"
      },
      {
        "title": "Steins;Gate",
        "desc": "White Fox · Sci‑fi psicológico",
        "price": "$23.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/0/0a/Steins%3BGate_promotional_image.webp",
        "alt": "Steins;Gate",
        "product": "Steins;Gate - Serie",
        "dataPrice": "$23.99"
      },
      {
        "title": "KonoSuba",
        "desc": "Studio Deen · Comedia isekai",
        "price": "$18.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/8/8b/KonoSuba_poster.webp",
        "alt": "KonoSuba",
        "product": "Kono Subarashii Sekai ni Shukufuku wo! - Serie",
        "dataPrice": "$18.99"
      },
      {
        "title": "Ajin: Demi-Human",
        "desc": "Polygon Pictures · Suspenso",
        "price": "$18.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/8/8a/Ajin_anime_key_visual.webp",
        "alt": "Ajin: Demi-Human",
        "product": "Ajin - Serie",
        "dataPrice": "$18.99"
      },
      {
        "title": "Bastard!! - Heavy Metal, Dark Fantasy",
        "desc": "LIDENFILMS · Fantasía dark",
        "price": "$21.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/f/fb/Bastard%21%21_Heavy_Metal%2C_Dark_Fantasy_key_visual.webp",
        "alt": "Bastard!!",
        "product": "Bastard!! (2022) - Serie",
        "dataPrice": "$21.99"
      },
      {
        "title": "Summer Time Rendering",
        "desc": "OLM · Misterio",
        "price": "$21.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/7/7e/Summer_Time_Rendering_key_visual.webp",
        "alt": "Summer Time Rendering",
        "product": "Summer Time Rendering - Serie",
        "dataPrice": "$21.99"
      },
      {
        "title": "Blue Lock",
        "desc": "8bit · Fútbol",
        "price": "$19.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/3/36/Blue_Lock_anime_key_visual.webp",
        "alt": "Blue Lock",
        "product": "Blue Lock - Serie",
        "dataPrice": "$19.99"
      },
      {
        "title": "Ragna Crimson",
        "desc": "Silver Link · Dragones",
        "price": "$19.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/f/f8/Ragna_Crimson_key_visual.webp",
        "alt": "Ragna Crimson",
        "product": "Ragna Crimson - Serie",
        "dataPrice": "$19.99"
      },
      {
        "title": "Monster",
        "desc": "Madhouse · Thriller psicológico",
        "price": "$24.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/0/0b/Monster_DVD_cover.webp",
        "alt": "Monster",
        "product": "Monster - Serie",
        "dataPrice": "$24.99"
      },
      {
        "title": "One-Punch Man",
        "desc": "Madhouse/J.C.Staff · Acción y comedia",
        "price": "$22.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/f/f0/One-Punch_Man_anime_key_visual.webp",
        "alt": "One-Punch Man",
        "product": "One-Punch Man - Serie",
        "dataPrice": "$22.99"
      },
      {
        "title": "High School DxD",
        "desc": "TNK/Passione · Ecchi acción",
        "price": "$18.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/5/52/High_School_DxD_key_visual.webp",
        "alt": "High School DxD",
        "product": "High School DxD - Serie",
        "dataPrice": "$18.99"
      },
      {
        "title": "The Irregular at Magic High School",
        "desc": "Madhouse/8bit · Magia y sci‑fi",
        "price": "$21.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/a/ad/The_Irregular_at_Magic_High_School_key_visual.webp",
        "alt": "The Irregular at Magic High School",
        "product": "Mahouka Koukou no Rettousei - Serie",
        "dataPrice": "$21.99"
      },
      {
        "title": "High Card",
        "desc": "Studio Hibari · Acción de cartas",
        "price": "$17.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/1/1f/High_Card_key_visual.webp",
        "alt": "High Card",
        "product": "High Card - Serie",
        "dataPrice": "$17.99"
      },
      {
        "title": "Tales of Wedding Rings",
        "desc": "Staple Entertainment · Fantasía",
        "price": "$18.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/d/d8/Tales_of_Wedding_Rings_key_visual.webp",
        "alt": "Tales of Wedding Rings",
        "product": "Kekkon Yubiwa Monogatari - Serie",
        "dataPrice": "$18.99"
      },
      {
        "title": "Revenger",
        "desc": "Ajia-do · Acción samurái",
        "price": "$17.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/7/74/Revenger_anime_key_visual.webp",
        "alt": "Revenger",
        "product": "Revenger - Serie",
        "dataPrice": "$17.99"
      },
      {
        "title": "Ao Ashi",
        "desc": "Production I.G · Fútbol",
        "price": "$19.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/0/04/Ao_Ashi_key_visual.webp",
        "alt": "Ao Ashi",
        "product": "Ao Ashi - Serie",
        "dataPrice": "$19.99"
      },
      {
        "title": "Fire Force",
        "desc": "David Production · Bomberos sobrenaturales",
        "price": "$21.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/7/79/Fire_Force_anime_key_visual.webp",
        "alt": "Fire Force",
        "product": "Fire Force - Serie",
        "dataPrice": "$21.99"
      },
      {
        "title": "Baki Hanma: Son of Ogre",
        "desc": "TMS/Netflix · Artes marciales",
        "price": "$19.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/9/90/Baki_Hanma_key_visual.webp",
        "alt": "Baki Hanma: Son of Ogre",
        "product": "Hanma Baki: Son of Ogre - Serie",
        "dataPrice": "$19.99"
      },
      {
        "title": "Baki",
        "desc": "TMS/Netflix · Artes marciales",
        "price": "$19.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/9/9b/Baki_2018_key_visual.webp",
        "alt": "Baki",
        "product": "Baki - Serie",
        "dataPrice": "$19.99"
      },
      {
        "title": "Baki the Grappler",
        "desc": "Group TAC · Artes marciales",
        "price": "$17.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/c/ca/Grappler_Baki_DVD_Cover.webp",
        "alt": "Baki the Grappler",
        "product": "Baki the Grappler - Serie",
        "dataPrice": "$17.99"
      },
      {
        "title": "Welcome to Demon School! Iruma-kun",
        "desc": "BN Pictures · Comedia fantasía",
        "price": "$18.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/5/55/Welcome_to_Demon_School%21_Iruma-kun_key_visual.webp",
        "alt": "Welcome to Demon School! Iruma-kun",
        "product": "Mairimashita! Iruma-kun - Serie",
        "dataPrice": "$18.99"
      },
      {
        "title": "Trapped in a Dating Sim",
        "desc": "ENGI · Isekai y mechas",
        "price": "$18.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/7/7b/Trapped_in_a_Dating_Sim_key_visual.webp",
        "alt": "Trapped in a Dating Sim",
        "product": "Otome Game Sekai wa Mob - Serie",
        "dataPrice": "$18.99"
      },
      {
        "title": "Kuroko's Basketball",
        "desc": "Production I.G · Baloncesto",
        "price": "$19.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/9/9a/Kuroko%27s_Basketball_vol._1.webp",
        "alt": "Kuroko's Basketball",
        "product": "Kuroko no Basket - Serie",
        "dataPrice": "$19.99"
      },
      {
        "title": "The Eminence in Shadow",
        "desc": "Nexus · Isekai y acción",
        "price": "$19.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/1/1c/The_Eminence_in_Shadow_key_visual.webp",
        "alt": "The Eminence in Shadow",
        "product": "Kage no Jitsuryokusha ni Naritakute - Serie",
        "dataPrice": "$19.99"
      },
      {
        "title": "Demon Slayer: Kimetsu no Yaiba",
        "desc": "ufotable · Acción demonios",
        "price": "$24.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/8/8f/Demon_Slayer_-_Kimetsu_no_Yaiba_key_visual.webp",
        "alt": "Demon Slayer",
        "product": "Kimetsu no Yaiba - Serie",
        "dataPrice": "$24.99"
      },
      {
        "title": "Rascal Does Not Dream of Bunny Girl Senpai",
        "desc": "CloverWorks · Drama romántico",
        "price": "$18.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/3/3d/Rascal_Does_Not_Dream_of_Bunny_Girl_Senpai_key_visual.webp",
        "alt": "Bunny Girl Senpai",
        "product": "Seishun Buta Yarou - Serie",
        "dataPrice": "$18.99"
      },
      {
        "title": "Solo Leveling",
        "desc": "A-1 Pictures · Acción RPG",
        "price": "$24.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/3/33/Solo_Leveling_anime_key_visual.webp",
        "alt": "Solo Leveling",
        "product": "Solo Leveling - Serie",
        "dataPrice": "$24.99"
      },
      {
        "title": "Yu Yu Hakusho",
        "desc": "Pierrot · Clásico shōnen",
        "price": "$19.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/4/4c/YuYu_Hakusho_DVD.webp",
        "alt": "Yu Yu Hakusho",
        "product": "Yu Yu Hakusho - Serie",
        "dataPrice": "$19.99"
      },
      {
        "title": "Cyberpunk: Edgerunners",
        "desc": "Trigger · Sci‑fi neon",
        "price": "$19.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/7/7f/Cyberpunk_Edgerunners_key_art.webp",
        "alt": "Cyberpunk: Edgerunners",
        "product": "Cyberpunk: Edgerunners - Serie",
        "dataPrice": "$19.99"
      },
      {
        "title": "Tokyo Ghoul",
        "desc": "Pierrot · Terror y acción",
        "price": "$19.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/4/4a/Tokyo_Ghoul_anime_key_visual.webp",
        "alt": "Tokyo Ghoul",
        "product": "Tokyo Ghoul - Serie",
        "dataPrice": "$19.99"
      },
      {
        "title": "Naruto",
        "desc": "Pierrot · Ninja shōnen",
        "price": "$24.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/9/94/Naruto_key_visual.webp",
        "alt": "Naruto",
        "product": "Naruto - Serie",
        "dataPrice": "$24.99"
      },
      {
        "title": "Naruto Shippuden",
        "desc": "Pierrot · Ninja shōnen",
        "price": "$29.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/7/79/Naruto_Shippuden_key_visual.webp",
        "alt": "Naruto Shippuden",
        "product": "Naruto Shippuden - Serie",
        "dataPrice": "$29.99"
      },
      {
        "title": "Requiem of the Rose King",
        "desc": "J.C.Staff · Drama histórico",
        "price": "$17.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/6/6a/Requiem_of_the_Rose_King_anime_key_visual.webp",
        "alt": "Requiem of the Rose King",
        "product": "Baraou no Souretsu - Serie",
        "dataPrice": "$17.99"
      },
      {
        "title": "The Seven Deadly Sins",
        "desc": "A-1 Pictures · Fantasía",
        "price": "$21.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/d/d0/The_Seven_Deadly_Sins_anime_key_visual.webp",
        "alt": "The Seven Deadly Sins",
        "product": "Nanatsu no Taizai - Serie",
        "dataPrice": "$21.99"
      },
      {
        "title": "Is It Wrong to Try to Pick Up Girls in a Dungeon?",
        "desc": "J.C.Staff · Dungeon aventura",
        "price": "$19.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/4/4b/Is_It_Wrong_to_Try_to_Pick_Up_Girls_in_a_Dungeon%3F_key_visual.webp",
        "alt": "DanMachi",
        "product": "DanMachi - Serie",
        "dataPrice": "$19.99"
      },
      {
        "title": "Bleach",
        "desc": "Pierrot · Shinigami",
        "price": "$24.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/7/72/Bleach_key_visual.webp",
        "alt": "Bleach",
        "product": "Bleach - Serie",
        "dataPrice": "$24.99"
      },
      {
        "title": "Classroom of the Elite",
        "desc": "Lerche · Escuela élite",
        "price": "$19.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/6/6c/Classroom_of_the_Elite_key_visual.webp",
        "alt": "Classroom of the Elite",
        "product": "Classroom of the Elite - Serie",
        "dataPrice": "$19.99"
      },
      {
        "title": "Kimi ni Todoke",
        "desc": "Production I.G · Romance",
        "price": "$16.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/1/17/Kimi_ni_Todoke_anime.webp",
        "alt": "Kimi ni Todoke",
        "product": "Kimi ni Todoke - Serie",
        "dataPrice": "$16.99"
      },
      {
        "title": "ACCA: 13-Territory Inspection Dept.",
        "desc": "Madhouse · Intriga",
        "price": "$17.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/6/63/ACCA_13-Territory_Inspection_Department_key_visual.webp",
        "alt": "ACCA: 13-ku Kansatsu-ka",
        "product": "ACCA: 13-ku Kansatsu-ka - Serie",
        "dataPrice": "$17.99"
      },
      {
        "title": "Blue Exorcist",
        "desc": "A-1 Pictures · Exorcistas",
        "price": "$19.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/1/18/Blue_Exorcist_key_visual.webp",
        "alt": "Blue Exorcist",
        "product": "Ao no Exorcist - Serie",
        "dataPrice": "$19.99"
      },
      {
        "title": "K",
        "desc": "GoHands · Superpoderes urbanos",
        "price": "$18.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/9/96/K_project_key_visual.webp",
        "alt": "K Project",
        "product": "K-Project - Serie",
        "dataPrice": "$18.99"
      },
      {
        "title": "After the Rain",
        "desc": "Wit Studio · Romance",
        "price": "$16.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/b/b7/After_the_Rain_anime_key_visual.webp",
        "alt": "After the Rain",
        "product": "Koi wa Ameagari no You ni - Serie",
        "dataPrice": "$16.99"
      },
      {
        "title": "Citrus",
        "desc": "Passione · Romance yuri",
        "price": "$16.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/6/6a/Citrus_anime_key_visual.webp",
        "alt": "Citrus",
        "product": "Citrus - Serie",
        "dataPrice": "$16.99"
      },
      {
        "title": "Rurouni Kenshin",
        "desc": "Liden Films · Samurai reboot",
        "price": "$21.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/5/5e/Rurouni_Kenshin_2023_key_visual.webp",
        "alt": "Rurouni Kenshin",
        "product": "Rurouni Kenshin (2023) - Serie",
        "dataPrice": "$21.99"
      },
      {
        "title": "Re:Monster",
        "desc": "Studio DEEN · Isekai goblin",
        "price": "$18.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/5/59/ReMonster_key_visual.webp",
        "alt": "Re:Monster",
        "product": "Re:Monster - Serie",
        "dataPrice": "$18.99"
      },
      {
        "title": "Black Clover",
        "desc": "Pierrot · Magia y aventuras",
        "price": "$21.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/6/6f/Black_Clover_key_visual.webp",
        "alt": "Black Clover",
        "product": "Black Clover - Serie",
        "dataPrice": "$21.99"
      },
      {
        "title": "My Hero Academia",
        "desc": "Bones · Superhéroes shōnen",
        "price": "$22.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/2/26/My_Hero_Academia_key_visual.webp",
        "alt": "My Hero Academia",
        "product": "Boku no Hero Academia - Serie",
        "dataPrice": "$22.99"
      },
      {
        "title": "Chainsaw Man",
        "desc": "MAPPA · Oscuro y frenético",
        "price": "$22.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/9/9a/Chainsaw_Man_anime_key_visual.webp",
        "alt": "Chainsaw Man",
        "product": "Chainsaw Man - Serie",
        "dataPrice": "$22.99"
      },
      {
        "title": "Record of Ragnarok",
        "desc": "Graphinica · Combates de dioses",
        "price": "$19.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/0/0a/Record_of_Ragnarok_anime_key_visual.webp",
        "alt": "Record of Ragnarok",
        "product": "Shuumatsu no Valkyrie - Serie",
        "dataPrice": "$19.99"
      },
      {
        "title": "Spy x Family",
        "desc": "Wit/CloveWorks · Espionaje y comedia",
        "price": "$21.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/4/4b/Spy_x_Family_anime_key_visual.webp",
        "alt": "Spy x Family",
        "product": "Spy x Family - Serie",
        "dataPrice": "$21.99"
      },
      {
        "title": "Kaiju No. 8",
        "desc": "Production I.G · Monstruos y acción",
        "price": "$22.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/5/56/Kaiju_No._8_anime_key_visual.webp",
        "alt": "Kaiju No. 8",
        "product": "Kaiju No. 8 - Serie",
        "dataPrice": "$22.99"
      },
      {
        "title": "WIND BREAKER",
        "desc": "CloverWorks · Delincuentes escolares",
        "price": "$19.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/4/44/Wind_Breaker_%282024_anime%29_key_visual.webp",
        "alt": "Wind Breaker",
        "product": "Wind Breaker - Serie",
        "dataPrice": "$19.99"
      },
      {
        "title": "Shangri-La Frontier",
        "desc": "C2C · MMO aventura",
        "price": "$19.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/5/55/Shangri-La_Frontier_anime_key_visual.webp",
        "alt": "Shangri-La Frontier",
        "product": "Shangri-La Frontier - Serie",
        "dataPrice": "$19.99"
      },
      {
        "title": "Dandadan",
        "desc": "Science SARU · Sci‑fi y paranormal",
        "price": "$21.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/8/8a/Dandadan_anime_key_visual.webp",
        "alt": "Dandadan",
        "product": "Dandadan - Serie",
        "dataPrice": "$21.99"
      },
      {
        "title": "City Hunter",
        "desc": "Sunrise · Acción y comedia",
        "price": "$17.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/0/09/City_Hunter_anime.webp",
        "alt": "City Hunter",
        "product": "City Hunter - Serie",
        "dataPrice": "$17.99"
      },
      {
        "title": "Terra Formars",
        "desc": "LIDENFILMS · Sci‑fi violento",
        "price": "$18.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/2/2b/Terra_Formars_key_visual.webp",
        "alt": "Terra Formars",
        "product": "Terra Formars - Serie",
        "dataPrice": "$18.99"
      },
      {
        "title": "Fog Hill of Five Elements",
        "desc": "SAMS · Acción fantástica (donghua)",
        "price": "$18.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/3/3f/Fog_Hill_of_Five_Elements.webp",
        "alt": "Fog Hill of Five Elements",
        "product": "Fog Hill of Five Elements - Serie",
        "dataPrice": "$18.99"
      },
      {
        "title": "The Daily Life of the Immortal King",
        "desc": "Haoliners · Comedia fantástica",
        "price": "$16.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/0/0c/The_Daily_Life_of_the_Immortal_King_key_visual.webp",
        "alt": "The Daily Life of the Immortal King",
        "product": "The Daily Life of the Immortal King - Serie",
        "dataPrice": "$16.99"
      },
      {
        "title": "A Day Before Us",
        "desc": "LICO · Web serie romántica",
        "price": "$12.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/8/8d/A_Day_Before_Us.webp",
        "alt": "A Day Before Us",
        "product": "A Day Before Us - Serie",
        "dataPrice": "$12.99"
      },
      {
        "title": "Lookism",
        "desc": "Studio Mir · Drama escolar",
        "price": "$17.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/5/5c/Lookism_%28anime%29_key_visual.webp",
        "alt": "Lookism",
        "product": "Lookism - Serie",
        "dataPrice": "$17.99"
      },
      {
        "title": "Blood-C",
        "desc": "Production I.G · Horror",
        "price": "$17.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/2/2c/Blood-C_key_visual.webp",
        "alt": "Blood-C",
        "product": "Blood-C - Serie",
        "dataPrice": "$17.99"
      },
      {
        "title": "Yu-Gi-Oh!",
        "desc": "Studio Gallop · Duelo de cartas",
        "price": "$19.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/4/46/Yu-Gi-Oh%21_Duel_Monsters_logo.webp",
        "alt": "Yu-Gi-Oh!",
        "product": "Yu-Gi-Oh! - Serie",
        "dataPrice": "$19.99"
      }
    ],
    "movies": [
      {
        "title": "Your Name (Kimi no Na wa)",
        "desc": "Película HD + Extras",
        "price": "$19.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/0/0b/Your_Name_poster.webp",
        "alt": "Your Name",
        "product": "Your Name (Kimi no Na wa) - Película HD + Extras",
        "dataPrice": "$19.99"
      },
      {
        "title": "Spirited Away",
        "desc": "Clásico de Studio Ghibli",
        "price": "$24.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/3/30/Spirited_Away_poster.webp",
        "alt": "Spirited Away",
        "product": "Spirited Away - Clásico de Studio Ghibli",
        "dataPrice": "$24.99"
      },
      {
        "title": "Akira",
        "desc": "Edición remasterizada 4K",
        "price": "$29.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/5/5c/Akira_%281988_poster%29.webp",
        "alt": "Akira",
        "product": "Akira - Edición remasterizada 4K",
        "dataPrice": "$29.99"
      },
      {
        "title": "Princess Mononoke",
        "desc": "Obra maestra de Miyazaki",
        "price": "$22.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/7/7e/Princess_Mononoke_Japanese_poster.webp",
        "alt": "Princess Mononoke",
        "product": "Princess Mononoke - Obra maestra de Miyazaki",
        "dataPrice": "$22.99"
      },
      {
        "title": "Memories",
        "desc": "Katsuhiro Otomo · Antología",
        "price": "$14.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/4/4e/Memories_%28film%29_poster.webp",
        "alt": "Memories",
        "product": "Memories (1995) - Antología",
        "dataPrice": "$14.99"
      },
      {
        "title": "Terra Formars: Bugs 2-hen",
        "desc": "OVA · Sci‑fi",
        "price": "$9.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/b/b1/Terra_Formars_-_Bugs_2-hen_DVD.webp",
        "alt": "Terra Formars: Bugs 2-hen",
        "product": "Terra Formars: Bugs 2-hen (OVA)",
        "dataPrice": "$9.99"
      },
      {
        "title": "Asagao to Kase-san",
        "desc": "Película yuri · Romance escolar",
        "price": "$12.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/9/96/Kase-san_and_Morning_Glories_poster.webp",
        "alt": "Kase-san and Morning Glories",
        "product": "Asagao to Kase-san - Película",
        "dataPrice": "$12.99"
      },
      {
        "title": "El castillo en el cielo",
        "desc": "Studio Ghibli · Aventuras",
        "price": "$22.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/4/46/Castle_in_the_Sky_%28Laputa%29.webp",
        "alt": "Laputa: Castle in the Sky",
        "product": "El castillo en el cielo - Película",
        "dataPrice": "$22.99"
      },
      {
        "title": "El himno del corazón",
        "desc": "A-1 Pictures · Drama escolar",
        "price": "$14.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/6/63/The_Anthem_of_the_Heart_poster.webp",
        "alt": "El himno del corazón",
        "product": "El himno del corazón - Película",
        "dataPrice": "$14.99"
      },
      {
        "title": "El jardín de las palabras",
        "desc": "CoMix Wave · Romance",
        "price": "$14.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/3/30/The_Garden_of_Words_poster.webp",
        "alt": "El jardín de las palabras",
        "product": "El jardín de las palabras - Película",
        "dataPrice": "$14.99"
      },
      {
        "title": "El lugar que nos prometimos",
        "desc": "CoMix Wave · Sci‑fi romántico",
        "price": "$13.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/2/21/The_Place_Promised_in_Our_Early_Days_poster.webp",
        "alt": "El lugar que nos prometimos",
        "product": "El lugar que nos prometimos - Película",
        "dataPrice": "$13.99"
      },
      {
        "title": "El viento se levanta",
        "desc": "Studio Ghibli · Biográfico",
        "price": "$22.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/a/a3/Kaze_Tachinu_poster.webp",
        "alt": "El viento se levanta",
        "product": "El viento se levanta - Película",
        "dataPrice": "$22.99"
      },
      {
        "title": "Given",
        "desc": "Lerche · Música y romance",
        "price": "$12.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/9/9c/Given_%28film%29_poster.webp",
        "alt": "Given",
        "product": "Given - Película",
        "dataPrice": "$12.99"
      },
      {
        "title": "Hello World",
        "desc": "Graphinica · Sci‑fi romántico",
        "price": "$14.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/f/f7/Hello_World_%282019_film%29_poster.webp",
        "alt": "Hello World",
        "product": "Hello World - Película",
        "dataPrice": "$14.99"
      },
      {
        "title": "Sora no Aosa o Shiru Hito yo",
        "desc": "CloverWorks · Drama musical",
        "price": "$13.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/8/8e/Her_Blue_Sky_poster.webp",
        "alt": "Her Blue Sky",
        "product": "Her Blue Sky - Película",
        "dataPrice": "$13.99"
      },
      {
        "title": "Kiki: entregas a domicilio",
        "desc": "Studio Ghibli · Fantasía",
        "price": "$19.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/9/9f/Kiki%27s_Delivery_Service_poster.webp",
        "alt": "Kiki: Entregas a domicilio",
        "product": "Kiki - Película",
        "dataPrice": "$19.99"
      },
      {
        "title": "Kimi wa Kanata",
        "desc": "Digital Network Animation · Fantasía",
        "price": "$12.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/1/1f/Kimi_wa_Kanata_poster.webp",
        "alt": "Kimi wa Kanata",
        "product": "Kimi wa Kanata - Película",
        "dataPrice": "$12.99"
      },
      {
        "title": "La tumba de las luciérnagas",
        "desc": "Studio Ghibli · Guerra",
        "price": "$21.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/9/9f/Grave_of_the_Fireflies_Japanese_poster.webp",
        "alt": "La tumba de las luciérnagas",
        "product": "La tumba de las luciérnagas - Película",
        "dataPrice": "$21.99"
      },
      {
        "title": "Palabras que burbujean como un refresco",
        "desc": "Signal.MD · Romance juvenil",
        "price": "$12.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/0/0e/Words_Bubble_Up_Like_Soda_Pop.webp",
        "alt": "Palabras que burbujean como un refresco",
        "product": "Palabras que burbujean como un refresco - Película",
        "dataPrice": "$12.99"
      },
      {
        "title": "Perfect Blue",
        "desc": "Madhouse · Thriller psicológico",
        "price": "$16.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/8/8f/Perfect_Blue_poster.webp",
        "alt": "Perfect Blue",
        "product": "Perfect Blue - Película",
        "dataPrice": "$16.99"
      },
      {
        "title": "Ponyo y el secreto de la sirenita",
        "desc": "Studio Ghibli · Fantasía",
        "price": "$19.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/9/9d/Ponyo_poster.webp",
        "alt": "Ponyo y el secreto de la sirenita",
        "product": "Ponyo y el secreto de la sirenita - Película",
        "dataPrice": "$19.99"
      },
      {
        "title": "Puedo escuchar el mar",
        "desc": "Studio Ghibli · Drama escolar",
        "price": "$11.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/6/6a/Ocean_Waves_poster.webp",
        "alt": "Puedo escuchar el mar",
        "product": "Puedo escuchar el mar - Película",
        "dataPrice": "$11.99"
      },
      {
        "title": "El amor está en el agua",
        "desc": "Science SARU · Romance",
        "price": "$13.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/8/8c/Ride_Your_Wave_poster.webp",
        "alt": "Ride Your Wave",
        "product": "Ride Your Wave - Película",
        "dataPrice": "$13.99"
      },
      {
        "title": "Tamako Love Story",
        "desc": "Kyoto Animation · Romance escolar",
        "price": "$12.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/7/7e/Tamako_Love_Story_poster.webp",
        "alt": "Tamako Love Story",
        "product": "Tamako Love Story - Película",
        "dataPrice": "$12.99"
      },
      {
        "title": "Mundos paralelos",
        "desc": "Signal.MD · Aventura fantástica",
        "price": "$12.99",
        "img": "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/7/75/The_Wonderland_poster.webp",
        "alt": "Mundos paralelos",
        "product": "Mundos paralelos - Película",
        "dataPrice": "$12.99"
      }
    ],
    "mangas": [
      {
        "title": "One Piece",
        "desc": "Eiichiro Oda · Shōnen · Aventuras piratas",
        "price": "$9.99",
        "img": "https://upload.wikimedia.org/wikipedia/en/2/2c/One_Piece%2C_Volume_1.webp",
        "alt": "One Piece Vol. 1",
        "product": "One Piece (Manga)",
        "dataPrice": "$9.99"
      },
      {
        "title": "Jujutsu Kaisen",
        "desc": "Gege Akutami · Shōnen · Hechicería y maldiciones",
        "price": "$9.99",
        "img": "https://upload.wikimedia.org/wikipedia/en/0/03/Jujutsu_Kaisen_volume_1.webp",
        "alt": "Jujutsu Kaisen Vol. 1",
        "product": "Jujutsu Kaisen (Manga)",
        "dataPrice": "$9.99"
      },
      {
        "title": "One-Punch Man",
        "desc": "ONE, Yusuke Murata · Shōnen · Acción y comedia",
        "price": "$9.99",
        "img": "https://upload.wikimedia.org/wikipedia/en/2/2f/One-Punch_Man_cover.webp",
        "alt": "One-Punch Man Vol. 1",
        "product": "One-Punch Man (Manga)",
        "dataPrice": "$9.99"
      },
      {
        "title": "Spy x Family",
        "desc": "Tatsuya Endo · Shōnen · Espionaje y comedia",
        "price": "$9.99",
        "img": "https://upload.wikimedia.org/wikipedia/en/4/4b/Spy_x_Family_volume_1_cover.webp",
        "alt": "Spy x Family Vol. 1",
        "product": "Spy x Family (Manga)",
        "dataPrice": "$9.99"
      },
      {
        "title": "Dandadan",
        "desc": "Yukinobu Tatsu · Shōnen · Sci‑fi y paranormal",
        "price": "$9.99",
        "img": "https://upload.wikimedia.org/wikipedia/en/6/6a/Dandadan_vol_1_cover.webp",
        "alt": "Dandadan Vol. 1",
        "product": "Dandadan (Manga)",
        "dataPrice": "$9.99"
      },
      {
        "title": "Kaiju No. 8",
        "desc": "Naoya Matsumoto · Shōnen · Monstruos y acción",
        "price": "$9.99",
        "img": "https://upload.wikimedia.org/wikipedia/en/2/2c/Kaiju_No._8_volume_1_cover.webp",
        "alt": "Kaiju No. 8 Vol. 1",
        "product": "Kaiju No. 8 (Manga)",
        "dataPrice": "$9.99"
      },
      {
        "title": "Chainsaw Man (Parte 2)",
        "desc": "Tatsuki Fujimoto · Shōnen · Oscuro y frenético",
        "price": "$9.99",
        "img": "https://upload.wikimedia.org/wikipedia/en/2/2d/Chainsaw_Man_manga_volume_1_cover.webp",
        "alt": "Chainsaw Man Vol. 1",
        "product": "Chainsaw Man Part 2 (Manga)",
        "dataPrice": "$9.99"
      },
      {
        "title": "Black Clover",
        "desc": "Yūki Tabata · Shōnen · Magia y aventuras",
        "price": "$9.99",
        "img": "https://upload.wikimedia.org/wikipedia/en/6/6f/Black_Clover%2C_volume_1.webp",
        "alt": "Black Clover Vol. 1",
        "product": "Black Clover (Manga)",
        "dataPrice": "$9.99"
      },
      {
        "title": "D.Gray-man",
        "desc": "Katsura Hoshino · Shōnen · Exorcistas y akuma",
        "price": "$9.99",
        "img": "https://upload.wikimedia.org/wikipedia/en/9/9e/D.Gray-man_Volume_1.webp",
        "alt": "D.Gray-man Vol. 1",
        "product": "D.Gray-man (Manga)",
        "dataPrice": "$9.99"
      },
      {
        "title": "Frieren: Beyond Journey's End",
        "desc": "Kanehito Yamada, Tsukasa Abe · Fantasy slice‑of‑life",
        "price": "$9.99",
        "img": "https://upload.wikimedia.org/wikipedia/en/5/53/Frieren_Volume_1.webp",
        "alt": "Frieren: Beyond Journey's End Vol. 1",
        "product": "Frieren (Manga)",
        "dataPrice": "$9.99"
      },
      {
        "title": "My Hero Academia",
        "desc": "Kōhei Horikoshi · Shōnen · Superhéroes",
        "price": "$9.99",
        "img": "https://upload.wikimedia.org/wikipedia/en/1/19/My_Hero_Academia_Volume_1.webp",
        "alt": "My Hero Academia Vol. 1",
        "product": "My Hero Academia (Manga)",
        "dataPrice": "$9.99"
      },
      {
        "title": "Vinland Saga",
        "desc": "Makoto Yukimura · Seinen · Épica vikinga",
        "price": "$9.99",
        "img": "https://upload.wikimedia.org/wikipedia/en/5/5e/Vinland_Saga_volume_1_cover.webp",
        "alt": "Vinland Saga Vol. 1",
        "product": "Vinland Saga (Manga)",
        "dataPrice": "$9.99"
      },
      {
        "title": "Record of Ragnarok",
        "desc": "Shinya Umemura, Takumi Fukui, Ajichika · Combates épicos",
        "price": "$9.99",
        "img": "https://upload.wikimedia.org/wikipedia/en/7/74/Record_of_Ragnarok_volume_1_cover.webp",
        "alt": "Record of Ragnarok Vol. 1",
        "product": "Record of Ragnarok (Manga)",
        "dataPrice": "$9.99"
      },
      {
        "title": "Blue Exorcist",
        "desc": "Kazue Katō · Shōnen · Demonios y exorcismo",
        "price": "$9.99",
        "img": "https://upload.wikimedia.org/wikipedia/en/8/8f/Ao_no_Exorcist_v01_cover.webp",
        "alt": "Blue Exorcist Vol. 1",
        "product": "Blue Exorcist (Manga)",
        "dataPrice": "$9.99"
      },
      {
        "title": "Claymore",
        "desc": "Norihiro Yagi · Dark fantasy y acción",
        "price": "$9.99",
        "img": "https://upload.wikimedia.org/wikipedia/en/0/0f/Claymore_volume_1_cover.webp",
        "alt": "Claymore Vol. 1",
        "product": "Claymore (Manga)",
        "dataPrice": "$9.99"
      },
      {
        "title": "Death Note",
        "desc": "Tsugumi Ōba, Takeshi Obata · Thriller psicológico",
        "price": "$9.99",
        "img": "https://upload.wikimedia.org/wikipedia/en/6/6f/Death_Note_Vol_1.webp",
        "alt": "Death Note Vol. 1",
        "product": "Death Note (Manga)",
        "dataPrice": "$9.99"
      },
      {
        "title": "Dr. Stone",
        "desc": "Riichiro Inagaki, Boichi · Ciencia y aventura",
        "price": "$9.99",
        "img": "https://upload.wikimedia.org/wikipedia/en/4/4d/Dr._Stone_volume_1_cover.webp",
        "alt": "Dr. Stone Vol. 1",
        "product": "Dr. Stone (Manga)",
        "dataPrice": "$9.99"
      },
      {
        "title": "Gintama",
        "desc": "Hideaki Sorachi · Comedia y samuráis sci‑fi",
        "price": "$9.99",
        "img": "https://upload.wikimedia.org/wikipedia/en/c/c0/Gintama01.webp",
        "alt": "Gintama Vol. 1",
        "product": "Gintama (Manga)",
        "dataPrice": "$9.99"
      },
      {
        "title": "Made in Abyss",
        "desc": "Akihito Tsukushi · Aventura y misterio oscuro",
        "price": "$9.99",
        "img": "https://upload.wikimedia.org/wikipedia/en/0/0a/Made_in_Abyss_volume_1_cover.webp",
        "alt": "Made in Abyss Vol. 1",
        "product": "Made in Abyss (Manga)",
        "dataPrice": "$9.99"
      },
      {
        "title": "Future Diary (Mirai Nikki)",
        "desc": "Sakae Esuno · Suspenso y supervivencia",
        "price": "$9.99",
        "img": "https://upload.wikimedia.org/wikipedia/en/8/8c/Future_Diary_volume_1_cover.webp",
        "alt": "Mirai Nikki Vol. 1",
        "product": "Mirai Nikki (Manga)",
        "dataPrice": "$9.99"
      },
      {
        "title": "Noragami",
        "desc": "Adachitoka · Dioses, acción y comedia",
        "price": "$9.99",
        "img": "https://upload.wikimedia.org/wikipedia/en/f/fb/Noragami_vol_1.webp",
        "alt": "Noragami Vol. 1",
        "product": "Noragami (Manga)",
        "dataPrice": "$9.99"
      },
      {
        "title": "Noblesse",
        "desc": "Son Jae-ho, Lee Kwang-su · Webtoon · Vampiros",
        "price": "$9.99",
        "img": "https://upload.wikimedia.org/wikipedia/en/8/8e/Noblesse_Webtoon_Volume_1.webp",
        "alt": "Noblesse Volume 1",
        "product": "Noblesse (Webtoon)",
        "dataPrice": "$9.99"
      }
    ]
  };

  document.addEventListener('DOMContentLoaded', function() {
    // Fuente de verdad: window.catalog. LocalStorage queda solo como respaldo opcional.
    let stored = null;
    try { stored = JSON.parse(localStorage.getItem('catalogData') || 'null'); } catch(e) { stored = null; }

    const catalog = (window.catalog = window.catalog || {});

    if (catalog.series && catalog.movies && catalog.mangas &&
        (catalog.series.length || catalog.movies.length || catalog.mangas.length)) {
      console.log('Usando window.catalog embebido:', {
        series: catalog.series.length || 0, movies: catalog.movies.length || 0, mangas: catalog.mangas.length || 0
      });
    } else if (stored && stored.series && stored.movies && stored.mangas) {
      catalog.series = stored.series;
      catalog.movies = stored.movies;
      catalog.mangas = stored.mangas;
      console.log('catalogData cargado desde localStorage:', {
        series: catalog.series.length, movies: catalog.movies.length, mangas: catalog.mangas.length
      });
    } else {
      catalog.series = catalog.series || [];
      catalog.movies = catalog.movies || [];
      catalog.mangas = catalog.mangas || [];
      console.warn('Catálogo vacío. Define window.catalog en script.js o utiliza addSerie/addMovie/addManga.');
    }

    // Limpiar grillas y renderizar desde datos
    ['series','peliculas','mangas'].forEach(id => {
      const grid = document.querySelector(`#${id} .products-grid`);
      if (grid) grid.innerHTML = '';
    });

    renderGrid('series', catalog.series);
    renderGrid('peliculas', catalog.movies);
    renderGrid('mangas', catalog.mangas);

    setupFilter('series-filter', 'series', catalog.series);
    setupFilter('movies-filter', 'peliculas', catalog.movies);
    setupFilter('mangas-filter', 'mangas', catalog.mangas);

    // Helpers para gestión desde consola
    window.dumpCatalog = function() {
      try { const d = JSON.parse(localStorage.getItem('catalogData') || 'null'); console.log('dumpCatalog', d); return d; } catch(e) { return null; }
    };
    window.saveCatalog = function(next) {
      const data = next || window.catalog;
      if (!data) { console.warn('No hay catalog en memoria.'); return; }
      localStorage.setItem('catalogData', JSON.stringify(data));
      renderGrid('series', data.series || []);
      renderGrid('peliculas', data.movies || []);
      renderGrid('mangas', data.mangas || []);
      console.log('Catálogo guardado y re-renderizado.');
    };
    window.addSerie = function(item) {
      if (!window.catalog) window.catalog = {series: [], movies: [], mangas: []};
      window.catalog.series.push(item);
      window.saveCatalog();
    };
    window.addMovie = function(item) {
      if (!window.catalog) window.catalog = {series: [], movies: [], mangas: []};
      window.catalog.movies.push(item);
      window.saveCatalog();
    };
    window.addManga = function(item) {
      if (!window.catalog) window.catalog = {series: [], movies: [], mangas: []};
      window.catalog.mangas.push(item);
      window.saveCatalog();
    };
    window.clearCatalogStorage = function() {
      localStorage.removeItem('catalogData');
      console.warn('catalogData eliminado de localStorage. Recarga para re-sembrar desde DOM si existen tarjetas, o usa saveCatalog() con un objeto.');
    };
  });
})();
