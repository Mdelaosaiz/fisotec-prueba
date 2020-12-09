# Prueba técnica Fisotec 

## Los requisitos de implementación son:

* Al pulsar sobre cada terremoto (círculo), aparezca en la parte de la derecha de la
ventana un formulario con toda la información de dicho punto.

* Crear un botón debajo de los del zoom, que nos permita ver un listado con todos los
elementos.

Para este proyecto se han tenido que instalar lo siguiente:

* Librería Leaflet.
* Data table.
* Jquery.

## ¿Cómo se ha realizado la prueba?

### Ventana de información.

Se ha utilizado el evento de apertura y cierre del popUp de la capa creada con los datos del Geojson.
La información de la ventana se ha rellenado con los siguientes datos recogidos del evento de la capa: 

* Tipo de terremoto.
* Lugar.
* Coordenadas.
* Magnitud. 
* Tsunamis.
* Color de alerta.

### Botón de información general.

Se ha utilizado L.Control de Leaflet para crear el botón y L.DomEvent para colocarle un listener "click" y que, al pinchar sobre el botón abra o cierre la tabla con la información de todos los eventos.

La tabla, creada con la libereía de JavaScript DataTables, está rellena con los datos devueltos en el fetch. Las columnas mostradas son las mismas que en la ventana de información. 

### Añadido de la programadora

Se ha usado una marca de agua propia de Leaflet (en la esquina superior derecha) para crear un link al github de Marián de la Osa, por si en algún momento se desea visitar.


## Programadora 👩‍💻
Esta prueba fue creada por Marián de la Osa.

¿cómo contactar conmigo?

GitHub: @Mdelaosaiz

Email: mariandelaosa@gmail.com

Twitter: @MariandelaOsa

LinkedIn: @marian-de-la-osa