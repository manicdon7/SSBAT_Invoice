import React, { useState, useEffect, useRef } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, User } from "firebase/auth";
import { app } from './FirebaseAuth';

const Header = () => {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const auth = getAuth(app);
  const dropdownRef = useRef(null);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error occurred during sign-in:", error.message);
      }
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error occurred during sign-out:", error.message);
      }
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user); // Set user state if user is authenticated
      } else {
        setUser(null); // Reset user state if no user is authenticated
      }
    });

    return () => unsubscribe(); // Cleanup function to unsubscribe from auth state changes
  }, [auth]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false); // Close dropdown if clicked outside
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-[#032d60] text-white">
      <div className="flex justify-between items-center px-10 py-4">
        <h1 className="text-4xl font-bold">FireBase</h1>
        <div className="relative">
          {user ? (
            <div ref={dropdownRef}>
              <button
                onClick={toggleMenu}
                className="flex items-center bg-[#ce4d2f] py-2 px-4 font-semibold rounded-xl focus:outline-none"
              >
                <img
                  src={user.photoURL || "/default-avatar.png"}
                  alt="User Avatar"
                  className="h-8 w-8 rounded-full"
                />
                <span className="ml-2">{user.displayName}</span>
              </button>
              {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-10">
                  <button
                    onClick={handleSignOut}
                    className="block px-4 py-2 text-sm text-black hover:bg-gray-100 w-full text-left"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              className="bg-[#ce4d2f] py-2 px-4 font-semibold rounded-xl text-white focus:outline-none"
              onClick={signInWithGoogle}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </header>

  );
};

export default Header;
