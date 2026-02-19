import { StyleSheet } from 'react-native';
import { Colors } from '../../theme/colors';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    header: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    backButton: {
        padding: 5,
    },
    scrollContent: {
        paddingHorizontal: 30,
        paddingBottom: 40,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: Colors.gray800,
        marginBottom: 30,
        textAlign: 'center',
    },
    form: {
        width: '100%',
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.gray500,
        marginBottom: 8,
    },
    input: {
        backgroundColor: Colors.surface,
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: 12,
        padding: 15,
        fontSize: 16,
        color: Colors.gray800,
    },
    passwordInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.surface,
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: 12,
        paddingRight: 15,
    },
    passwordInput: {
        flex: 1,
        padding: 15,
        fontSize: 16,
        color: Colors.gray800,
    },
    roleContainer: {
        flexDirection: 'row',
        gap: 10,
    },
    roleButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Colors.border,
        alignItems: 'center',
        backgroundColor: Colors.surface,
    },
    roleButtonActive: {
        borderColor: Colors.primary,
        backgroundColor: Colors.orangeLight,
    },
    roleButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.gray500,
    },
    roleButtonTextActive: {
        color: Colors.primary,
    },
    registerButton: {
        backgroundColor: Colors.primary,
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 10,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    buttonDisabled: {
        opacity: 0.7,
    },
    registerButtonText: {
        color: Colors.white,
        fontSize: 18,
        fontWeight: 'bold',
    },
    loginLink: {
        marginTop: 25,
        alignItems: 'center',
    },
    loginLinkText: {
        fontSize: 14,
        color: Colors.gray500,
    },
    loginLinkHighlight: {
        color: Colors.primary,
        fontWeight: 'bold',
    },
    keyboardAvoid: {
        flex: 1,
    },
});
