export class Archive {
  public readonly bucket: string;
  public path: string;

  constructor(props: Omit<Archive, "bucket">, bucket?: string) {
    Object.assign(this, props);
  }
}
