// ===== DATA RENDERER - LOAD ALL CONTENT FROM JSON =====

let websiteData = null;

// Load JSON data using XMLHttpRequest (works with file:// protocol)
function loadWebsiteData() {
    console.log('🔄 Starting to load data.json...');
    
    const xhr = new XMLHttpRequest();
    xhr.open('GET', './data.json', true);
    xhr.responseType = 'json';
    
    xhr.onload = function() {
        if (xhr.status === 200) {
            websiteData = xhr.response;
            console.log('✅ Successfully loaded data.json');
            console.log('Data:', websiteData);
            renderWebsite();
        } else {
            console.error('❌ Error loading data.json. Status:', xhr.status);
        }
    };
    
    xhr.onerror = function() {
        console.error('❌ Failed to load data.json (network error or CORS issue)');
        console.log('Make sure data.json exists in the same folder as index.html');
    };
    
    xhr.send();
}

// ===== HELPER: Ensure section is clean before rendering =====
function cleanSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.innerHTML = '';
    }
    return section;
}

// ===== LOADING SCREEN RENDERER =====
function renderLoadingScreen() {
    const loadingText = document.querySelector('.loading-text');
    if (!loadingText) return;
    
    const { heading, subtitle } = websiteData.loadingScreen;
    
    loadingText.innerHTML = `
        <h2>${heading}</h2>
        <p>${subtitle}</p>
    `;
}

// ===== LOGO RENDERER =====
function renderLogo() {
    const logo = document.getElementById('site-logo');
    if (!logo) return;
    
    const { logo: logoText } = websiteData.siteMetadata;
    logo.innerHTML = `${logoText}<span>.</span>`;
}

// ===== NAVIGATION RENDERER =====
function renderNavigation() {
    const navLinks = document.getElementById('nav-links');
    if (!navLinks) return;
    
    navLinks.innerHTML = '';
    
    websiteData.navigation.forEach(link => {
        const a = document.createElement('a');
        a.href = link.href;
        a.textContent = link.label;
        if (link.href === '#contact') a.className = 'cta';
        navLinks.appendChild(a);
    });
}

// ===== HERO SECTION RENDERER =====
function renderHeroSection() {
    const section = document.getElementById('hero');
    if (!section) return;
    
    const heroContent = section.querySelector('.hero-content');
    const heroImageContainer = section.querySelector('.hero-image-container .hero-image-wrapper');
    const mobileProfile = document.querySelector('.mobile-profile .hero-image-wrapper');

    const { badge, title, subtitle, image, buttons } = websiteData.hero;
    
    const badgeEl = document.createElement('h2');
    badgeEl.className = 'badge';
    badgeEl.textContent = badge;

    const titleEl = document.createElement('h1');
    titleEl.innerHTML = title;

    const subtitleEl = document.createElement('p');
    subtitleEl.className = 'hero-subtitle';
    subtitleEl.textContent = subtitle;

    const buttonsDiv = document.createElement('div');
    buttonsDiv.className = 'hero-btns';
    buttons.forEach(btn => {
        const btnEl = btn.action === 'download' 
            ? document.createElement('button')
            : document.createElement('a');
        
        if (btn.action === 'download') {
            btnEl.onclick = downloadResumePDF;
            btnEl.innerHTML = `<svg class="download-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg> ${btn.text}`;
        } else {
            btnEl.href = btn.href;
            btnEl.textContent = btn.text;
        }
        
        btnEl.id = btn.action === 'download' ? 'resume-download-btn' : '';
        btnEl.className = `btn ${btn.type}`;
        if (btn.action === 'download') {
            btnEl.className += ' resume-download-btn';
        }
        
        buttonsDiv.appendChild(btnEl);
    });

    heroContent.innerHTML = '';
    heroContent.appendChild(badgeEl);
    heroContent.appendChild(titleEl);
    heroContent.appendChild(subtitleEl);
    heroContent.appendChild(buttonsDiv);

    const imgEl = document.createElement('img');
    imgEl.src = image;
    imgEl.alt = `${websiteData.siteMetadata.name} - Mechanical Engineer`;
    imgEl.className = 'hero-image';

    heroImageContainer.innerHTML = '';
    heroImageContainer.appendChild(imgEl.cloneNode());

    mobileProfile.innerHTML = '';
    mobileProfile.appendChild(imgEl.cloneNode());
}

