import './App.css';
import {Container, Typography} from '@mui/material';
import LinkShortener from './components/LinkShortener';

const App = () => {
  return (
    <Container maxWidth="sm" style={{marginTop: '2rem'}}>
      <Typography variant="h4" component="h1" gutterBottom>
        URL Shortener
      </Typography>
      <LinkShortener/>
    </Container>
  );
};

export default App;
