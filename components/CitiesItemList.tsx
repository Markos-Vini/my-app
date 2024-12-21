import { View, StyleSheet, Pressable } from "react-native";
import Cidade from "@/models/Cidade";
import { List, IconButton } from "react-native-paper";

export default function CitiesItemList(props: {
    item: Cidade | null,
    onSelected: (cidade: Cidade) => void
}) {
    const { item, onSelected } = props;
    const { nome, pais, atualizado } = item as Cidade;
    const atualizadoFormat = new Date(atualizado).toLocaleDateString("pt-BR");

    return (
        <List.Item
            style={styles.itemListContainer}
            title={nome}
            description={`${pais}`}
            titleStyle={styles.itemTitle}
            descriptionStyle={styles.itemDescription}
            right={_ => (
                <Pressable onPress={() => onSelected(item as Cidade)}>
                    <IconButton
                        icon="chevron-right"
                        size={24}
                        iconColor="#1E88E5" // Azul vibrante
                    />
                </Pressable>
            )}
        />
    );
}

const styles = StyleSheet.create({
    itemListContainer: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#DDDDDD',
        backgroundColor: '#F9F9F9',
        marginBottom: 10,
        elevation: 3, // Sombra para Android
        shadowColor: '#000', // Sombra para iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333333',
    },
    itemDescription: {
        fontSize: 14,
        color: '#666666',
    },
});
