/**
 * This file defines the base application styles.
 *
 * Use it to define generic component styles (e.g. the default text styles, default button styles...).
 */
import { Colors } from './Variables'
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: Colors.primary,
    borderRadius: 3,
    textAlign: 'center',
    alignItems: 'center',
  },
  buttonTitle: {
    color: Colors.white,
    textTransform: 'uppercase',
  },
  backgroundPrimary: {
    backgroundColor: Colors.primary,
  },
  backgroundReset: {
    backgroundColor: Colors.transparent,
  },
  textInput: {
    height: 42,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    color: Colors.text,
    marginBottom: 10,
    paddingLeft: 16,
  },
  tab: {
    backgroundColor: 'rgba(255,255,255,.9)',
  },
  tabIcon: {
    color: Colors.black,
  },
})
