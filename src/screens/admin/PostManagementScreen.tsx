import { useNavigation } from '@react-navigation/native';
import { ArrowLeft, Edit2, FileText, Plus, Search, Trash2, X } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    RefreshControl,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomAlert from '../../components/CustomAlert';
import { PostService } from '../../services/postService';
import { Post } from '../../types';

export default function PostManagementScreen() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const navigation = useNavigation<any>();

    const [alert, setAlert] = useState<{
        visible: boolean;
        title: string;
        message: string;
        type: 'info' | 'success' | 'error' | 'confirm';
        onConfirm?: () => void;
    }>({
        visible: false,
        title: '',
        message: '',
        type: 'info'
    });

    const showAlert = (title: string, message: string, type: 'info' | 'success' | 'error' | 'confirm' = 'info', onConfirm?: () => void) => {
        setAlert({ visible: true, title, message, type, onConfirm });
    };

    const loadPosts = async () => {
        try {
            setLoading(true);
            const data = await PostService.getAllPostsForTeacher(1, 40);
            setPosts(data.data);
            filterPosts(search, data.data);
        } catch (error) {
            console.error('Erro ao carregar posts:', error);
            showAlert('Erro', 'Não foi possível carregar a lista de postagens.', 'error');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const filterPosts = (text: string, currentPosts: Post[]) => {
        if (!text) {
            setFilteredPosts(currentPosts);
            return;
        }
        const filtered = currentPosts.filter(post =>
            post.title.toLowerCase().includes(text.toLowerCase()) ||
            (post.author && post.author.toLowerCase().includes(text.toLowerCase()))
        );
        setFilteredPosts(filtered);
    };

    useEffect(() => {
        filterPosts(search, posts);
    }, [search, posts]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            loadPosts();
        });
        return unsubscribe;
    }, [navigation]);

    const onRefresh = () => {
        setRefreshing(true);
        loadPosts();
    };

    const handleDelete = (id: string, title: string) => {
        showAlert(
            'Excluir Postagem',
            `Tem certeza que deseja excluir "${title}"?`,
            'confirm',
            async () => {
                try {
                    await PostService.deletePost(id);
                    loadPosts();
                } catch (error) {
                    showAlert('Erro', 'Não foi possível excluir o post.', 'error');
                }
            }
        );
    };

    const renderPost = ({ item }: { item: Post }) => (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <View style={styles.iconContainer}>
                    <FileText size={20} color="#F97316" />
                </View>
                <View style={styles.titleInfo}>
                    <Text style={styles.postTitle} numberOfLines={1}>{item.title}</Text>
                    <Text style={styles.postDate}>{new Date(item.createdAt).toLocaleDateString('pt-BR')}</Text>
                </View>
                <View style={[
                    styles.statusBadge,
                    item.status === 'draft' ? styles.badgeDraft :
                        item.status === 'private' ? styles.badgePrivate : styles.badgePublished
                ]}>
                    <Text style={[
                        styles.statusText,
                        item.status === 'draft' ? styles.textDraft :
                            item.status === 'private' ? styles.textPrivate : styles.textPublished
                    ]}>
                        {item.status === 'draft' ? 'Rascunho' :
                            item.status === 'private' ? 'Privado' : 'Público'}
                    </Text>
                </View>
            </View>

            <View style={styles.cardFooter}>
                <View style={styles.authorWrap}>
                    <Text style={styles.authorLabel}>Autor:</Text>
                    <Text style={styles.authorName} numberOfLines={1}>{item.author || 'Professor'}</Text>
                </View>

                <View style={styles.actionButtons}>
                    <TouchableOpacity
                        style={styles.btnEdit}
                        onPress={() => navigation.navigate('EditPost', { post: item })}
                    >
                        <Edit2 size={18} color="#F97316" />
                        <Text style={styles.btnEditText}>Editar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btnDelete}
                        onPress={() => handleDelete(item.id, item.title)}
                    >
                        <Trash2 size={18} color="#EF4444" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <SafeAreaView edges={['top']} style={styles.header}>
                <View style={styles.headerContent}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <ArrowLeft size={24} color="#FFF" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Gerenciar Posts</Text>
                </View>

                <View style={styles.searchBarContainer}>
                    <View style={styles.searchBar}>
                        <Search size={20} color="#94A3B8" />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Pesquisar por título ou autor..."
                            value={search}
                            onChangeText={setSearch}
                            placeholderTextColor="#94A3B8"
                        />
                        {search !== '' && (
                            <TouchableOpacity onPress={() => setSearch('')}>
                                <X size={20} color="#94A3B8" />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </SafeAreaView>

            <FlatList
                data={filteredPosts}
                keyExtractor={(item) => item.id}
                renderItem={renderPost}
                contentContainerStyle={styles.list}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#F97316']} />
                }
                ListEmptyComponent={
                    !loading ? (
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>
                                {search ? 'Nenhuma postagem coincide com a busca.' : 'Nenhuma postagem encontrada.'}
                            </Text>
                        </View>
                    ) : null
                }
                ListFooterComponent={loading ? <ActivityIndicator color="#F97316" style={{ margin: 20 }} /> : null}
            />

            <TouchableOpacity
                style={styles.fab}
                onPress={() => navigation.navigate('CreatePost')}
            >
                <Plus size={30} color="#FFF" />
            </TouchableOpacity>

            <CustomAlert
                visible={alert.visible}
                title={alert.title}
                message={alert.message}
                type={alert.type}
                onClose={() => setAlert({ ...alert, visible: false })}
                onConfirm={alert.onConfirm}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    header: {
        backgroundColor: '#F97316',
        paddingHorizontal: 20,
        paddingBottom: 15,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 15,
    },
    backButton: {
        padding: 5,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFF',
        marginLeft: 8,
    },
    searchBarContainer: {
        marginBottom: 10,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 48,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },
    searchInput: {
        flex: 1,
        marginLeft: 10,
        fontSize: 15,
        color: '#1E293B',
    },
    fab: {
        position: 'absolute',
        bottom: 25,
        right: 25,
        backgroundColor: '#F97316',
        width: 64,
        height: 64,
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
    },
    list: {
        padding: 20,
        paddingBottom: 100,
    },
    card: {
        backgroundColor: '#FFF',
        borderRadius: 20,
        padding: 16,
        marginBottom: 16,
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    iconContainer: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: '#FFF4ED',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    titleInfo: {
        flex: 1,
    },
    postTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1E293B',
        marginBottom: 2,
    },
    postDate: {
        fontSize: 12,
        color: '#94A3B8',
    },
    statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
        marginLeft: 8,
    },
    badgeDraft: {
        backgroundColor: '#F1F5F9',
    },
    badgePrivate: {
        backgroundColor: '#FEF2F2',
    },
    badgePublished: {
        backgroundColor: '#F0FDF4',
    },
    statusText: {
        fontSize: 10,
        fontWeight: '800',
        textTransform: 'uppercase',
    },
    textDraft: {
        color: '#64748B',
    },
    textPrivate: {
        color: '#EF4444',
    },
    textPublished: {
        color: '#22C55E',
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#F1F5F9',
    },
    authorWrap: {
        flex: 1,
        marginRight: 10,
    },
    authorLabel: {
        fontSize: 10,
        color: '#94A3B8',
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    authorName: {
        fontSize: 14,
        color: '#475569',
        fontWeight: '600',
    },
    actionButtons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    btnEdit: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF4ED',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 10,
        marginRight: 8,
    },
    btnEditText: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#F97316',
        marginLeft: 6,
    },
    btnDelete: {
        backgroundColor: '#FEF2F2',
        padding: 8,
        borderRadius: 10,
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
    },
    emptyText: {
        color: '#999',
        fontSize: 16,
    },
});
