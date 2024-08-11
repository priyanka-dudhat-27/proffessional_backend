import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/userModel.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

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

  const existedUser =await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exist");
  }

  const avtarLocalPath = req.files?.avtar[0]?.path;
  // const coverImageLocalPath = req.files?.coverImage[0]?.path;

  let coverImageLocalPath;
  if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length>0){
    coverImageLocalPath = req.files.coverImage[0].path;
  }

  if (!avtarLocalPath) {
    throw new ApiError(400, "Avtar file is required");
  }

  const avtar = await uploadOnCloudinary(avtarLocalPath);

// Only upload the cover image if it exists
let coverImage;
if (coverImageLocalPath) {
  coverImage = await uploadOnCloudinary(coverImageLocalPath);
}
  

  if (!avtar) {
    throw new ApiError(400, "Avtar file is required");
  }

  const user = await User.create({
    fullname,
    avtar: avtar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wriong while register the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});

export { registerUser };
