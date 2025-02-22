/////////////////////////////////////////////////////////////////
//this component is in charge of the add problem feature pop up//
/////////////////////////////////////////////////////////////////
import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons'; //icons for a bit more of that pizaz(?) pizazh(?) idk how you spell it
import { View, Text, Modal, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ScrollView} from 'react-native';

//popup for adding a completed leetcode problem this is the main component of this entire thing duh
const AddProblemModal = ({ visible, onClose, onSave }) => { //is it being shown?, close it, save the problems
  const [title, setTitle] = useState(''); //stores the title
  const [difficulty, setDifficulty] = useState('Medium'); //stores the difficulty itll just default the first selected to be medium but we both well know were only solving easy
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]); //stores the date and it will be in yyyy-mm-dd

  //reset the form when it gets opened again
  React.useEffect(() => {
    if (visible) {
      setTitle(''); //clears the title
      setDifficulty('Medium'); //resets the difficulty which will default on medium
      setDate(new Date().toISOString().split('T')[0]); //reset date to today
    }
  }, [visible]); //and only run when visible changes such as opening means true and closing means false

  //run checklist before saving to list
  const handleSave = () => {
    if (title.trim() === '') { //check if title is empty, trim() removes white space
      return; //if there is no title and it is just blank then return nothing at all so you dont mess it up duh
    }
    
    //the data that is going to be saved
    onSave({
      title: title.trim(), //removes any leading or trailing white space
      difficulty, //gets the difficulty entered
      date //get the date entered
    });
  };

  //this updates the dificulty that the user selcts on the screen
  const handleDifficultySelect = (selected) => {
    setDifficulty(selected); //as it says plain as day. it sets teh dificulty to what? what is selcted. yes.
  };

  //render it now yippee
  return (
    <Modal
      animationType="slide" //i couldnt decide between this and fade but then i realized slide looks so much better fr fr
      transparent={true} //set background transparaency 
      visible={visible}  //visibility mode
      onRequestClose={onClose} //handle what happens when you go back
    >

      {/*If you tap outside the input field exit the input field*/}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {/*adjust the view when keyboard appears so it dont clip */}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.centeredView}
        >

          {/*the actual popup*/}
          <View style={styles.modalView}>
            {/*setup header*/}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Solved Problem</Text>
              <TouchableOpacity onPress={onClose}>
                <Feather name="x" size={24} color="#333" /> {/*sets the x icon on the top right */}
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.scrollView}> {/*allow for scrolling for the popup */}
              <View style={styles.inputContainer}> {/*the actual input field */}
                <Text style={styles.inputLabel}>Problem Title</Text> 
                <TextInput
                  style={styles.input}
                  value={title}
                  onChangeText={setTitle}
                  placeholder="e.g. Two Sum"
                />
                <Text style={styles.inputHint}>
                  Enter the title of the LeetCode problem you solved
                </Text>
              </View>
              
              {/*set up the difficulty section */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Difficulty</Text>
                <View style={styles.difficultyContainer}>

                  {/*easy selection */}
                  <TouchableOpacity
                    style={[
                      styles.difficultyButton,
                      difficulty === 'Easy' && styles.difficultyButtonSelected,
                      { backgroundColor: difficulty === 'Easy' ? '#e6ffe6' : '#f0f0f0' }
                    ]}
                    onPress={() => handleDifficultySelect('Easy')}
                  >
                    <Text style={[
                      styles.difficultyText,
                      difficulty === 'Easy' && { color: '#00b300', fontWeight: 'bold' }
                    ]}>Easy</Text>
                  </TouchableOpacity>
                  

                  {/*medium selection */}
                  <TouchableOpacity
                    style={[
                      styles.difficultyButton,
                      difficulty === 'Medium' && styles.difficultyButtonSelected,
                      { backgroundColor: difficulty === 'Medium' ? '#fff8e6' : '#f0f0f0' }
                    ]}
                    onPress={() => handleDifficultySelect('Medium')}
                  >
                    <Text style={[
                      styles.difficultyText,
                      difficulty === 'Medium' && { color: '#ff9900', fontWeight: 'bold' }
                    ]}>Medium</Text>
                  </TouchableOpacity>
                  

                  {/*hard selection */}
                  <TouchableOpacity
                    style={[
                      styles.difficultyButton,
                      difficulty === 'Hard' && styles.difficultyButtonSelected,
                      { backgroundColor: difficulty === 'Hard' ? '#ffe6e6' : '#f0f0f0' }
                    ]}
                    onPress={() => handleDifficultySelect('Hard')}
                  >
                    <Text style={[
                      styles.difficultyText,
                      difficulty === 'Hard' && { color: '#ff0000', fontWeight: 'bold' }
                    ]}>Hard</Text>
                  </TouchableOpacity>

                </View>
              </View>
              
              {/*date section */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Date Solved</Text>
                <TextInput
                  style={styles.input}
                  value={date}
                  onChangeText={setDate}
                  placeholder="YYYY-MM-DD"
                />
                <Text style={styles.inputHint}>Format: YYYY-MM-DD (e.g. 2025-02-20)</Text>
                <TouchableOpacity
                  style={styles.todayButton}
                  onPress={() => setDate(new Date().toISOString().split('T')[0])}
                >
                  <Text style={styles.todayButtonText}>Select Today's Date</Text>
                </TouchableOpacity>
              </View>
              
              {/*tip bubble */}
              <View style={styles.tipContainer}>
                <Feather name="info" size={18} color="#4CAF50" style={styles.tipIcon} />
                <Text style={styles.tipText}>
                  Tracking your solved problems promotes better habits and higher consistency!
                </Text>
              </View>
            </ScrollView>
            
            {/*cancel button */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={[styles.button, styles.cancelButton]} 
                onPress={onClose}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.button, 
                  styles.saveButton,
                  title.trim() === '' && styles.saveButtonDisabled
                ]} 
                onPress={handleSave}
                disabled={title.trim() === ''}
              >
                <Text style={styles.saveButtonText}>Add Problem</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

//the styles for eveything
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalView: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    maxHeight: '80%'
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  scrollView: {
    maxHeight: '70%'
  },
  inputContainer: {
    marginBottom: 20
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16
  },
  inputHint: {
    fontSize: 12,
    color: '#666',
    marginTop: 4
  },
  difficultyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  difficultyButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 3,
    borderWidth: 1,
    borderColor: '#ddd'
  },
  difficultyButtonSelected: {
    borderColor: '#4CAF50',
    borderWidth: 2
  },
  difficultyText: {
    fontSize: 14
  },
  todayButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f0f9f0',
    borderRadius: 8,
    alignItems: 'center'
  },
  todayButtonText: {
    color: '#4CAF50',
    fontWeight: '500'
  },
  tipContainer: {
    flexDirection: 'row',
    backgroundColor: '#f0f9f0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20
  },
  tipIcon: {
    marginRight: 10,
    marginTop: 2
  },
  tipText: {
    fontSize: 13,
    color: '#444',
    flex: 1,
    lineHeight: 18
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },
  button: {
    flex: 1,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center'
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
    marginRight: 8
  },
  cancelButtonText: {
    color: '#444',
    fontWeight: 'bold'
  },
  saveButton: {
    backgroundColor: 'green',
    marginLeft: 8
  },
  saveButtonDisabled: {
    backgroundColor: '#a5d6a7',
    opacity: 0.7
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold'
  }
});

export default AddProblemModal;