const nombre = document.querySelector('#nombre-alumno');
const boton = document.querySelector('#crear-alumno');
const items = document.querySelector('.items');

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCLuaKgWRF8fAxWKfk9bX47kJLWmQTAx6Y",
  authDomain: "exploring-actions.firebaseapp.com",
  databaseURL: "https://exploring-actions.firebaseio.com",
  projectId: "exploring-actions",
  storageBucket: "exploring-actions.appspot.com",
  messagingSenderId: "833148850975"
};
firebase.initializeApp(config);

var database = firebase.database();

boton.addEventListener('click', crearAlumno);

function crearAlumno() {
  let nombreAlumno = nombre.value;
  database.ref(`alumnos/${nombreAlumno}`).set({
    name: nombreAlumno
  })
}

var alumnos = database.ref('alumnos');
alumnos.on('value', function(snapshot) {
  console.log(snapshot.val());
  pintarAlumnos(snapshot.val());
});

function pintarAlumnos(alumnos) {
  let printItems = '';
  for(let key in alumnos) {
    console.log(alumnos[key]); // {name: "Joss"}
    let alumno = alumnos[key];
    printItems += `
      <article>
        <h3>${alumno.name}</h3>
      </article>
    `
  }
  items.innerHTML = printItems;
}
