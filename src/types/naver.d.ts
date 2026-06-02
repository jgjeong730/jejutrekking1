declare namespace naver {
  namespace maps {
    type MapTypeId = string;
    const MapTypeId: {
      NORMAL: string;
      TERRAIN: string;
      SATELLITE: string;
      HYBRID: string;
    };

    interface MapOptions {
      center?: LatLng;
      zoom?: number;
      mapTypeId?: string;
      scaleControl?: boolean;
      logoControl?: boolean;
      mapDataControl?: boolean;
      zoomControl?: boolean;
      mapTypeControl?: boolean;
    }

    class Map {
      constructor(el: HTMLElement, options?: MapOptions);
      setCenter(latlng: LatLng): void;
      setZoom(zoom: number, effect?: boolean): void;
      getCenter(): LatLng;
      getZoom(): number;
      panTo(latlng: LatLng, transitionOptions?: object): void;
      fitBounds(bounds: LatLngBounds, margin?: number | object): void;
      destroy(): void;
    }

    class LatLng {
      constructor(lat: number, lng: number);
      lat(): number;
      lng(): number;
      equals(latlng: LatLng): boolean;
    }

    class LatLngBounds {
      constructor(sw: LatLng, ne: LatLng);
      extend(latlng: LatLng): void;
      getCenter(): LatLng;
    }

    interface PolylineOptions {
      map?: Map;
      path?: LatLng[];
      strokeColor?: string;
      strokeWeight?: number;
      strokeOpacity?: number;
      strokeStyle?: string;
      strokeLineCap?: string;
      strokeLineJoin?: string;
      clickable?: boolean;
      zIndex?: number;
    }

    class Polyline {
      constructor(options?: PolylineOptions);
      setMap(map: Map | null): void;
      setOptions(options: Partial<PolylineOptions>): void;
      getPath(): LatLng[];
      setPath(path: LatLng[]): void;
    }

    interface MarkerOptions {
      map?: Map;
      position?: LatLng;
      icon?: string | MarkerImage | { content: string; anchor: Point };
      title?: string;
      clickable?: boolean;
      zIndex?: number;
    }

    interface MarkerImage {
      url: string;
      size?: Size;
      scaledSize?: Size;
      origin?: Point;
      anchor?: Point;
    }

    class Marker {
      constructor(options?: MarkerOptions);
      setMap(map: Map | null): void;
      setPosition(latlng: LatLng): void;
      getPosition(): LatLng;
      setIcon(icon: string | MarkerImage | object): void;
    }

    class Point {
      constructor(x: number, y: number);
    }

    class Size {
      constructor(width: number, height: number);
    }

    interface InfoWindowOptions {
      content?: string | HTMLElement;
      maxWidth?: number;
      backgroundColor?: string;
      borderColor?: string;
      borderWidth?: number;
      anchorSize?: Size;
      pixelOffset?: Point;
    }

    class InfoWindow {
      constructor(options?: InfoWindowOptions);
      open(map: Map, anchor: Marker | LatLng): void;
      close(): void;
      setContent(content: string | HTMLElement): void;
    }

    namespace Event {
      function addListener(target: object, event: string, handler: (...args: unknown[]) => void): object;
      function removeListener(listener: object): void;
      function trigger(target: object, event: string, ...args: unknown[]): void;
    }
  }
}

interface Window {
  naver: typeof naver;
}
