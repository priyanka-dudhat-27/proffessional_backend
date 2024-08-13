import mongoose from mongoose;

const subscriptionSchema=new mongoose.Schema({
    subscriber:{
        type:mongoose.Schema.Types.ObjectId, //one who subscribing
        ref:"User"
    },
    channel:{
        type:mongoose.Schema.Types.ObjectId, //whom to subscribe
        ref:"User"
    }
})

export const Subscription =mongoose.model("Subscription",subscriptionSchema)
