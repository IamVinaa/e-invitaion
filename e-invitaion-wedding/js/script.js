
/*
  QUICK CUSTOMIZATION:
  1) Change the names, date, venue and map query below.
  2) Add your photos to the assets folder.
  3) Add assets/wedding-song.mp3, or use the Add music button.
  4) Upload your ABA QR image using the QR section's upload link.
*/

const WEDDING = {
    bride: "Bride Name",
    groom: "Groom Name",

    // Cambodia local time (UTC+7)
    // Format: YYYY-MM-DDTHH:MM:SS+07:00
    date: "2026-12-20T17:00:00+07:00",

    venue: "Your Wedding Venue",
    address: "Add your full venue address, Siem Reap, Cambodia",
    time: "Ceremony begins at 5:00 PM",
    mapQuery: "Angkor Wat, Siem Reap, Cambodia"
};


// ========================================
// HELPER
// ========================================

const $ = (id) => document.getElementById(id);

const weddingDate = new Date(WEDDING.date);


// ========================================
// WEDDING DETAILS
// ========================================

function setWeddingDetails() {

    $("brideName").textContent = WEDDING.bride;
    $("groomName").textContent = WEDDING.groom;

    $("letterNames").textContent =
        `${WEDDING.bride} & ${WEDDING.groom}`;

    $("footerNames").textContent =
        `${WEDDING.bride} & ${WEDDING.groom}`;

    $("venueName").textContent = WEDDING.venue;
    $("venueAddress").textContent = WEDDING.address;

    $("venueDate").textContent =
        weddingDate.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });

    $("venueTime").textContent = WEDDING.time;

    $("weddingDateText").textContent =
        weddingDate.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        }).replaceAll("/", " · ");

    $("heroDate").textContent =
        weddingDate.toLocaleDateString("en-GB", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        });

    // Google Maps
    const mapUrl =
        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(WEDDING.mapQuery)}`;

    $("mapLink").href = mapUrl;

    $("mapFrame").src =
        `https://www.google.com/maps?q=${encodeURIComponent(WEDDING.mapQuery)}&output=embed`;
}


// ========================================
// COUNTDOWN
// ========================================

function updateCountdown() {

    let diff = Math.max(
        0,
        weddingDate.getTime() - Date.now()
    );

    const days = Math.floor(diff / 86400000);
    diff %= 86400000;

    const hours = Math.floor(diff / 3600000);
    diff %= 3600000;

    const minutes = Math.floor(diff / 60000);
    diff %= 60000;

    const seconds = Math.floor(diff / 1000);

    $("days").textContent =
        String(days).padStart(3, "0");

    $("hours").textContent =
        String(hours).padStart(2, "0");

    $("minutes").textContent =
        String(minutes).padStart(2, "0");

    $("seconds").textContent =
        String(seconds).padStart(2, "0");
}


// ========================================
// ENVELOPE OPENING
// ========================================

// Prevent browser from restoring an old scroll position
if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
}

// Lock scrolling when invitation loads
document.documentElement.classList.add("envelope-locked");
document.body.classList.add("envelope-locked");

window.scrollTo(0, 0);

// Get envelope elements
const openButton = $("openInvitation");
const envelope = $("envelope");
const envelopeScreen = $("envelopeScreen");

if (openButton && envelope && envelopeScreen) {

    openButton.addEventListener("click", function () {

        // Prevent clicking multiple times
        if (openButton.disabled) return;

        openButton.disabled = true;

        // Start envelope opening animation
        envelope.classList.add("open");

        // Keep invitation visible for 5 seconds
        setTimeout(function () {

            // Fade out envelope screen
            envelopeScreen.classList.add("hidden");

            // Wait until fade-out finishes
            setTimeout(function () {

                // Unlock normal page scrolling
                document.documentElement.classList.remove("envelope-locked");
                document.body.classList.remove("envelope-locked");

                // Start the wedding page at the top
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: "instant"
                });

            }, 1300);

        }, 2500);
    });
}


// ========================================
// SCROLL REVEAL ANIMATION
// ========================================

const observer = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);
            }
        });

    },
    {
        threshold: 0.12
    }
);

document.querySelectorAll(".reveal").forEach(el => {
    observer.observe(el);
});


// ========================================
// BACKGROUND MUSIC
// ========================================

const audio = $("weddingMusic");
const musicButton = $("musicButton");

if (audio && musicButton) {

    musicButton.addEventListener("click", async () => {

        if (audio.paused) {

            try {

                await audio.play();

                musicButton.classList.add("playing");
                musicButton.textContent = "Ⅱ";

            } catch (error) {

                alert("Please add a music file first, then tap play again.");

            }

        } else {

            audio.pause();

            musicButton.classList.remove("playing");
            musicButton.textContent = "♫";
        }
    });
}


// ========================================
// MUSIC UPLOAD
// ========================================

const musicUpload = $("musicUpload");

if (musicUpload && audio && musicButton) {

    musicUpload.addEventListener("change", (event) => {

        const file = event.target.files[0];

        if (!file) return;

        audio.src = URL.createObjectURL(file);

        audio.play().then(() => {

            musicButton.classList.add("playing");
            musicButton.textContent = "Ⅱ";

        }).catch(() => {

            alert("Tap the music button to start your selected song.");

        });
    });
}


// ========================================
// ABA QR CODE IMAGE PREVIEW
// ========================================

const qrUpload = $("qrUpload");
const qrPreview = $("qrPreview");

if (qrUpload && qrPreview) {

    qrUpload.addEventListener("change", (event) => {

        const file = event.target.files[0];

        if (!file) return;

        const imageUrl = URL.createObjectURL(file);

        qrPreview.innerHTML = "";

        const img = document.createElement("img");

        img.src = imageUrl;
        img.alt = "ABA Pay QR code";

        qrPreview.appendChild(img);
    });
}


// ========================================
// INITIALIZE WEBSITE
// ========================================

setWeddingDetails();

updateCountdown();

setInterval(updateCountdown, 1000);
