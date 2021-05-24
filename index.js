const express = require('express');
/* const { sequelize, clientes, contratos, planes, equipos, cajas, reportes, antenas, facturas, tickets, usuarios } = require('./database/models'); */
const app = express();

/* modificado */
var expressLayouts=require("express-ejs-layouts");
const path = require('path');
const bodyParser = require('body-parser');
const router = require('./routes');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const passport = require('./database/passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
/*  */

const { WebhookClient } = require('dialogflow-fulfillment');
const { dialogflow } = require('actions-on-google');
const { query, response } = require('express');
const cors = require('cors')
    //middlewares
const middlewares = require("./middlewares/middlewares");
app.use(cors());
//routes

/* const apiRouter = require("./routes/apiRouter");
const registerRouter = require("./routes/registerRouter"); */
const { on } = require('nodemon');
const { convert } = require('actions-on-google/dist/service/actionssdk');

const db = require('./database/config/db');

//Modelos
require('./database/models/Login');
const clientes = require('./database/models/User');
const contratos = require('./database/models/Contrato');
const Planes = require('./database/models/Plan');
const Antena = require('./database/models/Antena');
const Caja = require('./database/models/Fibra');
const Equipos = require('./database/models/Equipo');
const Reportes = require('./database/models/Reporte');
const Tickets = require('./database/models/Ticket');
const Facturas = require('./database/models/Factura');
db.sync()
    .then(()=>console.log('Conectado al servidor'))
    .catch(error => console.log(error));

/* Variables de desarrollo */
require('dotenv').config({path: 'variables.env'})

/* app.use("/api", apiRouter);
app.use("/register", registerRouter); */

//setting 

/* var PORT = process.env.PORT || 8000; */
/* var maybe_port = process.env.PORT || 8000;
if (typeof maybe_port === "number") {
    port = maybe_port;
} */
process.env.DEBUG = 'dialogflow:debug';

//variables
const timeZone = 'Ecuador/Quito';
const timeZoneOffset = '-05:00';
var cliente;
var contrato;
var requerimiento;
var atenuacion;
var plan;
var dispositivos;
var dispositivossistema;
var cobertura;
var tipoconsumo;
var consumototal;
var dflag = false;
var cflag = false;
var cobflag = false;
var solucionado = false;
var tipodispositivos;
//webhook


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(expressValidator());
app.use(expressLayouts);
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, './views'));
app.use(express.static('public'));

app.use(cookieParser());

