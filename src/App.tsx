import { useEffect, useState } from "react";

export default function App() {
  const [upiid, setUpiid] = useState("");
  const [payeename, setPayeename] = useState("");
  const [note, setNote] = useState("");
  const [amount, setAmount] = useState(0);
  const [imageLink, setImageLink] = useState("");
  const [showPaymentUI, setShowPaymentUI] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  function storeDataToLocalStorage() {
    localStorage.setItem("upigen.upiid", upiid);
    localStorage.setItem("upigen.payeename", payeename);
    localStorage.setItem("upigen.note", note);
    localStorage.setItem("upigen.amount", amount.toString());
  }

  function genUPICode() {
    storeDataToLocalStorage();
    const uri = `upi://pay?ver=01&mode=22&pa=${upiid}&pn=${payeename}&mc=0000&purpose=00&am=${amount}&tn=${note}&cu=INR`;
    const URLupi = encodeURIComponent(uri);
    setImageLink(
      `https://api.qrserver.com/v1/create-qr-code/?data=${URLupi}&color=613129&bgcolor=ffe0ae`
    );
    setImageLoading(true);
    setShowPaymentUI(true);
  }

  useEffect(() => {
    setUpiid(localStorage.getItem("upigen.upiid") || "");
    setPayeename(localStorage.getItem("upigen.payeename") || "");
    setNote(localStorage.getItem("upigen.note") || "");
    setAmount(parseFloat(localStorage.getItem("upigen.amount") || "0"));
  }, []);

  return (
    <div className=" bg-slate-950 w-screen h-screen text-white px-3">
      <div className="text-3xl mx-auto w-fit py-4">UPI Generator</div>
      <div className="grid grid-cols-2 gap-y-2">
        <span className="font-bold">UPI ID</span>
        <input
          id="upiid"
          className="bg-gray-800 border border-slate-200 rounded ps-2"
          type="text"
          onChange={(e) => {
            setUpiid(e.target.value);
          }}
          value={upiid}
        ></input>
        <span className="font-bold">Name</span>
        <input
          id="name"
          className="bg-gray-800 border border-slate-200 rounded ps-2"
          type="text"
          onChange={(e) => {
            setPayeename(e.target.value);
          }}
          value={payeename}
        ></input>
        <span className="font-bold">Note</span>
        <input
          id="note"
          className="bg-gray-800 border border-slate-200 rounded ps-2"
          type="text"
          onChange={(e) => {
            setNote(e.target.value);
          }}
          value={note}
        ></input>
        <span className="font-bold">Amount</span>
        <input
          id="amount"
          className="bg-gray-800 border border-slate-200 rounded ps-2"
          type="number"
          onChange={(e) => {
            setAmount(parseFloat(e.target.value));
          }}
          value={amount}
        ></input>
        <button
          onClick={genUPICode}
          className="bg-slate-200 col-span-2 text-slate-950 rounded font-bold"
        >
          Generate
        </button>
      </div>

      {showPaymentUI && (
        <div className="fixed top-0 left-0 w-screen h-screen flex flex-col bg-[#ffe0ae] text-[#613129] px-4">
          <span
            onClick={() => {
              setShowPaymentUI(false);
            }}
            className="bg-red-400 text-black px-3 py-2 rounded rounded-se-none absolute right-0 top-0 font-bold"
          >
            &#10005;
          </span>
          <h1 className="font-bold text-5xl mx-auto w-fit mt-10">
            {payeename}
          </h1>
          <div className="grow-1 flex flex-col justify-center">
            <p className="mt-5 mb-3">Kindly make a payment here....</p>
            <div className="w-fit mx-auto flex flex-col items-center gap-2">
              {imageLoading && (
                <span className="w-[250px] h-[250px] flex justify-center items-center absolute">
                  <div className="loader"></div>
                </span>
              )}
              {imageLink && (
                <img
                  onLoad={() => {
                    setImageLoading(false);
                  }}
                  width={250}
                  height={250}
                  className=""
                  src={imageLink}
                  alt="payment qr code"
                />
              )}
              <p className="">
                <span className="font-semibold text-3xl">₹ {amount}</span> is
                requested from you
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
