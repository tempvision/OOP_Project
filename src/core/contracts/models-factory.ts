import {
  IRental, IVehicle
} from '../../models';
import { IUser } from '../../models/contracts/user';
import { UserType } from '../../models/vehicles/common/user-type';
import { CreateUser } from './../commands/creating/create-user-command';

export interface IModels {

  createUser(userFirstName: string, userLastName: string, userAge: number, userType: number,
    userName: string): IUser;

  createBus(passengerCapacity: number, pricePerDay: number, engine: string, color: string, transmissionType: string, brand: string, busLength: number): IVehicle;

  createCar(passengerCapacity: number, pricePerDay: number, engine: string,
    color: string, transmissionType: string, brand: string, topSpeed: number): IVehicle;

  createMotorcycle(passengerCapacity: number, pricePerDay: number, engine: string,
    color: string, transmissionType: string, brand: string, topSpeed: number): IVehicle;

  createCaravan(passengerCapacity: number, pricePerDay: number, engine: string, color: string, transmissionType: string, brand: string, livingArea: number, numberOfBeds: number, hasBathroom: boolean): IVehicle;

  createRental(clientFirstName: string, clientLastName: string,
    daysOfRental: number, vehicleId: IVehicle): IRental;
}
