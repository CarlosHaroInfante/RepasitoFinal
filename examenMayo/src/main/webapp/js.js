/**
 * 
 */
const guardar = [];
 function aniadir(){
	
	let fechaEntrada, fechaSalida;
	
	const nombre = prompt("nombre del usuario del pedido");
	
	const coste = prompt("Coste del producto");
	
	const dia = prompt("Día de la llegada del paquete a las oficinas");
	
	const mes = prompt("Mes de la llegada del paquete a las oficinas");
	
	const anyo = prompt("Año de la llegada del paquete a las oficinas");
	
	fechaEntrada = new Date(anyo, (mes - 1), dia);
	
	alert(fechaEntrada);
	
	if(fechaEntrada.getDay() === 0){
		fechaEntrada.setDate(fechaEntrada.getDate() + 1);
	}
	
	fechaSalida = new Date(fechaEntrada.getFullYear(), fechaEntrada.getMonth(), fechaEntrada.getDate() + 5);
	alert(fechaSalida);
	
	if(fechaSalida.getDay() === 0){
		fechaSalida.setDate(fechaSalida.getDate() + 1);
	}
	
	const hoy = new Date();
	
	alert(hoy);
	
	if(fechaEntrada <= hoy){
		alert("La fecha dada es menos a la actual");
	}
	else{
		document.getElementById("tabla").innerHTML += `<tr><td>${nombre}</td><td>${coste}</td><td>${fechaEntrada.toLocaleDateString()}</td><td>${fechaSalida.toLocaleDateString()}</td></tr>`;
		guardar.push({ nombre, coste, fechaEntrada, fechaSalida });
		}
	
 }
 
 function eliminar() {
    const nombrePedidoEliminar = prompt("Nombre del usuario del pedido que quieres eliminar");
    const pedidosConMismoNombre = guardar.filter(pedido => pedido.nombre.toLowerCase() === nombrePedidoEliminar.toLowerCase());

    if (pedidosConMismoNombre.length === 0) {
        alert("No se encontró un pedido con ese nombre");
        return;
    }

    if (pedidosConMismoNombre.length > 1) {
        const dia = prompt("Día de la llegada del paquete a las oficinas");
        const mes = prompt("Mes de la llegada del paquete a las oficinas");
        const anyo = prompt("Año de la llegada del paquete a las oficinas");
        const fechaBorrar = new Date(anyo, (mes - 1), dia);

        const pedidoEliminar = guardar.findIndex(pedido => 
            pedido.nombre.toLowerCase() === nombrePedidoEliminar.toLowerCase() && 
            pedido.fechaEntrada.toLocaleDateString() === fechaBorrar.toLocaleDateString()
        );

        if (pedidoEliminar > -1) {
            guardar.splice(pedidoEliminar, 1);
            actualizarTabla();
            alert("Pedido eliminado correctamente.");
        } else {
            alert("No se encontró un pedido con esa fecha");
        }
    } else {
        const pedidoEliminar = guardar.findIndex(pedido => pedido.nombre.toLowerCase() === nombrePedidoEliminar.toLowerCase());
        guardar.splice(pedidoEliminar, 1);
        actualizarTabla();
        alert("Pedido eliminado correctamente.");
    }
}


function proximoEnvio(){
	
	const hoy = new Date();
	
	const proximo = guardar.filter(pedido => pedido.fechaEntrada > hoy);
	
	proximo.sort((a, b) => a.fechaEntrada - b.fechaEntrada);
	
	if(proximo.length > 0){
		const diasParaEntrega = Math.ceil((proximo[0].fechaEntrada - hoy) / (1000 *60 * 60 * 24));
		document.getElementById("resultado").innerHTML = `
            <tr>
                <td>
                    ${proximo[0].fechaSalida.toLocaleDateString()}<br>
                    ${proximo[0].nombre}<br>
                    ${diasParaEntrega} días restantes
                </td>
            </tr>`;
	}
	else{
		document.getElementById('resultado').innerHTML = "No hay pedidos futuros";
	}
	
	
}
	
	
	function actualizarTabla() {
    const resultado = guardar.map(pedido => `<tr><td>${pedido.nombre}</td><td>${pedido.coste}</td><td>${pedido.fechaEntrada.toLocaleDateString()}</td><td>${pedido.fechaSalida.toLocaleDateString()}</td></tr>`).join("");
    document.getElementById("tabla").innerHTML = resultado;
}
 