import * as XLSX from "xlsx"


export interface ExcelKategori {

  kode:string

  nama:string

  deskripsi:string

  urutan:number

}



export function parseExcelKategori(
  file:File
):Promise<ExcelKategori[]> {


return new Promise(
(resolve,reject)=>{


const reader =
new FileReader()



reader.onload=(event)=>{


try {


const buffer =
event.target?.result



const workbook =
XLSX.read(
buffer,
{
type:"array"
}
)



const worksheet =
workbook.Sheets[
workbook.SheetNames[0]
]



const data =
XLSX.utils.sheet_to_json<ExcelKategori>(
worksheet,
{
defval:""
}
)



resolve(data)



}
catch(error){

reject(error)

}


}



reader.onerror =
reject



reader.readAsArrayBuffer(file)



})


}