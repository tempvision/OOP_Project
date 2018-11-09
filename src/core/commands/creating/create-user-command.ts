import { ICommand } from '../../contracts/command';
import { IUserDatabase } from '../../contracts/user-database';
import { Models } from '../../engine/models-factory';
import { UserDatabase } from '../../user-database';
import { IUser } from './../../../models/contracts/user';
import { User } from './../../../models/users/user-model';
import { UserType } from './../../../models/vehicles/common/user-type';
import { IModels } from './../../contracts/models-factory';

export class CreateUser implements ICommand {
    private _factory: IModels;
    private _userDatabase: IUserDatabase;

    constructor() {
        this._factory = new Models();
        this._userDatabase = UserDatabase.INSTANCE;
    }

    public execute(parameters: string[]): string {
        const [userFirstName, userLastName, userAge] = parameters;
        if (userFirstName.length < 0 || userLastName.length < 0 || +userAge < 0 || UserType) {
            throw new Error('Failed to parse CreateUser command parameters. CUSTOM');
        }

        const user: IUser = this._factory.createUser(userFirstName, userFirstName, +userAge, UserType);

        this._userDatabase.users.push(user);

        return `Created user with ID ${this._userDatabase.users.length - 1}.`;
    }
}