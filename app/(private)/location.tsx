import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert, SafeAreaView } from "react-native";
import * as Location from 'expo-location';
import MapView, { Marker, MapPressEvent, LatLng } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appbar, FAB } from 'react-native-paper';

export default function LocationScreen() {
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [markers, setMarkers] = useState<Array<LatLng>>([]);
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            let locationPermission = await Location.requestForegroundPermissionsAsync();
            let { status } = locationPermission;
            if (status !== 'granted') {
                setMessage('A permissão foi negada!');
            } else {
                let location = await Location.getCurrentPositionAsync();
                setLocation(location);
            }
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const markersStorage = await AsyncStorage.getItem('markers');
            let markersList: Array<LatLng> = [];
            if (markersStorage) {
                markersList = JSON.parse(markersStorage);
                setMarkers(markersList);
            }
        })();
    }, []);

    const handleMapPress = async (mapPress: MapPressEvent) => {
        const { coordinate } = mapPress.nativeEvent;
        const markersStorage = await AsyncStorage.getItem('markers');
        let markersList: Array<LatLng> = [];
        if (markersStorage) 
            markersList = JSON.parse(markersStorage);
        markersList.push(coordinate);
        AsyncStorage.setItem('markers', JSON.stringify(markersList));
        setMarkers(markersList);
    };

    return (
        <SafeAreaView style={styles.container}>
            {message && <Text style={styles.message}>{message}</Text>}

            {location ? (
                <View style={styles.infoContainer}>
                    <Text style={styles.infoText}>Longitude: {location.coords.longitude}</Text>
                    <Text style={styles.infoText}>Latitude: {location.coords.latitude}</Text>
                    <Text style={styles.infoText}>Marcadores: {markers.length}</Text>
                </View>
            ) : (
                <Text style={styles.loadingText}>Carregando localização...</Text>
            )}

            <MapView
                style={styles.locationMapView}
                initialRegion={{
                    latitude: location?.coords.latitude ?? 0,
                    longitude: location?.coords.longitude ?? 0,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                showsUserLocation
                onPress={handleMapPress}
            >
                {markers.map((marker, index) => (
                    <Marker
                        key={index}
                        draggable
                        coordinate={marker}
                        title={`Marcador ${index + 1}`}
                    />
                ))}
            </MapView>

            <FAB
                style={styles.fab}
                icon="plus"
                onPress={() => Alert.alert("Adicionar marcador")}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    message: {
        color: 'red',
        textAlign: 'center',
        marginVertical: 10,
    },
    infoContainer: {
        padding: 15,
        backgroundColor: '#fff',
        elevation: 3,
    },
    infoText: {
        fontSize: 16,
        color: '#333',
    },
    loadingText: {
        textAlign: 'center',
        fontSize: 18,
        marginTop: 20,
        color: '#555',
    },
    locationMapView: {
        width: "100%",
        height: "70%",
    },
    fab: {
        position: 'absolute',
        bottom: 16,
        right: 16,
        backgroundColor: '#42A5F5',
    },
});
