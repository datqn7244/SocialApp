export default {
  palette: {
    primary: {
      light: '#69e2ff',
      main: '#00b0ff',
      dark: '#0081cb',
      contrastText: '#fafafa',
    },
    secondary: {
      light: '#67daff',
      main: '#03a9f4',
      dark: '#007ac1',
      contrastText: '#fafafa',
    },
  },form:{
    textAlign:'center'
  },
  image:{
    borderRadius:'5%',
    margin: '20px auto 20px auto',
    width: '150px'
  },
  pageTitle:{
    margin: '10px auto 10px auto'
  },
  textField:{
    margin: '10px auto 10px auto'
  },
  button:{
    marginTop: 20,
    position: 'relative'
  },
  customError:{
    color:'red',
    fontSize:'0.8rem'
  },
  progress:{
    position: 'absolute'
  },
  paper: {
    padding: 20
  },
  profile: {
    '& .image-wrapper': {
      textAlign: 'center',
      position: 'relative',
      '& button': {
        position: 'absolute',
        top: '85%',
        left: '70%'
      }
    },
    '& .profile-image': {
      width: 200,
      height: 200,
      objectFit: 'cover',
      maxWidth: '100%',
      borderRadius: '50%'
    },
    '& .profile-details': {
      textAlign: 'center',
      '& span, svg': {
        verticalAlign: 'middle'
      },
      '& a': {
        color: 'primary.main'
      }
    },
    '& hr': {
      border: 'none',
      margin: '0 0 10px 0'
    },
    '& svg.button': {
      '&:hover': {
        cursor: 'pointer'
      }
    },
    '& button': {
      left: '80%'}
  },
  buttons: {
    textAlign: 'center',
    '& a': {
      margin: '20px 10px'
    }
  }
}