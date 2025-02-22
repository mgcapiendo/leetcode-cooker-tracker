////////////////////////////////////////////////////////////////////
//this component is in charge of the progress bar and progress arc//
////////////////////////////////////////////////////////////////////
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, Circle, Text as SvgText } from 'react-native-svg';

//this is the arc which is a semicircle
const SemicircleProgress = ({ current, target, height = 130 }) => { //defines the problems completed, goal number, height of the componenet
  const radius = height - 30;  //adjusts the size of radius minus some space so it doesnt clip the labels
  const width = radius * 2 + 80; //the width for the component with room for labels
  
  const percentage = current / target; //calculate the amou
  
  const topPadding = 20; //prevents clipping and pushes it down
  const svgHeight = height + topPadding + 40; //prevents clipping with recntly solved problms with bottom 
  
  const markers = []; //array for the markers that will divide the arc in segments a milestones
  const markerCount = 5; //between 5 and 6 for simplicity if i make the circle bigger than probably 6 then
  
  //creates a loop that makes and places the labels
  for (let i = 0; i <= markerCount; i++) { 
    const angle = (Math.PI / markerCount) * i; //dividing the circle properly to get the angle to be placed at
    const x = radius + 40 - Math.cos(angle) * radius; //radius + 40 is the center and then last half is for the point where
    const y = height + topPadding - Math.sin(angle) * radius; //y coord
    
    //creates and then adds the dot on the array
    markers.push(
      <Circle 
        key={i} 
        cx={x} 
        cy={y} 
        r={4} 
        fill={i / markerCount <= percentage ? "#4CAF50" : "gray"} //it will either be green or gray dpending where it is at
      />
    );
    
    //coordinates of labels
    let labelX = x; //same x position as the marker
    let labelY = y - 25; //now just raise it up a bit 22-27 range seem fine
    let textAnchor = "middle"; //will center align
    
    //adjust each of the labels x position
    if (i === 0) {
      labelX = x - 15; 
      textAnchor = "end"; 
    } else if (i === markerCount) {
      labelX = x + 15;
      textAnchor = "start";
    } else if (i === 1) {
      labelX = x - 8;
    } else if (i === markerCount - 1) {
      labelX = x + 8;
    }
    
    //calcualte the value for marker
    const labelValue = Math.round((i / markerCount) * target);
    
    //creates and adds the labels to each marker
    markers.push(
      <SvgText
        key={`text-${i}`}
        x={labelX}
        y={labelY}
        fontSize="14"
        fontWeight="bold"
        textAnchor={textAnchor}
        fill="#333"
      >
        {labelValue}
      </SvgText>
    );
  }


//create the full semicircle path
const createFullPath = () => 
  `M 40 ${height + topPadding} A ${radius} ${radius} 0 0 1 ${width - 40} ${height + topPadding}`;

//create the partial progress path
const createPartialPath = () => {
  //returns the full path if progress is complete
  if (percentage >= 1) return createFullPath();
  
  //calcualte where the progress bar ends dispaly
  const angle = Math.PI * percentage;
  const endX = radius + 40 - Math.cos(angle) * radius;
  const endY = height + topPadding - Math.sin(angle) * radius;
  
  //return the path arc now
  return `M 40 ${height + topPadding} A ${radius} ${radius} 0 ${percentage > 0.5 ? 1 : 0} 1 ${endX} ${endY}`;
};

  return (
    <View style={styles.container}>
      <Svg height={svgHeight} width={width} viewBox={`0 0 ${width} ${svgHeight}`}>

        <Path
          d={createFullPath()}
          stroke="#E0E0E0"
          strokeWidth="15"
          strokeLinecap="round"
          fill="transparent"
        />
        
        <Path
          d={createPartialPath()}
          stroke="#4CAF50"
          strokeWidth="15"
          strokeLinecap="round"
          fill="transparent"
        />
        
        {markers}
        
        <SvgText
          x="15"
          y={height + topPadding + 35}
          fontSize="22"
          fontWeight="bold"
          fill="#FF9800"
        >
          {current}
        </SvgText>
        
        <SvgText
          x={width - 15}
          y={height + topPadding + 35} 
          fontSize="22"
          fontWeight="bold"
          textAnchor="end"
          fill="#4CAF50"
        >
          {target}
        </SvgText>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    paddingHorizontal: 10,
    width: '100%',
  },
});

export default SemicircleProgress;