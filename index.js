import { View, TouchableOpacity, StyleSheet, TextInput, Alert, FlatList, Image, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { usarBD } from './hooks/usarBD';
import { Produto } from './components/produto';

export function Index() {

    const [id, setId] = useState('');
    const [nome, setNome] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [pesquisa, setPesquisa] = useState('');
    const [produtos, setProdutos] = useState([]);

    const produtosBD = usarBD();

    async function createOrUpdate() {
        if (isNaN(quantidade)) {
            return Alert.alert('Quantidade', 'A quantidade precisa ser um número!');
        }
        try {
            if (id) {
                await produtosBD.update(id, {
                    nome,
                    quantidade: Number(quantidade),
                });
                Alert.alert('Produto atualizado com sucesso!');
            } else {
                const item = await produtosBD.create({
                    nome,
                    quantidade: Number(quantidade),
                });
                Alert.alert('Produto cadastrado com sucesso!');
                setId(item.idProduto);
            }
            listar();
            limparFormulario();
        } catch (error) {
            console.log(error);
        }
    }

    async function listar() {
        try {
            const captura = await produtosBD.read(pesquisa);
            setProdutos(captura);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        listar();
    }, [pesquisa]);

    const remove = async (id) => {
        try {
            await produtosBD.remove(id);
            await listar();
        } catch (error) {
            console.log(error);
        }
    };

    const editar = (item) => {
        setId(item.id);
        setNome(item.nome);
        setQuantidade(String(item.quantidade));
    };

    const limparFormulario = () => {
        setId('');
        setNome('');
        setQuantidade('');
    };

    return (
        <View style={styles.container}>
            <Image 
                source={require('./assets/LogoOracle.png')} 
                style={styles.logo} 
            />

            <TextInput 
                style={styles.texto} 
                placeholderTextColor={'#fff'} 
                placeholder="Insira o Produto:" 
                onChangeText={setNome} 
                value={nome} 
            />
            <TextInput 
                style={styles.texto} 
                placeholderTextColor={'#fff'} 
                placeholder="Insira a Quantidade:" 
                onChangeText={setQuantidade} 
                value={quantidade} 
            />

            <TouchableOpacity style={styles.botao} onPress={createOrUpdate}>
                <Text style={styles.botaoTexto}>{id ? 'Atualizar' : 'Salvar'}</Text>
            </TouchableOpacity>

            <TextInput 
                style={styles.texto} 
                placeholderTextColor={'#fff'} 
                placeholder="Pesquisar Produtos:" 
                onChangeText={setPesquisa} 
            />

            <FlatList
                contentContainerStyle={styles.listContent}
                data={produtos}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => (
                    <View style={styles.EditContainer}>
                        <Produto 
                            data={item} 
                            onDelete={() => remove(item.id)} 
                            onEdit={() => editar(item)}
                        />
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 32,
        gap: 16,
        paddingTop: 75,
        backgroundColor: '#E32124',
    },
    logo: {
        width: 300,
        height: 150,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginBottom: 32,
    },
    texto: {
        height: 54,
        borderBottomWidth: 1.5,
        borderColor: "#fff",
        paddingHorizontal: 16,
        borderRadius: 5,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        color: '#fff',
    },
    botao: {
        height: 58,
        backgroundColor: '#000',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
    },
    botaoTexto: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    listContent: {
        gap: 16,
    }
});
