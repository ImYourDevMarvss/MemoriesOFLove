document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       BIRTHDAY SETTINGS
    ========================================== */

    const BIRTHDAY_NAME = "JELLIAN";
    const MADE = "Marvin"


    /* ==========================================
       GET ELEMENTS
    ========================================== */

    const opening = document.getElementById("opening");
    const app = document.getElementById("app");
    const openBtn = document.getElementById("openBtn");
    const wishBtn = document.getElementById("wishBtn");
    const replayBtn = document.getElementById("replayBtn");
    const soundBtn = document.getElementById("soundBtn");

    const message = document.getElementById("message");
    const birthdayName = document.getElementById("birthdayName");
    const footerName = document.getElementById("footerName");

    const stars = document.getElementById("stars");
    const balloons = document.getElementById("balloons");
    const confetti = document.getElementById("confetti");


    /* ==========================================
       SET BIRTHDAY NAME
    ========================================== */

    if (birthdayName) {
        birthdayName.textContent = BIRTHDAY_NAME;
    }

    if (footerName) {
        footerName.textContent = MADE;
    }


    /* ==========================================
       CREATE STARS
    ========================================== */

    if (stars) {

        for (let i = 0; i < 130; i++) {

            const star = document.createElement("span");

            star.className = "star";

            star.style.left =
                Math.random() * 100 + "%";

            star.style.top =
                Math.random() * 100 + "%";

            const size =
                Math.random() * 3 + 1;

            star.style.width = size + "px";
            star.style.height = size + "px";

            star.style.animationDelay =
                Math.random() * 3 + "s";

            stars.appendChild(star);
        }
    }


    /* ==========================================
       CREATE BALLOONS
    ========================================== */

    const balloonColors = [
        "#ff4fb9",
        "#8b65ff",
        "#4bdcff",
        "#ffd45c",
        "#ff6c7a",
        "#72e8a0"
    ];

    if (balloons) {

        for (let i = 0; i < 16; i++) {

            const balloon =
                document.createElement("span");

            balloon.className = "balloon";

            balloon.style.left =
                Math.random() * 100 + "%";

            balloon.style.background =
                balloonColors[
                    Math.floor(
                        Math.random() *
                        balloonColors.length
                    )
                ];

            balloon.style.animationDuration =
                9 + Math.random() * 8 + "s";

            balloon.style.animationDelay =
                -(Math.random() * 12) + "s";

            balloons.appendChild(balloon);
        }
    }


    /* ==========================================
       CAKE ELEMENTS
    ========================================== */

    const pan =
        document.querySelector(".cake-pan");

    const bottomLayer =
        document.querySelector(".bottom-layer");

    const middleLayer =
        document.querySelector(".middle-layer");

    const topLayer =
        document.querySelector(".top-layer");

    const berries =
        document.querySelectorAll(".berry");

    const candles =
        document.querySelectorAll(".candle");

    const flames =
        document.querySelectorAll(".flame");

    const sparks =
        document.querySelectorAll(".spark");


    /* ==========================================
       RESET CAKE
    ========================================== */

    function resetCake() {

        if (pan) {

            pan.style.opacity = "0";

            pan.style.transform =
                "translateX(-50%) translateY(120px) scale(.6)";
        }

        if (bottomLayer) {

            bottomLayer.style.opacity = "0";

            bottomLayer.style.transform =
                "translateX(-50%) translateY(-150px) scale(.75) rotate(-6deg)";
        }

        if (middleLayer) {

            middleLayer.style.opacity = "0";

            middleLayer.style.transform =
                "translateX(-50%) translateY(-130px) scale(.7) rotate(6deg)";
        }

        if (topLayer) {

            topLayer.style.opacity = "0";

            topLayer.style.transform =
                "translateX(-50%) translateY(-150px) scale(.6) rotate(-6deg)";
        }

        berries.forEach(berry => {

            berry.style.opacity = "0";

        });

        candles.forEach(candle => {

            candle.style.opacity = "0";

        });

        flames.forEach(flame => {

            flame.style.opacity = "0";

        });

        sparks.forEach(spark => {

            spark.style.opacity = "0";

        });
    }


    /* ==========================================
       PAN ANIMATION
    ========================================== */

    function animatePan() {

        if (!pan) return;

        pan.animate(

            [
                {
                    opacity: 0,

                    transform:
                        "translateX(-50%) translateY(130px) scale(.5) rotate(-8deg)"
                },

                {
                    opacity: 1,

                    transform:
                        "translateX(-50%) translateY(-12px) scale(1.06) rotate(2deg)"
                },

                {
                    opacity: 1,

                    transform:
                        "translateX(-50%) translateY(0) scale(1) rotate(0)"
                }
            ],

            {
                duration: 900,

                fill: "forwards",

                easing:
                    "cubic-bezier(.16,1,.3,1)"
            }
        );
    }


    /* ==========================================
       BOTTOM CAKE LAYER
    ========================================== */

    function animateBottomLayer() {

        if (!bottomLayer) return;

        bottomLayer.animate(

            [
                {
                    opacity: 0,

                    transform:
                        "translateX(-50%) translateY(-160px) scale(.65) rotate(-8deg)"
                },

                {
                    opacity: 1,

                    transform:
                        "translateX(-50%) translateY(14px) scale(1.07) rotate(2deg)"
                },

                {
                    opacity: 1,

                    transform:
                        "translateX(-50%) translateY(-4px) scale(.98) rotate(-1deg)"
                },

                {
                    opacity: 1,

                    transform:
                        "translateX(-50%) translateY(0) scale(1) rotate(0)"
                }
            ],

            {
                duration: 950,

                fill: "forwards",

                easing:
                    "cubic-bezier(.16,1,.3,1)"
            }
        );
    }


    /* ==========================================
       MIDDLE CAKE LAYER
    ========================================== */

    function animateMiddleLayer() {

        if (!middleLayer) return;

        middleLayer.animate(

            [
                {
                    opacity: 0,

                    transform:
                        "translateX(-50%) translateY(-140px) scale(.65) rotate(7deg)"
                },

                {
                    opacity: 1,

                    transform:
                        "translateX(-50%) translateY(12px) scale(1.07) rotate(-2deg)"
                },

                {
                    opacity: 1,

                    transform:
                        "translateX(-50%) translateY(-3px) scale(.98) rotate(1deg)"
                },

                {
                    opacity: 1,

                    transform:
                        "translateX(-50%) translateY(0) scale(1) rotate(0)"
                }
            ],

            {
                duration: 900,

                fill: "forwards",

                easing:
                    "cubic-bezier(.16,1,.3,1)"
            }
        );
    }


    /* ==========================================
       TOP CAKE LAYER
    ========================================== */

    function animateTopLayer() {

        if (!topLayer) return;

        topLayer.animate(

            [
                {
                    opacity: 0,

                    transform:
                        "translateX(-50%) translateY(-150px) scale(.5) rotate(-8deg)"
                },

                {
                    opacity: 1,

                    transform:
                        "translateX(-50%) translateY(12px) scale(1.1) rotate(3deg)"
                },

                {
                    opacity: 1,

                    transform:
                        "translateX(-50%) translateY(-3px) scale(.98) rotate(-1deg)"
                },

                {
                    opacity: 1,

                    transform:
                        "translateX(-50%) translateY(0) scale(1) rotate(0)"
                }
            ],

            {
                duration: 900,

                fill: "forwards",

                easing:
                    "cubic-bezier(.16,1,.3,1)"
            }
        );
    }


    /* ==========================================
       STRAWBERRY / DECORATION ANIMATION
    ========================================== */

    function animateBerries() {

        berries.forEach((berry, index) => {

            berry.animate(

                [
                    {
                        opacity: 0,

                        transform:
                            "translateY(-40px) scale(.1) rotate(-30deg)"
                    },

                    {
                        opacity: 1,

                        transform:
                            "translateY(7px) scale(1.2) rotate(8deg)"
                    },

                    {
                        opacity: 1,

                        transform:
                            "translateY(0) scale(1) rotate(0)"
                    }
                ],

                {
                    duration: 650,

                    delay: index * 200,

                    fill: "forwards",

                    easing:
                        "cubic-bezier(.16,1,.3,1)"
                }
            );
        });
    }


    /* ==========================================
       CANDLE ANIMATION
    ========================================== */

    function animateCandles() {

        candles.forEach((candle, index) => {

            candle.animate(

                [
                    {
                        opacity: 0,

                        transform:
                            "translateY(70px) scale(.5)"
                    },

                    {
                        opacity: 1,

                        transform:
                            "translateY(-10px) scale(1.1)"
                    },

                    {
                        opacity: 1,

                        transform:
                            "translateY(0) scale(1)"
                    }
                ],

                {
                    duration: 650,

                    delay: index * 250,

                    fill: "forwards",

                    easing:
                        "cubic-bezier(.16,1,.3,1)"
                }
            );
        });
    }


    /* ==========================================
       LIGHT CANDLES
    ========================================== */

    function lightCandles() {

        flames.forEach((flame, index) => {

            setTimeout(() => {

                flame.animate(

                    [
                        {
                            opacity: 0,

                            transform:
                                "translateX(-50%) scale(.05)"
                        },

                        {
                            opacity: 1,

                            transform:
                                "translateX(-50%) scale(1.25)"
                        },

                        {
                            opacity: 1,

                            transform:
                                "translateX(-50%) scale(1)"
                        }
                    ],

                    {
                        duration: 550,

                        fill: "forwards",

                        easing: "ease-out"
                    }
                );

                flame.style.animation =
                    "flameFlicker .15s infinite alternate";

            }, index * 350);
        });
    }


    /* ==========================================
       MAGIC SPARKS
    ========================================== */

    function animateSparks() {

        sparks.forEach((spark, index) => {

            spark.animate(

                [
                    {
                        opacity: 0,

                        transform:
                            "scale(.1) rotate(0deg)"
                    },

                    {
                        opacity: 1,

                        transform:
                            "scale(1.5) rotate(90deg)"
                    },

                    {
                        opacity: .7,

                        transform:
                            "scale(1) rotate(180deg)"
                    }
                ],

                {
                    duration: 900,

                    delay: index * 160,

                    iterations: 2,

                    fill: "forwards",

                    easing: "ease-out"
                }
            );
        });
    }


    /* ==========================================
       CONFETTI
    ========================================== */

    function confettiBurst(amount = 180) {

        if (!confetti) return;

        const colors = [
            "#ff4fb9",
            "#8b65ff",
            "#4bdcff",
            "#ffd45c",
            "#ff6c7a",
            "#72e8a0"
        ];

        for (let i = 0; i < amount; i++) {

            const piece =
                document.createElement("span");

            piece.className =
                "confetti-piece";

            piece.style.left =
                Math.random() * 100 + "%";

            piece.style.background =
                colors[
                    Math.floor(
                        Math.random() *
                        colors.length
                    )
                ];

            piece.style.animationDuration =
                3 + Math.random() * 4 + "s";

            piece.style.animationDelay =
                Math.random() * .8 + "s";

            piece.style.transform =
                `rotate(${Math.random() * 360}deg)`;

            confetti.appendChild(piece);

            setTimeout(() => {

                piece.remove();

            }, 8000);
        }
    }


    /* ==========================================
       COMPLETE CAKE SHOW
    ========================================== */

    function buildCake() {

        resetCake();

        if (message) {

            message.textContent =
                "Preparing your birthday cake... ✨";
        }


        // 1. PAN

        setTimeout(() => {

            animatePan();

        }, 150);


        // 2. BOTTOM CAKE

        setTimeout(() => {

            animateBottomLayer();

        }, 800);


        // 3. MIDDLE CAKE

        setTimeout(() => {

            animateMiddleLayer();

        }, 1500);


        // 4. TOP CAKE

        setTimeout(() => {

            animateTopLayer();

        }, 2200);


        // 5. DECORATIONS

        setTimeout(() => {

            animateBerries();

        }, 2900);


        // 6. CANDLES

        setTimeout(() => {

            animateCandles();

        }, 3400);


        // 7. LIGHT CANDLES

        setTimeout(() => {

            lightCandles();

        }, 4100);


        // 8. MAGIC

        setTimeout(() => {

            animateSparks();

            confettiBurst(250);

            if (message) {

                message.textContent =
                    `✨ HAPPY BIRTHDAY, ${BIRTHDAY_NAME}! ✨`;
            }

        }, 5000);
    }


    /* ==========================================
       OPEN SURPRISE
    ========================================== */

    if (openBtn) {

        openBtn.addEventListener("click", () => {

            console.log("Birthday surprise opened!");

            // Hide opening screen

            if (opening) {

                opening.classList.add("hide");
            }


            // Show main birthday page

            if (app) {

                app.classList.remove("hidden");

                app.style.opacity = "1";

                app.style.visibility = "visible";

                app.style.pointerEvents = "auto";
            }


            // Start celebration

            confettiBurst(120);


            setTimeout(() => {

                buildCake();

            }, 500);

        });
    }


    /* ==========================================
       REPLAY BUTTON
    ========================================== */

    if (replayBtn) {

        replayBtn.addEventListener("click", () => {

            buildCake();

            confettiBurst(160);

        });
    }


    /* ==========================================
       MAKE A WISH
    ========================================== */

    if (wishBtn) {

        wishBtn.addEventListener("click", () => {

            if (message) {

                message.textContent =
                    `💫 Make a wish, ${BIRTHDAY_NAME}!`;
            }


            // Blow out candles

            flames.forEach((flame, index) => {

                setTimeout(() => {

                    flame.animate(

                        [
                            {
                                opacity: 1,

                                transform:
                                    "translateX(-50%) scale(1)"
                            },

                            {
                                opacity: 0,

                                transform:
                                    "translateX(-50%) scale(.05)"
                            }
                        ],

                        {
                            duration: 450,

                            fill: "forwards"
                        }
                    );

                }, index * 250);

            });


            // Confetti

            setTimeout(() => {

                confettiBurst(300);

            }, 600);


            // Relight candles

            setTimeout(() => {

                flames.forEach(flame => {

                    flame.style.opacity = "1";

                });

                lightCandles();

                if (message) {

                    message.textContent =
                        `✨ May your wish come true, ${BIRTHDAY_NAME}!`;

                }

            }, 4500);

        });
    }


    /* ==========================================
       SIMPLE BIRTHDAY SOUND
    ========================================== */

    let audioContext = null;

    let soundEnabled = false;

    let soundTimer = null;


    function playNote(
        frequency,
        startTime,
        duration
    ) {

        if (!audioContext) return;

        const oscillator =
            audioContext.createOscillator();

        const gain =
            audioContext.createGain();


        oscillator.type = "sine";

        oscillator.frequency.value =
            frequency;


        gain.gain.setValueAtTime(
            0.001,
            startTime
        );

        gain.gain.exponentialRampToValueAtTime(
            0.06,
            startTime + 0.03
        );

        gain.gain.exponentialRampToValueAtTime(
            0.001,
            startTime + duration
        );


        oscillator
            .connect(gain)
            .connect(
                audioContext.destination
            );


        oscillator.start(startTime);

        oscillator.stop(
            startTime +
            duration +
            0.05
        );
    }


    function birthdayJingle() {

        if (!soundEnabled) return;

        if (!audioContext) return;


        const now =
            audioContext.currentTime;


        const notes = [
            523.25,
            523.25,
            587.33,
            523.25,
            698.46,
            659.25
        ];


        notes.forEach((note, index) => {

            playNote(
                note,
                now + index * 0.28,
                0.24
            );

        });
    }


    if (soundBtn) {

        soundBtn.addEventListener(
            "click",
            async () => {

                soundEnabled =
                    !soundEnabled;


                if (soundEnabled) {

                    if (!audioContext) {

                        audioContext =
                            new (
                                window.AudioContext ||
                                window.webkitAudioContext
                            )();
                    }


                    if (
                        audioContext.state ===
                        "suspended"
                    ) {

                        await audioContext.resume();
                    }


                    soundBtn.textContent =
                        "♫ SOUND ON";


                    birthdayJingle();


                    soundTimer =
                        setInterval(
                            birthdayJingle,
                            6000
                        );

                } else {

                    soundBtn.textContent =
                        "♫ SOUND OFF";


                    clearInterval(
                        soundTimer
                    );
                }

            }
        );
    }


    /* ==========================================
       INITIALIZE
    ========================================== */

    resetCake();

    console.log(
        "🎂 Premium Birthday Website Loaded!"
    );

});