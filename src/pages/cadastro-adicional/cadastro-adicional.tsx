import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { colors } from '../../constants/colors';
import { AppStackScreenProps } from '../../routes/types';

type Props = AppStackScreenProps<'CadastroAdicional'>;

export default function CadastroAdicional({ navigation }: Props) {
  return (
    <View style={styles.darkContainer}>
      <StatusBar style="light" />

      <View style={styles.darkFormCard}>
        <Text style={styles.darkFormTitle}>Cadastro adicional</Text>

        <View style={styles.darkFormField}>
          <Text style={styles.fieldLabel}>Nome</Text>
          <TextInput
            style={styles.darkFormInput}
            placeholder="Insira aqui o seu nome"
            placeholderTextColor={colors.gray[300]}
          />
        </View>

        <View style={styles.darkFormField}>
          <Text style={styles.fieldLabel}>Telefone</Text>
          <TextInput
            style={styles.darkFormInput}
            placeholder="Insira aqui seu telefone"
            placeholderTextColor={colors.gray[300]}
          />
        </View>

        <View style={styles.darkFormField}>
          <Text style={styles.fieldLabel}>CPF/CNPJ</Text>
          <TextInput
            style={styles.darkFormInput}
            placeholder="Insira aqui seu CPF/CNPJ"
            placeholderTextColor={colors.gray[300]}
          />
        </View>

        <View style={styles.darkFormField}>
          <Text style={styles.fieldLabel}>Endereço</Text>
          <TextInput
            style={styles.darkFormInput}
            placeholder="Insira aqui seu endereço"
            placeholderTextColor={colors.gray[300]}
          />
        </View>

        <TouchableOpacity
          style={styles.darkFormButton}
          onPress={() => navigation.navigate('AppDrawer', { screen: 'MainTabs', params: { screen: 'Home' } })}
        >
          <Text style={styles.darkFormButtonText}>Concluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  darkContainer: {
    flex: 1,
    backgroundColor: colors.gray[950],
    padding: 20,
  },
  darkFormCard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
  },
  darkFormTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.gray[100],
    textAlign: 'center',
    marginBottom: 40,
  },
  darkFormField: {
    width: '100%',
    marginBottom: 20,
  },
  fieldLabel: {
    color: colors.gray[400],
    marginBottom: 5,
    fontSize: 14,
    opacity: 0.8,
    marginLeft: 10,
  },
  darkFormInput: {
    backgroundColor: colors.gray[450],
    borderRadius: 30,
    padding: 15,
    fontSize: 16,
    color: colors.gray[100],
    width: '100%',
  },
  darkFormButton: {
    width: '100%',
    backgroundColor: colors.green[400],
    borderRadius: 30,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  darkFormButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.gray[900],
  },
});


