"use client"

import {
  useState
} from "react"

import {
  Button
} from "@/components/ui/button"

import {
  Input
} from "@/components/ui/input"

import {
  Label
} from "@/components/ui/label"

import {
  Textarea
} from "@/components/ui/textarea"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

interface Props {

  open:boolean

  onOpenChange:(value:boolean)=>void

  onSubmit:(data:{

    judul:string

    createdBy:string

    deskripsi:string

    cover:File

  })=>void

  loading?:boolean

}

export function ReportPublishDialog({

  open,

  onOpenChange,

  onSubmit,

  loading=false

}:Props){

  const [judul,setJudul]=
  useState(
    "Laporan Perkembangan Harga Barang Kebutuhan Pokok"
  )

  const [createdBy,setCreatedBy]=
  useState("")

  const [deskripsi,setDeskripsi]=
  useState("")

  const [cover,setCover]=
  useState<File | null>(null)

  const [preview,setPreview]=
  useState("")

  const [error,setError]=
  useState("")

  function handleSubmit(){

    setError("")

    if(!judul.trim()){

      setError(
        "Judul laporan wajib diisi."
      )

      return

    }

    if(!createdBy.trim()){

      setError(
        "Dibuat Oleh wajib diisi."
      )

      return

    }

    if(!deskripsi.trim()){

      setError(
        "Deskripsi laporan wajib diisi."
      )

      return

    }

    if(!cover){

      setError(
        "Cover laporan wajib diunggah."
      )

      return

    }

    onSubmit({

      judul:
      judul.trim(),

      createdBy:
      createdBy.trim(),

      deskripsi:
      deskripsi.trim(),

      cover

    })

  }

  function handleClose(
    value:boolean
  ){

    if(!value){

      setCreatedBy("")

      setDeskripsi("")

      setCover(null)

      setPreview("")

      setError("")

    }

    onOpenChange(value)

  }

  return (

    <Dialog

      open={open}

      onOpenChange={handleClose}

    >

      <DialogContent className="sm:max-w-xl">

        <DialogHeader>

          <DialogTitle>

            Publikasikan Laporan

          </DialogTitle>

        </DialogHeader>

        <div className="space-y-5">

          {/* Judul */}

          <div className="space-y-2">

            <Label>

              Judul Laporan

            </Label>

            <Input

              value={judul}

              onChange={(e)=>

                setJudul(
                  e.target.value
                )

              }

            />

          </div>

          {/* Dibuat Oleh */}

          <div className="space-y-2">

            <Label>

              Dibuat Oleh

            </Label>

            <Input

              placeholder="Nama penyusun laporan"

              value={createdBy}

              onChange={(e)=>

                setCreatedBy(
                  e.target.value
                )

              }

            />

          </div>

          {/* Deskripsi */}

          <div className="space-y-2">

            <Label>

              Deskripsi Laporan

            </Label>

            <Textarea

              rows={6}

              placeholder="Contoh: Laporan Perkembangan Harga Bapok Mingguan berdasarkan pantauan di Pasar Inpres SoE"

              value={deskripsi}

              onChange={(e)=>

                setDeskripsi(
                  e.target.value
                )

              }

            />

          </div>

          {/* Cover */}

          <div className="space-y-2">

            <Label>

              Cover Laporan

            </Label>

            <Input

              type="file"

              accept="
image/png,
image/jpeg,
image/jpg,
image/webp
"

              onChange={(e)=>{

                setError("")

                const file =
                e.target.files?.[0]

                if(!file)
                return

                if(
                  file.size >
                  5 * 1024 * 1024
                ){

                  setError(
                    "Ukuran gambar maksimal 5 MB."
                  )

                  return

                }

                setCover(file)

                setPreview(
                  URL.createObjectURL(file)
                )

              }}

            />

            {

              preview &&

              <img

                src={preview}

                alt="Preview Cover"

                className="
                mt-2
                h-56
                w-full
                rounded-lg
                border
                object-cover
                "

              />

            }

          </div>

        </div>

        {

          error &&

          <div

            className="
            rounded-md
            bg-destructive/10
            p-3
            text-sm
            text-destructive
            "

          >

            {error}

          </div>

        }

        <DialogFooter>

          <Button

            variant="outline"

            onClick={()=>

              handleClose(false)

            }

            disabled={loading}

          >

            Batal

          </Button>

          <Button

            onClick={handleSubmit}

            disabled={

              loading ||

              !judul.trim() ||

              !createdBy.trim() ||

              !deskripsi.trim() ||

              !cover

            }

          >

            {

              loading

              ?

              "Menyimpan..."

              :

              "Publikasikan"

            }

          </Button>

        </DialogFooter>

      </DialogContent>

    </Dialog>

  )

}