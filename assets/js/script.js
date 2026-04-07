const display = document.getElementById('display');
const history = document.getElementById('history');

let lastResult = false;

// Tambahkan nilai ke display
function appendValue(value) {
    const operators = ['+', '-', '*', '/', '%'];
    const lastChar = display.value.slice(-1);

    // Jika hasil terakhir dan input angka baru, reset display
    if (lastResult && !operators.includes(value)) {
        display.value = '';
        lastResult = false;
    } else {
        lastResult = false;
    }

    // Cegah 2 operator berurutan
    if (operators.includes(value) && operators.includes(lastChar)) {
        display.value = display.value.slice(0, -1);
    }

    // Cegah lebih dari 1 titik di angka yang sama
    if (value === '.') {
        const parts = display.value.split(/[\+\-\*\/]/);
        if (parts[parts.length - 1].includes('.')) return;
    }

    display.value += value;
}

// Hapus semua
function clearDisplay() {
    display.value = '';
    if (history) history.textContent = '';
}

// Hapus satu karakter
function deleteLast() {
    display.value = display.value.slice(0, -1);
}

// Hitung hasil
function calculate() {
    try {
        let expression = display.value
            .replace(/×/g, '*')
            .replace(/÷/g, '/')
            .replace(/−/g, '-');

        if (!expression) return;

        // Simpan ke riwayat
        if (history) history.textContent = expression + ' =';

        let result = eval(expression);
        display.value = parseFloat(result.toFixed(10));
        lastResult = true;

    } catch (error) {
        display.value = 'Error';
        lastResult = false;
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