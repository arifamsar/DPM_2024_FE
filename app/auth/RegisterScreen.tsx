import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Animated,
} from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { Button, Dialog, Portal, PaperProvider } from "react-native-paper";
import API_URL from "../../config/config";

export default function RegisterScreen() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [dialogVisible, setDialogVisible] = useState(false);
    const [dialogMessage, setDialogMessage] = useState("");
    const router = useRouter();

    const fadeAnim = new Animated.Value(0);

    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
        }).start();
    }, []);

    const handleRegister = async () => {
        try {
            await axios.post(`${API_URL}/api/auth/register`, { username, password, email });
            router.replace("/auth/LoginScreen");
        } catch (error) {
            const errorMessage = error.response?.data?.message || "An error occurred";
            setDialogMessage(errorMessage);
            setDialogVisible(true);
        }
    };

    return (
        <PaperProvider>
            <LinearGradient colors={["#ff5f6d", "#ffc371"]} style={styles.gradient}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.container}
                >
                    <ScrollView contentContainerStyle={styles.content}>
                        <Animated.View style={{ ...styles.header, opacity: fadeAnim }}>
                            <Ionicons name="person-circle-outline" size={100} color="#fff" />
                            <Text style={styles.title}>Welcome!</Text>
                            <Text style={styles.subtitle}>Create your account in seconds</Text>
                        </Animated.View>
                        <TextInput
                            style={styles.input}
                            placeholder="Username"
                            value={username}
                            onChangeText={setUsername}
                            autoCapitalize="none"
                            placeholderTextColor="#aaa"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            placeholderTextColor="#aaa"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            placeholderTextColor="#aaa"
                        />
                        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                            <FontAwesome5 name="user-plus" size={18} color="#fff" style={styles.buttonIcon} />
                            <Text style={styles.registerButtonText}>Sign Up</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => router.push("/auth/LoginScreen")}>
                            <Text style={styles.loginLink}>
                                Already have an account? <Text style={styles.loginLinkText}>Log In</Text>
                            </Text>
                        </TouchableOpacity>
                    </ScrollView>
                </KeyboardAvoidingView>
                <Portal>
                    <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}>
                        <Dialog.Title>Oops!</Dialog.Title>
                        <Dialog.Content>
                            <Text>{dialogMessage}</Text>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={() => setDialogVisible(false)}>Try Again</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </LinearGradient>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: "center",
    },
    content: {
        padding: 20,
    },
    header: {
        alignItems: "center",
        marginBottom: 40,
    },
    title: {
        fontSize: 36,
        fontWeight: "bold",
        color: "#fff",
        marginTop: 16,
        textShadowColor: "rgba(0, 0, 0, 0.5)",
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 5,
    },
    subtitle: {
        fontSize: 16,
        color: "#fff",
        textAlign: "center",
        marginTop: 8,
        paddingHorizontal: 20,
    },
    input: {
        width: "100%",
        height: 50,
        borderRadius: 10,
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        marginBottom: 20,
        paddingHorizontal: 16,
        fontSize: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
    },
    registerButton: {
        flexDirection: "row",
        width: "100%",
        height: 50,
        borderRadius: 25,
        backgroundColor: "#ff5f6d",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 4,
    },
    buttonIcon: {
        marginRight: 10,
    },
    registerButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "700",
    },
    loginLink: {
        fontSize: 14,
        color: "#fff",
        textAlign: "center",
        marginTop: 16,
    },
    loginLinkText: {
        fontWeight: "bold",
        textDecorationLine: "underline",
    },
});
