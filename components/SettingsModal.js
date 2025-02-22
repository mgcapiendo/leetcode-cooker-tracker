/////////////////////////////////////////////////////
//this component is in charge of the settings popup//
/////////////////////////////////////////////////////
import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ScrollView} from 'react-native';
import { Feather } from '@expo/vector-icons';

const SettingsModal = ({ visible, onClose, onSave, currentSettings }) => {
  const [targetGoal, setTargetGoal] = useState(currentSettings?.targetGoal?.toString() || '100');
  const [dailyGoal, setDailyGoal] = useState(currentSettings?.dailyGoal?.toString() || '1');

  React.useEffect(() => {
    if (visible) {
      setTargetGoal(currentSettings?.targetGoal?.toString() || '100');
      setDailyGoal(currentSettings?.dailyGoal?.toString() || '1');
    }
  }, [visible, currentSettings]);

  const handleSave = () => {
    onSave({
      targetGoal: parseInt(targetGoal) || 100,
      dailyGoal: parseInt(dailyGoal) || 1
    });
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.centeredView}
        >
          <View style={styles.modalView}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Settings</Text>
              <TouchableOpacity onPress={onClose}>
                <Feather name="x" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <ScrollView>
              <View style={styles.infoContainer}>
                <Feather name="info" size={20} color="#4CAF50" style={styles.infoIcon} />
                <Text style={styles.infoText}>
                  Set your goals to track your LeetCode journey. You can always change these later.
                </Text>
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Total Goal (Problems)</Text>
                <TextInput
                  style={styles.input}
                  value={targetGoal}
                  onChangeText={setTargetGoal}
                  keyboardType="numeric"
                  placeholder="100"
                />
                <Text style={styles.inputHint}>
                  How many LeetCode problems do you want to solve in total?
                </Text>
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Daily Goal (Problems)</Text>
                <TextInput
                  style={styles.input}
                  value={dailyGoal}
                  onChangeText={setDailyGoal}
                  keyboardType="numeric"
                  placeholder="1"
                />
                <Text style={styles.inputHint}>
                  How many problems do you want to solve each day?
                </Text>
              </View>
            </ScrollView>
            
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Save Settings</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalView: {
    width: '85%',
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
    marginBottom: 20
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  infoContainer: {
    flexDirection: 'row',
    backgroundColor: '#f0f9f0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center'
  },
  infoIcon: {
    marginRight: 10
  },
  infoText: {
    fontSize: 14,
    color: '#444',
    flex: 1
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
    marginTop: 5
  },
  saveButton: {
    backgroundColor: 'green',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 10
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  }
});

export default SettingsModal;