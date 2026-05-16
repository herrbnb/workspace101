// ==========================================
// CHRISTIAN NWODO – PORTFOLIO SCRIPT
// Uses console.log for events & data output.
// ==========================================

(function () {
    'use strict';

    // ---------- DATA ----------
    const timelineData = [
        { date: '2019', title: 'Enrolled at UNN Nsukka', desc: 'Began undergraduate studies in Computer Science.', detail: 'Courses in algorithms, data structures, and software engineering.' },
        { date: '2021', title: 'Discovered Web Development', desc: 'Fell in love with HTML & CSS.', detail: 'Started with basic landing pages and layouts.' },
        { date: '2022', title: 'Joined Digital Dreams Ltd', desc: 'First tech role at Digital Dreams Ltd in Enugu.', detail: 'Worked on client projects and learned Git.' },
        { date: '2023', title: 'Mastered JavaScript Fundamentals', desc: 'Deep-dived into vanilla JS.', detail: 'Built interactive apps without frameworks.' },
        { date: '2024', title: 'Fullstack Expansion', desc: 'Began exploring Node.js, Express, databases.', detail: 'Built REST APIs and connected frontend to backend.' },
        { date: '2025', title: 'Graduate Studies & Portfolio', desc: 'Continued at UNN while building projects.', detail: 'Focused on polished, production-ready work.' },
        { date: '2026', title: 'Emerging Fullstack Developer', desc: 'Seeking impactful opportunities.', detail: 'Ready for challenging fullstack roles.' }
    ];

    const projectsData = [
        { id: 'proj1', title: 'Responsive Landing Page', desc: 'A sleek, mobile-first landing page.', tags: ['HTML','CSS','JS'], thumbIcon: '🚀', thumbBg: 'linear-gradient(135deg, #dbeafe, #eff6ff)', previewType: 'landing' },
        { id: 'proj2', title: 'Task Dashboard UI', desc: 'Task manager with cards and progress.', tags: ['HTML','CSS','JS'], thumbIcon: '📊', thumbBg: 'linear-gradient(135deg, #e0e7ff, #f0f4ff)', previewType: 'dashboard' },
        { id: 'proj3', title: 'Product Gallery', desc: 'E-commerce style gallery with filters.', tags: ['HTML','CSS','JS'], thumbIcon: '🛍️', thumbBg: 'linear-gradient(135deg, #f0f9ff, #e0f2fe)', previewType: 'gallery' },
        { id: 'proj4', title: 'Personal Blog Template', desc: 'Clean blog with newsletter signup.', tags: ['HTML','CSS','JS'], thumbIcon: '📝', thumbBg: 'linear-gradient(135deg, #f8fafc, #f1f5f9)', previewType: 'blog' }
    ];

    console.log('📅 Timeline data loaded:', timelineData);
    console.log('🛠️ Projects data loaded:', projectsData);

    // ---------- DOM SELECTORS ----------
    const timelineContainer = document.querySelector('#timeline-container');
    const projectsGrid = document.querySelector('#projects-grid');
    const modalOverlay = document.querySelector('#modal-overlay');
    const modalTitle = document.querySelector('#modal-title');
    const modalPreviewContent = document.querySelector('#modal-preview-content');
    const modalClose = document.querySelector('#modal-close');
    const newsletterForm = document.querySelector('#newsletter-form');
    const formMessage = document.querySelector('#form-message');

    console.log('🧩 DOM elements:', {
        timelineContainer,
        projectsGrid,
        modalOverlay,
        modalTitle,
        modalPreviewContent,
        modalClose,
        newsletterForm,
        formMessage
    });

    // ---------- RENDER TIMELINE ----------
    function renderTimeline() {
        if (!timelineContainer) {
            console.error('❌ Timeline container missing');
            return;
        }
        console.log('⏳ Rendering timeline...');

        timelineData.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = 'timeline-item';
            div.setAttribute('data-tl-index', index);
            div.innerHTML = `
                <div class="timeline-dot"></div>
                <div class="timeline-date">${item.date}</div>
                <div class="timeline-title">${item.title}</div>
                <div class="timeline-desc">${item.desc}</div>
                <div class="timeline-detail">${item.detail}</div>
            `;

            div.addEventListener('click', function () {
                document.querySelectorAll('.timeline-item').forEach(el => el.classList.remove('active-tl'));
                this.classList.add('active-tl');
                console.log(`📌 Timeline clicked: [${item.date}] ${item.title}`);
                console.log(`   Detail: ${item.detail}`);
                this.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            });

            timelineContainer.appendChild(div);
        });

        const allItems = document.querySelectorAll('.timeline-item');
        if (allItems.length > 0) {
            allItems[allItems.length - 1].classList.add('active-tl');
            console.log('✅ Default active: ', allItems[allItems.length - 1].querySelector('.timeline-title').textContent);
        }
    }

    // ---------- RENDER PROJECTS ----------
    function renderProjects() {
        if (!projectsGrid) {
            console.error('❌ Projects grid missing');
            return;
        }
        console.log('🛠️ Rendering project cards...');

        projectsData.forEach(proj => {
            const card = document.createElement('div');
            card.className = 'project-card';
            card.innerHTML = `
                <div class="project-thumb" style="background:${proj.thumbBg};">
                    <span class="thumb-icon">${proj.thumbIcon}</span>
                </div>
                <div class="project-body">
                    <h3>${proj.title}</h3>
                    <p>${proj.desc}</p>
                    <div class="project-tags">${proj.tags.map(t => `<span>${t}</span>`).join('')}</div>
                    <div class="project-actions">
                        <button class="btn btn-primary btn-sm live-preview-btn" data-proj-id="${proj.id}">👁️ Live Preview</button>
                    </div>
                </div>
            `;
            projectsGrid.appendChild(card);
            console.log(`➕ Added project: ${proj.title}`);
        });

        document.querySelectorAll('.live-preview-btn').forEach(btn => {
            btn.addEventListener('click', function (e) {
                e.stopPropagation();
                const projId = this.getAttribute('data-proj-id');
                const project = projectsData.find(p => p.id === projId);
                if (project) {
                    console.log(`👁️ Live Preview: ${project.title} (${projId})`);
                    openModal('🔍 Live Preview: ' + project.title, getPreviewHTML(projId));
                } else {
                    console.warn('⚠️ Project not found:', projId);
                }
            });
        });
    }

    // ---------- MODAL ----------
    function openModal(title, contentHTML) {
        if (!modalOverlay || !modalTitle || !modalPreviewContent) {
            console.error('❌ Modal elements missing');
            return;
        }
        console.log(`🪟 Opening modal: ${title}`);
        modalTitle.textContent = title;
        modalPreviewContent.innerHTML = contentHTML;
        modalOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        if (!modalOverlay) return;
        console.log('🚪 Closing modal');
        modalOverlay.classList.remove('open');
        document.body.style.overflow = '';
    }

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeModal();
        });
    }
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('open')) {
            closeModal();
        }
    });

    // ---------- PREVIEW HTML GENERATORS ----------
    function getPreviewHTML(projId) {
        const previews = {
            proj1: `
                <div class="sim-preview">
                    <div class="sim-header"><span class="sim-dot red"></span><span class="sim-dot yellow"></span><span class="sim-dot green"></span></div>
                    <div class="sim-body">
                        <h4>🚀 SaaSify Landing</h4>
                        <p style="color:#475569;">Build faster, scale smarter.</p>
                        <div style="display:flex;gap:8px;margin:12px 0;">
                            <span class="sim-btn green">Get Started</span>
                            <span class="sim-btn blue">Watch Demo</span>
                        </div>
                        <div class="sim-grid">
                            <div class="sim-grid-item">⚡ Fast</div>
                            <div class="sim-grid-item">🔒 Secure</div>
                            <div class="sim-grid-item">💰 Affordable</div>
                        </div>
                    </div>
                </div>`,
            proj2: `
                <div class="sim-preview">
                    <div class="sim-header"><span class="sim-dot red"></span><span class="sim-dot yellow"></span><span class="sim-dot green"></span></div>
                    <div class="sim-body dark-bg">
                        <h4>📊 Dashboard</h4>
                        <div class="sim-grid">
                            <div class="sim-card"><small>Total</small><br><strong>48</strong></div>
                            <div class="sim-card"><small>Done</small><br><strong>31</strong></div>
                            <div class="sim-card"><small>Pending</small><br><strong>17</strong></div>
                        </div>
                        <p>Progress</p>
                        <div class="sim-progress"><div class="sim-progress-fill" style="width:65%;"></div></div>
                    </div>
                </div>`,
            proj3: `
                <div class="sim-preview">
                    <div class="sim-header"><span class="sim-dot red"></span><span class="sim-dot yellow"></span><span class="sim-dot green"></span></div>
                    <div class="sim-body">
                        <div style="display:flex;gap:6px;margin-bottom:10px;">
                            <span class="sim-btn green">All</span><span class="sim-btn blue">Shoes</span><span class="sim-btn blue">Bags</span>
                        </div>
                        <div class="sim-grid">
                            <div class="sim-grid-item">👟 Sneaker</div>
                            <div class="sim-grid-item">⌚ Watch</div>
                            <div class="sim-grid-item">👜 Bag</div>
                        </div>
                        <p style="margin-top:8px;">🛒 Cart: <strong>2 items</strong></p>
                    </div>
                </div>`,
            proj4: `
                <div class="sim-preview">
                    <div class="sim-header"><span class="sim-dot red"></span><span class="sim-dot yellow"></span><span class="sim-dot green"></span></div>
                    <div class="sim-body">
                        <h4>📝 My Blog</h4>
                        <div class="sim-card"><span class="sim-tag green-tag">Tech</span> <strong>Vanilla JS in 2026</strong></div>
                        <div class="sim-card"><span class="sim-tag blue-tag">Design</span> <strong>Neubrutalism trends</strong></div>
                        <div style="margin-top:10px;padding:10px;background:#f0f9ff;border-radius:6px;">
                            <strong>📬 Subscribe</strong>
                            <input type="text" placeholder="email" style="width:100%;margin-top:6px;padding:6px;border:1px solid #e2e8f0;border-radius:4px;" value="christian@example.com" readonly>
                        </div>
                    </div>
                </div>`
        };
        return previews[projId] || '<p>Preview not available.</p>';
    }

    // ---------- NEWSLETTER FORM HANDLING ----------
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const nameInput = document.querySelector('#sub-name');
            const emailInput = document.querySelector('#sub-email');

            const name = nameInput ? nameInput.value.trim() : '';
            const email = emailInput ? emailInput.value.trim() : '';

            console.log('📬 Newsletter subscription:');
            console.log('   Name:', name);
            console.log('   Email:', email);

            if (name && email) {
                // Simulate successful subscription
                if (formMessage) {
                    formMessage.textContent = `✅ Thanks, ${name}! You've been subscribed. We'll keep you updated on new projects.`;
                    formMessage.style.color = '#2563eb';
                }
                // Clear inputs
                if (nameInput) nameInput.value = '';
                if (emailInput) emailInput.value = '';

                // Log action
                console.log('✅ Subscription successful (simulated).');
            } else {
                if (formMessage) {
                    formMessage.textContent = '⚠️ Please fill in both name and email.';
                    formMessage.style.color = '#dc2626';
                }
                console.warn('⚠️ Incomplete form data.');
            }
        });
    } else {
        console.warn('⚠️ Newsletter form not found in the DOM.');
    }

    // ---------- ACTIVE NAV LINK ON SCROLL ----------
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(sec => {
            const top = sec.offsetTop - 120;
            if (window.scrollY >= top) current = sec.getAttribute('id') || '';
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
        });
    });

    // ---------- INIT ----------
    renderTimeline();
    renderProjects();
    console.log('✅ Christian Nwodo portfolio ready – White & Blue theme, Contact section active.');
})();