const express = require('express');
const router = express.Router();

const homeController = require('../controllers/homeController');
const clientesController = require('../controllers/clientesController');
const authController = require('../controllers/authController');
const usuariosController = require('../controllers/usuariosController');
const contratoController = require('../controllers/contratoController');
const antenaController = require('../controllers/antenaController');
const fibraController = require('../controllers/fibraController');
const equipoController = require('../controllers/equipoController');
const reportesController = require('../controllers/reportesController');
const ticketsController = require('../controllers/ticketsController');
const facturasController = require('../controllers/facturasController');

module.exports = function(){

    router.get('/', 
    authController.usuarioAutenticado,
    homeController.home);

    /* Crear cuenta */
    router.get('/crear-cuenta',
    usuariosController.formCrearCuenta);
    router.post('/crear-cuenta',
    usuariosController.crearNuevaCuenta);

    /* Inicar sesion */
    router.get('/iniciar-sesion', 
    usuariosController.formIniciarSesion);
    router.post('/iniciar-sesion',
    authController.autenticarUsuario);

    /* Cerrar sesion  */
    router.get('/cerrar-sesion',
    authController.cerrarSesion)

    /* Clientes */
    router.get('/clientes',
    authController.usuarioAutenticado,
    clientesController.listadoClientes);
    router.get('/clientes',
    authController.usuarioAutenticado,
    clientesController.listadoClientes1);
    router.post('/cliente',
    authController.usuarioAutenticado,
    clientesController.nuevoCliente);
    router.post('/cliente/:cliente_id',
    authController.usuarioAutenticado,
    clientesController.editCliente);
    router.post('/eliminar-cliente/:cliente_id',
    authController.usuarioAutenticado,
    clientesController.eliminarCliente);

    /* Contrato */
    router.get('/contratos',
    authController.usuarioAutenticado,
    contratoController.listadoContratos);
    router.post('/contrato',
    authController.usuarioAutenticado,
    contratoController.nuevoContrato);
    router.post('/contrato/:contrato_id',
    authController.usuarioAutenticado,
    contratoController.editContrato);
    router.post('/eliminar-contrato/:contrato_id',
    authController.usuarioAutenticado,
    contratoController.eliminarContrato);

    /* Antena */
    router.get('/antenas',
    authController.usuarioAutenticado,
    antenaController.listadoAntenas,);
    router.post('/antena',
    authController.usuarioAutenticado,
    antenaController.nuevaAntena);
    router.post('/antena/:antena_id',
    authController.usuarioAutenticado,
    antenaController.editarAntena);
    router.post('/eliminar-antena/:antena_id',
    authController.usuarioAutenticado,
    antenaController.eliminarAntena);

    /* Fibra */
    router.get('/fibra',
    authController.usuarioAutenticado,
    fibraController.listadoFibra);
    router.post('/fibra',
    authController.usuarioAutenticado,
    fibraController.nuevoFibra);
    router.post('/fibra/:caja_id',
    authController.usuarioAutenticado,
    fibraController.editarFibra);
    router.post('/eliminar-fibra/:caja_id',
    authController.usuarioAutenticado,
    fibraController.eliminarFibra);

    /* Equipos */
    router.get('/equipos',
    authController.usuarioAutenticado,
    equipoController.listadoEquipos);
    router.post('/equipos',
    authController.usuarioAutenticado,
    equipoController.nuevoEquipo);
    /* router.post('/busqueda',
    authController.usuarioAutenticado,
    equipoController.resultadosBusquedas); */

    /* Reportes */
    router.get('/reportes',
    authController.usuarioAutenticado,
    reportesController.listadoReportes);

    /* Tickets */
    router.get('/tickets',
    authController.usuarioAutenticado,
    ticketsController.listadoTickets);
    router.post('/ticket',
    authController.usuarioAutenticado,
    ticketsController.nuevoTicket);
    router.post('/ticket/:ticket_id',
    authController.usuarioAutenticado,
    ticketsController.editarTicket);

    /* Facturas */
    router.get('/facturas',
    authController.usuarioAutenticado,
    facturasController.ListadoFacturas);
    router.get('/crear-factura',
    authController.usuarioAutenticado,
    facturasController.formFactura);


    return router;
}