import { StyleSheet } from 'react-native';
import { Colors } from '../../theme/colors';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    content: {
        flex: 1,
        paddingHorizontal: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    illustrationContainer: {
        alignItems: 'center',
        width: '100%',
        marginBottom: 10,
    },
    illustration: {
        width: '100%',
        height: 280,
    },
    textContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    welcomeText: {
        fontSize: 18,
        textAlign: 'center',
        lineHeight: 26,
        color: Colors.gray800,
    },
    boldText: {
        fontWeight: 'bold',
    },
    brandText: {
        color: Colors.primary,
        fontWeight: 'bold',
    },
    buttonContainer: {
        width: '100%',
        justifyContent: 'flex-start',
    },
    loginButton: {
        backgroundColor: Colors.primary,
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    loginButtonText: {
        color: Colors.white,
        fontSize: 18,
        fontWeight: 'bold',
    },
    registerLink: {
        marginTop: 25,
        alignItems: 'center',
    },
    registerLinkText: {
        fontSize: 14,
        color: Colors.gray500,
    },
    registerLinkHighlight: {
        color: Colors.primary,
        fontWeight: 'bold',
    },
});
