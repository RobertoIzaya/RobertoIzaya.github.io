// inicializacion de variables
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let acierto = 0;
let temporizador = false;
let timer = 30;
let tiempoRegresivoId = null;
let timerInicial = 30;


//apuntando al elemnto html
let mostrarMovimientos = document.getElementById('movimientos');
let mostrarAciertos = document.getElementById('acierto');
let mostrarTiempo = document.getElementById('tiempo');

//generacion de numeros aleatorios
let numbers = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numbers = numbers.sort(()=> {return Math.random()-0.5});
console.log(numbers);

//funcionas
function contarTiempo(){
   tiempoRegresivoId = setInterval(()=>{
        timer--;
        mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
     if (timer == 0){
     clearInterval(tiempoRegresivoId);
     bloquearTarjetas();
     var modal2 = document.getElementById("mi-modal2");
     modal2.style.display = "block";
     var botonCerrar = document.getElementById("cerrarModal2");
     botonCerrar.addEventListener("click", () => {
             modal2.style.display = "none";
         });
     end.play()
    }
    },1000);
}

function bloquearTarjetas(){
    for (let i = 0; i<=15; i++){
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = numbers[i];
        tarjetaBloqueada.disabled = true;
    }
}

// principal function
function destapar(id){

    if (temporizador == false){
        contarTiempo();
        temporizador = true;
    }

    tarjetasDestapadas++;
    console.log(tarjetasDestapadas);

    if (tarjetasDestapadas == 1){
        //mostrar primer numero
        tarjeta1 = document.getElementById(id);
        primerResultado = numbers[id]
        tarjeta1.innerHTML = primerResultado;

        //deshabilitar primer boton
        tarjeta1.disabled = true;
    } else if(tarjetasDestapadas == 2){
        //mostrar segundo numero
        tarjeta2 = document.getElementById(id);
        segundoResultado = numbers[id];
        tarjeta2.innerHTML = segundoResultado;

        //deshabilitar segundo boton
        tarjeta2.disabled = true;

        //incrementar movimientos
        movimientos++;
        mostrarMovimientos.innerHTML =  `Movimientos: ${movimientos}`;   
        
        if(primerResultado == segundoResultado){
            //encerar contador de tarjetas destapadas
            tarjetasDestapadas = 0;
    
            //aumentar aciertos
            acierto++;
            mostrarAciertos.innerHTML = `Aciertos: ${acierto}`;
            
                //reproducir sonido
                nice.play();

            if(acierto == 8){
                clearInterval(tiempoRegresivoId);
                mostrarAciertos.innerHTML = `Aciertos: ${acierto}😁😁😁`;
                mostrarTiempo.innerHTML = `Fantastico!🎇 Solo te tardaste ${timerInicial - timer} segundos⏳`;
                mostrarMovimientos.innerHTML =  `Movimientos: ${movimientos}✔✔✔`; 
                sucess.play() 
                var modal = document.getElementById("mi-modal");
                modal.style.display = "block";
                var botonCerrar = document.getElementById("cerrarModal");
                botonCerrar.addEventListener("click", function cerrar1() {
                modal.style.display = "none";
                });
            } 
        }else{
            //mostrar momentaneamente y volver a tapar
            setTimeout(()=>{
                tarjeta1.innerHTML = ' ';
                tarjeta2.innerHTML = ' ';
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasDestapadas = 0;
            },500);
        }
    }
}

function reset() {
    // Reiniciar variables a su estado inicial
    timer = timerInicial;
    temporizador = false;
    tarjetasDestapadas = 0;
    movimientos = 0;
    acierto = 0;
    clearInterval(tiempoRegresivoId);
  
    // Restablecer tarjetas a su estado inicial
    for (let i = 0; i <= 15; i++) {
      let tarjeta = document.getElementById(i);
      tarjeta.innerHTML = ' ';
      tarjeta.disabled = false;
    }

    numbers = numbers.sort(()=> {return Math.random()-0.5});
    console.log(numbers);
  
    // Restablecer los valores mostrados en pantalla
    mostrarTiempo.innerHTML = `Tiempo: ${timerInicial} segundos`;
    mostrarMovimientos.innerHTML = 'Movimientos: 0';
    mostrarAciertos.innerHTML = 'Aciertos: 0';

    //reproducir sonido
    sound.play();
  }
