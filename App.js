import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SemicircleProgress from './components/SemicircleProgress';
import AnimatedSmoke from './components/AnimatedSmoke';
import SettingsModal from './components/SettingsModal';
import AddProblemModal from './components/AddProblemModal';
import WelcomeModal from './components/WelcomeModal';

export default function App() {
  //states for modal visibility
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [addProblemVisible, setAddProblemVisible] = useState(false);
  const [welcomeVisible, setWelcomeVisible] = useState(false);
  const [isFirstLaunch, setIsFirstLaunch] = useState(true);
  
  //the user data
  const [userData, setUserData] = useState({
    problemsSolved: 0,
    targetGoal: 100,
    dailyGoal: 1,
    dailySolved: 0,
    difficulty: {
      easy: 0,
      medium: 0,
      hard: 0,
    },
    recentlySolved: []
  });

  //load initial data when app starts
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        //THIS IS FOR A RESET
        //await AsyncStorage.clear();
        //await AsyncStorage.removeItem('hasLaunchedBefore');
        //console.log('DATA RESET!!!');
        
        const hasLaunched = await AsyncStorage.getItem('hasLaunchedBefore');
        
        if (!hasLaunched) {
          setIsFirstLaunch(true);
          setWelcomeVisible(true);
          await AsyncStorage.setItem('hasLaunchedBefore', 'true');
        } else {
          //check if data exists for loading
          const savedDataString = await AsyncStorage.getItem('leetcodeTrackerData');
          
          if (savedDataString) {
            try {
              const parsedData = JSON.parse(savedDataString);
              console.log('LOADED SAVED DATA:', parsedData);
              
              //update data
              setUserData(currentData => ({
                ...currentData,
                ...parsedData
              }));
            } catch (parseError) {
              console.error('ERROR PARSING SAVED DATA', parseError);
            }
          } else {
            console.log('NO SAVED DATA');
            setSettingsVisible(true);
          }
        }
      } catch (error) {
        console.error('ERROR LOADING DATA', error);
      }
    };

    loadInitialData();
  }, []);

  //save data at any change
  useEffect(() => {
    const saveData = async () => {
      try {
        console.log('SAVING DATA', userData);
        await AsyncStorage.setItem('leetcodeTrackerData', JSON.stringify(userData));
        console.log('DATA SAVED');
      } catch (error) {
        console.error('ERROR SAVING DATA', error);
      }
    };

    //only saves if the data has content
    if (userData.problemsSolved > 0 || userData.recentlySolved.length > 0) {
      saveData();
    }
  }, [userData]);

  //handling welcome screen completion
  const handleWelcomeComplete = () => {
    setWelcomeVisible(false);
    setSettingsVisible(true);
  };

  //updates problem goals settings
  const updateSettings = (newSettings) => {
    setUserData(prevData => ({
      ...prevData,
      targetGoal: newSettings.targetGoal,
      dailyGoal: newSettings.dailyGoal
    }));
    setSettingsVisible(false);
  };

  //adding new solved problem
  const addProblem = (problem) => {
    const newId = userData.recentlySolved.length > 0 
      ? Math.max(...userData.recentlySolved.map(p => p.id)) + 1 
      : 1;
    
    const newProblem = {
      id: newId,
      title: problem.title,
      difficulty: problem.difficulty,
      date: problem.date
    };
    
    const newDifficulty = { ...userData.difficulty };
    newDifficulty[problem.difficulty.toLowerCase()]++;
    
    const today = new Date().toISOString().split('T')[0];
    const dailySolvedIncrement = problem.date === today ? 1 : 0;
    
    setUserData(prevData => ({
      ...prevData,
      problemsSolved: prevData.problemsSolved + 1,
      dailySolved: prevData.dailySolved + dailySolvedIncrement,
      difficulty: newDifficulty,
      recentlySolved: [newProblem, ...prevData.recentlySolved]
    }));
    
    setAddProblemVisible(false);
  };

  //calculates the cooked level based on problems solved
  const getCookedLevel = () => {
    const percentage = (userData.problemsSolved / userData.targetGoal) * 100;
    if (userData.problemsSolved < 10) return 'BURNT - Fix it!'
    if (percentage < 30) return 'CHARRED - Good Start!';
    if (percentage < 50) return 'OVERDONE - Getting on Track!';
    if (percentage < 70) return 'COOKED - Looking Better!';
    if (percentage < 90) return 'GLAZED - Absolutely Insane!';
    if (percentage < 100) return 'NAHH YOU ARE COOKIN!!!';
    return 'THE CHEF THAT COOKED';
  };

  //gets todays date
  const getTodayDate = () => {
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return today.toLocaleDateString('en-US', options);
  };

  //renders the problem item
  const renderProblemItem = (problem, index) => {
    const difficultyColor = {
      'Easy': 'green',
      'Medium': 'orange',
      'Hard': 'red'
    };

    return (
      <View key={index} style={styles.problemItem}>
        <Text style={styles.problemTitle}>{problem.title}</Text>
        <Text style={[styles.problemDifficulty, { color: difficultyColor[problem.difficulty] }]}>
          {problem.difficulty}
        </Text>
        <Text style={styles.problemDate}>{problem.date}</Text>
      </View>
    );
  };

  //render empty state when no problems are solved
  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Feather name="code" size={40} color="#ccc" />
      <Text style={styles.emptyStateText}>You need to start COOKIN!</Text>
      <Text style={styles.emptyStateSubtext}>
        Tap the + button to add your first problem solved
      </Text>
      <TouchableOpacity 
        style={styles.emptyStateButton}
        onPress={() => setAddProblemVisible(true)}
      >
        <Text style={styles.emptyStateButtonText}>Add Your First Problem</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      <View style={styles.header}>
        <Text style={styles.dateHeader}>{getTodayDate()}</Text>
        <TouchableOpacity 
          style={styles.settingsButton}
          onPress={() => setSettingsVisible(true)}
        >
          <Feather name="settings" size={24} color="green" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.mainContent}>
        <View style={styles.leftColumn}>
          <View style={styles.dailyProgress}>
            <Text style={styles.statsHeader}>Daily Progress</Text>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { 
                    width: userData.dailyGoal > 0 
                      ? `${(userData.dailySolved / userData.dailyGoal) * 100}%` 
                      : '0%' 
                  }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>{userData.dailySolved}/{userData.dailyGoal} solved</Text>
          </View>
          
          <View style={styles.difficultyStats}>
            <Text style={styles.statsHeader}>Difficulty Breakdown</Text>
            <View style={styles.statRow}>
              <View style={[styles.dot, { backgroundColor: '#00b300' }]} />
              <Text style={styles.statText}>Easy: {userData.difficulty.easy}</Text>
            </View>
            <View style={styles.statRow}>
              <View style={[styles.dot, { backgroundColor: '#ff9900' }]} />
              <Text style={styles.statText}>Medium: {userData.difficulty.medium}</Text>
            </View>
            <View style={styles.statRow}>
              <View style={[styles.dot, { backgroundColor: '#ff0000' }]} />
              <Text style={styles.statText}>Hard: {userData.difficulty.hard}</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.rightColumn}>
          <View style={styles.cookingPotContainer}>
            <AnimatedSmoke />
            
            <View style={styles.potLip} />
            <View style={styles.potBowl}>
              <Text style={styles.potCount}>{userData.problemsSolved}</Text>
            </View>
            
            <Text style={styles.cookedLevel}>
              You're Cooked Level is: <Text style={{ fontWeight: 'bold' }}>{getCookedLevel()}</Text>
            </Text>
          </View>
        </View>
      </View>
      
      <View style={styles.progressSemicircle}>
        <Text style={styles.sectionHeader}>Progress Tracker</Text>
        <SemicircleProgress current={userData.problemsSolved} target={userData.targetGoal} />
      </View>
      
      <View style={styles.problemsHeader}>
        <Text style={styles.sectionHeader}>Recently Solved Problems</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => setAddProblemVisible(true)}
        >
          <Feather name="plus-circle" size={24} color="green" />
        </TouchableOpacity>
      </View>
      
      {userData.recentlySolved.length > 0 ? (
        <ScrollView style={styles.problemsList}>
          {userData.recentlySolved.map(renderProblemItem)}
        </ScrollView>
      ) : (
        renderEmptyState()
      )}
      
      <WelcomeModal
        visible={welcomeVisible}
        onComplete={handleWelcomeComplete}
      />
      
      <SettingsModal
        visible={settingsVisible}
        onClose={() => setSettingsVisible(false)}
        onSave={updateSettings}
        currentSettings={{
          targetGoal: userData.targetGoal,
          dailyGoal: userData.dailyGoal
        }}
      />
      
      <AddProblemModal
        visible={addProblemVisible}
        onClose={() => setAddProblemVisible(false)}
        onSave={addProblem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  dateHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
    marginTop: 15,
  },
  settingsButton: {
    padding: 8,
    marginTop: 15,
  },
  mainContent: {
    flexDirection: 'row',
    marginBottom: 10,
    marginTop: 10,
  },
  leftColumn: {
    flex: 1,
    marginRight: 10,
    justifyContent: 'space-between',
    height: 160,
  },
  rightColumn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  dailyProgress: {
    marginBottom: 25,
  },
  statsHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  progressBar: {
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    marginBottom: 5,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: 'green',
  },
  progressText: {
    fontSize: 12,
  },
  difficultyStats: {
    marginTop: 10,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  statText: {
    fontSize: 14,
  },
  cookingPotContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ scale: 0.95 }],
  },
  potLip: {
    width: 120,
    height: 10,
    backgroundColor: '#264653',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  potBowl: {
    width: 110,
    height: 70,
    backgroundColor: '#264653',
    borderBottomLeftRadius: 55,
    borderBottomRightRadius: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  potCount: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  cookedLevel: {
    fontSize: 14,
    marginTop: 8,
    color: 'green',
  },
  progressSemicircle: {
    marginVertical: 10,
  },
  problemsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 5,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  addButton: {
    padding: 5,
  },
  problemsList: {
    flex: 1.5,
  },
  problemItem: {
    padding: 12,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  problemTitle: {
    flex: 2,
    fontSize: 14,
    fontWeight: '500',
  },
  problemDifficulty: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  problemDate: {
    flex: 1,
    textAlign: 'right',
    fontSize: 12,
    color: '#888',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 12,
    color: '#666',
  },
  emptyStateSubtext: {
    fontSize: 14,
    textAlign: 'center',
    color: '#888',
    marginTop: 8,
    marginBottom: 20,
  },
  emptyStateButton: {
    backgroundColor: 'green',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  emptyStateButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  }
});