import { StyleSheet } from 'react-native';
import { Colors } from '../../theme/colors';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: Colors.white,
    },
    header: {
        backgroundColor: Colors.primary,
        paddingHorizontal: 20,
        paddingBottom: 15,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    backButton: {
        padding: 5,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.white,
        marginLeft: 8,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.gray800,
        marginBottom: 8,
    },
    meta: {
        fontSize: 14,
        color: Colors.gray400,
        marginBottom: 16,
    },
    categoryBadge: {
        backgroundColor: Colors.purpleLight,
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 6,
        alignSelf: 'flex-start',
        marginBottom: 12,
    },
    categoryText: {
        color: '#7C3AED',
        fontSize: 12,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    tags: {
        flexDirection: 'row',
        marginBottom: 20,
        flexWrap: 'wrap',
    },
    tag: {
        color: Colors.info,
        marginRight: 10,
        fontWeight: '500',
    },
    content: {
        fontSize: 16,
        lineHeight: 24,
        color: Colors.gray700,
        marginBottom: 32,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        marginBottom: 40,
        borderTopWidth: 1,
        borderTopColor: Colors.gray100,
        paddingTop: 20,
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    editButton: {
        backgroundColor: Colors.info,
    },
    deleteButton: {
        backgroundColor: Colors.error,
    },
    actionText: {
        color: Colors.white,
        fontWeight: 'bold',
        marginLeft: 8,
    },
    commentsSection: {
        marginTop: 20,
        marginBottom: 60,
        borderTopWidth: 1,
        borderTopColor: Colors.gray100,
        paddingTop: 20,
    },
    commentsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.gray800,
        marginBottom: 15,
    },
    commentInputContainer: {
        marginBottom: 25,
    },
    commentInput: {
        backgroundColor: Colors.gray100,
        borderRadius: 12,
        padding: 15,
        height: 80,
        textAlignVertical: 'top',
        borderWidth: 1,
        borderColor: Colors.border,
        marginBottom: 10,
    },
    commentButton: {
        backgroundColor: Colors.primary,
        borderRadius: 8,
        paddingVertical: 10,
        alignItems: 'center',
    },
    commentButtonDisabled: {
        backgroundColor: Colors.gray300,
    },
    commentButtonText: {
        color: Colors.white,
        fontWeight: 'bold',
    },
    commentCard: {
        backgroundColor: Colors.gray50,
        padding: 15,
        borderRadius: 12,
        marginBottom: 10,
    },
    commentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    commentAuthor: {
        fontWeight: 'bold',
        color: Colors.primary,
        fontSize: 13,
    },
    commentDate: {
        color: Colors.gray400,
        fontSize: 11,
    },
    commentContent: {
        color: Colors.gray700,
        fontSize: 14,
        lineHeight: 20,
    },
    noComments: {
        color: Colors.gray400,
        textAlign: 'center',
        fontStyle: 'italic',
        marginTop: 10,
    },
    commentActions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    commentActionBtn: {
        padding: 4,
        marginLeft: 8,
    },
    editCommentContainer: {
        marginTop: 10,
    },
    editCommentInput: {
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: 8,
        padding: 10,
        fontSize: 14,
        minHeight: 60,
        textAlignVertical: 'top',
    },
    editCommentActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 10,
    },
    editActionBtn: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 6,
        marginLeft: 10,
    },
    cancelEditBtn: {
        backgroundColor: Colors.gray100,
    },
    cancelEditBtnText: {
        color: Colors.gray600,
        fontSize: 12,
        fontWeight: '600',
    },
    saveEditBtn: {
        backgroundColor: Colors.primary,
    },
    saveEditBtnText: {
        color: Colors.white,
        fontSize: 12,
        fontWeight: 'bold',
    },
    loader: {
        marginTop: 20,
    },
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.white,
    },
});
