export default class Paddle {
    private x: number;
    private y: number;
    private width: number;
    private height: number;
    private speed: number;
    private color: string;
  
    constructor(x: number, y: number, width: number, height: number, speed: number) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.speed = speed;
      this.color = '#ffffff';
    }
  
    draw(ctx: CanvasRenderingContext2D): void {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  
    moveUp(canvasHeight: number): void {
      this.y = Math.max(0, this.y - this.speed);
    }
  
    moveDown(canvasHeight: number): void {
      this.y = Math.min(canvasHeight - this.height, this.y + this.speed);
    }
  
    getX(): number {
      return this.x;
    }
  
    getY(): number {
      return this.y;
    }
  
    getWidth(): number {
      return this.width;
    }
  
    getHeight(): number {
      return this.height;
    }
  
    autoMove(ballY: number, canvasHeight: number): void {
      const paddleCenter = this.y + this.height / 2;
      
      if (paddleCenter < ballY - 35) {
        this.moveDown(canvasHeight);
      } else if (paddleCenter > ballY + 35) {
        this.moveUp(canvasHeight);
      }
    }
  }