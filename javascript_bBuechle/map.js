/* 
  Becca Buechle
  ICT-4510-1
  March 11, 2024
*/

/*  Allows for intagration of maps on a website using the Leaflet API */
var map = L.map('map').setView([47.61024679869361, -122.34244284562216], 15);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 20,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var marker = L.marker([47.61024679869361, -122.34244284562216]).addTo(map);

var circle = L.circle([47.61024679869361, -122.34244284562216], {
  color: 'red',
  fillColor: '#f03',
  fillOpacity: 0.5,
  radius: 500
}).addTo(map);