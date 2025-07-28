
import './App.css'
import { AppShell } from '@mantine/core'
import { HeaderSimple } from './components/HeaderSimple'
import RateLimitedUI from './components/RateLimitedPage/RateLimitedUI';
import { useState, useEffect } from 'react';

function App() {
  const [isRateLimited, setIsRateLimited] = useState(true);
  
  useEffect(() => {
    // setIsRateLimited(true); // Uncomment to test
  }, []);

  if (isRateLimited) {
    return <RateLimitedUI />;
  }


  return (
    <AppShell>
      <AppShell.Header>
        <HeaderSimple />
      </AppShell.Header>
    </AppShell>
  )
}

export default App
