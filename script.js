// EGCA European 2025 Goalball Tournament - Main JavaScript
// Enhanced with language system, voting, team modals, and interactive features

// Import translation system
document.addEventListener('DOMContentLoaded', function() {
    // Load translation system
    const script = document.createElement('script');
    script.src = 'translations.js';
    script.onload = function() {
        initializeWebsite();
    };
    document.head.appendChild(script);
});

function initializeWebsite() {
    // Initialize all components
    initializeNavigation();
    initializeDarkMode();
    initializeLanguageSwitcher();
    initializeAnimations();
    initializePageSpecificFeatures();
    initializePageLoader();
}

// SECTION: Navigation & Mobile Menu
function initializeNavigation() {
    const hamburger = document.getElementById('hamburger');
    const sidebar = document.getElementById('sidebar');
    const sidebarClose = document.getElementById('sidebarClose');
    const sidebarLinks = document.querySelectorAll('.sidebar-link');

    if (hamburger && sidebar) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            sidebar.classList.toggle('active');
        });
    }

    if (sidebarClose) {
        sidebarClose.addEventListener('click', () => {
            hamburger.classList.remove('active');
            sidebar.classList.remove('active');
        });
    }

    // Close sidebar when clicking on links
    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            sidebar.classList.remove('active');
        });
    });

    // Close sidebar when clicking outside
    document.addEventListener('click', (e) => {
        if (sidebar && sidebar.classList.contains('active')) {
            if (!sidebar.contains(e.target) && !hamburger.contains(e.target)) {
                hamburger.classList.remove('active');
                sidebar.classList.remove('active');
            }
        }
    });
}

// SECTION: Dark Mode Toggle
function initializeDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('egca-theme') || 'light';
    
    // Apply saved theme
    if (savedTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        if (darkModeToggle) {
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    }
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('egca-theme', newTheme);
            
            // Update icon
            darkModeToggle.innerHTML = newTheme === 'dark' 
                ? '<i class="fas fa-moon"></i>' 
                : '<i class="fas fa-sun"></i>';
        });
    }
}

// SECTION: Language Switcher
function initializeLanguageSwitcher() {
    const languageToggle = document.getElementById('languageToggle');
    const languageDropdown = document.getElementById('languageDropdown');
    const languageOptions = document.querySelectorAll('.language-option');

    if (languageToggle && languageDropdown) {
        languageToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            languageDropdown.classList.toggle('active');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            languageDropdown.classList.remove('active');
        });

        languageDropdown.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    // Handle language selection
    languageOptions.forEach(option => {
        option.addEventListener('click', () => {
            const langCode = option.getAttribute('data-lang');
            if (window.translationSystem) {
                window.translationSystem.setLanguage(langCode);
            }
            languageDropdown.classList.remove('active');
        });
    });
}

// SECTION: Page Loader Animation
function initializePageLoader() {
    const pageLoader = document.getElementById('pageLoader');
    
    // Show loader on page navigation
    const navLinks = document.querySelectorAll('a[href$=".html"], .nav-link, .sidebar-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.includes('.html') && !href.startsWith('#')) {
                if (pageLoader) {
                    pageLoader.classList.add('active');
                }
            }
        });
    });

    // Hide loader when page loads
    window.addEventListener('load', () => {
        if (pageLoader) {
            setTimeout(() => {
                pageLoader.classList.remove('active');
            }, 500);
        }
    });
}

// SECTION: Scroll Animations
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, observerOptions);

    // Observe all sections with fade animation
    const fadeElements = document.querySelectorAll('.section-fade');
    fadeElements.forEach(el => observer.observe(el));
}

// SECTION: Page-Specific Features
function initializePageSpecificFeatures() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    switch (currentPage) {
        case 'index.html':
        case '':
            // Homepage specific features
            break;
        case 'teams.html':
            initializeTeamsPage();
            break;
        case 'results.html':
            initializeResultsPage();
            break;
        case 'help.html':
            initializeHelpPage();
            break;
        case 'info.html':
            initializeInfoPage();
            break;
    }
}

