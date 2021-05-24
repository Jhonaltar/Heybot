let url = 'http://localhost:3000/api/';

new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data() {
        return {
            clientes: [],
            planes: [],
            equipos: [],
            contratos: [],
            cajas: [],
            dialog: false,
            operacion: '',
            cliente: {
                cliente_id: '',
                nombre: '',
                cedula: '',
                telefono: ''
            },
            contrato: {
                contrato_id: null,
                direccion: '',
                cliente_id: null,
                nombre: '',
                estado: false,
                plan_id: null,
                megas: ''
            },
            plan: {
                plan_id: null,
                megas: ''
            },
            equipo: {
                ont_id: null,
                contrato_id: null,
                potencia: 0,
                dispositivos: 0,
                caja_id: '',
                antena_id: '',
                contraseña: ''
            },
            caja: {
                caja_id: null,
                nombre: '',
                potencia: 0,
                estado: false,
            }

        }
    },
    computed: {
        nombreplan: function() {
            return this.nombre + ' ' + this.megas
        }
    },
    created() {
        this.mostrarClientes()
        this.mostrarContratos()
        this.mostrarPlanes()
        this.mostrarEquipos()
        this.mostrarCajas()
    },
    methods: {
        //MÉTODOS PARA EL CRUD Clientes
        mostrarClientes: function() {
            axios.get(url + 'clientes')
                .then(response => {
                    this.clientes = response.data;
                })
        },
        crearCliente: function() {
            let parametros = { nombre: this.cliente.nombre, cedula: this.cliente.cedula, telefono: this.cliente.telefono };
            console.log(parametros);
            axios.post(url + 'clientes/new', parametros)
                .then(response => {
                    this.mostrarClientes();
                });
            this.cliente.nombre = "";
            this.cliente.cedula = "";
            this.cliente.telefono = "";
        },
        editarCliente: function() {
            let parametros = { nombre: this.cliente.nombre, cedula: this.cliente.cedula, telefono: this.cliente.telefono, cliente_id: this.cliente.cliente_id };
            console.log(parametros);
            axios.put(url + 'clientes/edit/' + this.cliente.cliente_id, parametros)
                .then(response => {
                    this.mostrarClientes();
                })
                .catch(error => {
                    console.log(error);
                });
        },
        borrarCliente: function(cliente_id) {
            Swal.fire({
                title: '¿Confirma eliminar el registro?',
                confirmButtonText: `
                                    Confirmar `,
                showCancelButton: true,
            }).then((result) => {
                try {
                    if (result.isConfirmed) {
                        //procedimiento borrar
                        axios.delete(url + 'clientes/delete/' + cliente_id)
                            .then(response => {
                                this.mostrarClientes();
                            });
                        Swal.fire('¡Eliminado!', '', 'success')
                    } else if (result.isDenied) {}
                } catch (err) {
                    console.log(err)
                }
            });
        },
        //Metodos para el CRUD PLANES
        mostrarPlanes: function() {
            axios.get(url + 'planes')
                .then(response => {
                    this.planes = response.data;
                })
        },
        crearPlan: function() {

            let parametros = { megas: this.plan.megas };
            axios.post(url + 'planes/new', parametros)
                .then(response => {
                    this.mostrarPlanes();
                });
            this.plan.megas = "";

        },
        editarPlan: function() {
            try {
                //console.log(parametros);
                let parametros = { megas: this.plan.megas, plan_id: this.plan.plan_id };
                axios.put(url + 'planes/edit/' + this.plan_id, parametros)
                    .then(response => {
                        this.mostrarPlanes();
                    })
                    .catch(error => {
                        console.log(error);
                    });
            } catch (err) {
                console.log(err)
            }
        },
        borrarPlan: function(plan_id) {
            Swal.fire({
                title: '¿Confirma eliminar el registro?',
                confirmButtonText: `Confirmar`,
                showCancelButton: true,
            }).then((result) => {
                try {
                    if (result.isConfirmed) {
                        //procedimiento borrar

                        axios.delete(url + 'planes/delete/' + plan_id)
                            .then(response => {
                                this.mostrarPlanes();
                            });
                        Swal.fire('¡Eliminado!', '', 'success')
                    } else if (result.isDenied) {}
                } catch (err) {
                    console.log(err)
                }
            });
        },
        //METODOS PARA EL CRUD CONTRATO
        mostrarContratos: function() {
            axios.get(url + 'contratos')
                .then(response => {
                    this.contratos = response.data;
                })
        },
        crearContrato: function() {
            let parametros = { direccion: this.contrato.direccion, cliente_id: this.contrato.cliente_id, estado: this.contrato.estado, plan_id: this.contrato.plan_id };
            console.log(parametros);
            axios.post(url + 'contratos/new', parametros)
                .then(response => {
                    this.mostrarContratos();
                });
            this.contrato.direccion = "";
            this.contrato.cliente_id = "";
            this.contrato.estado = "";
            this.contrato.plan_id = "";
        },
        editarContrato: function() {
            let parametros = { direccion: this.contrato.direccion, cliente_id: this.contrato.cliente_id, estado: this.contrato.estado, plan_id: this.contrato.plan_id, contrato_id: this.contrato.contrato_id };
            console.log(parametros);
            axios.put(url + 'contratos/edit/' + this.contrato.contrato_id, parametros)
                .then(response => {
                    this.mostrarContratos();
                })
                .catch(error => {
                    console.log(error);
                });
        },
        borrarContrato: function(contrato_id) {
            Swal.fire({
                title: '¿Confirma eliminar el registro?',
                confirmButtonText: `
                                    Confirmar `,
                showCancelButton: true,
            }).then((result) => {
                if (result.isConfirmed) {
                    //procedimiento borrar
                    axios.delete(url + 'contratos/delete/' + contrato_id)
                        .then(response => {
                            this.mostrarContratos();
                        });
                    Swal.fire('¡Eliminado!', '', 'success')
                } else if (result.isDenied) {}

            });
        },
        //Metodos CRUD EQUIPOS
        mostrarEquipos: function() {
            axios.get(url + 'equipos')
                .then(response => {
                    this.equipos = response.data;
                })
        },
        crearEquipo: function() {
            let parametros = {
                contrato_id: this.equipo.contrato_id,
                potencia: this.equipo.potencia,
                caja_id: this.equipo.caja_id,
                antena_id: this.equipo.antena_id,
                dispositivos: this.equipo.dispositivos,
                contraseña: this.equipo.contraseña
            };
            console.log(parametros);
            axios.post(url + 'equipos/new', parametros)
                .then(response => {
                    this.mostrarEquipos();
                });
            this.equipo.contrato_id = "";
            this.equipo.potencia = "";
            this.equipo.caja_id = "";
            this.equipo.antena_id = "";
            this.equipo.dispositivos = '';
            this.equipo.contraseña = "";
        },
        editarEquipo: function() {
            let parametros = {
                contrato_id: this.equipo.contrato_id,
                potencia: this.equipo.potencia,
                caja_id: this.equipo.caja_id,
                antena_id: this.equipo.antena_id,
                dispositivos: this.equipo.dispositivos,
                contraseña: this.equipo.contraseña,
                ont_id: this.equipo.ont_id
            };
            console.log(parametros);
            axios.put(url + 'equipos/edit/' + this.equipo.ont_id, parametros)
                .then(response => {
                    this.mostrarEquipos();
                })
                .catch(error => {
                    console.log(error);
                });
        },
        borrarEquipo: function(ont_id) {
            Swal.fire({
                title: '¿Confirma eliminar el registro?',
                confirmButtonText: `Confirmar `,
                showCancelButton: true,
            }).then((result) => {
                try {
                    if (result.isConfirmed) {
                        //procedimiento borrar
                        axios.delete(url + 'equipos/delete/' + ont_id)
                            .then(response => {
                                this.mostrarEquipos();
                            });
                        Swal.fire('¡Eliminado!', '', 'success')
                    } else if (result.isDenied) {}
                } catch (err) {
                    console.log(err)
                }
            });
        },
        //Metodos CRUD CAJAS
        mostrarCajas: function() {
            axios.get(url + 'cajas')
                .then(response => {
                    this.cajas = response.data;
                })
        },
        crearCaja: function() {
            let parametros = {
                caja_id: this.caja.caja_id,
                nombre: this.caja.nombre,
                potencia: this.caja.potencia,
                estado: this.caja.estado
            };
            console.log(parametros);
            axios.post(url + 'cajas/new', parametros)
                .then(response => {
                    this.mostrarCajas();
                });
            this.caja.caja_id = "";
            this.caja.nombre = "";
            this.caja.potencia = "";
            this.caja.estado = '';
        },
        editarCaja: function() {
            let parametros = {
                caja_id: this.caja.caja_id,
                nombre: this.caja.nombre,
                potencia: this.caja.potencia,
                estado: this.equipo.estado
            };
            console.log(parametros);
            axios.put(url + 'cajas/edit/' + this.caja.caja_id, parametros)
                .then(response => {
                    this.mostrarCajas();
                })
                .catch(error => {
                    console.log(error);
                });
        },
        borrarCaja: function(caja_id) {
            Swal.fire({
                title: '¿Confirma eliminar el registro?',
                confirmButtonText: `Confirmar `,
                showCancelButton: true,
            }).then((result) => {
                try {
                    if (result.isConfirmed) {
                        //procedimiento borrar
                        axios.delete(url + 'cajas/delete/' + ont_id)
                            .then(response => {
                                this.mostrarCajas();
                            });
                        Swal.fire('¡Eliminado!', '', 'success')
                    } else if (result.isDenied) {}
                } catch (err) {
                    console.log(err)
                }
            });
        },
        //Botones y formularios
        //CLIENTES
        guardarCliente: function() {
            if (this.operacion == 'crearCliente') {
                this.crearCliente();
            }
            if (this.operacion == 'editarCliente') {
                this.editarCliente();
            }
            this.dialog = false;
        },
        formNuevoCliente: function() {
            this.dialog = true;
            this.operacion = 'crearCliente';
            this.cliente.nombre = '';
            this.cliente.cedula = '';
            this.cliente.telefono = '';
        },
        formEditarCliente: function(cliente_id, nombre, cedula, telefono) {
            this.cliente.cliente_id = cliente_id;
            this.cliente.nombre = nombre;
            this.cliente.cedula = cedula;
            this.cliente.telefono = telefono;
            this.dialog = true;
            this.operacion = 'editarCliente';
        },
        //CONTRATOS
        guardarContrato: function() {
            if (this.operacion == 'crearContrato') {
                this.crearContrato();
            }
            if (this.operacion == 'editarContrato') {
                this.editarContrato();
            }
            this.dialog = false;
        },
        formNuevoContrato: function() {
            this.dialog = true;
            this.operacion = 'crearContrato';
            this.contrato.direccion = '';
            this.contrato.cliente_id = '';
            this.contrato.estado = '';
            this.contrato.plan_id = '';
        },
        formEditarContrato: function(cliente_id, nombre, cedula, telefono) {
            this.cliente.cliente_id = cliente_id;
            this.cliente.nombre = nombre;
            this.cliente.cedula = cedula;
            this.cliente.telefono = telefono;
            this.dialog = true;
            this.operacion = 'editarContrato';
        },
        //PLANES
        guardarPlan: function() {
            if (this.operacion == 'crearPlan') {
                this.crearPlan();
            }
            if (this.operacion == 'editarPlan') {
                this.editarPlan();
            }
            this.dialog = false;
        },
        formNuevoPlan: function() {
            this.dialog = true;
            this.operacion = 'crearPlan';
            this.plan.megas = '';
        },
        formEditarPlan: function(plan_id, megas) {
            this.plan_id = plan_id;
            this.plan.megas = megas;
            this.dialog = true;
            this.operacion = 'editarPlan';
        },
        //Equipos
        guardarEquipo: function() {
            if (this.operacion == 'crearEquipo') {
                this.crearEquipo();
            }
            if (this.operacion == 'editarEquipo') {
                this.editarEquipo();
            }
            this.dialog = false;
        },
        formNuevoEquipo: function() {
            this.dialog = true;
            this.operacion = 'crearEquipo';
            this.equipo.contrato_id = '';
            this.equipo.potencia = '';
            this.equipo.caja_id = '';
            this.equipo.antena_id = '';
            this.equipo.dispositivos = '';
            this.equipo.contraseña = ''
        },
        formEditarEquipo: function(ont_id, contrato_id, potencia, caja_id, antena_id, contraseña) {
            this.equipo.ont_id = ont_id;
            this.equipo.contrato_id = contrato_id;
            this.equipo.potencia = potencia;
            this.equipo.caja_id = caja_id;
            his.equipo.antena_id = antena_id;
            this.equipo.dispositivos = dispositivos;
            this.equipo.contraseña = contraseña;
            this.dialog = true;
            this.operacion = 'editarEquipo';
        },
        //Cajas
        guardarCaja: function() {
            if (this.operacion == 'crearCaja') {
                this.crearCaja();
            }
            if (this.operacion == 'editarCaja') {
                this.editarCaja();
            }
            this.dialog = false;
        },
        formNuevoCaja: function() {
            this.dialog = true;
            this.operacion = 'crearCaja';
            this.caja.caja_id = '';
            this.caja.nombre = '';
            this.caja.potencia = '';
            this.caja.estado = ''
        },
        formEditarCaja: function(caja_id, nombre, potencia, estado) {
            this.caja.caja_id = caja_id;
            this.caja.nombre = nombre;
            this.caja.potencia = potencia;
            this.caja.estado = estado;
            this.dialog = true;
            this.operacion = 'editarCaja';
        }

    }
});