# API Endpoints — SORTEO

## 1. Descripción

Documentación técnica de los endpoints de la API REST del sistema de Lotería y Sorteos, desarrollada con **Node.js y Express.js**.

Este documento describe los métodos HTTP, rutas, parámetros, estructuras de solicitudes (payloads), autenticación, permisos y códigos de respuesta utilizados por la API.

La API permite administrar sorteos, registrar resultados, vender tickets de Chance y Baloto, consultar y gestionar tickets, y controlar las operaciones de caja de los vendedores.

## 2. Contexto de URL de la API

| Información | Descripción |
|---|---|
| **Base URL** | `http://localhost:3000` |
| **Versionamiento** | Todos los endpoints utilizan el prefijo `/api/v1/` |
| **Formato** | JSON en solicitudes y respuestas |
| **Content-Type** | `application/json` |
| **Autenticación** | JWT (JSON Web Token) |
| **Documentación interactiva** | `http://localhost:3000/api-docs` |

## 3. Autenticación

La API utiliza JWT para autenticar a los usuarios y controlar el acceso a los diferentes recursos.

Para acceder a los endpoints protegidos se debe enviar el token en la cabecera HTTP:

```http
Authorization: Bearer TU_TOKEN_JWT
```

### Roles disponibles

| Rol | Descripción |
|---|---|
| `ADMIN` | Administrador del sistema. Puede gestionar sorteos y realizar operaciones administrativas. |
| `VENDEDOR` | Usuario encargado de vender tickets, registrar pagos y gestionar operaciones de caja. |

**Importante:** El usuario autenticado se identifica mediante el token JWT. No es necesario enviar su identificador manualmente cuando el endpoint lo obtiene de `req.usuario`.

## 4. Resumen de endpoints

| Método | Ruta | Descripción | Autenticación | Rol |
|---|---|---|---|---|
| POST | `/api/v1/auth/login` | Iniciar sesión | No | Público |
| GET | `/api/v1/auth/perfil` | Consultar perfil | Sí | Usuario autenticado |
| GET | `/api/v1/sorteos` | Listar sorteos | Sí | Usuario autenticado |
| GET | `/api/v1/sorteos/{id}` | Consultar sorteo | Sí | Usuario autenticado |
| POST | `/api/v1/sorteos` | Crear sorteo | Sí | ADMIN |
| POST | `/api/v1/sorteos/{id}/resultado` | Registrar resultado | Sí | ADMIN |
| POST | `/api/v1/tickets/chance` | Vender ticket de Chance | Sí | VENDEDOR |
| POST | `/api/v1/tickets/baloto` | Vender ticket de Baloto | Sí | VENDEDOR |
| GET | `/api/v1/tickets` | Listar tickets | Sí | Usuario autenticado |
| GET | `/api/v1/tickets/{codigo}` | Consultar ticket | Sí | Usuario autenticado |
| POST | `/api/v1/tickets/{codigo}/anular` | Anular ticket | Sí | Usuario autenticado |
| POST | `/api/v1/tickets/{codigo}/pagar` | Pagar ticket | Sí | VENDEDOR |
| GET | `/api/v1/caja/resumen` | Consultar resumen de caja | Sí | Usuario autenticado |
| POST | `/api/v1/caja/cierre` | Realizar cierre de caja | Sí | VENDEDOR |

**Rate Limit:** No se ha documentado un límite de solicitudes porque no se ha confirmado la configuración de un middleware de limitación de peticiones.

---

# 5. Códigos de estado HTTP

| Código | Significado | Descripción |
|---|---|---|
| 200 | OK | Operación realizada exitosamente. |
| 201 | Created | Recurso creado exitosamente. |
| 400 | Bad Request | Datos inválidos o solicitud incorrecta. |
| 401 | Unauthorized | Token inválido, expirado o ausente. |
| 403 | Forbidden | Usuario autenticado sin permisos suficientes. |
| 404 | Not Found | Recurso solicitado no encontrado. |
| 422 | Unprocessable Entity | Datos recibidos que no cumplen las validaciones de negocio, si la API utiliza este código. |
| 429 | Too Many Requests | Límite de solicitudes superado, si existe Rate Limit. |
| 500 | Internal Server Error | Error interno del servidor. |

---

# 6. Autenticación — AUTH

## 6.1 POST `/api/v1/auth/login`

Autentica al usuario y devuelve un token JWT para acceder a los endpoints protegidos.

**Autenticación:** No requerida.

### Request body

