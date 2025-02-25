import { useState, useEffect } from 'react';

/**
 * Hook used for retrieving characters from the api
 * @returns {Array} An array of characters
 */
export function useChars() {
  const [chars, setChars] = useState([]);

  // Fetch characters on mount
  useEffect(() => {
    async function getChars() {
      try {
        console.log("Fetching characters...");
        const res = await fetch('http://localhost:3000/api/char');
        if(!res.ok) {
            throw new Error("Failed to fetch characters");
        }

        const resJSON = await res.json();
        setChars(resJSON.chars);
      } catch (error) {
          console.log("Error retrieving characters.", error);
          setChars([]);
      }
    }
    
    getChars();
    // Cleanup
    return () => {
      setChars([]);
    };
  }, []);

  return chars;
}