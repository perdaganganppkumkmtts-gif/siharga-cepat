"use client"

function LegendItem({

  active,

  color,

  label,

  onClick,

}:{

  active:boolean

  color:string

  label:string

  onClick:()=>void

}){

  return(

    <button

      type="button"

      onClick={onClick}

      className={`
        flex
        items-center
        gap-2
        rounded-lg
        border
        px-3
        py-2
        transition-all
        hover:bg-muted
        ${
          active
            ? "border-primary"
            : "opacity-50"
        }
      `}

    >

      <span

        className="h-3 w-3 rounded-full"

        style={{

          backgroundColor:color

        }}

      />

      <span

        className="text-sm font-medium"

      >

        {label}

      </span>

    </button>

  )

}

interface ChartLegendToggleProps{

  showHarga:boolean

  showHET:boolean

  showHAP:boolean

  showHAPBawah:boolean

  showHAPAtas:boolean

  hasHET:boolean

  hasHAP:boolean

  hasHAPBawah:boolean

  hasHAPAtas:boolean

  onShowHarga:(value:boolean)=>void

  onShowHET:(value:boolean)=>void

  onShowHAP:(value:boolean)=>void

  onShowHAPBawah:(value:boolean)=>void

  onShowHAPAtas:(value:boolean)=>void

}

export function ChartLegendToggle({

  showHarga,

  showHET,

  showHAP,

  showHAPBawah,

  showHAPAtas,

  hasHET,

  hasHAP,

  hasHAPBawah,

  hasHAPAtas,

  onShowHarga,

  onShowHET,

  onShowHAP,

  onShowHAPBawah,

  onShowHAPAtas,

}:ChartLegendToggleProps){

  return(

    <div

      className="
        flex
        flex-wrap
        gap-3
      "

    >

      <LegendItem

        active={showHarga}

        color="#16a34a"

        label="Harga"

        onClick={()=>

          onShowHarga(

            !showHarga

          )

        }

      />

      {

        hasHET && (

          <LegendItem

            active={showHET}

            color="#ef4444"

            label="HET"

            onClick={()=>

              onShowHET(

                !showHET

              )

            }

          />

        )

      }

      {

        hasHAP && (

          <LegendItem

            active={showHAP}

            color="#3b82f6"

            label="HAP"

            onClick={()=>

              onShowHAP(

                !showHAP

              )

            }

          />

        )

      }

      {

        hasHAPBawah && (

          <LegendItem

            active={showHAPBawah}

            color="#f97316"

            label="HAP Bawah"

            onClick={()=>

              onShowHAPBawah(

                !showHAPBawah

              )

            }

          />

        )

      }

      {

        hasHAPAtas && (

          <LegendItem

            active={showHAPAtas}

            color="#8b5cf6"

            label="HAP Atas"

            onClick={()=>

              onShowHAPAtas(

                !showHAPAtas

              )

            }

          />

        )

      }

    </div>

  )

}