```json
{
  "usuario": "admin",
  "password": "miContraseña"
}
```

| Campo | Tipo | Requerido | Descripción |
|---|---|---|---|
| `usuario` | string | Sí | Nombre de usuario. |
| `password` | string | Sí | Contraseña del usuario. |

### Respuesta exitosa — 200 OK

```json
{
  "token": "JWT_TOKEN",
  "usuario": {
    "id": 1,
    "usuario": "admin",
    "nombre": "Administrador",
    "rol": "ADMIN"
  }
}
```

| Campo | Tipo | Descripción |
|---|---|---|
| `token` | string | Token JWT de acceso. |
| `usuario.id` | integer | Identificador del usuario. |
| `usuario.usuario` | string | Nombre de usuario. |
| `usuario.nombre` | string | Nombre del usuario. |
| `usuario.rol` | string | Rol asignado al usuario. |

**Duración del token:** 8 horas, según la configuración `JWT_EXPIRES_IN`.

### Errores posibles

| Código | Condición |
|---|---|
| 400 | Datos de inicio de sesión inválidos. |
| 401 | Credenciales incorrectas. |
| 403 | Usuario inactivo. |
| 500 | Error interno del servidor. |

## 6.2 GET `/api/v1/auth/perfil`

Obtiene la información del usuario autenticado mediante su token JWT.

**Autenticación:** Requerida.

### Headers

```http
Authorization: Bearer TU_TOKEN_JWT
```

### Request body

No requiere cuerpo JSON. La identificación del usuario se obtiene del JWT.

### Respuesta exitosa — 200 OK

```json
{
  "id": 1,
  "usuario": "admin",
  "nombre": "Administrador",
  "rol": "ADMIN"
}
```

| Campo | Tipo | Descripción |
|---|---|---|
| `id` | integer | Identificador del usuario. |
| `usuario` | string | Nombre de usuario. |
| `nombre` | string | Nombre del usuario. |
| `rol` | string | Rol del usuario. |

### Errores posibles

| Código | Condición |
|---|---|
| 401 | Token requerido. |
| 401 | Usuario no válido. |
| 401 | Token inválido o expirado. |
| 403 | Permisos insuficientes, si aplica una restricción adicional de rol. |

---

# 7. Sorteos — SORTEOS

## 7.1 GET `/api/v1/sorteos`

Obtiene el listado de sorteos disponibles.

**Autenticación:** Requerida.

### Parámetros de consulta

Los filtros y opciones de paginación deben corresponder a los implementados en `sorteoService.listar`.

| Parámetro | Tipo | Requerido | Descripción |
|---|---|---|---|
| `fecha` | string | No | Fecha para filtrar sorteos, si está soportada. |
| `estado` | string | No | Estado del sorteo, si está soportado. |

### Ejemplo de consulta

```http
GET /api/v1/sorteos
```

### Respuesta exitosa — 200 OK

Devuelve el listado de sorteos según los filtros aplicados.

### Errores posibles

| Código | Condición |
|---|---|
| 401 | Token inválido o no proporcionado. |
| 500 | Error interno del servidor. |

## 7.2 GET `/api/v1/sorteos/{id}`

Obtiene los detalles de un sorteo mediante su identificador.

**Autenticación:** Requerida.

### Parámetros de ruta

| Parámetro | Tipo | Requerido | Descripción |
|---|---|---|---|
| `id` | integer | Sí | Identificador del sorteo. |

### Ejemplo de consulta

```http
GET /api/v1/sorteos/1
```

### Respuesta exitosa — 200 OK

Devuelve la información del sorteo solicitado.

### Errores posibles

| Código | Condición |
|---|---|
| 401 | Token inválido o no proporcionado. |
| 404 | Sorteo no encontrado. |
| 500 | Error interno del servidor. |

## 7.3 POST `/api/v1/sorteos`

Crea un nuevo sorteo en el sistema.

**Autenticación:** Requerida.

**Rol permitido:** `ADMIN`.

### Request body

```json
{
  "tipo": "LOTERIA",
  "nombre": "Lotería de prueba",
  "fecha": "2026-11-12",
  "acumulado": 0
}
```

| Campo | Tipo | Requerido | Descripción |
|---|---|---|---|
| `tipo` | string | Sí | Tipo de sorteo. |
| `nombre` | string | Sí | Nombre del sorteo. |
| `fecha` | string (date) | Sí | Fecha programada del sorteo. |
| `acumulado` | number | No | Valor acumulado. Por defecto es `0`. |

