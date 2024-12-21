import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { TextInput, Switch, Modal, Portal } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router, useLocalSearchParams } from "expo-router";
import env from '../../constants/env';
import ModalCityConfirm from "@/components/ModalCityConfirm";

export default function FormCityScreen() {
    const { id } = useLocalSearchParams();

    const [inputNome, setInputNome] = useState("");
    const [inputPais, setInputPais] = useState("Brasil");
    const [inputData, setInputData] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [inputPassaporte, setInputPassaporte] = useState(false);

    const listaPais = [
        { label: "Brasil", value: "BR" },
        { label: "Estados Unidos", value: "EUA" },
        { label: "França", value: "FR" },
        { label: "Espanha", value: "ES" },
        { label: "Portugal", value: "PT" },
        { label: "Itália", value: "IT" },
    ];

    useEffect(() => {
        const getCity = async () => {
            if (id) {
                const apiUrl = env.DB_URL;
                const requestUri = `${apiUrl}/cities/${id}.json`;
                try {
                    const response = await fetch(requestUri);
                    const city = await response.json();
                    setInputNome(city.nome);
                    setInputPais(city.pais);
                    setInputData(new Date(city.data));
                    setInputPassaporte(city.passaporte);
                } catch (error) {
                    console.error("Erro ao carregar cidade:", error);
                }
            }
        };
        getCity();
    }, [id]);

    return (
        <View style={styles.formContainer}>
            <Text style={styles.headerTitle}>Cadastrar Cidade</Text>

            <TextInput
                mode="outlined"
                label="Nome da Cidade"
                placeholder="Informe o nome da cidade"
                value={inputNome}
                onChangeText={setInputNome}
                style={styles.formTextInput}
            />

            <View style={styles.formPickerContainer}>
                <Text style={styles.formLabel}>País</Text>
                <Picker
                    style={styles.formPicker}
                    selectedValue={inputPais}
                    onValueChange={setInputPais}
                >
                    {listaPais.map(pais => (
                        <Picker.Item key={pais.value} label={pais.label} value={pais.value} />
                    ))}
                </Picker>
            </View>

            <Pressable
                style={styles.formDateTimePicker}
                onPress={() => setShowDatePicker(true)}
            >
                <Text style={styles.formLabel}>Data:</Text>
                <Text style={styles.formDateTimePickerText}>
                    {inputData.toLocaleDateString("pt-BR")}
                </Text>
            </Pressable>

            {showDatePicker && (
                <DateTimePicker
                    value={inputData}
                    onChange={(_, date) => {
                        setShowDatePicker(false);
                        if (date) setInputData(date);
                    }}
                />
            )}

            <View style={styles.switchContainer}>
                <Text style={styles.switchLabel}>Passaporte:</Text>
                <View style={styles.switchOption}>
                    <Text>Não</Text>
                    <Switch
                        value={inputPassaporte}
                        onValueChange={setInputPassaporte}
                        color="#42A5F5"
                    />
                    <Text>Sim</Text>
                </View>
            </View>

            <Pressable
                style={styles.formPressableSubmit}
                onPress={() => {
                    router.push(
                        `/(private)/formCityConfirm?nome=${inputNome}&pais=${inputPais}&data=${inputData.toLocaleString(
                            "pt-BR"
                        )}&passaporte=${inputPassaporte}`
                    );
                }}
            >
                <Text style={styles.formPressableSubmitLabel}>Salvar</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: "#F3F4F6",
        justifyContent: "center",
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
        color: "#333333",
    },
    formTextInput: {
        marginBottom: 20,
    },
    formPickerContainer: {
        marginBottom: 20,
    },
    formLabel: {
        fontSize: 16,
        marginBottom: 5,
        color: "#333333",
    },
    formPicker: {
        backgroundColor: "#FFFFFF",
        borderRadius: 5,
    },
    formDateTimePicker: {
        marginBottom: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        borderRadius: 5,
        backgroundColor: "#FFFFFF",
        borderColor: "#DDDDDD",
        borderWidth: 1,
    },
    formDateTimePickerText: {
        fontSize: 16,
    },
    switchContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    switchLabel: {
        flex: 1,
        fontSize: 16,
    },
    switchOption: {
        flexDirection: "row",
        alignItems: "center",
    },
    formPressableSubmit: {
        backgroundColor: "#42A5F5",
        marginTop: 20,
        paddingVertical: 12,
        borderRadius: 10,
    },
    formPressableSubmitLabel: {
        textAlign: "center",
        fontSize: 18,
        color: "#FFFFFF",
        fontWeight: "bold",
    },
});
