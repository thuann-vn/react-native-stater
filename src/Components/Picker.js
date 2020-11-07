import React from 'react'
import { Text, View, StyleSheet, Dimensions } from 'react-native'
import BottomSheet from 'reanimated-bottom-sheet'
import { BlurView } from '@react-native-community/blur'
import Icon from 'react-native-vector-icons/Ionicons'
import { useTranslation } from 'react-i18next'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { Colors, FontSize } from '@/Theme'
import FastImage from 'react-native-fast-image'
import { SearchBar } from 'react-native-elements'

const PickerRow = React.memo(
  ({ item, isActive, onPress }) => {
    const _renderCheckedIcon = () => {
      if (isActive) {
        return <Icon name="ios-checkmark" color={Colors.primary} size={26} />
      }
    }

    return (
      <TouchableOpacity key={item.code} style={styles.row} onPress={onPress}>
        <View style={styles.rowContainer}>
          {item.image && (
            <FastImage
              source={item.image}
              style={styles.flag}
              resizeMode="contain"
            />
          )}

          <View style={styles.label}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.code}>
              {item.code}{item.symbol ? ' - ' + item.symbol : ''}
            </Text>
          </View>
          {_renderCheckedIcon()}
        </View>
      </TouchableOpacity>
    )
  },
  (prevProps, nextProps) => {
    if (prevProps.isActive === nextProps.isActive) {
      return true
    }
    return false
  },
)

const Picker = React.forwardRef((props, ref) => {
  const sheetRef = React.useRef(null)
  const { t } = useTranslation()
  const [value, setValue] = React.useState(null)
  const [searchText, setSearchText] = React.useState(null)
  const [data, setData] = React.useState(props.items)

  React.useImperativeHandle(
    ref,
    () => ({
      open: () => {
        sheetRef.current.snapTo(0)
      },
    }),
    [sheetRef],
  )

  const _close = () => {
    sheetRef.current.snapTo(2)
  }

  const _renderRow = ({ item }) => {
    return (
      <PickerRow
        item={item}
        isActive={item.code === value}
        onPress={() => {
          setValue(item.code)
          props.onValueChange && props.onValueChange(item.code)
          _close()
        }}
      />
    )
  }

  const _filterData = (keyword) => {
    setSearchText(keyword)

    var filteredData = props.items.filter((item) => {
      if (
        !keyword ||
        (keyword.toLowerCase() && item.name.toLowerCase().includes(keyword)) ||
        (keyword.toLowerCase() && item.code.toLowerCase().includes(keyword))
      ) {
        return true
      }
      return false
    })
    setData(filteredData)
  }

  const renderContent = () => (
    <View style={styles.container}>
      <BlurView
        blurAmount={100}
        blurType="xlight"
        style={styles.blurViewContainer}
      />
      <View style={styles.contentContainer}>
        {renderHeader()}
        <FlatList
          data={data}
          keyExtractor={(item) => item.code}
          renderItem={_renderRow}
        />
      </View>
    </View>
  )

  const renderHeader = () => (
    <>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{props.title}</Text>
        <TouchableOpacity onPress={_close}>
          <Icon
            style={styles.closeButton}
            name="close-circle-sharp"
            size={30}
            color={Colors.textGray}
          />
        </TouchableOpacity>
      </View>

      <SearchBar
        placeholder={t('common_search')}
        onChangeText={_filterData}
        value={searchText}
        lightTheme={true}
        platform="ios"
        containerStyle={styles.searchBarContainerStyle}
        inputStyle={styles.searchBarInputStyle}
        inputContainerStyle={styles.searchBarInputContainerStyle}
      />
    </>
  )
  return (
    <>
      <BottomSheet
        ref={sheetRef}
        snapPoints={[Dimensions.get('window').height - 300, 0, 0]}
        initialSnap={1}
        borderRadius={10}
        renderContent={renderContent}
        {...props}
      />
    </>
  )
})
export default Picker

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    height: '100%',
    position: 'relative'
  },
  blurViewContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontWeight: 'bold',
  },
  row: {
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: Colors.separator
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    padding: 7,
  },
  iconsContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  flag: {
    height: 24,
    width: 32,
    marginRight: 10,
    borderRadius: 2,
  },
  label: {
    flex: 1,
  },
  name: {},
  code: {
    color: '#777',
  },

  searchBarContainerStyle: {
    backgroundColor: 'transparent',
    marginBottom: 0,
    marginTop: 0,
    padding: 0,
  },
  searchBarInputStyle: {
    backgroundColor: 'transparent',
    fontSize: FontSize.regular,
  },
  searchBarInputContainerStyle: {
    backgroundColor: 'rgba(255,255,255,.8)',
    padding: 0,
    height: 30,
  },
})
