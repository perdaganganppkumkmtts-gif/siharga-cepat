import * as XLSX from "xlsx"



export interface HistorisItem {

  kode:string

  harga:number

}



export interface HistorisTanggal {


  tanggal:string

  items:HistorisItem[]


}






export function parseExcelHistoris(
file:File
):Promise<HistorisTanggal[]> {



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
header:1,
defval:""
}
) as any[]





if(
rows.length < 2
){

throw new Error(
"File Excel kosong"
)

}





// ==========================
// Ambil header tanggal
// ==========================


const headers =
rows[0]



const tanggalList =
headers
.slice(1)
.map(
(item:any)=>
String(item)
.trim()
)






// ==========================
// Ambil data kode + harga
// ==========================


const dataRows =
rows.slice(1)







const result:HistorisTanggal[] =



tanggalList.map(
(tanggal:string)=>{


return {


tanggal,


items:

dataRows
.map(
(row:any)=>{


return {


kode:

String(
row[0]
)
.trim()
.toUpperCase(),



harga:

Number(
row[
tanggalList.indexOf(tanggal)+1
] ?? 0
)



}



}
)
.filter(
(item)=>
item.kode &&
item.harga > 0
)



}



}

)







resolve(
result
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
"Gagal membaca Excel"
)
)


}




reader.readAsArrayBuffer(file)



})



}