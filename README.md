# 🛍️ Ecommerce Catalog Scraper – 6PM

Aplicación web diseñada para automatizar el scraping de productos desde el ecommerce **6pm.com**, generando archivos CSV compatibles con **Shopify** de forma rápida y eficiente.

---

## 🚀 Características principales

- 🔍 Scraping especializado para productos de 6PM.
- 📦 Generación de archivos CSV listos para importar a Shopify.
- ⚙️ Análisis del HTML utilizando `axios` y `node-html-parser`.
- 🔐 Autenticación con JWT.
- 📁 Almacenamiento de resultados en MongoDB.
- 🧠 Altamente optimizada: puede recolectar **14,000 productos en 11 minutos**.
- 💻 Interfaz web moderna con React.
- 🔄 Scroll infinito para navegación de archivos generados.

---

## 🧰 Tecnologías utilizadas

- **Backend**: Node.js, Express, MongoDB, JWT.
- **Frontend**: React, Context API, React Router.
- **Librerías clave**:
  - `axios`
  - `node-html-parser`
  - `json2csv`
  - `sonner` (notificaciones)
  - `p-limit` (control de concurrencia)

---

## ⚙️ Funcionalidad general

1. El usuario inicia sesión mediante una interfaz protegida.
2. El sistema permite ingresar una URL de listado de productos de 6PM.
3. Se extraen los enlaces de productos y se procesan de forma concurrente.
4. La información relevante (nombre, marca, SKU, imágenes, precio, descripción, stock, etc.) se analiza y almacena.
5. Se genera un archivo CSV compatible con la estructura de importación de Shopify.
6. Los archivos se listan en el frontend con scroll infinito y pueden ser descargados.

---

## 📄 Requisitos para usar

- Conexión a internet estable.
- Node.js 18 o superior.
- MongoDB en ejecución (local o remoto).
- Cuenta válida (sistema de login implementado).

