import multer from "multer";

const storage = multer.memoryStorage();
//Omogucava upload fajla u expressu, znaci u postmanu kad unesem file pod key-em file, ovaj
//middleware mi omogucava da taj file nadjem u req.file
export const uploadSingle = multer(
    storage
).single("file");