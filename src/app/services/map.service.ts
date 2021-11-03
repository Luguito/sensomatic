import { Injectable, OnInit } from '@angular/core';
import { ChartSevice } from './charts.service'
declare let google;

@Injectable({
    providedIn: 'root'
})
export class MapService implements OnInit {
    map;
    poly;
    polys = [];
    constructor(private ch: ChartSevice) { }

    ngOnInit() { }

    initMap(element: HTMLElement) {
        this.map = new google.maps.Map(element, {
            center: { lat: 4.5709, lng: -74.2973 },
            zoom: 6,
            disableDefaultUI: true,
            mapTypeControl: true,
        })
    }

    getDataForMap(data): Promise<any> {
        return this.ch.getDataTracking(data).toPromise();
    }

    drawMarker({ latitude, longitude }) {
        let markers = new google.maps.Marker({
            position: new google.maps.LatLng(latitude, longitude),
            map: this.map,
        })
    }

    drawPolylines(path, value) {
        let polyline = new google.maps.Polyline({
            path,
            strokeColor: value < 1 ? "red" : "green",
            strokeOpacity: 1.0,
            strokeWeight: 2,
        });
        polyline.setMap(this.map);
        this.polys.push(polyline);
    }

    get getPolylines(){
        return this.polys;
    }

    setCenter(center){
        this.map.setCenter(center);
    }

    setZoom(zoom:number) {
        this.map.setZoom(zoom)
    }
    /**
     * 
     * @todo Centrar la linea general. Sin iteraciones
     */
    getCenterOfPoly(path) {
        var bounds = new google.maps.LatLngBounds();
        var points = path.getPath().getArray();
        console.log(points)
        for (var n = 0; n < path.length ; n++){
            bounds.extend(path[n]);
        }
        this.map.fitBounds(bounds);
    }
}