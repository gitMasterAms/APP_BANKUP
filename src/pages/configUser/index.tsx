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
import { styles, COLORS } from "./styleConfigUser"; // Reutilizaremos o styles.ts
import { AppStackScreenProps } from "../../routes/types";

type Props = AppStackScreenProps<"ConfigUser">;

export default function ProfileEdit({ navigation }: Props) {
  // Estados para armazenar os dados do formulário
  // Em um app real, você iniciaria esses estados com os dados do usuário
  const [nomeCompleto, setNomeCompleto] = useState("John Doe");
  const [cpf, setCpf] = useState("123.456.789-00");
  const [endereco, setEndereco] = useState("Rua das Flores, 123");

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        {/* --- HEADER --- */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={COLORS.green} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Editar Perfil</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* --- FOTO DE PERFIL --- */}
          <View style={styles.profilePicContainer}>
            <Image
              source={{
                uri: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
              }} // Substitua pela foto do usuário
              style={styles.profilePic}
            />
            <TouchableOpacity>
              <Text style={styles.changePicText}>Alterar foto</Text>
            </TouchableOpacity>
          </View>

          {/* --- FORMULÁRIO --- */}
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nome Completo</Text>
              <TextInput
                style={styles.input}
                value={nomeCompleto}
                onChangeText={setNomeCompleto}
                placeholder="Digite seu nome completo"
                placeholderTextColor={COLORS.gray}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>CPF</Text>
              <TextInput
                style={styles.input}
                value={cpf}
                onChangeText={setCpf}
                placeholder="000.000.000-00"
                placeholderTextColor={COLORS.gray}
                keyboardType="numeric" // Facilita a digitação
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Endereço</Text>
              <TextInput
                style={styles.input}
                value={endereco}
                onChangeText={setEndereco}
                placeholder="Seu endereço completo"
                placeholderTextColor={COLORS.gray}
              />
            </View>
          </View>

          {/* --- BOTÕES DE AÇÃO --- */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, styles.buttonSecondary]}>
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
