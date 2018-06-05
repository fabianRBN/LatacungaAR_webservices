var express =require('express');
var firebase = require('firebase');
var app = express();

firebase.initializeApp({
    apiKey: "AIzaSyBjUS3MGoj2zG8LLWhPmw7_2VKRDXniDyc",
    authDomain: "turismoar-72e69.firebaseapp.com",
    databaseURL: "https://turismoar-72e69.firebaseio.com",
    projectId: "turismoar-72e69",
    storageBucket: "turismoar-72e69.appspot.com",
   });

var ref = firebase.app().database().ref();
var refAtractivos = ref.child('atractivo');

app.listen(3000, ()=> {
    console.log('express server puerto 3000:\x1b[32m%s\x1b[0m',' online');
    
});

function Atractivo(index,nombre,descripcion,lat,log) {
    this.id = index ;
    this.latitude = lat;
    this.longitude = log;
    this.name = nombre;
    this.description = descripcion;
    
  }

// Rutas
app.get('/', (req, res, next) => {
    var listaAtractivos = [];
    var atractivo;
    refAtractivos.on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot,index) {
            var nombre = childSnapshot.child('nombre').val();
            var descripcion = childSnapshot.child('descripcion').val();
            var lat = childSnapshot.child('posicion').child('lat').val();
            var long = childSnapshot.child('posicion').child('lng').val();
            
            atractivo = new Atractivo(index,nombre,descripcion,lat,long);
            listaAtractivos.push(atractivo);
        });


        
        res.status(200).json(listaAtractivos);
    });
    

    
});

module.exports = app;