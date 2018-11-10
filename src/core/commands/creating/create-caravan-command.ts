import { IVehicle } from '../../../models';
import { ICommand } from '../../contracts/command';
import { Models } from '../../engine/models-factory';
import { IModels, ITravelDatabase } from './../../contracts';
import { TravelDatabase } from './../../travel-database';
export class CreateCaravan implements ICommand {

  private _factory: IModels;
  private _travelDatabase: ITravelDatabase;

  constructor() {
    this._factory = new Models();
    this._travelDatabase = TravelDatabase.INSTANCE;
  }

  public execute(parameters: string[]): string {
    const [passengerCapacity, pricePerDay, engine, color, transmissionType, brand, livingArea, numberOfBeds, hasBathroom] = parameters;

    if (isNaN(+passengerCapacity) || isNaN(+pricePerDay) || engine.length <= 0 ||
      color.length <= 0 || !(transmissionType.localeCompare('Automatic') ||
      transmissionType.localeCompare('Manual')) || brand.length <= 0 || isNaN(+livingArea) || isNaN(+numberOfBeds)
      || hasBathroom !== ('true' || 'false')) {
      throw new Error('Failed to parse CreateCaravan command parameters.');
    }

    const caravan: IVehicle = this._factory.createCaravan(+passengerCapacity, +pricePerDay, engine,
      color, transmissionType, brand, +livingArea, +numberOfBeds, Boolean(hasBathroom));

    this._travelDatabase.vehicles.push(caravan);

    return `Vehicle with ID ${this._travelDatabase.vehicles.length - 1} was created.`;
  }
}
