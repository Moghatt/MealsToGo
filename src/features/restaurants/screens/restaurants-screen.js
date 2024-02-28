import { StatusBar } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import { PaperProvider, Searchbar } from "react-native-paper";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React from "react";
import styled from "styled-components/native";

import { RestaurantInfoCard } from "../components/restaurant-info-card.component";

const SafeArea = styled(SafeAreaView)`
  flex: 1;
  margin-top: ${StatusBar.currentHeight}px;
`;

const SearchContainer = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;

const RestaurantListContainer = styled.View`
  flex: 1;
  padding: ${(props) => props.theme.space[3]};
`;

function RestaurantsScreen() {
  const [searchQuery, setSearchQuery] = React.useState("");
  return (
    <PaperProvider>
      <SafeArea>
        <ExpoStatusBar />
        <SearchContainer>
          <Searchbar placeholder="Search" onChangeText={setSearchQuery} value={searchQuery} />
        </SearchContainer>
        <RestaurantListContainer>
          <RestaurantInfoCard />
        </RestaurantListContainer>
      </SafeArea>
    </PaperProvider>
  );
}

export default RestaurantsScreen;
