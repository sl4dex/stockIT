async function consult(code_content, type_barcode) {
  if (!isNaN(code_content)) {
    const data = await (await fetch(`/inventory/${code_content}`)).json()
    console.log(data);
    console.log(code_content);

    document.querySelector('.InvisibleBarcode').setAttribute('class', 'barcode');


    tableName = document.querySelector('#nameBarcode');
    tableName.appendChild(document.createTextNode(data.name));
    tableQuantity = document.querySelector('#quantityBarcode');
    tableQuantity.appendChild(document.createTextNode(data.quantity));
    document.querySelector('#qr_barcodeUpdate').setAttribute('src', `/static/images/${type_barcode}.${code_content}.png`);

    updateButton = document.querySelector('#updateButtonBarcode');

  }
  else {
    alert("Code is not registered")
  }
}

Dynamsoft.DBR.BarcodeReader.license = 'DLS2eyJoYW5kc2hha2VDb2RlIjoiMTAxMTI4MTMxLVRYbFhaV0pRY205cSIsIm9yZ2FuaXphdGlvbklEIjoiMTAxMTI4MTMxIn0=';
let scanner = null;
async function scannerF() {
  scanner = await Dynamsoft.DBR.BarcodeScanner.createInstance();
  scanner.onFrameRead = results => {
    let type_barcode;
    if (results[0]) {
      const code_content = results[0].barcodeText;
      if (results[0].barcodeFormatString === "QR_CODE") {
        type_barcode = "qr";
      }
      else {
        type_barcode = "barcode";
      }
      console.log(results.barcodeFormatString);
      consult(code_content, type_barcode);
      scanner.hide();
    }

  };
  scanner.onUnduplicatedRead = (txt, result) => { };
  await scanner.show();
};
