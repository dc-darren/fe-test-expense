const Card = ({ detail }) => {
  let total = 0;

  return (
    <>
      <div className="col-span-3 text-sm border border-gray-300/50 rounded-sm shadow-[0_1px_4px_0_rgba(0,0,0,0.25)] px-2.5 py-3.5">
        <h2 className="font-bold text-lg pb-1.5">18 Februari</h2>
        <table className="table-auto w-full">
          <tbody>
            {detail.map((item) => {
              total += item.pengeluaran;

              return (
                <tr className="border-t border-gray-300/75">
                  <td className="pl-1.5 py-1.5">{item.jam}</td>
                  <td className="pl-1.5 py-1.5">{item.nama}</td>
                  <td className="text-right whitespace-nowrap pl-1.5 py-1.5">Rp {(item.pengeluaran).toLocaleString().replace(',', '.')}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <div className="flex justify-end gap-x-8 font-bold border-t-2 border-gray-300/75 pt-1.5">
          <p>Total</p>
          <p>Rp {total.toLocaleString().replace(',', '.')}</p>
        </div>
      </div>
    </>
  );
};

export default Card;
