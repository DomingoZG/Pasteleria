
/* CREAR PASTELERIA */


let miPasteleria = new Pasteleria();

//CARGAR LOS ARCHIVOS XML 
function loadXMLDoc(filename) 
{
  let xhttp = null;
  if (window.XMLHttpRequest) 
  {
    xhttp = new XMLHttpRequest();
  } else 
  {
    xhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xhttp.open("GET", filename, false);
  xhttp.send();
  return xhttp.responseXML;
}

//CARGAR XML DE CLIENTES



function addXmlClientes() {
  let datos = loadXMLDoc("xml/cliente.xml");
  datos.querySelectorAll("cliente").forEach(cliente => {
    let dni = cliente.getAttribute("dni");
    let nombre = cliente.querySelector("nombre").textContent;
    let telefono = cliente.querySelector("telefono").textContent;
    let direccion = cliente.querySelector("direccion").textContent;
    miPasteleria.addCliente(new Cliente(dni, nombre, telefono, direccion));
  });
}



//CARGA XML DE EMPLEADOS
function addXmlEmpleados() {
  let datos = loadXMLDoc("xml/empleado.xml");
  datos.querySelectorAll("empleado").forEach(empleado => {
    let dni = empleado.getAttribute("dni");
    let nombre = empleado.querySelector("nombre").textContent;
    let email = empleado.querySelector("email").textContent;
    let telefono = empleado.querySelector("telefono").textContent;
    let cargo = empleado.querySelector("cargo").textContent;
    miPasteleria.addEmpleado(new Empleado(dni, nombre, email, telefono, cargo));
  });
}
      
                           
//CARGA XML PASTELES
function addXmlPastel() {
  let datos = loadXMLDoc("xml/pastel.xml");
  datos.querySelectorAll("pastel").forEach(pastel => {
    let id = pastel.getAttribute("id");
    let nombre = pastel.querySelector("nombre").textContent;
    let precio = pastel.querySelector("precio").textContent;
    let descripcion = pastel.querySelector("descripcion").textContent;
    
    miPasteleria.addPastel(new Pastel(id, nombre, precio, descripcion ));
  });
}


//CARGAR XML ESTABLECIMIENTOS
function addXmlEstablecimiento() {
  let datos = loadXMLDoc("xml/establecimiento.xml");
  datos.querySelectorAll("establecimiento").forEach(establecimiento =>{
   let nif = establecimiento.getAttribute("nif");
   let numEmpleados = establecimiento.querySelector("numEmpleados").textContent;
   let nombre = establecimiento.querySelector("nombre").textContent;

   miPasteleria.addEstablecimiento(new Establecimiento(nif, numEmpleados, nombre));
  });
}

//CARGAR XML PEDIDO

function addXmlPedido() {
  let datos = loadXMLDoc("xml/pedido.xml");
  datos.querySelectorAll("pedido").forEach(pedido => {
    let id = pedido.getAttribute("id");
    let cliente = pedido.querySelector("cliente").textContent;
    let fecha = pedido.querySelector("fecha").textContent;
    let pastel = pedido.querySelector("pastel").textContent;
    miPasteleria.addPedido(new Pedido(id, cliente, fecha, pastel));
  });
}



addXmlEmpleados();
addXmlClientes();
addXmlPastel();
addXmlEstablecimiento();
addXmlPedido();



////////////FIN CARGA DE XML/////////////////


/* MOSTRAR LOS FORMULARIOS */

function ocultar() 
{
    let divHijos = document
      .querySelector("#contenido")
      .querySelectorAll(".divHijo");
    divHijos.forEach(value =>
         {
      let x = value;
      x.style.display = "none";
    });
  }
  
  function mostrar(x) 
  {
    ocultar();
    document.querySelector(x).style.display = "block";
  }


  //ALTA DE CLIENTES//

  let botonAddCliente = document.querySelector("#botonAddCliente");
  botonAddCliente.addEventListener("click", addClienteConComprobacion);
  
  /* AÑADIR CLIENTES */
  
  function addClienteConComprobacion() {
    let dni = document.querySelector("#dniCliente").value;
    let nombre = document.querySelector("#nombreCliente").value;
    let telefono = document.querySelector("#tlfCliente").value;
    let direccion = document.querySelector("#dirCliente").value;
    if (validarDni(dni)) {
      let tempCliente = new Cliente(dni, nombre, telefono, direccion);
      if (miPasteleria.addCliente(tempCliente)) {
        alert("Cliente añadido correctamente");
      } else {
        alert("DNI repetido, revise listado");
      }
    } else {
      alert("El DNI introducido no es correcto");
    }
  }


  function limpiar() {
    setTimeout('document.formularioCliente.reset()',2000);
    return false;
}


  //LISTADO CLIENTES

  document
  .querySelector("#listadoCliente")
  .addEventListener("click", listadoClientes);

function listadoClientes() {
  mostrar("#divMostrarListaClientes");
  let tabla = genTablaClientes(
    ["DNI", "Nombre", "Teléfono", "Direccion"],
    "estaTablaClientes"
  );
  let oTablaAnterior = document.querySelector("#divMostrarListaClientes table ");
  if(oTablaAnterior!=null)
  {
    oTablaAnterior.remove();
  }
  document.querySelector("#divMostrarListaClientes").appendChild(tabla);
  miPasteleria.personas.forEach(cliente =>{if(cliente instanceof Cliente)
    document
      .querySelector("#estaTablaClientes")
      .tBodies[0].appendChild(cliente.HTMLrow())
  }
  );
}

//Para hacer la tabla del listado clientes

function genTablaClientes(array, id) {
  let tabla = document.createElement("TABLE");
  tabla.id = id;
  tabla.classList.add("table");
  let thead = tabla.createTHead();
  let fila = thead.insertRow(-1);
  array.forEach(titulo => {
    th = fila.insertCell(-1);
    th.textContent = titulo;
  });
  tabla.addEventListener("click", e => {
    let idCliente;
    if (e.target.tagName == "BUTTON") {
      idCliente = e.target.parentNode.parentNode.cells[0].textContent;
      miPasteleria.delCliente(idCliente);
      e.target.parentNode.parentNode.remove();
    }
  });
  tabla.appendChild(document.createElement("TBODY"));
  return tabla;
}

//Fin clientes//////



  
  //ALTA EMPLEADOS

  let botonAddempleado = document.querySelector("#botonAddEmpleado");
  botonAddEmpleado.addEventListener("click", addEmpleadoConComprobacion);

/* AÑADIR EMPLEADOS */

function addEmpleadoConComprobacion() {
  let dni = document.querySelector("#dniEmpleado").value;
  let nombre = document.querySelector("#nombreEmpleado").value;
  let email = document.querySelector("#emailEmpleado").value;
  let tlf = document.querySelector("#tlfEmpleado").value;
  let cargo = document.querySelector("#cargoEmpleado input:checked");
  if (validarDni(dni)) {
    let tempEmpleado = new Empleado(dni, nombre, email,  tlf, cargo);
    if (miPasteleria.addEmpleado(tempEmpleado)) {
      alert("Empleado añadido correctamente");
    } else {
      alert("DNI repetido, revise listado");
    }
  } else {
    alert("El DNI introducido no es correcto");
  }
}

//Listado empleados//

document
  .querySelector("#listadoEmpleado")
  .addEventListener("click", listadoEmpleados);

function listadoEmpleados() {
  mostrar("#divMostrarListaEmpleados");
  let tabla = genTablaEmpleados(
    ["DNI", "Nombre", "Email", "Telefono", "Cargo"],
    "estaTablaDeEmpleados"
  );
  let oTablaAnterior = document.querySelector("#divMostrarListaEmpleados table ");
  if(oTablaAnterior!=null)
  {
    oTablaAnterior.remove();
  }
  document.querySelector("#divMostrarListaEmpleados").appendChild(tabla);

  miPasteleria.personas.forEach(empleado =>{ if (empleado instanceof Empleado)
  document
  .querySelector("#estaTablaDeEmpleados")
  .tBodies[0].appendChild(empleado.HTMLrow())
}
);
  
 
}

//Para hacer la tabla de listado Empleados

function genTablaEmpleados(array, id) 
{
  let tabla = document.createElement("TABLE");
  tabla.id = id;
  tabla.classList.add("table");
  let thead = tabla.createTHead();
  let fila = thead.insertRow(-1);
  array.forEach(titulo => {
    th = fila.insertCell(-1);
    th.textContent = titulo;
  });
  tabla.addEventListener("click", e => {
    let idEmpleado;
    if (e.target.tagName == "BUTTON")
     {
      idEmpleado = e.target.parentNode.parentNode.cells[0].textContent;
      miPasteleria .delEmpleado(idEmpleado);
      e.target.parentNode.parentNode.remove();
    }
  });
  tabla.appendChild(document.createElement("TBODY"));
  return tabla;
}

//FIN EMPLEADOS


//ALTA PEDIDO

let botonAddPedido = document.querySelector("#botonAddPedido");
botonAddPedido.addEventListener("click", añadirPedido);

/* AÑADIR PEDIDO */

function añadirPedido() {
  let id = document.querySelector("#idPedido").value;
  let cliente = document.querySelector("#nCliente").value;
  let fecha = document.querySelector("#fechaPedido").value;
  let pastel = document.querySelector("#nombrePastel").value;
  //let lineaPedido = document.querySelector("#lineaPedido);
  if (validarId(id)) {
    let tempPedido = new Pedido(id, cliente, fecha,  pastel);
    if (miPasteleria.addPedido(tempPedido)) {
      alert("Pedido añadido correctamente");
    } else {
      alert("Id repetido, revise listado");
    }
  } else {
    alert("El Id introducido no es correcto");
  }
}

//Listado Pedidos//

document
  .querySelector("#listadoPedidos")
  .addEventListener("click", listadoPedidos);

function listadoPedidos() {
  mostrar("#divMostrarListaPedido");
  let tabla = genTablaPedidos(
    ["Id", "Nombre Cliente", "Fecha", "Pastel"],
    "estaTablaPedidos"
  );
  let oTablaAnterior = document.querySelector("#divMostrarListaPedido table ");
  if(oTablaAnterior!=null)
  {
    oTablaAnterior.remove();
  }
  document.querySelector("#divMostrarListaPedido").appendChild(tabla);

  miPasteleria.pedidos.forEach(pedido =>
    document
      .querySelector("#estaTablaPedidos")
      .tBodies[0].appendChild(pedido.HTMLrow())
  );
}

//Tabla pedidos
function genTablaPedidos(array, id) 
{
  let tabla = document.createElement("TABLE");
  tabla.id = id;
  tabla.classList.add("table");
  let thead = tabla.createTHead();
  let fila = thead.insertRow(-1);
  array.forEach(titulo => {
    th = fila.insertCell(-1);
    th.textContent = titulo;
  });
  tabla.addEventListener("click", e => {
    let idPedido;
    if (e.target.tagName == "BUTTON")
     {
      idPedido = e.target.parentNode.parentNode.cells[0].textContent;
      miPasteleria .delPedido(idPedido);
      e.target.parentNode.parentNode.remove();
    }
  });
  tabla.appendChild(document.createElement("TBODY"));
  return tabla;
}





/*AÑADIR PASTELES*/

let botonAddPastel = document.querySelector("#botonAddPastel");
botonAddPastel.addEventListener("click", añadirPastel);

  function añadirPastel() 
  {
    let id = document.querySelector("#idPastel").value;
    let nombre = document.querySelector("#nombrePastel").value;
    let precio = document.querySelector("#precioPastel").value;
    let descripcion = document.querySelector("#descripcionPastel").value;

    if(validarId(id))
    {
      let pastelPrueba = new Pastel(id, nombre, precio, descripcion);
      if(miPasteleria.addPastel(pastelPrueba))
      {
        alert("Pastel añadido correctamente");

      }else
      {
        alert("El id esta repetido");

      }
    }
    else{
      alert("El id es incorrecto");
    }
  }

  //Listado Pasteles//

  document
  .querySelector("#listadoPasteles")
  .addEventListener("click", listadoPasteles);

function listadoPasteles()
 {
  let comprueba = document.querySelector("#estaTablaDePasteles");
  if(comprueba != undefined) 
  {
    comprueba.remove();
  }
  mostrar("#divMostrarListaPasteles");
  let tabla = genTablaPasteles(
    ["ID", "Nombre", "Precio", "Descripcion"],
    "estaTablaDePasteles"
  );
  let oTablaAnterior = document.querySelector("#divMostrarListaPasteles table ");
  if(oTablaAnterior!=null)
  {
    oTablaAnterior.remove();
  }
  document.querySelector("#divMostrarListaPasteles").appendChild(tabla);
  miPasteleria.pasteles.forEach(pastel =>
    document
      .querySelector("#estaTablaDePasteles")
      .tBodies[0].appendChild(pastel.HTMLrow())
  );
}

//Tabla para listado Pasteles

function genTablaPasteles(array, id) 
{
  let tabla = document.createElement("TABLE");
  tabla.id = id;
  tabla.classList.add("table");
  let thead = tabla.createTHead();
  let fila = thead.insertRow(-1);
  array.forEach(titulo => {
    th = fila.insertCell(-1);
    th.textContent = titulo;
  });
  tabla.addEventListener("click", e => {
    let idPasteles;
    if (e.target.tagName == "BUTTON") 
    {
      idPasteles = e.target.parentNode.parentNode.cells[0].textContent;
      miPasteleria.delPastel(idPasteles);
      e.target.parentNode.parentNode.remove();
    }
  });
  tabla.appendChild(document.createElement("TBODY"));
  return tabla;
}

//FIN PASTELES//

//AÑADIR ESTABLECIMIENTOS//

let botonAddEstablecimiento = document.querySelector("#botonAddEstablecimiento");
botonAddEstablecimiento.addEventListener("click", añadirEstablecimiento);

function añadirEstablecimiento()
{
    let nif = document.querySelector("#nifEstablecimiento").value;
    let numEmpleados = document.querySelector("#numEmpleados").value;
    let nombre = document.querySelector("#nombreEstablecimiento").value;

    if(validarNif(nif))
    {
      let establecimientoPrueba = new Establecimiento(nif, numEmpleados, nombre );
      if(miPasteleria.addEstablecimiento(establecimientoPrueba))
      {
        alert("Establecimiento añadido correctamente");

      }else
      {
        alert("El nif esta repetido");

      }
    }
    else{
      alert("El nif es incorrecto");
    }

}

  //Listado Establecimientos//

  document
  .querySelector("#listadoEstablecimiento")
  .addEventListener("click", listadoEstablecimiento);

function listadoEstablecimiento() {
  mostrar("#divMostrarListadoEstablecimientos");
  let tabla = genTablaEstablecimiento(
    ["NIF", "NºEmpleados", "Nombre"],
    "estaTablaEstablecimientos"
  );
  let oTablaAnterior = document.querySelector("#divMostrarListadoEstablecimientos table ");
  if(oTablaAnterior!=null)
  {
    oTablaAnterior.remove();
  }
  document.querySelector("#divMostrarListadoEstablecimientos").appendChild(tabla);

  miPasteleria.establecimientos.forEach(establecimiento =>
  document
  .querySelector("#estaTablaEstablecimientos")
  .tBodies[0].appendChild(establecimiento.HTMLrow())
  

);
  
 
}
//Tabla para listado Establecimientos

function genTablaEstablecimiento(array, id) 
{
  let tabla = document.createElement("TABLE");
  tabla.id = id;
  tabla.classList.add("table");
  let thead = tabla.createTHead();
  let fila = thead.insertRow(-1);
  array.forEach(titulo => {
    th = fila.insertCell(-1);
    th.textContent = titulo;
  });
  tabla.addEventListener("click", e => {
    let nifEstablecimiento;
    if (e.target.tagName == "BUTTON") 
    {
      nifEstablecimiento = e.target.parentNode.parentNode.cells[0].textContent;
      miPasteleria.delEstablecimiento(nifEstablecimiento);
      e.target.parentNode.parentNode.remove();
    }
  });
  tabla.appendChild(document.createElement("TBODY"));
  return tabla;
}

  







  ////////////////////////////
  //VALIDACION DNI///////////

  function validarDni(dni) 
  {
    let numero, letraValida, letra;
    let regex = /^[XYZ]?\d{5,8}[A-Z]$/;
    dni = dni.toUpperCase();
    if (regex.test(dni) === true)
     {
      numero = dni.substr(0, dni.length - 1);
      numero = numero.replace("X", 0);
      numero = numero.replace("Y", 1);
      numero = numero.replace("Z", 2);
      letraValida = dni.substr(dni.length - 1, 1);
      numero = numero % 23;
      letra = "TRWAGMYFPDXBNJZSQVHLCKET";
      letra = letra.substring(numero, numero + 1);
      if (letra != letraValida) 
      {
        return false;
      }
       else 
      {
        return true;
      }
    } 
    else 
    {
      return false;
    }
  }

  /////VALIDAR ID DE PASTELES/////7
  //5 DIGITOS NUMERICOS MAXIMO

  function validarId(id)
   {
    let regex = /^[0-9]{5}$/;
    if (regex.test(id) === true) 
    {
      return true;
    }
     else
     {
      return false;
    }
  }

  //Validacion NIF Establecimiento
  //5 numeros 
 

  function validarNif(nif)
   {
    let regex = /^[0-9]{5}$/;
    if (regex.test(nif) === true) 
    {
      return true;
    }
     else
     {
      return false;
    }
  }