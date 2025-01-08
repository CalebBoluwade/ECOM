import React, { useCallback, useEffect, useRef, useState } from "react";
import { Search, MapPin, Phone, Clock } from "lucide-react";
import mockStores from "../../lib/utils/stores";
import { Card } from "antd";
import { GoogleMap } from "@react-google-maps/api";
import BreadCrumb from "./BreadCrumb";

const StoreLocator = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const mapRef = useRef<HTMLDivElement>(null);
  const [currentUserLocation, setCurrentUserLocation] =
    useState<google.maps.LatLngLiteral | null>(null);
  const [nearbyStores, setNearbyStores] = useState<IStore[]>(mockStores);
  const [selectedStore, setSelectedStore] = useState<IStore | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
//   const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
console.debug(map);

  // Calculate distance between two points
  const calculateDistance = useCallback(
    (lat1: number, lon1: number, lat2: number, lon2: number): number => {
      const R = 6371; // Earth's radius in km
      const dLat = ((lat2 - lat1) * Math.PI) / 180;
      const dLon = ((lon2 - lon1) * Math.PI) / 180;
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
          Math.cos((lat2 * Math.PI) / 180) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    },
    []
  );

  useEffect(() => {
    //   apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    (async () => {
      try {
        // Dynamically import Google Maps libraries
        const g = new GoogleMap({ center: currentUserLocation!, options: {} });
        g.getRef = mapRef;

        const { Map } = (await google.maps.importLibrary(
          "maps"
        )) as google.maps.MapsLibrary;
        const { AdvancedMarkerElement } = (await google.maps.importLibrary(
          "marker"
        )) as google.maps.MarkerLibrary;

        if (mapRef.current) {
          // Initialize the map
          const map = new Map(mapRef.current, {
            center: currentUserLocation,
            zoom: 10,
          });

          // Add markers
          mockStores.forEach((store) => {
            new AdvancedMarkerElement({
              map,
              position: { lat: store.latitude, lng: store.longitude },
              title: store.name,
            });
          });
        }
      } catch (error) {
        console.error("Failed to load Google Maps libraries:", error);
      }
    })();

    // loader.load().then(async(google) => {
    //   if (mapRef.current) {
    //     const map = new google.maps.Map(mapRef.current, {
    //       center: { lat: 40.7128, lng: -74.006 },
    //       zoom: 10,
    //     });

    //     const { Map } = await google.maps.importLibrary('maps') as any;
    //     const { AdvancedMarkerElement } = await google.maps.importLibrary('marker') as any;

    //     mockStores.forEach((store) => {
    //       const marker = new google.maps.marker.AdvancedMarkerElement({
    //         map,
    //         position: { lat: store.latitude, lng: store.longitude },
    //         title: store.name,
    //       });

    //       // Optional: Add click listener
    //       marker.addListener("click", () => {
    //         alert(`You clicked on ${store.name}`);
    //       });
    //     });
    //   }
    // });
  }, [currentUserLocation]);

  // Get user's current location
  const getCurrentLocation = useCallback(async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });

          console.log({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });

          // Update stores with distances
          const storesWithDistances = mockStores
            .map((store) => ({
              ...store,
              distance: calculateDistance(
                position.coords.latitude,
                position.coords.longitude,
                store.latitude,
                store.longitude
              ),
            }))
            .sort((a, b) => (a.distance || 0) - (b.distance || 0));

          setNearbyStores(storesWithDistances);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, [calculateDistance]);

  // Initialize map
  useEffect(() => {
    if (!mapRef.current) return;

    const map = new google.maps.Map(mapRef.current, {
      center: currentUserLocation,
      zoom: 12,
      styles: [
        {
          featureType: "poi",
          elementType: "labels",
          stylers: [{ visibility: "off" }],
        },
      ],
    });

    setMap(map);

    return () => {
      setMap(null);
    };
  }, [currentUserLocation]);

  // Filter stores based on search query
  const handleSearch = () => {
    const filtered = mockStores.filter(
      (store) =>
        store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        store.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        store.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        store.zip.includes(searchQuery)
    );
    setNearbyStores(filtered);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-6">
        <BreadCrumb />
        <h1 className="text-2xl font-bold mb-4">Find a Store</h1>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter ZIP code or city"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-grow"
          />
          <button onClick={handleSearch}>
            <Search className="w-4 h-4 mr-2" />
            Search
          </button>
          <button
            //   variant="outline"
            onClick={getCurrentLocation}
          >
            <MapPin className="w-4 h-4 mr-2" />
            Use My Location
          </button>
        </div>
      </div>

      <div
        ref={mapRef}
        className="w-full h-64 bg-gray-100 mb-6 rounded-lg flex items-center justify-center"
      ></div>

      <div className="grid gap-4">
        {nearbyStores.map((store) => (
          <Card
            key={store.slug}
            className={`cursor-pointer ${
              selectedStore?.slug === store.slug ? "ring-2 ring-blue-500" : ""
            }`}
            onClick={() => setSelectedStore(store)}
            // children={}
          >
            <div className="flex justify-between items-start p-4">
              <div>
                <h3 className="font-semibold text-lg">{store.name}</h3>
                <p className="text-gray-600">
                  {store.address}, {store.city}, {store.state} {store.zip}
                </p>
                <div className="flex items-center mt-2 text-gray-600">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>{store.phone}</span>
                </div>
                <div className="flex items-center mt-1 text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{store.hours}</span>
                </div>
              </div>
              {store.distance && (
                <div className="text-right">
                  <span className="text-sm text-gray-500">
                    {store.distance.toFixed(1)} km away
                  </span>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StoreLocator;
