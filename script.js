const scriptURL = "https://script.google.com/macros/s/AKfycbwQ9EPDTQ0JOpAzQmexP-bVI8e7PavRRNEXbEtmGJEI9hKBHHrPiPMmmEegnCc5Ct_mIA/exec";


const preguntas4 = [
  { texto: "¿Cuál es un modelo SUV?", opciones: ["Cronos", "Toro", "Titano"], correcta: "Toro" },
  { texto: "¿Qué modelo tiene caja automática?", opciones: ["Fiorino", "Argo", "Pulse"], correcta: "Pulse" },
  { texto: "¿Qué motor tiene el Argo?", opciones: ["1.3", "2.0", "1.0"], correcta: "1.3" },
  { texto: "¿Qué color es más común en Titano?", opciones: ["Rojo", "Negro", "Azul"], correcta: "Negro" },
  { texto: "¿Qué vehículo es ideal para reparto?", opciones: ["Pulse", "Fiorino", "Strada"], correcta: "Fiorino" }
];

const preguntas5 = [
  { texto: "¿Qué auto es 4x4?", opciones: ["Cronos", "Toro", "Titano"], correcta: "Titano" },
  { texto: "¿Cuál es un modelo hatchback?", opciones: ["Cronos", "Argo", "Titano"], correcta: "Argo" },
  { texto: "¿Cuál tiene pantalla multimedia?", opciones: ["Fiorino", "Argo", "Duna"], correcta: "Argo" },
  { texto: "¿Cuál es un utilitario?", opciones: ["Pulse", "Fiorino", "Uno"], correcta: "Fiorino" },
  { texto: "¿Cuál es un modelo reciente?", opciones: ["Titano", "Palio", "Idea"], correcta: "Titano" }
];

// Variables para almacenar preguntas aleatorias seleccionadas
let p4, p5;

// Mostrar preguntas aleatorias al comenzar
document.getElementById("datosForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Ocultar formulario de datos y mostrar trivia
  document.getElementById("datosForm").style.display = "none";
  document.getElementById("triviaForm").style.display = "flex";

  // Elegir preguntas aleatorias
  p4 = preguntas4[Math.floor(Math.random() * preguntas4.length)];
  p5 = preguntas5[Math.floor(Math.random() * preguntas5.length)];

  // Mostrar pregunta 4
  document.getElementById("labelPregunta4").textContent = `4. ${p4.texto}`;
  const select4 = document.getElementById("respuesta4");
  select4.innerHTML = "<option value=''>Elige una opción</option>";
  p4.opciones.forEach(op => {
    const opt = document.createElement("option");
    opt.value = op;
    opt.textContent = op;
    select4.appendChild(opt);
  });

  // Mostrar pregunta 5
  document.getElementById("labelPregunta5").textContent = `5. ${p5.texto}`;
  const select5 = document.getElementById("respuesta5");
  select5.innerHTML = "<option value=''>Elige una opción</option>";
  p5.opciones.forEach(op => {
    const opt = document.createElement("option");
    opt.value = op;
    opt.textContent = op;
    select5.appendChild(opt);
  });
});

// Enviar trivia
document.getElementById("triviaForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const telefono = document.getElementById("telefono").value.trim();
  const r1 = document.querySelector("select[name='respuesta1']").value;
  const r2 = document.querySelector("select[name='respuesta2']").value;
  const r3 = document.querySelector("select[name='respuesta3']").value;
  const r4 = document.getElementById("respuesta4").value;
  const r5 = document.getElementById("respuesta5").value;

  let score = 0;
  if (r1 === "Fiat") score++;
  if (r2 === "Venta, repuestos y taller") score++;
  if (r3 === "Club Hípico") score++;
  if (r4 === p4.correcta) score++;
  if (r5 === p5.correcta) score++;

  const datos = {
    nombre,
    telefono,
    respuesta1: r1,
    respuesta2: r2,
    respuesta3: r3,
    respuesta4: r4,
    respuesta5: r5,
    score
  };

  fetch(scriptURL, {
    method: "POST",
    body: JSON.stringify(datos),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(() => {
      document.getElementById("resultado").textContent = "✅ Gracias por participar.";
      document.getElementById("triviaForm").reset();
    })
    .catch(error => {
      document.getElementById("resultado").textContent = "❌ Error al enviar.";
      console.error("Error:", error);
    });
});
