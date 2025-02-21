# API Endpoints Documentacion

## Autenticación

### Login de verificadores
**Método:** `POST`  
**Endpoint:** `/api/auth/login`  
**Descripción:** Autenticación de verificadores  
**Body Ejemplo:**  
```json
{
  "email": "user@mail.com",
  "contraseña": "123"
}
```

---

## Casos

### Crear nuevo caso
**Método:** `POST`  
**Endpoint:** `/api/casos`  
**Descripción:** Crea un nuevo caso  
**Body:**  
```json
{
  "nombre_caso": "...",
  "coordenadas": "lat, lng"
}
```

### Obtener todos los casos
**Método:** `GET`  
**Endpoint:** `/api/casos`  
**Descripción:** Obtiene todos los casos verificados  

### Obtener todos los casos (admin)
**Método:** `GET`  
**Endpoint:** `/api/casos/all`  
**Descripción:** Obtiene todos los casos, incluyendo los no verificados  

### Obtener caso por ID
**Método:** `GET`  
**Endpoint:** `/api/casos/:id`  
**Descripción:** Obtiene un caso específico por su ID  
**Parámetro:** `:id` = ID del caso  

### Actualizar caso
**Método:** `PUT`  
**Endpoint:** `/api/casos/:id`  
**Descripción:** Actualiza un caso  
**Body:** Campos a actualizar  

### Eliminar caso
**Método:** `DELETE`  
**Endpoint:** `/api/casos/:id`  
**Descripción:** Elimina un caso  
**Parámetro:** `:id` = ID del caso  

---

## Testigos

### Crear testigo
**Método:** `POST`  
**Endpoint:** `/api/testigos`  
**Descripción:** Crea un nuevo testigo  
**Body:**  
```json
{
  "nombre": "...",
  "DNI": "..."
}
```

### Listar todos los testigos
**Método:** `GET`  
**Endpoint:** `/api/testigos`  
**Descripción:** Obtiene una lista de todos los testigos  

### Obtener testigo por ID
**Método:** `GET`  
**Endpoint:** `/api/testigos/:id`  
**Descripción:** Obtiene un testigo específico por su ID  
**Parámetro:** `:id` = ID del testigo  

### Actualizar testigo
**Método:** `PUT`  
**Endpoint:** `/api/testigos/:id`  
**Descripción:** Actualiza un testigo  
**Body:** Campos a actualizar  

### Eliminar testigo
**Método:** `DELETE`  
**Endpoint:** `/api/testigos/:id`  
**Descripción:** Elimina un testigo  
**Parámetro:** `:id` = ID del testigo  

---

## Víctimas

### Crear víctima
**Método:** `POST`  
**Endpoint:** `/api/victimas`  
**Descripción:** Crea una nueva víctima  
**Body:**  
```json
{
  "nombre": "...",
  "DNI": "..."
}
```

### Listar todas las víctimas
**Método:** `GET`  
**Endpoint:** `/api/victimas`  
**Descripción:** Obtiene una lista de todas las víctimas  

### Obtener víctima por ID
**Método:** `GET`  
**Endpoint:** `/api/victimas/:id`  
**Descripción:** Obtiene una víctima específica por su ID  
**Parámetro:** `:id` = ID de la víctima  

### Actualizar víctima
**Método:** `PUT`  
**Endpoint:** `/api/victimas/:id`  
**Descripción:** Actualiza una víctima  
**Body:** Campos a actualizar  

### Eliminar víctima
**Método:** `DELETE`  
**Endpoint:** `/api/victimas/:id`  
**Descripción:** Elimina una víctima  
**Parámetro:** `:id` = ID de la víctima  

---

## Verificadores

### Crear verificador
**Método:** `POST`  
**Endpoint:** `/api/verificadores`  
**Descripción:** Crea un nuevo verificador  
**Body:**  
```json
{
  "entidad": "...",
  "DNI": "..."
}
```

### Listar verificadores
**Método:** `GET`  
**Endpoint:** `/api/verificadores`  
**Descripción:** Obtiene una lista de verificadores  

### Obtener verificador por ID
**Método:** `GET`  
**Endpoint:** `/api/verificadores/:id`  
**Descripción:** Obtiene un verificador específico por su ID  
**Parámetro:** `:id` = ID del verificador  

### Actualizar verificador
**Método:** `PUT`  
**Endpoint:** `/api/verificadores/:id`  
**Descripción:** Actualiza un verificador  
**Body:** Campos a actualizar (sin contraseña)  

### Eliminar verificador
**Método:** `DELETE`  
**Endpoint:** `/api/verificadores/:id`  
**Descripción:** Elimina un verificador  
**Parámetro:** `:id` = ID del verificador  

---

## Fuentes Documentales

### Crear fuente
**Método:** `POST`  
**Endpoint:** `/api/fuentes`  
**Descripción:** Crea una nueva fuente documental  
**Body:**  
```json
{
  "descripcion_medio": "...",
  "url": "..."
}
```

### Listar todas las fuentes
**Método:** `GET`  
**Endpoint:** `/api/fuentes`  
**Descripción:** Obtiene una lista de todas las fuentes  

### Obtener fuente por ID
**Método:** `GET`  
**Endpoint:** `/api/fuentes/:id`  
**Descripción:** Obtiene una fuente específica por su ID  
**Parámetro:** `:id` = ID de la fuente  

### Actualizar fuente
**Método:** `PUT`  
**Endpoint:** `/api/fuentes/:id`  
**Descripción:** Actualiza una fuente documental  
**Body:** Campos a actualizar  

### Eliminar fuente
**Método:** `DELETE`  
**Endpoint:** `/api/fuentes/:id`  
**Descripción:** Elimina una fuente documental  
**Parámetro:** `:id` = ID de la fuente  

---

## Headers Requeridos

Para todas las rutas excepto login:  
```http
Authorization: Bearer {JWT_TOKEN}
Content-Type: application/json
