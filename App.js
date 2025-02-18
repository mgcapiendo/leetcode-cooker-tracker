import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.shape_container}>
          <View style={styles.lip}></View>
          <View style={styles.bowl}></View>

          <View style={styles.smoke1}></View>
          <View style={styles.smoke2}></View>
          <View style={styles.smoke3}></View>

          <Text style={styles.date}>February 18, 2025</Text>
          <Text style={styles.task}>You're Cooked Level is: HIGH</Text>

          <View style={styles.rectangle1}></View>
          <View style={styles.rectangle2}></View>
          <View style={styles.rectangle3}></View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shape_container: {
    height:150,
    alignItems:'center',
    justifyContent:'center',
    margin:10,
  },
  lip: {
    width:120,
    height:10,
    backgroundColor:'#264653',
    marginTop:440,
    marginLeft:130
  },
  bowl: {
    width: 110,
    height: 60,
    backgroundColor:'#264653',
    borderBottomLeftRadius:43,
    borderBottomRightRadius:43,
    marginLeft:130
  },
  smoke1: {
    width:5,
    height:40,
    backgroundColor:'green',
    top: -140,
    left: 30
  },
  smoke2: {
    width:5,
    height:40,
    backgroundColor:'green',
    top: -160,
    left: 60
  },
  smoke3: {
    width:5,
    height:40,
    backgroundColor:'green',
    top: -220,
    left: 90
  },
  date: {
    fontSize: 20,
    top: -320,
    left: -90,
    color: 'green',
    fontWeight: 'bold',
    marginBottom: -100
  },
  task: {
    fontSize: 12,
    top: -130,
    left: 65,
    color: 'green',
    fontWeight: 'bold',
    marginTop: 100
  },


  rectangle1: {
    width:330,
    height:40,
    backgroundColor:'gray',
    marginTop: -100
  },
  rectangle2: {
    width:330,
    height:40,
    backgroundColor:'gray',
    top: 25
  },
  rectangle3: {
    width:330,
    height:40,
    backgroundColor:'gray',
    top: 50
  },
  rectangle4: {
    width:330,
    height:40,
    backgroundColor:'gray',
    marginTop: 75
  },
  rectangle5: {
    width:330,
    height:40,
    backgroundColor:'gray',
    top: 100
  },
  rectangle6: {
    width:330,
    height:40,
    backgroundColor:'gray',
    top: 125
  },
});
