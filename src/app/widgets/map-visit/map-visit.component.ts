import {Component, ElementRef, Input, OnInit, Renderer2, TemplateRef, ViewChild} from '@angular/core';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-map-visit',
  templateUrl: './map-visit.component.html',
  styleUrls: ['./map-visit.component.scss']
})
export class MapVisitComponent implements OnInit {
  @Input() height = '70%';
  @Input() width = '70%';
  @ViewChild('visitmap', {read: ElementRef}) mapref: ElementRef<any> | undefined =  undefined;
  // map: mapboxgl.Map;
  style = 'mapbox://styles/williampaulton/ckje99mew4pz219mm3jy0t05i';
  lat = 51.51463;
  lng = -0.0938;

  constructor(private rnd: Renderer2) {
  }

  ngOnInit(): void {
    // @ts-ignore
    // mapboxgl.accessToken = environment.mapbox.accessToken;
    // this.map = new mapboxgl.Map({
    //   container: 'map',
    //   style: this.style,
    //   zoom: 15,
    //   antialias: true,
    //   center: [this.lng, this.lat]
    // });
  }

// tslint:disable-next-line:use-lifecycle-interface
  ngAfterViewInit(): void {
    // Sets a left padding of 300px, and a top padding of 50px
    // this.map.setPadding({ left: 300, top: 50, bottom: 300, right: 300 });
    console.log('map', this.mapref);
    // this.rnd.setStyle(this.mapref.nativeElement, 'flex', '1 1 10%');
    // this.rnd.setStyle(this.mapref.nativeElement, 'height', this.height);

    // const marker: mapboxgl.Marker  = new mapboxgl.Marker()
    //
    //   .setLngLat([this.lng, this.lat]);
    // marker
    //   .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
    //     .setHTML('<h3>' + 'V69' + '</h3><p>' + 'the home of Greate Coffeee' + '</p>'))
    //
    //   .addTo(this.map);

  }
}
