import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colors from "../Colors";
import tempData from "../tempData";
export default class AddListModal extends Component {
  backgroundColors = [
    "#5CD859",
    "#24A6D9",
    "#595BD9",
    "#8022D9",
    "#D859D8",
    "#d85963",
    "#D88559",
  ];
  state = {
    name: "",
    color: this.backgroundColors[0],
  };
  createTodo = () => {
    const { name, color } = this.state;
    const list = { name, color };
    this.props.addList(list);
    this.setState({ name: "" });
    this.props.closeModal();
  };
  renderColors() {
    return this.backgroundColors.map((color) => {
      return (
        <TouchableOpacity
          key={color}
          style={[styles.colorSelect, { backgroundColor: color }]}
          onPress={() => this.setState({ color })}
        ></TouchableOpacity>
      );
    });
  }
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <TouchableOpacity
          onPress={this.props.closeModal}
          style={{ position: "absolute", top: 24, right: 22 }}
        >
          <AntDesign name="close" size={24} color={colors.black} />
        </TouchableOpacity>
        <View style={{ alignSelf: "stretch", marginHorizontal: 32 }}>
          <Text style={styles.title}>Criar nova lista {this.name}</Text>
          <TextInput
            style={styles.input}
            placeholder="Titulo da Lista"
            onChangeText={(text) => this.setState({ name: text })}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 12,
            }}
          >
            {this.renderColors()}
          </View>
          <TouchableOpacity
            onPress={this.createTodo}
            style={[styles.create, { backgroundColor: this.state.color }]}
          >
            <Text
              style={{ color: colors.white, fontWeight: "800", fontSize: 22 }}
            >
              Criar
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: colors.black,
    alignSelf: "center",
    marginBottom: 16,
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.blue,
    borderRadius: 6,
    height: 50,
    marginTop: 8,
    paddingHorizontal: 16,
    fontSize: 18,
  },
  create: {
    marginTop: 24,
    height: 50,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  colorSelect: {
    width: 30,
    height: 30,
    borderRadius: 4,
  },
});
