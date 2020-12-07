const theme = {
  palette: {
    primary: {
      light: '#bbdefb',
      main: '#3e3e3e',
      dark: '#757575',
      contrastText: '#fff',
    },
    secondary: {
      main: '#B71C1C',
      dark: '#D32F2F',
      contrastText: '#fff',
    },
  },
  loading: {
    container: {
      marginTop: '200px',
      textAlign: 'center',
    },
  },
  typography: {
    useNextVariants: true,
  },
  form: {
    logo: {
      width: '100px',
      margin: '20px auto 20px auto',
    },
    form: {
      textAlign: 'center',
    },
    pageTitle: {
      margin: '10px auto 10px auto',
      textAlign: 'center',
    },
    textField: {
      margin: '10px auto 10px auto',
    },
    button: {
      margin: 20,
      position: 'relative',
    },
    customError: {
      color: 'red',
      fontSize: '0.8rem',
      marginTop: 10,
    },
    progress: {
      position: 'absolute',
    },
    card: {
      marginTop: 30,
      marginBottom: 20,
      padding: 10,
    },
  },
  navbar: {
    logo: {
      width: '40px',
      marginRight: 10,
    },
    button: {
      margin: 10,
      fontSize: 15,
    },
  },
  home: {
    title: {
      textShadow: '2px 2px black',
      paddingTop: '200px',
      color: 'white',
      textAlign: 'center',
    },
    container: {
      height: '100vh',
      backgroundSize: 'cover',
      backgroundImage:
        'url("https://images.unsplash.com/photo-1505147704403-c2caf85db293?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1648&q=80")',
    },
  },
  notFound: {
    pageTitle: {
      margin: '10px auto 10px auto',
      textAlign: 'center',
    },
    icon: {
      fontSize: '300px',
    },
  },
  profile: {
    paper: {
      padding: 20,
      marginTop: 30,
    },
    profile: {
      '& .image-wrapper': {
        textAlign: 'center',
        position: 'relative',
        '& button': {
          position: 'absolute',
          top: '80%',
          left: '70%',
        },
      },
      '& .profile-image': {
        width: 200,
        height: 200,
        objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '50%',
      },
      '& .profile-details': {
        textAlign: 'center',
        '& span, svg': {
          verticalAlign: 'middle',
        },
        '& a': {
          color: '#3e3e3e',
        },
      },
      '& hr': {
        border: 'none',
        margin: '0 0 10px 0',
      },
      '& svg.button': {
        '&:hover': {
          cursor: 'pointer',
        },
      },
    },
    buttons: {
      textAlign: 'center',
      '& a': {
        margin: '20px 10px',
      },
    },
  },
  post: {
    card: {
      position: 'relative',
      display: 'flex',
      marginBottom: 20,
      padding: 10,
    },
    image: {
      minWidth: 200,
    },
    content: {
      padding: 25,
      objectFit: 'cover',
    },
  },
  notifications: {
    heading: { fontSize: '20px', textAlign: 'center', padding: '20px' },
    filterSelection: { paddingTop: '20px', paddingBottom: '20px' },
    container: {
      margin: '80px auto 0 auto',
      maxWidth: '1200px',
      width: '70%',
    },
  },
  notification: {
    icon: { marginRight: 10 },
    container: {
      display: 'flex',
      flexWrap: 'nowrap',
      justifyContent: 'flex-start',
      alignItems: 'space-between',
      padding: '20px',
    },
    message: {
      display: 'flex',
      flexWrap: 'nowrap',
      justifyContent: 'baseline',
      alignItems: 'center',
      width: '65%',
      paddingRight: '20px',
    },
    isRead: { paddingLeft: '165px' },
    isNotRead: { paddingLeft: '70px' },
  },
  followersList: {
    paper: {
      padding: 20,
      marginTop: 30,
    },
    title: {
      textDecoration: 'underline',
    },
  },
  followers: {
    body: { paddingTop: 10 },
    followersContainer: { display: 'flex', flexWrap: 'wrap' },
  },
  follower: {
    image: {
      width: 80,
      height: 80,
    },
  },
  comment: {
    card: {
      position: 'relative',
      display: 'flex',
      marginBottom: 20,
      padding: 10,
    },
    image: {
      minWidth: 200,
    },
    content: {
      padding: 25,
      objectFit: 'cover',
    },
  },
};

export default theme;
