import { prop, getModelForClass } from '@typegoose/typegoose';

export enum Status {
    DRAFT = 0,
    ACTIVE = 1,
    DELETED = 2,
}

export enum Pagination {
    SKIP = 0,
    SIZE = 10,
}

export class Category {
    @prop({ required: true })
    public name!: string;

    @prop({ enum: Status, default: Status.ACTIVE })
    public status!: Status;
}

export const CategoryModel = getModelForClass(Category, {
    schemaOptions: {
        versionKey: false,
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    },
});
