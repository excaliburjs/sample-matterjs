import { Actor, Component, Entity, TransformComponent, Vector } from "excalibur";

import * as Matter from 'matter-js';


export class MatterJsBodyComponent extends Component {
    public readonly type = 'matterjs.component' as const;
    matterJsBody!: Matter.Body;

    constructor(public width: number, public height: number, public isStatic = false) {
        super();
    }

    onAdd(owner: Entity) {
        const transform = owner.get(TransformComponent);
        if (transform) {
            this.matterJsBody = Matter.Bodies.rectangle(
                transform.pos.x,
                transform.pos.y,
                this.width,
                this.height, { isStatic: this.isStatic});
        }
    }

}