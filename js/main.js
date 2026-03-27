document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.getElementById("navbar");
    const toggle = document.getElementById("nav-toggle");
    const menu = document.getElementById("nav-menu");
    const links = document.querySelectorAll(".nav-link");
    const form = document.getElementById("armando-form");
    const success = document.getElementById("armando-success");
    const revealTargets = document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale");

    const closeMenu = () => {
        toggle?.classList.remove("active");
        menu?.classList.remove("active");
        document.body.classList.remove("menu-open");
        toggle?.setAttribute("aria-expanded", "false");
    };

    const handleScroll = () => {
        if (!navbar) return;
        navbar.classList.toggle("scrolled", window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    if (toggle && menu) {
        toggle.addEventListener("click", () => {
            const isOpen = menu.classList.toggle("active");
            toggle.classList.toggle("active", isOpen);
            document.body.classList.toggle("menu-open", isOpen);
            toggle.setAttribute("aria-expanded", String(isOpen));
        });

        links.forEach((link) => link.addEventListener("click", closeMenu));

        document.addEventListener("click", (event) => {
            if (!menu.contains(event.target) && !toggle.contains(event.target) && menu.classList.contains("active")) {
                closeMenu();
            }
        });
    }

    if (revealTargets.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("revealed");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });

        revealTargets.forEach((target) => observer.observe(target));
    }

    if (form && success) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            success.hidden = false;
            form.reset();
        });
    }
});
