// // Common functionality
// document.addEventListener('DOMContentLoaded', () => {
//     // Load header and footer
//     const header = `
//         <header>
//             <nav>
//                 <a href="index.html">Home</a>
//                 <a href="overview.html">Overview</a>
//                 <a href="team.html">Team</a>
//                 <a href="contact.html">Contact</a>
//             </nav>
//         </header>`;
    
//     const footer = `
//         <footer>
//             <p>&copy; 2023 Patch Intelligence. All rights reserved.</p>
//             <p>Enterprise-grade Vulnerability Management Solution</p>
//         </footer>`;

//     document.getElementById('header').innerHTML = header;
//     document.getElementById('footer').innerHTML = footer;

//     // Set active navigation link
//     const currentPage = location.pathname.split('/').pop();
//     document.querySelectorAll('nav a').forEach(link => {
//         if(link.getAttribute('href') === currentPage) {
//             link.style.background = 'rgba(255,255,255,0.2)';
//         }
//     });
// });




// // Home page animations
// if(document.querySelector('.home-main')) {
//     gsap.from('.hero-title', {
//         duration: 1,
//         y: 50,
//         opacity: 0,
//         ease: 'power3.out'
//     });

//     gsap.from('.issue-item', {
//         duration: 0.8,
//         y: 30,
//         opacity: 0,
//         stagger: 0.2,
//         delay: 0.5,
//         ease: 'back.out'
//     });
// }


//         // Patch Data
//         const patchData = [
//             // CSV data converted to JSON format
//             {"Vendor":"Microsoft","Product":"Windows 10","Version":"10.0.19044","Vulnerabilities Fixed":"CVE-2023-12345, CVE-2023-12346","Reference":"https://msrc.microsoft.com/update-guide"},
//             {"Vendor":"Apple","Product":"macOS","Version":"11.7","Vulnerabilities Fixed":"CVE-2023-12347","Reference":"https://support.apple.com/security-updates"},
//             {"Vendor":"Red Hat","Product":"RHEL","Version":"8.6","Vulnerabilities Fixed":"CVE-2023-12348","Reference":"https://access.redhat.com/security/updates"},
//             {"Vendor":"Cisco","Product":"Cisco BroadWorks","Version":"Unknown","Vulnerabilities Fixed":"CVE-2025-20165","Reference":"https://tools.cisco.com/security/center/content/CiscoSecurityAdvisory"},
//             {"Vendor":"mySCADA","Product":"myPRO Manager","Version":"Unknown","Vulnerabilities Fixed":"CVE-2025-20014, CVE-2025-20061","Reference":"https://myscada.com/security"},
//             {"Vendor":"Cisco","Product":"Cisco Common Services Platform Collector Software","Version":"Unknown","Vulnerabilities Fixed":"CVE-2025-20166, CVE-2025-20168, CVE-2025-20167","Reference":"https://tools.cisco.com/security/center/content/CiscoSecurityAdvisory"},
//             {"Vendor":"Cisco","Product":"Cisco Crosswork Network Change Automation","Version":"Unknown","Vulnerabilities Fixed":"CVE-2025-20123","Reference":"https://tools.cisco.com/security/center/content/CiscoSecurityAdvisory"},
//             {"Vendor":"Cisco","Product":"Cisco Meeting Management","Version":"Unknown","Vulnerabilities Fixed":"CVE-2025-20156","Reference":"https://tools.cisco.com/security/center/content/CiscoSecurityAdvisory"},
//             {"Vendor":"Mattermost","Product":"Mattermost","Version":"Unknown","Vulnerabilities Fixed":"CVE-2025-20630, CVE-2025-20072, CVE-2025-20088, CVE-2025-20036, CVE-2025-20033, CVE-2025-20086, CVE-2025-20621","Reference":"https://mattermost.com/security"},
//             {"Vendor":"Y'S corporation","Product":"STEALTHONE D220","Version":"Unknown","Vulnerabilities Fixed":"CVE-2025-20055, CVE-2025-20620, CVE-2025-20016","Reference":"https://yscorp.com/security"}
//         ];

