import { StyleSheet } from 'react-native';
import { Colors } from '../../theme/colors';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        alignItems: 'center',
    },
    logoContainer: {
        width: 120,
        height: 120,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors.white,
        letterSpacing: 1,
    },
});
