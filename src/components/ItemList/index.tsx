import React from 'react';
import { View } from 'react-native';
import { Container, IconContainer, InfoContainer, Title, Kcal } from './style'
import { Item } from '../../types'
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface ItemProps {
    item: Item
}

const ItemList: React.FC<ItemProps> = ({item}) => {
    return (
        <Container>
            <IconContainer>
                <MaterialCommunityIcons
                    name="food-fork-drink"
                    size={30}
                    color="#1E3BA1"
                />

            </IconContainer>
            <InfoContainer>
                <Title>{item.name}</Title>
                <Kcal>{item.kcal} kcal</Kcal>
            </InfoContainer>
        </Container>
    );
}

export default ItemList;