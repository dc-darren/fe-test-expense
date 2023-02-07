import Card from "./component/Card";

function App() {
  const detail1 = [
    {
      "jam": "03:15",
      "tanggal":"18 Februari 2023",
      "nama":"Ayam Tangkap",
      "pengeluaran":77249
    },
    {
      "jam": "03:15",
      "tanggal":"18 Februari 2023",
      "nama":"Mie Rebus",
      "pengeluaran":32154
    },
  ];

  const detail2 = [
    {
        "jam": "03:15",
        "tanggal":"18 Februari 2023",
        "nama":"Ayam Tangkap",
        "pengeluaran":77249
    },
    {
        "jam": "03:15",
        "tanggal":"18 Februari 2023",
        "nama":"Mie Rebus",
        "pengeluaran":32154
    },
    {
        "jam": "00:20",
        "tanggal":"17 Februari 2023",
        "nama":"Soto Kuning",
        "pengeluaran":34992
    },
    {
        "jam": "05:59",
        "tanggal":"17 Februari 2023",
        "nama":"Ayam Geprek",
        "pengeluaran":37674
    },
    {
        "jam": "05:45",
        "tanggal":"16 Februari 2023",
        "nama":"Otak-otak",
        "pengeluaran":11971
    }
  ];

  return (
    <>
      <div className="p-4">
        {/* Header */}
        <header className="text-center">
          <h1 className="text-3xl">Diari Jajan Februari 2023</h1>
          <p className="text-xl">Pengeluaran Bulan Ini Rp 5.605.475</p>
          <button className="bg-violet-800 uppercase text-sm text-white px-3.5 py-1.5 mt-3 smooth-trans hover:bg-violet-900">Tambah Item</button>
        </header>

        {/* Cards */}
        <main className="grid grid-cols-12 gap-3 mt-5">
          <Card detail={detail1} />
          <Card detail={detail2} />
          <Card detail={detail1} />
          <Card detail={detail1} />
          <Card detail={detail2} />
          <Card detail={detail1} />
        </main>
      </div>
    </>
  );
}

export default App;