// ===== ABOUT SECTION RENDERER =====
function renderAboutSection() {
    const section = document.getElementById('about');
    if (!section) return;
    
    const aboutContent = section.querySelector('.about-content');
    const { title, cards } = websiteData.about;

    const titleEl = document.createElement('h2');
    titleEl.className = 'section-title fade-in';
    titleEl.innerHTML = title;

    const gridDiv = document.createElement('div');
    gridDiv.className = 'about-grid';

    cards.forEach((card, index) => {
        const cardEl = document.createElement('div');
        cardEl.className = `about-card fade-in-${index % 2 === 0 ? 'left' : 'right'}`;
        cardEl.innerHTML = `<h3>${card.icon} ${card.heading}</h3><p>${card.content}</p>`;
        gridDiv.appendChild(cardEl);
    });

    aboutContent.innerHTML = '';
    aboutContent.appendChild(titleEl);
    aboutContent.appendChild(gridDiv);
}

// ===== PROJECTS SECTION RENDERER =====
function renderProjectsSection() {
    const section = document.getElementById('projects');
    if (!section) return;
    
    const titleEl = document.createElement('h2');
    titleEl.className = 'section-title fade-in';
    titleEl.innerHTML = websiteData.projects.title;

    section.innerHTML = '';
    section.appendChild(titleEl);

    websiteData.projects.items.forEach(categoryGroup => {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'projects-category';

        const categoryTitle = document.createElement('h3');
        categoryTitle.className = 'category-title fade-in-left';
        categoryTitle.textContent = categoryGroup.category;

        const cardsDiv = document.createElement('div');
        cardsDiv.className = 'stacked-cards';

        categoryGroup.projects.forEach((project) => {
            const cardEl = document.createElement('div');
            cardEl.className = 'project-card stacked scale-in';
            cardEl.setAttribute('data-card', project.id);

            let tagsHtml = project.tags.map(tag => tag).join(' • ');
            let keywordsHtml = project.keywords ? `<p><strong>Keywords:</strong> ${project.keywords}</p>` : '';

            cardEl.innerHTML = `
                <span class="card-number">${String(project.id).padStart(2, '0')}</span>
                <div class="card-glow"></div>
                <span class="project-badge">${project.badge}</span>
                <h3>${project.title}</h3>
                ${keywordsHtml}
                <p>${project.description}</p>
                <span class="tags">${tagsHtml}</span>
            `;

            cardsDiv.appendChild(cardEl);
        });

        categoryDiv.appendChild(categoryTitle);
        categoryDiv.appendChild(cardsDiv);
        section.appendChild(categoryDiv);
    });
}

// ===== SKILLS SECTION RENDERER =====
function renderSkillsSection() {
    const section = document.getElementById('skills');
    if (!section) return;
    
    let skillsWrapper = section.querySelector('.skills-wrapper');
    if (!skillsWrapper) {
        skillsWrapper = document.createElement('div');
        skillsWrapper.className = 'skills-wrapper';
        section.appendChild(skillsWrapper);
    }

    // Create/Update title
    let titleEl = section.querySelector('.section-title');
    if (!titleEl) {
        titleEl = document.createElement('h2');
        titleEl.className = 'section-title fade-in';
        section.insertBefore(titleEl, section.firstChild);
    }
    titleEl.innerHTML = websiteData.skills.title;

    skillsWrapper.innerHTML = '';

    websiteData.skills.items.forEach((group, index) => {
        const groupEl = document.createElement('div');
        const delayClass = `stagger-delay-${(index % 3) + 1}`;
        groupEl.className = `skill-group fade-in-${index % 2 === 0 ? 'left' : 'right'} ${delayClass}`;

        const headerDiv = document.createElement('div');
        headerDiv.className = 'skill-header';
        headerDiv.innerHTML = `
            <span class="skill-icon">${group.icon}</span>
            <h4>${group.heading}</h4>
        `;

        const pillsDiv = document.createElement('div');
        pillsDiv.className = 'skill-pills';

        group.skills.forEach(skill => {
            const pill = document.createElement('span');
            pill.className = 'skill-pill';
            pill.setAttribute('data-level', skill.level);
            pill.textContent = skill.name;
            pillsDiv.appendChild(pill);
        });

        groupEl.appendChild(headerDiv);
        groupEl.appendChild(pillsDiv);
        skillsWrapper.appendChild(groupEl);
    });
}

