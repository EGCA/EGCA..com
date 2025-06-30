// EGCA European 2025 Goalball Tournament Website
// Main JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initDarkMode();
    initLanguageSwitcher();
    initNavigation();
    initAnimations();
    initTeamFiltering();
    initTeamModals();
    initVotingSystem();
    initFAQ();
    initForms();
    initScrollEffects();
    initPageTransitions();
});

// Dark Mode Functionality
function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Apply the saved theme
    body.setAttribute('data-theme', currentTheme);
    updateDarkModeIcon(currentTheme);
    
    // Toggle dark mode
    darkModeToggle?.addEventListener('click', function() {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateDarkModeIcon(newTheme);
        
        // Add smooth transition effect
        body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        setTimeout(() => {
            body.style.transition = '';
        }, 300);
    });
}

function updateDarkModeIcon(theme) {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const icon = darkModeToggle?.querySelector('i');
    
    if (icon) {
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }
}

// Navigation Functionality
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const sidebar = document.getElementById('sidebar');
    const sidebarClose = document.getElementById('sidebarClose');
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    
    // Toggle sidebar
    hamburger?.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        sidebar?.classList.toggle('active');
        document.body.style.overflow = sidebar?.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close sidebar
    sidebarClose?.addEventListener('click', closeSidebar);
    
    // Close sidebar when clicking on links
    sidebarLinks.forEach(link => {
        link.addEventListener('click', closeSidebar);
    });
    
    // Close sidebar when clicking outside
    document.addEventListener('click', function(e) {
        if (sidebar?.classList.contains('active') && 
            !sidebar.contains(e.target) && 
            !hamburger?.contains(e.target)) {
            closeSidebar();
        }
    });
    
    // Handle responsive navigation
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeSidebar();
        }
    });
}

function closeSidebar() {
    const hamburger = document.getElementById('hamburger');
    const sidebar = document.getElementById('sidebar');
    
    hamburger?.classList.remove('active');
    sidebar?.classList.remove('active');
    document.body.style.overflow = '';
}

// Animation and Scroll Effects
function initAnimations() {
    // Fade in animations for hero content
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.2}s`;
    });
    
    // Initialize Intersection Observer for section animations
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe all sections with fade animation
    const sections = document.querySelectorAll('.section-fade');
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

// Team Filtering Functionality
function initTeamFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const teamsContainer = document.getElementById('teamsContainer');
    
    // Team data
    const teams = [
        { initials: 'GER', name: 'Germany', nation: 'Germany', players: 6, region: 'western' },
        { initials: 'FRA', name: 'France', nation: 'France', players: 5, region: 'western' },
        { initials: 'ESP', name: 'Spain', nation: 'Spain', players: 6, region: 'western' },
        { initials: 'ITA', name: 'Italy', nation: 'Italy', players: 5, region: 'western' },
        { initials: 'NED', name: 'Netherlands', nation: 'Netherlands', players: 4, region: 'western' },
        { initials: 'BEL', name: 'Belgium', nation: 'Belgium', players: 5, region: 'western' },
        { initials: 'POL', name: 'Poland', nation: 'Poland', players: 6, region: 'eastern' },
        { initials: 'CZE', name: 'Czech Republic', nation: 'Czech Republic', players: 5, region: 'eastern' },
        { initials: 'HUN', name: 'Hungary', nation: 'Hungary', players: 4, region: 'eastern' },
        { initials: 'ROU', name: 'Romania', nation: 'Romania', players: 5, region: 'eastern' },
        { initials: 'SVK', name: 'Slovakia', nation: 'Slovakia', players: 4, region: 'eastern' },
        { initials: 'SWE', name: 'Sweden', nation: 'Sweden', players: 6, region: 'northern' },
        { initials: 'FIN', name: 'Finland', nation: 'Finland', players: 5, region: 'northern' },
        { initials: 'DEN', name: 'Denmark', nation: 'Denmark', players: 4, region: 'northern' },
        { initials: 'GRE', name: 'Greece', nation: 'Greece', players: 6, region: 'southern' },
        { initials: 'POR', name: 'Portugal', nation: 'Portugal', players: 5, region: 'southern' }
    ];
    
    // Render teams
    function renderTeams(filteredTeams) {
        if (!teamsContainer) return;
        
        teamsContainer.innerHTML = '';
        
        filteredTeams.forEach(team => {
            const teamCard = document.createElement('div');
            teamCard.className = 'team-card';
            teamCard.innerHTML = `
                <div class="team-initials">${team.initials}</div>
                <h3 class="team-name">${team.name}</h3>
                <p class="team-nation">${team.nation}</p>
                <div class="team-info">
                    <span class="team-players">${team.players} players</span>
                    <span class="team-region">${team.region.charAt(0).toUpperCase() + team.region.slice(1)}</span>
                </div>
            `;
            teamsContainer.appendChild(teamCard);
        });
        
        // Add stagger animation to team cards
        const teamCards = teamsContainer.querySelectorAll('.team-card');
        teamCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.transition = 'all 0.4s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 50);
        });
    }
    
    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter teams
            const filter = this.getAttribute('data-filter');
            const filteredTeams = filter === 'all' ? teams : teams.filter(team => team.region === filter);
            
            renderTeams(filteredTeams);
        });
    });
    
    // Initial render
    if (teamsContainer) {
        renderTeams(teams);
    }
}

// FAQ Functionality
function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
}

// Form Functionality
function initForms() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Basic validation
            if (!validateForm(formObject)) {
                return;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual endpoint)
            setTimeout(() => {
                showNotification('Message sent successfully! We will get back to you soon.', 'success');
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
    
    // Form field animations
    const formInputs = document.querySelectorAll('input, select, textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        input.addEventListener('blur', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

function validateForm(formData) {
    const errors = [];
    
    if (!formData.name || formData.name.trim().length < 2) {
        errors.push('Name must be at least 2 characters long');
    }
    
    if (!formData.email || !isValidEmail(formData.email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!formData.subject) {
        errors.push('Please select a subject');
    }
    
    if (!formData.message || formData.message.trim().length < 10) {
        errors.push('Message must be at least 10 characters long');
    }
    
    if (errors.length > 0) {
        showNotification(errors.join('\n'), 'error');
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message.replace(/\n/g, '<br>')}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#d4edda' : type === 'error' ? '#f8d7da' : '#d1ecf1'};
        color: ${type === 'success' ? '#155724' : type === 'error' ? '#721c24' : '#0c5460'};
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        border: 1px solid ${type === 'success' ? '#c3e6cb' : type === 'error' ? '#f5c6cb' : '#bee5eb'};
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'warning': return 'fa-exclamation-triangle';
        default: return 'fa-info-circle';
    }
}

// Scroll Effects
function initScrollEffects() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Show/hide scroll to top button
    const scrollTopBtn = createScrollTopButton();
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
}

function createScrollTopButton() {
    const button = document.createElement('button');
    button.className = 'scroll-top-btn';
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.setAttribute('aria-label', 'Scroll to top');
    
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transform: translateY(20px);
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    
    button.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px) scale(1.1)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
    
    // Add visible class styles
    const style = document.createElement('style');
    style.textContent = `
        .scroll-top-btn.visible {
            opacity: 1 !important;
            visibility: visible !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(button);
    return button;
}

