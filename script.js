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
    const body = document.body;

    // Toggle del menú hamburguesa
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevenir scroll del body cuando el menú está abierto
            if (navMenu.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });
    }

    // Cerrar menú al hacer click en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                body.style.overflow = '';
            }
        });
    });

    // Cerrar menú al hacer click fuera de él
    document.addEventListener('click', function(e) {
        if (hamburger && navMenu && 
            !hamburger.contains(e.target) && 
            !navMenu.contains(e.target) && 
            navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            body.style.overflow = '';
        }
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

    // Asegurar que el título sea visible en móviles
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle && window.innerWidth <= 480) {
        // Forzar visibilidad del título en móviles
        heroTitle.style.display = 'block';
        heroTitle.style.visibility = 'visible';
        heroTitle.style.opacity = '1';
        
        // Simplificar efectos de glitch en móviles
        const glitchElement = heroTitle.querySelector('.glitch');
        if (glitchElement) {
            glitchElement.style.animation = 'none';
        }
    }
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

// Eliminado: searchProducts (no utilizado)

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
// Eliminado: bloque de newsletter no utilizado (referenciaba 'cart' inexistente)

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

  // (Se mueve la preferencia de imágenes locales a después de definir window.catalog)

  // Eliminado: normalizeItem y readGrid (no usados)

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

    const fileBase = (f) => f.replace(/\\/g, '/').split('/').pop().replace(/\.(webp)$/i, '');
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
    const exts = ['webp'];
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
    const allowed = new Set(LOCAL_IMG_FILES);
    const ordered = directCandidates
      .filter(Boolean)
      .filter(f => allowed.has(f))
      .map(f => `img/${f}`);
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
      const tries = exts.map(ext => `img/${fileBase(best)}.${ext}`).filter(p => allowed.has(`${fileBase(best)}.${exts[0]}`));
      if (tries.length) {
        return { src: tries[0], fallback: originalImgUrl || '', alternates: [] };
      }
      // si no hay coincidencia válida, regresar original
      return { src: originalImgUrl, fallback: originalImgUrl, alternates: [] };
    }

    return { src: originalImgUrl, fallback: originalImgUrl, alternates: [] };
  }

  function renderGrid(sectionId, items) {
    const grid = document.querySelector(`#${sectionId} .products-grid`);
    if (!grid) return;
    const fb = FALLBACKS[sectionId] || FALLBACKS.series;
    grid.innerHTML = items.map(raw => {
      const item = { ...raw };
      const imgSrc = item.img;
      const dataFallback = item.img || fb;
      const alternates = [];
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

  // Fuerza URLs locales en los arrays estáticos si existe una portada en /img
  function preferLocalImagesForArray(arr) {
    if (!Array.isArray(arr)) return;
    arr.forEach(item => {
      if (!item || !item.title) return;
      const resolved = resolveLocalSeriesImage(item.title, item.img || '');
      if (resolved && typeof resolved.src === 'string' && resolved.src.startsWith('img/')) {
        item.img = resolved.src; // Sobrescribe para que quede fijo como local
      }
    });
  }

  // Catálogo embebido (fuente de verdad para todos los usuarios)
  window.catalog = {
    "series": [
      {
        "title": "Code Geass",
        "desc": "Sunrise · Mecha, estrategia",
        "price": "$29.99",
        "img": "img/Code geasw.webp",
        "alt": "Code Geass",
        "product": "Code Geass - Serie",
        "dataPrice": "$29.99"
      },
      {
        "title": "The God of High School",
        "desc": "MAPPA · Artes marciales",
        "price": "$50.00",
        "img": "img/They god of highschool.webp",
        "alt": "The God of High School",
        "product": "The God of High School - Serie",
        "dataPrice": "$50.00"
      },
      {
        "title": "Ninja Kamui",
        "desc": "E&H Production · Acción ninja",
        "price": "$50.00",
        "img": "img/Ninja kamui.webp",
        "alt": "Ninja Kamui",
        "product": "Ninja Kamui - Serie",
        "dataPrice": "$50.00"
      },
      {
        "title": "Hellsing",
        "desc": "Gonzo · Vampiros, acción",
        "price": "$50.00",
        "img": "img/Hellsing.webp",
        "alt": "Hellsing",
        "product": "Hellsing - Serie",
        "dataPrice": "$50.00"
      },
      {
        "title": "The Misfit of Demon King Academy",
        "desc": "Silver Link · Fantasía escolar",
        "price": "$50.00",
        "img": "img/Maou Gakuin no Futekigousha Shijou Saikyou.webp",
        "alt": "The Misfit of Demon King Academy",
        "product": "The Misfit of Demon King Academy - Serie",
        "dataPrice": "$50.00"
      },
      {
        "title": "Haikyu!!",
        "desc": "Production I.G · Voleibol",
        "price": "$50.00",
        "img": "img/Haikyu.webp",
        "alt": "Haikyu!!",
        "product": "Haikyu!! - Serie",
        "dataPrice": "$50.00"
      },
      {
        "title": "Toradora!",
        "desc": "J.C.Staff · Romance escolar",
        "price": "$50.00",
        "img": "img/Toradora.webp",
        "alt": "Toradora!",
        "product": "Toradora! - Serie",
        "dataPrice": "$50.00"
      },
      {
        "title": "The Prince of Tennis",
        "desc": "Trans Arts · Tenis shōnen",
        "price": "$50.00",
        "img": "img/Prince of tenis.webp",
        "alt": "The Prince of Tennis",
        "product": "The Prince of Tennis - Serie",
        "dataPrice": "$50.00"
      },
      {
        "title": "Super Crooks",
        "desc": "Bones · Crimen y superpoderes",
        "price": "$50.00",
        "img": "img/Súper crooks.webp",
        "alt": "Super Crooks",
        "product": "Super Crooks - Serie",
        "dataPrice": "$50.00"
      },
      {
        "title": "Frieren: Beyond Journey's End",
        "desc": "Madhouse · Fantasía emotiva",
        "price": "$50.00",
        "img": "img/frieren.webp",
        "alt": "Frieren: Beyond Journey's End",
        "product": "Frieren - Serie",
        "dataPrice": "$50.00"
      },
      {
        "title": "Your Lie in April",
        "desc": "A-1 Pictures · Música y drama",
        "price": "$50.00",
        "img": "img/Your lie i. Abril.webp",
        "alt": "Your Lie in April",
        "product": "Your Lie in April - Serie",
        "dataPrice": "$50.00"
      },
      {
        "title": "Serial Experiments Lain",
        "desc": "Triangle Staff · Cyber-psicológico",
        "price": "$16.99",
        "img": "img/Serial experimentos lain.webp",
        "alt": "Serial Experiments Lain",
        "product": "Serial Experiments Lain - Serie",
        "dataPrice": "$16.99"
      },
      {
        "title": "Violet Evergarden",
        "desc": "Kyoto Animation · Drama",
        "price": "$50.00",
        "img": "img/violet evergarden.avif",
        "alt": "Violet Evergarden",
        "product": "Violet Evergarden - Serie",
        "dataPrice": "$50.00"
      },
      {
        "title": "Trigun Stampede",
        "desc": "Orange · Sci‑fi western",
        "price": "$50.00",
        "img": "img/Trigun stanpede.webp",
        "alt": "Trigun Stampede",
        "product": "Trigun Stampede - Serie",
        "dataPrice": "$50.00"
      },
      {
        "title": "Trigun",
        "desc": "Madhouse · Sci‑fi western clásico",
        "price": "$50.00",
        "img": "img/Trigun.webp",
        "alt": "Trigun",
        "product": "Trigun - Serie",
        "dataPrice": "$50.00"
      },
      {
        "title": "That Time I Got Reincarnated as a Slime",
        "desc": "8bit · Fantasía isekai",
        "price": "$50.00",
        "img": "img/Tensei shitara slime data ken.webp",
        "alt": "That Time I Got Reincarnated as a Slime",
        "product": "Tensei Shitara Slime Datta Ken - Serie",
        "dataPrice": "$50.00"
      },
      {
        "title": "Heavenly Delusion",
        "desc": "Production I.G · Misterio postapocalíptico",
        "price": "$50.00",
        "img": "img/Heavenly Delusion.webp",
        "alt": "Heavenly Delusion",
        "product": "Tengoku Daimakyo - Serie",
        "dataPrice": "$50.00"
      },
      {
        "title": "Fullmetal Alchemist: Brotherhood",
        "desc": "Bones · Acción y alquimia",
        "price": "$29.99",
        "img": "img/Fma Brotherhood.webp",
        "alt": "Fullmetal Alchemist: Brotherhood",
        "product": "FMA: Brotherhood - Serie",
        "dataPrice": "$29.99"
      },
      {
        "title": "Fullmetal Alchemist",
        "desc": "Bones · Serie original 2003",
        "price": "$50.00",
        "img": "img/Fma.webp",
        "alt": "Fullmetal Alchemist",
        "product": "Fullmetal Alchemist (2003) - Serie",
        "dataPrice": "$50.00"
      },
      {
        "title": "Free!",
        "desc": "Kyoto Animation · Natación",
        "price": "$50.00",
        "img": "img/Free.webp",
        "alt": "Free!",
        "product": "Free! - Serie",
        "dataPrice": "$50.00"
      },
      {
        "title": "Don't Toy with Me, Miss Nagatoro",
        "desc": "Telecom Animation · Comedia escolar",
        "price": "$16.99",
        "img": "img/Ijiranaide,_Nagatoro-san_-_Anime.webp",
        "alt": "Don't Toy with Me, Miss Nagatoro",
        "product": "Ijiranaide, Nagatoro-san - Serie",
        "dataPrice": "$16.99"
      },
      {
        "title": "Hell's Paradise: Jigokuraku",
        "desc": "MAPPA · Acción oscura",
        "price": "$50.00",
        "img": "img/hells-paradise-jigokuraku-1-6496e9159c24f.avif",
        "alt": "Hell's Paradise: Jigokuraku",
        "product": "Jigokuraku - Serie",
        "dataPrice": "$50.00"
      },
      {
        "title": "Erased",
        "desc": "A-1 Pictures · Thriller temporal",
        "price": "$18.99",
        "img": "img/erased.webp",
        "alt": "Erased",
        "product": "Erased - Serie",
        "dataPrice": "$18.99"
      },
      {
        "title": "Berserk",
        "desc": "GEMBA · Dark fantasy",
        "price": "$50.00",
        "img": "img/berserk.webp",
        "alt": "Berserk",
        "product": "Berserk - Serie",
        "dataPrice": "$50.00"
      },
      {
        "title": "Plunderer",
        "desc": "Geek Toys · Acción y fantasía",
        "price": "$50.00",
        "img": "img/plunderer05.webp",
        "alt": "Plunderer",
        "product": "Plunderer - Serie",
        "dataPrice": "$50.00"
      },
      {
        "title": "Mashle: Magic and Muscles",
        "desc": "A-1 Pictures · Comedia mágica",
        "price": "$50.00",
        "img": "img/mashle.webp",
        "alt": "Mashle: Magic and Muscles",
        "product": "Mashle - Serie",
        "dataPrice": "$50.00"
      },
      {
        "title": "The Kingdoms of Ruin",
        "desc": "Yokohama Animation Lab · Venganza oscura",
        "price": "$18.99",
        "img": "img/the kingdom of ruins.webp",
        "alt": "The Kingdoms of Ruin",
        "product": "Hametsu no Oukoku - Serie",
        "dataPrice": "$18.99"
      },
      {
        "title": "Steins;Gate",
        "desc": "White Fox · Sci‑fi psicológico",
        "price": "$23.99",
        "img": "img/Steins;Gate.webp",
        "alt": "Steins;Gate",
        "product": "Steins;Gate - Serie",
        "dataPrice": "$23.99"
      },
      {
        "title": "KonoSuba",
        "desc": "Studio Deen · Comedia isekai",
        "price": "$18.99",
        "img": "img/KonoSuba.webp",
        "alt": "KonoSuba",
        "product": "Kono Subarashii Sekai ni Shukufuku wo! - Serie",
        "dataPrice": "$18.99"
      },
      {
        "title": "Ajin: Demi-Human",
        "desc": "Polygon Pictures · Suspenso",
        "price": "$18.99",
        "img": "img/Ajin.webp",
        "alt": "Ajin: Demi-Human",
        "product": "Ajin - Serie",
        "dataPrice": "$18.99"
      },
      {
        "title": "Bastard!! - Heavy Metal, Dark Fantasy",
        "desc": "LIDENFILMS · Fantasía dark",
        "price": "$50.00",
        "img": "img/Bastard!! - Heavy Metal, Dark Fantasy.webp",
        "alt": "Bastard!!",
        "product": "Bastard!! (2022) - Serie",
        "dataPrice": "$50.00"
      },
      {
        "title": "Summer Time Rendering",
        "desc": "OLM · Misterio",
        "price": "$50.00",
        "img": "img/Summer_Time_Rendering_volume_1_cover.webp",
        "alt": "Summer Time Rendering",
        "product": "Summer Time Rendering - Serie",
        "dataPrice": "$50.00"
      },
      {
        "title": "Blue Lock",
        "desc": "8bit · Fútbol",
        "price": "$50.00",
        "img": "img/Blue Lock.webp",
        "alt": "Blue Lock",
        "product": "Blue Lock - Serie",
        "dataPrice": "$50.00"
      },
      {
        "title": "Ragna Crimson",
        "desc": "Silver Link · Dragones",
        "price": "$50.00",
        "img": "img/Ragna Crimson.webp",
        "alt": "Ragna Crimson",
        "product": "Ragna Crimson - Serie",
        "dataPrice": "$50.00"
      },
      {
        "title": "Monster",
        "desc": "Madhouse · Thriller psicológico",
        "price": "$50.00",
        "img": "img/Monster.webp",
        "alt": "Monster",
        "product": "Monster - Serie",
        "dataPrice": "$50.00"
      },
      {
        "title": "One-Punch Man",
        "desc": "Madhouse/J.C.Staff · Acción y comedia",
        "price": "$50.00",
        "img": "img/One-Punch Man.webp",
        "alt": "One-Punch Man",
        "product": "One-Punch Man - Serie",
        "dataPrice": "$50.00"
      },
      {
        "title": "High School DxD",
        "desc": "TNK/Passione · Ecchi acción",
        "price": "$18.99",
        "img": "img/High_School_DxD_Vol.1_DVD.webp",
        "alt": "High School DxD",
        "product": "High School DxD - Serie",
        "dataPrice": "$18.99"
      },
      {
        "title": "The Irregular at Magic High School",
        "desc": "Madhouse/8bit · Magia y sci‑fi",
        "price": "$50.00",
        "img": "img/The Irregular at Magic High School.webp",
        "alt": "The Irregular at Magic High School",
        "product": "Mahouka Koukou no Rettousei - Serie",
        "dataPrice": "$50.00"
      },
      {
        "title": "High Card",
        "desc": "Studio Hibari · Acción de cartas",
        "price": "$50.00",
        "img": "img/High Card.webp",
        "alt": "High Card",
        "product": "High Card - Serie",
        "dataPrice": "$50.00"
      },
      {
        "title": "Tales of Wedding Rings",
        "desc": "Staple Entertainment · Fantasía",
        "price": "$18.99",
        "img": "img/Tales of Wedding Rings.webp",
        "alt": "Tales of Wedding Rings",
        "product": "Kekkon Yubiwa Monogatari - Serie",
        "dataPrice": "$18.99"
      },
      {
        "title": "Revenger",
        "desc": "Ajia-do · Acción samurái",
        "price": "$50.00",
        "img": "img/revenger.webp",
        "alt": "Revenger",
        "product": "Revenger - Serie",
        "dataPrice": "$50.00"
      },
      {
        "title": "Ao Ashi",
        "desc": "Production I.G · Fútbol",
        "price": "$50.00",
        "img": "img/Ao Ashi.webp",
        "alt": "Ao Ashi",
        "product": "Ao Ashi - Serie",
        "dataPrice": "$50.00"
      },
      {
        "title": "Fire Force",
        "desc": "David Production · Bomberos sobrenaturales",
        "price": "$50.00",
        "img": "img/Fire Force.webp",
        "alt": "Fire Force",
        "product": "Fire Force - Serie",
        "dataPrice": "$50.00"
      },
      {
        "title": "Baki Hanma: Son of Ogre",
        "desc": "TMS/Netflix · Artes marciales",
        "price": "$50.00",
        "img": "img/Baki Hanma Son of Ogre.webp",
        "alt": "Baki Hanma: Son of Ogre",
        "product": "Hanma Baki: Son of Ogre - Serie",
        "dataPrice": "$50.00"
      },
      {
        "title": "Baki",
        "desc": "TMS/Netflix · Artes marciales",
        "price": "$50.00",
        "img": "img/Baki.webp",
        "alt": "Baki",
        "product": "Baki - Serie",
        "dataPrice": "$50.00"
      },
      {
        "title": "Baki the Grappler",
        "desc": "Group TAC · Artes marciales",
        "price": "$50.00",
        "img": "img/Baki the Grappler.webp",
        "alt": "Baki the Grappler",
        "product": "Baki the Grappler - Serie",
        "dataPrice": "$50.00"
      },
      {
        "title": "Classroom of the Elite",
        "desc": "Lerche · Escuela élite",
        "price": "$50.00",
        "img": "img/Classroom of the Elite.webp",
        "alt": "Classroom of the Elite",
        "product": "Classroom of the Elite - Serie",
        "dataPrice": "$50.00"
      },
      {
        "title": "Kimi ni Todoke",
        "desc": "Kiyohiko Azuma · Romance escolar",
        "price": "$16.99",
        "img": "img/Kimi ni Todoke.webp",
        "alt": "Kimi ni Todoke",
        "product": "Kimi ni Todoke - Serie",
        "dataPrice": "$16.99"
      },
      {
        "title": "Rurouni Kenshin",
        "desc": "Liden Films · Samurai reboot",
        "price": "$50.00",
        "img": "img/Rurouni Kenshin.webp",
        "alt": "Rurouni Kenshin",
        "product": "Rurouni Kenshin (2023) - Serie",
        "dataPrice": "$50.00"
      },
      {
        "title": "Is It Wrong to Try to Pick Up Girls in a Dungeon?",
        "desc": "J.C.Staff · Dungeon aventura",
        "price": "$50.00",
        "img": "img/Is It Wrong to Try to Pick Up Girls in a Dungeon.webp",
        "alt": "DanMachi",
        "product": "DanMachi - Serie",
        "dataPrice": "$50.00"
      },
      {
        "title": "Black Clover",
        "desc": "Pierrot · Grimorios y magia",
        "price": "$50.00",
        "img": "img/Black Clover.webp",
        "alt": "Black Clover",
        "product": "Black Clover - Serie",
        "dataPrice": "$50.00"
      },
      {
        "title": "My Hero Academia",
        "desc": "Bones · Superhéroes shōnen",
        "price": "$50.00",
        "img": "img/My Hero Academia.webp",
        "alt": "My Hero Academia",
        "product": "Boku no Hero Academia - Serie",
        "dataPrice": "$50.00"
      },
      {
        "title": "Chainsaw Man",
        "desc": "MAPPA · Oscuro y frenético",
        "price": "$50.00",
        "img": "img/Chainsaw Man.webp",
        "alt": "Chainsaw Man",
        "product": "Chainsaw Man - Serie",
        "dataPrice": "$50.00"
      },
      {
        "title": "Record of Ragnarok",
        "desc": "Graphinica · Combates de dioses",
        "price": "$50.00",
        "img": "img/Record of Ragnarok.webp",
        "alt": "Record of Ragnarok",
        "product": "Record of Ragnarok - Serie",
        "dataPrice": "$50.00"
      },
      {
        "title": "Spy x Family",
        "desc": "Wit/CloveWorks · Espionaje y comedia",
        "price": "$50.00",
        "img": "img/Spy x Family.webp",
        "alt": "Spy x Family",
        "product": "Spy x Family - Serie",
        "dataPrice": "$50.00"
      },
      {
        "title": "Yu-Gi-Oh!",
        "desc": "Studio Gallop · Duelo de cartas",
        "price": "$50.00",
        "img": "img/Yu-Gi-Oh!.webp",
        "alt": "Yu-Gi-Oh!",
        "product": "Yu-Gi-Oh! - Serie",
        "dataPrice": "$50.00"
      },
      {
        "title": "Charlotte",
        "desc": "P.A. Works · Drama sobrenatural",
        "price": "$50.00",
        "img": "img/Charlotte.webp",
        "alt": "Charlotte",
        "product": "Charlotte - Serie",
        "dataPrice": "$50.00"
      },
      {
        "title": "Chobits",
        "desc": "Madhouse · Sci‑fi romance",
        "price": "$50.00",
        "img": "img/Chobits.webp",
        "alt": "Chobits",
        "product": "Chobits - Serie",
        "dataPrice": "$50.00"
      },
      {
        "title": "D.Gray-man",
        "desc": "TMS/TV Tokyo · Exorcistas y akuma",
        "price": "$50.00",
        "img": "img/D.Gray-man.webp",
        "alt": "D.Gray-man",
        "product": "D.Gray-man - Serie",
        "dataPrice": "$50.00"
      },
      {
        "title": "Darwin's Game",
        "desc": "Nexus · Juego de supervivencia",
        "price": "$50.00",
        "img": "img/Darwin's Game.webp",
        "alt": "Darwin's Game",
        "product": "Darwin's Game - Serie",
        "dataPrice": "$50.00"
      },
      {
        "title": "Deadman Wonderland",
        "desc": "Manglobe · Acción y gore",
        "price": "$50.00",
        "img": "img/Deadman Wonderland.webp",
        "alt": "Deadman Wonderland",
        "product": "Deadman Wonderland - Serie",
        "dataPrice": "$50.00"
      },
      {
        "title": "Devil May Cry",
        "desc": "Madhouse · Cazador de demonios",
        "price": "$50.00",
        "img": "img/Devil May Cry.webp",
        "alt": "Devil May Cry",
        "product": "Devil May Cry - Serie",
        "dataPrice": "$50.00"
      },
      {
        "title": "Death Note",
        "desc": "Madhouse · Thriller psicológico",
        "price": "$50.00",
        "img": "img/Death Note.webp",
        "alt": "Death Note",
        "product": "Death Note - Serie",
        "dataPrice": "$50.00"
      },
      {
        "title": "Dororo",
        "desc": "MAPPA/Tezuka · Acción histórica",
        "price": "$50.00",
        "img": "img/Dororo.webp",
        "alt": "Dororo",
        "product": "Dororo - Serie",
        "dataPrice": "$50.00"
      },
      {
        "title": "Drifters",
        "desc": "Hoods Drifters · Guerreros isekai",
        "price": "$50.00",
        "img": "img/Drifters.webp",
        "alt": "Drifters",
        "product": "Drifters - Serie",
        "dataPrice": "$50.00"
      },
      {
        "title": "Delicious in Dungeon",
        "desc": "Trigger · Fantasía culinaria",
        "price": "$50.00",
        "img": "img/Delicious in Dungeon.webp",
        "alt": "Delicious in Dungeon",
        "product": "Dungeon Meshi - Serie",
        "dataPrice": "$50.00"
      },
      {
        "title": "Elfen Lied",
        "desc": "Arms · Horror y drama",
        "price": "$50.00",
        "img": "img/Elfen Lied.webp",
        "alt": "Elfen Lied",
        "product": "Elfen Lied - Serie",
        "dataPrice": "$50.00"
      },
      {
        "title": "Fairy Tail",
        "desc": "A-1/Bridge · Magia y aventuras",
        "price": "$50.00",
        "img": "img/Fairy Tail.webp",
        "alt": "Fairy Tail",
        "product": "Fairy Tail - Serie",
        "dataPrice": "$50.00"
      },
      {
        "title": "Fate/Extra Last Encore",
        "desc": "Shaft · Acción y Servants",
        "price": "$50.00",
        "img": "img/FateExtra Last Encore.webp",
        "alt": "Fate/Extra Last Encore",
        "product": "Fate/Extra Last Encore - Serie",
        "dataPrice": "$50.00"
      },
      {
        "title": "Fate/Grand Order: Babylonia",
        "desc": "CloverWorks · Épica mitológica",
        "price": "$50.00",
        "img": "img/FateExtra Last Encore.webp",
        "alt": "Fate/Grand Order: Babylonia",
        "product": "Fate/Grand Order: Absolute Demonic Front - Babylonia - Serie",
        "dataPrice": "$50.00"
      },
      {
        "title": "Fate/stay night",
        "desc": "Studio Deen · Acción y fantasía",
        "price": "$50.00",
        "img": "img/Fatestay night.webp",
        "alt": "Fate/stay night",
        "product": "Fate/stay night - Serie",
        "dataPrice": "$50.00"
      },
      {
        "title": "Gleipnir",
        "desc": "Pine Jam · Misterio y acción",
        "price": "$50.00",
        "img": "img/Gleipnir.webp",
        "alt": "Gleipnir",
        "product": "Gleipnir - Serie",
        "dataPrice": "$50.00"
      },
      {
        "title": "Goblin Slayer",
        "desc": "White Fox · Dark fantasy",
        "price": "$50.00",
        "img": "img/Goblin Slayer.webp",
        "alt": "Goblin Slayer",
        "product": "Goblin Slayer - Serie",
        "dataPrice": "$50.00"
      },
      {
        "title": "The Way of the Househusband",
        "desc": "J.C.Staff · Comedia cotidiana",
        "price": "$50.00",
        "img": "img/The Way of the Househusband.webp",
        "alt": "The Way of the Househusband",
        "product": "Gokushufudou - Serie",
        "dataPrice": "$50.00"
      },
      {
        "title": "Hunter x Hunter",
        "desc": "Madhouse · Aventura shōnen",
        "price": "$50.00",
        "img": "img/Hunter x Hunter.webp",
        "alt": "Hunter x Hunter",
        "product": "Hunter x Hunter - Serie",
        "dataPrice": "$50.00"
      },
      {
        "title": "Interspecies Reviewers",
        "desc": "Passione · Comedia para adultos",
        "price": "$50.00",
        "img": "img/Interspecies Reviewers.webp",
        "alt": "Interspecies Reviewers",
        "product": "Ishuzoku Reviewers - Serie",
        "dataPrice": "$50.00"
      },
      {
        "title": "JoJo's Bizarre Adventure",
        "desc": "David Production · Acción sobrenatural",
        "price": "$50.00",
        "img": "img/JoJo's Bizarre Adventure.webp",
        "alt": "JoJo's Bizarre Adventure",
        "product": "JoJo's Bizarre Adventure - Serie",
        "dataPrice": "$50.00"
      },
      {
        "title": "Jujutsu Kaisen",
        "desc": "MAPPA · Hechicería y acción",
        "price": "$50.00",
        "img": "img/Jujutsu Kaisen.webp",
        "alt": "Jujutsu Kaisen",
        "product": "Jujutsu Kaisen - Serie",
        "dataPrice": "$50.00"
      },
      {
        "title": "Junji Ito Maniac: Japanese Tales of the Macabre",
        "desc": "Studio Deen · Horror antológico",
        "price": "$50.00",
        "img": "img/Junji Ito Maniac Japanese Tales of the Macabre.webp",
        "alt": "Junji Ito Maniac",
        "product": "Junji Ito Maniac - Serie",
        "dataPrice": "$50.00"
      },
      {
        "title": "Tower of God",
        "desc": "Telecom Animation · Fantasía y pruebas",
        "price": "$50.00",
        "img": "img/Tower of God.webp",
        "alt": "Tower of God",
        "product": "Kami no Tou - Serie",
        "dataPrice": "$50.00"
      },
      {
        "title": "Made in Abyss",
        "desc": "Kinema Citrus · Aventura oscura",
        "price": "$50.00",
        "img": "img/Made in Abyss.webp",
        "alt": "Made in Abyss",
        "product": "Made in Abyss - Serie",
        "dataPrice": "$50.00"
      },
      {
        "title": "Magi: The Labyrinth of Magic",
        "desc": "A-1 Pictures · Fantasía y aventuras",
        "price": "$50.00",
        "img": "img/Magi.webp",
        "alt": "Magi: The Labyrinth of Magic",
        "product": "Magi - Serie",
        "dataPrice": "$50.00"
      },
      {
        "title": "Monogatari Series",
        "desc": "Shaft · Misterio y diálogos",
        "price": "$50.00",
        "img": "img/Monogatari Series.webp",
        "alt": "Monogatari Series",
        "product": "Monogatari Series - Serie",
        "dataPrice": "$50.00"
      },
      {
        "title": "Mushoku Tensei: Jobless Reincarnation",
        "desc": "Studio Bind · Isekai y crecimiento",
        "price": "$50.00",
        "img": "img/Mushoku Tensei Jobless Reincarnation.webp",
        "alt": "Mushoku Tensei",
        "product": "Mushoku Tensei - Serie",
        "dataPrice": "$50.00"
      },
      {
        "title": "Natsume's Book of Friends",
        "desc": "Brain's Base/Shuka · Yōkai slice‑of‑life",
        "price": "$50.00",
        "img": "img/Natsume's Book of Friends.webp",
        "alt": "Natsume's Book of Friends",
        "product": "Natsume Yūjin-chō - Serie",
        "dataPrice": "$50.00"
      },
      {
        "title": "Noragami",
        "desc": "Bones · Dioses y aventuras",
        "price": "$50.00",
        "img": "img/Noragami.webp",
        "alt": "Noragami",
        "product": "Noragami - Serie",
        "dataPrice": "$50.00"
      },
      {
        "title": "Overlord",
        "desc": "Madhouse · Isekai oscuro",
        "price": "$50.00",
        "img": "img/Overlord.webp",
        "alt": "Overlord",
        "product": "Overlord - Serie",
        "dataPrice": "$50.00"
      },
      {
        "title": "Pluto",
        "desc": "Studio M2/Tezuka · Sci‑fi detectivesco",
        "price": "$50.00",
        "img": "img/Pluto.webp",
        "alt": "Pluto",
        "product": "Pluto - Serie",
        "dataPrice": "$50.00"
      },
      {
        "title": "Psycho-Pass",
        "desc": "Production I.G · Thriller distópico",
        "price": "$50.00",
        "img": "img/Psycho-Pass.webp",
        "alt": "Psycho-Pass",
        "product": "Psycho-Pass - Serie",
        "dataPrice": "$50.00"
      },
      {
        "title": "Sword Art Online",
        "desc": "A-1 Pictures · MMORPG y aventura",
        "price": "$50.00",
        "img": "img/Sword Art Online.webp",
        "alt": "Sword Art Online",
        "product": "Sword Art Online - Serie",
        "dataPrice": "$50.00"
      },
      {
        "title": "The Qwaser of Stigmata",
        "desc": "Hoods Entertainment · Acción sobrenatural",
        "price": "$50.00",
        "img": "img/The Qwaser of Stigmata.webp",
        "alt": "The Qwaser of Stigmata",
        "product": "Seikon no Qwaser - Serie",
        "dataPrice": "$50.00"
      },
      {
        "title": "SHIMONETA",
        "desc": "J.C.Staff · Comedia absurda",
        "price": "$50.00",
        "img": "img/SHIMONETA.webp",
        "alt": "SHIMONETA",
        "product": "Shimoneta: A Boring World... - Serie",
        "dataPrice": "$50.00"
      },
      {
        "title": "Attack on Titan",
        "desc": "Wit/Mapplehouse · Guerra y titanes",
        "price": "$50.00",
        "img": "img/Attack on Titan.webp",
        "alt": "Attack on Titan",
        "product": "Shingeki no Kyojin - Serie",
        "dataPrice": "$50.00"
      },
      {
        "title": "Soul Eater",
        "desc": "Bones · Acción sobrenatural",
        "price": "$50.00",
        "img": "img/Soul Eater.webp",
        "alt": "Soul Eater",
        "product": "Soul Eater - Serie",
        "dataPrice": "$50.00"
      },
      {
        "title": "Tales of Zestiria the X",
        "desc": "ufotable · Fantasía JRPG",
        "price": "$50.00",
        "img": "img/Tales of Zestiria the X.webp",
        "alt": "Tales of Zestiria the X",
        "product": "Tales of Zestiria the X - Serie",
        "dataPrice": "$50.00"
      },
      {
        "title": "The Rising of the Shield Hero",
        "desc": "Kinema Citrus · Isekai defensivo",
        "price": "$50.00",
        "img": "img/The Rising of the Shield Hero.webp",
        "alt": "The Rising of the Shield Hero",
        "product": "Tate no Yūsha no Nariagari - Serie",
        "dataPrice": "$50.00"
      },
      {
        "title": "To Be Hero X",
        "desc": "BeDream/Anima · Comedia de héroes",
        "price": "$50.00",
        "img": "img/To Be Hero X.webp",
        "alt": "To Be Hero X",
        "product": "To Be Hero X - Serie",
        "dataPrice": "$50.00"
      },
      {
        "title": "Tokyo Ravens",
        "desc": "8bit · Onmyōji y acción",
        "price": "$50.00",
        "img": "img/Tokyo Ravens.webp",
        "alt": "Tokyo Ravens",
        "product": "Tokyo Ravens - Serie",
        "dataPrice": "$50.00"
      },
      {
        "title": "Undead Unluck",
        "desc": "David Production · Acción y comedia",
        "price": "$50.00",
        "img": "img/Undead Unluck.webp",
        "alt": "Undead Unluck",
        "product": "Undead Unluck - Serie",
        "dataPrice": "$50.00"
      },
      {
        "title": "Uzumaki",
        "desc": "Drive/Production I.G · Horror cósmico",
        "price": "$50.00",
        "img": "img/Uzumaki.webp",
        "alt": "Uzumaki",
        "product": "Uzumaki - Serie",
        "dataPrice": "$50.00"
      },
      {
        "title": "Vinland Saga",
        "desc": "Wit/MAPPA · Épica vikinga",
        "price": "$50.00",
        "img": "img/Vinland Saga.webp",
        "alt": "Vinland Saga",
        "product": "Vinland Saga - Serie",
        "dataPrice": "$50.00"
      },
      {
        "title": "The Saga of Tanya the Evil",
        "desc": "NUT · Isekai militar",
        "price": "$50.00",
        "img": "img/The Saga of Tanya the Evil.webp",
        "alt": "The Saga of Tanya the Evil",
        "product": "Youjo Senki - Serie",
        "dataPrice": "$50.00"
      },
      {
        "title": "Zom 100: Bucket List of the Dead",
        "desc": "BUG FILMS · Comedia zombi",
        "price": "$50.00",
        "img": "img/Zom 100 Bucket List of the Dead.webp",
        "alt": "Zom 100: Bucket List of the Dead",
        "product": "Zom 100 - Serie",
        "dataPrice": "$50.00"
      }
    ],
    "movies": [
      {
        "title": "Your Name (Kimi no Na wa)",
        "desc": "Película HD + Extras",
        "price": "$50.00",
        "img": "img/pelis/Your Name (Kimi no Na wa).webp",
        "alt": "Your Name",
        "product": "Your Name (Kimi no Na wa) - Película HD + Extras",
        "dataPrice": "$50.00"
      },
      {
        "title": "Spirited Away",
        "desc": "Clásico de Studio Ghibli",
        "price": "$50.00",
        "img": "img/pelis/Spirited Away.webp",
        "alt": "Spirited Away",
        "product": "Spirited Away - Clásico de Studio Ghibli",
        "dataPrice": "$50.00"
      },
      {
        "title": "Akira",
        "desc": "Edición remasterizada 4K",
        "price": "$50.00",
        "img": "img/pelis/Akira.webp",
        "alt": "Akira",
        "product": "Akira - Edición remasterizada 4K",
        "dataPrice": "$50.00"
      },
      {
        "title": "Princess Mononoke",
        "desc": "Obra maestra de Miyazaki",
        "price": "$50.00",
        "img": "img/pelis/Princess Mononoke.webp",
        "alt": "Princess Mononoke",
        "product": "Princess Mononoke - Obra maestra de Miyazaki",
        "dataPrice": "$50.00"
      },
      {
        "title": "Memories",
        "desc": "Katsuhiro Otomo · Antología",
        "price": "$50.00",
        "img": "img/pelis/Memories.webp",
        "alt": "Memories",
        "product": "Memories (1995) - Antología",
        "dataPrice": "$50.00"
      },
      {
        "title": "Terra Formars: Bugs 2-hen",
        "desc": "OVA · Sci‑fi",
        "price": "$50.00",
        "img": "img/pelis/Terra Formars Bugs 2-hen.webp",
        "alt": "Terra Formars: Bugs 2-hen",
        "product": "Terra Formars: Bugs 2-hen (OVA)",
        "dataPrice": "$50.00"
      },
      {
        "title": "Asagao to Kase-san",
        "desc": "Película yuri · Romance escolar",
        "price": "$50.00",
        "img": "img/pelis/Asagao to Kase-san.webp",
        "alt": "Kase-san and Morning Glories",
        "product": "Asagao to Kase-san - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "El castillo en el cielo",
        "desc": "Studio Ghibli · Aventuras",
        "price": "$50.00",
        "img": "img/pelis/El castillo en el cielo.webp",
        "alt": "Laputa: Castle in the Sky",
        "product": "El castillo en el cielo - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "El himno del corazón",
        "desc": "A-1 Pictures · Drama escolar",
        "price": "$50.00",
        "img": "img/pelis/El himno del corazón.webp",
        "alt": "El himno del corazón",
        "product": "El himno del corazón - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "El jardín de las palabras",
        "desc": "CoMix Wave · Romance",
        "price": "$50.00",
        "img": "img/pelis/El jardín de las palabras.webp",
        "alt": "El jardín de las palabras",
        "product": "El jardín de las palabras - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "El lugar que nos prometimos",
        "desc": "CoMix Wave · Sci‑fi romántico",
        "price": "$50.00",
        "img": "img/pelis/El lugar que nos prometimos.webp",
        "alt": "El lugar que nos prometimos",
        "product": "El lugar que nos prometimos - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "El viento se levanta",
        "desc": "Studio Ghibli · Biográfico",
        "price": "$50.00",
        "img": "img/pelis/El viento se levanta.webp",
        "alt": "El viento se levanta",
        "product": "El viento se levanta - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "Given",
        "desc": "Lerche · Música y romance",
        "price": "$50.00",
        "img": "img/pelis/Given.webp",
        "alt": "Given",
        "product": "Given - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "Hello World",
        "desc": "Graphinica · Sci‑fi romántico",
        "price": "$50.00",
        "img": "img/pelis/Hello World.webp",
        "alt": "Hello World",
        "product": "Hello World - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "Sora no Aosa o Shiru Hito yo",
        "desc": "CloverWorks · Drama musical",
        "price": "$50.00",
        "img": "img/pelis/Sora no Aosa o Shiru Hito yo.webp",
        "alt": "Sora no Aosa o Shiru Hito yo",
        "product": "Sora no Aosa o Shiru Hito yo - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "Kiki: entregas a domicilio",
        "desc": "Studio Ghibli · Fantasía",
        "price": "$50.00",
        "img": "img/pelis/Kiki entregas a domicilio.webp",
        "alt": "Kiki: Entregas a domicilio",
        "product": "Kiki - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "Kimi wa Kanata",
        "desc": "Digital Network Animation · Fantasía",
        "price": "$50.00",
        "img": "img/pelis/Kimi wa Kanata.webp",
        "alt": "Kimi wa Kanata",
        "product": "Kimi wa Kanata - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "La tumba de las luciérnagas",
        "desc": "Studio Ghibli · Guerra",
        "price": "$50.00",
        "img": "img/pelis/La tumba de las luciérnagas.webp",
        "alt": "La tumba de las luciérnagas",
        "product": "La tumba de las luciérnagas - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "Palabras que burbujean como un refresco",
        "desc": "Signal.MD · Romance juvenil",
        "price": "$50.00",
        "img": "img/pelis/Palabras que burbujean como un refresco.webp",
        "alt": "Palabras que burbujean como un refresco",
        "product": "Palabras que burbujean como un refresco - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "Perfect Blue",
        "desc": "Madhouse · Thriller psicológico",
        "price": "$50.00",
        "img": "img/pelis/Perfect Blue.webp",
        "alt": "Perfect Blue",
        "product": "Perfect Blue - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "Ponyo y el secreto de la sirenita",
        "desc": "Studio Ghibli · Fantasía",
        "price": "$50.00",
        "img": "img/pelis/Ponyo y el secreto de la sirenita.webp",
        "alt": "Ponyo y el secreto de la sirenita",
        "product": "Ponyo y el secreto de la sirenita - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "Puedo escuchar el mar",
        "desc": "Studio Ghibli · Drama escolar",
        "price": "$50.00",
        "img": "img/pelis/Puedo escuchar el mar.webp",
        "alt": "Puedo escuchar el mar",
        "product": "Puedo escuchar el mar - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "El amor está en el agua",
        "desc": "Science SARU · Romance",
        "price": "$50.00",
        "img": "img/pelis/El amor está en el agua.webp",
        "alt": "El amor está en el agua",
        "product": "El amor está en el agua - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "Tamako Love Story",
        "desc": "Kyoto Animation · Romance escolar",
        "price": "$50.00",
        "img": "img/pelis/Tamako Love Story.webp",
        "alt": "Tamako Love Story",
        "product": "Tamako Love Story - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "Mundos paralelos",
        "desc": "Signal.MD · Aventura fantástica",
        "price": "$50.00",
        "img": "img/pelis/Mundos paralelos.webp",
        "alt": "Mundos paralelos",
        "product": "Mundos paralelos - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "Mononoke Movie: Karakasa",
        "desc": "Toei Animation · Horror sobrenatural",
        "price": "$50.00",
        "img": "img/pelis/Mononoke Movie Karakasa.webp",
        "alt": "Mononoke Movie: Karakasa",
        "product": "Mononoke Movie: Karakasa - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "Mononoke II: Las cenizas de la ira",
        "desc": "Toei Animation · Horror sobrenatural",
        "price": "$50.00",
        "img": "img/pelis/Mononoke II Las cenizas de la ira.webp",
        "alt": "Mononoke II: Las cenizas de la ira",
        "product": "Mononoke II: Las cenizas de la ira - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "Kizumonogatari I: Tekketsu-hen",
        "desc": "Shaft · Vampiros y misterio",
        "price": "$50.00",
        "img": "img/pelis/Kizumonogatari I Tekketsu-hen.webp",
        "alt": "Kizumonogatari I: Tekketsu-hen",
        "product": "Kizumonogatari I: Tekketsu-hen - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "Kizumonogatari II: Nekketsu-hen",
        "desc": "Shaft · Vampiros y misterio",
        "price": "$50.00",
        "img": "img/pelis/Kizumonogatari II Nekketsu-hen.webp",
        "alt": "Kizumonogatari II: Nekketsu-hen",
        "product": "Kizumonogatari II: Nekketsu-hen - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "Kizumonogatari III: Reiketsu-hen",
        "desc": "Shaft · Vampiros y misterio",
        "price": "$50.00",
        "img": "img/pelis/Kizumonogatari III Reiketsu-hen.webp",
        "alt": "Kizumonogatari III: Reiketsu-hen",
        "product": "Kizumonogatari III: Reiketsu-hen - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "Amor de gata",
        "desc": "CoMix Wave Films · Romance fantástico",
        "price": "$50.00",
        "img": "img/pelis/Amor de gata.webp",
        "alt": "Amor de gata",
        "product": "Amor de gata - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "Bayonetta: Bloody Fate",
        "desc": "Gonzo · Acción sobrenatural",
        "price": "$50.00",
        "img": "img/pelis/Bayonetta Bloody Fate.webp",
        "alt": "Bayonetta: Bloody Fate",
        "product": "Bayonetta: Bloody Fate - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "Bloody Escape: Jigoku no Tousou Geki",
        "desc": "Studio Pierrot · Acción y supervivencia",
        "price": "$50.00",
        "img": "img/pelis/Bloody Escape Jigoku no Tousou Geki.webp",
        "alt": "Bloody Escape: Jigoku no Tousou Geki",
        "product": "Bloody Escape: Jigoku no Tousou Geki - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "Boku ga Aishita Subete no Kimi e",
        "desc": "TMS Entertainment · Sci-fi romántico",
        "price": "$50.00",
        "img": "img/pelis/Boku ga Aishita Subete no Kimi e.webp",
        "alt": "Boku ga Aishita Subete no Kimi e",
        "product": "Boku ga Aishita Subete no Kimi e - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "Bokura no Nanokakan Sensou",
        "desc": "Ajia-do · Aventura juvenil",
        "price": "$50.00",
        "img": "img/pelis/Bokura no Nanokakan Sensou.webp",
        "alt": "Bokura no Nanokakan Sensou",
        "product": "Bokura no Nanokakan Sensou - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "Burbujas",
        "desc": "Wit Studio · Sci-fi post-apocalíptico",
        "price": "$50.00",
        "img": "img/pelis/Burbujas.webp",
        "alt": "Burbujas",
        "product": "Burbujas - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "Cuentos de Terramar",
        "desc": "Studio Ghibli · Fantasía épica",
        "price": "$50.00",
        "img": "img/pelis/Cuentos de Terramar.webp",
        "alt": "Cuentos de Terramar",
        "product": "Cuentos de Terramar - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "Demon City Shinjuku",
        "desc": "Madhouse · Horror urbano",
        "price": "$50.00",
        "img": "img/pelis/Demon City Shinjuku.webp",
        "alt": "Demon City Shinjuku",
        "product": "Demon City Shinjuku - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "Doukyuusei",
        "desc": "A-1 Pictures · Romance BL",
        "price": "$50.00",
        "img": "img/pelis/Doukyuusei.webp",
        "alt": "Doukyuusei",
        "product": "Doukyuusei - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "Dragon Ball Super: Super Hero",
        "desc": "Toei Animation · Acción shōnen",
        "price": "$50.00",
        "img": "img/pelis/Dragon Ball Super Super Hero.webp",
        "alt": "Dragon Ball Super: Super Hero",
        "product": "Dragon Ball Super: Super Hero - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "Eiga Daisuki Pompo-san",
        "desc": "CLAP · Comedia sobre cine",
        "price": "$50.00",
        "img": "img/pelis/Eiga Daisuki Pompo-san.webp",
        "alt": "Eiga Daisuki Pompo-san",
        "product": "Eiga Daisuki Pompo-san - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "El castillo ambulante",
        "desc": "Studio Ghibli · Fantasía romántica",
        "price": "$50.00",
        "img": "img/pelis/El castillo ambulante.webp",
        "alt": "El castillo ambulante",
        "product": "El castillo ambulante - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "El mundo secreto de Arrietty",
        "desc": "Studio Ghibli · Fantasía familiar",
        "price": "$50.00",
        "img": "img/pelis/El mundo secreto de Arrietty.webp",
        "alt": "El mundo secreto de Arrietty",
        "product": "El mundo secreto de Arrietty - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "El niño y la bestia",
        "desc": "Studio Chizu · Aventura fantástica",
        "price": "$50.00",
        "img": "img/pelis/El niño y la bestia.webp",
        "alt": "El niño y la bestia",
        "product": "El niño y la bestia - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "El niño y la garza",
        "desc": "Studio Ghibli · Fantasía dramática",
        "price": "$50.00",
        "img": "img/pelis/El niño y la garza.webp",
        "alt": "El niño y la garza",
        "product": "El niño y la garza - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "El recuerdo de Marnie",
        "desc": "Studio Ghibli · Drama psicológico",
        "price": "$50.00",
        "img": "img/pelis/El recuerdo de Marnie.webp",
        "alt": "El recuerdo de Marnie",
        "product": "El recuerdo de Marnie - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "El regreso del gato",
        "desc": "Studio Ghibli · Fantasía familiar",
        "price": "$50.00",
        "img": "img/pelis/El regreso del gato.webp",
        "alt": "El regreso del gato",
        "product": "El regreso del gato - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "El señor de los anillos: La guerra de los rohirrim",
        "desc": "Sola Entertainment · Fantasía épica",
        "price": "$50.00",
        "img": "img/pelis/El señor de los anillos La guerra de los rohirrim.webp",
        "alt": "El señor de los anillos: La guerra de los rohirrim",
        "product": "El señor de los anillos: La guerra de los rohirrim - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "El tiempo contigo",
        "desc": "CoMix Wave Films · Romance sobrenatural",
        "price": "$50.00",
        "img": "img/pelis/El tiempo contigo.webp",
        "alt": "El tiempo contigo",
        "product": "El tiempo contigo - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "En este rincón del mundo",
        "desc": "MAPPA · Drama histórico",
        "price": "$50.00",
        "img": "img/pelis/En este rincón del mundo.webp",
        "alt": "En este rincón del mundo",
        "product": "En este rincón del mundo - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "Eterno 831",
        "desc": "Studio Colorido · Sci-fi dramático",
        "price": "$50.00",
        "img": "img/pelis/Eterno 831.webp",
        "alt": "Eterno 831",
        "product": "Eterno 831 - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "Evangelion: 1.0 You Are (Not) Alone",
        "desc": "Studio Khara · Mecha psicológico",
        "price": "$50.00",
        "img": "img/pelis/Evangelion 1.0 You Are (Not) Alone.webp",
        "alt": "Evangelion: 1.0 You Are (Not) Alone",
        "product": "Evangelion: 1.0 You Are (Not) Alone - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "Evangelion: 2.0 You Can (Not) Advance",
        "desc": "Studio Khara · Mecha psicológico",
        "price": "$50.00",
        "img": "img/pelis/Evangelion 2.0 You Can (Not) Advance.webp",
        "alt": "Evangelion: 2.0 You Can (Not) Advance",
        "product": "Evangelion: 2.0 You Can (Not) Advance - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "Evangelion: 3.0 You Can (Not) Redo",
        "desc": "Studio Khara · Mecha psicológico",
        "price": "$50.00",
        "img": "img/pelis/Evangelion 3.0 You Can (Not) Redo.webp",
        "alt": "Evangelion: 3.0 You Can (Not) Redo",
        "product": "Evangelion: 3.0 You Can (Not) Redo - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "Evangelion: 3.0+1.0 Thrice Upon a Time",
        "desc": "Studio Khara · Mecha psicológico",
        "price": "$50.00",
        "img": "img/pelis/Evangelion 3.0+1.0 Thrice Upon a Time.webp",
        "alt": "Evangelion: 3.0+1.0 Thrice Upon a Time",
        "product": "Evangelion: 3.0+1.0 Thrice Upon a Time - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "Flavors of Youth",
        "desc": "CoMix Wave Films · Antología nostálgica",
        "price": "$16.99",
        "img": "img/pelis/Flavors of Youth.webp",
        "alt": "Flavors of Youth",
        "product": "Flavors of Youth - Película",
        "dataPrice": "$16.99"
      },
      {
        "title": "Fruits Basket: Prelude",
        "desc": "TMS Entertainment · Drama romántico",
        "price": "$50.00",
        "img": "img/pelis/Fruits Basket Prelude.webp",
        "alt": "Fruits Basket: Prelude",
        "product": "Fruits Basket: Prelude - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "Hogar a la deriva",
        "desc": "Studio Colorido · Aventura familiar",
        "price": "$16.99",
        "img": "img/pelis/Hogar a la deriva.webp",
        "alt": "Hogar a la deriva",
        "product": "Hogar a la deriva - Película",
        "dataPrice": "$16.99"
      },
      {
        "title": "Hoshi no Koe",
        "desc": "CoMix Wave Films · Sci-fi romántico",
        "price": "$50.00",
        "img": "img/pelis/Hoshi no Koe.webp",
        "alt": "Hoshi no Koe",
        "product": "Hoshi no Koe - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "Hotarubi no Mori e",
        "desc": "Brain's Base · Romance sobrenatural",
        "price": "$50.00",
        "img": "img/pelis/Hotarubi no Mori e.webp",
        "alt": "Hotarubi no Mori e",
        "product": "Hotarubi no Mori e - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "InuYasha: Affections Touching Across Time",
        "desc": "Sunrise · Acción sobrenatural",
        "price": "$50.00",
        "img": "img/pelis/InuYasha Affections Touching Across Time.webp",
        "alt": "InuYasha: Affections Touching Across Time",
        "product": "InuYasha: Affections Touching Across Time - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "InuYasha: The Castle Beyond the Looking Glass",
        "desc": "Sunrise · Acción sobrenatural",
        "price": "$50.00",
        "img": "img/pelis/InuYasha The Castle Beyond the Looking Glass.webp",
        "alt": "InuYasha: The Castle Beyond the Looking Glass",
        "product": "InuYasha: The Castle Beyond the Looking Glass - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "InuYasha: Swords of an Honorable Ruler",
        "desc": "Sunrise · Acción sobrenatural",
        "price": "$50.00",
        "img": "img/pelis/InuYasha Swords of an Honorable Ruler.webp",
        "alt": "InuYasha: Swords of an Honorable Ruler",
        "product": "InuYasha: Swords of an Honorable Ruler - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "InuYasha: Fire on the Mystic Island",
        "desc": "Sunrise · Acción sobrenatural",
        "price": "$50.00",
        "img": "img/pelis/InuYasha Fire on the Mystic Island.webp",
        "alt": "InuYasha: Fire on the Mystic Island",
        "product": "InuYasha: Fire on the Mystic Island - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "Josee to Tora to Sakana-tachi",
        "desc": "Bones · Romance dramático",
        "price": "$50.00",
        "img": "img/pelis/Josee to Tora to Sakana-tachi.webp",
        "alt": "Josee to Tora to Sakana-tachi",
        "product": "Josee to Tora to Sakana-tachi - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "Kamiarizuki no Kodomo",
        "desc": "LIDENFILMS · Aventura sobrenatural",
        "price": "$50.00",
        "img": "img/pelis/Kamiarizuki no Kodomo.webp",
        "alt": "Kamiarizuki no Kodomo",
        "product": "Kamiarizuki no Kodomo - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "Kimi wo Aishita Hitori no Boku e",
        "desc": "TMS Entertainment · Sci-fi romántico",
        "price": "$50.00",
        "img": "img/pelis/Kimi wo Aishita Hitori no Boku e.webp",
        "alt": "Kimi wo Aishita Hitori no Boku e",
        "product": "Kimi wo Aishita Hitori no Boku e - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "Kizumonogatari: Koyomi Vamp",
        "desc": "Shaft · Vampiros y misterio",
        "price": "$50.00",
        "img": "img/pelis/Kizumonogatari Koyomi Vamp.webp",
        "alt": "Kizumonogatari: Koyomi Vamp",
        "product": "Kizumonogatari: Koyomi Vamp - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "La chica que saltaba a través del tiempo",
        "desc": "Madhouse · Sci-fi romántico",
        "price": "$50.00",
        "img": "img/pelis/La chica que saltaba a través del tiempo.webp",
        "alt": "La chica que saltaba a través del tiempo",
        "product": "La chica que saltaba a través del tiempo - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "La colina de las amapolas",
        "desc": "Studio Ghibli · Romance histórico",
        "price": "$50.00",
        "img": "img/pelis/La colina de las amapolas.webp",
        "alt": "La colina de las amapolas",
        "product": "La colina de las amapolas - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "La leyenda de Hei",
        "desc": "Studio Colorido · Acción sobrenatural",
        "price": "$50.00",
        "img": "img/pelis/La leyenda de Hei.webp",
        "alt": "La leyenda de Hei",
        "product": "La leyenda de Hei - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "La princesa y el piloto",
        "desc": "Madhouse · Aventura aérea",
        "price": "$50.00",
        "img": "img/pelis/La princesa y el piloto.webp",
        "alt": "La princesa y el piloto",
        "product": "La princesa y el piloto - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "Las quintillizas: La película",
        "desc": "Bibury Animation Studios · Romance harem",
        "price": "$50.00",
        "img": "img/pelis/Las quintillizas La película.webp",
        "alt": "Las quintillizas: La película",
        "product": "Las quintillizas: La película - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "La tortuga roja",
        "desc": "Studio Ghibli · Drama sin diálogos",
        "price": "$50.00",
        "img": "img/pelis/La tortuga roja.webp",
        "alt": "La tortuga roja",
        "product": "La tortuga roja - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "Look Back",
        "desc": "Studio Durian · Drama artístico",
        "price": "$50.00",
        "img": "img/pelis/Look Back.webp",
        "alt": "Look Back",
        "product": "Look Back - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "Los caballeros del zodíaco: La leyenda de los guerreros escarlata",
        "desc": "Toei Animation · Acción mitológica",
        "price": "$50.00",
        "img": "img/pelis/Los caballeros del zodíaco La leyenda de los guerreros escarlata.webp",
        "alt": "Los caballeros del zodíaco: La leyenda de los guerreros escarlata",
        "product": "Los caballeros del zodíaco: La leyenda de los guerreros escarlata - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "Los caballeros del zodíaco: La batalla de los dioses",
        "desc": "Toei Animation · Acción mitológica",
        "price": "$50.00",
        "img": "img/pelis/Los caballeros del zodíaco La batalla de los dioses.webp",
        "alt": "Los caballeros del zodíaco: La batalla de los dioses",
        "product": "Los caballeros del zodíaco: La batalla de los dioses - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "Los niños lobo",
        "desc": "Studio Chizu · Drama familiar",
        "price": "$50.00",
        "img": "img/pelis/Los niños lobo.webp",
        "alt": "Los niños lobo",
        "product": "Los niños lobo - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "Luces en el cielo",
        "desc": "Studio Colorido · Sci-fi juvenil",
        "price": "$50.00",
        "img": "img/pelis/Luces en el cielo.webp",
        "alt": "Luces en el cielo",
        "product": "Luces en el cielo - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "Maquia: When the Promised Flower Blooms",
        "desc": "P.A.Works · Fantasía dramática",
        "price": "$50.00",
        "img": "img/pelis/Maquia When the Promised Flower Blooms.webp",
        "alt": "Maquia: When the Promised Flower Blooms",
        "product": "Maquia: When the Promised Flower Blooms - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "Mary y la flor de la bruja",
        "desc": "Studio Ponoc · Fantasía mágica",
        "price": "$50.00",
        "img": "img/pelis/Mary y la flor de la bruja.webp",
        "alt": "Mary y la flor de la bruja",
        "product": "Mary y la flor de la bruja - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "Mis vecinos los Yamada",
        "desc": "Studio Ghibli · Comedia familiar",
        "price": "$50.00",
        "img": "img/pelis/Mis vecinos los Yamada.webp",
        "alt": "Mis vecinos los Yamada",
        "product": "Mis vecinos los Yamada - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "Mirai: Mi pequeña hermana",
        "desc": "Studio Chizu · Fantasía familiar",
        "price": "$50.00",
        "img": "img/pelis/Mirai Mi pequeña hermana.webp",
        "alt": "Mirai: Mi pequeña hermana",
        "product": "Mirai: Mi pequeña hermana - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "Mi vecino Totoro",
        "desc": "Studio Ghibli · Fantasía familiar clásica",
        "price": "$50.00",
        "img": "img/pelis/Mi vecino Totoro.webp",
        "alt": "Mi vecino Totoro",
        "product": "Mi vecino Totoro - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "My Oni Girl",
        "desc": "Studio Colorido · Romance sobrenatural",
        "price": "$50.00",
        "img": "img/pelis/My Oni Girl.webp",
        "alt": "My Oni Girl",
        "product": "My Oni Girl - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "Nausicaä del Valle del Viento",
        "desc": "Studio Ghibli · Sci-fi ecológico",
        "price": "$50.00",
        "img": "img/pelis/Nausicaä del Valle del Viento.webp",
        "alt": "Nausicaä del Valle del Viento",
        "product": "Nausicaä del Valle del Viento - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "One Piece: Strong World",
        "desc": "Toei Animation · Aventura pirata",
        "price": "$50.00",
        "img": "img/pelis/One Piece Strong World.webp",
        "alt": "One Piece: Strong World",
        "product": "One Piece: Strong World - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "One Piece: Film Z",
        "desc": "Toei Animation · Aventura pirata",
        "price": "$50.00",
        "img": "img/pelis/One Piece Film Z.webp",
        "alt": "One Piece: Film Z",
        "product": "One Piece: Film Z - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "One Piece: Film Red",
        "desc": "Toei Animation · Aventura pirata musical",
        "price": "$50.00",
        "img": "img/pelis/One Piece Film Red.webp",
        "alt": "One Piece: Film Red",
        "product": "One Piece: Film Red - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "Overlord: The Sacred Kingdom",
        "desc": "Madhouse · Isekai oscuro",
        "price": "$50.00",
        "img": "img/pelis/Overlord The Sacred Kingdom.webp",
        "alt": "Overlord: The Sacred Kingdom",
        "product": "Overlord: The Sacred Kingdom - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "Paprika",
        "desc": "Madhouse · Thriller psicológico",
        "price": "$50.00",
        "img": "img/pelis/Paprika.webp",
        "alt": "Paprika",
        "product": "Paprika - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "Porco Rosso",
        "desc": "Studio Ghibli · Aventura aérea",
        "price": "$50.00",
        "img": "img/pelis/Porco Rosso.webp",
        "alt": "Porco Rosso",
        "product": "Porco Rosso - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "Quiero comerme tu páncreas",
        "desc": "Studio VOLN · Drama romántico",
        "price": "$50.00",
        "img": "img/pelis/Quiero comerme tu páncreas.webp",
        "alt": "Quiero comerme tu páncreas",
        "product": "Quiero comerme tu páncreas - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "Recuerdos del ayer",
        "desc": "Studio Ghibli · Drama nostálgico",
        "price": "$50.00",
        "img": "img/pelis/Recuerdos del ayer.webp",
        "alt": "Recuerdos del ayer",
        "product": "Recuerdos del ayer - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "Sakasama no Patema",
        "desc": "Studio Rikka · Sci-fi aventura",
        "price": "$50.00",
        "img": "img/pelis/Sakasama no Patema.webp",
        "alt": "Sakasama no Patema",
        "product": "Sakasama no Patema - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "Sasaki to Miyano: Sotsugyou-hen",
        "desc": "Studio Deen · Romance BL",
        "price": "$50.00",
        "img": "img/pelis/Sasaki to Miyano Sotsugyou-hen.webp",
        "alt": "Sasaki to Miyano: Sotsugyou-hen",
        "product": "Sasaki to Miyano: Sotsugyou-hen - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "Sing a Bit of Harmony",
        "desc": "J.C.Staff · Sci-fi musical",
        "price": "$50.00",
        "img": "img/pelis/Sing a Bit of Harmony.webp",
        "alt": "Sing a Bit of Harmony",
        "product": "Sing a Bit of Harmony - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "Summer Ghost",
        "desc": "Studio Colorido · Drama sobrenatural",
        "price": "$50.00",
        "img": "img/pelis/Summer Ghost.webp",
        "alt": "Summer Ghost",
        "product": "Summer Ghost - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "Summer Wars",
        "desc": "Madhouse · Sci-fi familiar",
        "price": "$50.00",
        "img": "img/pelis/Summer Wars.webp",
        "alt": "Summer Wars",
        "product": "Summer Wars - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "Susurros del corazón",
        "desc": "Studio Ghibli · Romance juvenil",
        "price": "$50.00",
        "img": "img/pelis/Susurros del corazón.webp",
        "alt": "Susurros del corazón",
        "product": "Susurros del corazón - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "Suto Puri Movie",
        "desc": "Studio Pierrot · Idol musical",
        "price": "$50.00",
        "img": "img/pelis/Suto Puri Movie.webp",
        "alt": "Suto Puri Movie",
        "product": "Suto Puri Movie - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "Suzume no Tojimari",
        "desc": "CoMix Wave Films · Aventura sobrenatural",
        "price": "$50.00",
        "img": "img/pelis/Suzume no Tojimari.webp",
        "alt": "Suzume no Tojimari",
        "product": "Suzume no Tojimari - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "The First Slam Dunk",
        "desc": "Toei Animation · Deportes baloncesto",
        "price": "$50.00",
        "img": "img/pelis/The First Slam Dunk.webp",
        "alt": "The First Slam Dunk",
        "product": "The First Slam Dunk - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "The Tunnel to Summer, the Exit of Goodbye",
        "desc": "CLAP · Sci-fi romántico",
        "price": "$50.00",
        "img": "img/pelis/The Tunnel to Summer, the Exit of Goodbye.webp",
        "alt": "The Tunnel to Summer, the Exit of Goodbye",
        "product": "The Tunnel to Summer, the Exit of Goodbye - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "Trapezium",
        "desc": "CloverWorks · Drama idol",
        "price": "$50.00",
        "img": "img/pelis/Trapezium.webp",
        "alt": "Trapezium",
        "product": "Trapezium - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "Una voz silenciosa",
        "desc": "Kyoto Animation · Drama emocional",
        "price": "$50.00",
        "img": "img/pelis/Una voz silenciosa.webp",
        "alt": "Una voz silenciosa",
        "product": "Una voz silenciosa - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "Versailles no Bara",
        "desc": "TMS Entertainment · Drama histórico",
        "price": "$50.00",
        "img": "img/pelis/Versailles no Bara.webp",
        "alt": "Versailles no Bara",
        "product": "Versailles no Bara - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "Viaje a Agartha",
        "desc": "CoMix Wave Films · Aventura fantástica",
        "price": "$50.00",
        "img": "img/pelis/Viaje a Agartha.webp",
        "alt": "Viaje a Agartha",
        "product": "Viaje a Agartha - Película",
        "dataPrice": "$50.00"
      },
      {
        "title": "You Are Umasou",
        "desc": "Ajia-do · Aventura familiar dinosaurios",
        "price": "$50.00",
        "img": "img/pelis/You Are Umasou.webp",
        "alt": "You Are Umasou",
        "product": "You Are Umasou - Película",
        "dataPrice": "$50.00"
      }
    ],
    "mangas": [
      {
        "title": "One Piece",
        "desc": "Eiichiro Oda · Shōnen · Aventuras piratas",
        "price": "$50.00",
        "img": "img/mangas/One Piece.webp",
        "alt": "One Piece Vol. 1",
        "product": "One Piece (Manga)",
        "dataPrice": "$50.00"
      },
      {
        "title": "Jujutsu Kaisen",
        "desc": "Gege Akutami · Shōnen · Hechicería y maldiciones",
        "price": "$50.00",
        "img": "img/mangas/Jujutsu Kaisen.webp",
        "alt": "Jujutsu Kaisen Vol. 1",
        "product": "Jujutsu Kaisen (Manga)",
        "dataPrice": "$50.00"
      },
      {
        "title": "One-Punch Man",
        "desc": "ONE, Yusuke Murata · Shōnen · Acción y comedia",
        "price": "$50.00",
        "img": "img/manga//2/2f/One-Punch_Man_cover.webp",
        "alt": "One-Punch Man Vol. 1",
        "product": "One-Punch Man (Manga)",
        "dataPrice": "$50.00"
      },
      {
        "title": "Spy x Family",
        "desc": "Tatsuya Endo · Shōnen · Espionaje y comedia",
        "price": "$50.00",
        "img": "img/manga//4/4b/Spy_x_Family_volume_1_cover.webp",
        "alt": "Spy x Family Vol. 1",
        "product": "Spy x Family (Manga)",
        "dataPrice": "$50.00"
      },
      {
        "title": "Dandadan",
        "desc": "Yukinobu Tatsu · Shōnen · Sci‑fi y paranormal",
        "price": "$50.00",
        "img": "img/manga//6/6a/Dandadan_vol_1_cover.webp",
        "alt": "Dandadan Vol. 1",
        "product": "Dandadan (Manga)",
        "dataPrice": "$50.00"
      },
      {
        "title": "Kaiju No. 8",
        "desc": "Naoya Matsumoto · Shōnen · Monstruos y acción",
        "price": "$50.00",
        "img": "img/manga//2/2c/Kaiju_No._8_volume_1_cover.webp",
        "alt": "Kaiju No. 8 Vol. 1",
        "product": "Kaiju No. 8 (Manga)",
        "dataPrice": "$50.00"
      },
      {
        "title": "Chainsaw Man (Parte 2)",
        "desc": "Tatsuki Fujimoto · Shōnen · Oscuro y frenético",
        "price": "$50.00",
        "img": "img/manga//2/2d/Chainsaw_Man_manga_volume_1_cover.webp",
        "alt": "Chainsaw Man Vol. 1",
        "product": "Chainsaw Man Part 2 (Manga)",
        "dataPrice": "$50.00"
      },
      {
        "title": "Black Clover",
        "desc": "Yūki Tabata · Shōnen · Magia y aventuras",
        "price": "$50.00",
        "img": "img/manga//6/6f/Black_Clover%2C_volume_1.webp",
        "alt": "Black Clover Vol. 1",
        "product": "Black Clover (Manga)",
        "dataPrice": "$50.00"
      },
      {
        "title": "D.Gray-man",
        "desc": "Katsura Hoshino · Shōnen · Exorcistas y akuma",
        "price": "$50.00",
        "img": "img/manga//9/9e/D.Gray-man_Volume_1.webp",
        "alt": "D.Gray-man Vol. 1",
        "product": "D.Gray-man (Manga)",
        "dataPrice": "$50.00"
      },
      {
        "title": "Frieren: Beyond Journey's End",
        "desc": "Kanehito Yamada, Tsukasa Abe · Fantasy slice‑of‑life",
        "price": "$50.00",
        "img": "img/manga//5/53/Frieren_Volume_1.webp",
        "alt": "Frieren: Beyond Journey's End Vol. 1",
        "product": "Frieren (Manga)",
        "dataPrice": "$50.00"
      },
      {
        "title": "My Hero Academia",
        "desc": "Kōhei Horikoshi · Shōnen · Superhéroes",
        "price": "$50.00",
        "img": "img/manga//1/19/My_Hero_Academia_Volume_1.webp",
        "alt": "My Hero Academia Vol. 1",
        "product": "My Hero Academia (Manga)",
        "dataPrice": "$50.00"
      },
      {
        "title": "Vinland Saga",
        "desc": "Makoto Yukimura · Seinen · Épica vikinga",
        "price": "$50.00",
        "img": "img/manga//5/5e/Vinland_Saga_volume_1_cover.webp",
        "alt": "Vinland Saga Vol. 1",
        "product": "Vinland Saga (Manga)",
        "dataPrice": "$50.00"
      },
      {
        "title": "Record of Ragnarok",
        "desc": "Shinya Umemura, Takumi Fukui, Ajichika · Combates épicos",
        "price": "$50.00",
        "img": "img/manga//7/74/Record_of_Ragnarok_volume_1_cover.webp",
        "alt": "Record of Ragnarok Vol. 1",
        "product": "Record of Ragnarok (Manga)",
        "dataPrice": "$50.00"
      },
      {
        "title": "Blue Exorcist",
        "desc": "Kazue Katō · Shōnen · Demonios y exorcismo",
        "price": "$50.00",
        "img": "img/manga//8/8f/Ao_no_Exorcist_v01_cover.webp",
        "alt": "Blue Exorcist Vol. 1",
        "product": "Blue Exorcist (Manga)",
        "dataPrice": "$50.00"
      },
      {
        "title": "Claymore",
        "desc": "Norihiro Yagi · Dark fantasy y acción",
        "price": "$50.00",
        "img": "img/manga//0/0f/Claymore_volume_1_cover.webp",
        "alt": "Claymore Vol. 1",
        "product": "Claymore (Manga)",
        "dataPrice": "$50.00"
      },
      {
        "title": "Death Note",
        "desc": "Tsugumi Ōba, Takeshi Obata · Thriller psicológico",
        "price": "$50.00",
        "img": "img/manga//6/6f/Death_Note_Vol_1.webp",
        "alt": "Death Note Vol. 1",
        "product": "Death Note (Manga)",
        "dataPrice": "$50.00"
      },
      {
        "title": "Dr. Stone",
        "desc": "Riichiro Inagaki, Boichi · Ciencia y aventura",
        "price": "$50.00",
        "img": "img/manga//4/4d/Dr._Stone_volume_1_cover.webp",
        "alt": "Dr. Stone Vol. 1",
        "product": "Dr. Stone (Manga)",
        "dataPrice": "$50.00"
      },
      {
        "title": "Gintama",
        "desc": "Hideaki Sorachi · Comedia y samuráis sci‑fi",
        "price": "$50.00",
        "img": "img/manga//c/c0/Gintama01.webp",
        "alt": "Gintama Vol. 1",
        "product": "Gintama (Manga)",
        "dataPrice": "$50.00"
      },
      {
        "title": "Made in Abyss",
        "desc": "Akihito Tsukushi · Aventura y misterio oscuro",
        "price": "$50.00",
        "img": "img/manga//0/0a/Made_in_Abyss_volume_1_cover.webp",
        "alt": "Made in Abyss Vol. 1",
        "product": "Made in Abyss (Manga)",
        "dataPrice": "$50.00"
      },
      {
        "title": "Future Diary (Mirai Nikki)",
        "desc": "Sakae Esuno · Suspenso y supervivencia",
        "price": "$50.00",
        "img": "img/manga//8/8c/Future_Diary_volume_1_cover.webp",
        "alt": "Mirai Nikki Vol. 1",
        "product": "Mirai Nikki (Manga)",
        "dataPrice": "$50.00"
      },
      {
        "title": "Noragami",
        "desc": "Adachitoka · Dioses, acción y comedia",
        "price": "$50.00",
        "img": "img/manga//f/fb/Noragami_vol_1.webp",
        "alt": "Noragami Vol. 1",
        "product": "Noragami (Manga)",
        "dataPrice": "$50.00"
      },
      {
        "title": "Noblesse",
        "desc": "Son Jae-ho, Lee Kwang-su · Webtoon · Vampiros",
        "price": "$50.00",
        "img": "img/manga//8/8e/Noblesse_Webtoon_Volume_1.webp",
        "alt": "Noblesse Volume 1",
        "product": "Noblesse (Webtoon)",
        "dataPrice": "$50.00"
      },
      {
        "title": "20th Century Boys",
        "desc": "Naoki Urasawa · Seinen · Misterio y thriller",
        "price": "$50.00",
        "img": "img/manga//8/8c/20th_Century_Boys_volume_1_cover.webp",
        "alt": "20th Century Boys Vol. 1",
        "product": "20th Century Boys (Manga)",
        "dataPrice": "$50.00"
      },
      {
        "title": "Adabana",
        "desc": "Drama · Romance",
        "price": "$50.00",
        "img": "https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=300&h=400&fit=crop&auto=format&q=80",
        "alt": "Adabana",
        "product": "Adabana (Manga)",
        "dataPrice": "$50.00"
      },
      {
        "title": "Ansatsu Kyoushitsu",
        "desc": "Yusei Matsui · Shōnen · Comedia y acción escolar",
        "price": "$50.00",
        "img": "img/manga//8/8a/Assassination_Classroom_volume_1_cover.webp",
        "alt": "Ansatsu Kyoushitsu Vol. 1",
        "product": "Ansatsu Kyoushitsu (Manga)",
        "dataPrice": "$50.00"
      },
      {
        "title": "Banana Fish",
        "desc": "Akimi Yoshida · Shōjo · Drama y acción",
        "price": "$50.00",
        "img": "img/manga//f/f1/Banana_Fish_volume_1_cover.webp",
        "alt": "Banana Fish Vol. 1",
        "product": "Banana Fish (Manga)",
        "dataPrice": "$50.00"
      },
      {
        "title": "Bastard",
        "desc": "Carnby Kim, Youngchan Hwang · Webtoon · Horror psicológico",
        "price": "$50.00",
        "img": "https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=300&h=400&fit=crop&auto=format&q=80",
        "alt": "Bastard",
        "product": "Bastard (Webtoon)",
        "dataPrice": "$50.00"
      },
      {
        "title": "Berserk",
        "desc": "Kentaro Miura · Seinen · Dark fantasy épico",
        "price": "$50.00",
        "img": "img/berserk.webp",
        "alt": "Berserk Vol. 1",
        "product": "Berserk (Manga)",
        "dataPrice": "$50.00"
      },
      {
        "title": "BILLY BAT",
        "desc": "Naoki Urasawa, Takashi Nagasaki · Seinen · Misterio",
        "price": "$50.00",
        "img": "https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=300&h=400&fit=crop&auto=format&q=80",
        "alt": "BILLY BAT",
        "product": "BILLY BAT (Manga)",
        "dataPrice": "$50.00"
      },
      {
        "title": "Deadman Wonderland",
        "desc": "Jinsei Kataoka, Kazuma Kondou · Shōnen · Horror y acción",
        "price": "$50.00",
        "img": "img/manga//9/9f/Deadman_Wonderland_volume_1_cover.webp",
        "alt": "Deadman Wonderland Vol. 1",
        "product": "Deadman Wonderland (Manga)",
        "dataPrice": "$50.00"
      },
      {
        "title": "Doom Breaker",
        "desc": "Webtoon · Acción y fantasía",
        "price": "$50.00",
        "img": "https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=300&h=400&fit=crop&auto=format&q=80",
        "alt": "Doom Breaker",
        "product": "Doom Breaker (Webtoon)",
        "dataPrice": "$50.00"
      },
      {
        "title": "Dorohedoro",
        "desc": "Q Hayashida · Seinen · Dark fantasy y comedia",
        "price": "$50.00",
        "img": "img/manga//9/9c/Dorohedoro_volume_1_cover.webp",
        "alt": "Dorohedoro Vol. 1",
        "product": "Dorohedoro (Manga)",
        "dataPrice": "$50.00"
      },
      {
        "title": "Drifters",
        "desc": "Kouta Hirano · Seinen · Acción histórica y fantasía",
        "price": "$50.00",
        "img": "img/manga//c/c8/Drifters_volume_1_cover.webp",
        "alt": "Drifters Vol. 1",
        "product": "Drifters (Manga)",
        "dataPrice": "$50.00"
      },
      {
        "title": "El Espadachin Perezoso",
        "desc": "Webtoon · Acción y aventura",
        "price": "$50.00",
        "img": "https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=300&h=400&fit=crop&auto=format&q=80",
        "alt": "El Espadachin Perezoso",
        "product": "El Espadachin Perezoso (Webtoon)",
        "dataPrice": "$50.00"
      },
      {
        "title": "El mago oscuro Renace",
        "desc": "Webtoon · Fantasía y magia",
        "price": "$50.00",
        "img": "https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=300&h=400&fit=crop&auto=format&q=80",
        "alt": "El mago oscuro Renace",
        "product": "El mago oscuro Renace (Webtoon)",
        "dataPrice": "$50.00"
      },
      {
        "title": "El mundo después del Fin",
        "desc": "Webtoon · Post-apocalíptico",
        "price": "$50.00",
        "img": "https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=300&h=400&fit=crop&auto=format&q=80",
        "alt": "El mundo después del Fin",
        "product": "El mundo después del Fin (Webtoon)",
        "dataPrice": "$50.00"
      },
      {
        "title": "Everlasting God of Sword",
        "desc": "Manhua · Artes marciales y cultivo",
        "price": "$50.00",
        "img": "https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=300&h=400&fit=crop&auto=format&q=80",
        "alt": "Everlasting God of Sword",
        "product": "Everlasting God of Sword (Manhua)",
        "dataPrice": "$50.00"
      },
      {
        "title": "Fumetsu no Anata E",
        "desc": "Yoshitoki Oima · Shōnen · Drama y fantasía",
        "price": "$50.00",
        "img": "img/manga//d/d8/To_Your_Eternity_volume_1_cover.webp",
        "alt": "Fumetsu no Anata E Vol. 1",
        "product": "Fumetsu no Anata E (Manga)",
        "dataPrice": "$50.00"
      },
      {
        "title": "Hellsing",
        "desc": "Kouta Hirano · Seinen · Vampiros y acción",
        "price": "$50.00",
        "img": "img/Hellsing.webp",
        "alt": "Hellsing Vol. 1",
        "product": "Hellsing (Manga)",
        "dataPrice": "$50.00"
      },
      {
        "title": "Heroe suicida de clase sss",
        "desc": "Webtoon · Acción y superpoderes",
        "price": "$50.00",
        "img": "https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=300&h=400&fit=crop&auto=format&q=80",
        "alt": "Heroe suicida de clase sss",
        "product": "Heroe suicida de clase sss (Webtoon)",
        "dataPrice": "$50.00"
      },
      {
        "title": "Homunculus",
        "desc": "Hideo Yamamoto · Seinen · Horror psicológico",
        "price": "$50.00",
        "img": "https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=300&h=400&fit=crop&auto=format&q=80",
        "alt": "Homunculus",
        "product": "Homunculus (Manga)",
        "dataPrice": "$50.00"
      },
      {
        "title": "Houkago wa Kissaten de",
        "desc": "Romance · Slice of life",
        "price": "$50.00",
        "img": "https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=300&h=400&fit=crop&auto=format&q=80",
        "alt": "Houkago wa Kissaten de",
        "product": "Houkago wa Kissaten de (Manga)",
        "dataPrice": "$50.00"
      },
      {
        "title": "Killing Stalking",
        "desc": "Koogi · Webtoon · Horror psicológico",
        "price": "$50.00",
        "img": "https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=300&h=400&fit=crop&auto=format&q=80",
        "alt": "Killing Stalking",
        "product": "Killing Stalking (Webtoon)",
        "dataPrice": "$50.00"
      },
      {
        "title": "La venganza del sabueso",
        "desc": "Webtoon · Acción y venganza",
        "price": "$50.00",
        "img": "https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=300&h=400&fit=crop&auto=format&q=80",
        "alt": "La venganza del sabueso",
        "product": "La venganza del sabueso (Webtoon)",
        "dataPrice": "$50.00"
      },
      {
        "title": "La vida despues de la muerte",
        "desc": "Webtoon · Sobrenatural",
        "price": "$50.00",
        "img": "https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=300&h=400&fit=crop&auto=format&q=80",
        "alt": "La vida despues de la muerte",
        "product": "La vida despues de la muerte (Webtoon)",
        "dataPrice": "$50.00"
      },
      {
        "title": "Lector Omnisciente",
        "desc": "Sing Shong · Webtoon · Fantasía y aventura",
        "price": "$50.00",
        "img": "https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=300&h=400&fit=crop&auto=format&q=80",
        "alt": "Lector Omnisciente",
        "product": "Lector Omnisciente (Webtoon)",
        "dataPrice": "$50.00"
      },
      {
        "title": "Ley de menores",
        "desc": "Webtoon · Drama y thriller",
        "price": "$50.00",
        "img": "https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=300&h=400&fit=crop&auto=format&q=80",
        "alt": "Ley de menores",
        "product": "Ley de menores (Webtoon)",
        "dataPrice": "$50.00"
      },
      {
        "title": "Lookism",
        "desc": "Park Tae-joon · Webtoon · Drama escolar",
        "price": "$50.00",
        "img": "https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=300&h=400&fit=crop&auto=format&q=80",
        "alt": "Lookism",
        "product": "Lookism (Webtoon)",
        "dataPrice": "$50.00"
      },
      {
        "title": "Naruto",
        "desc": "Masashi Kishimoto · Shōnen · Ninjas y aventura",
        "price": "$50.00",
        "img": "img/manga//9/94/NarutoCoverTankobon1.webp",
        "alt": "Naruto Vol. 1",
        "product": "Naruto (Manga)",
        "dataPrice": "$50.00"
      },
      {
        "title": "One Piece",
        "desc": "Eiichiro Oda · Shōnen · Piratas y aventura",
        "price": "$50.00",
        "img": "img/manga//9/90/One_Piece%2C_Volume_61_Cover_%28Japanese%29.webp",
        "alt": "One Piece Vol. 1",
        "product": "One Piece (Manga)",
        "dataPrice": "$50.00"
      },
      {
        "title": "Orb",
        "desc": "Webtoon · Fantasía y aventura",
        "price": "$50.00",
        "img": "https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=300&h=400&fit=crop&auto=format&q=80",
        "alt": "Orb",
        "product": "Orb (Webtoon)",
        "dataPrice": "$50.00"
      },
      {
        "title": "Overlord",
        "desc": "Kugane Maruyama, Hugin Miyama · Isekai y fantasía",
        "price": "$50.00",
        "img": "img/manga//c/c6/Overlord_volume_1_cover.webp",
        "alt": "Overlord Vol. 1",
        "product": "Overlord (Manga)",
        "dataPrice": "$50.00"
      },
      {
        "title": "Oyasumi Punpun",
        "desc": "Inio Asano · Seinen · Drama psicológico",
        "price": "$50.00",
        "img": "https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=300&h=400&fit=crop&auto=format&q=80",
        "alt": "Oyasumi Punpun",
        "product": "Oyasumi Punpun (Manga)",
        "dataPrice": "$50.00"
      },
      {
        "title": "School Days",
        "desc": "Sakai Houbunsha · Drama y romance",
        "price": "$50.00",
        "img": "https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=300&h=400&fit=crop&auto=format&q=80",
        "alt": "School Days",
        "product": "School Days (Manga)",
        "dataPrice": "$50.00"
      },
      {
        "title": "Shinotori",
        "desc": "Drama · Sobrenatural",
        "price": "$50.00",
        "img": "https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=300&h=400&fit=crop&auto=format&q=80",
        "alt": "Shinotori",
        "product": "Shinotori (Manga)",
        "dataPrice": "$50.00"
      },
      {
        "title": "Shuumatsu no Valkyrie",
        "desc": "Shinya Umemura, Takumi Fukui, Ajichika · Combates épicos",
        "price": "$50.00",
        "img": "img/manga//7/74/Record_of_Ragnarok_volume_1_cover.webp",
        "alt": "Shuumatsu no Valkyrie Vol. 1",
        "product": "Shuumatsu no Valkyrie (Manga)",
        "dataPrice": "$50.00"
      },
      {
        "title": "Skeleton Soldier",
        "desc": "Webtoon · Fantasía y acción",
        "price": "$50.00",
        "img": "https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=300&h=400&fit=crop&auto=format&q=80",
        "alt": "Skeleton Soldier",
        "product": "Skeleton Soldier (Webtoon)",
        "dataPrice": "$50.00"
      },
      {
        "title": "Solo Leveling",
        "desc": "Chugong · Webtoon · Acción y fantasía",
        "price": "$50.00",
        "img": "img/Solo Leveling.webp",
        "alt": "Solo Leveling Vol. 1",
        "product": "Solo Leveling (Webtoon)",
        "dataPrice": "$50.00"
      },
      {
        "title": "Tengoku Daimakyo",
        "desc": "Masakazu Ishiguro · Seinen · Post-apocalíptico",
        "price": "$50.00",
        "img": "https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=300&h=400&fit=crop&auto=format&q=80",
        "alt": "Tengoku Daimakyo",
        "product": "Tengoku Daimakyo (Manga)",
        "dataPrice": "$50.00"
      },
      {
        "title": "Tensei Shitara Slime Datta Ken",
        "desc": "Fuse, Taiki Kawakami · Isekai y fantasía",
        "price": "$50.00",
        "img": "img/Tensei shitara slime data ken.webp",
        "alt": "Tensei Shitara Slime Datta Ken Vol. 1",
        "product": "Tensei Shitara Slime Datta Ken (Manga)",
        "dataPrice": "$50.00"
      },
      {
        "title": "Tales of Demons and Gods",
        "desc": "Mad Snail · Manhua · Fantasía y cultivo",
        "price": "$50.00",
        "img": "https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=300&h=400&fit=crop&auto=format&q=80",
        "alt": "Tales of Demons and Gods",
        "product": "Tales of Demons and Gods (Manhua)",
        "dataPrice": "$50.00"
      },
      {
        "title": "Tower of God",
        "desc": "SIU · Webtoon · Aventura y fantasía",
        "price": "$50.00",
        "img": "https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=300&h=400&fit=crop&auto=format&q=80",
        "alt": "Tower of God",
        "product": "Tower of God (Webtoon)",
        "dataPrice": "$50.00"
      },
      {
        "title": "Tokyo Ghoul",
        "desc": "Sui Ishida · Seinen · Horror urbano y acción",
        "price": "$50.00",
        "img": "img/Tokyo Ghoul.webp",
        "alt": "Tokyo Ghoul Vol. 1",
        "product": "Tokyo Ghoul (Manga)",
        "dataPrice": "$50.00"
      },
      {
        "title": "Urek Mazino TOG",
        "desc": "SIU · Webtoon · Spin-off de Tower of God",
        "price": "$50.00",
        "img": "https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=300&h=400&fit=crop&auto=format&q=80",
        "alt": "Urek Mazino TOG",
        "product": "Urek Mazino TOG (Webtoon)",
        "dataPrice": "$50.00"
      },
      {
        "title": "Wind Breaker",
        "desc": "Satoru Nii · Shōnen · Delincuentes escolares",
        "price": "$50.00",
        "img": "img/manga//4/44/Wind_Breaker_manga_volume_1_cover.webp",
        "alt": "Wind Breaker Vol. 1",
        "product": "Wind Breaker (Manga)",
        "dataPrice": "$50.00"
      },
      {
        "title": "Witch Craft Works",
        "desc": "Ryu Mizunagi · Seinen · Magia y acción",
        "price": "$50.00",
        "img": "https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=300&h=400&fit=crop&auto=format&q=80",
        "alt": "Witch Craft Works",
        "product": "Witch Craft Works (Manga)",
        "dataPrice": "$50.00"
      },
      {
        "title": "Youjo Senki",
        "desc": "Carlo Zen, Shinobu Shinotsuki · Isekai militar",
        "price": "$50.00",
        "img": "img/Youjo Senki.webp",
        "alt": "Youjo Senki Vol. 1",
        "product": "Youjo Senki (Manga)",
        "dataPrice": "$50.00"
      },
      {
        "title": "Zombie 100",
        "desc": "Haro Aso, Kotaro Takata · Seinen · Zombies y comedia",
        "price": "$50.00",
        "img": "img/Zom 100 Bucket List of the Dead.webp",
        "alt": "Zombie 100",
        "product": "Zombie 100 (Manga)",
        "dataPrice": "$50.00"
      }
    ]
  };
  // Normaliza imágenes a locales (si existen) en los arrays fijos
  try {
    preferLocalImagesForArray(window.catalog.series);
    preferLocalImagesForArray(window.catalog.movies);
    preferLocalImagesForArray(window.catalog.mangas);
  } catch (e) { console.warn('No se pudo preferir imágenes locales:', e); }

  document.addEventListener('DOMContentLoaded', function() {
    // Fuente de verdad única: window.catalog
    const catalog = window.catalog || { series: [], movies: [], mangas: [] };

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
  });
})();
