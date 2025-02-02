import userRepository from "../repositories/userRepository.js";
import bcrypt from "bcryptjs";
import CustomError from "../utils/CustomError.js";
import { StatusCodes } from "http-status-codes";
import createJwtToken from "../utils/auth/authUtilJWT.js";

export const signUpService = async (data) => {
  try {
      const isUserExists = await userRepository.getByEmail(data.email);
      if(isUserExists){
          throw new CustomError(
              "user already exist",
              StatusCodes.BAD_REQUEST
            );
      }
    const response = await userRepository.create(data);
    return response
  } catch (error) {
    if(error instanceof CustomError) throw error;
    throw new CustomError(
      "error in sign-up process",
      StatusCodes.BAD_REQUEST,
      error
    );
  }
};

export const signInService = async (data) => {
  try {
    const user = await userRepository.getByEmail(data.email);
    if (!user) {
      throw new CustomError(
        "enter a valid email or password",
        StatusCodes.BAD_REQUEST
      );
    }
    const isMatch = bcrypt.compareSync(data.password, user.password);
    if (!isMatch) {
      throw new CustomError(
        "password or email is wrong",
        StatusCodes.BAD_REQUEST
      );
    }
    return {
      username: user.username,
      userId:user._id,
      email: user.email,
      avatar: user.avatar,
      token: createJwtToken({ id: user._id, email: user.email }),
    };
  } catch (error) {
    if(error instanceof CustomError) throw error;
    throw new CustomError(
      "Unexpected error in sign-in process",
      StatusCodes.BAD_REQUEST
    );
  }
};