app.use(session({
    secret: 'kevxander',
    key: 'supersecreta',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use((req, res,next)=>{
    res.locals.usuario = {...req.user} || null;
    res.locals.mensajes = req.flash();
    next();
})


app.use('/', router());

app.post('/webhook', express.json(), function(req, res) {
    const agent = new WebhookClient({ request: req, response: res });
    console.log('Dialogflow Request headers: ' + JSON.stringify(req.headers));
    console.log('Dialogflow Request body: ' + JSON.stringify(req.body));

    function welcome(agent) {
        agent.add(`Muy buenas y bienvenido a Hey!. Mi nombre es HeyBot `);
        agent.add(`Por favor indíqueme el número de cédula de su contrato`);
    }

    async function ValidarCliente(agent) {
        const cedula = agent.parameters["number-sequence"]
        if (cedula) {
            try {
                cliente = await clientes.findOne({ where: { cedula } })
                if (cliente == null) {
                    agent.add(`No existe un cliente asociado al número de cédula, ingrese otro número por favor`)
                    agent.context.delete('validarcliente');
                    agent.setContext({ 'name': 'saludo', 'lifespan': '1' });
                    agent.setContext({ 'name': 'finalizarinteraccion', 'lifespan': '1' });

                } else {
                    agent.add(`El cliente ${cliente.nombre} verdad?`)
                    return cliente
                }
            } catch (err) {
                console.log(err)
            }
        } else {
            agent.add("Indiqueme un númera de cédula válido por favor")
        }

    }
    async function ValidarClienteno(agent) {
        agent.add("Indiqueme nuevamente su númera de cédula por favor")
    }

    async function ValidarContrato(agent) {
        try {
            contrato = await contratos.findAll({
                raw: true,
                where: { cliente_id: cliente.cliente_id },
            });
            if (contrato == null) {
                agent.add(`No existe un contrato asociado al número de cédula`)
                agent.add('¿Desea proporcionar otro numero de cédula?')
            } else {
                if (contrato.length >= 2) {
                    agent.add(`Cual es la direccion de su contrato?`)
                    contrato.forEach(contrato => {
                        agent.add(`${contrato.direccion}`)
                    })
                } else {
                    contrato = await contratos.findOne({ where: { cliente_id: cliente.cliente_id } })
                    agent.add("¿Cual es su requerimiento o en que le puedo servir?")
                }
            }
        } catch (err) {
            console.log(err)
        }

    }
    async function EspecificarContrato(agent) {
        try {
            let direccion = agent.query
            contrato = await contratos.findOne({
                where: {
                    cliente_id: cliente.cliente_id,
                    direccion
                }
            })
            if (contrato == null) {
                agent.add(`No existe un contrato con esa direccion `)
                agent.add('¿Desea proporcionar otra dirección diferente?')
            } else {
                agent.add(`Por favor indiqueme en que le sirvo o que problema tiene?`)
            }
        } catch (err) {
            console.log(err)
        }
    }

    async function Serviciolento(agent) {
        params = agent.parameters
        let ambiguo = params.ambiguo
        if (ambiguo == "") {
            requerimiento = 'Servicio Lento'
            try {
                let equipo = await equipos.findOne({
                    raw: true,
                    where: {
                        contrato_id: contrato.contrato_id
                    }
                })
                let caja = await cajas.findOne({
                    attributes: ['potencia'],
                    raw: true,
                    where: {
                        caja_id: equipo.caja_id
                    }
                })
                atenuacion = caja.potencia - equipo.potencia

            } catch (e) {
                console.log(e)
            }
            if (atenuacion >= 3.5) {
                agent.add('Tiene la potencia del equipo elevada. Contactese a este numero para pedir ticket de atención')
            } else {
                dispositivos = params["cantidad"]
                tipoconsumo = params["consumo"]
                cobertura = params["cobertura"]
                VerificarParametros(agent);
            }

        } else {
            agent.add("¿Tiene servicio lento o esta sin servicio?")
        }
    }


    async function SLDisp(agent) {

        dispositivos = agent.parameters["cantidad"]
        if (dispositivos == "") {
            agent.add("Por favor indiqueme el numero de dispositivos que posee")
        } else {
            if (dflag == false) {
                try {

                    dispositivossistema = await equipos.findOne({
                        attributes: ['dispositivos'],
                        raw: true,
                        where: {
                            contrato_id: contrato.contrato_id
                        }
                    })
                } catch (e) {
                    console.log(e)
                }

                if (dispositivos != dispositivossistema) {
                    agent.add("Tiene conectado " + dispositivossistema.dispositivos + " dispositivos a la red según el sistema, son todos suyos?")
                    dflag == true
                } else {}
            } else {
                VerificarParametros(agent);
            }
        }


    }


    async function SLConsumo(agent) {

        tipoconsumo = agent.parameters["consumo"]
        if (tipoconsumo != "") {
            if (cflag == false) {
                let consumo = 0
                if (tipoconsumo == "redesociales" | tipoconsumo == "video") {
                    consumo = 2
                } else {
                    consumo = 4
                }

                consumototal = parseInt(dispositivossistema.dispositivos) * parseInt(consumo)

                try {
                    plan = await planes.findOne({
                        raw: true,
                        attributes: ['megas'],
                        where: {
                            plan_id: contrato.plan_id
                        }
                    })
                } catch (e) {
                    console.log(e)
                }
                if (consumototal > plan.megas) {
                    agent.add("Esta consumiendo " + //JSON.stringify(consumototal) 
                        " megas que es mas de lo que tiene en su plan asignado, por favor controle el ancho de banda o contrate un plan mas conveniente")
                } else {
                    VerificarParametros(agent);
                }

            } else {
                VerificarParametros(agent);
            }
        }
    }

    async function SLCob(agent) {

        cobertura = agent.parameters.cobertura;
        estado = agent.parameters.estado;
        negativo = agent.parameters.negativo;
        if (cobflag == false) {
            if (cobertura) {
                if (cobertura == "lejos" && estado == "menos") {
                    cobertura = "cerca"
                    VerificarParametros(agent);
                } else if (cobertura == "lejos" && estado == "estar" &&
                    negativo == "No") {
                    cobertura = "cerca"
                    VerificarParametros(agent);
                } else if (cobertura != "cerca") {
                    VerificarParametros(agent);
                } else {
                    agent.add("La distancia desde la cual se esta coenctando no es la" +
                        "apropiada, por favor acerquese al router ");

                }
            } else {
                agent.add("Por favor ingrese los metros de distancia entre usted y el router principal")
            }
            cobflag = true;
        } else {

        }
    }

    function Problemaresuelto(agent) {
        Preguntar(agent);
    }

    async function SinServicio(agent) {
        params = agent.parameters
        if (params.ambiguo == null) {
            requerimiento = 'Sin Servicio'
            try {
                plan = await planes.findOne({
                    raw: true,
                    attributes: ['megas'],
                    where: {
                        plan_id: contrato.plan_id
                    }
                })
            } catch (e) {
                console.log(e)
            }
            if (plan.megas == '10') {
                try {
                    equipo = await equipos.findOne({
                            raw: true,
                            where: {
                                contrato_id: contrato.contrato_id
                            }
                        }),
                        antena = await antenas.findOne({
                            raw: true,
                            attributes: ['estado'],
                            where: { antena_id: equipo.antena_id }
                        })
                } catch (e) {
                    console.log(e)
                }

                if (antena.estado == true) {
                    if (equipo.estado == true) {
                        agent.add('Por favor verifique que esté debidamente conectado a la red o pruebe con algun otro dispositivo')
                    } else {
                        agent.add("Por favor reinicie el equipo y asegurese que los cables del POE esten bien conectados" +
                            "(el cable que viene de la antena va en el puerto POE)" +
                            "luego de eso espere 5 minutos por favor")
                    }

                } else {
                    agent.add('Mil disculpas estimad@ hay un problema a nivel general. Se resolverá en brevedad posible')
                }
            } else {
                try {
                    equipo = await equipos.findOne({
                            raw: true,
                            where: {
                                contrato_id: contrato.contrato_id
                            }
                        }),
                        caja = await cajas.findOne({
                            raw: true,
                            attributes: ['estado'],
                            where: { caja_id: equipo.caja_id }
                        })
                } catch (e) {
                    console.log(e)
                }
                if (caja.estado == true) {
                    if (equipo.estado == true) {
                        agent.add('Por favor verifique que esté debidamente conectado a la red o pruebe con algun otro dispositivo')
                    } else {
                        agent.add("Por favor reinicie el equipo y asegurese que los cables esten bien conectados")
                    }


                } else {
                    agent.add('Mil disculpas estimad@ hay un problema a nivel general. Se resolverá en brevedad posible')
                }

            }


        } else {
            agent.add("¿Tiene servicio lento o esta sin servicio?")

        }
    }


    function SLsincliente(agent) {
        requerimiento = "Servicio Lento"
        agent.add(`Entiendo que tiene problemas con su servicio, por favor indiqueme su cédula para ayudarle`);
    }

    function SSsincliente(agent) {
        requerimiento = "Sin Servicio"
        agent.add(`Entiendo que necesita del servicio, por favor indiqueme su cédula para ayudarle`);
    }

    function fallback(agent) {
        agent.add(`Disculpe no tengo respuesta para lo que me acaba de indicar. Para mas información contáctese con un asesor humano.`);
        Preguntar(agent);
    }

    function currentlyOpen() {
        // Get current datetime with proper timezone
        let date = new Date();
        date.setHours(date.getHours() + parseInt(timeZoneOffset.split(':')[0]));
        date.setMinutes(date.getMinutes() + parseInt(timeZoneOffset.split(':')[0][0] + timeZoneOffset.split(':')[1]));

        return date.getDay() >= 1 &&
            date.getDay() <= 6 &&
            date.getHours() >= 8 &&
            date.getHours() <= 18;
    }

    function hoursHandler(agent) {

        if (currentlyOpen()) {
            agent.add('Estamos atendiendo en las oficinas de 8 AM a 6 PM');
        } else {
            agent.add('Las oficinas se encuentran cerradas en este momento pero abren de Lunes a Sabado a las 8 AM');
        }
    }
    async function ConsultarDeuda(agent) {
        try {
            let factura = await facturas.findAll({
                raw: true,
                where: { contrato_id: contrato.contrato_id, estado: true }
            })
            let total = 0;
            factura.forEach(factura => {
                total = parseFloat(total) + (parseFloat(factura.subtotal) * parseFloat(factura.iva)) - parseFloat(factura.descuento);
            });
            agent.add(`Su deuda total es de:  ${total.toFixed(2)}`);
            Preguntar(agent);
        } catch (e) {
            console.log(e)
        }
    }

    function VerificarParametros(agent) {
        if (dispositivos == "") {
            agent.add("¿Por favor indiqueme en total cuantos dispositivos tiene conectados a la red?")
        } else if (tipoconsumo == "") {
            agent.add("¿Por favor indiqueme en que aplicación o en que plataforma tiene la lentitud")
        } else if (cobertura == "") {
            agent.add("¿Por favor indiqueme a cuantos metros del router se esta conectando?")
        } else {
            agent.add("Dejeme ver si le entendí: tiene conectados" + dispositivos +
                " dispositivos, utilizando" + tipoconsumo +
                " y esta relativamente" + cobertura + " del router, correcto?");
        }
    }
    async function SendReport() {

        await reportes.create({
            cliente_id: cliente.cliente_id,
            contrato_id: contrato.contrato_id,
            requerimiento: requerimiento,
            solucionado: solucionado
        }).then(function(insertedReport) {
            console.log(insertedReport.dataValues)
        })
    }

    function ProblemaResuelto(agent) {
        solucionado = true
        agent.add('¿Listo. Algo mas en lo que le pueda servir?')
    }

    function Preguntar(agent) {
        agent.add('Listo.¿Algo mas en lo que le pueda servir?')
    }

    function SLDispsi() {
        VerificarParametros(agent);
    }


    function Escalar() {
        SendReport();
        agent.add("Por favor comuniquese al 1700 439 - 439 o acerquese a las oficinas mas cercanas y un asesor humano le atenderá.");

    }

    function ProblemasTVgeneral(agent) {
        //agent.setFollowupEvent({ "name": "get_serviciolento", "parameters": { "received": "false" } })
        agent.add('Some dummy text');
        agent.setContext({ 'name': 'requerimiento', 'lifespan': '1' });
        agent.setFollowupEvent('get_serviciolento');
    }

    function FinalizarInteraccion(agent) {
        SendReport();
        agent.add("Un placer atenderle que tenga un excelente día ")
    }
    async function CambiarClave(nuevaclave) {
        await equipos.update({
            contraseña: nuevaclave
        }, {
            where: {
                contrato_id: contrato.contrato_id
            }
        })
    }

    async function ConsultaTicket(agent) {
        try {
            let ticket = await tickets.findAll({
                raw: true,
                where: {
                    contrato_id: contrato.contrato_id
                }
            })
            if (ticket != null) {
                ticket.forEach(ticket => {
                    agent.add(`Tiene visita para ${ticket.descripcion} programada para el: ${ticket.fechaatencion}`)
                })
            } else {
                agent.add("No tiene visita programada. Por favor contáctese al 1700 439-439 para solicitar visita")
            }
            Preguntar(agent);
        } catch (err) {
            console.log(err)
        }
    }



    function ClaveCambiada(agent) {
        let nuevaclave = ""
        let re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        nuevaclave = agent.parameters.clave
        if (re.test(nuevaclave)) {
            CambiarClave(nuevaclave);
            agent.add('Tu contraseña ha sido cambiada con éxito a ' + nuevaclave)
            Preguntar(agent);
        } else {
            agent.add('Por favor ingrese una clave con al menos 8 digitos, una letra minuscula, una mayuscula y un caracter especial')
            agent.context.delete('finalizarinteraccion');
            agent.context.delete('requerimiento');
            agent.setContext({ 'name': 'cambioclave', 'lifespan': '1' });
        }
    }


    let intentMap = new Map();
    intentMap.set('Saludo', welcome);
    intentMap.set('Default Fallback Intent', fallback);
    intentMap.set('ValidarCliente', ValidarCliente);
    intentMap.set('ValidarCliente.yes', ValidarContrato);
    intentMap.set('ValidarContrato', EspecificarContrato);
    intentMap.set('ProblemasTV.general', ProblemasTVgeneral);
    intentMap.set('SLDisp', SLDisp);
    intentMap.set('SLCob', SLCob);
    intentMap.set('SLConsumo', SLConsumo);
    intentMap.set('ServicioLento', Serviciolento);
    intentMap.set('SinServicio', SinServicio);
    intentMap.set('ValidarCliente.no', ValidarClienteno);
    intentMap.set('ServicioLento.sincliente', SLsincliente);
    intentMap.set('SinServicio.sincliente', SSsincliente);
    intentMap.set('Horarios', hoursHandler);
    intentMap.set('ConsultarDeuda', ConsultarDeuda);
    intentMap.set('Escalar', Escalar);
    intentMap.set('Clavecambiada', ClaveCambiada);
    intentMap.set('SLDisp.yes', SLDispsi);
    intentMap.set('Problemaresuelto', ProblemaResuelto);
    intentMap.set('FinalizarInteraccion', FinalizarInteraccion);
    intentMap.set('ConsultaTicket', ConsultaTicket);
    agent.handleRequest(intentMap);

})

//arrancamos el servidor
/* app.listen(PORT, () => {
    console.log(`Estamos ejecutando en: http: //localhost:${PORT}`);
}); */
//Conectarse a la base de datos 
/* app.listen({ port: 5000 }, async() => {
    await sequelize.sync({ force: false })
    console.log('Database sync')
}) */

/* leer el host y el puerto */
const host= '0.0.0.0';
const port = process.env.PORT || 8000;

app.listen(port,host, () => {
    console.log('El servidor esta funcionando');
});