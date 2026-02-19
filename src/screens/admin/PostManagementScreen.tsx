import { useNavigation } from '@react-navigation/native';
import { ArrowLeft, Edit2, FileText, Plus, Search, Trash2, X } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    RefreshControl,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomAlert from '../../components/CustomAlert';
import { PostService } from '../../services/postService';
import { Colors } from '../../theme/colors';
import { Post } from '../../types';
import { styles } from './PostManagementScreen.styles';

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
                    showAlert('Erro', 'Não foi possível excluir the post.', 'error');
                }
            }
        );
    };

    const renderPost = ({ item }: { item: Post }) => (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <View style={styles.iconContainer}>
                    <FileText size={20} color={Colors.primary} />
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
                        <Edit2 size={18} color={Colors.primary} />
                        <Text style={styles.btnEditText}>Editar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btnDelete}
                        onPress={() => handleDelete(item.id, item.title)}
                    >
                        <Trash2 size={18} color={Colors.error} />
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
                        <ArrowLeft size={24} color={Colors.white} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Gerenciar Posts</Text>
                </View>

                <View style={styles.searchBarContainer}>
                    <View style={styles.searchBar}>
                        <Search size={20} color={Colors.textLight} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Pesquisar por título ou autor..."
                            value={search}
                            onChangeText={setSearch}
                            placeholderTextColor={Colors.textLight}
                        />
                        {search !== '' && (
                            <TouchableOpacity onPress={() => setSearch('')}>
                                <X size={20} color={Colors.textLight} />
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
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[Colors.primary]} />
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
                ListFooterComponent={loading ? <ActivityIndicator color={Colors.primary} style={styles.loader} /> : null}
            />

            <TouchableOpacity
                style={styles.fab}
                onPress={() => navigation.navigate('CreatePost')}
            >
                <Plus size={30} color={Colors.white} />
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
