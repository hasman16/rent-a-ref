import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

declare const google: any;

@Injectable({ providedIn: 'root' })
export class GoogleMapsLoaderService {
	private loadPromise: Promise<void>;

	load(): Promise<void> {
		if (this.loadPromise) {
			return this.loadPromise;
		}

		if (typeof google !== 'undefined' && google.maps) {
			this.loadPromise = Promise.resolve();
			return this.loadPromise;
		}

		this.loadPromise = new Promise<void>((resolve, reject) => {
			const script = document.createElement('script');
			const params = new URLSearchParams({
				key: environment.GOOGLEMAPS_KEY,
				libraries: 'places'
			});
			script.src = `https://maps.googleapis.com/maps/api/js?${params.toString()}`;
			script.async = true;
			script.defer = true;
			script.onload = () => resolve();
			script.onerror = () =>
				reject(new Error('Failed to load the Google Maps JavaScript API'));
			document.head.appendChild(script);
		});

		return this.loadPromise;
	}
}
