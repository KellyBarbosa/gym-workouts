export interface IExercise {
  id: number
  name: string;
  series: string;
  repeat: string;
  weight: string;
  category: number[];
}

export interface ICategory {
  id: number;
  name: string;
  type: number;
}

export interface IType {
  id: number;
  name: string;
}