// Rutas de la API para autenticación, sorteos, tickets y caja.
const { Router } = require('express');
const { autenticar, permitir } = require('../middlewares/auth');
const auth = require('../controllers/authController');
const sorteos = require('../controllers/sorteoController');
const tickets = require('../controllers/ticketController');
const caja = require('../controllers/cajaController');

const router = Router();

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     description: Autentica un usuario y genera un token JWT.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - usuario
 *               - password
 *             properties:
 *               usuario:
 *                 type: string
 *                 example: usuario123
 *               password:
 *                 type: string
 *                 format: password
 *                 example: Password123
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6...
 *                 token_type:
 *                   type: string
 *                   example: bearer
 *       401:
 *         description: Credenciales Inválidas
 *       403:
 *         description: Usuario inactivo
 *       500:
 *         description: Error interno del servidor
 */



/**
 * @swagger
 * /api/v1/auth/perfil:
 *   get:
 *     summary: Obtener perfil del usuario
 *     description: Recupera la información del perfil del usuario autenticado.
 *     tags:
 *       - Authentication
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil del usuario obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 usuario:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "123456"
 *                     usuario:
 *                       type: string
 *                       example: usuario123
 *                     nombre:
 *                       type: string
 *                       example: Nombre del Usuario
 *                     rol:
 *                       type: string
 *                       example: ADMIN
 *       401:
 *         description: Credenciales inválidas
 *       403:
 *         description: Usuario inactivo
 *       500:
 *         description: Error interno del servidor
 */


/**
 * @swagger
 * /api/v1/auth/perfil:
 *   get:
 *     summary: Obtener perfil del usuario
 *     description: Recupera el perfil del usuario autenticado. Requiere un token JWT y los permisos correspondientes.
 *     tags:
 *       - Authentication
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 usuario:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     usuario:
 *                       type: string
 *                       example: admin
 *                     nombre:
 *                       type: string
 *                       example: Administrador
 *                     rol:
 *                       type: string
 *                       example: ADMIN
 *       401:
 *         description: Token inválido o no proporcionado
 *       403:
 *         description: Usuario sin permisos o inactivo
 *       500:
 *         description: Error interno del servidor
 */


/**
 * @swagger
 * /api/v1/sorteos:
 *   get:
 *     summary: Listar sorteos
 *     description: Obtiene el listado de sorteos según los filtros especificados.
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Sorteos
 *     parameters:
 *       - in: query
 *         name: pagina
 *         schema:
 *           tipo: string
 *           example: CHANCE
 *         description: Tipo de sorteo.
 *       - in: query
 *         name: estado
 *         schema:
 *           type: string
 *           example: ABIERTO
 *         description: Filtrar sorteos por estado.
 *     responses:
 *       200:
 *         description: Sorteos obtenidos exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   nombre:
 *                     type: string
 *                     example: Sorteo Principal
 *                   estado:
 *                     type: string
 *                     example: ACTIVO
 *       500:
 *         description: Error interno del servidor
 */


/**
 * @swagger
 * /api/v1/sorteos/{id}:
 *   get:
 *     summary: Obtener sorteo por ID
 *     description: Recupera la información de un sorteo específico mediante su identificador. Requiere autenticación JWT.
 *     tags:
 *       - Sorteos
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identificador del sorteo
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Sorteo obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 nombre:
 *                   type: string
 *                   example: Sorteo Principal
 *                 estado:
 *                   type: string
 *                   example: ACTIVO
 *       401:
 *         description: Token inválido o no proporcionado
 *       404:
 *         description: Sorteo no encontrado
 *       500:
 *         description: Error interno del servidor
 */


/**
 * @swagger
 * /api/v1/sorteos:
 *   post:
 *     summary: Crear sorteo
 *     description: Registra un nuevo sorteo. Requiere autenticación JWT y rol ADMIN.
 *     tags:
 *       - Sorteos
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Sorteo Principal
 *               descripcion:
 *                 type: string
 *                 example: Sorteo especial de temporada
 *               estado:
 *                 type: string
 *                 example: ACTIVO
 *     responses:
 *       201:
 *         description: Sorteo creado exitosamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: Token inválido o no proporcionado
 *       403:
 *         description: No tiene permisos para esta acción. Se requiere rol ADMIN.
 *       500:
 *         description: Error interno del servidor
 */


/**
 * @swagger
 * /api/v1/sorteos:
 *   post:
 *     summary: Crear sorteo
 *     description: Registra un nuevo sorteo. Requiere autenticación JWT y rol ADMIN.
 *     tags:
 *       - Sorteos
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tipo
 *               - nombre
 *               - fecha
 *             properties:
 *               tipo:
 *                 type: string
 *                 example: LOTERIA
 *                 description: Tipo de sorteo.
 *               nombre:
 *                 type: string
 *                 example: Sorteo Principal
 *                 description: Nombre del sorteo.
 *               fecha:
 *                 type: string
 *                 format: date
 *                 example: "2026-12-15"
 *                 description: Fecha del sorteo.
 *               acumulado:
 *                 type: number
 *                 default: 0
 *                 example: 0
 *                 description: Valor acumulado del sorteo.
 *     responses:
 *       201:
 *         description: Sorteo creado exitosamente.
 *       400:
 *         description: Datos inválidos.
 *       401:
 *         description: Token inválido o no proporcionado.
 *       403:
 *         description: No tiene permisos. Se requiere rol ADMIN.
 *       500:
 *         description: Error interno del servidor.
 */


