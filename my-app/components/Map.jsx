import { Box, Image, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import { IoLocation } from "react-icons/io5";
import { BiX } from "react-icons/bi";

const Map = ({ coordinates, setCoordinates, setBounds, places }) => {
  const [isCard, setIsCard] = useState(false);
  const [cardData, setCardData] = useState(null);

  const handleApiLoaded = (map, maps) => {
    console.log("Map loaded successfully!");
  };

  // const key = process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY;

  return (
    <Box width={"full"} height={"full"}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDDvK-oGaKsn7RT7WWxtbIpJ8byHdxFzfk" }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={10}
        margin={[50, 50, 50, 50]}
        options={""}
        onChange={(e) => {
          if (e && e.center && e.marginBounds) {
            setCoordinates({ lat: e.center.lat, lng: e.center.lng });
            setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
          }
        }}
        onChildClick={(child) => {
          setCardData(places[child]);
          setIsCard(true);
        }}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
      >
        {places?.map((place, i) => (
          <Box
            key={i}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            position={"relative"}
            cursor="pointer"
          >
            <IoLocation color="red" fontSize={30} />
          </Box>
        ))}

        {isCard && cardData && (
          <Box
            width={"200px"}
            height={"150px"}
            bg={"whiteAlpha.900"}
            position={"absolute"}
            top={-12}
            left={0}
            shadow={"lg"}
            rounded={"lg"}
          >
            <Image
              objectFit={"cover"}
              width={"full"}
              height={"120px"}
              rounded="lg"
              src={
                cardData?.photo
                  ? cardData?.photo?.images?.large?.url
                  : "https://explorelompoc.com/wp-content/uploads/2021/06/food_placeholder.jpg"
              }
              alt={cardData?.name || "Place Image"}
            />

            <Text
              textTransform={"capitalize"}
              width={"40"}
              fontSize={"lg"}
              fontWeight={"500"}
              isTruncated
            >
              {cardData.name}
            </Text>

            <Box
              cursor={"pointer"}
              position={"absolute"}
              top={2}
              right={2}
              width={"30px"}
              height={"30px"}
              bg={"red.300"}
              rounded={"full"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              onClick={() => {
                setIsCard(false);
              }}
            >
              <BiX fontSize={20} />
            </Box>
          </Box>
        )}
      </GoogleMapReact>
    </Box>
  );
};

export default Map;
