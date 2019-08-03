import {arrayProp, prop} from "typegoose"
import {VisitorData} from "./visitor.data"
import {Exclude} from "class-transformer"

export class RatingField {
  @Exclude()
  readonly _id: string;

  @prop({
    min: 1,
    max: 10
  })
  steps: number;

  @prop({
    enum: [
      'Heart',
      'Star',
      'thumbs-up',
      'thumbs-down',
      'Circle',
      'Square',
      'Check Circle',
      'Smile Outlined',
      'Hourglass',
      'bell',
      'Paper Plane',
      'Comment',
      'Trash'
    ]
  })
  shape: string;

  @arrayProp({
    items: String
  })
  validShapes: [String];
}
