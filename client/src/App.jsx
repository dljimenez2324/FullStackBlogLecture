import { useState, useEffect } from 'react'
import { Container, Button } from 'react-bootstrap'

const App = () => {

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    
    const currentTheme = localStorage.getItem('theme');
    if(currentTheme)
    {
      setIsDarkMode(currentTheme === 'dark')
    }
    
  }, [])

  useEffect(() => {
    
    document.body.className = isDarkMode ? 'bg-dark text-white' : 'bg-light text-dark';
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');

  }, [isDarkMode])
  
  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  }

  return (
    <>
        <Container fluid 
        className= {`d-flex flex-column justify-content-center align-items-center ${
            isDarkMode ? 'bg-dark text-light' : 'bg-light'
        }`}
        style={{ minHeight: "100vh" }}
        >
          <h1 className="text-center mb-5">Hello Blog</h1>
          <h1>{isDarkMode ? "Dark Theme" : "Light Theme"}</h1>

          {
            isDarkMode ? (
              <Button variant="outline-primary" onClick={toggleDarkMode}>Dark Theme</Button>
            ) : (
              <Button variant="outline-dark" onClick={toggleDarkMode}>Light Theme</Button>
            )
          }
        </Container>
    </>
  )
}

export default App
