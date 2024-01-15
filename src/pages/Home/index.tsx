import React, {useState} from 'react';
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import CalendarStrip from "react-native-calendar-strip";
import { FlatList, Text, TouchableOpacity, Modal, View, StyleSheet } from "react-native";
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
import { DataProvider } from '../../hooks/data';
import { removeItemFromList } from '../../helpers';

function Home() {
    const navigation = useNavigation()
    const { handleChangeDate, currentList, currentKcal } = useData();
    const [modalVisible, setModalVisible] = useState(false);

    const handleNewItem = (): void => {
        navigation.navigate("NewItem");
    }

    const handleShowModal = (): void => {
        setModalVisible(true)
    }

    const handleDeleteData = async (itemId: string) => {
        setModalVisible(false)
        await removeItemFromList(itemId, currentList);
        
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
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={handleShowModal}>
                                <ItemList item={item} />
                                <Modal
                                animationType="slide"
                                transparent={true}
                                visible={modalVisible}
                                onRequestClose={() => {
                                setModalVisible(!modalVisible);
                                }}>
                                <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <Text style={styles.modalTitleText}>Atenção!</Text>
                                    <Text style={styles.modalSubtitleText}>Deseja excluir esse registro?</Text>
                                    <View style={styles.buttonContainer}>
                                        <TouchableOpacity
                                            style={[styles.button, styles.buttonColorSelected]}
                                            onPress={() => setModalVisible(!modalVisible)}
                                        >
                                            <Text style={styles.textStyle}>Não</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={[styles.button, styles.buttonColor]}
                                            onPress={() => handleDeleteData(item.id)}
                                            >
                                            <Text style={styles.textStyle}>Sim</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                </View>
                                </Modal>
                            </TouchableOpacity>
                        )}  
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

const styles = StyleSheet.create({
centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(169, 169, 169, 0.5)' ,
},
modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
    width: 0,
    height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
},
button: {
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 10,
    elevation: 2,
},
buttonColorSelected: {
    backgroundColor: '#2196F3',
},
buttonColor: {
    backgroundColor: 'rgba(169, 169, 169, 0.8)',
},
textStyle: {
    color: 'white',
    fontWeight: 'bold',
    flexDirection: 'row',
    justifyContent: 'space-between',
},
modalTitleText: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
},
modalSubtitleText: {
    marginBottom: 15,
    textAlign: 'center',
},
buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end', 
    paddingRight: 0,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'white',
    marginTop: 10, 
},
});