// Match Results Filtering (for Results page)
function initMatchFiltering() {
    const matchFilterBtns = document.querySelectorAll('.match-filter-btn');
    
    matchFilterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            matchFilterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter logic would go here when match data is available
            const day = this.getAttribute('data-day');
            console.log(`Filtering matches for: ${day}`);
        });
    });
}

// Initialize match filtering if on results page
if (window.location.pathname.includes('results.html')) {
    document.addEventListener('DOMContentLoaded', initMatchFiltering);
}

// Print functionality for invitations
function initPrintFunctionality() {
    const printBtns = document.querySelectorAll('button[onclick*="print"]');
    
    printBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            window.print();
        });
    });
}

// Initialize print functionality
document.addEventListener('DOMContentLoaded', initPrintFunctionality);

// Page Transition Functionality
function initPageTransitions() {
    const pageLoader = document.getElementById('pageLoader');
    const allLinks = document.querySelectorAll('a[href]');
    
    // Hide loader on page load
    if (pageLoader) {
        setTimeout(() => {
            pageLoader.classList.remove('active');
        }, 100);
    }
    
    // Add transition effect to navigation links
    allLinks.forEach(link => {
        // Only apply to internal navigation links
        const href = link.getAttribute('href');
        if (href && (href.endsWith('.html') || href === 'index.html' || href.startsWith('./'))) {
            link.addEventListener('click', function(e) {
                // Don't interfere with external links or special actions
                if (!this.target || this.target === '_self') {
                    e.preventDefault();
                    
                    // Show loading animation
                    if (pageLoader) {
                        pageLoader.classList.add('active');
                    }
                    
                    // Navigate after a short delay
                    setTimeout(() => {
                        window.location.href = href;
                    }, 500);
                }
            });
        }
    });
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Language Switcher Functionality
function initLanguageSwitcher() {
    const languageToggle = document.getElementById('languageToggle');
    const languageDropdown = document.getElementById('languageDropdown');
    const languageOptions = document.querySelectorAll('.language-option');

    // Comprehensive Translation Data
    const translations = {
        en: {
            // Navigation
            'nav-home': 'Home',
            'nav-info': 'Info',
            'nav-invitations': 'Invitations',
            'nav-teams': 'Teams',
            'nav-results': 'Results',
            'nav-members': 'Members',
            'nav-help': 'Help',
            
            // Homepage
            'page-title-home': 'EGCA European 2025 Goalball Tournament',
            'page-subtitle-home': 'Celebrating Excellence in Adaptive Sports',
            'cta-learn-more': 'Learn More',
            'cta-register': 'Register Now',
            'section-title-highlights': 'Tournament Highlights',
            'highlight-1-title': 'World-Class Competition',
            'highlight-1-desc': 'Experience the highest level of goalball competition in Europe',
            'highlight-2-title': 'Inclusive Excellence',
            'highlight-2-desc': 'Celebrating diversity and athletic achievement in adaptive sports',
            'highlight-3-title': 'Community Spirit',
            'highlight-3-desc': 'Building bridges through sport and shared passion',
            
            // Info Page
            'page-title-info': 'About the Tournament',
            'page-subtitle-info': 'Learn about EGCA European 2025 Goalball Tournament',
            'tournament-overview': 'Tournament Overview',
            'mission-statement': 'Mission Statement',
            'venue-info': 'Venue Information',
            'schedule-info': 'Schedule',
            
            // Teams Page
            'page-title-teams': 'Meet the Teams',
            'page-subtitle-teams': 'Discover the exceptional teams competing in EGCA European 2025',
            'filter-all': 'All Teams',
            'filter-western': 'Western Europe',
            'filter-eastern': 'Eastern Europe',
            'filter-northern': 'Northern Europe',
            'filter-southern': 'Southern Europe',
            
            // Results Page
            'page-title-results': 'Tournament Results',
            'page-subtitle-results': 'Follow the competition and see how teams are performing',
            'vote-for-team': 'Vote for Your Favorite Team',
            'top-5-teams': 'Top 5 Teams by Votes',
            'cast-vote': 'Cast Your Vote',
            'thanks-voting': 'Thanks for voting!',
            'vote-recorded': 'Your vote has been recorded. Check back to see how the voting progresses!',
            'latest-results': 'Latest Results',
            'standings': 'Current Standings',
            
            // Members Page
            'page-title-members': 'Organizing Committee',
            'page-subtitle-members': 'Meet the dedicated team behind EGCA European 2025',
            'leadership-team': 'Leadership Team',
            'organizing-committee': 'Organizing Committee',
            'volunteers': 'Volunteers',
            
            // Invitations Page
            'page-title-invitations': 'Tournament Invitations',
            'page-subtitle-invitations': 'Registration information and invitation details',
            'registration-info': 'Registration Information',
            'eligibility': 'Eligibility Requirements',
            'important-dates': 'Important Dates',
            'contact-info': 'Contact Information',
            
            // Help Page
            'page-title-help': 'Help & Support',
            'page-subtitle-help': 'Find answers to your questions and get support',
            'faq': 'Frequently Asked Questions',
            'contact-us': 'Contact Us',
            'technical-support': 'Technical Support',
            'accessibility': 'Accessibility',
            
            // Footer
            'footer-about': 'About EGCA 2025',
            'footer-contact': 'Contact',
            'footer-privacy': 'Privacy Policy',
            'footer-terms': 'Terms of Service',
            'footer-copyright': '© 2025 EGCA European Goalball Tournament. All rights reserved.',
            
            // Forms
            'form-name': 'Name',
            'form-email': 'Email',
            'form-subject': 'Subject',
            'form-message': 'Message',
            'form-submit': 'Submit',
            'form-required': 'Required field'
        },
        
        el: {
            // Navigation
            'nav-home': 'Αρχική',
            'nav-info': 'Πληροφορίες',
            'nav-invitations': 'Προσκλήσεις',
            'nav-teams': 'Ομάδες',
            'nav-results': 'Αποτελέσματα',
            'nav-members': 'Μέλη',
            'nav-help': 'Βοήθεια',
            
            // Homepage
            'page-title-home': 'EGCA Ευρωπαϊκό Τουρνουά Goalball 2025',
            'page-subtitle-home': 'Γιορτάζοντας την Αριστεία στα Προσαρμοστικά Αθλήματα',
            'cta-learn-more': 'Μάθετε Περισσότερα',
            'cta-register': 'Εγγραφή Τώρα',
            'section-title-highlights': 'Στιγμές του Τουρνουά',
            'highlight-1-title': 'Διαγωνισμός Παγκόσμιας Κλάσης',
            'highlight-1-desc': 'Βιώστε το υψηλότερο επίπεδο ανταγωνισμού goalball στην Ευρώπη',
            'highlight-2-title': 'Συμπεριληπτική Αριστεία',
            'highlight-2-desc': 'Γιορτάζοντας τη διαφορετικότητα και το αθλητικό επίτευγμα',
            'highlight-3-title': 'Κοινοτικό Πνεύμα',
            'highlight-3-desc': 'Χτίζοντας γέφυρες μέσω του αθλητισμού και του κοινού πάθους',
            
            // Info Page
            'page-title-info': 'Σχετικά με το Τουρνουά',
            'page-subtitle-info': 'Μάθετε για το EGCA Ευρωπαϊκό Τουρνουά Goalball 2025',
            'tournament-overview': 'Επισκόπηση Τουρνουά',
            'mission-statement': 'Δήλωση Αποστολής',
            'venue-info': 'Πληροφορίες Χώρου',
            'schedule-info': 'Πρόγραμμα',
            
            // Teams Page
            'page-title-teams': 'Γνωρίστε τις Ομάδες',
            'page-subtitle-teams': 'Ανακαλύψτε τις εξαιρετικές ομάδες που διαγωνίζονται στο EGCA European 2025',
            'filter-all': 'Όλες οι Ομάδες',
            'filter-western': 'Δυτική Ευρώπη',
            'filter-eastern': 'Ανατολική Ευρώπη',
            'filter-northern': 'Βόρεια Ευρώπη',
            'filter-southern': 'Νότια Ευρώπη',
            
            // Results Page
            'page-title-results': 'Αποτελέσματα Τουρνουά',
            'page-subtitle-results': 'Παρακολουθήστε τον διαγωνισμό και δείτε πώς τα πάνε οι ομάδες',
            'vote-for-team': 'Ψηφίστε την Αγαπημένη σας Ομάδα',
            'top-5-teams': 'Κορυφαίες 5 Ομάδες με Ψήφους',
            'cast-vote': 'Δώστε τη Ψήφο σας',
            'thanks-voting': 'Ευχαριστούμε που ψηφίσατε!',
            'vote-recorded': 'Η ψήφος σας καταγράφηκε. Ελέγξτε ξανά για να δείτε πώς εξελίσσεται η ψηφοφορία!',
            'latest-results': 'Τελευταία Αποτελέσματα',
            'standings': 'Τρέχουσα Κατάταξη',
            
            // Members Page
            'page-title-members': 'Οργανωτική Επιτροπή',
            'page-subtitle-members': 'Γνωρίστε την αφοσιωμένη ομάδα πίσω από το EGCA European 2025',
            'leadership-team': 'Ομάδα Ηγεσίας',
            'organizing-committee': 'Οργανωτική Επιτροπή',
            'volunteers': 'Εθελοντές',
            
            // Invitations Page
            'page-title-invitations': 'Προσκλήσεις Τουρνουά',
            'page-subtitle-invitations': 'Πληροφορίες εγγραφής και λεπτομέρειες πρόσκλησης',
            'registration-info': 'Πληροφορίες Εγγραφής',
            'eligibility': 'Απαιτήσεις Επιλεξιμότητας',
            'important-dates': 'Σημαντικές Ημερομηνίες',
            'contact-info': 'Στοιχεία Επικοινωνίας',
            
            // Help Page
            'page-title-help': 'Βοήθεια & Υποστήριξη',
            'page-subtitle-help': 'Βρείτε απαντήσεις στις ερωτήσεις σας και λάβετε υποστήριξη',
            'faq': 'Συχνές Ερωτήσεις',
            'contact-us': 'Επικοινωνήστε μαζί μας',
            'technical-support': 'Τεχνική Υποστήριξη',
            'accessibility': 'Προσβασιμότητα',
            
            // Footer
            'footer-about': 'Σχετικά με EGCA 2025',
            'footer-contact': 'Επικοινωνία',
            'footer-privacy': 'Πολιτική Απορρήτου',
            'footer-terms': 'Όροι Υπηρεσίας',
            'footer-copyright': '© 2025 EGCA Ευρωπαϊκό Τουρνουά Goalball. Όλα τα δικαιώματα διατηρούνται.',
            
            // Forms
            'form-name': 'Όνομα',
            'form-email': 'Email',
            'form-subject': 'Θέμα',
            'form-message': 'Μήνυμα',
            'form-submit': 'Υποβολή',
            'form-required': 'Υποχρεωτικό πεδίο'
        },
        
        fr: {
            // Navigation
            'nav-home': 'Accueil',
            'nav-info': 'Info',
            'nav-invitations': 'Invitations',
            'nav-teams': 'Équipes',
            'nav-results': 'Résultats',
            'nav-members': 'Membres',
            'nav-help': 'Aide',
            
            // Homepage
            'page-title-home': 'Tournoi de Goalball Européen EGCA 2025',
            'page-subtitle-home': 'Célébrant l\'Excellence dans les Sports Adaptatifs',
            'cta-learn-more': 'En Savoir Plus',
            'cta-register': 'S\'inscrire',
            'section-title-highlights': 'Points Forts du Tournoi',
            'highlight-1-title': 'Compétition de Classe Mondiale',
            'highlight-1-desc': 'Découvrez le plus haut niveau de compétition de goalball en Europe',
            'highlight-2-title': 'Excellence Inclusive',
            'highlight-2-desc': 'Célébrant la diversité et la réussite sportive dans les sports adaptatifs',
            'highlight-3-title': 'Esprit Communautaire',
            'highlight-3-desc': 'Construire des ponts par le sport et la passion partagée',
            
            // Info Page
            'page-title-info': 'À Propos du Tournoi',
            'page-subtitle-info': 'Découvrez le Tournoi de Goalball Européen EGCA 2025',
            'tournament-overview': 'Aperçu du Tournoi',
            'mission-statement': 'Déclaration de Mission',
            'venue-info': 'Informations sur le Lieu',
            'schedule-info': 'Programme',
            
            // Teams Page
            'page-title-teams': 'Rencontrez les Équipes',
            'page-subtitle-teams': 'Découvrez les équipes exceptionnelles en compétition à EGCA European 2025',
            'filter-all': 'Toutes les Équipes',
            'filter-western': 'Europe de l\'Ouest',
            'filter-eastern': 'Europe de l\'Est',
            'filter-northern': 'Europe du Nord',
            'filter-southern': 'Europe du Sud',
            
            // Results Page
            'page-title-results': 'Résultats du Tournoi',
            'page-subtitle-results': 'Suivez la compétition et voyez les performances des équipes',
            'vote-for-team': 'Votez pour Votre Équipe Favorite',
            'top-5-teams': 'Top 5 des Équipes par Votes',
            'cast-vote': 'Votez',
            'thanks-voting': 'Merci d\'avoir voté!',
            'vote-recorded': 'Votre vote a été enregistré. Revenez pour voir l\'évolution du vote!',
            'latest-results': 'Derniers Résultats',
            'standings': 'Classement Actuel',
            
            // Members Page
            'page-title-members': 'Comité d\'Organisation',
            'page-subtitle-members': 'Rencontrez l\'équipe dévouée derrière EGCA European 2025',
            'leadership-team': 'Équipe de Direction',
            'organizing-committee': 'Comité d\'Organisation',
            'volunteers': 'Bénévoles',
            
            // Invitations Page
            'page-title-invitations': 'Invitations au Tournoi',
            'page-subtitle-invitations': 'Informations d\'inscription et détails d\'invitation',
            'registration-info': 'Informations d\'Inscription',
            'eligibility': 'Conditions d\'Éligibilité',
            'important-dates': 'Dates Importantes',
            'contact-info': 'Informations de Contact',
            
            // Help Page
            'page-title-help': 'Aide et Support',
            'page-subtitle-help': 'Trouvez des réponses à vos questions et obtenez de l\'aide',
            'faq': 'Questions Fréquemment Posées',
            'contact-us': 'Contactez-nous',
            'technical-support': 'Support Technique',
            'accessibility': 'Accessibilité',
            
            // Footer
            'footer-about': 'À Propos d\'EGCA 2025',
            'footer-contact': 'Contact',
            'footer-privacy': 'Politique de Confidentialité',
            'footer-terms': 'Conditions de Service',
            'footer-copyright': '© 2025 Tournoi de Goalball Européen EGCA. Tous droits réservés.',
            
            // Forms
            'form-name': 'Nom',
            'form-email': 'Email',
            'form-subject': 'Sujet',
            'form-message': 'Message',
            'form-submit': 'Envoyer',
            'form-required': 'Champ obligatoire'
        },
        
        de: {
            // Navigation
            'nav-home': 'Startseite',
            'nav-info': 'Info',
            'nav-invitations': 'Einladungen',
            'nav-teams': 'Teams',
            'nav-results': 'Ergebnisse',
            'nav-members': 'Mitglieder',
            'nav-help': 'Hilfe',
            
            // Homepage
            'page-title-home': 'EGCA Europäisches Goalball-Turnier 2025',
            'page-subtitle-home': 'Exzellenz im Behindertensport Feiern',
            'cta-learn-more': 'Mehr Erfahren',
            'cta-register': 'Jetzt Registrieren',
            'section-title-highlights': 'Turnier-Highlights',
            'highlight-1-title': 'Weltklasse-Wettbewerb',
            'highlight-1-desc': 'Erleben Sie das höchste Niveau des Goalball-Wettbewerbs in Europa',
            'highlight-2-title': 'Inklusive Exzellenz',
            'highlight-2-desc': 'Vielfalt und sportliche Leistung im Behindertensport feiern',
            'highlight-3-title': 'Gemeinschaftsgeist',
            'highlight-3-desc': 'Brücken bauen durch Sport und gemeinsame Leidenschaft',
            
            // Info Page
            'page-title-info': 'Über das Turnier',
            'page-subtitle-info': 'Erfahren Sie mehr über das EGCA Europäisches Goalball-Turnier 2025',
            'tournament-overview': 'Turnier-Übersicht',
            'mission-statement': 'Leitbild',
            'venue-info': 'Veranstaltungsort-Informationen',
            'schedule-info': 'Zeitplan',
            
            // Teams Page
            'page-title-teams': 'Teams Kennenlernen',
            'page-subtitle-teams': 'Entdecken Sie die außergewöhnlichen Teams bei EGCA European 2025',
            'filter-all': 'Alle Teams',
            'filter-western': 'Westeuropa',
            'filter-eastern': 'Osteuropa',
            'filter-northern': 'Nordeuropa',
            'filter-southern': 'Südeuropa',
            
            // Results Page
            'page-title-results': 'Turnier-Ergebnisse',
            'page-subtitle-results': 'Verfolgen Sie den Wettbewerb und sehen Sie, wie die Teams abschneiden',
            'vote-for-team': 'Stimmen Sie für Ihr Lieblingsteam',
            'top-5-teams': 'Top 5 Teams nach Stimmen',
            'cast-vote': 'Stimme Abgeben',
            'thanks-voting': 'Danke fürs Abstimmen!',
            'vote-recorded': 'Ihre Stimme wurde aufgezeichnet. Schauen Sie zurück, um zu sehen, wie sich die Abstimmung entwickelt!',
            'latest-results': 'Neueste Ergebnisse',
            'standings': 'Aktuelle Tabelle',
            
            // Members Page
            'page-title-members': 'Organisationskomitee',
            'page-subtitle-members': 'Lernen Sie das engagierte Team hinter EGCA European 2025 kennen',
            'leadership-team': 'Führungsmannschaft',
            'organizing-committee': 'Organisationskomitee',
            'volunteers': 'Freiwillige',
            
            // Invitations Page
            'page-title-invitations': 'Turnier-Einladungen',
            'page-subtitle-invitations': 'Anmeldeinformationen und Einladungsdetails',
            'registration-info': 'Anmeldeinformationen',
            'eligibility': 'Berechtigung Anforderungen',
            'important-dates': 'Wichtige Termine',
            'contact-info': 'Kontaktinformationen',
            
            // Help Page
            'page-title-help': 'Hilfe & Support',
            'page-subtitle-help': 'Finden Sie Antworten auf Ihre Fragen und erhalten Sie Unterstützung',
            'faq': 'Häufig Gestellte Fragen',
            'contact-us': 'Kontaktieren Sie uns',
            'technical-support': 'Technischer Support',
            'accessibility': 'Barrierefreiheit',
            
            // Footer
            'footer-about': 'Über EGCA 2025',
            'footer-contact': 'Kontakt',
            'footer-privacy': 'Datenschutzrichtlinie',
            'footer-terms': 'Nutzungsbedingungen',
            'footer-copyright': '© 2025 EGCA Europäisches Goalball-Turnier. Alle Rechte vorbehalten.',
            
            // Forms
            'form-name': 'Name',
            'form-email': 'E-Mail',
            'form-subject': 'Betreff',
            'form-message': 'Nachricht',
            'form-submit': 'Senden',
            'form-required': 'Pflichtfeld'
        },
        
        it: {
            // Navigation
            'nav-home': 'Home',
            'nav-info': 'Info',
            'nav-invitations': 'Inviti',
            'nav-teams': 'Squadre',
            'nav-results': 'Risultati',
            'nav-members': 'Membri',
            'nav-help': 'Aiuto',
            
            // Homepage
            'page-title-home': 'Torneo Europeo di Goalball EGCA 2025',
            'page-subtitle-home': 'Celebrando l\'Eccellenza negli Sport Adattivi',
            'cta-learn-more': 'Scopri di Più',
            'cta-register': 'Registrati Ora',
            'section-title-highlights': 'Punti Salienti del Torneo',
            'highlight-1-title': 'Competizione di Classe Mondiale',
            'highlight-1-desc': 'Vivi il più alto livello di competizione di goalball in Europa',
            'highlight-2-title': 'Eccellenza Inclusiva',
            'highlight-2-desc': 'Celebrando la diversità e il successo atletico negli sport adattivi',
            'highlight-3-title': 'Spirito di Comunità',
            'highlight-3-desc': 'Costruire ponti attraverso lo sport e la passione condivisa',
            
            // Info Page
            'page-title-info': 'Informazioni sul Torneo',
            'page-subtitle-info': 'Scopri il Torneo Europeo di Goalball EGCA 2025',
            'tournament-overview': 'Panoramica del Torneo',
            'mission-statement': 'Dichiarazione di Missione',
            'venue-info': 'Informazioni sulla Sede',
            'schedule-info': 'Programma',
            
            // Teams Page
            'page-title-teams': 'Conosci le Squadre',
            'page-subtitle-teams': 'Scopri le squadre eccezionali in competizione a EGCA European 2025',
            'filter-all': 'Tutte le Squadre',
            'filter-western': 'Europa Occidentale',
            'filter-eastern': 'Europa Orientale',
            'filter-northern': 'Europa Settentrionale',
            'filter-southern': 'Europa Meridionale',
            
            // Results Page
            'page-title-results': 'Risultati del Torneo',
            'page-subtitle-results': 'Segui la competizione e vedi come stanno andando le squadre',
            'vote-for-team': 'Vota per la Tua Squadra Preferita',
            'top-5-teams': 'Top 5 Squadre per Voti',
            'cast-vote': 'Esprimi il Tuo Voto',
            'thanks-voting': 'Grazie per aver votato!',
            'vote-recorded': 'Il tuo voto è stato registrato. Torna per vedere come procede la votazione!',
            'latest-results': 'Ultimi Risultati',
            'standings': 'Classifica Attuale',
            
            // Members Page
            'page-title-members': 'Comitato Organizzatore',
            'page-subtitle-members': 'Conosci il team dedicato dietro EGCA European 2025',
            'leadership-team': 'Team di Leadership',
            'organizing-committee': 'Comitato Organizzatore',
            'volunteers': 'Volontari',
            
            // Invitations Page
            'page-title-invitations': 'Inviti al Torneo',
            'page-subtitle-invitations': 'Informazioni di registrazione e dettagli degli inviti',
            'registration-info': 'Informazioni di Registrazione',
            'eligibility': 'Requisiti di Idoneità',
            'important-dates': 'Date Importanti',
            'contact-info': 'Informazioni di Contatto',
            
            // Help Page
            'page-title-help': 'Aiuto e Supporto',
            'page-subtitle-help': 'Trova risposte alle tue domande e ottieni supporto',
            'faq': 'Domande Frequenti',
            'contact-us': 'Contattaci',
            'technical-support': 'Supporto Tecnico',
            'accessibility': 'Accessibilità',
            
            // Footer
            'footer-about': 'Informazioni su EGCA 2025',
            'footer-contact': 'Contatto',
            'footer-privacy': 'Politica sulla Privacy',
            'footer-terms': 'Termini di Servizio',
            'footer-copyright': '© 2025 Torneo Europeo di Goalball EGCA. Tutti i diritti riservati.',
            
            // Forms
            'form-name': 'Nome',
            'form-email': 'Email',
            'form-subject': 'Oggetto',
            'form-message': 'Messaggio',
            'form-submit': 'Invia',
            'form-required': 'Campo obbligatorio'
        },
        
        es: {
            // Navigation
            'nav-home': 'Inicio',
            'nav-info': 'Info',
            'nav-invitations': 'Invitaciones',
            'nav-teams': 'Equipos',
            'nav-results': 'Resultados',
            'nav-members': 'Miembros',
            'nav-help': 'Ayuda',
            
            // Homepage
            'page-title-home': 'Torneo Europeo de Goalball EGCA 2025',
            'page-subtitle-home': 'Celebrando la Excelencia en Deportes Adaptativos',
            'cta-learn-more': 'Saber Más',
            'cta-register': 'Registrarse Ahora',
            'section-title-highlights': 'Aspectos Destacados del Torneo',
            'highlight-1-title': 'Competición de Clase Mundial',
            'highlight-1-desc': 'Experimenta el más alto nivel de competición de goalball en Europa',
            'highlight-2-title': 'Excelencia Inclusiva',
            'highlight-2-desc': 'Celebrando la diversidad y el logro atlético en deportes adaptativos',
            'highlight-3-title': 'Espíritu Comunitario',
            'highlight-3-desc': 'Construyendo puentes a través del deporte y la pasión compartida',
            
            // Info Page
            'page-title-info': 'Acerca del Torneo',
            'page-subtitle-info': 'Conoce el Torneo Europeo de Goalball EGCA 2025',
            'tournament-overview': 'Resumen del Torneo',
            'mission-statement': 'Declaración de Misión',
            'venue-info': 'Información del Lugar',
            'schedule-info': 'Horario',
            
            // Teams Page
            'page-title-teams': 'Conoce los Equipos',
            'page-subtitle-teams': 'Descubre los equipos excepcionales compitiendo en EGCA European 2025',
            'filter-all': 'Todos los Equipos',
            'filter-western': 'Europa Occidental',
            'filter-eastern': 'Europa Oriental',
            'filter-northern': 'Europa Septentrional',
            'filter-southern': 'Europa Meridional',
            
            // Results Page
            'page-title-results': 'Resultados del Torneo',
            'page-subtitle-results': 'Sigue la competición y ve cómo están rindiendo los equipos',
            'vote-for-team': 'Vota por tu Equipo Favorito',
            'top-5-teams': 'Top 5 Equipos por Votos',
            'cast-vote': 'Emite tu Voto',
            'thanks-voting': '¡Gracias por votar!',
            'vote-recorded': '¡Tu voto ha sido registrado. Vuelve para ver cómo progresa la votación!',
            'latest-results': 'Últimos Resultados',
            'standings': 'Clasificación Actual',
            
            // Members Page
            'page-title-members': 'Comité Organizador',
            'page-subtitle-members': 'Conoce al equipo dedicado detrás de EGCA European 2025',
            'leadership-team': 'Equipo de Liderazgo',
            'organizing-committee': 'Comité Organizador',
            'volunteers': 'Voluntarios',
            
            // Invitations Page
            'page-title-invitations': 'Invitaciones al Torneo',
            'page-subtitle-invitations': 'Información de registro y detalles de invitación',
            'registration-info': 'Información de Registro',
            'eligibility': 'Requisitos de Elegibilidad',
            'important-dates': 'Fechas Importantes',
            'contact-info': 'Información de Contacto',
            
            // Help Page
            'page-title-help': 'Ayuda y Soporte',
            'page-subtitle-help': 'Encuentra respuestas a tus preguntas y obtén apoyo',
            'faq': 'Preguntas Frecuentes',
            'contact-us': 'Contáctanos',
            'technical-support': 'Soporte Técnico',
            'accessibility': 'Accesibilidad',
            
            // Footer
            'footer-about': 'Acerca de EGCA 2025',
            'footer-contact': 'Contacto',
            'footer-privacy': 'Política de Privacidad',
            'footer-terms': 'Términos de Servicio',
            'footer-copyright': '© 2025 Torneo Europeo de Goalball EGCA. Todos los derechos reservados.',
            
            // Forms
            'form-name': 'Nombre',
            'form-email': 'Email',
            'form-subject': 'Asunto',
            'form-message': 'Mensaje',
            'form-submit': 'Enviar',
            'form-required': 'Campo requerido'
        },
        
        pl: {
            // Navigation
            'nav-home': 'Strona Główna',
            'nav-info': 'Info',
            'nav-invitations': 'Zaproszenia',
            'nav-teams': 'Drużyny',
            'nav-results': 'Wyniki',
            'nav-members': 'Członkowie',
            'nav-help': 'Pomoc',
            
            // Homepage
            'page-title-home': 'Europejski Turniej Goalball EGCA 2025',
            'page-subtitle-home': 'Świętując Doskonałość w Sportach Adaptacyjnych',
            'cta-learn-more': 'Dowiedz się Więcej',
            'cta-register': 'Zarejestruj się Teraz',
            'section-title-highlights': 'Najważniejsze Punkty Turnieju',
            'highlight-1-title': 'Konkurencja Światowej Klasy',
            'highlight-1-desc': 'Doświadcz najwyższego poziomu rywalizacji goalball w Europie',
            'highlight-2-title': 'Inkluzywna Doskonałość',
            'highlight-2-desc': 'Świętując różnorodność i osiągnięcia sportowe w sportach adaptacyjnych',
            'highlight-3-title': 'Duch Wspólnoty',
            'highlight-3-desc': 'Budowanie mostów poprzez sport i wspólną pasję',
            
            // Info Page
            'page-title-info': 'O Turnieju',
            'page-subtitle-info': 'Poznaj Europejski Turniej Goalball EGCA 2025',
            'tournament-overview': 'Przegląd Turnieju',
            'mission-statement': 'Deklaracja Misji',
            'venue-info': 'Informacje o Miejscu',
            'schedule-info': 'Harmonogram',
            
            // Teams Page
            'page-title-teams': 'Poznaj Drużyny',
            'page-subtitle-teams': 'Odkryj wyjątkowe drużyny rywalizujące w EGCA European 2025',
            'filter-all': 'Wszystkie Drużyny',
            'filter-western': 'Europa Zachodnia',
            'filter-eastern': 'Europa Wschodnia',
            'filter-northern': 'Europa Północna',
            'filter-southern': 'Europa Południowa',
            
            // Results Page
            'page-title-results': 'Wyniki Turnieju',
            'page-subtitle-results': 'Śledź rywalizację i zobacz, jak radzą sobie drużyny',
            'vote-for-team': 'Zagłosuj na Swoją Ulubioną Drużynę',
            'top-5-teams': 'Top 5 Drużyn według Głosów',
            'cast-vote': 'Oddaj Głos',
            'thanks-voting': 'Dziękujemy za głosowanie!',
            'vote-recorded': 'Twój głos został zapisany. Sprawdź ponownie, jak przebiega głosowanie!',
            'latest-results': 'Najnowsze Wyniki',
            'standings': 'Aktualna Tabela',
            
            // Members Page
            'page-title-members': 'Komitet Organizacyjny',
            'page-subtitle-members': 'Poznaj oddany zespół stojący za EGCA European 2025',
            'leadership-team': 'Zespół Kierowniczy',
            'organizing-committee': 'Komitet Organizacyjny',
            'volunteers': 'Wolontariusze',
            
            // Invitations Page
            'page-title-invitations': 'Zaproszenia na Turniej',
            'page-subtitle-invitations': 'Informacje o rejestracji i szczegóły zaproszeń',
            'registration-info': 'Informacje o Rejestracji',
            'eligibility': 'Wymagania Kwalifikacyjne',
            'important-dates': 'Ważne Daty',
            'contact-info': 'Informacje Kontaktowe',
            
            // Help Page
            'page-title-help': 'Pomoc i Wsparcie',
            'page-subtitle-help': 'Znajdź odpowiedzi na swoje pytania i uzyskaj wsparcie',
            'faq': 'Często Zadawane Pytania',
            'contact-us': 'Skontaktuj się z nami',
            'technical-support': 'Wsparcie Techniczne',
            'accessibility': 'Dostępność',
            
            // Footer
            'footer-about': 'O EGCA 2025',
            'footer-contact': 'Kontakt',
            'footer-privacy': 'Polityka Prywatności',
            'footer-terms': 'Warunki Usługi',
            'footer-copyright': '© 2025 Europejski Turniej Goalball EGCA. Wszystkie prawa zastrzeżone.',
            
            // Forms
            'form-name': 'Imię',
            'form-email': 'Email',
            'form-subject': 'Temat',
            'form-message': 'Wiadomość',
            'form-submit': 'Wyślij',
            'form-required': 'Pole wymagane'
        },
        
        nl: {
            // Navigation
            'nav-home': 'Home',
            'nav-info': 'Info',
            'nav-invitations': 'Uitnodigingen',
            'nav-teams': 'Teams',
            'nav-results': 'Resultaten',
            'nav-members': 'Leden',
            'nav-help': 'Help',
            
            // Homepage
            'page-title-home': 'EGCA Europees Goalball Toernooi 2025',
            'page-subtitle-home': 'Excellentie in Aangepaste Sporten Vieren',
            'cta-learn-more': 'Meer Weten',
            'cta-register': 'Nu Registreren',
            'section-title-highlights': 'Toernooi Hoogtepunten',
            'highlight-1-title': 'Wereldklasse Competitie',
            'highlight-1-desc': 'Ervaar het hoogste niveau van goalball competitie in Europa',
            'highlight-2-title': 'Inclusieve Excellentie',
            'highlight-2-desc': 'Diversiteit en sportieve prestaties in aangepaste sporten vieren',
            'highlight-3-title': 'Gemeenschapsgeest',
            'highlight-3-desc': 'Bruggen bouwen door sport en gedeelde passie',
            
            // Info Page
            'page-title-info': 'Over het Toernooi',
            'page-subtitle-info': 'Leer over het EGCA Europees Goalball Toernooi 2025',
            'tournament-overview': 'Toernooi Overzicht',
            'mission-statement': 'Missie Verklaring',
            'venue-info': 'Locatie Informatie',
            'schedule-info': 'Schema',
            
            // Teams Page
            'page-title-teams': 'Leer de Teams Kennen',
            'page-subtitle-teams': 'Ontdek de uitzonderlijke teams die deelnemen aan EGCA European 2025',
            'filter-all': 'Alle Teams',
            'filter-western': 'West-Europa',
            'filter-eastern': 'Oost-Europa',
            'filter-northern': 'Noord-Europa',
            'filter-southern': 'Zuid-Europa',
            
            // Results Page
            'page-title-results': 'Toernooi Resultaten',
            'page-subtitle-results': 'Volg de competitie en zie hoe teams presteren',
            'vote-for-team': 'Stem op je Favoriete Team',
            'top-5-teams': 'Top 5 Teams op Stemmen',
            'cast-vote': 'Breng je Stem Uit',
            'thanks-voting': 'Bedankt voor het stemmen!',
            'vote-recorded': 'Je stem is geregistreerd. Kom terug om te zien hoe de stemming vordert!',
            'latest-results': 'Laatste Resultaten',
            'standings': 'Huidige Ranglijst',
            
            // Members Page
            'page-title-members': 'Organisatie Comité',
            'page-subtitle-members': 'Ontmoet het toegewijde team achter EGCA European 2025',
            'leadership-team': 'Leiderschapsteam',
            'organizing-committee': 'Organisatie Comité',
            'volunteers': 'Vrijwilligers',
            
            // Invitations Page
            'page-title-invitations': 'Toernooi Uitnodigingen',
            'page-subtitle-invitations': 'Registratie informatie en uitnodiging details',
            'registration-info': 'Registratie Informatie',
            'eligibility': 'Geschiktheidsvereisten',
            'important-dates': 'Belangrijke Data',
            'contact-info': 'Contact Informatie',
            
            // Help Page
            'page-title-help': 'Help & Ondersteuning',
            'page-subtitle-help': 'Vind antwoorden op je vragen en krijg ondersteuning',
            'faq': 'Veelgestelde Vragen',
            'contact-us': 'Neem Contact Op',
            'technical-support': 'Technische Ondersteuning',
            'accessibility': 'Toegankelijkheid',
            
            // Footer
            'footer-about': 'Over EGCA 2025',
            'footer-contact': 'Contact',
            'footer-privacy': 'Privacybeleid',
            'footer-terms': 'Servicevoorwaarden',
            'footer-copyright': '© 2025 EGCA Europees Goalball Toernooi. Alle rechten voorbehouden.',
            
            // Forms
            'form-name': 'Naam',
            'form-email': 'Email',
            'form-subject': 'Onderwerp',
            'form-message': 'Bericht',
            'form-submit': 'Verzenden',
            'form-required': 'Verplicht veld'
        }
    };

    // Get current language
    let currentLanguage = localStorage.getItem('language') || 'en';

    // Apply saved language
    applyLanguage(currentLanguage);

    // Toggle dropdown
    languageToggle?.addEventListener('click', function(e) {
        e.stopPropagation();
        languageDropdown.classList.toggle('active');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function() {
        languageDropdown.classList.remove('active');
    });

    // Handle language selection
    languageOptions.forEach(option => {
        option.addEventListener('click', function() {
            const selectedLang = this.getAttribute('data-lang');
            currentLanguage = selectedLang;
            localStorage.setItem('language', selectedLang);
            applyLanguage(selectedLang);
            languageDropdown.classList.remove('active');
        });
    });

    function applyLanguage(lang) {
        if (!translations[lang]) return;

        const elementsToTranslate = document.querySelectorAll('[data-translate]');
        
        // Add fade-out effect
        document.body.style.transition = 'opacity 0.3s ease';
        document.body.style.opacity = '0.7';
        
        setTimeout(() => {
            elementsToTranslate.forEach(element => {
                const key = element.getAttribute('data-translate');
                if (translations[lang][key]) {
                    element.textContent = translations[lang][key];
                }
            });
            
            // Update language indicator in dropdown
            const currentFlag = languageToggle?.querySelector('.current-flag');
            const currentText = languageToggle?.querySelector('.current-lang');
            
            const languageMap = {
                'en': { flag: '🇬🇧', text: 'English' },
                'el': { flag: '🇬🇷', text: 'Ελληνικά' },
                'fr': { flag: '🇫🇷', text: 'Français' },
                'de': { flag: '🇩🇪', text: 'Deutsch' },
                'it': { flag: '🇮🇹', text: 'Italiano' },
                'es': { flag: '🇪🇸', text: 'Español' },
                'pl': { flag: '🇵🇱', text: 'Polski' },
                'nl': { flag: '🇳🇱', text: 'Nederlands' }
            };
            
            if (currentFlag && currentText && languageMap[lang]) {
                currentFlag.textContent = languageMap[lang].flag;
                currentText.textContent = languageMap[lang].text;
            }
            
            // Fade back in
            document.body.style.opacity = '1';
            
            // Remove transition after animation
            setTimeout(() => {
                document.body.style.transition = '';
            }, 300);
        }, 150);
    }
}

// Team Modal Functionality
function initTeamModals() {
    const teamCards = document.querySelectorAll('.team-card');
    const teamModal = document.getElementById('teamModal');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');

    if (!teamModal) return;

    // Team data
    const teamData = {
        greece: {
            name: 'Greece National Team',
            flag: '🇬🇷',
            players: [
                { name: 'Dimitris Konstantinos', position: 'Left Wing' },
                { name: 'Maria Papadopoulou', position: 'Center' },
                { name: 'Andreas Nikolaidis', position: 'Right Wing' },
                { name: 'Elena Georgiou', position: 'Substitute' },
                { name: 'Nikos Stavros', position: 'Substitute' },
                { name: 'Christina Mavros', position: 'Substitute' }
            ],
            staff: [
                { name: 'Yannis Petridis', role: 'Head Coach' },
                { name: 'Sofia Dimitriou', role: 'Assistant Coach' },
                { name: 'Dr. Kostas Angelopoulos', role: 'Team Physician' }
            ]
        },
        germany: {
            name: 'Germany National Team',
            flag: '🇩🇪',
            players: [
                { name: 'Hans Mueller', position: 'Left Wing' },
                { name: 'Lisa Schmidt', position: 'Center' },
                { name: 'Thomas Weber', position: 'Right Wing' },
                { name: 'Anna Fischer', position: 'Substitute' },
                { name: 'Michael Braun', position: 'Substitute' },
                { name: 'Sarah Wagner', position: 'Substitute' }
            ],
            staff: [
                { name: 'Klaus Hoffmann', role: 'Head Coach' },
                { name: 'Petra Schulz', role: 'Assistant Coach' },
                { name: 'Dr. Frank Richter', role: 'Team Physician' }
            ]
        }
    };

    // Add click listeners to team cards
    teamCards.forEach(card => {
        card.addEventListener('click', function() {
            const teamId = this.getAttribute('data-team') || 'greece';
            openTeamModal(teamId);
        });
    });

    // Close modal events
    modalClose?.addEventListener('click', closeTeamModal);
    modalOverlay?.addEventListener('click', closeTeamModal);

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && teamModal.classList.contains('active')) {
            closeTeamModal();
        }
    });

    function openTeamModal(teamId) {
        const team = teamData[teamId] || teamData.greece;
        
        // Update modal content
        document.getElementById('modalTeamFlag').textContent = team.flag;
        document.getElementById('modalTeamName').textContent = team.name;
        
        // Update players
        const playersContainer = document.getElementById('modalPlayers');
        playersContainer.innerHTML = team.players.map(player => `
            <div class="player-card">
                <div class="player-name">${player.name}</div>
                <div class="player-position">${player.position}</div>
            </div>
        `).join('');
        
        // Update staff
        const staffContainer = document.getElementById('modalStaff');
        staffContainer.innerHTML = team.staff.map(staff => `
            <div class="staff-item">
                <div class="staff-name">${staff.name}</div>
                <div class="staff-role">${staff.role}</div>
            </div>
        `).join('');
        
        // Show modal
        teamModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeTeamModal() {
        teamModal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Voting System Functionality
function initVotingSystem() {
    const voteButtons = document.querySelectorAll('.team-vote-btn');
    const votingInterface = document.getElementById('votingInterface');
    const voteThankYou = document.getElementById('voteThankYou');
    const voteBarChart = document.getElementById('voteBarChart');

    if (!voteButtons.length) return;

    // Initialize vote data
    let voteData = JSON.parse(localStorage.getItem('tournamentVotes')) || {
        greece: 0, germany: 0, france: 0, italy: 0, spain: 0,
        poland: 0, netherlands: 0, belgium: 0, portugal: 0,
        finland: 0, sweden: 0, lithuania: 0
    };

    // Check if user has already voted
    const hasVoted = localStorage.getItem('hasVoted') === 'true';
    
    if (hasVoted) {
        showThankYou();
    } else {
        showVotingInterface();
    }

    // Add vote button listeners
    voteButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (hasVoted) return;
            
            const team = this.getAttribute('data-team');
            castVote(team);
        });
    });

    function castVote(team) {
        voteData[team]++;
        localStorage.setItem('tournamentVotes', JSON.stringify(voteData));
        localStorage.setItem('hasVoted', 'true');
        
        updateVoteChart();
        showThankYou();
    }

    function showVotingInterface() {
        if (votingInterface) votingInterface.style.display = 'block';
        if (voteThankYou) voteThankYou.style.display = 'none';
        updateVoteChart();
    }

    function showThankYou() {
        if (votingInterface) votingInterface.style.display = 'none';
        if (voteThankYou) voteThankYou.style.display = 'block';
        updateVoteChart();
    }

    function updateVoteChart() {
        if (!voteBarChart) return;

        // Sort teams by votes and get top 5
        const sortedTeams = Object.entries(voteData)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 5);

        const totalVotes = Object.values(voteData).reduce((sum, votes) => sum + votes, 0);
        
        if (totalVotes === 0) {
            voteBarChart.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">No votes yet. Be the first to vote!</p>';
            return;
        }

        const teamFlags = {
            greece: '🇬🇷', germany: '🇩🇪', france: '🇫🇷', italy: '🇮🇹',
            spain: '🇪🇸', poland: '🇵🇱', netherlands: '🇳🇱', belgium: '🇧🇪',
            portugal: '🇵🇹', finland: '🇫🇮', sweden: '🇸🇪', lithuania: '🇱🇹'
        };

        voteBarChart.innerHTML = sortedTeams.map(([team, votes]) => {
            const percentage = ((votes / totalVotes) * 100).toFixed(1);
            const teamName = team.charAt(0).toUpperCase() + team.slice(1);
            
            return `
                <div class="vote-bar">
                    <div class="vote-bar-fill" style="width: ${percentage}%">
                        ${teamFlags[team]} ${percentage}%
                    </div>
                    <div class="vote-bar-label">${teamName} (${votes})</div>
                </div>
            `;
        }).join('');
    }

    // Initialize chart
    updateVoteChart();
}

