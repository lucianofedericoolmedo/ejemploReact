import React, { Component } from 'react';

// URL base de la API
const API_URL = 'http://localhost:8080';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socios: [],
      libros: [],
      prestamos: []
    };

    // Bind methods
    this.getSocios = this.getSocios.bind(this);
    this.getLibros = this.getLibros.bind(this);
    this.getPrestamos = this.getPrestamos.bind(this);
  }

  getSocios() {
    fetch(`${API_URL}/socios`)
      .then(response => response.json())
      .then(data => {
        this.setState({ socios: data });
      });
  }

  getLibros() {
    fetch(`${API_URL}/libros`)
      .then(response => response.json())
      .then(data => {
        this.setState({ libros: data });
      });
  }

  getPrestamos() {
    fetch(`${API_URL}/prestamos`)
      .then(response => response.json())
      .then(data => {
        this.setState({ prestamos: data });
      });
  }

  render() {
    return (
      <div>
        <h1>Gestión de Biblioteca</h1>
        <CrearSocio getSocios={this.getSocios} />
        <CrearLibro getLibros={this.getLibros} />
        <CrearPrestamo getPrestamos={this.getPrestamos} />
        <ListaSocios getSocios={this.getSocios} socios={this.state.socios} />
        <ListaLibros getLibros={this.getLibros} libros={this.state.libros} />
        <ListaPrestamos getPrestamos={this.getPrestamos} prestamos={this.state.prestamos} />
      </div>
    );
  }
}

// Componente para crear un socio
class CrearSocio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      nombre: '',
      direccion: ''
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  }

  crearSocio = () => {
    const { id, nombre, direccion } = this.state;
    const data = { id, nombre, direccion };

    fetch(`${API_URL}/socios`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(() => {
      alert('Socio creado con éxito');
      this.props.getSocios(); // Refrescar la lista de socios
    });
  }

  render() {
    return (
      <div className="form-container">
        <h2>Crear Socio</h2>
        <input type="number" id="id" placeholder="ID Socio" onChange={this.handleChange} />
        <input type="text" id="nombre" placeholder="Nombre" onChange={this.handleChange} />
        <input type="text" id="direccion" placeholder="Dirección" onChange={this.handleChange} />
        <button onClick={this.crearSocio}>Crear Socio</button>
      </div>
    );
  }
}

// Componente para crear un libro
class CrearLibro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      titulo: '',
      autor: '',
      disponibilidad: ''
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  }

  crearLibro = () => {
    const { id, titulo, autor, disponibilidad } = this.state;
    const data = { id, titulo, autor, disponibilidad };

    fetch(`${API_URL}/libros`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(() => {
      alert('Libro creado con éxito');
      this.props.getLibros(); // Refrescar la lista de libros
    });
  }

  render() {
    return (
      <div className="form-container">
        <h2>Crear Libro</h2>
        <input type="number" id="id" placeholder="ID Libro" onChange={this.handleChange} />
        <input type="text" id="titulo" placeholder="Título" onChange={this.handleChange} />
        <input type="text" id="autor" placeholder="Autor" onChange={this.handleChange} />
        <input type="number" id="disponibilidad" placeholder="Disponibilidad" onChange={this.handleChange} />
        <button onClick={this.crearLibro}>Crear Libro</button>
      </div>
    );
  }
}

// Componente para crear un préstamo
class CrearPrestamo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idSocio: '',
      idLibro: '',
      fecha: '',
      fechaDevolucion: ''
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  }

  crearPrestamo = () => {
    const { idSocio, idLibro, fecha, fechaDevolucion } = this.state;
    const data = { idSocio, idLibro, fechaPrestamo: fecha, fechaDevolucion };

    fetch(`${API_URL}/prestamos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(() => {
      alert('Préstamo creado con éxito');
      this.props.getPrestamos(); // Refrescar la lista de préstamos
    });
  }

  render() {
    return (
      <div className="form-container">
        <h2>Crear Préstamo</h2>
        <input type="number" id="idSocio" placeholder="ID Socio" onChange={this.handleChange} />
        <input type="number" id="idLibro" placeholder="ID Libro" onChange={this.handleChange} />
        <input type="date" id="fecha" onChange={this.handleChange} />
        <input type="date" id="fechaDevolucion" onChange={this.handleChange} />
        <button onClick={this.crearPrestamo}>Crear Préstamo</button>
      </div>
    );
  }
}

// Componente para mostrar la lista de socios
class ListaSocios extends Component {

  render() {
    return (
      <div className="table-container">
        <h2>Lista de Socios</h2>
        <button onClick={this.props.getSocios}>Ver Socios</button>
        <table id="tabla-socios">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Dirección</th>
            </tr>
          </thead>
          <tbody>
            {this.props.socios.map(socio => (
              <tr key={socio.id}>
                <td>{socio.id}</td>
                <td>{socio.nombre}</td>
                <td>{socio.direccion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

// Componente para mostrar la lista de libros
class ListaLibros extends Component {

  render() {
    return (
      <div className="table-container">
        <h2>Lista de Libros</h2>
        <button onClick={this.props.getLibros}>Ver Libros</button>
        <table id="tabla-libros">
          <thead>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Autor</th>
              <th>Disponibilidad</th>
            </tr>
          </thead>
          <tbody>
            {this.props.libros.map(libro => (
              <tr key={libro.id}>
                <td>{libro.id}</td>
                <td>{libro.titulo}</td>
                <td>{libro.autor}</td>
                <td>{libro.disponibilidad}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

// Componente para mostrar la lista de préstamos
class ListaPrestamos extends Component {
  
  render() {
    return (
      <div className="table-container">
        <h2>Lista de Préstamos</h2>
        <button onClick={this.props.getPrestamos}>Ver Préstamos</button>
        <table id="tabla-prestamos">
          <thead>
            <tr>
              <th>ID Socio</th>
              <th>ID Libro</th>
              <th>Fecha Préstamo</th>
              <th>Fecha Devolución</th>
            </tr>
          </thead>
          <tbody>
            {this.props.prestamos.map(prestamo => (
              <tr key={prestamo.id}>
                <td>{prestamo.idSocio}</td>
                <td>{prestamo.idLibro}</td>
                <td>{prestamo.fechaPrestamo}</td>
                <td>{prestamo.fechaDevolucion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
