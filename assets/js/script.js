// Ambil elemen display
const display = document.getElementById('display');

// Tambahkan nilai ke display
function appendValue(value) {
    if (display.value === '0' && value !== '.') {
        display.value = value;
    } else {
        display.value += value;
    }
}

// Hapus semua (clear)
function clearDisplay() {
    display.value = '';
}

// Hapus satu karakter terakhir
function deleteLast() {
    display.value = display.value.slice(0, -1);
}

// Hitung hasil
function calculate() {
    try {
        // Ganti simbol tampilan ke operator JS
        let expression = display.value
            .replace(/÷/g, '/')
            .replace(/×/g, '*')
            .replace(/−/g, '-');
        
        let result = eval(expression);

        // Hindari hasil desimal terlalu panjang
        display.value = parseFloat(result.toFixed(10));
    } catch (error) {
        display.value = 'Error';
    }
}

// Keyboard support
document.addEventListener('keydown', function(e) {
    if (e.key >= '0' && e.key <= '9') appendValue(e.key);
    else if (e.key === '+') appendValue('+');
    else if (e.key === '-') appendValue('-');
    else if (e.key === '*') appendValue('*');
    else if (e.key === '/') { e.preventDefault(); appendValue('/'); }
    else if (e.key === '.') appendValue('.');
    else if (e.key === 'Enter') calculate();
    else if (e.key === 'Backspace') deleteLast();
    else if (e.key === 'Escape') clearDisplay();
});