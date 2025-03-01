import './styles.css';
import Game from './game';

window.onload = () => {
  const game = new Game('gameCanvas');
  game.start();
};