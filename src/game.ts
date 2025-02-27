import Ball from './ball';
import Paddle from './paddle';

export default class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;  // SPECIAL for Alex We using Canvas Lol
  private ball: Ball;
  private playerPaddle: Paddle;
  private aiPaddle: Paddle;
  private playerScore: number;
  private aiScore: number;
  private gameRunning: boolean;
  private keys: { [key: string]: boolean };
  
  constructor(canvasId: string) {
    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    
    this.canvas.width = 800;
    this.canvas.height = 500;
    
    const ballX = this.canvas.width / 2;
    const ballY = this.canvas.height / 2;
    
    this.ball = new Ball(ballX, ballY, 10, 5, 5);
    
    const paddleWidth = 10;
    const paddleHeight = 100;
    const paddleSpeed = 8;
    
    this.playerPaddle = new Paddle(
      10,
      this.canvas.height / 2 - paddleHeight / 2,
      paddleWidth,
      paddleHeight,
      paddleSpeed
    );
    
    this.aiPaddle = new Paddle(
      this.canvas.width - paddleWidth - 10,
      this.canvas.height / 2 - paddleHeight / 2,
      paddleWidth,
      paddleHeight,
      paddleSpeed
    );
    
    this.playerScore = 0;
    this.aiScore = 0;
    this.gameRunning = false;
    this.keys = {};
    
    this.setupEventListeners();
  }
  
  private setupEventListeners(): void {
    window.addEventListener('keydown', (e) => {
      this.keys[e.key] = true;
    });
    
    window.addEventListener('keyup', (e) => {
      this.keys[e.key] = false;
    });
    
    this.canvas.addEventListener('click', () => {
      if (!this.gameRunning) {
        this.gameRunning = true;
        this.gameLoop();
      }
    });
  }
  
  private update(): void {
    if (this.keys['w'] || this.keys['ArrowUp']) {
      this.playerPaddle.moveUp(this.canvas.height);
    }
    
    if (this.keys['s'] || this.keys['ArrowDown']) {
      this.playerPaddle.moveDown(this.canvas.height);
    }
    
    this.aiPaddle.autoMove(this.ball.getY(), this.canvas.height);
    this.ball.update(this.canvas.width, this.canvas.height);
    
    this.checkCollision();
    this.checkScore();
  }
  
  private checkCollision(): void {
    // Player paddle
    if (
      this.ball.getX() - this.ball.getRadius() <= this.playerPaddle.getX() + this.playerPaddle.getWidth() &&
      this.ball.getY() >= this.playerPaddle.getY() &&
      this.ball.getY() <= this.playerPaddle.getY() + this.playerPaddle.getHeight() &&
      this.ball.getSpeedX() < 0
    ) {
      this.ball.reverseX();
      this.ball.increaseSpeed();
    }
    
    // BOT paddle here TO DO
    if (
      this.ball.getX() + this.ball.getRadius() >= this.aiPaddle.getX() &&
      this.ball.getY() >= this.aiPaddle.getY() &&
      this.ball.getY() <= this.aiPaddle.getY() + this.aiPaddle.getHeight() &&
      this.ball.getSpeedX() > 0
    ) {
      this.ball.reverseX();
      this.ball.increaseSpeed();
    }
  }
  
  private checkScore(): void {
    if (this.ball.getX() + this.ball.getRadius() > this.canvas.width) {
      this.playerScore++;
      this.resetBall();
    }
    
    if (this.ball.getX() - this.ball.getRadius() < 0) {
      this.aiScore++;
      this.resetBall();
    }
  }
  
  private resetBall(): void {
    this.ball.reset(this.canvas.width / 2, this.canvas.height / 2);
  }
  
  private drawScore(): void {
    this.ctx.fillStyle = '#ffffff';
    this.ctx.font = '32px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(`${this.playerScore} - ${this.aiScore}`, this.canvas.width / 2, 50);
  }
  
  private drawInstructions(): void {
    this.ctx.fillStyle = '#ffffff';
    this.ctx.font = '24px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('Click to Start', this.canvas.width / 2, this.canvas.height / 2);
    this.ctx.font = '16px Arial';
    this.ctx.fillText('Use W/S or Arrow Up/Down to move', this.canvas.width / 2, this.canvas.height / 2 + 30);
  }
  
  private draw(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.playerPaddle.draw(this.ctx);
    this.aiPaddle.draw(this.ctx);
    this.ball.draw(this.ctx);
    this.drawScore();
    
    if (!this.gameRunning) {
      this.drawInstructions();
    }
  }
  
  private gameLoop(): void {
    if (!this.gameRunning) return;
    
    this.update();
    this.draw();
    
    requestAnimationFrame(() => this.gameLoop());
  }
  
  public start(): void {
    this.draw();
  }
}