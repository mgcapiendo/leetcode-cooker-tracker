////////////////////////////////////////////////////////////////////
//this component is in charge of the smokelines that are animating//
////////////////////////////////////////////////////////////////////
import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Easing } from 'react-native'; //well ofc we are gonna need some animation imports yayuhh!

const AnimatedSmoke = () => {
  //these will control the animation acions for each of the three lines above the cooking pot
  const smoke1Animation = useRef(new Animated.Value(0)).current;
  const smoke2Animation = useRef(new Animated.Value(0)).current;
  const smoke3Animation = useRef(new Animated.Value(0)).current;
  
  //sets the height for each of the smoke lines going from left to righ\
  const smoke1Height = 28; 
  const smoke2Height = 36; 
  const smoke3Height = 32; 
  
  //basically how many pixels the smokelines will move
  const animationRange = 8; 
  
  useEffect(() => {
    // loop animation for the smoke lines
    const createSmokeAnimation = (animValue, duration, delay) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(animValue, {
            toValue: 1, //goes up to 1
            duration: duration,
            easing: Easing.inOut(Easing.sin), //this is what makes it look natural
            useNativeDriver: true,
          }),
          Animated.timing(animValue, {
            toValue: 0, //goes back down to 0
            duration: duration,
            easing: Easing.inOut(Easing.sin), //same thing about looking natural and not like a stiff pong game action going on
            useNativeDriver: true,
          })
        ])
      );
    };
    
    //give randomness to the smokelines animation timing so it looks more organic than robotic
    const smoke1Anim = createSmokeAnimation(smoke1Animation, 2000, 0);
    const smoke2Anim = createSmokeAnimation(smoke2Animation, 2300, 300);
    const smoke3Anim = createSmokeAnimation(smoke3Animation, 1800, 600);
    
    //now that we set all the details lets actually start it
    smoke1Anim.start();
    smoke2Anim.start();
    smoke3Anim.start();
    
    //stop this animation so when we redirect somewhere else it frees memory 
    return () => {
      smoke1Anim.stop();
      smoke2Anim.stop();
      smoke3Anim.stop();
    };
  }, [smoke1Animation, smoke2Animation, smoke3Animation]); //start again once back
  
  //basically means the changing smoke lines from 0 to 1 will now have actual value for pixel movement in the animation
  const smoke1TranslateY = smoke1Animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -animationRange] //we set the range earlier to 8 so it will move up 8 pixels
  });
  
  const smoke2TranslateY = smoke2Animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -animationRange]
  });
  
  const smoke3TranslateY = smoke3Animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -animationRange]
  });

  //now time to render the smoke lines yippee
  return (
    <View style={styles.smokeContainer}>
      <Animated.View 
        style={[
          styles.smokeStick, 
          { 
            height: smoke1Height, 
            transform: [{ translateY: smoke1TranslateY }]
          }
        ]} 
      />
      <Animated.View 
        style={[
          styles.smokeStick, 
          { 
            height: smoke2Height, 
            transform: [{ translateY: smoke2TranslateY }]
          }
        ]} 
      />
      <Animated.View 
        style={[
          styles.smokeStick, 
          { 
            height: smoke3Height, 
            transform: [{ translateY: smoke3TranslateY }]
          }
        ]} 
      />
    </View>
  );
};


//now this is the styling for the smoke
const styles = StyleSheet.create({
  smokeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 45,
    alignItems: 'flex-end',
    marginBottom: 3, 
  },
  smokeStick: {
    width: 5,
    backgroundColor: 'green',
    marginHorizontal: 5,
    borderRadius: 3,
  },
});

export default AnimatedSmoke;