import { StyleSheet, TextInput, View, Text, TextStyle, ViewStyle } from 'react-native';

interface TextFieldProps {
    placeholder: string;
    value: string;
    onChangeText: (value: string) => void;
    feedback: string;
    isPassword?: boolean;
    editable: boolean;
    testID: string;
    style?: TextStyle | ViewStyle; // Adiciona suporte para estilos personalizados
}

export default function TextField({
    placeholder,
    value,
    onChangeText,
    feedback,
    isPassword = false,
    editable = true,
    testID,
    style,
}: TextFieldProps) {
    return (
        <View style={[styles.textFieldContainer]}>
            <TextInput
                testID={testID}
                style={[styles.textFieldInput, style]} // Combina estilos padrão e personalizados
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={isPassword}
                editable={editable}
            />
            {feedback && <Text style={styles.textFieldFeedback}>{feedback}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    textFieldContainer: {
        width: '100%',
        alignItems: 'center',
    },
    textFieldInput: {
        fontSize: 24,
        marginVertical: 10,
        padding: 10,
        backgroundColor: '#dde7c7',
        borderBottomColor: '#001219',
        borderBottomWidth: 3,
        borderRadius: 5,
        width: '90%',
    },
    textFieldFeedback: {
        paddingRight: 30,
        alignSelf: 'stretch',
        textAlign: 'right',
        fontSize: 18,
        color: '#ca6702',
    },
});
