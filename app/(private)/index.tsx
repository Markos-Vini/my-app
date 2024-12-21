import { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { ActivityIndicator, FAB, Text } from 'react-native-paper'; 
import Cidade from "@/models/Cidade";
import CitiesList from '@/components/CitiesList';
import CityInfo from '@/components/CityInfo';
import { router } from 'expo-router';
import env from '@/constants/env';

export default function PrivateScreen() {
    const { width, height } = useWindowDimensions();
    const isPortrait = width < height;

    const [cidades, setCidades] = useState<Array<Cidade> | null>(null);
    const [cidade, setCidade] = useState<Cidade | null>(null);
    const [isLoading, setLoading] = useState(false);
    const [message, setMessage] = useState<String | null>(null);

    const getCitiesApi = async () => {
        setLoading(true);
        try {
            const apiGqlUrl = env.API_GQL_URL;
            const response = await fetch(apiGqlUrl, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    query: `query {
                        cities {
                          id
                          nome
                          pais
                          atualizado
                        }
                      }`,
                })
            }); // POST
            const { data } = await response.json();
            setCidades(data.cities);
        } catch (error) {
            setMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getCitiesApi();
    }, []);

    const selecionarCidade = (cidade: Cidade) => {
        if (isPortrait)
            router.push(`/cidades/${cidade.id}`);
        else
            setCidade(cidade);
    };

    return (
        <View style={styles.container}>
            <View style={isPortrait ? styles.containerListPortrait : styles.containerListLandscape}>
                <Text variant="headlineLarge" style={styles.headerTitle}>
                    Cidades
                </Text>

                {isLoading && <ActivityIndicator size={60} color="#42a5f5" />}

                {message && (
                    <Text variant="bodyLarge" style={styles.errorMessage}>
                        {message}
                    </Text>
                )}

                {!isLoading && cidades && (
                    <CitiesList
                        cidades={cidades}
                        onSelected={selecionarCidade}
                        refreshingAction={getCitiesApi}
                    />
                )}

                <FAB
                    style={styles.fabToForm}
                    icon="plus"
                    label="Adicionar"
                    onPress={() => router.push('/(private)/formCity')}
                />
                <FAB
                    style={styles.fabToLocation}
                    icon="map-marker"
                    label="Localizar"
                    onPress={() => router.push('/(private)/location')}
                />
            </View>

            {!isPortrait && cidade && (
                <View style={styles.cityInfoContainer}>
                    <CityInfo cidade={cidade} />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 15,
        flexDirection: 'row',
        backgroundColor: '#F3F4F6', // Fundo claro e suave
    },
    containerListPortrait: {
        width: "100%",
    },
    containerListLandscape: {
        width: "30%",
        paddingRight: 10,
    },
    headerTitle: {
        marginTop: 50,
        marginBottom: 20,
        color: '#333333', // Título com cor neutra
        textAlign: 'center',
        fontWeight: 'bold',
    },
    errorMessage: {
        color: '#E53935', // Vermelho para erros
        textAlign: 'center',
        marginBottom: 20,
    },
    cityInfoContainer: {
        flex: 1,
        marginLeft: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    fabToForm: {
        position: 'absolute',
        right: 1,
        bottom: 80,
        backgroundColor: '#42A5F5',
        borderRadius: 30,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    fabToLocation: {
        position: 'absolute',
        right: 1,
        bottom: 16,
        backgroundColor: '#80ED99',
        borderRadius: 30,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
});
