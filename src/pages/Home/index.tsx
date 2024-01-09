import React from "react";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import CalendarStrip from "react-native-calendar-strip";
import { FlatList, Text } from "react-native";
import { FAB } from "react-native-elements";
import { Feather } from "@expo/vector-icons";

import {
        Container,
        HeaderContainer,
        HeaderTitle, 
        HeaderContainerHighlight,
        HeaderTextCounterHighlight,
        HeaderTextHighlight,
        BodyContainer
        } from './styles';
import ItemList from "../../components/ItemList";
import { useData } from "../../hooks/data";

function Home() {
    const navigation = useNavigation()
    const { handleChangeDate, currentList, currentKcal } = useData();
    const data = [
        {
            id: "teste1",
            name: "Pão",
            kcal: 140,
            date: moment()
        },
        {
            id: "teste2",
            name: "Arrox ",
            kcal: 140,
            date: moment()
        }
    ]

    const handleNewItem = (): void => {
        navigation.navigate("NewItem");
    }

    return (
        <Container>
            <HeaderContainer>
                <CalendarStrip
                    daySelectionAnimation={{
                        type: "border",
                        duration: 200,
                        borderWidth: 1,
                        borderHighlightColor: "white",
                    }}
                    style={{ height: 100, padding: 20, paddingBottom: 5 }}
                    calendarHeaderStyle={{ color: "white", paddingBottom: 15 }}
                    dateNumberStyle={{ color: "white" }}
                    dateNameStyle={{ color: "white" }}
                    scrollable={true}
                    highlightDateNumberStyle={{ color: "yellow" }}
                    highlightDateNameStyle={{ color: "yellow" }}
                    disabledDateNameStyle={{ color: "grey" }}
                    disabledDateNumberStyle={{ color: "grey" }}
                    iconContainer={{ flex: 0.1 }}
                    onDateSelected={handleChangeDate}
                    startingDate={moment().subtract(2, "days")}
                    selectedDate={moment()}
                    scrollerPaging={true}
                    iconLeft={require("../../../assets/img/arrow-left.png")}
                    iconRight={require("../../../assets/img/arrow-right.png")}
                />
                <HeaderTitle>Consumido no dia</HeaderTitle>
                <HeaderContainerHighlight>
                    <HeaderTextCounterHighlight>{currentKcal}</HeaderTextCounterHighlight>
                    <HeaderTextHighlight>/kcal</HeaderTextHighlight>
                </HeaderContainerHighlight>
            </HeaderContainer>
            <BodyContainer>
                    <FlatList
                        data={currentList}
                        keyExtractor={item => item.id }
                        renderItem={({ item }) => <ItemList item={item} /> }
                    />
                    <FAB 
                        icon={<Feather name="plus" size={24} color="white"/>}
                        visible={true}
                        placement="right"
                        color="#1E3BA1"
                        style={{marginRight: 20, right: 20, bottom: 20 }}
                        onPress={handleNewItem}
                    />
            </BodyContainer>
        </Container>
    );
}

export default Home;