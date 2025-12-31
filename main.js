const pageName = document.title
console.log(pageName);

const main = document.getElementsByClassName("main")[0];

if (pageName == "[[TAXI]]") {
    
    function getTaxiData() {
        fetch(`taxi.json`)
        .then(Response => Response.json())
        .then(data => {
            const indexPerson = Math.floor(Math.random() * data.person.length);
            const indexLocation = Math.floor(Math.random() * data.location.length);

            document.getElementById("outputPerson").innerText = `${data.person[indexPerson]}`;
            document.getElementById("outputLocation").innerText = `${data.location[indexLocation]}`;

            outputTimer.innerText = `zbývá: ${maxTime - timer}s`;
        });
    }

    getTaxiData();

    let timer = 0;
    let maxTime = 120;
    const outputTimer = document.getElementById("outputTimer");
    outputTimer.innerText = `zbývá: ${maxTime - timer}s`;

    timerInterval = setInterval(timerIntervalFunction, 1000);
    function timerIntervalFunction() {
        timer++;
        console.log(timer);
        if (timer >= maxTime) {
            timer = maxTime;
            lose();
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
        timer = 0;
        outputTimer.innerText = `zbývá: ${maxTime - timer}s`;
        timerStop();
        timerBegin();
        maxTimeInput.placeholder = `${maxTime}s`;
    }

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
    const winText = document.getElementById("winText");
    function win() {
        winScreen.style.opacity = "1";
        winScreen.style.zIndex = "100";
        timerStop();
        winText.innerText = 'Vyhrál jsi!';
    }
    function newRound() {
        winScreen.style.opacity = "0";
        winScreen.style.zIndex = "-100";
        timer = 0;
        getTaxiData();
        timerBegin();
    }
    function lose() {
        winScreen.style.opacity = "1";
        winScreen.style.zIndex = "100";
        timerStop();
        winText.innerText = 'Čas vypršel!';
    }

    document.addEventListener('keydown', (event) => {
        
        if (event.code === 'Space') {/*
            if (timerInterval == null) {
                timerBegin();
            } else {
                timerStop();
            }*/
            getTaxiData();
            const buttonDalsi = document.getElementById("buttonDalsi");
            buttonDalsi.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
            buttonDalsi.style.boxShadow = "0 0 5px rgb(255, 255, 255)";
            buttonDalsi.style.textShadow = "0 0 0";
            buttonDalsi.style.borderRadius = "0px";
        } 
    });
    document.addEventListener('keyup', (event) => {
        if (event.code === 'Space') {
            const buttonDalsi = document.getElementById("buttonDalsi");
            buttonDalsi.style.backgroundColor = "rgba(255, 255, 255, 0)";
            buttonDalsi.style.boxShadow = "0 0 5px rgba(255, 255, 255, 0.3)";
            buttonDalsi.style.borderRadius = "4px";
            buttonDalsi.style.textShadow = "0 0 5px rgb(255, 255, 255), 0 0 7px rgb(255, 255, 255)";
        }
    });
}



else if (pageName == "[[MISTRI ZVUKU]]") {

    main.style.height = "60vh";
    let checkArray = [];
    createCheckArray();

    function createCheckArray() {
        fetch(`sound.json`)
        .then(Response => Response.json())
        .then(data => {
            checkArray = new Array(data.sounds.length).fill(false);
        });
    }

    function getSoundData() {
        fetch(`sound.json`)
        .then(Response => Response.json())
        .then(data => {

            let going = true;
            let indexSound = 0;

            if (checkArray.every(element => element == true)) {
                checkArray = new Array(data.sounds.length).fill(false);
            }

            while (going) {
                indexSound = Math.floor(Math.random() * data.sounds.length);
                if (checkArray[indexSound] == false) {
                    checkArray[indexSound] = true;
                    going = false;
                    break;
                }
            }

            document.getElementById("outputSound").innerText = `${data.sounds[indexSound]}`;
            console.log(checkArray);
        });
    }

    getSoundData();

    const winScreen = document.getElementById("winScreen");
    function win() {
        winScreen.style.opacity = "1";
        winScreen.style.zIndex = "100";
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



else if (pageName == "[[POZNEJ PISEN]]") {

    let checkArray = [];
    createCheckArray();

    function createCheckArray() {
        fetch(`song.json`)
        .then(Response => Response.json())
        .then(data => {
            checkArray = new Array(data.song.length).fill(false);
        });
    }

    function getSongData() {
        fetch(`song.json`)
        .then(Response => Response.json())
        .then(data => {

            let going = true;
            let indexSong = 0;

            if (checkArray.every(element => element == true)) {
                checkArray = new Array(data.song.length).fill(false);
            }

            while (going) {
                indexSong = Math.floor(Math.random() * data.song.length);
                if (checkArray[indexSong] == false) {
                    checkArray[indexSong] = true;
                    going = false;
                    break;
                }
            }

            document.getElementById("outputSong").innerText = `${data.song[indexSong].title}`;
            document.getElementById("outputArtist").innerText = `${data.song[indexSong].artist}`;

        });
    }

    getSongData();

    const winScreen = document.getElementById("winScreen");
    function win() {
        winScreen.style.opacity = "1";
        winScreen.style.zIndex = "100";
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


function goTo(page) {
    window.location.href = `${page}.html`;
}