// SECTION: Teams Page Features
function initializeTeamsPage() {
    initializeTeamFilters();
    initializeTeamCards();
    initializeTeamModal();
}

function initializeTeamFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const teamsContainer = document.getElementById('teamsContainer');
    
    // Sample team data
    const teams = [
        { name: 'Greece', initials: 'GR', nation: 'Greece', players: 6, region: 'southern', flag: '🇬🇷' },
        { name: 'Germany', initials: 'DE', nation: 'Germany', players: 6, region: 'western', flag: '🇩🇪' },
        { name: 'France', initials: 'FR', nation: 'France', players: 6, region: 'western', flag: '🇫🇷' },
        { name: 'Italy', initials: 'IT', nation: 'Italy', players: 6, region: 'southern', flag: '🇮🇹' },
        { name: 'Spain', initials: 'ES', nation: 'Spain', players: 6, region: 'southern', flag: '🇪🇸' },
        { name: 'Poland', initials: 'PL', nation: 'Poland', players: 6, region: 'eastern', flag: '🇵🇱' },
        { name: 'Netherlands', initials: 'NL', nation: 'Netherlands', players: 6, region: 'western', flag: '🇳🇱' },
        { name: 'Belgium', initials: 'BE', nation: 'Belgium', players: 6, region: 'western', flag: '🇧🇪' },
        { name: 'Portugal', initials: 'PT', nation: 'Portugal', players: 6, region: 'southern', flag: '🇵🇹' },
        { name: 'Finland', initials: 'FI', nation: 'Finland', players: 6, region: 'northern', flag: '🇫🇮' },
        { name: 'Sweden', initials: 'SE', nation: 'Sweden', players: 6, region: 'northern', flag: '🇸🇪' },
        { name: 'Lithuania', initials: 'LT', nation: 'Lithuania', players: 6, region: 'eastern', flag: '🇱🇹' },
        { name: 'Czech Republic', initials: 'CZ', nation: 'Czech Republic', players: 6, region: 'eastern', flag: '🇨🇿' },
        { name: 'Austria', initials: 'AT', nation: 'Austria', players: 6, region: 'western', flag: '🇦🇹' },
        { name: 'Denmark', initials: 'DK', nation: 'Denmark', players: 6, region: 'northern', flag: '🇩🇰' },
        { name: 'Norway', initials: 'NO', nation: 'Norway', players: 6, region: 'northern', flag: '🇳🇴' }
    ];

    function renderTeams(filteredTeams) {
        if (!teamsContainer) return;
        
        teamsContainer.innerHTML = filteredTeams.map(team => `
            <div class="team-card" data-team="${team.name.toLowerCase()}" data-region="${team.region}">
                <div class="team-initials">${team.initials}</div>
                <h3 class="team-name">${team.name}</h3>
                <p class="team-nation">${team.nation}</p>
                <div class="team-info">
                    <span class="team-players">${team.players} players</span>
                    <span class="team-region">${team.region}</span>
                </div>
            </div>
        `).join('');
        
        // Re-initialize team card click handlers
        initializeTeamCards();
    }

    // Initial render
    renderTeams(teams);

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            const filteredTeams = filter === 'all' 
                ? teams 
                : teams.filter(team => team.region === filter);
            
            renderTeams(filteredTeams);
        });
    });
}

function initializeTeamCards() {
    const teamCards = document.querySelectorAll('.team-card');
    teamCards.forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
            const teamName = card.getAttribute('data-team');
            openTeamModal(teamName);
        });
    });
}

// SECTION: Team Modal System
function initializeTeamModal() {
    const modal = document.getElementById('teamModal');
    const modalClose = document.getElementById('modalClose');
    const modalOverlay = document.getElementById('modalOverlay');

    if (modalClose) {
        modalClose.addEventListener('click', closeTeamModal);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeTeamModal);
    }

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeTeamModal();
        }
    });
}

