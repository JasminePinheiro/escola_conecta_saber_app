import { useNavigation } from '@react-navigation/native';
import { BookOpen } from 'lucide-react-native';
import React, { useEffect } from 'react';
import { Animated, StatusBar, Text, View } from 'react-native';
import { Colors } from '../../theme/colors';
import { styles } from './SplashScreen.styles';

export default function SplashScreen() {
    const navigation = useNavigation<any>();
    const fadeAnim = new Animated.Value(0);

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
        }).start();

        const timer = setTimeout(() => {
            navigation.replace('Welcome');
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
            <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
                <View style={styles.logoContainer}>
                    <BookOpen size={80} color={Colors.white} strokeWidth={1.5} />
                </View>
                <Text style={styles.title}>Escola Conecta Saber</Text>
            </Animated.View>
        </View>
    );
}