//         // Correlated Data
//         const correlatedData = [
//             // CSV data converted to JSON format
//             {"Vendor":"Microsoft","Product":"Windows 10","Version":"10.0.19044","CVE_ID":"CVE-2023-12345","CPE":"cpe:/o:microsoft:windows_10"},
//             {"Vendor":"Microsoft","Product":"Windows 10","Version":"10.0.19044","CVE_ID":"CVE-2023-12346","CPE":"cpe:/o:microsoft:windows_10"},
//             {"Vendor":"Apple","Product":"macOS","Version":"11.7","CVE_ID":"CVE-2023-12347","CPE":"cpe:/o:apple:macos"},
//             {"Vendor":"Red Hat","Product":"RHEL","Version":"8.6","CVE_ID":"CVE-2023-12348","CPE":"cpe:/o:redhat:rhel"},
//             {"Vendor":"Cisco","Product":"Cisco BroadWorks","Version":"Unknown","CVE_ID":"CVE-2025-20165","CPE":"cpe:/a:cisco:broadworks"},
//             {"Vendor":"mySCADA","Product":"myPRO Manager","Version":"Unknown","CVE_ID":"CVE-2025-20014","CPE":"cpe:/a:myscada:mypro_manager"},
//             {"Vendor":"Cisco","Product":"Cisco Common Services Platform Collector Software","Version":"Unknown","CVE_ID":"CVE-2025-20166","CPE":"cpe:/a:cisco:common_services_platform_collector"},
//             {"Vendor":"Cisco","Product":"Cisco Common Services Platform Collector Software","Version":"Unknown","CVE_ID":"CVE-2025-20168","CPE":"cpe:/a:cisco:common_services_platform_collector"},
//             {"Vendor":"Cisco","Product":"Cisco Crosswork Network Change Automation","Version":"Unknown","CVE_ID":"CVE-2025-20123","CPE":"cpe:/a:cisco:crosswork_network_change_automation"},
//             {"Vendor":"Cisco","Product":"Cisco Meeting Management","Version":"Unknown","CVE_ID":"CVE-2025-20156","CPE":"cpe:/a:cisco:meeting_management"},
//             {"Vendor":"Mattermost","Product":"Mattermost","Version":"Unknown","CVE_ID":"CVE-2025-20630","CPE":"cpe:/a:mattermost:mattermost"},
//             {"Vendor":"Mattermost","Product":"Mattermost","Version":"Unknown","CVE_ID":"CVE-2025-20072","CPE":"cpe:/a:mattermost:mattermost"},
//             {"Vendor":"Mattermost","Product":"Mattermost","Version":"Unknown","CVE_ID":"CVE-2025-20088","CPE":"cpe:/a:mattermost:mattermost"},
//             {"Vendor":"Mattermost","Product":"Mattermost","Version":"Unknown","CVE_ID":"CVE-2025-20036","CPE":"cpe:/a:mattermost:mattermost"},
//             {"Vendor":"Mattermost","Product":"Mattermost","Version":"Unknown","CVE_ID":"CVE-2025-20033","CPE":"cpe:/a:mattermost:mattermost"},
//             {"Vendor":"Mattermost","Product":"Mattermost","Version":"Unknown","CVE_ID":"CVE-2025-20086","CPE":"cpe:/a:mattermost:mattermost"},
//             {"Vendor":"Mattermost","Product":"Mattermost","Version":"Unknown","CVE_ID":"CVE-2025-20621","CPE":"cpe:/a:mattermost:mattermost"},
//             {"Vendor":"Y'S corporation","Product":"STEALTHONE D220","Version":"Unknown","CVE_ID":"CVE-2025-20055","CPE":"cpe:/a:ys_corporation:stealthone_d220"},
//             {"Vendor":"Y'S corporation","Product":"STEALTHONE D220","Version":"Unknown","CVE_ID":"CVE-2025-20620","CPE":"cpe:/a:ys_corporation:stealthone_d220"},
//             {"Vendor":"Y'S corporation","Product":"STEALTHONE D220","Version":"Unknown","CVE_ID":"CVE-2025-20016","CPE":"cpe:/a:ys_corporation:stealthone_d220"}
//         ];

//         // Populate Patch Data Table
//         const patchTableBody = document.querySelector('#patch-data tbody');
//         patchData.forEach(item => {
//             const vulnerabilities = item['Vulnerabilities Fixed'].split(', ')
//                 .map(cve => `<li class="cve-item">${cve}</li>`)
//                 .join('');
            
