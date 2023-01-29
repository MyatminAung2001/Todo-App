import { Button, TouchableOpacity, View } from 'react-native';

import { NavigationContainer, useNavigation, useRoute, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from "@expo/vector-icons/Ionicons";
import { createTheme, ListItem, ThemeProvider, Text, Input } from '@rneui/themed';

import { useState } from 'react';

const Stack = createNativeStackNavigator();

const theme = createTheme({
  mode: "dark"
})

export default function NavigationApp() {
  return (
    <NavigationContainer theme={DarkTheme}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </NavigationContainer>
  )
};

function List({ items, setItems }) {

  const navigation = useNavigation();

  const [input, setInput] = useState("");

  return (
    <View style={{ padding: 20 }}>

      <View style={{ flexDirection: 'row', paddingVertical: 10, marginBottom: 10 }}>
        <Input 
          value={input}
          onChangeText={setInput} 
          style={{ marginBottom: 10, borderWidth: 1, padding: 5, flexGrow: 1, outlineWidth: 0 }}
        />

        <TouchableOpacity onPress={() => {
          setItems([
            { id: items.length + 1, subject: input, done: false },
            ...items
          ]);
          setInput("");
        }}>
          <Ionicons name="add" size={26}  />
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: '20px' }}>
        <Text style={{ textAlign: 'center', marginBottom: 10 }}>
          Undone
        </Text>
        {items.filter(item => !item.done).map((item) => {
          return (
            <View key={item.id}>
              <ListItem>
                  <TouchableOpacity onPress={() => {
                    setItems(items.map(i => {
                      if (i.id === item.id) {
                        i.done = true;
                      };
                      return i;
                    }))
                  }}>
                    <Ionicons name="square-outline" size={26} color="grey" />
                  </TouchableOpacity>
                <ListItem.Content>
                  <Text>{item.subject}</Text> 
                </ListItem.Content>
                <TouchableOpacity  onPress={() => {
                  setItems(items.filter(i => i.id !== item.id))
                }}>
                  <Ionicons name="trash" size={26} color="red" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                  navigation.navigate("Edit", {
                    subject: item.subject,
                    id: item.id
                  })
                }}>
                  <Ionicons name="pencil" size={26} color="blue" />
                </TouchableOpacity>
              </ListItem>
            </View>
          )
        })}
      </View>

      <View style={{ paddingTop: 10 , marginTop: 20 }}>
        <Text style={{ textAlign: 'center', marginBottom: 10 }}>
          Done
        </Text>
        {items.filter(item => item.done).map((item) => {
          return (
            <View key={item.id}>
              <ListItem>
                <TouchableOpacity onPress={() => {
                  setItems(items.map(i => {
                    if (i.id === item.id) {
                      i.done = false;
                    };
                    return i;
                  }))
                }}>
                  <Ionicons name="arrow-undo" size={26} color="green" />
                </TouchableOpacity>
                <ListItem.Content>
                  <Text>{item.subject}</Text>
                </ListItem.Content>
                <TouchableOpacity  onPress={() => {
                  setItems(items.filter(i => i.id !== item.id))
                }}>
                  <Ionicons name="trash" size={26} color="red" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                  navigation.navigate("Edit", {
                    subject: item.subject,
                    id: item.id
                  })
                }}>
                  <Ionicons name="pencil" size={26} color="blue" />
                </TouchableOpacity>
              </ListItem>
            </View>
          )
        })}
      </View>

    </View>
  )
}

function Edit({ update }) {

  const router = useRoute();

  const navigation = useNavigation();

  const { subject, id } = router.params;

  const [input, setInput] = useState(subject);

  return (
    <View style={{ padding: 20, flexDirection: 'row' }}>
      <Input 
        value={input} 
        onChangeText={setInput} 
        defaultValue={subject} 
        style={{ marginBottom: 10, borderWidth: 1, padding: 5, flex: 1, outlineWidth: 0 }} 
      />
      <TouchableOpacity onPress={() => {
        update(id, input);
        navigation.navigate("List")
      }}>
        <Ionicons name="push" size={26} color="blue" />
      </TouchableOpacity>
    </View>
  )
}

function App() {

  const [items, setItems] = useState([
    { id: 1, subject: "Egg", done: false},
    { id: 2, subject: "Apple", done: true},
    { id: 3, subject: "Bread", done: false}
  ]);

  const update = (id, subject) => {
    setItems(items.map(item => {
      if (item.id === id) item.subject = subject;
      return item;
    }))
  }

  return (
    <Stack.Navigator>
      <Stack.Screen name="List">
        { () => <List items={items} setItems={setItems} /> }
      </Stack.Screen>
      <Stack.Screen name="Edit">
        { () => <Edit update={update} /> }
      </Stack.Screen>
    </Stack.Navigator>
  );
}