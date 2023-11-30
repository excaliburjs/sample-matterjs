import { Component, Entity, Observable } from "excalibur";
import * as Matter from 'matter-js';


export class MatterJsConstraintComponent extends Component<'matterjs.constraint'> {
    public readonly type = 'matterjs.constraint' as const;
    constraint: Matter.Constraint;
    removed$ = new Observable<MatterJsConstraintComponent>();

    constructor(public constraintDef: Matter.IConstraintDefinition) {
        super();
        this.constraint = Matter.Constraint.create(constraintDef)
    }

    onRemove(previousOwner: Entity): void {
        this.removed$.notifyAll(this);
    }

}