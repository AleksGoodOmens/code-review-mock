export default class Ball {
  private x: number;
  private y: number;
  private radius: number;
  private speedX: number;
  private speedY: number;
  private color: string;
  private glowAmount: number;

  constructor(x: number, y: number, radius: number, speedX: number, speedY: number, color: string = '#00ffff') {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speedX = speedX;
    this.speedY = speedY;
    this.color = color;
    this.glowAmount = 10;
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius + 5, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0, 255, 255, 0.3)';
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = this.glowAmount;
    ctx.fill();
    ctx.closePath();

    ctx.shadowBlur = 0;
  }

  public update(canvasWidth: number, canvasHeight: number): void {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.y + this.radius > canvasHeight || this.y - this.radius < 0) {
      this.speedY = -this.speedY;
      
      // HERE is a some random variation after wall bounce
      this.speedY += (Math.random() - 0.5) * 1;
    }
  }

  public reset(x: number, y: number): void {
    this.x = x;
    this.y = y;
    this.speedX = this.speedX > 0 ? -5 : 5;
    this.speedY = Math.random() * 10 - 5;

    this.glowAmount = 20;
    setTimeout(() => {
      this.glowAmount = 10;
    }, 300);
  }

  public reverseX(): void {
    this.speedX = -this.speedX;
  }

  public increaseSpeed(): void {
    this.speedX = this.speedX > 0 ? this.speedX + 0.5 : this.speedX - 0.5;
    this.speedY = this.speedY > 0 ? this.speedY + 0.5 : this.speedY - 0.5;

    const maxSpeed = 15;
    if (Math.abs(this.speedX) > maxSpeed) {
      this.speedX = this.speedX > 0 ? maxSpeed : -maxSpeed;
    }
    if (Math.abs(this.speedY) > maxSpeed) {
      this.speedY = this.speedY > 0 ? maxSpeed : -maxSpeed;
    }
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