/**
 * @swagger
 * /api/v1/sorteos/{id}/resultado:
 *   post:
 *     summary: Registrar resultado del sorteo
 *     description: Registra el resultado de un sorteo existente. Requiere autenticación JWT y rol ADMIN.
 *     tags:
 *       - Sorteos
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identificador del sorteo
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - resultado
 *             properties:
 *               resultado:
 *                 type: string
 *                 example: "1234"
 *                 description: Resultado ganador del sorteo.
 *     responses:
 *       200:
 *         description: Resultado registrado exitosamente.
 *       400:
 *         description: Datos inválidos.
 *       401:
 *         description: Token inválido o no proporcionado.
 *       403:
 *         description: No tiene permisos. Se requiere rol ADMIN.
 *       404:
 *         description: Sorteo no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */

/**
 * @swagger
 * /api/v1/tickets/chance:
 *   post:
 *     summary: Vender ticket de Chance
 *     description: Registra la venta de un ticket de Chance con sus apuestas y datos del cliente. Requiere autenticación y rol VENDEDOR.
 *     tags:
 *       - Tickets
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - sorteoId
 *               - apuestas
 *               - cliente
 *             properties:
 *               sorteoId:
 *                 type: integer
 *                 example: 1
 *                 description: Identificador del sorteo.
 *               apuestas:
 *                 type: array
 *                 description: Lista de apuestas incluidas en el ticket.
 *                 items:
 *                   type: object
 *                   example:
 *                     numero: "1234"
 *                     valor: 5000
 *               cliente:
 *                 type: string
 *                 example: "Juan Pérez"
 *                 description: Nombre del cliente.
 *     responses:
 *       201:
 *         description: Ticket de Chance vendido exitosamente.
 *       400:
 *         description: Datos inválidos o apuesta no permitida.
 *       401:
 *         description: Token inválido o no proporcionado.
 *       403:
 *         description: No tiene permisos. Se requiere rol VENDEDOR.
 *       404:
 *         description: Sorteo no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */

/**
 * @swagger
 * /api/v1/tickets/baloto:
 *   post:
 *     summary: Vender ticket de Baloto
 *     description: Registra la venta de un ticket de Baloto. Cada ticket puede contener entre 1 y 10 jugadas. Requiere autenticación y rol VENDEDOR.
 *     tags:
 *       - Tickets
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - sorteoId
 *               - jugadas
 *             properties:
 *               sorteoId:
 *                 type: integer
 *                 example: 1
 *                 description: Identificador del sorteo de Baloto.
 *               jugadas:
 *                 type: array
 *                 minItems: 1
 *                 maxItems: 10
 *                 description: Lista de jugadas del ticket. Se permiten entre 1 y 10.
 *                 items:
 *                   type: object
 *                   example:
 *                     numeros: [5, 12, 18, 25, 34]
 *                     superbalota: 9
 *               cliente:
 *                 type: string
 *                 nullable: true
 *                 example: "Juan Pérez"
 *                 description: Nombre del cliente. Es opcional.
 *     responses:
 *       201:
 *         description: Ticket de Baloto vendido exitosamente.
 *       400:
 *         description: Datos inválidos, cantidad de jugadas incorrecta o venta no permitida.
 *       401:
 *         description: Token inválido o no proporcionado.
 *       403:
 *         description: No tiene permisos. Se requiere rol VENDEDOR.
 *       404:
 *         description: Sorteo no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */

/**
 * @swagger
 * /api/v1/tickets:
 *   get:
 *     summary: Listar tickets del usuario
 *     description: Obtiene los tickets asociados al usuario autenticado. Permite filtrar por fecha y estado.
 *     tags:
 *       - Tickets
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: fecha
 *         required: false
 *         description: Fecha de los tickets que se desean consultar.
 *         schema:
 *           type: string
 *           format: date
 *           example: "2026-11-12"
 *       - in: query
 *         name: estado
 *         required: false
 *         description: Estado de los tickets que se desean consultar.
 *         schema:
 *           type: string
 *           example: "ACTIVO"
 *     responses:
 *       200:
 *         description: Lista de tickets obtenida exitosamente.
 *       401:
 *         description: Token inválido o no proporcionado.
 *       500:
 *         description: Error interno del servidor.
 */

/**
 * @swagger
 * /api/v1/tickets/{codigo}:
 *   get:
 *     summary: Consultar ticket por código
 *     description: Obtiene la información de un ticket utilizando su código único.
 *     tags:
 *       - Tickets
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: codigo
 *         required: true
 *         description: Código único del ticket.
 *         schema:
 *           type: string
 *           example: "BALOTO-20261112-0001"
 *     responses:
 *       200:
 *         description: Ticket consultado exitosamente.
 *       401:
 *         description: Token inválido o no proporcionado.
 *       404:
 *         description: Ticket no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */

