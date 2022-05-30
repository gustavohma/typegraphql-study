import { ClassType, InputType, ObjectType } from 'type-graphql';

export default function PartialType<TClassType extends ClassType>(
  BaseClass: TClassType,
) {
  const metadata = (global as any).TypeGraphQLMetadataStorage;

  @ObjectType({ isAbstract: true })
  @InputType({ isAbstract: true })
  class PartialClass extends BaseClass {}

  const fields = metadata.fields.filter(
    (f: any) =>
      f.target === BaseClass || BaseClass.prototype instanceof f.target,
  );
  fields.forEach((field: any) => {
    const newField = {
      ...field,
      typeOptions: { ...field.typeOptions, nullable: true },
      target: PartialClass,
    };
    metadata.fields.push(newField);
  });

  return PartialClass;
}
