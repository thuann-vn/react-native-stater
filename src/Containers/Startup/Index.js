import Screens from '@/Config/Screens'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
// import InitStartup from '@/Store/Startup/Init'
import { isEmpty, isLoaded } from 'react-redux-firebase'

const IndexStartupContainer = ({ navigation }) => {
  const auth = useSelector((state) => state.firebase.auth)
  useEffect(() => {
    if (isLoaded(auth)) {
      if (isEmpty(auth)) {
        navigation.replace(Screens.AUTH)
      } else {
        navigation.replace(Screens.MAIN)
      }
    }
  }, [navigation, auth])

  return null
}

export default IndexStartupContainer
