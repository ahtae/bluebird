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
};

export default theme;
