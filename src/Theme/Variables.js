/**
 * This file contains the application's variables.
 *
 * Define color, sizes, etc. here instead of duplicating them throughout the components.
 * That allows to change them more easily later on.
 */

/**
 * Colors
 */
export const Colors = {
  transparent: 'rgba(0,0,0,0)',
  // Example colors:
  white: '#ffffff',
  black: '#000',
  text: '#212529',
  textGray: '#333',
  primary: '#057cff',
  success: '#28a745',
  red: '#dc3545',
  error: '#dc3545',
  placeholder: '#aaaaaa',
  separator: '#efefef',
  tabBarColor: '#057cff',
  tabBarActive: 'rgba(5, 124, 255, .1)',
  tabarBackground: 'rgba(255,255,255,.9)',
  tabIcon: '#000',
  backgroundColor: '#fff',
}

export const DarkModeColors = {
  ...Colors,
  tabarBackground: '#080808',
  backgroundColor: '#000',
  tabBarInActive: '#fff',
  tabIcon: '#aaaaaa',
  text: '#fff',
}
/**
 * FontSize
 */
export const FontSize = {
  small: 12,
  regular: 14,
  large: 18,
  xLarge: 24,
}

/**
 * Metrics Sizes
 */
const tiny = 5 // 10
const small = tiny * 2 // 10
const regular = tiny * 3 // 15
const large = regular * 2 // 30
export const MetricsSizes = {
  tiny,
  small,
  regular,
  large,
}
