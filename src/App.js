import { useEffect, useRef, useState } from "react";

import Card from "./component/Card";

function App() {
  const month = "Februari";
  const year = 2023;
  const url = "http://localhost:8000/detail";

  const [detail, setDetail] = useState(null);
  let total = useRef(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState(0);

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
  console.log(closemodal)
  closemodal?.addEventListener("click", toggleModal);

  return (
    <>
      <div className="min-h-screen relative p-4">
        {/* Header */}
        <header className="text-center">
          <h1 className="text-3xl">Diari Jajan {month} {year}</h1>
          <p className="text-xl">Pengeluaran Bulan Ini Rp {(total.current).toLocaleString().replaceAll(',', '.')}</p>
          <button className="modal-open bg-violet-800 uppercase font-medium text-sm text-white rounded-sm px-3.5 py-1.5 mt-3 smooth-trans hover:bg-violet-900">Tambah Item</button>
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
          <form onSubmit={(e) => e.preventDefault()} className="absolute w-80 flex flex-col gap-y-4 bg-white rounded-sm p-3.5 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-20">
            <p className="font-medium text-xl">Tambah Entri</p>
            <div className="w-full text-sm">
              <label htmlFor="nama" className="block">Nama</label>
              <input type="text" id="nama" className="w-full border border-gray-300/75 rounded-sm px-2 py-1.5 mt-1" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Masukkan nama" />
            </div>
            <div className="w-full text-sm">
              <label htmlFor="harga" className="block">Harga</label>
              <input type="number" id="harga" className="w-full border border-gray-300/75 rounded-sm px-2 py-1.5 mt-1" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} placeholder="Masukkan harga" />
            </div>
            <div className="flex justify-end gap-x-2">
              <button className="modal-close bg-gray-500 uppercase font-medium text-sm text-white rounded-sm px-3.5 py-1.5 mt-3 smooth-trans hover:bg-gray-600">Batal</button>
              <button type="submit" className="bg-violet-800 uppercase font-medium text-sm text-white rounded-sm px-3.5 py-1.5 mt-3 smooth-trans hover:bg-violet-900">Kirim</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
