import { useQRCode } from "next-qrcode"

export default function QRCode({ url, setShowQR }) {

  const { Canvas } = useQRCode()

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="bg-gray-950 p-10 rounded-lg">
        <button className="absolute top-0 right-0 p-2 px-4" onClick={() => { setShowQR(false) }}>
          Close
        </button>
        <Canvas
          text={url}
          options={{
            level: 'M',
            margin: 3,
            scale: 4,
            width: 350,
            color: {
              dark: '#18181b',
              light: '#f4f4f5',
            },
          }} />
        <div className="w-80 mt-4">
          <a href={url} className="pt-2 text-blue-500 hover:underline">{url}</a>
        </div>
      </div>
    </div>
  )
}