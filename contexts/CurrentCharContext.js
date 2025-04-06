"use client"; // This is a client-side only module

import { createContext, useReducer, useContext } from 'react';

export const CurrentCharContext = createContext(null);
export const CurrentCharDispatchContext = createContext(null);

export function CurrentCharProvider({ children }) {
    const [currentChar, dispatch] = useReducer(
        currentCharReducer,
        initialCurrentChar
    );

    return (
        <CurrentCharContext.Provider value={currentChar}>
            <CurrentCharDispatchContext.Provider value={dispatch}>
                {children}
            </CurrentCharDispatchContext.Provider>
        </CurrentCharContext.Provider>
    );
}

function currentCharReducer(currentChar, action) {
  switch (action.type) {
    // dispatch({ type: 'update', name: 'charName', value: 'New Name' });
    case 'update': {
        return {
            ...currentChar,
            [action.name]: action.value,
        };
    }
    case 'updateSkill': {
        return {
            ...currentChar,
            "skillLevels": {
                ...currentChar.skillLevels,
                [action.name]: action.value
            },
        };
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

//TODO: Add other initial values
const initialCurrentChar = {
    charName: "",
    coreSkillLevel: 6,
    mindscapeLevel: 0,
    skillLevels: {
        basicAttackLevel: 12,
        dodgeLevel: 12,
        assistLevel: 12,
        specialAttackLevel: 12,
        chainAttackLevel: 12
    },
};

export function useCurrentChar() {
    return useContext(CurrentCharContext);
}

export function useCurrentCharDispatch() {
    return useContext(CurrentCharDispatchContext);
}
  
