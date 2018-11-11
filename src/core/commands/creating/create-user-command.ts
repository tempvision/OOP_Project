import { ICommand } from '../../contracts/command';
import { Models } from '../../engine/models-factory';
import { IUser } from './../../../models/contracts/user';
import { IModels } from './../../contracts/models-factory';
import { ITravelDatabase } from './../../contracts/travel-database';
import { TravelDatabase } from './../../travel-database';

export class CreateUser implements ICommand {
    private _factory: IModels;
    private _travelDatabase: ITravelDatabase;

    constructor() {
        this._factory = new Models();
        this._travelDatabase = TravelDatabase.INSTANCE;
    }

    public execute(parameters: string[]): string {
        const [userFirstName, userLastName, userAge, userType, userName] = parameters;
        if (userFirstName.length < 0 || userLastName.length < 0 || +userAge < 0 || +userType < 0) {
            throw new Error('INVALID CreateUser command parameters.');
        }
        if (this._travelDatabase.users.findIndex((currUser: IUser) => currUser.userName === userName) !== -1) {
            throw new Error('THERE IS ALREADY A USER WITH THAT NAME');
        }

        const user: IUser = this._factory.createUser(userFirstName, userFirstName, +userAge, +userType, userName);

        this._travelDatabase.users.push(user);

        return `Created user with ID ${this._travelDatabase.users.length - 1}.`;
    }
}
