// ======================================================
// CEEWORD AI Studio - Main Navigation Script
// ======================================================

document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // Navigation Menu
    // ==========================================
    document.querySelectorAll('a[href="#pricing"]').forEach(link => {
        link.href = "pricing.html";
    });

    document.querySelectorAll('a[href="#about"]').forEach(link => {
        link.href = "aboutus.html";
    });

    document.querySelectorAll('a[href="#terms"]').forEach(link => {
        link.href = "t&c.html";
    });

    // ==========================================
    // Hero Buttons
    // ==========================================
    document.querySelectorAll(".hero-btn").forEach(button => {
        button.addEventListener("click", () => {
            window.location.href = "getstarted.html";
        });
    });

    document.querySelectorAll(".sticky-cta").forEach(button => {
        button.addEventListener("click", () => {
            window.location.href = "getstarted.html";
        });
    });

    // ==========================================
    // Workflow Launch Buttons
    // ==========================================
    document.querySelectorAll(".workflow-btn").forEach(button => {
        button.addEventListener("click", () => {
            window.location.href = "getstarted.html";
        });
    });

    // ==========================================
    // Pricing Buttons / Cards
    // ==========================================
    document.querySelectorAll(".pricing-card a").forEach(link => {
        link.href = "getstarted.html";
    });

    document.querySelectorAll(".pricing-card button").forEach(button => {
        button.addEventListener("click", () => {
            window.location.href = "getstarted.html";
        });
    });

    // ==========================================
    // Footer Links
    // ==========================================
    document.querySelectorAll("footer a").forEach(link => {

        const text = link.textContent.trim().toLowerCase();

        switch (text) {

            case "about us":
                link.href = "aboutus.html";
                break;

            case "security":
                link.href = "security.html";
                break;

            case "careers":
                link.href = "careers.html";
                break;

            case "contact":
                link.href = "contact.html";
                break;

            case "terms & conditions":
                link.href = "t&c.html";
                break;

            case "privacy policy":
                link.href = "privacy.html";
                break;

            case "cookie policy":
                link.href = "cookies.html";
                break;

            case "data processing":
                link.href = "dpa.html";
                break;
        }

    });

    // ==========================================
    // Generic Get Started Buttons
    // ==========================================
    document.querySelectorAll(
        '.get-started, .btn-primary, .btn-start, .start-btn'
    ).forEach(button => {
        button.addEventListener("click", () => {
            window.location.href = "getstarted.html";
        });
    });

});