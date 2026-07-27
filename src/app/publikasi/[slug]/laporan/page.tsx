import {
  notFound
} from "next/navigation";


import type {
  Metadata
} from "next";


import {
  getPublicationBySlug
} from "../../actions";



import {
  ReportPreview
} from "@/components/public/report-preview";


import {
  LandingNavbar
} from "@/components/landing/navbar";


import {
  LandingFooter
} from "@/components/landing/footer";









interface Props {


params:
Promise<{
slug:string
}>;


}












export async function generateMetadata({

params

}:Props):Promise<Metadata>{






const {

slug

}=

await params;







const publication =

await getPublicationBySlug(

slug

);


console.log(
  "PUBLIKASI DETAIL:",
  JSON.stringify(publication, null, 2)
);




if(!publication){



return {


title:
"Laporan Tidak Ditemukan",


description:
"Laporan harga SIHARGA CEPAT"



};


}







return {



title:

`${publication.judul} | SIHARGA CEPAT`,



description:

publication.ringkasan ??

"Laporan perkembangan harga barang kebutuhan pokok"




};



}















export default async function PublicReportPage({


params


}:Props){







const {

slug

}=

await params;









const publication =

await getPublicationBySlug(

slug

);



console.log(
  "PUBLIKASI DETAIL:",
  JSON.stringify(publication, null, 2)
);






if(!publication){

notFound();

}









// hanya laporan

if(

publication.jenis !== "laporan"

){

notFound();

}











const laporan =
  publication.publikasi_laporan as unknown as {
    id:string;
    periode_mulai:string;
    periode_selesai:string;
    data_laporan:any[];
  };









if(


!laporan

||

!laporan.data_laporan

||

!Array.isArray(

laporan.data_laporan

)



){


notFound();


}











return (



<div

className="
min-h-screen
bg-background
"

>





<LandingNavbar />









<main>


<section

className="
container
mx-auto
px-4
py-16
"

>





<ReportPreview



data={

laporan.data_laporan

}



mode="publik"



/>






</section>


</main>









<LandingFooter />








</div>



);



}