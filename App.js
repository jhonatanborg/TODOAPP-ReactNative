import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Modal,
  ActivityIndicator,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colors from "./Colors";
import tempData from "./tempData";
import TodoList from "./components/TodoList";
import AddListModal from "./components/AddListModal";
import Fire from "./Fire";

export default class App extends React.Component {
  state = {
    addTodoVisible: false,
    lists: [],
    user: {},
    loading: true,
  };
  componentDidMount() {
    firebase = new Fire((error, user) => {
      if (error) {
        return alert("Uh oh, something whant wrong");
      }
      firebase.getLists((lists) => {
        this.setState({ lists, user }, () => {
          this.setState({ loading: false });
        });
      });
      this.setState({ user });
    });
  }
  componentWillUnmount() {
    firebase = new Fire((error, user) => {
      firebase.detach();
    });
  }
  toggleAddTodoModal() {
    this.setState({ addTodoVisible: !this.state.addTodoVisible });
  }
  renderList = (list) => {
    return <TodoList list={list} updateList={this.updateList} />;
  };
  addList = (list) => {
    firebase = new Fire((error, user) => {
      firebase.addList({
        name: list.name,
        color: list.color,
        todos: [],
      });
    });
  };
  updateList = (list) => {
    firebase = new Fire((error, user) => {
      firebase.updateList(list);
    });
  };
  render() {
    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color={colors.blue} />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          onRequestClose={() => this.toggleAddTodoModal()}
          visible={this.state.addTodoVisible}
        >
          <AddListModal
            closeModal={() => this.toggleAddTodoModal()}
            addList={this.addList}
          />
        </Modal>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.divider}></View>
          <Text style={styles.title}>
            Todo
            <Text style={{ color: colors.blue }}>Lists</Text>
          </Text>
          <View style={styles.divider}></View>
        </View>
        <View style={{ marginVertical: 18 }}>
          <TouchableOpacity
            onPress={() => this.toggleAddTodoModal()}
            style={styles.addList}
          >
            <AntDesign name="plus" size={16} color={colors.blue} />
          </TouchableOpacity>
          <Text style={styles.add}>Nova Lista</Text>
        </View>
        <View style={{ height: 275, paddingLeft: 20 }}>
          <FlatList
            data={this.state.lists}
            keyExtractor={(item) => item.id.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => this.renderList(item)}
            keyboardShouldPersistTaps="always"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    backgroundColor: colors.lightblue,
    height: 1,
    flex: 1,
    alignSelf: "center",
  },
  title: {
    fontSize: 38,
    fontWeight: "bold",
    color: colors.black,
    paddingHorizontal: 35,
  },
  addList: {
    borderWidth: 2,
    borderColor: colors.lightblue,
    borderRadius: 4,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  add: {
    color: colors.blue,
    fontWeight: "600",
    fontSize: 14,
    marginTop: 8,
  },
});
