import React from 'react'

interface UserContext {
  currentUser: null | string;
  userLocation: null | {} 
}

export const userContext = React.createContext({
  currentUser: null,
  userLocation: null
})

