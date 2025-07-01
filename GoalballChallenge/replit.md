# Enhanced Goalball - Paralympic Sport Simulation

## Overview

This is a browser-based 2D Goalball mini-game that simulates the Paralympic sport using HTML5 Canvas, CSS, and vanilla JavaScript. The game features a 3v3 match between the user (bottom team) and a bot (top team), with the objective of being the first to score 5 points. The enhanced version now includes realistic ball physics with curved trajectories, trail effects, and bouncing animations, improved blocking mechanics with reaction zones and visual effects, an official court layout with proper zones, and dynamic audio feedback including directional sounds, goal celebrations, and block effects.

## System Architecture

### Frontend Architecture
- **Single Page Application (SPA)**: Built with vanilla HTML, CSS, and JavaScript
- **Canvas-based Rendering**: Uses HTML5 Canvas API for 2D game graphics
- **Event-driven Architecture**: Game state management through event listeners and state machines
- **Component-based UI**: Modular UI components for scoreboard, controls, and game overlay

### Rendering Engine
- **Canvas 2D Context**: Direct manipulation of canvas for real-time graphics
- **Animation System**: Custom animation loop using requestAnimationFrame
- **State Machine**: Game states include menu, countdown, serve phases, defense phases, and game over

## Key Components

### Game Engine (`game.js`)
- **GoalballGame Class**: Main game controller managing all game logic
- **State Management**: Handles transitions between different game phases
- **Player Management**: Manages 3 players per team with positioning and selection
- **Ball Physics**: Simulates ball movement and collision detection
- **Audio System**: Spatial audio implementation for immersive gameplay
- **Animation Controller**: Manages smooth transitions and ball movement animations

### User Interface (`index.html`)
- **Game Canvas**: 600x900 pixel canvas for the game field
- **HUD System**: Scoreboard and game message display
- **Control Panel**: Buttons for game control and player selection
- **Overlay System**: Countdown display and game state indicators

### Styling (`style.css`)
- **Responsive Design**: Centered layout with gradient background
- **Game Court Styling**: Visual representation of Goalball court
- **UI Components**: Styled buttons, scoreboard, and control elements
- **Visual Feedback**: Hover effects and active states for interactive elements

## Data Flow

1. **Game Initialization**: Set up canvas, players, and initial game state
2. **User Input**: Capture player selections and game actions
3. **Game Logic Processing**: Update game state based on user input and AI decisions
4. **Rendering**: Draw updated game state to canvas
5. **Audio Feedback**: Play spatial audio cues based on game events
6. **State Transitions**: Move between game phases (serve, defense, scoring)

### Game States Flow
```
Menu → Countdown → User Serve → Bot Defense → Ball Animation → Scoring Check
   ↓                                                                    ↓
Game Over ← Bot Serve ← User Defense ← Ball Animation ← Scoring Check ←
```

## External Dependencies

### Audio System
- **Web Audio API**: For spatial sound effects and immersive audio experience
- **Sound Assets**: Bell sounds for left, center, and right spatial audio cues
  - `bell-left.wav`
  - `bell-center.wav`
  - `bell-right.wav`

### Browser APIs
- **Canvas API**: For 2D graphics rendering
- **DOM Events**: For user interaction handling
- **RequestAnimationFrame**: For smooth animations

## Deployment Strategy

### Static Hosting
- **Client-side Only**: No server-side dependencies
- **Static File Serving**: Can be deployed on any static hosting platform
- **Asset Management**: Sound files served alongside HTML/CSS/JS

### Browser Compatibility
- **Modern Browsers**: Requires HTML5 Canvas and Web Audio API support
- **Progressive Enhancement**: Graceful degradation for audio features
- **Responsive Design**: Works on desktop and tablet devices

## Changelog

```
Changelog:
- July 01, 2025. Initial setup
- July 01, 2025. Enhanced realism with improved ball physics, blocking mechanics, court layout, and audio effects
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```

## Technical Implementation Notes

### Game Mechanics
- **Turn-based Gameplay**: Alternating serve and defense phases
- **Player Selection**: Click-based player selection for serves and defense
- **AI Opponent**: Bot with randomized but strategic decision making
- **Scoring System**: First to 5 points wins the match

### Performance Considerations
- **Canvas Optimization**: Efficient rendering with minimal redraws
- **Memory Management**: Proper cleanup of audio resources and event listeners
- **Animation Smoothing**: Consistent frame rates for ball movement

### Accessibility Features
- **Audio Cues**: Spatial audio for enhanced gameplay experience
- **Visual Feedback**: Clear visual indicators for game states
- **Keyboard Support**: Potential for keyboard navigation (future enhancement)