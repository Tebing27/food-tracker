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

export interface BloodSugarRecord {
  id: string;
  userId: string;
  bloodSugar: number;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  email: string;
  bloodSugarRecords: BloodSugarRecord[];
  createdAt: Date;
  updatedAt: Date;
} 