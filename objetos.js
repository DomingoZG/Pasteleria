class Pasteleria {
    constructor() {
      this.personas = [];
      this.pedidos = [];
      this.pasteles = [];
      this.establecimientos = [];
      
    }
    
    //AÑADIR CLIENTE
    addCliente(cliente)
     {
      if (this.personas.filter(temp => temp.dni == cliente.dni).length == 0) 
      {
        this.personas.push(cliente);
        return true;
      }
      return false;
    }

    //ELIMINAR CLIENTE
    delCliente(dni) 
    {
      this.personas.forEach((cliente, index) => 
      {
        if (cliente.dni == dni) 
        {
          this.personas.splice(index, 1);
          return true;
        }
      });
      return false;
    }

    //AÑADIR EMPLEADO

    addEmpleado(empleado)
     {
      if (this.personas.filter(temp => temp.dni == empleado.dni).length == 0)
       {
        this.personas.push(empleado);
        return true;
      }
      return false;
    }

    //ELIMINAR EMPLEADO

    delEmpleado(dni) 
    {
      this.personas.forEach((empleado, index) =>
       {
        if (empleado.dni == dni)
         {
          this.personas.splice(index, 1);
          return true;
        }
      });
      return false;
    }
    
    //AÑADIR PASTEL
    addPastel(pastel)
     {
      if (this.pasteles.filter(temp => temp.id == pastel.id).length == 0) 
      {
        this.pasteles.push(pastel);
        return true;
      }
      return false;
    }
    //ELIMINAR PASTEL
    delPastel(id)
     {
      this.pasteles.forEach((pastel, index) => 
      {
        if (pastel.id == id) 
        {
          this.pasteles.splice(index, 1);
          return true;
        }
      });
      return false;
    }

    //AÑADIR ESTABLECIMIENTO
    addEstablecimiento(establecimiento)
    {
      if(this.establecimientos.filter(temp => temp.nif == establecimiento.nif).length==0)
      {
        this.establecimientos.push(establecimiento);
        return true;
      }
      return false;
    }

    //ELIMINAR ESTABLECIMIENTO

    delEstablecimiento(nif)
    {
      this.establecimientos.forEach((establecimiento, index) =>
      {
        if(establecimiento.nif == nif)
        {
          this.establecimientos.splice(index, 1);
          return true;
        }
      });
      return false;
    }

  //AÑADIR PEDIDO
  addPedido(pedido)
    {
      if(this.pedidos.filter(temp => temp.id == pedido.id).length==0)
      {
        this.pedidos.push(pedido);
        return true;
      }
      return false;
    }

    //ELIMINAR PEDIDO

     delPedido(id)
    {
      this.pedidos.forEach((pedido, index) =>
      {
        if(pedido.id == id)
        {
          this.pedidos.splice(index, 1);
          return true;
        }
      });
      return false;
    }


}

//CLASE Persona

class Persona 
{
  constructor(dni, nombre)
  {
    this.dni= dni;
    this.nombre= nombre;
    
  }
}

//CLASE CLIENTE
class Cliente extends Persona 
{
  constructor(dni, nombre, telefono, direccion) 
  {
    super(dni, nombre);
    this.telefono = telefono;
    this.direccion = direccion;
   
  }
  HTMLrow()
   {
    let row = document.createElement("TR");
    let celda = row.insertCell(-1);
    celda.textContent = this.dni;
    celda = row.insertCell(-1);
    celda.textContent = this.nombre;
    celda = row.insertCell(-1);
    celda.textContent = this.telefono;
    celda = row.insertCell(-1);
    celda.textContent = this.direccion;
    celda = row.insertCell(-1);
    let boton = document.createElement("BUTTON");
    boton.textContent = "Borrar";
    boton.type = "button";
    celda.appendChild(boton);
    return row;
  }
}

//CLASE EMPLEADO
class Empleado extends Persona
{
  constructor(dni, nombre, email, telefono, cargo)
  {
    super(dni,nombre);
    this.email= email;
    this.telefono= telefono;
    this.cargo= cargo;
  }
  HTMLrow()
   {
    let row = document.createElement("TR");
    let celda = row.insertCell(-1);
    celda.textContent = this.dni;
    celda = row.insertCell(-1);
    celda.textContent = this.nombre;
    celda = row.insertCell(-1);
    celda.textContent = this.email;
    celda = row.insertCell(-1);
    celda.textContent = this.telefono;
    celda = row.insertCell(-1);
    celda.textContent = this.cargo;
    celda = row.insertCell(-1);
    let boton = document.createElement("BUTTON");
    boton.textContent = "Borrar";
    boton.type = "button";
    celda.appendChild(boton);
    return row;
  }
}


//CLASE PASTEL

class Pastel 
{
  constructor(id, nombre, precio, descripcion)
  {
    this.id= id;
    this.nombre= nombre;
    this.precio= precio;
    this.descripcion = descripcion;
  }

  HTMLrow()
   {
    let row = document.createElement("TR");
    let celda = row.insertCell(-1);
    celda.textContent = this.id;
    celda = row.insertCell(-1);
    celda.textContent = this.nombre;
    celda = row.insertCell(-1);
    celda.textContent = this.precio;
    celda = row.insertCell(-1);
    celda.textContent = this.descripcion;
    celda = row.insertCell(-1);
    let boton = document.createElement("BUTTON");
    boton.textContent = "Borrar";
    boton.type = "button";
    celda.appendChild(boton);
    return row;
  }
}

//CLASE PEDIDO
class Pedido
{
  constructor(id, cliente,fecha,pastel,/*lineaPedido*/)
  {
    this.id= id;
    this.cliente = cliente;
    this.fecha = fecha;
    this.pastel = pastel;
  //  this.lineaPedido = lineaPedido;
  }

  HTMLrow()
   {
    let row = document.createElement("TR");
    let celda = row.insertCell(-1);
    celda.textContent = this.id;
    celda = row.insertCell(-1);
    celda.textContent = this.cliente;
    celda = row.insertCell(-1);
    celda.textContent = this.fecha;
    celda = row.insertCell(-1);
    celda.textContent = this.pastel;
    celda = row.insertCell(-1);
    /*celda.textContent = this.lineaPedido;
    celda = row.insertCell(-1);*/
    let boton = document.createElement("BUTTON");
    boton.textContent = "Borrar";
    boton.type = "button";
    celda.appendChild(boton);
    return row;
  }

}

//CLASE ESTABLECIMIENTO

class Establecimiento
{
  constructor(nif, numEmpleados, nombre)
  {
    this.nif= nif;
    this.nEmpleados= numEmpleados;
    this.nombre= nombre;
  }

  HTMLrow()
   {
    let row = document.createElement("TR");
    let celda = row.insertCell(-1);
    celda.textContent = this.nif;
    celda = row.insertCell(-1);
    celda.textContent = this.numEmpleados;
    celda = row.insertCell(-1);
    celda.textContent = this.nombre;
    celda = row.insertCell(-1);
    let boton = document.createElement("BUTTON");
    boton.textContent = "Borrar";
    boton.type = "button";
    celda.appendChild(boton);
    return row;
  }

}