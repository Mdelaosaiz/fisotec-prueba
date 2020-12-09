'use strict';

var mapa = L.map("mapa", {
  center: [0, 0],
  zoom: 2
});

var capaOrtoFoto = L.esri.basemapLayer("Imagery");
capaOrtoFoto.addTo(mapa);

var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";
const pop = document.querySelector(".pop");
const type = document.querySelector(".type");
const place = document.querySelector(".place");
const coordinates = document.querySelector(".coord");
const magnitude = document.querySelector(".magnitude");
const tsunami = document.querySelector(".tsunami");
const evAlert = document.querySelector(".color");

L.Util.ajax(url).then(
  function (datosGeoJOSN) {
    //Se crea el HTML de la tabla y rellena con la información.
    let tableBody = '';
    
    for(let info of datosGeoJOSN.features){
      tableBody += `<tr>`;
      tableBody += `<td>` + info.properties.type + `</td>`;
      tableBody += `<td>` + info.properties.tsunami + `</td>`;
      tableBody += `<td>` + info.properties.place + `</td>`;
      tableBody += `<td>` + info.geometry.coordinates + `</td>`;
      tableBody += `<td>` + info.properties.mag + `</td>`;
      tableBody += `<td>` + info.properties.alert + `</td>`; 
      tableBody += `</tr>`;   

    }
    const tbody = document.querySelector("#tbody");
    tbody.innerHTML = tableBody;
    $('#table_id').DataTable();


    var capaTerremotos = L.geoJSON(datosGeoJOSN, {
      pointToLayer: function (entidad, latlng) {
        return L.circleMarker(latlng);
      },
      style: function (entidad) {
        var magnitud = entidad.properties.mag;
        var colorTerremoto;
        if (magnitud > 6) {
          colorTerremoto = "rgba(255, 0, 0)"
        } else if (magnitud <= 6 && magnitud > 5) {
          colorTerremoto = "rgba(255, 255, 0)"
        } else if (magnitud <= 5 && magnitud > 4) {
          colorTerremoto = "rgba(0, 255, 255)"
        } else {
          colorTerremoto = "rgba(0, 0, 255)"
        }

        var miEstilo = {
          radius: 1.6 ** magnitud,
          fillColor: colorTerremoto,
          fillOpacity: 0.4,
          color: "rgba(0, 0, 0, 0.7)",
          weight: 1
        };

        return miEstilo
      }
    });
    
    capaTerremotos.bindPopup(function (entidad) {
        return 'Magnitud: ' + entidad.feature.properties.mag
    });
    
    function popUpOpen (e){
      // Rellena los datos del HTML con los recogidos por el fetch
      pop.style.visibility = "visible";
      type.value = e.popup._source.feature.properties.type;
      place.value = e.popup._source.feature.properties.place;
      coordinates.value = e.popup._source.feature.geometry.coordinates;
      magnitude.value = e.popup._source.feature.properties.mag + " puntos.";
      evAlert.value = e.popup._source.feature.properties.alert;

      // Se pone el check de los tsunamis en true cuando haya un valor de 1
      if(e.popup._source.feature.properties.tsunami === 1){
         tsunami.checked = true;
      }else{
        tsunami.checked = false;
      }
      
      // Según el nivel de alerta del evento, se acambia el fondo del input.

      if(e.popup._source.feature.properties.alert === "green"){
        evAlert.style.backgroundColor = 'rgb(18, 190, 47)';
      } else if(e.popup._source.feature.properties.alert === "yellow"){
        evAlert.style.backgroundColor = 'rgb(246, 250, 6)';
      }else if(e.popup._source.feature.properties.alert === "orange"){
        evAlert.style.backgroundColor = 'rgb(247, 149, 3)';
      }else if(e.popup._source.feature.properties.alert === "red"){
        evAlert.style.backgroundColor = 'rgb(250, 2, 2)';
      } else if(e.popup._source.feature.properties.alert === null){
        evAlert.style.backgroundColor = 'rgb(255, 255, 255)'
      } 
      
    }

    function popUpClose (e){
      pop.style.visibility = "hidden";
      
    }
    
    capaTerremotos.addEventListener("popupopen", popUpOpen);

    capaTerremotos.addEventListener("popupclose", popUpClose);

    capaTerremotos.addTo(mapa);
  });
  
  //Crea el botón de información
  L.Control.Button = L.Control.extend({
      onAdd: function(map) {
       const button = L.DomUtil.create('button');
       button.style.width = '33px';
       button.style.height = '33px';
       button.style.cursor = 'pointer';
       
       button.innerHTML = '<img src="images/lupa.png" style="width:20px; padding-top:4px"/>';
       
       L.DomEvent
       .addListener(button, 'click', L.DomEvent.stopPropagation)
       .addListener(button, 'click', L.DomEvent.preventDefault)
       .addListener(button, 'click', function (){
        const table = document.querySelector('.table');
        table.classList.toggle('open');
        table.classList.toggle('close');              
       });
       return button;
      },
      
      onRemove: function(map) {
        
      }
    });

    L.control.button = function(opts) {
     return new L.Control.Button(opts);
    }

    L.control.button({ position: 'topleft' }).addTo(mapa);
  
  //Añade un pequeño detalle 
  L.Control.Watermark = L.Control.extend({
      onAdd: function(map) {
       var img = L.DomUtil.create('a');           
       img.href = 'https://github.com/Mdelaosaiz';
       img.innerHTML = '<img src="images/moi-github.png" target="_blank" title="Github Marián de la Osa" style="width: 80px;height: 70px; margin-right:10px;" />';          
       img.style.width = '70px';
       img.style.height = '70px';
       img.style.cursor = 'pointer';
       return img;
      },
      onRemove: function(map) {
      }
    });

    L.control.watermark = function(opts) {
     return new L.Control.Watermark(opts);
    }

    L.control.watermark({ position: 'topright' }).addTo(mapa);

