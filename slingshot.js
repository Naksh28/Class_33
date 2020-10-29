class Slingshot {
    constructor(bodyA, pointB){
        var options = {
            bodyA:bodyA,
            pointB:pointB,
            stiffness: 0.3,
            length: 20
        }

        this.sling1 = loadImage("sprites/sling1.png");
        this.sling2 = loadImage("sprites/sling2.png");
        this.sling3 = loadImage("sprites/sling3.png");

        this.sling = Matter.Constraint.create(options);
        this.pointB = pointB;
        World.add(world, this.sling);
    }

    display(){
        image(this.sling1, 200, 200);
        image(this.sling2, 170, 200);
        if (this.sling.bodyA){
        var pa = this.sling.bodyA.position;
        var pb = this.pointB;
        push();
        strokeWeight(7);
        stroke(48, 22, 8);
        if (pa.x<220){
            line(pa.x-20, pa.y, pb.x-10, pb.y);
            line(pa.x-20, pa.y, pb.x+30, pb.y);
            image(this.sling3, pa.x-30, pa.y-10, 15, 20);
            }
        else{
            strokeWeight(5);
            line(pa.x+20, pa.y, pb.x-10, pb.y);
            line(pa.x+20, pa.y, pb.x+30, pb.y);
            image(this.sling3, pa.x+25, pa.y-10, 15, 20);
            }
            pop();
        }
    }
    
    fly(){
        this.sling.bodyA = null;
    }

    attach(body){
        this.sling.bodyA = body;
    }
}