// ===== ACADEMICS SECTION RENDERER =====
function renderAcademicsSection() {
    const section = document.getElementById('academics');
    if (!section) return;
    
    let titleEl = section.querySelector('.section-title');
    if (!titleEl) {
        titleEl = document.createElement('h2');
        titleEl.className = 'section-title fade-in';
        section.insertBefore(titleEl, section.firstChild);
    }
    titleEl.innerHTML = websiteData.academics.title;
    
    let grid = section.querySelector('.academics-grid');
    if (!grid) {
        grid = document.createElement('div');
        grid.className = 'academics-grid';
        section.appendChild(grid);
    }

    grid.innerHTML = '';

    websiteData.academics.items.forEach((academic, index) => {
        const cardEl = document.createElement('div');
        cardEl.className = `academics-card fade-in-${index % 2 === 0 ? 'left' : 'right'}`;

        let scoreHtml = academic.score ? `<p><strong>Score: ${academic.score}</strong></p>` : '';
        let locationHtml = academic.location ? `<p class="detail">📍 ${academic.location}</p>` : '';
        let descriptionHtml = academic.description ? `<p>${academic.description}</p>` : '';

        cardEl.innerHTML = `
            <h3>${academic.icon} ${academic.degree}</h3>
            <p class="institution">${academic.branch}</p>
            <p class="detail"><strong>${academic.institution}</strong></p>
            ${locationHtml}
            <p class="detail">📅 ${academic.duration}</p>
            ${scoreHtml}
            ${descriptionHtml}
        `;

        grid.appendChild(cardEl);
    });
}

// ===== CERTIFICATIONS SECTION RENDERER =====
function renderCertificationsSection() {
    const section = document.getElementById('certifications');
    if (!section) return;
    
    const titleEl = document.createElement('h2');
    titleEl.className = 'section-title fade-in';
    titleEl.innerHTML = websiteData.certifications.title;

    const grid = document.createElement('div');
    grid.className = 'certifications-grid';

    websiteData.certifications.items.forEach((cert, index) => {
        const cardEl = document.createElement('div');
        cardEl.className = `cert-card fade-in-${index % 2 === 0 ? 'left' : 'right'} stagger-delay-${(index % 2) + 1}`;

        cardEl.innerHTML = `
            <div class="cert-icon">${cert.icon}</div>
            <h3>${cert.title}</h3>
            <p class="cert-issuer">${cert.issuer}</p>
            <p class="cert-detail">${cert.description}</p>
        `;

        grid.appendChild(cardEl);
    });

    section.innerHTML = '';
    section.appendChild(titleEl);
    section.appendChild(grid);
}

// ===== INTERESTS SECTION RENDERER =====
function renderInterestsSection() {
    const section = document.getElementById('interests');
    if (!section) return;
    
    const titleEl = document.createElement('h2');
    titleEl.className = 'section-title fade-in';
    titleEl.innerHTML = websiteData.interests.title;

    const grid = document.createElement('div');
    grid.className = 'certifications-grid';

    websiteData.interests.items.forEach((interest, index) => {
        const cardEl = document.createElement('div');
        cardEl.className = `cert-card fade-in-${index < 2 ? 'left' : 'right'} stagger-delay-${(index % 3) + 1}`;

        cardEl.innerHTML = `
            <span class="interest-icon">${interest.icon}</span>
            <h3>${interest.title}</h3>
            <p>${interest.description}</p>
        `;

        grid.appendChild(cardEl);
    });

    section.innerHTML = '';
    section.appendChild(titleEl);
    section.appendChild(grid);
}

