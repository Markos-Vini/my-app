import { ActivityIndicator, Alert, View, StyleSheet, Text } from 'react-native';
import { TextInput, Button, HelperText } from 'react-native-paper'; 
import { useContext, useState } from 'react';
import { UserActionType, UserContext, UserDispatchContext } from '@/store/UserStore';
import env from '@/constants/env';
import { router } from 'expo-router';

export default function LoginScreen() {

    const userAuth = useContext(UserContext);
    const userAuthDispatch = useContext(UserDispatchContext);

    const [isLoading, setLoading] = useState(false);
    const [inputUser, setInputUser] = useState<string>(userAuth?.email ?? "");
    const [inputPassword, setInputPassword] = useState<string>(userAuth?.password ?? "");
    const [inputUserFeedback, setInputUserFeedback] = useState<string>("");
    const [inputPasswordFeedback, setInputPasswordFeedback] = useState<string>("");

    const loginSubmit = async () => {
        setLoading(true);
        try {
            setInputUserFeedback("");
            setInputPasswordFeedback("");
            if (inputUser && inputPassword) {
                const apiKey = env.API_KEY;
                const apiUrl = env.API_URL;
                const response = await fetch(`${apiUrl}/v1/accounts:signInWithPassword?key=${apiKey}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: inputUser,
                        password: inputPassword,
                        returnSecureToken: true,
                    })
                });
                const { status } = response;
                if (status == 200) {
                    const body = await response.json();
                    userAuthDispatch({
                        type: UserActionType.LOGAR,
                        user: {
                            email: body.email,
                            password: inputPassword,
                            token: body.idToken,
                        }
                    });
                    router.push('/(private)');
                } else if (status == 400) {
                    const body = await response.json();
                    Alert.alert(`${body.error.message}`);
                } else {
                    Alert.alert(`Status ${status}`);
                }
            } else {
                if (!inputUser) setInputUserFeedback("Preencha este campo.");
                if (!inputPassword) setInputPasswordFeedback("Preencha este campo.");
            }
        } catch (error) {
            const err = error as { message: string };
            Alert.alert(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.loginContainer}>
            <Text style={styles.loginHeader}>LOGIN</Text>

            {/* Usando TextInput do React Native Paper */}
            <TextInput
                label="Usuário"
                value={inputUser}
                onChangeText={setInputUser}
                error={!!inputUserFeedback} // Condição de erro
                editable={!isLoading}
                style={styles.inputField}
            />
            {/* Usando HelperText para mostrar o erro */}
            <HelperText type="error" visible={!!inputUserFeedback}>
                {inputUserFeedback}
            </HelperText>

            <TextInput
                label="Senha"
                value={inputPassword}
                onChangeText={setInputPassword}
                error={!!inputPasswordFeedback} // Condição de erro
                secureTextEntry
                editable={!isLoading}
                style={styles.inputField}
            />
            {/* Usando HelperText para mostrar o erro */}
            <HelperText type="error" visible={!!inputPasswordFeedback}>
                {inputPasswordFeedback}
            </HelperText>

            {/* Usando Button do React Native Paper */}
            {!isLoading ? (
                <Button
                    mode="contained"
                    onPress={loginSubmit}
                    loading={isLoading}
                    style={styles.loginBtnSubmit}
                >
                    Acessar
                </Button>
            ) : (
                <ActivityIndicator animating={isLoading} size="large" />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    loginContainer: {
        flex: 1,
        justifyContent: 'center', // Centraliza verticalmente
        alignItems: 'center', // Centraliza horizontalmente
        paddingHorizontal: 20,
        backgroundColor: '#F0F4F8',
    },
    loginHeader: {
        fontSize: 28,
        padding: 10,
        fontWeight: 'bold',
        color: '#2D3E50',
        fontFamily: 'Arial, sans-serif',
    },
    inputField: {
        width: '100%',
        marginBottom: 15,
    },
    loginBtnSubmit: {
        padding: 5,
        marginVertical: 10,
        backgroundColor: '#42A5F5',
        width: '100%',
        borderRadius: 20,
    },
});
