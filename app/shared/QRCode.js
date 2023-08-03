import { useQRCode } from "next-qrcode"

export default function QRCode({ url, setShowQR }) {

  const { Canvas } = useQRCode()

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="bg-gray-300 w-96 rounded-lg flex flex-col align-middle p-4">
        <button className="p-2 px-4 self-end" onClick={() => { setShowQR(false) }}>
          <img src="images/iconmonstr-x-mark-4.svg"/>
        </button>
        <div className="mx-auto mt-2">
          <Canvas
            text={url}
            options={{
              level: 'M',
              margin: 3,
              scale: 4,
              width: 250,
              color: {
                dark: '#18181b',
                light: '#f4f4f5',
              },
            }} />
        </div>
        <div className="w-80 mt-6 container mx-auto bg-zinc-100 rounded-md p-1">
          <h3 className="text-slate-900 font-bold">Link: <a href={url} className="pt-2 text-blue-700 hover:underline font-normal">{url}</a></h3>
        </div>
      </div>
    </div>
  )
}