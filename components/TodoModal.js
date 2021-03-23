import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  TextInput,
  Keyboard,
  Animated,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import colors from "../Colors";

export default class TodoModal extends React.Component {
  state = {
    newTodo: "",
  };
  toggleTodoCompleted = (index) => {
    let list = this.props.list;
    list.todos[index].completed = !list.todos[index].completed;
    this.props.updateList(list);
  };
  addTodo = () => {
    let list = this.props.list;
    list.todos.push({ title: this.state.newTodo, completed: false });
    this.props.updateList(list);
    this.setState({ newTodo: "" });
    Keyboard.dismiss();
  };
  deleteTodo = (index) => {
    let list = this.props.list;
    list.todos.splice(index, 1);
    this.props.updateList(list);
  };
  renderTodo = (todo, index) => {
    return (
      <View style={styles.todoContainer}>
        <TouchableOpacity onPress={() => this.toggleTodoCompleted(index)}>
          <Ionicons
            style={{ width: 32 }}
            name={todo.completed ? "ios-square" : "ios-square-outline"}
            size={24}
            color={colors.gray}
          />
        </TouchableOpacity>
        <Text
          style={[
            styles.todo,
            {
              color: todo.completed ? colors.gray : colors.black,
              textDecorationLine: todo.completed ? "line-through" : "none",
            },
          ]}
        >
          {todo.title}
        </Text>
        <View>
          <TouchableOpacity onPress={() => this.deleteTodo(index)}>
            <Ionicons
              color={colors.red}
              name="ios-close-circle-outline"
              size={24}
              color={colors.black}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  render() {
    const list = this.props.list;
    const taskCount = list.todos.length;
    const completedCount = list.todos.filter((todo) => todo.completed).length;

    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <SafeAreaView style={styles.container}>
          <TouchableOpacity
            style={{ position: "absolute", top: 24, right: 22, zIndex: 10 }}
            onPress={this.props.closeModal}
          >
            <AntDesign name="close" size={24} color={colors.black} />
          </TouchableOpacity>
          <View
            style={[
              styles.section,
              styles.header,
              { borderBottomColor: list.color },
            ]}
          >
            <Text style={styles.title}> {list.name} </Text>
            <Text style={styles.taskCount}>
              {completedCount} de {taskCount} tarefas
            </Text>
          </View>
          <View style={([styles.section], { flex: 3 })}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={list.todos}
              keyExtractor={(item) => item.title}
              renderItem={({ item, index }) => this.renderTodo(item, index)}
            ></FlatList>
          </View>
          <View style={[styles.section, styles.footer]}>
            <TextInput
              style={[styles.input, { borderColor: list.color }]}
              onChangeText={(text) => this.setState({ newTodo: text })}
              value={this.state.newTodo}
            />
            <TouchableOpacity
              onPress={() => this.addTodo()}
              style={[styles.addTodo, { backgroundColor: list.color }]}
            >
              <AntDesign name="plus" size={16} color={colors.white}></AntDesign>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
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
  section: {
    flex: 1,
    alignSelf: "stretch",
    alignItems: "baseline",
    justifyContent: "space-between",
  },
  header: {
    justifyContent: "flex-end",
    marginLeft: 24,
    borderBottomWidth: 4,
    marginBottom: 40,
    alignItems: "flex-start",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "right",
    color: colors.black,
  },
  taskCount: {
    marginTop: 4,
    marginBottom: 16,
    color: colors.gray,
    fontWeight: "600",
  },
  footer: {
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 6,
    marginRight: 8,
    paddingHorizontal: 8,
  },
  addTodo: {
    borderRadius: 4,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  todoContainer: {
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  todo: {
    color: colors.black,
    fontWeight: "700",
    fontSize: 22,
  },
});
