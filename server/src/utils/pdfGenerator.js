const fs = require('fs'); 
const path = require('path'); 
const PDFDocument = require('pdfkit'); 

/**
 * Generates a salary slip for an employee in PDF format.
 * @param {Object} employee - The employee details object.
 * @param {Object} salary - The salary details object.
 * @param {Array} attendance - The attendance details array.
 * @returns {Promise<string>} - The file path of the generated PDF.
 * @throws {Error} - Throws an error if PDF generation fails.
 */
const generateSalarySlip = async (employee, salary, attendance) => {
    try {
        // Create a new PDF document
        const pdfDoc = new PDFDocument({ size: 'A4', margin: 50 });

        // Define the path where the PDF will be saved
      const pdfPath = path.resolve(__dirname, '..', 'uploads', 'PDF', `${employee.name.replace(/\s/g, '-')}-salary-${new Date(salary.date).getMonth() + 1}-${new Date(salary.date).getFullYear()}.pdf`);

        // Create a write stream to the specified path
        pdfDoc.pipe(fs.createWriteStream(pdfPath));

        // Add a title header to the PDF
        pdfDoc.fontSize(20).text('ProHR - Salary Slip', { align: 'center', underline: true });
        pdfDoc.moveDown(1.5); // Add some space below the header

        // Add employee details to the PDF
        pdfDoc.fontSize(14).text(`Name: ${employee.name}`, { continued: true }).text(`Email: ${employee.email}`, { align: 'right' });
        pdfDoc.text(`Role: ${employee.role}`);
        pdfDoc.text(`Joined Date: ${new Date(employee.joinedDate).toLocaleDateString()}`);
        pdfDoc.text(`Address: ${employee.address}`);
        pdfDoc.text(`Contact Number: ${employee.contactNumber}`);
        pdfDoc.text(`Date: ${new Date().toLocaleDateString()}`);
        pdfDoc.moveDown(1); // Add some space below the employee details

        // Add salary details to the PDF
        const salaryMonth = new Date(salary.date).getMonth() + 1;
        const salaryYear = new Date(salary.date).getFullYear();
        pdfDoc.fontSize(14).text('Salary Details', { underline: true });
        pdfDoc.fontSize(12).text(`Month/Year: ${salaryMonth}/${salaryYear}`);
        pdfDoc.text(`Net Salary: INR ${salary.netSalary}`);
        pdfDoc.moveDown(1); // Add some space below the salary details

        // Add attendance details to the PDF
        pdfDoc.fontSize(14).text('Attendance Details', { underline: true });
        pdfDoc.fontSize(12).text('Date        Status');
        attendance.forEach(att => {
            pdfDoc.text(`${new Date(att.date).toLocaleDateString()}        ${att.status}`);
        });
        pdfDoc.moveDown(1); // Add some space below the attendance details

        // Add a footer to the PDF
        pdfDoc.fontSize(10).text(`This is a computer-generated document. No signature is required.`, { align: 'center' });

        // Finalize the PDF and end the document stream
        pdfDoc.end();

        // Return the path to the generated PDF
        return pdfPath;
    } catch (error) {
        console.error('Error generating PDF salary slip:', error);
        throw error;
    }
};

module.exports = { generateSalarySlip };
