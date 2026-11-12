# API de Lotería y Sorteos

API REST desarrollada con **Node.js y Express.js** para la gestión de sorteos, venta de tickets de Chance y Baloto, autenticación de usuarios y administración de caja.

El proyecto implementa una arquitectura modular basada en controladores, servicios, rutas y middlewares, con autenticación mediante JWT y documentación interactiva utilizando Swagger.

## Tecnologías utilizadas

| Tecnología | Descripción |
|---|---|
| Node.js | Entorno de ejecución de JavaScript |
| Express.js | Framework para construir la API REST |
| pnpm | Gestor de paquetes |
| JWT | Autenticación y autorización |
| bcryptjs | Cifrado de contraseñas |
| dotenv | Gestión de variables de entorno |
| Swagger | Documentación interactiva de endpoints |
| Jest | Pruebas automatizadas |
| Supertest | Pruebas de endpoints HTTP |
| Morgan | Registro de solicitudes HTTP |
| CORS | Control de acceso entre orígenes |

## Funcionalidades

- **Autenticación:** inicio de sesión y consulta del perfil mediante JWT.
- **Gestión de usuarios:** identificación de usuarios y control de permisos.
- **Gestión de sorteos:** consulta, creación y registro de resultados.
- **Venta de Chance:** registro de tickets con múltiples apuestas.
- **Venta de Baloto:** registro de tickets con un máximo de 10 jugadas.
- **Consulta de tickets:** búsqueda por código y listado con filtros.
- **Anulación de tickets:** anulación mediante código y motivo.
- **Pago de tickets:** registro del pago de tickets.
- **Gestión de caja:** consulta de resumen y cierre de caja.
- **Control de acceso:** permisos según los roles `ADMIN` y `VENDEDOR`.
- **Documentación API:** especificación OpenAPI y Swagger UI.
- **Pruebas:** pruebas automatizadas con Jest y Supertest.

## Estructura del proyecto

```text
.
├── docs/
│   ├── api-endpoint.md
│   └── HUS/
│       └── HU-001-inicio de session.md
│
├── evidencia/
│   ├── Captura de pantalla_20261112_170543.png
│   └── Captura de pantalla_20261112_170730.png
│
├── src/
│   ├── app.js
│   ├── server.js
│   │
│   ├── config/
│   │   └── index.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── cajaController.js
│   │   ├── sorteoController.js
│   │   └── ticketController.js
│   │
│   ├── data/
│   │   └── store.js
│   │
│   ├── middlewares/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   │
│   ├── routes/
│   │   └── index.js
│   │
│   ├── services/
│   │   ├── authService.js
│   │   ├── balotoService.js
│   │   ├── cajaService.js
│   │   ├── chanceService.js
│   │   ├── sorteoService.js
│   │   └── ticketService.js
│   │
│   └── utils/
│       ├── AppError.js
│       ├── fechas.js
│       └── swagger.js
│
├── tests/
│   ├── auth.test.js
│   ├── baloto.test.js
│   ├── caja.test.js
│   ├── chance.test.js
│   ├── helpers.js
│   └── tickets.test.js
│
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
└── README.md
```

### Organización de carpetas

| Directorio | Responsabilidad |
|---|---|
| `config` | Configuración general y variables de entorno. |
| `controllers` | Recepción de solicitudes HTTP y respuestas. |
| `data` | Gestión de los datos de la aplicación. |
| `middlewares` | Autenticación, autorización y manejo de errores. |
| `routes` | Definición y agrupación de endpoints. |
| `services` | Lógica de negocio de cada módulo. |
| `utils` | Funciones auxiliares, fechas y Swagger. |
| `tests` | Pruebas automatizadas. |
| `docs` | Documentación técnica e historias de usuario. |
| `evidencia` | Capturas y evidencias del proyecto. |

## Requisitos previos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

- Node.js.
- pnpm.
- Git.

Puedes comprobar las instalaciones con:

```bash
node --version
pnpm --version
git --version
```

