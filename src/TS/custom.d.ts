// custom.d.ts
declare module '*.png' {
    const value: string;
    export = value;
  }

  declare module "*.jpeg" {
    const value: string;
    export default value
  }
  declare module "*.gif"{
    const value:string;
    export default value
  }
  declare module "*.webp"{
    const value:string;
    export default value
  }
  
  export interface CustomFile extends File {
    size: number;
  }
  