/**
 * @swagger
 * /api/v1/tickets/{codigo}/anular:
 *   post:
 *     summary: Anular ticket
 *     description: Anula un ticket existente indicando el motivo. Requiere autenticación JWT.
 *     tags:
 *       - Tickets
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: codigo
 *         required: true
 *         description: Código único del ticket que se desea anular.
 *         schema:
 *           type: string
 *           example: "BALOTO-20261112-0001"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - motivo
 *             properties:
 *               motivo:
 *                 type: string
 *                 example: "Error al registrar los números de la jugada."
 *                 description: Motivo por el cual se solicita la anulación.
 *     responses:
 *       200:
 *         description: Ticket anulado exitosamente.
 *       400:
 *         description: No se puede anular el ticket o el motivo es inválido.
 *       401:
 *         description: Token inválido o no proporcionado.
 *       404:
 *         description: Ticket no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */

/**
 * @swagger
 * /api/v1/tickets/{codigo}/pagar:
 *   post:
 *     summary: Pagar ticket
 *     description: Registra el pago de un ticket mediante su código. Requiere autenticación y rol VENDEDOR.
 *     tags:
 *       - Tickets
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: codigo
 *         required: true
 *         description: Código único del ticket que se desea pagar.
 *         schema:
 *           type: string
 *           example: "BALOTO-20261112-0001"
 *     responses:
 *       200:
 *         description: Ticket pagado exitosamente.
 *       400:
 *         description: El ticket no puede pagarse o ya fue pagado.
 *       401:
 *         description: Token inválido o no proporcionado.
 *       403:
 *         description: No tiene permisos. Se requiere rol VENDEDOR.
 *       404:
 *         description: Ticket no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */

/**
 * @swagger
 * /api/v1/caja/resumen:
 *   get:
 *     summary: Consultar resumen de caja
 *     description: Obtiene el resumen de caja de un vendedor para una fecha específica. Si no se indica fecha, utiliza la fecha local actual.
 *     tags:
 *       - Caja
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: fecha
 *         required: false
 *         description: Fecha para consultar el resumen de caja. Por defecto, utiliza la fecha local actual.
 *         schema:
 *           type: string
 *           format: date
 *           example: "2026-11-12"
 *     responses:
 *       200:
 *         description: Resumen de caja obtenido exitosamente.
 *       401:
 *         description: Token inválido o no proporcionado.
 *       404:
 *         description: No se encontraron registros de caja para la fecha indicada.
 *       500:
 *         description: Error interno del servidor.
 */

/**
 * @swagger
 * /api/v1/caja/cierre:
 *   post:
 *     summary: Realizar cierre de caja
 *     description: Registra el cierre de caja de un vendedor indicando el efectivo reportado. Si no se especifica una fecha, utiliza la fecha local actual.
 *     tags:
 *       - Caja
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - efectivoReportado
 *             properties:
 *               efectivoReportado:
 *                 type: number
 *                 format: double
 *                 minimum: 0
 *                 example: 150000
 *                 description: Cantidad de efectivo reportada por el vendedor.
 *               fecha:
 *                 type: string
 *                 format: date
 *                 example: "2026-11-12"
 *                 description: Fecha del cierre de caja. Por defecto, utiliza la fecha local actual.
 *     responses:
 *       201:
 *         description: Cierre de caja registrado exitosamente.
 *       400:
 *         description: Datos inválidos o cierre de caja no permitido.
 *       401:
 *         description: Token inválido o no proporcionado.
 *       403:
 *         description: No tiene permisos. Se requiere rol VENDEDOR.
 *       500:
 *         description: Error interno del servidor.
 */


router.post('/auth/login', auth.login);
router.get('/auth/perfil', autenticar, auth.perfil);

router.get('/sorteos', autenticar, sorteos.listar);
router.get('/sorteos/:id', autenticar, sorteos.obtener);
router.post('/sorteos', autenticar, permitir('ADMIN'), sorteos.crear);
router.post('/sorteos/:id/resultado', autenticar, permitir('ADMIN'), sorteos.registrarResultado);

router.post('/tickets/chance', autenticar, permitir('VENDEDOR'), tickets.venderChance);
router.post('/tickets/baloto', autenticar, permitir('VENDEDOR'), tickets.venderBaloto);
router.get('/tickets', autenticar, tickets.listar);
router.get('/tickets/:codigo', autenticar, tickets.consultar);
router.post('/tickets/:codigo/anular', autenticar, tickets.anular);
router.post('/tickets/:codigo/pagar', autenticar, permitir('VENDEDOR'), tickets.pagar);

router.get('/caja/resumen', autenticar, caja.resumen);
router.post('/caja/cierre', autenticar, permitir('VENDEDOR'), caja.cerrar);

module.exports = router;