### Respuesta exitosa — 201 Created

Sorteo creado exitosamente.

### Errores posibles

| Código | Condición |
|---|---|
| 400 | Datos inválidos. |
| 401 | Token inválido o no proporcionado. |
| 403 | El usuario no tiene rol ADMIN. |
| 500 | Error interno del servidor. |

## 7.4 POST `/api/v1/sorteos/{id}/resultado`

Registra el resultado ganador de un sorteo existente.

**Autenticación:** Requerida.

**Rol permitido:** `ADMIN`.

### Parámetros de ruta

| Parámetro | Tipo | Requerido | Descripción |
|---|---|---|---|
| `id` | integer | Sí | Identificador del sorteo. |

### Request body

```json
{
  "resultado": "1234"
}
```

| Campo | Tipo | Requerido | Descripción |
|---|---|---|---|
| `resultado` | string | Sí | Resultado ganador del sorteo. |

Se utiliza string para conservar posibles ceros iniciales en los resultados.

### Respuesta exitosa — 200 OK

Resultado registrado exitosamente.

### Errores posibles

| Código | Condición |
|---|---|
| 400 | Datos inválidos. |
| 401 | Token inválido o no proporcionado. |
| 403 | El usuario no tiene rol ADMIN. |
| 404 | Sorteo no encontrado. |
| 500 | Error interno del servidor. |

---

# 8. Tickets — TICKETS

## 8.1 POST `/api/v1/tickets/chance`

Registra la venta de un ticket de Chance, incluyendo el sorteo, las apuestas y los datos del cliente.

**Autenticación:** Requerida.

**Rol permitido:** `VENDEDOR`.

### Request body

```json
{
  "sorteoId": 1,
  "apuestas": [
    {
      "numero": "1234",
      "valor": 5000
    }
  ],
  "cliente": "Juan Pérez"
}
```

| Campo | Tipo | Requerido | Descripción |
|---|---|---|---|
| `sorteoId` | integer | Sí | Identificador del sorteo. |
| `apuestas` | array | Sí | Lista de apuestas del ticket. |
| `cliente` | string | Según validación | Información del cliente. |

**Nota:** La estructura interna de cada apuesta debe ajustarse a las validaciones implementadas en `chanceService`.

### Respuesta exitosa — 201 Created

Ticket de Chance vendido exitosamente.

### Errores posibles

| Código | Condición |
|---|---|
| 400 | Datos inválidos o venta no permitida. |
| 401 | Token inválido o no proporcionado. |
| 403 | El usuario no tiene rol VENDEDOR. |
| 404 | Sorteo no encontrado. |
| 500 | Error interno del servidor. |

## 8.2 POST `/api/v1/tickets/baloto`

Registra la venta de un ticket de Baloto con sus respectivas jugadas.

Cada ticket permite registrar entre 1 y 10 jugadas.

**Autenticación:** Requerida.

**Rol permitido:** `VENDEDOR`.

### Request body

```json
{
  "sorteoId": 1,
  "jugadas": [
    {
      "numeros": [5, 12, 18, 25, 34],
      "superbalota": 9
    }
  ],
  "cliente": "Juan Pérez"
}
```

| Campo | Tipo | Requerido | Descripción |
|---|---|---|---|
| `sorteoId` | integer | Sí | Identificador del sorteo de Baloto. |
| `jugadas` | array | Sí | Lista de jugadas del ticket. |
| `cliente` | string o null | No | Nombre del cliente. |

### Validaciones

- El sorteo debe existir.
- La venta debe estar permitida.
- Se requiere al menos una jugada.
- Se permite un máximo de 10 jugadas.
- Cada jugada pasa por la validación de `baloto.validarJugada`.
- El valor total se calcula automáticamente según la cantidad de jugadas y `valorBaloto`.

**Importante:** El ejemplo de los números es ilustrativo. La estructura exacta de cada jugada depende de las reglas implementadas en `baloto.validarJugada`.

### Respuesta exitosa — 201 Created

Ticket de Baloto vendido exitosamente.

### Errores posibles

| Código | Condición |
|---|---|
| 400 | Cantidad de jugadas incorrecta, datos inválidos o venta no permitida. |
| 401 | Token inválido o no proporcionado. |
| 403 | El usuario no tiene rol VENDEDOR. |
| 404 | Sorteo no encontrado. |
| 500 | Error interno del servidor. |

## 8.3 GET `/api/v1/tickets`

Obtiene los tickets asociados al usuario autenticado.

Permite aplicar filtros por fecha y estado.

