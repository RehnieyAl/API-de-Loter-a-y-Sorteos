# Matriz de Trazabilidad – API de Lotería y Sorteos

| ID HU | Historia de usuario | Requisito | Módulo / Controlador | Caso de prueba sugerido | Estado QA |
|---|---|---|---|---|---|
| HU-001 | Inicio de sesión | Permitir que los usuarios inicien sesión mediante usuario y contraseña, generando un token JWT. | `authController.js` | `test_login_success()` | Pendiente |
| HU-002 | Consulta de perfil | Permitir que un usuario autenticado consulte su información y rol. | `authController.js` | `test_get_profile()` | Pendiente |
| HU-003 | Listado de sorteos | Permitir consultar los sorteos registrados en el sistema. | `sorteoController.js` | `test_list_draws()` | Pendiente |
| HU-004 | Consulta de sorteo | Permitir consultar la información de un sorteo mediante su identificador. | `sorteoController.js` | `test_get_draw_by_id()` | Pendiente |
| HU-005 | Creación de sorteos | Permitir al administrador registrar nuevos sorteos indicando tipo, nombre, fecha y acumulado. | `sorteoController.js` | `test_create_draw()` | Pendiente |
| HU-006 | Registro de resultados | Permitir al administrador registrar el resultado de un sorteo. | `sorteoController.js` | `test_register_draw_result()` | Pendiente |
| HU-007 | Venta de Chance | Permitir al vendedor registrar tiquetes de Chance asociados a un sorteo y sus apuestas. | `ticketController.js` | `test_sell_chance()` | Pendiente |
| HU-008 | Venta de Baloto | Permitir al vendedor registrar tiquetes de Baloto con entre 1 y 10 jugadas válidas. | `ticketController.js` | `test_sell_baloto()` | Pendiente |
| HU-009 | Listado de tiquetes | Permitir consultar los tiquetes según los filtros disponibles, como fecha y estado. | `ticketController.js` | `test_list_tickets()` | Pendiente |
| HU-010 | Consulta de tiquete | Permitir consultar un tiquete mediante su código único. | `ticketController.js` | `test_get_ticket_by_code()` | Pendiente |
| HU-011 | Anulación de tiquetes | Permitir anular un tiquete indicando el motivo de la anulación y respetando las reglas del sistema. | `ticketController.js` | `test_cancel_ticket()` | Pendiente |
| HU-012 | Pago de premios | Permitir al vendedor registrar el pago de un tiquete premiado. | `ticketController.js` | `test_pay_ticket()` | Pendiente |
| HU-013 | Resumen de caja | Permitir consultar el resumen de caja de un vendedor para una fecha determinada. | `cajaController.js` | `test_get_cash_summary()` | Pendiente |
| HU-014 | Cierre de caja | Permitir al vendedor realizar el cierre de caja reportando el efectivo recibido. | `cajaController.js` | `test_close_cash_register()` | Pendiente |

## Consideraciones

- Los casos de prueba son nombres propuestos para organizar las pruebas automatizadas con Jest y Supertest.
- El estado QA aparece como **Pendiente** porque debe actualizarse según los resultados reales de ejecución de las pruebas.
- Las operaciones administrativas deben respetar los permisos del rol `ADMIN`.
- Las operaciones de venta y pago deben respetar los permisos establecidos para `VENDEDOR`.
- Las operaciones protegidas deben validar la autenticación mediante JWT.
