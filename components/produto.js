import { Pressable, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export function Produto({ data, onDelete, onEdit }) { 
    return (
        <Pressable style={styles.container}>
            <Text style={styles.text}>{data.nome},  Quantidade  =  {data.quantidade}</Text>

            <TouchableOpacity onPress={onDelete}>
                <MaterialIcons name="delete" size={24} color="red" />
            </TouchableOpacity>
            <TouchableOpacity onPress={onEdit}>
                <MaterialIcons name="edit" size={24} color="white" />
            </TouchableOpacity>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#000",
        padding: 24,
        borderRadius: 5,
        gap: 14,
        flexDirection: "row",
    },
    text: {
        flex: 1,
        fontWeight: 'bold',
        color: '#fff',
    },
});
