const btnStart = document.getElementById("start");
const btnPause = document.getElementById("pause");
const btnResume = document.getElementById("resume");
const btnRest = document.getElementById("rest");
const btnSkip = document.getElementById("skip");
const divKumato = document.getElementById("kumato");
const timer25 = 25;
const timerShortRest = 5;
// 'Not Started' 'Stopped' 'Running' 'Awaiting'
let timerStatus = "Not started";
// 'Not started' 'Working' 'Resting'
let kumatoStatus = "Not started";
let awaitingPlay = false;
let minutosRestantes = 0;
let segundosRestantes = 0;

const ocultarBtn = (boton) => {
  if (boton.classList.contains("fadeIn")) {
    boton.classList.remove("fadeIn");
    boton.classList.add("fadeOut");
  } else {
    boton.classList.add("fadeOut");
  }
};

const mostrarBtn = (boton) => {
  if (boton.classList.contains("fadeOut")) {
    boton.classList.remove("fadeOut");
    boton.classList.add("fadeIn");
  } else {
    boton.classList.add("fadeIn");
  }
};

const mostrarAccionesPorComenzar = () => {
  mostrarBtn(btnStart);
};

const mostrarAccionesTrabajando = () => {
  if (kumatoStatus == "Resting") {
    ocultarBtn(btnStart);
    ocultarBtn(btnResume);
    mostrarBtn(btnPause);
    ocultarBtn(btnRest);
  } else if (kumatoStatus == "Working") {
    ocultarBtn(btnStart);
    ocultarBtn(btnResume);
    mostrarBtn(btnPause);
    mostrarBtn(btnRest);
  }
};

const mostrarAccionesEsperando = () => {
  mostrarBtn(btnStart);
  ocultarBtn(btnResume);
  ocultarBtn(btnPause);
  ocultarBtn(btnRest);
};

const mostrarAccionesPausado = () => {
  ocultarBtn(btnPause);
  ocultarBtn(btnRest);
  mostrarBtn(btnResume);
};

const mostrarAccionesDescansando = () => {
  ocultarBtn(btnPause);
  ocultarBtn(btnRest);
  ocultarBtn(btnResume);
  mostrarBtn(btnSkip);
};

const ejecutarKumato = (timerElegido) => {
  if (kumatoStatus == "Not Started") {
    divKumato.classList.remove("not-started");
    divKumato.classList.add("running");
    minutosRestantes = timerElegido - 1;
    segundosRestantes = 60;
    timerStatus = "Running";
    kumatoStatus = "Working";
    mostrarAccionesTrabajando();
  } else if (awaitingPlay == true && kumatoStatus == "Resting") {
    awaitingPlay = false;
    divKumato.classList.remove("paused");
    divKumato.classList.add("running");
    mostrarAccionesDescansando();
  }
};

const pausarKumato = () => {
  timerStatus = "Stopped";
  divKumato.classList.remove("running");
  divKumato.classList.add("paused");
  mostrarAccionesPausado();
};

const reanudarKumato = () => {
  timerStatus = "Running";
  console.log(timerStatus);
  mostrarAccionesTrabajando();
};

const descansarKumato = () => {
  kumatoStatus = "Resting";
  minutosRestantes = timerShortRest - 1;
  segundosRestantes = 60;
  mostrarAccionesEsperando();
  divKumato.classList.remove("running");
  divKumato.classList.add("resting");
  awaitingPlay = true;
};

const saltearDescansoKumato = () => {
  kumatoStatus = "Working";
  minutosRestantes = timerElegido - 1;
  segundosRestantes = 60;
  mostrarAccionesTrabajando();
};

const mostrarTimer = () => {
  if (timerStatus === "Running") {
    if (minutosRestantes.toString().length === 1) {
      document.getElementById("minutos").innerHTML = "0" + minutosRestantes;
    } else {
      document.getElementById("minutos").innerHTML = minutosRestantes;
    }
    if (segundosRestantes.toString().length == 1) {
      document.getElementById("segundos").innerHTML = "0" + segundosRestantes;
    } else {
      document.getElementById("segundos").innerHTML = segundosRestantes;
    }
  }
};

var actualizarTimer = setInterval(function () {
  if (timerStatus === "Running" && awaitingPlay == false) {
    if (minutosRestantes > 0) {
      if (segundosRestantes > 0) {
        segundosRestantes--;
      } else {
        minutosRestantes--;
        segundosRestantes = 59;
      }
      mostrarTimer();
    }
  }
}, 1000);

btnStart.addEventListener("click", () => {
  ejecutarKumato(timer25);
});

btnPause.addEventListener("click", () => {
  pausarKumato();
});

btnResume.addEventListener("click", () => {
  reanudarKumato();
});

btnRest.addEventListener("click", () => {
  descansarKumato();
});

btnSkip.addEventListener("click", () => {
  saltearDescansoKumato();
});

mostrarAccionesPorComenzar();

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
