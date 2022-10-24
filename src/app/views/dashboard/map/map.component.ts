import { AfterViewInit, Component, OnChanges, OnInit } from '@angular/core';
import Feature from 'ol/Feature';
import Map from 'ol/Map';
import Point from 'ol/geom/Point';
import View from 'ol/View';
import {
  Circle as CircleStyle,
  Fill,
  Stroke,
  Style,
  Text,
} from 'ol/style';
import {Cluster, OSM, Vector as VectorSource} from 'ol/source';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {boundingExtent} from 'ol/extent';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnChanges , AfterViewInit {
  public map!: Map;
  public newMap!: Map;
  distanceInput;
  minDistanceInput;
  
  count;
  features;
  e;
  // for (let i = 0; i < count; ++i) {
  //   const coordinates = [2 * e * Math.random() - e, 2 * e * Math.random() - e];
  //   features[i] = new Feature(new Point(coordinates));
  // }
  
  source;
  
  clusterSource;
  
  styleCache;
  clusters;
  
  raster;
  
    constructor() {
      
     }
  ngAfterViewInit(): void {
    // throw new Error('Method not implemented.');
    // console.log(this.clusterSource.features.map(res => console.log(res)));
  }
  
  btnClick(){
  
  console.log('styles')
    const features = this.clusterSource.getFeatures((features)=>{
      console.log(features)
    })
    const stylesArray = features.map(feature =>{
      console.log("feat",feature)
      const styleCache = {};
      const size = feature.get('features').length;
      let style = styleCache[size];
      
      return new Style({
        image: new CircleStyle({
          radius: 10,
          stroke: new Stroke({
            color: '#fff',
          }),
          fill: new Fill({
            color: '#3399CC',
          }),
        }),
        text: new Text({
          text: size.toString(),
          fill: new Fill({
            color: '#fff',
          }),
        }),
      });
  })
    this.clusters.setStyle(stylesArray)
  }
    ngOnInit(): void {

      this.distanceInput = "40"
      this.minDistanceInput = "20"
      
      this.count = 20000;
      this.features = new Array(this.count);
      this.e = 4500000;
      for (let i = 0; i < this.count; ++i) {
        const coordinates = [2 * this.e * Math.random() - this.e, 2 * this.e * Math.random() - this.e];
        this.features[i] = new Feature(new Point(coordinates));
      }
      
      this.source = new VectorSource({
        features: this.features,
      });
      
      this.clusterSource = new Cluster({
        distance: parseInt(this.distanceInput, 10),
        minDistance: parseInt(this.minDistanceInput, 10),
        source: this.source,
      });
    
      const styleCache = {};
      // console.log('feature',this.features)

      let a = Array.from(this.clusterSource.features);
      
      
      
      
      this.clusters = new VectorLayer({
        source: this.clusterSource
      });
      
      this.raster = new TileLayer({
        source: new OSM(),
      });

      // console.log('clusters',this.clusters,this.source)
      this.map = new Map({
        layers: [this.raster, this.clusters],
        target: 'map',
        view: new View({
          center: [0, 0],
          // center:  [55.2708, 25.2048],
          zoom: 4,
        }),
      });
      // distanceInput.addEventListener('input', function () {
      //   clusterSource.setDistance(parseInt(distanceInput.value, 10));
      // });
      
      // minDistanceInput.addEventListener('input', function () {
      //   clusterSource.setMinDistance(parseInt(minDistanceInput.value, 10));
      // });
      
      this.map.on('click', (e) => {
        this.clusters.getFeatures(e.pixel).then((clickedFeatures) => {
          if (clickedFeatures.length) {
            // Get clustered Coordinates
            this.features = clickedFeatures[0].get('features');
            if (this.features.length > 1) {
              const extent = boundingExtent(
                this.features.map((r) => r.getGeometry().getCoordinates())
              );
              this.map.getView().fit(extent, {duration: 1000, padding: [50, 50, 50, 50]});
            }
          }
        });
      });
    }


    ngOnChanges(){

    }
  
}