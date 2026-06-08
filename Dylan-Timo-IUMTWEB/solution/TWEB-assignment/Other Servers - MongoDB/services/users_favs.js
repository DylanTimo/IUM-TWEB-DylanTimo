// Service
import Model from '../models/users_favs.js';

export async function query(filter = {}) {
    return Model.find(filter)
        .select('-_id')
        .lean()
        .exec();
}
