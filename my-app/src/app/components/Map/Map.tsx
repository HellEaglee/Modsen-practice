"use client";

import React from "react";
import {
  APIProvider,
  Map,
  MapCameraChangedEvent,
} from "@vis.gl/react-google-maps";

export const MapComponent = () => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY;

  if (!apiKey) {
    return <div>API Key is missing</div>;
  }

  return (
    <>
      <APIProvider apiKey={apiKey} onLoad={() => "Map API has loaded."}>
        <div className="h-[100vh]">
          <Map
            defaultZoom={13}
            defaultCenter={{ lat: -33.860664, lng: 151.208138 }}
            onCameraChanged={(ev: MapCameraChangedEvent) =>
              console.log(
                "camera changed:",
                ev.detail.center,
                "zoom:",
                ev.detail.zoom
              )
            }
          ></Map>
        </div>
      </APIProvider>
    </>
  );
};
