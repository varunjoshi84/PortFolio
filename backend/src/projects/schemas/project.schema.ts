import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProjectDocument = Project & Document;

@Schema({ timestamps: true })
export class Project {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop([String])
  techStack: string[];

  @Prop()
  githubLink: string;

  @Prop()
  liveLink: string;

  @Prop()
  image: string;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
