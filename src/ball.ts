export default class Ball {
  private x: number;
  private y: number;
  private radius: number;
  private speedX: number;
  private speedY: number;
  private color: string;

  constructor(x: number, y: number, radius: number, speedX: number, speedY: number) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speedX = speedX;
    this.speedY = speedY;
    this.color = '#ffffff';
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  public update(canvasWidth: number, canvasHeight: number): void {
    this.x += this.speedX;
    this.y += this.speedY;
    
    if (this.y + this.radius > canvasHeight || this.y - this.radius < 0) {
      this.speedY = -this.speedY;
    }
  }

  public reset(x: number, y: number): void {
    this.x = x;
    this.y = y;
    this.speedX = this.speedX > 0 ? -5 : 5;
    this.speedY = Math.random() * 10 - 5;
  }

  public reverseX(): void {
    this.speedX = -this.speedX;
  }

  public increaseSpeed(): void {
    this.speedX = this.speedX > 0 ? this.speedX + 0.5 : this.speedX - 0.5;
    this.speedY = this.speedY > 0 ? this.speedY + 0.5 : this.speedY - 0.5;
  }

  public getX(): number {
    return this.x;
  }

  public getY(): number {
    return this.y;
  }

  public getRadius(): number {
    return this.radius;
  }

  public getSpeedX(): number {
    return this.speedX;
  }
}
