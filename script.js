document.addEventListener('DOMContentLoaded', () => {
    // Data Siswa
    const students = [
        { id: 1, name: "Ahmad Budi", status: "Hadir" },
        { id: 2, name: "Citra Dewi", status: "Hadir" },
        { id: 3, name: "Eko Fajar", status: "Absen" },
        { id: 4, name: "Gita Hani", status: "Hadir" },
        { id: 5, name: "Indra Jaya", status: "Absen" },
    ];

    const tableBody = document.querySelector('#attendance-table tbody');

    // Fungsi untuk membuat baris tabel
    const createTableRow = (student, index) => {
        const row = document.createElement('tr');
        // Terapkan class animasi
        row.classList.add('table-row-animate');
        // Tunda animasi agar baris muncul satu per satu
        row.style.animationDelay = `${index * 0.1}s`;
        
        const statusClass = student.status === "Hadir" ? "status-present" : "status-absent";

        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td class="status-cell">
                <span class="${statusClass}">${student.status}</span>
            </td>
            <td>
                <button class="action-button" data-id="${student.id}" data-status="${student.status}">
                    Ganti Status
                </button>
            </td>
        `;
        return row;
    };

    // Mengisi tabel
    students.forEach((student, index) => {
        tableBody.appendChild(createTableRow(student, index));
    });

    // Menambahkan fungsionalitas klik pada tombol
    tableBody.addEventListener('click', (event) => {
        if (event.target.classList.contains('action-button')) {
            const button = event.target;
            const studentId = parseInt(button.dataset.id);
            const currentRow = button.closest('tr');
            const statusCell = currentRow.querySelector('.status-cell span');
            
            // Cari siswa di array
            const studentIndex = students.findIndex(s => s.id === studentId);
            let newStatus = '';
            let newClass = '';

            // Tentukan status baru
            if (students[studentIndex].status === "Hadir") {
                newStatus = "Absen";
                newClass = "status-absent";
            } else {
                newStatus = "Hadir";
                newClass = "status-present";
            }

            // Perbarui data di array
            students[studentIndex].status = newStatus;
            
            // Terapkan animasi perubahan status (CSS)
            statusCell.classList.add('animated-change');
            
            // Perbarui tampilan status setelah animasi singkat
            setTimeout(() => {
                statusCell.textContent = newStatus;
                statusCell.className = newClass;
                button.dataset.status = newStatus; // Perbarui data-status tombol
                statusCell.classList.remove('animated-change');
            }, 300); // Sesuaikan dengan durasi animasi CSS pulseStatus
        }
    });
});
