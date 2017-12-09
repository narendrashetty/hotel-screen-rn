import React, { Component } from 'react';
import {
  View,
  Text,
  Animated,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
  FlatList,
  ScrollView
} from 'react-native';

const maxWidth = Dimensions.get('window').width;
const maxHeight = Dimensions.get('window').height;

const REVIEWS = [
  { key: 'all', label: 'All Reviews' },
  { key: 'location', label: 'Location' },
  { key: 'comfort', label: 'Comfort' },
  { key: 'clean', label: 'Cleanliness' },
  { key: 'breakfast', label: 'Breakfast' }
];

const REVIEWS1 = [
  { key: 'all', data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
  { key: 'location', data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
  { key: 'comfort', data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
  { key: 'clean', data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
  { key: 'breakfast', data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }
];

class Review extends Component {
  state = {
    currentScrollPosition: new Animated.Value(0)
  };

  componentDidMount() {
    this.listener = this.state.currentScrollPosition.addListener(pos => {
      const ratio = pos.value / 310;
      this.r.scrollToOffset({
        animated: false,
        offset: ratio * maxWidth
      });
    });
  }

  componentWillUnmount() {
    this.state.currentScrollPosition.removeListener(this.listener);
  }

  renderItem = ({ item }) => {
    return (
      <View
        style={{
          width: 300,
          height: 100,
          backgroundColor: '#000'
        }}
      />
    );
  };

  renderReviewItem = () => {
    return (
      <View
        style={{
          width: maxWidth,
          height: 100,
          backgroundColor: '#000'
        }}
      />
    );
  };
  _renderSeperator = () => <View style={{ width: 10 }} />;
  renderHeadScroller = () => {
    return (
      <FlatList
        data={REVIEWS}
        renderItem={this.renderItem}
        scrollEventThrottle={1}
        snapToInterval={310}
        snapToAlignment="start"
        decelerationRate={0}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        ItemSeparatorComponent={this._renderSeperator}
        style={{ paddingLeft: 10, paddingRight: 10, marginTop: 10 }}
        onScroll={Animated.event([
          {
            nativeEvent: {
              contentOffset: {
                x: this.state.currentScrollPosition
              }
            }
          }
        ])}
      />
    );
  };

  renderHeader = () => {
    return (
      <View
        style={{
          backgroundColor: '#f9f9f9',
          height: maxHeight / 2,
          paddingTop: 60
        }}
      >
        <Text style={{ fontSize: 24, paddingLeft: 20 }}>Review Score</Text>
        <Text
          style={{
            fontSize: 12,
            color: '#BBBBCB',
            marginTop: 3,
            paddingLeft: 20
          }}
        >
          Based on 23,019 reviews
        </Text>

        <View
          style={{
            marginTop: 15,
            flexDirection: 'row'
          }}
        >
          <Text
            style={{
              color: '#FC3989',
              fontSize: 50,
              fontWeight: '200',
              paddingLeft: 20,
              lineHeight: 50
            }}
          >
            8.7
          </Text>

          <Text style={{ fontSize: 12, color: '#BBBBCB' }}>/10</Text>
        </View>
        {this.renderHeadScroller()}
      </View>
    );
  };

  renderBody = () => {
    return (
      <FlatList
        ref={r => (this.r = r)}
        data={REVIEWS1}
        horizontal={true}
        renderItem={this.renderReviewItem}
        ItemSeparatorComponent={this._renderSeperator}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
      />
    );
  };

  render() {
    const { screenAnimator } = this.props;
    return (
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          {
            flex: 1,
            transform: [
              {
                translateX: screenAnimator.interpolate({
                  inputRange: [0, 1],
                  outputRange: [maxWidth, 0]
                })
              }
            ]
          }
        ]}
      >
        {this.renderHeader()}
        {this.renderBody()}
      </Animated.View>
    );
  }
}

export default Review;
