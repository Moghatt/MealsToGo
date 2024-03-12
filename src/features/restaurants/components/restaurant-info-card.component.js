import React from "react";
import { useFonts as useOswald, Oswald_400Regular } from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";
import StarSVG from "../../../components/SVGs/Star";
import OpenSVG from "../../../components/SVGs/Open";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text, View } from "../../../components/typography/text.component";
// import { Favourite } from "../../../components/favourites/favourites.component";
import {
  RestaurantCard,
  RestaurantCardCover,
  Info,
  Section,
  SectionEnd,
  Rating,
  Icon,
  Address,
} from "./restaurant-info-card.styles";
import { Favourite } from "../../../components/favourites/favourites.component";

export const RestaurantInfoCard = ({ restaurant = {} }) => {
  // console.log("restuarant info card");
  const { name, icon, photos, address, isOpenNow, rating, isClosedTemporarily, placeId } = restaurant;

  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });

  const [latoLoaded] = useLato({
    Lato_400Regular,
  });

  if (!oswaldLoaded || !latoLoaded) {
    return null;
  }

  const ratingArray = Array.from(new Array(Math.floor(rating)));

  return (
    <RestaurantCard elevation={5}>
      <Favourite restaurant={restaurant} />
      <RestaurantCardCover key={name} source={{ uri: photos[0] }} />
      <Info>
        <Text variant="label">{name}</Text>
        <Section>
          <Rating>
            {ratingArray.map((_, i) => (
              <StarSVG width={20} height={20} key={`star-${placeId}-${i}`} />
            ))}
          </Rating>
          <SectionEnd>
            {isClosedTemporarily && <Text variant="error">CLOSED TEMPORARILY</Text>}
            <Spacer position="left" size="large">
              {isOpenNow && <OpenSVG width={20} height={20} />}
            </Spacer>
            <Spacer position="left" size="large">
              <Icon source={{ uri: icon }} />
            </Spacer>
          </SectionEnd>
        </Section>
        <Address>{address}</Address>
      </Info>
    </RestaurantCard>
  );
};
