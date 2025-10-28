import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styleConfigUser";
import { AppStackScreenProps } from "../../routes/types";
import { colors } from "../../constants/colors";

type Props = AppStackScreenProps<"EditarDadosUser">;

export default function EditarDadosUser({ navigation }: Props) {
  const [nomeCompleto, setNomeCompleto] = useState("John Doe");
  const [cpf, setCpf] = useState("123.456.789-00");
  const [endereco, setEndereco] = useState("Rua das Flores, 123");

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={colors.gray[50]} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Editar Perfil</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* --- FOTO DE PERFIL --- */}
          <View style={styles.profilePicContainer}>
            <Image style={styles.profilePic} />
            <TouchableOpacity>
              <Text style={styles.changePicText}>Alterar foto</Text>
            </TouchableOpacity>
          </View>

          {/* --- FORMULÁRIO --- */}
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nome Completo</Text>
              <TextInput
                style={styles.inputEditar}
                value={nomeCompleto}
                onChangeText={setNomeCompleto}
                placeholder="Digite seu nome completo"
                placeholderTextColor={colors.gray[400]}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>CPF</Text>
              <TextInput
                style={styles.inputEditar}
                value={cpf}
                onChangeText={setCpf}
                placeholder="000.000.000-00"
                placeholderTextColor={colors.gray[400]}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Endereço</Text>
              <TextInput
                style={styles.inputEditar}
                value={endereco}
                onChangeText={setEndereco}
                placeholder="Seu endereço completo"
                placeholderTextColor={colors.gray[400]}
              />
            </View>
          </View>

          {/* --- BOTÕES DE AÇÃO --- */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, styles.buttonSecondary]} onPress={() => navigation.goBack()} >
              <Text style={[styles.buttonText, styles.buttonTextSecondary]}>
                CANCELAR
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.buttonPrimary]}>
              <Text style={[styles.buttonText, styles.buttonTextPrimary]}>
                SALVAR
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
