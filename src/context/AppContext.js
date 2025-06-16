"use client"

import { createContext, useContext, useReducer, useEffect } from "react";

// Initial state
const initialState = {
  user: null,
  sidebarCollapsed: false,
  darkMode: false,
  notifications: [],
  unreadNotifications: 0,
  loading: false,
  error: null,
}

// Action types
const actionTypes = {
  SET_USER: "SET_USER",
  TOGGLE_SIDEBAR: "TOGGLE_SIDEBAR",
  TOGGLE_DARK_MODE: "TOGGLE_DARK_MODE",
  SET_NOTIFICATIONS: "SET_NOTIFICATIONS",
  ADD_NOTIFICATION: "ADD_NOTIFICATION",
  MARK_NOTIFICATION_READ: "MARK_NOTIFICATION_READ",
  SET_LOADING: "SET_LOADING",
  SET_ERROR: "SET_ERROR",
  CLEAR_ERROR: "CLEAR_ERROR",
}

// Reducer function
const appReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.payload,
      }
    case actionTypes.TOGGLE_SIDEBAR:
      return {
        ...state,
        sidebarCollapsed: !state.sidebarCollapsed,
      }
    case actionTypes.TOGGLE_DARK_MODE:
      return {
        ...state,
        darkMode: !state.darkMode,
      }
    case actionTypes.SET_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload,
        unreadNotifications: action.payload.filter((n) => !n.read).length,
      }
    case actionTypes.ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [action.payload, ...state.notifications],
        unreadNotifications: state.unreadNotifications + 1,
      }
    case actionTypes.MARK_NOTIFICATION_READ:
      return {
        ...state,
        notifications: state.notifications.map((n) => (n.id === action.payload ? { ...n, read: true } : n)),
        unreadNotifications: Math.max(0, state.unreadNotifications - 1),
      }
    case actionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      }
    case actionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case actionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      }
    default:
      return state
  }
}

// Create context
const AppContext = createContext()

// Context provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState)

  // Load saved preferences from localStorage
  useEffect(() => {
    const savedPreferences = localStorage.getItem("appPreferences")
    if (savedPreferences) {
      try {
        const preferences = JSON.parse(savedPreferences)
        if (preferences.darkMode !== undefined) {
          dispatch({ type: actionTypes.TOGGLE_DARK_MODE })
        }
        if (preferences.sidebarCollapsed !== undefined) {
          dispatch({ type: actionTypes.TOGGLE_SIDEBAR })
        }
      } catch (error) {
        console.error("Error loading preferences:", error)
      }
    }
  }, [])

  // Save preferences to localStorage when they change
  useEffect(() => {
    const preferences = {
      darkMode: state.darkMode,
      sidebarCollapsed: state.sidebarCollapsed,
    }
    localStorage.setItem("appPreferences", JSON.stringify(preferences))
  }, [state.darkMode, state.sidebarCollapsed])

  // Login function
const login = async (email, password, rememberMe = false) => {
  try {
    dispatch({ type: actionTypes.SET_LOADING, payload: true });

    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }

    const data = await response.json();

    const userData = data.user;
    const token = data.token;

    localStorage.setItem("authToken", token);
    localStorage.setItem("user", JSON.stringify(userData));
    if (rememberMe) {
      localStorage.setItem("rememberMe", "true");
    }

    dispatch({ type: actionTypes.SET_USER, payload: userData });
    dispatch({ type: actionTypes.SET_LOADING, payload: false });

    return true;
  } catch (error) {
    dispatch({ type: actionTypes.SET_ERROR, payload: error.message });
    throw error;
  }
};




  // Logout function
  const logout = () => {
    localStorage.removeItem("authToken")
    localStorage.removeItem("user")
    localStorage.removeItem("rememberMe")
    dispatch({ type: actionTypes.SET_USER, payload: null })
  }

  // Action creators
  const actions = {
    setUser: (user) => dispatch({ type: actionTypes.SET_USER, payload: user }),
    toggleSidebar: () => dispatch({ type: actionTypes.TOGGLE_SIDEBAR }),
    toggleDarkMode: () => dispatch({ type: actionTypes.TOGGLE_DARK_MODE }),
    setNotifications: (notifications) => dispatch({ type: actionTypes.SET_NOTIFICATIONS, payload: notifications }),
    addNotification: (notification) => dispatch({ type: actionTypes.ADD_NOTIFICATION, payload: notification }),
    markNotificationRead: (id) => dispatch({ type: actionTypes.MARK_NOTIFICATION_READ, payload: id }),
    setLoading: (loading) => dispatch({ type: actionTypes.SET_LOADING, payload: loading }),
    setError: (error) => dispatch({ type: actionTypes.SET_ERROR, payload: error }),
    clearError: () => dispatch({ type: actionTypes.CLEAR_ERROR }),
    login,
    logout,
  }

  const value = {
    state,
    actions,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

// Custom hook to use the app context
export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
}

export default AppContext