**Autenticación:** Requerida.

### Parámetros de consulta

| Parámetro | Tipo | Requerido | Descripción |
|---|---|---|---|
| `fecha` | string (date) | No | Fecha de los tickets que se desean consultar. |
| `estado` | string | No | Estado de los tickets que se desean consultar. |

### Ejemplo de consulta

```http
GET /api/v1/tickets?fecha=2026-11-12&estado=ACTIVO
```

También se puede consultar sin filtros:

```http
GET /api/v1/tickets
```

### Respuesta exitosa — 200 OK

Devuelve el listado de tickets del usuario autenticado.

### Errores posibles

| Código | Condición |
|---|---|
| 401 | Token inválido o no proporcionado. |
| 500 | Error interno del servidor. |

## 8.4 GET `/api/v1/tickets/{codigo}`

Consulta los detalles de un ticket mediante su código único.

**Autenticación:** Requerida.

### Parámetros de ruta

| Parámetro | Tipo | Requerido | Descripción |
|---|---|---|---|
| `codigo` | string | Sí | Código único del ticket. |

### Ejemplo de consulta

```http
GET /api/v1/tickets/BALOTO-20261112-0001
```

### Respuesta exitosa — 200 OK

Devuelve la información del ticket consultado.

### Errores posibles

| Código | Condición |
|---|---|
| 401 | Token inválido o no proporcionado. |
| 404 | Ticket no encontrado. |
| 500 | Error interno del servidor. |

## 8.5 POST `/api/v1/tickets/{codigo}/anular`

Anula un ticket mediante su código, registrando el motivo de la anulación.

**Autenticación:** Requerida.

### Parámetros de ruta

| Parámetro | Tipo | Requerido | Descripción |
|---|---|---|---|
| `codigo` | string | Sí | Código del ticket que se desea anular. |

### Request body

```json
{
  "motivo": "Error al registrar los números de la jugada."
}
```

| Campo | Tipo | Requerido | Descripción |
|---|---|---|---|
| `motivo` | string | Sí | Motivo de la anulación. |

### Respuesta exitosa — 200 OK

Ticket anulado exitosamente.

### Errores posibles

| Código | Condición |
|---|---|
| 400 | No se puede anular el ticket o motivo inválido. |
| 401 | Token inválido o no proporcionado. |
| 404 | Ticket no encontrado. |
| 500 | Error interno del servidor. |

**Nota:** El usuario que realiza la anulación se obtiene del JWT. No es necesario enviarlo en el cuerpo de la solicitud.

## 8.6 POST `/api/v1/tickets/{codigo}/pagar`

Registra el pago de un ticket mediante su código único.

**Autenticación:** Requerida.

**Rol permitido:** `VENDEDOR`.

### Parámetros de ruta

| Parámetro | Tipo | Requerido | Descripción |
|---|---|---|---|
| `codigo` | string | Sí | Código del ticket que se desea pagar. |

### Request body

No requiere cuerpo JSON.

### Headers

```http
Authorization: Bearer TU_TOKEN_JWT
```

### Ejemplo de consulta

```http
POST /api/v1/tickets/BALOTO-20261112-0001/pagar
```

### Respuesta exitosa — 200 OK

Ticket pagado exitosamente.

### Errores posibles

| Código | Condición |
|---|---|
| 400 | El ticket no puede pagarse o ya fue pagado. |
| 401 | Token inválido o no proporcionado. |
| 403 | El usuario no tiene rol VENDEDOR. |
| 404 | Ticket no encontrado. |
| 500 | Error interno del servidor. |

**Nota:** El vendedor que realiza el pago se identifica mediante el token JWT.

---

# 9. Caja — CAJA

## 9.1 GET `/api/v1/caja/resumen`

Obtiene el resumen de caja correspondiente al vendedor autenticado y a una fecha determinada.

**Autenticación:** Requerida.

### Parámetros de consulta

| Parámetro | Tipo | Requerido | Descripción |
|---|---|---|---|
| `fecha` | string (date) | No | Fecha para consultar el resumen. Si se omite, utiliza la fecha local actual. |

### Ejemplo de consulta

```http
GET /api/v1/caja/resumen?fecha=2026-11-12
```

También se puede consultar sin indicar fecha:

```http
GET /api/v1/caja/resumen
```

### Respuesta exitosa — 200 OK

Devuelve el resumen de caja del vendedor autenticado para la fecha solicitada.

### Errores posibles

