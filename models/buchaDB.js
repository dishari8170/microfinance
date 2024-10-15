const homeSchema = new mongoose.Schema({
    name:String,
});
modules.export = mongoose.model.buchaDB ||mongoose.model("buchaDB",homeSchema);