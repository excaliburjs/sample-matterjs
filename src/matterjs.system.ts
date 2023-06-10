import { AddedEntity, Entity, Physics, RemovedEntity, System, SystemType, TransformComponent, isAddedSystemEntity } from "excalibur";
import { MatterJsBodyComponent } from "./matterjs-body.component";

import * as Matter from 'matter-js';
import { MatterJsConstraintComponent } from "./matterjs-constraint.component";


export class MatterJsSystem extends System<MatterJsBodyComponent | TransformComponent> {
    public readonly types = ['matterjs.component', 'ex.transform'] as const;
    public systemType = SystemType.Update;
    matterEngine: Matter.Engine = Matter.Engine.create();
    priority = 99;

    initialize() {
        Physics.enabled = false;
        this.matterEngine.gravity.y = 1;
    }

    override notify(msg: AddedEntity | RemovedEntity) {
        // Add bodies to the matter world
        if (isAddedSystemEntity(msg)) {
            const matterJsComponent = msg.data.get(MatterJsBodyComponent);
            
            if (matterJsComponent) {
                Matter.Composite.add(this.matterEngine.world, matterJsComponent.matterJsBody);
            }

            // Optional component
            const matterJsConstraint = msg.data.get(MatterJsConstraintComponent);
            if (matterJsConstraint) {
                Matter.Composite.add(this.matterEngine.world, matterJsConstraint.constraint);
            }
        }
    }

    override update(entities: Entity[], delta: number) {
        // Update matter js simulation
        Matter.Engine.update(this.matterEngine, delta);
        // Sync transforms from matter to excalibur
        for (let entity of entities) {
            const transform = entity.get(TransformComponent);
            const matterJsComponent = entity.get(MatterJsBodyComponent);
            if (matterJsComponent && transform) {
                transform.pos.x =  matterJsComponent.matterJsBody.position.x;
                transform.pos.y =  matterJsComponent.matterJsBody.position.y;
                transform.rotation = matterJsComponent.matterJsBody.angle;
            }
        }
    }
}