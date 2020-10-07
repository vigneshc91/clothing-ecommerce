import { prop, getModelForClass, Ref, arrayProp } from '@typegoose/typegoose';
import { Category } from './category.model';

export enum Status {
    DRAFT = 0,
    ACTIVE = 1,
    DELETED = 2,
}

export enum Pagination {
    SKIP = 0,
    SIZE = 10,
}

export enum IdealFor {
    MEN = 1,
    WOMEN = 2,
    MEN_AND_WOMEN = 3,
    BOYS = 4,
    GIRLS = 5,
    BOYS_AND_GIRLS = 6,
    BABY_BOYS = 7,
    BABY_GIRLS = 8,
    BABY_BOYS_AND_BABY_GIRLS = 9,
    COUPLE = 10,
    UNISEX = 11,
}

class ProductCategory {
    @prop({ required: true, ref: Category })
    public id!: Ref<Category>;

    @prop({ required: true })
    public name!: string;
}

export class Product {
    @prop({ required: true })
    public name!: string;

    @prop()
    public brand?: string;

    @prop()
    public description?: string;

    @prop({ type: () => [ProductCategory], _id: false })
    public category?: ProductCategory[];

    @prop({ enum: IdealFor, type: Number })
    public idealFor?: IdealFor[];

    @prop({ type: () => [String] })
    public size?: string[];

    @prop({ type: () => [String] })
    public color?: string[];

    @prop({ type: () => [String] })
    public tag?: string[];

    @prop({ required: true })
    public basePrice!: number;

    @prop()
    public discount?: number;

    @prop({ required: true })
    public price!: number;
    
    @prop({ type: () => [String] })
    public image?: string[];

    @prop({ enum: Status, default: Status.ACTIVE })
    public status!: Status;
}

export const ProductModel = getModelForClass(Product, {
    schemaOptions: {
        versionKey: false,
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    },
});
