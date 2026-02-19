import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, SafeAreaView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../theme/colors';
import { styles } from './WelcomeScreen.styles';

export default function WelcomeScreen() {
    const navigation = useNavigation<any>();

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />

            <View style={styles.content}>
                <View style={styles.illustrationContainer}>
                    <Image
                        source={require('../../../assets/images/welcome.png')}
                        style={styles.illustration}
                        resizeMode="contain"
                    />
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.welcomeText}>
                        <Text style={styles.boldText}>Bem-Vindo ao </Text>
                        <Text style={styles.brandText}>Escola Conectar Saber</Text>
                        <Text style={styles.boldText}>. Educação de qualidade para todos!</Text>
                    </Text>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.loginButton}
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Text style={styles.loginButtonText}>Entrar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.registerLink}
                        onPress={() => navigation.navigate('Register')}
                    >
                        <Text style={styles.registerLinkText}>
                            Não tem uma conta? <Text style={styles.registerLinkHighlight}>Cadastre-se</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}
