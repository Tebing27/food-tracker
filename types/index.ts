export enum Condition {
  Normal = 'normal',
  Fasting = 'fasting',
  AfterMeal = 'after-meal',
  BeforeSleep = 'before-sleep'
}

export enum FoodType {
  Food = 'food',
  Drink = 'drink'
}

export type BloodSugarRecord = {
  id: string;
  value: number;
  bloodSugar: number;
  date: string;
  time: string;
  age: string;
  type: FoodType;
  description: string;
  condition: Condition;
  userId?: string;
}; 