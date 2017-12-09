import React, { Component } from 'react';
import {
  View,
  Text,
  Animated,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions
} from 'react-native';
import Review from './Review';

const maxWidth = Dimensions.get('window').width;

export default class Hotel extends Component {
  state = {
    screenAnimator: new Animated.Value(1)
  };

  gotoReviewScreen = () => {
    Animated.timing(this.state.screenAnimator, {
      toValue: 1,
      duration: 3000
    }).start();
  };

  renderHotelScreen = s => {
    const { screenAnimator } = this.state;
    return (
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          {
            flex: 1,
            paddingTop: 60,
            transform: [
              {
                translateX: screenAnimator.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -maxWidth]
                })
              }
            ]
          }
        ]}
      >
        <Text style={{ fontSize: 24, paddingLeft: 20 }}>Marina Bay Sands</Text>
        <Text
          style={{
            fontSize: 12,
            color: '#BBBBCB',
            marginTop: 3,
            paddingLeft: 20
          }}
        >
          Singapore
        </Text>
        <TouchableWithoutFeedback onPress={this.gotoReviewScreen}>
          <View
            style={{
              borderColor: '#EEEEEE',
              borderTopWidth: 1,
              borderBottomWidth: 1,
              height: 60,
              flexDirection: 'row',
              marginTop: 10
            }}
          >
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                borderRightColor: '#eeeeee',
                borderRightWidth: 1,
                width: 80
              }}
            >
              <Text style={{ color: '#FC3989', fontSize: 22 }}>8.7</Text>
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  color: '#BBBBCB'
                }}
              >
                score from 23,019 reviews
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Animated.View>
    );
  };

  render() {
    const { screenAnimator } = this.state;
    return (
      <View style={{ flex: 1 }}>
        {this.renderHotelScreen()}
        <Review screenAnimator={screenAnimator} />
      </View>
    );
  }
}
