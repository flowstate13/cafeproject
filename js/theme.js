// ===================================
// Dark Mode Theme Toggle
// ===================================

const darkModeColors = {
    '--bg-light': '#1a1a1a',
    '--bg-cream': '#252525',
    '--bg-dark': '#0f0f0f',
    '--text-dark': '#ffffff',
    '--text-light': '#cccccc',
    '--shadow': '0 8px 20px rgba(0, 0, 0, 0.5)',
    '--shadow-hover': '0 15px 35px rgba(0, 0, 0, 0.6)',
};

const lightModeColors = {
    '--bg-light': '#ffffff',
    '--bg-cream': '#f8f5f0',
    '--bg-dark': '#2d2520',
    '--text-dark': '#1a1a1a',
    '--text-light': '#555',
    '--shadow': '0 8px 20px rgba(0, 0, 0, 0.08)',
    '--shadow-hover': '0 15px 35px rgba(0, 0, 0, 0.15)',
};

// Check saved theme preference
function getCurrentTheme() {
    return localStorage.getItem('theme') || 'light';
}

// Apply theme
function applyTheme(theme) {
    const root = document.documentElement;
    const colors = theme === 'dark' ? darkModeColors : lightModeColors;
    
    Object.keys(colors).forEach(key => {
        root.style.setProperty(key, colors[key]);
    });
    
    // Update body class
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
    
    localStorage.setItem('theme', theme);
    updateThemeButton(theme);
}

// Toggle theme
function toggleTheme() {
    const currentTheme = getCurrentTheme();
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
    
    // Show notification
    const message = newTheme === 'dark' ? '🌙 Mode sombre activé' : '☀️ Mode clair activé';
    showNotification(message);
}

// Update theme button
function updateThemeButton(theme) {
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        const icon = themeBtn.querySelector('i');
        if (theme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            themeBtn.title = 'Mode clair';
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            themeBtn.title = 'Mode sombre';
        }
    }
}

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = getCurrentTheme();
    applyTheme(savedTheme);
});
