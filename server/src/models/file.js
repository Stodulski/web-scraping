import mongoose from "mongoose";
const Schema = mongoose.Schema;

const fileSchema = new Schema({
    filename: { type: String, required: true },
    content: [
        {
            Handle: { type: String },
            Title: { type: String },
            Vendor: { type: String },
            SKU: { type: String },
            PricePen: { type: Number },
            PriceUsd: { type: Number },
            Image: { type: String },
            Body: { type: String },
            Tags: { type: String },
            Type: { type: String },
            Published: { type: Boolean },
        },
    ],
});

const File = mongoose.model("File", fileSchema);
export default File;