import { useNavigation } from '@react-navigation/native';
import { ArrowLeft, ChevronRight, FileText, GraduationCap, Users } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomAlert from '../../components/CustomAlert';
import { useAuth } from '../../context/AuthContext';
import { AuthService } from '../../services/authService';
import { PostService } from '../../services/postService';
import { Colors } from '../../theme/colors';
import { styles } from './AdminDashboardScreen.styles';

const AdminCard = ({ title, count, icon: Icon, onPress, color, loading }: any) => (
    <TouchableOpacity style={styles.adminCard} onPress={onPress}>
        <View style={[styles.iconContainer, { backgroundColor: `${color}15` }]}>
            <Icon size={24} color={color} />
        </View>
        <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>{title}</Text>
            <Text style={styles.cardCount}>
                {loading ? '...' : `${count} cadastrados`}
            </Text>
        </View>
        <ChevronRight size={20} color={Colors.gray300} />
    </TouchableOpacity>
);

export default function AdminDashboardScreen() {
    const { user } = useAuth();
    const navigation = useNavigation<any>();
    const [counts, setCounts] = useState({ posts: 0, teachers: 0, students: 0 });
    const [loading, setLoading] = useState(true);

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

    const loadData = async () => {
        try {
            setLoading(true);
            const [postsData, teachersData, studentsData] = await Promise.all([
                PostService.getAllPostsForTeacher(1, 1),
                AuthService.getTeachers(),
                AuthService.getStudents()
            ]);
            setCounts({
                posts: postsData.total || 0,
                teachers: teachersData.length || 0,
                students: studentsData.length || 0
            });
        } catch (error: any) {
            console.error('Erro ao carregar dados do dashboard:', error);
            if (error.response?.status === 401) {
                showAlert('Sessão Expirada', 'Sua sessão expirou. Por favor, faça login novamente.', 'error');
            } else {
                showAlert('Erro', 'Não foi possível carregar os dados do dashboard.', 'error');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            loadData();
        });
        return unsubscribe;
    }, [navigation]);

    const isAdminOrTeacher = user?.role === 'admin' || user?.role === 'teacher';

    if (!isAdminOrTeacher) {
        return (
            <View style={styles.centered}>
                <Text>Acesso restrito.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <SafeAreaView edges={['top']} style={styles.header}>
                <View style={styles.headerContentLine}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <ArrowLeft size={24} color={Colors.white} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Administração</Text>
                    {loading && (
                        <ActivityIndicator color={Colors.white} size="small" style={{ marginLeft: 15 }} />
                    )}
                </View>
            </SafeAreaView>

            <View style={styles.content}>
                <AdminCard
                    title="Postagens"
                    count={counts.posts.toString()}
                    icon={FileText}
                    color={Colors.primary}
                    onPress={() => navigation.navigate('PostManagement')}
                    loading={loading}
                />

                <AdminCard
                    title="Professores"
                    count={counts.teachers.toString()}
                    icon={Users}
                    color={Colors.info}
                    onPress={() => navigation.navigate('TeacherList')}
                    loading={loading}
                />

                <AdminCard
                    title="Estudantes"
                    count={counts.students.toString()}
                    icon={GraduationCap}
                    color={Colors.success}
                    onPress={() => navigation.navigate('StudentList')}
                    loading={loading}
                />
            </View>

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
