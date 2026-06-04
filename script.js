document.addEventListener("DOMContentLoaded", function () {
    // WORD ANIMATION (Typing Effect)
    let words = document.querySelectorAll(".word");
    const wordObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            entry.target.classList.toggle("show-item", entry.isIntersecting);
        });
    });

    if (words.length > 0) {
        words.forEach((word, index) => {
            let letters = word.textContent.split("");
            word.textContent = "";
            letters.forEach((letter) => {
                let span = document.createElement("span");
                span.textContent = letter;
                span.className = "letter";
                word.append(span);
            });
        
            // Disconnect the observer when the page is unloaded
            window.addEventListener("beforeunload", () => {
                wordObserver.disconnect();
            });

            if (index === 0) word.classList.add("active"); // Set first word as active
        });

        let currentWordIndex = 0;
        let maxWordIndex = words.length - 1;

        function changeText() {
            let currentWord = words[currentWordIndex];
            let nextWord = currentWordIndex === maxWordIndex ? words[0] : words[currentWordIndex + 1];

            if (!currentWord || !nextWord) return;

            Array.from(currentWord.children).forEach((letter, i) => {
                setTimeout(() => {
                    letter.className = "letter out";
                }, i * 80);
            });

            setTimeout(() => {
                currentWord.classList.remove("active");
                nextWord.classList.add("active");
            }, 500);

            Array.from(nextWord.children).forEach((letter, i) => {
                letter.className = "letter behind";
                setTimeout(() => {
                    letter.className = "letter in";
                }, 340 + i * 80);
            });

            currentWordIndex = currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
        }

        let intervalId = setInterval(changeText, 3000);

        // Clear the interval when the page is unloaded
        window.addEventListener("beforeunload", () => {
            clearInterval(intervalId);
        });
    }

    const circles = document.querySelectorAll('.circle');

circles.forEach(circle => {

    let dots = circle.getAttribute("data-dots");
    let percent = circle.getAttribute("data-percent");

    let marked = dots * percent / 100;
    let rotate = 360 / dots;

    let points = "";

    for(let i = 0; i < dots; i++){

        points += `
        <div class="point"
        style="--i:${i}; --rot:${rotate}deg">
        </div>`;
    }

    circle.innerHTML += points;

    const point = circle.querySelectorAll('.point');

    for(let i = 0; i < marked; i++){
        point[i].classList.add('marked');
    }

});
    // MIXITUP PORTFOLIO FILTER
    if (document.querySelector(".portfolio-gallery")) {
        mixitup(".portfolio-gallery", {
            selectors: {
                target: ".port-box",
            },
            animation: {
                duration: 300,
            },
        });

        // ADD ACTIVE STATE TO FILTER BUTTONS
        const filterButtons = document.querySelectorAll(".filter-buttons .button");
        filterButtons.forEach((button) => {
            button.addEventListener("click", function () {
                filterButtons.forEach((btn) => btn.classList.remove("active"));
                this.classList.add("active");
            });
        });
    }
    let menuIcon = document.querySelector("#menu-icon");
    let navList = document.querySelector(".navlist");

    if (menuIcon && navList) {
        // Toggle menu open/close
        menuIcon.addEventListener("click", () => {
            menuIcon.classList.toggle("bx-x");
            navList.classList.toggle("open");
        });
        window.addEventListener("scroll", () => {
            menuIcon.classList.remove("bx-x"); 
            navList.classList.remove("open");
        });

        // Close menu when clicking outside
        document.addEventListener("click", (event) => {
            if (!menuIcon.contains(event.target) && !navList.contains(event.target)) {
                menuIcon.classList.remove("bx-x");
                navList.classList.remove("open");
            }
        });

        // Ensure clicking inside menu doesn't close it
        navList.addEventListener("click", () => {
            // event.stopPropagation() removed as it is unnecessary
        });
    }

    // Sticky Navbar
    const header = document.querySelector("header");
    window.addEventListener("scroll", () => {
        header.classList.toggle("sticky", window.scrollY > 50);
    });
    

    // PARALLAX EFFECT
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            entry.target.classList.toggle("show-item", entry.isIntersecting);
        });
    });

    document.querySelectorAll(".scroll-scale, .scroll-bottom, .scroll-top").forEach((el) => {
        observer.observe(el);
    });
});
