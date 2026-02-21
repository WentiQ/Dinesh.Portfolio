/**
 * Resume PDF Generator - Real-time Data from data.json
 */

// Load html2pdf library
async function loadHTML2PDF() {
    if (typeof html2pdf !== 'undefined') return Promise.resolve();
    
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load html2pdf'));
        document.head.appendChild(script);
    });
}

// Create resume HTML from data
function buildResumeHTML(data) {
    const m = data.siteMetadata;
    const about = data.about;
    const skills = data.skills;
    const academics = data.academics;
    const certifications = data.certifications;
    const projects = data.projects;
    const interests = data.interests;

    // Get top 6 projects
    const topProjects = [];
    projects.items.forEach(cat => {
        cat.projects.slice(0, 2).forEach(p => {
            if (topProjects.length < 6) topProjects.push(p);
        });
    });

    return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html, body { width: 100%; background: #f8f9fa; }
        body { font-family: 'Poppins', sans-serif; color: #2c3e50; line-height: 1.6; font-size: 9.5pt; }
        .resume { width: 100%; background: white; padding: 45px; max-width: 950px; margin: 0 auto; box-shadow: 0 0 30px rgba(0,0,0,0.05); }
        
        /* HEADER SECTION */
        .header { 
            background: linear-gradient(135deg, #0f2441 0%, #1a3a52 50%, #2a5298 100%); 
            color: white; 
            padding: 30px 35px; 
            margin: -45px -45px 35px -45px;
            border-bottom: 5px solid #ffc107;
            box-shadow: 0 8px 32px rgba(42, 82, 152, 0.3);
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 35px;
        }
        .header-content { flex: 1; }
        .header-photo {
            width: 155px;
            height: 155px;
            border-radius: 12px;
            border: 4px solid #ffc107;
            object-fit: cover;
            flex-shrink: 0;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        .name { 
            font-family: 'Space Mono', monospace;
            font-size: 28pt; 
            font-weight: 700; 
            margin: 0 0 6px 0;
            letter-spacing: -1px;
            text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .title { 
            font-size: 12pt; 
            letter-spacing: 2px; 
            opacity: 0.92; 
            margin: 8px 0 15px 0;
            text-transform: uppercase;
            font-weight: 600;
            color: #ffc107;
        }
        .contact { 
            font-size: 8.5pt; 
            margin-top: 12px; 
            padding-top: 14px; 
            border-top: 1px solid rgba(255,255,255,0.3);
            display: flex;
            flex-wrap: wrap;
            gap: 14px;
            line-height: 1.4;
        }
        .contact-item { display: inline-block; font-weight: 500; }
        
        /* SUMMARY CARD */
        .summary {
            background: linear-gradient(135deg, #f8f9fa 0%, #f0f4f8 100%);
            padding: 16px 18px;
            border-left: 5px solid #ffc107;
            border-radius: 6px;
            font-size: 9.2pt;
            line-height: 1.6;
            margin-bottom: 22px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.03);
        }
        .summary strong { color: #1a3a52; font-weight: 700; }
        
        /* SECTION HEADERS */
        .section { margin-bottom: 20px; page-break-inside: avoid; }
        .section-title {
            font-family: 'Space Mono', monospace;
            font-size: 11pt;
            font-weight: 700;
            color: white;
            background: linear-gradient(135deg, #1a3a52 0%, #2a5298 100%);
            padding: 8px 14px;
            margin-bottom: 12px;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            border-radius: 4px;
            box-shadow: 0 2px 8px rgba(26, 58, 82, 0.15);
        }
        
        /* ITEMS */
        .item { margin-bottom: 11px; page-break-inside: avoid; }
        .item-title { 
            font-family: 'Poppins', sans-serif;
            font-weight: 700;
            font-size: 10.2pt;
            color: #0f2441;
        }
        .item-meta { 
            font-size: 8.2pt;
            color: #7f8c8d;
            font-style: italic;
            font-weight: 500;
        }
        .item-subtitle { 
            color: #2a5298; 
            font-weight: 600;
            font-size: 9.2pt;
            margin: 2px 0 1px 0;
        }
        .item-desc { 
            font-size: 8.8pt;
            color: #34495e;
            line-height: 1.5;
            margin: 3px 0;
        }
        
        /* TAGS */
        .tags { font-size: 7.8pt; margin-top: 4px; }
        .tag { 
            background: linear-gradient(135deg, #ffc107 0%, #ff9800 100%);
            color: white;
            padding: 3px 8px;
            border-radius: 4px;
            margin-right: 5px;
            display: inline-block;
            font-weight: 600;
            box-shadow: 0 2px 6px rgba(255, 152, 0, 0.2);
        }
        
        /* SKILLS */
        .skill-category { margin-bottom: 12px; }
        .skill-name {
            font-family: 'Poppins', sans-serif;
            font-size: 9.5pt;
            margin-bottom: 5px;
            font-weight: 700;
            color: #1a3a52;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .skill-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 5px;
            font-size: 8.2pt;
        }
        .skill-label { font-weight: 600; color: #2c3e50; min-width: 70px; }
        .skill-bar {
            flex: 1;
            height: 5px;
            background: #ecf0f1;
            border-radius: 3px;
            margin: 0 10px;
            overflow: hidden;
        }
        .skill-bar-fill {
            height: 100%;
            background: linear-gradient(90deg, #ffc107, #ff6b35);
            border-radius: 3px;
            box-shadow: 0 2px 4px rgba(255, 107, 53, 0.3);
        }
        .skill-level { font-size: 7.5pt; color: #2a5298; min-width: 45px; text-align: right; font-weight: 700; }
        
        /* EDUCATION */
        .edu-item { margin-bottom: 10px; padding-bottom: 8px; border-bottom: 1px solid #ecf0f1; }
        .edu-item:last-child { border-bottom: none; }
        .edu-degree {
            font-family: 'Poppins', sans-serif;
            font-weight: 700;
            font-size: 10pt;
            color: #0f2441;
        }
        .edu-branch { font-size: 8.5pt; color: #555; margin: 2px 0; font-style: italic; }
        .edu-school {
            color: #2a5298;
            font-weight: 700;
            font-size: 9pt;
            margin-top: 2px;
        }
        .edu-meta {
            color: #7f8c8d;
            font-size: 8.2pt;
            margin-top: 2px;
            font-weight: 500;
        }
        
        /* GRID LAYOUTS */
        .two-col { 
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 25px;
            margin-bottom: 20px;
        }
        .full-width { grid-column: 1 / -1; }
        .project-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        
        /* PROJECT CARD */
        .project-card {
            border: 1.5px solid #e0e7ff;
            padding: 12px;
            border-radius: 6px;
            background: linear-gradient(135deg, #f8f9fa 0%, #f0f4f8 100%);
            page-break-inside: avoid;
            transition: all 0.3s ease;
            box-shadow: 0 2px 6px rgba(42, 82, 152, 0.08);
        }
        
        /* DIVIDER */
        .divider {
            height: 2px;
            background: linear-gradient(90deg, transparent, #bdc3c7 20%, #bdc3c7 80%, transparent);
            margin: 22px 0;
        }
        
        /* FOOTER */
        .footer { 
            text-align: center;
            padding-top: 14px;
            margin-top: 18px;
            border-top: 1.5px solid #ecf0f1;
            font-size: 7.5pt;
            color: #95a5a6;
            font-weight: 500;
        }
        
        /* SPECIAL HIGHLIGHTS */
        .highlight { color: #ffc107; font-weight: 700; }
        .blue-accent { color: #2a5298; font-weight: 600; }
    </style>
</head>
<body>
    <div class="resume">
        <!-- HEADER -->
        <div class="header">
            <div class="header-content">
                <div class="name">${m.name}</div>
                <div class="title">${m.title}</div>
                <div class="contact">
                    <span class="contact-item">✉ ${m.email}</span>
                    <span class="contact-item">💼 linkedin.com/in/dinesh-polavarapu</span>
                    <span class="contact-item">⚙ github.com/WentiQ</span>
                </div>
            </div>
            <img src="images/DINESH2.png" alt="${m.name}" class="header-photo" />
        </div>

        <!-- PROFESSIONAL SUMMARY -->
        <div class="summary">
            <strong>PROFESSIONAL PROFILE</strong><br/>
            ${about.cards[0].content.replace(/<[^>]*>/g, '')}
        </div>

        <div class="divider"></div>

        <!-- EDUCATION & TECHNICAL SKILLS -->
        <div class="two-col">
            <!-- EDUCATION SECTION -->
            <div>
                <div class="section">
                    <div class="section-title">🎓 Education</div>
                    ${academics.items.map(edu => `
                        <div class="edu-item">
                            <div class="edu-degree">${edu.degree}</div>
                            ${edu.branch ? `<div class="edu-branch">${edu.branch}</div>` : ''}
                            <div class="edu-school">${edu.institution}</div>
                            <div class="edu-meta">${edu.duration}</div>
                            ${edu.score ? `<div style="color: #ffc107; font-weight: 700; font-size: 8.5pt; margin-top: 2px;">⭐ GPA: ${edu.score}</div>` : ''}
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- TECHNICAL SKILLS SECTION -->
            <div>
                <div class="section">
                    <div class="section-title">🛠️ Technical Skills</div>
                    ${skills.items.map(cat => `
                        <div class="skill-category">
                            <div class="skill-name">${cat.heading}</div>
                            ${cat.skills.slice(0, 4).map(skill => {
                                let width = 60;
                                let levelText = 'Intermediate';
                                if (skill.level === 'expert') { width = 95; levelText = 'Expert'; }
                                else if (skill.level === 'advanced') { width = 80; levelText = 'Advanced'; }
                                return `
                                    <div class="skill-item">
                                        <span class="skill-label">${skill.name}</span>
                                        <div class="skill-bar">
                                            <div class="skill-bar-fill" style="width: ${width}%"></div>
                                        </div>
                                        <span class="skill-level">${width}%</span>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>

        <div class="divider"></div>

        <!-- FEATURED PROJECTS -->
        <div class="section full-width">
            <div class="section-title">🚀 Featured Projects</div>
            <div class="project-grid">
                ${topProjects.map(proj => `
                    <div class="project-card">
                        <div class="item-title">💡 ${proj.title}</div>
                        <div class="item-desc" style="margin-top: 4px; margin-bottom: 5px;">${proj.description}</div>
                        <div class="tags">${proj.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
                    </div>
                `).join('')}
            </div>
        </div>

        <div class="divider"></div>

        <!-- CERTIFICATIONS & CAREER VISION -->
        <div class="two-col">
            <!-- CERTIFICATIONS -->
            <div>
                <div class="section">
                    <div class="section-title">🏆 Certifications</div>
                    ${certifications.items.map(cert => `
                        <div class="item">
                            <div class="item-title">📜 ${cert.title}</div>
                            <div class="item-subtitle">${cert.issuer}</div>
                            <div class="item-desc">${cert.description}</div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- CAREER VISION & INTERESTS -->
            <div>
                <div class="section">
                    <div class="section-title">🎯 Career Vision</div>
                    <div class="item-desc">${about.cards[2].content.replace(/<[^>]*>/g, '')}</div>
                    <div style="margin-top: 12px; padding: 10px; background: linear-gradient(135deg, #f8f9fa 0%, #f0f4f8 100%); border-radius: 6px; border-left: 3px solid #ffc107;">
                        <strong style="color: #1a3a52; font-size: 8.5pt; text-transform: uppercase; letter-spacing: 0.5px;">Key Interests</strong><br/>
                        <span style="font-size: 8.5pt; color: #34495e; line-height: 1.6;">
                            ${interests.items.slice(0, 3).map(i => `🌟 ${i.title}`).join('<br/>')}
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <!-- FOOTER -->
        <div class="footer">
            ${m.name} | ${m.email} | Generated ${new Date().toLocaleDateString()} | Professional Resume
        </div>
    </div>
</body>
</html>`;
}

// Main PDF generation function
async function generateResumePDF(data) {
    try {
        await loadHTML2PDF();
        
        // Build resume HTML
        const resumeHTML = buildResumeHTML(data);
        
        // Create invisible container
        const container = document.createElement('div');
        container.innerHTML = resumeHTML;
        container.style.position = 'fixed';
        container.style.top = '-9999px';
        container.style.left = '-9999px';
        container.style.width = '8.5in';
        container.style.height = 'auto';
        container.style.zIndex = '-9999';
        document.body.appendChild(container);
        
        // Wait for content to render
        await new Promise(r => setTimeout(r, 500));
        
        // Get the resume div and generate PDF
        const element = container.querySelector('.resume');
        
        const opt = {
            margin: 10,
            filename: `${data.siteMetadata.name.replace(/\s+/g, '_')}_Resume.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { 
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff',
                windowHeight: 1400
            },
            jsPDF: { 
                format: 'a4', 
                orientation: 'portrait',
                unit: 'mm',
                compress: true
            }
        };
        
        // Generate and download
        await html2pdf().set(opt).from(element).save();
        
        // Cleanup
        setTimeout(() => document.body.removeChild(container), 1000);
        
        console.log('✅ Resume PDF generated and downloaded');
        return true;
    } catch (error) {
        console.error('❌ PDF Error:', error);
        alert('Error generating resume. Please try again.');
        return false;
    }
}

// Download handler - fetches latest data and generates PDF
async function downloadResumePDF() {
    const btn = document.getElementById('resume-download-btn');
    if (btn) {
        btn.disabled = true;
        btn.style.opacity = '0.6';
    }
    
    try {
        const response = await fetch('data.json');
        if (!response.ok) throw new Error('Failed to load data.json');
        
        const data = await response.json();
        await generateResumePDF(data);
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to download resume. Please try again.');
    } finally {
        if (btn) {
            btn.disabled = false;
            btn.style.opacity = '1';
        }
    }
}

// Expose to global scope
window.downloadResumePDF = downloadResumePDF;
