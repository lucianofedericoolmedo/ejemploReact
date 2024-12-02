class Socio {
    constructor(id, nombre, direccion) {
        this.id = id;
        this.nombre = nombre;
        this.direccion = direccion;
    }
}

class Libro {
    constructor(id, titulo, autor, disponibilidad) {
        this.id = id;
        this.titulo = titulo;
        this.autor = autor;
        this.disponibilidad = disponibilidad;
    }
}

class Prestamo {
    constructor(idSocio, idLibro, fechaPrestamo, fechaDevolucion) {
        this.idSocio = idSocio;
        this.idLibro = idLibro;
        this.fechaPrestamo = fechaPrestamo;
        this.fechaDevolucion = fechaDevolucion;
    }
}

// Clases "repositorios" que sirven para guardan informacion respectiva a las instancias (o info a salvar) de Socio, Libro y Prestamo.
class Socios { // CRUD
    constructor() {
        this.socios = [];
    }

    insertSocio(socio){
        this.socios.push(socio);
    }

    crearSocio(id, nombre, direccion) {
        const socio = new Socio(id, nombre, direccion);
        this.insertSocio(socio);
        return socio;
    }

    retrieveSocios(){
        return this.socios;
    }

    obtenerSocios() {
        return this.retrieveSocios();
    }

    actualizarSocio(id, nuevoNombre, nuevaDireccion) {
        const newInt = parseInt(id);
        let index = this.socios.findIndex(l => l.id === newInt);
        if (index !== -1) {
            // Reemplazar el socio en la lista con un nuevo objeto Socio
            this.socios[index] = new Socio(newInt, nuevoNombre, nuevaDireccion);
            return this.socios[index]; // Devolvemos el socio actualizado
        }
        return null; // Si no se encuentra el socio
    }

    eliminarSocio(id) {
        const newInt = parseInt(id);
        let index = this.socios.findIndex(l => l.id === newInt);
        if (index !== -1) {
            return this.socios.splice(index, 1)[0];
        }
        return null;
    }
}

class Libros {
    constructor() {
        this.libros = [];
    }

    crearLibro(id, titulo, autor, disponibilidad) {
        const libro = new Libro(id, titulo, autor, disponibilidad);
        this.libros.push(libro);
        return libro;
    }

    obtenerLibros() {
        return this.libros;
    }

    actualizarLibro(id, nuevoTitulo, nuevoAutor, nuevaDisponibilidad) {
        const newInt = parseInt(id);
        let index = this.libros.findIndex(l => l.id === newInt);
        console.warn(index);
        if (index !== -1) {
            // Reemplazar el libro en la lista con un nuevo objeto Libro
            this.libros[index] = new Libro(newInt, nuevoTitulo, nuevoAutor, nuevaDisponibilidad);
            return this.libros[index]; // Devolvemos el libro actualizado
        }
        return null; // Si no se encuentra el libro
    }   

    eliminarLibro(id) {
        const newInt = parseInt(id);
        let index = this.libros.findIndex(l => l.id === newInt);
        if (index !== -1) {
            return this.libros.splice(index, 1)[0];
        }
        return null;
    }
}

class Prestamos {
    constructor() {
        this.prestamos = [];
    }

    crearPrestamo(idSocio, idLibro, fechaPrestamo, fechaDevolucion, sociosService, libroService) {
        const newidSocio = parseInt(idSocio);
        const newIdLibro = parseInt(idLibro);
        let libro = libroService.libros.find(l => l.id === idLibro);
        let socio = sociosService.socios.find(s => s.id === idSocio);
        if (libro && socio && libro.disponibilidad > 0) {
            const prestamo = new Prestamo(newidSocio, newIdLibro, fechaPrestamo, fechaDevolucion);
            console.warn(prestamo);
            this.prestamos.push(prestamo);
            libro.disponibilidad--;
            return prestamo;
        }
        return null;
    }

    obtenerPrestamos() {
        return this.prestamos;
    }

    eliminarPrestamo(idSocio, idLibro, libroService) {
        const newidSocio = parseInt(idSocio);
        const newIdLibro = parseInt(idLibro);

        let index = this.prestamos.findIndex(p => p.idSocio === newidSocio && p.idLibro === newIdLibro);
        if (index !== -1) {
            this.prestamos.splice(index, 1);
            let libro = libroService.libros.find(l => l.id === newIdLibro);
            libro.disponibilidad++; // Aumentar la disponibilidad del libro
            return libro;
        }
        return null;
    }
}

module.exports = { Socios, Libros, Prestamos };
