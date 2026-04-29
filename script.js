/**
 * Coding Starter Pack PRO - IDE Logic
 * Berdasarkan standard implementasi Clean Energy UI
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Pemilihan Elemen (Selectors)
    const htmlEditor = document.getElementById('html-code');
    const cssEditor = document.getElementById('css-code');
    const jsEditor = document.getElementById('js-code');
    const runBtn = document.getElementById('run-btn');
    const clearBtn = document.getElementById('clear-btn');
    const outputFrame = document.getElementById('output-frame');
    const statusText = document.getElementById('current-status');
    const statusDot = document.getElementById('status-dot');

    /**
     * Fungsi Utama: Menjana dan Memaparkan Kod
     */
    const updatePreview = () => {
        try {
            statusText.textContent = "Running...";
            statusDot.style.background = "#3e6ae1"; // Warna 'raised' semasa proses

            const html = htmlEditor.value;
            const css = `<style>${cssEditor.value}</style>`;
            const js = `<script>${jsEditor.value}<\/script>`;

            const combinedCode = `
                <!DOCTYPE html>
                <html>
                    <head>${css}</head>
                    <body>
                        ${html}
                        ${js}
                    </body>
                </html>
            `;

            const doc = outputFrame.contentWindow.document;
            doc.open();
            doc.write(combinedCode);
            doc.close();

            // Kemaskini status selepas berjaya
            setTimeout(() => {
                statusText.textContent = "Ready";
                statusDot.style.background = "#27ae60"; // Hijau kejayaan
            }, 300);

        } catch (error) {
            console.error("IDE Error:", error);
            statusText.textContent = "Error in Code";
            statusDot.style.background = "#eb5757"; // Merah ralat
        }
    };

    /**
     * Fungsi: Mengosongkan Editor
     */
    const clearEditors = () => {
        if (confirm("Adakah anda pasti mahu mengosongkan semua kod?")) {
            htmlEditor.value = "";
            cssEditor.value = "";
            jsEditor.value = "";
            updatePreview();
        }
    };

    // 2. Event Listeners
    
    // Klik butang Run
    runBtn.addEventListener('click', updatePreview);

    // Klik butang Clear
    clearBtn.addEventListener('click', clearEditors);

    // Shortcut Keyboard: Ctrl + Enter untuk jalankan kod
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            updatePreview();
        }
    });

    /**
     * Auto-indentation Ringkas (Optional)
     * Membolehkan penggunaan 'Tab' di dalam textarea tanpa hilang fokus
     */
    const handleTab = (e) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            const start = e.target.selectionStart;
            const end = e.target.selectionEnd;

            // Masukkan 2 ruang kosong (space)
            e.target.value = e.target.value.substring(0, start) +
                "  " + e.target.value.substring(end);

            // Letakkan kursor selepas ruang kosong
            e.target.selectionStart = e.target.selectionEnd = start + 2;
        }
    };

    [htmlEditor, cssEditor, jsEditor].forEach(editor => {
        editor.addEventListener('keydown', handleTab);
    });

    // 3. Initial Run (Placeholder Content)
    htmlEditor.value = "<h1>Hello World</h1>\n<p>Mulakan pengaturcaraan anda di sini.</p>";
    cssEditor.value = "body {\n  font-family: sans-serif;\n  text-align: center;\n  padding-top: 50px;\n  color: #333;\n}";
    jsEditor.value = "console.log('IDE Ready!');";
    
    updatePreview();
});
