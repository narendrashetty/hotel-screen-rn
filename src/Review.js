import React, { Component } from 'react';
import {
  View,
  Text,
  Animated,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
  FlatList,
  ScrollView,
  Image
} from 'react-native';

const maxWidth = Dimensions.get('window').width;
const maxHeight = Dimensions.get('window').height;

const headerHeight = maxHeight / 2 - 30;

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const SCROLLEND = headerHeight - 100;

const REVIEWS = [
  { key: 'all', label: 'All Reviews', backgroundColor: '#EC6768', rating: 9.2 },
  {
    key: 'location',
    label: 'Location',
    backgroundColor: '#679aec',
    rating: 9.2
  },
  { key: 'comfort', label: 'Comfort', backgroundColor: '#e067ec', rating: 9.2 },
  {
    key: 'clean',
    label: 'Cleanliness',
    backgroundColor: '#eca667',
    rating: 9.2
  },
  {
    key: 'breakfast',
    label: 'Breakfast',
    backgroundColor: '#EC6768',
    rating: 9.2
  }
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
    currentScrollPosition: new Animated.Value(0),
    bodyScrollPosition: new Animated.Value(0)
  };

  currentIndex = 0;

  componentDidMount() {
    this.listener = this.state.currentScrollPosition.addListener(pos => {
      const ratio = pos.value / 310;
      this.currentIndex = Math.floor(ratio);
      this.r.getNode().scrollToOffset({
        animated: false,
        offset: ratio * maxWidth
      });
    });
  }

  componentWillUnmount() {
    this.state.currentScrollPosition.removeListener(this.listener);
    this.currentIndex = 0;
  }

  renderItem = ({ item, index }) => {
    const { bodyScrollPosition } = this.state;
    let scale = 1;
    let opacity = 1;
    if (this.currentIndex === index) {
      scale = maxWidth / 300;
    } else {
      opacity = 0;
    }
    return (
      <View style={{ height: 100, flex: 1, width: 300, position: 'relative' }}>
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: item.backgroundColor,
              borderRadius: 4,
              opacity: bodyScrollPosition.interpolate({
                inputRange: [0, SCROLLEND / 4],
                outputRange: [1, opacity],
                extrapolate: 'clamp'
              }),
              transform: [
                {
                  translateX: bodyScrollPosition.interpolate({
                    inputRange: [0, SCROLLEND],
                    outputRange: [0, (maxWidth - 300 - 20) / 2],
                    extrapolate: 'clamp'
                  })
                },
                {
                  scaleX: bodyScrollPosition.interpolate({
                    inputRange: [0, SCROLLEND],
                    outputRange: [1, scale],
                    extrapolate: 'clamp'
                  })
                }
              ]
            }
          ]}
        />
        <Animated.View
          style={{
            padding: 20,
            justifyContent: 'space-between',
            opacity: bodyScrollPosition.interpolate({
              inputRange: [0, SCROLLEND / 4],
              outputRange: [1, opacity],
              extrapolate: 'clamp'
            })
          }}
        >
          <Text
            style={{
              color: '#fff',
              fontSize: 26,
              fontWeight: '200',
              backgroundColor: 'transparent'
            }}
          >
            {item.label}
          </Text>
          <View
            style={{
              flexDirection: 'row'
            }}
          >
            <Text
              style={{
                color: '#fff',
                fontSize: 12,
                fontWeight: 'bold',
                backgroundColor: 'transparent'
              }}
            >
              {item.rating}
            </Text>
            <View style={{ marginLeft: 20 }}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 12,
                  fontWeight: '200',
                  backgroundColor: 'transparent'
                }}
              >
                1432 Reviews
              </Text>
            </View>
          </View>
        </Animated.View>
      </View>
    );
  };

  renderReviewItem = () => {
    return (
      <View style={{ marginTop: 10, marginBottom: 10, flex: 1 }}>
        <View
          style={{
            height: 50,
            flexDirection: 'row'
          }}
        >
          <View>
            <Image
              source={{
                uri:
                  'https://pbs.twimg.com/profile_images/859482903763460098/565FGTxs_400x400.jpg'
              }}
              style={{ width: 40, height: 40, borderRadius: 20 }}
            />
          </View>
          <View style={{ marginLeft: 20 }}>
            <Text style={{ color: '#000', fontWeight: '500' }}>
              Narendra N Shetty
            </Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ color: '#BBBBCB', fontSize: 12 }}>Amsterdam</Text>
              <Text style={{ color: '#BBBBCB', fontSize: 12, marginLeft: 10 }}>
                15 Aug
              </Text>
            </View>
          </View>
        </View>
        <View style={{ paddingRight: 10 }}>
          <Text style={{ color: '#9a9898', lineHeight: 18, fontWeight: '500' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            volutpat tortor id massa consectetur viverra. Duis ac justo leo.
            Praesent eget ipsum ut ex posuere dictum.
          </Text>
        </View>
      </View>
    );
  };

  renderReview = ({ item }) => {
    return (
      <FlatList
        data={item.data}
        keyExtractor={(item, index) => index}
        renderItem={this.renderReviewItem}
        ItemSeparatorComponent={() => (
          <View
            style={{
              backgroundColor: '#ececec',
              flex: 1,
              height: 1,
              marginTop: 10,
              marginBottom: 10
            }}
          />
        )}
        style={{
          flex: 1,
          width: maxWidth,
          paddingTop: 20,
          paddingBottom: 20,
          paddingLeft: 20,
          paddingRight: 20
        }}
        onScroll={Animated.event([
          {
            nativeEvent: {
              contentOffset: {
                y: this.state.bodyScrollPosition
              }
            }
          }
        ])}
      />
    );
  };
  _renderSeperator = () => <View style={{ width: 10 }} />;
  renderHeadScroller = () => {
    const { bodyScrollPosition } = this.state;
    return (
      <AnimatedFlatList
        data={REVIEWS}
        renderItem={this.renderItem}
        scrollEventThrottle={1}
        snapToInterval={310}
        snapToAlignment="start"
        decelerationRate={0}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        ItemSeparatorComponent={this._renderSeperator}
        style={{
          paddingLeft: 10,
          paddingRight: 10,
          marginTop: 10,
          height: 100,
          transform: [
            {
              translateY: bodyScrollPosition.interpolate({
                inputRange: [0, SCROLLEND],
                outputRange: [0, 20],
                extrapolate: 'clamp'
              })
            }
          ]
        }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: this.state.currentScrollPosition
                }
              }
            }
          ],
          {
            useNativeDriver: true
          }
        )}
      />
    );
  };

  renderHeader = () => {
    const { bodyScrollPosition } = this.state;
    return (
      <Animated.View
        style={{
          backgroundColor: '#f9f9f9',
          height: headerHeight,
          paddingTop: 60,
          height: bodyScrollPosition.interpolate({
            inputRange: [0, SCROLLEND],
            outputRange: [headerHeight, 100],
            extrapolate: 'clamp'
          })
        }}
      >
        <Animated.View
          style={{
            transform: [
              {
                translateY: bodyScrollPosition.interpolate({
                  inputRange: [0, SCROLLEND],
                  outputRange: [0, -202],
                  extrapolate: 'clamp'
                })
              }
            ]
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
        </Animated.View>
      </Animated.View>
    );
  };

  renderBody = () => {
    const { bodyScrollPosition } = this.state;
    return (
      <AnimatedFlatList
        ref={r => (this.r = r)}
        data={REVIEWS1}
        horizontal={true}
        renderItem={this.renderReview}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        style={{ flex: 1 }}
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
