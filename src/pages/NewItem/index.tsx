import moment from "moment";
import React, {useState} from "react";
import { Button, Input } from 'react-native-elements';
import { Container, FormContainer, ButtonContainer } from './style';
import { useData } from '../../hooks/data';
import { generateUniqueId } from "../../helpers";
import { useNavigation } from "@react-navigation/native";

const NewItem: React.FC = () => {
    const { addItem } = useData()
    const navigation = useNavigation();

    const [name, setName] = useState('')
    const [kcal, setKcal] = useState('')

    const handleOnSave = () => {
        if(name && kcal) {
            addItem({
                id: generateUniqueId(),
                name,
                kcal: Number(kcal),
                date: moment()
            })
            navigation.goBack();
        }
    };
    
    return (
        <Container>
            <FormContainer>
                <Input label="Nome" value={name} onChangeText={setName} placeholder="Descrição"/>
                <Input label="kcal" value={kcal}  onChangeText={setKcal} placeholder="somente números"/>
            </FormContainer>
            <ButtonContainer>
                <Button 
                    title="Salvar" 
                    type="outline"
                    onPress={handleOnSave}
                />
            </ButtonContainer>
        </Container>
    );
};

export default NewItem;