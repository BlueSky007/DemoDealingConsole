function Print() {
    window.document.all.btnPrint.style.display = "none";
    try {
        window.print();
    }
    catch (e) {
        alert(LanguagePrinterError);
    }
    finally {
        window.document.all.btnPrint.style.display = "inline";
    }
}
