// import * as authDB from '../helpers/auth_db'
const excel4Node = require('excel4node');
const path = require('path')


export const createWorkmanProductionReport = async (req, res) => {
    try {
        let { data } = req.body
        let wb = new excel4Node.Workbook()
        let ws = wb.addWorksheet('Ventas')
        // var myStyle = wb.createStyle({

        //     alignment: {
        //         wrapText: true,
        //         horizontal: 'center',
        //     },
        //     workbookView: {
        //         activeTab: 2,
        //         windowWidth: 28800,
        //     }
        // });

        let header = 1
        let row = 2
        ws.cell(header, 1).string('Puesto de trabajo')
        ws.cell(header, 2).string('Codigo')
        ws.cell(header, 3).string('Cedula de identidad')
        ws.cell(header, 4).string('Primer nombre')
        ws.cell(header, 5).string('Segundo nombre')
        ws.cell(header, 6).string('Primer apellido')
        ws.cell(header, 7).string('Segundo apellido')
        ws.cell(header, 8).string('Unidades de producción')

        data.forEach((itemElment, i) => {

            itemElment.category.forEach((itemCategory, j) => {

                ws.cell(row, 1).string(itemCategory.job_name)
                ws.cell(row, 2).string(itemCategory.emp_code)
                ws.cell(row, 3).number(itemCategory.id_number)
                ws.cell(row, 4).string(itemCategory.name1)
                ws.cell(row, 5).string(itemCategory.name2)
                ws.cell(row, 6).string(itemCategory.lastname1)
                ws.cell(row, 7).string(itemCategory.lastname2)
                itemCategory.production.forEach((itemProd, z) => {
                    ws.cell(row, z + 8).string(`${itemProd.prod_name}: ${itemProd?.quantity || 0}`)
                })
                row++

            })
        });
        const pathExcel = path.join(`C:/Users/luisB/Downloads/reporte_produccion${new Date().getTime()}.xlsx`)


        wb.write(pathExcel, function (err, stats) {
            if (err) {
                console.error(err)
            } else {
                function downloadFile() {
                    res.download(pathExcel)
                }
                downloadFile()
                return false
            }
        })

        res.status(200).json({ status: 200, message: "Reporte generado con exito" })

    } catch (error) {
        console.log(`${error}`)
        res.status(500).json({ status: 500, message: "Ha ocurrido un error" })
    }
}


export const createPayrollReport = async (req, res) => {
    try {
        let { data } = req.body
        let wb = new excel4Node.Workbook()
        let ws = wb.addWorksheet('Nomina')
        // // var myStyle = wb.createStyle({

        // //     alignment: {
        // //         wrapText: true,
        // //         horizontal: 'center',
        // //     },
        // //     workbookView: {
        // //         activeTab: 2,
        // //         windowWidth: 28800,
        // //     }
        // // });

        let header = 1
        let row = 2

        /** error 
         * este reporte esta limitado para solo 
         * hasta 2 unidades de produccion como maximo
         */
        let headerText = [
            'Fecha de producción',
            'Grupo',
            'Codigo',
            'Cedula de identidad',
            'Primer nombre',
            'Segundo nombre',
            'Primer apellido',
            'Segundo apellido',
            'Unidades de producción',
            'Unidades de producción',
            'Total Unidades',
            'Total Bs',
            'Total $',
            'Bs Pagados',
            '$ Pagados',
        ]
        headerText.forEach((text, i) => {
            ws.cell(header, i + 1).string(text)
        });
        let total_unit = 0
        data.forEach((itemElment, i) => {

            itemElment.payroll.forEach((itemPayroll, j) => {

                ws.cell(row, 1).string(itemPayroll.date)
                ws.cell(row, 2).string(itemElment.job_name)
                ws.cell(row, 3).string(itemElment.emp_code)
                ws.cell(row, 4).number(itemElment.id_number)
                ws.cell(row, 5).string(itemElment.name1)
                ws.cell(row, 6).string(itemElment.name2)
                ws.cell(row, 7).string(itemElment.lastname1)
                ws.cell(row, 8).string(itemElment.lastname2)
                itemPayroll.payroll_detail.forEach((itemPayrolDetail, z) => {
                    total_unit += itemPayrolDetail.quantity
                })

                itemPayroll.payroll_detail.forEach((itemPayrolDetail, z) => {
                    ws.cell(row, z + 9).string(`${itemPayrolDetail.prod_name}: ${itemPayrolDetail?.quantity || 0}`)
                })
                ws.cell(row, 11).number(total_unit)
                ws.cell(row, 12).string(itemPayroll.total_bs)
                ws.cell(row, 13).string(itemPayroll.total_dollar)
                ws.cell(row, 14).string(itemPayroll.pay_bs)
                ws.cell(row, 15).string(itemPayroll.pay_dollar)

                row++
            })
        });
        const pathExcel = path.join(`C:/Users/luisB/Downloads/reporte_nomina${new Date().getTime()}.xlsx`)


        wb.write(pathExcel, function (err, stats) {
            if (err) {
                console.error(err)
            } else {
                function downloadFile() {
                    res.download(pathExcel)
                }
                downloadFile()
                return false
            }
        })

        res.status(200).json({ status: 200, message: "Reporte generado con exito" })

    } catch (error) {
        console.log(`${error}`)
        res.status(500).json({ status: 500, message: "Ha ocurrido un error" })
    }
}