import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/userModel.js";

const registerUser = asyncHandler(async (req, res) => {
  //get user details from frontend
  //validation-not empty
  //user already exist -chek by email or username
  //check for files(images)/check for avtar
  //upload them to cloudinary,avtar
  //create user object-create entry in db
  //remove password and refresh token from response- for send to frontend
  //check for user creation or null
  //return res
  const { fullname, email, username, password } = req.body;

  // if(fullname===""){
  //     throw new ApiError(400,"fullname is required")
  // }

  if (
    [fullname, email, username, password].some(
      (field) => !field || field.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required and must not be empty");
  }

  const existedUser = User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exist");
  }

//   const avtarLocalPath = req.files?.avtart[0]?.path;
//   const coverImageLocalPath = req.files?.coverImage[0]?.path;

//   if (!avtar) {
//     throw new ApiError(400, "Avtar file is required");
  }
});

export { registerUser };
