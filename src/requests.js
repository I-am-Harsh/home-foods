import axios from 'axios';

const apiUrl = process.env.REACT_APP_API;
// 9 recipe for homescreen
// export const getHomeData = async () => {
//     await axios.get(`${apiUrl}/food`)
//     .then(result => {
//         return result;
//     })
//     .catch(err => err);
// }

export const getHomeData = () => {
    axios.get(`${apiUrl}/food`, (err, result) => {
        if(err) return err;
        return result;
    })
}

// all recipes
export const getRecipe = async () => {
    await axios.get(`${apiUrl}/food/recipes`)
    .then(result => {
        return result;
    })
    .catch(err => err);
}

// get specific dish

export const getSpecificDish = async (name) => {
    await axios.get(`${apiUrl}/food/${name}`)
    .then(result => result)
    .catch(err => err);
}

// upload recipe

export const postRecipe = async () => {
    await axios.post(`${apiUrl}/food/recipes/upload`)
    .then(result => result)
    .catch(err => err);
}