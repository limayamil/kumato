const btnStart = document.getElementById("start");
const btnPause = document.getElementById("pause");
const btnResume = document.getElementById("resume");
const btnRest = document.getElementById("rest");
const btnSkip = document.getElementById("skip");
const divKumato = document.getElementById("kumato");
const timer25 = 0;
const timerShortRest = 5;
const segundos = 60;

class kumatoTimer {
  constructor(status, timerStatus, esperandoPlay = false, minutosRestantes, segundosRestantes) {
    this._status = status;
    this._timerStatus = timerStatus;
    this._esperandoPlay = esperandoPlay;
    this._minutosRestantes = minutosRestantes;
    this._segundosRestantes = segundosRestantes;
  }

  inicializar(){
    this._status = "Working";
    this._timerStatus = "Running";
    this._esperandoPlay = true;
    this._minutosRestantes = timer25;
    this._segundosRestantes = segundos;
  }

  ejecutar(){
    if (this._status == "Working") {
      // Si Kumato se inicia por primera vez en la sesión.
      this._timerStatus = "Running";
      console.log('Ejecutando Kumato');
      console.log(this._status);
      divKumato.classList.remove("not-started");
      divKumato.classList.add("running");
      mostrarAccionesTrabajando();
    } else if (this._status == "Resting") {
      // Si un nuevo Kumato comienza luego de descansar.
      console.log("Ejecutar");
      this._timerStatus = "Running";
      this._esperandoPlay = false;
      divKumato.classList.remove("paused");
      divKumato.classList.add("running");
      mostrarAccionesDescansando();
    }
  }

  pausar(){
    this._timerStatus = "Stopped";
    divKumato.classList.remove("running");
    divKumato.classList.add("paused");
    mostrarAccionesPausado();
  }

  reanudar(){
    console.log("Estado actual: " + this._status);
    this._timerStatus = "Running";
    divKumato.classList.remove("paused");
    divKumato.classList.add("running");
    if (this._status == "Working"){
      mostrarAccionesTrabajando();
    } else if (this._status == "Resting") {
      mostrarAccionesDescansando();
    }
  }

  descansar(){
    this._status = "Resting";
    this._timerStatus = "Stopped";
    this._esperandoPlay = true;
    this._minutosRestantes = timerShortRest;
    this._segundosRestantes = 0;
    console.log(this._minutosRestantes);
    console.log(this._segundosRestantes);
    mostrarAccionesEsperando();
    this.mostrarTimer();
    divKumato.classList.remove("running");
    divKumato.classList.add("resting");
  }

  saltearDescanso(){
    this.status = "Working";
    minutosRestantes = timerElegido - 1;
    segundosRestantes = segundos;
    mostrarAccionesTrabajando();
  }

  mostrarTimer(){
    if (this._status == "Working" || this._status == "Resting") {
      if (this._minutosRestantes.toString().length === 1) {
        document.getElementById("minutos").innerHTML = "0" + this._minutosRestantes;
      } else {
        document.getElementById("minutos").innerHTML = this._minutosRestantes;
      }
      if (this._segundosRestantes.toString().length == 1) {
        document.getElementById("segundos").innerHTML = "0" + this._segundosRestantes;
      } else {
        document.getElementById("segundos").innerHTML = this._segundosRestantes;
      }
    }
  }
}


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
  if (kumato._status == "Resting") {
    ocultarBtn(btnStart);
    ocultarBtn(btnResume);
    mostrarBtn(btnPause);
    ocultarBtn(btnRest);
  } else if (kumato._status == "Working") {
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
  ocultarBtn(btnRest);
  ocultarBtn(btnResume);
  ocultarBtn(btnStart);
  mostrarBtn(btnPause);
  mostrarBtn(btnSkip);
};

var actualizarTimer = setInterval(function () {
  if (kumato._timerStatus == "Running" && kumato._esperandoPlay == false) {
    console.log('Kumato is ticking');
    if (kumato._minutosRestantes > 0 || kumato._segundosRestantes > 0) {
      if (kumato._segundosRestantes > 0) {
        kumato._segundosRestantes--;
      } else {
        kumato._minutosRestantes--;
        kumato._segundosRestantes = segundos - 1;
      }
      kumato.mostrarTimer();
    } else {
      if (kumato._status == "Working"){
        kumato.descansar();
      } else if (kumato._status == "Resting"){
        kumato.ejecutar();
      }
    }
  }
}, 1000);

btnStart.addEventListener("click", () => {
  kumato.ejecutar();
});

btnPause.addEventListener("click", () => {
  kumato.pausar();
});

btnResume.addEventListener("click", () => {
  kumato.reanudar();
});

btnRest.addEventListener("click", () => {
  kumato.descansar();
});

btnSkip.addEventListener("click", () => {
  kumato.saltearDescanso();
});

mostrarAccionesPorComenzar();
var kumato = new kumatoTimer("Working", "Not Started", false, timer25, segundos)