// ===== CONTACT SECTION RENDERER =====
function renderContactSection() {
    const section = document.getElementById('contact');
    if (!section) return;
    
    const { title, lookingFor, form } = websiteData.contact;

    // Create title
    const titleEl = document.createElement('h2');
    titleEl.className = 'section-title fade-in';
    titleEl.innerHTML = title;

    // Create wrapper
    const wrapper = document.createElement('div');
    wrapper.className = 'contact-wrapper fade-in';

    // Create contact box
    const contactBox = document.createElement('div');
    contactBox.className = 'contact-box scale-in';
    contactBox.innerHTML = '<h2>I\'m Always Looking For</h2>';

    const lookingForDiv = document.createElement('div');
    lookingForDiv.className = 'looking-for';
    lookingFor.forEach(item => {
        const p = document.createElement('p');
        p.innerHTML = `${item.icon} ${item.text}`;
        lookingForDiv.appendChild(p);
    });
    contactBox.appendChild(lookingForDiv);

    // Create form container
    const formContainer = document.createElement('div');
    formContainer.className = 'contact-form-container';

    const emailCard = document.createElement('div');
    emailCard.className = 'email-form-card';

    const formHeading = document.createElement('h3');
    formHeading.textContent = form.heading;

    const formEl = document.createElement('form');
    formEl.id = 'contact-form';
    formEl.className = 'contact-form';

    form.fields.forEach(field => {
        const groupDiv = document.createElement('div');
        groupDiv.className = 'form-group';

        let inputEl;
        if (field.type === 'textarea') {
            inputEl = document.createElement('textarea');
            inputEl.rows = field.rows;
        } else {
            inputEl = document.createElement('input');
            inputEl.type = field.type;
        }

        inputEl.id = field.id;
        inputEl.name = field.id;
        inputEl.placeholder = field.placeholder;
        if (field.required) inputEl.required = true;

        groupDiv.appendChild(inputEl);
        formEl.appendChild(groupDiv);
    });

    // Add submit button
    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.className = 'btn primary';
    submitBtn.textContent = 'Send Message';
    formEl.appendChild(submitBtn);

    // Create divider
    const divider = document.createElement('div');
    divider.className = 'form-divider';

    // Create social icons section
    const socialSection = document.createElement('div');
    socialSection.className = 'social-icons-bottom';
    socialSection.innerHTML = `<p style="color: rgba(255,255,255,0.7); font-size: 0.9rem; margin-bottom: 1rem;">Or connect directly:</p>`;

    const socialContainer = document.createElement('div');
    socialContainer.className = 'social-icons';

    websiteData.socialLinks.forEach(link => {
        const a = document.createElement('a');
        a.href = link.url;
        a.target = '_blank';
        a.className = `social-icon ${link.class}`;
        a.title = link.name;

        let svg = '';
        if (link.icon === 'linkedin') {
            svg = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.469v6.766z"/></svg>';
        } else if (link.icon === 'github') {
            svg = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>';
        } else if (link.icon === 'email') {
            svg = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>';
        }

        a.innerHTML = svg;
        socialContainer.appendChild(a);
    });

    socialSection.appendChild(socialContainer);

    // Assemble everything
    emailCard.appendChild(formHeading);
    emailCard.appendChild(formEl);
    emailCard.appendChild(divider);
    emailCard.appendChild(socialSection);

    formContainer.appendChild(emailCard);

    wrapper.appendChild(contactBox);
    wrapper.appendChild(formContainer);

    section.innerHTML = '';
    section.appendChild(titleEl);
    section.appendChild(wrapper);
}

// ===== PAGE TITLE & METADATA RENDERER =====
function renderPageTitle() {
    const { title } = websiteData.siteMetadata;
    document.title = title;
    console.log('📄 Page title set to:', title);
}

// ===== FOOTER RENDERER =====
function renderFooter() {
    const footer = document.querySelector('footer');
    if (!footer) return;
    
    const { footerText } = websiteData.siteMetadata;
    
    const p = document.createElement('p');
    p.innerHTML = footerText;
    
    footer.innerHTML = '';
    footer.appendChild(p);
}

// ===== MAIN RENDER FUNCTION =====
function renderWebsite() {
    if (!websiteData) {
        console.error('❌ No website data available');
        return;
    }

    console.log('🎨 Rendering website from JSON data...');
    
    try {
        renderPageTitle();
        renderLoadingScreen();
        renderLogo();
        renderNavigation();
        renderHeroSection();
        renderAboutSection();
        renderProjectsSection();
        renderSkillsSection();
        renderAcademicsSection();
        renderCertificationsSection();
        renderInterestsSection();
        renderContactSection();
        renderFooter();

        console.log('✅ Rendering complete!');

        // Re-initialize scroll observers
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                } else {
                    entry.target.classList.remove('visible');
                }
            });
        }, observerOptions);

        const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in');
        animatedElements.forEach(el => observer.observe(el));
    } catch (error) {
        console.error('❌ Error rendering website:', error);
    }
}

// Load data when DOM is ready
document.addEventListener('DOMContentLoaded', loadWebsiteData);

