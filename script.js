/* =====================================================
   MILLIE'S BIRTHDAY WEBSITE
   COMPLETE JAVASCRIPT
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {


        /* =================================================
           NORMAL SCREEN NAVIGATION
        ================================================= */

        const screens =
            document.querySelectorAll(
                ".screen"
            );

        const progressDots =
            document.querySelectorAll(
                ".progress-dot"
            );


        function showScreen(
            screenId
        ) {

            screens.forEach(
                screen => {

                    screen.classList.remove(
                        "active"
                    );

                }
            );


            const target =
                document.getElementById(
                    screenId
                );


            if (!target) return;


            target.classList.add(
                "active"
            );


            updateProgress(
                screenId
            );


            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }


        function updateProgress(
            screenId
        ) {

            const screenOrder = [
                "home",
                "message",
                "photos",
                "song",
                "final"
            ];


            const index =
                screenOrder.indexOf(
                    screenId
                );


            progressDots.forEach(
                (dot, dotIndex) => {

                    dot.classList.toggle(
                        "active",
                        dotIndex <= index
                    );

                }
            );

        }


        /* =================================================
           NEXT BUTTONS
        ================================================= */

        document
            .querySelectorAll(
                ".next-btn"
            )
            .forEach(
                button => {

                    button.addEventListener(
                        "click",
                        () => {

                            const next =
                                button.dataset.next;

                            showScreen(
                                next
                            );

                        }
                    );

                }
            );


        /* =================================================
           SONG PLAYER
        ================================================= */

        const song =
            document.getElementById(
                "birthdaySong"
            );

        const playButton =
            document.getElementById(
                "playBtn"
            );

        const songStatus =
            document.getElementById(
                "songStatus"
            );


        if (
            song &&
            playButton
        ) {

            playButton.addEventListener(
                "click",
                async () => {

                    try {

                        if (
                            song.paused
                        ) {

                            await song.play();

                            playButton.textContent =
                                "❚❚";

                            if (
                                songStatus
                            ) {

                                songStatus.textContent =
                                    "Playing for you ❤️";

                            }

                        } else {

                            song.pause();

                            playButton.textContent =
                                "▶";

                            if (
                                songStatus
                            ) {

                                songStatus.textContent =
                                    "Paused";

                            }

                        }

                    } catch (error) {

                        console.error(
                            "Audio error:",
                            error
                        );

                        if (
                            songStatus
                        ) {

                            songStatus.textContent =
                                "Couldn't play the song. Check the MP3 filename.";

                        }

                    }

                }
            );


            song.addEventListener(
                "ended",
                () => {

                    playButton.textContent =
                        "▶";

                    if (
                        songStatus
                    ) {

                        songStatus.textContent =
                            "Until we meet. ❤️";

                    }

                }
            );

        }


        /* =================================================
           FINAL STAGE SYSTEM
        ================================================= */

        const stages =
            document.querySelectorAll(
                ".surprise-stage"
            );


        function showStage(
            stageNumber
        ) {

            stages.forEach(
                stage => {

                    stage.classList.remove(
                        "active"
                    );

                }
            );


            const stage =
                document.getElementById(
                    `stage${stageNumber}`
                );


            if (!stage) return;


            stage.classList.add(
                "active"
            );


            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }


        /* =================================================
           STAGE 1 — DRAG ROPE
        ================================================= */

        const rope =
            document.getElementById(
                "ropeHandle"
            );

        const message1 =
            document.getElementById(
                "message1"
            );


        let ropeDragging =
            false;

        let ropeStartY =
            0;

        let ropePulled =
            false;


        if (rope) {


            rope.addEventListener(
                "pointerdown",
                event => {

                    if (
                        ropePulled
                    ) return;


                    ropeDragging =
                        true;

                    ropeStartY =
                        event.clientY;


                    rope.setPointerCapture(
                        event.pointerId
                    );

                }
            );


            rope.addEventListener(
                "pointermove",
                event => {

                    if (
                        !ropeDragging ||
                        ropePulled
                    ) return;


                    let distance =
                        event.clientY -
                        ropeStartY;


                    distance =
                        Math.max(
                            0,
                            Math.min(
                                140,
                                distance
                            )
                        );


                    rope.style.transform =
                        `translateX(-50%) translateY(${distance}px)`;

                }
            );


            rope.addEventListener(
                "pointerup",
                event => {

                    if (
                        !ropeDragging
                    ) return;


                    ropeDragging =
                        false;


                    const distance =
                        event.clientY -
                        ropeStartY;


                    if (
                        distance >= 70
                    ) {

                        ropePulled =
                            true;


                        rope.style.transform =
                            "translateX(-50%) translateY(90px)";


                        createHeartBurst();


                        setTimeout(
                            () => {

                                if (
                                    message1
                                ) {

                                    message1.classList.add(
                                        "visible"
                                    );

                                }

                            },
                            450
                        );

                    } else {

                        rope.style.transform =
                            "translateX(-50%)";

                    }

                }
            );

        }


        /* =================================================
           GO TO BALLOON
        ================================================= */

        const toStage2 =
            document.getElementById(
                "toStage2"
            );


        if (toStage2) {

            toStage2.addEventListener(
                "click",
                () => {

                    showStage(2);

                }
            );

        }


        /* =================================================
           STAGE 2 — BALLOON
        ================================================= */

        const balloon =
            document.getElementById(
                "balloon"
            );

        const popText =
            document.getElementById(
                "popText"
            );

        const message2 =
            document.getElementById(
                "message2"
            );


        let balloonPopped =
            false;


        if (balloon) {

            balloon.addEventListener(
                "click",
                () => {

                    if (
                        balloonPopped
                    ) return;


                    balloonPopped =
                        true;


                    balloon.classList.add(
                        "popped"
                    );


                    if (
                        popText
                    ) {

                        popText.classList.add(
                            "show"
                        );

                    }


                    createConfetti();


                    setTimeout(
                        () => {

                            if (
                                message2
                            ) {

                                message2.classList.add(
                                    "visible"
                                );

                            }

                        },
                        550
                    );

                }
            );

        }


        /* =================================================
           GO TO CURTAINS
        ================================================= */

        const toStage3 =
            document.getElementById(
                "toStage3"
            );


        if (toStage3) {

            toStage3.addEventListener(
                "click",
                () => {

                    showStage(3);

                }
            );

        }


        /* =================================================
           STAGE 3 — CURTAINS
        ================================================= */

        const openCurtain =
            document.getElementById(
                "openCurtain"
            );

        const curtainStage =
            document.getElementById(
                "curtainStage"
            );

        const message3 =
            document.getElementById(
                "message3"
            );


        let curtainsOpened =
            false;


        if (openCurtain) {

            openCurtain.addEventListener(
                "click",
                () => {

                    if (
                        curtainsOpened
                    ) return;


                    curtainsOpened =
                        true;


                    curtainStage.classList.add(
                        "open"
                    );


                    openCurtain.textContent =
                        "Revealing... ❤️";


                    setTimeout(
                        () => {

                            message3.classList.add(
                                "visible"
                            );


                            openCurtain.style.display =
                                "none";


                            createHeartBurst();

                        },
                        1200
                    );

                }
            );

        }


        /* =================================================
           GO TO HEART DOOR
        ================================================= */

        const toStage4 =
            document.getElementById(
                "toStage4"
            );


        if (toStage4) {

            toStage4.addEventListener(
                "click",
                () => {

                    showStage(4);

                }
            );

        }


        /* =================================================
           STAGE 4 — HEART DOOR
        ================================================= */

        const heartDoor =
            document.getElementById(
                "heartDoor"
            );

        const finalMessage =
            document.getElementById(
                "finalMessage"
            );


        let doorOpened =
            false;


        if (heartDoor) {

            heartDoor.addEventListener(
                "click",
                () => {

                    if (
                        doorOpened
                    ) return;


                    doorOpened =
                        true;


                    heartDoor.classList.add(
                        "open"
                    );


                    createHeartBurst();


                    setTimeout(
                        () => {

                            finalMessage.classList.add(
                                "show"
                            );


                            finalMessage.scrollIntoView({
                                behavior: "smooth",
                                block: "center"
                            });


                            createFloatingHearts();

                        },
                        1300
                    );

                }
            );

        }


        /* =================================================
           FINAL PLAY BUTTON
        ================================================= */

        const finalPlay =
            document.getElementById(
                "finalPlay"
            );

        const giftStatus =
            document.getElementById(
                "giftStatus"
            );


        if (
            finalPlay &&
            song
        ) {

            finalPlay.addEventListener(
                "click",
                async () => {

                    try {

                        if (
                            song.paused
                        ) {

                            await song.play();

                            finalPlay.textContent =
                                "❚❚";


                            if (
                                giftStatus
                            ) {

                                giftStatus.textContent =
                                    "Playing something I made for you. ❤️";

                            }

                        } else {

                            song.pause();

                            finalPlay.textContent =
                                "▶";


                            if (
                                giftStatus
                            ) {

                                giftStatus.textContent =
                                    "Paused";

                            }

                        }

                    } catch (
                        error
                    ) {

                        console.error(
                            error
                        );

                        if (
                            giftStatus
                        ) {

                            giftStatus.textContent =
                                "Check that your MP3 is named millie-song.mp3";

                        }

                    }

                }
            );

        }


        /* =================================================
           HEART BURST
        ================================================= */

        function createHeartBurst() {

            for (
                let i = 0;
                i < 30;
                i++
            ) {

                const heart =
                    document.createElement(
                        "div"
                    );


                heart.textContent =
                    ["♥", "♡", "❤️", "✨"][
                        Math.floor(
                            Math.random() * 4
                        )
                    ];


                heart.style.position =
                    "fixed";


                heart.style.left =
                    "50%";


                heart.style.top =
                    "50%";


                heart.style.zIndex =
                    "9999";


                heart.style.pointerEvents =
                    "none";


                heart.style.fontSize =
                    `${12 + Math.random() * 20}px`;


                heart.style.color =
                    "#ff5d8b";


                document.body.appendChild(
                    heart
                );


                const angle =
                    Math.random() *
                    Math.PI *
                    2;


                const distance =
                    120 +
                    Math.random() *
                    280;


                const x =
                    Math.cos(angle) *
                    distance;


                const y =
                    Math.sin(angle) *
                    distance;


                heart.animate(
                    [
                        {
                            transform:
                                "translate(-50%, -50%) scale(0)",

                            opacity: 1
                        },

                        {
                            transform:
                                `translate(${x}px, ${y}px) scale(1.2)`,

                            opacity: 0
                        }
                    ],
                    {
                        duration:
                            900 +
                            Math.random() *
                            700,

                        easing:
                            "cubic-bezier(.2,.8,.3,1)"
                    }
                );


                setTimeout(
                    () => {

                        heart.remove();

                    },
                    1800
                );

            }

        }


        /* =================================================
           CONFETTI
        ================================================= */

        function createConfetti() {

            const symbols = [
                "❤️",
                "💕",
                "✨",
                "💗",
                "♡"
            ];


            for (
                let i = 0;
                i < 40;
                i++
            ) {

                const piece =
                    document.createElement(
                        "div"
                    );


                piece.textContent =
                    symbols[
                        Math.floor(
                            Math.random() *
                            symbols.length
                        )
                    ];


                piece.style.position =
                    "fixed";


                piece.style.left =
                    "50%";


                piece.style.top =
                    "50%";


                piece.style.zIndex =
                    "9999";


                piece.style.pointerEvents =
                    "none";


                piece.style.fontSize =
                    `${12 + Math.random() * 18}px`;


                document.body.appendChild(
                    piece
                );


                const angle =
                    Math.random() *
                    Math.PI *
                    2;


                const distance =
                    100 +
                    Math.random() *
                    350;


                const x =
                    Math.cos(angle) *
                    distance;


                const y =
                    Math.sin(angle) *
                    distance;


                piece.animate(
                    [
                        {
                            transform:
                                "translate(-50%, -50%) scale(0)",

                            opacity: 1
                        },

                        {
                            transform:
                                `translate(${x}px, ${y}px) scale(1)`,

                            opacity: 0
                        }
                    ],
                    {
                        duration:
                            900 +
                            Math.random() *
                            900,

                        easing:
                            "cubic-bezier(.2,.8,.3,1)"
                    }
                );


                setTimeout(
                    () => {

                        piece.remove();

                    },
                    2000
                );

            }

        }


        /* =================================================
           FLOATING HEARTS — FINAL REVEAL
        ================================================= */

        function createFloatingHearts() {

            for (
                let i = 0;
                i < 20;
                i++
            ) {

                const heart =
                    document.createElement(
                        "div"
                    );


                heart.textContent =
                    "♥";


                heart.style.position =
                    "fixed";


                heart.style.left =
                    `${Math.random() * 100}vw`;


                heart.style.bottom =
                    "-30px";


                heart.style.zIndex =
                    "9998";


                heart.style.pointerEvents =
                    "none";


                heart.style.color =
                    "#ff5d8b";


                heart.style.opacity =
                    "0.5";


                heart.style.fontSize =
                    `${10 + Math.random() * 20}px`;


                document.body.appendChild(
                    heart
                );


                const duration =
                    4000 +
                    Math.random() *
                    4000;


                heart.animate(
                    [
                        {
                            transform:
                                "translateY(0) rotate(0deg)",

                            opacity: 0
                        },

                        {
                            transform:
                                `translateY(-100vh) rotate(${Math.random() * 360}deg)`,

                            opacity: 0.7
                        },

                        {
                            transform:
                                `translateY(-120vh) rotate(${Math.random() * 720}deg)`,

                            opacity: 0
                        }
                    ],
                    {
                        duration,
                        easing: "ease-out"
                    }
                );


                setTimeout(
                    () => {

                        heart.remove();

                    },
                    duration
                );

            }

        }

    }
);