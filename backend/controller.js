// app.js
const express = require('express');
const cors = require('cors');
const { Socios, Libros, Prestamos } = require('./models');
const app = express();
const port = 8080;

app.use(express.json()); // Middleware para parsear JSON
app.use(cors());


// Instancias de los wrappers
let socios = new Socios();
let libros = new Libros();
let prestamos = new Prestamos();

// Rutas de la API

app.get('/ejemplo', (req, res) => {
    res.json('Hola Mundo');
});

// CRUD para socios
app.post('/socios', (req, res) => { // POST /socios --> CREATE
    //console.warn(req);
    const { id, nombre, direccion } = req.body;
    const nuevoSocio = socios.crearSocio(id, nombre, direccion);
    res.status(201).json(nuevoSocio);
});

app.get('/socios', (req, res) => {  // GET /socios/:id --> LISTAR
    res.json(socios.obtenerSocios());
});

app.put('/socios/:id', (req, res) => { // PUT /socios/:id --> INSERTAR
    const { id } = req.params;
    const { nuevoNombre, nuevaDireccion } = req.body;
    const socioActualizado = socios.actualizarSocio(id, nuevoNombre, nuevaDireccion);
    if (socioActualizado) {
        res.json(socioActualizado);
    } else {
        res.status(404).send('Socio no encontrado');
    }
});

app.delete('/socios/:id', (req, res) => {// DELETE /socios/:id --> BORRA
    const { id } = req.params;
    const socioEliminado = socios.eliminarSocio(id);
    if (socioEliminado) {
        res.json(socioEliminado);
    } else {
        res.status(404).send('Socio no encontrado');
    }
});

// CRUD para libros
app.post('/libros', (req, res) => {
    const { id, titulo, autor, disponibilidad } = req.body;
    const nuevoLibro = libros.crearLibro(id, titulo, autor, disponibilidad);
    res.status(201).json(nuevoLibro);
});

app.get('/libros', (req, res) => {
    res.json(libros.obtenerLibros());
});

app.put('/libros/:id', (req, res) => {
    const { id } = req.params;
    const { nuevoTitulo, nuevoAutor, nuevaDisponibilidad } = req.body;
    const libroActualizado = libros.actualizarLibro(id, nuevoTitulo, nuevoAutor, nuevaDisponibilidad);
    if (libroActualizado) {
        res.json(libroActualizado);
    } else {
        res.status(404).send('Libro no encontrado');
    }
});

app.delete('/libros/:id', (req, res) => {
    const { id } = req.params;
    const libroEliminado = libros.eliminarLibro(id);
    if (libroEliminado) {
        res.json(libroEliminado);
    } else {
        res.status(404).send('Libro no encontrado');
    }
});

// CRUD para préstamos
app.post('/prestamos', (req, res) => {
    const { idSocio, idLibro, fechaPrestamo, fechaDevolucion } = req.body;
    const prestamoCreado = prestamos.crearPrestamo(idSocio, idLibro, fechaPrestamo, fechaDevolucion, socios, libros);
    if (prestamoCreado) {
        res.status(201).json(prestamoCreado);
    } else {
        res.status(400).send('No se pudo crear el préstamo');
    }
});

app.get('/prestamos', (req, res) => {
    res.json(prestamos.obtenerPrestamos());
});

app.delete('/prestamos/:idSocio/:idLibro', (req, res) => {
    const { idSocio, idLibro } = req.params;
    const libroDevuelto = prestamos.eliminarPrestamo(idSocio, idLibro, libros);
    if (libroDevuelto) {
        res.json(libroDevuelto);
    } else {
        res.status(404).send('Préstamo no encontrado');
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`API escuchando en http://localhost:${port}`);
});
