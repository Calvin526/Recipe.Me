import * as validator from 'email-validator';

export const userCheck = (
    firstName,
    lastName,
    emailAddress,
    age,
    cookingYears,
    favoriteIngredients
) =>
{
    if (!firstName) throw "First Name required";
    if (!lastName)  throw "Last Name required";
    if (!emailAddress)  throw "Email Address Required";
    if (!age)   throw "Age Required";
    if (!cookingYears)   throw "Number of Cooking Years Required";
    if (!favoriteIngredients)   throw "Favorite Ingredients Required";

    firstName = firstName.trim();
    lastName = lastName.trim();
    
    if (firstName.length < 2 || firstName.length > 25)
        throw "First Name must be between 2-25 characters in length";

    if (lastName.length < 2 || lastName.length > 25)
        throw "Last Name must be between 2-25 characters in length";

    //REGEX for checking if string contains only alphabetic chars
    if (/[^a-zA-Z]/.test(firstName))
        throw "First Name must not contain any non-alphabetic characters";

    //REGEX for checking if string contains only alphabetic chars
    if (/[^a-zA-Z]/.test(lastName))
        throw "Last Name must not contain any non-alphabetic characters";

    if (!validator.validate(emailAddress))
        throw "Given Email Address is not in a valid email address format";

    if (isNaN(age) || typeof age != "number" || age <= 0)
        throw "Age must be an integer number greater than 0";

    if (isNaN(cookingYears) || typeof cookingYears != "number" || cookingYears < 0)
        throw "Age must be an integer number that is 0 or greater";

    if (!Array.isArray(favoriteIngredients))
        throw "Favorite Ingredients must be an array of strings";

    for (let ingredient in favoriteIngredients)
    {
        let currentIngredient = favoriteIngredients[ingredient].trim();

        //REGEX for checking if string contains only alphabetic chars
        if (currentIngredient.length == 0 || /[^a-zA-Z]/.test(currentIngredient))
            throw "Ingredient: " + currentIngredient + " must not contain numbers/special characters";
    }
}

export const passwordCheck = (password) =>
{
    if (!password) throw "Password Required";
    
    password = password.trim();

    if (typeof password != "string")
        throw "Password must be a string";
    
    //Taken from: https://stackoverflow.com/questions/1731190/check-if-a-string-has-white-space
    if ((/\s/).test(password))
        throw "Password must not contain any whitespace";

    if (password.length < 8)
        throw "Password must be at least 8 characters";

    const hasUppercase = /[A-Z]/;

    if (!hasUppercase.test(password))
        throw "Password must contain at least 1 uppercase character";


    const hasNumber = /\d/;

    if (!hasNumber.test(password))
        throw "Password must contain at least 1 number";

    const hasSpecialChar = /[^\w\d ]/;

    if (!hasSpecialChar.test(password))
        throw "Password must contain at least 1 special character";
}