//////////////////////////////////////////////////////
//this component is in charge of the start up screen//
//////////////////////////////////////////////////////
import React from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import { Feather } from '@expo/vector-icons';

const WelcomeModal = ({ visible, onComplete }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onComplete}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <ScrollView>
            <View style={styles.welcomeHeader}>
              <Feather name="code" size={40} color="green" />
              <Text style={styles.welcomeTitle}>Welcome to the LeetCode Cooking Tracker!</Text>
            </View>
            
            <Text style={styles.welcomeText}>
              Track your LeetCode progress as you solve more problems.
            </Text>
            
            <View style={styles.featureContainer}>
              <View style={styles.featureItem}>
                <Feather name="trending-up" size={24} color="green" />
                <View style={styles.featureTextContainer}>
                  <Text style={styles.featureTitle}>Track Your Progress</Text>
                  <Text style={styles.featureDescription}>
                    Set goals and visualize your progress in your new progress meter
                  </Text>
                </View>
              </View>
              
              <View style={styles.featureItem}>
                <Feather name="list" size={24} color="green" />
                <View style={styles.featureTextContainer}>
                  <Text style={styles.featureTitle}>Log Your Solutions</Text>
                  <Text style={styles.featureDescription}>
                    Keep a track of all the problems you've solved
                  </Text>
                </View>
              </View>
              
              <View style={styles.featureItem}>
                <Feather name="award" size={24} color="green" />
                <View style={styles.featureTextContainer}>
                  <Text style={styles.featureTitle}>Cook or Get Cooked!</Text>
                  <Text style={styles.featureDescription}>
                    Watch your cooking pot fill up as you complete more LeetCode problems
                  </Text>
                </View>
              </View>
            </View>
            
            <Text style={styles.setupText}>
              Let's get started by setting up your goals.
            </Text>
          </ScrollView>
          
          <TouchableOpacity 
            style={styles.getStartedButton} 
            onPress={onComplete}
          >
            <Text style={styles.getStartedText}>Set Up Your Goals</Text>
            <Feather name="arrow-right" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
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
    width: '90%',
    height: '80%',
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
    elevation: 5
  },
  welcomeHeader: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 12
  },
  welcomeText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#555'
  },
  featureContainer: {
    marginBottom: 30
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
    paddingHorizontal: 10
  },
  featureTextContainer: {
    marginLeft: 15,
    flex: 1
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4
  },
  featureDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20
  },
  setupText: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
    marginBottom: 20,
    color: '#444'
  },
  getStartedButton: {
    backgroundColor: 'green',
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  getStartedText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    marginRight: 10
  }
});

export default WelcomeModal;