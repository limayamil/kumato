const btnStart = document.getElementById("start");
const btnPause = document.getElementById("pause");
const btnResume = document.getElementById("resume");
const btnRest = document.getElementById("rest");
const btnSkip = document.getElementById("skip");
const divKumato = document.getElementById("kumato");
let inputTaskValue = "";
const inputTask = document.getElementById("task");
const taskList = document.getElementById("taskList");
let listOfTasks = [];
let listOfTimes = [];
const timer25 = 25;
const timerShortRest = 5;
const segundos = 0;

class kumatoTimer {
  constructor(status, timerStatus, esperandoPlay, minutosRestantes,
    segundosRestantes, kumatoCompleto = false, cicloCompleto = false,
    sesionCompleta = false) {
    this._status = status;
    this._timerStatus = timerStatus;
    this._esperandoPlay = esperandoPlay;
    this._minutosRestantes = minutosRestantes;
    this._segundosRestantes = segundosRestantes;
    this._kumatoCompleto = kumatoCompleto;
    this._cicloCompleto = cicloCompleto;
    this._sesionCompleta = sesionCompleta;
  }

  reiniciar(){
    this._status = "Working";
    this._timerStatus = "Running";
    this._esperandoPlay = true;
    this._minutosRestantes = timer25;
    this._segundosRestantes = 0;
    this.mostrarTimer();
  }

  ejecutar(){
    if (this._cicloCompleto != true){
      if (this._status == "Working") {
        // Si Kumato se inicia por primera vez en la sesión.
        inputTaskValue = document.getElementById("task").value;
        if (inputTaskValue.length > 0) {
          logNewTask(inputTaskValue);
        }
        inputTask.classList.add("fadeOut");
        this._timerStatus = "Running";
        console.log('Ejecutando Kumato');
        console.log(this._status);
        divKumato.classList.remove("not-started");
        divKumato.classList.add("running");
        mostrarAccionesTrabajando();
      } else if (this._status == "Resting") {
        // Si un nuevo Kumato comienza luego de descansar.
        this._timerStatus = "Running";
        this._esperandoPlay = false;
        divKumato.classList.remove("paused");
        divKumato.classList.add("running");
        mostrarAccionesDescansando();
        }
      } else {
        // Si se comienza un nuevo Kumato luego de terminar un ciclo.
        inputTaskValue = document.getElementById("task").value;
        if (inputTaskValue.length > 0) {
          logNewTask(inputTaskValue);
        }
        this._cicloCompleto = false;
        this._esperandoPlay = false;
        inputTask.classList.add("fadeOut");
        this._timerStatus = "Running";
        console.log('Ejecutando Kumato');
        console.log(this._status);
        divKumato.classList.remove("not-started");
        divKumato.classList.add("running");

        console.log(this._status);
        console.log(this._timerStatus);

        inputTask.classList.remove("fadeIn");
        inputTask.classList.add("fadeOut");
        mostrarAccionesTrabajando();
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

  comienzoNuevoCiclo(){
    this.status = "Working";
    this._cicloCompleto = true;
    this.reiniciar();
    mostrarAccionesPorComenzar();
    logEndTask();
    inputTask.value = "";
    inputTask.classList.remove("fadeOut");
    inputTask.classList.add("fadeIn");
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

const ocultarTodo = () => {
  ocultarBtn(btnStart);
  ocultarBtn(btnResume);
  ocultarBtn(btnPause);
  ocultarBtn(btnSkip);
  ocultarBtn(btnRest);
}

const mostrarAccionesPorComenzar = () => {
  ocultarTodo();
  mostrarBtn(btnStart);
};

const mostrarAccionesTrabajando = () => {
  if (kumato._status == "Resting") {
    ocultarTodo();
    mostrarBtn(btnPause);
  } else if (kumato._status == "Working") {
    ocultarTodo();
    mostrarBtn(btnPause);
    mostrarBtn(btnRest);
  }
};

const mostrarAccionesEsperando = () => {
  ocultarTodo();
  mostrarBtn(btnStart);
};

const mostrarAccionesPausado = () => {
  ocultarTodo();
  mostrarBtn(btnResume);
};

const mostrarAccionesDescansando = () => {  
  ocultarTodo();
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
        kumato._segundosRestantes = 60 - 1;
      }
      kumato.mostrarTimer();
    } else {
      if (kumato._status == "Working"){
        kumato.descansar();
      } else if (kumato._status == "Resting"){
        kumato.comienzoNuevoCiclo();
      }
    }
  }
}, 1000);

const logNewTask = task => {
  listOfTasks.push(task);
  let d = new Date();
  let h = d.getHours();
  let m = (d.getMinutes()<10?'0':'') + d.getMinutes();
  let hm = h + ":" + m;
  listOfTimes.push(hm);
  taskList.innerHTML += '<div class="taskRow"><div class="taskName">'+ task +'</div><div class="taskTime">empezado a las ' + hm + '</div></div>';
}

const logEndTask = () => {
  listOfTasks.push("Fin de la tarea");
  let d = new Date();
  let h = d.getHours();
  let m = (d.getMinutes()<10?'0':'') + d.getMinutes();
  let hm = h + ":" + m;
  taskList.innerHTML += '<div class="taskRow"><div class="taskName">Fin de la tarea</div><div class="taskTime">a las ' + hm + '</div></div>';
}

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
  kumato.comienzoNuevoCiclo();
});

mostrarAccionesPorComenzar();
var kumato = new kumatoTimer("Working", "Not Started", false, timer25, segundos)