// Error Handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // In production, you might want to send this to an error reporting service
});

// Performance Monitoring
window.addEventListener('load', function() {
    if ('performance' in window) {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Page load time: ${loadTime}ms`);
    }
});

// Accessibility Enhancements
function initAccessibility() {
    // Keyboard navigation for custom elements
    document.addEventListener('keydown', function(e) {
        // Handle escape key to close sidebar
        if (e.key === 'Escape') {
            const sidebar = document.getElementById('sidebar');
            if (sidebar?.classList.contains('active')) {
                closeSidebar();
            }
        }
        
        // Handle enter/space for custom buttons
        if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('.filter-btn, .faq-question')) {
            e.preventDefault();
            e.target.click();
        }
    });
    
    // Focus management for sidebar
    const sidebar = document.getElementById('sidebar');
    const sidebarClose = document.getElementById('sidebarClose');
    
    sidebar?.addEventListener('transitionend', function() {
        if (this.classList.contains('active')) {
            sidebarClose?.focus();
        }
    });
}

// Initialize accessibility enhancements
document.addEventListener('DOMContentLoaded', initAccessibility);

// Service Worker Registration (for offline functionality - optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment if you want to add offline functionality
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
}

// Analytics and Tracking (placeholder)
function trackEvent(eventName, eventData) {
    // Replace with your analytics implementation
    console.log(`Event tracked: ${eventName}`, eventData);
}

// Track page views
window.addEventListener('load', function() {
    trackEvent('page_view', {
        page: window.location.pathname,
        title: document.title
    });
});

// Track button clicks
document.addEventListener('click', function(e) {
    if (e.target.matches('.btn, .nav-link, .filter-btn')) {
        trackEvent('button_click', {
            element: e.target.textContent.trim(),
            page: window.location.pathname
        });
    }
});

// Export functions for potential external use
window.EGCAWebsite = {
    showNotification,
    trackEvent,
    initDarkMode,
    closeSidebar
};