## Instalación

Clona el repositorio:

```bash
git clone URL_DEL_REPOSITORIO
```

Accede al directorio del proyecto:

```bash
cd nombre-del-proyecto
```

Instala las dependencias:

```bash
pnpm install
```

## Configuración de variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
PORT=3000

JWT_SECRET=tu_secreto_seguro
JWT_EXPIRES_IN=8h

ZONA_HORARIA=America/Bogota

MINUTOS_ANULACION=10
MINUTOS_CIERRE_VENTAS=15

APUESTA_MIN_CHANCE=500
APUESTA_MAX_CHANCE=50000

VALOR_BALOTO=5700

DIAS_CADUCIDAD_PREMIO=365
```

**Importante:** reemplaza `JWT_SECRET` por una clave segura. No compartas ni subas el archivo `.env` al repositorio.

Puedes utilizar `.env.example` como plantilla de configuración sin incluir secretos reales.

## Ejecución del proyecto

Para iniciar el servidor Node.js:

```bash
pnpm start
```

El servidor estará disponible en:

```text
http://localhost:3000
```

Si necesitas que el comando `pnpm start` funcione, verifica que tu `package.json` incluya este script:

```json
{
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js",
    "test": "jest --runInBand"
  }
}
```

Para iniciar en modo desarrollo:

```bash
pnpm dev
```

## Documentación de la API

La API utiliza Swagger con OpenAPI para documentar los endpoints y facilitar su consulta y prueba.

Una vez iniciado el servidor, accede a la documentación interactiva desde:

```text
http://localhost:3000/api-docs
```

Desde Swagger UI puedes:

- Consultar los endpoints disponibles.
- Revisar parámetros y cuerpos de las solicitudes.
- Visualizar ejemplos de respuestas.
- Probar operaciones HTTP.
- Autenticarte mediante JWT usando el botón **Authorize**.

Para utilizar endpoints protegidos, inicia sesión y copia el token JWT obtenido. Pégalo en Swagger UI para realizar las solicitudes autenticadas.

## Autenticación y roles

La API utiliza JSON Web Token (JWT) para identificar a los usuarios y controlar el acceso a los recursos.

Roles disponibles:

| Rol | Permisos generales |
|---|---|
| `ADMIN` | Administración de sorteos y operaciones administrativas. |
| `VENDEDOR` | Venta de tickets, pagos y operaciones de caja. |

Los endpoints protegidos requieren enviar el token en la cabecera HTTP:

```http
Authorization: Bearer TU_TOKEN_JWT
```

## Principales módulos de la API

| Módulo | Operaciones |
|---|---|
| Authentication | Inicio de sesión y consulta de perfil. |
| Sorteos | Listar, consultar, crear y registrar resultados. |
| Tickets | Venta de Chance y Baloto, consulta, anulación y pago. |
| Caja | Resumen y cierre de caja. |

La documentación detallada de los endpoints se encuentra en:

```text
docs/api-endpoint.md
```

## Pruebas automatizadas

El proyecto utiliza Jest y Supertest para realizar pruebas automatizadas.

Ejecuta todas las pruebas con:

```bash
pnpm test
```

Los archivos de pruebas se encuentran en el directorio `tests/`.

## Control de versiones

El proyecto utiliza Git para el seguimiento de cambios.

Comandos básicos:

```bash
git status
git add .
git commit -m "Descripción de los cambios"
git push origin main
```

## Seguridad

- No publicar archivos `.env`.
- Utilizar secretos JWT seguros.
- Proteger los endpoints mediante autenticación.
- Verificar los roles antes de permitir operaciones administrativas.
- Validar los datos recibidos en las solicitudes.
- Evitar almacenar contraseñas en texto plano.

## Autor

**Proyecto:** API de Lotería y Sorteos.

**Tecnologías principales:** Node.js, Express.js y JavaScript.

---

*Documentación técnica del proyecto API de Lotería y Sorteos.*