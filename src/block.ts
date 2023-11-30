import { Actor, ActorArgs, CollisionType, Observable, RemovedComponent, Vector } from "excalibur";
import { MatterJsBodyComponent } from "./matterjs-body.component";
import { MatterJsConstraintComponent } from "./matterjs-constraint.component";

export class Block extends Actor {
    matterJs: MatterJsBodyComponent;
    constructor(config: ActorArgs) {
        super(config);

        this.matterJs = new MatterJsBodyComponent(
            this.width,
            this.height,
            config.collisionType === CollisionType.Fixed
        );
        this.addComponent(this.matterJs);
    }

    addStiffConstraint(pointA: Vector, pointB: Vector) {
        this.addComponent(new MatterJsConstraintComponent({
            pointA,
            pointB,
            bodyB: this.matterJs.matterJsBody
        }));
    }

    removeConstraints() {
        const component = this.get(MatterJsConstraintComponent)
        if (component) {
            this.removeComponent(component, true);
        }
    }
}