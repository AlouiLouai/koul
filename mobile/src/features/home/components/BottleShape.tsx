import React from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { useTheme } from '../../../theme/ThemeContext';

interface BottleShapeProps {
  isComplete: boolean;
  waterTranslateY: Animated.AnimatedInterpolation<number | string>;
  bubbleAnims: Animated.Value[];
}

export const BottleShape = ({ isComplete, waterTranslateY, bubbleAnims }: BottleShapeProps) => {
  const { colors, mode } = useTheme();

  const getBubbleStyle = (anim: Animated.Value, left: number) => ({
      position: 'absolute' as 'absolute',
      bottom: 0,
      left: left,
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: 'rgba(255,255,255,0.4)',
      transform: [
          { translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [0, -180] }) },
          { scale: anim.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0.5, 1, 0] }) }
      ]
  });

  return (
    <View style={styles.container}>
        {/* Bottle Body */}
        <View 
            style={[
                styles.bottleBody,
                { 
                    borderColor: isComplete ? 'rgba(255,255,255,0.5)' : colors.glassBorder, 
                    backgroundColor: mode === 'dark' || isComplete ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' 
                }
            ]}
        >
            <View style={styles.waterContainer}>
                <Animated.View 
                    style={[
                        styles.water,
                        { 
                            transform: [{ translateY: waterTranslateY }],
                            backgroundColor: isComplete ? '#fff' : '#3b82f6', 
                            opacity: isComplete ? 0.9 : 0.8
                        }
                    ]}
                > 
                   <Animated.View style={getBubbleStyle(bubbleAnims[0], 20)} />
                   <Animated.View style={getBubbleStyle(bubbleAnims[1], 55)} />
                   <Animated.View style={getBubbleStyle(bubbleAnims[2], 85)} />
                </Animated.View>
            </View>
            
            {/* Bottle Label */}
            <View 
                style={[
                    styles.label,
                    { backgroundColor: isComplete ? 'rgba(0,0,0,0.2)' : colors.background[0] }
                ]}
            >
               <Text style={[styles.labelText, { color: isComplete ? '#fff' : colors.primary }]}>3L SAFIA</Text>
            </View>

            {/* Measure Lines */}
            <View style={[styles.measureLine, { bottom: '25%', backgroundColor: isComplete ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.3)' }]} />
            <View style={[styles.measureLine, { bottom: '50%', backgroundColor: isComplete ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.3)' }]} />
            <View style={[styles.measureLine, { bottom: '75%', backgroundColor: isComplete ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.3)' }]} />
        </View>

        {/* Bottle Neck & Cap */}
        <View 
            style={[
                styles.bottleNeck,
                { 
                    borderColor: isComplete ? 'rgba(255,255,255,0.5)' : colors.glassBorder, 
                    backgroundColor: isComplete ? 'rgba(255,255,255,0.2)' : (mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)') 
                }
            ]}
        />
        <View 
            style={[
                styles.bottleCap,
                { backgroundColor: isComplete ? '#fff' : colors.primary }
            ]}
        />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        width: 110,
        height: 210,
        position: 'relative',
        alignItems: 'center',
        marginTop: 8,
    },
    bottleBody: {
        width: 105,
        height: 180,
        borderRadius: 18,
        borderWidth: 2.5,
        position: 'absolute',
        bottom: 0,
        overflow: 'hidden',
    },
    waterContainer: {
        flex: 1,
        overflow: 'hidden',
        position: 'relative',
    },
    water: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        left: 0,
        top: 0,
    },
    label: {
        position: 'absolute',
        top: '45%',
        left: 0,
        right: 0,
        height: 24,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.9,
    },
    labelText: {
        fontSize: 12,
        fontWeight: '900',
        letterSpacing: 1.5,
    },
    measureLine: {
        width: 14,
        height: 1.5,
        position: 'absolute',
        right: 4,
    },
    bottleNeck: {
        width: 45,
        height: 25,
        borderTopWidth: 2.5,
        borderLeftWidth: 2.5,
        borderRightWidth: 2.5,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        position: 'absolute',
        top: 5,
    },
    bottleCap: {
        width: 50,
        height: 10,
        borderRadius: 2,
        position: 'absolute',
        top: 0,
    }
});