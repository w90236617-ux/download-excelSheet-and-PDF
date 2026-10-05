let button = document.getElementsByTagName("button")

button[0].addEventListener("click", () => {
    let array = [
        { name: "ali omer", age: 60, course: "wma" },
        { name: "omer", age: 20, course: "cco" },
        { name: "saqib", age: 40, course: "ccna" },
        { name: "baber", age: 10, course: "wma" },
        { name: "ali khan", age: 15, course: "cco" },

    ]

    let newarr = array.filter((value) => (value.age > 20 && value.name == "ali") || value.course == "wma")
    console.log(newarr)

    const excelData = newarr.map((student, index) => ({
        "S.NO": index + 1,
        "Student name ":student.name,
        "Age" : student.age,
        "Course name": student.course 
    }))

    const worksheet = XLSX.utils.json_to_sheet(excelData)
    worksheet["!cols"]=[
        {wch :2},
        {wch :20},
        {wch :4},
        {wch :10},


    ]
    const workbook = XLSX.utils.book_new()

    XLSX.utils.book_append_sheet(workbook, worksheet, "Filter User")

    XLSX.writeFile(workbook, "students.xlsx")
})




function pdfDownload() {

    let array = [
        { name: "ali omer", age: 60, course: "wma" },
        { name: "omer", age: 20, course: "cco" },
        { name: "saqib", age: 40, course: "ccna" },
        { name: "baber", age: 10, course: "wma" },
        { name: "ali khan", age: 15, course: "cco" },
    ];

    let newarr = array.filter((value) =>
        (value.age > 20 && value.name == "ali") ||
        value.course == "wma"
    );

    console.log(newarr);

    let pdfContent = document.getElementById("pdfContent");

    pdfContent.innerHTML = `
        <h2>Student List</h2>

        <table border="1" cellpadding="10" cellspacing="0">
            <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Course</th>
            </tr>

            ${newarr.map((value) => `
                <tr>
                    <td>${value.name}</td>
                    <td>${value.age}</td>
                    <td>${value.course}</td>
                </tr>
            `).join("")}

        </table>
    `;

    html2canvas(pdfContent, {
        scale: 3,
        useCORS: true
    }).then((canvas) => {

        const image = canvas.toDataURL("image/png");

        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF();

        pdf.addImage(
            image,
            "PNG",
            10,
            10,
            190,
            0
        );

        pdf.save("students.pdf");
    });
}