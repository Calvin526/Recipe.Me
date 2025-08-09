import { ObjectId } from 'mongodb';
import {users} from '../config/mongoCollections.js';
import * as helpers from '../helpers.js';
import bcrypt from 'bcrypt';
const saltRounds = 4;


export const createUser = async (
    firstName,
    lastName,
    emailAddress,
    age,
    cookingYears,
    favoriteIngredients,
    password,
    confirmPassword
) =>
{
    helpers.userCheck(firstName, lastName, emailAddress, age, cookingYears, favoriteIngredients);
    helpers.passwordCheck(password);

    if (!confirmPassword)
        throw "Confirm Password Required";

    if (password != confirmPassword)
        throw "Passwords must match";

    password = password.trim();
    firstName = firstName.trim();
    lastName = lastName.trim();
    emailAddress = emailAddress.trim().toLowerCase();
    
    for (let ingredient in favoriteIngredients)
    {
        let currentIngredient = favoriteIngredients[ingredient]; 
        currentIngredient = currentIngredient.replace(/^.{1}/g, currentIngredient[0].toUpperCase());
        favoriteIngredients[ingredient] = currentIngredient.trim();
    }

    let allUsers = await users();

    let emailCheck = await allUsers.findOne({emailAddress: emailAddress});

    if (emailCheck)
        throw "Email already in use";

    let encryptedPassword = await bcrypt.hash(password, saltRounds);

    let newUser =
    {
        _id: new ObjectId(),
        firstName: firstName,
        lastName: lastName,
        emailAddress: emailAddress,
        age: age,
        cookingYears: cookingYears,
        favoriteIngredients: favoriteIngredients,
        password: encryptedPassword,
        recipes: [],
        reviews: [],
        numRecipes: 0,

    }

    let addUser = await allUsers.insertOne(newUser);

    if (!addUser)
        throw "User insertion unsuccessful";

    return newUser;
}

export const loginUser = async (emailAddress, password) =>
{

}

export const editUser = async (userID) =>
{
    
}

//Also delete all recipes & reviews left by this user
export const deleteUser = async (userID) =>
{

}
