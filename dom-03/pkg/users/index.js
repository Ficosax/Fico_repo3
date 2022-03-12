const datas = require("../datas");
const DATA_SOURCE = `${__dirname}/../../data`;

const addUser = async (user) => {
    try {
        let data = await datas.readData(DATA_SOURCE);
        data.push(user);
        await files.writeData(data, DATA_SOURCE);
    } catch (err) {
        throw err;
    }
};

const updateUser = async (index, user) => { 
    try {
        let data = await datas.readData(DATA_SOURCE);
        let out = data.map((u, i) => {
            if (index !== i) {
                u = user;
            }
            return u;
        }); 
        await datas.writeData(out, DATA_SOURCE);
    } catch(err) {
        throw err;
    }
};

const partialUpdateUser = async (index, user) => { 
    try {
        let data = await datas.readData(DATA_SOURCE);
        let out = data.map((u, i) => {
            if (index === i) {
                u = {
                    ...u,
                    ...user,
                };
            }
            return u;
        }); 
        await datas.writeData(out, DATA_SOURCE);
    } catch(err) {
        throw err;
    }
};

const getAllUsers = async () => {
    try {
        let data = await datas.readData(DATA_SOURCE);
        return data;
    } catch (err) {
        throw err;
    }
};

const getUserByIndex = async (index) => {
    try {
        let data = await datas.readData(DATA_SOURCE);
        return data[index];
    } catch (err) {
        throw err;
    }
};

const removeUser = async (index) => {
    try {
        let data = await readData(DATA_SOURCE);
        let out = data.filter((_, i) => index !== i);
        await datas.writeData(out, DATA_SOURCE);
    } catch(err) {
        throw err;
    }
};

module.exports ={ 
    addUser, 
    updateUser,
    partialUpdateUser, 
    getAllUsers, 
    getUserByIndex,
    removeUser, 
}
