import * as XLSX from "xlsx"



export interface ExcelKomoditas {


  kode:string

  nama:string

  satuan:string

  kategori_kode:string

  urutan:number


}






export function parseExcelKomoditas(
  file:File
):Promise<ExcelKomoditas[]> {


return new Promise(
(resolve,reject)=>{



const reader =
new FileReader()



reader.onload=(event)=>{


try{


const buffer =
event.target?.result



const workbook =
XLSX.read(
buffer,
{
type:"array"
}
)



const sheet =
workbook.Sheets[
workbook.SheetNames[0]
]




const rows =
XLSX.utils.sheet_to_json(
sheet,
{
defval:""
}
)




const cleanData =
rows.map(
(row:any)=>(



{


kode:

String(
row.kode ?? ""
)
.trim()
.toUpperCase(),



nama:

String(
row.nama ?? ""
)
.trim(),



satuan:

String(
row.satuan ?? ""
)
.trim(),



kategori_kode:

String(
row.kategori_kode ?? ""
)
.trim()
.toUpperCase(),



urutan:

Number(
row.urutan ?? 0
)



}


)
)





resolve(
cleanData
)



}
catch(error){


reject(error)


}



}




reader.onerror =
()=>{


reject(
new Error(
"Gagal membaca file Excel"
)
)


}




reader.readAsArrayBuffer(file)



})


}