//             patchTableBody.innerHTML += `
//                 <tr>
//                     <td>${item.Vendor}</td>
//                     <td>${item.Product}</td>
//                     <td>${item.Version}</td>
//                     <td><ul class="cve-list">${vulnerabilities}</ul></td>
//                     <td><a href="${item.Reference}" class="reference-link" target="_blank">View Advisory</a></td>
//                 </tr>
//             `;
//         });


//         // Populate Correlated Data Table
//         const correlatedTableBody = document.querySelector('#correlated-data tbody');
//         correlatedData.forEach(item => {
//             correlatedTableBody.innerHTML += `
//                 <tr>
//                     <td>${item.Vendor}</td>
//                     <td>${item.Product}</td>
//                     <td>${item.Version}</td>
//                     <td><span class="cve-item">${item.CVE_ID}</span></td>
//                     <td><code>${item.CPE}</code></td>
//                 </tr>
//             `;
//         });

//         // Navigation System (Same as previous implementation)
//         document.querySelectorAll('nav a').forEach(link => {
//             link.addEventListener('click', (e) => {
//                 e.preventDefault();
//                 const targetId = link.getAttribute('href').substring(1);
//                 document.querySelectorAll('.content-section').forEach(section => {
//                     section.classList.add('hidden-section');
//                 });
//                 document.getElementById(targetId).classList.remove('hidden-section');
//                 window.scrollTo({ top: 0, behavior: 'smooth' });
//             });
//         });

        
//         document.addEventListener('DOMContentLoaded', () => {
//             const menuToggle = document.querySelector('.menu-toggle');
//             const navLinks = document.querySelector('.nav-links');
//             const logoutBtn = document.getElementById('logout-btn');
//             const pages = document.querySelectorAll('.page');
//             const navItems = document.querySelectorAll('.nav-links a');
//             const uploadForm = document.getElementById('upload-form');
//             const uploadStatus = document.getElementById('upload-status');
        
//             menuToggle.addEventListener('click', () => {
//                 navLinks.classList.toggle('active');
//             });
        
//             navItems.forEach(item => {
//                 item.addEventListener('click', (e) => {
//                     e.preventDefault();
//                     const targetPage = e.target.getAttribute('data-page');
//                     showPage(targetPage);
//                 });
//             });
        
//             function showPage(pageId) {
//                 pages.forEach(page => {
//                     page.classList.remove('active');
//                 });
//                 document.getElementById(pageId).classList.add('active');
//             }
        
//             logoutBtn.addEventListener('click', () => {
//                 alert('Logout functionality to be implemented');
//             });
        
//             uploadForm.addEventListener('submit', (e) => {
//                 e.preventDefault();
//                 const fileInput = document.getElementById('file-input');
//                 const file = fileInput.files[0];
        
//                 if (file) {
//                     // Simulating file upload
//                     uploadStatus.textContent = 'Uploading...';
//                     setTimeout(() => {
//                         uploadStatus.textContent = 'File uploaded successfully!';
//                         fileInput.value = '';
//                     }, 2000);
//                 } else {
//                     uploadStatus.textContent = 'Please select a file to upload.';
//                 }
//             });
        
//             const predictionForm = document.querySelector('.prediction-form');
//             const predictionResults = document.getElementById('prediction-results');
        
//             predictionForm.addEventListener('submit', (e) => {
//                 e.preventDefault();
//                 const indicators = predictionForm.querySelector('textarea').value;
        
//                 if (indicators) {
//                     predictionResults.textContent = 'Analyzing...';
//                     setTimeout(() => {
//                         predictionResults.innerHTML = `
//                             <h3>Prediction Results:</h3>
//                             <p>Based on the provided indicators, we predict a medium-level threat.</p>
//                             <p>Recommended actions: Increase monitoring and update security protocols.</p>
//                         `;
//                     }, 2000);
//                 } else {
//                     predictionResults.textContent = 'Please enter threat indicators for analysis.';
//                 }
//             });
//         });
        


