'use client'
/* eslint-disable */

import { useEffect, useRef, useState } from 'react'

declare global {
  interface Window {
    google: {
      maps: {
        Map: new (element: HTMLElement, options: any) => any
        Marker: new (options: any) => any
        InfoWindow: new (options: any) => any
        OverlayView: new () => any
        LatLng: new (lat: number, lng: number) => any
        SymbolPath: {
          CIRCLE: any
        }
        ControlPosition: {
          RIGHT_CENTER: any
        }
      }
    }
  }
}

interface MapComponentProps {
  center?: { lat: number; lng: number }
  zoom?: number
  className?: string
}

const australianCities = [
  { name: 'Sydney', lat: -33.8688, lng: 151.2093 },
  { name: 'Melbourne', lat: -37.8136, lng: 144.9631 },
  { name: 'Brisbane', lat: -27.4698, lng: 153.0251 },
  { name: 'Perth', lat: -31.9505, lng: 115.8605 },
  { name: 'Adelaide', lat: -34.9285, lng: 138.6007 },
  { name: 'Canberra', lat: -35.2809, lng: 149.1300 },
  { name: 'Gold Coast', lat: -28.0167, lng: 153.4000 },
  { name: 'Darwin', lat: -12.4634, lng: 130.8456 }
]

export default function MapComponent({ 
  center = { lat: -25.2744, lng: 133.7751 },
  zoom = 4,
  className = "w-full h-96"
}: MapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(false)
  const [mapError, setMapError] = useState<string | null>(null)

  useEffect(() => {
    const loadGoogleMaps = () => {
      if (window.google && window.google.maps) {
        setIsGoogleMapsLoaded(true)
        return
      }

      const existingScript = document.querySelector('script[src*="maps.googleapis.com"]')
      if (existingScript) {
        existingScript.addEventListener('load', () => setIsGoogleMapsLoaded(true))
        return
      }

      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places&loading=async`
      script.async = true
      script.defer = true
      script.onload = () => {
        setTimeout(() => setIsGoogleMapsLoaded(true), 100)
      }
      script.onerror = () => setMapError('Failed to load Google Maps')
      document.head.appendChild(script)
    }

    loadGoogleMaps()
  }, [])

  useEffect(() => {
    if (!isGoogleMapsLoaded || !mapRef.current || !window.google || !window.google.maps) return

    try {
      const map = new window.google.maps.Map(mapRef.current, {
        center: center,
        zoom: zoom,
        styles: [
          {
            featureType: 'all',
            elementType: 'geometry.fill',
            stylers: [{ color: '#1f2937' }]
          },
          {
            featureType: 'water',
            elementType: 'geometry.fill',
            stylers: [{ color: '#374151' }]
          },
          {
            featureType: 'landscape',
            elementType: 'geometry.fill',
            stylers: [{ color: '#111827' }]
          },
          {
            featureType: 'road',
            elementType: 'geometry.fill',
            stylers: [{ color: '#374151' }]
          },
          {
            featureType: 'poi',
            elementType: 'geometry.fill',
            stylers: [{ color: '#4b5563' }]
          }
        ],
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        zoomControl: true,
        zoomControlOptions: {
          position: window.google.maps.ControlPosition.RIGHT_CENTER
        }
      })

      // Add markers for major cities
      australianCities.forEach(city => {
        const marker = new window.google.maps.Marker({
          position: { lat: city.lat, lng: city.lng },
          map: map,
          title: city.name,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: '#FFC325',
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 2
          }
        })

        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div class="p-2 bg-gray-800 text-gray-800 rounded">
              <h3 class="font-semibold text-gray-800">${city.name}</h3>
              <p class="text-sm text-gray-300">We service this area</p>
            </div>
          `
        })

        marker.addListener('click', () => {
          infoWindow.open(map, marker)
        })
      })

      // Add a custom overlay for the main message
      const overlay = new window.google.maps.OverlayView()
      overlay.onAdd = function() {
        const div = document.createElement('div')
        div.className = 'absolute top-4 left-4 bg-gray-800 rounded-lg shadow-lg p-4 max-w-xs border border-gray-700'
        div.innerHTML = `
          <h3 class="font-bold text-gray-800 mb-1">Australia-Wide Service</h3>
          <p class="text-sm text-gray-300">We come to you anywhere in Australia</p>
        `
        this.div = div
        const panes = this.getPanes()
        panes.overlayLayer.appendChild(div)
      }
      overlay.draw = function() {
        const projection = this.getProjection()
        const position = projection.fromLatLngToDivPixel(new window.google.maps.LatLng(-25.2744, 133.7751))
        if (position) {
          this.div.style.left = position.x + 'px'
          this.div.style.top = position.y + 'px'
        }
      }
      overlay.setMap(map)

    } catch (error) {
      console.error('Google Maps initialization error:', error)
      setMapError('Failed to initialize map')
    }
  }, [isGoogleMapsLoaded, center, zoom])

  // Fallback for when Google Maps fails to load
  if (mapError || !isGoogleMapsLoaded) {
    return (
      <div className={className}>
        <div className="w-full h-full bg-gray-900 rounded-lg flex items-center justify-center relative overflow-hidden border border-gray-700 shadow-lg">
          <div 
            className="absolute inset-0 bg-center bg-no-repeat bg-contain"
            style={{
              backgroundImage: `url('data:image/svg+xml;base64,${btoa(`
                <svg width="100%" height="100%" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e5e7eb" stroke-width="1"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)"/>
                  <g transform="translate(400,300)">
                    <circle cx="0" cy="0" r="200" fill="none" stroke="#FFC325" stroke-width="2" opacity="0.3"/>
                    <circle cx="0" cy="0" r="100" fill="none" stroke="#FFC325" stroke-width="2" opacity="0.5"/>
                    <circle cx="0" cy="0" r="50" fill="none" stroke="#FFC325" stroke-width="2" opacity="0.7"/>
                    <circle cx="0" cy="0" r="10" fill="#FFC325"/>
                    <text x="0" y="-30" text-anchor="middle" class="text-lg font-bold text-gray-900">Australia</text>
                    <text x="0" y="10" text-anchor="middle" class="text-sm text-gray-900">We Service All Areas</text>
                  </g>
                </svg>
              `)}')`
            }}
          ></div>
          <div className="text-center z-10">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Australia-Wide Coverage</h3>
            <p className="text-gray-300">We come to you anywhere in Australia</p>
            {mapError && (
              <p className="text-sm text-gray-900 mt-2">Map temporarily unavailable</p>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={className}>
      <div ref={mapRef} className="w-full h-full rounded-lg border border-gray-700 shadow-lg" />
    </div>
  )
}
