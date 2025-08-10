export default function InvoiceSetup() {
  return (
    <style>{`
        @media print {
          /* Sembunyikan semua */
          body * {
            visibility: hidden;
          }

    
          #invoice, #invoice * {
            visibility: visible;
          }

         
        #invoice {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        background: white;
        box-shadow: none !important; /* Hilangkan shadow */
        border-radius: 0 !important;
        }
        .min-h-screen {
            min-height: auto !important;
          }

          /* Hilangkan tombol */
          .no-print {
            display: none;
          }

          /* Atur ukuran kertas jadi struk 80mm */
          @page {
            size: 80mm auto;
            margin: 0;
              .min-h-screen {
    min-height: auto !important;
  }
          }
        }
      `}</style>
  );
}
