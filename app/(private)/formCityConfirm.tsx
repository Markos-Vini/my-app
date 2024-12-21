import { INSERT_TB_CITIES, TB_CITIES_NAME } from "@/database/AppDatabase";
import { router, useLocalSearchParams } from "expo-router";
import { SQLiteProvider, useSQLiteContext } from "expo-sqlite";
import { Alert, Pressable, View, StyleSheet, ScrollView } from "react-native";
import { Text, FAB } from 'react-native-paper';
import env from '@/constants/env';

export default function FormCityConfirmScreen() {
    const { nome, pais, data, passaporte } = useLocalSearchParams();

    const query = `mutation($newCity: addCityInput) { 
        addCity(newCity: $newCity) { 
            id 
        }
    }`;

    const variables = {
        newCity: { nome, pais },
    };

    const fabAction = async () => {
        try {
            const apiGqlUrl = env.API_GQL_URL;
            const response = await fetch(apiGqlUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ query, variables }),
            });
            const { data } = await response.json();
            const { addCity } = data;
            Alert.alert(`Cidade salva. ${addCity.id}`);
            router.push('/(private)');
        } catch (error) {
            const err = error as { message: string };
            Alert.alert(err.message);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text variant="displaySmall" style={styles.title}>Confirmar Dados</Text>
            <View style={styles.infoContainer}>
                <Text variant="headlineSmall" style={styles.label}>Nome:</Text>
                <Text variant="headlineMedium" style={styles.value}>{nome}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text variant="headlineSmall" style={styles.label}>País:</Text>
                <Text variant="headlineMedium" style={styles.value}>{pais}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text variant="headlineSmall" style={styles.label}>Data:</Text>
                <Text variant="headlineMedium" style={styles.value}>{data}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text variant="headlineSmall" style={styles.label}>Passaporte:</Text>
                <Text variant="headlineMedium" style={styles.value}>{passaporte ? 'Sim' : 'Não'}</Text>
            </View>
            <FAB
                style={styles.fab}
                icon="content-save"
                onPress={fabAction}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
    },
    title: {
        textAlign: 'center',
        marginBottom: 24,
        color: '#2C3E50',
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
        alignItems: 'center',
    },
    label: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#34495E',
    },
    value: {
        fontSize: 16,
        color: '#7F8C8D',
    },
    fab: {
        width: 56,
        height: 56,
        backgroundColor: '#3498DB',
        position: 'absolute',
        bottom: 16,
        right: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
