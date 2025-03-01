import Ball from './ball';
import Paddle from './paddle';

export default class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private ball: Ball;
  private playerPaddle: Paddle;
  private aiPaddle: Paddle;
  private playerScore: number;
  private aiScore: number;
  private gameRunning: boolean;
  private keys: { [key: string]: boolean };
  private paddleColor: string;
  private ballColor: string;
  private textColor: string;
  
  constructor(canvasId: string) {
    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    
    this.canvas.width = 800;
    this.canvas.height = 500;

    const computedStyle = getComputedStyle(document.documentElement);
    this.paddleColor = computedStyle.getPropertyValue('--color-paddle').trim();
    this.ballColor = computedStyle.getPropertyValue('--color-ball').trim();
    this.textColor = computedStyle.getPropertyValue('--color-text').trim();
    
    const ballX = this.canvas.width / 2;
    const ballY = this.canvas.height / 2;
    
    this.ball = new Ball(ballX, ballY, 10, 5, 5, this.ballColor);
    
    const paddleWidth = 12;
    const paddleHeight = 100;
    const paddleSpeed = 8;
    
    this.playerPaddle = new Paddle(
      10,
      this.canvas.height / 2 - paddleHeight / 2,
      paddleWidth,
      paddleHeight,
      paddleSpeed,
      this.paddleColor
    );
    
    this.aiPaddle = new Paddle(
      this.canvas.width - paddleWidth - 10,
      this.canvas.height / 2 - paddleHeight / 2,
      paddleWidth,
      paddleHeight,
      paddleSpeed,
      this.paddleColor
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
    if (
      this.ball.getX() - this.ball.getRadius() <= this.playerPaddle.getX() + this.playerPaddle.getWidth() &&
      this.ball.getY() >= this.playerPaddle.getY() &&
      this.ball.getY() <= this.playerPaddle.getY() + this.playerPaddle.getHeight() &&
      this.ball.getSpeedX() < 0
    ) {
      this.ball.reverseX();
      this.ball.increaseSpeed();
      this.createCollisionEffect(this.ball.getX(), this.ball.getY());
    }

    if (
      this.ball.getX() + this.ball.getRadius() >= this.aiPaddle.getX() &&
      this.ball.getY() >= this.aiPaddle.getY() &&
      this.ball.getY() <= this.aiPaddle.getY() + this.aiPaddle.getHeight() &&
      this.ball.getSpeedX() > 0
    ) {
      this.ball.reverseX();
      this.ball.increaseSpeed();
      this.createCollisionEffect(this.ball.getX(), this.ball.getY());
    }
  }
  
  private createCollisionEffect(x: number, y: number): void {
    this.ctx.beginPath();
    this.ctx.arc(x, y, 30, 0, Math.PI * 2);
    this.ctx.fillStyle = 'rgba(255, 0, 255, 0.2)';
    this.ctx.fill();
    this.ctx.closePath();
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
    this.ctx.fillStyle = this.textColor;
    this.ctx.font = '32px Orbitron, monospace';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(`${this.playerScore} - ${this.aiScore}`, this.canvas.width / 2, 50);

    this.ctx.shadowColor = this.paddleColor;
    this.ctx.shadowBlur = 10;
    this.ctx.fillText(`${this.playerScore} - ${this.aiScore}`, this.canvas.width / 2, 50);
    this.ctx.shadowBlur = 0;
  }
  
  private drawCenterLine(): void {
    this.ctx.setLineDash([10, 15]);
    this.ctx.beginPath();
    this.ctx.moveTo(this.canvas.width / 2, 0);
    this.ctx.lineTo(this.canvas.width / 2, this.canvas.height);
    this.ctx.strokeStyle = 'rgba(255, 0, 255, 0.3)';
    this.ctx.lineWidth = 2;
    this.ctx.stroke();
    this.ctx.setLineDash([]);
  }
  
  private drawInstructions(): void {
    this.ctx.fillStyle = this.textColor;
    this.ctx.font = '24px Orbitron, monospace';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('CLICK TO START', this.canvas.width / 2, this.canvas.height / 2);
    
    this.ctx.shadowColor = this.ballColor;
    this.ctx.shadowBlur = 10;
    this.ctx.fillText('CLICK TO START', this.canvas.width / 2, this.canvas.height / 2);
    this.ctx.shadowBlur = 0;
  }
  
  private draw(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.drawCenterLine();
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