const pageName = document.title
console.log(pageName);

if (pageName == "[[TAXI]]") {
    
    function getTaxiData() {
        fetch(`taxi.json`)
        .then(Response => Response.json())
        .then(data => {
            const indexPerson = Math.floor(Math.random() * data.person.length);
            const indexLocation = Math.floor(Math.random() * data.location.length);

            document.getElementById("outputPerson").innerText = `Osoba: ${data.person[indexPerson]}`;
            document.getElementById("outputLocation").innerText = `Místo: ${data.location[indexLocation]}`;

            timerStop();
            timerBegin();
            
            timerButton.innerText = "⏸️";

            timer = 0;
            outputTimer.innerText = `zbývá: ${maxTime - timer}s`;
        });
    }

    getTaxiData();

    let timer = 0;
    let maxTime = 90;
    const outputTimer = document.getElementById("outputTimer");
    outputTimer.innerText = `zbývá: ${maxTime - timer}s`;

    timerInterval = setInterval(timerIntervalFunction, 1000);
    function timerIntervalFunction() {
        timer++;
        if (timer >= maxTime) {
            getTaxiData();
            timer = 0;
        }
        outputTimer.innerText = `zbývá: ${maxTime - timer}s`;
        timerBegin();
    }

    function timerBegin() {
        if (timerInterval == null) {
            timerInterval = setInterval(timerIntervalFunction, 1000);
        }
    }
    function timerStop() {
        clearInterval(timerInterval);
        timerInterval = null;
        outputTimer.innerText = `zbývá: ${maxTime - timer}s`;
    }

    function maxTimeChange() {
        const maxTimeInput = document.getElementById("maxTimeInput");
        const newMaxTime = parseInt(maxTimeInput.value);
        if (isNaN(newMaxTime)) {
            alert("Zadejte číslo.");
            return;
        }
        if (newMaxTime < 10) {
            alert("Maximální čas musí být větší nebo roven 10 sekundám.");
            return;
        } else if (newMaxTime > 180) {
            alert("Maximální čas musí být menší nebo roven 180 sekundám.");
            return;
        } else {
            maxTime = newMaxTime; 
        }
        getTaxiData();
        maxTimeInput.placeholder = `${maxTime}s`;
    }

    const timerButton = document.getElementById("timerButton");
    timerButton.addEventListener("click", () => {
        if (timerInterval == null) {
            timerBegin();
            timerButton.innerText = "⏸️";
        } else {
            timerStop();
            timerButton.innerText = "▶️";
        }
    });

    const perCheck_Realne = document.getElementById("perCheck_Realne");
    const perCheckDropdown1 = document.getElementById("perCheckDropdown1");
    const perCheck_Fiktivni = document.getElementById("perCheck_Fiktivni");
    const perCheckDropdown2 = document.getElementById("perCheckDropdown2");

    function dropdownVisiual(element, doShow) {
        if (doShow) {
            element.style.opacity = "1";
            element.style.zIndex = "10";
            element.style.transform = "translateY(0px)";
        } else {
            element.style.opacity = "0";
            element.style.zIndex = "-1";
            element.style.transform = "translateY(-50px)";
        }
    }

    perCheck_Realne.addEventListener("click", () => {
        if (perCheck_Realne.checked) {
            perCheckDropdown1.style.display = "block";
        } else {
            perCheckDropdown1.style.display = "none";
            dropdownVisiual(perCheckDropdown1Content, false);
        }
    });
    const perCheckDropdown1Content = document.getElementById("perCheckDropdown1Content");
    perCheckDropdown1.addEventListener("click", () => {
        if (perCheckDropdown1Content.style.opacity == "0" || perCheckDropdown1Content.style.opacity == "") {
            dropdownVisiual(perCheckDropdown1Content, true);
            dropdownVisiual(perCheckDropdown2Content, false);
        } else if (perCheckDropdown1Content.style.opacity == "1") {
            dropdownVisiual(perCheckDropdown1Content, false);
        }
    });

    perCheck_Fiktivni.addEventListener("click", () => {
        if (perCheck_Fiktivni.checked) {
            perCheckDropdown2.style.display = "block";
        } else {
            perCheckDropdown2.style.display = "none";
            dropdownVisiual(perCheckDropdown2Content, false);
        }
    });
    const perCheckDropdown2Content = document.getElementById("perCheckDropdown2Content");
    perCheckDropdown2.addEventListener("click", () => {
        if (perCheckDropdown2Content.style.opacity == "0" || perCheckDropdown2Content.style.opacity == "") {
            dropdownVisiual(perCheckDropdown2Content, true);
            dropdownVisiual(perCheckDropdown1Content, false);
        } else if (perCheckDropdown2Content.style.opacity == "1") {
            dropdownVisiual(perCheckDropdown2Content, false);
        }
    });

    const winScreen = document.getElementById("winScreen");
    function win() {
        winScreen.style.opacity = "1";
        winScreen.style.zIndex = "100";
        timerStop();
    }
    function newRound() {
        winScreen.style.opacity = "0";
        winScreen.style.zIndex = "-100";
        getTaxiData();
    }

    document.addEventListener('keydown', (event) => {
        if (event.code === 'Space') {
            getTaxiData();
        }
    });
}



else if (pageName == "[[POZNEJ PISEN]]") {
    function getSongData() {
        fetch(`song.json`)
        .then(Response => Response.json())
        .then(data => {
            const indexSong = Math.floor(Math.random() * data.song.length);

            document.getElementById("outputSong").innerText = `Píseň: ${data.song[indexSong].title}`;
            document.getElementById("outputArtist").innerText = `Od: ${data.song[indexSong].artist}`;

            console.log(data)
        });
    }

    getSongData();

    const winScreen = document.getElementById("winScreen");
    function win() {
        winScreen.style.opacity = "1";
        winScreen.style.zIndex = "100";
        timerStop();
    }
    function newRound() {
        winScreen.style.opacity = "0";
        winScreen.style.zIndex = "-100";
        getSongData();
    }

    document.addEventListener('keydown', (event) => {
        if (event.code === 'Space') {
            getSongData();
        }
    });
}

else if (pageName == "[[MISTRI ZVUKU]]") {
    function getSoundData() {
        fetch(`sound.json`)
        .then(Response => Response.json())
        .then(data => {
            const indexSound = Math.floor(Math.random() * data.sounds.length);

            document.getElementById("outputSound").innerText = `Předveď zvuk: ${data.sounds[indexSound]}`;
        });
    }

    getSoundData();

    const winScreen = document.getElementById("winScreen");
    function win() {
        winScreen.style.opacity = "1";
        winScreen.style.zIndex = "100";
        timerStop();
    }
    function newRound() {
        winScreen.style.opacity = "0";
        winScreen.style.zIndex = "-100";
        getSoundData();
    }

    document.addEventListener('keydown', (event) => {
        if (event.code === 'Space') {
            getSoundData();
        }
    });
}


function goTo(page) {
    window.location.href = `${page}.html`;
}