function openTeamModal(teamName) {
    const modal = document.getElementById('teamModal');
    const modalTeamName = document.getElementById('modalTeamName');
    const modalTeamFlag = document.getElementById('modalTeamFlag');
    const modalPlayers = document.getElementById('modalPlayers');
    const modalStaff = document.getElementById('modalStaff');

    // Sample team data with detailed information
    const teamData = {
        'greece': {
            name: 'Team Greece',
            flag: '🇬🇷',
            players: [
                { name: 'Dimitris Papadopoulos', position: 'Center' },
                { name: 'Maria Konstantinou', position: 'Wing' },
                { name: 'Andreas Nikolaidis', position: 'Wing' },
                { name: 'Elena Georgiou', position: 'Center' },
                { name: 'Yannis Stavros', position: 'Wing' },
                { name: 'Sofia Dimitriou', position: 'Center' }
            ],
            staff: [
                { name: 'Kostas Alexandrou', role: 'Head Coach' },
                { name: 'Anna Petridou', role: 'Assistant Coach' },
                { name: 'Dr. Michalis Kostas', role: 'Team Physician' }
            ]
        },
        'germany': {
            name: 'Team Germany',
            flag: '🇩🇪',
            players: [
                { name: 'Hans Mueller', position: 'Center' },
                { name: 'Anna Schmidt', position: 'Wing' },
                { name: 'Klaus Weber', position: 'Wing' },
                { name: 'Petra Fischer', position: 'Center' },
                { name: 'Thomas Wagner', position: 'Wing' },
                { name: 'Sabine Becker', position: 'Center' }
            ],
            staff: [
                { name: 'Wolfgang Schneider', role: 'Head Coach' },
                { name: 'Ingrid Hoffmann', role: 'Assistant Coach' },
                { name: 'Dr. Frank Richter', role: 'Team Physician' }
            ]
        },
        'france': {
            name: 'Team France',
            flag: '🇫🇷',
            players: [
                { name: 'Pierre Dubois', position: 'Center' },
                { name: 'Marie Leroy', position: 'Wing' },
                { name: 'Jean Martin', position: 'Wing' },
                { name: 'Sophie Bernard', position: 'Center' },
                { name: 'Luc Moreau', position: 'Wing' },
                { name: 'Camille Petit', position: 'Center' }
            ],
            staff: [
                { name: 'Antoine Rousseau', role: 'Head Coach' },
                { name: 'Isabelle Garnier', role: 'Assistant Coach' },
                { name: 'Dr. Philippe Durand', role: 'Team Physician' }
            ]
        }
        // Add more teams as needed
    };

    const team = teamData[teamName] || teamData['greece']; // Fallback to Greece

    if (modalTeamName) modalTeamName.textContent = team.name;
    if (modalTeamFlag) modalTeamFlag.textContent = team.flag;

    if (modalPlayers) {
        modalPlayers.innerHTML = team.players.map(player => `
            <div class="player-card">
                <div class="player-name">${player.name}</div>
                <div class="player-position">${player.position}</div>
            </div>
        `).join('');
    }

    if (modalStaff) {
        modalStaff.innerHTML = team.staff.map(staff => `
            <div class="staff-item">
                <div class="staff-name">${staff.name}</div>
                <div class="staff-role">${staff.role}</div>
            </div>
        `).join('');
    }

    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeTeamModal() {
    const modal = document.getElementById('teamModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// SECTION: Results Page Features
function initializeResultsPage() {
    initializeVotingSystem();
    initializeMatchFilters();
}

function initializeVotingSystem() {
    const votingInterface = document.getElementById('votingInterface');
    const voteThankYou = document.getElementById('voteThankYou');
    const voteButtons = document.querySelectorAll('.team-vote-btn');
    const voteBarChart = document.getElementById('voteBarChart');

    // Check if user has already voted
    const hasVoted = localStorage.getItem('egca-has-voted') === 'true';
    
    if (hasVoted && votingInterface && voteThankYou) {
        votingInterface.style.display = 'none';
        voteThankYou.style.display = 'block';
    }

    // Initialize vote data
    let voteData = JSON.parse(localStorage.getItem('egca-vote-data')) || {
        'greece': 45,
        'germany': 38,
        'france': 32,
        'italy': 28,
        'spain': 25,
        'poland': 22,
        'netherlands': 18,
        'belgium': 15,
        'portugal': 12,
        'finland': 10,
        'sweden': 8,
        'lithuania': 5
    };

    function updateVoteChart() {
        if (!voteBarChart) return;

        // Sort teams by votes and get top 5
        const sortedTeams = Object.entries(voteData)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 5);

        const totalVotes = Object.values(voteData).reduce((sum, votes) => sum + votes, 0);

        voteBarChart.innerHTML = sortedTeams.map(([team, votes]) => {
            const percentage = ((votes / totalVotes) * 100).toFixed(1);
            const teamName = team.charAt(0).toUpperCase() + team.slice(1);
            
            return `
                <div class="vote-bar">
                    <div class="vote-bar-fill" style="width: ${percentage}%">
                        ${percentage}%
                    </div>
                    <div class="vote-bar-label">${teamName} (${votes})</div>
                </div>
            `;
        }).join('');
    }

    // Initial chart update
    updateVoteChart();

    // Handle voting
    voteButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (hasVoted) return;

            const team = button.getAttribute('data-team');
            
            // Increment vote count
            voteData[team] = (voteData[team] || 0) + 1;
            
            // Save vote data and mark as voted
            localStorage.setItem('egca-vote-data', JSON.stringify(voteData));
            localStorage.setItem('egca-has-voted', 'true');
            
            // Update UI
            if (votingInterface && voteThankYou) {
                votingInterface.style.display = 'none';
                voteThankYou.style.display = 'block';
            }
            
            // Update chart
            updateVoteChart();
        });
    });
}

