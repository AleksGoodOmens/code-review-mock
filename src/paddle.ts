export default class Paddle {
  private x: number;
  private y: number;
  private width: number;
  private height: number;
  private speed: number;
  private color: string;
  private isMoving: boolean;

  constructor(x: number, y: number, width: number, height: number, speed: number, color: string = '#ff00ff') {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.color = color;
    this.isMoving = false;
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = 'rgba(255, 0, 255, 0.3)';
    ctx.fillRect(this.x - 3, this.y - 3, this.width + 6, this.height + 6);

    ctx.fillStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = this.isMoving ? 15 : 10;
    ctx.fillRect(this.x, this.y, this.width, this.height);

    ctx.shadowBlur = 0;

    const segments = 5;
    const segmentHeight = this.height / segments;
    
    for (let i = 1; i < segments; i++) {
      ctx.beginPath();
      ctx.moveTo(this.x, this.y + i * segmentHeight);
      ctx.lineTo(this.x + this.width, this.y + i * segmentHeight);
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.stroke();
    }

    this.isMoving = false;
  }

  public moveUp(canvasHeight: number): void {
    this.y = Math.max(0, this.y - this.speed);
    this.isMoving = true;
  }

  public moveDown(canvasHeight: number): void {
    this.y = Math.min(canvasHeight - this.height, this.y + this.speed);
    this.isMoving = true;
  }

  public getX(): number {
    return this.x;
  }

  public getY(): number {
    return this.y;
  }

  public getWidth(): number {
    return this.width;
  }

  public getHeight(): number {
    return this.height;
  }

  public autoMove(ballY: number, canvasHeight: number): void {
    const paddleCenter = this.y + this.height / 2;
    
    // HERE is a delay to make AI DUMMYes
    if (Math.random() > 0.2) {
      if (paddleCenter < ballY - 30) {
        this.moveDown(canvasHeight);
      } else if (paddleCenter > ballY + 30) {
        this.moveUp(canvasHeight);
      }
    }
    
    this.isMoving = true;
  }
}