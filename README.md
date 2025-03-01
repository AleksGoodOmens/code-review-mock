# 🏓 Super Cool Ping Pong Game!

Yo! What's up, fellow devs? Check out this awesome browser-based ping pong game built with TypeScript and bundled with Webpack! It's got all the cool features you'd expect from a classic arcade game.

## 🔥 Game Features

- **Slick Controls** - Use W/S or Arrow keys to control your paddle
- **Smart AI Opponent** - The computer player will give you a run for your money!
- **Score Tracking** - Keep tabs on who's winning
- **Speed Increase** - Ball gets faster with each hit for extra challenge
- **Responsive Design** - Looks great on different screen sizes

## 🛠️ Tech Stack Breakdown

This project is a perfect example of modern web game development:

### Core Technologies
- **TypeScript** - Type-safe coding that catches bugs before they happen
- **Canvas API** - For smooth 2D rendering without any heavy frameworks
- **Webpack** - Bundles everything together for optimized performance

### Game Architecture
The game is built using object-oriented programming with three main classes:

1. **Game Class** - The brain of the operation
   - Manages game state and scoring
   - Handles user input
   - Controls the game loop with requestAnimationFrame
   - Detects collisions between ball and paddles

2. **Ball Class** - The star of the show
   - Controls movement vector and speed
   - Handles bouncing off paddles and walls
   - Increases speed as rally continues

3. **Paddle Class** - Your in-game avatar
   - Player-controlled movement
   - AI-controlled opponent
   - Collision detection

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/yourusername/ping-pong.git

# Install dependencies
npm install

# Start the dev server
npm start

# Build for production
npm run build
```

## 🎮 How to Play

1. Click on the game canvas to start
2. Use W/S or Arrow Up/Down to move your paddle
3. Try to get the ball past the AI paddle
4. First to 10 points wins!

## 📦 Dependencies

- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- [Webpack](https://webpack.js.org/) - Module bundler
- [webpack-dev-server](https://github.com/webpack/webpack-dev-server) - Development server
- [ts-loader](https://github.com/TypeStrong/ts-loader) - TypeScript loader for webpack
- [css-loader](https://github.com/webpack-contrib/css-loader) - CSS loader for webpack
- [style-loader](https://github.com/webpack-contrib/style-loader) - Style loader for webpack
- [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin) - HTML generator for webpack

---

Made with ❤️ and lots of caffeine