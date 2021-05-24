const express = require('express');
const router = express.Router();
const db = require("../database/models");
const bodyParser = require('body-parser');


router.get("/clientes", async (req, res) => {
    const clientes = await db.clientes.findAll({});
    res.render('clientes',{
        clientes
    })
});

//middleware
/* router.get("/clientes", (req, res) => {
    const cliente = db.clientes.findAll().then(clientes => res.send(clientes));
    
}); */

router.get("/clientes/:cliente_id", (req, res) => {
    db.clientes.findOne({
        where: {
            cliente_id: req.params.cliente_id
        }
    }).then(clientes => res.send(clientes))
});

router.post("/clientes/new", (req, res) => {

    const {nombre,cedula,telefono} = req.body;
    console.log(nombre,cedula,telefono);
    /* db.clientes.create({
        nombre: req.body.nombre,
        cedula: req.body.cedula,
        telefono: req.body.telefono
    }); */
    /* res.redirect("/api/clientes"); */
});

router.delete("/clientes/delete/:cliente_id", (req, res) => {
    db.clientes.destroy({
        where: {
            cliente_id: req.params.cliente_id
        }
    }).then(() => res.send("success"));
});

router.put("/clientes/edit/:cliente_id", (req, res) => {
    db.clientes.update({
        nombre: req.body.nombre,
        cedula: req.body.cedula,
        telefono: req.body.telefono
    }, {
        where: { cliente_id: req.params.cliente_id }
    }).then(() => res.send("success"));
});
//contrato routes
router.get("/contratos", (req, res) => {
    db.contratos.findAll().then(contratos => res.send(contratos))
});

router.get("/contratos/:contrato_id", (req, res) => {
    db.contratos.findOne({
        where: {
            contrato_id: req.params.contrato_id
        }
    }).then(contratos => res.send(contratos))
});

router.post("/contratos/new", (req, res) => {
    db.contratos.create({
        direccion: req.body.direccion,
        cliente_id: req.body.cliente_id,
        estado: req.body.estado,
        plan_id: req.body.plan_id
    }).then(submitedclientes => res.send(submitedclientes))
});

router.delete("/contratos/delete/:contrato_id", (req, res) => {
    db.contratos.destroy({
        where: {
            contrato_id: req.params.contrato_id
        }
    }).then(() => res.send("success"));
});

router.put("/contratos/edit/:contrato_id", (req, res) => {
    db.contratos.update({
        direccion: req.body.direccion,
        cliente_id: req.body.cliente_id,
        estado: req.body.estado,
        plan_id: req.body.plan_id
    }, {
        where: { contrato_id: req.params.contrato_id }
    }).then(() => res.send("success"));
});


//planes routes
router.get("/planes", (req, res) => {
    db.planes.findAll().then(planes => res.send(planes))
});

router.get("/planes/:plan_id", (req, res) => {
    db.planes.findOne({
        where: {
            plan_id: req.params.plan_id
        }
    }).then(planes => res.send(planes))
});

router.post("/planes/new", (req, res) => {
    db.planes.create({
        megas: req.body.megas
    }).then(submitedplanes => res.send(submitedplanes))
});

router.delete("/planes/delete/:plan_id", (req, res) => {
    db.planes.destroy({
        where: {
            plan_id: req.params.plan_id
        }
    }).then(() => res.send("success"));
});

router.put("/planes/edit/:plan_id", (req, res) => {
    db.planes.update({
        megas: req.body.megas
    }, {
        where: { plan_id: req.params.plan_id }
    }).then(() => res.send("success"));
});
//rutas equipos
router.get("/equipos", (req, res) => {
    db.equipos.findAll().then(equipos => res.send(equipos))
});

router.get("/equipos/:ont_id", (req, res) => {
    db.equipos.findOne({
        where: {
            ont_id: req.params.ont_id
        }
    }).then(equipos => res.send(equipos))
});

router.post("/equipos/new", (req, res) => {
    db.equipos.create({
        contrato_id: req.body.contrato_id,
        potencia: req.body.potencia,
        caja_id: req.body.caja_id,
        antena_id: req.body.antena_id,
        dispositivos: req.body.dispositivos,
        contraseña: req.body.contraseña
    }).then(submitedequipos => res.send(submitedequipos))
});

router.delete("/equipos/delete/:ont_id", (req, res) => {
    db.equipos.destroy({
        where: {
            ont_id: req.params.ont_id
        }
    }).then(() => res.send("success"));
});

router.put("/equipos/edit/:ont_id", (req, res) => {
    db.equipos.update({
        potencia: req.body.potencia,
        dispositivos: req.body.dispositivos,
        contraseña: req.body.contraseña
    }, {
        where: { ont_id: req.params.ont_id }
    }).then(() => res.send("success"));
});
//rutas cajas
router.get("/cajas", (req, res) => {
    db.cajas.findAll().then(cajas => res.send(cajas))
});

router.get("/cajas/:caja_id", (req, res) => {
    db.cajas.findOne({
        where: {
            caja_id: req.params.caja_id
        }
    }).then(cajas => res.send(cajas))
});

router.post("/cajas/new", (req, res) => {
    db.cajas.create({
        nombre: req.body.nombre,
        potencia: req.body.potencia,
        estado: req.body.estado
    }).then(submitedcajas => res.send(submitedcajas))
});

router.delete("/cajas/delete/:caja_id", (req, res) => {
    db.cajas.destroy({
        where: {
            caja_id: req.params.caja_id
        }
    }).then(() => res.send("success"));
});

router.put("/cajas/edit/:caja_id", (req, res) => {
    db.cajas.update({
        potencia: req.body.potencia,
        estado: req.body.estado
    }, {
        where: { caja_id: req.params.caja_id }
    }).then(() => res.send("success"));
});
//facturas
router.get("/facturas", (req, res) => {
    db.facturas.findAll().then(facturas => res.send(facturas))
});

router.get("/facturas/:factura_id", (req, res) => {
    db.facturas.findOne({
        where: {
            contrato_id: req.params.contrato_id
        }
    }).then(facturas => res.send(facturas))
});

router.post("/facturas/new", (req, res) => {
    db.facturas.create({
        contrato_id: req.body.contrato_id,
        subtotal: req.body.subtotal,
        descuento: req.body.descuento,

    }).then(submitedfacturas => res.send(submitedfacturas))
});

router.delete("/facturas/delete/:factura_id", (req, res) => {
    db.clientes.destroy({
        where: {
            contrato_id: req.params.contrato_id
        }
    }).then(() => res.send("success"));
});

router.put("/facturas/edit/:cliente_id", (req, res) => {
    db.facturas.update({
        subtotal: req.body.subtotal,
        descuento: req.body.descuento,
    }, {
        where: { contrato_id: req.params.contrato_id }
    }).then(() => res.send("success"));
});


module.exports = router;