function initializeMatchFilters() {
    const filterButtons = document.querySelectorAll('.match-filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter logic would go here when matches are available
            const day = button.getAttribute('data-day');
            console.log(`Filtering matches for: ${day}`);
        });
    });
}

// SECTION: Help Page Features
function initializeHelpPage() {
    initializeFAQ();
    initializeContactForm();
}

function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                });
                
                // Toggle current item
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });
}

function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Simulate form submission
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }
}

// SECTION: Info Page Features
function initializeInfoPage() {
    // Info page specific features can be added here
    console.log('Info page initialized');
}

// SECTION: Utility Functions
function showPageLoader() {
    const pageLoader = document.getElementById('pageLoader');
    if (pageLoader) {
        pageLoader.classList.add('active');
    }
}

function hidePageLoader() {
    const pageLoader = document.getElementById('pageLoader');
    if (pageLoader) {
        pageLoader.classList.remove('active');
    }
}

// SECTION: Error Handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
});

// SECTION: Performance Monitoring
window.addEventListener('load', () => {
    // Hide any loading indicators
    hidePageLoader();
    
    // Log performance metrics
    if (window.performance && window.performance.timing) {
        const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
        console.log(`Page loaded in ${loadTime}ms`);
    }
});

function openGoalballModal() {
  document.getElementById("goalball-modal").style.display = "flex";
  document.body.style.overflow = "hidden"; // Prevent background scroll
}

function closeGoalballModal() {
  const modal = document.getElementById("goalball-modal");
  modal.style.display = "none";
  document.getElementById("goalball-iframe").src = "GoalballChallenge/index.html"; // Stop the game
  document.body.style.overflow = "auto";
}

// Optional: close on ESC
window.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    closeGoalballModal();
  }
});
document.addEventListener("mousemove", (e) => {
  const video = document.querySelector(".background-video");
  if (!video) return;

  const { innerWidth, innerHeight } = window;
  const centerX = innerWidth / 2;
  const centerY = innerHeight / 2;

  const moveX = (e.clientX - centerX) / centerX;
  const moveY = (e.clientY - centerY) / centerY;

  // Subtle parallax-style movement
  video.style.transform = `translate(${moveX * 10}px, ${moveY * 5}px) scale(1.03)`;
});