| Código | Condición |
|---|---|
| 401 | Token inválido o no proporcionado. |
| 500 | Error interno del servidor. |

**Nota:** El identificador del vendedor se obtiene mediante el usuario autenticado. La fecha predeterminada se calcula utilizando `fechaLocal()`.

## 9.2 POST `/api/v1/caja/cierre`

Registra el cierre de caja de un vendedor, indicando el efectivo reportado.

**Autenticación:** Requerida.

**Rol permitido:** `VENDEDOR`.

### Request body

```json
{
  "efectivoReportado": 150000,
  "fecha": "2026-11-12"
}
```

| Campo | Tipo | Requerido | Descripción |
|---|---|---|---|
| `efectivoReportado` | number | Sí | Cantidad de efectivo reportada por el vendedor. |
| `fecha` | string (date) | No | Fecha del cierre de caja. Por defecto utiliza `fechaLocal()`. |

### Ejemplo sin fecha

```json
{
  "efectivoReportado": 150000
}
```

### Respuesta exitosa — 201 Created

Cierre de caja registrado exitosamente.

### Errores posibles

| Código | Condición |
|---|---|
| 400 | Datos inválidos o cierre no permitido. |
| 401 | Token inválido o no proporcionado. |
| 403 | El usuario no tiene rol VENDEDOR. |
| 500 | Error interno del servidor. |

**Nota:** El identificador del vendedor se obtiene del usuario autenticado. No es necesario enviarlo en el JSON.

---

# 10. Manejo de fechas y zona horaria

La API utiliza la zona horaria configurada mediante la variable de entorno:

```env
ZONA_HORARIA=America/Bogota
```

Las fechas recibidas en las solicitudes deben enviarse preferiblemente con el formato:

```text
YYYY-MM-DD
```

Para las marcas de tiempo generadas por JavaScript se utiliza el formato ISO 8601:

```text
2026-11-12T19:00:00.000Z
```

El sufijo `Z` indica que la fecha está expresada en UTC.

---

# 11. Documentación interactiva — Swagger

La API dispone de documentación interactiva mediante Swagger UI y OpenAPI.

**URL de acceso:**

```text
http://localhost:3000/api-docs
```

Swagger permite:

- Consultar todos los endpoints documentados.
- Identificar los métodos HTTP disponibles.
- Visualizar los parámetros y payloads.
- Consultar las respuestas y códigos HTTP.
- Ejecutar solicitudes directamente desde el navegador.
- Autorizar solicitudes mediante JWT.

Para utilizar endpoints protegidos:

1. Iniciar sesión en `/api/v1/auth/login`.
2. Copiar el token JWT recibido.
3. Seleccionar el botón `Authorize` en Swagger UI.
4. Introducir el token.
5. Ejecutar los endpoints protegidos.

---

# 12. Pruebas automatizadas

El proyecto utiliza Jest y Supertest para verificar el funcionamiento de los servicios y endpoints.

Los archivos de pruebas se encuentran en:

```text
tests/
├── auth.test.js
├── baloto.test.js
├── caja.test.js
├── chance.test.js
├── helpers.js
└── tickets.test.js
```

Para ejecutar las pruebas:

```bash
pnpm test
```

---

# 13. Documentación complementaria

La documentación adicional del proyecto se encuentra organizada de la siguiente manera:

```text
docs/
├── api-endpoint.md
└── HUS/
    └── HU-001-inicio de session.md
```

| Archivo | Descripción |
|---|---|
| `api-endpoint.md` | Documentación técnica de los endpoints de la API. |
| `HU-001-inicio de session.md` | Historia de usuario correspondiente al inicio de sesión. |

---

# 14. Consideraciones de seguridad

- Todas las contraseñas deben almacenarse utilizando mecanismos de hash seguros.
- No compartir ni publicar secretos JWT.
- No subir archivos `.env` al repositorio.
- Los endpoints administrativos deben verificar el rol del usuario.
- Los endpoints de vendedor deben validar que el usuario tenga el rol correspondiente.
- Las operaciones de venta, anulación y pago deben validar las reglas de negocio.
- Los datos recibidos deben validarse antes de procesarse.
- Las operaciones deben identificar al usuario mediante su token JWT.

---

**Proyecto:** API REST de Lotería y Sorteos.

**Tecnologías:** Node.js, Express.js, JavaScript, JWT, Swagger, Jest y Supertest.

**Versionamiento de API:** v1.

**Entorno de desarrollo:** `http://localhost:3000`.

*Fin de la documentación técnica de endpoints.*