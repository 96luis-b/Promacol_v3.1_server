import { Router } from "express";

const bodyParser = require('body-parser');
const path = require('path')
const multer = require("multer")
import fs from "fs-extra";
import xlsxFile from "read-excel-file/node";

const router = Router()



let storage = multer.diskStorage({
    destination: function (request, file, callback) {
        callback(null, './src/public/upload/')
    },

    filename: function (request, file, callback) {
        console.log(file)
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage })

router.post('/', upload.single('profile_picture'), (req, res) => {
    console.log("hola test")

    res.status(200).json({ status: 200, message: "respuesta" })
})

router.post("/process", upload.single('profile_picture'), async (req, res) => {
    const data = await xlsxFile(req.file.path);
    let empleados = [];

    data.forEach((element, index) => {
        empleados.push({
            name1: element[index][0],
            name2: element[index][1],
            lastname1: element[index][2],
            lastname2: element[index][3],
            birthday: element[index][4],
            id_number: element[index][5],
            phone: element[index][6],
            job: element[index][7]
        })
       
    });

    console.log("empleados: ", empleados)
    

    await fs.remove(req.file.path);
    // res.render("success", { empleados });

    res.status(200).json({ status: 200, message: "process" })
});


router.post("/upload", upload.single('profile_picture'), (req, res) => {
    console.log("req.file: ", req.file)
    // const workbook = XLSX.readFile(ruta)
    // const workbookSheets = workbook.SheetNames;

    // //console.log(workbookSheets)

    // const sheet = workbookSheets[0]
    // const dataExcel = XLSX.utils.sheet_to_json(workbook.Sheets[sheet])
    // console.log(dataExcel)

    res.status(200).json({ status: 200, message: "respuesta" })
})
// router.post('/', (req, res) => {
//     console.log("hola test") 

//     res.status(200).json({ status: 200, message: "respuesta" })
// })

export default router




