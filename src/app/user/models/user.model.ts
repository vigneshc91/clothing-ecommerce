import { prop, getModelForClass } from '@typegoose/typegoose';

export enum Status {
    DRAFT = 0,
    ACTIVE = 1,
    DELETED = 2,
}

export enum Type {
    ADMIN = 1,
    USER = 2,
}

export class User {
    @prop()
    public firstName!: string;

    @prop()
    public lastName!: string;

    @prop()
    public email!: string;

    @prop({ select: false })
    public password!: string;

    @prop({ enum: Type })
    public type!: Type;

    @prop({ enum: Status, default: Status.DRAFT })
    public status!: Status;
}

export const UserModel = getModelForClass(User, {
    schemaOptions: {
        versionKey: false,
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    },
});
