const btnStart = document.getElementById("start");
const btnPause = document.getElementById("pause");
const btnResume = document.getElementById("resume");
const divKumato = document.getElementById("kumato");
const timer25 = 25;
// 'Not Started' 'Stopped' 'Running'
let timerStatus = 'Not started';
let minutosRestantes = 0;
let segundosRestantes = 0;

const ejecutarKumato = timerElegido => {
    divKumato.classList.remove("not-started");
    divKumato.classList.add("running");
    btnStart.classList.add("fadeOut");
    btnPause.classList.add("fadeIn");
    minutosRestantes = timerElegido - 1;
    segundosRestantes = 60;
    timerStatus = 'Running';
    
}

const pausarKumato = () => {
    timerStatus = 'Stopped';
    btnPause.classList.remove("fadeIn");
    btnPause.classList.add("fadeOut");
    btnResume.classList.add("fadeIn");
    btnResume.classList.remove("fadeOut");
    divKumato.classList.remove("running");
    divKumato.classList.add("paused");
}

const reanudarKumato = () => {
    timerStatus = 'Running';
    console.log(timerStatus);
    btnPause.classList.remove("fadeOut");
    btnPause.classList.add("fadeIn");
    btnResume.classList.add("fadeOut");
}

const mostrarTimer = () => {
    if (timerStatus === "Running"){
        if(minutosRestantes.toString().length === 1){
            document.getElementById("minutos").innerHTML = '0' + minutosRestantes;
        } else {
            document.getElementById("minutos").innerHTML = minutosRestantes;
        }
        if(segundosRestantes.toString().length == 1){
            
            document.getElementById("segundos").innerHTML = '0' + segundosRestantes;
        } else {
            document.getElementById("segundos").innerHTML = segundosRestantes;
        }
    }
}

var actualizarTimer = 
    setInterval(function(){
        if (timerStatus === "Running"){
            if (minutosRestantes > 0){
                if (segundosRestantes > 0){
                    segundosRestantes--;
                } else {
                    minutosRestantes--;
                    segundosRestantes = 59;
                }
                mostrarTimer();
            }
        }
    },
        1000);

btnStart.addEventListener("click", () => {
    ejecutarKumato(timer25);
});

btnPause.addEventListener("click", () => {
    pausarKumato();
});

btnResume.addEventListener("click", () => {
    reanudarKumato();
});

//ejecutarKumato(timer25);
/*
for(let m = timerElegido; m >= 0; m--){
        for(let s = 60; s >= 0; s--){
            console.log(s);
            document.getElementById("segundos").innerHTML = s;
        }
        document.getElementById("minutos").innerHTML = m;
    }
    */