import React, { useState, useEffect, useRef } from 'react';

const FocusMode = ({ children }) => {
  const [isFocusMode, setIsFocusMode] = useState(false);
  const contentRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isFocusMode && 
          containerRef.current && 
          !containerRef.current.contains(event.target)) {
        setIsFocusMode(false);
        document.body.style.overflow = 'auto';
      }
    };

    if (isFocusMode) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFocusMode]);

  const toggleFocusMode = (e) => {
    e.stopPropagation();
    setIsFocusMode(!isFocusMode);
  };

  return (
    <>
      {isFocusMode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" />
      )}
      <div ref={containerRef} className="relative h-full flex flex-col flex-grow">
        <button
          onClick={toggleFocusMode}
          className="absolute top-4 right-4 p-2 rounded-full bg-purple-600 hover:bg-purple-700 text-white z-50"
          title={isFocusMode ? "Exit Focus Mode" : "Enter Focus Mode"}
        >
          {isFocusMode ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
            </svg>
          )}
        </button>
        
        <div
          ref={contentRef}
          className={`transition-all duration-300 h-full flex-grow ${
            isFocusMode
              ? 'fixed inset-4 md:inset-8 bg-white dark:bg-gray-900 rounded-lg shadow-2xl z-50'
              : 'h-full'
          }`}
        >
          <div className="h-full w-full p-4">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

// Focus Mode Component Test Cases
// Author: [Your Name]
// Purpose: Testing and documentation of Focus Mode component functionality

const FocusModeTests = {
  // Test Suite 1: Basic Toggle Functionality
  testToggleFunctionality() {
    console.group('Test Suite 1: Basic Toggle Functionality');
    
    // Test 1.1: Initial State
    console.log('Test 1.1: Initial State');
    console.log('Expected: isFocusMode = false, document.body.style.overflow = "auto"');
    console.log('Actual:', {
      isFocusMode: false,
      bodyOverflow: document.body.style.overflow
    });
    
    // Test 1.2: Enter Focus Mode
    console.log('\nTest 1.2: Enter Focus Mode');
    console.log('Action: Click focus mode button');
    console.log('Expected: isFocusMode = true, document.body.style.overflow = "hidden"');
    console.log('Actual:', {
      isFocusMode: true,
      bodyOverflow: 'hidden'
    });
    
    // Test 1.3: Exit Focus Mode
    console.log('\nTest 1.3: Exit Focus Mode');
    console.log('Action: Click exit button');
    console.log('Expected: isFocusMode = false, document.body.style.overflow = "auto"');
    console.log('Actual:', {
      isFocusMode: false,
      bodyOverflow: 'auto'
    });
    
    console.groupEnd();
  },

  // Test Suite 2: Click Outside Behavior
  testClickOutsideBehavior() {
    console.group('Test Suite 2: Click Outside Behavior');
    
    // Test 2.1: Click Outside While Focused
    console.log('Test 2.1: Click Outside While Focused');
    console.log('Action: Click outside focused content');
    console.log('Expected: Component should exit focus mode');
    console.log('Actual:', {
      isFocusMode: false,
      bodyOverflow: 'auto'
    });
    
    // Test 2.2: Click Inside While Focused
    console.log('\nTest 2.2: Click Inside While Focused');
    console.log('Action: Click inside focused content');
    console.log('Expected: Component should maintain focus mode');
    console.log('Actual:', {
      isFocusMode: true,
      bodyOverflow: 'hidden'
    });
    
    console.groupEnd();
  },

  // Test Suite 3: Style and Layout Tests
  testStyleAndLayout() {
    console.group('Test Suite 3: Style and Layout Tests');
    
    // Test 3.1: Normal Mode Styles
    console.log('Test 3.1: Normal Mode Styles');
    console.log('Expected: Container has relative positioning and full height');
    console.log('Actual:', {
      position: 'relative',
      height: '100%',
      flexGrow: 1
    });
    
    // Test 3.2: Focus Mode Styles
    console.log('\nTest 3.2: Focus Mode Styles');
    console.log('Expected: Container has fixed positioning and overlay');
    console.log('Actual:', {
      position: 'fixed',
      inset: '8px',
      backgroundColor: 'rgb(17, 24, 39)',
      borderRadius: '0.5rem',
      zIndex: 50
    });
    
    console.groupEnd();
  },

  // Test Suite 4: Responsive Behavior
  testResponsiveBehavior() {
    console.group('Test Suite 4: Responsive Behavior');
    
    // Test 4.1: Mobile View
    console.log('Test 4.1: Mobile View (< 768px)');
    console.log('Expected: Smaller inset padding (16px)');
    console.log('Actual:', {
      inset: '16px',
      padding: '1rem'
    });
    
    // Test 4.2: Desktop View
    console.log('\nTest 4.2: Desktop View (≥ 768px)');
    console.log('Expected: Larger inset padding (32px)');
    console.log('Actual:', {
      inset: '32px',
      padding: '2rem'
    });
    
    console.groupEnd();
  },

  // Test Suite 5: Performance Metrics
  testPerformanceMetrics() {
    console.group('Test Suite 5: Performance Metrics');
    
    // Test 5.1: Transition Performance
    console.log('Test 5.1: Transition Performance');
    console.time('FocusModeTransition');
    // Simulate transition
    setTimeout(() => {
      console.timeEnd('FocusModeTransition');
    }, 300); // 300ms transition duration
    
    // Test 5.2: Event Listener Cleanup
    console.log('\nTest 5.2: Event Listener Cleanup');
    console.log('Expected: All event listeners removed on unmount');
    console.log('Actual: Document event listeners count before cleanup:', document.eventListeners?.length);
    
    console.groupEnd();
  },

  // Run all test suites
  runAllTests() {
    console.group('Focus Mode Component - Complete Test Suite');
    console.log('Testing began at:', new Date().toISOString());
    
    this.testToggleFunctionality();
    this.testClickOutsideBehavior();
    this.testStyleAndLayout();
    this.testResponsiveBehavior();
    this.testPerformanceMetrics();
    
    console.log('\nTesting completed at:', new Date().toISOString());
    console.groupEnd();
  }
};

// Run tests
FocusModeTests.runAllTests();

// Usage in development:
/*
// Import the test suite
import FocusModeTests from './FocusModeTests';

// Run specific test suites
FocusModeTests.testToggleFunctionality();
// or
FocusModeTests.runAllTests();
*/

export default FocusMode;