document.addEventListener('DOMContentLoaded', () => {
    // Load header and footer
    const header = `
        <header>
            <nav>
                <a href="index.html">Home</a>
                <a href="overview.html">Overview</a>
                <a href="team.html">Team</a>
                <a href="contact.html">Contact</a>
            </nav>
        </header>`;
    
    const footer = `
        <footer>
            <p>&copy; 2023 Patch Intelligence. All rights reserved.</p>
            <p>Enterprise-grade Vulnerability Management Solution</p>
        </footer>`;

    document.getElementById('header').innerHTML = header;
    document.getElementById('footer').innerHTML = footer;

    // Set active navigation link
    const currentPage = location.pathname.split('/').pop();
    document.querySelectorAll('nav a').forEach(link => {
        if(link.getAttribute('href') === currentPage) {
            link.style.background = 'rgba(255,255,255,0.2)';
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Header and footer loading remains the same

    // CSV Parser function
    function parseCSV(csvContent) {  // Remove limit parameter
        const rows = csvContent.split('\n').slice(1); // Remove header
        return rows.filter(row => row.trim())
                  .map(row => {  // Remove .slice(0, limit)
                      const cells = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
                      return cells.map(cell => cell.trim().replace(/^"(.*)"$/, '$1'));
                  });
    }


    // Process and display data
    let currentPatchData = [];
    let currentCorrelatedData = [];

    async function loadCSVData() {
        try {
            // Load patch data
            const patchResponse = await fetch('patch_data.csv');
            const patchCSV = await patchResponse.text();
            currentPatchData = parseCSV(patchCSV).map(row => ({
                Vendor: row[0],
                Product: row[1],
                Version: row[2],
                Vulnerabilities: row[3],
                Reference: `https://nvd.nist.gov/vuln/detail/${row[3].split(',')[0]}`
            }));
    
            // Load correlated data
            const correlatedResponse = await fetch('correlated_data.csv');
            const correlatedCSV = await correlatedResponse.text();
            currentCorrelatedData = parseCSV(correlatedCSV).map(row => ({
                Vendor: row[0],
                Product: row[1],
                Version: row[2],
                CVE_ID: row[3],
                CPE: row[4]
            }));
    
            populateTables();
        } catch (error) {
            console.error('Error loading CSV data:', error);
        }
    }

    // Table population function
    function populateTables() {
        const patchTableBody = document.querySelector('#patch-data tbody');
        const correlatedTableBody = document.querySelector('#correlated-data tbody');
        
        // Clear existing data
        patchTableBody.innerHTML = '';
        correlatedTableBody.innerHTML = '';

        // Populate Patch Data
        currentPatchData.forEach(item => {
            const vulnerabilities = item.Vulnerabilities.split(', ')
                .map(cve => `<li class="cve-item">${cve}</li>`)
                .join('');
            
            patchTableBody.innerHTML += `
                <tr>
                    <td>${item.Vendor}</td>
                    <td>${item.Product}</td>
                    <td>${item.Version}</td>
                    <td><ul class="cve-list">${vulnerabilities}</ul></td>
                    <td><a href="${item.Reference}" class="reference-link" target="_blank">View Advisory</a></td>
                </tr>`;
        });

        // Populate Correlated Data
        currentCorrelatedData.forEach(item => {
            correlatedTableBody.innerHTML += `
                <tr>
                    <td>${item.Vendor}</td>
                    <td>${item.Product}</td>
                    <td>${item.Version}</td>
                    <td><span class="cve-item">${item.CVE_ID}</span></td>
                    <td><code>${item.CPE}</code></td>
                </tr>`;
        });
    }

    // Image handling
    const cveImage = document.getElementById('cve-diagram-image');
    const fullscreenOverlay = document.getElementById('fullscreen-overlay');
    const fullscreenImage = document.getElementById('fullscreen-image');

    if(cveImage) {
        cveImage.addEventListener('click', function() {
            fullscreenImage.src = this.src;
            fullscreenOverlay.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    }

    window.closeFullscreen = function() {
        fullscreenOverlay.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Close on overlay click
    fullscreenOverlay.addEventListener('click', (e) => {
        if(e.target === fullscreenOverlay) {
            closeFullscreen();
        }
    });

    // Initial load
    loadCSVData();

    // Auto-refresh every 5 minutes
    setInterval(loadCSVData, 300000);
});