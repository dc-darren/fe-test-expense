import { useEffect, useRef, useState } from "react";

import Card from "./component/Card";

function App() {
  const today = new Date();
  const monthNames = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember'
  ];

  const month = monthNames[today.getMonth()];
  const year = today.getFullYear();
  const url = "http://localhost:8000/detail";

  const [detail, setDetail] = useState(null);
  let total = useRef(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [entryName, setEntryName] = useState("");
  const [entryPrice, setEntryPrice] = useState(0);

  // Script for Form in Modal
  const handleFormSubmit = (e) => {
    e.preventDefault();

    if ((entryName !== '') && (entryPrice > 0)) {
      const now = new Date();
      const entryDate = now.getDate();
      const entryMonth = monthNames[now.getMonth()];
      const entryHour = String(now.getHours()).padStart(2, '0');;
      const entryMinute = String(now.getMinutes()).padStart(2, '0');;

      const tanggal = entryDate + ' ' + entryMonth;
      const jam = entryHour + ':' + entryMinute;
      const nama = entryName;
      const pengeluaran = parseInt(entryPrice);

      if (!detail[tanggal]) detail[tanggal] = [];
      detail[tanggal].push({jam, nama, pengeluaran});
      total.current += pengeluaran;

      setEntryName("");
      setEntryPrice(0);
    }
  }

  useEffect(() => {
    total.current = 0;

    fetch(url)
    .then(response => {
      return response.json();
    })
    .then(data => {
      // Group object by key of "tanggal"
      const result = {};
      for (const {jam, tanggal, nama, pengeluaran} of data) {
        if (!result[tanggal]) result[tanggal] = [];
        result[tanggal].push({jam, nama, pengeluaran});
        total.current += pengeluaran;
      }
      setDetail(result);
    })
  }, []);

  // Script for Modal
  const toggleModal = (e) => {
    e.preventDefault();
    setIsModalOpen(!isModalOpen);
  }

  let openmodal = document.querySelector(".modal-open");
  openmodal?.addEventListener("click", toggleModal);

  let overlay = document.querySelector(".modal-overlay");
  overlay?.addEventListener("click", toggleModal);

  let closemodal = document.querySelector(".modal-close");
  closemodal?.addEventListener("click", toggleModal);

  return (
    <>
      <div className={`min-h-screen relative p-4 ${isModalOpen ? 'h-screen overflow-hidden' : ''}`}>
        {/* Header */}
        <header className="text-left sm:text-center">
          <h1 className="text-2xl sm:text-3xl">Diari Jajan {month} {year}</h1>
          <p className="text-base sm:text-xl">Pengeluaran Bulan Ini Rp {(total.current).toLocaleString().replaceAll(',', '.')}</p>
          <button className="modal-open w-full sm:w-fit bg-violet-800 uppercase font-medium text-sm text-white rounded-sm px-5 py-2 mt-3 smooth-trans hover:bg-violet-900">Tambah Item</button>
        </header>

        {/* Cards */}
        <main className="grid grid-cols-12 gap-3 mt-5">
          {detail && Object.keys(detail).map(key => {
            return (
              <Card key={key} year={year} date={key} detail={detail[key]} />
            );
          })}
        </main>

        {/* Modal */}
        <div className={`modal ${isModalOpen ? '' : 'opacity-0 pointer-events-none'}`}>
          <div className="modal-overlay absolute w-screen h-screen bg-black/80 left-0 top-0"></div>
          {/* Modal Content */}
          <form onSubmit={(e) => handleFormSubmit(e)} className="absolute w-4/5 sm:w-80 flex flex-col gap-y-4 bg-white rounded-sm p-3.5 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-20">
            <p className="font-medium text-xl">Tambah Entri</p>
            <div className="w-full text-sm">
              <label htmlFor="nama" className="block">Nama</label>
              <input type="text" id="nama" className="w-full border border-gray-300/75 rounded-sm px-2 py-1.5 mt-1" value={entryName} onChange={(e) => setEntryName(e.target.value)} placeholder="Masukkan nama" />
            </div>
            <div className="w-full text-sm">
              <label htmlFor="harga" className="block">Harga</label>
              <input type="number" id="harga" className="w-full border border-gray-300/75 rounded-sm px-2 py-1.5 mt-1" value={entryPrice} onChange={(e) => setEntryPrice(e.target.value)} placeholder="Masukkan harga" />
            </div>
            <div className="flex justify-end gap-x-2">
              <button className="modal-close w-full bg-gray-500 uppercase font-medium text-sm text-white rounded-sm px-3.5 py-1.5 mt-3 smooth-trans hover:bg-gray-600">Batal</button>
              <button type="submit" className="w-full bg-violet-800 uppercase font-medium text-sm text-white rounded-sm px-3.5 py-1.5 mt-3 smooth-trans hover:bg-violet-900">Kirim</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
