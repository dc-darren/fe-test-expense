import { useEffect, useRef, useState } from "react";

import Card from "./component/Card";

function App() {
  const month = "Februari";
  const year = 2023;
  const url = "http://localhost:8000/detail";
  const [detail, setDetail] = useState(null);
  let total = useRef(0);

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

  return (
    <>
      <div className="p-4">
        {/* Header */}
        <header className="text-center">
          <h1 className="text-3xl">Diari Jajan {month} {year}</h1>
          <p className="text-xl">Pengeluaran Bulan Ini Rp {(total.current).toLocaleString().replaceAll(',', '.')}</p>
          <button className="bg-violet-800 uppercase text-sm text-white px-3.5 py-1.5 mt-3 smooth-trans hover:bg-violet-900">Tambah Item</button>
        </header>

        {/* Cards */}
        <main className="grid grid-cols-12 gap-3 mt-5">
          {detail && Object.keys(detail).map(key => {
            return (
              <Card key={key} year={year} date={key} detail={detail[key]} />
            );
          })}
        </main>
      </div>
    </>
  );
}

export default App;
